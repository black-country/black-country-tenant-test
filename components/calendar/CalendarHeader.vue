// components/calendar/CalendarHeader.vue
<template>
  <div class="p-4 border-b flex items-center justify-between">
    <div class="flex items-center gap-4">
      <button class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
        Grid
      </button>
      <button class="px-4 py-2 rounded-lg bg-green-700 text-white">
        Calendar
      </button>
    </div>
    <div class="flex items-center gap-4">
      <button 
        class="p-2 hover:bg-gray-100 rounded-full"
        @click="$emit('navigate', 'prev')"
      >
        <Icon name="heroicons:chevron-left" class="w-5 h-5" />
      </button>
      <span class="text-lg font-medium">{{ currentMonth }} {{ currentYear }}</span>
      <button 
        class="p-2 hover:bg-gray-100 rounded-full"
        @click="$emit('navigate', 'next')"
      >
        <Icon name="heroicons:chevron-right" class="w-5 h-5" />
      </button>
      <button class="px-4 py-2 rounded-lg bg-green-700 text-white ml-4">
        Week
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentMonth: string
  currentYear: number
}>()

defineEmits<{
  navigate: [direction: 'prev' | 'next']
}>()
</script>