<template>
    <div class="p-4 max-w-lg mx-auto">
      <!-- Breadcrumb Navigation -->
      <div class="flex items-center space-x-2 text-gray-500 mb-4">
        <span class="cursor-pointer">Dashboard</span>
        <span>/</span>
        <span class="cursor-pointer">Jason Gardens</span>
        <span>/</span>
        <span class="font-semibold text-black">Make payment</span>
      </div>
  
      <!-- Payment Title -->
      <h2 class="text-xl font-semibold mb-4">Transfer NGN 70,000 to Homeowner</h2>
  
      <!-- Payment Details Card -->
      <div class="bg-white rounded-lg shadow-md p-4 space-y-3 mb-6">
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Bank Name</p>
            <p class="font-semibold">First Bank</p>
          </div>
          <button class="text-gray-400">
            <img src="/copy-icon.svg" alt="Copy" class="w-5 h-5" />
          </button>
        </div>
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Account Name</p>
            <p class="font-semibold">Jason Gardens Inc</p>
          </div>
          <button class="text-gray-400">
            <img src="/copy-icon.svg" alt="Copy" class="w-5 h-5" />
          </button>
        </div>
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Account Number</p>
            <p class="font-semibold">0000 0000 0000 0000</p>
          </div>
          <button class="text-gray-400">
            <img src="/copy-icon.svg" alt="Copy" class="w-5 h-5" />
          </button>
        </div>
        <div class="flex justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Amount</p>
            <p class="font-semibold">NGN 70,000.00</p>
          </div>
          <button class="text-gray-400">
            <img src="/copy-icon.svg" alt="Copy" class="w-5 h-5" />
          </button>
        </div>
      </div>
  
      <!-- Expiration Notice -->
      <div class="bg-blue-50 border border-blue-200 text-blue-700 rounded-md p-3 flex items-center space-x-3 mb-6">
        <span class="text-blue-700">&#9432;</span>
        <div>
          <p class="text-sm">Please confirm your payment by clicking the 'I have sent the money' button below.</p>
          <p class="text-sm font-medium">Expires in: <span>{{ timer }}</span></p>
        </div>
      </div>
  
      <!-- Action Buttons -->
      <div class="flex justify-between">
        <button class="border border-gray-300 text-gray-600 rounded px-4 py-2">Cancel</button>
        <button class="bg-black text-white rounded px-4 py-2">I have sent the money</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const timer = ref('30:00');
  
  onMounted(() => {
    // Countdown logic here for the expiration timer
    let minutes = 30;
    let seconds = 0;
  
    const countdown = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      timer.value = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
  });
  </script>
  
  <style scoped>
  /* Customize icon styles if necessary */
  </style>
  