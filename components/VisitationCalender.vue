<!-- <template>
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
        <section class="mb-6" v-else>
            <div class="animate-pulse flex space-x-4 h-20 bg-slate-200 rounded"></div>
       </section>

        <div v-if="!fetchingAvailabilities" class="mb-8">
            <div class="grid grid-cols-7 mb-2">
                <div v-for="day in weekDays" :key="day" class="text-center text-gray-500 text-sm py-2">
                    {{ day }}
                </div>
            </div>

            <div v-for="(week, weekIndex) in getDaysInMonth" :key="weekIndex" class="grid grid-cols-7">
                <div v-for="(day, dayIndex) in week" :key="`${weekIndex}-${dayIndex}`"
                    class="aspect-square flex items-center justify-center">
                    <button v-if="day" @click="handleDateSelect(day.fullDate)" :disabled="!day.isAvailable"
                        class="w-10 h-10 rounded-full flex items-center justify-center" :class="{
                            'bg-[#EBF0EC] text-[#326543]': day.isAvailable,
                            'text-gray-400': !day.isAvailable,
                            'bg-[#5B8469] text-white': selectedDate === day.fullDate,
                            'bg-[#EBF0EC] text-[#5B8469]': day.isAvailable && selectedDate !== day.fullDate,
                        }">
                        {{ day.date }}
                    </button>
                </div>
            </div>
        </div>
        <section class="mb-6"  v-else>
            <div class="animate-pulse flex space-x-4 h-60 bg-slate-200 rounded"></div>
       </section>

    
        <div class="mb-6" v-if="selectedDate">
            <h2 class="text-sm font-semibold">Pick a visitation time</h2>
            <p class="text-gray-500 text-sm mb-4">
                Please note that time selected would be 30 minutes per visitation.
            </p>
            <div v-if="!fetchingAvailabilityTimes" class="grid grid-cols-5 gap-4 mb-8">
                <button v-for="slot in availabilityTimesList" :key="slot.time" @click="selectedTime = slot.time"
                    :disabled="!slot.isAvailable" class="py-2 px-4 rounded-lg text-sm" :class="{
                        'bg-[#5B8469] text-white':
                            selectedTime === slot.time && slot.isAvailable,
                        'bg-gray-50 hover:bg-[#EBF0EC]':
                            selectedTime !== slot.time && slot.isAvailable,
                        'bg-gray-100 text-gray-400 cursor-not-allowed': !slot.isAvailable,
                    }">
                    {{ slot.time }}
                </button>
            </div>
            <section v-else>
            <div class="animate-pulse flex space-x-4 h-60 bg-slate-200 rounded"></div>
           </section>
        </div>

        <div class="flex justify-between gap-4">
            <button type="button" @click="emit('close')" class="py-2.5 text-sm w-full text-gray-700 bg-gray-50 rounded-lg">
                Cancel
            </button>
            <button type="button" @click="handleSchedule" :disabled="!selectedDate || !selectedTime || scheduling"
                class="w-full text-sm disabled:cursor-not-allowed disabled:opacity-25 py-3 rounded-lg" :class="{
                    'bg-[#292929] text-white':
                        selectedDate && selectedTime,
                    'bg-gray-200 text-gray-500 cursor-not-allowed':
                        !selectedDate || !selectedTime,
                }">
                 {{  scheduling ? 'scheduling..' : 'Schedule a visit' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute();
import { useCreateVisitation } from "@/composables/modules/visitation/create";
import { useCalendar } from "@/composables/core/useCalendar";
const { createVisitation, scheduling } = useCreateVisitation();
const houseId = route.params.houseId as string;

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
    fetchingAvailabilityTimes
} = useCalendar(houseId);


const emit = defineEmits(['close'])

const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) return;

    const payload = {
        date: selectedDate.value,
        time: selectedTime.value,
    };
    await createVisitation(payload);
};
</script> -->


