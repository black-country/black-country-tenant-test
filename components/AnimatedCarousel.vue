<template>
    <div class="relative h-screen">
      <div class="relative h-full">
        <TransitionGroup 
          name="carousel" 
          class="h-full"
          tag="div"
        >
          <div
            v-for="(slide, index) in slides"
            :key="slide.id"
            v-show="currentSlide === index"
            class="absolute inset-0"
          >
            <div class="h-full px-4 py-8 bg-[url('@/assets/img/authBg.png')] bg-black/90 bg-cover">
              <div class="flex flex-col h-full justify-between">
                <div class="mt-8">
                  <div v-if="index === 0" class="">
                    <img :src="slide.propertyCard.image" alt="Property" class="" />
                  </div>
                  <div v-else class="flex justify-center items-center flex-col mt-32">
                    <img :src="slide.propertyCard.image" alt="Property" class="pb-3" />
                    <h2 v-if="slide?.text" class="text-xl font-semibold text-white mb-2">
                      {{ slide?.text }}
                    </h2>
                    <p v-if="slide?.desc" class="text-white/80 text-center text-sm px-4">
                        {{ slide?.desc }}
                    </p>
                
                  </div>
                </div>
  
                <!-- Bottom Navigation -->
                <div class="space-y-4">
                  <!-- Carousel Dots -->
                  <div class="flex justify-center gap-2 pt-3">
                    <button
                      v-for="(_, index) in slides"
                      :key="index"
                      @click="currentSlide = index"
                      class="w-2 h-2 rounded-full transition-all duration-300"
                      :class="currentSlide === index ? 'bg-white w-8' : 'bg-white/50'"
                    ></button>
                  </div>
  
                  <!-- Action Buttons -->
                  <div class="space-y-3 px-2 lg:px-4">
                    <button @click="router.push('/login')" class="w-full py-4 text-white bg-[#292929] text-sm rounded-lg font-medium">
                      Let's get you started
                    </button>
                    <button @click="router.push('/login')" class="w-full py-4 bg-[#EBE5E0] text-[#1D192B] text-sm rounded-lg font-medium">
                      Login
                    </button>
                    <div class="flex items-center justify-center gap-2 pt-4 text-sm">
                      <span class="text-white">Explore Listings without signing up</span>
                      <NuxtLink to="/dashboard/listings" class="text-[#5B8469] font-semibold">Explore</NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import image1 from '@/assets/img/carousel-image1.png'
    import welcome from '@/assets/img/welcome-carousel2.png'
    import image2 from '@/assets/img/carousel-image2.png'
      import image3 from '@/assets/img/carousel-image3.png'
  import { ref, onMounted, onBeforeUnmount } from 'vue'
//   import { HeartIcon } from 'lucide-react'
const router = useRouter()
  
  interface PropertyCard {
    image: string
    title: string,
    text: string,
    desc: string,
    location: string
    price: string
    bedrooms: number
    bathrooms: number
    sqft: number
  }
  
  interface Slide {
    id: number
    propertyCard?: PropertyCard
  }
  
  const slides: Slide[] = [
  { 
      id: 1,
      text: '',
      desc: '',
        propertyCard: {
        image: welcome,
        title: 'AGee lifestyle co-living space',
        location: 'Lagos Tower, off Ajose Adeogun VI, Lagos',
        price: '₦30M',
        bedrooms: 5,
        bathrooms: 5,
        sqft: 5254
      },
     },
    { 
         id: 2,
      text: 'Personalized Property Discovery',
      desc: 'Find your dream property with ease! Our search matches you with homes tailored to your preferences.',
        propertyCard: {
        image: image1,
        title: 'AGee lifestyle co-living space',
        location: 'Lagos Tower, off Ajose Adeogun VI, Lagos',
        price: '₦30M',
        bedrooms: 5,
        bathrooms: 5,
        sqft: 5254
      },
     },
    { 
      id: 2,
      text: 'Personalized Property Discovery',
      desc: 'Find your dream property with ease! Our search matches you with homes tailored to your preferences.',
      propertyCard: {
        image: image1,
        title: 'AGee lifestyle co-living space',
        location: 'Lagos Tower, off Ajose Adeogun VI, Lagos',
        price: '₦30M',
        bedrooms: 5,
        bathrooms: 5,
        sqft: 5254
      },
      
    },
    { 
      id: 2,
      text: 'Simplify Your Lease Application',
      desc: 'Easily submit your application for your preferred home, schedule visits, and sign your lease agreement stress-free.',
      propertyCard: {
        image: image2,
        title: 'AGee lifestyle co-living space',
        location: 'Lagos Tower, off Ajose Adeogun VI, Lagos',
        price: '₦30M',
        bedrooms: 5,
        bathrooms: 5,
        sqft: 5254
      },
      
    },
    { 
      id: 2,
      text: 'Effortless Home Management',
      desc: 'Take control of your rented home right from your fingertips. Manage everything from maintenance requests to rental payments with ease.',
      propertyCard: {
        image: image3,
        title: 'AGee lifestyle co-living space',
        location: 'Lagos Tower, off Ajose Adeogun VI, Lagos',
        price: '₦30M',
        bedrooms: 5,
        bathrooms: 5,
        sqft: 5254
      },
      
    }
  ]
  
  const currentSlide = ref(0)
  const autoplayInterval = ref<NodeJS.Timeout>()
  
  const startAutoplay = () => {
    autoplayInterval.value = setInterval(() => {
      currentSlide.value = (currentSlide.value + 1) % slides.length
    }, 5000)
  }
  
  onMounted(() => {
    startAutoplay()
  })
  
  onBeforeUnmount(() => {
    if (autoplayInterval.value) {
      clearInterval(autoplayInterval.value)
    }
  })
  </script>
  
  <style scoped>
  .carousel-enter-active,
  .carousel-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .carousel-enter-from,
  .carousel-leave-to {
    opacity: 0;
  }
  </style>