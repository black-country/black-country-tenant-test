<!-- components/EmptyState.vue -->
<template>
   <main>
    <div class="flex items-center text-gray-600 mb-4">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
      <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

        <span class="ml-2 text-[#667185]">Dashboard | <span class="text-[#1D2739] font-medium">Rental Application</span></span>
      </div>
    <div class="flex flex-col items-center p-6 bg-white rounded-lg border-[0.5px] border-gray-you 50 text-center">
      <div class="mb-4">
        <div class="">
          <svg width="152" height="124" viewBox="0 0 152 124" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="76" cy="58" r="52" fill="#EAEAEA"/>
              <circle cx="21" cy="25" r="5" fill="#BDBDBD"/>
              <circle cx="18" cy="109" r="7" fill="#BDBDBD"/>
              <circle cx="145" cy="41" r="7" fill="#BDBDBD"/>
              <circle cx="134" cy="14" r="4" fill="#BDBDBD"/>
              <g filter="url(#filter0_b_6053_206127)">
              <rect x="52" y="34" width="48" height="48" rx="24" fill="#9D9D9D"/>
              <path d="M66.3514 59.2135C65.9984 56.9162 65.8219 55.7676 66.2562 54.7494C66.6905 53.7311 67.654 53.0344 69.5811 51.6411L71.021 50.6C73.4183 48.8667 74.6169 48 76 48C77.3831 48 78.5817 48.8667 80.979 50.6L82.4189 51.6411C84.346 53.0344 85.3095 53.7311 85.7438 54.7494C86.1781 55.7676 86.0016 56.9162 85.6486 59.2135L85.3476 61.1724C84.8471 64.4289 84.5969 66.0572 83.429 67.0286C82.2611 68 80.5537 68 77.1388 68H74.8612C71.4463 68 69.7389 68 68.571 67.0286C67.4031 66.0572 67.1529 64.4289 66.6524 61.1724L66.3514 59.2135Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              <path d="M74 64H78" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
              <filter id="filter0_b_6053_206127" x="44" y="26" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_6053_206127"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_6053_206127" result="shape"/>
              </filter>
              </defs>
              </svg>

        </div>
      </div>
      <h2 class="text-xl font-semibold text-[#1D2739] mb-2">You're yet to move into an apartment</h2>
      <p class="text-[#667185] mb-6">
        To begin managing your rented room or home, click on "Move in" or "Go to listings" to search for a property.
      </p>
      <div class="flex gap-4 w-full pt-6">
        <button :disabled="loading" @click="intiateMoveIn" class="bg-[#292929] text-sm w-full disabled:cursor-not-allowed disabled:opacity-25 text-white px-4 py-3 rounded-md">{{ loading ? 'processing..': 'Move in' }}</button>
        <!-- <NuxtLink to="/dashboard/home/details" class="bg-[#292929] w-full text-white px-4 py-4 rounded-md">Move in</NuxtLink> -->
        <NuxtLink to="/dashboard/listings" class="bg-[#EBE5E0] text-sm w-full text-[#292929] text-gray-600 px-4 py-3 rounded-md">Go to Listings</NuxtLink>
      </div>
    </div>
   </main>
  </template>
  
  <script setup lang="ts">
  import { useInitiateMoveIn } from '@/composables/modules/maintenance/useInitiateMoveIn'
  const { intiateMoveIn, loading } = useInitiateMoveIn()
</script>
  