<template>
    <div class="bg-white rounded-lg p-6 h-[500px] overflow-y-auto shadow">
        <h2 class="text-[#1D2739] font-medium mb-6">Pick a visitation day</h2>

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

        <section class="mb-6" v-else>
            <div class="animate-pulse flex space-x-4 h-20 bg-slate-200 rounded"></div>
       </section>

        <div v-if="!fetchingAvailabilities" class="mb-8">
            <div class="grid grid-cols-7 mb-2">
                <div v-for="day in weekDays" :key="day" class="text-center text-gray-500 text-sm py-2">
                    {{ day }}
                </div>
            </div>

            <div v-for="(week, weekIndex) in getDaysInMonth" :key="weekIndex" class="grid grid-cols-7">
                <div v-for="(day, dayIndex) in week" :key="`${weekIndex}-${dayIndex}`"
                    class="aspect-square flex items-center justify-center">
                    <button v-if="day" @click="handleDateSelect(day.fullDate)" 
                        :disabled="!day.isAvailable || isPastDate(day.fullDate)"
                        class="w-10 h-10 rounded-full flex items-center justify-center" :class="{
                            'bg-[#EBF0EC] text-[#326543]': day.isAvailable && !isPastDate(day.fullDate),
                            'text-gray-400': !day.isAvailable || isPastDate(day.fullDate),
                            'bg-[#5B8469] text-white': selectedDate === day.fullDate,
                            'bg-[#EBF0EC] text-[#5B8469]': day.isAvailable && selectedDate !== day.fullDate && !isPastDate(day.fullDate),
                        }">
                        {{ day.date }}
                    </button>
                </div>
            </div>
        </div>

        <section class="mb-6"  v-else>
            <div class="animate-pulse flex space-x-4 h-60 bg-slate-200 rounded"></div>
       </section>

        <div class="mb-6" v-if="selectedDate">
            <h2 class="text-sm font-semibold">Pick a visitation time</h2>
            <p class="text-gray-500 text-sm mb-4">
                Please note that time selected would be 30 minutes per visitation.
            </p>
            <div v-if="!fetchingAvailabilityTimes" class="grid grid-cols-5 gap-4 mb-8">
                <button v-for="slot in availabilityTimesList" :key="slot.time" @click="selectedTime = slot.time"
                    :disabled="!slot.isAvailable || isPastTime(slot.time)" class="py-2 px-4 rounded-lg text-sm" 
                    :class="{
                        'bg-[#5B8469] text-white': selectedTime === slot.time && slot.isAvailable && !isPastTime(slot.time),
                        'bg-gray-50 hover:bg-[#EBF0EC]': selectedTime !== slot.time && slot.isAvailable && !isPastTime(slot.time),
                        'bg-gray-100 text-gray-400 cursor-not-allowed': !slot.isAvailable || isPastTime(slot.time),
                    }">
                    {{ slot.time }}
                </button>
            </div>
            <section v-else>
            <div class="animate-pulse flex space-x-4 h-60 bg-slate-200 rounded"></div>
           </section>
        </div>

        <div class="flex justify-between gap-4">
            <button type="button" @click="emit('close')" class="py-2.5 text-sm w-full text-gray-700 bg-gray-50 rounded-lg">
                Cancel
            </button>
            <button type="button" @click="handleSchedule" :disabled="!selectedDate || !selectedTime || scheduling"
                class="w-full text-sm disabled:cursor-not-allowed disabled:opacity-25 py-3 rounded-lg" :class="{
                    'bg-[#292929] text-white':
                        selectedDate && selectedTime,
                    'bg-gray-200 text-gray-500 cursor-not-allowed':
                        !selectedDate || !selectedTime,
                }">
                 {{  scheduling ? 'scheduling..' : 'Schedule a visit' }}
            </button>
        </div>
    </div>
</template>


<script setup lang="ts">
const route = useRoute();
import { useCreateVisitation } from "@/composables/modules/visitation/create";
import { useCalendar } from "@/composables/core/useCalendar";
const { createVisitation, scheduling } = useCreateVisitation();
const houseId = route.params.houseId as string;

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
    fetchingAvailabilityTimes
} = useCalendar(houseId);

const emit = defineEmits(['close']);

// Function to check if a date is in the past
const isPastDate = (date: string) => {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    // Set the time of the selected date to midnight to avoid time comparison issues
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    return selectedDate < currentDate;
};

// Function to check if a time is in the past
const isPastTime = (time: string) => {
    const currentTime = new Date();
    // Create a Date object for today with the time from the slot
    const [hours, minutes] = time.split(':').map(Number);
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);  // Set the slot time to today's date with the given time
    return slotTime < currentTime; // Return true if the slot time is before the current time
};

const handleSchedule = async () => {
    if (!selectedDate || !selectedTime) return;

    const payload = {
        date: selectedDate.value,
        time: selectedTime.value,
    };
    await createVisitation(payload);
};
</script>


