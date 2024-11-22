<!-- pages/rental-application.vue -->
<template>
  <main>
    <TopNavBar />
    <div class="container mx-auto p-4">
    <HomeEmptyState class="lg:w-6/12 mx-auto" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isMovedIn = ref(false);
</script>

<style scoped>
/* Add any custom styles if necessary */
</style>
