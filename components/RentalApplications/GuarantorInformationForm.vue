<template>
  <div class="mx-auto pb-32">
    <h1 class="text-lg font-medium mb-6">Guarantor's information</h1>
    
    <!-- <form @submit.prevent="handleSubmit"> -->
      <form>
      <div class="space-y-6">
        <section class="grid grid-cols-2 gap-6 w-full">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-medium mb-2"> Full name <span class="text-red-500">*</span> </label>
            <input v-model="guarantorInfo.fullName" type="text" class="input-field" placeholder="Enter full name"/>
          </div>

          <!-- Relationship -->
          <div>
            <label class="block text-sm font-medium mb-2"> Relationship <span class="text-red-500">*</span> </label>
            <select v-model="guarantorInfo.relationship" class="input-field">
              <option value="">Select relationship</option>
              <option value="parent">Parent</option>
              <option value="sibling">Sibling</option>
              <option value="relative">Relative</option>
              <option value="friend">Friend</option>
            </select>
          </div>
        </section>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-2"> Email address <span class="text-red-500">*</span> </label>
          <input v-model="guarantorInfo.email" type="email" class="input-field" placeholder="Enter email address"/>
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium mb-2"> Phone number <span class="text-red-500">*</span> </label>
          <input v-model="guarantorInfo.phoneNumber" type="tel" class="input-field" placeholder="Enter phone number"/>
        </div>

        <!-- Additional Phone -->
        <div>
          <label class="block text-sm font-medium mb-2"> Additional phone number </label>
          <input v-model="guarantorInfo.additionalPhoneNumber" type="tel" class="input-field" placeholder="Enter additional phone number"/>
        </div>

        <!-- ID Upload Section -->
        <div>
          <label class="block text-sm font-medium mb-2"> ID Type <span class="text-red-500">*</span> </label>
          <select v-model="guarantorInfo.idDocs.type" class="input-field">
            <option value="">Select ID type</option>
            <option value="driver_license">Driver License</option>
            <option value="passport">Passport</option>
          </select>
        </div>

        <!-- ID Upload -->
        <div v-if="guarantorInfo.idDocs.type">
          <label class="block text-sm font-medium mb-2"> Upload a clear photo of your guarantor's ID card </label>
          <div class="input-field">
            <input type="file" class="hidden" ref="fileInput" @change="handleFileUpload" accept="image/*"/>
            <div v-if="!uploadResponse.url && !loading" @click="$refs.fileInput.click()" class="cursor-pointer">
              <span class="text-gray-500">Click to upload ID Card</span>
            </div>
            <div v-else-if="loading" class="flex items-center justify-center">
              <span class="text-gray-500">Uploading...</span>
            </div>
            <div v-else class="relative">
              <img :src="uploadResponse.url" class="w-full object-cover h-44 mx-auto"/>
              <button @click="clearUpload" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">×</button>
            </div>
          </div>
        </div>

        <!-- Terms -->
        <div class="space-y-4">
          <div class="flex items-start">
            <input type="checkbox" v-model="guarantorInfo.termsAccepted" class="mt-1 mr-2 h-4 w-4"/>
            <p class="text-sm text-[#1D2939]">
              I certify that all the information given above is true and I understand that my rental agreement may
              be terminated if I have made any materially false or incomplete statements in this application.
            </p>
          </div>
          
          <div class="flex items-start">
            <input type="checkbox" v-model="guarantorInfo.verificationAccepted" class="mt-1 mr-2 h-4 w-4"/>
            <p class="text-sm text-[#1D2939]"> I authorize verification of the information provided in this application from my sources. </p>
          </div>
        </div>

        <!-- Bottom Buttons -->     
        <div class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center border-[0.5px]">
          <div class="max-w-2xl w-full flex justify-between">
            <button type="button" class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]" @click="goBack">Back</button>
            <button @click="handleSubmit" type="button" :disabled="!isFormValid" :class="['px-6 py-2 rounded-lg', isFormValid ? 'bg-black text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed']">Continue</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useFileUpload } from '@/composables/core/useFileUpload'
import { useFormPersistence } from "@/composables/core/useFormPersistence";
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
import { useUploadFile } from "@/composables/core/upload";

const { uploadFile, loading, uploadResponse } = useUploadFile();

const router = useRouter();
const route = useRoute();

// Define Guarantor Info
const guarantorInfo = ref({
fullName: '',
relationship: '',
email: '',
phoneNumber: '',
additionalPhoneNumber: '',
idDocs: {
  type: '',
  fileUrls: []
},
termsAccepted: false,
verificationAccepted: false
});

const emit = defineEmits(['back'])

// Load existing data
const { saveData, loadData } = useFormPersistence();
onMounted(() => {
  const savedGuarantorInfo = loadData("guarantorData");
  if (savedGuarantorInfo) {
    guarantorInfo.value = savedGuarantorInfo;

    // ✅ Ensure file URL is correctly mapped to the upload preview
    if (savedGuarantorInfo.idDocs.fileUrls.length) {
      uploadResponse.value.url = savedGuarantorInfo.idDocs.fileUrls[0];
    }
  }
});
// onMounted(() => {
// const savedGuarantorInfo = loadData("guarantorData");
// if (savedGuarantorInfo) {
//   guarantorInfo.value = savedGuarantorInfo;
// }
// });

// Validate form
const isFormValid = computed(() => {
return !!(
  guarantorInfo.value.fullName &&
  guarantorInfo.value.relationship &&
  guarantorInfo.value.email &&
  guarantorInfo.value.phoneNumber &&
  guarantorInfo.value.idDocs.type &&
  uploadResponse.value.url &&
  guarantorInfo.value.termsAccepted &&
  guarantorInfo.value.verificationAccepted
);
});

// Handle File Upload
const handleFileUpload = async (event: Event) => {
const file = (event.target as HTMLInputElement).files?.[0];
if (file) {
  await uploadFile(file);
  if (uploadResponse.value.url) {
    guarantorInfo.value.idDocs.fileUrls = [uploadResponse.value.url];
  }
}
};

// Clear Upload
const clearUpload = () => {
uploadResponse.url = '';
guarantorInfo.value.idDocs.fileUrls = [];
};

// Submit Data
const handleSubmit = () => {
if (isFormValid.value) {
  saveData("guarantorData", guarantorInfo.value);
  router.push({ query: { step: "preview" } });
}
};

// Go Back
const goBack = () => {
  emit('back')
// router.push(`/dashboard/listings/${route.params.id}/preview`);
};
</script>

<style scoped>
.input-field {
@apply w-full p-3.5 text-sm text-gray-900 outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100;
}
</style>
