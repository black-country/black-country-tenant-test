<template>
    <div class="min-h-screen flex items-center justify-center">
      <ResetPasswordForm />
    </div>
  </template>
  
  <script setup lang="ts">
  import ResetPasswordForm from '@/components/ResetPasswordForm.vue';
  const router = useRouter()
//   definePageMeta({
//   middleware: "auth",
// });
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  