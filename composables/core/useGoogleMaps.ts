// composables/useGoogleMaps.ts
import { ref } from 'vue'

interface LoaderOptions {
  apiKey: string;
  version: string;
  libraries: string[];
  language?: string;
  region?: string;
}

const isLoaded = ref(false)
const loadError = ref<Error | null>(null)

export const useGoogleMaps = () => {
  const config = useRuntimeConfig()

  const loadGoogleMapsApi = async () => {
    if (isLoaded.value) {
      return Promise.resolve()
    }

    if (loadError.value) {
      loadError.value = null
    }

    const options: LoaderOptions = {
      apiKey: 'AIzaSyCTBVK36LVNlXs_qBOC4RywX_Ihf765lDg',
      version: "weekly",
      libraries: ["places", "marker"],
    }

    return new Promise<void>((resolve, reject) => {
      try {
        const script = document.createElement('script')
        const callbackName = `googleMapsCallback${Date.now()}`
        
        window[callbackName] = () => {
          isLoaded.value = true
          delete window[callbackName]
          resolve()
        }

        const parameters = new URLSearchParams({
          key: options.apiKey,
          v: options.version,
          libraries: options.libraries.join(','),
          callback: callbackName,
          loading: 'async'
        })

        script.src = `https://maps.googleapis.com/maps/api/js?${parameters.toString()}`
        script.async = true
        script.onerror = () => {
          delete window[callbackName]
          const err = new Error('Failed to load Google Maps API')
          loadError.value = err
          reject(err)
        }

        document.head.appendChild(script)
      } catch (error) {
        const err = error instanceof Error ? error : new Error('Unknown error loading Google Maps API')
        loadError.value = err
        reject(err)
      }
    })
  }

  const createAdvancedMarker = (map: google.maps.Map, property: any) => {
    const position = {
      lat: property.coordinates.latitude,
      lng: property.coordinates.longitude,
    }

    const markerView = new google.maps.marker.AdvancedMarkerElement({
      map,
      position,
      content: buildMarkerContent(property),
      title: property.name,
    })

    return markerView
  }

  const buildMarkerContent = (property: any) => {
    const container = document.createElement('div')
    container.className = 'custom-marker'
    container.innerHTML = `
      <div class="relative group cursor-pointer">
        <div class="w-10 h-10 rounded-lg overflow-hidden border-2 border-white shadow-lg transform transition-transform group-hover:scale-105">
          <img src="${property.images[0] || "/placeholder-property.jpg"}" 
               alt="${property.name}"
               class="w-10 h-10 object-cover"
          />
        </div>
        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <svg viewBox="0 0 24 24" class="w-4 h-4 fill-emerald-700">
            <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 12 24 12 24S20 11.8 20 7.602C20 3.403 16.199 0 12 0Z"/>
          </svg>
        </div>
      </div>
    `
    return container
  }

  return {
    isLoaded,
    loadError,
    loadGoogleMapsApi,
    createAdvancedMarker
  }
}

// Types for Google Maps API
declare global {
  interface Window {
    google: typeof google;
    [key: string]: any;
  }
}