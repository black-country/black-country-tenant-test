<template>
    <div class="mx-auto pb-32">
      <h1 class="text-lg font-medium mb-6">Guarantor's information</h1>
      
      <form @submit.prevent="handleSubmit">
        <div class="space-y-6">
        <section class="grid grid-cols-2 gap-6 w-full">
               <!-- Full Name -->
               <div>
            <label class="block text-sm font-medium mb-2">
              Full name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="guarantorInfo.fullName"
              type="text"
              class="w-full p-3.5 text-sm text-[#98A2B3] outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
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
              class="w-full p-3.5 text-sm text-[#98A2B3] outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
            >
              <option value="">Select relationship</option>
              <option value="parent">Parent</option>
              <option value="sibling">Sibling</option>
              <option value="relative">Relative</option>
            </select>
          </div>
  
        </section>
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Email address <span class="text-red-500">*</span>
            </label>
            <input
              v-model="guarantorInfo.email"
              type="email"
              class="w-full p-3.5 text-sm text-[#98A2B3] outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
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
             class="w-full p-3.5 text-sm text-[#98A2B3] outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
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
              class="w-full p-3.5 text-sm text-[#98A2B3] outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
              placeholder="Enter additional phone number"
            />
          </div>
  
          <!-- ID Upload Section -->
                 <!-- ID Type -->
      <div>
        <label class="block text-sm text-sm text-[#1D2739] outline-none font-medium mb-2">ID Type</label>
        <select
          v-model="guarantorInfo.idType"
          class="w-full p-3.5 text-sm text-[#98A2B3] outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
        >
          <option value="">Select ID type</option>
          <option value="driver_license">Driver License</option>
          <option value="passport">Passport</option>
        </select>
      </div>
  
      <!-- ID Upload -->
      <div v-if="guarantorInfo.idType">
        <label class="block text-xl text-[#1D2739] outline-none font-medium mb-2">
          Upload a clear photo of your spouse's ID card
        </label>
        <div
          class="w-full p-3.5 text-sm text-sm text-[#1D2739] outline-none text-[#98A2B3] rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
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
            <img :src="previewUrl" class="w-full object-cover h-44 mx-auto" />
            <button
              @click="clearUpload"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              ×
            </button>
          </div>
        </div>
      </div>
          <!-- <div>
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
                <img :src="previewUrl" class="w-full h-44 object-cover mx-auto" />
                <button
                  @click="clearUpload"
                  class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  ×
                </button>
              </div>
            </div>
          </div> -->
  
          <!-- Terms -->
          <div class="space-y-4">
            <div class="flex items-start">
              <input
                type="checkbox"
                v-model="guarantorInfo.termsAccepted"
                class="mt-1 mr-2 h-4 w-4"
              />
              <p class="text-sm text-[#1D2939]">
                I certify that all the information given above is true and I understand that my rental agreement may
                be terminated if I have made any materially false or incomplete statements in this application.
              </p>
            </div>
            
            <div class="flex items-start">
              <input
                type="checkbox"
                v-model="guarantorInfo.verificationAccepted"
                class="mt-1 mr-2 h-4 w-4"
              />
              <p class="text-sm text-[#1D2939]">
                I authorize verification of the information provided in this application from my sources.
              </p>
            </div>
  
            <div class="bg-[#E8EDFB] p-4 rounded-lg">
              <div class="text-sm text-[#1D2939] flex space-x-3">
            <div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16.33 22H7.66C4.27 22 2 19.62 2 16.08V7.909C2 4.379 4.27 2 7.66 2H16.33C19.72 2 22 4.379 22 7.909V16.08C22 19.62 19.72 22 16.33 22ZM12.01 14.939C12.48 14.939 12.87 15.33 12.87 15.809C12.87 16.299 12.48 16.689 11.99 16.689C11.51 16.689 11.12 16.299 11.12 15.809C11.12 15.33 11.51 14.939 12.01 14.939ZM11.13 8.219C11.13 7.739 11.52 7.349 12.01 7.349C12.49 7.349 12.88 7.739 12.88 8.219V12.639C12.88 13.12 12.49 13.519 12.01 13.519C11.52 13.519 11.13 13.12 11.13 12.639V8.219Z" fill="#4A71E0"/>
                  </svg>
            </div>

             <p>
              Your information is strictly used for communication with landlords or property managers, in
              line with our privacy policy.
             </p>
              </div>
            </div>
          </div>
  
          <!-- Bottom Buttons -->     <div
          class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center border-[0.5px]"
        >
          <div class="max-w-2xl w-full flex justify-between">
            <button
              class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]"
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
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed',
              ]"
            >
              Continue
            </button>
          </div>
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
    idType: string
    additionalPhone?: string
    termsAccepted: boolean
    verificationAccepted: boolean
  }
  
  const guarantorInfo = ref<GuarantorInfo>({
    fullName: '',
    relationship: '',
    email: '',
    idType: '',
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
      guarantorInfo.value.idType &&
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