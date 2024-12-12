// plugins/dayjs.ts
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

// Extend Day.js with the isBetween plugin
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dayjs
    }
  }
})
