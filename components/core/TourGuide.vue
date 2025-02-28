  <!-- components/TourGuide.vue -->
<template>
  <Teleport to="body">
    <TransitionRoot appear :show="isTourActive" as="template">
      <Dialog as="div" @close="endTour" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-[#292929] bg-opacity-50" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div class="relative">
                  <button
                    @click="handleClose"
                    class="absolute right-0 top-0 p-2"
                  >
                    <XMarkIcon class="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <div class="mt-4">
                  <img
                    v-if="currentStep !== null && tourSteps[currentStep]"
                    :src="tourSteps[currentStep].image"
                    :alt="tourSteps[currentStep].title"
                    class="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <DialogTitle
                    as="h3"
                    class="text-lg font-medium leading-6 text-gray-900 mb-2"
                  >
                    {{ currentStep !== null && tourSteps[currentStep]?.title }}
                  </DialogTitle>
                  <p class="text-sm text-gray-500">
                    {{ currentStep !== null && tourSteps[currentStep]?.description }}
                  </p>
                </div>

                <div class="mt-6 flex justify-between gap-3">
                  <button
                    v-if="currentStep !== null && tourSteps[currentStep]?.showSkip"
                    @click="endTour"
                    class="inline-flex w-full justify-center bg-[#EBE5E0] rounded-md px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none"
                  >
                    Skip tour
                  </button>
                  <button
                    v-if="currentStep !== null && tourSteps[currentStep]?.showPrevious"
                    @click="previousStep"
                    class="inline-flex w-full justify-center bg-[#EBE5E0] rounded-md px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none"
                  >
                    Previous
                  </button>
                  <button
                    v-if="currentStep !== null && tourSteps[currentStep]?.showContinue"
                    @click="nextStep"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-[#292929] px-4 py-3 text-sm font-medium text-white focus:outline-none"
                  >
                    Continue
                  </button>
                  <button
                    v-if="currentStep !== null && tourSteps[currentStep]?.showNext"
                    @click="nextStep"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-[#292929] px-4 py-3 text-sm font-medium text-white focus:outline-none"
                  >
                    Next
                  </button>
                  <button
                    v-if="currentStep !== null && tourSteps[currentStep]?.showEnd"
                    @click="endTour"
                    class="inline-flex w-full justify-center rounded-md border border-transparent bg-[#292929] px-4 py-3 text-sm font-medium text-white focus:outline-none"
                  >
                    End tour
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </Teleport>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { onMounted, watch, ref, defineExpose } from 'vue'
import { useTourGuide } from '@/composables/core/useTourGuide'
import { use_update_profile } from '@/composables/auth/updateProfile'
const { updateProfile, credential, } = use_update_profile()

const {
  isTourActive,
  currentStep,
  tourSteps,
  nextStep,
  previousStep,
  endTour,
  startTourGuide,
  isTourCompleted
} = useTourGuide()

const props = defineProps<{
  pageName: 'home-page' | 'list-page',
}>()

// // Lifecycle method to initialize the tour
// onMounted(() => {
//   console.log('onMounted called for TourGuide component');
//   console.log('pageName:', props.pageName);
//   console.log('isTourCompleted (home-page):', isTourCompleted('home-page'));
//   console.log('isTourCompleted (list-page):', isTourCompleted('list-page'));

//   // Prevent redundant initialization
//   if (!isTourActive.value) {
//     startTourGuide(props.pageName);
//   } else {
//     console.warn('Tour already active. Skipping redundant startTourGuide call.');
//   }
// });''

// Lifecycle method to initialize the tour
onMounted(() => {
  console.log('onMounted called for TourGuide component');
  console.log('pageName:', props.pageName);
  console.log('isTourCompleted (home-page):', isTourCompleted('home-page'));
  console.log('isTourCompleted (list-page):', isTourCompleted('list-page'));

  // Prevent the tour from starting if already completed
  if (isTourCompleted(props.pageName)) {
    console.log(`Tour for ${props.pageName} already completed. Skipping tour.`);
    return;
  }

  // Start the tour if not already active
  // if (!isTourActive.value) {
  //   startTourGuide(props.pageName);
  // } else {
  //   console.warn('Tour already active. Skipping redundant startTourGuide call.');
  // }
});

defineExpose({
  startTourGuide
});

watch(isTourActive, (newVal) => {
  console.log('isTourActive changed:', newVal);
});
const handleClose = async () => {
  if(props.pageName === 'list-page' ){
    await updateProfile({
      hasExploredListing: true
    })
    endTour()
  }
  else{
    await updateProfile({
      hasTakenTour: true
    })
    endTour()
  }
}


</script>