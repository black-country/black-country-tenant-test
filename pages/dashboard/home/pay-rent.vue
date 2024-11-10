<!-- pages/rental-application.vue -->
<template>
    <main>
      <TopNavBar />
     <section class="max-w-2xl mx-auto space-y-6 pt-6">
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

          <span class="ml-2 text-[#667185]"
            >My Home |
            <span class="text-[#1D2739] font-medium"
              >Pay rent</span
            ></span
          >
        </div>
      <div class="">
        <HomeConfirmRentDetails />
      </div>
      <div class="pb-10 flex justify-between pt-10">
      <button class="py-3 text-sm px-10 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
      <button
        @click="router.push('/dashboard/home/payment-methods')"
        class="py-3 text-sm px-10 text-white bg-[#292929] rounded-md"
      >
        Continue
      </button>
    </div>
     </section>
    </main>
</template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  const router = useRouter()
  const isMovedIn = ref(false);
  </script>
  
  <style scoped>
  /* Add any custom styles if necessary */
  </style>
