<template>
  <div class="mx-auto">
    <h1 class="text-xl font-medium mb-6">Marital information</h1>

    <form @submit.prevent="goNext">
      <div class="space-y-6">
        <!-- Marital Status -->
        <div>
          <label class="block text-sm text-[#1D2739] font-medium mb-2">
            Marital status <span class="text-red-500">*</span>
          </label>
          <select
            v-model="maritalStatus"
            class="w-full p-3.5 text-sm text-gray-900 outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
          >
            <option value="">Select marital status</option>
            <option value="married">Married</option>
            <option value="single">Single</option>
          </select>
        </div>

        <!-- Spouse Information (Conditional) -->
        <RentalApplicationsSpouseInfo
          v-if="maritalStatus === 'married'"
          v-model:spouse="spouseInfo"
          :spouseInfo="spouseInfo"
          v-model:isValid="isSpouseInfoValid"
        />

        <!-- Bottom Buttons -->
        <div
          class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center border-[0.5px]"
        >
          <div class="max-w-2xl w-full flex justify-between">
            <button
              type="button"
              class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]"
              @click="goBack"
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
import { ref, computed, onMounted, watch } from "vue";
import { useFormPersistence } from "@/composables/core/useFormPersistence";
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";

const router = useRouter();
const route = useRoute();

interface SpouseInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  idDocs: {
    type: string;
    fileUrls: string[];
  };
}

// Define state variables
const maritalStatus = ref("");
const spouseInfo = ref<SpouseInfo>({
  fullName: "",
  email: "",
  phoneNumber: "",
  idDocs: {
    type: "",
    fileUrls: [],
  },
});
const isSpouseInfoValid = ref(false);

// Fetch property data
const { propertyObj, loading } = useFetchProperty();

// Use persistence for saving form progress
const { saveData, loadData } = useFormPersistence();

// Load existing data on mount
onMounted(() => {
  const savedMaritalStatus = loadData("maritalStatus");
  const savedMaritalContact = loadData("maritalData");

  if (savedMaritalStatus) {
    maritalStatus.value = savedMaritalStatus;
  }

  if (savedMaritalContact) {
    spouseInfo.value = savedMaritalContact;
  }
});

// Watch for changes in property API response
watch(
  () => propertyObj.value,
  (newVal) => {
    if (newVal?.maritalStatus) {
      maritalStatus.value = newVal.maritalStatus || "";
    }
    if (newVal?.maritalData) {
      spouseInfo.value = newVal.maritalData || {
        fullName: "",
        email: "",
        phoneNumber: "",
        idDocs: { type: "", fileUrls: [] },
      };
    }
  },
  { immediate: true }
);

// **Fix:** Ensure `isFormValid` updates correctly
const isFormValid = computed(() => {
  if (maritalStatus.value === "married") {
    return isSpouseInfoValid.value;
  }
  return maritalStatus.value !== "";
});

// **Fix:** Ensure data updates properly when spouseInfo is changed
watch(spouseInfo, (newValue) => {
  saveData("maritalData", newValue);
});

// **Fix:** Ensure `isSpouseInfoValid` updates correctly when the child emits changes
watch(isSpouseInfoValid, (newValue) => {
  console.log("isSpouseInfoValid Updated:", newValue);
});

// Proceed to next step
const goNext = () => {
  if (isFormValid.value) {
    saveData("maritalStatus", maritalStatus.value);
    saveData("maritalData", spouseInfo.value);
    router.push({ query: { step: "5" } });
  }
};

const emit = defineEmits(['back'])

// Go back to the previous step
const goBack = () => {
  emit('back')
  // router.push(`/dashboard/listings/${route.params.id}/preview`);
  localStorage.removeItem("maritalStatus");
  localStorage.removeItem("maritalData");
};
</script>
