<template>
    <div class="container mx-auto py-8">
      <!-- Property Images Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <div>
          <img :src="dynamicImage(mainImage)" alt="Main Image" class="rounded-lg w-full" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <img :src="dynamicImage(secondaryImage1)" alt="Image 2" class="rounded-lg w-full" />
          <img :src="dynamicImage(secondaryImage2)" alt="Image 3" class="rounded-lg w-full" />
          <img :src="dynamicImage(secondaryImage3)" alt="Image 4" class="rounded-lg w-full" />
          <div class="relative">
            <img :src="dynamicImage(secondaryImage4)" alt="Image 5" class="rounded-lg w-full" />
            <div
              class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-lg font-bold rounded-lg"
            >
              View all +12
            </div>
          </div>
        </div>
      </div>
  
      <!-- Property Title and Address -->
      <div class="mb-6">
        <h1 class="text-3xl font-semibold">Jason Gardens</h1>
        <p class="text-gray-500">
          <span class="flex items-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.07847 14.2443C8.7894 14.515 8.40293 14.6663 8.00073 14.6663C7.59853 14.6663 7.21213 14.515 6.923 14.2443C4.27535 11.7503 0.727174 8.96427 2.45751 4.91945C3.39309 2.73245 5.63889 1.33301 8.00073 1.33301C10.3626 1.33301 12.6084 2.73245 13.544 4.91945C15.2721 8.95921 11.7327 11.7589 9.07847 14.2443Z" fill="#5B8469" stroke="#5B8469"/>
              <path d="M10.3337 7.33333C10.3337 8.622 9.28899 9.66667 8.00033 9.66667C6.71166 9.66667 5.66699 8.622 5.66699 7.33333C5.66699 6.04467 6.71166 5 8.00033 5C9.28899 5 10.3337 6.04467 10.3337 7.33333Z" fill="white" stroke="#5B8469"/>
              </svg>
            Iconic Tower, off Ajose Adegun VI, Lagos.
          </span>
        </p>
      </div>
  
      <!-- Tabs for Property Overview -->
      <div class="mb-6">
        <nav class="flex space-x-4">
          <button class="text-gray-800 py-2 px-4 bg-gray-100 rounded-md">Property Overview</button>
          <button class="text-gray-800 py-2 px-4 bg-gray-100 rounded-md">Common areas</button>
          <button class="text-gray-800 py-2 px-4 bg-gray-100 rounded-md">Room 1</button>
          <button class="text-gray-800 py-2 px-4 bg-gray-100 rounded-md">Room 2</button>
        </nav>
      </div>
  
      <!-- Property Description -->
      <div class="mb-6">
        <h2 class="text-xl font-semibold">Property Description</h2>
        <p class="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet consectetur. Ut fusce rhoncus eu justo sit. Eget dui
          proin elit lorem hendrerit. Aliquet dignissim sit sem arcu turpis sit.
        </p>
      </div>
  
      <!-- Property Highlights -->
      <div class="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="bg-white shadow-md rounded-lg p-4">
          <h2 class="text-lg font-semibold mb-4">Property Highlights</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-gray-500">Property size</p>
              <p class="font-semibold">18632345 sqf</p>
            </div>
            <div>
              <p class="text-gray-500">Flooring type</p>
              <p class="font-semibold">Tiles</p>
            </div>
            <div>
              <p class="text-gray-500">Number of bedrooms</p>
              <p class="font-semibold">5</p>
            </div>
            <div>
              <p class="text-gray-500">Number of bathrooms</p>
              <p class="font-semibold">6</p>
            </div>
            <div>
              <p class="text-gray-500">Co-living with:</p>
              <p class="font-semibold">2 persons</p>
            </div>
          </div>
        </div>
  
        <!-- Property Manager Section -->
        <div class="bg-white shadow-md rounded-lg p-4">
          <div class="flex items-center space-x-4">
            <img :src="propertyManagerImage" class="h-12 w-12 rounded-full" />
            <div>
              <h2 class="text-lg font-semibold">Joy Adetunji</h2>
              <p class="text-gray-500">Property Manager</p>
            </div>
            <div class="ml-auto flex space-x-2">
              <button class="bg-gray-200 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <button class="bg-gray-200 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8a6 6 0 11-12 0 6 6 0 0112 0z" />
                </svg>
              </button>
            </div>
          </div>
          <button class="bg-black text-white w-full py-3 rounded-md mt-4">Send application</button>
        </div>
      </div>
  
      <!-- Neighborhood Amenities -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold">Neighborhood Amenities</h2>
        <div class="flex space-x-4 mt-4">
          <button class="bg-gray-100 text-gray-600 py-2 px-4 rounded-md">Hospital</button>
          <button class="bg-gray-100 text-gray-600 py-2 px-4 rounded-md">Schools</button>
          <button class="bg-gray-100 text-gray-600 py-2 px-4 rounded-md">Market</button>
          <button class="bg-gray-100 text-gray-600 py-2 px-4 rounded-md">Police Station</button>
        </div>
        <!-- Neighborhood Items -->
        <div class="mt-6 bg-white shadow-md rounded-lg p-4">
          <p class="text-gray-600">Glory International Prim/Sec School - 20 min drive</p>
          <p class="text-gray-600">Glory International Prim/Sec School - 20 min drive</p>
        </div>
      </div>
  
      <!-- Similar Properties -->
      <div class="mb-6">
        <h2 class="text-lg font-semibold">Similar Properties</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div v-for="property in similarProperties" :key="property.id" class="bg-white shadow-md rounded-lg overflow-hidden">
            <img :src="property.image" alt="Property Image" class="w-full h-40 object-cover" />
            <div class="p-4">
              <h3 class="font-semibold">{{ property.name }}</h3>
              <p class="text-gray-500">{{ property.address }}</p>
              <p class="font-semibold mt-2">₦ {{ property.price }} <span class="text-gray-500">Per month</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { dynamicImage } from "@/utils/assets";
  
  // Property Images
  const mainImage = ref('property1.png');
  const secondaryImage1 = ref('property1.png');
  const secondaryImage2 = ref('property1.png');
  const secondaryImage3 = ref('property1.png');
  const secondaryImage4 = ref('property1.png');
  
  // Property Manager
  const propertyManagerImage = ref('/images/manager.jpg');
  
  // Similar Properties
  const similarProperties = ref([
    {
      id: 1,
      image: '/images/property_similar_1.jpg',
      name: 'Jason Co-living Space',
      address: 'Iconic Tower, off Ajose Adegun VI, Lagos.',
      price: '100,000',
    },
    {
      id: 2,
      image: '/images/property_similar_2.jpg',
      name: 'Jason Co-living Space',
      address: 'Iconic Tower, off Ajose Adegun VI, Lagos.',
      price: '100,000',
    },
    {
      id: 3,
      image: '/images/property_similar_3.jpg',
      name: 'Jason Co-living Space',
      address: 'Iconic Tower, off Ajose Adegun VI, Lagos.',
      price: '100,000',
    },
    {
      id: 4,
      image: '/images/property_similar_4.jpg',
      name: 'Jason Co-living Space',
      address: 'Iconic Tower, off Ajose Adegun VI, Lagos.',
      price: '100,000',
    },
  ]);
  </script>
  
  <style scoped>
  /* Additional styling for specific elements can be added here */
  </style>
  