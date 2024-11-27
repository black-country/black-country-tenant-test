<template>
    <div class="mb-6">
      <h4 class="font- text-md mb-2">{{ title }}</h4>
      <div class="grid grid-cols-3 gap-4 items-center">
        <div
          v-for="item in items"
          :key="item.itemName"
          class="col-span-3 flex justify-between items-center py-2"
        >
          <span class="text-[#667185] text-sm">{{ item.itemName }}</span>
          <div class="flex space-x-20">
            <label class="flex items-center space-x-6">
              <span class="text-[#667185] text-sm">Good</span>
              <HomeActiveCheckbox
               :uncheckedObj="uncheckedObj"
               :checkedObj="checkedObj"
                @update="state => emitUpdateState(item, 'good', state)"
              />
            </label>
            <label class="flex items-center space-x-6">
              <span class="text-[#667185] text-sm">Needs repair</span>
              <HomeActiveCheckbox
                @update="state => emitUpdateState(item, 'bad', state)"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{
    title: string;
    items: { itemName: string; group: string }[];
    uncheckedObj: { type: Object, required: true },
    checkedObj: { type: Object, required: true }

  }>();
  
  const emits = defineEmits(['update-state']);
  
  const emitUpdateState = (item, state, isChecked) => {
    if (isChecked) {
      emits('update-state', { ...item, state });
    }
  };
  </script>
  