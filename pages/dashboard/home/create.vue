<!-- <template>
  <main>
    <TopNavBar />
    <div class="min-h-screen flex flex-col justify-between max-w-3xl mx-auto">
      <div class="bg-white p-6">
        <div class="flex items-center text-gray-600 mb-4">
          <svg
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

          <span class="ml-2 text-sm text-[#667185]"
            >My Home |
            <span class="text-[#1D2739] font-medium"
              >Maintenance requests</span
            ></span
          >
        </div>
        <div class="text-gray-500 flex-col">
          <h2 class="text- font-semibold text-[#1D2739] pt-3">
            Maintenance request
          </h2>
        </div>
        <form class="mt-6 space-y-6 w-full">
          <div>
            <label class="text-[#1D2739] text-sm">Maintenance type</label>
            <select  class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4">
             <option v-for="item in maintanceTypes" :key="item">
               {{ item }}
             </option>
            </select>
          </div>

          <div>
            <label class="text-[#1D2739] text-sm">Urgency level</label>
            <select  class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4">
             <option v-for="item in urgencyLevels" :key="item">
               {{ item }}
             </option>
            </select>
          </div>

          <div>
            <label class="text-[#1D2739] text-sm"
              >Description of issue <span class="text-red-500">*</span></label
            >
            <textarea
              cols="6"
              rows="6"
              class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
              placeholder="Enter phone number"
            ></textarea>
          </div>

           <div>
            <label class="text-[#1D2739] text-sm">Set your profile picture</label>
            <div class="bg-[#F0F2F5] rounded-lg p-6 py-10 border-dashed border-2 border-[#F0F2F5] justify-center text-center flex items-center"> 
            <div class="flex justify-center items-center flex-col w-full">
                <div class="flex justify-center items-center">
                <button @click="triggerFileUpload" class="bg-[#5B8469] text-white py-2 px-4 rounded-md flex items-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2V10" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2 6H10" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span v-if="loading">Uploading...</span>
                    <span v-else> {{user.profilePicture ? 'Change Photo' : 'Add Photo'}}</span>
                </button>
                <input
                    type="file"
                    accept="image/*"
                    class="hidden"
                    ref="fileInput"
                    @change="onFileSelected"
                />
                </div>
                <p class="text-[#1D2739] text-sm mt-2">Accepts jpg & png, 2MB size max/each</p>
            </div>
            </div>
           </div>

        </form>
      </div>
    </div>
  </main>
</template>


<script setup lang="ts">
 import { ref } from 'vue';
  import { dynamicIcons } from "@/utils/assets";
  import { useUser } from '@/composables/auth/user';
  import { useUploadFile } from '@/composables/core/upload'
  import { use_update_profile } from '@/composables/auth/updateProfile'
  const router = useRouter()
  const { user } = useUser();
const maintanceTypes = ref([
    'General repairs (broken windows, doors, locks..etc)', 'Plumbing issues', 'Electrical issues', 'Heating, ventilation and air conditioning issues ', 'Appliance repairs', 'Pest controls', 'Painting', 'Flooring repairs', 'Light fixture repairs or replacements'
])

const urgencyLevels = ref([
    'Emergency', 'Plumbing issues', 'High', 'Medium', 'Low'
])

  
  const { uploadFile, loading, uploadResponse } = useUploadFile();
  const { credential, updateProfile, loading: updating } = use_update_profile();
  
  // Profile image state
  const profileImage = ref<string | null>(null);
  const fileInput = ref<HTMLInputElement | null>(null);
  
  // Function to trigger file upload
  const triggerFileUpload = () => {
    fileInput.value?.click();
  };

  // Function to handle file selection and upload
const onFileSelected = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    // Preview the image locally
    const reader = new FileReader();
    reader.onload = () => {
      profileImage.value = reader.result as string;
    };
    reader.readAsDataURL(file);

    // Upload the file using the composable
    await uploadFile(file);

    if (uploadResponse.value?.secure_url) {
      // Update profile with the secure URL after upload
      const uploadPayload = { profilePicture: uploadResponse.value.secure_url }
      await updateProfile(uploadPayload);
    }
  }
};
  
</script> -->

