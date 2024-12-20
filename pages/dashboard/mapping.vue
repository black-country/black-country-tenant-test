<template>
    <div class="relative w-screen h-screen">
      <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xl px-4">
        <!-- Rest of the search and filter UI remains unchanged -->
        <!-- ... -->
      </div>
  
      <div ref="mapContainer" class="w-full h-full"></div>
    </div>
  
    <!-- Existing modals remain unchanged -->
    <!-- ... -->
  </template>
  
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
  
  // Existing composables and refs remain unchanged
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
  
  // Add coordinate validation helper functions
  const isValidCoordinate = (coordinate: number): boolean => {
    return typeof coordinate === 'number' && !isNaN(coordinate) && isFinite(coordinate);
  };
  
  const isValidLatitude = (lat: number): boolean => {
    return isValidCoordinate(lat) && lat >= -90 && lat <= 90;
  };
  
  const isValidLongitude = (lng: number): boolean => {
    return isValidCoordinate(lng) && lng >= -180 && lng <= 180;
  };
  
  const getValidatedCoordinates = (property: Property): { lat: number; lng: number } | null => {
    const lat = Number(property.coordinates.latitude);
    const lng = Number(property.coordinates.longitude);
  
    if (!isValidLatitude(lat) || !isValidLongitude(lng)) {
      console.error(`Invalid coordinates for property ${property.id}:`, { lat, lng });
      return null;
    }
  
    return { lat, lng };
  };
  
  // Modified createPropertyMarkers function with coordinate validation
  const createPropertyMarkers = (properties: Property[], map: google.maps.Map) => {
    // Clear existing markers
    markers.value.forEach((marker) => {
      if ((marker as any).overlay) {
        (marker as any).overlay.setMap(null);
      }
      marker.setMap(null);
    });
    markers.value = [];
  
    // Create bounds object to fit all markers
    const bounds = new google.maps.LatLngBounds();
    let validMarkersCount = 0;
  
    properties.forEach((property) => {
      const coordinates = getValidatedCoordinates(property);
      if (!coordinates) return;
  
      const position = new google.maps.LatLng(coordinates.lat, coordinates.lng);
      bounds.extend(position);
      validMarkersCount++;
  
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
          if (activeInfoWindow.value) {
            activeInfoWindow.value.close();
          }
  
          activeProperty.value = property;
  
          const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(property),
            position: position,
          });
  
          activeInfoWindow.value = infoWindow;
          infoWindow.open(map);
  
          google.maps.event.addListener(infoWindow, "domready", () => {
            const saveButton = document.getElementById("saveSearchBtn");
            if (saveButton) {
              saveButton.addEventListener("click", handleSaveSearch);
            }
          });
  
          google.maps.event.addListener(infoWindow, "closeclick", () => {
            activeProperty.value = null;
            activeInfoWindow.value = null;
          });
        });
  
        markerOverlay.draw = function () {
          const overlayProjection = markerOverlay.getProjection();
          const point = overlayProjection.fromLatLngToDivPixel(position);
  
          if (point) {
            div.style.left = point.x - 24 + "px";
            div.style.top = point.y - 60 + "px";
            div.style.position = "absolute";
          }
        };
      };
  
      markerOverlay.setMap(map);
  
      const marker = new google.maps.Marker({
        position,
        map: null,
      });
      (marker as any).overlay = markerOverlay;
      markers.value.push(marker);
    });
  
    // Adjust map bounds if we have valid markers
    if (validMarkersCount > 0) {
      map.fitBounds(bounds);
      
      // If we only have one marker, zoom in closer
      if (validMarkersCount === 1) {
        map.setZoom(15);
      }
    }
  };
  
  // Modified initializeMap function with better error handling and initial positioning
  const initializeMap = async () => {
    try {
      await $loadGoogleMapsApi();
  
      let initialPosition = { lat: 0, lng: 0 }; // Default center
      let initialZoom = 2; // Default zoom
  
      try {
        const position = await getCurrentPosition();
        initialPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        initialZoom = 12;
        currentPosition.value = initialPosition;
      } catch (error) {
        console.warn("Could not get user location:", error);
      }
  
      if (mapContainer.value) {
        map.value = new google.maps.Map(mapContainer.value, {
          center: initialPosition,
          zoom: initialZoom,
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
  
        // Create property markers if properties are available
        if (filteredProperties.value?.length) {
          createPropertyMarkers(filteredProperties.value, map.value);
        }
      }
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  };
  
  // Rest of the component remains unchanged
  // ... (keep all other existing code)
  
  onMounted(() => {
    initializeMap();
  });
  </script>
  
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