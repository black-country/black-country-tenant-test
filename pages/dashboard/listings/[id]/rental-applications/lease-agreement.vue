<template>
  <main>
    <TopNavBar />
    <!-- {{ propertyObj?.rentalApplication }} -->
      <!-- {{ rentalObj?.rentalLeaseAgreement?.leaseAgreementContent }} -->
    <CoreWebViewer :rentalObj="rentalObj" :pdfUrl="rentalObj?.rentalLeaseAgreement?.leaseAgreementContent"  v-if="isUrl" />

   <section v-else>
    <div
      v-if="!loading"
      id="leaseAgreementDocument"
      class="min-h-screen max-w-4xl mx-auto mb-44"
    >
  <div class="pl-10 mt-6 lg:mt-0 lg:pl-0">
    <svg
            @click="router.back()"
            class="cursor-pointer "
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
  </div>
      <div class="py-3 px-10 lg:px-0">
      <section class="flex justify-between">
        <div>
          <nav class="text-sm text-gray-500 flex items-center space-x-2">
            <span class="hover:text-gray-700 cursor-pointer">Dashboard</span>
            <span>|</span>
            <span class="hover:text-gray-700 cursor-pointer">{{ propertyObj?.name ?? 'Nil' }}</span>
            <span>|</span>
            <span class="font-semibold text-black">Lease agreement</span>
          </nav>
          <h1 class="mt-4 text-lg font-medium text-[#1D2739]">Sign Lease agreement</h1>
        </div>
          <div class="flex space-x-4">
            <button class="">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
                <path d="M25.5 13.4165C25.5 14.7972 24.3807 15.9165 23 15.9165C21.6192 15.9165 20.5 14.7972 20.5 13.4165C20.5 12.0358 21.6192 10.9165 23 10.9165C24.3807 10.9165 25.5 12.0358 25.5 13.4165Z" stroke="#1D2739" stroke-width="1.5"/>
                <path d="M15.5 18C15.5 19.3807 14.3807 20.5 13 20.5C11.6193 20.5 10.5 19.3807 10.5 18C10.5 16.6192 11.6193 15.5 13 15.5C14.3807 15.5 15.5 16.6192 15.5 18Z" stroke="#1D2739" stroke-width="1.5"/>
                <path d="M25.5 22.5835C25.5 23.9642 24.3807 25.0835 23 25.0835C21.6192 25.0835 20.5 23.9642 20.5 22.5835C20.5 21.2027 21.6192 20.0835 23 20.0835C24.3807 20.0835 25.5 21.2027 25.5 22.5835Z" stroke="#1D2739" stroke-width="1.5"/>
                <path d="M15.2734 16.958L20.6901 14.4585M15.2734 19.0418L20.6901 21.5414" stroke="#1D2739" stroke-width="1.5"/>
                </svg>
                
            </button>
            <button class="">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
                <path d="M24.2182 11.3285C21.9834 9.95769 20.033 10.5101 18.8613 11.39C18.3808 11.7508 18.1407 11.9312 17.9993 11.9312C17.858 11.9312 17.6178 11.7508 17.1373 11.39C15.9657 10.5101 14.0153 9.95769 11.7805 11.3285C8.84774 13.1275 8.18412 19.0624 14.949 24.0695C16.2374 25.0232 16.8817 25.5 17.9993 25.5C19.117 25.5 19.7613 25.0232 21.0498 24.0695C27.8146 19.0624 27.1509 13.1275 24.2182 11.3285Z" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                
            </button>
          </div>
      </section>
      </div>
      <div class="bg-white rounded-lg border-[0.5px] border-gray-100 p-8">
        <div class="mt-6 space-y-6">
          <!-- <div v-if="!containsHttps(lease?.leaseAgreementContent)" v-html="propertyObj?.rentalApplication?.leaseAgreement"></div> -->
        <div v-if="!containsHttps(propertyObj?.rentalApplication?.rentalLeaseAgreement?.leaseAgreementContent)" v-html="propertyObj?.rentalApplication?.rentalLeaseAgreement?.leaseAgreementContent" class=""></div>
        <div v-else>
           <iframe
            :src="`https://docs.google.com/viewer?url=${encodeURIComponent(propertyObj?.rentalApplication?.leaseAgreement)}&embedded=true`"
            class="w-full h-96"
            frameborder="0"
            @load="handleIframeLoad"
            @error="handleIframeError"
          ></iframe>
        </div>
          <div class="">
            <h2 class="text-lg font-medium mb-2">Signature</h2>
            <p class="text-gray-500 mb-6">
              The parties hereto have executed this Lease Agreement as of the
              date first above written.
            </p>

            <div class="mb-4">
              <h3 class="text-sm font-medium mb-2">
                Landlord/Property Manager:
              </h3>
              <label v-if="containsHttps(lease?.leaseAgreementContent)" class="block text-sm text-gray-500 mb-1">Signature</label>
              <div v-if="containsHttps(lease?.leaseAgreementContent)" class="border-b-2 border-dotted h-20 flex mb-4">
                <img
                  :src="propertyObj?.rentalApplication?.rentalLeaseAgreement?.houseOwnerSignatureUrl"
                  alt="Signature"
                  class="h-full object-contain"
                />
              </div>
              <label class="block text-sm text-gray-500 mb-1">Full Name</label>
              <div class="border-b-2 border-dotted text-gray-800 py-2 mb-4">
                {{ propertyObj?.rentalApplication?.rentalLeaseAgreement?.houseOwnerSigneeName}}
              </div>
              <label v-if="propertyObj?.rentalApplication?.rentalLeaseAgreement?.signedAt !== null" class="block text-sm text-gray-500 mb-1">Date</label>
              <div v-if="propertyObj?.rentalApplication?.rentalLeaseAgreement?.signedAt !== null" class="border-b-2 border-dotted text-gray-800 py-2 mb-8">
                {{ propertyObj?.rentalApplication?.rentalLeaseAgreement?.signedAt ?? 'Nil'}}
              </div>
            </div>

            <div class="mb-4">
              <h3 class="text-base font-medium mb-2">Tenant:</h3>
              <label class="block text-sm text-gray-500 mb-1">Full Name</label>
              <input
                type="text"
                disabled
                :value="propertyObj?.rentalApplication?.rentalLeaseAgreement?.signeeName"
                placeholder="Full name"
                class="w-full border-b-2 border-dotted py-2 mb-4 bg-transparent outline-none placeholder-gray-400"
              />
              <label class="block text-sm text-gray-500 mb-1">Signature</label>
              <img
                :src="propertyObj?.rentalApplication?.rentalLeaseAgreement?.signatureUrl"
                alt="Signature"
                class=" h-32 w-96  py-2 mb-4 bg-transparent outline-none placeholder-gray-400"
              />
              <p class=" border-b-2 border-dotted"></p>
              <label class="block text-sm text-gray-500 mb-1 pt-4">Date</label>
              <input
                type="text"
                diabled
                :value="propertyObj?.rentalApplication?.rentalLeaseAgreement?.createdAt"
                placeholder="Date"
                class="w-full border-b-2 border-dotted py-2 mb-4 bg-transparent outline-none placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="signedSignature" class="mt-6">
        <h4 class="font-bold">Signature:</h4>
        <img :src="signedSignature" alt="Signature" class="mt-2 h-16 border" />
      </div>

      <SignatureModal
        v-if="isModalOpen"
        @close="closeModal"
        @sign="appendSignature"
      />
    </div>
    <section  class="p-8 max-w-7xl mx-auto" v-else>
      <div class="rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="h-32 bg-slate-200 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-32 w-full bg-slate-200 rounded col-span-2"></div>
                <div class="h-32 w-full bg-slate-200 rounded col-span-1"></div>
              </div>
              <div class="h-32 w-full bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer
      v-if="propertyObj?.rentalApplication?.rentalLeaseAgreement?.status !== 'SIGNED' && !loading"
      class="fixed bottom-0 inset-x-0 bg-white p-4 flex justify-between space-x-4 lg:w-1/2 mx-auto"
    >
      <button
        @click="cancelModal = true"
        class="text-xs gap-y-2 flex text-[#171717] justify-center items-center flex-col"
      >
        <svg
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="40" height="40" rx="8" fill="#9E0A05" />
          <path
            d="M25.1654 15.334L15.832 24.6673M15.832 15.334L25.1654 24.6673"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        Reject Agreement
      </button>
      <button
        @click="openModal"
        class="text-xs gap-y-2 flex text-[#171717] justify-center items-center flex-col"
      >
        <svg
          width="41"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" width="40" height="40" rx="8" fill="#099137" />
          <path
            d="M23.3081 15.3216L24.2426 14.3871C24.7587 13.871 25.5955 13.871 26.1116 14.3871C26.6277 14.9032 26.6277 15.74 26.1116 16.2561L25.1771 17.1906M23.3081 15.3216L19.8188 18.8109C19.122 19.5077 18.7735 19.8561 18.5363 20.2807C18.299 20.7053 18.0603 21.7079 17.832 22.6667C18.7908 22.4384 19.7934 22.1997 20.218 21.9624C20.6426 21.7251 20.991 21.3767 21.6878 20.6799L25.1771 17.1906M23.3081 15.3216L25.1771 17.1906"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M26.5 20C26.5 22.8284 26.5 24.2427 25.6213 25.1213C24.7427 26 23.3284 26 20.5 26C17.6716 26 16.2574 26 15.3787 25.1213C14.5 24.2427 14.5 22.8284 14.5 20C14.5 17.1716 14.5 15.7574 15.3787 14.8787C16.2574 14 17.6716 14 20.5 14"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>

        Accept & Sign
      </button>
    </footer>
   </section>

    <CoreModal :isOpen="isModalOpen" @close="isModalOpen = false">
      <SignatureComponent
        :property="propertyObj"
        @agreementData="handleAgreement"
        @close="closeModal"
        class="w-1/2 mx-auto"
      />
    </CoreModal>

    <CoreModalWithoutCloseBtn
      :isOpen="cancelModal"
      @close="cancelModal = false"
    >
      <div
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        @click.self="cancelModal = false"
      >
        <div
          class="bg-white rounded-xl p-6 max-w-sm w-full text-center shadow-lg"
        >
          <div
            class="flex justify-center items-center bg-yellow-500 rounded-full w-16 h-16 mx-auto mb-4"
          >
            <svg
              width="65"
              height="64"
              viewBox="0 0 65 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.921875"
                width="63.1513"
                height="64"
                rx="31.5756"
                fill="#F3A218"
              />
              <path
                d="M42.2031 32.375C42.2031 26.8521 37.7259 22.375 32.2031 22.375C26.6803 22.375 22.2031 26.8521 22.2031 32.375C22.2031 37.8978 26.6803 42.375 32.2031 42.375C37.7259 42.375 42.2031 37.8978 42.2031 32.375Z"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M32.4453 37.375V32.375C32.4453 31.9036 32.4453 31.6679 32.2988 31.5214C32.1524 31.375 31.9167 31.375 31.4453 31.375"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M32.1953 28.377H32.2043"
                stroke="white"
                stroke-width="3.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-gray-700 mb-2">
            Reject Lease Agreement
          </h2>
          <!-- {{ rentalObj }} -->
            <!-- {{ propertyObj }} -->
          <p class="text-gray-500 mb-6">
            You are confirming your decision to reject the agreement between
            {{ rentalObj?.rentalLeaseAgreement?.houseOwnerSigneeName}} and yourself.
          </p>
          <div class="space-y-3">
            <button
              type="button"
              class="w-full disabled:cursor-not-allowed text-sm disabled:opacity-25 bg-[#292929] text-white py-3.5 rounded-md font-semibold"
              @click="cancelModal = false"
            >
              No, Cancel
            </button>
            <button
              type="button"
              class="w-full bg-[#EBE5E0] text-gray-700 text-sm py-3.5 rounded-md font-semibold"
              @click="onCancel"
            >
              Yes, Continue
            </button>
          </div>
        </div>
      </div>
    </CoreModalWithoutCloseBtn>

    <CoreModalWithoutCloseBtn
      :isOpen="cancellationReasonModal"
      @close="cancellationReasonModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-2xl  mx-auto text-center">
        <!-- Header -->
        <h2 class="text-xl font-medium text-[#1D2739] mb-4 text-start">
          Reject Lease agreement
        </h2>

        <!-- Input Section -->
        <p class="text-sm text-[#1D2739] mb-2 text-start">
          What's your reason for rejecting the agreement
        </p>
        <textarea
          v-model="payload.rejectionReason"
          placeholder="Enter your reason"
          class="w-full h-28 p-3 border bg-white border-gray-100 resize-none outline-none rounded-md text-sm text-gray-700"
        ></textarea>

        <!-- Buttons -->
        <div class="flex justify-between mt-10">
          <button
            @click="cancellationReasonModal = false"
            class="w-full mr-2 py-3 border border-gray-100 font-medium rounded-md text-[#292929] text-sm"
          >
            Cancel
          </button>
          <button
            :disabled="rejecting"
            @click="onContinue"
            class="w-full ml-2 disabled:cursor-not-allowed disabled:opacity-25 py-3 bg-[#292929] text-white rounded-md text-sm hover:bg-gray-800"
          >
             {{  rejecting ? 'processing...' : 'Continue' }}
          </button>
        </div>
      </div>
    </CoreModalWithoutCloseBtn>
  </main>
