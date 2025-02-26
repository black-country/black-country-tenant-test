<template>
    <TopNavBar />
    <section  v-if="!loading && Object.keys(maintenanceInfo)?.length" >
      <div class="max-w-2xl mx-auto px-4 py-6">
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center space-x-2 mb-8">
        <button @click="router.back()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <span>Dashboard</span>
          <span>|</span>
          <span>Upcoming activities</span>
          <span>|</span>
          <span class="font-medium text-gray-900">{{ maintenanceInfo?.type ?? 'Nil' }}</span>
        </div>
      </nav>
  
      <!-- Main Content -->
      <div class="bg-white rounded-lg space-y-2">
        <!-- Header -->
        <div class="flex justify-between items-center px-6 border-[0.5px] py-3 border-gray-100 rounded-lg">
          <h1 class="text-sm font-semibold">Request Details</h1>
          <span class="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
            {{ maintenanceInfo?.status ?? 'Nil' }}
          </span>
        </div>
  
        <!-- Details Grid -->
        <div class="space-y-3">
          <section class="space-y-4 border-[0.5px] border-gray-100 rounded-lg p-3">
            <div class="flex justify-between items-center">
              <div class="text-sm text-[#667185]">Service assigned to</div>
              <div class="text-sm text-[#1D2739]">{{ maintenanceInfo?.serviceProvider?.firstName}} {{ maintenanceInfo?.serviceProvider?.lastName}} </div>
            </div>
  
            <div class="flex justify-between items-center">
            <div class="text-sm text-[#667185]">Service date</div>
              <div class="text-sm text-[#1D2739]">
                {{
                moment(maintenanceInfo?.serviceDate).format(
                  "MMMM Do YYYY"
                ) ?? "Nil"
              }}
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="text-sm text-[#667185]">Time</div>
              <div class="text-sm text-[#1D2739]">
                {{
                moment(maintenanceInfo?.serviceTime).format(
                  "HH:MM A"
                ) ?? "Nil"
              }}
                <!-- {{  maintenanceInfo?.createdAt ?? 'Nil' }} -->
              </div>
            </div>
          </section>
  
          <section class="space-y-4 border-[0.5px] border-gray-100 rounded-lg p-3">
            <div class="flex justify-between items-center">
              <div class="text-sm text-[#667185]">Maintenance type</div>
              <div class="text-sm text-[#1D2739]">{{ maintenanceInfo?.type ?? 'Nil' }}</div>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-sm text-[#667185]">Urgency Level</div>
              <div class="text-sm text-[#1D2739]">{{ maintenanceInfo?.urgencyLevel ?? 'Nil' }}</div>
            </div>
          <div>
            <div class="text-sm text-gray-600 mb-2">Description</div>
            <p class="text-gray-800 text-[#1D2739] text-sm">{{ maintenanceInfo?.description ?? 'Nil' }}</p>
          </div>
        </section>
  
          <!-- Images -->
          <div v-if="maintenanceInfo?.images" class="border-[0.5px] border-gray-100 rounded-lg p-3">
            <div class="text-sm text-gray-600 mb-4">Images</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <img 
                v-for="(image, index) in maintenanceInfo?.images" 
                :key="index"
                :src="image"
                :alt="`Plumbing maintenance image ${index + 1}`"
                class="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <section class="max-w-2xl mx-auto" v-else-if="loading && !Object.keys(maintenanceInfo)?.length">
      <div class="rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
        </div>
      </div>
    </section>
    <section v-else class="border-[0.5px] max-w-2xl mx-auto border-gray-100 flex justify-center items-center rounded-lg">
         No DATA AVAILABLE
    </section>
    </template>

<script setup lang="ts">
import moment from "moment";
import { useFetchMaintenanceDetails } from '@/composables/modules/maintenance/useFetchMainenenceById'
import { useCurrencyFormatter} from "@/composables/core/useCurrencyFormatter";
const { loading,
  maintenanceInfo } = useFetchMaintenanceDetails()
import image1 from '@/assets/img/gallery1.png'

const router = useRouter()

</script>




