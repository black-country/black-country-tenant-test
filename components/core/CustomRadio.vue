<template>
    <div class="relative flex items-center">
        <input :id="id" type="checkbox" :checked="modelValue.has(checkboxId)" @change="toggleCheckbox"
            class="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border-2 border-green-600 bg-green-50 transition-colors checked:border-green-600 checked:bg-green-50 focus:outline-none focus:ring-0 focus:ring-offset-0">
        <div
            class="pointer-events-none absolute left-0 top-0 h-5 w-5 opacity-0 transition-opacity peer-checked:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 fill-green-600">
                <path
                    d="M9.55 18.2L3.65 12.3a.996.996 0 0 1 0-1.4c.39-.39 1.01-.39 1.4 0l4.9 4.9 8.75-8.75c.39-.39 1.01-.39 1.4 0 .39.39.39 1.01 0 1.4L9.55 18.2z" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    id: string
    checkboxId: number | string  // Add this new prop
    modelValue: Set<number | string> 
}>()

const emit = defineEmits<{
    'update:modelValue': [value: Set<number | string>] 
}>()

const toggleCheckbox = () => {
    const newSet = new Set(props.modelValue)
    if (newSet.has(props.checkboxId)) {
        newSet.clear()  
    } else {
        newSet.clear()  
        newSet.add(props.checkboxId)  
    }
    emit('update:modelValue', newSet) 
}
</script>