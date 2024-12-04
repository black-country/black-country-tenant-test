
// types/calendar.ts
export interface TimeInterval {
    start: string;
    end: string;
    times: string[];
  }
  
  export interface Availability {
    id: string;
    dayOfMonth: number | null;
    dayOfWeek: number;
    time: string | null;
    intervals: TimeInterval[];
    duration: string;
    houseId: string;
    agentId: string;
    durationNumber: number;
    durationUnit: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface DayTimeSlot {
    time: string;
    isAvailable: boolean;
  }
  
  export interface VisitationData {
    date: string;
    time: string;
    note?: string;
  }
  
  import { useFetchAvailabilityTimes } from '@/composables/modules/visitation/useGetAvailabilityTimes'
  import { useFetchHouseAvailability } from '@/composables/modules/visitation/useFetchHoseAvailabilityById'
export const useCalendar = (houseId: string) => {
    const currentMonth = ref(new Date());
    const selectedDate = ref<string | null>(null);
    const selectedTime = ref<string | null>(null);
    // const availabilityData = ref<Availability[]>([]);
    const availableTimeSlots = ref<DayTimeSlot[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const { loading: fetchingAvailabilities, availabilityList } = useFetchHouseAvailability()
    const { getAvailabilityTimes, loading: fetchingAvailabilityTimes, availabilityTimesList } = useFetchAvailabilityTimes()
  
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
    // Format date to YYYY-MM-DD
    const formatDate = (date: Date): string => {
      return date.toISOString().split('T')[0];
    };
  

    // Get available dates from availability data
const availableDates = computed(() => {
    if (availabilityList.value && availabilityList.value.length > 0) {
      return availabilityList.value.map(item =>
        formatDate(new Date(item.createdAt))
      )
    }
    return []  // Return an empty array if no data is available
  })
  
    const formattedMonth = computed(() => {
      return new Intl.DateTimeFormat('en-US', { 
        month: 'long', 
        year: 'numeric' 
      }).format(currentMonth.value);
    });
  
    const getDaysInMonth = computed(() => {
      const year = currentMonth.value.getFullYear();
      const month = currentMonth.value.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      
      const days = Array.from({ length: daysInMonth }, (_, i) => {
        const currentDate = formatDate(new Date(year, month, i + 1));
        return {
          date: i + 1,
          fullDate: currentDate,
          isAvailable: availableDates.value.includes(currentDate)
        };
      });
  
      const weeks: (typeof days[0] | null)[][] = [];
      let currentWeek: (typeof days[0] | null)[] = Array(firstDayOfMonth).fill(null);
  
      days.forEach(day => {
        currentWeek.push(day);
        if (currentWeek.length === 7) {
          weeks.push(currentWeek);
          currentWeek = [];
        }
      });
  
      if (currentWeek.length > 0) {
        weeks.push(currentWeek);
      }
  
      return weeks;
    });
  
    // Fetch initial availability data
    // const fetchAvailability = async () => {
    //   try {
    //     loading.value = true;
    //     const { data } = await useFetch(`/api/houses/${houseId}/availability`);
    //     // availabilityData.value = data.value as Availability[];
    //   } catch (err) {
    //     error.value = 'Failed to fetch availability';
    //     console.error(err);
    //   } finally {
    //     loading.value = false;
    //   }
    // };
  
    // Fetch available times for selected date
    const fetchAvailableTimes = async (date: string) => {
      try {
        loading.value = true;
        const { data } = await useFetch(`/api/houses/${houseId}/available-times`, {
          params: { date }
        });
        availableTimeSlots.value = data.value as DayTimeSlot[];
      } catch (err) {
        error.value = 'Failed to fetch available times';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };
  
    const handleDateSelect = async (date: string) => {
      selectedDate.value = date;
      selectedTime.value = null;
      await getAvailabilityTimes(date);
    };
  
    const navigateMonth = (direction: 'prev' | 'next') => {
      const newDate = new Date(currentMonth.value);
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      currentMonth.value = newDate;
    };
  
    return {
      currentMonth,
      selectedDate,
      selectedTime,
      availableTimeSlots,
      loading,
      error,
      weekDays,
      formattedMonth,
      getDaysInMonth,
      navigateMonth,
      handleDateSelect,
      availabilityTimesList,
      fetchingAvailabilities,
      fetchingAvailabilityTimes
    //   fetchAvailability
    };
  };
  