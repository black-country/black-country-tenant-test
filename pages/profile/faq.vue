<template>
  <main>
    <TopNavBar />
    <div class="lg:p-6 p-3 bg-gray-25 min-h-screen">
      <div class="max-w-xl mx-auto">
        <svg @click="router.back()" class="cursor-pointer mb-3" width="36" height="36" viewBox="0 0 36 36" fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="18" fill="#EAEAEA" />
          <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <div class="text-sm text-gray-500 mb-4">
          <span>Profile</span>
          <span class="mx-2">|</span>
          <span class="font-semibold text-gray-700">FAQs</span>
        </div>

        <h2 class="text-center text-xl font-medium text-[#1D2739] mb-6">
          How can we help you?
        </h2>

        <div class="relative w-full mb-8">
          <input
            type="text"
            placeholder="Search for how-tos and more"
            v-model="searchQuery"
            class="w-full p-3 py-4 outline-none border text-sm rounded-md bg-[#EAEAEA] pl-10"
          />
          <svg class="absolute top-5 left-3" width="16" height="17" viewBox="0 0 16 17" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M11.668 12.166L14.668 15.166" stroke="#667185" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round" />
            <path
              d="M13.332 7.83398C13.332 4.52028 10.6458 1.83398 7.33203 1.83398C4.01832 1.83398 1.33203 4.52028 1.33203 7.83398C1.33203 11.1477 4.01832 13.834 7.33203 13.834C10.6458 13.834 13.332 11.1477 13.332 7.83398Z"
              stroke="#667185" stroke-width="1.5" stroke-linejoin="round" />
          </svg>
        </div>
        <section v-if="!loading && faqList.length" class="space-y-4">
          <div v-for="item in filteredFaqList" :key="item.id" class="overflow-hidden border-[0.5px] border-gray-50 px-3 bg-white rounded-lg">
            <button class="w-full text-left py-3  transition-colors duration-300 flex justify-between items-center"
              @click="toggle(item.id)">
              <p class="text-[#1D2739] font-light">
                {{ item.question }}
              </p>
              <span class="relative h-5 w-5 shrink-0">
                <svg v-if="isClose(item.id)" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6.00003C12 6.00003 9.05407 10 8 10C6.94587 10 4 6 4 6" stroke="#667185"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

                <svg v-if="isOpen(item.id)" width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 10C12 10 9.05407 6.00001 8 6C6.94587 5.99999 4 10 4 10" stroke="#667185"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </button>
            <div v-if="isOpen(item.id)" class="overflow-hidden transition-max-height duration-500 pb-3"
              :style="{ maxHeight: isOpen(item.id) ? `${maxHeight}px` : '0' }">
              <p class="p-1 lg:p-4 text-gray-700 text-sm font-light md:text-base rounded-lg">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </section>

        <div v-else class="rounded-md container mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-6 py-1">
            <div class="h-44 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useFetchFaqs } from '@/composables/modules/settings/useFetchFaqs';
import { ref, computed } from 'vue';

const { loading, faqList } = useFetchFaqs();
const router = useRouter();
const openFAQ = ref<number | null>(null);
const searchQuery = ref(''); // Track the search input

const toggleFAQ = (index: number) => {
  if (openFAQ.value === index) {
    openFAQ.value = null;
  } else {
    openFAQ.value = index;
  }
};

definePageMeta({
  middleware: 'auth',
});

const openId = ref(null);
const maxHeight = ref(0);

const toggle = (id: any) => {
  openId.value = openId.value === id ? null : id;
  maxHeight.value = openId.value ? 200 : 0;
};

const isOpen = (id: any) => openId.value === id;

const isClose = (id: any) => openId.value !== id;

// Computed property to filter FAQs based on the search query
const filteredFaqList = computed(() => {
  if (!searchQuery.value.trim()) {
    return faqList.value; // Return all FAQs if the search query is empty
  }
  const query = searchQuery.value.toLowerCase();
  return faqList.value.filter(
    (item: any) =>
      item.question.toLowerCase().includes(query) ||
      item.answer.toLowerCase().includes(query)
  );
});
</script>
