<!-- <template>
  <div id="pdf-viewer-container">
    <div id="viewer" style="height: 100vh; width: 100%;"></div>
  </div>
</template>

<script>
export default {
  name: "PdfViewer",
  mounted() {
    // Ensure this only runs in the browser (not during server-side rendering)
    if (process.client) {
      // Dynamically load the WebViewer script
      const script = document.createElement("script");
      script.src = "/webviewer/webviewer.min.js";
      script.onload = this.initializeWebViewer; // Initialize WebViewer after loading the script
      document.head.appendChild(script);
    }
  },
  methods: {
    initializeWebViewer() {
      const viewerElement = document.getElementById("viewer");

      // Initialize WebViewer
      WebViewer(
        {
          path: "/webviewer", // Path to the WebViewer library
          initialDoc: "https://blackcountrystorage.blob.core.windows.net/blackcountry-dev/documents/1737747548792-edited-lease.pdf", // Static PDF file in the public directory
        },
        viewerElement
      ).then((instance) => {
        console.log("WebViewer instance loaded", instance);

        // Optional: Access the WebViewer instance for further customization
        const { documentViewer } = instance.Core;
        console.log(documentViewer);
      });
    },
  },
};
</script>

<style scoped>
/* Add any styles if necessary */
#pdf-viewer-container {
  height: 100vh;
  width: 100%;
}
</style> -->

<!-- <template>
  <div id="pdf-viewer-container">
    <div id="viewer" style="height: 100vh; width: 100%;"></div>
    <button @click="submitLeaseDocument('save-and-send')" class="submit-btn">Submit Lease Document</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useSignLeaseAgreement } from '@/composables/core/pdfLeaseSign'
import { useUploadFile } from "@/composables/core/upload"
// import { pdfUploadFile } from '@/composables/core/pdfUploader'; // Adjust the import path as necessary
const { uploadFile, loading, uploadResponse  } = useUploadFile()
const { signLeaseAgreement, loading: processing, payload, setPayload } = useSignLeaseAgreement()
// Props
defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
});

// Cleaned PDF URL
const cleanedPdfUrl = computed(() => {
  const htmlMatch = pdfUrl.match(/<html>(.*?)<\/html>/);
  return htmlMatch ? htmlMatch[1] : pdfUrl;
});

// Refs for instance and error handling
const instance = ref<any>(null);
const uploadError = ref<string | null>(null);

// Example payload values
const user = ref({ firstName: 'John', lastName: 'Doe' });
const leasePayload = ref({ documentName: 'Lease Agreement' });
const payloadObj = ref({ startDate: '2025-01-01', endDate: '2025-12-31' });

onMounted(() => {
  // Ensure this only runs in the browser (not during server-side rendering)
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
        path: '/webviewer', // Path to the WebViewer library
        initialDoc: 'https://blackcountrystorage.blob.core.windows.net/blackcountry-dev/documents/1737735877992-edited-lease.pdf', // Use the cleaned PDF URL
      },
      viewerElement
    ).then((webViewerInstance: any) => {
      console.log('WebViewer instance loaded', webViewerInstance);
      instance.value = webViewerInstance;
    });
  }
}

const submitLeaseDocument = async (item: string) => {
  if (!instance.value) return;

  try {
    const docViewer = instance.value.Core.documentViewer;
    const annotManager = instance.value.Core.annotationManager;

    const xfdfString = await annotManager.exportAnnotations();

    // Get the edited PDF file as Uint8Array with annotations
    const fileData = await docViewer.getDocument().getFileData({
      xfdfString,
      downloadType: 'pdf',
    });

    // Convert Uint8Array to File object
    const pdfBlob = new Blob([fileData], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'edited-lease.pdf', {
      type: 'application/pdf',
      lastModified: Date.now(),
    });

    const agreementObj = {
      startDate: payloadObj.value.startDate,
      endDate: payloadObj.value.endDate,
      houseOwnerSigneeName: `${user.value.firstName} ${user.value.lastName}` || '',
      agreementName: leasePayload.value.documentName,
      isPublished: item === 'save-and-send',
    };

    // Upload the file using our composable
    await uploadFile(pdfFile).then(() => {
      // signLeaseAgreement()
      // setPayload()
    })
    // const { url, error } = await pdfUploadFile(pdfFile, agreementObj);

    // if (error) {
    //   console.error('Upload failed:', error);
    // } else if (url) {
    //   console.log('File uploaded successfully:', url);
    // }
  } catch (error) {
    console.error('Error processing document:', error);
    uploadError.value = error instanceof Error ? error.message : 'An unexpected error occurred';
  }
};
</script>

