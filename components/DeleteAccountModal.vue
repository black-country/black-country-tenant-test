<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg w-full max-w-md">
        <!-- Step 1 -->
        <div @click="router.back()" class="p-6">
          <div class="flex justify-center mb-4">
            <div class="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center">
                <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.921875" width="63.1513" height="64" rx="31.5756" fill="#F3A218"/>
                <path d="M42.2031 32.375C42.2031 26.8521 37.7259 22.375 32.2031 22.375C26.6803 22.375 22.2031 26.8521 22.2031 32.375C22.2031 37.8978 26.6803 42.375 32.2031 42.375C37.7259 42.375 42.2031 37.8978 42.2031 32.375Z" stroke="white" stroke-width="1.5"/>
                <path d="M32.4453 37.375V32.375C32.4453 31.9036 32.4453 31.6679 32.2988 31.5214C32.1524 31.375 31.9167 31.375 31.4453 31.375" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M32.1953 28.377H32.2043" stroke="white" stroke-width="3.25" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
          </div>
          <h2 class="text-lg text-center font-semibold text-gray-700 mb-2">Delete account</h2>
          <p class="text-gray-600 text-center font-light mb-6">
            You are about to request the deletion of your BlackCountry account. Once your account is deleted, all
            <span class="font-semibold">personal information, rental history, employment details</span>, and
            <span class="font-semibold">next of kin information</span> will be permanently erased after 30 days.
          </p>
          <div class="flex gap-3">
            <button
              @click="$emit('close')"
              class="flex-1 text-xs py-3.5 px-4 bg-gray-100 rounded-lg text-gray-900 font-medium"
            >
              Cancel
            </button>
            <!-- <button
              @click="currentStep++"
              class="flex-1 text-xs py-3.5 px-4 bg-[#292929] text-white rounded-lg font-medium"
            >
              Request account deletion
            </button> -->
            <NuxtLink
              to="/profile/account-deletion-confirmation"
              class="flex-1 text-xs py-3.5 px-4 bg-[#292929] text-white rounded-lg font-medium"
            >
              Request account deletion
            </NuxtLink>
          </div>
        </div>
  
        <!-- Step 2 -->
        <div v-if="currentStep === 2" class="p-6">
          <div class="flex items-center mb-4">
            <button @click="currentStep--" class="">
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
          </div>
          <h2 class="text-xl font-semibold text-[#1D2739] mb-4">Confirm your account deletion</h2>
          <p class="text-[#667185] font-light mb-4">Please enter your email address to confirm deleting your account.</p>
          <div class="mb-6 space-y-1">
            <label class="text-[#1D2739] text-sm">Email Address</label>
            <input
              v-model="userEmail"
              @input="handleEmailChange($event.target.value)"
              type="email"
              class="w-full p-3 py-4 outline-none bg-[#F0F2F5] text-sm border-[0.5px] rounded-lg"
              placeholder="Please enter your email address"
            />
          </div>
         <div class="pt-4">
            <button
            @click="currentStep++"
            :disabled="!isEmailValid"
            class="w-full py-3.5 px-4 bg-[#292929] text-sm  text-white rounded-lg font-medium disabled:opacity-25"
          >
            Proceed
          </button>
         </div>
        </div>
  
        <!-- Step 3 -->
        <div v-if="currentStep === 3" class="p-6">
          <div class="flex items-center mb-4">
            <button @click="currentStep--" class="">
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
          </div>
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
            @click="submitDeletion"
            :disabled="!deleteReason || isLoading"
            class="w-full py-3.5 px-4 bg-[#292929] text-white rounded-lg text-xs font-medium disabled:opacity-50 flex items-center justify-center"
          >
            <span v-if="isLoading" class="mr-2">
              <icon-loader class="w-5 h-5 text-sm animate-spin" />
            </span>
            Submit request
          </button>
        </div>
        </div>
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
  
  const { currentStep, isLoading, userEmail, deleteReason, isEmailValid, handleEmailChange, submitDeletion } = useDeleteAccount()
  
  defineEmits(['close'])
  </script>