<template>
    <TopNavBar />
    <div  class="min-h-screen flex flex-col justify-between max-w-3xl mx-auto mt-6">
        <div class="flex items-center text-gray-600 mb-4">
          <svg
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

          <span class="ml-2 text-sm text-[#667185]"
            >My Home |
            <span class="text-[#1D2739] font-medium"
              >Maintenance requests</span
            ></span
          >
        </div>
     <section class="space-y-6">
        <h2 class="text-xl font-semibold mb-4">Maintenance request</h2>
  
  <!-- Maintenance Type -->
  <div>
        <label class="text-[#1D2739] text-sm">Maintenance type</label>
        <select  class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4">
         <option v-for="item in maintanceTypes" :key="item">
           {{ item }}
         </option>
        </select>
  </div>

  <!-- Urgency Level -->
  <div class="">
    <label class="text-[#1D2739] text-sm" for="urgencyLevel">Urgency level</label>
    <select v-model="form.urgencyLevel"  class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4">
         <option v-for="item in urgencyLevels" :key="item">
           {{ item }}
         </option>
        </select>
  </div>

  <!-- Description -->
  <div class="">
    <label class="text-[#1D2739] text-sm"
          >Description of issue <span class="text-red-500">*</span></label
        >
        <textarea
         v-model="form.description"
          cols="6"
          rows="6"
          placeholder="Describe the issue here..."
          class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
        ></textarea>
  </div>

  <!-- Image Upload -->
  <div class="">
    <label class="text-[#1D2739] text-sm">Upload image (Optional)</label>
    <div class="grid grid-cols-3 gap-3 w-full mt-2">
      <!-- Uploaded images -->
      <div
        v-for="(image, index) in form.images"
        :key="index"
        class="relative h-44 bg-[#F0F2F5] rounded overflow-hidden"
      >
        <img :src="image" alt="Uploaded" class="w-full h-full object-cover" />
        <button
          @click="removeImage(index)"
          class="absolute top-3 right-3 bg-[#F0F2F5] text-white rounded-full w-5 h-5 flex items-center justify-center"
        >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="28" height="28" rx="14" fill="black" fill-opacity="0.7"/>
<path d="M17.5 10.5L10.5 17.5M10.5 10.5L17.5 17.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        </button>
      </div>
      <!-- Add Photo Button -->
      <div class="relative bg-[#F0F2F5] w-full h-44 bg-gray-100 border-dashed border-2 border-gray-50 rounded flex items-center justify-center">
        <input
          type="file"
          accept="image/*"
          class="absolute inset-0 opacity-0 cursor-pointer"
          @change="onImageUpload"
        />
        <span class="text-center text-white">
            <span class="text-white bg-[#5B8469] flex items-center gap-x-2 rounded-lg px-4 block py-2 text-sm">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 2V10" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M2 6H10" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    </svg> Add photo
            </span>

          <span class="text-xs text-[#1D2739] mt-3">Accepts jpg & png<br />2MB max/each</span>
        </span>
      </div>
    </div>
  </div>
     </section>
  
      <!-- Action Buttons -->
      <div class="flex justify-between my-6">
        <button
          @click="cancelRequest"
          class="px-6 py-3.5 bg-white border border-gray-100 text-[#292929] text-sm rounded-lg rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="submitRequest"
          class="px-6 py-3.5 bg-[#292929] text-white rounded-lg text-sm rounded hover:bg-gray-900"
        >
          Send request
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  const form = ref({
    maintenanceType: 'Plumbing issues',
    urgencyLevel: 'High',
    description: '',
    images: [] as string[],
  })
  
  // Handle Image Upload
  const onImageUpload = (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target.files
    if (files && files[0]) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) form.value.images.push(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const maintanceTypes = ref([
    'General repairs (broken windows, doors, locks..etc)', 'Plumbing issues', 'Electrical issues', 'Heating, ventilation and air conditioning issues ', 'Appliance repairs', 'Pest controls', 'Painting', 'Flooring repairs', 'Light fixture repairs or replacements'
])

const urgencyLevels = ref([
    'Emergency', 'Plumbing issues', 'High', 'Medium', 'Low'
])
  
  // Remove Image
  const removeImage = (index: number) => {
    form.value.images.splice(index, 1)
  }
  
  // Submit Request
  const submitRequest = () => {
    // Logic to submit the maintenance request
    console.log('Submitting request:', form.value)
  }
  
  // Cancel Request
  const cancelRequest = () => {
    // Logic to cancel the request and reset the form
    form.value = {
      maintenanceType: 'Plumbing issues',
      urgencyLevel: 'High',
      description: '',
      images: [],
    }
  }
  </script>
  
  <style scoped>
  @media (max-width: 768px) {
    .max-w-md {
      width: 100%;
    }
  }
  </style>
  