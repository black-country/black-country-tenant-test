<!-- <template>
    <div class="space-y-6 pb-32">

      <div>
        <label class="block text-sm text-sm text-[#1D2739] outline-none font-medium mb-2">
          Full name <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.fullName"
          type="text"
           class="w-full p-3.5 text-sm text-[#98A2B3] outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
          placeholder="Enter your spouse's full name"
        />
      </div>
  

      <div>
        <label class="block text-sm text-sm text-[#1D2739] outline-none font-medium mb-2">
          Email address <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.email"
          type="email"
           class="w-full p-3.5 text-sm text-[#98A2B3] rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
          placeholder="Enter your spouse's email address"
        />
      </div>
  

      <div>
        <label class="block text-sm text-sm text-[#1D2739] outline-none font-medium mb-2">
          Phone number <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.phone"
          type="tel"
           class="w-full p-3.5 text-sm text-[#98A2B3] rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
        />
      </div>
  

      <div>
        <label class="block text-sm text-sm text-[#1D2739] outline-none font-medium mb-2">ID Type</label>
        <select
          v-model="spouseInfoObj.idType"
          class="w-full p-3.5 text-sm text-[#98A2B3] rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
        >
          <option value="">Select ID type</option>
          <option value="driver_license">Driver License</option>
          <option value="passport">Passport</option>
        </select>
      </div>
  

      <div v-if="spouseInfoObj.idType">
        <label class="block text-sm text-sm text-[#1D2739] outline-none font-medium mb-2">
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
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useFileUpload } from '@/composables/core/useFileUpload'
  
  const props = defineProps({
    spouse: {
      type: Object,
      required: true
    },
    // spouseInfo: {
    //   type: Object,
    //   required: true
    // }
  })

  const spouseInfoObj = ref({
  fullName: "",
  email: "",
  phone: "",
  idType: "",
  idImage: null,
});
  
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
  </script> -->

  <template>
    <div class="space-y-6 pb-32">
      <!-- Debugging: Show data -->
      {{ spouseInfoObj }}
  
      <!-- Full Name -->
      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Full name <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.fullName"
          type="text"
          class="w-full p-3.5 text-sm text-[#98A2B3] outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
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
          class="w-full p-3.5 text-sm text-[#98A2B3] rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
          placeholder="Enter your spouse's email address"
        />
      </div>
  
      <!-- Phone -->
      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Phone number <span class="text-red-500">*</span>
        </label>
        <input
          v-model="spouseInfoObj.phone"
          type="tel"
          class="w-full p-3.5 text-sm text-[#98A2B3] rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
          placeholder="Enter your spouse's phone number"
        />
      </div>
  
      <!-- ID Type -->
      <div>
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          ID Type <span class="text-red-500">*</span>
        </label>
        <select
          v-model="spouseInfoObj.idType"
          @change="handleIdTypeChange"
          class="w-full p-3.5 text-sm text-[#98A2B3] rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
        >
          <option value="">Select ID type</option>
          <option value="driver_license">Driver License</option>
          <option value="passport">Passport</option>
        </select>
      </div>
  
      <!-- ID Upload -->
      <div v-if="spouseInfoObj.idType">
        <label class="block text-sm text-[#1D2739] font-medium mb-2">
          Upload a clear photo of your spouse's ID card
        </label>
        <div
          class="w-full p-3.5 text-sm text-[#98A2B3] rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
        >
          <input
            type="file"
            class="hidden"
            ref="fileInput"
            @change="handleFileUpload"
            accept="image/*"
          />
          <div v-if="!spouseInfoObj.idImage" @click="$refs.fileInput.click()" class="cursor-pointer">
            <span class="text-gray-500">Click to upload ID Card</span>
          </div>
          <div v-else class="relative">
            <img :src="spouseInfoObj.idImage" class="w-full object-cover h-44 mx-auto" />
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
  import { ref, watch, onMounted } from 'vue'
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
  
  // ✅ Create a local copy of `spouse` to manage form state
  const spouseInfoObj = ref({
    fullName: "",
    email: "",
    phone: "",
    idType: "",
    idImage: null,
  })
  
  // ✅ Populate `spouseInfoObj` from props when component mounts
  onMounted(() => {
    spouseInfoObj.value = { ...props.spouse }
  })
  
  // ✅ Watch `spouseInfoObj` and emit changes to parent
  watch(spouseInfoObj, (newValue) => {
    emit("update:spouse", newValue)
  }, { deep: true })
  
  // ✅ Handle ID Type Change (Ensures ID Upload Section Appears)
  const handleIdTypeChange = () => {
    if (!spouseInfoObj.value.idType) {
      spouseInfoObj.value.idImage = null // Reset ID image if ID type is cleared
    }
  }
  
  // ✅ Watch for file uploads and update spouse object
  watch(uploadedFile, (newFile) => {
    if (newFile) {
      spouseInfoObj.value.idImage = previewUrl.value
    }
  })
  
  // ✅ Clear Upload
  const clearUpload = () => {
    if (fileInput.value) {
      fileInput.value.value = ''
    }
    uploadedFile.value = null
    previewUrl.value = ''
    spouseInfoObj.value.idImage = null
  }
  
  // ✅ Validate the Form
  watch(
    () => spouseInfoObj.value,
    () => {
      const isValid = !!(
        spouseInfoObj.value.fullName &&
        spouseInfoObj.value.email &&
        spouseInfoObj.value.phone &&
        spouseInfoObj.value.idType &&
        spouseInfoObj.value.idImage // ✅ Ensure ID Image is selected
      )
      emit('update:isValid', isValid)
    },
    { deep: true }
  )
  </script>
  