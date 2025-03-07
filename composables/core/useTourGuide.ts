import { ref, onMounted } from 'vue'

// const imageUrl = useRuntimeConfig().public.imageBaseUrl

// const imageUrls = {
//   welcome: `${imageUrl}img/welcome.png`,
//   dashboard: `${imageUrl}img/dashboard.png`,
//   listings: `${imageUrl}img/listings.png`,
//   saved: `${imageUrl}img/saved.svg`,
//   myHome: `${imageUrl}img/my-home.png`,
//   save: `${imageUrl}img/save.png`,
//   mapView: `${imageUrl}img/map-view.png`,
//   listView: `${imageUrl}img/list-view.png`,
// };

import image1 from  '@/assets/img/welcome.png'
import image2 from '@/assets/img/dashboard.jpg'
import image3 from '@/assets/img/listings.jpg'
import image4 from '@/assets/img/saved.jpg'
import image5 from '@/assets/img/my-home.jpg'
import image6 from '@/assets/img/save.jpg'
import image7 from '@/assets/img/map-view.jpg'
import image8 from '@/assets/img/list-view.jpg'
import { use_update_profile } from '@/composables/auth/updateProfile'
const { updateProfile, credential, } = use_update_profile()

const isTourActive = ref(false)
const currentStep = ref(0)
const isMobileView = ref(false)
const activeTourSteps = ref<any[]>([])
const isWelcomeModalActive = ref(false);

export const useTourGuide = () => {
  const allTourSteps = [
    {
      title: 'Dashboard',
      description: 'Stay organized with your dashboard: track your applications, view saved properties, manage upcoming tours, and keep up with updates—all in one place.',
      image: image2,
      id: 'dashboard'
    },
    {
      title: 'Listings',
      description: 'Explore available properties, filter by preferences, and find your perfect home.',
      image: image3,
      id: 'listings'
    },
    {
      title: 'Saved Properties',
      description: 'Easily revisit properties you love and keep track of potential homes as you explore more options.',
      image: image4,
      id: 'saved'
    },
    {
      title: 'My Home',
      description: "Manage your living space, view lease details, and access exclusive features. Unlock more once you've applied for a room, signed the agreement, and made your first payment.",
      image: image5,
      id: 'my-home'
    },
    {
      title: 'Save Property',
      description: 'Save properties to your favorites and keep it handy for future reference as you plan your next move.',
      image: image6,
      id: 'save'
    },
    {
      title: 'Map View',
      description: 'Get a visual overview of available properties in your desired area, making it easier to find your next home.',
      image: image7,
      id: 'map'
    },
    {
      title: 'List View',
      description: 'When in the map view, click to browse properties in a convenient list format, complete with essential details for each listing. Start your search hassle-free!',
      image: image8,
      id: 'list'
    }
  ]

  const tourConfigs = {
    'home-page': {
      start: 'dashboard',
      end: 'my-home',
      storageKey: 'homeTourCompleted'
    },
    'list-page': {
      start: 'save',
      end: 'list',
      storageKey: 'listTourCompleted'
    }
  }

  const checkMobileView = () => {
    isMobileView.value = window.innerWidth < 768
  }

  const nextStep = () => {
    if (currentStep.value < activeTourSteps.value.length - 1) {
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

  const endTour = async () => {
    const currentConfig = getCurrentTourConfig()
    if (currentConfig) {
      localStorage.setItem(currentConfig.storageKey, 'true')
    }

    // API call to update profile
    //  try {
    //   await updateProfile({
    //     hasTakenTour: true
    //   })
    //   console.log('Profile updated successfully');
    // } catch (error) {
    //   console.error('Error updating profile:', error);
    // }

    try {
      // Check if the user is on the specific URL path
      // const currentUrl = window.location.pathname + window.location.search
      // if (currentUrl === '/dashboard/listings?view=grid') {
        await updateProfile({
          hasExploredListing: true
        })
        console.log('Profile updated with hasExploredListings: true')
      // } 
      // else {
      //   await updateProfile({
      //     hasTakenTour: true
      //   })
      //   console.log('Profile updated with hasTakenTour: true')
      // }
    } catch (error) {
      console.error('Error updating profile:', error)
    }

    isTourActive.value = false
  }

  const getCurrentTourConfig = () => {
    return Object.values(tourConfigs).find(config => {
      const steps = getTourStepsForPage(config)
      return steps.some(step => step.id === activeTourSteps.value[currentStep.value]?.id)
    })
  }

  const getTourStepsForPage = (config: typeof tourConfigs[keyof typeof tourConfigs]) => {
    const startIndex = allTourSteps.findIndex(step => step.id === config.start)
    const endIndex = allTourSteps.findIndex(step => step.id === config.end)

    return allTourSteps.slice(startIndex, endIndex + 1).map((step, index, array) => ({
      ...step,
      showSkip: index === 0,
      showEnd: index === array.length - 1,
      showNext: index !== array.length - 1,
      showPrevious: index !== 0
    }))
  }

  const isTourCompleted = (pageName: 'home-page' | 'list-page'): boolean => {
    const config = tourConfigs[pageName]
    return localStorage.getItem(config.storageKey) === 'true'
  }




  const startTourGuide = (pageName: 'home-page' | 'list-page') => {
    console.log(`Starting tour guide for: ${pageName}`);

    // Show welcome modal before starting the tour
    if (pageName === 'home-page') {
      isWelcomeModalActive.value = true;
    }

    //   else {
    //     initializeTour(config);
    //   }


    const config = tourConfigs[pageName];
    if (!config) {
      console.warn(`No tour configuration found for page: ${pageName}`);
      return;
    }

    // Check if the current tour is already completed
    if (isTourCompleted(pageName)) {
      console.log(`Tour for ${pageName} already completed. Skipping.`);
      return;
    }

    // Refactor logic for skipping tours based on dependencies
    if (pageName === 'list-page' && isTourCompleted('home-page')) {
      console.log('Home tour completed, but starting list-page tour as it should not be skipped.');
    }

    if (pageName === 'home-page' && isTourCompleted('list-page')) {
      console.log('List tour completed. Skipping home-page tour.');
      return;
    }

    // Initialize tour
    activeTourSteps.value = getTourStepsForPage(config);
    currentStep.value = 0;
    isTourActive.value = true;
    console.log('Tour guide started:', { activeTourSteps: activeTourSteps.value });
  };


  const initializeTour = (config: any) => {
    activeTourSteps.value = getTourStepsForPage(config);
    currentStep.value = 0;
    isTourActive.value = true;
    console.log('Tour guide initialized:', { activeTourSteps: activeTourSteps.value });
  };

  const handleWelcomeModalAction = (action: any) => {
    if (action === 'continue') {
      const config = tourConfigs['home-page'];
      isWelcomeModalActive.value = false;
      initializeTour(config);
    } else if (action === 'skip') {
      isWelcomeModalActive.value = false;
      localStorage.setItem(tourConfigs['home-page'].storageKey, 'true');
      updateProfile({
        hasTakenTour : true
      })
    }
  };


  onMounted(() => {
    checkMobileView()
    isWelcomeModalActive.value = !isTourCompleted('home-page');
  }) 

  return {
    isMobileView,
    isTourActive,
    currentStep,
    tourSteps: activeTourSteps,
    startTourGuide,
    isTourCompleted,
    checkMobileView,
    nextStep,
    previousStep,
    endTour,
    isWelcomeModalActive,
    handleWelcomeModalAction
  }
}
