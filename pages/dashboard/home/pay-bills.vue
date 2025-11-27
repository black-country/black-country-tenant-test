<template>
  <TopNavBar />
  <section class="max-w-xl mx-auto mt-6">
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
        <span class="text-[#1D2739] font-medium">Pay bills</span></span
      >
    </div>
    
    <!-- Debug: Remove after testing -->
    <!-- {{ billersListObj }} -->
    
    <HomeElectricityBillForm 
      v-if="!loading" 
      :billersList="billersListObj" 
    />
    <!-- <HomeCableBillForm /> -->
  </section>
</template>

<script setup lang="ts">
import { useFetchBillersByCategories } from '@/composables/modules/home/useGetBillersByCategories';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const { billersListObj, fetchBillersByCategories, loading } =
  useFetchBillersByCategories();
</script>