<template>
    <div class="mt-4">
      <label for="reason" class="text-sm text-[#1D2739] font-medium mb-2">Reason for moving out</label>
      <textarea
        id="reason"
        class="w-full mt-2 p-3 text-sm border-[#5B8469] outline-none border-gray-50 border-[0.5px] bg-[#F0F2F5] rounded-lg resize-none"
        rows="6"
        placeholder="Enter your reason for moving out"
        v-model="internalReason"
        @input="updateReason">
      </textarea>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps<{ reason: string }>();
  const emit = defineEmits<{ (e: 'update:reason', reason: string): void }>();
  const internalReason = ref(props.reason);
  
  watch(() => props.reason, (newReason) => {
    internalReason.value = newReason;
  });
  
  function updateReason() {
    emit('update:reason', internalReason.value);
  }
  </script>
  