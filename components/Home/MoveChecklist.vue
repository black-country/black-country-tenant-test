<template>
    <section class="bg-white rounded-lg">
      <h2 class="text-lg font-medium border-[0.5px] px-6 rounded-lg py-3 border-gray-50 mb-4">
        {{ actionType === 'move-in' ? 'Move - in' : 'Move - out' }} checklist
      </h2>
  
      <div class="border-[0.5px] border-gray-100 rounded-lg p-5 bg-white">
        <div class="mb-6">
          <h3 class="text-md">
            Significance of {{ actionType === 'move-in' ? 'move - in' : 'move - out' }} checklist.
          </h3>
          <p class="text-gray-600 text-sm">
            The purpose of a checklist is to document the property's condition at
            {{ actionType === 'move-in' ? 'move in' : 'move out' }}, ensuring accountability, legal protection, and effective maintenance planning.
          </p>
        </div>
        <!-- <div v-if="Object.keys(checklist).length > 0"> -->
          <!-- <HomeChecklistSection
            v-for="(items, group) in checklist"
            :key="group"
            :title="formatTitle(group)"
            :data="itemsData"
            @update-state="updateChecklistState"
            :rentalChecklist="rentalChecklist"
            :uncheckedObj="checklist"
            :checkedObj="rentalChecklist"
          /> -->
          <!-- <span class="text-red-500">{{ itemsData }}</span>
          <span class="text-green-500">{{ checklist }}</span> -->
          <HomeChecklistSection :title="'Property Inspection'" :data="checklist" @update-state="updateChecklistState" />
        <!-- </div> -->
        <!-- <div v-else>
          <p class="text-gray-500">No checklist data available.</p>
        </div> -->
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';

  const emits = defineEmits(['update-state']);
  
  const props = defineProps({
    actionType: { type: String, default: '' },
    checklist: { type: Object, required: true },
    rentalChecklist: { type: Object, required: true }
  });
  
  const checklistState = ref([]); // Track all changes dynamically
  

  const updateChecklistState = (item) => {
  const existingIndex = checklistState.value.findIndex(
    (i) => i.itemName === item.itemName && i.group === item.group
  );
  if (existingIndex > -1) {
    checklistState.value[existingIndex] = item; // Update existing item
  } else {
    checklistState.value.push(item); // Add new item
  }

  emits('update-state', checklistState.value);
};



const itemsData = ref({
  kitchen: [
    { id: 'b0f95fc7-b362-4f70-9b43-79114c477092', itemName: 'floors', group: 'kitchen', state: 'good', createdAt: '2024-12-16T22:48:37.065Z' },
    { id: '3b0e3ddd-f520-439b-abe7-304f77b48381', itemName: 'walls', group: 'kitchen', state: 'good', createdAt: '2024-12-16T22:48:37.065Z' },
    { id: 'dc901ca6-f986-462b-87a5-32c2299846f1', itemName: 'stove/oven', group: 'kitchen', state: 'bad', createdAt: '2024-12-16T22:48:37.065Z' },
    { id: '538c9dbe-6268-4dc0-a5ba-c25a5dbef4d5', itemName: 'light fixtures', group: 'kitchen', state: 'bad', createdAt: '2024-12-16T22:48:37.065Z' }
  ],
  bathroom: [
    { id: 'dcba3bd4-0a14-47f6-9ee2-0eb780843986', itemName: 'floors', group: 'bathroom', state: 'bad', createdAt: '2024-12-16T23:23:47.542Z' },
    { id: '81a70db6-6091-4598-8619-3334ebb878ec', itemName: 'walls', group: 'bathroom', state: 'bad', createdAt: '2024-12-16T23:23:47.542Z' }
  ]
});

// Method to handle the update from the child component
const handleUpdateState = (updatedItem) => {
  console.log(updatedItem); // Handle the updated item and its state
};
  
  const formatTitle = (group) =>
    `${group.charAt(0).toUpperCase()}${group.slice(1)} (If applicable)`;
  </script>
  