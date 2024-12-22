<template>
    <main>
      <TopNavBar />
      <div class="min-h-screen flex flex-col justify-between max-w-3xl mx-auto">
        <div class="bg-white p-6">
          <div class="flex items-center text-gray-600 mb-4">
            <svg
              @click="router.back()"
              class="cursor-pointer"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="18" fill="#EAEAEA" />
              <path
                d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
  
            <span class="ml-2  text-[#667185]"
              >My Home |
              <span class="ml-2  text-[#667185]"
                >Maintenance requests | </span
              ><span class="text-[#1D2739] font-medium"
                >{{ maintenanceInfo?.type ?? 'Nil' }}</span
              ></span
            >
          </div>
          <!-- Upcoming Activities Section -->
           <!-- {{ maintenanceRequest }} -->
             <!-- {{maintenanceInfo}} -->
          <div v-if="loading && !Object.keys(maintenanceInfo).length" class="animate-pulse flex space-x-4">
           <div class="rounded-md bg-slate-100 h-96 w-full"></div>
           </div>
           <HomeMaintenanceRequestDetails v-else :maintenanceDetails="maintenanceInfo" />
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { useFetchMaintenanceDetails } from '@/composables/modules/maintenance/useFetchMainenenceById'
  import { useFetchMaintenanceRequest } from '@/composables/modules/maintenance/useFetchMaintenenceRequest'
  const {
    maintenanceRequest } = useFetchMaintenanceRequest()
    const { loading,
      maintenanceInfo } = useFetchMaintenanceDetails()
  const router = useRouter()
 
  </script>
  
  <style scoped>
  /* Add additional styles as needed */
  </style>
  