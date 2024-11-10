<template>
    <main>
      <TopNavBar />
      <div class="min-h-screen flex flex-col justify-between max-w-3xl mx-auto">
        <div class="bg-white p-6">
          <div class="flex items-center text-gray-600 mb-4">
            <svg
              @click="router.back()"
              class="cursor-pointer"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="18" fill="#EAEAEA" />
              <path
                d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
  
            <span class="ml-2 text-[#667185]">My Home <span class="ml-2 text-[#667185]"> | Move Out</span> | <span class="text-[#1D2739] font-medium">Move - out checklist</span></span>
          </div>
          <div class="min-h-screen flex items-center justify-center bg-gray-100">
            <HomeMoveOutChecklist />
        </div>
        </div>
      </div>

      <div class="flex justify-between items-center max-w-3xl mx-auto px-4 py-10">
        <button class="rouned-lg text-sm px-6 py-3 text-[#292929] rounded-lg border-[0.5px] border-gray-100">Cancel</button>
        <button @click="router.push('/dashboard/home/checklist-success')" class="rouned-lg  text-sm px-6 py-3 bg-[#292929] rounded-lg text-white">Submit Checklist</button>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  const router = useRouter()
  </script>
  
  <style scoped>
  /* Add additional styles as needed */
  </style>
  