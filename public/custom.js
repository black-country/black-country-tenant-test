document.addEventListener('DOMContentLoaded', () => {
    const viewerElement = document.getElementById('viewer');
  
    WebViewer(
      {
        path: '/webviewer', // Path to the WebViewer files
        initialDoc: '/path-to-your-pdf.pdf', // Replace with the path to your PDF file
      },
      viewerElement
    ).then((instance) => {
      // Use the instance for further customization
      console.log('WebViewer instance loaded', instance);
    });
  });