<template>
    <div class="p-8 bg-white rounded-xl shadow-md">

      <div class="flex gap-x-2 justify-between items-center pb-10">
      <div class="flex gap-x-2 justify-between items-center">
        <p class="text-[#1D2739]">{{ monthNames[currentMonth] }} {{ currentYear }}</p>

        <svg @click="nextMonth" class="cursor-pointer" width="7" height="" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 9C9.99023 8.6582 9.86328 8.36523 9.59961 8.10156L2.00195 0.669922C1.77734 0.455078 1.51367 0.337891 1.19141 0.337891C0.537109 0.337891 0.0292969 0.845703 0.0292969 1.5C0.0292969 1.8125 0.15625 2.10547 0.380859 2.33008L7.2168 9L0.380859 15.6699C0.15625 15.8945 0.0292969 16.1777 0.0292969 16.5C0.0292969 17.1543 0.537109 17.6621 1.19141 17.6621C1.50391 17.6621 1.77734 17.5449 2.00195 17.3301L9.59961 9.88867C9.87305 9.63477 10 9.3418 10 9Z" fill="#101928"/>
            </svg>
            
      </div>
        <div class="flex items-center gap-x-4">
            <svg @click="prevMonth" class="cursor-pointer" width="7" height="" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 9C0 9.3418 0.126953 9.63477 0.400391 9.88867L7.99805 17.3301C8.21289 17.5449 8.48633 17.6621 8.80859 17.6621C9.45312 17.6621 9.9707 17.1543 9.9707 16.5C9.9707 16.1777 9.83398 15.8945 9.61914 15.6699L2.77344 9L9.61914 2.33008C9.83398 2.10547 9.9707 1.8125 9.9707 1.5C9.9707 0.845703 9.45312 0.337891 8.80859 0.337891C8.48633 0.337891 8.21289 0.455078 7.99805 0.669922L0.400391 8.10156C0.126953 8.36523 0 8.6582 0 9Z" fill="#101928"/>
                </svg>
                
            <svg @click="nextMonth" class="cursor-pointer" width="7" height="" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 9C9.99023 8.6582 9.86328 8.36523 9.59961 8.10156L2.00195 0.669922C1.77734 0.455078 1.51367 0.337891 1.19141 0.337891C0.537109 0.337891 0.0292969 0.845703 0.0292969 1.5C0.0292969 1.8125 0.15625 2.10547 0.380859 2.33008L7.2168 9L0.380859 15.6699C0.15625 15.8945 0.0292969 16.1777 0.0292969 16.5C0.0292969 17.1543 0.537109 17.6621 1.19141 17.6621C1.50391 17.6621 1.77734 17.5449 2.00195 17.3301L9.59961 9.88867C9.87305 9.63477 10 9.3418 10 9Z" fill="#101928"/>
                </svg>
                
        </div>
      </div>
  
      <!-- Days of the week -->
      <div class="grid grid-cols-7 text-center mb-2">
        <span v-for="day in daysOfWeek" :key="day" class="text-gray-600 mr-6">{{ day }}</span>
      </div>
  
      <!-- Dates -->
      <div class="grid grid-cols-7 gap-2">
        <span v-for="(blank, index) in blanks" :key="index" class="text-transparent">0</span>
        <button
          v-for="(day, index) in daysInMonth"
          :key="index"
          :class="[
            'w-10 h-10 rounded-full',
            isToday(day) ? 'bg-[#5B8469] text-white' : 'text-gray-600',
            selectedDate === day ? 'bg-[#5B8469] text-white' : 'hover:bg-gray-100'
          ]"
          @click="selectDate(day)"
        >
          {{ day }}
        </button>
      </div>
  
      <!-- Time Selection -->
      <div class="mt-8">
        <h3 class="text- font-medium pb-2">Time</h3>
        <div class="flex space-x-4">
          <button
            v-for="(time, index) in availableTimes"
            :key="index"
            @click="selectedTime = time"
            :class="[
              'px-6 py-2.5 rounded-lg border-[0.5px]',
              selectedTime === time ? 'bg-[#5B8469] text-white' : 'bg-[#EAEAEA] text-gray-700'
            ]"
          >
            {{ time }}
          </button>
        </div>
      </div>
  
      <!-- Schedule Button -->
      <div class="mt-8">
        <button
          class="w-full py-4 rounded-lg text-sm bg-[#292929] text-white font-medium"
          @click="scheduleVisit"
        >
          Schedule a visit
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  const router = useRouter()
  
  // Set initial values
  const today = new Date();
  const currentYear = ref(today.getFullYear());
  const currentMonth = ref(today.getMonth());
  const selectedDate = ref<number | null>(null);
  const selectedTime = ref<string | null>(null);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const daysInMonth = ref<number[]>([]);
  const blanks = ref<number[]>([]);
  
  const availableTimes = ['10:00 AM', '12:00 PM', '03:00 PM'];
  
  // Function to calculate days in month
  const updateCalendar = () => {
    // Get the number of days in the current month
    const days = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
    
    // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = new Date(currentYear.value, currentMonth.value, 1).getDay();
    
    // Create blanks for empty days before the 1st of the month
    blanks.value = Array.from({ length: firstDayOfWeek }, () => null);
    
    // Fill in days of the month
    daysInMonth.value = Array.from({ length: days }, (_, i) => i + 1);
  };
  
  // Function to check if the day is today
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth.value === today.getMonth() &&
      currentYear.value === today.getFullYear()
    );
  };
  
  // Function to handle selecting a date
  const selectDate = (day: number) => {
    selectedDate.value = day;
  };
  
  // Function to handle scheduling a visit
  const scheduleVisit = () => {
    router.push('/dashboard/listings/booking-schedule-success')
    // if (!selectedDate.value || !selectedTime.value) {
    //   alert('Please select both a date and time');
    //   return;
    // }
    // alert(`Scheduled for ${selectedDate.value} ${monthNames[currentMonth.value]} ${selectedTime.value}`);
  };
  
  // Function to navigate to the previous month
  const prevMonth = () => {
    if (currentMonth.value === 0) {
      currentMonth.value = 11;
      currentYear.value--;
    } else {
      currentMonth.value--;
    }
  };
  
  // Function to navigate to the next month
  const nextMonth = () => {
    if (currentMonth.value === 11) {
      currentMonth.value = 0;
      currentYear.value++;
    } else {
      currentMonth.value++;
    }
  };
  
  // Watch the current month and year, and update the calendar when they change
  watch([currentMonth, currentYear], updateCalendar);
  
  // Initialize the calendar on component mount
  onMounted(() => {
    updateCalendar();
  });
  </script>
  
  <style scoped>
  /* Customize the calendar buttons for hover effects */
  button:focus {
    outline: none;
  }
  </style>
  