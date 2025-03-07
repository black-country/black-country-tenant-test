<template>
  <div class="w-full custom-scroll relative max-w-md space-y-6">

    <section class="space-y-1">
      <div class="">
        <h3
          class="font-medium text-sm bg-white py-3 bg-white border-[0.5px] border-gray-50 rounded-lg px-4 text-gray-900">
          Sort by</h3>
      </div>

      <div class="space-y-2 bg-white rounded-md border-[0.5px] border-gray-50 px-4">
        <div v-for="option in sortOptions" :key="option.id" class="flex justify-between items-center py-1">
          <label :for="'sort-' + option.id" class="ml-3 text-sm text-gray-700">
            {{ option.label }}
          </label>
          <CoreCustomRadio :id="'sort-' + option.id" :checkbox-id="option.id" v-model="selectedSortOptions" />
        </div>
      </div>
    </section>


    <section class="space-y-1">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-50 rounded-lg px-4 text-gray-900">
        Co-living with</h3>
      <div class="flex items-center space-x-4 bg-white rounded-md border-[0.5px] border-gray-50 py-4 px-2">
        <button @click="sharedCount = Math.max(0, sharedCount - 1)"
          class="border-[0.5px] rounded-lg bg-white py-3 w-full border-gray-50 flex items-center justify-center">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3333 10H4" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>

        </button>
        <span class="w-20 text-center bg-[#EAEAEA] py-3 px-20 rounded-md">{{ sharedCount }}</span>
        <button @click="sharedCount++"
          class="border-[0.5px] rounded-lg bg-white py-3 w-full border-gray-50 flex items-center justify-center">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.334 3.33301V16.6663" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M3.66699 10H17.0003" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>

        </button>
      </div>
    </section>

    <section class="space-y-1">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-50 rounded-lg px-4 text-gray-900">Property
        type</h3>
      <div v-for="type in visiblePropertyTypes" :key="type.id" class="flex justify-between items-center">
        <label :for="'property-' + type.id" class="ml-3 text-sm text-gray-700">
          {{ type.name }}
        </label>
        <CoreCustomCheckbox :id="'property-' + type.id" :checkbox-id="type.id" v-model="selectedPropertyTypes" />
      </div>
      <button @click="togglePropertiesVisibility" class="text-xs mt-1 text-right w-full">
      {{ showAllProperties ? 'Show Less' : 'Show More' }}
    </button>
    </section>


    <section class="space-y-1">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-50 rounded-lg px-4 text-gray-900">Building
        amenities</h3>
      <div class="space-y-2 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <div v-for="amenity in visibleAmenitiesTypes" :key="amenity.id" class="flex justify-between items-center">
          <label :for="'amenity-' + amenity.id" class="ml-3 text-sm text-gray-700">{{ amenity.name }}</label>
          <CoreCustomCheckbox :id="'amenity-' + amenity.id" :checkbox-id="amenity.name" v-model="selectedAmenities" />
        </div>
        <button @click="toggleAmenitiesVisibility" class="text-xs mt-1 text-right w-full">
          {{ showAllAmenities ? 'Show Less' : 'Show More' }}</button>
      </div>
    </section>

    <!-- <div class="slider-container">
    <label for="slider">Slide Range Selector</label>
    <input
      id="slider"
      type="range"
      :min="minValue"
      :max="computedMax"
      v-model="sliderValue"
    />
    <p>Current Value: {{ sliderValue }}</p>
  </div> -->

    <!-- {{ getFilterPayload() }} -->


    <FiltersRangeSlider v-model="filters.priceRange" :min="200000" :max="3000000" :step="100000" title="Price range"
      prefix="₦ " />


    <FiltersRangeSlider v-model="filters.roomSizeRange" :min="200" :max="6000" :step="100" code="room"
      title="Average Room size range" prefix="" @update:selectedUnit="onUnitUpdate" />


    <div class="space-y-1">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-50 rounded-lg px-4 text-gray-900">Bedrooms
      </h3>
      <div class="flex flex-wrap gap-2 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <button class="px-4 py-2 text-xs rounded-md"
          :class="selectedBedrooms.length === 0 ? 'bg-[#5B8469] text-white' : 'border border-gray-100 text-gray-700'"
          @click="selectedBedrooms = []">
          Any
        </button>
        <button v-for="num in bedroomOptions" :key="num" class="px-4 py-2 text-xs rounded-md"
          :class="selectedBedrooms.includes(num) ? 'bg-[#5B8469] text-white' : 'border-[0.5px] border-gray-100 text-gray-700'"
          @click="selectedBedrooms = selectedBedrooms.includes(num) ? selectedBedrooms.filter(n => n !== num) : [...selectedBedrooms, num]">
          {{ num }}
        </button>
        <button class="px-4 py-2 text-xs rounded-md border-[0.5px] border-gray-100 text-gray-700"
          :class="selectedBedrooms.includes(9) ? 'bg-[#5B8469] text-white' : ''"
          @click="selectedBedrooms = selectedBedrooms.includes(9) ? selectedBedrooms.filter(n => n !== 9) : [...selectedBedrooms, 9]">
          9+
        </button>
      </div>
    </div>

    <div class="space-y-1">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-50 rounded-lg px-4 text-gray-900">
        Bathrooms</h3>
      <div class="flex items-center space-x-4 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <button @click="bathroomCount = String(Math.max(1, parseInt(bathroomCount || '1') - 1))"
          class="border-[0.5px] rounded-lg bg-white py-3 w-full border-gray-50 flex items-center justify-center">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3333 10H4" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
        <span class="w-20 text-center bg-[#EAEAEA] py-3 px-20 rounded-md">{{ bathroomCount || 1 }}</span>
        <button @click="bathroomCount = String(parseInt(bathroomCount || '1') + 1)"
          class="border-[0.5px] rounded-lg bg-white py-3 w-full border-gray-50 flex items-center justify-center">
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.334 3.33301V16.6663" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M3.66699 10H17.0003" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>


    <!-- <div class="space-y-1">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-50 rounded-lg px-4 text-gray-900">Pets
      </h3>
      <div class="space-y-2 bg-white rounded-md border-[0.5px] border-gray-50 py-3 p-1">
        <div v-for="pet in petsList" :key="pet.id" class="flex justify-between items-center">
          <label :for="'pet-' + pet.id" class="ml-3 text-sm text-gray-700">{{ pet.name }}</label>
          <div class="relative flex items-center">
            <CoreCustomCheckbox :id="'pet-' + pet.id" :checkbox-id="pet.name" v-model="selectedPets" />
          </div>
        </div>
      </div>
    </div> -->

    <div class="pb-20">
      <h3 class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-50 mb-3 rounded-lg px-4 text-gray-900">
        Move-in-date</h3>
      <div class="border-[0.5px] bg-white border-gray-100 rounded-lg p-3">
        <input type="date" class="w-full border-[0.5px] text-sm rounded-lg p-2 py-3 mt-3"
          v-model="filters.availabilityFrom" />
        <div class="flex justify-between items-center items-center pt-6">
          <h3 class="text-sm">Available Now</h3>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="filters.availableNow" class="sr-only peer">
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600">
            </div>
          </label>
        </div>
      </div>
    </div>

    <section
      class="fixed w-full lg:w-[440px] bottom-0 bg-white right-0 flex justify-center items-center  z-[999999] px-4 py-3 border-t border-gray-100">
      <div id="footer" class="flex justify-between items-center items-center gap-x-6 mx-auto w-full">
        <button @click="resetFilterOptions" class="text-gray-800 font-semibold border w-full text-sm py-3 rounded-lg">
          Reset
        </button>
        <button :disabled="loading" @click="handleSubmit"
          class="bg-[#292929] disabled:cursor-not-allowed w-full disabled:opacity-25 text-sm text-white rounded-lg py-3">
          {{ loading ? 'processing..' : 'Apply Filter' }}
        </button>
      </div>
    </section>

    <!-- <section class="fixed w-full bottom-0 bg-white z-[999999px]">
  <div id="footer" class="flex justify-between items-center gap-x-6 w-full">
        <button @click="resetFilterOptions" class="text-[#EBE5E0] w-full text-gray-800 font-semibold border text-sm py-3 rounded-lg">Reset</button>
        <button :disabled="loading" @click="handleSubmit" class="bg-[#292929] w-full disabled:cursor-not-allowed disabled:opacity-25 text-sm text-white rounded-lg py-3">{{ loading ? 'processing..' : 'Apply Filter' }}</button>
    </div>
