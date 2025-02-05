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
            class="w-full p-3.5 text-sm text-[#98A2B3] outline-none rounded-lg bg-[#F0F2F5] border border-[0.5px] border-gray-100"
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
          v-model:isValid="isSpouseInfoValid"
        />

        <!-- Bottom Buttons -->
        <div
          class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center border-[0.5px]"
        >
          <div class="max-w-2xl w-full flex justify-between">
            <button
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
import { ref, computed } from "vue";
import { useFormPersistence } from "@/composables/core/useFormPersistence";
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";

const router = useRouter();
const route = useRoute();

interface SpouseInfo {
  fullName: string;
  email: string;
  phone: string;
  idType: string;
  idImage: File | null;
}

const maritalStatus = ref("");
const spouseInfo = ref<SpouseInfo>({
  fullName: "",
  email: "",
  phone: "",
  idType: "",
  idImage: null,
});
const isSpouseInfoValid = ref(false);


// Fetch property data
const { propertyObj, loading } = useFetchProperty();


// Load existing data from localStorage or create structure from API response
onMounted(() => {
  // Load saved questions if they exist
  const savedMaritalStatus = loadData("maritalStatus");
  const savedMaritalContact = loadData("maritalContact");
  if (savedMaritalStatus && savedMaritalStatus.length) {
    maritalStatus.value =  savedMaritalStatus;
  }
  if (savedMaritalContact && Object.keys(savedMaritalContact).length) {
    spouseInfo.value =  savedMaritalStatus;
  }
});

// Watch for changes in propertyObj.value and map preScreeningQuestions if available
watch(
  () => propertyObj.value,
  (newVal) => {
    if (newVal && newVal.maritalStatus) {
      // Merge saved answers with API responses to ensure persisted answers are not lost
      const savedMaritalStatus = loadData("maritalStatus") || "";
      // Map preScreeningQuestions from propertyObj to match desired structure
      maritalStatus.value = newVal.maritalStatus

    }
  },
  { immediate: true } // Ensures watch is triggered immediately if data is already available
);

watch(
  () => propertyObj.value,
  (newVal) => {
    if (newVal && newVal.maritalContact) {
      // Merge saved answers with API responses to ensure persisted answers are not lost
      const savedMaritalContact = loadData("maritalContact") || "";
      // Map preScreeningQuestions from propertyObj to match desired structure
      spouseInfo.value = newVal.maritalContact

    }
  },
  { immediate: true } // Ensures watch is triggered immediately if data is already available
);


// Use 'prescreening' as the key to store the data
const { saveData, loadData } = useFormPersistence();

const isFormValid = computed(() => {
  if (maritalStatus.value === "married") {
    return isSpouseInfoValid.value;
  }
  return maritalStatus.value !== "";
});

const emit = defineEmits(["submit", "back"]);

// Save the answers and go to the next step
// const goNext = () => {
//   saveData("prescreening", questions.value); // Ensure the answers are persisted
//   router.push({ query: { step: "2" } });
// };

const goNext = () => {
  if (isFormValid.value) {
    saveData("maritalStatus", maritalStatus.value); // Ensure the answers are persisted
    saveData("maritalContact", spouseInfo.value); // Ensure the answers are persisted
    router.push({ query: { step: "5" } });
    // emit("submit", {
    //   maritalStatus: maritalStatus.value,
    //   spouseInfo: maritalStatus.value === "married" ? spouseInfo.value : null,
    // });                              
  }
};


const goBack = () => {
  router.push(`/dashboard/listings/${route.params.id}/preview`);
  localStorage.removeItem("maritalStatus");
  localStorage.removeItem("maritalContact");
};
</script>
