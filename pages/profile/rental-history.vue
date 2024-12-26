<template>
    <main>
      <TopNavBar />
      <div v-if="!loading" class="max-w-2xl mx-auto bg-white p-3 lg:p-6 w-full">
        <div class="text-gray-500 flex-col">
          <svg @click="router.back()" class="cursor-pointer" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
            <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
    
          <h2 class="text-lg font-semibold text-[#1D2739] pt-3">Rental History</h2>
        </div>
        <form @submit.prevent="handleSave" class="mt-6 space-y-4">
          <div>
            <label class="text-[#1D2739] text-sm">Current Landlord's Name <span class="text-red-500">*</span></label>
            <input v-model="credential.currentLandlord" type="text" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" placeholder="Enter full name" />
          </div>
    
          <div>
            <label class="text-[#1D2739] text-sm">Rental Address <span class="text-red-500">*</span></label>
            <input v-model="credential.rentalAddress" type="text" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" placeholder="Enter residential address" />
          </div>
    
          <div>
            <label class="text-[#1D2739] text-sm">Length of Tenancy <span class="text-red-500">*</span></label>
            <input v-model="credential.lengthOfTenancy" type="tel" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" placeholder="Enter length of tenancy" />
          </div>
    
          <div>
            <label class="text-[#1D2739] text-sm">Reason for Moving Out <span class="text-red-500">*</span></label>
            <textarea v-model="credential.reasonForMovingOut" rows="10" cols="10" class="w-full resize-none p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" placeholder="Enter reason for moving out"></textarea>
          </div>
        </form>
    
        <div class="flex justify-between lg:p-4 bg-white mt-6 max-w-2xl mx-auto w-full">
          <button @click="router.back()" class="text-[#292929] border rounded-md px-4 py-3 hover:bg-gray-100">Cancel</button>
          <button :disabled="updating" @click="handleSave" class="text-white disabled:opacity-25 disabled: cursor-not-allowed font-medium rounded-md px-6 py-3 bg-[#292929]">{{ updating ? 'Processing..' : 'Save' }}</button>
        </div>
      </div>
      <div v-else class="rounded-md p-4 max-w-4xl mx-auto mt-10">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="h-96 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </main>
    </template>
    
    <script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { useHopBack } from '@/composables/core/useHopBack';
    import { useUser } from '@/composables/auth/user';
    import { use_update_profile } from '@/composables/auth/updateProfile';
    import { useRouter, useRoute } from 'vue-router';
    import { use_tenant_profile } from '@/composables/auth/fetchProfile.ts'
    const { loading, profileObj } = use_tenant_profile()
    
    const { hopBack } = useHopBack();
    
    // Import user composable
    const { user } = useUser();
    
    // API to update profile
    const { credential, updateProfile, loading: updating } = use_update_profile();
    
    // Step management
    const router = useRouter();
    const route = useRoute();

    watch(profileObj, (newProfile) => {
  if (newProfile) {
    credential.value = {
      currentLandlord: newProfile.currentLandlord || '',
      rentalAddress: newProfile.rentalAddress || '',
      lengthOfTenancy: newProfile.lengthOfTenancy || '',
      reasonForMovingOut: newProfile.reasonForMovingOut || '',
    }
  }
}, { immediate: true });

    
    // Computed property to check if all required fields are filled
    const isFormValid = computed(() => {
      return (
        credential.value.currentLandlord &&
        credential.value.rentalAddress &&
        credential.value.lengthOfTenancy &&
        credential.value.reasonForMovingOut
      );
    });
    
    // Handle save logic
    const handleSave = async () => {
      await updateProfile({
        currentLandlord: credential.value.currentLandlord,
        rentalAddress: credential.value.rentalAddress,
        lengthOfTenancy: credential.value.lengthOfTenancy,
        reasonForMovingOut: credential.value.reasonForMovingOut
      });
      router.back();
    };
    </script>
    