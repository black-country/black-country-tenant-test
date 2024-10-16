<template>
  <main>  
    <TopNavBar />
    <div class="min-h-screen flex flex-col justify-between">
      <div class="max-w-3xl mx-auto bg-white p-6">
        <div class="text-gray-500 flex-col">
          <svg @click="router.back()" class="cursor-pointer" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
            <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h2 class="text-lg font-semibold text-[#1D2739] pt-3">Personal Information</h2>
          <!-- {{profileObj}} -->
        </div>
        <form class="mt-6 space-y-6">
          <div>
            <label class="text-[#1D2739] text-sm">Full name</label>
            <input v-model="addressObj.fullName" type="text" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" :disabled="!!addressObj.fullName" >
          </div>
  
          <div>
            <label class="text-[#1D2739] text-sm">Email Address</label>
            <input v-model="credential.email" type="email" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"  :disabled="!!credential.email" />
          </div>
  
          <div>
            <label class="text-[#1D2739] text-sm">Phone Number <span class="text-red-500">*</span></label>
            <input v-model="credential.phoneNumber" type="tel" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" placeholder="Enter phone number" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[#1D2739] text-sm">Date of Birth <span class="text-red-500">*</span></label>
              <input 
              v-model="credential.dateOfBirth" 
              type="date" 
              :max="today"
              class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" 
            />
              <!-- <input v-model="credential.dateOfBirth" type="date" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" /> -->
            </div>
            <div>
              <label class="text-[#1D2739] text-sm">Gender</label>
              <select v-model="credential.gender" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4">
                <option>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-[#1D2739] text-sm">Marital status <span class="text-red-500">*</span></label>
            <select v-model="credential.maritalStatus" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4">
              <option>Select marital status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[#1D2739] text-sm">State of Origin <span class="text-red-500">*</span></label>
              <select v-model="addressObj.state" class="w-full p-2 mt-1 border-[0.5px] outline-none  focus-within:border-2 focus-within:border-[#5B8469] text-sm rounded-md bg-[#E4E7EC] py-4">
                <option value="">Select state</option>
                <option v-for="item in states" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
            <div>
              <label class="text-[#1D2739] text-sm">Local Government (LGA) <span class="text-red-500">*</span></label>
              <select v-model="addressObj.lga" class="w-full p-2 mt-1 border-[0.5px] outline-none  focus-within:border-2 focus-within:border-[#5B8469] text-sm rounded-md bg-[#E4E7EC] py-4">
                <option value="">Select LGA</option>
                <option v-for="lga in lgasArray.lgas" :key="lga" :value="lga">{{ lga }}</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div class="flex justify-between p-4 bg-white mt-6 max-w-2xl mx-auto w-full">
        <button @click="router.back()" class="text-[#292929] border rounded-md px-4 py-3 hover:bg-gray-100">Cancel</button>
        <button :disabled="!isFormValid || updating" @click="handleSave" class="text-white disabled:opacity-25 disabled:cursor-not-allowed font-medium rounded-md px-6 py-3 bg-[#292929]">{{updating ? 'Processing..' : 'Save'}}</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useHopBack } from '@/composables/core/useHopBack';
import NaijaStates from 'naija-state-local-government';
import { useUser } from '@/composables/auth/user';
import { use_update_profile } from '@/composables/auth/updateProfile';
import { useRouter, useRoute } from 'vue-router';

// Hook for back navigation
const { hopBack } = useHopBack();
import { use_tenant_profile } from '@/composables/auth/fetchProfile.ts'
const { loading, profileObj } = use_tenant_profile()

// Import user composable
const { user } = useUser();

const today = ref(new Date().toISOString().split('T')[0]);

// API to update profile
const { credential, updateProfile, loading: updating } = use_update_profile();

// Step management
const router = useRouter();
const route = useRoute();

// Address object and LGA array
const addressObj = ref({
  state: '',
  lga: '',
  fullName: ''
});
const lgasArray = ref<string[]>([]);
const states = ref(NaijaStates.states()) as any;

// Watch for changes in addressObj.state
watch(() => addressObj.value.state, (newVal: any) => {
  if (newVal) {
    const lgas = NaijaStates.lgas(newVal);
    lgasArray.value = lgas || [];
  } else {
    lgasArray.value = [];
  }
});

// Populate credential with user data when page mounts
onMounted(() => {
  if (user.value) {
    // credential.value = {
    //   email: user.value.email || '',
    //   phoneNumber: user.value.phoneNumber || '',
    //   dateOfBirth: user.value.dateOfBirth || '',
    //   gender: user.value.gender || '',
    //   maritalStatus: user.value.maritalStatus || ''
    // };

    credential.value = {
      email: user.value.email || '',
      phoneNumber: user.value.phoneNumber || '',
      dateOfBirth: user.value.dateOfBirth || '',
      gender: user.value.gender || '',
      maritalStatus: user.value.maritalStatus || '',
      currentLandlord: user.value.currentLandlord || '',
      rentalAddress: user.value.rentalAddress || '',
      lengthOfTenancy: user.value.lengthOfTenancy || '',
      reasonForMovingOut: user.value.reasonForMovingOut || '',
      employmentStatus: user.value.employmentStatus || '',
      employerName: user.value.employerName || '',
      employerAddress: user.value.employerAddress || '',
      occupation: user.value.occupation || '',
      monthlyNetSalary: user.value.monthlyNetSalary || '',
      nextOfKinName: user.value.nextOfKinName || '',
      nextOfKinRelationship: user.value.nextOfKinRelationship || '',
      nextOfKinEmail: user.value.nextOfKinEmail || '',
      nextOfKinAddress: user.value.nextOfKinAddress || '',
      nextOfKinPhone: user.value.nextOfKinPhone || '',
      nextOfKinOccupation: user.value.nextOfKinOccupation || '',
      nextOfKinEmployer: user.value.nextOfKinEmployer || '',
      nextOfKinEmployerAddress: user.value.nextOfKinEmployerAddress || ''
    };

    // Update full name in addressObj
    addressObj.value.fullName = `${user.value.firstName || ''} ${user.value.lastName || ''}`.trim();
    addressObj.value.state = user.value.state || '';
    addressObj.value.lga = user.value.lga || '';
  }
});

// Computed property to validate required fields
const isFormValid = computed(() => {
  return (
    credential.value.phoneNumber &&
    credential.value.dateOfBirth &&
    credential.value.maritalStatus &&
    addressObj.value.state &&
    addressObj.value.lga
  );
});

// Handle save logic
const handleSave = async () => {
  const nameParts = addressObj.value.fullName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

  await updateProfile({
    firstName,
    lastName,
    email: credential.value.email,
    phoneNumber: credential.value.phoneNumber,
    dateOfBirth: credential.value.dateOfBirth,
    gender: credential.value.gender,
    maritalStatus: credential.value.maritalStatus,
    state: addressObj.value.state,
    lga: addressObj.value.lga
  });

  router.back();
};
</script>
