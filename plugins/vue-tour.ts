import { defineNuxtPlugin } from "#app";
import VueTour from "v3-tour";
import "v3-tour/dist/vue-tour.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTour);

  // Optionally make the tours available globally on the window object
  if (process.client) {
    window.tours = nuxtApp.vueApp.config.globalProperties.$tours;
  }
});
