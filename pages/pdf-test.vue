<!-- pages/index.vue -->
<template>
	<div id="app">
	  <label for="file-upload" class="custom-file-upload">
		Open PDF
	  </label>
	  <input
		id="file-upload"
		type="file"
		@change="openDocument"
		class="btn"
	  />
	  <PSPDFKitContainer :pdfFile="pdfFile" @loaded="handleLoaded" />
	</div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import PSPDFKitContainer from '@/components/PSPDFKitContainer.vue';
  
  const pdfFile = ref<string>('/example.pdf');
  
  // Handle when PSPDFKit has finished loading the document
  const handleLoaded = (instance: any) => {
	console.log('PSPDFKit has loaded:', instance);
  };
  
  // Handle file upload
  const openDocument = (event: Event) => {
	const input = event.target as HTMLInputElement;
	if (input?.files?.length) {
	  const file = input.files[0];
	  pdfFile.value = URL.createObjectURL(file);
	}
  };
  </script>
  
  <style scoped>
  #app {
	text-align: center;
	color: #2c3e50;
  }
  
  body {
	margin: 0;
  }
  
  input[type="file"] {
	display: none;
  }
  
  .custom-file-upload {
	border: 1px solid #ccc;
	border-radius: 4px;
	display: inline-block;
	padding: 6px 12px;
	cursor: pointer;
	background: #4a8fed;
	color: #fff;
	font: inherit;
	font-size: 16px;
	font-weight: bold;
  }
  </style>
  