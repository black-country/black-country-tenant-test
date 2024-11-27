 <template>
    <div
      @click="toggleActive"
      :class="[
        'flex items-center justify-center w-6 h-6 rounded-lg cursor-pointer transition-all duration-300',
        isActive ? 'bg-green-100 border border-green-500' : 'bg-white border border-gray-300'
      ]"
    >
      <svg
        v-if="isActive"
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>

    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, defineEmits } from 'vue';
  
  const isActive = ref(false);
  const emits = defineEmits(['update']);

  const props = defineProps({
    uncheckedObj: { type: Object, required: true },
    checkedObj: { type: Object, required: true }
  })
  
  const toggleActive = () => {
    isActive.value = !isActive.value;
    emits('update', isActive.value);
  };
  </script>
