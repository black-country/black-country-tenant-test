import { ref, computed } from 'vue'

export const useTour = () => {
  const isTourActive = ref(false)
  const currentStep = ref(0)
  const hasSeenTour = ref(false)

  const steps = ref<TourStep[]>([
      {
        target: '[data-v-tour="home"]',
        header: 'My Home',
        content: 'Manage your rented space, pay rent, request maintenance, and more—all from one place.',
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