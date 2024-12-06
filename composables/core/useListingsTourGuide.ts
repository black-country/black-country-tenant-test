import { ref, computed } from 'vue'

export const useTour = () => {
  const isTourActive = ref(false)
  const currentStep = ref(0)
  const hasSeenTour = ref(false)

  const steps = ref<TourStep[]>([
    {
        target: '[data-v-tour="listings"]',
        header: 'Listings',
        content: 'Explore available properties, filter by preferences, and find your perfect home.',
        params: {
          placement: 'top'
        }
      },
      {
        target: '[data-v-tour="mapview"]',
        header: 'Map View',
        content: 'Get a visual overview of available properties in your desired area, making it easier to find your next home.',
        params: {
          placement: 'top'
        }
      },
      {
        target: '[data-v-tour="listview"]',
        header: 'List View',
        content: 'When in the map view, click to browse properties in a convenient list format, complete with essential details for each listing. Start your search hassle-free!',
        params: {
          placement: 'top'
        }
      }
    // Add more steps as needed
  ])

  const isLastStep = computed(() => currentStep.value === steps.value.length - 1)

  const startTour = () => {
    if (!hasSeenTour.value) {
      isTourActive.value = true
      currentStep.value = 0
    }
  }

  const endTour = () => {
    isTourActive.value = false
    hasSeenTour.value = true
    // Save to localStorage to remember user has seen tour
    localStorage.setItem('hasSeenTour', 'true')
  }

  const nextStep = () => {
    if (currentStep.value < steps.value.length - 1) {
      currentStep.value++
    } else {
      endTour()
    }
  }

  const previousStep = () => {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }

  // Initialize tour state from localStorage
  const initTour = () => {
    hasSeenTour.value = localStorage.getItem('hasSeenTour') === 'true'
    if (!hasSeenTour.value) {
      startTour()
    }
  }

  return {
    steps,
    isTourActive,
    currentStep,
    isLastStep,
    startTour,
    endTour,
    nextStep,
    previousStep,
    initTour
  }
}