<template>
    <div>
      <h1>{{ msg }}</h1>
      <p>{{ greet }}</p>
      <button @click="changeMessage">Change Message</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Props definition
  defineProps({
    msg: String,
  });
  
  // Reactive state
  const greet = ref('Hello, Vue!');
  
  // Method to change the message
  const changeMessage = () => {
    greet.value = 'Hello, Nuxt!';
  };
  </script>
  
  <style scoped>
  h1 {
    color: #42b983;
  }
  </style>
  