<template>
  <section class="">
       <div class="pt-3 rounded-lg">
     
         <section class="mb-6" v-if="loading && !upcomingActivitiesList?.length">
         <div class="animate-pulse flex space-x-4 h-44 bg-slate-200 rounded"></div>
          </section>
          <div v-else-if="!loading && upcomingActivitiesList?.length">
           <div @click="router.push(`/dashboard/transaction/${activity.id}/maintenance-request`)" v-for="activity in upcomingActivitiesList" :key="activity.id"
             class="flex justify-between cursor-pointer items-center bg-white p-4 rounded-lg mb-2">
             <div class="flex items-center gap-x-3">
               <div class="flex items-center gap-x-3">
                 <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <rect x="1" y="1" width="48" height="48" rx="24" fill="white" />
                   <rect x="1" y="1" width="48" height="48" rx="24" stroke="#F9FAFB" />
                   <rect x="3" y="3" width="44" height="44" rx="22" fill="#F0F5FD" />
                   <path
                     d="M27.9168 22.0835C28.06 22.1044 28.1992 22.1306 28.3335 22.1616C28.5798 22.2185 28.703 22.2469 28.8506 22.3647C28.9347 22.4319 29.0398 22.5648 29.086 22.6626C29.1668 22.8339 29.1668 23.0001 29.1668 23.3324V27.8585C29.1668 28.2722 28.7335 28.5565 28.3335 28.4641C27.9503 28.3755 27.5276 28.3265 27.0835 28.3265C26.2847 28.3265 25.5554 28.4852 25.0002 28.7467C24.445 29.0082 23.7156 29.1668 22.9168 29.1668C22.4727 29.1668 22.05 29.1178 21.6668 29.0293C21.4205 28.9724 21.2973 28.9439 21.1497 28.8262C21.0656 28.759 20.9605 28.626 20.9144 28.5283C20.8335 28.357 20.8335 28.1908 20.8335 27.8585V23.3324C20.8335 22.9186 21.2668 22.6344 21.6668 22.7268C21.8011 22.7578 21.9403 22.784 22.0835 22.8049"
                     stroke="#6A9AEB" stroke-linecap="round" />
                   <path
                     d="M26.0418 25.6252C26.0418 26.2005 25.5755 26.6668 25.0002 26.6668C24.4249 26.6668 23.9585 26.2005 23.9585 25.6252C23.9585 25.0499 24.4249 24.5835 25.0002 24.5835C25.5755 24.5835 26.0418 25.0499 26.0418 25.6252Z"
                     fill="white" stroke="#6A9AEB" />
                   <path d="M22.2915 26.0415V26.0453" stroke="#6A9AEB" stroke-linecap="round"
                     stroke-linejoin="round" />
                   <path d="M27.7085 25.2051V25.2088" stroke="#6A9AEB" stroke-linecap="round"
                     stroke-linejoin="round" />
                   <path d="M25.0002 20.8335V22.5002M23.3335 22.0835V22.9168M26.6668 21.2502V22.0835"
                     stroke="#6A9AEB" stroke-linecap="round" />
                 </svg>
                 <div>
                   <h4 class="font-medium text-[#1D2739] text-sm">{{ activity?.description ?? 'Nil' }}</h4>
                   <p class="text-sm text-[#667185]">
                     {{  moment(activity?.date).format("MMMM Do YYYY, hh:mm A") ?? 'Nil' }}
                   </p>
                 </div>
               </div>
             </div>
             <span class="text-xs font-semibold rounded-full text-[#DD900D] bg-[#FEF6E7] px-3 py-1">{{
               activity.status }}</span>
           </div>
         </div>
         <div v-else class="text-center text-gray-500 py-12 bg-white rounded-lg">
           <img src="@/assets/icons/event-illustrations.svg" alt="No events" class="mx-auto mb-2" />
           <p>No Upcoming activities found</p>
         </div>
       </div>
     </section>
</template>

<script setup lang="ts">
import moment from "moment";
import { useFetchUpcomingActivities } from '@/composables/modules/settings/useFetchUpcomingActivities'
const { loading, upcomingActivitiesList } = useFetchUpcomingActivities()

const router = useRouter()
</script>