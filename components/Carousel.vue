<!-- 

   <template>
    <div id="parent" class="relative flex justify-center items-center w-full h-full">
      <img :src="dynamicImage(currentImage)" alt="carousel image" class="w-full h-[400px] max-w-lg  rounded-lg shadow-md" />
   <div class="flex justify-center items-center">
    <div class="absolute bottom-8 left-8 text-white text-left w-full">
      <div class="flex justify-center items-center flex-col" >
       <h2 class="text-2xl font-semibold text-center">{{ currentText.title }}</h2>
       <p class="mt-2 text-center max-w-lg mx-auto">{{ currentText.description }}</p>
      </div>
     </div>
   </div>
 <div class="">
  <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 ">
    <button
      v-for="(image, index) in images"
      :key="index"
      @click="setCurrentSlide(index)"
      :class="[
        'h-3 w-3 rounded-full',
        currentSlide === index ? 'bg-white' : 'bg-gray-500',
      ]"
    ></button>
  </div>
 </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { dynamicImage } from '@/utils/assets'
  import { ref, computed, onMounted } from 'vue';
  
  interface CarouselText {
    title: string;
    description: string;
  }
  
  const images = ref([
    'signup1.png',
    'signup2.png',
    'signup3.png',
    'signup4.png',
    'signup5.png',
  ]);
  
  const texts = ref<CarouselText[]>([
    { title: 'Effortless Home Management', description: 'Take control of your rented home right from your fingertips. Manage everything from maintenance requests to rental payments with ease.' },
    { title: 'Personalized Property Discovery', description: 'Find your dream property with ease! Our search matches you with homes tailored to your preferences.' },
    { title: 'Maintenance Made Simple', description: 'Submit maintenance requests with a few taps and keep track of them easily.' },
    { title: 'Utility Payments Simplified', description: 'Pay your utility bills on time and keep track of your payments in one place.' },
    { title: 'Manage Your Home on the Go', description: 'Access all your home management needs from your phone anytime, anywhere.' },
  ]);
  
  const currentSlide = ref(0);
  
  const currentImage = computed(() => images.value[currentSlide.value]);
  const currentText = computed(() => texts.value[currentSlide.value]);
  
  const setCurrentSlide = (index: number) => {
    currentSlide.value = index;
  };
  
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % images.value.length;
  };
  
  onMounted(() => {
    setInterval(nextSlide, 5000); 
  });
  </script> -->

  <template>
    <div id="parent" class="relative flex justify-center items-center w-full h-full">
      <!-- Carousel Images -->
      <img
        :src="dynamicImage(currentImage)"
        alt="carousel image"
        class="w-full h-[500px] max-w-3xl "
      />
  
      <!-- Text Overlay -->
      <div class="absolute -bottom-10 left-8 text-white text-left w-full">
        <div class="flex justify-center items-center flex-col">
          <h2 class="text-3xl font-semibold text-center">{{ currentText.title }}</h2>
          <p class="mt-2 text-center max-w-lg mx-auto">{{ currentText.description }}</p>
        </div>
      </div>
  
      <!-- Carousel Navigation Buttons -->
      <div class="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          v-for="(image, index) in images"
          :key="index"
          @click="setCurrentSlide(index)"
          :class="[
            'h-3 w-3 rounded-full',
            currentSlide === index ? 'bg-white' : 'bg-gray-500',
          ]"
        ></button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { dynamicImage } from '@/utils/assets'; // Adjust the path to your image utility
  
  // Carousel Images and Text
  const images = ref([
    'signup1.png',
    'signup2.png',
    'signup3.png',
    'signup4.png',
    'signup5.png',
  ]);
  
  interface CarouselText {
    title: string;
    description: string;
  }
  
  const texts = ref<CarouselText[]>([
    { title: 'Effortless Home Management', description: 'Take control of your rented home right from your fingertips. Manage everything from maintenance requests to rental payments with ease.' },
    { title: 'Personalized Property Discovery', description: 'Find your dream property with ease! Our search matches you with homes tailored to your preferences.' },
    { title: 'Maintenance Made Simple', description: 'Submit maintenance requests with a few taps and keep track of them easily.' },
    { title: 'Utility Payments Simplified', description: 'Pay your utility bills on time and keep track of your payments in one place.' },
    { title: 'Manage Your Home on the Go', description: 'Access all your home management needs from your phone anytime, anywhere.' },
  ]);
  
  // Carousel State
  const currentSlide = ref(0);
  
  // Computed Properties for Current Image and Text
  const currentImage = computed(() => images.value[currentSlide.value]);
  const currentText = computed(() => texts.value[currentSlide.value]);
  
  // Set the current slide when clicking on a navigation dot
  const setCurrentSlide = (index: number) => {
    currentSlide.value = index;
  };
  
  // Auto-slide every 5 seconds
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % images.value.length;
  };
  
  onMounted(() => {
    setInterval(nextSlide, 5000);
  });
  </script>
  
  <style scoped>
  /* Additional styling if needed */
  </style>
  