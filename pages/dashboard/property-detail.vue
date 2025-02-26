<template>
    <div class="container mx-auto p-6">
      <!-- Property Images Section -->
      <div class="flex flex-col lg:flex-row gap-6 mb-6">
        <div class="w-full lg:w-1/3">
          <h1 class="text-3xl font-bold mb-2">Jason Gardens</h1>
          <p class="text-gray-600 mb-4">Iconic Tower, off Ajose Adegun VI, Lagos.</p>
          <div class="flex gap-4 mb-4">
            <button class="px-4 py-2 bg-gray-100 rounded-lg shadow">Property Overview</button>
            <button class="px-4 py-2 bg-gray-100 rounded-lg shadow">Common areas</button>
            <button class="px-4 py-2 bg-gray-100 rounded-lg shadow">Room 1</button>
            <button class="px-4 py-2 bg-gray-100 rounded-lg shadow">Room 2</button>
          </div>
          <div class="bg-white p-6 rounded-lg shadow mb-6">
            <h3 class="text-xl font-semibold mb-2">Property Description</h3>
            <p class="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet consectetur. Ut fusce rhoncus eu justo sit. Eget dui proin elit lorem hendrerit. Aliquet dignissim sit sem arcu turpis sit. Fringilla porta tempus pellentesque interdum pellentesque. Viverra molestie consectetur sagittis adipiscing at tristique libero cursus id. Ma...
            </p>
            <a href="#" class="text-blue-500">View more</a>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">Property Highlight</h3>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p class="text-gray-500">Property size</p>
                <p>18632445 sqf</p>
              </div>
              <div>
                <p class="text-gray-500">Flooring type</p>
                <p>Tiles</p>
              </div>
              <div>
                <p class="text-gray-500">Number of bedrooms</p>
                <p>5</p>
              </div>
              <div>
                <p class="text-gray-500">Number of bathrooms/rest rooms</p>
                <p>6</p>
              </div>
              <div>
                <p class="text-gray-500">Floor number</p>
                <p>5</p>
              </div>
              <div>
                <p class="text-gray-500">Architecture</p>
                <p>{{property?.houseType?.name ?? 'Nil'}}</p>
              </div>
              <div>
                <p class="text-gray-500">Co-living with:</p>
                <p>2 Persons</p>
              </div>
            </div>
            <table class="w-full text-left">
              <thead>
                <tr>
                  <th class="py-2">Occupants</th>
                  <th class="py-2">Room occupied</th>
                  <th class="py-2">Available from</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2">Rita</td>
                  <td class="py-2">1</td>
                  <td class="py-2">24/05/2024</td>
                </tr>
                <tr>
                  <td class="py-2">Maxwell</td>
                  <td class="py-2">2</td>
                  <td class="py-2">Not available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Schedule Visit & Similar Properties Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div class="lg:col-span-2">
          <div class="bg-white p-6 rounded-lg shadow mb-6">
            <h3 class="text-xl font-semibold mb-4">Property visitation</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-gray-500">Day</p>
                <p>Monday</p>
              </div>
              <div>
                <p class="text-gray-500">Time</p>
                <p>10:00 AM</p>
              </div>
              <div>
                <p class="text-gray-500">Day</p>
                <p>Tuesday</p>
              </div>
              <div>
                <p class="text-gray-500">Time</p>
                <p>10:00 AM</p>
              </div>
              <div>
                <p class="text-gray-500">Day</p>
                <p>Wednesday</p>
              </div>
              <div>
                <p class="text-gray-500">Time</p>
                <p>10:00 AM</p>
              </div>
            </div>
            <button class="mt-6 w-full px-4 py-2 bg-black text-white rounded-md">Schedule a visit</button>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-semibold mb-4">House Rules</h3>
            <ul class="list-disc pl-5 text-gray-700">
              <li>Smoking not allowed</li>
              <li>Pets allowed</li>
              <li>Other rules</li>
            </ul>
            <p class="mt-4 text-gray-700">Lorem ipsum dolor sit amet consectetur. Tincidunt nullam et imperdiet congue. Aliquam mauris nec velit proin. Aliquam tristique sed aliquam tempor. Amet turpis ac sed in massa.</p>
          </div>
        </div>
        <div class="lg:col-span-1">
          <div class="bg-white p-6 rounded-lg shadow mb-6">
            <h3 class="text-xl font-semibold mb-4">Neighborhood Amenities</h3>
            <div class="flex gap-2 mb-4">
              <button class="px-4 py-2 bg-gray-100 rounded-lg">Hospital</button>
              <button class="px-4 py-2 bg-gray-100 rounded-lg">Schools</button>
              <button class="px-4 py-2 bg-gray-100 rounded-lg">Market/Shopping Plaza</button>
              <button class="px-4 py-2 bg-gray-100 rounded-lg">Police Station</button>
            </div>
            <div class="space-y-4">
              <div>
                <p class="text-gray-600">Glory International Prim/Sec School</p>
                <p class="text-gray-500">10521 Veterans Ademola way</p>
                <p class="text-gray-500">Public school</p>
                <p class="text-gray-500">20 min drive</p>
              </div>
              <div>
                <p class="text-gray-600">Glory International Prim/Sec School</p>
                <p class="text-gray-500">10521 Veterans Ademola way</p>
                <p class="text-gray-500">Public school</p>
                <p class="text-gray-500">20 min drive</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow">
            <div class="flex items-center mb-4">
              <!-- <img src="/path/to/manager-photo.jpg" alt="Manager" class="h-12 w-12 rounded-full mr-4"/> -->
              <div>
                <p class="font-semibold">Joy Adetunji</p>
                <p class="text-gray-500">Property Manager</p>
              </div>
              <button class="ml-auto px-4 py-2 bg-green-500 text-white rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20l9-5-9-5-9 5 9 5zM12 12V4m0 8l9 5-9-5z" />
                </svg>
              </button>
            </div>
            <button class="w-full px-4 py-2 bg-black text-white rounded-md">Send application</button>
          </div>
        </div>
      </div>
  
      <!-- Similar Properties Section -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-xl font-semibold mb-6">Similar Properties</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="property in similarProperties" :key="property.id" class="bg-white p-4 rounded-lg shadow">
            <!-- <img :src="property.image" alt="Property" class="w-full h-48 object-cover rounded-lg mb-4" /> -->
            <p class="text-lg font-semibold">{{ property.name }}</p>
            <p class="text-gray-500">{{ property.location }}</p>
            <p class="text-gray-500">{{ property.size }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Similar properties data
  const similarProperties = ref([
    {
      id: 1,
      name: 'Jason Co-living Space',
      location: 'Iconic Tower, off Ajose Adegun VI, Lagos.',
      size: '5 bedrooms | 6 baths | 5254 sqft',
      image: '/path/to/property1.jpg',
    },
    // Add more properties as needed
  ]);

  definePageMeta({
  middleware: "auth",
});
  </script>
  
  <style scoped>
  /* Add additional styles if needed */
  </style>
  