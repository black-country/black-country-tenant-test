<template>
    <div class="w-full h-screen">
      <iframe 
        :src="pdfViewerUrl" 
        class="w-full h-full border-none"
      ></iframe>
    </div>
  </template>
  
  <script setup>
  const HARDCODED_PDF_URL = 'https://blackcountrystorage.blob.core.windows.net/blackcountry-dev/documents/1737735877992-edited-lease.pdf'
  
  const pdfViewerUrl = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(HARDCODED_PDF_URL)}`
  </script>