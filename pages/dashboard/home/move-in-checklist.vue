<template>
    <main>
      <TopNavBar />
      <div class="min-h-screen flex flex-col justify-between max-w-3xl mx-auto">
        <div class="bg-white p-6">
          <div class="flex items-center text-gray-600 mb-4">
            <svg
              @click="router.back()"
              class="cursor-pointer"
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="18" fill="#EAEAEA" />
              <path
                d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
  
            <span class="ml-2 text-[#667185]">
              My Home <span class="ml-2 text-[#667185]"> | Move In</span> |
              <span class="text-[#1D2739] font-medium">Move - in checklist</span>
            </span>
          </div>
          <div  v-if="Object.keys(checklist)?.length && !loading" class="flex items-center justify-center">
            <HomeMoveChecklist
              :loading="loading"
              :checklist="checklist"
              actionType="move-in"
              @update-state="updateChecklistState"
            />
          </div>
          <CoreFullScreenLoader
                v-else-if="loading && !Object.keys(checklist).length"
                :visible="loading"
                text="Fetching checklist...."
                logo=""
            />
       <section v-else class="flex flex-col justify-between items-center space-y-2 mt-10">
             <svg width="152" height="124" viewBox="0 0 152 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="76" cy="58" r="52" fill="#EAEAEA"/>
            <circle cx="21" cy="25" r="5" fill="#BDBDBD"/>
            <circle cx="18" cy="109" r="7" fill="#BDBDBD"/>
            <circle cx="145" cy="41" r="7" fill="#BDBDBD"/>
            <circle cx="134" cy="14" r="4" fill="#BDBDBD"/>
            <g filter="url(#filter0_b_6853_118795)">
            <rect x="52" y="34" width="48" height="48" rx="24" fill="#9D9D9D"/>
            <path d="M85.9598 56.9707C86.0134 57.8009 86.0134 58.6607 85.9598 59.4909C85.6856 63.7332 82.3536 67.1125 78.1706 67.3905C76.7435 67.4854 75.2536 67.4852 73.8294 67.3905C73.339 67.3579 72.8044 67.2409 72.344 67.0513C71.8318 66.8403 71.5756 66.7348 71.4454 66.7508C71.3153 66.7668 71.1264 66.9061 70.7487 67.1846C70.0827 67.6757 69.2437 68.0285 67.9994 67.9982C67.3703 67.9829 67.0557 67.9752 66.9148 67.7351C66.774 67.495 66.9494 67.1626 67.3002 66.4978C67.7867 65.5758 68.095 64.5203 67.6279 63.6746C66.8234 62.4666 66.1401 61.036 66.0402 59.4909C65.9866 58.6607 65.9866 57.8009 66.0402 56.9707C66.3144 52.7284 69.6464 49.3491 73.8294 49.0711C75.0318 48.9911 75.2812 48.9786 76.5 49.0337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M72.5 61H79.5M72.5 56H76" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M86 51.5C86 53.433 84.433 55 82.5 55C80.567 55 79 53.433 79 51.5C79 49.567 80.567 48 82.5 48C84.433 48 86 49.567 86 51.5Z" stroke="white" stroke-width="1.5"/>
            </g>
            <defs>
            <filter id="filter0_b_6853_118795" x="44" y="26" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_6853_118795"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_6853_118795" result="shape"/>
            </filter>
            </defs>
            </svg>
            <h2 class="text-[#1D2739]">No Checklist available</h2>
      </section>
        </div>
      </div>
  
      <div class="flex justify-between items-center max-w-3xl mx-auto px-4 py-10">
        <button
          class="rouned-lg text-sm px-6 py-3 text-[#292929] rounded-lg border-[0.5px] border-gray-100"
        >
          Cancel
        </button>
        <button
          @click="submitChecklist"
          :disabled="processing"
          class="rouned-lg text-sm disabled:cursor-not-allowed disabled:opacity-25 px-6 py-3 bg-[#292929] rounded-lg text-white"
        >
          {{ processing ? 'Processing...' : 'Submit Checklist' }}
        </button>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useAddChecklistItem } from '@/composables/modules/home/useAddChecklistItem';
  import { useFetchChecklist } from '@/composables/modules/home/useFetchChecklist';
  import { useUser } from '@/composables/auth/user';
//   const { loading: fetching, myHomeInfo } = useFetchMyHomeInfo()
  import { useRouter } from 'vue-router';
  const { user } = useUser()
  
  const router = useRouter();
  const { loading, checklist } = useFetchChecklist();
  const { loading: processing, addChecklistItem, setPayload } = useAddChecklistItem();
  
  const checklistState = ref([]); // To track changes
  
  // Function to handle updates from child components
  const updateChecklistState = (item) => {
    const existingIndex = checklistState.value.findIndex(
      (i) => i.itemName === item.itemName && i.group === item.group
    );
    if (existingIndex > -1) {
      checklistState.value[existingIndex] = item; // Update existing item
    } else {
      checklistState.value.push(item); // Add new item
    }
  };
  

const submitChecklist = async () => {
    try {
        // Validate the checklist state structure
        if (!checklistState.value || !Array.isArray(checklistState.value) || !Array.isArray(checklistState.value[0])) {
            console.error('Invalid checklist state. Ensure it is an array of arrays.');
            return;
        }

        // Access the first array and format the items into the required payload structure
        const formattedList = checklistState.value[0].map((item) => {
            return {
                itemName: item.itemName,
                group: item.group, // Correctly map to the group's value
                state: item.state, // Correctly map to the state value
            };
        });

        // Prepare the payload object
        const payloadObj = { list: formattedList };

        // Debugging: Log the payload before submission
        console.log('Submitting checklist payload:', payloadObj);

        // Set the payload (if part of your app logic)
        setPayload(payloadObj);

        // Submit the checklist to the backend
        await addChecklistItem(user?.value?.room?.rentalApplication?.id);

        console.log('Checklist successfully submitted!');
    } catch (error) {
        console.error('Error submitting checklist:', error);
    }
};

  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  