<template>
    <div class="flex items-center justify-between">
      <!-- Dropdown Menu -->
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="px-4 py-3 bg-[#F9FAFB] text-gray-700 rounded-lg flex items-center space-x-1"
        >

          <span>{{ mappedDropdownOption(selectedOption) }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
  
        <!-- Dropdown Options -->
        <div
          v-if="isDropdownOpen"
          class="absolute mt-2 w-60 bg-[#F9FAFB] border-[0.5px] border-gray-100 text-[#1D2739] rounded-md shadow-lg z-10"
        >
          <ul class="">
            <li @click="selectOption('All requests')" class="px-4 text-sm py-3 hover:bg-gray-100 cursor-pointer">All requests</li>
            <li @click="selectOption('pending')" class="px-4 text-sm py-3 hover:bg-gray-100 cursor-pointer">Pending requests</li>
            <li @click="selectOption('assigned')" class="px-4 text-sm py-3 hover:bg-gray-100 cursor-pointer">Assigned requests</li>
            <li @click="selectOption('in_progress')" class="px-4 text-sm py-3 hover:bg-gray-100 cursor-pointer">In-progress requests</li>
            <li @click="selectOption('completed')" class="px-4 text-sm py-3 hover:bg-gray-100 cursor-pointer">Completed requests</li>
            <!-- <li @click="selectOption('Upcoming')" class="px-4 text-sm py-3 hover:bg-gray-100 cursor-pointer">Upcoming requests</li> -->
            <li @click="selectOption('cancelled')" class="px-4 text-sm py-3 hover:bg-gray-100 cursor-pointer">Cancelled requests</li>
            <li @click="selectOption('declined')" class="px-4 text-sm py-3 hover:bg-gray-100 cursor-pointer">Declined requests</li>
          </ul>
        </div>
      </div>
  
      <!-- Move In Button -->
      <NuxtLink to="/dashboard/home/create" class="px-6 py-2.5 text-sm bg-[#292929] text-white rounded-lg flex items-center space-x-1 hover:bg-gray-800">
        <span><svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.5 3.33398V16.6673" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.83301 10H17.1663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </span>
        <span>Create request</span>
      </NuxtLink>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const isDropdownOpen = ref(false);
  const selectedOption = ref('All requests');
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };

  const emit = defineEmits(['selected'])
  
  const selectOption = (option: string) => {
    selectedOption.value = option;
    emit('selected', option)
    isDropdownOpen.value = false;
  };


  const mappedDropdownOption = (inputText: string) => {
     const statusText = {
       'pending' : 'Pending',
       'assigned': 'Assigned',
       'in_progress' : 'In Progress',
       'completed': 'Completed',
       'cancelled': 'Cancelled',
       'declined':'Declined'
     }

     return statusText[inputText] ?? 'All requests'
  }
  </script>
  
  <style scoped>
  /* Add additional styling here if needed */
  </style>
  