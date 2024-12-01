<template>
  <div class="w-full">
    <label :for="id" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :id="id"
      type="date"
      :value="modelValue"
      @input="handleInput"
      :min="minDate"
      :max="maxDate"
      class="w-full p-2 mt-1 w-full outline-none focus-within:border-2 focus-within:border-[#5B8469] border-[0.5px] text-sm rounded-md bg-[#E4E7EC] py-4"
      :class="{ 'border-red-500': error }"
    />
    <p v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  id?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Date of Birth',
  id: 'date-of-birth'
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const error = ref<string>('');

// Calculate the minimum date (18 years ago from today)
const minDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 100); // Maximum age limit (optional)
  return date.toISOString().split('T')[0];
});

// Calculate the maximum date (18 years ago from today)
const maxDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date.toISOString().split('T')[0];
});

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const selectedDate = new Date(input.value);
  const today = new Date();
  const age = today.getFullYear() - selectedDate.getFullYear();
  
  // Check if birthday hasn't occurred this year
  const hasBirthdayOccurred = 
    today.getMonth() > selectedDate.getMonth() || 
    (today.getMonth() === selectedDate.getMonth() && today.getDate() >= selectedDate.getDate());
  
  const actualAge = hasBirthdayOccurred ? age : age - 1;

  if (actualAge < 18) {
    error.value = 'You must be at least 18 years old to sign up.';
    emit('update:modelValue', '');
    return;
  }

  error.value = '';
  emit('update:modelValue', input.value);
};
</script>