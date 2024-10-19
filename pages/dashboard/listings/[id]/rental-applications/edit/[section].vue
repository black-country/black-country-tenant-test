<template>
<main>
  <TopNavBar />
  <div class="max-w-2xl mx-auto p-6">
    <svg @click="router.back()" class="cursor-pointer" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
      <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <h2 class="text-xl font-medium mb-4 text-[#1D2739] my-4">{{ sectionTitle }} Information</h2>
    <form @submit.prevent="saveSection">
      <div v-for="(field, index) in fields" :key="index" class="mb-4">
        <label class="block text-sm font-medium text-[#1D2739]">
          {{ field.label }} 
          <span v-if="field.isCompulsory" class="text-red-600">*</span>
        </label>
        <div v-if="field.type === 'text'">
          <input
            v-model="field.value"
            type="text"
            class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
          />
        </div>
        <div v-if="field.type === 'select' && field.label !== 'State of Origin' && field.label !== 'Local Government (LGA)'">
          <select
            v-model="field.value"
            class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
          >
            <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
        <div v-if="field.type === 'date'">
          <input
            v-model="field.value" type="date"
            class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
          />
        </div>
        <div v-if="field.type === 'email'">
          <input
            v-model="field.value" type="email"
            class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
          />
        </div>
        <div v-if="field.type === 'number'">
          <input
            v-model="field.value" type="number"
            class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
          />
        </div>
        <div v-if="field.type === 'textarea'">
          <textarea
            v-model="field.value"
            class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
            rows="4"
          ></textarea>
        </div>
        <div v-if="field.type === 'file'">
          <input
            type="file"
            @change="handleFileUpload($event, field)"
            class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
          />
          <p v-if="field.preview">{{ field.preview }}</p> <!-- Preview the uploaded file -->
        </div>
      <section>
        <section v-if="loadingStates && field.label === 'State of Origin'" class="">
          <div class="h-14 w-full animate-pulse rounded bg-slate-200"></div>
        </section>
       <div v-else>
        <div v-if="field.label === 'State of Origin' && field.code === 'state_of_origin'">
          <select v-model="selectedState" class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md">
            <option v-for="option in field.options" :key="option" :value="option">{{ option.name }}</option>
          </select>
        </div>
       </div>
      </section>
      <section>
        <section v-if="loadingCities && field.label === 'Local Government (LGA)'" class="">
          <div class="h-14 w-full animate-pulse rounded bg-slate-200"></div>
        </section>
      <div v-else>
        <div v-if="field.label === 'Local Government (LGA)' && field.code === 'lga'">
          <select v-model="selectedLga" class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md">
            <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
      </section>
   
      </div>
      <div class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center  border-[0.5px]">
        <div class="max-w-2xl w-full flex justify-between">
          <button class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]" @click="goBack">Cancel</button>
          <button  :disabled="!isFormValid || loading" type="submit" class="px-6 py-3 text-sm rounded-md disabled:cursor-not-allowed disabled:opacity-25  bg-[#292929] text-white"  :class="{ 'bg-gray-300': !isFormValid, 'bg-[#292929]': isFormValid }" >{{loading ? 'processing...' : 'Save'}}</button>
        </div>
    </div>
    </form>
  </div>
</main>
</template>


<script setup lang="ts">
import { use_tenant_profile } from '@/composables/auth/fetchProfile'
import { use_update_profile } from '@/composables/auth/updateProfile'
const { updateProfile, loading } = use_update_profile()
import { useRoute, useRouter } from 'vue-router';
import { useFormPersistence } from '@/composables/core/useFormPersistence';
import { useDataMapping } from '@/composables/modules/rentals/useDataMapping';
const { credential, mapDataToCredential } = useDataMapping();
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
import { useRemoveNullValues } from '@/composables/modules/rentals/useRemoveNullValues';
import { useGetLocation } from '@/composables/core/useGetLocation'
const { loading: loadingProfile, profileObj } = use_tenant_profile()
const { removeNullValues } = useRemoveNullValues()
const { states, cities, loadingStates, loadingCities,  getStates, getCities } = useGetLocation()

