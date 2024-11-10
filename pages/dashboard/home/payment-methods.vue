<template>
  <TopNavBar />
  <div class="max-w-2xl mx-auto px-4 py-6">
    <div class="flex items-center text-gray-600 mb-4">
      <svg
        @click="router.back()"
        class="cursor-pointer"
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="36" height="36" rx="18" fill="#EAEAEA" />
        <path
          d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23"
          stroke="#1D2739"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span class="ml-2 text-[#667185]">
        My Home | <span class="text-[#1D2739] font-medium">Pay bills</span>
      </span>
    </div>

    <h2 class="text- font-semibold text-gray-800 mb-6">Electricity Bill</h2>

    <!-- Payment Method Options -->
    <div class="space-y-4">
      <div
        v-for="(method, index) in paymentMethods"
        :key="index"
        @click="selectedMethod = method.id"
        class="flex items-center justify-between px-4 py-4 bg-white rounded-lg cursor-pointer border transition-all"
        :class="{'border-[#5B8469]': selectedMethod === method.id, 'border-[0.5px] border-gray-200': selectedMethod !== method.id}"
      >
        <label :for="method.id" class="text-sm text-gray-700 cursor-pointer">{{ method.label }}</label>
        <input
          type="radio"
          :id="method.id"
          name="paymentMethod"
          :value="method.id"
          v-model="selectedMethod"
          class="form-radio h-4 w-4 text-[#5B8469] focus:ring-[#5B8469] cursor-pointer"
        />
      </div>
    </div>

    <!-- Buttons -->
    <div class="mt-6 pt-10 flex justify-between">
      <button class="py-3 text-sm px-6 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
      <button
        class="py-3 text-sm px-6 text-white bg-[#292929] rounded-md"
        :disabled="!selectedMethod"
        :class="{ 'opacity-50 cursor-not-allowed': !selectedMethod }"
      >
        Continue
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedMethod = ref<string | null>(null);
const paymentMethods = [
  { id: 'card', label: 'Pay with Card' },
  { id: 'linked-bank', label: 'Pay with Linked Bank' },
  { id: 'transfer', label: 'Pay with Transfer' },
];
</script>

<style scoped>
/* Tailwind CSS handles most styling; custom styles can go here if needed */
</style>
