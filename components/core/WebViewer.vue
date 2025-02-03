<template>
  <div id="pdf-viewer-container">
    <div class="ml-3 space-x-4">
      <button 
        :disabled="!isDocumentEdited || !isSigned" 
        @click="submitLeaseDocument('save-and-send')" 
        class="bg-black p-3 text-white rounded-lg text-sm"
        :class="{ 'opacity-50 cursor-not-allowed': !isDocumentEdited || !isSigned }"
      >
        Accept Agreement
      </button>

      <button 
        @click="cancelModal = true" 
        class="bg-red-500 p-3 text-white rounded-lg text-sm"
      >
        Reject Agreement
      </button>
    </div>
    <div id="viewer" style="height: 100vh; width: 100%;"></div>
  </div>

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

  <CoreFullScreenLoader :visible="uploading" text="Uploading Agreement.." />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useUser } from '@/composables/auth/user';
import { useRejectLease } from '@/composables/modules/lease/reject'
import { useSignLease } from '@/composables/modules/lease/sign';
import { useUploadFile } from '@/composables/core/upload';
import { useFetchRental } from '@/composables/modules/rentals/fetchRentalsById'
const { rentalObj, loading: fetching } = useFetchRental()
const { rejectLeaseAgreement, loading: rejecting, payload } = useRejectLease()

const { user } = useUser();
const route = useRoute();

// Composables
const { uploadFile, uploadResponse, loading: uploading } = useUploadFile();
const { signLeaseAgreement, loading } = useSignLease();

const isDocumentEdited = ref(false);
const isSigned = ref(false); // Track if the user has signed the document

// Props
const props = defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
  rentalObj: {
    type: Object,
    default: () => ({}),
  },
});

const cleanedPdfUrl = computed(() => {
  if (props.pdfUrl.startsWith('<html>') && props.pdfUrl.endsWith('</html>')) {
    return props.pdfUrl.replace('<html>', '').replace('</html>', '');
  }
  return props.pdfUrl;
});

console.log('Cleaned PDF URL:', cleanedPdfUrl.value);

const instance = ref<any>(null);
const uploadError = ref<string | null>(null);

onMounted(() => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = '/webviewer/webviewer.min.js';
    script.onload = () => initializeWebViewer();
    document.head.appendChild(script);
  }
});

function initializeWebViewer() {
  const viewerElement = document.getElementById('viewer');

  if (viewerElement) {
    WebViewer(
      {
        path: '/webviewer',
        initialDoc: cleanedPdfUrl.value,
      },
      viewerElement
    )
      .then((webViewerInstance: any) => {
        console.log('WebViewer instance loaded successfully:', webViewerInstance);
        instance.value = webViewerInstance;

        const annotManager = webViewerInstance.Core.annotationManager;
        annotManager.addEventListener("annotationChanged", () => {
          isDocumentEdited.value = true;

          // Check if a signature annotation exists
          const annotations = annotManager.getAnnotationsList();
          isSigned.value = annotations.some(annot => annot.Subject === 'Signature');
        });
      })
      .catch((err: any) => {
        console.error('Error initializing WebViewer:', err);
      });
  } else {
    console.error('Viewer element not found');
  }
}

const submitLeaseDocument = async (item: string) => {
  if (!instance.value) return;

  try {
    const docViewer = instance.value.Core.documentViewer;
    const annotManager = instance.value.Core.annotationManager;

    const xfdfString = await annotManager.exportAnnotations();

    const fileData = await docViewer.getDocument().getFileData({
      xfdfString,
      downloadType: 'pdf',
    });

    const pdfBlob = new Blob([fileData], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'edited-lease.pdf', {
      type: 'application/pdf',
      lastModified: Date.now(),
    });

    await uploadFile(pdfFile);
    
    const payloadObj = {
      signeeName: `${user.value.firstName} ${user.value.lastName}`,
      leaseAgreement: uploadResponse.value.url,
    };

    await signLeaseAgreement(props?.rentalObj?.rentalLeaseAgreement?.id, payloadObj);
    console.log('File uploaded successfully.');
  } catch (error) {
    console.error('Error processing document:', error);
    uploadError.value = error instanceof Error ? error.message : 'An unexpected error occurred';
  }
};

const cancelModal = ref(false);
const cancellationReasonModal = ref(false);


const onCancel = () => {
  cancelModal.value = false;
  cancellationReasonModal.value = true;
};

const onContinue = async () => {
  await rejectLeaseAgreement(rentalObj?.value?.rentalLeaseAgreement?.id)
  cancellationReasonModal.value = false;
  // router.push(
  //   `/dashboard/listings/${route.params.id}/rental-applications/lease-signed-success?type=cancelled`
  // );
};

</script>

<style scoped>
#pdf-viewer-container {
  height: 100vh;
  width: 100%;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
