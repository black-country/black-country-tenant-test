<template>
    <div class="p-8 bg-white rounded-xl shadow-md">
      
      <!-- Calendar Header with Month and Year -->
      <div class="flex justify-between items-center pb-10">
        <!-- Previous Month Arrow -->
        <div class="flex items-center">
          <svg @click="prevMonth" class="cursor-pointer" width="7" height="" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 9C0 9.3418 0.126953 9.63477 0.400391 9.88867L7.99805 17.3301C8.21289 17.5449 8.48633 17.6621 8.80859 17.6621C9.45312 17.6621 9.9707 17.1543 9.9707 16.5C9.9707 16.1777 9.83398 15.8945 9.61914 15.6699L2.77344 9L9.61914 2.33008C9.83398 2.10547 9.9707 1.8125 9.9707 1.5C9.9707 0.845703 9.45312 0.337891 8.80859 0.337891C8.48633 0.337891 8.21289 0.455078 7.99805 0.669922L0.400391 8.10156C0.126953 8.36523 0 8.6582 0 9Z" fill="#101928"/>
          </svg>
        </div>
  
        <!-- Month and Year Text -->
        <div class="text-lg font-semibold text-[#1D2739]">
          {{monthNames[currentMonth]}} {{currentYear}}
          <!-- {{ monthNames[currentMonth.value] }} {{ currentYear.value }} -->
        </div>
  
        <!-- Next Month Arrow -->
        <div class="flex items-center">
          <svg @click="nextMonth" class="cursor-pointer" width="7" height="" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 9C9.99023 8.6582 9.86328 8.36523 9.59961 8.10156L2.00195 0.669922C1.77734 0.455078 1.51367 0.337891 1.19141 0.337891C0.537109 0.337891 0.0292969 0.845703 0.0292969 1.5C0.0292969 1.8125 0.15625 2.10547 0.380859 2.33008L7.2168 9L0.380859 15.6699C0.15625 15.8945 0.0292969 16.1777 0.0292969 16.5C0.0292969 17.1543 0.537109 17.6621 1.19141 17.6621C1.50391 17.6621 1.77734 17.5449 2.00195 17.3301L9.59961 9.88867C9.87305 9.63477 10 9.3418 10 9Z" fill="#101928"/>
          </svg>
        </div>
      </div>
  
      <!-- Days of the week -->
      <div class="grid grid-cols-7 text-center mb-2">
        <span v-for="day in daysOfWeek" :key="day" class="text-gray-600 mr-6">{{ day }}</span>
      </div>

      <div class="grid grid-cols-7 gap-2">
        <span v-for="(blank, index) in blanks" :key="index" class="text-transparent">0</span>
        <button
          v-for="(day, index) in daysInMonth"
          :key="index"
          :disabled="isPastDate(day)"
          :class="[
            'w-10 h-10 rounded-full',
            isToday(day) ? 'bg-[#5B8469] text-white' : 'text-gray-600',
            selectedDate === day ? 'bg-[#5B8469] text-white' : 'hover:bg-gray-100',
            isPastDate(day) ? 'cursor-not-allowed opacity-50' : '',
            isDateBooked(day) ? 'bg-green-500 text-white' : '' // Apply green color if date is booked
          ]"
          @click="selectDate(day)"
        >
          {{ day }}
        </button>
      </div>
  
   
      <div class="mt-8">
        <h3 class="text- font-medium pb-2">Time</h3>
        <div class="flex space-x-4 overflow-x-auto hide-scrollbar">
          <button
            v-for="(time, index) in availableTimes"
            :key="index"
            @click="selectedTime = time"
            :class="[
    'px-6 py-2.5 rounded-lg border-[0.5px]',
    selectedTime === time ? 'bg-[#5B8469] text-white' : 'bg-[#EAEAEA] text-gray-700',
    isTimeBooked(time) ? 'bg-green-500 text-white' : '' // Apply green color if time is booked
  ]"
          >
            {{ time }}
          </button>
        </div>
      </div>
  
      <!-- Schedule Button -->
      <div class="mt-8">
        <button
        :disabled="scheduling || isEmpty"
        class="w-full py-4 rounded-lg text-sm bg-[#292929] text-white font-medium 
               disabled:cursor-not-allowed disabled:opacity-25"
        @click="scheduleVisit"
      >
        {{ scheduling ? 'Processing...' : 'Schedule a visit' }}
      </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useFetchVisitations } from '@/composables/modules/visitation/fetch'
  import { useCreateVisitation } from '@/composables/modules/visitation/create'
  import { useUser } from '@/composables/auth/user'
  const { user } = useUser()
  const { getVisitations, loading } = useFetchVisitations()
  const { createVisitation, scheduling  } = useCreateVisitation()
  const router = useRouter()

  const isEmpty = computed(() => {
  return !(selectedDate.value && selectedTime.value);
});

// function formatBackendTime(timeStr: string) {
//   // Extract time and period (AM/PM)
//   const [time, period] = timeStr.split(' ');
//   let [hours, minutes] = time.split(':');

//   // Ensure two digits for the hour
//   hours = hours.padStart(2, '0');

