<!-- <template>
<main>
  <TopNavBar />
  <div class="max-w-2xl mx-auto bg-white p-6 w-full">
    <div class="text-gray-500 flex-col">
      <svg  @click="router.back()"  class="cursor-pointer" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
        <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        
      <h2 class="text-lg font-semibold text-[#1D2739] pt-3">Rental History</h2>
    </div>
    <form @submit.prevent="handleSave" class="mt-6 space-y-4">
      <div>
        <label class="text-[#1D2739] text-sm" >Current Landlord's Name <span class="text-red-500">*</span></label>
        <input v-model="credential.currentLandlord" type="text" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" placeholder="Enter full name" />
      </div>

      <div>
        <label class="text-[#1D2739] text-sm" >Rental Address <span class="text-red-500">*</span></label>
        <input v-model="credential.rentalAddress" type="text" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" placeholder="Enter residential address" />
      </div>

      <div>
        <label class="text-[#1D2739] text-sm" >Length of Tenancy <span class="text-red-500">*</span></label>
        <input v-model="credential.lengthOfTenancy" type="tel" class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" placeholder="Enter length of tenancy" />
      </div>

      <div>
        <label class="text-[#1D2739] text-sm" >Reason for Moving Out <span class="text-red-500">*</span></label>
        <textarea v-model="credential.reasonForMovingOut" row="10" cols="10" class="w-full resize-none p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4" placeholder="Enter reason for moving out"></textarea>
      </div>

    </form>

    <div class="flex justify-between p-4 bg-white mt-6 max-w-2xl mx-auto  w-full">
      <button @click="router.back()" class="text-[#292929] border rounded-md px-4 py-3 hover:bg-gray-100">Cancel</button>
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

  definePageMeta({
  middleware: "auth",
});
  
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
  });
  
  // Function to go back to the previous step

  const handleSave = async () => {
       await updateProfile({
          currentLandlord: credential.value.currentLandlord,
          rentalAddress: credential.value.rentalAddress,
          lengthOfTenancy: credential.value.lengthOfTenancy,
          reasonForMovingOut: credential.value.reasonForMovingOut,
})
router.back()
}
  </script> -->

  <template>
    <main>
      <TopNavBar />
      <div class="max-w-2xl mx-auto bg-white p-6 w-full">
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
    
        <div class="flex justify-between p-4 bg-white mt-6 max-w-2xl mx-auto w-full">
          <button @click="router.back()" class="text-[#292929] border rounded-md px-4 py-3 hover:bg-gray-100">Cancel</button>
          <button :disabled="!isFormValid || updating" @click="handleSave" class="text-white disabled:opacity-25 disabled: cursor-not-allowed font-medium rounded-md px-6 py-3 bg-[#292929]">{{ updating ? 'Processing..' : 'Save' }}</button>
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
    
    // When the page mounts, populate credential with user data
    onMounted(() => {
      if (user.value) {
        credential.value = {
          email: user.value.email || '',
          phoneNumber: user.value.phoneNumber || '',
          dateOfBirth: user.value.dateOfBirth || '',
          gender: user.value.gender || '',
          maritalStatus: user.value.maritalStatus || '',
          currentLandlord: user.value.currentLandlord || '',
          rentalAddress: user.value.rentalAddress || '',
          lengthOfTenancy: user.value.lengthOfTenancy || '',
          reasonForMovingOut: user.value.reasonForMovingOut || ''
        };
      }
    });
    
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
    