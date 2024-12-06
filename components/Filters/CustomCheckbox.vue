<template>
  <div class="flex items-center">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="hidden"
      :id="id"
    />
    <label :for="id" class="flex items-center cursor-pointer">
      <div class="w-5 h-5 border border-gray-300 rounded-md flex items-center justify-center bg-white">
        <div v-if="modelValue" class="w-3 h-3 bg-green-600 rounded-sm"></div>
      </div>
      <span class="ml-2 text-gray-700">{{ label }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  label: string;
  id: string;
}>();
defineEmits(['update:modelValue']);
</script>