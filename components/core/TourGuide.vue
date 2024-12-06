<template>
    <div v-if="isTourActive" class="tour-overlay">
      <div
        v-for="(step, index) in steps"
        :key="index"
        v-show="currentStep === index"
        class="tour-step bg-[#BAD1F6]"
      >
        <div class="bg-white rounded-lg shadow-xl max-w-md p-6">
          <div class="mb-4">
            <h3 class="text-lg font-semibold text-[#1D2739]">
              {{ step.header }}
            </h3>
            <p class="mt-2 text-[#1D2739]">
              {{ step.content }}
            </p>
          </div>
          
          <div class="flex justify-between items-center mt-6">
            <button
              @click="previousStep"
              :disabled="currentStep === 0"
              class="px-4 py-2 text-sm font-medium text-[#326543] bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              Previous
            </button>
            
            <div class="flex space-x-2">
              <button
                @click="endTour"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Skip
              </button>
              <button
                @click="nextStep"
                class="px-4 py-2 text-sm font-medium text-[#326543] rounded-md"
              >
                {{ isLastStep ? 'Finish' : 'Next' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted } from 'vue'
  import { useTour } from '@/composables/core/useTour'
  
  const {
    steps,
    isTourActive,
    currentStep,
    isLastStep,
    startTour,
    endTour,
    nextStep,
    previousStep,
    initTour
  } = useTour()
  
  onMounted(() => {
    initTour()
  })
  </script>
  
  <style scoped>
  .tour-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .tour-step {
    position: absolute;
    z-index: 1001;
  }
  </style>