<template>
  <div class="relative w-screen h-screen">
    <div
      class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl px-4"
    >
      <div class="relative flex">
        <div class="w-9/12">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search properties by name..."
            class="w-full px-4 py-3 shadow-lg pl-10 text-sm rounded-lg border border-gray-100"
          />
          <svg
            class="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1667 11.667L15.1667 14.667"
              stroke="#667185"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.8333 7.33301C13.8333 4.0193 11.147 1.33301 7.83331 1.33301C4.51961 1.33301 1.83331 4.0193 1.83331 7.33301C1.83331 10.6467 4.51961 13.333 7.83331 13.333C11.147 13.333 13.8333 10.6467 13.8333 7.33301Z"
              stroke="#667185"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>

          <span
            v-if="searchQuery"
            @click="handleClearSearch"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
          >
            ✕
          </span>
        </div>
        <div class="">
          <button
            @click="openFilter = true"
            class="absolute shadow-lg right-6 text-[#1D2739] gapx-x-3 text-sm flex border-[0.5px] items-center bg-white top-1/2 px-6 rounded-lg py-3 text-white transform -translate-y-1/2 cursor-pointer"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3333 3.33301H3"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.66667 15.833H3"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 15.833H14.6666"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 9.58301H9.66663"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 3.33301H16.3334"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.66667 9.58301H3"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.5834 1.66699C12.9716 1.66699 13.1658 1.66699 13.319 1.73043C13.5231 1.815 13.6854 1.97723 13.77 2.18143C13.8334 2.33457 13.8334 2.52871 13.8334 2.91699V3.75033C13.8334 4.13861 13.8334 4.33275 13.77 4.48589C13.6854 4.69008 13.5231 4.85232 13.319 4.93689C13.1658 5.00033 12.9716 5.00033 12.5834 5.00033C12.1951 5.00033 12.001 5.00033 11.8478 4.93689C11.6436 4.85232 11.4814 4.69008 11.3968 4.48589C11.3334 4.33275 11.3334 4.13861 11.3334 3.75033V2.91699C11.3334 2.52871 11.3334 2.33457 11.3968 2.18143C11.4814 1.97723 11.6436 1.815 11.8478 1.73043C12.001 1.66699 12.1951 1.66699 12.5834 1.66699Z"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.9166 14.167C11.3049 14.167 11.499 14.167 11.6522 14.2304C11.8564 14.315 12.0186 14.4772 12.1032 14.6814C12.1666 14.8346 12.1666 15.0287 12.1666 15.417V16.2503C12.1666 16.6386 12.1666 16.8327 12.1032 16.9859C12.0186 17.1901 11.8564 17.3523 11.6522 17.4369C11.499 17.5003 11.3049 17.5003 10.9166 17.5003C10.5284 17.5003 10.3342 17.5003 10.181 17.4369C9.97688 17.3523 9.81463 17.1901 9.73004 16.9859C9.66663 16.8327 9.66663 16.6386 9.66663 16.2503V15.417C9.66663 15.0287 9.66663 14.8346 9.73004 14.6814C9.81463 14.4772 9.97688 14.315 10.181 14.2304C10.3342 14.167 10.5284 14.167 10.9166 14.167Z"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.41663 7.91699C8.80491 7.91699 8.99904 7.91699 9.15221 7.98043C9.35638 8.065 9.51863 8.22723 9.60321 8.43141C9.66663 8.58458 9.66663 8.77874 9.66663 9.16699V10.0003C9.66663 10.3886 9.66663 10.5827 9.60321 10.7359C9.51863 10.9401 9.35638 11.1023 9.15221 11.1869C8.99904 11.2503 8.80491 11.2503 8.41663 11.2503C8.02834 11.2503 7.8342 11.2503 7.68106 11.1869C7.47687 11.1023 7.31463 10.9401 7.23006 10.7359C7.16663 10.5827 7.16663 10.3886 7.16663 10.0003V9.16699C7.16663 8.77874 7.16663 8.58458 7.23006 8.43141C7.31463 8.22723 7.47687 8.065 7.68106 7.98043C7.8342 7.91699 8.02834 7.91699 8.41663 7.91699Z"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span class="text-gray-800 font-semibold">Filter</span>
          </button>
        </div>
      </div>
    </div>

    <!-- <div
      v-if="currentPosition"
      class="absolute top-16 left-4 z-10 bg-white p-2 rounded-lg shadow-md text-sm"
    >
      Current Location: Lat: {{ currentPosition.lat.toFixed(6) }}, Lng:
      {{ currentPosition.lng.toFixed(6) }}
    </div> -->

    <div
      v-if="loadingSearch"
      class="absolute top-16 right-4 z-10 bg-white p-2 rounded-lg shadow-md"
    >
      <span class="text-sm">Searching properties... {{ loadingSearch }}</span>
    </div>

    <div ref="mapContainer" class="w-full h-full"></div>
  </div>

  <CoreModal :isOpen="isSearchSuccessful" @close="successModal = false">
    <div class="p-6 rounded-lg w-5/12 relative" @click.stop>
      <div
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      >
        <div
          class="bg-white rounded-lg p-6 shadow-lg w-full space-y-4 max-w-md relative text-center"
        >
          <div class="flex justify-center items-center mb-4">
            <div class="">
              <svg
                width="65"
                height="64"
                viewBox="0 0 65 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.923828"
                  width="63.1513"
                  height="64"
                  rx="31.5756"
                  fill="#0F973D"
                />
                <path
                  d="M44.1631 32.3596C44.1631 25.7418 38.7982 20.377 32.1804 20.377C25.5626 20.377 20.1978 25.7418 20.1978 32.3596C20.1978 38.9774 25.5626 44.3423 32.1804 44.3423C38.7982 44.3423 44.1631 38.9774 44.1631 32.3596Z"
                  stroke="white"
                  stroke-width="1.7974"
                />
                <path
                  d="M27.584 32.9633L30.5297 35.9839L37.0103 28.7344"
                  stroke="white"
                  stroke-width="1.7974"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <h2 class="text-xl font-medium mb-2 text-[#1D2739]">Search saved</h2>
          <p class="text-[#667185] mb-6 leading-snug">
            Search saved successfully! You can always access your saved searches
            on the 'Saved' page to pick up where you left off.
          </p>
          <div class="pt-6">
            <button
              @click="router.push('/dashboard/listings/bookmarked')"
              class="bg-[#292929] text-[#EAEAEA] w-full py-3.5 rounded-md"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  </CoreModal>

  <CoreModal :isOpen="openFilter" @close="successModal = false">
    <section class="p-6 rounded-lg bg-white relative" @click.stop>
      <CoreFilterModal />
    </section>
  </CoreModal>
