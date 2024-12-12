
// // types/calendar.ts
// export interface TimeInterval {
//     start: string;
//     end: string;
//     times: string[];
//   }
  
//   export interface Availability {
//     id: string;
//     dayOfMonth: number | null;
//     dayOfWeek: number;
//     time: string | null;
//     intervals: TimeInterval[];
//     duration: string;
//     houseId: string;
//     agentId: string;
//     durationNumber: number;
//     durationUnit: string;
//     startDate: string;
//     endDate: string;
//     createdAt: string;
//     updatedAt: string;
//   }
  
//   export interface DayTimeSlot {
//     time: string;
//     isAvailable: boolean;
//   }
  
//   export interface VisitationData {
//     date: string;
//     time: string;
//     note?: string;
//   }
  
//   import { useFetchAvailabilityTimes } from '@/composables/modules/visitation/useGetAvailabilityTimes'
//   import { useFetchHouseAvailability } from '@/composables/modules/visitation/useFetchHoseAvailabilityById'
// export const useCalendar = (houseId: string) => {
//     const currentMonth = ref(new Date());
//     const selectedDate = ref<string | null>(null);
//     const selectedTime = ref<string | null>(null);
//     // const availabilityData = ref<Availability[]>([]);
//     const availableTimeSlots = ref<DayTimeSlot[]>([]);
//     const loading = ref(false);
//     const error = ref<string | null>(null);
//     const { loading: fetchingAvailabilities, availabilityList } = useFetchHouseAvailability()
//     const { getAvailabilityTimes, loading: fetchingAvailabilityTimes, availabilityTimesList } = useFetchAvailabilityTimes()
  
//     const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
//     // Format date to YYYY-MM-DD
//     const formatDate = (date: Date): string => {
//       return date.toISOString().split('T')[0];
//     };
  

//     // Get available dates from availability data
// const availableDates = computed(() => {
//     if (availabilityList.value && availabilityList.value.length > 0) {
//       return availabilityList.value.map(item =>
//         formatDate(new Date(item.createdAt))
//       )
//     }
//     return []  // Return an empty array if no data is available
//   })
  
//     const formattedMonth = computed(() => {
//       return new Intl.DateTimeFormat('en-US', { 
//         month: 'long', 
//         year: 'numeric' 
//       }).format(currentMonth.value);
//     });
  
//     const getDaysInMonth = computed(() => {
//       const year = currentMonth.value.getFullYear();
//       const month = currentMonth.value.getMonth();
//       const daysInMonth = new Date(year, month + 1, 0).getDate();
//       const firstDayOfMonth = new Date(year, month, 1).getDay();
      
//       const days = Array.from({ length: daysInMonth }, (_, i) => {
//         const currentDate = formatDate(new Date(year, month, i + 1));
//         return {
//           date: i + 1,
//           fullDate: currentDate,
//           isAvailable: availableDates.value.includes(currentDate)
//         };
//       });
  
//       const weeks: (typeof days[0] | null)[][] = [];
//       let currentWeek: (typeof days[0] | null)[] = Array(firstDayOfMonth).fill(null);
  
//       days.forEach(day => {
//         currentWeek.push(day);
//         if (currentWeek.length === 7) {
//           weeks.push(currentWeek);
//           currentWeek = [];
//         }
//       });
  
//       if (currentWeek.length > 0) {
//         weeks.push(currentWeek);
//       }
  
//       return weeks;
//     });
  
//     // Fetch available times for selected date
//     const fetchAvailableTimes = async (date: string) => {
//       try {
//         loading.value = true;
//         const { data } = await useFetch(`/api/houses/${houseId}/available-times`, {
//           params: { date }
//         });
//         availableTimeSlots.value = data.value as DayTimeSlot[];
//       } catch (err) {
//         error.value = 'Failed to fetch available times';
//         console.error(err);
//       } finally {
//         loading.value = false;
//       }
//     };
  
//     const handleDateSelect = async (date: string) => {
//       selectedDate.value = date;
//       selectedTime.value = null;
//       await getAvailabilityTimes(date);
//     };
  
//     const navigateMonth = (direction: 'prev' | 'next') => {
//       const newDate = new Date(currentMonth.value);
//       newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
//       currentMonth.value = newDate;
//     };
  
