declare global {
  interface Window {
    initMap: () => void;
  }
}

export default defineNuxtPlugin(() => {
  const loadGoogleMapsApi = () => {
    return new Promise<void>((resolve) => {
      // Set up callback
      window.initMap = () => {
        resolve();
      };

      // Create script with callback
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg&callback=initMap&loading=async`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    });
  };

  return {
    provide: {
      loadGoogleMapsApi
    }
  };
});
