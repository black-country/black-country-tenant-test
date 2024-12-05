<template>
  <div class="space-y-4">
    <!-- State Dropdown -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-gray-700">State</label>
      <select
        v-model="selectedStateCode"
        @change="handleStateSelection"
        :disabled="loadingStates"
        class="w-full p-2 mt-1 border-[0.5px] outline-none focus-within:border-2 focus-within:border-[#5B8469] text-sm rounded-md bg-[#E4E7EC] py-4"
      >
        <option value="">Select State</option>
        <option
          v-for="state in statesList"
          :key="state.id"
          :value="state.stateCode"
        >
          {{ state.name }}
        </option>
      </select>
      <div v-if="loadingStates" class="text-sm text-gray-500">Loading states...</div>
    </div>

    <!-- City Dropdown -->
    <div class="flex flex-col gap-2">
      <label class="text-sm font-medium text-gray-700">Local Government</label>
      <select
        v-model="selectedCityId"
        @change="handleCitySelection"
        :disabled="loadingCities || !selectedStateCode"
        class="w-full p-2 mt-1 border-[0.5px] outline-none focus-within:border-2 focus-within:border-[#5B8469] text-sm rounded-md bg-[#E4E7EC] py-4"
      >
        <option value="">Select Local Government</option>
        <option
          v-for="city in citiesList"
          :key="city.id"
          :value="city.id"
        >
          {{ city.name }}
        </option>
      </select>
      <div v-if="loadingCities" class="text-sm text-gray-500">Loading cities...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { use_tenant_profile } from "@/composables/auth/fetchProfile";
import { useGetLocation } from "@/composables/core/useGetLocation";

// Types
interface Coordinates {
  type: string;
  coordinates: number[];
}

interface State {
  id: string;
  name: string;
  countryId: string;
  countryCode: string;
  countryName: string;
  coordinates: Coordinates;
  stateCode: string;
  createdAt: string;
}

interface City {
  id: string;
  name: string;
  stateId: string;
  stateCode: string;
  stateName: string;
  countryId: string;
  countryCode: string;
  countryName: string;
  coordinates: Coordinates | null;
  createdAt: string;
}

// Props
const props = defineProps<{
  modelValue?: string; // for v-model of selected city ID
}>();

// Composables
const { loading: profileLoading, profileObj } = use_tenant_profile();
const {
  states: statesList,
  cities: citiesList,
  loadingStates,
  loadingCities,
  getCities,
} = useGetLocation();

// Local state
const selectedStateCode = ref('');
const selectedCityId = ref(props.modelValue || '');

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:state', stateCode: string): void;
  (e: 'citySelected', city: City | null): void;
}>();

// Handlers
const handleStateSelection = async () => {
  if (!selectedStateCode.value) {
    selectedCityId.value = '';
    emit('update:modelValue', '');
    emit('citySelected', null);
    return;
  }

  emit('update:state', selectedStateCode.value);
  await getCities(selectedStateCode.value);
};

const handleCitySelection = () => {
  emit('update:modelValue', selectedCityId.value);
  const selectedCity = citiesList.value.find(city => city.id === selectedCityId.value);
  emit('citySelected', selectedCity || null);
};

// Watchers
watch(() => props.modelValue, (newValue) => {
  if (newValue !== selectedCityId.value) {
    selectedCityId.value = newValue || '';
  }
});

// Initialize values from profile
watch(profileObj, (newProfile) => {
  if (newProfile?.city && !selectedStateCode.value) {
    selectedStateCode.value = newProfile.city.stateCode;
    selectedCityId.value = newProfile.city.id;
    handleStateSelection();
  }
}, { immediate: true });

// Reset city selection when cities list changes
watch(citiesList, (newCities) => {
  if (newCities.length === 0) {
    selectedCityId.value = '';
    emit('update:modelValue', '');
    emit('citySelected', null);
  }
});

onMounted(async () => {
  if (profileObj.value?.city && !selectedStateCode.value) {
    selectedStateCode.value = profileObj.value.city.stateCode;
    selectedCityId.value = profileObj.value.city.id;
    await handleStateSelection();
    handleCitySelection();
  }
});
</script>
