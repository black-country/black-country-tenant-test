<template>
  <main>
   <TopNavBar />
  <section v-if="!fetching" class="max-w-4xl mx-auto mt-10 p-4 lg:p-0">
    <!-- Property Overview Section -->
    <HomePropertyOverview :myHomeInfo="myHomeInfo" />

    <div @click="handleClick" class="space-y-2 mb-8 border-[0.5px] border-gray-50 rounded-md mt-4">
        <div class="flex cursor-pointer justify-between items-center bg-white p-4 py-6 rounded-lg">
        <div class="flex items-center gap-x-3">
          <div>
            <input :disabled="user.hasMoveInChecklist" type="checkbox" :checked="user.hasMoveInChecklist" class="form-checkbox h-5 w-5 text-blue-600" />            
          </div>
          <div>
            <h2 class="text-base font-medium text-[#1D2739]">Move-in checklist</h2>
            <p class="text-[#667185] text-sm font-light gap-x-2">Take a moment to inspect the property and report any discrepancies using our move-in checklist</p>
          </div>
        </div>
    <div>
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.00003 1C1.00003 1 5 3.94593 5 5C5 6.05413 1 9 1 9" stroke="#667185" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
        </div>
      </div>

    <!-- Action Buttons -->
    <HomeActionButtons />

    <!-- No Transactions Section -->
    <section class="mt-6 space-y-4">
      <div
        class="flex justify-between items-center bg-white border-[0.5px] border-gray-50 rounded-md py-5 px-4"
      >
        <h3 class="text-base font-medium text-[#171717]">
          Upcoming activities
        </h3>
        <a href="#" class="text-[#171717]">View all</a>
      </div>
      <HomeNoTransactions />
    </section>

    <!-- Recent Activities Section -->
    <section class="mt-6 space-y-4">
      <div
        class="flex justify-between items-center bg-white border-[0.5px] border-gray-50 rounded-md py-5 px-4"
      >
        <h3 class="text-base font-medium text-[#171717]">Recent activities</h3>
        <a href="#" class="text-[#171717]">View all</a>
      </div>
      <HomeNoTransactions />
    </section>
  </section>
  <CoreFullScreenLoader
      :visible="fetching"
      text="Fetching Home Details"
      logo=""
  />
  </main>
</template>

<script setup lang="ts">
  import { useFetchMyHomeInfo } from '@/composables/modules/maintenance/useGetMyHome'
  const { loading: fetching, myHomeInfo } = useFetchMyHomeInfo()
  import { useUser } from '@/composables/auth/user';
  const { user } = useUser()
  const router = useRouter()

  const handleClick = () => {
    if(!user.value.hasMoveInChecklist){
      router.push('/dashboard/home/move-in-checklist')
    }
  }
</script>