
<template>
    <div class="flex items-center justify-between w-full max-w-4xl mx-auto px-4">
      <!-- {{ propertyObj?.rentalApplication?.progress }} -->
      <template v-for="(step, index) in steps" :key="index">
        <div class="flex-1 relative">
          <div class="flex items-center">
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center shadow-sm',
                currentStep > index
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-50 text-gray-500'
              ]"
            >
              <template v-if="currentStep > index">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
              <template v-else>
                {{ index + 1 }}
              </template>
            </div>
  

            <div v-if="index < steps.length - 1" class="flex-1 px-2 border-[0.5px] border-dotted" :class="[
              currentStep > index ? 'border-green-700' : 'border-gray-500'
            ]" >
              <div class="h-[2px] flex items-center">
                <div class="w-full h-full relative">

                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full h-[2px] flex justify-between items-center">
                      <template v-for="n in 15" :key="n">
                        <div class="w-[2px] h-[2px] rounded-full bg-gray-300"></div>
                      </template>
                    </div>
                  </div>
                  

                  <div 
                    class="absolute inset-0 flex items-center transition-all duration-300 overflow-hidden"
                    :style="{ width: currentStep > index ? '100%' : '0%' }"
                  >
                    <div class="w-full h-[2px] flex justify-between items-center">
                      <template v-for="n in 15" :key="n">
                        <div class="w-[2px] h-[2px] rounded-full bg-green-600"></div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  

      <div class="">
        <span 
            class="absolute left-0   text-center mt-2 text-sm whitespace-nowrap"
            :class="[
              currentStep > index ? 'text-green-600 font-medium' : 'text-gray-600'
            ]"
          >
            {{ step }}
          </span>
      </div>
        </div>
      </template>
    </div>
  </template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

interface Props {
  currentStep?: number;
  propertyObj: Record<string, any>;
}

const props = defineProps<Props>();

// Default currentStep
const currentStep = props.currentStep ?? 1;

// Steps array as simple labels
const steps = [
  'Application sent',
  'Application Approved',
  'Agreement signed',
  'Payment made'
];

// Reactive array to store step information including status and progress
const stepsInfo = ref(
  steps.map((label) => ({
    label,
    status: 'pending',  // default status
    progress: 0,  // default progress
  }))
);

// Watch for changes in propertyObj and update progress based on progressKey
watch(
  () => props.propertyObj,
  (newPropertyObj) => {
    if (newPropertyObj?.value?.rentalApplication?.progress) {
      stepsInfo.value.forEach((stepInfo, index) => {
        const progressKey = steps[index].toLowerCase().replace(/\s+/g, '-'); // convert step label to progressKey
        const progressValue = newPropertyObj.value.rentalApplication.progress[progressKey];
        
        if (progressValue !== undefined) {
          stepInfo.progress = progressValue;
        }
      });
    }
  },
  { immediate: true }
);

// Set step statuses based on the currentStep
stepsInfo.value.forEach((stepInfo, index) => {
  if (index < currentStep - 1) {
    stepInfo.status = 'completed';
  } else if (index === currentStep - 1) {
    stepInfo.status = 'active';
  } else {
    stepInfo.status = 'pending';
  }
});
</script>




<!-- <script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  currentStep?: number;
  propertyObj: Record<string, any>;
}

const props = defineProps<Props>();

const currentStep = props.currentStep ?? 1;

const steps = [
  'Application sent',
  'Application Approved',
  'Agreement signed',
  'Payment made'
];
</script> -->

<!--   
  <script setup lang="ts">
  interface Props {
    currentStep?: number;
    propertyObj: Object
  }
  
  const props = withDefaults(defineProps<Props>(), {
    currentStep: 1,
  });
  
  const steps = [
    'Application sent',
    'Application Approved',
    'Agreement signed',
    'Payment made'
  ];
  </script> -->


  <!-- components/ProgressSteps.vue -->
<!-- <template>
    <div class="flex items-center justify-between w-full mx-auto px-4">
      <template v-for="(step, index) in steps" :key="index">
        <div class="flex-1 relative flex flex-col items-center">
          <div class="flex items-center w-full">
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center ml-2 shadow-sm',
                currentStep > index
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-50 text-gray-500'
              ]"
            >
              <template v-if="currentStep > index">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </template>
              <template v-else>
                {{ index + 1 }}
              </template>
            </div>
  
            <div 
              v-if="index < steps.length - 1" 
              class="flex-1 px-2 border-[0.5px] border-dotted" 
              :class="[
                currentStep > index ? 'border-green-700' : 'border-gray-500'
              ]"
            >
              <div class="h-[2px] flex items-center">
                <div class="w-full h-full relative">
                  <div class="absolute inset-0 flex items-center">
                    <div class="w-full h-[2px] flex justify-between items-center">
                      <template v-for="n in 15" :key="n">
                        <div class="w-[2px] h-[2px] rounded-full bg-gray-300"></div>
                      </template>
                    </div>
                  </div>
                  
                  <div 
                    class="absolute inset-0 flex items-center transition-all duration-300 overflow-hidden"
                    :style="{ width: currentStep > index ? '100%' : '0%' }"
                  >
                    <div class="w-full h-[2px] flex justify-between items-center">
                      <template v-for="n in 15" :key="n">
                        <div class="w-[2px] h-[2px] rounded-full bg-green-600"></div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  

          <span 
            class="text-center mt-4 block text-xs mr-32"
            :class="[
              currentStep > index ? 'text-green-600 font-medium' : 'text-gray-600'
            ]"
          >
            {{ step }}
          </span>
        </div>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Props {
    currentStep?: number;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    currentStep: 1
  });
  
  const steps = [
    'Application sent',
    'Application Approved',
    'Agreement signed',
    'Payment made'
  ];
  </script> -->