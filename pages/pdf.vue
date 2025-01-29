<template>
    <div id="pdf-viewer-container">
      <!-- Viewer container -->
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
  </style>
  