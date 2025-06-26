<template>
    <TopNavBar />
    <main class="p-4">
      <div class="flex items-center max-w-3xl mx-auto mt-6 mb-4 text-gray-600">
            <svg
            @click="router.back()"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="18" fill="#EAEAEA" />
              <path
                d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span class="ml-2 text-[#667185]"
              >My Home |
              <span class="text-[#1D2739] font-medium"
                >Maintenance requests</span
              ></span
            >
          </div>
      <form @submit.prevent="handleSubmit" class="flex flex-col justify-between max-w-3xl min-h-screen mx-auto mt-6">
        <!-- Form header and other fields remain the same -->
        <section class="space-y-6">
          <h2 class="text-xl font-semibold">Maintenance request</h2>
          <!-- Maintenance Type, Urgency Level, and Description Fields -->

          <div>
          <label class="text-[#1D2739] text-sm">Maintenance type</label>
          <select v-model="payload.type" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4">
          <option v-for="item in maintanceTypes" :key="item" >
            {{ item }}
          </option>
          </select>
    </div>

    
    <div class="">
      <label class="text-[#1D2739] text-sm" for="urgencyLevel">Urgency level</label>
      <select v-model="payload.urgencyLevel"  class="w-full p-2 mt-1 capitalize outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4">
          <option v-for="item in urgencyLevels" :key="item" class="capitalize">
            {{ item }}
          </option>
          </select>
    </div>


    <div class="">
      <label class="text-[#1D2739] text-sm"
            >Description of issue <span class="text-red-500">*</span></label
          >
          <textarea
            v-model="payload.description"
            cols="6"
            rows="6"
            placeholder="Describe the issue here..."
            class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
          ></textarea>
    </div>
    
          <!-- Image Upload Section -->
          <div class="">
            <label class="text-[#1D2739] text-sm">Upload image (Optional)</label>
            <div class="grid w-full grid-cols-2 gap-3 mt-2 lg:grid-cols-3">
              <!-- Uploaded Images -->
              <div
                v-for="(image, index) in payload.images"
                :key="index"
                class="relative h-44 bg-[#F0F2F5] rounded overflow-hidden"
              >
                <img :src="image" alt="Uploaded" class="object-cover w-full h-full" />
                <button
                  @click="removeImage(index)"
                  class="absolute top-3 right-3 bg-[#F0F2F5] text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="14" fill="black" fill-opacity="0.7"/>
              <path d="M17.5 10.5L10.5 17.5M10.5 10.5L17.5 17.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

                </button>
              </div>
    
              <!-- Add Photo Button with Loader Overlay -->
              <div class="relative bg-[#F0F2F5] w-full h-44 border-dashed border-2 border-gray-50 rounded flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  class="absolute inset-0 opacity-0 cursor-pointer"
                  @change="onImageUpload"
                />
                <span class="text-center text-white">
                  <span
                    class="text-white bg-[#5B8469] flex items-center gap-x-2 rounded-lg px-4 block py-2 text-sm"
                  >
                  <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.5 2V10" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2.5 6H10.5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Add Photo
                  </span>
                  <span class="text-xs text-[#1D2739] mt-3">Accepts jpg & png<br />2MB max/each</span>
                </span>
    
                <!-- Loader overlay -->
                <div v-if="processing" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                  <span class="loader"></span>
                </div>
              </div>
            </div>
          </div>
        </section>
    
        <!-- Action Buttons -->
        <div class="flex justify-between my-6">
          <button type="button" @click="cancelRequest" class="px-6 py-3.5 bg-white border border-gray-100 text-[#292929] text-sm rounded-lg hover:bg-gray-300">Cancel</button>
          <button :disabled="processing || !isFormEnabled" type="submit" class="px-6 py-3.5 bg-[#292929] text-white disabled:cursor-not-allowed disabled:opacity-25 rounded-lg text-sm hover:bg-gray-900">{{ loading ? 'processing...' : 'Send request'}}</button>
        </div>
      </form>
    </main>
  </template>
  
  <script lang="ts" setup>
  import { useUploadFile } from '@/composables/core/upload'
  import { useCreateMaintenanceRequest } from '@/composables/modules/maintenance/useCreateMaintenanceRequest'
  import { ref, watch } from 'vue'
  const router = useRouter()
  
  const { createMaintenanceRequest, loading, payload, isFormEnabled } = useCreateMaintenanceRequest()
  const { uploadFile, loading: processing, uploadResponse } = useUploadFile()
  
  const maintanceTypes = ref([
    'General repairs (broken windows, doors, locks..etc)', 'Plumbing issues', 'Electrical issues', 
    'Heating, ventilation and air conditioning issues ', 'Appliance repairs', 'Pest controls', 
    'Painting', 'Flooring repairs', 'Light fixture repairs or replacements'
  ])
  
  const urgencyLevels = ref(['emergency', 'high', 'medium', 'low'])
  
  // Handle Image Upload
  const onImageUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target.files
    if (files && files[0]) {
      const file = files[0]
      await uploadFile(file)
      if (uploadResponse.value) {
        payload.value.images.push(uploadResponse.value.url)
      }
    }
  }
  
  // Remove Image
  const removeImage = (index: number) => {
    payload.value.images.splice(index, 1)
  }
  
  // Submit Request
  const handleSubmit = async () => {
    console.log('yo')
    await createMaintenanceRequest()
  }
  
  // Cancel Request
  const cancelRequest = () => {
    payload.value = { type: '', urgencyLevel: '', description: '', images: [] }
  }
  </script>
  
  <style scoped>
  /* Loader CSS */
  .loader {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #5B8469;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @media (max-width: 768px) {
    .max-w-md { width: 100%; }
  }
  </style>
  