<!-- pages/rental-application.vue -->
<template>
    <div class="container mx-auto p-4">
      <div class="flex items-center text-gray-600 mb-4">
        <!-- <icon-arrow-back /> -->
        <span class="ml-2">Dashboard | Rental Application</span>
      </div>
  
      <!-- Empty State Component -->
      <HomeEmptyState v-if="!isMovedIn" />
  
      <!-- Property Overview Section -->
      <HomePropertyOverview v-if="isMovedIn" />
  
      <!-- Action Buttons -->
      <HomeActionButtons />
  
      <!-- No Transactions Section -->
      <section class="mt-6">
        <h3 class="text-gray-700 mb-2">Upcoming activities</h3>
        <HomeNoTransactions />
      </section>
  
      <!-- Recent Activities Section -->
      <section class="mt-6">
        <h3 class="text-gray-700 mb-2">Recent activities</h3>
        <HomeNoTransactions />
      </section>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';  
  const isMovedIn = ref(false);
  </script>
  
  <style scoped>
  /* Add any custom styles if necessary */
  </style>
  