<template>
  <div
    v-if="!loadingProperties && !loadingSearch"
    class="h-screen w-screen relative z-10"
  >
    <div
      class="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex space-x-4 items-center"
    >
      <div class="relative">
        <input
          v-model="searchQuery"
          @input="handleSearchInput"
          type="text"
          placeholder="Search"
          class="bg-white shadow-md rounded-md text-sm px-4 py-3 w-64 pl-10"
          @focus="isSearchModalVisible = true"
        />
        <svg
          class="absolute top-4 left-3"
          width="17"
          height="16"
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
      </div>
      <button
        class="bg-white p-2 rounded-md shadow-md hover:bg-gray-100 flex items-center gap-x-3 text-sm px-3"
      >
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
          <path
            d="M11.3333 3.33301H3"
            stroke="#1D2739"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M9.66667 15.833H3"
            stroke="#1D2739"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M18 15.833H14.6666"
            stroke="#1D2739"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M18 9.58301H9.66663"
            stroke="#1D2739"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M18 3.33301H16.3334"
            stroke="#1D2739"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <path
            d="M4.66667 9.58301H3"
            stroke="#1D2739"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
        Filter
      </button>
    </div>
    <div id="map" class="absolute top-0 left-0 w-full h-full rounded-md"></div>
  </div>

  <div v-else class="rounded-md p-4 container mx-auto mt-10">
    <div class="animate-pulse flex space-x-4">
      <div class="flex-1 space-y-6 py-1">
        <div class="h-96 bg-slate-200 rounded"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
import { useGetProperties } from "@/composables/modules/property/fetchProperties";
import { Loader } from "@googlemaps/js-api-loader";
import { watch, ref, onMounted, computed } from "vue";
import defaultMarkerImage from "@/assets/img/roomBg.png";

const {
  propertiesList,
  loadingSearch,
  searchResults,
  searchQuery,
  loadingProperties,
  sortBy,
  clearSearch,
} = useGetProperties();

const center = ref({ lat: 6.5244, lng: 3.3792 });
const zoom = ref(10);
const isSearchModalVisible = ref(false);
let currentMap: google.maps.Map | null = null;
let currentMarkers: google.maps.Marker[] = [];

const displayedProperties = computed(() =>
  searchResults.value.length > 0 ? searchResults.value : propertiesList.value
);

const clearMarkers = () => {
  currentMarkers.forEach(marker => marker.setMap(null));
  currentMarkers = [];
};

const placeMarkers = (map: google.maps.Map) => {
  clearMarkers();
  const bounds = new google.maps.LatLngBounds();

  displayedProperties.value.forEach((property) => {
    const coordinates = new google.maps.LatLng(
      property.coordinates.coordinates[0],  // latitude
      property.coordinates.coordinates[1]   // longitude
    );

    const markerIcon = {
      url: property.images?.length ? property.images[0] : defaultMarkerImage,
      scaledSize: new google.maps.Size(50, 50),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(25, 25),
    };

    const marker = new google.maps.Marker({
      position: coordinates,
      map,
      icon: markerIcon,
    });

    currentMarkers.push(marker);

    const popupContent = document.createElement("div");
    popupContent.className = "relative cursor-pointer min-w-[300px] w-full lg:max-w-[350px] bg-white";
    popupContent.innerHTML = `
      <img class="rounded-lg h-44 w-full object-cover" src="${property.images[0] || ""}" alt="${property.name}" />
      <section class="space-y-2">
        <div>
          <h3 class="text-font-medium text-[#1D2739] mt-4">${property.name}</h3>
          <p class="text-[#79797F] text-sm items-center flex gap-x-2">${property.address}</p>
        </div>
        <p class="text-[#1D2739] font-medium text-sm">${property.bedroomCount} bedrooms | ${property.bathroomCount} baths | ${property.sizes} ${property.sizeUnit}</p>
        <p class="text-[#1D2739] text-xs">${property.availableRoomsCount} rooms avail. <span class="font-medium text-[#326543]">Now</span> | ${property.unavailableRoomsCount} room avail. on ${moment(property.createdAt).format("MMMM Do YYYY")}</p>
      </section>
    `;

    popupContent.addEventListener("click", () => {
      window.location.href = `/dashboard/listings/${property.id}/preview`;
    });

    const infowindow = new google.maps.InfoWindow({
      content: popupContent,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
      map.panTo(coordinates);
      map.setZoom(14);
    });

    bounds.extend(coordinates);
  });

  if (displayedProperties.value.length) {
    map.fitBounds(bounds);
  }
};

const handleSearchInput = () => {
  if (currentMap) {
    placeMarkers(currentMap);
  }
};

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
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });
      currentMap = map;
      placeMarkers(map);
    }
  });
};

const setCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        center.value = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        zoom.value = 15;

        if (currentMap) {
          currentMap.setCenter(center.value);
          currentMap.setZoom(zoom.value);
          placeMarkers(currentMap);
        } else {
          initializeMap();
        }
      },
      (error: GeolocationPositionError) => {
        console.error("Error getting user location:", error.message);
        initializeMap();
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  } else {
    initializeMap();
  }
};

watch(
  () => loadingProperties.value || loadingSearch.value,
  (newVal) => {
    if (!newVal) {
      setCurrentLocation();
    }
  }
);

watch(displayedProperties, () => {
  if (currentMap) {
    placeMarkers(currentMap);
  }
}, { deep: true });

watch(searchQuery, (val: string) => {
  if (val) {
    isSearchModalVisible.value = true;
  }
});

onMounted(() => {
  if (!loadingProperties.value && !loadingSearch.value) {
    setCurrentLocation();
  }
});
</script>