</template>

<script setup lang="ts">
import { useUrlExtractor } from '@/composables/core/useUrlExtractor';
import { useHttpsDetector } from '@/composables/core/useUrlCheck'
import { useRejectLease } from '@/composables/modules/lease/reject'
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useSignLeaseAgreement } from "@/composables/modules/rentals/signLeaseAgreement";
import { useFetchRental } from '@/composables/modules/rentals/fetchRentalsById'
const { rentalObj, loading: fetching } = useFetchRental()
const { propertyObj, loading } = useFetchProperty();
const { rejectLeaseAgreement, loading: rejecting, payload } = useRejectLease()
const { showToast } = useCustomToast();
const { containsHttps } = useHttpsDetector();
const { extractUrl } = useUrlExtractor();
const route = useRoute();
const router = useRouter();
const isUrl = computed(() => {
  return !!extractUrl(rentalObj?.value?.rentalLeaseAgreement?.leaseAgreementContent)
})
const {
  signLeaseAgreement,
  loading: signing,
  setPayload,
} = useSignLeaseAgreement();

const isModalOpen = ref(false);
const signedSignature = ref<string | null>(null);

const openModal = () => {
  isModalOpen.value = true;
};

const cancelModal = ref(false);
const cancellationReasonModal = ref(false);

const onCancel = () => {
  cancelModal.value = false;
  cancellationReasonModal.value = true;
};

