<template>
  <div class="min-h-screen flex">
    <!-- Left Section -->
    <div class="w-1/2 flex justify-center items-center bg-white">
      <LoginForm />
    </div>
    
    <!-- Right Section -->
    <div class="w-1/2 bg-black text-white flex justify-center items-center relative">
      <!-- <Carousel :images="carouselImages" />
      <div class="absolute bottom-8 left-8 text-left">
        <h2 class="text-xl font-semibold">Personalized Property Discovery</h2>
        <p class="mt-2">Find your dream property with ease! Our search matches you with homes tailored to your preferences.</p>
      </div> -->
      <div class="w-full h-screen bg-black flex justify-center items-center">
        <div class="relative w-full max-w-4xl h-[700px] flex justify-center items-center rounded-lg">
          <Carousel />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Carousel from '@/components/Carousel.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    Carousel, // Ensure Carousel is imported or globally registered
  },
  setup() {
    // Any setup logic here
  },
});
</script>