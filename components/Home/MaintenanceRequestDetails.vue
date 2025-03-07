<template>
    <div class="">

        <!-- Request Details Card -->
        <div class="space-y-6">
            <!-- Header Section -->
             <!-- {{ maintenanceDetails.isConfirmedCompleted }} -->
            <div class="flex justify-between items-center border-[0.5px] border-gray-50 bg-white p-3 rounded-md">
                <h4 class="text-sm font-medium text-[#1D2739]">Request Details</h4>
                <span class="px-3 py-1 text-sm font-medium bg-[#E7F6EC] text-[#099137] rounded-full">{{ maintenanceDetails.status ?? 'Nil' }}</span>
            </div>

          <div v-if="!maintenanceDetails?.isConfirmedCompleted">
            <div v-if="maintenanceDetails.status === 'completed'"
                class="flex justify-between items-center border-[0.5px] border-gray-50 bg-white p-3 rounded-md">
                <div class="space-y-2">
                    <!-- <h4 class="text-sm font-medium text-[#1D2739]">Confirm Completed Work</h4> -->
                    <p class="text-sm text-[#667185]">
                        This action allows the property manager to ensure your satisfaction with the completed
                        task and facilitates payment to the service provider.
                    </p>
                </div>
                <button
                    class="py-2 px-4 bg-[#5B8469] text-white text-sm font-semibold rounded-lg focus:outline-none focus:ring-offset-2"
                    @click="openModal">
                    Confirm
                </button>
            </div>
          </div>

         <section class="border-[0.5px] border-gray-50 bg-white p-3 rounded-md space-y-4">
               <!-- Details Section -->
                <div class="flex justify-between items-center">
                    <p class="text-[#667185] text-sm">Maintenance type</p>
                    <p class="text-[#1D2739] text-sm">{{ maintenanceDetails.type ?? 'Nil' }}</p>
                </div>
                <div class="flex justify-between items-center">
                    <p class="text-[#667185] text-sm">Urgency Level</p>
                    <p class="text-[#1D2739] bg-[#F9FAFB] rounded-full px-6 py-2 text-sm">{{ maintenanceDetails.urgencyLevel ?? 'Nil' }}</p>
                </div>

            <!-- Description Section -->
            <div>
                <p class="text-[#667185] text-sm">Description</p>
                <p class="text-[#1D2739] text-sm leading-loose">
                    {{ maintenanceDetails.description ?? 'Nil' }}
                </p>
            </div>
         </section>

            <!-- Images Section -->
            <div>
                <p class="text-gray-600 text-sm font-medium mb-2">Images</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <img v-for="item in maintenanceDetails.images" :src="item" alt="Plumbing issue 1"
                        class="rounded-lg object-cover h-60 w-full">
                </div>
            </div>
        </div>
    </div>
    <ModalsConfirmWorkCompletion :maintenanceDetails="maintenanceDetails" :isOpen="isModalOpen" @close="closeModal" @submit="handleSubmit" />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
    maintenanceDetails: {
        type: Object,
        default: () => {}
    }
})


const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}


const handleSubmit = (feedback: { delivery: string; satisfaction: string }) => {
  console.log('Feedback submitted:', feedback)
  // Handle the submitted feedback, e.g., send it to an API
}


</script>

<style scoped>
.container {
    max-width: 700px;
}
</style>