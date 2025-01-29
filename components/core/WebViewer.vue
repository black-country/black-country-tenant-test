<!-- <template>
  <div>
    <div id="webViewer" ref="viewerDiv" style="height: 100vh;"></div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";

export default {
  name: "PDFViewer",
  setup() {
    const viewerDiv = ref(null);
    const instance = ref(null);

    onMounted(async () => {
      await nextTick(); // Ensure DOM is fully rendered

      if (viewerDiv.value) {
        const path = "/webviewer/ui "; // Path to WebViewer assets

        if (typeof window !== 'undefined' && window.WebViewer) {
          try {
            const webviewerInstance = await window.WebViewer({
              path: path,
            }, viewerDiv.value);

            instance.value = webviewerInstance;

            // Hardcoded PDF URL
            const pdfUrl = "https://blackcountrystorage.blob.core.windows.net/blackcountry-dev/documents/1737747548792-edited-lease.pdf";
            webviewerInstance.Core.documentViewer.loadDocument(pdfUrl, { extension: "pdf" });
          } catch (err) {
            console.error("Error initializing WebViewer:", err);
          }
        } else {
          console.error("WebViewer script not loaded");
        }
      }
    });

    return { viewerDiv, instance };
  },
};
</script>

<style>
#webViewer {
  height: 100vh;
  width: 100%;
}
</style> -->

<!-- <template>
  <div>
    <div id="webViewer" ref="viewerDiv"></div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import WebViewer from "@pdftron/webviewer/lib/core"; // Use the core library directly

export default {
  name: "LeaseDocument",
  setup() {
    const viewerDiv = ref(null);
    const instance = ref(null);

    onMounted(() => {
      const path = "/webviewer";
      WebViewer({ path }, viewerDiv.value).then((webviewerInstance) => {
        instance.value = webviewerInstance.Core.documentViewer;
        const pdfUrl = "https://blackcountrystorage.blob.core.windows.net/blackcountry-dev/documents/1737747548792-edited-lease.pdf";
        webviewerInstance.Core.documentViewer.loadDocument(pdfUrl, { extension: "pdf" });
      }).catch(error => {
        console.error("Error initializing WebViewer:", error);
      });
    });

    return { viewerDiv };
  },
};
</script>

<style>
#webViewer {
  height: 100vh;
}
</style> -->

<!-- <script setup lang="ts">
import { onMounted, ref } from 'vue';
import WebViewer from '@pdftron/webviewer';

// Reference to the viewer container
const viewerContainer = ref<HTMLElement | null>(null);

// Function to handle WebViewer instance after it's initialized
const initializeWebViewer = async (element: HTMLElement) => {
  const onLoad = async (instance: any) => {
    const { documentViewer, annotationManager, Annotations } = instance.Core;

    documentViewer.addEventListener('documentLoaded', () => {
      const rectangleAnnot = new Annotations.RectangleAnnotation({
        PageNumber: 1,
        // Values are in page coordinates with (0, 0) in the top left
        X: 100,
        Y: 150,
        Width: 200,
        Height: 50,
        Author: annotationManager.getCurrentUser(),
      });

      annotationManager.addAnnotation(rectangleAnnot);
      // Draw the annotation to make it visible
      annotationManager.redrawAnnotation(rectangleAnnot);
    });
  };

  WebViewer(
    {
      path: '/public/webviewer', // Adjust the path if needed
      initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf',
    },
    element
  ).then((instance) => {
    onLoad(instance);
  });
};

// Initialize WebViewer when the component is mounted
onMounted(() => {
  if (viewerContainer.value) {
    initializeWebViewer(viewerContainer.value);
  }
});
</script>

<template>
  <div>
    <div ref="viewerContainer" id="viewer" style="height: 100vh; width: 100%;"></div>
  </div>
</template>

