<!-- <template>
    <div class="relative w-full h-56">
      <template v-for="(image, index) in property?.images" :key="index">
        <img
          v-show="currentIndex === index"
          :src="image"
          @click="router.push(`/dashboard/listings/${property.id}/preview`)"
          class="absolute top-0 left-0 rounded-lg cursor-pointer object-cover h-56 w-full transition-opacity duration-300"
          :alt="`Property image ${index + 1}`"
        />
      </template>
  
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button
          v-for="(_, index) in property?.images"
          :key="index"
          @click="currentIndex = index"
          class="w-3 h-3 rounded-full transition-colors duration-200"
          :class="currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'"
          :aria-label="`Go to image ${index + 1}`"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Property {
    id: string;
    images: string[];
  }
  
  const props = defineProps<{
    property?: Property;
  }>();
  
  const router = useRouter();
  const currentIndex = ref(0);
  
  const previousImage = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  };
  
  const nextImage = () => {
    if (props.property?.images && currentIndex.value < props.property.images.length - 1) {
      currentIndex.value++;
    }
  };
  
  // Optional: Keyboard navigation
  onMounted(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        previousImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }
    };
  
    window.addEventListener('keydown', handleKeydown);
  
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
  });
  </script> -->

  <template>
    <div class="relative w-full h-56">
      <!-- Images with Overlay -->
      <template v-for="(image, index) in property?.images" :key="index">
        <div 
          v-show="currentIndex === index"
          class="absolute top-0 left-0 w-full h-full"
        >
          <img
            :src="image"
            @click="router.push(`/dashboard/listings/${property.id}/preview`)"
            class="absolute top-0 left-0 rounded-lg cursor-pointer object-cover h-full w-full transition-opacity duration-300"
            :alt="`Property image ${index + 1}`"
          />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 rounded-lg"></div>
        </div>
      </template>
  
      <!-- Navigation Buttons -->
      <!-- <button 
        @click="previousImage"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200 z-10"
        :class="{ 'invisible': currentIndex === 0 }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button> -->
  
      <!-- <button 
        @click="nextImage"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200 z-10"
        :class="{ 'invisible': currentIndex === (property?.images?.length ?? 0) - 1 }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
   -->
      <!-- Indicators -->
      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        <button
          v-for="(_, index) in property?.images"
          :key="index"
          @click="currentIndex = index"
          class="w-3 h-3 rounded-full transition-colors duration-200"
          :class="currentIndex === index ? 'bg-white' : 'bg-white/50 hover:bg-white/70'"
          :aria-label="`Go to image ${index + 1}`"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Property {
    id: string;
    images: string[];
  }
  
  const props = defineProps<{
    property?: Property;
  }>();
  
  const router = useRouter();
  const currentIndex = ref(0);
  
  const previousImage = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  };
  
  const nextImage = () => {
    if (props.property?.images && currentIndex.value < props.property.images.length - 1) {
      currentIndex.value++;
    }
  };
  
  // Optional: Keyboard navigation
  onMounted(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        previousImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      }
    };
  
    window.addEventListener('keydown', handleKeydown);
  
    onUnmounted(() => {
      window.removeEventListener('keydown', handleKeydown);
    });
  });
  </script>