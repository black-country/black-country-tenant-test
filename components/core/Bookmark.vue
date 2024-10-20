<template>
    <button
    @click="toggleLike(property)"
    class="absolute top-3 right-3 text-white hover:text-red-500 focus:outline-none"
  >
    <svg
      v-if="property?.liked"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="20" fill="#D42620" />
      <path
        d="M27.4626 11.9942C24.7809 10.3492 22.4404 11.0121 21.0344 12.068C20.4578 12.501 20.1696 12.7174 20 12.7174C19.8304 12.7174 19.5422 12.501 18.9656 12.068C17.5596 11.0121 15.2191 10.3492 12.5374 11.9942C9.01807 14.1529 8.22172 21.2749 16.3395 27.2834C17.8857 28.4278 18.6588 29 20 29C21.3412 29 22.1143 28.4278 23.6605 27.2834C31.7783 21.2749 30.9819 14.1529 27.4626 11.9942Z"
        fill="white"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>

    <svg
      v-else
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="40"
        height="40"
        rx="20"
        fill="black"
        fill-opacity="0.6"
      />
      <path
        d="M27.4626 11.9942C24.7809 10.3492 22.4404 11.0121 21.0344 12.068C20.4578 12.501 20.1696 12.7174 20 12.7174C19.8304 12.7174 19.5422 12.501 18.9656 12.068C17.5596 11.0121 15.2191 10.3492 12.5374 11.9942C9.01807 14.1529 8.22172 21.2749 16.3395 27.2834C17.8857 28.4278 18.6588 29 20 29C21.3412 29 22.1143 28.4278 23.6605 27.2834C31.7783 21.2749 30.9819 14.1529 27.4626 11.9942Z"
        stroke="#F9FAFB"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useBookmarkProperty } from "@/composables/modules/property/bookmark";
const { bookmarkProperty, loading } = useBookmarkProperty();

const props = defineProps({
    property: {
        type: Object
    }
})

const toggleLike = (property: any) => {
  bookmarkProperty(property.id);
};
</script>

