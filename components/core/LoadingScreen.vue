// components/LoadingScreen.vue
<template>
  <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
    <div class="flex flex-col items-center">
      <svg class="animate-spin h-8 w-8 text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p class="text-white text-lg font-semibold mb-2">Waiting to confirm your transfer</p>
      <p class="text-gray-300 text-sm text-center">
        Confirmation is taking longer than expected. We’ll get back to you in no more than 48 hours.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// const isLoading = ref(true);

const props = defineProps({
    loading: {
        type: Boolean
    }
})


// Simulate loading for demo purposes
// onMounted(() => {
//   setTimeout(() => {
//     isLoading.value = false;
//   }, 5000); // Remove loading screen after 5 seconds
// });
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
