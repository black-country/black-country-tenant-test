<template>
  <div class="relative w-screen h-screen">
    <div
      class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl px-4"
    >
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search properties by name..."
          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <span
          v-if="searchQuery"
          @click="handleClearSearch"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
        >
          ✕
        </span>
      </div>
    </div>

    <!-- <div
      v-if="currentPosition"
      class="absolute top-16 left-4 z-10 bg-white p-2 rounded-lg shadow-md text-sm"
    >
      Current Location: Lat: {{ currentPosition.lat.toFixed(6) }}, Lng:
      {{ currentPosition.lng.toFixed(6) }}
    </div> -->

    <div v-if="loadingSearch" class="absolute top-16 right-4 z-10 bg-white p-2 rounded-lg shadow-md">
      <span class="text-sm">Searching properties... {{ loadingSearch }}</span>
    </div>

    <div ref="mapContainer" class="w-full h-full"></div>
  </div>

      <!-- <CoreFullScreenLoader
      :visible="loadingSearch"
      text="Please wait while we search for properties..."
      logo=""
  /> -->
</template>

<style scoped>
.custom-marker {
  position: absolute;
  cursor: pointer;
  z-index: 1;
}

.custom-marker img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<script setup lang="ts">
import moment from "moment";
import { ref, computed, watch, onMounted } from "vue";
import { useGetProperties } from "@/composables/modules/property/fetchProperties";
import { useSaveSearch } from '@/composables/modules/property/useSaveSearch';

const { $loadGoogleMapsApi } = useNuxtApp();
const mapContainer = ref<HTMLElement | null>(null);
const currentPosition = ref<{ lat: number; lng: number } | null>(null);
const markers = ref<google.maps.Marker[]>([]);
const map = ref<google.maps.Map | null>(null);
const activeProperty = ref<Property | null>(null);
const activeInfoWindow = ref<google.maps.InfoWindow | null>(null);

const {
  propertiesList,
  searchResults,
  loadingProperties,
  loadingSearch,
  searchQuery,
  clearSearch,
  debouncedSearchProperties
} = useGetProperties();

const { saveSearch, loading: saveLoading, setPayload } = useSaveSearch();

// Computed property for filtered properties that uses search results when available
const filteredProperties = computed(() => {
  if (searchQuery.value && searchResults.value?.length > 0) {
    return searchResults.value;
  }
  return propertiesList.value;
});

const saving = ref(false);

// Handle clear search
const handleClearSearch = () => {
  clearSearch();
  if (map.value && propertiesList.value?.length) {
    createPropertyMarkers(propertiesList.value, map.value);
  }
};

interface Property {
  id: string;
  name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  images: string[];
  houseType: {
    name: string;
  };
  bedroomCount?: number;
  bathroomCount?: number;
  size?: number;
  sizeUnit?: string;
  available?: string;
  availableRoomsCount?: number;
  futureAvailableRoomsCount?: number;
  leastAvailableDate?: string;
}

// Function to get current position
const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  });
};

// Function to handle save search
const handleSaveSearch = async (e: MouseEvent) => {
  e.stopPropagation();
  
  if (!activeProperty.value) return;
  
  const payloadObj = {
    propertyId: activeProperty.value.id,
    searchQuery: searchQuery.value,
    propertyName: activeProperty.value.name,
    imageUrl: activeProperty.value.images[0],
    filters: {
      location: {
        lat: activeProperty.value.coordinates.latitude,
        lng: activeProperty.value.coordinates.longitude
      },
      propertyType: activeProperty.value.houseType.name
    }
  };
  
  try {
    saving.value = true;
    setPayload(payloadObj);
    await saveSearch();
    
    // Update the info window content after successful save
    if (activeInfoWindow.value && activeProperty.value) {
      activeInfoWindow.value.setContent(createInfoWindowContent(activeProperty.value));
    }
  } catch (error) {
    console.error('Error saving search:', error);
  } finally {
    saving.value = false;
  }
};

// Function to create info window content
const createInfoWindowContent = (property: Property) => {
  return `
    <div class="max-w-sm">
      <div class="w-full pb-3">
        <button 
          id="saveSearchBtn" 
          type="button" 
          class="bg-gray-800 w-full outline-none border-none text-white py-3 rounded-lg text-sm hover:bg-gray-700 transition-colors"
        >
           ${ saving.value ? 'saving..' : 'Save search'}
        </button>
      </div>
      <img class="h-32 object-cover w-full" src="${property?.images[0] || '/placeholder-property.jpg'}" />
      <h3 class="font-bold text-sm mb-2">${property.name}</h3>
      <p class="mb-2 flex items-center gap-x-2">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.94366 12.4644C7.69072 12.7012 7.35257 12.8337 7.00064 12.8337C6.64872 12.8337 6.31062 12.7012 6.05762 12.4644C3.74093 10.2822 0.636277 7.84435 2.15032 4.30513C2.96895 2.3915 4.93403 1.16699 7.00064 1.16699C9.06727 1.16699 11.0323 2.3915 11.851 4.30513C13.3631 7.83992 10.2661 10.2897 7.94366 12.4644Z" fill="#5B8469" stroke="#5B8469"/>
          <path d="M9.04159 6.41667C9.04159 7.54425 8.1275 8.45833 6.99992 8.45833C5.87234 8.45833 4.95825 7.54425 4.95825 6.41667C4.95825 5.28908 5.87234 4.375 6.99992 4.375C8.1275 4.375 9.04159 5.28908 9.04159 6.41667Z" fill="#EAEAEA" stroke="#5B8469"/>
        </svg>
        ${property.address}
      </p>
      <p class="text-[#1D2739] font-medium text-sm">
        ${property?.bedroomCount || 0} bedrooms |
        ${property?.bathroomCount || 0} baths | 
        ${property?.size || 0} ${property?.sizeUnit || 'sq ft'}
      </p>
      <p class="text-[#1D2739] text-xs">
        ${property?.availableRoomsCount || 0} rooms avail.
        <span class="font-medium text-[#326543]">Now</span>
        ${property.futureAvailableRoomsCount && property.futureAvailableRoomsCount > 0 
          ? `| ${property.futureAvailableRoomsCount} room avail. on
             ${moment(property.leastAvailableDate).format("MMMM Do YYYY")}`
          : ''}
      </p>
    </div>
  `;
};