const cleanedObject = ref({});
const selectedState = ref(''); // Define selectedState to track selected state
const selectedLga = ref(''); // Define selectedLga to track selected LGA (city)


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
    { label: 'State of Origin', value: '', type: 'select', code: 'state_of_origin', options: [], isCompulsory: false }, // State as select
    { label: 'Local Government (LGA)', value: '', type: 'select', code: 'lga', options: [], isCompulsory: false }, // LGA as select
  ],
  'rental-history': [
    { label: 'Current Landlord', value: '', type: 'text' },
    { label: 'Rental Address', value: '', type: 'text' },
    { label: 'Length of Tenancy', value: '', type: 'text' },
    { label: 'Reason for moving out', value: '', type: 'textarea' }
  ],
  'employment-information': [
    { label: 'Current employment status', isCompulsory: true, value: '', type: 'select', options: ['Employed', 'Unemployed', 'Self-employed'] },
    { label: 'Employer\'s full name', isCompulsory: true, value: '', type: 'text' },
    { label: 'Organization address',  value: '', type: 'text'},
    { label: 'Occupation', value: '', type: 'text' },
    { label: 'Monthly Net Salary', isCompulsory: true, value: '', type: 'number' }
  ],
  'next-of-kin': [
    { label: 'Full Name', value: '', type: 'text' },
    { label: 'Relationship', value: '', type: 'select', options: ['Mother', 'Father', 'Sister', 'Brother', 'Daughter', 'Son', 'Relative'] },
    { label: 'Email address', isCompulsory: true, value: '', type: 'email' },
    { label: 'Residential address', isCompulsory: true, value: '', type: 'text' },
    { label: 'Phone Number', isCompulsory: true, value: '', type: 'number' },
    { label: 'Occupation', value: '', type: 'text' },
    { label: 'Organization name', value: '', type: 'text' },
    { label: 'Office address', value: '', type: 'text' },
  ],
};

// Load fields based on section
fields.value = sectionFields[section.value] || [];

// Persist form data
const { saveData, loadData } = useFormPersistence();

onMounted(async () => {
  const savedData = loadData(section.value);
  if (savedData) {
    // Iterate over the saved data and assign it to the corresponding fields
    savedData.forEach((savedField: any, index: number) => {
      if (fields.value[index]) {
        fields.value[index].value = savedField.value;
      }
    });
  }

  // Fetch states from the API and wait for the result
  await getStates(); // Ensure this is awaited

  // Populate the State of Origin options with the fetched states
  const stateField = fields.value.find((field) => field.label === 'State of Origin');
  
  if (stateField && states.value.length) {
    stateField.options = states.value.map((state) => ({
      name: state.name,
      stateCode: state.stateCode, // Assuming stateCode exists in the state data
    }));
  } else {
    console.log('State options not populated, no states available or stateField not found.');
  }
});

watch(selectedState, async (newState) => {
  console.log(newState, 'watching from outsie')
  const stateField = fields.value.find((field) => field.label === 'State of Origin');
  stateField.value = newState.name
    if (newState) {
      await getCities(newState.stateCode);
      const lgaField = fields.value.find((field) => field.label === 'Local Government (LGA)');
      if (lgaField && cities.value.length) {
          lgaField.options = cities.value.map((city) => city.name);
        }
    }
  });

  watch(selectedLga, async (newLga) => {
  console.log(newLga, 'watching from outsie')
  const lgaField = fields.value.find((field) => field.label === 'Local Government (LGA)');
  lgaField.value = newLga.name
  });
  
// Computed property to check if all compulsory fields are filled
// const isFormValid = computed(() => {
//   return fields.value.every(field => !field.isCompulsory || (field.isCompulsory && field.value));
// });

const isFormValid = computed(() => {
  return fields.value.every(field => {
    if (!field.isCompulsory) return true;

    // Check for different field types
    if (field.type === 'select') {
      // Ensure a valid option is selected (not empty or undefined)
      return field.value !== '' && field.value !== null && field.value !== undefined;
    }

    if (field.type === 'number') {
      // Ensure a number field is valid (not empty, undefined, or NaN)
      return field.value !== '' && field.value !== null && !isNaN(field.value);
    }

    // For other field types (e.g., text, email, date), ensure they are not empty
    return field.value !== '' && field.value !== null && field.value !== undefined;
  });
});

// Save form data and move to the next step
const saveSection = async () => {
  try {
    mapDataToCredential(fields.value);
    cleanedObject.value = removeNullValues(credential.value);
    console.log(cleanedObject.value, 'cleaned')
    updateProfile(cleanedObject.value).then(() => {
      showToast({
          title: "Success",
          message: `${section.value} was updated successfully`,
          toastType: "success",
          duration: 3000
        });
        saveData(section.value, fields.value);
        router.push({ query: { step: '2' } });
    })

    // // Save data using the section's title as the key
    // saveData(section.value, fields.value); // Section title as the key, field values as the value

    // // Debugging: log the saved data
    // console.log('Saved Data:', section.value, fields.value);
    
    // router.push({ query: { step: '2' } });
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
