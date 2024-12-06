<template>
    <div>
      <!-- <img alt="Vue logo" id="logo1" src="/assets/logo.png" /> -->
      <HelloWorld msg="Hello Vue 3 in Nuxt!" />
      <v-tour name="myTour" :steps="steps" />
      <button @click="clickTour">Start Tour</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const steps = ref([
    {
      target: '#logo1',
      step: {},
      header: {
        title: 'Get Started',
      },
      content: `Discover <strong>Vue Tour</strong>!`,
    },
    {
      target: '.hello',
      content: 'An awesome plugin made with Vue.js!',
    },
    {
      target: '.hello h1',
      content: "Try it, you'll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.",
      params: {
        placement: 'top',
      },
    },
  ]);
  
  // Start the tour when the component is mounted
  onMounted(() => {
    // This will automatically start the tour after the page is loaded
    // window.tours['myTour']?.start(); // Uncomment this if you want it to start on mount
  });
  
  const clickTour = () => {
    steps.value = [
      {
        target: '#logo1',
        step: {
          offset: 100,
        },
        header: {
          title: 'test2',
        },
        content: `Discover <strong>Vue Tour</strong>!`,
      },
      {
        target: '.hello',
        content: 'An awesome plugin made with Vue.js!',
      },
      {
        target: '.hello h1',
        content: "Try it, you'll love it!<br>You can put HTML in the steps and completely customize the DOM to suit your needs.",
        params: {
          placement: 'top',
        },
      },
    ];
  
    // Start the tour when the button is clicked
    window.tours['myTour']?.start();
  };
  </script>
  
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  