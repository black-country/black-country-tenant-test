<template>
    <div class="mb-6">
      <h4 class="font- text-md mb-2">{{ title }}</h4>
      <!-- {{ data }} -->
      <div v-if="Object.keys(itemGroups).length > 0" class="grid grid-cols-3 gap-4 items-center">
        <div
          v-for="(items, group) in itemGroups"
          :key="group"
          class="col-span-3 flex flex-col py-2"
        >
          <h5 class="text-lg font-semibold">{{ group }}</h5>
          
          <div
            v-for="item in items"
            :key="item.id"
            class="flex justify-between items-center py-2"
          >
            <span class="text-[#667185] text-sm">{{ item.itemName }}</span>
            
            <div class="flex space-x-6">
              <label class="flex items-center space-x-6">
                <span class="text-[#667185] text-sm">Good</span>
                <input
                  type="radio"
                  class="w-6 h-6 border-gray-300 focus:ring-4 focus:ring-blue-500 checked:bg-blue-600 checked:border-transparent transition-all duration-300 ease-in-out transform hover:scale-110"
                  :name="`item-${item.itemName}-${group}`"
                  value="good"
                  v-model="item.state"
                  @change="emitUpdateState(item, 'good')"
                />
              </label>
              
              <label class="flex items-center space-x-6">
                <span class="text-[#667185] text-sm">Needs repair</span>
                <input
                  type="radio"
                  class="w-6 h-6 border-gray-300 focus:ring-4 focus:ring-blue-500 checked:bg-blue-600 checked:border-transparent transition-all duration-300 ease-in-out transform hover:scale-110"
                  :name="`item-${item.itemName}-${group}`"
                  value="bad"
                  v-model="item.state"
                  @change="emitUpdateState(item, 'bad')"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits, computed } from 'vue';
  
  // Props to receive the data and title
  const props = defineProps<{
    title: string;
    data: { 
      [key: string]: { 
        id: string; 
        itemName: string; 
        group: string; 
        state: string; 
        createdAt: string 
      }[] 
    };
  }>();
  
  // // Computed property to handle grouping of items
  // const itemGroups = computed(() => {
  //   return props.data; // Directly using data as it's already grouped
  // });

  // Local state to handle data reactivity
const itemGroups = ref<{ [key: string]: any[] }>({});

// Watcher to process props.data whenever it changes
watch(
  () => props.data,
  (newData) => {
    // Ensure the data is reactive
    itemGroups.value = JSON.parse(JSON.stringify(newData));
  },
  { immediate: true, deep: true }
);

  
  // Emits function to update the state
  const emits = defineEmits(['update-state']);
  
  // Method to emit the update of state to the parent component
  const emitUpdateState = (item, state) => {
    emits('update-state', { ...item, state });
  };
  </script>
  
  <style scoped>
  /* Optional: Customize styles */
  </style>
  