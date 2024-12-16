<!-- <template>
<main>
  <div  v-if="!loadingRentals && rentalsList.length" class="max-w-full overflow-x-auto pb-4 mt-3">
    <div class="flex space-x-4">
      <div
        v-for="(property, index) in filteredRentalApplications"
        :key="index"
        class="flex-shrink-0 cursor-pointer w-64 bg-white rounded-lg overflow-hidden shadow-md"
      >
        <div v-if="property?.house?.images" class="relative">
          <img :src="property?.house?.images[0]" alt="Property Image" class="w-full h-40 object-cover" />
          <CoreBookmark :property="property" />
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
  <section  class="max-w-7xl mx-auto mb-10" v-else-if="loadingRentals && !rentalsList?.length">
    <div class="rounded-md w-full mx-auto">
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="h-32 bg-slate-200 rounded"></div>
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

const filteredRentalApplications = computed(() => {
  return rentalsList.value.filter((application: any) => application.status !== 'RENT_ACTIVE');
});
</script>
  
  <style scoped>
/* Hide the physical scrollbar */
::-webkit-scrollbar {
  display: none;
}
</style>
   -->

   <template>
    <main>
      <div v-if="!loadingRentals && filteredRentalApplications.length" class="max-w-full overflow-x-auto pb-4 mt-3">
        <div class="relative">
          <div class="flex space-x-4">
            <div
             @click="viewRentalApplication(property)"
              v-for="(property, index) in displayedRentalApplications"
              :key="index"
              
              class="flex-shrink-0 cursor-pointer w-64 bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div v-if="property?.house?.images" class="relative">
                <img :src="property?.house?.images[0]" alt="Property Image" class="w-full h-40 object-cover" />
                <CoreBookmark :property="property" />
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
  
          <!-- Backward Button -->
          <button 
            @click="prevPage" 
            :disabled="currentPage === 0" 
            class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
          >
            ←
          </button>
  
          <!-- Forward Button -->
          <button 
            @click="nextPage" 
            :disabled="currentPage + pageSize >= filteredRentalApplications.length" 
            class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10"
          >
            →
          </button>
        </div>
      </div>
  
      <!-- Loading State -->
      <section class="max-w-7xl mx-auto mb-10" v-else-if="loadingRentals && !filteredRentalApplications.length">
        <div class="rounded-md w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-6 py-1">
              <div class="h-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Empty State -->
      <div v-else class="bg-white px-4 py-5 sm:p-6 h-80 rounded-lg flex flex-col mt-3 gap-y-4 justify-center border items-center border-gray-50">
        <img :src="dynamicIcons('leases-empty-state')" alt="leases empty state" />
        <p class="text-[#1D2739]">No rental applications available</p>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { dynamicImage, dynamicIcons } from "@/utils/assets";
  import { useGetRentals } from '@/composables/modules/rentals/fetchAllRentals'
  import { useBookmarkProperty } from "@/composables/modules/property/bookmark";
  import { computed, ref } from 'vue';
  
  const { bookmarkProperty, loading } = useBookmarkProperty();
  const { loadingRentals, rentalsList } = useGetRentals()
  
  // Pagination state
  const currentPage = ref(0);
  const pageSize = 5; // Number of items to display per page
  
  // Filtered rental applications
  const filteredRentalApplications = computed(() => {
    return rentalsList.value.filter((application: any) => application.status !== 'RENT_ACTIVE');
  });
  
  // Calculate displayed items based on pagination
  const displayedRentalApplications = computed(() => {
    const start = currentPage.value * pageSize;
    const end = start + pageSize;
    return filteredRentalApplications.value.slice(start, end);
  });
  
  // Function to handle next page (forward)
  const nextPage = () => {
    if (currentPage.value + pageSize < filteredRentalApplications.value.length) {
      currentPage.value++;
    }
  };
  
  // Function to handle previous page (backward)
  const prevPage = () => {
    if (currentPage.value > 0) {
      currentPage.value--;
    }
  };
  
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
  
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    z-index: 10;
  }
  
  button:disabled {
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  button:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  </style>
  