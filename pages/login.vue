<template>
  <div class="min-h-screen lg:flex">
    <!-- Left Section (Login Form) -->
    <div class="lg:w-1/2 flex pt-20 lg:pt-0 justify-center items-center bg-white">
      <LoginForm />
    </div>

    <!-- Right Section (Carousel) -->
    <div
      class="hidden lg:w-1/2 lg:flex justify-center items-center bg-black bg-cover bg-no-repeat bg-opacity-70 text-white relative"
      :style="{ backgroundImage: `url('@/assets/img/authBg.png')` }"
    >
      <div class="w-full h-full flex justify-center items-center">
        <div class="relative w-full max-w-4xl h-[700px] flex justify-center items-center rounded-lg">
          <Carousel />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Carousel from '@/components/Carousel.vue'; // Import your Carousel component
import LoginForm from '@/components/LoginForm.vue'; // Your login form component

export default defineComponent({
  name: 'LoginPage',
  components: {
    Carousel,
    LoginForm,
  },
});
</script>

<style scoped>
/* Add additional styling if needed */
</style>
