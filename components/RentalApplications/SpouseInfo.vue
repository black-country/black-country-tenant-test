<!-- <template>
    <div class="space-y-6 pb-32">
      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Full name <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.fullName"
          type="text"
          class="w-full p-3.5 text-sm text-gray-900 outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
          placeholder="Enter your spouse's full name"
        />
      </div>
  

      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Email address <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.email"
          type="email"
          class="w-full p-3.5 text-sm text-gray-900 rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
          placeholder="Enter your spouse's email address"
        />
      </div>
  

      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Phone number <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.phoneNumber"
          type="tel"
          class="w-full p-3.5 text-sm text-gray-900 rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
          placeholder="Enter your spouse's phone number"
        />
      </div>
  

      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          ID Type <span class="text-red-500">*</span>
        </label>
        <select
          v-model="spouseInfoObj.idDocs.type"
          @change="handleIdTypeChange"
          class="w-full p-3.5 text-sm text-gray-900 rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
        >
          <option value="">Select ID type</option>
          <option value="drivers_license">Driver License</option>
          <option value="passport">Passport</option>
        </select>
      </div>
  

      <div v-if="spouseInfoObj.idDocs.type">
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Upload a clear photo of your spouse's ID card
        </label>
        <div
          class="w-full p-3.5 text-sm text-gray-900 rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
        >
          <input
            type="file"
            class="hidden"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
          />
  
          <div v-if="loading" class="text-center">
            <span class="text-gray-500">Uploading...</span>
          </div>
  
          <div v-else-if="uploadResponse.url" class="relative">
            <img :src="uploadResponse.url" class="w-full object-cover h-44 mx-auto" />
            <button
              @click="clearUpload"
              class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
            >
              ×
            </button>
          </div>
  
          <div v-else @click="$refs.fileInput.click()" class="cursor-pointer">
            <span class="text-gray-500">Click to upload ID Card</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted } from "vue";
  import { useUploadFile } from "@/composables/core/upload"; // Import file upload composable
  const { uploadFile, loading, uploadResponse } = useUploadFile(); // Handle file uploads
  import { useFormPersistence } from "@/composables/core/useFormPersistence";
  
  const props = defineProps({
    spouse: {
      type: Object,
      required: true,
    },
  });
  const emit = defineEmits(["update:spouse", "update:isValid"]);
  const fileInput = ref<HTMLInputElement | null>(null);
  // ✅ Create a local copy of `spouse` to manage form state
  const spouseInfoObj = ref({
    fullName: "",
    email: "",
    phoneNumber: "",
    idDocs: {
      type: "",
      fileUrls: [],
    },
  });
  
  // ✅ Populate `spouseInfoObj` from props when component mounts
  onMounted(() => {
    spouseInfoObj.value = {
      ...props.spouse,
      idDocs: props.spouse.idDocs || { type: "", fileUrls: [] },
    };
  });

  // ✅ Watch `spouseInfoObj` and emit changes to parent
  watch(
    spouseInfoObj,
    (newValue) => {
      emit("update:spouse", newValue);
    },
    { deep: true }
  );
  
  // ✅ Handle ID Type Change (Ensures ID Upload Section Appears)
  const handleIdTypeChange = () => {
    if (!spouseInfoObj.value.idDocs.type) {
      spouseInfoObj.value.idDocs.fileUrls = []; // Reset ID image if ID type is cleared
    }
  };
  
  // ✅ Handle File Upload
  const handleFileUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const res = await uploadFile(file); // Upload file using composable
      console.log(res, 'res here')
  console.log(uploadResponse.value, 'upload res here')
      if (uploadResponse.value.url) {
        spouseInfoObj.value.idDocs.fileUrls = [uploadResponse.value.url]; // Store uploaded file URL
      }
    }
  };
  
  // ✅ Clear Upload
  const clearUpload = () => {
    if (fileInput.value) {
      fileInput.value.value = "";
    }
    uploadResponse.value.url = "";
    spouseInfoObj.value.idDocs.fileUrls = [];
  };
  
  // ✅ Validate the Form
  watch(
    () => spouseInfoObj.value,
    () => {
      const isValid = !!(
        spouseInfoObj.value.fullName &&
        spouseInfoObj.value.email &&
        spouseInfoObj.value.phoneNumber &&
        spouseInfoObj.value.idDocs.type &&
        spouseInfoObj.value.idDocs.fileUrls.length > 0 // ✅ Ensure at least one file is uploaded
      );
      emit("update:isValid", isValid);
    },
    { deep: true }
  );
  </script>
   -->

   <template>
    <div class="space-y-6 pb-32">
      <!-- Full Name -->
      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Full name <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.fullName"
          type="text"
          class="input-field"
          placeholder="Enter your spouse's full name"
        />
      </div>
  
      <!-- Email -->
      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Email address <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.email"
          type="email"
          class="input-field"
          placeholder="Enter your spouse's email address"
        />
      </div>
  
      <!-- Phone -->
      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Phone number <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.phoneNumber"
          type="tel"
          class="input-field"
          placeholder="Enter your spouse's phone number"
        />
      </div>
  
      <!-- ID Type -->
      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          ID Type <span class="text-red-500">*</span>
        </label>
        <select
          v-model="spouseInfoObj.idDocs.type"
          @change="handleIdTypeChange"
          class="input-field"
        >
          <option value="">Select ID type</option>
          <option value="drivers_license">Driver License</option>
          <option value="passport">Passport</option>
        </select>
      </div>
  
      <!-- ID Upload -->
      <div v-if="spouseInfoObj.idDocs.type">
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Upload a clear photo of your spouse's ID card
        </label>
        <div class="input-field">
          <input type="file" class="hidden" ref="fileInput" @change="handleFileUpload" accept="image/*"/>
  
          <!-- Show loading state while uploading -->
          <div v-if="loading" class="text-center">
            <span class="text-gray-500">Uploading...</span>
          </div>
  
          <!-- Show the uploaded image if it exists -->
          <div v-else-if="spouseInfoObj.idDocs.fileUrls.length">
            <img :src="spouseInfoObj.idDocs.fileUrls[0]" class="w-full object-cover h-44 mx-auto"/>
            <button @click="clearUpload" class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">×</button>
          </div>
  
          <!-- Show upload button if no image exists -->
          <div v-else @click="$refs.fileInput.click()" class="cursor-pointer">
            <span class="text-gray-500">Click to upload ID Card</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted } from "vue";
  import { useUploadFile } from "@/composables/core/upload"; // Import file upload composable
  import { useFormPersistence } from "@/composables/core/useFormPersistence";
  
  const { uploadFile, loading, uploadResponse } = useUploadFile(); // Handle file uploads
  const { saveData, loadData } = useFormPersistence();
  const fileInput = ref<HTMLInputElement | null>(null);
  
  const props = defineProps({
    spouse: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(["update:spouse", "update:isValid"]);
  
  // ✅ Create a local copy of `spouse` to manage form state
  const spouseInfoObj = ref({
    fullName: "",
    email: "",
    phoneNumber: "",
    idDocs: {
      type: "",
      fileUrls: [],
    },
  });
  
  // ✅ Populate `spouseInfoObj` from props or local storage when component mounts
  onMounted(() => {
    const savedSpouseInfo = loadData("maritalData");
    if (savedSpouseInfo) {
      spouseInfoObj.value = savedSpouseInfo;
  
      // ✅ Ensure file URL is correctly mapped to the upload preview
      if (savedSpouseInfo.idDocs.fileUrls.length) {
        uploadResponse.value.url = savedSpouseInfo.idDocs.fileUrls[0];
      }
    } else {
      spouseInfoObj.value = {
        ...props.spouse,
        idDocs: props.spouse.idDocs || { type: "", fileUrls: [] },
      };
    }
  });
  
  // ✅ Watch `spouseInfoObj` and emit changes to parent
  watch(
    spouseInfoObj,
    (newValue) => {
      emit("update:spouse", newValue);
    },
    { deep: true }
  );
  
  // ✅ Handle ID Type Change (Ensures ID Upload Section Appears)
  const handleIdTypeChange = () => {
    if (!spouseInfoObj.value.idDocs.type) {
      spouseInfoObj.value.idDocs.fileUrls = []; // Reset ID image if ID type is cleared
    }
  };
  
  // ✅ Handle File Upload
  const handleFileUpload = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      await uploadFile(file);
      if (uploadResponse.value.url) {
        spouseInfoObj.value.idDocs.fileUrls = [uploadResponse.value.url]; // Store uploaded file URL
      }
    }
  };
  
  // ✅ Clear Upload
  const clearUpload = () => {
    if (fileInput.value) {
      fileInput.value.value = "";
    }
    uploadResponse.value.url = "";
    spouseInfoObj.value.idDocs.fileUrls = [];
  };
  
  // ✅ Validate the Form
  watch(
    () => spouseInfoObj.value,
    () => {
      const isValid = !!(
        spouseInfoObj.value.fullName &&
        spouseInfoObj.value.email &&
        spouseInfoObj.value.phoneNumber &&
        spouseInfoObj.value.idDocs.type &&
        spouseInfoObj.value.idDocs.fileUrls.length > 0 // ✅ Ensure at least one file is uploaded
      );
      emit("update:isValid", isValid);
    },
    { deep: true }
  );
  </script>
  
  <style scoped>
  .input-field {
    @apply w-full p-3.5 text-sm text-gray-900 outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100;
  }
  </style>
  