//     return {
//       currentMonth,
//       selectedDate,
//       selectedTime,
//       availableTimeSlots,
//       loading,
//       error,
//       weekDays,
//       formattedMonth,
//       getDaysInMonth,
//       navigateMonth,
//       handleDateSelect,
//       availabilityTimesList,
//       fetchingAvailabilities,
//       fetchingAvailabilityTimes
//     //   fetchAvailability
//     };
//   };
  

// useCalendar.ts
// import { ref, computed } from 'vue'
// import dayjs from 'dayjs'

// interface Availability {
//   dayOfWeek: number
//   startDate: string
//   endDate: string
//   intervals: {
//     start: string
//     end: string
//     times: string[]
//   }[]
//   allIntervals: string[]
// }

// interface DayInfo {
//   date: number
//   fullDate: string
//   isAvailable: boolean
//   isWithinRange: boolean
// }

// import { useFetchAvailabilityTimes } from '@/composables/modules/visitation/useGetAvailabilityTimes'
// import { useFetchHouseAvailability } from '@/composables/modules/visitation/useFetchHoseAvailabilityById'

// export const useCalendar = (houseId: string) => {
//   const currentMonth = ref(dayjs())
//   const selectedDate = ref<string>('')
//   const selectedTime = ref<string>('')
//   // const fetchingAvailabilities = ref(false)
//   // const fetchingAvailabilityTimes = ref(false)
//   const availability = ref<Availability | null>(null)

//   const { loading: fetchingAvailabilities, availabilityList } = useFetchHouseAvailability()
//   const { getAvailabilityTimes, loading: fetchingAvailabilityTimes, availabilityTimesList: availabilityTimes } = useFetchAvailabilityTimes()
  
//   const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

//   const formattedMonth = computed(() => {
//     return currentMonth.value.format('MMMM YYYY')
//   })

//   const getDaysInMonth = computed(() => {
//     const firstDayOfMonth = currentMonth.value.startOf('month')
//     const daysInMonth = currentMonth.value.daysInMonth()
//     const firstDayWeekday = firstDayOfMonth.day()
    
//     const days: (DayInfo | null)[][] = []
//     let currentWeek: (DayInfo | null)[] = []
    
//     // Fill in empty days at start
//     for (let i = 0; i < firstDayWeekday; i++) {
//       currentWeek.push(null)
//     }
    
//     for (let date = 1; date <= daysInMonth; date++) {
//       const currentDate = currentMonth.value.date(date)
//       const fullDate = currentDate.format('YYYY-MM-DD')
      
//       const isWithinRange = availability.value ? (
//         dayjs(fullDate).isAfter(dayjs(availability.value.startDate)) &&
//         dayjs(fullDate).isBefore(dayjs(availability.value.endDate))
//       ) : false

//       const dayOfWeek = currentDate.day()
      
//       const isAvailable = availability.value ? (
//         dayOfWeek === availability.value.dayOfWeek && 
//         isWithinRange
//       ) : false

//       currentWeek.push({
//         date,
//         fullDate,
//         isAvailable,
//         isWithinRange
//       })
      
//       if (currentWeek.length === 7) {
//         days.push(currentWeek)
//         currentWeek = []
//       }
//     }
    
//     // Fill in empty days at end
//     if (currentWeek.length > 0) {
//       while (currentWeek.length < 7) {
//         currentWeek.push(null)
//       }
//       days.push(currentWeek)
//     }
    
//     return days
//   })

//   const availabilityTimesList = computed(() => {
//     if (!availability.value || !selectedDate.value) return []
    
//     const selectedDayOfWeek = dayjs(selectedDate.value).day()
    
//     if (selectedDayOfWeek !== availability.value.dayOfWeek) return []
    
//     return availability.value.allIntervals.map(time => ({
//       time,
//       isAvailable: true
//     }))
//   })

//   const navigateMonth = (direction: 'prev' | 'next') => {
//     currentMonth.value = direction === 'prev' 
//       ? currentMonth.value.subtract(1, 'month')
//       : currentMonth.value.add(1, 'month')
//   }

//   const handleDateSelect = (date: string) => {
//     selectedDate.value = date
//     selectedTime.value = ''
//   }

