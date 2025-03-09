<!-- <template>
  <div class="bg-white rounded-lg w-full relative">
    <button
      @click="emit('close')"
      class="absolute -top-10 -right-6 bg-white rounded-full p-2 text-[#1D2739] hover:text-red-600"
      aria-label="Close"
    >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    <div class="mb-4">
      <div class="flex justify-between">
        <div class="flex w-full">
          <div
            :class="['flex-1 h-2', currentStep >= 1 ? 'bg-[#292929]' : 'bg-[#E4E7EC]']"
            class="rounded-l-lg"
          ></div>
          <div
            :class="['flex-1 h-2', currentStep >= 2 ? 'bg-[#292929]' : 'bg-[#E4E7EC]']"
            class="rounded-r-lg"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="currentStep === 1">
      <div class="flex justify-between">
        <h3 class="tfont-medium text-[#1D2739]">Step 1: Tenant's Details</h3>
      </div>

      <div class="mt-4">
        <label class="block text-sm font-semibold">Full name *</label>
        <input
          type="text"
          v-model="tenantName"
          disabled
          class="w-full disabled:cursor-not-allowed bg-[#E4E7EC] border pl-4 disabled border-none outline-none p-2 py-4 text-sm rounded-md mt-1"
        />
      </div>

      <div class="mt-4">
        <label class="block text-sm font-semibold">Date *</label>
        <input
          type="date"
          disabled
          v-model="payload.date"
          :min="new Date().toISOString().split('T')[0]"
          placeholder="select start date"
          class="w-full px-4 py-3.5 border-[0.5px] text-sm bg-[#F0F2F5] rounded-lg outline-none"
        />
      </div>

      <div class="pt-10 flex justify-end gap-x-6">
        <button
          v-if="currentStep === 1"
          @click="goToNextStep"
          class="bg-[#292929] w-full text-white px-6 py-4 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>

    <div v-else-if="currentStep === 2">
      <div class="flex justify-between">
        <h3 class="font-medium text-[#1D2739]">Step 2: Signature</h3>
        <button @click="resetForm" class="text-[#1D2739] font-semibold">
          Reset
        </button>
      </div>

      <CoreVue3Signature
        @savedSignature="handleUploadedSignature"
        @signature="handleSignature"
      />

      <div class="mt-6 flex justify-between gap-x-6">
        <button
          v-if="currentStep === 2"
          @click="goToPreviousStep"
          class="bg-[#EBE5E0] text-[#292929] w-full text-sm px-6 py-3 rounded-lg"
        >
          Back
        </button>
        <button
          v-if="currentStep === 2"
          :disabled="signing"
          @click="submitSignature"
          class="bg-[#292929] w-full text-sm text-white px-6 py-3 disabled:cursor-not-allowed disabled:opacity-25 rounded-lg"
        >
          {{ signing ? 'Processing...' : 'Submit' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSignLease } from "@/composables/modules/lease/sign";
import { useUploadFile } from "@/composables/core/upload";
import { useUser } from "@/composables/auth/user";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useFetchRental } from '@/composables/modules/rentals/fetchRentalsById'

const { showToast } = useCustomToast();
const { rentalObj, loading: fetching } = useFetchRental()
const { uploadFile, loading, uploadResponse } = useUploadFile();
const { user } = useUser();
const tenantName = ref(`${user.value.firstName} ${user.value.lastName}`);
const { signLeaseAgreement, loading: signing } = useSignLease();

const payload = ref({
  fullName: tenantName.value,
  date: "",
  signature: "",
});

const props = defineProps({
  property: {
    type: Object,
  },
});

const signatureObj = ref({}) as any;
const currentStep = ref(1);
const route = useRoute()

const emit = defineEmits(["close", "agreementData"]);

const handleUploadedSignature = (data: any) => {
  console.log(data, "uploaded sign data");
  signatureObj.value = data;
};

const submitSignature = async () => {
  try {
    const payloadObj = {
      signeeName: tenantName.value || "", 
      signatureUrl: signatureObj?.value?.url ?? "", 
    };

    if (!payloadObj.signatureUrl) {
      showToast({
        title: "Error",
        message: "Signature URL is missing",
        toastType: "error",
        duration: 3000,
      });
      return;
    }

    const rentalLeaseAgreementId = props.property?.rentalApplication?.rentalLeaseAgreement?.id || rentalObj?.value?.rentalLeaseAgreement?.id;
    if (!rentalLeaseAgreementId) {
      showToast({
        title: "Error",
        message: "Rental Lease Agreement ID is missing",
        toastType: "error",
        duration: 3000,
      });
      return;
    }

    await signLeaseAgreement(rentalLeaseAgreementId, payloadObj);
    emit("close");
  } catch (error) {
    showToast({
      title: "Error",
      message: "Error submitting signature",
      toastType: "error",
      duration: 3000,
    });
  }
};

const handleSignature = (data: any) => {
  console.log(data, "data jee oo");
  payload.value.signature = data;
};

onMounted(() => {
  payload.value.date = rentalObj.value.rentalLeaseAgreement.startDate
})

const goToNextStep = () => {
  currentStep.value = 2;
};

const goToPreviousStep = () => {
  currentStep.value = 1;
};

const resetForm = () => {
  payload.value.date = "";
  payload.value.signature = "";
  signatureObj.value = {};
  currentStep.value = 1;
};
</script>

