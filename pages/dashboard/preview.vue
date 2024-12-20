<template>
    <client-only>
      <PdfComponent :src="url" />
    </client-only>
  </template>
  
  <script lang="ts" setup>
  import { defineAsyncComponent, ref } from "vue";
  
  const PdfComponent = defineAsyncComponent(() => import("vue-pdf"));
  
  const url = ref("http://example.com/example.pdf");
  </script>  