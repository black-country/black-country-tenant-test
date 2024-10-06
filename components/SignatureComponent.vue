<template>
      <div class="bg-white rounded-lg shadow-lg p-6 w-1/2">
        <div class="flex justify-between">
          <h3 class="text-xl font-bold">Tenant's Details</h3>
          <button @click="$emit('close')" class="text-gray-500">Reset</button>
        </div>
  
        <div class="mt-4">
          <label class="block font-semibold">Full Name</label>
          <input type="text" v-model="tenantName" class="w-full border rounded p-2 mt-1" />
        </div>
  
        <div class="mt-4">
          <label class="block font-semibold">Date</label>
          <input type="date" v-model="date" class="w-full border rounded p-2 mt-1" />
        </div>
  
        <div class="mt-4">
          <label class="block font-semibold">Signature</label>
          <div class="flex space-x-4">
            <button @click="selectTab('draw')" :class="activeTab === 'draw' ? 'bg-gray-100' : ''" class="px-4 py-2 border rounded">Draw</button>
            <button @click="selectTab('type')" :class="activeTab === 'type' ? 'bg-gray-100' : ''" class="px-4 py-2 border rounded">Type</button>
            <button @click="selectTab('upload')" :class="activeTab === 'upload' ? 'bg-gray-100' : ''" class="px-4 py-2 border rounded">Upload</button>
          </div>
  
          <div class="mt-4">
            <div v-if="activeTab === 'draw'">
              <canvas ref="canvas" class="border w-full h-40"></canvas>
              <button @click="clearCanvas" class="mt-2 px-4 py-2 bg-gray-500 text-white rounded">Clear</button>
            </div>
            <div v-else-if="activeTab === 'type'">
              <input v-model="typedSignature" type="text" class="w-full border rounded p-2" placeholder="Type your signature" />
            </div>
            <div v-else-if="activeTab === 'upload'">
              <input type="file" @change="onFileChange" class="w-full border rounded p-2" />
            </div>
          </div>
        </div>
  
        <div class="mt-6 flex justify-between">
          <button @click="$emit('close')" class="bg-gray-500 text-white px-6 py-3 rounded shadow">Reset</button>
          <button @click="submitSignature" class="bg-green-500 text-white px-6 py-3 rounded shadow">Show 645 homes</button>
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const tenantName = ref('Ada Dennis');
  const date = ref('');
  const activeTab = ref('draw');
  const typedSignature = ref('');
  const uploadedSignature = ref<File | null>(null);
  
  const selectTab = (tab: string) => {
    activeTab.value = tab;
  };
  
  const canvas = ref<HTMLCanvasElement | null>(null);
  let ctx: CanvasRenderingContext2D | null = null;
  
  onMounted(() => {
    if (canvas.value) {
      ctx = canvas.value.getContext('2d');
      canvas.value.addEventListener('mousedown', startDrawing);
      canvas.value.addEventListener('mouseup', stopDrawing);
      canvas.value.addEventListener('mousemove', draw);
    }
  });
  
  let isDrawing = false;
  
  const startDrawing = (e: MouseEvent) => {
    if (ctx) {
      isDrawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    }
  };
  
  const draw = (e: MouseEvent) => {
    if (isDrawing && ctx) {
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    }
  };
  
  const stopDrawing = () => {
    isDrawing = false;
  };
  
  const clearCanvas = () => {
    if (ctx && canvas.value) {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    }
  };
  
  const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      uploadedSignature.value = target.files[0];
    }
  };
  
  const submitSignature = () => {
    let signature = '';
    if (activeTab.value === 'draw' && canvas.value) {
      signature = canvas.value.toDataURL(); // Get drawn signature as data URL
    } else if (activeTab.value === 'type') {
      signature = typedSignature.value;
    } else if (activeTab.value === 'upload' && uploadedSignature.value) {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedSignature.value);
      reader.onload = () => {
        signature = reader.result as string;
        emitSignature(signature);
      };
      return;
    }
    emitSignature(signature);
  };
  
  const emitSignature = (signature: string) => {
    if (signature) {
      $emit('sign', signature);
    }
  };
  </script>
  
  <style scoped>
  canvas {
    border: 1px solid #ddd;
  }
  </style>
  