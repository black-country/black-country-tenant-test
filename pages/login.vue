<template>
  <div class="min-h-screen lg:flex">
    <!-- Left Section (Login Form) -->
    <div class="lg:w-1/2 flex pt-20 lg:pt-0 justify-center items-center bg-white">
      <LoginForm />
    </div>

    <!-- Right Section (Carousel) -->
    <div
      class="hidden lg:block w-1/2 bg-[url('@/assets/img/authBg.png')] bg-black/90 bg-cover bg-center"
    >
      <div class="w-full h-full flex justify-center items-center">
        <div class="relative w-full max-w-4xl h-[700px] flex justify-center items-center rounded-lg">
          <Carousel />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({
// middleware: "auth",
// });
// No script needed for static page
</script>
