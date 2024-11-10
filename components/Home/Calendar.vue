<template>
  <div class="">
    <!-- Month and Year Navigation -->
    <div class="flex justify-between items-center mb-4 px-9 pb-6">
      <h3 class="text-lg font-medium">{{ monthYearDisplay }}</h3>
      <div class="flex space-x-2 pr-10">
        <button @click="changeMonth(-1)" class="text-gray-500 hover:text-gray-700">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 9C0 9.3418 0.126953 9.63477 0.400391 9.88867L7.99805 17.3301C8.21289 17.5449 8.48633 17.6621 8.80859 17.6621C9.45312 17.6621 9.9707 17.1543 9.9707 16.5C9.9707 16.1777 9.83398 15.8945 9.61914 15.6699L2.77344 9L9.61914 2.33008C9.83398 2.10547 9.9707 1.8125 9.9707 1.5C9.9707 0.845703 9.45312 0.337891 8.80859 0.337891C8.48633 0.337891 8.21289 0.455078 7.99805 0.669922L0.400391 8.10156C0.126953 8.36523 0 8.6582 0 9Z"
              fill="#101928" />
          </svg>
        </button>
        <button @click="changeMonth(1)" class="text-gray-500 hover:text-gray-700">
          <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.002 9C9.99219 8.6582 9.86523 8.36523 9.60156 8.10156L2.00391 0.669922C1.7793 0.455078 1.51562 0.337891 1.19336 0.337891C0.539062 0.337891 0.03125 0.845703 0.03125 1.5C0.03125 1.8125 0.158203 2.10547 0.382812 2.33008L7.21875 9L0.382812 15.6699C0.158203 15.8945 0.03125 16.1777 0.03125 16.5C0.03125 17.1543 0.539062 17.6621 1.19336 17.6621C1.50586 17.6621 1.7793 17.5449 2.00391 17.3301L9.60156 9.88867C9.875 9.63477 10.002 9.3418 10.002 9Z"
              fill="#101928" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Day Labels -->
    <div class="grid grid-cols-7 text-center  pr-10 text-gray-500 mb-2">
      <span v-for="day in dayNames" :key="day" class="text-sm font-medium">{{ day }}</span>
    </div>

    <!-- Dates Grid -->
    <div class="grid grid-cols-7 text-center gap-y-2 pl-8">
      <!-- Offset for the first day of the month -->
      <div v-for="(_, index) in firstDayOffset" :key="'offset-' + index" class="p-2"></div>

      <!-- Dates -->
      <div
        v-for="day in daysInMonth"
        :key="day"
        @click="selectDate(day)"
        :class="{
          'bg-[#5B8469] text-white': isSelected(day),
          'text-gray-700': !isSelected(day)
        }"
        class="w-8 h-8 flex items-center justify-center text-center  rounded-full cursor-pointer transition-all"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, defineProps, defineEmits } from 'vue'

const props = defineProps<{ selectedDate: Date | null }>()
const emit = defineEmits<{ (e: 'update:selectedDate', date: Date | null): void }>()

const currentDate = new Date()
const month = ref(currentDate.getMonth())
const year = ref(currentDate.getFullYear())

const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const daysInMonth = computed(() => {
  return new Date(year.value, month.value + 1, 0).getDate()
})

const firstDayOffset = computed(() => {
  return new Date(year.value, month.value, 1).getDay()
})

const monthYearDisplay = computed(() => {
  return new Date(year.value, month.value).toLocaleString('default', { month: 'long', year: 'numeric' })
})

function changeMonth(direction: number) {
  month.value += direction
  if (month.value < 0) {
    month.value = 11
    year.value--
  } else if (month.value > 11) {
    month.value = 0
    year.value++
  }
}

function selectDate(day: number) {
  const selected = new Date(year.value, month.value, day)
  emit('update:selectedDate', selected)
}

function isSelected(day: number) {
  if (!props.selectedDate) return false
  const date = new Date(year.value, month.value, day)
  return props.selectedDate.toDateString() === date.toDateString()
}
</script>

<style scoped>
/* Optional additional styling */
</style>
