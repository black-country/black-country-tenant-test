<template>
    <div class="bg-white rounded-lg">
      <HomeCalendar class="" v-model:selectedDate="selectedDate" />
      <HomeTimePicker class="" v-model:selectedTime="selectedTime" />
      <HomeReasonInput class="" v-model:reason="reason" />
      <div class="flex justify-between py-10">
        <button @click="router.back()" class="px-10 py-2.5 text-gray-700 border-[0.5px] border-gray-300 text-sm rounded-lg">Cancel</button>
        <button @click="submit" :disabled="!selectedDate || !selectedTime || !reason" class="px-10 py-2.5 text-sm rounded-lg text-white bg-[#292929] rounded disabled:opacity-50">{{ loading ? 'processing...' : 'Send' }}</button>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import moment from 'moment';
import { useFetchMyHomeDetails } from "@/composables/modules/maintenance/useFetchHomeDetails";
  import { useCreateMoveOutNotice } from '@/composables/modules/home/useCreateMoveoutNotice'
  const { loading, setPayload, createMoveOutNotice } = useCreateMoveOutNotice()
  const { loading: fetchingHomeInfo, myHomeInfo } = useFetchMyHomeDetails();
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
      // console.log(selectedDate.value, selectedTime.value, reason.value )
      const payload = {
        rentalApplicationId: myHomeInfo?.value?.id,
        movoutDate: moment(selectedDate.value).format('YYYY-MM-DD'),
        moveOutTime: selectedTime.value,
        reason: reason.value
      }

      setPayload(payload)
      createMoveOutNotice()
      // router.push('/dashboard/home/notice-sent-success')
      //  alert(`Move-out notice submitted for ${selectedDate.value.toDateString()} at ${selectedTime.value}. Reason: ${reason.value}`);
    }
  }
  </script>
  