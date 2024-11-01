<template>
    <main>
      <TopNavBar class="sticky top-0 z-50" />
      <div class="max-w-2xl mx-auto p-6">
        <div class="flex justify-between items-center pb-5">
          <button @click="goBack" class="text-xl p-2 cursor-pointer">
            <svg class="cursor-pointer" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
              <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
  
          <button @click="saveData" class="text-green-600 font-medium cursor-pointer">Save</button>
        </div>
  
        <div class="relative w-full mb-6">
          <!-- Divider that spans across all stages -->
          <div class="absolute top-1/2 left-0 w-full h-px bg-gray-300"></div>
        
          <div class="flex justify-between items-center w-full">
            <div class="flex items-center justify-between w-full overflow-x-auto">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="relative flex items-center"
              >
                <div
                  class="flex items-center justify-center w-8 h-8 rounded-full z-10"
                  :class="{
                    'bg-[#5B8469] text-white': index + 1 <= currentStepInt,
                    'bg-gray-200 text-gray-500': index + 1 > currentStepInt
                  }"
                >
                  {{ index + 1 }}
                </div>
                <!-- Divider between steps (only for non-final steps) -->
                <div
                  v-if="index < steps.length - 1"
                  class="h-px border-[0.5px] border-dotted flex-grow mx-2 sm:mx-4"
                  :class="{
                    'bg-[#5B8469]': index + 1 < currentStepInt,
                    'bg-gray-300': index + 1 >= currentStepInt
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
        
<!-- 
        <div class="flex justify-between items-center mb-6 w-full">
          <div class="flex items-center justify-between w-full">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="flex items-center"
            >
              <div
                class="flex items-center justify-center w-8 h-8 rounded-full"
                :class="{
                  'bg-[#5B8469] text-white': index + 1 <= currentStepInt,
                  'bg-gray-200 text-gray-500': index + 1 > currentStepInt
                }"
              >
                {{ index + 1 }}
              </div>
              <div
                v-if="index < steps.length - 1"
                class="w-[260px] h-px border-[0.5px] border-dotted"
                :class="{
                  'bg-[#5B8469]': index + 1 < currentStepInt,
                  'bg-gray-300': index + 1 >= currentStepInt
                }"
              ></div>
            </div>
          </div>
        </div> -->
        <div v-if="currentStepInt === 1">
          <RentalApplicationsPreScreeningQuestions @next="handleNext" />
        </div>
  
        <div v-if="currentStepInt === 2">
          <RentalApplicationsReviewProfileDetails @next="handleNext" @back="handleBack" />
        </div>
  
        <div v-if="currentStepInt === 3">
          <RentalApplicationsUploadDocuments @submit="handleSubmit" @back="handleBack" />
        </div>
  
      </div>
    </main>
  </template>
  


  <script setup lang="ts">
import { computed } from "vue";
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
import { useRouter, useRoute } from "vue-router";
import { useFormPersistence } from "@/composables/core/useFormPersistence";
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();
const { loadData } = useFormPersistence();
// Fetch property data
const { propertyObj, loading } = useFetchProperty();


// Access query parameter
const route = useRoute();
const router = useRouter();

// Steps array (can be dynamic or defined based on the flow)
const steps = [
  "Pre-Screening Questions",
  "Review Profile Details",
  "Upload Documents",
];

// Compute current step from query params
const currentStep = computed(() => route.query.step || "1");
const currentStepInt = computed(() => parseInt(currentStep.value));

// Navigation handlers
const handleNext = () => {
  const nextStep = currentStepInt.value + 1;
  router.push({ query: { step: nextStep.toString() } });
};

const handleBack = () => {
  const prevStep = currentStepInt.value - 1;
  router.push({ query: { step: prevStep.toString() } });
};

const handleSubmit = () => {
  router.push("/success");
};

const goBack = () => {
  console.log(route.query, 'my route')
  if(route.query.step === '1'){
    router.push(`/dashboard/listings/${route?.params?.id}/preview`); 
  } else {
    router.push({ query: { step: "1" } });
  }
};

const saveData = () => {
  showToast({
    title: "Success",
    message: "Data was saved successfully",
    toastType: "success",
    duration: 3000,
  });
  router.push({
    path: route.path, // Keep the same path
    query: { ...route.query, step: "2" }, // Update the query with the new step
  });
};
</script>