</section> -->
  </div>
</template>

<script setup lang="ts">
import { useGetCommonAreas } from '@/composables/modules/property/fetchCommonAreas'
import { useFilterProperty } from '@/composables/modules/property/useFilterListings'
import { useGetPropertyTypes } from '@/composables/modules/property/fetchPropertyTypes'
const { filterProperty, setPayload, loading, filterPayload } = useFilterProperty()
const { propertyTypesList } = useGetPropertyTypes()
const { loading: fetchingCommonAreas, commonAreasList } = useGetCommonAreas()
import { ref, reactive, watch } from 'vue'

const visiblePropertyCount = ref(5)
const showAllProperties = ref(false)

const visiblePropertyTypes = computed(() => {
  return propertyTypesList.value.slice(0, visiblePropertyCount.value);
})

const togglePropertiesVisibility = () => {
  if (showAllProperties.value) {
    visiblePropertyCount.value = 5; 
    showAllProperties.value = false;
  } else {
    visiblePropertyCount.value = propertyTypesList.value.length; 
    showAllProperties.value = true;
  }
}

const visibleAmenitiesCount = ref(5)
const showAllAmenities = ref(false)

const visibleAmenitiesTypes = computed(() => {
  return commonAreasList.value.slice(0, visibleAmenitiesCount.value);
})

