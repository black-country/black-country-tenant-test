<template>
    <div class="container mx-auto p-4">
      <h2 class="text-center text-2xl font-bold">Checkout form</h2>
      <p class="text-center text-gray-500">Integrating to Interswitch Payment Gateway - Redirect</p>
      <form @submit.prevent="handleCheckout">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium">First name</label>
            <input type="text" id="firstName" class="mt-1 w-full border border-gray-300 rounded p-2" v-model="firstName" required />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium">Last name</label>
            <input type="text" id="lastName" class="mt-1 w-full border border-gray-300 rounded p-2" v-model="lastName" required />
          </div>
        </div>
  
        <div class="mt-4">
          <label for="email" class="block text-sm font-medium">Email</label>
          <input type="email" id="email" class="mt-1 w-full border border-gray-300 rounded p-2" v-model="cust_id" required />
        </div>
  
        <div class="mt-4">
          <label for="address" class="block text-sm font-medium">Address</label>
          <input type="text" id="address" class="mt-1 w-full border border-gray-300 rounded p-2" required />
        </div>
  
        <InterswitchButton @checkout="checkout" />
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import { useCheckout } from '@/composables/modules/banks/useCheckout'
  
  const firstName = ref('Marquis')
  const lastName = ref('Abag')
  const cust_id = ref('abahmarquis@gmail.com')
  const amount = ref('5000')
  const currency = ref('566')
  const checkout = useCheckout({ amount, cust_id, currency })
  
  function handleCheckout() {
    checkout()
  }
  </script>
  