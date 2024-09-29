<template>
   <main>  
    <TopNavBar />
    <div class="min-h-screen flex flex-col justify-between">
      <div class="max-w-3xl mx-auto bg-white p-6">
        <div class="text-gray-500 flex-col">
          <svg @click="router.back()" class="cursor-pointer"  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
            <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
            
          <h2 class="text-lg font-semibold text-[#1D2739] pt-3">Personal Information</h2>
        </div>
        <form class="mt-6 space-y-6">
          <div>
            <label class="text-[#1D2739] text-sm">Full name</label>
            <input v-model="addressObj.fullName" type="text" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" disabled >
          </div>
  
          <div>
            <label class="text-[#1D2739] text-sm">Email Address</label>
            <input v-model="credential.email" type="email" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"  disabled />
          </div>
  
          <div>
            <label class="text-[#1D2739] text-sm">Phone Number <span class="text-red-500">*</span></label>
            <input v-model="credential.phoneNumber" type="tel" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" placeholder="Enter phone number" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[#1D2739] text-sm">Date of Birth <span class="text-red-500">*</span></label>
              <input v-model="credential.dateOfBirth" type="date" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" />
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
                      <label class="text-[#1D2739] text-sm">
                        State of Origin <span class="text-red-500">*</span>
                      </label>
                      <select v-model="addressObj.state" class="w-full p-2 mt-1 border-[0.5px] outline-none  focus-within:border-2 focus-within:border-[#5B8469] text-sm rounded-md bg-[#E4E7EC] py-4">
                        <option value="">Select state</option>
                        <option v-for="item in states" :key="item" :value="item">{{ item }}</option>
                      </select>
                    </div>
                    <div>
                      <label class="text-[#1D2739] text-sm">Local Government (LGA)</label>
                      <select v-model="addressObj.lga" class="w-full p-2 mt-1 border-[0.5px] outline-none  focus-within:border-2 focus-within:border-[#5B8469] text-sm rounded-md bg-[#E4E7EC] py-4">
                        <option value="">Select LGA</option>
                        <option v-for="lga in lgasArray.lgas" :key="lga" :value="lga">{{ lga }}</option>
                      </select>
                    </div>
                  </div>
        </form>
      </div>

    <div class="flex justify-between p-4 bg-white mt-6 max-w-2xl mx-auto  w-full">
      <button @click="goBack" class="text-[#292929] border rounded-md px-4 py-3 hover:bg-gray-100">Cancel</button>
      <button :disabled="updating" @click="handleSave" class="text-white disabled:opacity-25 disabled: cursor-not-allowed font-medium rounded-md px-6 py-3 bg-[#292929]">{{updating ? 'Processing..' : 'Save'}}</button>
    </div>
    </div>
  </main>
    </template>
<script setup lang="ts">
import {useHopBack } from '@/composables/core/useHopBack';
import NaijaStates from 'naija-state-local-government';
import { useUser } from '@/composables/auth/user';
import { use_update_profile } from '@/composables/auth/updateProfile';
import { useRouter, useRoute } from 'vue-router';
const { hopBack } = useHopBack();

// Import user composable
const { user } = useUser();

// API to update profile
const { credential, updateProfile, loading: updating } = use_update_profile();

// Step management
const currentStep = ref(1);
const loading = ref(false);  // State for tracking loading spinner
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

// When the page mounts, populate credential with user data
onMounted(() => {
  if (user.value) {
    // Destructure user object and assign values to credential
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

  // Set the query param for the step
  if (!route.query.step) {
    router.push({ query: { step: currentStep.value } });
  } else {
    currentStep.value = parseInt(route.query.step as string);
  }
});

// Function to go back to the previous step
const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
    router.push({ query: { step: currentStep.value } });
  } else {
    router.push('/profile/profile-settings')
  }
};

// Handle the save function (no changes here)
const handleSave = async () => {
  // Split full name into first and last name
  const nameParts = addressObj.value.fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  let savePromise;

  switch (currentStep.value) {
    case 1:
      // Save Personal Information
      savePromise = updateProfile({
        firstName: firstName,
        lastName: lastName,
        email: credential.value.email,
        phoneNumber: credential.value.phoneNumber,
        dateOfBirth: credential.value.dateOfBirth,
        gender: credential.value.gender,
        maritalStatus: credential.value.maritalStatus,
        state: addressObj.value.state,
        lga: addressObj.value.lga,
      });
      break;

    case 2:
      // Save Rental History
      savePromise = updateProfile({
        currentLandlord: credential.value.currentLandlord,
        rentalAddress: credential.value.rentalAddress,
        lengthOfTenancy: credential.value.lengthOfTenancy,
        reasonForMovingOut: credential.value.reasonForMovingOut,
      });
      break;

    case 3:
      // Save Employment Information
      savePromise = updateProfile({
        employmentStatus: credential.value.employmentStatus,
        employerName: credential.value.employerName,
        employerAddress: credential.value.employerAddress,
        occupation: credential.value.occupation,
        monthlyNetSalary: credential.value.monthlyNetSalary,
      });
      break;

    case 4:
      // Save Next of Kin Information
      savePromise = updateProfile({
        nextOfKinName: credential.value.nextOfKinName,
        nextOfKinRelationship: credential.value.nextOfKinRelationship,
        nextOfKinEmail: credential.value.nextOfKinEmail,
        nextOfKinAddress: credential.value.nextOfKinAddress,
        nextOfKinPhone: credential.value.nextOfKinPhone,
        nextOfKinOccupation: credential.value.nextOfKinOccupation,
        nextOfKinEmployer: credential.value.nextOfKinEmployer,
        nextOfKinEmployerAddress: credential.value.nextOfKinEmployerAddress,
      });
      break;
  }

  // Handle the result of the save operation
  savePromise
    .then((res) => {
      console.log(res, 'res here')
      // If save is successful, go to the next step
      if (currentStep.value < 4) {
        currentStep.value += 1;
        router.push({ query: { step: currentStep.value } });
      } else {
        router.push('/profile')
        // Optionally, show a success message when the final step is completed
        useNuxtApp().$toast.success("Profile update completed successfully!");
      }
    }).catch((err) => {
      console.error("Error saving data:", err);
      // useNuxtApp().$toast.error("There was an error saving your data.");
      // No step increment if an error occurs
    });
};
</script>
