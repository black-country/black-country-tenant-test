<template>
<main>
  <div  v-if="!loadingRentals && rentalsList.length" class="max-w-full overflow-x-auto pb-4 mt-3">
    <div class="flex space-x-4">
      <div
        v-for="(property, index) in rentalsList"
        :key="index"
        class="flex-shrink-0 w-64 bg-white rounded-lg overflow-hidden shadow-md"
      >
        <div class="relative">
          <img :src="property.house.images[0]" alt="Property Image" class="w-full h-40 object-cover" />
          <button class="absolute top-2 right-2 rounded-full p-1">
            <img class="w-10 h-10 text-red-600" :src="dynamicIcons(property.like)" />
          </button>
        </div>
        <div class="p-4 space-y-2">
         <div>
          <h3 class="text-sm text-[#1A1A1A] font-medium"> {{ property?.house?.name ?? 'Nil' }}</h3>
          <div class="text-gray-500 text-sm flex items-center gap-x-1">
      <div>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.80885 10.6835C6.59205 10.8865 6.3022 11 6.00055 11C5.6989 11 5.4091 10.8865 5.19225 10.6835C3.20651 8.813 0.54538 6.72345 1.84314 3.68983C2.54482 2.04958 4.22917 1 6.00055 1C7.77195 1 9.4563 2.04958 10.158 3.68983C11.4541 6.71965 8.7995 8.81945 6.80885 10.6835Z" fill="#5B8469" stroke="#5B8469"/>
              <path d="M7.75 5.5C7.75 6.4665 6.9665 7.25 6 7.25C5.0335 7.25 4.25 6.4665 4.25 5.5C4.25 4.5335 5.0335 3.75 6 3.75C6.9665 3.75 7.75 4.5335 7.75 5.5Z" fill="#EAEAEA" stroke="#5B8469"/>
              </svg>
      </div>
                  
              <div class="text-xs">
                  {{ `${property?.house?.address.slice(0, 20)}....` ?? 'Nil' }}
              </div>
          </div>
         </div>
          <p class="text-gray-800 text-sx">{{ property?.house?.bedroomCount ?? 'Nil' }} bedrooms | {{ property?.house?.bathroomCount ?? 'Nil' }} baths | {{ property?.house?.size ?? 'Nil' }} {{ property?.house?.sizeUnit ?? 'Nil' }}</p>
          <p class="text-[#1D2739] text-xs">Availability <span class="text-[#326543] font-medium text-xs">{{ getAvailability(property?.house?.availability) }}</span></p>
        </div>
      </div>
    </div>
  </div>
  <section  class="p-8 max-w-7xl mx-auto" v-else>
    <div class="rounded-md p-4 w-full mx-auto">
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="h-32 bg-slate-200 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-32 w-full bg-slate-200 rounded col-span-2"></div>
              <div class="h-32 w-full bg-slate-200 rounded col-span-1"></div>
            </div>
            <div class="h-32 w-full bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
  </template>
  
  <script setup lang="ts">
import { ref } from "vue";
import { dynamicImage, dynamicIcons } from "@/utils/assets";
import { useGetRentals  } from '@/composables/modules/rentals/fetchAllRentals'
  const { loadingRentals, rentalsList } = useGetRentals()

  const getAvailability = (item) => {
  const availabilityMap = {
    'unavailable': 'Un Available',
    'available_now': 'Now',
    'available_from_date': 'Available Later'
  }

  return availabilityMap[item] || 'Unknown'; // Return 'Unknown' if the key doesn't exist
}

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
  