const toggleAmenitiesVisibility = () => {
  if (showAllAmenities.value) {
    visibleAmenitiesCount.value = 5; 
    showAllAmenities.value = false;
  } else {
    visibleAmenitiesCount.value = commonAreasList.value.length; 
    showAllAmenities.value = true;
  }
}

const STORAGE_KEY = 'property-filter-state'


interface FilterPayload {
  order: Array<{ field: string; value: string }>;
  sharedCount: number;
  houseTypeIds: string[];
  // priceMin: number;
  // priceMax: number;
  bedroomsCount: number[];
  bathroomsCount: number[];
  // roomSizeMin: number;
  // roomSizeMax: number;
  roomSizeUnit: string;
  amenities: string[];
  pets: string[];
  availabilityFrom: string
  isFurnished: [boolean, boolean],
  availableNow: boolean
}
interface FilterState {
  selectedSortOptions: string[];
  selectedPropertyTypes: string[];
  selectedAmenities: string[];
  selectedPets: string[];
  sharedCount: number;
  priceRange: { min: number; max: number };
  roomSize: { min: number; max: number };
  selectedBedrooms: number[];
  bathroomCount: string;
  availabilityFrom: string;
  availableNow: boolean;
  roomSizeUnit: string;
}

const onUnitUpdate = (newUnit: any) => {
  filterPayload.value.roomSizeUnit = newUnit
  saveFilterState()
  // console.log('Unit updated:', newUnit);
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
  availabilityFrom: "",
  moveInDate: '',
  availableNow: false
});

