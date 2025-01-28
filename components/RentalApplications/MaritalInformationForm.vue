<template>
    <div class="max-w-2xl mx-auto p-4">
      <h1 class="text-2xl font-semibold mb-6">Marital information</h1>
      
      <form @submit.prevent="handleSubmit">
        <div class="space-y-6">
          <!-- Marital Status -->
          <div>
            <label class="block text-sm font-medium mb-2">
              Marital status <span class="text-red-500">*</span>
            </label>
            <select
              v-model="maritalStatus"
              class="w-full p-3 rounded-lg bg-gray-50 border border-gray-200"
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
          <div class="flex justify-between mt-8">
            <button
              type="button"
              class="px-6 py-2 bg-white border rounded-lg"
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
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              ]"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  </template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface SpouseInfo {
  fullName: string
  email: string
  phone: string
  idType: string
  idImage: File | null
}

const maritalStatus = ref('')
const spouseInfo = ref<SpouseInfo>({
  fullName: '',
  email: '',
  phone: '',
  idType: '',
  idImage: null
})
const isSpouseInfoValid = ref(false)

const isFormValid = computed(() => {
  if (maritalStatus.value === 'married') {
    return isSpouseInfoValid.value
  }
  return maritalStatus.value !== ''
})

const emit = defineEmits(['submit', 'back'])

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', {
      maritalStatus: maritalStatus.value,
      spouseInfo: maritalStatus.value === 'married' ? spouseInfo.value : null
    })
  }
}
</script>
