<!-- <script setup lang="ts">

import { useGetCommonAreas } from '@/composables/modules/property/fetchCommonAreas'
import { useFilterProperty } from '@/composables/modules/property/useFilterListings'
import { useGetPropertyTypes } from '@/composables/modules/property/fetchPropertyTypes'
const { filterProperty, setPayload, loading, filterPayload } = useFilterProperty()
const { propertyTypesList } = useGetPropertyTypes()
const { loading: fetchingCommonAreas, commonAreasList } = useGetCommonAreas()
import { ref, reactive, watch } from 'vue'

interface FilterPayload {
  order: Array<{ field: string; value: string }>;
  sharedCount: number;
  houseTypeIds: string[];
  priceMin: number;
  priceMax: number;
  bedroomsCount: number[];
  bathroomsCount: number[];
  roomSizeMin: number;
  roomSizeMax: number;
  roomSizeUnit: string;
  amenities: string[];
  pets: string[];
}

const filters = reactive({
  sortBy: '',
  priceRange: [200000, 3000000] as [number, number],
  roomSizeRange: [200, 6000] as [number, number],
  coLiving: 1,
  features: {} as Record<string, boolean>,
  bedrooms: [] as number[],
  propertyTypes: {} as Record<string, boolean>,
  amenities: {} as Record<string, boolean>,
  moveInDate: '',
  availableNow: false
});

// const sortOptions = [
//   { id: 'all', label: 'All' },
//   { id: 'newest', label: 'Newest Listings' },
//   { id: 'oldest', label: 'Oldest Listings' },
//   { id: 'lowest', label: 'Lowest price to highest price' },
//   { id: 'highest', label: 'Highest price to lowest price' },
// ]

// const propertyTypes = [
//   { id: 'all', label: 'All' },
//   { id: 'single-family', label: 'Single - family home' },
//   { id: 'apartment', label: 'Apartment' },
//   { id: 'condominium', label: 'Condominium' },
//   { id: 'townhouse', label: 'Townhouse' },
//   { id: 'duplex', label: 'Duplex' },
// ]

// const amenities = [
//   { id: 'all', label: 'All' },
//   { id: 'furnished', label: 'Furnished' },
//   { id: 'private-bath', label: 'Private Bath' },
//   { id: 'pet-friendly', label: 'Pet-friendly' },
//   { id: 'garden', label: 'Garden' },
//   { id: 'fitness', label: 'Fitness Center' },
// ]

const listingFeatures = [
  { id: 'all', label: 'All' },
  { id: 'furnished', label: 'Furnished' },
  { id: 'not-furnished', label: 'Not furnished' },
]

const selectedSortOptions = ref<Set<string>>(new Set())
const selectedPropertyTypes = ref<Set<string>>(new Set())
const selectedAmenities = ref<Set<string>>(new Set())
const selectedFeatures = ref<Set<string>>(new Set())

const sharedCount = ref(0)
const priceRange = reactive({
  min: 200000,
  max: 3000000
})
const roomSize = reactive({
  min: 1000,
  max: 3000
})
const selectedBedrooms = ref<number[]>([])
const bathroomCount = ref('')
const moveInDate = ref('')
const availableNow = ref(false)

const bedroomOptions = Array.from({ length: 8 }, (_, i) => i + 1)

const toggleOption = (set: Set<string>, id: string) => {
  if (id === 'all') {
    if (set.has('all')) {
      set.clear()
    } else {
      set.clear()
      set.add('all')
    }
    return
  }

  if (set.has('all')) {
    set.delete('all')
  }

  if (set.has(id)) {
    set.delete(id)
  } else {
    set.add(id)
  }
}

const getFilterPayload = (): FilterPayload => {
  return {
    order: [{ field: 'price', value: 'DESC' }],
    sharedCount: sharedCount.value,
    houseTypeIds: Array.from(selectedPropertyTypes.value),
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    bedroomsCount: selectedBedrooms.value,
    bathroomsCount: bathroomCount.value ? [parseInt(bathroomCount.value)] : [],
    roomSizeMin: roomSize.min,
    roomSizeMax: roomSize.max,
    roomSizeUnit: 'sqft',
    amenities: Array.from(selectedAmenities.value),
    pets: []
  }
}

