<template>
<main>
  <div  v-if="!loadingRentals && rentalsList.length" class="max-w-full overflow-x-auto pb-4 mt-3">
    <div class="flex space-x-4">
      <div
        v-for="(property, index) in rentalsList"
        :key="index"
        class="flex-shrink-0 cursor-pointer w-64 bg-white rounded-lg overflow-hidden shadow-md"
      >
        <div class="relative">
          <img :src="property.house.images[0]" alt="Property Image" class="w-full h-40 object-cover" />
          <CoreBookmark :property="property" />
          <!-- <button
          @click="toggleLike(property)"
          class="absolute top-3 right-3 text-white hover:text-red-500 focus:outline-none"
        >
          <svg
            v-if="property.bookmarked"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="20" fill="#D42620" />
            <path
              d="M27.4626 11.9942C24.7809 10.3492 22.4404 11.0121 21.0344 12.068C20.4578 12.501 20.1696 12.7174 20 12.7174C19.8304 12.7174 19.5422 12.501 18.9656 12.068C17.5596 11.0121 15.2191 10.3492 12.5374 11.9942C9.01807 14.1529 8.22172 21.2749 16.3395 27.2834C17.8857 28.4278 18.6588 29 20 29C21.3412 29 22.1143 28.4278 23.6605 27.2834C31.7783 21.2749 30.9819 14.1529 27.4626 11.9942Z"
              fill="white"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>

          <svg
            v-else
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="40"
              height="40"
              rx="20"
              fill="black"
              fill-opacity="0.6"
            />
            <path
              d="M27.4626 11.9942C24.7809 10.3492 22.4404 11.0121 21.0344 12.068C20.4578 12.501 20.1696 12.7174 20 12.7174C19.8304 12.7174 19.5422 12.501 18.9656 12.068C17.5596 11.0121 15.2191 10.3492 12.5374 11.9942C9.01807 14.1529 8.22172 21.2749 16.3395 27.2834C17.8857 28.4278 18.6588 29 20 29C21.3412 29 22.1143 28.4278 23.6605 27.2834C31.7783 21.2749 30.9819 14.1529 27.4626 11.9942Z"
              stroke="#F9FAFB"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button> -->
        </div>
        <div @click="viewRentalApplication(property)" class="p-4 space-y-2 cursor-pointer">
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
          <p class="text-gray-800 text-xs">{{ property?.house?.bedroomCount ?? 'Nil' }} bedrooms | {{ property?.house?.bathroomCount ?? 'Nil' }} baths | {{ property?.house?.size ?? 'Nil' }} {{ property?.house?.sizeUnit ?? 'Nil' }}</p>
          <p class="text-[#1D2739] text-xs">Availability <span class="text-[#326543] font-medium text-xs">{{ getAvailability(property?.room?.availability) }}</span></p>
        </div>
      </div>
    </div>
  </div>
  <section  class="p-8 max-w-7xl mx-auto" v-else-if="loadingRentals && !rentalsList.length">
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
  <div v-else
  class="bg-white px-4 py-5 sm:p-6 h-80 rounded-lg flex flex-col mt-3 gap-y-4 justify-center border items-center border-gray-50">
  <img :src="dynamicIcons('leases-empty-state')" alt="leases empty state" class="" />
  <p class="text-[#1D2739]">No rental applications a available </p>
</div>
</main>
  </template>
  
  <script setup lang="ts">
import { dynamicImage, dynamicIcons } from "@/utils/assets";
import { useGetRentals  } from '@/composables/modules/rentals/fetchAllRentals'
import { useBookmarkProperty } from "@/composables/modules/property/bookmark";
const { bookmarkProperty, loading } = useBookmarkProperty();
  const { loadingRentals, rentalsList } = useGetRentals()

  const getAvailability = (item: any) => {
  const availabilityMap = {
    'unavailable': 'Un Available',
    'available_now': 'Now',
    'available_from_date': 'Available Later'
  }

  return availabilityMap[item] || 'Unknown'; // Return 'Unknown' if the key doesn't exist
}

const router = useRouter()

const toggleLike = (property: any) => {
  bookmarkProperty(property.id);
};

const viewRentalApplication = (item: any) => {
   router.push(`/dashboard/listings/${item?.house?.id}/rental-applications/details`)
}
</script>
  
  <style scoped>
/* Hide the physical scrollbar */
::-webkit-scrollbar {
  display: none;
}
</style>
  