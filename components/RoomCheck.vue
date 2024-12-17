<template>
  <div class="p-6">
    <div v-for="(items, groupName) in checklistItems" :key="groupName" class="mb-8">
      <h2 class="text-xl font-semibold mb-4 capitalize">
        {{ groupName }} (If applicable)
      </h2>
      
      <div class="space-y-4">
        <div 
          v-for="item in items" 
          :key="item.id"
          class="grid grid-cols-[200px_1fr] gap-4 items-center"
        >
          <span class="text-gray-600 text-lg">{{ item.itemName }}</span>
          
          <div class="flex items-center gap-8">
            <label class="flex items-center gap-2">
              <input
                type="radio"
                :name="item.id"
                value="good"
                class="w-5 h-5 appearance-none border-2 border-gray-300 rounded-sm checked:bg-white checked:border-4 checked:border-gray-500"
                :checked="getItemState(groupName, item.id) === 'good'"
                @change="updateItemState(groupName, item.id, 'good')"
              />
              <span class="text-gray-600">Good</span>
            </label>

            <label class="flex items-center gap-2">
              <input
                type="radio"
                :name="item.id"
                value="bad"
                class="w-5 h-5 appearance-none border-2 border-gray-300 rounded-sm checked:bg-white checked:border-4 checked:border-gray-500"
                :checked="getItemState(groupName, item.id) === 'bad'"
                @change="updateItemState(groupName, item.id, 'bad')"
              />
              <span class="text-gray-600">Needs repair</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { GroupedChecklist, GroupedResponse } from '@/types/checklist'

const checklistItems = ref<GroupedChecklist>({})
const selectedStates = ref<GroupedResponse>({})

// Fetch initial checklist items
const fetchChecklistItems = async () => {
  try {
    // Replace with your actual API endpoint
    const response = await useFetch('/api/checklist-items')
    checklistItems.value = response.data.value as GroupedChecklist
  } catch (error) {
    console.error('Error fetching checklist items:', error)
  }
}

// Fetch saved states
const fetchSavedStates = async () => {
  try {
    // Replace with your actual API endpoint
    const response = await useFetch('/api/checklist-states')
    selectedStates.value = response.data.value as GroupedResponse
  } catch (error) {
    console.error('Error fetching saved states:', error)
  }
}

// Get the state of an item
const getItemState = (group: string, itemId: string): string | null => {
  const groupItems = selectedStates.value[group]
  if (!groupItems) return null
  
  const item = groupItems.find(item => item.id === itemId)
  return item?.state || null
}

// Update item state
const updateItemState = async (group: string, itemId: string, state: 'good' | 'bad') => {
  try {
    // Replace with your actual API endpoint
    const response = await useFetch('/api/update-state', {
      method: 'POST',
      body: {
        group,
        itemId,
        state
      }
    })
    
    // Update local state after successful API call
    if (!selectedStates.value[group]) {
      selectedStates.value[group] = []
    }
    
    const existingItemIndex = selectedStates.value[group].findIndex(
      item => item.id === itemId
    )
    
    if (existingItemIndex !== -1) {
      selectedStates.value[group][existingItemIndex].state = state
    } else {
      const item = checklistItems.value[group].find(item => item.id === itemId)
      if (item) {
        selectedStates.value[group].push({
          ...item,
          state
        })
      }
    }
  } catch (error) {
    console.error('Error updating state:', error)
  }
}

onMounted(async () => {
  await fetchChecklistItems()
  await fetchSavedStates()
})
</script>

<style scoped>
input[type="radio"]:checked {
  background-color: white;
  border: 4px solid #4B5563;
}
</style>