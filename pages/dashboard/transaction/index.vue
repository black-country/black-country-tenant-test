<template>
  <TopNavBar />
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
        <span class="font-medium text-gray-900">Plumbing maintenance</span>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="bg-white rounded-lg space-y-2">
      <!-- Header -->
      <div class="flex justify-between items-center px-6 border-[0.5px] py-3 border-gray-100 rounded-lg">
        <h1 class="text-sm font-semibold">Request Details</h1>
        <span class="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
          Upcoming
        </span>
      </div>

      <!-- Details Grid -->
      <div class="space-y-3">
        <section class="space-y-4 border-[0.5px] border-gray-100 rounded-lg p-3">
          <div class="flex justify-between items-center">
            <div class="text-sm text-[#667185]">Service assigned to</div>
            <div class="text-sm text-[#1D2739]">{{ requestData.assignedTo }}</div>
          </div>

          <div class="flex justify-between items-center">
          <div class="text-sm text-[#667185]">Service date</div>
            <div class="text-sm text-[#1D2739]">{{ requestData.serviceDate }}</div>
          </div>
          
          <div class="flex justify-between items-center">
            <div class="text-sm text-[#667185]">Time</div>
            <div class="text-sm text-[#1D2739]">{{ requestData.time }}</div>
          </div>
        </section>

        <section class="space-y-4 border-[0.5px] border-gray-100 rounded-lg p-3">
          <div class="flex justify-between items-center">
            <div class="text-sm text-[#667185]">Maintenance type</div>
            <div class="text-sm text-[#1D2739]">{{ requestData.maintenanceType }}</div>
          </div>
          <div class="flex justify-between items-center">
            <div class="text-sm text-[#667185]">Rent Amount</div>
            <div class="text-sm text-[#1D2739]">{{ requestData.rentAmount }}</div>
          </div>
        <div>
          <div class="text-sm text-gray-600 mb-2">Description</div>
          <p class="text-gray-800 text-[#1D2739] text-sm">{{ requestData.description }}</p>
        </div>
      </section>

        <!-- Images -->
        <div class="border-[0.5px] border-gray-100 rounded-lg p-3">
          <div class="text-sm text-gray-600 mb-4">Images</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <img 
              v-for="(image, index) in requestData.images" 
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
</template>

<script setup lang="ts">
import image1 from '@/assets/img/gallery1.png'
interface MaintenanceRequest {
  assignedTo: string;
  serviceDate: string;
  time: string;
  maintenanceType: string;
  rentAmount: string;
  description: string;
  images: string[];
}

const requestData = ref<MaintenanceRequest>({
  assignedTo: "Anthony Jerry",
  serviceDate: "12/12/2024",
  time: "10:30 AM",
  maintenanceType: "Plumbing service",
  rentAmount: "High",
  description: "Lorem ipsum dolor sit amet consectetur. Pellentesque aliquam volutpat suspendisse neque. Tristique diam semper vitae egestas ac maecenas cursus. Dictumst viverra amet felis purus consectetur molestie ut. Egestas aenean est nibh suspendisse sagittis viverra et.",
  images: [
  image1,image1,
  image1
  ]
});

const router = useRouter()
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>