const emittedAgreementData = ref({}) as any;

const proceedToSign = () => {};

const closeModal = () => {
  isModalOpen.value = false;
};

const onContinue = async () => {
  await rejectLeaseAgreement(rentalObj?.value?.rentalLeaseAgreement?.id)
  cancellationReasonModal.value = false;
  // router.push(
  //   `/dashboard/listings/${route.params.id}/rental-applications/lease-signed-success?type=cancelled`
  // );
};

const appendSignature = (signature: string) => {
  signedSignature.value = signature;
  closeModal();
};

const rejectAgreement = () => {
  console.log("Agreement Rejected");
};

const handleAgreement = (data: any) => {
  showToast({
    title: "Success",
    message: "Signature was saved successfully.",
    toastType: "success",
    duration: 3000,
  });
  emittedAgreementData.value = data;
};

// Method to extract the HTML of the lease agreement document
const getLeaseAgreementHTML = (): string => {
  const leaseAgreementElement = document.getElementById(
    "leaseAgreementDocument"
  );
  return leaseAgreementElement ? leaseAgreementElement.innerHTML : "";
};

// Method to handle the submission of the lease agreement
const submitLeaseAgreement = async () => {
  const leaseAgreementHTML = getLeaseAgreementHTML();
  const payload = {
    leaseAgreement: `<html>${leaseAgreementHTML}</html>`,
    leaseAgreementSigneeName:
      emittedAgreementData.value.fullName || "Signee Name", // Replace with the actual signee's name
    leaseAgreementSignedAt:
      new Date().toISOString().split("T")[0] || emittedAgreementData.value.date, // Current date in YYYY-MM-DD format
    status: "signed",
  };

  // Call the signLeaseAgreement function from your composable
  setPayload(payload);
  await signLeaseAgreement(rentalObj?.value?.rentalLeaseAgreement?.id);
};

</script>

<style scoped>
.document-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #fff;
  max-width: 800px;
}

.signature-section {
  margin-top: 20px;
}

.signature-canvas {
  border: 1px solid #000;
  width: 100%;
  height: 150px;
  display: block;
}
</style>
