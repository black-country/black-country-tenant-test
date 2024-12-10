<template>
  <div class="w-full">
    <div class="font-medium text-sm bg-white py-3 border-[0.5px] border-gray-50 rounded-lg px-4 text-gray-900">{{ title }}</div>
    <div class="border-[0.5px] border-gray-50 p-2 py-3 rounded-lg mt-1">
      <div class="relative w-full h-2 bg-gray-200 rounded-full mt-2">
        <div
          class="absolute h-full bg-[#5B8469] rounded-full"
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
        <div class="text-sm text-gray-600">
          <p class="text-xs">Minimum</p>
          <select class="outline-none border-none" v-model="selectedUnit" v-if="code === 'room'">
              <option v-for="item in propertyUnits" :key="item" :value="item">{{ item }}</option>
          </select>
          {{ formatValue(modelValue[0]) }}
        </div>
        <div class="text-sm text-gray-600">
          <p class="text-xs">Maximum</p>
          <select class="outline-none border-none" v-model="selectedUnit" v-if="code === 'room'">
            <option v-for="item in propertyUnits" :key="item" :value="item">{{ item }}</option>
          </select>
          {{ formatValue(modelValue[1]) }}
        </div>
      </div>
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
  code?: string
}>();

const propertyUnits = ref([
  "sqm",
  "acre",
  "hectare",
  "sq ft",
  "sq in",
  "sq yd",
  "sq mi",
  "are",
  "centiare",
  "rood",
  "section",
  "perch"
])

const selectedUnit = ref('sq ft')

const emit = defineEmits(['update:modelValue', 'update:selectedUnit']);

const formatValue = (value: number) => {
  return `${props.prefix || ''}${value?.toLocaleString()}`;
};

const updateMin = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value);
  console.log('updateMin emitting:', value); // Debug log
  if (value < props.modelValue[1]) {
    emit('update:modelValue', [value, props.modelValue[1]]);
  }
};

const updateMax = (e: Event) => {
  const value = Number((e.target as HTMLInputElement).value);
  console.log('updateMax emitting:', value); // Debug log
  if (value > props.modelValue[0]) {
    emit('update:modelValue', [props.modelValue[0], value]);
  }
};

// Watch for changes to selectedUnit and emit the new value
watch(selectedUnit, (newUnit) => {
  emit('update:selectedUnit', newUnit);
});
</script>
