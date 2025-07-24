<template>
  <main>
    <div v-if="!loading && questions.length" class="flex flex-col justify-between h-screen">
      <div class="flex-1 overflow-y-auto">
        <h2 class="text-lg font-semibold mb-4 text-[#1D2739]">
          Pre-Screening Questions
        </h2>
        <div class="space-y-4">
          <!-- <div v-for="(question, index) in questions" :key="index" class="space-y-2">
            <p class="text-sm text-gray-700">{{ question.question }}</p>
            <input v-model="question.answer" type="text"
              class="p-3 py-3.5 border-[0.5px] outline-none text-sm bg-[#E4E7EC] rounded-lg w-full"
              placeholder="Enter your response" />
          </div> -->
          <div v-for="question in questions" :key="question.id" class="mb-4">
            <p class="text-sm text-gray-700">{{ question.question }}</p>
            <!-- Conditional rendering based on widgetType -->
            <template v-if="question.widgetType === 'input'">
              <input v-model="question.answer" type="text"
                class="p-3 py-3.5 border-[0.5px] outline-none text-sm bg-[#E4E7EC] rounded-lg w-full"
                :placeholder="question.placeholder || 'Enter your response'" />
            </template>
            <template v-else-if="question.widgetType === 'select'">
              <select v-model="question.answer"
                class="p-3 py-3.5 border-[0.5px] outline-none text-sm bg-[#E4E7EC] rounded-lg w-full">
                <option v-for="option in question.widgetOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </template>
            <!-- Add a fallback if necessary -->

            <template v-else-if="question.widgetType === 'long-response'">
              <textarea v-model="question.answer" type="text"
                class="p-3 py-3.5 border-[0.5px] outline-none text-sm bg-[#E4E7EC] rounded-lg w-full"
                :placeholder="question.placeholder || 'Enter your response'"></textarea>
            </template>
            <template v-else>
              <p class="text-sm text-red-500">
                Unsupported widget type: {{ question.widgetType }}
              </p>
            </template>
          </div>
        </div>
      </div>

      <!-- Footer (fixed at the bottom) -->
      <div class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center border-[0.5px]">
        <div class="flex justify-between w-full max-w-2xl">
          <button class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]" @click="showCancelModal = true">
            Cancel
          </button>
          <button class="px-6 py-3 text-sm rounded-md bg-[#292929] text-white disabled:bg-gray-200 disabled:cursor-not-allowed" @click="goNext" :disabled="!isFormValid">
            Continue
          </button>
        </div>
      </div>
    </div>

    <section v-else-if="!loading && !questions.length">
      <div class="flex flex-col items-center justify-center py-10 border border-gray-100 rounded-lg gap-y-4">
        <img src="@/assets/icons/event-illustrations.svg" />
        No Screening qustions available
      </div>
      <!-- Footer (fixed at the bottom) -->
      <div class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center border-[0.5px]">
        <div class="flex justify-between w-full max-w-2xl">
          <button class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]" @click="showCancelModal = true">
            Cancel
          </button>
          <button class="px-6 py-3 text-sm rounded-md bg-[#292929] text-white" @click="goNext">
            Continue
          </button>
        </div>
      </div>
    </section>

    <section v-else>
      <div class="w-full p-4 mx-auto mt-10 rounded-md">
        <div class="flex space-x-4 animate-pulse">
          <div class="flex-1 py-1 space-y-6">
            <div class="h-32 rounded bg-slate-200"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="w-full h-32 col-span-2 rounded bg-slate-200"></div>
                <div class="w-full h-32 col-span-1 rounded bg-slate-200"></div>
              </div>
              <div class="w-full h-32 rounded bg-slate-200"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CoreModalWithoutCloseBtn :isOpen="showCancelModal" @close="showCancelModal = false">
      <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click.self="onCancel">
        <div class="w-full max-w-sm p-6 text-center bg-white shadow-lg rounded-xl">
          <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-500 rounded-full">
            <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.921875" width="63.1513" height="64" rx="31.5756" fill="#F3A218" />
              <path
                d="M42.2031 32.375C42.2031 26.8521 37.7259 22.375 32.2031 22.375C26.6803 22.375 22.2031 26.8521 22.2031 32.375C22.2031 37.8978 26.6803 42.375 32.2031 42.375C37.7259 42.375 42.2031 37.8978 42.2031 32.375Z"
                stroke="white" stroke-width="1.5" />
              <path
                d="M32.4453 37.375V32.375C32.4453 31.9036 32.4453 31.6679 32.2988 31.5214C32.1524 31.375 31.9167 31.375 31.4453 31.375"
                stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M32.1953 28.377H32.2043" stroke="white" stroke-width="3.25" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <h2 class="mb-2 text-lg font-semibold text-gray-700">
            Cancel Rental Application
          </h2>
          <p class="mb-6 text-gray-500">
            Are you sure you want to cancel rental application process?
          </p>
          <div class="space-y-3">
            <button type="button"
              class="w-full disabled:cursor-not-allowed text-sm disabled:opacity-25 bg-[#292929] text-white py-3.5 rounded-md font-semibold"
              @click="onConfirm">
              Yes, Proceed
            </button>
            <button type="button" class="w-full bg-[#EBE5E0] text-gray-700 text-sm py-3.5 rounded-md font-semibold"
              @click="onCancel">
              No, Continue
            </button>
          </div>
        </div>
      </div>
    </CoreModalWithoutCloseBtn>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
import { useFormPersistence } from "@/composables/core/useFormPersistence";
import { useRouter, useRoute } from "vue-router";

const showCancelModal = ref(false);
const router = useRouter();
const route = useRoute();

const onConfirm = () => {
  goBack();
};

const onCancel = () => {
  showCancelModal.value = false;
};

// Fetch property data
const { propertyObj, loading } = useFetchProperty();

// Initialize questions as an empty array
const questions = ref([]);

// Use 'prescreening' as the key to store the data
const { saveData, loadData } = useFormPersistence();

// Load existing data from localStorage or create structure from API response
onMounted(() => {
  // Load saved questions if they exist
  const savedQuestions = loadData("prescreening");
  if (savedQuestions && savedQuestions.length) {
    questions.value = savedQuestions;
  }
});

// Watch for changes in propertyObj.value and map preScreeningQuestions if available
watch(
  () => propertyObj.value,
  (newVal) => {
    if (newVal && newVal.preScreeningQuestions) {
      // Merge saved answers with API responses to ensure persisted answers are not lost
      const savedQuestions = loadData("prescreening") || [];

      // Map preScreeningQuestions from propertyObj to match desired structure
      questions.value = newVal?.preScreeningQuestions.map((q: any) => {
        const savedAnswer = savedQuestions.find((sq: any) => sq.id === q.id);
        return {
          ...q,
          id: q.id,
          question: q.question,
          answer: savedAnswer ? savedAnswer?.answer : q?.answer || "", // Use saved answer if available, else fallback to default
        };
      });
    }
  },
  { immediate: true } // Ensures watch is triggered immediately if data is already available
);

// Save the answers and go to the next step
const goNext = () => {
  saveData("prescreening", questions.value); // Ensure the answers are persisted
  router.push({ query: { step: "2" } });
};

// Go back to the previous step and clear certain localStorage items
const goBack = () => {
  router.push(`/dashboard/listings/${route.params.id}/preview`);
  localStorage.removeItem("roomId");
  localStorage.removeItem("uploaded-document");
  localStorage.removeItem("prescreening");
};

const isFormValid = computed(() => {
  return questions.value.every((q) => q.answer && q.answer.toString().trim().length > 0);
});
</script>
