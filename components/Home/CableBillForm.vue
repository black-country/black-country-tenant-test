<template>
    <div class="py-4">
      <h2 class="text-lg font-medium text-[#1D2739] mb-4">Cable Bill</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-[#1D2739] text-sm mb-1">Cable type</label>
          <select v-model="form.cableType" class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] outline-none border-gray-100" placeholder="Select Cable type">
            <option v-for="item in cableTypesList" :key="item">{{ item }}</option>
          </select>
        </div>
  
        <div>
          <label class="block text-[#1D2739] text-sm mb-1">Smartcard Number</label>
          <input v-model="form.smartcardNumber" type="text" placeholder="e.g 1234567DSF" class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] border-gray-100" />
        </div>
  
        <div>
          <label class="block text-[#1D2739] text-sm mb-1">Cable package</label>
          <select v-model="form.cablePackage" class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] border-gray-100" placeholder="Select Cable package">
            <option v-for="item in computedCablePackage" :key="item">{{ item }}</option>
          </select>
        </div>
  
        <HomeRecentPayments />
  
        <!-- <div class="flex justify-between mt-8">
          <button
            type="button"
            @click="router.back()"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-2 bg-black text-white rounded-md"
          >
            Continue
          </button>
        </div> -->
        <div class="flex justify-between pt-20">
          <button
            type="button"
            @click="router.back()"
            class="px-6 py-3 text-sm border border-gray-300 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-3 text-sm bg-black text-white rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </template>
  

  <script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Router instance
const router = useRouter()

// Form data
const form = ref({
  cableType: '',
  smartcardNumber: '',
  cablePackage: ''
})

// Cable types list
const cableTypesList = ref(['DSTV', 'GOTV'])

// Cable packages for DSTV and GOTV
const dstvCableTypesList = ref(['Premium', 'Compact plus', 'Family', 'Access'])
const gotvCableTypesList = ref(['GOtv Supa +', 'GOtv Supa', 'GOtv Max', 'GOtv Plus', 'GOtv Value', 'GOtv Lite'])

// Computed cable packages based on selected cable type
const computedCablePackage = computed(() => {
  const cableMap = {
    'DSTV': dstvCableTypesList.value,
    'GOTV': gotvCableTypesList.value
  }
  return cableMap[form.value.cableType] || []
})
</script>