</template>

<style scoped>
.custom-marker {
  position: absolute;
  cursor: pointer;
  z-index: 1;
}

.custom-marker img {
  width: 50%;
  height: 50%;
  object-fit: cover;
}
</style>

<script setup lang="ts">
import moment from "moment";
import { ref, computed, watch, onMounted } from "vue";
import { useGetProperties } from "@/composables/modules/property/fetchProperties";
import { useSaveSearch } from "@/composables/modules/property/useSaveSearch";
const { $loadGoogleMapsApi } = useNuxtApp();
const mapContainer = ref<HTMLElement | null>(null);
const currentPosition = ref<{ lat: number; lng: number } | null>(null);
const markers = ref<google.maps.Marker[]>([]);
const map = ref<google.maps.Map | null>(null);
const activeProperty = ref<Property | null>(null);
const activeInfoWindow = ref<google.maps.InfoWindow | null>(null);
const router = useRouter();
const openFilter = ref(false);

const {
  propertiesList,
  searchResults,
  loadingProperties,
  loadingSearch,
  searchQuery,
  clearSearch,
  debouncedSearchProperties,
} = useGetProperties();

const {
  saveSearch,
  loading: saveLoading,
  setPayload,
  isSearchSuccessful,
} = useSaveSearch();

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
        lng: activeProperty.value.coordinates.longitude,
      },
      propertyType: activeProperty.value.houseType.name,
    },
  };

  try {
    saving.value = true;
    setPayload(payloadObj);
    await saveSearch();

    // Update the info window content after successful save
    if (activeInfoWindow.value && activeProperty.value) {
      activeInfoWindow.value.setContent(
        createInfoWindowContent(activeProperty.value)
      );
    }
  } catch (error) {
    console.error("Error saving search:", error);
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
           ${saving.value ? "saving.." : "Save search"}
        </button>
      </div>
      <img class="h-32 object-cover w-full" src="${
        property?.images[0] || "/placeholder-property.jpg"
      }" />
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
        ${property?.size || 0} ${property?.sizeUnit || "sq ft"}
      </p>
      <p class="text-[#1D2739] text-xs">
        ${property?.availableRoomsCount || 0} rooms avail.
        <span class="font-medium text-[#326543]">Now</span>
        ${
          property.futureAvailableRoomsCount &&
          property.futureAvailableRoomsCount > 0
            ? `| ${property.futureAvailableRoomsCount} room avail. on
             ${moment(property.leastAvailableDate).format("MMMM Do YYYY")}`
            : ""
        }
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
          content: createInfoWindowContent(property),
        });

        // Store the active info window
        activeInfoWindow.value = infoWindow;

        infoWindow.setPosition(position);
        infoWindow.open(map);

        // Add event listener after the info window is opened
        google.maps.event.addListener(infoWindow, "domready", () => {
          const saveButton = document.getElementById("saveSearchBtn");
          if (saveButton) {
            saveButton.addEventListener("click", handleSaveSearch);
          }
        });

        // Clear active property when info window is closed
        google.maps.event.addListener(infoWindow, "closeclick", () => {
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

// Define Lagos coordinates with camera settings
const LAGOS_COORDINATES = {
  lat: 6.5244,
  lng: 3.3792
};

const LAGOS_CAMERA_POSITION = {
  center: LAGOS_COORDINATES,
  zoom: 12,
  heading: 0,  // Camera heading in degrees (0 = north)
  tilt: 45     // Camera tilt in degrees (45 for angled view)
};

const initializeMap = async () => {
  try {
    await $loadGoogleMapsApi();

    // Set coordinates directly to Lagos
    const coordinates = LAGOS_COORDINATES;
    currentPosition.value = coordinates;

    // Create map with camera position
    if (mapContainer.value) {
      map.value = new google.maps.Map(mapContainer.value, {
        ...LAGOS_CAMERA_POSITION,
        mapTypeControl: true,
        streetViewControl: true,
        zoomControl: true,
        mapTypeId: google.maps.MapTypeId.TERRAIN,  // Shows terrain features
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      // Add a marker for Lagos center
      new google.maps.Marker({
        position: coordinates,
        map: map.value,
        title: "Lagos",
        animation: google.maps.Animation.DROP
      });

      // Set initial camera view
      const moveCamera = () => {
        if (map.value) {
          map.value.moveCamera({
            center: coordinates,
            zoom: 12,
            heading: 0,
            tilt: 45
          });
        }
      };

      // Smooth zoom animation with camera positioning
      const smoothZoom = (map: google.maps.Map, targetZoom: number) => {
        const currentZoom = map.getZoom() || 0;
        if (currentZoom !== targetZoom) {
          google.maps.event.addListenerOnce(map, "zoom_changed", () => {
            setTimeout(() => {
              smoothZoom(map, targetZoom);
              moveCamera();  // Update camera position after each zoom
            }, 80);
          });
          const nextZoom =
            currentZoom < targetZoom ? currentZoom + 1 : currentZoom - 1;
          map.setZoom(nextZoom);
        }
      };

      // Initial camera setup
      moveCamera();

      // Start with low zoom and animate to a more appropriate zoom level
      setTimeout(() => {
        smoothZoom(map.value!, 13);
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
    activeInfoWindow.value.setContent(
      createInfoWindowContent(activeProperty.value)
    );
  }
});

// Mount hook
onMounted(() => {
  initializeMap();
});
</script>