const saveFilterState = () => {
  const state: FilterState = {
    selectedSortOptions: Array.from(selectedSortOptions.value),
    selectedPropertyTypes: Array.from(selectedPropertyTypes.value),
    selectedAmenities: Array.from(selectedAmenities.value),
    selectedPets: Array.from(selectedPets.value),
    sharedCount: sharedCount.value,
    priceRange: { min: priceRange.min, max: priceRange.max },
    roomSize: { min: roomSize.min, max: roomSize.max },
    selectedBedrooms: selectedBedrooms.value,
    bathroomCount: bathroomCount.value,
    availabilityFrom: filters.availabilityFrom,
    availableNow: filters.availableNow,
    roomSizeUnit: filterPayload?.value?.roomSizeUnit || '',
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('didnt save to localStorage:', e);
  }
}

const loadFilterState = () => {
  try {
    const storedState = localStorage.getItem(STORAGE_KEY);
    if (!storedState) return;
    const state: FilterState = JSON.parse(storedState);
    selectedSortOptions.value = new Set(state.selectedSortOptions);
    selectedPropertyTypes.value = new Set(state.selectedPropertyTypes);
    selectedAmenities.value = new Set(state.selectedAmenities);
    selectedPets.value = new Set(state.selectedPets);
    sharedCount.value = state.sharedCount;
    priceRange.min = state.priceRange.min;
    priceRange.max = state.priceRange.max;
    filters.priceRange = [state.priceRange.min, state.priceRange.max];
    roomSize.min = state.roomSize.min;
    roomSize.max = state.roomSize.max;
    filters.roomSizeRange = [state.roomSize.min, state.roomSize.max];
    selectedBedrooms.value = state.selectedBedrooms;
    bathroomCount.value = state.bathroomCount;
    filters.availabilityFrom = state.availabilityFrom;
    filters.availableNow = state.availableNow;
    
    if (filterPayload.value && state.roomSizeUnit) {
      filterPayload.value.roomSizeUnit = state.roomSizeUnit;
    }
  } catch (e) {
    console.error(e);
  }
}
// Reactive filters object
const filtersObj = reactive({ ...filters });


const resetFilterOptions = () => {
  Object.assign(filtersObj, filters);
  emit('close')
  window.location.reload()
  localStorage.removeItem(STORAGE_KEY);
};

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
  min: 200,
  max: 6000
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
  // Convert selected sort options to order array
  const orderArray = Array.from(selectedSortOptions.value)
    .map(sortId => {
      const option = sortOptions.value.find(opt => opt.id === sortId)
      return option?.sortConfig ? {
        field: option.sortConfig.field,
        value: option.sortConfig.value
      } : null
    })
    .filter((config): config is SortConfig => config !== null)

  // If no sort options selected, use default sorting
  // const order = orderArray.length > 0 ? orderArray : [{
  //   field: SortField.PRICE,
  //   value: SortValue.DESC
  // }]
  const order = orderArray.length > 0 ? orderArray : []

  return {
    order,
    sharedCount: sharedCount.value,
    houseTypeIds: Array.from(selectedPropertyTypes.value),
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    bedroomsCount: selectedBedrooms.value,
    bathroomsCount: bathroomCount.value ? [parseInt(bathroomCount.value)] : [],
    roomSizeMin: roomSize.min,
    roomSizeMax: roomSize.max,
    availabilityFrom: filters.availabilityFrom,
    availableNow: filters.availableNow,
    isFurnished: filters.isFurnished,
    roomSizeUnit: filterPayload?.value?.roomSizeUnit,
    amenities: Array.from(selectedAmenities.value),
    pets: Array.from(selectedPets.value)
  }
}

watch(selectedSortOptions, (newSelections) => {
  saveFilterState();
}, { deep: true })

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

// Changed from single selection to multiple selections
// const selectedSortOptions = ref<Set<string>>(new Set())

// Reactive state
const selectedSort = ref<string>('all')
const sortGroup = ref<string>('sortOptions')
const currentSortConfig = ref<SortPayload | null>(null)

