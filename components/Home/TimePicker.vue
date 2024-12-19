<template>
  <div class="mt-4 border-[0.5px] border-gray-50 bg-white rounded-lg py-3">
    <h4 class="text-sm text-[#1D2739] pl-6 font-semibold mb-2">Time</h4>
    <div class="overflow-x-auto px-3">
      <button
        v-for="time in times"
        :key="time"
        @click="selectTime(time)"
        :class="{'bg-[#5B8469] text-white': selectedTime === time}"
        class="py-2  rounded-lg text-sm px-3 border-none outline-none mb-2">
        {{ time }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';

// Define props and emits
const props = defineProps<{ selectedTime: string | null }>();
const emit = defineEmits<{ (e: 'update:selectedTime', time: string | null): void }>();

// Generate times spanning 24 hours
const times = Array.from({ length: 24 }, (_, index) => {
  const hour = index % 12 || 12; // Convert 24-hour time to 12-hour format
  const period = index < 12 ? 'AM' : 'PM';
  return `${hour}:00 ${period}`;
});

function selectTime(time: string) {
  emit('update:selectedTime', time);
}
</script>
