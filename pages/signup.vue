<template>
  <div class="min-h-screen flex items-center justify-center">
    <RegisterForm />
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/RegisterForm.vue';

definePageMeta({
  middleware: "auth",
});
</script>

<style scoped>
/* Additional styling if needed */
</style>