<style scoped>
canvas {
  border: 1px solid #ddd;
}
</style> -->


<template>
  <div class="bg-white rounded-lg w-full relative mt-6 overflow-x-hidden">
    <button
      @click="emit('close')"
      class="absolute -top-10 -right-6 bg-white rounded-full p-2 text-[#1D2739] hover:text-red-600"
      aria-label="Close"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    <div class="mb-4">
      <div class="flex justify-between">
        <div class="flex w-full">
          <div
            :class="['flex-1 h-2', currentStep >= 1 ? 'bg-[#292929]' : 'bg-[#E4E7EC]']"
            class="rounded-l-lg"
          ></div>
          <div
            :class="['flex-1 h-2', currentStep >= 2 ? 'bg-[#292929]' : 'bg-[#E4E7EC]']"
            class="rounded-r-lg"
          ></div>
        </div>
      </div>
    </div>

    <div v-if="currentStep === 1">
      <div class="flex justify-between">
        <h3 class="font-medium text-[#1D2739]">Step 1: Tenant's Details</h3>
      </div>

      <div class="mt-4">
        <label class="block text-sm font-semibold">Full name *</label>
        <input
          type="text"
          v-model="tenantName"
          disabled
          class="w-full disabled:cursor-not-allowed bg-[#E4E7EC] border pl-4 disabled border-none outline-none p-2 py-4 rounded-md mt-1"
        />
      </div>

      <div class="mt-4">
        <!-- {{ computedDate }} -->
        <label class="block text-sm font-semibold">Date *</label>
        <input
          type="date"
          disabled
          :value="computedDate"
          class="w-full px-4 py-3.5 border-[0.5px] disabled:cursor-not-allowed disabled:opacity-70  bg-[#F0F2F5] rounded-lg outline-none"
        />
      </div>

      <div class="pt-10 flex justify-end gap-x-6">
        <button
          v-if="currentStep === 1"
          @click="goToNextStep"
          class="bg-[#292929] w-full text-white px-6 py-4 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>

    <div v-else-if="currentStep === 2">
      <div class="flex justify-between">
        <h3 class="font-medium text-[#1D2739]">Step 2: Signature</h3>
        <button @click="resetForm" class="text-[#1D2739] font-semibold">
          Reset
        </button>
      </div>

      <CoreVue3Signature
        @savedSignature="handleUploadedSignature"
        @signature="handleSignature"
      />

      <div class="mt-6 flex justify-between gap-x-6">
        <button
          @click="goToPreviousStep"
          class="bg-[#EBE5E0] text-[#292929] w-full text-sm px-6 py-3 rounded-lg"
        >
          Back
        </button>
        <button
          :disabled="signing"
          @click="submitSignature"
          class="bg-[#292929] w-full text-sm text-white px-6 py-3 disabled:cursor-not-allowed disabled:opacity-25 rounded-lg"
        >
          {{ signing ? 'Processing...' : 'Submit' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useSignLease } from "@/composables/modules/lease/sign";
import { useUploadFile } from "@/composables/core/upload";
import { useUser } from "@/composables/auth/user";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useFetchRental } from '@/composables/modules/rentals/fetchRentalsById';

const { showToast } = useCustomToast();
const { rentalObj } = useFetchRental();
const { user } = useUser();
const tenantName = ref(`${user.value.firstName} ${user.value.lastName}`);
const { signLeaseAgreement, loading: signing } = useSignLease();

// const computedDate = computed(() => {
//   return rentalObj.value?.rentalLeaseAgreement?.startDate || "";
// });
const computedDate = computed(() => {
  const date = rentalObj.value?.rentalLeaseAgreement?.startDate;
  return date ? new Date(date).toISOString().split("T")[0] : "";
});

const signatureObj = ref({});
const currentStep = ref(1);
const emit = defineEmits(["close", "agreementData"]);

const handleUploadedSignature = (data: any) => {
  signatureObj.value = data;
};

const submitSignature = async () => {
  try {
    const payloadObj = {
      signeeName: tenantName.value || "", 
      signatureUrl: signatureObj?.value?.url ?? "", 
    };

    if (!payloadObj.signatureUrl) {
      showToast({
        title: "Error",
        message: "Signature URL is missing",
        toastType: "error",
        duration: 3000,
      });
      return;
    }

    const rentalLeaseAgreementId = rentalObj.value?.rentalLeaseAgreement?.id;
    if (!rentalLeaseAgreementId) {
      showToast({
        title: "Error",
        message: "Rental Lease Agreement ID is missing",
        toastType: "error",
        duration: 3000,
      });
      return;
    }

    await signLeaseAgreement(rentalLeaseAgreementId, payloadObj);
    emit("close");
  } catch (error) {
    showToast({
      title: "Error",
      message: "Error submitting signature",
      toastType: "error",
      duration: 3000,
    });
  }
};

const handleSignature = (data: any) => {
  signatureObj.value.signature = data;
};

const goToNextStep = () => {
  currentStep.value = 2;
};

const goToPreviousStep = () => {
  currentStep.value = 1;
};

const resetForm = () => {
  signatureObj.value = {};
  currentStep.value = 1;
};
</script>

<style scoped>
canvas {
  border: 1px solid #ddd;
}
</style>