watch([selectedSortOptions, selectedPropertyTypes, selectedAmenities, selectedFeatures,
      sharedCount, priceRange, roomSize, selectedBedrooms, bathroomCount, moveInDate, availableNow],
  () => {
    const payload = getFilterPayload()
    console.log('Filter payload:', payload)
  }
)

enum SortField {
  CREATED_AT = 'createdAt',
  PRICE = 'price'
}

enum SortValue {
  DESC = 'DESC',
  ASC = 'ASC'
}

interface SortConfig {
  field: SortField
  value: SortValue
}

interface SortPayload {
  order: SortConfig[]
}

interface SortOption {
  id: string
  label: string
  sortConfig: SortConfig | null
}

// Reactive state
const selectedSort = ref<string>('all')
const sortGroup = ref<string>('sortOptions')
const currentSortConfig = ref<SortPayload | null>(null)

// Sort options with corresponding configurations
const sortOptions = ref<SortOption[]>([
  {
    id: 'all',
    label: 'All',
    sortConfig: null
  },
  {
    id: 'newest',
    label: 'Newest Listings',
    sortConfig: {
      field: SortField.CREATED_AT,
      value: SortValue.DESC
    }
  },
  {
    id: 'oldest',
    label: 'Oldest Listings',
    sortConfig: {
      field: SortField.CREATED_AT,
      value: SortValue.ASC
    }
  },
  {
    id: 'lowest',
    label: 'Lowest price to highest price',
    sortConfig: {
      field: SortField.PRICE,
      value: SortValue.ASC
    }
  },
  {
    id: 'highest',
    label: 'Highest price to lowest price',
    sortConfig: {
      field: SortField.PRICE,
      value: SortValue.DESC
    }
  }
])

// Methods
const handleSortChange = async (option: SortOption): Promise<void> => {
  selectedSort.value = option.id
  
  if (option.sortConfig) {
    currentSortConfig.value = {
      order: [option.sortConfig]
    }
  } else {
    currentSortConfig.value = null
  }
  
  // Fetch products with new sort configuration
  // await fetchProducts()
}


</script>

