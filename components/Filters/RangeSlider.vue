<template>
  <div class="w-full">
    <div class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-100 rounded-lg px-4 text-gray-900">{{ title }}</div>
    <div class="relative w-full h-2 bg-gray-200 rounded-full mt-3">
      <div
        class="absolute h-full bg-green-600 rounded-full"
        :style="{
          left: `${((modelValue[0] - min) / (max - min)) * 100}%`,
          right: `${100 - ((modelValue[1] - min) / (max - min)) * 100}%`
        }"
      ></div>
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue[0]"
        @input="updateMin"
        class="absolute w-full h-2 opacity-0 cursor-pointer"
      />
      <input
        type="range"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue[1]"
        @input="updateMax"
        class="absolute w-full h-2 opacity-0 cursor-pointer"
      />
    </div>
    <div class="flex justify-between mt-2">
      <div class="text-sm text-gray-600">{{ formatValue(modelValue[0]) }}</div>
      <div class="text-sm text-gray-600">{{ formatValue(modelValue[1]) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: [number, number];
  min: number;
  max: number;
  step: number;
  title: string;
  prefix?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const formatValue = (value: number) => {
  return `${props.prefix || ''}${value.toLocaleString()}`;
};

const updateMin = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value);
  if (value < props.modelValue[1]) {
    emit('update:modelValue', [value, props.modelValue[1]]);
  }
};

const updateMax = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value);
  if (value > props.modelValue[0]) {
    emit('update:modelValue', [props.modelValue[0], value]);
  }
};
</script>