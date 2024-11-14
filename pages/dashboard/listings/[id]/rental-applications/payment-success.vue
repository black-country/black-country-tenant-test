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
     
 
         <h2 class="text-xl font-semibold text-gray-800 mb-2">Payment Successful</h2>
         <p class="text-sm text-[#667185] mb-4">
            Congratulations! You've successfully made your first payment. Welcome to your new home!
         </p>
     

         <a v-if="route.query.type !== 'cancelled'" href="#" class="text-[#326543] font-semibold underline  text-sm mb-6 inline-block">View lease agreement</a>
    

         <div class="bg-gray-50 text-gray-800 p-4 rounded-md flex items-start mb-6">
  <div>
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.33 22.001H7.66C4.27 22.001 2 19.621 2 16.081V7.90998C2 4.37998 4.27 2.00098 7.66 2.00098H16.33C19.72 2.00098 22 4.37998 22 7.90998V16.081C22 19.621 19.72 22.001 16.33 22.001ZM12.01 14.94C12.48 14.94 12.87 15.331 12.87 15.81C12.87 16.3 12.48 16.69 11.99 16.69C11.51 16.69 11.12 16.3 11.12 15.81C11.12 15.331 11.51 14.94 12.01 14.94ZM11.13 8.21997C11.13 7.73997 11.52 7.34997 12.01 7.34997C12.49 7.34997 12.88 7.73997 12.88 8.21997V12.64C12.88 13.121 12.49 13.52 12.01 13.52C11.52 13.52 11.13 13.121 11.13 12.64V8.21997Z" fill="#4A71E0"/>
    </svg>
  </div>
  
        <div class="ml-3">
          <h2 class="font-medium text-[#1D2939] text-lg text-start">Move-In Procedures</h2>
          <ol class="text-gray-700 mt-2 space-y-4 text-start">
            <li class="text-[#667185] font-light"><strong class="text-[#1D2739]">Move-in date:</strong> Schedule a move-in date.</li>
            <li class="text-[#667185] font-light"><strong class="text-[#1D2739]">Key Collection:</strong> Head to <span class="text-blue-600">[Location]</span> or <a href="#" class="text-[#326543] font-semibold underline">contact property manager</a> to collect your keys on the scheduled move-in date.</li>
            <li class="text-[#667185] font-light"><strong class="text-[#1D2739]">Property Access:</strong> Make sure you have the necessary access codes or instructions for entering your new home.</li>
            <li class="text-[#667185] font-light"><strong class="text-[#1D2739]">Inspection:</strong> Take a moment to inspect the property and report any discrepancies using our move-in checklist feature.</li>
            <li class="text-[#667185] font-light"><strong class="text-[#1D2739]">Utilities Setup:</strong> Arrange for utilities such as electricity, water, and internet before your move-in date to ensure a smooth transition.</li>
          </ol>
        </div>
      </div>

     
         <!-- Action Buttons -->
         <div class="space-y-4">
           <button @click="handleNavigation" class="w-full bg-[#292929] text-white text-sm py-4 rounded-md">
            Proceed to schedule move-in date
           </button>
           <button @click="router.push('/dashboard')" class="w-full bg-[#EBE5E0] text-[#292929] font-medium text-sm py-4 rounded-md">
            I’ll do it later
           </button>
         </div>
       </div>

       <!-- <HomeCalendar /> -->
       <!-- <BookingModal :property="property" class="lg:w-4/12 m-6 lg:m-0" /> -->
    </main>
   </template>
   
   <script setup lang="ts">
   const route = useRoute()
   const router = useRouter()
   // No specific script is needed for this static layout.

   const handleNavigation = () => {
     router.push(`/dashboard/listings/${route.params.id}/rental-applications/schedule-movein`)
   }
   </script>
   
   <style scoped>
   /* Add any custom styles if needed */
   </style>
   