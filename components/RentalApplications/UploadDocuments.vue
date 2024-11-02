

<template>
  <div class="relative min-h-screen max-w-2xl mx-auto flex flex-col">
    <!-- Main Content -->
    <div class="flex-grow">
      <!-- Initial Form for Selecting ID Type -->
      <div v-if="!uploadStep">
        <h2 class="text-xl font-medium text-[#1D2739] mb-6">Upload a clear photo of your ID card</h2>

        <!-- ID Type Selection -->
        <label class="block text-sm font-medium text-gray-700 mb-2">ID Type</label>
        <div class="relative mb-4">
          <select v-model="idType" class="block w-full p-3 py-4 text-sm border-gray-25 rounded-lg bg-[#F0F2F5] outline-none border-[0.5px] text-gray-700">
            <option value="" disabled>Select ID type</option>
            <option v-for="option in idOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </div>

        <!-- ID Card Checkbox -->
        <!-- <div class="flex items-center mb-4 block w-full p-3 py-4 text-sm border-gray-25 rounded-lg bg-[#F0F2F5] outline-none border-[0.5px] text-gray-700">
          <input type="checkbox" v-model="!!idType" class="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400" />
          <label class="ml-3 text-[#1D2739] text-sm font-medium">{{ getMappedId(idType) }}</label>
        </div> -->

        <div class="flex items-center mb-4 block w-full p-3 py-4 text-sm border-gray-25 rounded-lg bg-[#F0F2F5] outline-none border-[0.5px] text-gray-700">
  <input 
    type="checkbox" 
    :checked="isItemSelected" 
    class="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400" 
    disabled
  />
  <label class="ml-3 text-[#1D2739] text-sm font-medium">{{ getMappedId(idType) }}</label>
