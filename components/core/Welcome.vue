<template>
    <div class="flex flex-col items-center justify-center ">
      <div class="bg-white p-6 rounded-xl shadow-lg max-w-md w-full text-center space-y-6">
        <!-- Emoji icon -->
        <div class="text-4xl mb-4  flex justify-center items-center">
           <span class="border-2 p-1 border-gray-100 rounded-lg">
             🤝        
           </span>
        </div>
  
        <!-- Title -->
        <h1 class="text-xl font-semibold mb-2 text-[#1D2739]">
            Welcome to BlackCountry! 🥳 🥳🥳
        </h1>
  
        <!-- Description -->
        <p class="text-[#667185] mb-6 leading-snug">
          Welcome to your all-in-one shared-living platform. Search for your ideal
          home and manage it effortlessly, all within our user-friendly app. Click
          <span class="text-[#1D2739] font-semibold">'Continue'</span> to embark on your personalized <span class="font-semibold text-[#1D2739]">tour</span> of the platform!
        </p>
  
        <!-- Buttons -->
        <div class="flex justify-between space-x-4 pt-5">
          <button @click="emit('close')" class="flex-1 bg-[#EBE5E0] font-medium text-[#292929] py-3.5 px-4 rounded-lg hover:bg-gray-200">
            Skip tour
          </button>
          <!-- <button @click="emit('start')" class="flex-1 bg-[#292929] text-white py-3.5 px-4 rounded-lg hover:bg-gray-900">
            Continue
          </button> -->
          <button @click="emit('start')" class="flex-1 bg-[#292929] text-white py-3.5 px-4 rounded-lg hover:bg-gray-900">
            Continue
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const emit = defineEmits(['close', 'start'])
  const router = useRouter()
  // Composition API setup goes here if needed, for now it's a simple static page
  </script>
  
  <style scoped>
  /* Additional custom styling can go here */
  </style>
  