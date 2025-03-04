<template>
  <main>
    <TopNavBar />
    <div class="flex items-center justify-between space-x-4 container py-5 mx-auto px-5 lg:px-0">
      <!-- Buttons for Saved Search and Saved Listings -->
      <div class="space-x-2 space-y-3 lg:space-y-0">
        <button
          class="text-[#1A1A1A] border px-4 py-2 rounded-md"
          :class="{
            'bg-[#F0F2F5] border-[#F0F2F5]': selectedButton === 'search',
            'bg-transparent border-[#ccc]': selectedButton !== 'search',
          }"
          @click="setSelectedButton('search')"
        >
          Saved Search
        </button>
        <button
          class="text-white px-4 py-2 rounded-md"
          :class="{
            'bg-[#5B8469]': selectedButton === 'listings',
            'bg-[#ccc]': selectedButton !== 'listings',
          }"
          @click="setSelectedButton('listings')"
        >
          Saved Listings
        </button>
      </div>

      <!-- Tabs for All, Mainland, and Island -->
      <div class="flex items-center space-x-4">
        <button
          class="text-[#1A1A1A] px-4 py-2"
          :class="{
            'font-bold border-b-4 border-[#1A1A1A]': activeTab === 'all',
            'font-normal border-b-0': activeTab !== 'all',
          }"
          @click="setActiveTab('all')"
        >
          All
        </button>
        <button
          class="text-[#1A1A1A] px-4 py-2"
          :class="{
            'font-bold border-b-4 border-[#1A1A1A]': activeTab === 'mainland',
            'font-normal border-b-0': activeTab !== 'mainland',
          }"
          @click="setActiveTab('mainland')"
        >
          Mainland
        </button>
        <button
          class="text-[#1A1A1A] px-4 py-2"
          :class="{
            'font-bold border-b-4 border-[#1A1A1A]': activeTab === 'island',
            'font-normal border-b-0': activeTab !== 'island',
          }"
          @click="setActiveTab('island')"
        >
          Island
        </button>
      </div>
    </div>

    <!-- Conditionally rendered components -->
    <SavedSearch
      v-if="selectedButton === 'search'"
      :propertiesList="savedSearchProperties"
      :loadingProperties="loadingSavedSearch"
    />
    <BookmarkedProperties
      v-if="selectedButton === 'listings'"
      :propertiesList="bookmarkedList"
      :loadingProperties="loading"
    />
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGetBookmarkedHouses } from '@/composables/modules/property/fetchBookMarkedHouses';

const { bookmarkedList, loading } = useGetBookmarkedHouses();

const savedSearchProperties = ref([]);
const loadingSavedSearch = ref(false);

const selectedButton = ref<'search' | 'listings'>('listings');
const activeTab = ref<'all' | 'mainland' | 'island'>('mainland');

// Function to set the selected button
const setSelectedButton = (button: 'search' | 'listings') => {
  selectedButton.value = button;
};

// Function to set the active tab
const setActiveTab = (tab: 'all' | 'mainland' | 'island') => {
  activeTab.value = tab;
};
</script>
