<template>
  <main>
    <TopNavBar />
    <div v-if="!loading" id="leaseAgreementDocument" class="min-h-screen max-w-4xl mx-auto mb-44">
      <div class="py-3 px-10 lg:px-0">
        <section class="flex justify-between">
          <div>
            <svg @click="router.back()" class="cursor-pointer mb-4" width="36" height="36" viewBox="0 0 36 36"
              fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="18" fill="#EAEAEA" />
              <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739"
                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <nav class="text-sm text-gray-500 flex items-center space-x-2">
              <span class="hover:text-gray-700 cursor-pointer">Dashboard</span>
              <span>|</span>
              <span class="hover:text-gray-700 cursor-pointer">Jason Gardens</span>
              <span>|</span>
              <span class="font-semibold text-black">Lease agreement</span>
            </nav>
            <h1 class="mt-4 text-lg font-medium text-[#1D2739]">Preview Lease agreement</h1>
          </div>

          <div class="flex space-x-4">
            <button class="">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#EAEAEA" />
                <path
                  d="M25.5 13.4165C25.5 14.7972 24.3807 15.9165 23 15.9165C21.6192 15.9165 20.5 14.7972 20.5 13.4165C20.5 12.0358 21.6192 10.9165 23 10.9165C24.3807 10.9165 25.5 12.0358 25.5 13.4165Z"
                  stroke="#1D2739" stroke-width="1.5" />
                <path
                  d="M15.5 18C15.5 19.3807 14.3807 20.5 13 20.5C11.6193 20.5 10.5 19.3807 10.5 18C10.5 16.6192 11.6193 15.5 13 15.5C14.3807 15.5 15.5 16.6192 15.5 18Z"
                  stroke="#1D2739" stroke-width="1.5" />
                <path
                  d="M25.5 22.5835C25.5 23.9642 24.3807 25.0835 23 25.0835C21.6192 25.0835 20.5 23.9642 20.5 22.5835C20.5 21.2027 21.6192 20.0835 23 20.0835C24.3807 20.0835 25.5 21.2027 25.5 22.5835Z"
                  stroke="#1D2739" stroke-width="1.5" />
                <path d="M15.2734 16.958L20.6901 14.4585M15.2734 19.0418L20.6901 21.5414" stroke="#1D2739"
                  stroke-width="1.5" />
              </svg>

            </button>
            <button class="">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#EAEAEA" />
                <path
                  d="M24.2182 11.3285C21.9834 9.95769 20.033 10.5101 18.8613 11.39C18.3808 11.7508 18.1407 11.9312 17.9993 11.9312C17.858 11.9312 17.6178 11.7508 17.1373 11.39C15.9657 10.5101 14.0153 9.95769 11.7805 11.3285C8.84774 13.1275 8.18412 19.0624 14.949 24.0695C16.2374 25.0232 16.8817 25.5 17.9993 25.5C19.117 25.5 19.7613 25.0232 21.0498 24.0695C27.8146 19.0624 27.1509 13.1275 24.2182 11.3285Z"
                  stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" />
              </svg>

            </button>
          </div>
        </section>
      </div>
      <div class="bg-white rounded-lg border-[0.5px] border-gray-100 p-8">

        <div class="mt-6 space-y-6">
          <div v-html="propertyObj?.rentalApplication?.leaseAgreement"></div>

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
              <label class="block text-sm text-gray-500 mb-1">Signature</label>
              <div class="border-b-2 border-dotted h-12 flex items-center mb-4">
                <img :src="propertyObj?.rentalApplication?.rentalLeaseAgreement?.houseOwnerSignatureUrl" alt="Signature"
                  class="h-full object-contain" />
              </div>
              <label class="block text-sm text-gray-500 mb-1">Full Name</label>
              <div class="border-b-2 border-dotted text-gray-800 py-2 mb-4">
                {{ propertyObj?.rentalApplication?.rentalLeaseAgreement?.houseOwnerSigneeName }}
              </div>
              <label class="block text-sm text-gray-500 mb-1">Date</label>
              <div class="border-b-2 border-dotted text-gray-800 py-2 mb-8">
                {{ propertyObj?.rentalApplication?.rentalLeaseAgreement?.signedAt }}
              </div>
            </div>

            <div class="mb-4">
              <h3 class="text-base font-medium mb-2">Tenant:</h3>
              <label class="block text-sm text-gray-500 mb-1">Full Name</label>
              <input type="text" disabled :value="propertyObj?.rentalApplication?.rentalLeaseAgreement?.signeeName"
                placeholder="Full name"
                class="w-full border-b-2 border-dotted py-2 mb-4 bg-transparent outline-none placeholder-gray-400" />
              <label class="block text-sm text-gray-500 mb-1">Signature</label>
              <div class="w-full border-b-2 border-dotted py-2 mb-4 bg-transparent outline-none">
                <img v-if="propertyObj?.rentalApplication?.rentalLeaseAgreement?.signatureUrl" :src="propertyObj?.rentalApplication?.rentalLeaseAgreement?.signatureUrl" alt="Signature"
                class="h-[60px] w-auto  object-fill  placeholder-gray-400" />
              </div>
              <label class="block text-sm text-gray-500 mb-1">Date</label>
              <input type="text" diabled :value="propertyObj?.rentalApplication?.rentalLeaseAgreement?.createdAt"
                placeholder="Date"
                class="w-full border-b-2 border-dotted py-2 mb-4 bg-transparent outline-none placeholder-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <!-- Display Signed Signature -->
      <div v-if="signedSignature" class="mt-6">
        <h4 class="font-bold">Signature:</h4>
        <img :src="signedSignature" alt="Signature" class="mt-2 h-5 w-5 border" />
      </div>

      <!-- Signature Modal -->
      <SignatureModal v-if="isModalOpen" @close="closeModal" @sign="appendSignature" />
    </div>
    <section class="p-8 max-w-7xl mx-auto" v-else>
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
  </main>
</template>

<script setup lang="ts">
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
const { propertyObj, loading } = useFetchProperty();
const route = useRoute();
const router = useRouter();
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