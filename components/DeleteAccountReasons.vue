<template>
    <TopNavBar />
         <div class="p-6 max-w-2xl mx-auto">
            <div class="flex items-center gap-x-4 pb-3">
                <CoreGoBack />
                <!-- Breadcrumbs -->
                <div class="text-sm text-gray-500 my-4">
                    <span>Profile</span>
                    <span class="mx-2">|</span>
                    <span class="font-bold text-[#1D2739]">Delete my account</span>
                </div>
                </div>
           <!-- <div class="flex items-center mb-4">
             <button @click="router.back()" class="">
                 <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
                 <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                 </svg>
             </button>
             <button @click="$emit('close')" class="ml-auto p-2">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M19 5L5 19M5 5L19 19" stroke="#1D2739" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                 </svg>
             </button>
           </div> -->
           <h2 class="text-lg font-semibold mb-1">We're sorry to see you go</h2>
           <p class="text-gray-600 font-light text-sm mb-3">
             We'd like to know why you're deleting your account as we may be able to help with common issues.
           </p>
           <div class="mb-6">
             <label
               v-for="reason in deleteReasons"
               :key="reason"
               class="flex items-center justify-between items-center py-2 rounded-lg pr-3 cursor-pointer"
             >
               <span class="text-sm text-[#1D2739]">{{ reason }}</span>
 
               <input
                 type="radio"
                 :value="reason"
                 v-model="deleteReason"
                 class="w-5 h-5 text-green-600 focus:ring-green-500"
               />
             </label>
           </div>
         <div class="pt-3">
             <button
             @click="emit('proceedToDeleteAccount', deleteReason)"
             :disabled="!deleteReason || loading"
             class="w-full py-3.5 px-4 bg-[#292929] text-white rounded-lg text-xs font-medium disabled:opacity-50 flex items-center justify-center"
           >
             <span v-if="isLoading" class="mr-2">
               <icon-loader class="w-5 h-5 text-sm animate-spin" />
             </span>
              {{ loading ? 'processing' : 'Submit request' }}
           </button>
         </div>
         </div>
 </template>
 
 <script setup lang="ts">
   const router = useRouter()
   import { useDeleteAccount } from '@/composables/auth/useDeleteAccount'
   const deleteReasons = ref(
     [
     'No longer renting',
     'Found a better alternative',
     'Privacy concerns',
     'Inactivity',
     'Poor user experience',
     'Duplicate account',
     'Cost of services',
     'Customer service issues',
     'Dissatisfaction with listings',
     'Others'
   ])

   const props = defineProps({
    loading: {
        type: Boolean
    }
   })
   const emit = defineEmits(['proceedToDeleteAccount'])
   
   const { currentStep, isLoading, userEmail, deleteReason, isEmailValid, handleEmailChange, submitDeletion } = useDeleteAccount()
   

   </script>