// // plugins/vue-tour.client.ts
// import { defineNuxtPlugin } from '#app'
// import VueTour from 'vue-tour'

// export default defineNuxtPlugin((nuxtApp) => {
//   nuxtApp.vueApp.use(VueTour)
// })

// // types/tour.ts
// export interface TourStep {
//   target: string
//   header: string
//   content: string
//   params?: {
//     placement?: 'top' | 'bottom' | 'left' | 'right'
//     enableScrolling?: boolean
//   }
// }

// plugins/vue-tour.client.ts
import { defineNuxtPlugin } from '#app';
import * as VueTour from 'vue-tour';  // Import all exports from vue-tour
import 'vue-tour/dist/vue-tour.css';

export default defineNuxtPlugin((nuxtApp) => {
  // Use the module correctly based on the structure
  nuxtApp.vueApp.use(VueTour);  // Use the entire VueTour object
});
