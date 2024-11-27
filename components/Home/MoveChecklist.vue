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
        <div v-if="Object.keys(checklist).length > 0">
          <HomeChecklistSection
            v-for="(items, group) in checklist"
            :key="group"
            :title="formatTitle(group)"
            :items="items"
            @update-state="updateChecklistState"
          />
        </div>
        <div v-else>
          <p class="text-gray-500">No checklist data available.</p>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';

  const emits = defineEmits(['update-state']);
  
  const props = defineProps({
    actionType: { type: String, default: '' },
    checklist: { type: Object, required: true },
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
  
  const formatTitle = (group) =>
    `${group.charAt(0).toUpperCase()}${group.slice(1)} (If applicable)`;
  </script>
  