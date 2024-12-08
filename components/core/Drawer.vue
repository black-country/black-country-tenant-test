<!-- <template>
    <div v-if="show" class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500/90 transition-opacity" aria-hidden="true"></div>

  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div class="pointer-events-auto relative w-screen max-w-md">
          <div class="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
            <button @click="close" type="button" class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
              <span class="absolute -inset-2.5"></span>
              <span class="sr-only">Close panel</span>
              <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
            <div class="px-4 sm:px-6">
              <h2 class="text-base font-semibold text-gray-900" id="slide-over-title">{{ title }}</h2>
            </div>
            <div class="relative mt-6 flex-1 p-4">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    }
})

const emit = defineEmits(['close'])

const close = () => {
    emit('close')
}
</script> -->

<template>
  <div v-if="show" class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  <!-- Background backdrop, show/hide based on slide-over state. -->
  <div class="fixed inset-0 bg-gray-500/90 transition-opacity" aria-hidden="true"></div>

  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div class="pointer-events-auto w-screen max-w-md">
          <div class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
            <div class="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
              <div class="px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-base font-semibold text-gray-900" id="slide-over-title">{{ title ?? 'Nil' }}</h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button @click="close" type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <span class="absolute -inset-2.5"></span>
                      <span class="sr-only">Close panel</span>
                      <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="relative mt-6 flex-1 px-4 sm:px-6">
                <slot></slot>
              </div>
            </div>
            <div v-if="footer" class="flex justify-between space-x-6 items-center w-full px-4 py-4">
              <slot name="action"></slot>
              <!-- <button type="button" class="rounded-md w-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">Cancel</button>
              <button type="submit" class="ml-4 w-full inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script setup lang="ts">
const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    },
    footer: {
      type: Boolean,
      default: false
    }
})

const emit = defineEmits(['close'])

const close = () => {
    emit('close')
}
</script> 