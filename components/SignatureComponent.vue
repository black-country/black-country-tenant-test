<template>
      <div class="bg-white rounded-lg shadow-lg p-6 w-full lg:w-5/12">
        <div class="flex justify-between">
          <h3 class="text-xl font-medium text-[#1D2739]">Tenant's Details</h3>
          <button @click="$emit('close')" class="text-[#1D2739] font-semibold">Reset</button>
        </div>
  
        <div class="mt-4">
          <label class="block text-sm font-semibold">Full name *</label>
          <input type="text" v-model="tenantName" disabled class="w-full disabled:cursor-not-allowed  bg-[#E4E7EC] border pl-4 disabled border-none outline-none p-2 py-4 text-sm rounded-md mt-1" />
        </div>
  
        <div class="mt-4">
          <label class="block text-sm font-semibold">Date *</label>
          <input type="date" v-model="payload.date" class="w-full bg-[#E4E7EC] border pl-4 border-none outline-none p-2 py-4 text-sm rounded-md mt-1" />
        </div>

        <CoreVue3Signature @signature="handleSignature" />
  
        <div class="mt-6 flex justify-between gap-x-6">
          <button @click="emit('close')" class="bg-[#EBE5E0] text-[#292929] w-full text-sm  px-6 py-4 rounded-lg">Reset</button>
          <button @click="submitSignature" class="bg-[#292929] w-full text-sm text-white px-6 py-4 rounded-lg">Submit</button>
        </div>
      </div>
  </template>
  
  <script setup lang="ts">
    import { useUser } from "@/composables/auth/user";
  const { user } = useUser();
  const tenantName = ref(`${user.value.firstName} ${user.value.lastName}`);

  const payload = ref({
    fullName: tenantName.value,
    date: '',
    signature: ''
  })

  const emit = defineEmits(['close', 'agreementData'])
  

  const submitSignature = () => {
    console.log(payload.value, 'ooo')
    emit('agreementData', payload.value)
    emit('close')
  }

  const handleSignature = (data: any) => {
    console.log(data, 'data jee oo')
    payload.value.signature = data
  }
  </script>
  
  <style scoped>
  canvas {
    border: 1px solid #ddd;
  }
  </style>
  