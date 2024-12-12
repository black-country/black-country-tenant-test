<template>
    <div class="bg-white rounded-lg p-6 h-[500px] overflow-y-auto shadow">
        <h2 class="text- text-[#1D2739] font-medium mb-6">Pick a visitation day</h2>

        <div v-if="!fetchingAvailabilities" class="flex items-center justify-between mb-4">
            <div class="text-[#1D2739] bg-white border border-[#F0F2F5] rounded-lg text-sm px-4 py-2">
                {{ formattedMonth }}
            </div>
            <div class="flex gap-2">
                <button @click="navigateMonth('prev')" class="rounded-lg bg-white">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="43" height="43" rx="7.5" stroke="#F0F2F5"/>
                        <path d="M24.5 17C24.5 17 19.5 20.6824 19.5 22C19.5 23.3177 24.5 27 24.5 27" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button @click="navigateMonth('next')" class="rounded-lg bg-white">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="43" height="43" rx="7.5" stroke="#F0F2F5"/>
                        <path d="M19.5 17C19.5 17 24.5 20.6824 24.5 22C24.5 23.3177 19.5 27 19.5 27" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="fetchingAvailabilities" class="flex justify-center items-center h-64">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5B8469]"></div>
        </div>

        <div v-else class="mb-8">
            <div class="grid grid-cols-7 mb-2">
                <div v-for="day in weekDays" :key="day" class="text-center text-gray-500 text-sm py-2">
                    {{ day }}
                </div>
            </div>

            <div v-for="(week, weekIndex) in getDaysInMonth" :key="weekIndex" class="grid grid-cols-7">
    <div v-for="(day, dayIndex) in week" :key="`${weekIndex}-${dayIndex}`"
        class="aspect-square flex items-center justify-center">
        <button v-if="day" 
            @click="handleDateSelect(day.fullDate)" 
            :disabled="!day.isAvailable"
            class="w-10 h-10 rounded-full flex items-center justify-center" 
            :class="{
                'bg-[#EBF0EC] text-[#326543]': day?.isAvailable && !day?.isWithinRange,
                'bg-[#5B8469] text-white': day?.isAvailable && day?.isWithinRange,
                'text-gray-400': !day?.isAvailable,
                'border-2 border-[#5B8469] text-[#5B8469]': selectedDate === day?.fullDate
            }">
            {{ day.date }}
        </button>
    </div>
</div>


            <!-- <div v-for="(week, weekIndex) in getDaysInMonth" :key="weekIndex" class="grid grid-cols-7">
                <div v-for="(day, dayIndex) in week" :key="`${weekIndex}-${dayIndex}`"
                    class="aspect-square flex items-center justify-center">
                    <button v-if="day" 
                        @click="handleDateSelect(day.fullDate)" 
                        :disabled="!day.isAvailable"
                        class="w-10 h-10 rounded-full flex items-center justify-center" 
                        :class="{
                        'bg-[#EBF0EC] text-[#326543]': day?.isAvailable && !day?.isWithinRange,
                        'bg-[#5B8469] text-white': day?.isAvailable && day?.isWithinRange,
                        'text-gray-400': !day?.isAvailable,
                        'bg-[#5B8469] text-white': selectedDate === day?.fullDate
                        }">
                        {{ day.date }}
                    </button>
                </div>
            </div> -->
        </div>
<!-- {{ availabilityTimes }} -->
<!-- {{ availabilityTimesList }} -->
  <!-- {{ filteredAvailabilityTimes }} -->
    <!-- {{ processAvailabilityTimes(availabilityTimes) }} -->