//   // Convert period to uppercase (AM/PM)
//   const formattedPeriod = period.toUpperCase();

//   return `${hours}:${minutes} ${formattedPeriod}`;
// }

function formatBackendTime(timeStr: string) {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');

  // Ensure the hours have two digits
  hours = hours.padStart(2, '0');

  // Return formatted time with uppercase period
  return `${hours}:${minutes} ${period.toUpperCase()}`;
}

const visitations = ref([]); // Store visitations
  
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

  const props = defineProps({
    property: {
      type: Object
    }
  })

  onMounted(() => {
  getVisitations(user.value.id, props.property.id).then((response: any) => {
    visitations.value = response.data.result; // Update with visitations data
  });
});

const isDateBooked = (day: number) => {
  const formattedMonth = (currentMonth.value + 1).toString().padStart(2, '0');
  const formattedDay = day.toString().padStart(2, '0');
  const date = `${currentYear.value}-${formattedMonth}-${formattedDay}`;

  return visitations.value.some(visitation => {
    return visitation.date.startsWith(date);
  });
};

// const isTimeBooked = (time: string) => {
//   const selectedDateFormatted = `${currentYear.value}-${(currentMonth.value + 1).toString().padStart(2, '0')}-${selectedDate.value?.toString().padStart(2, '0')}`;

//   return visitations.value.some(visitation => {
//     const visitationTime = convertTime(visitation.time); // Convert visitation time to match format
//     return visitation.date.startsWith(selectedDateFormatted) && visitationTime === time;
//   });
// };

// const isTimeBooked = (time: string) => {
//   const selectedDateFormatted = `${currentYear.value}-${(currentMonth.value + 1).toString().padStart(2, '0')}-${selectedDate.value?.toString().padStart(2, '0')}`;

//   return visitations.value.some(visitation => {
//     const formattedVisitationTime = formatBackendTime(visitation.time); // Convert visitation time to "02:00 AM" format
//     return visitation.date.startsWith(selectedDateFormatted) && formattedVisitationTime === time;
//   });
// };

const isTimeBooked = (time: string) => {
  // Ensure selected date is formatted to YYYY-MM-DD
  const selectedDateFormatted = `${currentYear.value}-${(currentMonth.value + 1).toString().padStart(2, '0')}-${selectedDate.value?.toString().padStart(2, '0')}`;

  return visitations.value.some(visitation => {
    // Format the visitation time to match the available times
    const formattedVisitationTime = formatBackendTime(visitation.time);
    
    // Log both the visitation time and the time being checked
    console.log(`Comparing:`, {
      visitationTime: formattedVisitationTime,
      timeToCheck: time,
      visitationDate: visitation.date,
      selectedDate: selectedDateFormatted
    });

    // Check if both the date and time match
    return visitation.date.startsWith(selectedDateFormatted) && formattedVisitationTime === time;
  });
};
  
  // Generate times in 12-hour format with AM/PM
  const availableTimes = Array.from({ length: 24 }, (_, hour) => {
    const period = hour < 12 ? 'AM' : 'PM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${hour12.toString().padStart(2, '0')}:00 ${period}`;
  });
  
  // Function to calculate days in month
  const updateCalendar = () => {
    const days = new Date(currentYear.value, currentMonth.value + 1, 0).getDate();
    const firstDayOfWeek = new Date(currentYear.value, currentMonth.value, 1).getDay();
    blanks.value = Array.from({ length: firstDayOfWeek }, () => null);
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
  
  // Function to check if the day is in the past
  const isPastDate = (day: number) => {
    const date = new Date(currentYear.value, currentMonth.value, day);
    return date < today;
  };
  
  // Function to handle selecting a date
  const selectDate = (day: number) => {
    selectedDate.value = day;
  };

  function convertTime(timeStr: string) {
  // Create a new Date object with the time string
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');

  // Convert the hours to 24-hour format if necessary
  if (modifier === 'PM' && hours !== '12') {
    hours = parseInt(hours, 10) + 12;
  } else if (modifier === 'AM' && hours === '12') {
    hours = '00';
  }

  // Return the formatted time (removes leading zeros for hours)
  const date = new Date();
  date.setHours(hours, minutes);

  // Format to 12-hour time with lowercase AM/PM
  const options = { hour: 'numeric', minute: 'numeric', hour12: true };
  return date.toLocaleString('en-US', options).toLowerCase();
}
  
// Function to handle scheduling a visit
const scheduleVisit = async () => {
  // Zero-pad the month and date to ensure they are in ISO 8601 format
  const formattedMonth = currentMonth.value.toString().padStart(2, '0');
  const formattedDate = selectedDate.value.toString().padStart(2, '0');
  
  const payload = {
    date: `${currentYear.value}-${formattedMonth}-${formattedDate}`, // Ensure valid ISO 8601 format
    time: convertTime(selectedTime.value),
    note: "", // optional
  };

  await createVisitation(payload);
}
  
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
  button:focus {
    outline: none;
  }
/* Hide scrollbar for Chrome, Safari, and newer versions of Edge */
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge, and Firefox */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
  </style> -