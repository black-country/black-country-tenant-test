<!-- <template>
  <div class="flex items-center justify-between w-full max-w-4xl mx-auto px-4">
    <template v-for="(step, index) in steps" :key="index">
      <div class="flex-1 relative">
        <div class="flex items-center">
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center shadow-sm',
              stepsInfo[index].status === 'completed'
                ? 'bg-green-600 text-white'
                : stepsInfo[index].status === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-gray-50 text-gray-500'
            ]"
          >
            <template v-if="stepsInfo[index].status === 'completed'">
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
              stepsInfo[index].status === 'completed'
                ? 'border-green-600 font-medium'
                : stepsInfo[index].status === 'active'
                ? 'border-green-600 font-medium'
                : 'border-gray-600'
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
                  :style="{ width: stepsInfo[index].status === 'completed' ? '100%' : '0%' }"
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
            class="absolute left-0 text-center mt-2 text-sm whitespace-nowrap"
            :class="[
              stepsInfo[index].status === 'completed'
                ? 'text-green-600 font-medium'
                : stepsInfo[index].status === 'active'
                ? 'text-green-600 font-medium'
                : 'text-gray-600'
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

const steps = [
  'Application sent',
  'Application Approved',
  'Agreement signed',
  'Payment made'
];

const stepsInfo = ref(
  steps.map((label) => ({
    label,
    status: 'pending' // Default status
  }))
);

watch(
  () => props.propertyObj,
  (newPropertyObj) => {
    if (newPropertyObj?.rentalApplication?.status || newPropertyObj?.rentalApplication?.rentalLeaseAgreement?.status) {
      const appStatus = newPropertyObj.rentalApplication.status;
      const leaseStatus = newPropertyObj.rentalApplication.rentalLeaseAgreement?.status;

      stepsInfo.value.forEach((stepInfo, index) => {
        if (appStatus === 'CANCELLED') {
          stepInfo.status = 'cancelled';
        } else if (appStatus === 'APPROVED' && index <= 1) {
          stepInfo.status = index === 1 ? 'active' : 'completed';
        } else if (appStatus === 'PENDING' && index === 0) {
          stepInfo.status = 'active';
        } else if (leaseStatus === 'SIGNED' && index === 2) {
          stepInfo.status = 'completed';
        } else if (leaseStatus === 'SIGNED' && index === 3) {
          stepInfo.status = 'active';
        } else {
          stepInfo.status = 'pending';
        }
      });
    }
  },
  { immediate: true }
);
</script> -->


<template>
  <div class="flex items-center justify-between w-full max-w-4xl mx-auto px-4">
    <template v-for="(step, index) in steps" :key="index">
      <div class="flex-1 relative">
        <div class="flex items-center">
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center shadow-sm',
              stepsInfo[index].status === 'completed'
                ? 'bg-green-600 text-white'
                : stepsInfo[index].status === 'active'
                ? 'bg-green-600 text-white'
                : 'bg-gray-50 text-gray-500'
            ]"
          >
            <template v-if="stepsInfo[index].status === 'completed'">
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
              stepsInfo[index].status === 'completed'
                ? 'border-green-600 font-medium'
                : stepsInfo[index].status === 'active'
                ? 'border-green-600 font-medium'
                : 'border-gray-600'
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
                  :style="{ width: stepsInfo[index].status === 'completed' ? '100%' : '0%' }"
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
            class="absolute left-0 text-center mt-2 text-sm whitespace-nowrap"
            :class="[
              stepsInfo[index].status === 'completed'
                ? 'text-green-600 font-medium'
                : stepsInfo[index].status === 'active'
                ? 'text-green-600 font-medium'
                : 'text-gray-600'
            ]"
          >
            {{ step }}
          </span>
        </div>
      </div>
    </template>
  </div>
</template>

<!-- <script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

interface Props {
  currentStep?: number;
  propertyObj: Record<string, any>;
}

const props = defineProps<Props>();

const steps = [
  'Application sent',
  'Application Approved',
  'Agreement signed',
  'Payment made'
];

const stepsInfo = ref(
  steps.map((label) => ({
    label,
    status: 'pending' // Default status
  }))
);

watch(
  () => props.propertyObj,
  (newPropertyObj) => {
    if (
      newPropertyObj?.rentalApplication?.status ||
      newPropertyObj?.rentalApplication?.rentalLeaseAgreement?.status
    ) {
      const appStatus = newPropertyObj.rentalApplication.status;
      const leaseStatus =
        newPropertyObj.rentalApplication.rentalLeaseAgreement?.status;

      stepsInfo.value.forEach((stepInfo, index) => {
        if (appStatus === 'CANCELLED') {
          stepInfo.status = 'cancelled';
        } else if (appStatus === 'APPROVED' && index <= 1) {
          stepInfo.status = index === 1 ? 'active' : 'completed';
        } else if (appStatus === 'PENDING' && index === 0) {
          stepInfo.status = 'active';
        } else if (leaseStatus === 'SIGNED' && index === 2) {
          stepInfo.status = 'completed';
        } else if (appStatus === 'PAYMENT-MADE' && index === 3) {
          stepInfo.status = 'completed';
        } else if (leaseStatus === 'SIGNED' && index === 3) {
          stepInfo.status = 'active';
        } else {
          stepInfo.status = 'pending';
        }
      });
    }
  },
  { immediate: true }
);
</script> -->


<script setup lang="ts">
import { defineProps, ref, watch } from 'vue';

interface Props {
  currentStep?: number;
  propertyObj: Record<string, any>;
}

const props = defineProps<Props>();

const steps = [
  'Application sent',
  'Application Approved',
  'Agreement signed',
  'Payment made'
];

const stepsInfo = ref(
  steps.map((label) => ({
    label,
    status: 'pending' // Default status
  }))
);

watch(
  () => props.propertyObj,
  (newPropertyObj) => {
    if (
      newPropertyObj?.rentalApplication?.status ||
      newPropertyObj?.rentalApplication?.rentalLeaseAgreement?.status
    ) {
      const appStatus = newPropertyObj.rentalApplication.status;
      const leaseStatus =
        newPropertyObj.rentalApplication.rentalLeaseAgreement?.status;

      stepsInfo.value.forEach((stepInfo, index) => {
        if (appStatus === 'CANCELLED') {
          stepInfo.status = 'cancelled';
        } else if (appStatus === 'APPROVED' && index <= 1) {
          stepInfo.status = index === 1 ? 'active' : 'completed';
        } else if (appStatus === 'PENDING' && index === 0) {
          stepInfo.status = 'active';
        } else if (leaseStatus === 'SIGNED' && index === 2) {
          stepInfo.status = 'completed';
        } else if (appStatus === 'PAYMENT-MADE' && index === 3) {
          stepInfo.status = 'completed';
        } else if (leaseStatus === 'SIGNED' && appStatus !== 'PAYMENT-MADE' && index === 3) {
          stepInfo.status = 'pending';
        } else {
          stepInfo.status = 'pending';
        }
      });
    }
  },
  { immediate: true }
);
</script>
