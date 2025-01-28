<template>
    <div class="space-y-6">
      <!-- Full Name -->
      <div>
        <label class="block text-sm font-medium mb-2">
          Full name <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouse.fullName"
          type="text"
          class="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
          placeholder="Enter your spouse's full name"
        />
      </div>
  
      <!-- Email -->
      <div>
        <label class="block text-sm font-medium mb-2">
          Email address <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouse.email"
          type="email"
          class="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
          placeholder="Enter your spouse's email address"
        />
      </div>
  
      <!-- Phone -->
      <div>
        <label class="block text-sm font-medium mb-2">
          Phone number <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouse.phone"
          type="tel"
          class="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
          placeholder="Enter your spouse's phone number"
        />
      </div>
  
      <!-- ID Type -->
      <div>
        <label class="block text-sm font-medium mb-2">ID Type</label>
        <select
          v-model="spouse.idType"
          class="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
        >
          <option value="">Select ID type</option>
          <option value="driver_license">Driver License</option>
          <option value="passport">Passport</option>
        </select>
      </div>
  
      <!-- ID Upload -->
      <div v-if="spouse.idType">
        <label class="block text-sm font-medium mb-2">
          Upload a clear photo of your spouse's ID card
        </label>
        <div
          class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
        >
          <input
            type="file"
            class="hidden"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
          />
          <div v-if="!previewUrl" @click="$refs.fileInput.click()" class="cursor-pointer">
            <span class="text-gray-500">Click to upload ID Card</span>
          </div>
          <div v-else class="relative">
            <img :src="previewUrl" class="max-w-full h-auto mx-auto" />
            <button
              @click="clearUpload"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useFileUpload } from '@/composables/core/useFileUpload'
  
  const props = defineProps({
    spouse: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['update:spouse', 'update:isValid'])
  
  const { uploadedFile, previewUrl, handleFileUpload } = useFileUpload()
  const fileInput = ref<HTMLInputElement | null>(null)
  
  const clearUpload = () => {
    if (fileInput.value) {
      fileInput.value.value = ''
    }
    uploadedFile.value = null
    previewUrl.value = ''
    emit('update:spouse', {
      ...props.spouse,
      idImage: null
    })
  }
  
  watch([() => props.spouse, uploadedFile], () => {
    const isValid = !!(
      props.spouse.fullName &&
      props.spouse.email &&
      props.spouse.phone &&
      props.spouse.idType &&
      uploadedFile.value
    )
    emit('update:isValid', isValid)
  })
  </script>