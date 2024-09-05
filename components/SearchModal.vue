<template>
    <div v-if="isSearchModalVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg w-1/2 relative" @click.stop>
        <!-- Close the modal when clicking outside -->
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search"
          class="w-full p-3 border rounded-md focus:outline-none"
        />
        <div v-if="suggestions.length" class="mt-4">
          <h3 class="text-lg font-semibold">Suggested</h3>
          <ul>
            <li
              v-for="(suggestion, index) in suggestions"
              :key="index"
              class="p-2 hover:bg-gray-200 cursor-pointer"
              @click="selectSuggestion(suggestion)"
            >
              {{ suggestion }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
      const searchQuery = ref('');
      const suggestions = ref([
        'Jason Gardens ₦ 30M',
        'Iconic Tower, off Ajose Adegun VI, Lagos.',
        'Surulere',
        'Banana Island'
      ]);

      const emit = defineEmits<{
  (event: 'close'): void
}>()

      const props = defineProps({
        isSearchModalVisible: {
          type: Boolean,
          default: false
        }
      })
  
      const selectSuggestion = (suggestion: string) => {
        // Close modal after selection
        props.isSearchModalVisible = false;
        // Handle selection logic
        console.log('Selected:', suggestion);
      };
  
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.modal-content')) {
          props.isSearchModalVisible = false;
        }
      };
  
      onMounted(() => {
        document.addEventListener('click', handleClickOutside);
      });
  </script>
  
  <style scoped>
  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 24px;
  }
  </style>
  