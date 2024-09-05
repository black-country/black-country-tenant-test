<template>
    <div class="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
      <!-- Form Header -->
      <div class="text-center mb-6">
        <!-- <img src="/path/to/logo.png" alt="Logo" class="h-16 mx-auto mb-4" /> -->
        <h2 class="text-2xl font-semibold">Forgot your password?</h2>
      </div>
  
      <!-- Forgot Password Form -->
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Enter your email"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
  
        <p class="text-sm text-center text-gray-600">
          Remember your password?
          <a href="#" class="text-green-600 font-semibold">Login</a>
        </p>
  
        <button
          type="submit"
          class="w-full py-2 px-4 mt-6 bg-black text-white rounded-md shadow-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Continue
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const form = ref({
    email: '',
  });
  
  const handleSubmit = () => {
    // Handle form submission logic here
  };
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  