<template>
  <div class="w-full max-w-md space-y-6">

    <div class="space-y-3">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">Sort by</h3>
    </div>

    <div class="space-y-2 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
    <div
      v-for="option in sortOptions"
      :key="option.id"
      class="flex justify-between items-center"
    >
      <label :for="option.id" class="ml-3 text-sm text-gray-700">{{ option.label }}</label>
      <div class="relative flex items-center">
        <input
          :id="option.id"
          type="radio"
          :name="sortGroup"
          :value="option.id"
          :checked="selectedSort === option.id"
          @change="handleSortChange(option)"
          class="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-0 focus:ring-offset-0"
        >
        <div
          v-if="selectedSort === option.id"
          class="absolute pointer-events-none"
        >
          <svg
            class="h-5 w-5 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        </div>
      </div>
    </div>
  </div>


    <div class="space-y-3">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">Co-living with</h3>
      <div class="flex items-center space-x-4 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <button @click="sharedCount = Math.max(0, sharedCount - 1)"
                class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
          -
        </button>
        <span class="w-20 text-center">{{ sharedCount }}</span>
        <button @click="sharedCount++"
                class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
          +
        </button>
      </div>
    </div>


    <FiltersRangeSlider
      v-model="filters.priceRange"
      :min="200000"
      :max="3000000"
      :step="100000"
      title="Price range"
      prefix="NGN "
    />

   
    <FiltersRangeSlider
      v-model="filters.roomSizeRange"
      :min="200"
      :max="6000"
      :step="100"
      title="Average Room size range"
      prefix="sqft "
    />


    <div class="space-y-3">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">Listings features</h3>
      <div class="space-y-2 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <div v-for="feature in listingFeatures" :key="feature.id"
             class="flex justify-between items-center">
          <label :for="'feature-' + feature.id" class="ml-3 text-sm text-gray-700">{{ feature.label }}</label>
          <div class="relative flex items-center">
            <input
              :id="'feature-' + feature.id"
              type="checkbox"
              :checked="selectedFeatures.has(feature.id)"
              @change="toggleOption(selectedFeatures, feature.id)"
              class="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-0 focus:ring-offset-0"
            >
            <div v-if="selectedFeatures.has(feature.id)"
                 class="absolute pointer-events-none">
              <svg class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="space-y-3">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">Bathrooms</h3>
      <div class="flex items-center space-x-4 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <button @click="bathroomCount = String(Math.max(1, parseInt(bathroomCount || '1') - 1))"
                class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
          -
        </button>
        <span class="w-20 text-center">{{ bathroomCount || 1 }}</span>
        <button @click="bathroomCount = String(parseInt(bathroomCount || '1') + 1)"
                class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
          +
        </button>
      </div>
    </div>


    <div class="space-y-3">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">Bedrooms</h3>
      <div class="flex flex-wrap gap-2 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <button
          class="px-4 py-2 text-sm rounded-full"
          :class="selectedBedrooms.length === 0 ? 'bg-green-600 text-white' : 'border border-gray-300 text-gray-700'"
          @click="selectedBedrooms = []"
        >
          Any
        </button>
        <button
          v-for="num in bedroomOptions"
          :key="num"
          class="px-4 py-2 text-sm rounded-full"
          :class="selectedBedrooms.includes(num) ? 'bg-green-600 text-white' : 'border border-gray-300 text-gray-700'"
          @click="selectedBedrooms = selectedBedrooms.includes(num) ? selectedBedrooms.filter(n => n !== num) : [...selectedBedrooms, num]"
        >
          {{ num }}
        </button>
        <button
          class="px-4 py-2 text-sm rounded-full border border-gray-300 text-gray-700"
          :class="selectedBedrooms.includes(9) ? 'bg-green-600 text-white' : ''"
          @click="selectedBedrooms = selectedBedrooms.includes(9) ? selectedBedrooms.filter(n => n !== 9) : [...selectedBedrooms, 9]"
        >
          9+
        </button>
      </div>
    </div>


    <div class="space-y-3">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">Property type</h3>
      <div class="space-y-2 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <div v-for="type in propertyTypesList" :key="type.id"
             class="flex justify-between items-center">
          <label :for="'property-' + type.id" class="ml-3 text-sm text-gray-700">{{ type.name }}</label>
          <div class="relative flex items-center">
            <input
              :id="'property-' + type.id"
              type="checkbox"
              :checked="selectedPropertyTypes.has(type.id)"
              @change="toggleOption(selectedPropertyTypes, type.id)"
              class="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-0 focus:ring-offset-0"
            >
            <div v-if="selectedPropertyTypes.has(type.id)"
                 class="absolute pointer-events-none">
              <svg class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="space-y-3">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">Building amenities</h3>
      <div class="space-y-2 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <div v-for="amenity in commonAreasList" :key="amenity.id"
             class="flex justify-between items-center">
          <label :for="'amenity-' + amenity.id" class="ml-3 text-sm text-gray-700">{{ amenity.name }}</label>
          <div class="relative flex items-center">
            <input
              :id="'amenity-' + amenity.id"
              type="checkbox"
              :checked="selectedAmenities.has(amenity.id)"
              @change="toggleOption(selectedAmenities, amenity.id)"
              class="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-0 focus:ring-offset-0"
            >
            <div v-if="selectedAmenities.has(amenity.id)"
                 class="absolute pointer-events-none">
              <svg class="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">Move-in date</h3>
      <div class="relative">
        <input
          type="date"
          v-model="moveInDate"
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          placeholder="dd/mm/yyyy"
        >
      </div>
    </div>

    <div class="flex items-center justify-between">
      <span class="text-sm">Available now</span>
      <button
        @click="availableNow = !availableNow"
        class="relative inline-flex h-6 w-11 items-center rounded-full"
        :class="availableNow ? 'bg-green-600' : 'bg-gray-200'"
      >
        <span
          class="inline-block h-4 w-4 transform rounded-full bg-white transition"
          :class="availableNow ? 'translate-x-6' : 'translate-x-1'"
        />
      </button>
    </div>

    <div class="flex justify-between items-center gap-x-6">
        <button class="text-[#EBE5E0] text-[#1D192B] border text-sm py-3 rounded-lg w-full">Reset</button>
        <button class="bg-[#292929] text-sm text-white rounded-lg py-3 w-full">Submit</button>
    </div>
  </div>
