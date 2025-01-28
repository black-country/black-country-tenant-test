<template>
    <div class="max-w-2xl mx-auto p-4">
      <h1 class="text-2xl font-semibold mb-6">Guarantor's information</h1>
      
      <form @submit.prevent="handleSubmit">
        <div class="space-y-6">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Full name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="guarantorInfo.fullName"
              type="text"
              class="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
              placeholder="Enter full name"
            />
          </div>
  
          <!-- Relationship -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Relationship <span class="text-red-500">*</span>
            </label>
            <select
              v-model="guarantorInfo.relationship"
              class="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
            >
              <option value="">Select relationship</option>
              <option value="parent">Parent</option>
              <option value="sibling">Sibling</option>
              <option value="relative">Relative</option>
            </select>
          </div>
  
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Email address <span class="text-red-500">*</span>
            </label>
            <input
              v-model="guarantorInfo.email"
              type="email"
              class="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
              placeholder="Enter email address"
            />
          </div>
  
          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Phone number <span class="text-red-500">*</span>
            </label>
            <input
              v-model="guarantorInfo.phone"
              type="tel"
              class="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
              placeholder="Enter phone number"
            />
          </div>
  
          <!-- Additional Phone -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Additional phone number
            </label>
            <input
              v-model="guarantorInfo.additionalPhone"
              type="tel"
              class="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
              placeholder="Enter additional phone number"
            />
          </div>
  
          <!-- ID Upload Section -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Upload a clear photo of your ID card
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
  
          <!-- Terms -->
          <div class="space-y-4">
            <div class="flex items-start">
              <input
                type="checkbox"
                v-model="guarantorInfo.termsAccepted"
                class="mt-1 mr-2"
              />
              <p class="text-sm">
                I certify that all the information given above is true and I understand that my rental agreement may
                be terminated if I have made any materially false or incomplete statements in this application.
              </p>
            </div>
            
            <div class="flex items-start">
              <input
                type="checkbox"
                v-model="guarantorInfo.verificationAccepted"
                class="mt-1 mr-2"
              />
              <p class="text-sm">
                I authorize verification of the information provided in this application from my sources.
              </p>
            </div>
  
            <div class="bg-blue-50 p-4 rounded-lg">
              <p class="text-sm text-blue-900">
                Your information is strictly used for communication with landlords or property managers, in
                line with our privacy policy.
              </p>
            </div>
          </div>
  
          <!-- Bottom Buttons -->
          <div class="flex justify-between mt-8">
            <button
              type="button"
              class="px-6 py-2 bg-white border rounded-lg"
              @click="$emit('back')"
            >
              Back
            </button>
            <button
              type="submit"
              :disabled="!isFormValid"
              :class="[
                'px-6 py-2 rounded-lg',
                isFormValid
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              ]"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useFileUpload } from '@/composables/core/useFileUpload'
  
  interface GuarantorInfo {
    fullName: string
    relationship: string
    email: string
    phone: string
    additionalPhone?: string
    termsAccepted: boolean
    verificationAccepted: boolean
  }
  
  const guarantorInfo = ref<GuarantorInfo>({
    fullName: '',
    relationship: '',
    email: '',
    phone: '',
    additionalPhone: '',
    termsAccepted: false,
    verificationAccepted: false
  })
  
  const { uploadedFile, previewUrl, handleFileUpload } = useFileUpload()
  const fileInput = ref<HTMLInputElement | null>(null)
  
  const clearUpload = () => {
    if (fileInput.value) {
      fileInput.value.value = ''
    }
    uploadedFile.value = null
    previewUrl.value = ''
  }
  
  const isFormValid = computed(() => {
    return !!(
      guarantorInfo.value.fullName &&
      guarantorInfo.value.relationship &&
      guarantorInfo.value.email &&
      guarantorInfo.value.phone &&
      uploadedFile.value &&
      guarantorInfo.value.termsAccepted &&
      guarantorInfo.value.verificationAccepted
    )
  })
  
  const emit = defineEmits(['submit', 'back'])
  
  const handleSubmit = () => {
    if (isFormValid.value) {
      emit('submit', {
        ...guarantorInfo.value,
        idImage: uploadedFile.value
      })
    }
  }
  </script>