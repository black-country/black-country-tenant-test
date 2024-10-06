<template>
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
        
        <!-- Dynamic Input Types -->
        <div v-if="field.type === 'text'">
          <input
            v-model="field.value"
            type="text"
            class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
          />
        </div>
        <div v-if="field.type === 'select'">
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
      </div>
  
      <div class="flex justify-between mt-8">
        <button @click="goBack" class="px-6 py-3 text-sm rounded-md bg-gray-100 text-[#292929]">Cancel</button>
        <button :disabled="!isFormValid" type="submit" class="px-6 py-3 text-sm rounded-md bg-[#292929] text-white" :class="{ 'bg-gray-300': !isFormValid, 'bg-[#292929]': isFormValid }">Save</button>
      </div>
    </form>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFormPersistence } from '@/composables/core/useFormPersistence';

const route = useRoute();
const router = useRouter();
const section = ref(route.params.section);
const sectionTitle = ref(section.value.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()));

const fields = ref([]);
const sectionFields = {
  'personal-information': [
    { label: 'Name', value: '', type: 'text', isCompulsory: true },
    { label: 'Email address', value: '', type: 'email', isCompulsory: true },
    { label: 'Phone number', value: '', type: 'text', isCompulsory: true },
    { label: 'Date of Birth', value: '', type: 'date', isCompulsory: true },
    { label: 'Marital status', value: '', type: 'select', options: ['Single', 'Married'] },
    { label: 'Gender', value: '', type: 'select', options: ['Male', 'Female', 'I’ll rather not say'] },
    { label: 'State of Origin', isCompulsory: true, value: '', type: 'text' },
    { label: 'Local Government (LGA)', value: '', type: 'text' }
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

// Prefill form fields if data exists in local storage
onMounted(() => {
  const savedData = loadData(section.value);
  if (savedData) {
    // Iterate over the saved data and assign it to the corresponding fields
    savedData.forEach((savedField: any, index: number) => {
      if (fields.value[index]) {
        fields.value[index].value = savedField.value;
      }
    });
  }
});

// Computed property to check if all compulsory fields are filled
const isFormValid = computed(() => {
  return fields.value.every(field => !field.isCompulsory || (field.isCompulsory && field.value));
});

// Save form data and move to the next step
const saveSection = () => {
  try {
    // Save data using the section's title as the key
    saveData(section.value, fields.value); // Section title as the key, field values as the value

    // Debugging: log the saved data
    console.log('Saved Data:', section.value, fields.value);
    
    router.push({ query: { step: '2' } });
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