//   const fetchAvailability = async () => {
//     fetchingAvailabilities.value = true
//     try {
//       // Simulated API call - replace with actual API call
//       const response = {
//         dayOfWeek: 4,
//         startDate: "2024-12-07T16:17:16.949Z",
//         endDate: "2024-12-21T16:17:16.949Z",
//         intervals: [
//           {
//             start: "10:00 AM",
//             end: "12:30 PM",
//             times: [
//               "10:00 AM",
//               "10:30 AM",
//               "11:00 AM",
//               "11:30 AM",
//               "12:00 PM",
//               "12:30 PM"
//             ]
//           }
//         ],
//         allIntervals: [
//           "10:00 AM",
//           "10:30 AM",
//           "11:00 AM",
//           "11:30 AM",
//           "12:00 PM",
//           "12:30 PM"
//         ]
//       }
//       availability.value = response
//     } catch (error) {
//       console.error('Error fetching availability:', error)
//     } finally {
//       fetchingAvailabilities.value = false
//     }
//   }

//   // Call fetchAvailability when the component mounts
//   fetchAvailability()

//   return {
//     formattedMonth,
//     selectedDate,
//     selectedTime,
//     weekDays,
//     getDaysInMonth,
//     navigateMonth,
//     handleDateSelect,
//     availabilityTimesList,
//     fetchingAvailabilities,
//     availabilityList,
//     fetchingAvailabilityTimes
//   }
// }

// // useCalendar.ts
// import { ref, computed } from 'vue'
// import { useNuxtApp } from '#app'
// import dayjs from 'dayjs'

// interface Availability {
//   id: string
//   dayOfMonth: number | null
//   dayOfWeek: number
//   startDate: string
//   endDate: string
//   intervals: {
//     start: string
//     end: string
//     times: string[]
//   }[]
//   allIntervals: string[]
// }

// interface DayInfo {
//   date: number
//   fullDate: string
//   isAvailable: boolean
//   isWithinRange: boolean
// }

// import { useFetchAvailabilityTimes } from '@/composables/modules/visitation/useGetAvailabilityTimes'
// import { useFetchHouseAvailability } from '@/composables/modules/visitation/useFetchHoseAvailabilityById'

// export const useCalendar = (houseId: string) => {
//   const currentMonth = ref(dayjs())
//   const selectedDate = ref<string>('')
//   const selectedTime = ref<string>('')
//   const availabilities = ref<Availability[]>([])

//   const { loading: fetchingAvailabilities, availabilityList } = useFetchHouseAvailability()
//   const { getAvailabilityTimes, loading: fetchingAvailabilityTimes, availabilityTimesList: availabilityTimes } = useFetchAvailabilityTimes()

//   const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

//   const formattedMonth = computed(() => {
//     return currentMonth.value.format('MMMM YYYY')
//   })

//   const getDaysInMonth = computed(() => {
//     const firstDayOfMonth = currentMonth.value.startOf('month')
//     const daysInMonth = currentMonth.value.daysInMonth()
//     const firstDayWeekday = firstDayOfMonth.day()

//     const days: (DayInfo | null)[][] = []
//     let currentWeek: (DayInfo | null)[] = []

//     // Fill in empty days at start
//     for (let i = 0; i < firstDayWeekday; i++) {
//       currentWeek.push(null)
//     }

//     for (let date = 1; date <= daysInMonth; date++) {
//       const currentDate = currentMonth.value.date(date)
//       const fullDate = currentDate.format('YYYY-MM-DD')

//       // Check if the date is within any availability range
//       const availabilityForDate = availabilities.value.find((availability) =>
//         dayjs(fullDate).isBetween(dayjs(availability.startDate), dayjs(availability.endDate), 'day', '[]')
//       )

//       const isAvailable = availabilityForDate ?
//         availabilityForDate.dayOfWeek === currentDate.day() :
//         false

//       const isWithinRange = !!availabilityForDate

//       currentWeek.push({
//         date,
//         fullDate,
//         isAvailable,
//         isWithinRange
//       })

//       if (currentWeek.length === 7) {
//         days.push(currentWeek)
//         currentWeek = []
//       }
//     }

//     // Fill in empty days at end
//     if (currentWeek.length > 0) {
//       while (currentWeek.length < 7) {
//         currentWeek.push(null)
//       }
//       days.push(currentWeek)
//     }

//     return days
//   })

//   const availabilityTimesList = computed(() => {
//     if (!availabilities.value.length || !selectedDate.value) return []

//     const selectedDayOfWeek = dayjs(selectedDate.value).day()

//     // Find the relevant availability for the selected date
//     const relevantAvailability = availabilities.value.find((availability) =>
//       dayjs(selectedDate.value).isBetween(dayjs(availability.startDate), dayjs(availability.endDate), 'day', '[]') &&
//       availability.dayOfWeek === selectedDayOfWeek
//     )