<style scoped>
#pdf-viewer-container {
  height: 100vh;
  width: 100%;
}

.submit-btn {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
 -->

 <template>
  <div id="pdf-viewer-container">
    <!-- Viewer container -->
   <div class="ml-3">
    <button @click="submitLeaseDocument('save-and-send')" class="submit-btn bg-black text-white rounded-lg text-sm ">Submit Lease Document</button>
   </div>
    <div id="viewer" style="height: 100vh; width: 100%;"></div>
  </div>
  <CoreFullScreenLoader :visible="uploading" text="Upoading Agreement.." />
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useUser } from '@/composables/auth/user';
import { useSignLeaseAgreement } from '@/composables/core/pdfLeaseSign';
import { useUploadFile } from '@/composables/core/upload';
const { user } = useUser()
const route = useRoute()

// Composables
const { uploadFile, uploadResponse, loading: uploading } = useUploadFile();
const { signLeaseAgreement, loading, payload, setPayload } = useSignLeaseAgreement();

// Props
const props = defineProps({
  pdfUrl: {
    type: String,
    required: true,
  },
});

// Extract the PDF URL by removing the <html> wrapper
const cleanedPdfUrl = computed(() => {
  // Check if the URL has the <html> wrapper and extract the URL
  if (props.pdfUrl.startsWith('<html>') && props.pdfUrl.endsWith('</html>')) {
    return props.pdfUrl.replace('<html>', '').replace('</html>', '');
  }
  return props.pdfUrl; // Return as-is if no wrapper
});

// Debug: Log the cleaned URL
console.log('Cleaned PDF URL:', cleanedPdfUrl.value);

// Refs for WebViewer instance and error handling
const instance = ref<any>(null);
const uploadError = ref<string | null>(null);

onMounted(() => {
  // Ensure this only runs in the browser (not during server-side rendering)
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
        path: '/webviewer', // Path to the WebViewer library
        initialDoc: cleanedPdfUrl.value, // Use the cleaned PDF URL
      },
      viewerElement
    )
      .then((webViewerInstance: any) => {
        console.log('WebViewer instance loaded successfully:', webViewerInstance);
        instance.value = webViewerInstance;
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

    // Get the edited PDF file as Uint8Array with annotations
    const fileData = await docViewer.getDocument().getFileData({
      xfdfString,
      downloadType: 'pdf',
    });

    // Convert Uint8Array to File object
    const pdfBlob = new Blob([fileData], { type: 'application/pdf' });
    const pdfFile = new File([pdfBlob], 'edited-lease.pdf', {
      type: 'application/pdf',
      lastModified: Date.now(),
    });

    // Upload the file
    // await uploadFile(pdfFile);
    // const payload = {
    //   leaseAgreement: uploadResponse.value.url, // optional
    //   leaseAgreementSigneeName: user.value.name, // optional
    //   leaseAgreementSignedAt: "", // optional,
    //   status: "signed", // signed | cancelled
    // }
    // setPayload( payload)
    // await signLeaseAgreement(route?.query?.rentalId)
    await uploadFile(pdfFile);
   const currentDate = new Date().toISOString().split('T')[0]; // Format: "YYYY-MM-DD"
    const payload = {
      leaseAgreement: uploadResponse.value.url, // optional
      leaseAgreementSigneeName: user.value.name, // optional
      leaseAgreementSignedAt: currentDate, // Current date in "YYYY-MM-DD" format
      status: "signed", // signed | cancelled
    };
    setPayload(payload);
    await signLeaseAgreement(route?.query?.rentalId);
    console.log('File uploaded successfully.');
  } catch (error) {
    console.error('Error processing document:', error);
    uploadError.value = error instanceof Error ? error.message : 'An unexpected error occurred';
  }
};
</script>

<style scoped>
#pdf-viewer-container {
  height: 100vh;
  width: 100%;
}

.submit-btn {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