</template>

<style scoped>
/* Custom checkbox styles */
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  background-color: white;
  border: 2px solid #d1d5db;
  padding: 0;
}

input[type="checkbox"]:checked {
  background-color: #059669;
  border-color: #059669;
}

/* Custom date input styles */
input[type="date"] {
  appearance: none;
  -webkit-appearance: none;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  background: transparent;
  bottom: 0;
  color: transparent;
  cursor: pointer;
  height: auto;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: auto;
}

/* Ensure proper spacing on mobile */
@media (max-width: 640px) {
  .space-y-6 > * + * {
    margin-top: 1.5rem;
  }
  
  .space-y-3 > * + * {
    margin-top: 0.75rem;
  }
  
  .space-y-2 > * + * {
    margin-top: 0.5rem;
  }
}
</style> -->


<script setup lang="ts">
import { useGetCommonAreas } from '@/composables/modules/property/fetchCommonAreas'
import { useFilterProperty } from '@/composables/modules/property/useFilterListings'
import { useGetPropertyTypes } from '@/composables/modules/property/fetchPropertyTypes'
const { filterProperty, setPayload, loading, filterPayload } = useFilterProperty()
const { propertyTypesList } = useGetPropertyTypes()
const { loading: fetchingCommonAreas, commonAreasList } = useGetCommonAreas()
import { ref, reactive, watch, defineProps, defineEmits } from 'vue'

interface FilterPayload {
  order: Array<{ field: string; value: string }>;
  sharedCount: number;
  houseTypeIds: string[];
  priceMin: number;
  priceMax: number;
  bedroomsCount: number[];
  bathroomsCount: number[];
  roomSizeMin: number;
  roomSizeMax: number;
  roomSizeUnit: string;
  amenities: string[];
  pets: string[];
}

enum SortField {
  CREATED_AT = 'createdAt',
  PRICE = 'price'
}

enum SortValue {
  DESC = 'DESC',
  ASC = 'ASC'
}

interface SortConfig {
  field: SortField
  value: SortValue
}

interface SortPayload {
  order: SortConfig[]
}

interface SortOption {
  id: string
  label: string
  sortConfig: SortConfig | null
}

// Props and Emits for the parent-child communication
const props = defineProps({
  initialFilterPayload: Object as PropType<FilterPayload>
})

const emit = defineEmits(['updatePayload'])

const selectedSort = ref<string>('all')
const sortGroup = ref<string>('sortOptions')
const currentSortConfig = ref<SortPayload | null>(null)

const filters = reactive({
  sortBy: '',
  priceRange: [200000, 3000000] as [number, number],
  roomSizeRange: [200, 6000] as [number, number],
  coLiving: 1,
  features: {} as Record<string, boolean>,
  bedrooms: [] as number[],
  propertyTypes: {} as Record<string, boolean>,
  amenities: {} as Record<string, boolean>,
  moveInDate: '',
  availableNow: false
})

const selectedSortOptions = ref<Set<string>>(new Set())
const selectedPropertyTypes = ref<Set<string>>(new Set())
const selectedAmenities = ref<Set<string>>(new Set())
const selectedFeatures = ref<Set<string>>(new Set())

const sharedCount = ref(0)
const priceRange = reactive({
  min: 200000,
  max: 3000000
})
const roomSize = reactive({
  min: 1000,
  max: 3000
})
const selectedBedrooms = ref<number[]>([])
const bathroomCount = ref('')
const moveInDate = ref('')
const availableNow = ref(false)

const bedroomOptions = Array.from({ length: 8 }, (_, i) => i + 1)

const toggleOption = (set: Set<string>, id: string) => {
  if (id === 'all') {
    if (set.has('all')) {
      set.clear()
    } else {
      set.clear()
      set.add('all')
    }
    return
  }

  if (set.has('all')) {
    set.delete('all')
  }

  if (set.has(id)) {
    set.delete(id)
  } else {
    set.add(id)
  }
}

