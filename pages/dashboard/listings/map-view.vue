<!-- <template>
  <div class="relative h-screen w-full">
    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-4 items-center">
      <input
        type="text"
        placeholder="Search"
        class="bg-white shadow-md rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button class="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.321 5.321a2 2 0 00-.586 1.414V17a1 1 0 01-.293.707l-2 2A1 1 0 0110 19v-4.586a2 2 0 00-.586-1.414L4.293 6.707A1 1 0 014 6V4z"
          />
        </svg>
      </button>
    </div>
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126746.26575699888!2d3.245361318263777!3d6.548376092354154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf50b720d9075%3A0xdee5fa622bdf4e93!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1630942124939!5m2!1sen!2sng"
      width="100%"
      height="100
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      class="absolute top-0 left-0 w-full h-full rounded-md"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template> -->


<template>
  <div class="relative h-screen w-full">
    <!-- Search Bar and Filter Icon at the top center -->
    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-4 items-center">
      <!-- Search Bar -->
      <input
        v-model="searchQuery"
        @input="handleSearchInput"
        type="text"
        placeholder="Search"
        class="bg-white shadow-md rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <!-- Filter Icon -->
      <button class="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.321 5.321a2 2 0 00-.586 1.414V17a1 1 0 01-.293.707l-2 2A1 1 0 0110 19v-4.586a2 2 0 00-.586-1.414L4.293 6.707A1 1 0 014 6V4z"
          />
        </svg>
      </button>
    </div>

    <!-- Map Iframe -->
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126746.26575699888!2d3.245361318263777!3d6.548376092354154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf50b720d9075%3A0xdee5fa622bdf4e93!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1630942124939!5m2!1sen!2sng"
      width="100%"
      height="100%"
      style="border:0;"
      allowfullscreen=""
      loading="lazy"
      class="absolute top-0 left-0 w-full h-full rounded-md"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>

    <!-- Search Results Modal (shown when the user types in the search input) -->
    <div v-if="searchQuery" class="absolute inset-0 flex justify-center items-center z-20">
      <div class="bg-white rounded-lg p-4 shadow-lg w-96">
        <div class="relative">
          <!-- Property Image -->
          <img :src="property.image" alt="Property" class="rounded-t-lg w-full" />

          <!-- Save Search Button -->
          <button
            class="absolute top-0 right-0 mt-2 mr-2 bg-black text-white rounded-md px-4 py-1"
          >
            Save search
          </button>
        </div>
        <div class="p-4">
          <h3 class="text-xl font-semibold">{{ property.name }}</h3>
          <p class="text-gray-600">{{ property.address }}</p>
          <p class="font-semibold mt-2">₦ {{ property.price }} <span class="text-gray-500">Per month</span></p>
          <p class="text-sm text-gray-500">{{ property.bedrooms }} bedrooms | {{ property.bathrooms }} baths | {{ property.size }} sqft</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
const property = ref({
  image: '/images/property.jpg', // Use the actual image path
  name: 'Jason Co-living Space',
  address: 'Iconic Tower, off Ajose Adegun VI, Lagos.',
  price: '100,000',
  bedrooms: 5,
  bathrooms: 6,
  size: 5254,
});

const handleSearchInput = () => {
  // Logic for handling search
  console.log('Searching:', searchQuery.value);
};
</script>

<style scoped>
/* Custom styling for the search modal, if necessary */
</style>
