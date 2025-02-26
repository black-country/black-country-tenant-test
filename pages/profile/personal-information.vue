<template>
  <main>
    <TopNavBar />
    <div v-if="!loading" class="min-h-screen flex flex-col justify-between w-full">
      <div class="max-w-2xl mx-auto bg-white p-6 w-full">
        <div class="text-gray-500 flex-col">
          <svg
            @click="router.back()"
            class="cursor-pointer"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="36" height="36" rx="18" fill="#EAEAEA" />
            <path
              d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23"
              stroke="#1D2739"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h2 class="text-lg font-semibold text-[#1D2739] pt-3">
            Personal Information
          </h2>
        </div>
        <form class="mt-6 space-y-6">
          <div>
            <label class="text-[#1D2739] text-sm">Full name</label>
            <input
              v-model="addressObj.fullName"
              type="text"
              class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
            />
          </div>

          <div>
            <label class="text-[#1D2739] text-sm">Email Address</label>
            <input
              v-model="credential.email"
              type="email"
              placeholder="Enter email"
              class="w-full p-2 mt-1 outline-none focus-within:border-2 cursor-not-allowed opacity-25 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
              :disabled="!!credential.email"
              readonly
            />
          </div>

          <div>
            <label class="text-[#1D2739] text-sm"
              >Phone Number <span class="text-red-500">*</span></label
            >
            <input
              v-model="credential.phoneNumber"
              type="tel"
              class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
              placeholder="01234567890"
            />
          </div>

          <div class="grid lg:grid-cols-2 gap-4">
            <AgeValidationDatePicker  v-model="credential.dateOfBirth"
            label="Date of Birth" />
            <div>
              <label class="text-[#1D2739] text-sm">Gender</label>
              <select
                v-model="credential.gender"
                class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
              >
                <option>Select your gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>

          <div>
            <label class="text-[#1D2739] text-sm"
              >Marital status <span class="text-red-500">*</span></label
            >
            <select
              v-model="credential.maritalStatus"
              class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
            >
              <option>Select marital status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <LocationDropdowns
            v-model="selectedCityId"
            @update:state="handleStateChanged"
            @citySelected="handleCitySelection"
          />

        </form>
      </div>
      <div
        class="flex justify-between p-4 bg-white mt-6 max-w-2xl mx-auto w-full"
      >
        <button
          @click="router.back()"
          class="text-[#292929] border rounded-md px-4 py-3 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          :disabled="updating || isUnderage"
          @click="handleSave"
          class="text-white disabled:opacity-25 disabled:cursor-not-allowed font-medium rounded-md px-6 py-3 bg-[#292929]"
        >
          {{ updating ? "Processing.." : "Save" }}
        </button>
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
import { ref, computed, watch } from "vue";
import { useGetLocation } from "@/composables/core/useGetLocation";
import { useHopBack } from "@/composables/core/useHopBack";
// import NaijaStates from 'naija-state-local-government';
import { useUser } from "@/composables/auth/user";
import moment from 'moment'
import { use_tenant_profile } from "@/composables/auth/fetchProfile";
import { use_update_profile } from "@/composables/auth/updateProfile";
import { useRouter } from "vue-router";
import LocationDropdowns from "../../components/LocationDropdowns.vue";
const {
  states,
  cities,
  loadingStates,
  loadingCities,
  selectedState,
  selectedCity,
  handleStateChange,
} = useGetLocation();

const editMode = ref(false)

// Hook for back navigation
const { hopBack } = useHopBack();
const { loading, profileObj } = use_tenant_profile();

// Watch for changes in the selected state and fetch cities accordingly
watch(selectedState, (newStateCode) => {
  if (newStateCode) {
    // fetchCities(newStateCode)
    selectedCity.value = null; // Reset selected city when state changes
  }
});

// Initialize `today` with the desired format 'YYYY-MM-DD'
const today = ref(new Date().toISOString().split("T")[0])

// Calculate the date 18 years ago from today's date
// const eighteenYearsAgo = subYears(new Date(today.value), 18)
const eighteenYearsAgo = moment().subtract(18, 'years').format('YYYY-MM-DD')

const minDate = eighteenYearsAgo
const maxDate = today.value

// Flag to track if the user is underage
const isUnderage = ref(false)

const selectedCityId = ref('');
const selectedLocation = ref<City | null>(null);

const handleStateChanged = (stateCode: string) => {
  console.log('Selected state code:', stateCode);
};

const handleCitySelection = (city: City | null) => {
  console.log(city, 'city from parent')
  selectedLocation.value = city;
};



// Import user composable
const { user } = useUser();

// const today = ref(new Date().toISOString().split("T")[0]);

// API to update profile
const { credential, updateProfile, loading: updating, locationCredential } = use_update_profile();

onMounted(() => {
  if (credential.value) {
    // Prefill the state and LGA if the credential object is already available
    selectedState.value = credential.value.state || locationCredential.value.state;
    selectedCity.value = credential.value.lga || locationCredential.value.lga;
  }
});

// Router instance
const router = useRouter();

// Address object and LGA array
const addressObj = ref({
  fullName: "",
});

// Watch for changes in profileObj and prefill form fields
watch(
  profileObj,
  (newProfile) => {
    if (newProfile) {
      credential.value = {
        email: newProfile.email || "",
        phoneNumber: newProfile.phoneNumber || "",
        dateOfBirth: newProfile.dateOfBirth || "",
        gender: newProfile.gender || "",
        maritalStatus: newProfile.maritalStatus || "",
        state: newProfile?.city?.stateName || "",
        lga: newProfile?.city?.name || "",
      };

      // Prefill the state and LGA after the profile is updated
      selectedState.value = credential.value.state;
      selectedCity.value = credential.value.lga;

      // Update full name and address fields in addressObj
      addressObj.value.fullName = `${newProfile.firstName || ""} ${
        newProfile.lastName || ""
      }`.trim();
    }
  },
  { immediate: true }
);

// Computed property to validate required fields
const isFormValid = computed(() => {
  return (
    credential.value.phoneNumber &&
    credential.value.dateOfBirth &&
    credential.value.maritalStatus &&
    selectedCity.value
  );
});

// Handle save logic
const handleSave = async () => {
  const nameParts = addressObj.value.fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  await updateProfile({
    firstName,
    lastName,
    email: credential?.value?.email,
    phoneNumber: credential?.value?.phoneNumber,
    dateOfBirth: credential?.value?.dateOfBirth,
    gender: credential?.value?.gender,
    maritalStatus: credential.value.maritalStatus,
    cityId: selectedLocation.value.id,
  });
  router.back();
};

// Helper function to format date
function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Watch for changes in profileObj and prefill form fields
watch(
  profileObj,
  (newProfile) => {
    if (newProfile) {
      credential.value = {
        email: newProfile.email || "",
        phoneNumber: newProfile.phoneNumber || "",
        dateOfBirth: newProfile.dateOfBirth
          ? formatDate(newProfile.dateOfBirth)
          : "", // Use formatted date
        gender: newProfile.gender || "",
        maritalStatus: newProfile.maritalStatus || "",
        lga: newProfile?.city?.name || "",
        state: newProfile?.city?.stateName || "",
      };

      // Update full name and address fields in addressObj
      addressObj.value.fullName = `${newProfile.firstName || ""} ${
        newProfile.lastName || ""
      }`.trim();
    }
  },
  { immediate: true }
);
</script>