// Sort options with corresponding configurations
const sortOptions = ref<SortOption[]>([
  // {
  //   id: 'all',
  //   label: 'All',
  //   sortConfig: null
  // },
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

// Updated handler for checkbox changes
const handleSortChange = (option: SortOption) => {
  if (selectedSortOptions.value.has(option.id)) {
    selectedSortOptions.value.delete(option.id)
  } else {
    selectedSortOptions.value.add(option.id)
  }

  const payload = getFilterPayload()
  // setPayload(payload)
  // filterProperty()
}


// const handleSortChange = (option: SortOption) => {
//   selectedSort.value = option.id

//   // Update the main filter payload
//   const payload = getFilterPayload()
//   if (option.sortConfig) {
//     payload.order = [{
//       field: option.sortConfig.field,
//       value: option.sortConfig.value
//     }]
//   } else {
//     // Default sorting when 'All' is selected
//     payload.order = [{
//       field: SortField.PRICE,
//       value: SortValue.DESC
//     }]
//   }

//   // setPayload(payload)
//   // filterProperty()
// }

watch(selectedSort, (newSort) => {
  const selectedOption = sortOptions.value.find(option => option.id === newSort)
  if (selectedOption) {
    handleSortChange(selectedOption)
  }
})

const emit = defineEmits(['close', 'result'])

const handleSubmit = async () => {
  const payload = getFilterPayload()
  setPayload(payload)
  const result = await filterProperty()
  saveFilterState();
  emit('result', result)
  emit('close')
}

const petsList = [
  { id: 'dog', name: 'Dog' },
  { id: 'cat', name: 'Cat' },
  { id: 'rabbit', name: 'Rabbit' },
  { id: 'hamster', name: 'Hamster' },
  { id: 'parrot', name: 'Parrot' }
]

const selectedPets = ref(new Set<string>()) // Initialize with an empty Set

watch([selectedSortOptions, selectedPropertyTypes, selectedAmenities, selectedPets,
  sharedCount, priceRange, roomSize, selectedBedrooms, bathroomCount, moveInDate, availableNow],
  () => {
    saveFilterState();
  },
  { deep: true }
)

const togglePetSelection = (petId: string) => {
  if (selectedPets.value.has(petId)) {
    selectedPets.value.delete(petId)
  } else {
    selectedPets.value.add(petId)
  }
}

// Watch specific properties and log changes
watch(
  () => filters.priceRange,
  (newVal) => {
    // const payload = getFilterPayload()
    // setPayload(payload)
    console.log('Parent priceRange updated:', newVal);
    priceRange.min = newVal[0]
    priceRange.max = newVal[1]
  },
  { immediate: true }
);

watch(
  () => filters.roomSizeRange,
  (newVal) => {
    roomSize.min = newVal[0]
    roomSize.max = newVal[1]
    console.log('Parent roomSizeRange updated:', newVal);
  },
  { immediate: true }
);

onMounted(() => {
  loadFilterState();
})


// Minimum and maximum values
const minValue = ref(0);
const maxValue = ref(Infinity);

// Current slider value
const sliderValue = ref(0);

// Computed value for max, as HTML input cannot handle Infinity directly
const computedMax = computed(() => (maxValue.value === Infinity ? 1000000 : maxValue.value));

// Watcher for value changes
watch(sliderValue, (newValue, oldValue) => {
  console.log(`Slider value changed from ${oldValue} to ${newValue}`);
});

// Adjust slider value if it exceeds new maximum
watch(maxValue, (newMax) => {
  if (sliderValue.value > newMax) {
    sliderValue.value = newMax;
  }
});

</script>


<style scoped>
.slider-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

input[type="range"] {
  width: 100%;
  margin: 10px 0;
}

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


/* Ensure proper spacing on mobile */
@media (max-width: 640px) {
  .space-y-6>*+* {
    margin-top: 1.5rem;
  }

  .space-y-3>*+* {
    margin-top: 0.75rem;
  }

  .space-y-2>*+* {
    margin-top: 0.5rem;
  }
}
</style>
