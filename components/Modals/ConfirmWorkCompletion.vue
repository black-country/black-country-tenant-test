<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-[#F9FAFB] rounded-lg shadow-lg w-full max-w-xl p-6 mx-4">
        <h4 class="text- font-semibold text-[#1D2739]">Confirm Work Completion</h4>
        <p class="text-sm text-[#667185] mb-6">
          Select the option that best reflects your satisfaction with the completed task.
        </p>
  
        <div class="mb-6 border-[0.5px] border-gray-100 bg-white p-3 rounded-lg">
          <p class="text-sm font-medium text-[#1D2739]">Did the service provider deliver on the service?</p>
          <div class="flex gap-4 mt-2">
            <button class="px-6" @click="selectDelivery('Yes')" :class="delivery === 'Yes' ? activeButtonClass : buttonClass">Yes</button>
            <button class="px-6" @click="selectDelivery('No')" :class="delivery === 'No' ? activeButtonClass : buttonClass">No</button>
          </div>
        </div>
  
        <div class="mb-6 border-[0.5px] border-gray-100 bg-white p-3 rounded-lg">
          <p class="text-sm font-medium text-[#1D2739]">How satisfied are you on the service?</p>
          <div class="grid grid-cols-3 gap-3 mt-2">
            <button class="text-xs" @click="selectSatisfaction('very_satisfied')" :class="satisfaction === 'very_satisfied' ? activeButtonClass : buttonClass">Very satisfied</button>
            <button class="text-xs" @click="selectSatisfaction('satisfied')" :class="satisfaction === 'satisfied' ? activeButtonClass : buttonClass">Satisfied</button>
            <button class="text-xs" @click="selectSatisfaction('neutral')" :class="satisfaction === 'neutral' ? activeButtonClass : buttonClass">Neutral</button>
            <button class="text-xs" @click="selectSatisfaction('dissatisfied')" :class="satisfaction === 'dissatisfied' ? activeButtonClass : buttonClass">Dissatisfied</button>
            <button class="text-xs" @click="selectSatisfaction('very_dissatisfied')" :class="satisfaction === 'very_dissatisfied' ? activeButtonClass : buttonClass">Very Dissatisfied</button>
          </div>
        </div>
  
        <div class="flex justify-end gap-4 w-full pt-10">
          <button @click="closeModal" class="py-3 px-4 w-full text-sm rounded-lg  text-[#292929] bg-[#EBE5E0]">Cancel</button>
          <button :disabled="loading" @click="submitFeedback" class="py-3 disabled:cursor-not-allowed disabled:opacity-25 px-4 w-full text-sm rounded-lg bg-[#292929] text-white">{{ loading ? 'processing..' : 'Submit' }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useConfirmMaintenanceRequest } from '@/composables/modules/maintenance/useConfirmMaintenanceRequest'
  import { ref, defineProps, defineEmits } from 'vue'
  import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();
  const { confirmMaintenanceRequest,  confirmedRequest, setPayload, loading } = useConfirmMaintenanceRequest()
  const props = defineProps({
    maintenanceDetails: {
        type: Object,
        default: () => {}
    },
    isOpen: {
      type: Boolean
    }
})

  
  const emit = defineEmits(['close', 'submit'])
  
  const delivery = ref<string | null>(null)
  const satisfaction = ref<string | null>(null)
  
  const buttonClass = 'py-3 rounded-lg border-[0.5px] border-gray-100 text-sm text-center hover:bg-gray-100 bg-[#F9FAFB] text-[#1D2739]'
  const activeButtonClass = 'py-3 rounded-lg border-[0.5px] border-gray-100 text-sm text-center bg-gray-200 text-gray-900 font-semibold'
  
  const selectDelivery = (value: string) => {
    delivery.value = value
  }
  
  const selectSatisfaction = (value: string) => {
    satisfaction.value = value
  }
  
  const closeModal = () => {
    emit('close')
  }
  
  const submitFeedback = async () => {
    if (delivery.value && satisfaction.value) {
      // emit('submit', { delivery: delivery.value, satisfaction: satisfaction.value })
      const payload = {
        isConfirmedCompleted: true, // boolean
        satisfactoryLevel: satisfaction.value,
      }
      setPayload(payload)
      await confirmMaintenanceRequest(props.maintenanceDetails.id)
      closeModal()
    } else {
      showToast({
        title: "Error",
        message: "Please complete the feedback.",
        toastType: "error",
        duration: 3000,
      });
    }
  }
  </script>
  
  <style scoped>
  /* Additional styling if necessary */
  </style>
  