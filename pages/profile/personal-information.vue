<template>
  <main>
    <TopNavBar />
    <div v-if="!loading" class="min-h-screen flex flex-col justify-between">
      <div class="max-w-3xl mx-auto bg-white p-6">
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
              class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
              :disabled="!!credential.email"
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
              placeholder="Enter phone number"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
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

          <select
                v-model="locationCredential.state"
                @change="handleStateChange(selectedState)"
                class="w-full p-2 mt-1 border-[0.5px] outline-none focus-within:border-2 focus-within:border-[#5B8469] text-sm rounded-md bg-[#E4E7EC] py-4"
              >
                <option value="">Select state</option>
                <option
                  v-for="item in states"
                  :key="item.stateCode"
                  :value="item.name"
                >
                  {{ item?.name ?? "Nil" }}
                </option>
              </select>

              <select
                v-model="locationCredential.lga"
                class="w-full p-2 mt-1 border-[0.5px] outline-none focus-within:border-2 focus-within:border-[#5B8469] text-sm rounded-md bg-[#E4E7EC] py-4"
              >
                <option value="">Select LGA</option>
                <option v-for="city in cities" :key="city.id" :value="city.name">
                  {{ city.name }}
                </option>
              </select>

          <div v-if="!editMode" class="flex items-center gap-x-3">
            <div class="flex justify-between gap-x-6 items-center w-full">
              <div>
                <label class="text-[#1D2739] text-sm"
                  >State of Origin <span class="text-red-500">*</span></label
                >
                <input
                  readonly
                  class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
                  :value="credential.state"
                />
              </div>

              <div>
                <label class="text-[#1D2739] text-sm"
                  >Local Government (LGA)
                  <span class="text-red-500">*</span></label
                >
                <input
                 readonly
                  class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
                  :value="credential.lga"
                />
              </div>
            </div>
            <div>
              <svg
                @click="editMode = !editMode"
                class="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5B8469"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"
                ></path>
                <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
              </svg>
            </div>
          </div>

          <div v-if="editMode" class="grid grid-cols-2 gap-4">
            <div v-if="!loadingStates">
              <label class="text-[#1D2739] text-sm"
                >State of Origin <span class="text-red-500">*</span></label
              >
              <select
                v-model="selectedState"
                @change="handleStateChange(selectedState)"
                class="w-full p-2 mt-1 border-[0.5px] outline-none focus-within:border-2 focus-within:border-[#5B8469] text-sm rounded-md bg-[#E4E7EC] py-4"
              >
                <option value="">Select state</option>
                <option
                  v-for="item in states"
                  :key="item.stateCode"
                  :value="item.stateCode"
                >
                  {{ item?.name ?? "Nil" }}
                </option>
              </select>
            </div>

            <div v-if="!loadingCities">
              <label class="text-[#1D2739] text-sm"
                >Local Government (LGA)
                <span class="text-red-500">*</span></label
              >
              <select
                v-model="selectedCity"
                class="w-full p-2 mt-1 border-[0.5px] outline-none focus-within:border-2 focus-within:border-[#5B8469] text-sm rounded-md bg-[#E4E7EC] py-4"
              >
                <option value="">Select LGA</option>
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
            </div>
            <div
              v-if="loadingCities"
              class="h-16 mt-4 animate-pulse w-full bg-slate-200 rounded"
            ></div>
          </div>
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
    email: credential.value.email,
    phoneNumber: credential.value.phoneNumber,
    dateOfBirth: credential.value.dateOfBirth,
    gender: credential.value.gender,
    maritalStatus: credential.value.maritalStatus,
    cityId: selectedCity.value,
  });
  router.back();
  // router.push("/profile/profile-update-success");
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


<!-- <script setup lang="ts">
import { use_update_profile } from "@/composables/auth/updateProfile";
import { useGetLocation } from "@/composables/core/useGetLocation";
import { watch, onMounted } from 'vue';

const {
  credential,
  locationCredential,
  loading,
  error,
  updateProfile,
  resetForm
} = use_update_profile();

const {
  states,
  cities,
  loadingStates,
  loadingCities,
  selectedState,
  selectedCity,
  handleStateChange,
} = useGetLocation();

// Watch for profile data changes to set initial state
watch(() => locationCredential.value, (newLocation) => {
  if (newLocation?.state && states.value?.length) {
    // Find and set the initial selected state
    const foundState = states.value.find(
      state => state.name === newLocation.state
    );
    if (foundState) {
      selectedState.value = foundState;
      handleStateChange(foundState.id);
    }
  }
}, { immediate: true });

// Watch for cities to be loaded to set initial city
watch(() => cities.value, (newCities) => {
  if (locationCredential.value?.lga && newCities?.length) {
    // Find and set the initial selected city
    const foundCity = newCities.find(
      city => city.name === locationCredential.value.lga
    );
    if (foundCity) {
      selectedCity.value = foundCity;
      credential.value.cityId = foundCity.id;
    }
  }
}, { immediate: true });

const handleSubmit = async () => {
  try {
    await updateProfile(credential.value);
  } catch (err) {
    console.error('Error updating profile:', err);
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="max-w-4xl mx-auto p-6 space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Personal Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">First Name</label>
          <input
            v-model="credential.firstName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            v-model="credential.lastName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="credential.email"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            v-model="credential.phoneNumber"
            type="tel"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            v-model="credential.dateOfBirth"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Gender</label>
          <select
            v-model="credential.gender"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Location Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">State</label>
          <select
            v-model="selectedState"
            @change="handleStateChange(selectedState?.id)"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            :disabled="loadingStates"
          >
            <option value="">Select State</option>
            <option
              v-for="state in states"
              :key="state.id"
              :value="state.name"
            >
              {{ state.name }}
            </option>
          </select>
          <span v-if="loadingStates" class="text-sm text-gray-500">Loading states...</span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">City/LGA</label>
          <select
            v-model="selectedCity"
            @change="credential.cityId = selectedCity?.id"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            :disabled="loadingCities || !selectedState"
          >
            <option value="">Select City/LGA</option>
            <option
              v-for="city in cities"
              :key="city.id"
              :value="city"
            >
              {{ city.name }}
            </option>
          </select>
          <span v-if="loadingCities" class="text-sm text-gray-500">Loading cities...</span>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Employment Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Employment Status</label>
          <select
            v-model="credential.employmentStatus"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select Status</option>
            <option value="employed">Employed</option>
            <option value="self-employed">Self Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Employer Name</label>
          <input
            v-model="credential.employerName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Employer Address</label>
          <input
            v-model="credential.employerAddress"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Monthly Net Salary</label>
          <input
            v-model="credential.monthlyNetSalary"
            type="number"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">Next of Kin Information</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Next of Kin Name</label>
          <input
            v-model="credential.nextOfKinName"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Relationship</label>
          <input
            v-model="credential.nextOfKinRelationship"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Next of Kin Email</label>
          <input
            v-model="credential.nextOfKinEmail"
            type="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Next of Kin Phone</label>
          <input
            v-model="credential.nextOfKinPhone"
            type="tel"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700">Next of Kin Address</label>
          <input
            v-model="credential.nextOfKinAddress"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-end space-x-4">
      <button
        type="button"
        @click="resetForm"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        :disabled="loading"
      >
        Reset
      </button>
      <button
        type="submit"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        :disabled="loading"
      >
        {{ loading ? 'Updating...' : 'Update Profile' }}
      </button>
    </div>

    <div v-if="error" class="text-red-600 text-sm mt-2">
      {{ error }}
    </div>
  </form>
</template> -->