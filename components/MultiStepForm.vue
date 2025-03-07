<!-- <template>
    <div class="app">
      <form @submit.prevent="handleSubmit" class="multi-step-form">
        <h1>Multi-Step Form</h1>
  
        <div class="progress">
          <span v-for="(stepLabel, index) in stepLabels" :key="index" 
                :class="{ active: index <= currentStep }">
            {{ index + 1 }}
          </span>
        </div>
  
        <component 
          :is="currentComponent"
          :title="stepLabels[currentStep]"
          v-model="form"
        />
  
        <div class="actions">
          <button v-if="currentStep > 0" @click="handleBack">Back</button>
          <button v-if="currentStep < stepComponents.length - 1" 
                  :disabled="!canProceed" @click="handleNext">
            Continue
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, defineAsyncComponent, reactive, ref, onMounted } from "vue";
  
  const stepComponents = [
  defineAsyncComponent(() => import('@/components/steps/PreScreening.vue')),
  defineAsyncComponent(() => import('@/components/steps/ProfileReview.vue')),
  defineAsyncComponent(() => import('@/components/steps/UploadID.vue')),
  defineAsyncComponent(() => import('@/components/steps/MaritalInfo.vue')),
  defineAsyncComponent(() => import('@/components/steps/GuarantorInfo.vue'))
];
  
  const stepLabels = ["Pre-Screening", "Profile Review", "Upload ID", "Marital Info", "Guarantor Info"];
  const currentStep = ref(0);
  
  // Reactive form data
  const form = reactive({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    rentalHistory: { landlord: "", address: "", tenancyLength: "", reason: "" },
    employment: { status: "", employer: "", salary: "" },
    references: [],
    idUpload: { idType: "", file: null },
    guarantor: { name: "", relationship: "", email: "", phone: "", id: null },
  });
  
  onMounted(async () => {
    try {
      const response = await fetch("/api/user-profile");
      const userProfile = await response.json();
  
      // Prefill form fields
      Object.assign(form, userProfile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  });
  
  const canProceed = computed(() => {
    switch (currentStep.value) {
      case 0: return form.firstName && form.email;
      case 1: return form.rentalHistory.landlord && form.rentalHistory.address;
      case 2: return form.idUpload.idType && form.idUpload.file;
      case 3: return form.maritalStatus === "married" ? form.spouse?.name : true;
      case 4: return form.guarantor.name && form.guarantor.email;
      default: return false;
    }
  });
  
  const handleNext = async () => {
    if (canProceed.value) {
      await fetch("/api/save-step", {
        method: "POST",
        body: JSON.stringify(form),
      });
      currentStep.value++;
    }
  };
  
  const handleBack = () => {
    if (currentStep.value > 0) currentStep.value--;
  };
  
  const currentComponent = computed(() => stepComponents[currentStep.value]);
  </script>
  
  <style scoped>
  .app {
    font-family: Arial, Helvetica, sans-serif;
    color: #434141;
    text-align: center;
  }
  .multi-step-form {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  .progress {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .progress span {
    width: 30px;
    height: 30px;
    background: #ddd;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .progress .active {
    background: #4caf50;
    color: white;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  button {
    padding: 10px 15px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:disabled {
    background: #ccc;
  }
  </style>
   -->


<template>
  <div class="app">
    <form @submit.prevent="handleSubmit" class="multi-step-form">
      <h1>Multi-Step Form</h1>

      <!-- Step Navigation -->
      <div class="progress">
        <span v-for="(stepLabel, index) in stepLabels" :key="index" :class="{ active: index <= currentStep }">
          {{ index + 1 }}
        </span>
      </div>

      <!-- Dynamic Step Component -->
      <component :is="currentComponent" :title="stepLabels[currentStep]" v-model:step-data="currentStepData" />

      <div class="actions">
        <button v-if="currentStep > 0" @click="handleBack">Back</button>
        <button v-if="currentStep < stepComponents.length - 1" :disabled="!canProceed" @click="handleNext">
          Continue
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref, onMounted } from "vue";

// Step components

const stepComponents = [
  defineAsyncComponent(() => import('@/components/steps/PreScreening.vue')),
  defineAsyncComponent(() => import('@/components/steps/ProfileReview.vue')),
  defineAsyncComponent(() => import('@/components/steps/UploadID.vue')),
  defineAsyncComponent(() => import('@/components/steps/MaritalInfo.vue')),
  defineAsyncComponent(() => import('@/components/steps/GuarantorInfo.vue'))
];

const stepLabels = ["Pre-Screening", "Profile Review", "Upload ID", "Marital Info", "Guarantor Info"];
const currentStep = ref(0);

// Reactive form state
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  maritalStatus: "",
  rentalHistory: { landlord: null, address: null, tenancyLength: null, reason: null },
  employment: { status: null, employer: null, salary: null },
  references: [],
  idUpload: { idType: null, file: null },
  guarantor: { name: null, relationship: null, email: null, phone: null, id: null },
  emergencyContacts: [], // ✅ Will be populated dynamically
});

onMounted(async () => {
  try {
    const response = await fetch("/api/user-profile");
    const userProfile = await response.json();

    // Populate form with existing data
    Object.assign(form, userProfile);

    // Ensure missing fields are properly initialized
    if (!form.rentalHistory) form.rentalHistory = { landlord: null, address: null, tenancyLength: null, reason: null };
    if (!form.employment) form.employment = { status: null, employer: null, salary: null };
    if (!form.references) form.references = [];
    if (!form.guarantor) form.guarantor = { name: null, relationship: null, email: null, phone: null, id: null };
    if (!form.emergencyContacts) form.emergencyContacts = []; // Ensure array exists

  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
});

const canProceed = computed(() => {
  switch (currentStep.value) {
    case 0: return form.firstName && form.email;
    case 1: return form.rentalHistory.landlord && form.rentalHistory.address;
    case 2: return form.idUpload.idType && form.idUpload.file;
    case 3: return form.maritalStatus === "married" ? form.spouse?.name : true;
    case 4: return form.guarantor.name && form.guarantor.email;
    default: return false;
  }
});

const handleNext = async () => {
  if (canProceed.value) {
    await fetch("/api/save-step", {
      method: "POST",
      body: JSON.stringify(form),
    });
    currentStep.value++;
  }
};

const handleBack = () => {
  if (currentStep.value > 0) currentStep.value--;
};

const currentComponent = computed(() => stepComponents[currentStep.value]);

const currentStepData = computed({
  get: () => {
    switch (currentStep.value) {
      case 0: return { firstName: form.firstName, lastName: form.lastName, email: form.email, phoneNumber: form.phoneNumber };
      case 1: return form.rentalHistory;
      case 2: return form.idUpload;
      case 3: return { maritalStatus: form.maritalStatus, spouse: form.spouse };
      case 4: return form.guarantor;
      default: return {};
    }
  },
  set: (newVal) => {
    switch (currentStep.value) {
      case 0:
        form.firstName = newVal.firstName;
        form.lastName = newVal.lastName;
        form.email = newVal.email;
        form.phoneNumber = newVal.phoneNumber;
        break;
      case 1:
        form.rentalHistory = newVal;
        break;
      case 2:
        form.idUpload = newVal;
        break;
      case 3:
        form.maritalStatus = newVal.maritalStatus;
        form.spouse = newVal.spouse;
        break;
      case 4:
        form.guarantor = newVal;
        break;
    }
  }
});
</script>