//     return relevantAvailability ?
//       relevantAvailability.allIntervals.map(time => ({ time, isAvailable: true })) :
//       []
//   })

//   const navigateMonth = (direction: 'prev' | 'next') => {
//     currentMonth.value = direction === 'prev' 
//       ? currentMonth.value.subtract(1, 'month')
//       : currentMonth.value.add(1, 'month')
//   }

//   const handleDateSelect = (date: string) => {
//     selectedDate.value = date
//     selectedTime.value = ''
//   }

//   const mockAvailabilities = ref([
//     {
//       id: "a2cbfc5b-9194-476d-8892-fdfb889b510b",
//       dayOfMonth: null,
//       dayOfWeek: 1,
//       startDate: "2024-12-07T16:17:16.949Z",
//       endDate: "2024-12-21T16:17:16.949Z",
//       intervals: [
//         {
//           start: "10:00 AM",
//           end: "12:30 PM",
//           times: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"],
//         },
//       ],
//       allIntervals: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"],
//     },
//     {
//       id: "94126668-f9db-483f-9940-c24e8c851f1f",
//       dayOfMonth: null,
//       dayOfWeek: 4,
//       startDate: "2024-12-07T16:17:17.345Z",
//       endDate: "2024-12-21T16:17:17.345Z",
//       intervals: [
//         {
//           start: "12:00 PM",
//           end: "02:30 PM",
//           times: ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
//         },
//       ],
//       allIntervals: ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
//     },
//   ])
  

//   // const fetchAvailability = async () => {
//   //   try {
//   //     const response = await availabilityList(houseId) // Fetch availabilities from API
//   //     availabilities.value = response
//   //   } catch (error) {
//   //     console.error('Error fetching availabilities:', error)
//   //   }
//   // }

//   const fetchAvailability = async () => {
//     try {
//       // Replace the following line with the mock data for testing
//       availabilities.value = mockAvailabilities.value;
//     } catch (error) {
//       console.error("Error fetching availabilities:", error);
//     }
//   };
  

//   // Call fetchAvailability when the component mounts
//   fetchAvailability()

//   return {
//     formattedMonth,
//     selectedDate,
//     selectedTime,
//     weekDays,
//     getDaysInMonth,
//     navigateMonth,
//     handleDateSelect,
//     availabilityTimesList,
//     fetchingAvailabilities,
//     fetchingAvailabilityTimes
//   }
// }

// import { ref, computed } from 'vue'
// import { useNuxtApp } from '#app'

// interface Availability {
//   id: string
//   dayOfMonth: number | null
//   dayOfWeek: number
//   startDate: string
//   endDate: string
//   intervals: {
//     start: string
//     end: string
//     times: string[]
//   }[]
//   allIntervals: string[]
// }

// interface DayInfo {
//   date: number
//   fullDate: string
//   isAvailable: boolean
//   isWithinRange: boolean
// }

// import { useFetchAvailabilityTimes } from '@/composables/modules/visitation/useGetAvailabilityTimes'
// import { useFetchHouseAvailability } from '@/composables/modules/visitation/useFetchHoseAvailabilityById'

// export const useCalendar = (houseId: string) => {
//   const { $dayjs } = useNuxtApp()
//   const currentMonth = ref($dayjs())
//   const selectedDate = ref<string>('')
//   const selectedTime = ref<string>('')
//   const availabilities = ref<Availability[]>([])

//   const { loading: fetchingAvailabilities, availabilityList } = useFetchHouseAvailability()
//   const { getAvailabilityTimes, loading: fetchingAvailabilityTimes, availabilityTimesList: availabilityTimes } = useFetchAvailabilityTimes()

//   const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

//   const formattedMonth = computed(() => {
//     return currentMonth.value.format('MMMM YYYY')
//   })

//   const getDaysInMonth = computed(() => {
//     const firstDayOfMonth = currentMonth.value.startOf('month')
//     const daysInMonth = currentMonth.value.daysInMonth()
//     const firstDayWeekday = firstDayOfMonth.day()

//     const days: (DayInfo | null)[][] = []
//     let currentWeek: (DayInfo | null)[] = []

//     // Fill in empty days at start
//     for (let i = 0; i < firstDayWeekday; i++) {
//       currentWeek.push(null)
//     }

//     for (let date = 1; date <= daysInMonth; date++) {
//       const currentDate = currentMonth.value.date(date)
//       const fullDate = currentDate.format('YYYY-MM-DD')

