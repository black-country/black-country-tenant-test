<template>
    <div class="h-screen w-screen relative">
      <!-- Search Bar and Filter Icon at the top center -->
      <div
        class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-4 items-center"
      >
        <!-- Search Bar -->
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="handleSearchInput"
            type="text"
            placeholder="Search"
            class="bg-white shadow-md rounded-md text-sm px-4 py-3 w-64 pl-10"
            @focus="isSearchModalVisible = true"
          />
          <svg class="absolute top-4 left-3" width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        </div>
  
        <!-- Filter Icon -->
        <button class="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 flex items-center gap-x-3 text-sm px-3">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
            <path d="M11.3333 3.33301H3" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" />
            <path d="M9.66667 15.833H3" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" />
            <path d="M18 15.833H14.6666" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" />
            <path d="M18 9.58301H9.66663" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" />
            <path d="M18 3.33301H16.3334" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" />
            <path d="M4.66667 9.58301H3" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          Filter
        </button>
      </div>
  
      <!-- Map Container -->
      <div id="map" class="absolute top-0 left-0 w-full h-full rounded-md"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import mapboxgl from "mapbox-gl";
  import { ref, onMounted } from "vue";
  
  // Define the props
  interface Property {
    id: string;
    name: string;
    description: string;
    images: string[];
    coordinates: {
      coordinates: [number, number]; // Longitude, Latitude
    };
  }
  
  interface Props {
    properties: Property[];
  }
  
  const props = defineProps<Props>();
  
  // Search query (used for filtering properties, etc.)
  const searchQuery = ref<string>("");
  const isSearchModalVisible = ref(false);
  
  // Function to place markers on the map
  const placeMarkers = (map: mapboxgl.Map) => {
    // Initialize bounds to fit all markers in the view
    const bounds = new mapboxgl.LngLatBounds();
  
    props.properties.forEach((property: Property) => {
      const coordinates = property.coordinates.coordinates;
  
      // Create a new marker
      const marker = new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
  
      // Popup content for each marker
      const popupContent = `
        <div class="text-sm">
          <h3>${property.name}</h3>
          <img src="${property.images[0]}" alt="${property.name}" class="w-full h-24 object-cover"/>
          <p>${property.description}</p>
        </div>
      `;
  
      // Create a popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);
  
      // Show popup on marker click
      marker.getElement().addEventListener('click', () => {
        popup.setLngLat(coordinates).addTo(map);
        map.flyTo({ center: coordinates, zoom: 14 });
      });
  
      // Extend the map bounds to include this marker's location
      bounds.extend(coordinates);
    });
  
    // Adjust the map to fit all markers within the viewport
    if (props.properties.length) {
      map.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 14,
      });
    }
  };
  
  onMounted(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoibWFycXVpczE5OTktIiwiYSI6ImNrenJic2xubjB1OXQycGxnMGp2a2NvM2kifQ.7S-nXi_BJHFzVXUlgK8VTg";
  
    const map = new mapboxgl.Map({
      container: "map", // ID of the container
      style: "mapbox://styles/mapbox/streets-v11",
      center: [3.406448, 6.465422], // Default coordinates (Lagos)
      zoom: 12,
    });
  
    // Place the markers on the map
    placeMarkers(map);
  });
  </script>
  
  <style scoped>
  #map {
    height: 100%;
    width: 100%;
  }
  </style>
  