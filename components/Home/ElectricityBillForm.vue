<!-- <template>
    <div class="py-4">
      {{ computedBillers[0] }}
      <h2 class="text-lg text-[#1D2739] mb-4">Electricity Bill</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-[#1D2739] text-sm mb-1">Electricity Distribution type (DisCos)</label>
          <select class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] outline-none border-gray-100" placeholder="Select DisCo type">
            <option>Ikeja Electricity Distribution Company (DisCo)</option>
            <option>Eko Electricity Distribution Plc (EKEDC)</option>
          </select>
        </div>
        <div>
          <label class="block text-[#1D2739] text-sm mb-1">Meter Number</label>
          <input type="text" placeholder="e.g 1234567DSF" class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] border-gray-100" />
        </div>
        <div>
          <label class="block text-[#1D2739] text-sm mb-1">Meter type</label>
          <select class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] border-gray-100" placeholder="Select Meter type">
            <option>Post paid</option>
            <option>Prepaid</option>
          </select>
        </div>
        <HomeRecentPayments />

        <div class="flex justify-between pt-20">
          <button
            type="button"
            @click="router.back()"
            class="px-6 py-3 text-sm border border-gray-300 rounded-md text-[#292929]"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-3 text-sm bg-[#292929] text-white rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const router = useRouter()

  const props = defineProps({
    billersList: {
      type: Array,
      default: () => {}
    }
  })

  const route = useRoute()
  // Add any necessary logic or props here

  const computedBillers = computed(() => {
    props.billersList.find((item: any) => item.id === route?.query?.billType)
  })
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
   -->

   <template>
    <div class="py-4">
      {{ computedList }}
      <h2 class="text-lg text-[#1D2739] mb-4">Electricity Bill</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-[#1D2739] text-sm mb-1"
            >Electricity Distribution type (DisCos)</label
          >
          <select
            class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] outline-none border-gray-100"
          >
            <option value="" disabled selected>Select DisCo type</option>
            <option value="ikeja">
              Ikeja Electricity Distribution Company (DisCo)
            </option>
            <option value="eko">Eko Electricity Distribution Plc (EKEDC)</option>
          </select>
        </div>
        <div>
          <label class="block text-[#1D2739] text-sm mb-1">Meter Number</label>
          <input
            type="text"
            placeholder="e.g 1234567DSF"
            class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] border-gray-100"
          />
        </div>
        <div>
          <label class="block text-[#1D2739] text-sm mb-1">Meter type</label>
          <select
            class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] border-gray-100"
          >
            <option value="" disabled selected>Select Meter type</option>
            <option value="postpaid">Postpaid</option>
            <option value="prepaid">Prepaid</option>
          </select>
        </div>
        <HomeRecentPayments />
        <div class="flex justify-between pt-20">
          <button
            type="button"
            @click="router.back()"
            class="px-6 py-3 text-sm border border-gray-300 rounded-md text-[#292929]"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-6 py-3 text-sm bg-[#292929] text-white rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  
  const router = useRouter();
  const route = useRoute();
  
  const props = defineProps({
    billersList: {
      type: Object,
      default: () => ({}), // Correct default value for an object
    },
  });
  
  // Ensure computedList handles undefined or non-array Category
  const computedList = computed(() => {
    const category = props?.billersList?.Category;
    return Array.isArray(category) && category.length > 0 ? category[0] : {}; // Return an object if valid, or an empty object
  });
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  