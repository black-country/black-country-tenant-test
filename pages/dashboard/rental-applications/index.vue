<template>
   <main>
    <TopNavBar />
    <div v-if="!loadingRentals && rentalsList.length" class="p-8 max-w-5xl mx-auto">
      <div class="flex items-center justify-between py-4  bg-white">
        <div class="flex items-center space-x-2">
          <a href="#" class="text-gray-500">Dashboard</a>
          <span class="text-gray-300">|</span>
          <span class="font-semibold text-gray-900">Rental Application</span>
        </div>
        <div class="flex items-center space-x-4">
          <button class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
                <path d="M25.5 13.4165C25.5 14.7972 24.3807 15.9165 23 15.9165C21.6192 15.9165 20.5 14.7972 20.5 13.4165C20.5 12.0358 21.6192 10.9165 23 10.9165C24.3807 10.9165 25.5 12.0358 25.5 13.4165Z" stroke="#1D2739" stroke-width="1.5"/>
                <path d="M15.5 18C15.5 19.3807 14.3807 20.5 13 20.5C11.6193 20.5 10.5 19.3807 10.5 18C10.5 16.6192 11.6193 15.5 13 15.5C14.3807 15.5 15.5 16.6192 15.5 18Z" stroke="#1D2739" stroke-width="1.5"/>
                <path d="M25.5 22.5835C25.5 23.9642 24.3807 25.0835 23 25.0835C21.6192 25.0835 20.5 23.9642 20.5 22.5835C20.5 21.2027 21.6192 20.0835 23 20.0835C24.3807 20.0835 25.5 21.2027 25.5 22.5835Z" stroke="#1D2739" stroke-width="1.5"/>
                <path d="M15.2734 16.958L20.6901 14.4585M15.2734 19.0418L20.6901 21.5414" stroke="#1D2739" stroke-width="1.5"/>
                </svg>
                
          </button>
          <button class="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
                <path d="M24.2192 11.3285C21.9844 9.95769 20.034 10.5101 18.8623 11.39C18.3818 11.7508 18.1417 11.9312 18.0003 11.9312C17.859 11.9312 17.6188 11.7508 17.1383 11.39C15.9667 10.5101 14.0162 9.95769 11.7815 11.3285C8.84872 13.1275 8.18509 19.0624 14.9499 24.0695C16.2384 25.0232 16.8827 25.5 18.0003 25.5C19.118 25.5 19.7622 25.0232 21.0507 24.0695C27.8156 19.0624 27.1519 13.1275 24.2192 11.3285Z" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                
          </button>
        </div>
      </div>
      <div class="overflow-x-auto scrollbar-hidden mb-6">
        <div class="flex space-x-4 whitespace-nowrap">
          <button
            v-for="filter in filters"
            :key="filter.value"
            @click="setActiveFilter(filter.value)"
            :class="[
              'px-4 py-2.5 rounded-lg text-sm',
              activeFilter === filter.value ? 'bg-[#5B8469] text-white' : 'text-[#1D2739] bg-[#F0F2F5]'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div  v-for="rental in filteredRentals"
         @click="handleSelectedRental(rental)"
        :key="rental.id" class="max-w-sm cursor-pointer rounded-lg overflow-hidden h-96 shadow-lg relative">
            <!-- Image Section -->
            <img v-if="rental?.house?.images" :src="rental?.house?.images[0]" alt="Living Room" class="w-full h-96 object-cover rounded-t-lg" />
          
            <!-- Text Overlay with Transparent Background -->
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-black/50 m-2 rounded-b-lg">
              <!-- Property Title -->
              <div class="flex justify-between items-center pb-2">
                <h3 class="text-white font-semibold">{{rental?.house?.name}}</h3>
                <span class="text-white font-medium text-base">{{formatCurrency(rental?.room?.rentAmount)}}</span>
             </div>
          
              <!-- Address with Location Icon -->
              <p class="text-[#E4E7EC] text-xs flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 4.41 4.15 10.04 6.17 12.32a.999.999 0 0 0 1.66 0C14.85 19.04 19 13.41 19 9c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5 0 3.06-2.94 7.19-5 9.88C9.94 16.19 7 12.06 7 9c0-2.76 2.24-5 5-5zm0 2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" clip-rule="evenodd"/>
                </svg>
                <span>{{rental?.house?.address.slice(0, 30)}}...</span>
              </p>
          
              <!-- Price and Status -->
              <div class="flex justify-between items-center mt-2">          
                <!-- Status Badge with Light Background -->
                <span v-if="rental.status === 'PENDING'" class="bg-[#E7F6EC] text-[#099137] text-xs px-2 py-2 rounded-full flex items-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="3" fill="#099137"/>
                      </svg>                        
                Application sent
              </span>
                <span v-if="rental.status === 'APPROVED'" class="bg-[#E7F6EC] text-[#099137] text-xs px-2 py-2 rounded-full flex items-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="3" fill="#099137"/>
                        </svg>                        
                  Approved application
                </span>
                <span v-if="rental.status === 'CANCELLED'" class="bg-[#F9FAFB] text-[#1D2739] text-xs px-2 py-2 rounded-full flex items-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="3" fill="#1D2739"/>
                        </svg>
                                               
                  Cancelled
                </span>
                <span v-if="rental.status === 'REJECTED'" class="bg-[#FBEAE9] text-[#BA110B] text-xs px-2 py-2 rounded-full flex items-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="3" fill="#BA110B"/>
                        </svg>
                                               
                  Rejected
                </span>
                <span v-if="rental.status === 'Scheduled visitation'" class="bg-[#FEF6E7] text-[#DD900D] text-xs px-2 py-2 rounded-full flex items-center">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="4" cy="4" r="3" fill="#DD900D"/>
                        </svg>
                        
                                               
                        Scheduled visitation
                </span>
              </div>
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
  import rentalHome from '@/assets/img/rental-home.png'
  import { useGetRentals  } from '@/composables/modules/rentals/fetchAllRentals'
  const { loadingRentals, rentalsList } = useGetRentals()
const router = useRouter()

interface Rental {
  id: number;
  title: string;
  address: string;
  price: number;
  image: string;
  status: string;
}
// const loadingRentals = ref(false) as any

const handleSelectedRental = (item) => {
   if(item.status === 'Scheduled visitation'){
     router.push(`/dashboard/listings/${item?.house?.id}/rental-applications/details?type=scheduled?rentalId=${item?.id}`)
   } else {
    router.push(`/dashboard/listings/${item?.house?.id}/rental-applications/details?rentalId=${item?.id}`)
   }
}

const formatCurrency = (amount: number | undefined) => {
  if (!amount) return '₦0'; // Return ₦0 if the amount is undefined or falsy
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
};

const filters = ref([
  { label: 'All', value: 'all' },
  { label: 'Scheduled visitation', value: 'Scheduled visitation' },
  { label: 'Sent application', value: 'PENDING' },
  { label: 'Accepted', value: 'APPROVED' },
  { label: 'Rejected', value: 'REJECTED' },
  { label: 'Cancelled', value: 'CANCELLED' },
]);

const activeFilter = ref('all');

const setActiveFilter = (filter: string) => {
  activeFilter.value = filter;
};

const filteredRentals = computed(() => {
  if (activeFilter.value === 'all') {
    return rentalsList.value;
  }
  return rentalsList.value.filter((rental) => rental.status === activeFilter.value);
});
</script>


<style scoped>
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.scrollbar-hidden {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>