</div>

        <!-- Authorization Checkbox -->
        <div class="flex items-center mb-6">
          <input type="checkbox" v-model="authorizationChecked" class="form-checkbox h-5 w-5 text-orange-500 rounded focus:ring-orange-400" />
          <label class="ml-3 text-[#1D2739] font-medium text-sm">I authorize Homeowners/Property Managers to conduct background checks.</label>
        </div>

        <!-- Info Box -->
        <div class="bg-[#E8EDFB] p-4 rounded-lg text-sm mb-6">
          <div class="flex items-center justify-start gap-x-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.33 22.001H7.66C4.27 22.001 2 19.621 2 16.081V7.90998C2 4.37998 4.27 2.00098 7.66 2.00098H16.33C19.72 2.00098 22 4.37998 22 7.90998V16.081C22 19.621 19.72 22.001 16.33 22.001ZM12.01 14.94C12.48 14.94 12.87 15.331 12.87 15.81C12.87 16.3 12.48 16.69 11.99 16.69C11.51 16.69 11.12 16.3 11.12 15.81C11.12 15.331 11.51 14.94 12.01 14.94ZM11.13 8.21997C11.13 7.73997 11.52 7.34997 12.01 7.34997C12.49 7.34997 12.88 7.73997 12.88 8.21997V12.64C12.88 13.121 12.49 13.52 12.01 13.52C11.52 13.52 11.13 13.121 11.13 12.64V8.21997Z" fill="#4A71E0"/>
            </svg>

            <p class="text-xs text-[#1D2739]">Your information is strictly used for communication with landlords or property managers, in line with our privacy policy.</p>
          </div>
        </div>
      </div>

      <!-- Front and Back ID Upload UI -->
      <div v-if="uploadStep">
        <div class="space-y-3">
          <h2 class="text-lg font-medium text-[#1D2739] mb-6">Upload ID card</h2>
        </div>

        <!-- Front ID Upload -->
        <div class="my-6">
          <label class="block text-[#1D2739] mb-2 text-sm font-medium">Front ID</label>
          <div
            class="border border-dashed border-gray-100 bg-[#F9FAFB] p-20 w-full rounded-lg cursor-pointer flex justify-center items-center relative"
          >
            <input
              type="file"
              class="absolute inset-0 opacity-0 cursor-pointer"
              @change="handleFrontIdUpload"
              accept="image/*,application/pdf"
            />
            <!-- Loader -->
            <div v-if="loadingFrontId" class="loader">Uploading...</div>
            
            <!-- Preview Section -->
            <div v-else-if="frontIdPreview" class="w-full h-full flex justify-center items-center">
              <!-- Image Preview -->
              <img  :src="frontIdPreview"  alt="Front ID Preview" class="rounded-lg max-w-full h-60 object-cover w-full max-h-full" />
              <!-- PDF Preview -->
              <embed v-if="isFrontPdf" :src="frontIdPreview" class="w-full h-full" type="application/pdf" />
            </div>

            <!-- Default Message if no file is uploaded yet -->
            <div v-else class="text-center flex justify-center items-center gap-y-4 flex-col">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.5064 4.30508H19.9471V3.9661C19.9471 1.76271 18.1505 0 15.981 0C13.8115 0 12.0149 1.79661 12.0149 3.9661V4.30508H8.45557C6.86235 4.30508 5.57422 5.59322 5.57422 7.18644V29.1186C5.57422 30.7119 6.86235 32 8.45557 32H23.5403C25.1335 32 26.4217 30.7119 26.4217 29.1186V7.18644C26.3878 5.59322 25.0996 4.30508 23.5064 4.30508ZM15.981 1.69492C17.2352 1.69492 18.2522 2.71186 18.2522 3.9661V5.83051H13.7098V3.9661C13.6759 2.71186 14.7268 1.69492 15.981 1.69492ZM21.7776 27.8644H10.1844V26.1695H21.7776V27.8644ZM21.6081 23.9322H10.3539C10.1505 23.9322 10.0149 23.7966 10.0149 23.5932V22.5763C10.0149 21.661 10.5234 20.8136 11.3369 20.3729L13.5403 19.1864C13.642 19.1186 13.7098 19.0169 13.7098 18.8814V18.1695C13.3369 17.661 13.0657 17.0847 12.8963 16.4746C12.6251 16.2373 12.4895 15.8983 12.4895 15.5254V14.5424C12.4895 14.2712 12.5912 14 12.7268 13.7966V13.1864C12.659 12.5424 12.8963 11.8644 13.303 11.3559C13.8793 10.7119 14.7607 10.3729 15.981 10.3729C17.2013 10.3729 18.0827 10.7119 18.659 11.3559C19.0996 11.8644 19.303 12.5085 19.2352 13.1864V13.7966C19.4047 14 19.4725 14.2712 19.4725 14.5424V15.5254C19.4725 15.9661 19.2352 16.4068 18.8285 16.6441C18.659 17.1186 18.4217 17.5932 18.1166 18.0339L18.0149 18.1695V18.8814C18.0149 19.0169 18.0827 19.1186 18.1844 19.1864L20.5234 20.3729C21.3708 20.8136 21.9132 21.661 21.9132 22.6441V23.5932C21.9471 23.7966 21.7776 23.9322 21.6081 23.9322Z" fill="#5B8469"/>
              </svg>
              <p class="text-sm">Tap to take a picture of your ID</p>
            </div>
          </div>
        </div>

        <!-- Back ID Upload -->
        <div class="mb-6">
          <label class="block text-[#1D2739] mb-2 text-sm font-medium">Back ID</label>
          <div
            class="border border-dashed bg-[#F9FAFB] border-gray-100 p-20 w-full rounded-lg cursor-pointer flex justify-center items-center relative"
          >
            <input
              type="file"
              class="absolute inset-0 opacity-0 cursor-pointer"
              @change="handleBackIdUpload"
              accept="image/*,application/pdf"
            />
            <!-- Loader -->
            <div v-if="loadingBackId" class="loader">Uploading...</div>

            <!-- Preview Section -->
            <div v-else-if="backIdPreview" class="w-full h-full flex justify-center items-center">
              <!-- Image Preview -->
              <img :src="backIdPreview" alt="Back ID Preview" class="rounded-lg max-w-full h-60 object-cover w-full max-h-full" />
              <!-- PDF Preview -->
              <embed v-if="isBackPdf" :src="backIdPreview" class="w-full h-full" type="application/pdf" />
            </div>

            <!-- Default Message if no file is uploaded yet -->
            <div v-else class="text-center flex justify-center items-center gap-y-4 flex-col">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.5064 4.30508H19.9471V3.9661C19.9471 1.76271 18.1505 0 15.981 0C13.8115 0 12.0149 1.79661 12.0149 3.9661V4.30508H8.45557C6.86235 4.30508 5.57422 5.59322 5.57422 7.18644V29.1186C5.57422 30.7119 6.86235 32 8.45557 32H23.5403C25.1335 32 26.4217 30.7119 26.4217 29.1186V7.18644C26.3878 5.59322 25.0996 4.30508 23.5064 4.30508ZM15.981 1.69492C17.2352 1.69492 18.2522 2.71186 18.2522 3.9661V5.83051H13.7098V3.9661C13.6759 2.71186 14.7268 1.69492 15.981 1.69492ZM21.7776 27.8644H10.1844V26.1695H21.7776V27.8644ZM21.6081 23.9322H10.3539C10.1505 23.9322 10.0149 23.7966 10.0149 23.5932V22.5763C10.0149 21.661 10.5234 20.8136 11.3369 20.3729L13.5403 19.1864C13.642 19.1186 13.7098 19.0169 13.7098 18.8814V18.1695C13.3369 17.661 13.0657 17.0847 12.8963 16.4746C12.6251 16.2373 12.4895 15.8983 12.4895 15.5254V14.5424C12.4895 14.2712 12.5912 14 12.7268 13.7966V13.1864C12.659 12.5424 12.8963 11.8644 13.303 11.3559C13.8793 10.7119 14.7607 10.3729 15.981 10.3729C17.2013 10.3729 18.0827 10.7119 18.659 11.3559C19.0996 11.8644 19.303 12.5085 19.2352 13.1864V13.7966C19.4047 14 19.4725 14.2712 19.4725 14.5424V15.5254C19.4725 15.9661 19.2352 16.4068 18.8285 16.6441C18.659 17.1186 18.4217 17.5932 18.1166 18.0339L18.0149 18.1695V18.8814C18.0149 19.0169 18.0827 19.1186 18.1844 19.1864L20.5234 20.3729C21.3708 20.8136 21.9132 21.661 21.9132 22.6441V23.5932C21.9471 23.7966 21.7776 23.9322 21.6081 23.9322Z" fill="#5B8469"/>
              </svg>
              <p class="text-sm">Tap to take a picture of your ID</p>
            </div>
          </div>
        </div>

        <p class="text-[#667185] text-sm mt-2">NB: Make sure we can see your ID number clearly.</p>
      </div>
    </div>

    <!-- Footer with Back and Continue Buttons -->
    <div class="fixed bottom-0 left-0 right-0 bg-white py-4 px-6 border-t border-gray-200">
      <div class="flex justify-between max-w-lg mx-auto">
        <button
          class="px-6 py-3 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none"
          @click="goBack"
        >
          Back
        </button>
        <button
          class="px-6 py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-25 bg-black rounded-md hover:bg-gray-800 focus:outline-none"
          :disabled="!canProceed"
          @click="submitForm"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUploadFile } from '@/composables/core/upload';