<!-- <template>
    <div class="bg-white rounded-lg p-6 h-[500px] overflow-y-auto shadow">
        <h2 class="text- text-[#1D2739] font-medium mb-6">Pick a visitation day</h2>

        <div v-if="!fetchingAvailabilities" class="flex items-center justify-between mb-4">
            <div class="text-[#1D2739] bg-white border border-[#F0F2F5] rounded-lg text-sm px-4 py-2">
                {{ formattedMonth }}
            </div>
            <div class="flex gap-2">
                <button @click="navigateMonth('prev')" 
                        :disabled="isPrevMonthDisabled"
                        class="rounded-lg bg-white"
                        :class="{ 'opacity-50 cursor-not-allowed': isPrevMonthDisabled }">
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
        <section class="mb-6" v-else>
            <div class="animate-pulse flex space-x-4 h-20 bg-slate-200 rounded"></div>
       </section>

        <div v-if="!fetchingAvailabilities" class="mb-8">
            <div class="grid grid-cols-7 mb-2">
                <div v-for="day in weekDays" :key="day" class="text-center text-gray-500 text-sm py-2">
                    {{ day }}
                </div>
            </div>

            <div v-for="(week, weekIndex) in getDaysInMonth" :key="weekIndex" class="grid grid-cols-7">
                <div v-for="(day, dayIndex) in week" :key="`${weekIndex}-${dayIndex}`"
                    class="aspect-square flex items-center justify-center">
                    <button v-if="day" @click="handleDateSelect(day.fullDate)" 
                            :disabled="!day.isAvailable || isPastDate(day.fullDate)"
                        class="w-10 h-10 rounded-full flex items-center justify-center" :class="{
                            'bg-[#EBF0EC] text-[#326543]': day.isAvailable && !isPastDate(day.fullDate),
                            'text-gray-400': !day.isAvailable || isPastDate(day.fullDate),
                            'bg-[#5B8469] text-white': selectedDate === day.fullDate,
                            'bg-[#EBF0EC] text-[#5B8469]': day.isAvailable && selectedDate !== day.fullDate && !isPastDate(day.fullDate),
                        }">
                        {{ day.date }}
                    </button>
                </div>
            </div>
        </div>
        <section class="mb-6"  v-else>
            <div class="animate-pulse flex space-x-4 h-60 bg-slate-200 rounded"></div>
       </section>

    
        <div class="mb-6" v-if="selectedDate">
            <h2 class="text-sm font-semibold">Pick a visitation time</h2>
            <p class="text-gray-500 text-sm mb-4">
                Please note that time selected would be 30 minutes per visitation.
            </p>
            <div v-if="!fetchingAvailabilityTimes" class="grid grid-cols-5 gap-4 mb-8">
                <button v-for="slot in filteredAvailabilityTimes" :key="slot.time" 
                        @click="selectedTime = slot.time"
                        :disabled="!slot.isAvailable || isPastTime(slot.time)"
                        class="py-2 px-4 rounded-lg text-sm" :class="{
                            'bg-[#5B8469] text-white':
                                selectedTime === slot.time && slot.isAvailable && !isPastTime(slot.time),
                            'bg-gray-50 hover:bg-[#EBF0EC]':
                                selectedTime !== slot.time && slot.isAvailable && !isPastTime(slot.time),
                            'bg-gray-100 text-gray-400 cursor-not-allowed': !slot.isAvailable || isPastTime(slot.time),
                        }">
                    {{ slot.time }}
                </button>
            </div>
            <section v-else>
                <div class="animate-pulse flex space-x-4 h-60 bg-slate-200 rounded"></div>
           </section>
        </div>

        <div class="flex justify-between gap-4">
            <button type="button" @click="emit('close')" class="py-2.5 text-sm w-full text-gray-700 bg-gray-50 rounded-lg">
                Cancel
            </button>
            <button type="button" @click="handleSchedule" :disabled="!selectedDate || !selectedTime || scheduling"
                class="w-full text-sm disabled:cursor-not-allowed disabled:opacity-25 py-3 rounded-lg" :class="{
                    'bg-[#292929] text-white':
                        selectedDate && selectedTime,
                    'bg-gray-200 text-gray-500 cursor-not-allowed':
                        !selectedDate || !selectedTime,
                }">
                 {{  scheduling ? 'scheduling..' : 'Schedule a visit' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const route = useRoute();
import { useCreateVisitation } from "@/composables/modules/visitation/create";
import { useCalendar } from "@/composables/core/useCalendar";
const { createVisitation, scheduling } = useCreateVisitation();
const houseId = route.params.houseId as string;

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
    fetchingAvailabilityTimes,
    currentMonth
} = useCalendar(houseId);

const emit = defineEmits(['close']);

// Check if a date is in the past
const isPastDate = (date: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
};

// Check if a time is in the past for the selected date
const isPastTime = (time: string) => {
    if (!selectedDate.value) return false;
    
    const now = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const selectedDateTime = new Date(selectedDate.value);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    
    return selectedDateTime < now;
};

// Filter available times based on whether they're in the past
const filteredAvailabilityTimes = computed(() => {
    return availabilityTimesList.value.map(slot => ({
        ...slot,
        isAvailable: slot.isAvailable && !isPastTime(slot.time)
    }));
});

// Disable previous month button if it would navigate to a past month
const isPrevMonthDisabled = computed(() => {
    const today = new Date();
    const firstOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    return currentMonth.value <= firstOfCurrentMonth;
});

const handleSchedule = async () => {
    if (!selectedDate.value || !selectedTime.value) return;
    
    // Additional validation before scheduling
    if (isPastDate(selectedDate.value) || isPastTime(selectedTime.value)) {
        return;
    }

    const payload = {
        date: selectedDate.value,
        time: selectedTime.value,
    };
    await createVisitation(payload);
};
</script> -->