<h3 class="text-[#1D2739] font-medium mb-4">Pick a time</h3>
<div v-if="selectedDate && availabilityTimes.length > 0 && !fetchingAvailabilityTimes" class="mb-6">
    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="slot in processedAvailabilityTimes"
        :key="slot.time"
        @click="selectedTime = slot.time"
        class="px-4 py-3 rounded-lg text-sm"
        :class="{
          'bg-[#5B8469]': selectedTime === slot.time,
          'bg-[#EBF0EC] text-[#326543]': selectedTime !== slot.time && slot.isAvailable,
          'bg-gray-200 text-gray-700 cursor-not-allowed opacity-50': !slot.isAvailable
        }"
        :disabled="!slot.isAvailable"
      >
        {{ slot.time }}
      </button>
    </div>
  </div>
        <!-- <div v-if="selectedDate && availabilityTimes.length > 0 && !fetchingAvailabilityTimes" class="mb-6">
            <div class="grid grid-cols-3 gap-2">
                <button
                    v-for="slot in processAvailabilityTimes(availabilityTimes)"
                    :key="slot.time"
                    @click="selectedTime = slot.time"
                    class="px-4 py-3 rounded-lg text-sm"
                    :class="{
                        'bg-[#5B8469]': selectedTime === slot.time,
                        'bg-[#EBF0EC] text-[#326543]': selectedTime !== slot.time && slot.isAvailable,
                        'bg-gray-200 text-gray-700 cursor-not-allowed opacity-50': !slot.isAvailable
                    }"
                    :disabled="!slot.isAvailable"
                >
                    {{ slot.time }}
                </button>
            </div>
        </div> -->

        <div v-else-if="fetchingAvailabilityTimes" class="animate-pulse flex space-x-4">
          <div class="rounded-md bg-slate-200 h-20 w-full"></div>
        </div>

        <div v-else class="flex justify-center text-xs border-gray-100 border-[0.5px] py-4 rounded-lg items-center flex-col">
            <img class="h-20 w-20" src="@/assets/icons/event-illustrations.svg" />
            AVAILABILITY TIMES NOT FOUND
        </div>

        <div v-if="selectedDate && selectedTime" class="mt-6">
            <button
                @click="handleSchedule"
                class="w-full bg-[#5B8469] disabled:cursor-not-allowed disabled:opacity-25 text-white rounded-lg py-3 text-sm font-medium"
                :disabled="scheduling"
            >
                {{ scheduling ? 'Scheduling...' : 'Schedule Visitation' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCreateVisitation } from "@/composables/modules/visitation/create"
import { useCalendar } from "@/composables/core/useCalendar"
import { useProcessAvailabilityTimes } from '@/composables/core/useProcessAvailabilityTimes';

const { processAvailabilityTimes } = useProcessAvailabilityTimes();

const route = useRoute()
const emit = defineEmits(['close'])

// Get house ID from route params
const houseId = route.params.houseId as string

// Process the availability times
// Initialize calendar composable
const {
    formattedMonth,
    selectedDate,
    selectedTime,
    weekDays,
    getDaysInMonth,
    navigateMonth,
    handleDateSelect,
    availabilityTimesList,
    fetchingAvailabilities,
    availabilityTimes,
    fetchingAvailabilityTimes,
    // filteredAvailabilityTimes
} = useCalendar(houseId)

processAvailabilityTimes(availabilityTimes.value);

// Initialize visitation composable
const { createVisitation, scheduling } = useCreateVisitation()

// Handle schedule button click
const handleSchedule = async () => {
    if (!selectedDate.value || !selectedTime.value) return

    const payload = {
        date: selectedDate.value,
        time: selectedTime.value,
        houseId
    }

    try {
        await createVisitation(payload)
        emit('close')
    } catch (error) {
        console.error('Error scheduling visitation:', error)
    }
}

// Watch for availability loading state
watch(fetchingAvailabilities, (loading) => {
    if (!loading) {
        // You can add any additional logic here when availability data is loaded
        console.log('Availability data loaded')
    }
})

// Processed times as a computed property
const processedAvailabilityTimes = computed(() =>
  processAvailabilityTimes(availabilityTimes.value)
);
</script>