import { useFormPersistence } from '@/composables/core/useFormPersistence';
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();

// State variables for form
// const localData = JSON.parse(localStorage.getItem('uploaded-document'));
// const idType = ref(localData?.type || '');
// const idCardChecked = ref(false);
// const authorizationChecked = ref(false);
const localData = JSON.parse(localStorage.getItem('uploaded-document'));
const idType = ref(localData?.type || '');

// Computed property to check if an item is selected
const isItemSelected = computed(() => !!idType.value);


// Initialize the checkboxes as unchecked
const idCardChecked = ref(false);
const authorizationChecked = ref(false);

// If localData.type exists, set checkboxes to true
if (localData?.type) {
  idCardChecked.value = true;
  authorizationChecked.value = true;
}

const uploadStep = ref(false);

// State variables for front and back ID previews
const frontIdPreview = ref<string | null>(null);
const backIdPreview = ref<string | null>(null);
const isFrontImage = ref(false);
const isFrontPdf = ref(false);
const isBackImage = ref(false);
const isBackPdf = ref(false);
const route = useRoute()

// Loader state
const loadingFrontId = ref(false);
const loadingBackId = ref(false);

// Document format for saving
const documentData = ref({
  type: idType.value,
  fileUrls: [] as string[]
});

// Use the upload composable
const { uploadFile, uploadResponse } = useUploadFile();

