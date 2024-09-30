<!-- <template>
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
  bedroomCount: string;
  bathroomCount: string;
  address: string;
  sizes: string;
  sizeUnit: string;
  unavailableRoomsCount: string;
  availableRoomsCount: string
  available: string;
  createdAt: string;
  coordinates: {
    coordinates: [number, number]; // Latitude, Longitue
  };
}

interface Props {
  properties: Property[];
}

const center = ref({}) as any
const zoom = ref(10)

const props = defineProps<Props>();

// Search query (used for filtering properties, etc.)
const searchQuery = ref<string>("");
const isSearchModalVisible = ref(false);

// Function to place markers on the Google map
const placeMarkers = (map: google.maps.Map) => {
  const bounds = new google.maps.LatLngBounds();

  props.properties.forEach((property: Property) => {
    const coordinates = new google.maps.LatLng(property.coordinates.coordinates[0], property.coordinates.coordinates[1]);

    // Create a new marker
    const marker = new google.maps.Marker({
      position: coordinates,
      map,
    });

    // Popup content for each marker
    const popupContent = `
      <div class="relative cursor-pointer min-w-[300px] w-full lg:max-w-[350px] bg-white">
           <img class="rounded-lg h-44 w-full object-fit-cover" src="${property.images[0]}" alt="${property.name}" />
          <section class="space-y-2">
            <div>
              <h3 class="text- font-medium text-[#1D2739] mt-4">
                ${ property?.name }
              </h3>
              <p class="text-[#79797F] text-sm items-center flex gap-x-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.94366 12.4644C7.69072 12.7012 7.35257 12.8337 7.00064 12.8337C6.64872 12.8337 6.31062 12.7012 6.05762 12.4644C3.74093 10.2822 0.636277 7.84435 2.15032 4.30513C2.96895 2.3915 4.93403 1.16699 7.00064 1.16699C9.06727 1.16699 11.0323 2.3915 11.851 4.30513C13.3631 7.83992 10.2661 10.2897 7.94366 12.4644Z"
                    fill="#5B8469"
                    stroke="#5B8469"
                  />
                  <path
                    d="M9.04165 6.41667C9.04165 7.54425 8.12756 8.45833 6.99998 8.45833C5.8724 8.45833 4.95831 7.54425 4.95831 6.41667C4.95831 5.28908 5.8724 4.375 6.99998 4.375C8.12756 4.375 9.04165 5.28908 9.04165 6.41667Z"
                    fill="#EAEAEA"
                    stroke="#5B8469"
                  />
                </svg>

                ${property?.address}
              </p>
            </div>
            <p class="text-[#1D2739] font-medium text-sm">
              ${property.bedroomCount} bedrooms | ${property.bathroomCount} baths
              | ${ property.size } ${property.sizeUnit}
            </p>
            <p class="text-[#1D2739] text-xs">${property.available}</p>
            <p class="text-[#1D2739] text-xs">${property.availableRoomsCount } rooms avail. <span class="font-medium text-[#326543]">Now</span> | ${property.unavailableRoomsCount } room avail. on ${property.createdAt}</p>
          </section>
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

const setCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => {
            center.value = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            zoom.value = 15; // Adjust the zoom level if needed
          },
          (error: any) => {
            console.error("Error getting user location: ", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

// Load Google Maps on mounted hook
onMounted(() => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });

  setCurrentLocation()
  loader.load().then(() => {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: center.value,
      zoom: zoom.value
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
</style> -->

<template>
  <div v-if="!loadingProperties" class="h-screen w-screen relative z-10">
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
  <div  v-else class="rounded-md p-4 container mx-auto mt-10">
    <div class="animate-pulse flex space-x-4">
      <div class="flex-1 space-y-6 py-1">
        <div class="h-96 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetProperties } from '@/composables/modules/property/fetchProperties'
import { Loader } from "@googlemaps/js-api-loader";
import { watch, ref, onMounted } from 'vue';

const { 
  propertiesList, 
  loadingSearch,
  searchResults,
  searchQuery,
  loadingProperties, 
  sortBy,
  clearSearch
} = useGetProperties();

// Center and zoom for the map
const center = ref({ lat: 6.465422, lng: 3.406448 }); // Default to Lagos if user location is not available
const zoom = ref(10);

// Manage search modal visibility
const isSearchModalVisible = ref(false);

// Function to place markers on the Google map
const placeMarkers = (map: google.maps.Map) => {
  const bounds = new google.maps.LatLngBounds();

  propertiesList.value.forEach((property) => {
    const coordinates = new google.maps.LatLng(
      property.coordinates.coordinates[0],
      property.coordinates.coordinates[1]
    );

    // Create a new marker
    const marker = new google.maps.Marker({
      position: coordinates,
      map,
    });

    // Popup content for each marker
    const popupContent = `
      <div class="relative cursor-pointer min-w-[300px] w-full lg:max-w-[350px] bg-white">
        <img class="rounded-lg h-44 w-full object-fit-cover" src="${property.images[0]}" alt="${property.name}" />
        <section class="space-y-2">
          <div>
            <h3 class="text- font-medium text-[#1D2739] mt-4">${property.name}</h3>
            <p class="text-[#79797F] text-sm items-center flex gap-x-2">${property.address}</p>
          </div>
          <p class="text-[#1D2739] font-medium text-sm">${property.bedroomCount} bedrooms | ${property.bathroomCount} baths | ${property.sizes} ${property.sizeUnit}</p>
          <p class="text-[#1D2739] text-xs">${property.available}</p>
          <p class="text-[#1D2739] text-xs">${property.availableRoomsCount} rooms avail. <span class="font-medium text-[#326543]">Now</span> | ${property.unavailableRoomsCount} room avail. on ${property.createdAt}</p>
        </section>
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
  if (propertiesList.value.length) {
    map.fitBounds(bounds);
  }
};

// Set the current user location
const setCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        center.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        zoom.value = 15; // Adjust the zoom level if needed
      },
      (error: GeolocationPositionError) => {
        console.error("Error getting user location: ", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

// Initialize Google Map when the #map div is available
const initializeMap = () => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });

  loader.load().then(() => {
    const mapElement = document.getElementById("map");
    if (mapElement) {
      const map = new google.maps.Map(mapElement as HTMLElement, {
        center: center.value,
        zoom: zoom.value,
      });

      // Place the markers on the map
      placeMarkers(map);
    }
  });
};

