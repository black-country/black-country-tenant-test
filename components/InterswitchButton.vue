<template>
    <button @click="checkout" class="btn-interswitch">
      <img class="inline mr-2" src="https://paymentgateway.interswitchgroup.com/paymentgateway/public/images/isw_paynow_btn.png" />
      <span>Pay with Interswitch</span>
    </button>
  </template>
  
  <script lang="ts" setup>
  import { defineEmits } from 'vue'
  const emit = defineEmits(['checkout'])
  
  function checkout() {
    emit('checkout')
  }
  </script>
  
  <style scoped>
  .btn-interswitch {
    @apply flex items-center bg-white border border-gray-300 px-4 py-2 rounded;
    cursor: pointer;
  }
  </style>
  