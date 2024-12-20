<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm" data-intro="Welcome to our landing page! Let's take a quick tour.">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex-shrink-0" data-intro="This is our company logo">
            <!-- <img class="h-8 w-auto" src="/logo-placeholder.svg" alt="Logo" /> -->
          </div>
          
          <div class="hidden md:block" data-intro="Navigate through our main sections">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="#" class="text-gray-700 hover:text-gray-900 px-3 py-2">Features</a>
              <a href="#" class="text-gray-700 hover:text-gray-900 px-3 py-2">Pricing</a>
              <a href="#" class="text-gray-700 hover:text-gray-900 px-3 py-2">About</a>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <main>
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div class="text-center" data-intro="Learn about our amazing product!">
          <h1 class="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Our Platform
          </h1>
          <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            The best solution for your business needs.
          </p>
          <div class="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div class="rounded-md shadow">
              <a
                href="#"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                data-intro="Get started with our platform today!"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-12 bg-white" data-intro="Check out our key features">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Feature cards would go here -->
          </div>
        </div>
      </div>
    </main>

    <!-- Start Tour Button -->
    <button
      @click="startTour"
      class="fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
    >
      Start Tour
    </button>
  </div>
</template>

<script setup lang="ts">
const { $introJs } = useNuxtApp()

const startTour = () => {
  $introJs()
    .setOptions({
      steps: [
        {
          title: 'Welcome',
          intro: 'Welcome to our landing page! Let\'s take a quick tour.'
        },
        {
          element: '[data-intro="This is our company logo"]',
          intro: 'This is our company logo'
        },
        {
          element: '[data-intro="Navigate through our main sections"]',
          intro: 'Navigate through our main sections'
        },
        {
          element: '[data-intro="Learn about our amazing product!"]',
          intro: 'Learn about our amazing product!'
        },
        {
          element: '[data-intro="Get started with our platform today!"]',
          intro: 'Get started with our platform today!'
        },
        {
          element: '[data-intro="Check out our key features"]',
          intro: 'Check out our key features'
        }
      ],
      showProgress: true,
      showBullets: true,
      exitOnOverlayClick: false,
      showStepNumbers: true
    })
    .start()
}
</script>