// Watch for changes in loadingProperties and initialize the map when it's false
watch(
  () => loadingProperties.value,
  (newVal) => {
    if (!newVal) {
      setCurrentLocation();
      initializeMap();
    }
  }
);

// Set current location when component is mounted
onMounted(() => {
  if (!loadingProperties.value) {
    setCurrentLocation();
    initializeMap();
  }
});
</script>


<!-- <script setup lang="ts">
import { useGetProperties } from '@/composables/modules/property/fetchProperties'
import { Loader } from "@googlemaps/js-api-loader";
const { 
  propertiesList, 
  loadingSearch,
  searchResults,
  searchQuery,
  loadingProperties, 
  sortBy,
  clearSearch
} = useGetProperties();

// Define the props
interface Property {
  id: string;
  name: string;
  description: string;
  images: string[];
  bedroomCount: string;
  bathroomCount: string;
  address: string;
  sizes: string;
  sizeUnit: string;
  unavailableRoomsCount: string;
  availableRoomsCount: string;
  available: string;
  createdAt: string;
  coordinates: {
    coordinates: [number, number]; // Latitude, Longitude
  };
}

// interface Props {
//   properties: Property[];
// }

const center = ref({ lat: 6.465422, lng: 3.406448 }); // Default to Lagos if user location is not available
const zoom = ref(10);

// const props = defineProps<Props>();

// Search query (used for filtering properties, etc.)
const isSearchModalVisible = ref(false);

// Function to place markers on the Google map
const placeMarkers = (map: google.maps.Map) => {
  const bounds = new google.maps.LatLngBounds();

  propertiesList.value.forEach((property: Property) => {
    const coordinates = new google.maps.LatLng(
      property.coordinates.coordinates[0],
      property.coordinates.coordinates[1]
    );

    // Create a new marker
    const marker = new google.maps.Marker({
      position: coordinates,
      map,
    });

    // Popup content for each marker
    const popupContent = `
      <div class="relative cursor-pointer min-w-[300px] w-full lg:max-w-[350px] bg-white">
           <img class="rounded-lg h-44 w-full object-fit-cover" src="${property.images[0]}" alt="${property.name}" />
          <section class="space-y-2">
            <div>
              <h3 class="text- font-medium text-[#1D2739] mt-4">
                ${property?.name}
              </h3>
              <p class="text-[#79797F] text-sm items-center flex gap-x-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.94366 12.4644C7.69072 12.7012 7.35257 12.8337 7.00064 12.8337C6.64872 12.8337 6.31062 12.7012 6.05762 12.4644C3.74093 10.2822 0.636277 7.84435 2.15032 4.30513C2.96895 2.3915 4.93403 1.16699 7.00064 1.16699C9.06727 1.16699 11.0323 2.3915 11.851 4.30513C13.3631 7.83992 10.2661 10.2897 7.94366 12.4644Z"
                    fill="#5B8469"
                    stroke="#5B8469"
                  />
                  <path
                    d="M9.04165 6.41667C9.04165 7.54425 8.12756 8.45833 6.99998 8.45833C5.8724 8.45833 4.95831 7.54425 4.95831 6.41667C4.95831 5.28908 5.8724 4.375 6.99998 4.375C8.12756 4.375 9.04165 5.28908 9.04165 6.41667Z"
                    fill="#EAEAEA"
                    stroke="#5B8469"
                  />
                </svg>
                ${property?.address}
              </p>
            </div>
            <p class="text-[#1D2739] font-medium text-sm">
              ${property.bedroomCount} bedrooms | ${property.bathroomCount} baths
              | ${property.sizes} ${property.sizeUnit}
            </p>
            <p class="text-[#1D2739] text-xs">${property.available}</p>
            <p class="text-[#1D2739] text-xs">${property.availableRoomsCount} rooms avail. <span class="font-medium text-[#326543]">Now</span> | ${property.unavailableRoomsCount} room avail. on ${property.createdAt}</p>
          </section>
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
  if (propertiesList.value.length) {
    map.fitBounds(bounds);
  }
};

// Set the current user location
const setCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        center.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        zoom.value = 15; // Adjust the zoom level if needed
      },
      (error: GeolocationPositionError) => {
        console.error("Error getting user location: ", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

// Load Google Maps on mounted hook
onMounted(() => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "weekly",
  });

  setCurrentLocation();
  loader.load().then(() => {
    const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: center.value,
      zoom: zoom.value,
    });

    // Place the markers on the map
    placeMarkers(map);
  });
});
</script> -->

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
