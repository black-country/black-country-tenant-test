<template>
    <main>
      <TopNavBar class="" /> 
      <div class="bg-gray-25 min-h-screen p-6">
        <div class="max-w-3xl mx-auto">
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
  
            <span class="ml-2  text-[#667185]">My Home | <span class="ml-2 font-semibold text-[#1D2739]"> Move - out</span></span>
          </div>
          <div class="space-y-2 mb-8">
            <div v-for="action in setupActions" :key="action.title" @click="router.push(action.path)" class="flex cursor-pointer justify-between items-center bg-white p-4 py-6 rounded-lg">
            <div class="flex items-center gap-x-3">
              <div>
                <input disabled type="checkbox" :checked="action.checked" class="form-checkbox h-5 w-5 text-blue-600" />            
              </div>
              <div>
                <h2 class="text-base font-medium text-[#1D2739]">{{ action.title }}</h2>
                <p class="text-[#667185] text-sm font-light gap-x-2">{{ action.description }}</p>
              </div>
            </div>
        <div>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.00003 1C1.00003 1 5 3.94593 5 5C5 6.05413 1 9 1 9" stroke="#667185" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
            </div>
          </div>
        </div>
      </div>
    </main>
      </template>
      
      <script setup lang="ts">
      const router = useRouter()
      const setupActions = ref([
        { checked: false, title: 'Notice of intent to move - out', description: 'Send a move-out notice to prepare for inspection.', path: '/dashboard/home/move-out-notice' },
        { checked: false, title: 'Move - out checklist', description: 'Complete the move-out checklist to facilitate the inspection.', path: '/dashboard/home/move-out-checklist' }
      ]);

      </script>
      
      <style scoped>
      /* Add additional styles as needed */
      </style>
      