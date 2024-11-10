<template>
    <div class="flex items-center justify-between p-4 bg-white rounded-lg  border-[0.5px] border-gray-100 cursor-pointer transition">
      <span class="text-lg text-gray-700 text-sm">Enable recurrent bill payment</span>
      <div
        @click="toggleRecurrentPayment"
        class="relative inline-flex items-center h-6 w-11 cursor-pointer"
      >
        <span
          class="absolute inset-0 rounded-full transition-colors"
          :class="isRecurrentEnabled ? 'bg-orange-500' : 'bg-gray-300'"
        ></span>
        <span
          class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform"
          :class="isRecurrentEnabled ? 'translate-x-5' : 'translate-x-0'"
        ></span>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const isRecurrentEnabled = ref(false);
  
  const toggleRecurrentPayment = () => {
    isRecurrentEnabled.value = !isRecurrentEnabled.value;
  };
  </script>
  
  <style scoped>
  /* Additional styling can go here if needed */
  </style>
  