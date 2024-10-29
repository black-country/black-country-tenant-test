<!-- components/EmptyState.vue -->
<template>
    <div class="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg text-center">
      <div class="mb-4">
        <div class="bg-gray-200 p-4 rounded-full">
          <icon-home class="text-gray-500" />
        </div>
      </div>
      <h2 class="text-xl font-semibold text-gray-800 mb-2">You're yet to move into an apartment</h2>
      <p class="text-gray-500 mb-6">
        To begin managing your rented room or home, click on "Move in" or "Go to listings" to search for a property.
      </p>
      <div class="flex gap-4">
        <button class="bg-black text-white px-4 py-2 rounded-lg">Move in</button>
        <button class="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg">Go to Listings</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Import any icons or assets as needed
  </script>
  
  <style scoped></style>
  