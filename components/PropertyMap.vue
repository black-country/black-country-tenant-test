<template>
  <div class="h-screen w-screen relative z-10">
    <div class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-4 items-center">
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
    <div id="map" class="absolute top-0 left-0 w-full h-full rounded-md"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

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

// Function to place markers on the Google map
const placeMarkers = (map: google.maps.Map) => {
  const bounds = new google.maps.LatLngBounds();

  props.properties.forEach((property: Property) => {
    const coordinates = new google.maps.LatLng(property.coordinates.coordinates[1], property.coordinates.coordinates[0]);

    // Create a new marker
    const marker = new google.maps.Marker({
      position: coordinates,
      map,
    });

    // Popup content for each marker
    const popupContent = `
      <div class="text-sm">
        <h3>${property.name}</h3>
        <img src="${property.images[0]}" alt="${property.name}" class="w-full h-24 object-cover"/>
        <p class="font-medium leading-loose">${property.description}</p>
      </div>
    `;

    // Create a popup (info window)
    const infowindow = new google.maps.InfoWindow({
      content: popupContent,
    });

    // Show popup on marker click
    marker.addListener("click", () => {
      infowindow.open(map, marker);
      map.panTo(coordinates);
      map.setZoom(14);
    });

    // Extend bounds to include this marker
    bounds.extend(coordinates);
  });

  // Fit map to bounds
  if (props.properties.length) {
    map.fitBounds(bounds);
  }
};

// Load Google Maps on mounted hook
onMounted(() => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });

  loader.load().then(() => {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: 6.465422, lng: 3.406448 }, // Default coordinates (Lagos)
      zoom: 12,
    });

    // Place the markers on the map
    placeMarkers(map);
  });
});

</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>