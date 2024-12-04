<template>
<main>
  <TopNavBar />
  <div class="p-8 bg-gray-25 min-h-screen">
    <div class="max-w-xl mx-auto">
      <!-- Breadcrumbs -->
      <svg
            @click="router.back()"
            class="cursor-pointer mb-3"
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
      <div class="text-sm text-gray-500 mb-4">
        <span>Profile</span>
        <span class="mx-2">|</span>
        <span class="font-semibold text-gray-700">Third Party License</span>
      </div>

      <!-- License Items -->
      <div class="space-y-4">
        <!-- First License -->
        <div class="flex justify-between items-center p-4 bg-white rounded-lg border-[0.5px] border-gray-25">
          <div class="space-y-2">
            <p class="text-[#1D2739] font-medium">Third Party License 1</p>
            <p class="text-[#1D2739] text-sm">On clicking the switch, you are enabling biometric for transaction</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <!-- Second License -->
        <div class="flex justify-between items-center p-4 bg-white rounded-lg border-[0.5px] border-gray-25">
          <div class="space-y-2">
            <p class="text-[#1D2739] font-medium">Third Party License 1</p>
            <p class="text-[#1D2739] text-sm">On clicking the switch, you are enabling biometric for transaction</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>

        <!-- Third License -->
        <div class="flex justify-between items-center p-4 bg-white rounded-lg border-[0.5px] border-gray-25">
          <div class="space-y-2">
            <p class="text-[#1D2739] font-medium">Third Party License 1</p>
            <p class="text-[#1D2739] text-sm">On clicking the switch, you are enabling biometric for transaction</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</main>
  </template>
  
  <script setup lang="ts">
  const router = useRouter()
  definePageMeta({
  middleware: "auth",
});
  </script>
  
  <style scoped></style>
  