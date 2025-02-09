<!-- <template>
  <main>
    <TopNavBar />
    <div class="max-w-2xl mx-auto p-6 mb-20">
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
      <h2 class="text-xl font-medium mb-4 text-[#1D2739] my-4">
        {{ sectionTitle }}
      </h2>
      <form @submit.prevent="saveSection">
        <div v-for="(field, index) in fields" :key="index" class="mb-4">
          <label :class="[(field.label === 'Local Government' || field.label === 'State of Origin') ? 'hidden' : 'block']" class="text-sm font-medium text-[#1D2739]">
            {{ field.label }}
            <span v-if="field.isCompulsory" class="text-red-600">*</span>
          </label>
          <div v-if="field.type === 'text'">
            <input
              v-model="field.value"
              type="text"
              class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
            />
          </div>
          <div
            v-if="
              field.type === 'select' &&
              field.label !== 'State of Origin' &&
              field.label !== 'Local Government'
            "
          >
            <select
              v-model="field.value"
              class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
            >
              <option
                v-for="option in field.options"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
          <div class="w-full" v-if="field.type === 'date'">
            <AgeValidationDatePicker  v-model="field.value"
            label="" />
          </div>

          <div v-if="field.type === 'email'">
            <input
              v-model="field.value"
              type="email"
              class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
            />
          </div>
          <div v-if="field.type === 'number'">
            <input
              v-model="field.value"
              type="number"
              class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
            />
          </div>
          <div v-if="field.type === 'textarea'">
            <textarea
              v-model="field.value"
              class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
              rows="4"
            ></textarea>
          </div>
          <div v-if="field.type === 'file'">
            <input
              type="file"
              @change="handleFileUpload($event, field)"
              class="mt-1 block w-full p-2 pl-3 py-3.5 bg-[#F0F2F5] outline-none border-[0.5px] border-gray-100 rounded-md"
            />
            <p v-if="field.preview">{{ field.preview }}</p>
          </div>
          <div>

            <LocationDropdowns
              v-if="field.label === 'State of Origin'"
              v-model="stateOfOriginCityId"
              @update:state="handleStateOfOriginChange"
              @citySelected="handleStateOfOriginCitySelection"
              :key="'state-of-origin'"
            />
          </div>
        </div>
        <div
          class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center border-[0.5px]"
        >
          <div class="max-w-2xl w-full flex justify-between">
            <button
              class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]"
              @click="goBack"
            >
              Cancel
            </button>
            <button
              :disabled="!isFormValid || loading"
              type="submit"
              class="px-6 py-3 text-sm rounded-md disabled:cursor-not-allowed disabled:opacity-25 bg-[#292929] text-white"
              :class="{
                'bg-gray-300': !isFormValid,
                'bg-[#292929]': isFormValid,
              }"
            >
              {{ loading ? "processing..." : "Save" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template> -->

<template>
  <main>
    <TopNavBar />
    <div class="max-w-2xl mx-auto p-6 mb-20">
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

      <h2 class="text-xl font-medium mb-4 text-[#1D2739] my-4">
        {{ sectionTitle }}
      </h2>

      <form @submit.prevent="saveSection">
        <!-- Standard Fields -->
        <div v-for="(field, index) in fields" :key="index" class="mb-4">
          <label v-if="field.label !== 'State of Origin' && field.label !== 'Local Government'"
            class="text-sm font-medium text-[#1D2739]"
          >
            {{ field.label }}
            <span v-if="field.isCompulsory" class="text-red-600">*</span>
          </label>

          <div v-if="field.type === 'text'">
            <input v-model="field.value" type="text" class="border-[0.5px] border-gray-100 bg-gray-25 pl-3 rounded-lg w-full py-3" />
          </div>
          <div v-if="field.type === 'email'">
            <input v-model="field.value" type="email" class="border-[0.5px] border-gray-100 bg-gray-25 pl-3 rounded-lg w-full py-3" />
          </div>
          <div v-if="field.type === 'number'">
            <input v-model="field.value" type="number" class="border-[0.5px] border-gray-100 bg-gray-25 pl-3 rounded-lg w-full py-3" />
          </div>
          <div v-if="field.type === 'textarea'">
            <textarea v-model="field.value" class="border-[0.5px] border-gray-100 bg-gray-25 pl-3 rounded-lg w-full py-3" rows="4"></textarea>
          </div>
          <div v-if="field.type === 'file'">
            <input type="file" @change="handleFileUpload($event, field)" class="border-[0.5px] border-gray-100 bg-gray-25 pl-3 rounded-lg w-full py-3" />
            <p v-if="field.preview">{{ field.preview }}</p>
          </div>
        </div>

        <!-- 🟢 Emergency Contacts Section -->
        <h3 class="text-lg font-semibold mt-6 mb-2 text-[#1D2739]">Reference and Emergency Contacts</h3>

        <div v-for="(contact, index) in referenceContacts" :key="index" class="mb-6 border p-4 rounded-lg">
          <h4 class="font-semibold text-sm text-gray-700">
            {{ index + 1 }}. Emergency contact
          </h4>

          <!-- Full Name & Relationship -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium text-[#1D2739]">
                Full Name <span class="text-red-600">*</span>
              </label>
              <input v-model="contact.fullName" type="text" class="border-[0.5px] border-gray-100 bg-gray-25 pl-3 rounded-lg w-full py-3" placeholder="Enter full name" />
            </div>

            <div>
              <label class="text-sm font-medium text-[#1D2739]">
                Relationship <span class="text-red-600">*</span>
              </label>
              <select v-model="contact.relationship" class="border-[0.5px] border-gray-100 bg-gray-25 pl-3 rounded-lg w-full py-3">
                <option v-for="option in ['Mother', 'Father', 'Sibling', 'Spouse', 'Friend', 'Colleague', 'Other']"
                  :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </div>
          </div>

          <!-- Phone Number -->
          <div class="mt-4">
            <label class="text-sm font-medium text-[#1D2739]">
              Phone Number <span class="text-red-600">*</span>
            </label>
            <input v-model="contact.phoneNumber" type="number" class="border-[0.5px] border-gray-100 bg-gray-25 pl-3 rounded-lg w-full py-3" placeholder="Enter your phone number" />
          </div>

          <!-- Residential Address -->
          <div class="mt-4">
            <label class="text-sm font-medium text-[#1D2739]">
              Residential Address <span class="text-red-600">*</span>
            </label>
            <input v-model="contact.residentialAddress" type="text" class="border-[0.5px] border-gray-100 bg-gray-25 pl-3 rounded-lg w-full py-3" placeholder="Enter residential address" />
          </div>

          <!-- Remove Contact Button -->
          <button v-if="referenceContacts.length > 1"
            type="button"
            @click="removeReferenceContact(index)"
            class="mt-4 px-3 py-2.5 text-sm rounded-md bg-red-500 text-white">
            Remove Contact
          </button>
        </div>

        <!-- Add Emergency Contact Button -->
        <button type="button" @click="addReferenceContact"
          class="mt-4 px-4 py-2.5 bg-[#292929] text-white rounded-md text-sm">
          + Add Another Contact
        </button>

        <!-- Consent Checkbox -->
        <div class="mt-4 flex items-center">
          <input type="checkbox" v-model="consentToContactReferences" class="mr-2 h-4 w-4" />
          <label class="text-sm text-[#1D2739]">
            I consent to Homeowner/Property Manager contacting my References
          </label>
        </div>

        <!-- Form Buttons -->
        <div class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center border-[0.5px]">
          <div class="max-w-2xl w-full flex justify-between">
            <button class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]" @click="goBack">
              Cancel
            </button>
            <button
              :disabled="!isFormValid || loading"
              type="submit"
              class="px-6 py-3 text-sm rounded-md bg-[#292929] text-white disabled:cursor-not-allowed disabled:opacity-25">
              {{ loading ? "Processing..." : "Save" }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>



<script setup lang="ts">
import { use_tenant_profile } from "@/composables/auth/fetchProfile";
import { use_update_profile } from "@/composables/auth/updateProfile";
const { updateProfile, loading } = use_update_profile();
import { useRoute, useRouter } from "vue-router";
import { useFormPersistence } from "@/composables/core/useFormPersistence";
import { useDataMapping } from "@/composables/modules/rentals/useDataMapping";
const { credential, mapDataToCredential } = useDataMapping();
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();
import { useRemoveNullValues } from "@/composables/modules/rentals/useRemoveNullValues";
import { useGetLocation } from "@/composables/core/useGetLocation";
const { loading: loadingProfile, profileObj } = use_tenant_profile();
const { removeNullValues } = useRemoveNullValues();
const { states, cities, loadingStates, loadingCities, getStates, getCities } =
  useGetLocation();

  const currentEmploymentStatus =ref('')
  // const router = useRouter()

  const handleEmploymentStatusChang = (event) => {
      currentEmploymentStatus.value = event.target.value;
    }

    

const cleanedObject = ref({});
const selectedState = ref(""); // Define selectedState to track selected state
const selectedLga = ref(""); // Define selectedLga to track selected LGA (city)

const editMode = ref(false);

const selectedCityId = ref('');
const selectedLocation = ref<City | null>(null);

// const handleStateChanged = (stateCode: string) => {
//   console.log('Selected state code:', stateCode);
// };

// const handleCitySelection = (city: City | null) => {
//   console.log(city, 'city from parent')
//   selectedLocation.value = city;
// };

// Handlers for State of Origin
const handleStateOfOriginChange = (stateCode: string) => {
  // Handle state of origin change
  console.log('State of Origin changed:', stateCode);
};

const handleStateOfOriginCitySelection = (city: City | null) => {
  if (city) {
    selectedCityId.value = city.id
    // Handle state of origin city selection
    console.log('State of Origin LGA selected:', city.id);
  }
};

const route = useRoute();
const router = useRouter();
const section = ref(route.params.section) as any
const sectionTitle = ref(
  section.value.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
);

const referenceContacts = ref([
  {
    fullName: "",
    relationship: "",
    phoneNumber: "",
    residentialAddress: "",
  },
]);

const consentToContactReferences = ref(false);

// ✅ Add New Reference Contact
const addReferenceContact = () => {
  referenceContacts.value.push({
    fullName: "",
    relationship: "",
    phoneNumber: "",
    residentialAddress: ""
  });
};

const removeReferenceContact = (index) => {
  referenceContacts.value.splice(index, 1);
};


// const isReferenceFormValid = computed(() => {
//   return referenceContacts.value.every((contact) =>
//     contact.fullName.trim() &&
//     contact.relationship.trim() &&
//     contact.phoneNumber.trim() &&
//     contact.residentialAddress.trim()
//   );
// });

// Maximum allowable date for users over 20 years old
const maxAllowableDate = computed(() => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 20);
  return today.toISOString().split("T")[0]; // Format as 'YYYY-MM-DD'
});

// Watch for loadingProfile to pre-fill fields when profileObj is loaded
watch(
  () => loadingProfile.value,
  (newLoadingStatus) => {
    if (!newLoadingStatus && profileObj.value) {
      console.log("loADED OOOO", profileObj.value);
      prefillProfileData();
    }
  }
);

// const prefillProfileData = () => {
//   fields.value.forEach((field) => {
//     if (field.label === "Name") {
//       field.value = `${profileObj.value.firstName} ${profileObj.value.lastName}`;
//     } else if (field.label === "Email address") {
//       field.value = profileObj.value.email || "";
//     } else if (field.label === "Phone number") {
//       field.value = profileObj.value.phoneNumber || "";
//     } else if (field.label === "Date of Birth") {
//       // Convert date string from backend (ISO format) to 'YYYY-MM-DD' format for HTML input
//       if (profileObj.value.dateOfBirth) {
//         const dateObj = new Date(profileObj.value.dateOfBirth);
//         const formattedDate = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD format
//         field.value = formattedDate;
//       } else {
//         field.value = "";
//       }
//       field.max = maxAllowableDate.value; // Set the max attribute to the computed max allowable date
//     } else if (field.label === "Gender") {
//       field.value = profileObj.value.gender || "";
//     } else if (field.label === "Marital status") {
//       field.value = profileObj.value.maritalStatus || "";
//     } else if (field.label === "State of Origin") {
//       selectedState.value = profileObj.value.stateOfOrigin || "";
//     } else if (field.label === "Local Government") {
//       selectedLga.value = profileObj.value.lga || "";
//     }

//     // Rental history pre-fill
//     else if (field.label === "Current Landlord") {
//       field.value = profileObj.value.currentLandlord || "";
//     } else if (field.label === "Rental Address") {
//       field.value = profileObj.value.rentalAddress || "";
//     } else if (field.label === "Length of Tenancy") {
//       field.value = profileObj.value.lengthOfTenancy || "";
//     } else if (field.label === "Reason for moving out") {
//       field.value = profileObj.value.reasonForMovingOut || "";
//     }

//     // Employment information pre-fill
//     else if (field.label === "Current employment status") {
//       field.value = profileObj.value.employmentStatus || "";
//     } else if (field.label === "Employer's full name") {
//       field.value = profileObj.value.employerName || "";
//     } else if (field.label === "Organization address") {
//       field.value = profileObj.value.employerAddress || "";
//     } else if (field.label === "Occupation") {
//       field.value = profileObj.value.occupation || "";
//     } else if (field.label === "Monthly Net Salary") {
//       field.value = profileObj.value.monthlyNetSalary || "";
//     }

//     // Next of kin pre-fill
//     else if (field.label === "Full Name") {
//       field.value = profileObj.value.nextOfKinName || "";
//     } else if (field.label === "Relationship") {
//       field.value = profileObj.value.nextOfKinRelationship || "";
//     } else if (field.label === "Next of kin email address") {
//       field.value = profileObj.value.nextOfKinEmail || "";
//     } else if (field.label === "Residential address") {
//       field.value = profileObj.value.nextOfKinAddress || "";
//     } else if (field.label === "Phone Number") {
//       field.value = profileObj.value.nextOfKinPhone || "";
//     } else if (field.label === "Occupation") {
//       field.value = profileObj.value.nextOfKinOccupation || "";
//     } else if (field.label === "Organization name") {
//       field.value = profileObj.value.nextOfKinEmployer || "";
//     } else if (field.label === "Office address") {
//       field.value = profileObj.value.nextOfKinEmployerAddress || "";
//     }
//   });
// };

const prefillProfileData = () => {
  fields.value.forEach((field) => {
    if (field.label === "Name") {
      field.value = `${profileObj.value.firstName} ${profileObj.value.lastName}`;
    } else if (field.label === "Email address") {
      field.value = profileObj.value.email || "";
    } else if (field.label === "Phone number") {
      field.value = profileObj.value.phoneNumber || "";
    } else if (field.label === "Date of Birth") {
      if (profileObj.value.dateOfBirth) {
        const dateObj = new Date(profileObj.value.dateOfBirth);
        field.value = dateObj.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      } else {
        field.value = "";
      }
      field.max = maxAllowableDate.value;
    } else if (field.label === "Gender") {
      field.value = profileObj.value.gender || "";
    } else if (field.label === "Marital status") {
      field.value = profileObj.value.maritalStatus || "";
    } else if (field.label === "State of Origin") {
      selectedState.value = profileObj.value.stateOfOrigin || "";
    } else if (field.label === "Local Government") {
      selectedLga.value = profileObj.value.lga || "";
    }

    // Rental history pre-fill
    else if (field.label === "Current Landlord") {
      field.value = profileObj.value.currentLandlord || "";
    } else if (field.label === "Rental Address") {
      field.value = profileObj.value.rentalAddress || "";
    } else if (field.label === "Length of Tenancy") {
      field.value = profileObj.value.lengthOfTenancy || "";
    } else if (field.label === "Reason for moving out") {
      field.value = profileObj.value.reasonForMovingOut || "";
    }

    // Employment information pre-fill
    else if (field.label === "Current employment status") {
      field.value = profileObj.value.employmentStatus || "";
    } else if (field.label === "Employer's full name") {
      field.value = profileObj.value.employerName || "";
    } else if (field.label === "Organization address") {
      field.value = profileObj.value.employerAddress || "";
    } else if (field.label === "Occupation") {
      field.value = profileObj.value.occupation || "";
    } else if (field.label === "Monthly Net Salary") {
      field.value = profileObj.value.monthlyNetSalary || "";
    }

    // Next of Kin pre-fill
    else if (field.label === "Full Name") {
      field.value = profileObj.value.nextOfKinName || "";
    } else if (field.label === "Relationship") {
      field.value = profileObj.value.nextOfKinRelationship || "";
    } else if (field.label === "Next of kin email address") {
      field.value = profileObj.value.nextOfKinEmail || "";
    } else if (field.label === "Residential address") {
      field.value = profileObj.value.nextOfKinAddress || "";
    } else if (field.label === "Phone Number") {
      field.value = profileObj.value.nextOfKinPhone || "";
    } else if (field.label === "Occupation") {
      field.value = profileObj.value.nextOfKinOccupation || "";
    } else if (field.label === "Organization name") {
      field.value = profileObj.value.nextOfKinEmployer || "";
    } else if (field.label === "Office address") {
      field.value = profileObj.value.nextOfKinEmployerAddress || "";
    }
  });

  // 🟢 **NEW**: Populate referenceContacts (emergency contacts)
  if (profileObj.value.referenceContacts?.length) {
    referenceContacts.value = profileObj.value.referenceContacts.map((contact) => ({
      fullName: contact.fullName || "",
      relationship: contact.relationship || "",
      phoneNumber: contact.phoneNumber || "",
      residentialAddress: contact.residentialAddress || "",
    }));
  }
};


// const fields = ref([]);
// const sectionFields = {
//   "personal-information": [
//     { label: "Name", value: "", type: "text", isCompulsory: true },
//     { label: "Email address", value: "", type: "email", isCompulsory: true },
//     { label: "Phone number", value: "", type: "number", isCompulsory: true },
//     { label: "Date of Birth", value: "", type: "date", isCompulsory: true },
//     {
//       label: "Marital status",
//       value: "",
//       type: "select",
//       options: ["single", "married"],
//     },
//     {
//       label: "Gender",
//       value: "",
//       type: "select",
//       options: ["male", "female", "I’ll rather not say"],
//     },
//     {
//       label: "State of Origin",
//       value: "",
//       type: "select",
//       code: "state_of_origin",
//       options: [],
//       isCompulsory: false,
//     }, // State as select
//     {
//       label: "Local Government",
//       value: "",
//       type: "select",
//       code: "lga",
//       options: [],
//       isCompulsory: false,
//     }, // LGA as select
//   ],
//   "rental-history": [
//     { label: "Current Landlord", value: "", type: "text" },
//     { label: "Rental Address", value: "", type: "text" },
//     { label: "Length of Tenancy", value: "", type: "text" },
//     { label: "Reason for moving out", value: "", type: "textarea" },
//   ],
//   "employment-information": [
//     {
//       label: "Current employment status",
//       isCompulsory: true,
//       value: "",
//       type: "select",
//       options: ["employed", "unemployed", "self-employed"],
//     },
//     {
//       label: "Employer's full name",
//       isCompulsory: true,
//       value: "",
//       type: "text",
//     },
//     { label: "Organization address", value: "", type: "text" },
//     { label: "Occupation", value: "", type: "text" },
//     {
//       label: "Monthly Net Salary",
//       isCompulsory: true,
//       value: "",
//       type: "number",
//     },
//   ],
//   "next-of-kin": [
//     { label: "Full Name", value: "", type: "text" },
//     {
//       label: "Relationship",
//       value: "",
//       type: "select",
//       options: [
//         "mother",
//         "father",
//         "sister",
//         "brother",
//         "daughter",
//         "son",
//         "relative",
//       ],
//     },
//     // { label: "Next of kin email address", isCompulsory: true, value: "", type: "email" },
//     { label: "Phone Number", isCompulsory: true, value: "", type: "number" },
//     {
//       label: "Residential address",
//       isCompulsory: true,
//       value: "",
//       type: "text",
//     },
//     // { label: "Occupation", value: "", type: "text" },
//     // { label: "Organization name", value: "", type: "text" },
//     // { label: "Office address", value: "", type: "text" },
//   ],
//   // "reference-and-emergency": [
//   //   { label: "Full Name", value: "", type: "text" },
//   //   {
//   //     label: "Relationship",
//   //     value: "",
//   //     type: "select",
//   //     options: [
//   //       "mother",
//   //       "father",
//   //       "sister",
//   //       "brother",
//   //       "daughter",
//   //       "son",
//   //       "relative",
//   //     ],
//   //   },
//   //   // { label: "Next of kin email address", isCompulsory: true, value: "", type: "email" },
//   //   { label: "Phone Number", isCompulsory: true, value: "", type: "number" },
//   //   {
//   //     label: "Residential address",
//   //     isCompulsory: true,
//   //     value: "",
//   //     type: "text",
//   //   },
//   //   // { label: "Occupation", value: "", type: "text" },
//   //   // { label: "Organization name", value: "", type: "text" },
//   //   // { label: "Office address", value: "", type: "text" },
//   // ],
// };

const fields = ref([]);
const sectionFields = {
  "personal-information": [
    { label: "Name", value: "", type: "text", isCompulsory: true },
    { label: "Email address", value: "", type: "email", isCompulsory: true },
    { label: "Phone number", value: "", type: "number", isCompulsory: true },
    { label: "Date of Birth", value: "", type: "date", isCompulsory: true },
    {
      label: "Marital status",
      value: "",
      type: "select",
      options: ["single", "married"],
    },
    {
      label: "Gender",
      value: "",
      type: "select",
      options: ["male", "female", "I’ll rather not say"],
    },
    {
      label: "State of Origin",
      value: "",
      type: "select",
      code: "state_of_origin",
      options: [],
      isCompulsory: false,
    },
    {
      label: "Local Government",
      value: "",
      type: "select",
      code: "lga",
      options: [],
      isCompulsory: false,
    },
  ],
  "rental-history": [
    { label: "Current Landlord", value: "", type: "text" },
    { label: "Rental Address", value: "", type: "text" },
    { label: "Length of Tenancy", value: "", type: "text" },
    { label: "Reason for moving out", value: "", type: "textarea" },
  ],
  "employment-information": [
    {
      label: "Current employment status",
      isCompulsory: true,
      value: "",
      type: "select",
      options: ["employed", "unemployed", "self-employed"],
    },
    {
      label: "Employer's full name",
      isCompulsory: true,
      value: "",
      type: "text",
    },
    { label: "Organization address", value: "", type: "text" },
    { label: "Occupation", value: "", type: "text" },
    {
      label: "Monthly Net Salary",
      isCompulsory: true,
      value: "",
      type: "number",
    },
  ],
  "next-of-kin": [
    { label: "Full Name", value: "", type: "text" },
    {
      label: "Relationship",
      value: "",
      type: "select",
      options: [
        "mother",
        "father",
        "sister",
        "brother",
        "daughter",
        "son",
        "relative",
      ],
    },
    { label: "Phone Number", isCompulsory: true, value: "", type: "number" },
    {
      label: "Residential address",
      isCompulsory: true,
      value: "",
      type: "text",
    },
  ],

  // ✅ **Updated: Reference and Emergency Contacts Section**
  "reference-and-emergency": [
    {
      label: "Reference Contacts",
      value: [
        {
          fullName: "",
          relationship: "",
          phoneNumber: "",
          residentialAddress: "",
        },
      ],
      type: "array",
      fields: [
        { label: "Full Name", value: "", type: "text", isCompulsory: true },
        {
          label: "Relationship",
          value: "",
          type: "select",
          options: [
            "mother",
            "father",
            "sister",
            "brother",
            "daughter",
            "son",
            "relative",
            "friend",
          ],
          isCompulsory: true,
        },
        { label: "Phone Number", value: "", type: "number", isCompulsory: true },
        {
          label: "Residential address",
          value: "",
          type: "text",
          isCompulsory: true,
        },
      ],
    },
    {
      label: "Consent to Contact References",
      value: false,
      type: "checkbox",
    },
  ],
};


// Load fields based on section
fields.value = sectionFields[section.value] || [];

// Persist form data
const { saveData, loadData } = useFormPersistence();

onMounted(async () => {
  const savedData = loadData(section.value);
  if (savedData) {
    // Iterate over the saved data and assign it to the corresponding fields
    savedData.forEach((savedField: any, index: number) => {
      if (fields.value[index]) {
        fields.value[index].value = savedField.value;
      }
    });
  }

  // Fetch states from the API and wait for the result
  await getStates(); // Ensure this is awaited

  // Populate the State of Origin options with the fetched states
  const stateField = fields.value.find(
    (field) => field.label === "State of Origin"
  );

  if (stateField && states.value.length) {
    stateField.options = states.value.map((state) => ({
      name: state.name,
      stateCode: state.stateCode, // Assuming stateCode exists in the state data
    }));
  } else {
    console.log(
      "State options not populated, no states available or stateField not found."
    );
  }
});


watch(selectedState, async (newState) => {
  console.log(newState, "watching from outside");

  // Ensure newState exists and has the necessary properties
  if (newState && newState.name && newState.stateCode) {
    const stateField = fields.value.find((field) => field.label === "State of Origin");
    if (stateField) {
      stateField.value = newState.name;
    }

    // Proceed with fetching cities for the state
    try {
      await getCities(newState.stateCode);

      // Find the Local Government field and update it with fetched cities
      const lgaField = fields.value.find((field) => field.label === "Local Government");
      if (lgaField && cities.value.length) {
        lgaField.options = cities.value.map((city) => city.name);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  } else {
    console.warn("Invalid state selected:", newState);
  }
});

watch(selectedLga, (newLga) => {
  console.log(newLga, "watching from outside");

  // Ensure selected LGA is valid before updating the field
  if (newLga) {
    const lgaField = fields.value.find((field) => field.label === "Local Government (LGA)");
    if (lgaField) {
      lgaField.value = newLga;
    } else {
      console.warn("LGA field not found.");
    }
  } else {
    console.warn("Invalid LGA selected:", newLga);
  }
});


// Computed property to check if all compulsory fields are filled
// const isFormValid = computed(() => {
//   return fields.value.every(field => !field.isCompulsory || (field.isCompulsory && field.value));
// });

// const isFormValid = computed(() => {
//   return fields.value.every((field) => {
//     if (!field.isCompulsory) return true;

//     // Check for different field types
//     if (field.type === "select") {
//       // Ensure a valid option is selected (not empty or undefined)
//       return (
//         field.value !== "" && field.value !== null && field.value !== undefined
//       );
//     }

//     if (field.type === "number") {
//       // Ensure a number field is valid (not empty, undefined, or NaN)
//       return field.value !== "" && field.value !== null && !isNaN(field.value);
//     }

//     // For other field types (e.g., text, email, date), ensure they are not empty
//     return (
//       field.value !== "" && field.value !== null && field.value !== undefined
//     );
//   });
// });

// const isFormValid = computed(() => {
//   // Validate all regular fields
//   const fieldsValid = fields.value.every((field) => {
//     if (!field.isCompulsory) return true;

//     if (field.type === "select") {
//       return field.value !== "" && field.value !== null && field.value !== undefined;
//     }

//     if (field.type === "number") {
//       return field.value !== "" && field.value !== null && !isNaN(field.value);
//     }

//     return field.value !== "" && field.value !== null && field.value !== undefined;
//   });

//   // Validate emergency contacts
//   const referenceContactsValid = referenceContacts.value.every((contact) =>
//     contact?.fullName?.trim() &&
//     contact?.relationship?.trim() &&
//     contact?.phoneNumber?.trim() &&
//     contact?.residentialAddress?.trim()
//   );

//   // Ensure both standard fields and reference contacts are valid
//   return fieldsValid && referenceContactsValid;
// });

// const isFormValid = computed(() => {
//   // Validate all standard fields
//   const fieldsValid = fields.value.every((field) => {
//     if (!field.isCompulsory) return true;

//     if (field.type === "select") {
//       return field.value !== "" && field.value !== null && field.value !== undefined;
//     }

//     if (field.type === "number") {
//       return field.value !== "" && field.value !== null && !isNaN(field.value);
//     }

//     return field.value !== "" && field.value !== null && field.value !== undefined;
//   });

//   // Validate emergency contacts (ensure all fields are filled)
//   const referenceContactsValid = referenceContacts.value.every((contact) =>
//     typeof contact.fullName === "string" && contact.fullName.trim() !== "" &&
//     typeof contact.relationship === "string" && contact.relationship.trim() !== "" &&
//     typeof contact.phoneNumber === "string" && contact.phoneNumber.toString().trim() !== "" &&
//     typeof contact.residentialAddress === "string" && contact.residentialAddress.trim() !== ""
//   );

//   return fieldsValid && referenceContactsValid;
// });

const isFormValid = computed(() => {
  console.log("Checking form validity...");

  // ✅ Validate Standard Fields
  const fieldsValid = fields.value.every((field) => {
    if (!field.isCompulsory) return true;

    if (field.type === "select") {
      return field.value !== "" && field.value !== null && field.value !== undefined;
    }

    if (field.type === "number") {
      return field.value !== "" && field.value !== null && !isNaN(Number(field.value));
    }

    return field.value !== "" && field.value !== null && field.value !== undefined;
  });

  // ✅ Validate Emergency Contacts
  const referenceContactsValid = referenceContacts.value.every((contact, index) => {
    const isValid =
      typeof contact.fullName === "string" && contact.fullName !== "" &&
      typeof contact.relationship === "string" && contact.relationship !== "" &&
      typeof contact.phoneNumber === "string" && contact.phoneNumber !== "" &&
      typeof contact.residentialAddress === "string" && contact.residentialAddress !== "";

    if (!isValid) {
      console.log(`Invalid contact at index ${index}:`, contact);
    }
    
    return isValid;
  });

  // ✅ Validate Consent Checkbox (Optional or Required)
  const consentValid = consentToContactReferences.value === true;

  // 🔹 Make the consent checkbox required if needed
  const formIsValid = fieldsValid && referenceContactsValid && consentValid;

  console.log("Form Valid:", formIsValid);
  return formIsValid;
});


// // Save form data and move to the next step
// const saveSection = async () => {
//   try {
//     mapDataToCredential(fields.value);
//     credential.value.cityId = selectedCityId.value
//     cleanedObject.value = removeNullValues(credential.value);
//     console.log(cleanedObject.value, "cleaned");
//     updateProfile(cleanedObject.value).then(() => {
//       showToast({
//         title: "Success",
//         message: `${section.value} was updated successfully`,
//         toastType: "success",
//         duration: 3000,
//       });
//       saveData(section.value, fields.value);
//       console.log('Hit here')
//       router.back()
//       router.push({ query: { step: "2" } });
//     });

//     // // Save data using the section's title as the key
//     // saveData(section.value, fields.value); // Section title as the key, field values as the value

//     // // Debugging: log the saved data
//     // console.log('Saved Data:', section.value, fields.value);

//     // router.push({ query: { step: '2' } });
//   } catch (error) {
//     console.error("Error saving form data:", error);
//   }
// };

// const saveSection = async () => {
//   try {
//     mapDataToCredential(fields.value);
//     credential.value.cityId = selectedCityId.value;

//     const cleanedData = {
//       referenceContacts: referenceContacts.value.filter(
//         (contact) =>
//           contact.fullName &&
//           contact.relationship &&
//           contact.phoneNumber &&
//           contact.residentialAddress
//       ),
//     };

//     cleanedObject.value = removeNullValues({ ...credential.value, ...cleanedData });

//     await updateProfile(cleanedObject.value);

//     showToast({
//       title: "Success",
//       message: `${section.value} was updated successfully`,
//       toastType: "success",
//       duration: 3000,
//     });

//     saveData(section.value, referenceContacts.value);
//     router.back();
//     router.push({ query: { step: "2" } });
//   } catch (error) {
//     console.error("Error saving form data:", error);
//   }
// };

// const saveSection = async () => {
//   try {
//     mapDataToCredential(fields.value);
//     credential.value.cityId = selectedCityId.value;

//     // ✅ Ensure phoneNumber is stored as a string
//     const cleanedData = {
//       referenceContacts: referenceContacts.value
//         .filter(contact => 
//           contact.fullName &&
//           contact.relationship &&
//           contact.phoneNumber &&
//           contact.residentialAddress
//         )
//         .map(contact => ({
//           ...contact,
//           phoneNumber: String(contact.phoneNumber), // Convert phone number to string
//         })),
//     };

//     cleanedObject.value = removeNullValues({ ...credential.value, ...cleanedData });

//     await updateProfile(cleanedObject.value);

//     showToast({
//       title: "Success",
//       message: `${section.value} was updated successfully`,
//       toastType: "success",
//       duration: 3000,
//     });

//     saveData(section.value, referenceContacts.value);
//     router.back();
//     router.push({ query: { step: "2" } });
//   } catch (error) {
//     console.error("Error saving form data:", error);
//   }
// };

// const router = useRouter();

const saveSection = async () => {
  const router = useRouter()
  try {
    mapDataToCredential(fields.value);
    credential.value.cityId = selectedCityId.value;

    // ✅ Ensure phoneNumber is stored as a string & pass consent checkbox
    const cleanedData = {
      referenceContacts: referenceContacts.value
        .filter(contact => 
          contact.fullName &&
          contact.relationship &&
          contact.phoneNumber &&
          contact.residentialAddress
        )
        .map(contact => ({
          ...contact,
          phoneNumber: String(contact.phoneNumber), // Convert phone number to string
        })),

      shouldContactReferences: consentToContactReferences.value, // ✅ Include consent checkbox
    };

    cleanedObject.value = removeNullValues({ ...credential.value, ...cleanedData });
    // console.log(cleanedObject.value, 'cleanted')
    await updateProfile(cleanedObject.value).then((data) => {
       console.log(data, 'success fata')
    })

    showToast({
      title: "Success",
      message: `${section.value} was updated successfully`,
      toastType: "success",
      duration: 3000,
    });

    saveData(section.value, fields.value);

    // saveData(section.value, { 
    //   referenceContacts: referenceContacts.value, 
    //   shouldContactReferences: consentToContactReferences.value 
    // });

    await router.back();
    // router.push({ query: { step: "2" } });
  } catch (error) {
    console.error("Error saving form data:", error);
  }
};


// Go back to the previous step
const goBack = () => {
  router.back(); // Go back to the previous step
};

// Handle file upload
const handleFileUpload = (event: Event, field: any) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    field.value = file; // Store the file object
    field.preview = file.name; // Display the file name as a preview
  }
};
</script>
