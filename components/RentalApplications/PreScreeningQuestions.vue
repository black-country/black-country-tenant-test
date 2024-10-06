<template>
  <main>
    <div v-if="!loading && questions.length" class="h-screen flex flex-col justify-between">
      <div class="flex-1 overflow-y-auto">
        <h2 class="text-lg font-semibold mb-4 text-[#1D2739]">Pre-Screening Questions</h2>
        <div class="space-y-4">
          <div v-for="(question, index) in questions" :key="index" class="space-y-2">
            <p class="text-gray-700 text-sm">{{ question.question }}</p>
            <input
              v-model="question.answer"
              type="text"
              class="p-3 py-3.5 border-[0.5px] outline-none text-sm bg-[#E4E7EC] rounded-lg w-full"
              placeholder="Enter your response"
            />
          </div>
        </div>
      </div>
  
      <!-- Footer (fixed at the bottom) -->
      <div class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center  border-[0.5px]">
        <div class="max-w-2xl w-full flex justify-between">
          <button class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]" @click="goBack">Cancel</button>
          <button class="px-6 py-3 text-sm rounded-md bg-[#292929] text-white" @click="goNext">Continue</button>
        </div>
    </div>
  </div>

    <section v-else>
      <div class="rounded-md p-4 w-full mx-auto mt-10">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="h-32 bg-slate-200 rounded"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="h-32 w-full bg-slate-200 rounded col-span-2"></div>
                <div class="h-32 w-full bg-slate-200 rounded col-span-1"></div>
              </div>
              <div class="h-32 w-full bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
     </section>
  </main>
  </template>
  
  <script setup lang="ts">
  import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
  import { useFormPersistence } from '@/composables/core/useFormPersistence';
  
  const { propertyObj, loading } = useFetchProperty();
  const router = useRouter();
  const questions = ref([]);
  
  // Use 'prescreening' as the key to store the data
  const { saveData, loadData } = useFormPersistence();
  
  // Load existing data or create structure from API response
  onMounted(() => {
    // Load saved questions if they exist
    const savedQuestions = loadData('prescreening');
    if (savedQuestions) {
      questions.value = savedQuestions;
    }
  });
  
  // Watch for changes in propertyObj.value
  watch(
    () => propertyObj.value,
    (newVal) => {
      if (newVal && newVal.preScreeningQuestions) {
        // Map preScreeningQuestions from propertyObj to match desired structure
        questions.value = newVal.preScreeningQuestions.map((q: any) => ({
          id: q.id,
          question: q.question,
          answer: '', // Set default answer to empty string
        }));
      }
    },
    { immediate: true } // Ensures watch is triggered immediately if data is already available
  );
  
  const goNext = () => {
    // Ensure 'prescreening' is passed as the key
    saveData('prescreening', questions.value);
    router.push({ query: { step: '2' } });
  };
  
  const goBack = () => {
    router.back()
    router.push(`dashboard/listings/${route.params.id}/preview`)
    // router.push({ query: { step: '1' } });
  };
  </script>
  