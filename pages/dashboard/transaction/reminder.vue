<template>
  <div>
    <TopNavBar />
    <!-- <DashboardHeader section="Upcoming activities" title="Rent Payment Reminder" /> -->
    <div class="p-4 max-w-2xl mx-auto">
      <nav class="flex items-center space-x-2 mb-8">
      <button @click="router.back()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
        </svg>
      </button>
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <span>Dashboard</span>
        <span>|</span>
        <span>Upcoming activities</span>
        <span>|</span>
        <span class="font-medium text-gray-900">Rent Payment Reminder</span>
      </div>
    </nav>
      <div class="bg-white rounded-lg border-[0.5px] border-gray-100 rounded-lg">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-sm font-semibold">Rent details</h2>
            <span class="px-3 py-1 bg-[#FBEAE9] text-[#D92D20] rounded-full text-sm">
          Due
        </span>
          </div>
          
          <div class="space-y-4">
            <div class="space-y-6">
              <div class="flex justify-between items-center">
                <p class="text-sm text-[#667185]">Property Name</p>
                <p class="text-sm text-[#1D2739]">Jason C0-living Space</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-sm text-[#667185]">Rent Amount</p>
                <p class="text-sm text-[#1D2739]">NGN 800,000.00</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-sm text-[#667185]">Rent tenure</p>
                <p class="text-sm text-[#1D2739]">365 days</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-sm text-[#667185]">Start Date</p>
                <p class="text-sm text-[#1D2739]">31/12/2023</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-sm text-[#667185]">End Date</p>
                <p class="text-sm text-[#1D2739]">31/12/2024</p>
              </div>
              <div class="flex justify-between items-center">
                <p class="text-sm text-[#667185]">Next payment</p>
                <p class="text-sm text-[#1D2739]">01 January, 2025</p>
              </div>
            </div>
            
          <div class="pt-6">
            <button class="w-full bg-[#292929] text-white py-4 text-sm rounded-lg hover:bg-gray-800 transition">
              Pay Now
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
