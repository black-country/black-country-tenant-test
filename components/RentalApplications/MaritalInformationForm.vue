<template>
  <div class="mx-auto">
    <h1 class="text-xl font-medium mb-6">Marital information</h1>

    <form @submit.prevent="handleSubmit">
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
import { ref, computed } from "vue";

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

const isFormValid = computed(() => {
  if (maritalStatus.value === "married") {
    return isSpouseInfoValid.value;
  }
  return maritalStatus.value !== "";
});

const emit = defineEmits(["submit", "back"]);

const handleSubmit = () => {
  if (isFormValid.value) {
    emit("submit", {
      maritalStatus: maritalStatus.value,
      spouseInfo: maritalStatus.value === "married" ? spouseInfo.value : null,
    });
  }
};
</script>
