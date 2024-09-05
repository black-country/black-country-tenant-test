<template>
    <div
      class="flex items-center justify-center min-h-screen"
    >
      <!-- Modal Content -->
      <div class="bg-white w-3/12 p-8 flex flex-col items-center text-center">
        <!-- Success Icon -->
        <div class="mb-6">
            <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.923828" width="63.1513" height="64" rx="31.5756" fill="#0F973D"/>
                <path d="M44.1631 32.3596C44.1631 25.7418 38.7982 20.377 32.1804 20.377C25.5626 20.377 20.1978 25.7418 20.1978 32.3596C20.1978 38.9774 25.5626 44.3423 32.1804 44.3423C38.7982 44.3423 44.1631 38.9774 44.1631 32.3596Z" stroke="white" stroke-width="1.7974"/>
                <path d="M27.584 32.9633L30.5297 35.9839L37.0103 28.7344" stroke="white" stroke-width="1.7974" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        </div>
  
        <!-- Text Section -->
        <h2  class="text-xl font-medium mb-2 text-[#1D2739]">Search saved</h2>
        <p class="text-[#667185] mb-6 leading-snug text-sm">
          Search saved successfully! You can always access your saved searches on
          the 'Saved' page to pick up where you left off.
        </p>
  
        <!-- Got it Button -->
        <button
        class="bg-[#292929]  text-[#EAEAEA] w-full py-3.5 rounded-md"
        >
          Got it
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  // Modal state
  const showModal = ref(false)
  
  // Method to close modal
  const closeModal = () => {
    showModal.value = false
  }
  
  // Example method to show modal for demonstration
  const openModal = () => {
    showModal.value = true
  }
  </script>
  
  <style scoped>
  /* You can add custom styles here if needed */
  </style>
  