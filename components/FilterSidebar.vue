<template>
    <div class="p-6 bg-white shadow-md rounded-lg w-full max-w-xl space-y-6">
    <div class="flex justify-between items-center bg-white px-5 border-[0.5px] rounded-md">
        <h2 class="text-xl font-semibold text-[#1D2739] mb-4">Filters</h2>
        <div>
          <button class="text-[#1D2739] font-medium">Reset</button>
        </div>
    </div>
  
      <!-- Sort By Section -->
      <div class="mb-4">
        <h3 class="font-medium mb-2 bg-white p-2 border rounded-md">Sort by</h3>
        <div class="flex flex-col space-y-2">
          <label v-for="option in sortOptions" :key="option.value" class="flex text-[#1D2739] justify-between items-center">
            <span class="ml-2">{{ option.label }}</span>
            <input 
            type="radio" 
            name="sort" 
            :value="option.value" 
            v-model="selectedSortOption"
            class="form-radio text-primary"
          />
          </label>
        </div>
      </div>
  
      <!-- Shared Persons Section -->
      <div class="mb-4 bg-white rounded-lg border-gray-50 border space-y-4 p-3">
        <h3 class="font-medium mb-2 bg-white p-2 border rounded-md">Shared persons</h3>
        <div class="flex items-center space-x-2 justify-between">
          <button @click="decreaseSharedPersons" class="bg-white border-[0.8px] w-full border-gray-100 px-2 py-4 rounded-md">
            <span>-</span>
          </button>
          <span class="border-[0.5px] rounded-lg px-4 py-4 block w-full text-center bg-[#F0F2F5]">{{ sharedPersonsCount }}</span>
          <button @click="increaseSharedPersons" class="bg-white border-[0.8px] w-full border-gray-100 px-2 py-4 rounded-md flex justify-center items-center">
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.334 3.33301V16.6663" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3.66699 10H17.0003" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                
          </button>
        </div>
      </div>
  
      <!-- Property Type Section -->
      <div class="mb-4 bg-white rounded-lg border-gray-50 border space-y-4 p-3">
        <h3 class="font-medium mb-2 bg-white p-2 border rounded-md">Property type</h3>
        <div class="flex flex-col space-y-3">
          <label v-for="type in propertyTypes" :key="type.value" class="flex items-center text-[#1D2739] justify-between">
            <span class="ml-2">{{ type.label }}</span>
            <input 
            type="checkbox" 
            :value="type.value" 
            v-model="selectedPropertyTypes" 
            class="form-checkbox text-primary"
          />
          </label>
        </div>
      </div>
  
      <!-- Price Range Section -->
      <div class="mb-4 bg-white rounded-lg border-gray-50 border space-y-4 p-3">
        <h3 class="font-medium mb-2 bg-white p-2 border rounded-md">Price range</h3>
        <div class="flex flex-col space-y-4">
          <input 
            type="range" 
            min="200000" 
            max="3000000" 
            step="100000" 
            v-model="priceRange"
            class="w-full"
          />
          <div class="flex justify-between text-sm">
          <div>
            <p class="text-[6px]">Minimum</p>
            <span class="text-sm">NGN {{ formatPrice(200000) }}</span>
          </div>
           <div>
            <p class="text-[6px]">Maximum</p>
            <span class="text-sm">NGN {{ formatPrice(priceRange) }}</span>
           </div>
          </div>
        </div>
      </div>
  
      <!-- Bedrooms Section -->
      <div class="mb-4 bg-white rounded-lg border-gray-50 border space-y-4 p-3">
        <h3 class="font-medium mb-2 bg-white p-2 border rounded-md">Bedrooms</h3>
        <div class="grid grid-cols-5 gap-2">
          <button 
            v-for="bed in bedroomOptions" 
            :key="bed" 
            :class="{'bg-[#5B8469] text-white': bed === selectedBedrooms, 'bg-white text-[#1D2739]': bed !== selectedBedrooms}" 
            @click="selectedBedrooms = bed"
            class="px-4 py-2 rounded border-[0.5px] border-gray-200 text-sm text-center">
            {{ bed }}
          </button>
        </div>
      </div>
  
      <!-- Room Size Range Section -->
      <div class="mb-4 bg-white rounded-lg border-gray-50 border space-y-4 p-3">
        <h3 class="font-medium mb-2 bg-white p-2 border rounded-md">Room size range</h3>
        <div class="flex justify-between items-center">
          <input 
            type="range" 
            min="200" 
            max="6000" 
            step="100" 
            v-model="roomSizeRange" 
            class="w-full"
          />
        </div>
        <div class="flex justify-between text-sm">
          <div>
            <p class="text-[6px]">Minimum</p>
            <span>sqft {{ formatSize(200) }}</span>
          </div>
       <div>
        <p class="text-[6px]">Maximum</p>
        <span>sqft {{ formatSize(roomSizeRange) }}</span>
       </div>
        </div>
      </div>
  
      <!-- Pets Section -->
      <div class="mb-4 bg-white rounded-lg border-gray-50 border space-y-4 p-3">
        <h3 class="font-medium mb-2 bg-white p-2 border rounded-md">Pets</h3>
        <div class="flex flex-col space-y-2">
          <label v-for="pet in petOptions" :key="pet.value" class="flex items-center justify-between space-y-3">
            <span class="ml-2">{{ pet.label }}</span>
            <input 
            type="checkbox" 
            :value="pet.value" 
            v-model="selectedPets" 
            class="form-checkbox text-primary"
          />
          </label>
        </div>
      </div>
  
      <!-- Building Amenities Section -->
      <div class="mb-4 bg-white rounded-lg border-gray-50 border space-y-4 p-3">
        <h3 class="font-medium mb-2 bg-white p-2 border rounded-md">Building amenities</h3>
        <div class="flex flex-col space-y-2">
          <label v-for="amenity in buildingAmenities" :key="amenity.value" class="flex items-center text-[#1D2739] justify-between">
            <span class="ml-2">{{ amenity.label }}</span>
            <input 
            type="checkbox" 
            :value="amenity.value" 
            v-model="selectedAmenities" 
            class="form-checkbox text-primary"
          />
          </label>
        </div>
      </div>
  
      <!-- Action Buttons -->
      <div class="flex justify-between mt-6">
        <button @click="resetFilters" class="bg-gray-100 px-4 py-2 rounded">Reset</button>
        <button class="bg-black text-white px-6 py-2 rounded">Show {{ totalHomes }} homes</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">  
  // Sort Options
  const sortOptions = ref([
    { value: 'all', label: 'All' },
    { value: 'newest', label: 'Newest Listings' },
    { value: 'oldest', label: 'Oldest Listings' },
    { value: 'low-to-high', label: 'Lowest price to highest price' },
    { value: 'high-to-low', label: 'Highest price to Lowest price' }
  ])
  
  // State for Sort by filter
  const selectedSortOption = ref('newest')
  
  // Shared persons count
  const sharedPersonsCount = ref(0)
  const increaseSharedPersons = () => { sharedPersonsCount.value++ }
  const decreaseSharedPersons = () => { if (sharedPersonsCount.value > 0) sharedPersonsCount.value-- }
  
  // Property Types
  const propertyTypes = ref([
    { value: 'single-family-home', label: 'Single - family home' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condominium', label: 'Condominium' },
    // Add more property types here...
  ])
  const selectedPropertyTypes = ref<string[]>([])
  
  // Price range slider
  const priceRange = ref(200000)
  const formatPrice = (value: number) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value)
  
  // Bedrooms
  const bedroomOptions = ref(['Any', 1, 2, 3, 4, 5, 6, 7, 8, '9+'])
  const selectedBedrooms = ref('Any') as any
  
  // Room size range slider
  const roomSizeRange = ref(200)
  const formatSize = (size: number) => `${size}`
  
  // Pet options
  const petOptions = ref([
    { value: 'no-pets', label: 'No pets allowed' },
    { value: 'dogs', label: 'Dogs' },
    { value: 'cats', label: 'Cats' },
    { value: 'others', label: 'Others' }
  ])
  const selectedPets = ref<string[]>([])
  
  // Building Amenities
  const buildingAmenities = ref([
    { value: 'elevator', label: 'Elevator' },
    { value: 'sports-court', label: 'Sports Court' },
    { value: 'fitness-center', label: 'Fitness Center' },
    { value: 'security-system', label: 'Security system' },
    { value: 'pool', label: 'Pool' },
    { value: 'fenced-entry', label: 'Fenced/gated entry' }
  ])
  const selectedAmenities = ref<string[]>([])
  
  // Homes count
  const totalHomes = ref(645)
  
  // Reset Filters
  const resetFilters = () => {
    selectedSortOption.value = 'newest'
    sharedPersonsCount.value = 0
    selectedPropertyTypes.value = []
    priceRange.value = 200000
    selectedBedrooms.value = 'Any'
    roomSizeRange.value = 200
    selectedPets.value = []
    selectedAmenities.value = []
  }
  </script>
  
  <style scoped>
  /* Add any additional styles as needed */
  </style>
  