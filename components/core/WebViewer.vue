<!-- <template>
  <div>
    <div class="bg-gray-100">
      <div class="flex flex-wrap justify-between items-center bg-white border shadow px-3 lg:px-10">
        <div class="flex items-center space-x-4 py-3">
          <button @click="router.back()"
            class="flex items-center text-gray-600 bg-gray-100 text-xs py-3 font-semibold px-4 rounded-md hover:bg-gray-200 hover:text-black">
            <span>&larr;</span>
            <span class="ml-2">Back</span>
          </button>
          <h1 class="text text-base pt-3 font-semibold">{{ documentName }}</h1>
        </div>
        <div class="flex justify-between items-center text-xs gap-x-3">
          <button
            class="flex items-center px-4 text-sm py-3 text-xs bg-red-600 text-white text-sm font-medium gap-x-3 rounded-md shadow-md cursor-pointer"
            v-if="isDocumentEdited" 
            @click="saveDocument('save-and-send')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
           Reject
          </button>
          <button
            class="flex items-center px-4 text-sm py-3 text-xs bg-[#5B8469] text-white text-sm font-medium gap-x-3 rounded-md shadow-md cursor-pointer"
            v-if="isDocumentEdited" 
            @click="saveDocument('save-and-send')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
           Sign and Save
          </button>
        </div>
      </div>
    </div>
    <div id="webViewer" ref="viewerDiv"></div>
    <p v-if="submissionMessage">{{ submissionMessage }}</p>
    <CoreFullScreenLoader :visible="loading" text="Loading PDF document" logo="/path-to-your-logo.png" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRejectLease } from '@/composables/modules/lease/reject'
import { useSignLeaseAgreement } from "@/composables/modules/rentals/signLeaseAgreement";
import WebViewer from "@pdftron/webviewer";
const { rejectLeaseAgreement, loading: rejecting } = useRejectLease()

const {
  signLeaseAgreement,
  loading: signing,
  setPayload,
} = useSignLeaseAgreement();


// Constants
const PDFS_URL = 'https://devstoripodbucket.blob.core.windows.net/dev-storipod-assets/images/1734706135403-edited-lease.pdf'; // Replace with your hardcoded PDF URL
 const PDF_URL = `https://docs.google.com/viewer?url=${encodeURIComponent(PDFS_URL)}&embedded=true`
// const documentName = ref('Sample Document');

const props = defineProps({
  documentName: {
    type: String,
    default: 'Sample Document'
  }
})


// Refs
const viewerDiv = ref<HTMLElement | null>(null);
const instance = ref<any>(null);
const isDocumentEdited = ref(false);
const submissionMessage = ref('');
const loading = ref(false);

// Save document function
const saveDocument = async (action: 'save-and-send' | 'save-and-exit') => {
  if (!instance.value) return;

  try {
    const docViewer = instance.value.getDocument();
    const annotManager = instance.value.getAnnotationManager();
    const xfdfString = await annotManager.exportAnnotations();

    // Get the edited PDF file with annotations
    const fileData = await docViewer.getFileData({
      xfdfString,
      downloadType: 'pdf'
    });

    // Here you would typically handle saving the edited PDF
    // For now, we'll just show a success message
    submissionMessage.value = 'Changes saved successfully!';
    
    console.log('Document saved:', {
      action,
      annotations: xfdfString,
      fileSize: fileData.byteLength
    });

  } catch (error) {
    console.error('Error saving document:', error);
    submissionMessage.value = 'Error saving changes';
  }
};

// Initialize WebViewer
onMounted(async () => {
  if (!viewerDiv.value) return;

  try {
    loading.value = true;
    
    const webViewerInstance = await WebViewer(
      { 
        path: '/webviewer',
        initialDoc: PDF_URL,
      }, 
      viewerDiv.value
    );

    instance.value = webViewerInstance.Core.documentViewer;

    // Listen for annotation changes
    const annotManager = webViewerInstance.Core.annotationManager;
    annotManager.addEventListener('annotationChanged', () => {
      isDocumentEdited.value = true;
    });

    // Additional viewer configurations
    const viewerElement = webViewerInstance.UI.iframeWindow;
    if (viewerElement) {
      viewerElement.addEventListener('documentLoaded', () => {
        console.log('Document loaded successfully');
      });
    }

  } catch (error) {
    console.error('Error initializing WebViewer:', error);
    submissionMessage.value = 'Error loading document';
  } finally {
    loading.value = false;
  }
});

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
  await signLeaseAgreement(propertyObj.value.id);
};


const onContinue = async () => {
  await rejectLeaseAgreement(propertyObj.value.id)
  cancellationReasonModal.value = false;
  // router.push(
  //   `/dashboard/listings/${route.params.id}/rental-applications/lease-signed-success?type=cancelled`
  // );
};

</script>

<style scoped>
#webViewer {
  height: 100vh;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

p {
  margin-top: 10px;
  font-size: 14px;
  color: green;
}
</style> -->

<script setup lang="ts">
import { ref, onMounted } from "vue";
import WebViewer from "@pdftron/webviewer";

// Constants
const PDF_URL = 'https://devstoripodbucket.blob.core.windows.net/dev-storipod-assets/images/1734706135403-edited-lease.pdf'; // Hardcoded PDF URL

// Refs
const viewerDiv = ref<HTMLElement | null>(null);
const instance = ref<any>(null);
const isDocumentEdited = ref(false);
const submissionMessage = ref('');
const loading = ref(false);

// Initialize WebViewer
onMounted(async () => {
  if (!viewerDiv.value) return;

  try {
    loading.value = true;

    const webViewerInstance = await WebViewer(
      {
        path: '/webviewer', // Adjust to your WebViewer's static asset path
        initialDoc: PDF_URL, // Use the hardcoded PDF URL
        licenseKey: 'your-pdftron-license-key', // Add your PDFTron license key if required
      },
      viewerDiv.value
    );

    instance.value = webViewerInstance.Core.documentViewer;

    // Listen for annotation changes
    const annotManager = webViewerInstance.Core.annotationManager;
    annotManager.addEventListener('annotationChanged', () => {
      isDocumentEdited.value = true;
    });

    // Additional viewer configurations
    webViewerInstance.UI.loadDocument(PDF_URL, { filename: 'Sample Document.pdf' });
    webViewerInstance.UI.iframeWindow?.addEventListener('documentLoaded', () => {
      console.log('Document loaded successfully');
    });
  } catch (error) {
    console.error('Error initializing WebViewer:', error);
    submissionMessage.value = 'Error loading document';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div>
    <div class="bg-gray-100">
      <div class="flex flex-wrap justify-between items-center bg-white border shadow px-3 lg:px-10">
        <div class="flex items-center space-x-4 py-3">
          <button @click="router.back()"
            class="flex items-center text-gray-600 bg-gray-100 text-xs py-3 font-semibold px-4 rounded-md hover:bg-gray-200 hover:text-black">
            <span>&larr;</span>
            <span class="ml-2">Back</span>
          </button>
          <h1 class="text text-base pt-3 font-semibold">Sample Document</h1>
        </div>
      </div>
    </div>
    <div id="webViewer" ref="viewerDiv"></div>
    <p v-if="submissionMessage">{{ submissionMessage }}</p>
    <CoreFullScreenLoader :visible="loading" text="Loading PDF document" logo="/path-to-your-logo.png" />
  </div>
</template>

<style scoped>
#webViewer {
  height: 100vh;
  width: 100%;
}
</style>