// Function to create property markers
const createPropertyMarkers = (
  properties: Property[],
  map: google.maps.Map
) => {
  // Clear existing markers
  markers.value.forEach((marker) => {
    if ((marker as any).overlay) {
      (marker as any).overlay.setMap(null);
    }
    marker.setMap(null);
  });
  markers.value = [];

  properties.forEach((property) => {
    const position = {
      lat: property.coordinates.latitude,
      lng: property.coordinates.longitude,
    };

    // Create marker overlay
    const markerOverlay = new google.maps.OverlayView();

    markerOverlay.onAdd = function () {
      const div = document.createElement("div");
      div.className = "custom-marker";
      div.innerHTML = `
        <div class="relative group cursor-pointer">
          <div class="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-lg transform transition-transform group-hover:scale-105">
            <img src="${property.images[0] || "/placeholder-property.jpg"}" 
                 alt="${property.name}"
                 class="w-full h-full object-cover"
            />
          </div>
          <div class="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <svg viewBox="0 0 24 24" class="w-8 h-8 fill-emerald-700">
              <path d="M12 0C7.802 0 4 3.403 4 7.602C4 11.8 12 24 12 24S20 11.8 20 7.602C20 3.403 16.199 0 12 0Z"/>
            </svg>
          </div>
        </div>
      `;

      const panes = markerOverlay.getPanes();
      panes.overlayMouseTarget.appendChild(div);

      div.addEventListener("click", () => {
        // Close previous info window if exists
        if (activeInfoWindow.value) {
          activeInfoWindow.value.close();
        }

        // Set the active property when marker is clicked
        activeProperty.value = property;
        
        const infoWindow = new google.maps.InfoWindow({
          content: createInfoWindowContent(property)
        });

        // Store the active info window
        activeInfoWindow.value = infoWindow;

        infoWindow.setPosition(position);
        infoWindow.open(map);

        // Add event listener after the info window is opened
        google.maps.event.addListener(infoWindow, 'domready', () => {
          const saveButton = document.getElementById('saveSearchBtn');
          if (saveButton) {
            saveButton.addEventListener('click', handleSaveSearch);
          }
        });

        // Clear active property when info window is closed
        google.maps.event.addListener(infoWindow, 'closeclick', () => {
          activeProperty.value = null;
          activeInfoWindow.value = null;
        });
      });

      markerOverlay.draw = function () {
        const overlayProjection = markerOverlay.getProjection();
        const point = overlayProjection.fromLatLngToDivPixel(
          new google.maps.LatLng(position.lat, position.lng)
        );

        if (point) {
          div.style.left = point.x - 24 + "px";
          div.style.top = point.y - 60 + "px";
          div.style.position = "absolute";
        }
      };
    };

    markerOverlay.setMap(map);

    // Store the overlay reference
    const marker = new google.maps.Marker({
      position,
      map: null, // We don't actually show this marker
    });
    (marker as any).overlay = markerOverlay;
    markers.value.push(marker);
  });
};

// Initialize map
const initializeMap = async () => {
  try {
    await $loadGoogleMapsApi();

    // Get current position
    const position = await getCurrentPosition();
    const coordinates = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    currentPosition.value = coordinates;

    // Create map
    if (mapContainer.value) {
      map.value = new google.maps.Map(mapContainer.value, {
        center: coordinates,
        zoom: 16,
        mapTypeControl: true,
        streetViewControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      // Smooth zoom animation
      const smoothZoom = (map: google.maps.Map, targetZoom: number) => {
        const currentZoom = map.getZoom() || 0;
        if (currentZoom !== targetZoom) {
          google.maps.event.addListenerOnce(map, "zoom_changed", () => {
            setTimeout(() => {
              smoothZoom(map, targetZoom);
            }, 80);
          });
          const nextZoom =
            currentZoom < targetZoom ? currentZoom + 1 : currentZoom - 1;
          map.setZoom(nextZoom);
        }
      };

      // Start with low zoom and animate to higher zoom
      map.value.setZoom(12);
      setTimeout(() => {
        smoothZoom(map.value!, 16);
      }, 1000);

      // Create property markers if properties are available
      if (filteredProperties.value?.length) {
        createPropertyMarkers(filteredProperties.value, map.value);
      }
    }
  } catch (error) {
    console.error("Error initializing map:", error);
  }
};


// Watch for changes in search results
watch(
  [searchResults, loadingSearch],
  ([newResults, isLoading], [oldResults, wasLoading]) => {
    if (!isLoading && wasLoading && map.value && newResults?.length) {
      createPropertyMarkers(newResults, map.value);
    }
  }
);

// Watch for changes in filtered properties
watch(
  filteredProperties,
  (newProperties) => {
    if (map.value && newProperties?.length) {
      createPropertyMarkers(newProperties, map.value);
    }
  },
  { deep: true }
);

// Watch for changes in saving state
watch(saving, (newValue) => {
  if (activeInfoWindow.value && activeProperty.value) {
    activeInfoWindow.value.setContent(createInfoWindowContent(activeProperty.value));
  }
});

// Mount hook
onMounted(() => {
  initializeMap();
});
</script>