//       // Check if the date is within any availability range
//       const availabilityForDate = availabilities.value.find((availability) =>
//         $dayjs(fullDate).isBetween($dayjs(availability.startDate), $dayjs(availability.endDate), 'day', '[]')
//       )

//       const isAvailable = availabilityForDate ?
//         availabilityForDate.dayOfWeek === currentDate.day() :
//         false

//       const isWithinRange = !!availabilityForDate

//       currentWeek.push({
//         date,
//         fullDate,
//         isAvailable,
//         isWithinRange
//       })

//       if (currentWeek.length === 7) {
//         days.push(currentWeek)
//         currentWeek = []
//       }
//     }

//     // Fill in empty days at end
//     if (currentWeek.length > 0) {
//       while (currentWeek.length < 7) {
//         currentWeek.push(null)
//       }
//       days.push(currentWeek)
//     }

//     return days
//   })

//   const availabilityTimesList = computed(() => {
//     if (!availabilities.value.length || !selectedDate.value) return []

//     const selectedDayOfWeek = $dayjs(selectedDate.value).day()

//     // Find the relevant availability for the selected date
//     const relevantAvailability = availabilities.value.find((availability) =>
//       $dayjs(selectedDate.value).isBetween($dayjs(availability.startDate), $dayjs(availability.endDate), 'day', '[]') &&
//       availability.dayOfWeek === selectedDayOfWeek
//     )

//     return relevantAvailability ?
//       relevantAvailability.allIntervals.map(time => ({ time, isAvailable: true })) :
//       []
//   })

//   const navigateMonth = (direction: 'prev' | 'next') => {
//     currentMonth.value = direction === 'prev' 
//       ? currentMonth.value.subtract(1, 'month')
//       : currentMonth.value.add(1, 'month')
//   }

//   const handleDateSelect = (date: string) => {
//     selectedDate.value = date
//     selectedTime.value = ''
//   }

//   const mockAvailabilities = ref([
//     {
//       id: "a2cbfc5b-9194-476d-8892-fdfb889b510b",
//       dayOfMonth: null,
//       dayOfWeek: 1,
//       startDate: "2024-12-07T16:17:16.949Z",
//       endDate: "2024-12-21T16:17:16.949Z",
//       intervals: [
//         {
//           start: "10:00 AM",
//           end: "12:30 PM",
//           times: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"],
//         },
//       ],
//       allIntervals: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"],
//     },
//     {
//       id: "94126668-f9db-483f-9940-c24e8c851f1f",
//       dayOfMonth: null,
//       dayOfWeek: 4,
//       startDate: "2024-12-07T16:17:17.345Z",
//       endDate: "2024-12-21T16:17:17.345Z",
//       intervals: [
//         {
//           start: "12:00 PM",
//           end: "02:30 PM",
//           times: ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
//         },
//       ],
//       allIntervals: ["12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
//     },
//   ])

//   const fetchAvailability = async () => {
//     try {
//       // Replace the following line with the mock data for testing
//       availabilities.value = mockAvailabilities.value;
//     } catch (error) {
//       console.error("Error fetching availabilities:", error);
//     }
//   };

//   // Call fetchAvailability when the component mounts
//   fetchAvailability()

//   return {
//     formattedMonth,
//     selectedDate,
//     selectedTime,
//     weekDays,
//     getDaysInMonth,
//     navigateMonth,
//     handleDateSelect,
//     availabilityTimesList,
//     fetchingAvailabilities,
//     fetchingAvailabilityTimes
//   }
// }

import { ref, computed } from 'vue'
import { useNuxtApp } from '#app'

interface Availability {
  id: string
  dayOfMonth: number | null
  dayOfWeek: number
  startDate: string
  endDate: string
  intervals: {
    start: string
    end: string
    times: string[]
  }[]
  allIntervals: string[]
}

interface DayInfo {
  date: number
  fullDate: string
  isAvailable: boolean
  isWithinRange: boolean
}

import { useFetchAvailabilityTimes } from '@/composables/modules/visitation/useGetAvailabilityTimes'
import { useFetchHouseAvailability } from '@/composables/modules/visitation/useFetchHoseAvailabilityById'