const getFilterPayload = (): FilterPayload => {
  return {
    order: [{ field: 'price', value: 'DESC' }],
    sharedCount: sharedCount.value,
    houseTypeIds: Array.from(selectedPropertyTypes.value),
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    bedroomsCount: selectedBedrooms.value,
    bathroomsCount: bathroomCount.value ? [parseInt(bathroomCount.value)] : [],
    roomSizeMin: roomSize.min,
    roomSizeMax: roomSize.max,
    roomSizeUnit: 'sqft',
    amenities: Array.from(selectedAmenities.value),
    pets: []
  }
}

watch([selectedSortOptions, selectedPropertyTypes, selectedAmenities, selectedFeatures,
      sharedCount, priceRange, roomSize, selectedBedrooms, bathroomCount, moveInDate, availableNow],
  () => {
    const payload = getFilterPayload()
    console.log('Filter payload:', payload)
  }
)

// Sort options with corresponding configurations
const sortOptions = ref<SortOption[]>([
  {
    id: 'all',
    label: 'All',
    sortConfig: null
  },
  {
    id: 'newest',
    label: 'Newest Listings',
    sortConfig: {
      field: SortField.CREATED_AT,
      value: SortValue.DESC
    }
  },
  {
    id: 'oldest',
    label: 'Oldest Listings',
    sortConfig: {
      field: SortField.CREATED_AT,
      value: SortValue.ASC
    }
  },
  {
    id: 'lowest',
    label: 'Lowest price to highest price',
    sortConfig: {
      field: SortField.PRICE,
      value: SortValue.ASC
    }
  },
  {
    id: 'highest',
    label: 'Highest price to lowest price',
    sortConfig: {
      field: SortField.PRICE,
      value: SortValue.DESC
    }
  }
])

// Methods
const handleSortChange = (option: SortOption): void => {
  selectedSort.value = option.id
  
  if (option.sortConfig) {
    currentSortConfig.value = {
      order: [option.sortConfig]
    }
  } else {
    currentSortConfig.value = null
  }

  // Fetch products with new sort configuration
  // await fetchProducts()
}

const submitFilter = () => {
  const payload = getFilterPayload()
  emit('updatePayload', payload)  // Emit the payload to the parent component
}

</script>

<template>
  <div class="w-full max-w-md space-y-6">

    <!-- Sort by section -->
    <div class="space-y-3">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">Sort by</h3>
      <div class="space-y-2 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <div
          v-for="option in sortOptions"
          :key="option.id"
          class="flex justify-between items-center"
        >
          <label :for="option.id" class="ml-3 text-sm text-gray-700">{{ option.label }}</label>
          <div class="relative flex items-center">
            <input
              :id="option.id"
              type="radio"
              :name="sortGroup"
              :value="option.id"
              :checked="selectedSort === option.id"
              @change="handleSortChange(option)"
              class="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-0 focus:ring-offset-0"
            >
            <div
              v-if="selectedSort === option.id"
              class="absolute pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Co-living Section -->
    <div class="space-y-3">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">Co-living with</h3>
      <div class="flex items-center space-x-4 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <button @click="sharedCount = Math.max(0, sharedCount - 1)"
                class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
          -
        </button>
        <span class="w-20 text-center">{{ sharedCount }}</span>
        <button @click="sharedCount++"
                class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
          +
        </button>
      </div>
    </div>

    <!-- Price Range -->
    <FiltersRangeSlider
      v-model="filters.priceRange"
      :min="200000"
      :max="3000000"
      :step="100000"
      title="Price range"
      prefix="NGN "
    />

    <!-- Room Size Range -->
    <FiltersRangeSlider
      v-model="filters.roomSizeRange"
      :min="200"
      :max="6000"
      :step="100"
      title="Average Room size range"
      prefix="sqft "
    />

    <!-- Bedrooms, Bathrooms, Property Type, Amenities, etc. sections -->
    <!-- Similar sections as above for selecting filters go here -->

    <!-- Submit Button -->
    <button
      class="bg-[#292929] text-sm text-white rounded-lg py-3 w-full"
      @click="submitFilter"
    >
      Submit
    </button>
  </div>
</template>
