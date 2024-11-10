<template>
    <div class="mt-4">
      <h4 class="text-sm text-[#1D2739] font-medium mb-2">Time</h4>
      <div class="flex space-x-4">
        <button
          v-for="time in times"
          :key="time"
          @click="selectTime(time)"
          :class="{'bg-[#5B8469]  text-white': selectedTime === time}"
          class="px-4 py-2 rounded rounded-xl text-sm border-none outline-none">
          {{ time }}
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  const props = defineProps<{ selectedTime: string | null }>();
  const emit = defineEmits<{ (e: 'update:selectedTime', time: string | null): void }>();
  
  const times = ['10:00 AM', '12:00 PM', '03:00 PM'];
  
  function selectTime(time: string) {
    emit('update:selectedTime', time);
  }
  </script>
  