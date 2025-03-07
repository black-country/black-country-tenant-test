<template>
  <main>
    <TopNavBar />
    <div v-if="!loading" class="max-w-2xl mx-auto bg-white p-3 lg:p-6 w-full">
      <div class="text-gray-500 flex-col">
        <svg @click="router.back()" class="cursor-pointer" width="36" height="36" viewBox="0 0 36 36" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" fill="#EAEAEA" />
          <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <h2 class="text-lg font-semibold text-[#1D2739] pt-3">Reference and emergency contacts</h2>
      </div>

      <form @submit.prevent="handleSave" class="mt-6 space-y-4">
        <div v-for="(reference, index) in references" :key="index" class="space-y-4">
          <p class="text-sm mt-8">{{ index + 1 }}. Emergency Contact</p>
          <div class="flex gap-x-6">
            <div class="w-full">
              <label class="text-[#1D2739] text-sm">Full Name <span class="text-red-500">*</span></label>
              <input v-model="reference.fullName" type="text"
                class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
                placeholder="Enter full name" />
            </div>

            <div class="w-full">
              <label class="text-[#1D2739] text-sm">Relationship <span class="text-red-500">*</span></label>
              <select v-model="reference.relationship"
                class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4">
                <option value="Sibling">Sibling</option>
                <option value="Parent">Parent</option>
                <option value="Spouse">Spouse</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-[#1D2739] text-sm">Phone Number <span class="text-red-500">*</span></label>
            <input v-model="reference.phoneNumber" type="tel"
              class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
              placeholder="Enter phone number" />
          </div>

          <div>
            <label class="text-[#1D2739] text-sm">Residential Address <span class="text-red-500">*</span></label>
            <input v-model="reference.residentialAddress" type="text"
              class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
              placeholder="Enter residential address" />
          </div>
        </div>
        <div class="flex items-center space-x-2 mt-4">
          <input 
            v-model="user.shouldContactReferences" 
            type="checkbox" 
            id="consent-checkbox" 
            class="w-4 h-4 text-[#5B8469] border-gray-300 rounded focus:ring-[#5B8469]" />
          <label for="consent-checkbox" class="text-sm text-[#1D2739]">
            I consent to Homeowner/Property Manager contacting my References
          </label>
        </div>

        <div class="flex justify-between lg:p-4 bg-white mt-32 max-w-2xl mx-auto w-full">
          <button @click="router.back()"
            class="text-[#292929] border rounded-md px-4 py-3 hover:bg-gray-100">Cancel</button>
          <button :disabled="!isFormValid || updating" @click="handleSave"
            class="text-white disabled:opacity-25 disabled:cursor-not-allowed font-medium rounded-md px-6 py-3 bg-[#292929]">{{ updating
              ? 'Processing..' : 'Save' }}</button>
        </div>
      </form>
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
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { use_tenant_profile } from '@/composables/auth/fetchProfile';
import { use_update_profile } from '@/composables/auth/updateProfile';
import { useUser } from '~/composables/auth/user';

const { loading, profileObj } = use_tenant_profile();
const { credential, updateProfile, loading: updating } = use_update_profile();
const { user } = useUser();

const router = useRouter();

const references = ref([
  { fullName: '', phoneNumber: '', relationship: '', residentialAddress: '' },
  { fullName: '', phoneNumber: '', relationship: '', residentialAddress: '' }
]);

watch(profileObj, (newProfile) => {
  if (newProfile && newProfile.referenceContacts) {
    references.value = newProfile.referenceContacts.map(reference => ({
      fullName: reference.fullName || '',
      phoneNumber: reference.phoneNumber || '',
      relationship: reference.relationship || '',
      residentialAddress: reference.residentialAddress || ''
    }));
  }
}, { immediate: true });

const isFormValid = computed(() => {
  const allReferencesValid = references.value.every(reference =>
    reference.fullName && reference.relationship && reference.phoneNumber && reference.residentialAddress
  );
  const consent = user.value.shouldContactReferences;
  return allReferencesValid && consent;
});


const handleSave = async () => {
  await updateProfile({
    referenceContacts: references.value,
    shouldContactReferences : user.value.shouldContactReferences 
  });
  router.back();
};
</script>
