<template>
 <main>
    <div class="p-6 min-h-screen max-w-2xl mx-auto">
        <nav class="flex items-center space-x-2 text-gray-600 text-sm mb-4">
          <span class="cursor-pointer hover:text-gray-800">Dashboard</span>
          <span class="text-gray-400">|</span>
          <span class="cursor-pointer hover:text-gray-800">Jason Gardens</span>
          <span class="text-gray-400">|</span>
          <span class="text-gray-800 font-medium">Make payment</span>
        </nav>
        <div class="bg-white rounded-lg">
          <h2 class="text-gray-800 font-medium mb-4">
            Transfer NGN 70,000 to Homeowner
          </h2>
          <div class="bg-white border-gray-100 border-[0.5px] p-4 rounded-lg ">
            <div class="flex justify-between items-center mb-3">
              <div>
                <div class="text-sm text-[#667185]">Bank Name</div>
                <div class="text-[#1D2739] font-medium">First Bank</div>
              </div>
              <button @click="copyToClipboard('First Bank')" class="text-gray-500 hover:text-blue-500">
                <img  src="@/assets/icons/copy.svg" alt=""/>
              </button>
            </div>
            <div class="flex justify-between items-center mb-3">
              <div>
                <div class="text-sm text-[#667185]">Account Name</div>
                <div class="text-[#1D2739] font-medium">Jason Gardens Inc</div>
              </div>
              <button @click="copyToClipboard('Jason Gardens Inc')" class="text-gray-500 hover:text-blue-500">
                <img src="@/assets/icons/copy.svg" alt="" />
              </button>
            </div>
            <div class="flex justify-between items-center mb-3">
              <div>
                <div class="text-sm text-[#667185]">Account Number</div>
                <div class="text-[#1D2739] font-medium">0000 0000 0000 0000</div>
              </div>
              <button @click="copyToClipboard('0000 0000 0000 0000')" class="text-gray-500 hover:text-blue-500">
               <img src="@/assets/icons/copy.svg" alt="" />
              </button>
            </div>
            <div class="flex justify-between items-center">
              <div>
                <div class="text-sm text-[#667185]">Amount</div>
                <div class="text-[#1D2739] font-medium">NGN 70,000.00</div>
              </div>
              <button @click="copyToClipboard('NGN 70,000.00')" class="text-gray-500 hover:text-blue-500">
                <img src="@/assets/icons/copy.svg" alt="" />
              </button>
            </div>
          </div>
          <div class="flex items-center p-4 mt-4 bg-white border-[0.5px] border-gray-100 rounded-lg text-sm">
            <span class="mr-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.33 22.001H7.66C4.27 22.001 2 19.621 2 16.081V7.90998C2 4.37998 4.27 2.00098 7.66 2.00098H16.33C19.72 2.00098 22 4.37998 22 7.90998V16.081C22 19.621 19.72 22.001 16.33 22.001ZM12.01 14.94C12.48 14.94 12.87 15.331 12.87 15.81C12.87 16.3 12.48 16.69 11.99 16.69C11.51 16.69 11.12 16.3 11.12 15.81C11.12 15.331 11.51 14.94 12.01 14.94ZM11.13 8.21997C11.13 7.73997 11.52 7.34997 12.01 7.34997C12.49 7.34997 12.88 7.73997 12.88 8.21997V12.64C12.88 13.121 12.49 13.52 12.01 13.52C11.52 13.52 11.13 13.121 11.13 12.64V8.21997Z" fill="#4A71E0"/>
                  </svg>                
            </span>
            <div>
              <p class="text-xs">Please confirm your payment by clicking the 'I have sent the money' button below.</p>
              <p class="text-xs">Expires in: <span class="font-medium text-sm">30:00</span></p>
            </div>
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
  import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
  import { ref } from 'vue';
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast({
          title: "Success",
          message: `Copied: ${text}`,
          toastType: "success",
          duration: 3000
        });
  };
  </script>
  
  <style scoped>
  </style>