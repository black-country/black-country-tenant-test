// ... Previous template and style code remains the same ...

<script setup lang="ts">
// ... Previous imports and refs remain the same ...

// Add new utility functions for map bounds
const fitMapToBounds = (properties: Property[]) => {
  if (!map.value || !properties.length) return;

  const bounds = new google.maps.LatLngBounds();
  
  properties.forEach(property => {
    bounds.extend({
      lat: property.coordinates.latitude,
      lng: property.coordinates.longitude
    });
  });

  // Add padding to bounds
  map.value.fitBounds(bounds, {
    padding: {
      top: 100,
      right: 50,
      bottom: 50,
      left: 50
    }
  });

  // If there's only one result, zoom in closer
  if (properties.length === 1) {
    map.value.setZoom(16);
  }
};

// Function to create property markers (updated version)
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

  // If no properties, return early
  if (!properties.length) return;

  // Fit map to new properties
  fitMapToBounds(properties);

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
          content: createInfoWindowContent(property),
          maxWidth: 320
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

        // Smooth pan to the clicked marker
        map.panTo(position);
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

// Modified initialize map function
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
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
        // Add custom controls
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        streetViewControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
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

// Modified watchers
watch(
  [searchResults, loadingSearch],
  ([newResults, isLoading], [oldResults, wasLoading]) => {
    if (!isLoading && wasLoading && map.value) {
      if (newResults?.length) {
        createPropertyMarkers(newResults, map.value);
      } else {
        // Clear markers if no results
        markers.value.forEach((marker) => {
          if ((marker as any).overlay) {
            (marker as any).overlay.setMap(null);
          }
          marker.setMap(null);
        });
        markers.value = [];
      }
    }
  }
);

// Handle clearing search
const handleClearSearch = () => {
  clearSearch();
  if (map.value) {
    // Reset map to initial state
    map.value.setZoom(12);
    if (currentPosition.value) {
      map.value.setCenter(currentPosition.value);
    }
    // Show all properties
    if (propertiesList.value?.length) {
      createPropertyMarkers(propertiesList.value, map.value);
    }
  }
};

// Mount hook
onMounted(() => {
  initializeMap();
});
</script>