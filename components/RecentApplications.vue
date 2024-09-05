<template>
    <div class="max-w-full overflow-x-auto pb-4 mt-3">
      <div class="flex space-x-4">
        <div
          v-for="(property, index) in properties"
          :key="index"
          class="flex-shrink-0 w-64 bg-white rounded-lg overflow-hidden shadow-md"
        >
          <div class="relative">
            <img :src="dynamicImage(property.image)" alt="Property Image" class="w-full h-40 object-cover" />
            <button class="absolute top-2 right-2 rounded-full p-1">
              <img class="w-10 h-10 text-red-600" :src="dynamicIcons(property.like)" />
            </button>
          </div>
          <div class="p-4 space-y-2">
           <div>
            <h3 class="text-base text-[#1A1A1A] font-medium">{{ property.name }}</h3>
            <div class="text-gray-500 text-sm flex items-center gap-x-1">
        <div>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.80885 10.6835C6.59205 10.8865 6.3022 11 6.00055 11C5.6989 11 5.4091 10.8865 5.19225 10.6835C3.20651 8.813 0.54538 6.72345 1.84314 3.68983C2.54482 2.04958 4.22917 1 6.00055 1C7.77195 1 9.4563 2.04958 10.158 3.68983C11.4541 6.71965 8.7995 8.81945 6.80885 10.6835Z" fill="#5B8469" stroke="#5B8469"/>
                <path d="M7.75 5.5C7.75 6.4665 6.9665 7.25 6 7.25C5.0335 7.25 4.25 6.4665 4.25 5.5C4.25 4.5335 5.0335 3.75 6 3.75C6.9665 3.75 7.75 4.5335 7.75 5.5Z" fill="#EAEAEA" stroke="#5B8469"/>
                </svg>
        </div>
                    
                <div class="text-xs">
                    {{ property.location }}
                </div>
            </div>
           </div>
            <p class="text-gray-800 text-sm">{{ property.details }}</p>
            <p class="text-[#1D2739] text-sm">{{ property.availability }} <span class="text-[#326543] font-medium text-sm">{{ property.urgency }}</span></p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { ref } from "vue";
import { dynamicImage, dynamicIcons } from "@/utils/assets";

const properties = ref([
  {
    image: "property1.png",
    name: "Jason Co-living Space",
    location: "Iconic Tower, off Ajose Adegun VI...",
    details: "5 bedrooms | 6 baths | 5254 sqft",
    availability: "2 rooms available",
    urgency: 'Now',
    like: "gray-love",
  },
  {
    image: "property2.png",
    name: "Jason Co-living Space",
    location: "Iconic Tower, off Ajose Adegun VI...",
    details: "5 bedrooms | 6 baths | 5254 sqft",
    availability: "2 rooms available",
    urgency: 'Now',
    urgency: 'Now',
    like: "gray-love",
  },
  {
    image: "property1.png",
    name: "Jason Co-living Space",
    location: "Iconic Tower, off Ajose Adegun VI...",
    details: "5 bedrooms | 6 baths | 5254 sqft",
    availability: "2 rooms available",
    urgency: 'Now',
    like: "red-love",
  },
  {
    image: "property2.png",
    name: "Jason Co-living Space",
    location: "Iconic Tower, off Ajose Adegun VI...",
    details: "5 bedrooms | 6 baths | 5254 sqft",
    availability: "2 rooms available",
    urgency: 'Now',
    like: "gray-love",
  },
]);
</script>
  
  <style scoped>
/* Hide the physical scrollbar */
::-webkit-scrollbar {
  display: none;
}
</style>
  