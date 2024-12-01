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
              :disabled="!!addressObj.fullName"
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
            <!-- <div class="flex justify-center items-center space-x-4">
    <label for="dob" class="block text-sm font-medium text-gray-700">Date of Birth</label>
    <input
      id="dob"
      v-model="selectedDate"
      type="date"
      class="border border-gray-300 p-2 rounded-md"
      :min="minDate"
      :max="maxDate"
      @input="checkAge"
    />
    <p v-if="isUnderage" class="text-red-500 text-sm">You must be at least 18 years old to sign up.</p>
  </div> -->
            <!-- <input
                id="dob"
                v-model="selectedDate"
                type="date"
                class="border border-gray-300 p-2 rounded-md"
                :min="minDate"
                :max="maxDate"
              /> -->
            <!-- <div>
              <label class="text-[#1D2739] text-sm"
                >Date of Birth <span class="text-red-500">*</span></label
              >
              <input
                v-model="credential.dateOfBirth"
                type="date"
                class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
                   />

            </div> -->
            <!-- <div>
              <label for="dob" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input
                  v-model="credential.dateOfBirth"
                  type="date"
                  :min="minDate"
                  :max="maxDate"
                  class="w-full p-2 mt-1 outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
                  @input="checkAge"
                />
                <p v-if="isUnderage" class="text-red-500 text-sm">Date of birth must be at least 18 years old.</p>
              </div> -->
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

            <!-- {{ selectedCity }} -->
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
import { format, subYears } from 'date-fns'
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

// // Format the date 18 years ago to 'yyyy-MM-dd' for minDate
// const minDate = format(eighteenYearsAgo, 'yyyy-MM-dd')

// // maxDate is today, preventing future date selection
// const maxDate = today.value

// Set the minimum date to 18 years ago and the maximum date to today
const minDate = eighteenYearsAgo
const maxDate = today.value

// Flag to track if the user is underage
const isUnderage = ref(false)

// Function to check if the selected date makes the user under 18

// Function to check if the selected date makes the user under 18
// const checkAge = () => {
//   const selected = new Date(credential.value.dateOfBirth)

//   // Compare the selected date to the date 18 years ago to ensure the user is at least 18
//   const isUnder18 = isBefore(selected, eighteenYearsAgo)

//   if (!isUnder18) {
//     isUnderage.value = false
//   } else {
//     isUnderage.value = true
//   }
// }

// Function to check if the selected date makes the user under 18
const checkAge = () => {
  const selected = moment(credential.value.dateOfBirth)

  // Compare the selected date to the date 18 years ago to ensure the user is at least 18
  if (selected.isBefore(eighteenYearsAgo, 'day')) {
    isUnderage.value = false
  } else {
    isUnderage.value = true
  }
}

// const today = ref(new Date().toISOString().split("T")[0])

// import { format, subYears } from 'date-fns'

// Get today's date and calculate the date 18 years ago
// const today = new Date()
// const eighteenYearsAgo = subYears(today, 18)

// // Format the dates to 'yyyy-MM-dd' to be compatible with input[type="date"]
// const minDate = format(eighteenYearsAgo, 'yyyy-MM-dd')  // Ensures the user is at least 18
// const maxDate = format(today, 'yyyy-MM-dd')  // Prevents future date selection

// // Reactive variable to store the selected date
// const selectedDate = ref<string>('')

// // Flag to track if the user is underage
// const isUnderage = ref(false)

// // Check if the selected date is valid (i.e., the user is 18+)
// const checkAge = () => {
//   const selected = new Date(selectedDate.value)
//   const age = today.getFullYear() - selected.getFullYear()

//   if (age < 18 || (age === 18 && selected > eighteenYearsAgo)) {
//     isUnderage.value = true
//   } else {
//     isUnderage.value = false
//   }
// }

// // Get today's date and calculate the relevant min and max dates
// // const today = new Date()
// const eighteenYearsAgo = subYears(today, 18)

// // Format the dates to 'yyyy-mm-dd' to be compatible with input[type="date"]
// const minDate = format(eighteenYearsAgo, 'yyyy-MM-dd')  // For users who are at least 18 years old
// const maxDate = format(today, 'yyyy-MM-dd')  // Prevent future dates

// // Bind the selected date to this ref
// const selectedDate = ref<string>('')


// Import user composable
const { user } = useUser();

// const today = ref(new Date().toISOString().split("T")[0]);

// API to update profile
const { credential, updateProfile, loading: updating } = use_update_profile();

onMounted(() => {
  if (credential.value) {
    // Prefill the state and LGA if the credential object is already available
    selectedState.value = credential.value.state;
    selectedCity.value = credential.value.lga;
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
