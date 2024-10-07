<template>
<main>
    <div class="p-6  min-h-screen max-w-2xl mx-auto">
        <nav class="flex items-center space-x-2 text-gray-600 text-sm mb-4">
          <span class="cursor-pointer hover:text-gray-800">Dashboard</span>
          <span class="text-gray-400">|</span>
          <span class="cursor-pointer hover:text-gray-800">Jason Gardens</span>
          <span class="text-gray-400">|</span>
          <span class="text-gray-800 font-medium">Make payment</span>
        </nav>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <div class="flex items-center justify-between p-4 mb-2 border border-gray-200 rounded-lg">
            <div class="flex items-center">
              <img src="@/assets/icons/first-bank.svg" alt="Bank Logo" class="w-10 h-10 mr-4" />
              <div>
                <div class="text-gray-800 font-medium">**** **** **** 1234</div>
                <div class="text-gray-500 text-sm">First Bank</div>
              </div>
            </div>
            <input
              type="radio"
              name="selectedBank"
              class="form-radio text-green-500 focus:ring focus:ring-green-300"
              checked
            />
          </div>
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100">
            <span class="text-blue-500 font-medium">Link new bank account</span>
            <span class="text-blue-500">&gt;</span>
          </div>
        </div>
      </div>
      <div class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center  border-[0.5px]">
          <div class="max-w-2xl w-full flex justify-between">
            <button class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]" @click="goBack">Cancel</button>
            <button class="px-6 py-3 text-sm rounded-md bg-[#292929] text-white" @click="goNext">Continue</button>
          </div>
      </div>
</main>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const selectedBank = ref<string | null>('1234');
  </script>
  
  <style scoped>
  .form-radio {
    border-radius: 50%;
    height: 1.25rem;
    width: 1.25rem;
    border: 2px solid #cbd5e1; /* Tailwind color: border-gray-300 */
  }
  </style>