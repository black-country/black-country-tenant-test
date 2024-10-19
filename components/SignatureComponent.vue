<template>
  <div class="bg-white rounded-lg shadow-lg p-6 w-full lg:w-5/12">
    <div class="flex justify-between">
      <h3 class="text-xl font-medium text-[#1D2739]">Tenant's Details</h3>
      <button @click="$emit('close')" class="text-[#1D2739] font-semibold">
        Reset
      </button>
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
        v-model="payload.date"
        class="w-full bg-[#E4E7EC] border pl-4 border-none outline-none p-2 py-4 text-sm rounded-md mt-1"
      />
    </div>

    <CoreVue3Signature
      @savedSignature="handleUploadedSignature"
      @signature="handleSignature"
    />

    <div class="mt-6 flex justify-between gap-x-6">
      <button
        @click="emit('close')"
        class="bg-[#EBE5E0] text-[#292929] w-full text-sm px-6 py-4 rounded-lg"
      >
        Reset
      </button>
      <button
         :disabled="signing"
        @click="submitSignature"
        class="bg-[#292929] w-full text-sm text-white px-6 py-4 disabled:cursor-not-allowed disabled:opacity-25 rounded-lg"
      >
        {{ signing ? 'processing..' : 'Submit'}}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSignLease } from "@/composables/modules/lease/sign";
import { useUploadFile } from "@/composables/core/upload";
import { useUser } from "@/composables/auth/user";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
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
    type: Object
  }
})

const signatureObj = ref({}) as any

const emit = defineEmits(["close", "agreementData"]);

const handleUploadedSignature = (data: any) => {
  console.log(data.secure_url, 'uploaded sign data')
  signatureObj.value = data
};

// const submitSignature = async () => {
//   const payloadObj = {
//     signeeName: tenantName.value, // optional
//     signatureUrl: signatureObj?.value?.secureUrl
//   }

//   await signLeaseAgreement(props.property.rentalApplication.rentalLeaseAgreement.id, payloadObj);
//   // console.log(payload.value, 'ooo')
//   // emit('agreementData', payload.value)
//   emit('close')
// };

const submitSignature = async () => {
  try {
    // Create the payload object with optional signee name and signature URL
    const payloadObj = {
      signeeName: tenantName.value || '', // Ensure a fallback if tenantName is null
      signatureUrl: signatureObj?.value?.secure_url || '' // Provide a fallback if secureUrl is null
    };

    // Check if the signature URL is valid before proceeding
    if (!payloadObj.signatureUrl) {
      showToast({
					title: "Error",
					message: "Signature URL is missing",
					toastType: "error",
					duration: 3000
				});
    }

    // Ensure the rentalLeaseAgreement ID exists before making the API call
    const rentalLeaseAgreementId = props.property?.rentalApplication?.rentalLeaseAgreement?.id;
    if (!rentalLeaseAgreementId) {
      showToast({
					title: "Error",
					message:'Rental Lease Agreement ID is missing',
					toastType: "error",
					duration: 3000
				});
    }

    // Perform the API call to sign the lease agreement
    await signLeaseAgreement(rentalLeaseAgreementId, payloadObj);

    // Emit the 'close' event after a successful submission
    emit('close');
  } catch (error) {
    showToast({
					title: "Error",
					message: 'Error submitting signature',
					toastType: "error",
					duration: 3000
				})
  }
};


const handleSignature = (data: any) => {
  console.log(data, "data jee oo");
  payload.value.signature = data;
};
</script>

<style scoped>
canvas {
  border: 1px solid #ddd;
}
</style>
