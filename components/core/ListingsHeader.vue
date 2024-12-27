<!-- components/ListingsHeader.vue -->
<template>
  <div class="px-4 py-4 space-y-4">
    <!-- Header and Icons -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Listings</h1>
      <div class="flex items-center gap-x-4">
        <div class="flex items-center gap-x-2 text-gray-600">
          <svg
            class="w-5 h-5"
            viewBox="0 0 56 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50.5614 27.892V21.4054C50.5614 16.9858 50.5614 14.776 49.2296 13.4029C47.8978 12.0299 45.7544 12.0299 41.4675 12.0299H36.7419C34.6562 12.0299 34.6389 12.0259 32.7635 11.0852L25.1892 7.28625C22.0266 5.70011 20.4454 4.90703 18.7608 4.96216C17.0763 5.01727 15.547 5.91211 12.4885 7.70182L9.69692 9.33527C7.45028 10.6499 6.32696 11.3072 5.70937 12.4007C5.0918 13.4941 5.0918 14.8258 5.0918 17.489V36.2125C5.0918 39.7118 5.0918 41.4615 5.86992 42.4354C6.3877 43.0831 7.11329 43.519 7.91546 43.6633C9.121 43.8802 10.597 43.0168 13.5489 41.2891C15.5534 40.1165 17.4825 38.8983 19.8805 39.2287C21.8899 39.5054 23.7571 40.776 25.5531 41.6768"
              stroke="#1D2739"
              stroke-width="3.41022"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.7324 4.95947V39.1389"
              stroke="#1D2739"
              stroke-width="3.41022"
              stroke-linejoin="round"
            />
            <path
              d="M34.6475 11.7954V25.4672"
              stroke="#1D2739"
              stroke-width="3.41022"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M46.2574 46.2765L50.4524 50.421M48.6723 40.508C48.6723 44.9792 45.0485 48.6039 40.5784 48.6039C36.1083 48.6039 32.4844 44.9792 32.4844 40.508C32.4844 36.0367 36.1083 32.4121 40.5784 32.4121C45.0485 32.4121 48.6723 36.0367 48.6723 40.508Z"
              stroke="#1D2739"
              stroke-width="3.41022"
              stroke-linecap="round"
            />
          </svg>

          <!-- <Map class="w-5 h-5" /> -->
          <span class="text-sm">Map view</span>
        </div>
        <svg
          class="w-6 h-6 text-gray-600"
          viewBox="0 0 56 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44.8259 9.4887C38.7291 5.749 33.408 7.25605 30.2115 9.65662C28.9006 10.6409 28.2454 11.1331 27.8598 11.1331C27.4742 11.1331 26.819 10.6409 25.5081 9.65662C22.3117 7.25605 16.9905 5.749 10.8938 9.4887C2.8926 14.3967 1.08211 30.5883 19.5378 44.2485C23.053 46.8503 24.8106 48.1512 27.8598 48.1512C30.909 48.1512 32.6666 46.8503 36.1819 44.2485C54.6376 30.5883 52.827 14.3967 44.8259 9.4887Z"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
          />
        </svg>

        <!-- <Heart class="w-6 h-6 text-gray-600" /> -->
        <!-- <Bell class="w-6 h-6 text-gray-600" /> -->
        <svg
          class="w-6 h-6 text-gray-600"
          viewBox="0 0 56 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.2692 33.9865C5.78574 37.1558 7.94721 39.3556 10.5937 40.4519C20.7397 44.6551 34.8589 44.6551 45.0047 40.4519C47.6513 39.3556 49.8127 37.1558 49.3294 33.9865C49.0322 32.0388 47.5631 30.4169 46.4746 28.8332C45.0489 26.7334 44.9072 24.4429 44.907 22.0062C44.907 12.5891 37.2476 4.95508 27.7993 4.95508C18.351 4.95508 10.6916 12.5891 10.6916 22.0062C10.6914 24.4429 10.5497 26.7334 9.12399 28.8332C8.03551 30.4169 6.56632 32.0388 6.2692 33.9865Z"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.7051 43.6045C19.7474 47.5267 23.4237 50.4249 27.799 50.4249C32.1743 50.4249 35.8505 47.5267 36.8929 43.6045"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <!-- Search Bar and Filter -->
    <div class="flex gap-x-2">
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none"
        />
        <svg
          class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
          viewBox="0 0 37 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.5371 26.8794L33.3576 33.6998"
            stroke="#667185"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M30.3248 17.0281C30.3248 9.49445 24.2176 3.38721 16.6839 3.38721C9.15021 3.38721 3.04297 9.49445 3.04297 17.0281C3.04297 24.5618 9.15021 30.669 16.6839 30.669C24.2176 30.669 30.3248 24.5618 30.3248 17.0281Z"
            stroke="#667185"
            stroke-width="3.41022"
            stroke-linejoin="round"
          />
        </svg>

        <!-- <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" /> -->
      </div>
      <button class="p-2.5 bg-gray-100 rounded-lg">
        <svg
          class="w-5 h-5 text-gray-700"
          viewBox="0 0 47 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.2406 8.38721H6.29492"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.4515 36.8057H6.29492"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M40.3976 36.8057H32.8193"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M40.3978 22.5967H21.4521"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M40.3966 8.38721H36.6074"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10.0841 22.5967H6.29492"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M28.0821 4.59717C28.9648 4.59717 29.4062 4.59717 29.7544 4.74138C30.2186 4.93366 30.5875 5.3025 30.7798 5.76672C30.9239 6.11489 30.9239 6.55627 30.9239 7.43902V9.33359C30.9239 10.2163 30.9239 10.6577 30.7798 11.0059C30.5875 11.4701 30.2186 11.8389 29.7544 12.0312C29.4062 12.1754 28.9648 12.1754 28.0821 12.1754C27.1994 12.1754 26.758 12.1754 26.4098 12.0312C25.9456 11.8389 25.5767 11.4701 25.3844 11.0059C25.2402 10.6577 25.2402 10.2163 25.2402 9.33359V7.43902C25.2402 6.55627 25.2402 6.11489 25.3844 5.76672C25.5767 5.3025 25.9456 4.93366 26.4098 4.74138C26.758 4.59717 27.1994 4.59717 28.0821 4.59717Z"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M24.294 33.0161C25.1767 33.0161 25.6181 33.0161 25.9663 33.1603C26.4305 33.3526 26.7994 33.7215 26.9917 34.1856C27.1359 34.5339 27.1359 34.9753 27.1359 35.858V37.7525C27.1359 38.6352 27.1359 39.0766 26.9917 39.4249C26.7994 39.889 26.4305 40.2579 25.9663 40.4502C25.6181 40.5944 25.1767 40.5944 24.294 40.5944C23.4113 40.5944 22.9699 40.5944 22.6217 40.4502C22.1575 40.2579 21.7886 39.889 21.5963 39.4249C21.4521 39.0766 21.4521 38.6352 21.4521 37.7525V35.858C21.4521 34.9753 21.4521 34.5339 21.5963 34.1856C21.7886 33.7215 22.1575 33.3526 22.6217 33.1603C22.9699 33.0161 23.4113 33.0161 24.294 33.0161Z"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M18.6104 18.8066C19.4932 18.8066 19.9345 18.8066 20.2827 18.9509C20.7469 19.1431 21.1158 19.512 21.3081 19.9762C21.4523 20.3244 21.4523 20.7658 21.4523 21.6485V23.5431C21.4523 24.4257 21.4523 24.8672 21.3081 25.2154C21.1158 25.6796 20.7469 26.0484 20.2827 26.2407C19.9345 26.3849 19.4932 26.3849 18.6104 26.3849C17.7277 26.3849 17.2863 26.3849 16.9381 26.2407C16.4739 26.0484 16.105 25.6796 15.9128 25.2154C15.7686 24.8672 15.7686 24.4257 15.7686 23.5431V21.6485C15.7686 20.7658 15.7686 20.3244 15.9128 19.9762C16.105 19.512 16.4739 19.1431 16.9381 18.9509C17.2863 18.8066 17.7277 18.8066 18.6104 18.8066Z"
            stroke="#1D2739"
            stroke-width="3.41022"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <!-- <SlidersHorizontal class="w-5 h-5 text-gray-700" /> -->
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-x-4 overflow-x-auto pb-1 no-scrollbar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="[
          'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap',
          activeTab === tab.id ? 'bg-[#5B8469] text-white' : 'text-gray-600',
        ]"
        @click="activeTab = tab.id"
      >
        <span class="flex items-center gap-x-1">
          {{ tab.name }}
          <svg
            v-if="tab.hasDropdown"
            class="w-4 h-4"
            viewBox="0 0 23 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.8158 2.17927C20.8158 2.17927 14.1183 11.2731 11.7219 11.2731C9.32531 11.2731 2.62793 2.1792 2.62793 2.1792"
              stroke="#1D2739"
              stroke-width="3.41022"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <!-- <ChevronDown v-if="tab.hasDropdown" class="w-4 h-4" /> -->
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { Map, Heart, Bell, Search, SlidersHorizontal, ChevronDown } from 'lucide-vue-next'

interface Tab {
  id: string;
  name: string;
  hasDropdown?: boolean;
}

const tabs: Tab[] = [
  { id: "all", name: "All" },
  { id: "mainland", name: "Mainland" },
  { id: "ireland", name: "Ireland" },
  { id: "new", name: "New Listings", hasDropdown: true },
];

const searchQuery = ref("");
const activeTab = ref("all");
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-x: hidden;
  scrollbar-width: none;
}
</style>