export const useCalendar = (houseId: string) => {
  const { $dayjs } = useNuxtApp()
  const currentMonth = ref($dayjs())
  const selectedDate = ref<string>('')
  const selectedTime = ref<string>('')
  // const availabilities = ref<Availability[]>([])

  const { loading: fetchingAvailabilities, availabilityList } = useFetchHouseAvailability()
  const { getAvailabilityTimes, loading: fetchingAvailabilityTimes, availabilityTimesList: availabilityTimes } = useFetchAvailabilityTimes()

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const formattedMonth = computed(() => {
    return currentMonth.value.format('MMMM YYYY')
  })

  const getDaysInMonth = computed(() => {
    const firstDayOfMonth = currentMonth.value.startOf('month')
    const daysInMonth = currentMonth.value.daysInMonth()
    const firstDayWeekday = firstDayOfMonth.day()

    const days: (DayInfo | null)[][] = []
    let currentWeek: (DayInfo | null)[] = []

    // Fill in empty days at start
    for (let i = 0; i < firstDayWeekday; i++) {
      currentWeek.push(null)
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = currentMonth.value.date(date)
      const fullDate = currentDate.format('YYYY-MM-DD')

      // Check if the date is within any availability range
      const isAvailable = availabilityList.value.some((availability) =>
        $dayjs(fullDate).isBetween($dayjs(availability.startDate), $dayjs(availability.endDate), 'day', '[]') &&
        availability.dayOfWeek === currentDate.day()
      )

      const isWithinRange = availabilityList.value.some((availability) =>
        $dayjs(fullDate).isBetween($dayjs(availability.startDate), $dayjs(availability.endDate), 'day', '[]')
      )

      currentWeek.push({
        date,
        fullDate,
        isAvailable,
        isWithinRange
      })

      if (currentWeek.length === 7) {
        days.push(currentWeek)
        currentWeek = []
      }
    }

    // Fill in empty days at end
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      days.push(currentWeek)
    }

    return days
  })

  const availabilityTimesList = computed(() => {
    if (!availabilityList.value.length || !selectedDate.value) return []

    const selectedDayOfWeek = $dayjs(selectedDate.value).day()

    // Find the relevant availability for the selected date availabilityTimes
    const relevantAvailabilities = availabilityList.value.filter((availability) =>
      $dayjs(selectedDate.value).isBetween($dayjs(availability.startDate), $dayjs(availability.endDate), 'day', '[]') &&
      availability.dayOfWeek === selectedDayOfWeek
    )

    return relevantAvailabilities.flatMap((availability) =>
      availability.allIntervals.map(time => ({ time, isAvailable: true }))
    )
  })

  const filteredAvailabilityTimes = computed(() => {
    if (!availabilityTimes.value.length || !selectedDate.value) return [];
  
    const now = $dayjs(); // Current date and time
    const currentDate = $dayjs(selectedDate.value).startOf('day'); // Normalize selectedDate to start of the day
  
    // Map through availability times and set availability for past times to false
    return availabilityTimes.value.map((timeObj) => {
      // Combine the selected date and time from the timeObj to create a complete datetime
      const time = $dayjs(`${selectedDate.value} ${timeObj.time}`, 'YYYY-MM-DD hh:mm A');
  
      // Check if the time is in the future or not
      const isAvailable = time.isAfter(now) && time.isSameOrAfter(currentDate);
  
      return {
        ...timeObj,
        isAvailable,
      };
    });
  });
  


  // const filteredAvailabilityTimes = computed(() => {
  //   if (!availabilityTimes.value.length || !selectedDate.value) return [];
  
  //   const now = $dayjs(); // Current date and time
  //   const currentDate = $dayjs(selectedDate.value).startOf('day'); // Normalize selectedDate to start of the day
  
  //   // Map through availability times and set availability for past times to false
  //   return availabilityTimes.value.map((timeObj) => {
  //     // Combine the selected date and time from the timeObj to create a complete datetime
  //     const time = $dayjs(`${selectedDate.value} ${timeObj.time}`, 'YYYY-MM-DD hh:mm A');
  
  //     // Check if the time is in the future or not
  //     const isAvailable = time.isAfter(now) && time.isSameOrAfter(currentDate);
  
  //     return {
  //       ...timeObj,
  //       isAvailable,
  //     };
  //   });
  // });
  

  const navigateMonth = (direction: 'prev' | 'next') => {
    currentMonth.value = direction === 'prev' 
      ? currentMonth.value.subtract(1, 'month')
      : currentMonth.value.add(1, 'month')
  }

  const handleDateSelect = async (date: string) => {
    console.log(date, 'fate')
    selectedDate.value = date
    selectedTime.value = ''
    await getAvailabilityTimes(date);
  }

  return {
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
    availabilityTimes,
    filteredAvailabilityTimes
  }
}
