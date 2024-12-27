// declare global {
//   interface Window {
//     initMap: () => void;
//   }
// }

// export default defineNuxtPlugin(() => {
//   const loadGoogleMapsApi = () => {
//     return new Promise<void>((resolve) => {
//       // Set up callback
//       window.initMap = () => {
//         resolve();
//       };

//       // Create script with callback
//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg&callback=initMap&loading=async`;
//       script.async = true;
//       script.defer = true;
//       document.head.appendChild(script);
//     });
//   };

//   return {
//     provide: {
//       loadGoogleMapsApi
//     }
//   };
// });

// plugins/google-maps.ts
import { defineNuxtPlugin } from '#app'

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig()
  
  const loadGoogleMapsApi = async () => {
    // Only load if not already loaded
    if (window.google?.maps) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCBguFgxPOH6AuAiz0ZXXoo_fJAp4AR8WE&libraries=places`;
        script.async = true;
        script.defer = true;
        
        script.addEventListener('load', () => {
          resolve(window.google);
        });

        script.addEventListener('error', () => {
          reject(new Error('Failed to load Google Maps API'));
        });

        document.head.appendChild(script);
      } catch (error) {
        reject(error);
      }
    });
  };

  nuxtApp.provide('loadGoogleMapsApi', loadGoogleMapsApi);
});