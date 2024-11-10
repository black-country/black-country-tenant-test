<template>
    <div class="mb-6">
      <h4 class="font- text-md mb-2">{{ title }}</h4>
      
      <div class="grid grid-cols-3 gap-4 items-center">
        <div
          v-for="item in items"
          :key="item"
          class="col-span-3 flex justify-between items-center py-2"
        >
          <span class="text-[#667185] text-sm">{{ item }}</span>
          <div class="flex space-x-20">
            <label class="flex items-center space-x-6">
              <span class="text-[#667185] text-sm">Good</span>
              <HomeActiveCheckbox />
            </label>
            <label class="flex items-center space-x-6">
              <span class="text-[#667185] text-sm">Needs repair</span>
              <HomeActiveCheckbox />
            </label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps } from 'vue'
  import ActiveCheckbox from '~/components/ActiveCheckbox.vue'
  
  const props = defineProps<{
    title: string
    items: string[]
  }>()
  </script>
  