const router = useRouter();
const { saveData, loadData } = useFormPersistence();

// Load existing data and prefill the form if available
const existingData = loadData('uploaded-document');
if (existingData) {
  documentData.value.type = existingData.type;
  documentData.value.fileUrls = existingData.fileUrls;

  frontIdPreview.value = documentData.value.fileUrls[0] || null;
  backIdPreview.value = documentData.value.fileUrls[1] || null;

  isFrontImage.value = frontIdPreview.value?.startsWith('data:image/') || frontIdPreview.value?.endsWith('.jpg') || false;
  isFrontPdf.value = frontIdPreview.value?.startsWith('data:application/pdf') || frontIdPreview.value?.endsWith('.pdf') || false;
  isBackImage.value = backIdPreview.value?.startsWith('data:image/') || backIdPreview.value?.endsWith('.jpg') || false;
  isBackPdf.value = backIdPreview.value?.startsWith('data:application/pdf') || backIdPreview.value?.endsWith('.pdf') || false;
}

// Dropdown options for ID types
const idOptions = ref([
  { label: 'National Identity Card (NIMC)', value: 'nimc' },
  { label: 'Drivers License', value: 'drivers_license' },
  { label: 'International Passport', value: 'passport' },
  { label: 'Voters Card', value: 'voters_card' },
]);

const getMappedId = (item) => {
  if (typeof item !== 'string') {
    return '';
  }
  
  const idType = {
    'nimc': 'National Identity Card (NIMC)',
    'drivers_license': 'Drivers License',
    'passport': 'International Passport',
    'voters_card': 'Voters Card'
  };
  
  return idType[item] || '';
};


// Check if the user can proceed to the next step
const canProceed = computed(() => idType.value && isItemSelected.value && authorizationChecked.value);

// Handle navigation for Back button
const goBack = () => {
  if (uploadStep.value) {
    uploadStep.value = false;
  } else {
    router.go(-1);
  }
};

// Navigate to the upload page
const submitForm = () => {
  if (!uploadStep.value) {
    uploadStep.value = true;
  } else {
    // Save the data, including file responses
    const formData = {
      type: idType.value,
      fileUrls: [...documentData.value.fileUrls]
    };
    saveData('uploaded-document', formData);
    showToast({
    title: "Success",
    message: "Data was saved successfully",
    toastType: "success",
    duration: 3000,
  });
  router.push({
    path: route.path, // Keep the same path
    query: { ...route.query, step: "2" }, // Update the query with the new step
  });
  }
};

// Handle Front ID upload with API call and preview
const handleFrontIdUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const fileName = file.name;  // Get the file name

    // Show loader
    loadingFrontId.value = true;

    // Upload file using composable
    await uploadFile(file);

    if (uploadResponse.value) {
      frontIdPreview.value = uploadResponse.value.secure_url;
      isFrontImage.value = uploadResponse.value.type?.startsWith('image');
      isFrontPdf.value = uploadResponse.value.type?.startsWith('application/pdf');

      // Push the uploaded file URL to the fileUrls array
      documentData.value.fileUrls[0] = uploadResponse.value.secure_url;
      documentData.value.type = idType.value;
      saveData('uploaded-document', documentData.value);
    }

    // Hide loader after upload is done
    loadingFrontId.value = false;
  }
};

// Handle Back ID upload with API call and preview
const handleBackIdUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const fileName = file.name;  // Get the file name

    // Show loader
    loadingBackId.value = true;

    // Upload file using composable
    await uploadFile(file);

    if (uploadResponse.value) {
      backIdPreview.value = uploadResponse.value.secure_url;
      isBackImage.value = uploadResponse.value.type?.startsWith('image');
      isBackPdf.value = uploadResponse.value.type?.startsWith('application/pdf');

      // Push the uploaded file URL to the fileUrls array
      documentData.value.fileUrls[1] = uploadResponse.value.secure_url;
      documentData.value.type = idType.value;
      saveData('uploaded-document', documentData.value);
    }

    // Hide loader after upload is done
    loadingBackId.value = false;
  }
};
</script>
