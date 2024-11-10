<template>
    <div class="bg-white rounded-lg">
      <HomeCalendar class="" v-model:selectedDate="selectedDate" />
      <HomeTimePicker class="px-8" v-model:selectedTime="selectedTime" />
      <HomeReasonInput class="px-8" v-model:reason="reason" />
      <div class="flex px-8 justify-between pt-10">
        <button @click="cancel" class="px-10 py-2.5 text-gray-700 border-[0.5px] border-gray-300 text-sm rounded-lg">Cancel</button>
        <button @click="submit" :disabled="!selectedDate || !selectedTime || !reason" class="px-10 py-2.5 text-sm rounded-lg text-white bg-[#292929] rounded disabled:opacity-50">Send</button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { roundToNearestHours } from 'date-fns';
import { ref } from 'vue';

  const selectedDate = ref<Date | null>(null);
  const selectedTime = ref<string | null>(null);
  const reason = ref<string>('');
  const router = useRouter()
  
  function cancel() {
    selectedDate.value = null;
    selectedTime.value = null;
    reason.value = '';
  }
  
  function submit() {
    if (selectedDate.value && selectedTime.value && reason.value) {
      router.push('/dashboard/home/notice-sent-success')
      //  alert(`Move-out notice submitted for ${selectedDate.value.toDateString()} at ${selectedTime.value}. Reason: ${reason.value}`);
    }
  }
  </script>
  