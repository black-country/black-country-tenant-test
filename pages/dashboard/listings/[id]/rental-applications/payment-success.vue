<template>
    <main class="">
     <div class="bg-white rounded-lg  p-6 max-w-lg mx-auto text-center mt-20">
         <!-- Success Icon -->
         <div class="bg-green-100 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
           <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect x="0.923828" width="63.1513" height="64" rx="31.5756" fill="#0F973D"/>
               <path d="M44.1626 32.3596C44.1626 25.7418 38.7977 20.377 32.1799 20.377C25.5621 20.377 20.1973 25.7418 20.1973 32.3596C20.1973 38.9774 25.5621 44.3423 32.1799 44.3423C38.7977 44.3423 44.1626 38.9774 44.1626 32.3596Z" stroke="white" stroke-width="1.7974"/>
               <path d="M27.584 32.9633L30.5297 35.9839L37.0103 28.7344" stroke="white" stroke-width="1.7974" stroke-linecap="round" stroke-linejoin="round"/>
               </svg> 
         </div>
     
         <!-- Message Heading -->
         <h2 class="text-xl font-semibold text-gray-800 mb-2">Payment Successful</h2>
         <p class="text-sm text-[#667185] mb-4">
            Congratulations! You've successfully made your first payment. Welcome to your new home!
         </p>
     
         <!-- View Lease Agreement Link -->
         <a v-if="route.query.type !== 'cancelled'" href="#" class="text-[#326543] font-semibold underline  text-sm mb-6 inline-block">View lease agreement</a>
     
         <!-- Notification Box -->
         <div class="bg-gray-50  text-gray-800 p-4 rounded-md flex items-start mb-6">
          <div>
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" clip-rule="evenodd" d="M16.33 22.001H7.66C4.27 22.001 2 19.621 2 16.081V7.90998C2 4.37998 4.27 2.00098 7.66 2.00098H16.33C19.72 2.00098 22 4.37998 22 7.90998V16.081C22 19.621 19.72 22.001 16.33 22.001ZM12.01 14.94C12.48 14.94 12.87 15.331 12.87 15.81C12.87 16.3 12.48 16.69 11.99 16.69C11.51 16.69 11.12 16.3 11.12 15.81C11.12 15.331 11.51 14.94 12.01 14.94ZM11.13 8.21997C11.13 7.73997 11.52 7.34997 12.01 7.34997C12.49 7.34997 12.88 7.73997 12.88 8.21997V12.64C12.88 13.121 12.49 13.52 12.01 13.52C11.52 13.52 11.13 13.121 11.13 12.64V8.21997Z" fill="#4A71E0"/>
               </svg>
          </div>
               
           <p class="text-xs text-start ml-3">
             Don't forget to make arrangements for your first rent payment according to the terms outlined in the agreement.
             Should you have any questions or need further assistance, please don't hesitate to reach out to your new property manager.
           </p>
         </div>
     
         <!-- Action Buttons -->
         <div class="space-y-4">
           <button v-if="route.query.type !== 'cancelled'" class="w-full bg-[#292929] text-white text-sm py-4 rounded-md">
             Proceed to make payment
           </button>
              <button @click="router.push('/dashboard/listings')" v-else class="w-full bg-[#292929] text-white text-sm py-4 rounded-md">
               Continue to search new listings
           </button>
           <button @click="router.push('/dashboard')" class="w-full bg-[#EBE5E0] text-[#292929] font-medium text-sm py-4 rounded-md">
             I'll pay later
           </button>
         </div>
       </div>
    </main>
   </template>
   
   <script setup lang="ts">
   const route = useRoute()
   const router = useRouter()
   // No specific script is needed for this static layout.
   </script>
   
   <style scoped>
   /* Add any custom styles if needed */
   </style>
   