<template>
    <div v-if="isFilterModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-1/2 relative" @click.stop>
        <!-- Close modal when clicking outside -->
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Filters</h3>
          <button @click="resetFilters" class="text-blue-500">Reset</button>
        </div>
  
        <div class="mb-6">
          <h4 class="text-md font-semibold mb-2">Property type</h4>
          <ul>
            <li v-for="(property, index) in propertyTypes" :key="index" class="flex items-center mb-2">
              <input type="checkbox" v-model="selectedProperties" :value="property" />
              <label class="ml-2">{{ property }}</label>
            </li>
          </ul>
        </div>
  
        <div class="flex justify-between">
          <button @click="resetFilters" class="bg-gray-200 p-2 rounded-md">Reset</button>
          <button @click="applyFilters" class="bg-black text-white p-2 rounded-md">Show {{ filteredResults }} homes</button>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  
  export default {
    setup() {
      const isFilterModalVisible = ref(false);
      const propertyTypes = ref([
        'Single-family home',
        'Apartment',
        'Condominium',
        'Townhouse',
        'Duplex',
        'Villa',
        'Bungalow',
        'Loft'
      ]);
      const selectedProperties = ref<string[]>([]);
      const filteredResults = ref(645);
  
      const resetFilters = () => {
        selectedProperties.value = [];
      };
  
      const applyFilters = () => {
        isFilterModalVisible.value = false;
        // Handle filter application logic
        console.log('Selected Filters:', selectedProperties.value);
      };
  
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.modal-content')) {
          isFilterModalVisible.value = false;
        }
      };
  
      onMounted(() => {
        document.addEventListener('click', handleClickOutside);
      });
  
      return {
        isFilterModalVisible,
        propertyTypes,
        selectedProperties,
        filteredResults,
        resetFilters,
        applyFilters
      };
    }
  };
  </script>
  
  <style scoped>
  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 24px;
  }
  </style>
  