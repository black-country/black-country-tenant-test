<script setup lang="ts">
import { use_update_profile } from '@/composables/auth/updateProfile';
const { updateProfile, loading } = use_update_profile();
import { useRoute, useRouter } from 'vue-router';
import { useFormPersistence } from '@/composables/core/useFormPersistence';
import { useDataMapping } from '@/composables/modules/rentals/useDataMapping';
const { credential, mapDataToCredential } = useDataMapping();
import { useCustomToast } from '@/composables/core/useCustomToast';
const { showToast } = useCustomToast();
import { useRemoveNullValues } from '@/composables/modules/rentals/useRemoveNullValues';
import { useGetLocation } from '@/composables/core/useGetLocation';
const { removeNullValues } = useRemoveNullValues();
const { states, cities, getStates, getCities } = useGetLocation();

const cleanedObject = ref({});
const selectedState = ref(''); // To track selected state
const selectedLga = ref(''); // To track selected LGA (city)

const route = useRoute();
const router = useRouter();
const section = ref(route.params.section);
const sectionTitle = ref(section.value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()));

const fields = ref([]);
const sectionFields = {
  'personal-information': [
    { label: 'Name', value: '', type: 'text', isCompulsory: true },
    { label: 'Email address', value: '', type: 'email', isCompulsory: true },
    { label: 'Phone number', value: '', type: 'number', isCompulsory: true },
    { label: 'Date of Birth', value: '', type: 'date', isCompulsory: true },
    { label: 'Marital status', value: '', type: 'select', options: ['Single', 'Married'] },
    { label: 'Gender', value: '', type: 'select', options: ['Male', 'Female', 'I’ll rather not say'] },
    { label: 'State of Origin', value: '', type: 'select', code: 'state_of_origin', options: [], isCompulsory: true }, // State as select
    { label: 'Local Government (LGA)', value: '', type: 'select', code: 'lga', options: [], isCompulsory: true }, // LGA as select
  ],
  // Other sections...
};

// Load fields based on section
fields.value = sectionFields[section.value] || [];

// Persist form data
const { saveData, loadData } = useFormPersistence();

// Prefill form fields if data exists in local storage
onMounted(async () => {
  const savedData = loadData(section.value);
  if (savedData) {
    savedData.forEach((savedField: any, index: number) => {
      if (fields.value[index]) {
        fields.value[index].value = savedField.value;
      }
    });
  }

  // Fetch states from the API and wait for the result
  await getStates();

  // Populate the State of Origin options with the fetched states
  const stateField = fields.value.find((field) => field.label === 'State of Origin');
  if (stateField && states.value.length) {
    stateField.options = states.value.map((state) => ({
      name: state.name,
      stateCode: state.stateCode, // Assuming stateCode exists in the state data
    }));
  }

  // Watch for changes in the selected state
  watch(selectedState, async (newState) => {
    if (newState) {
      const state = states.value.find((s) => s.name === newState); // Find the selected state
      if (state && state.stateCode) {
        // Call getCities with the stateCode
        await getCities(state.stateCode);

        // Populate the LGA (Local Government) options with the fetched cities
        const lgaField = fields.value.find((field) => field.label === 'Local Government (LGA)');
        if (lgaField && cities.value.length) {
          lgaField.options = cities.value.map((city) => city.name); // Assuming `name` is the key for city names
        }
      }
    }
  });
});

// Computed property to check if all compulsory fields are filled
const isFormValid = computed(() => {
  return fields.value.every(field => !field.isCompulsory || (field.isCompulsory && field.value));
});

// Save form data and move to the next step
const saveSection = async () => {
  try {
    mapDataToCredential(fields.value);
    cleanedObject.value = removeNullValues(credential.value);
    updateProfile(cleanedObject.value).then(() => {
      showToast({
          title: "Success",
          message: `${section.value} was updated successfully`,
          toastType: "success",
          duration: 3000
        });
        saveData(section.value, fields.value);
        router.push({ query: { step: '2' } });
    });
  } catch (error) {
    console.error('Error saving form data:', error);
  }
};

// Go back to the previous step
const goBack = () => {
  router.back(); // Go back to the previous step
};

// Handle file upload
const handleFileUpload = (event: Event, field: any) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    field.value = file; // Store the file object
    field.preview = file.name; // Display the file name as a preview
  }
};
</script>