<style scoped>
/* Optional: Add styles for the viewer container if necessary */
#viewer {
  border: 1px solid #ccc;
}
</style> -->
<!-- 
<template>
  <div id="webviewer" ref="viewer"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'WebViewer',
  props: {
    path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const viewer = ref<HTMLElement | null>(null);

    onMounted(async () => {
      const WebViewer = (await import('@pdftron/webviewer')).default;

      WebViewer(
        {
          path: '/webviewer', // Path to the WebViewer library
          initialDoc: props.url, // Initial PDF document URL
        },
        viewer.value // Attach WebViewer to the DOM element
      ).then((instance) => {
        // Call APIs here
        const { documentViewer, annotationManager, Annotations } = instance.Core;

        documentViewer.addEventListener('documentLoaded', () => {
          const rectangleAnnot = new Annotations.RectangleAnnotation({
            PageNumber: 1,
            X: 100,
            Y: 150,
            Width: 200,
            Height: 50,
            Author: annotationManager.getCurrentUser(),
          });

          annotationManager.addAnnotation(rectangleAnnot);
          annotationManager.redrawAnnotation(rectangleAnnot);
        });
      });
    });

    return {
      viewer,
    };
  },
});
</script>

<style scoped>
#webviewer {
  width: 100%;
  height: 100vh;
  border: 1px solid #ccc;
}
</style> -->


<!-- <template>

  <div id="webviewer" ref="viewer"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import WebViewer from '@pdftron/webviewer';

export default defineComponent({
  name: 'WebViewer',
  props: {
    path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const viewer = ref<HTMLElement | null>(null);

    onMounted(async () => {
      WebViewer(
        {
          path: props.path, // Path to the WebViewer library
          initialDoc: props.url, // Initial PDF document URL
        },
        viewer.value // Attach WebViewer to the DOM element
      ).then((instance) => {
        // Call APIs here
        const { documentViewer, annotationManager, Annotations } = instance.Core;

        documentViewer.addEventListener('documentLoaded', () => {
          const rectangleAnnot = new Annotations.RectangleAnnotation({
            PageNumber: 1,
            X: 100,
            Y: 150,
            Width: 200,
            Height: 50,
            Author: annotationManager.getCurrentUser(),
          });

          annotationManager.addAnnotation(rectangleAnnot);
          annotationManager.redrawAnnotation(rectangleAnnot);
        });
      }).catch((error) => {
        console.error('Error initializing WebViewer:', error);
      });
    });

    return {
      viewer,
    };
  },
});
</script>

<style scoped>
#webviewer {
  width: 100%;
  height: 100vh;
  border: 1px solid #ccc;
}
</style> -->



<!-- <template>
  <div id="webviewer" ref="viewer"></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import WebViewer from '@pdftron/webviewer/lib/core';

export default defineComponent({
  name: 'WebViewer',
  props: {
    path: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const viewer = ref<HTMLElement | null>(null);

    onMounted(() => {
      WebViewer(
        {
          path: props.path, // Path to the WebViewer library
          initialDoc: props.url, // Initial PDF document URL
        },
        viewer.value // Attach WebViewer to the DOM element
      ).then((instance) => {
        // Call APIs here
        const { documentViewer, annotationManager, Annotations } = instance.Core;

        documentViewer.addEventListener('documentLoaded', () => {
          const rectangleAnnot = new Annotations.RectangleAnnotation({
            PageNumber: 1,
            X: 100,
            Y: 150,
            Width: 200,
            Height: 50,
            Author: annotationManager.getCurrentUser(),
          });

          annotationManager.addAnnotation(rectangleAnnot);
          annotationManager.redrawAnnotation(rectangleAnnot);
        });
      }).catch((error) => {
        console.error('Error initializing WebViewer:', error);
      });
    });

    return {
      viewer,
    };
  },
});
</script>

<style scoped>
#webviewer {
  width: 100%;
  height: 100vh;
  border: 1px solid #ccc;
}
</style> -->

<template>
  <h1>Hello</h1>
</template>