<template>
<main>
  <TopNavBar />
  
  <div class="bg-gray-25 min-h-screen p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Greeting Section -->
      <h1 class="text-lg text-[#1D2739] font-medium mb-6">{{ greeting ?? 'Hello' }}, {{user.firstName ?? 'Nil'}} {{user.lastName ?? 'Nil'}}</h1>

      <!-- Setup Actions Section -->
      <div class="space-y-2 mb-8">
        <div v-for="action in setupActions" :key="action.title" @click="router.push(action.path)" class="flex cursor-pointer justify-between items-center bg-white p-4 py-6 rounded-lg">
        <div class="flex items-center gap-x-3">
          <div>
            <input type="checkbox" class="form-checkbox h-5 w-5 text-blue-600" />            
          </div>
          <div>
            <h2 class="text-base font-medium text-[#1D2739]">{{ action.title }}</h2>
            <p class="text-[#667185] text-sm font-light gap-x-2">{{ action.description }}</p>
          </div>
        </div>
    <div>
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.00003 1C1.00003 1 5 3.94593 5 5C5 6.05413 1 9 1 9" stroke="#667185" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
        </div>
      </div>

      <!-- Payment Actions -->
      <div class="flex justify-between  mb-8 rounded-lg">
        <div v-for="payment in paymentActions" :key="payment.title" class="w-1/3 cursor-pointer bg-white p-6 text-center">
          <img :src="dynamicIcons(payment.icon)" alt="" class="h-10 w-10 mx-auto mb-2" />
          <h3 class="text-xs font-medium text-[#1D2739]">{{ payment.title }}</h3>
        </div>
      </div>

      <div class="">
        <h2 class="text-base font-medium text-[#171717]">Recent applications</h2>
        <RecentApplications />
      </div>
  

      <!-- Rental Applications -->
      <div class="bg-white p-4 py-6 rounded-lg mb-8 flex justify-between items-center">
   <div @click="router.push('/dashboard/rental-applications')" class="flex cursor-pointer items-center gap-x-3">
         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="#1A47C5" stroke-width="1.5"/>
          <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="#1A47C5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.992 8H12.001" stroke="#1A47C5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
        <div>
          <h3 class="text-sm font-medium text-[#1D2739]">Rental applications</h3>
          <p class="text-[#667185] text-xs font-light gap-x-2">Manage your rental applications</p>
        </div>
   </div>
   <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.00003 1C1.00003 1 5 3.94593 5 5C5 6.05413 1 9 1 9" stroke="#667185" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
      </div>

      <!-- Upcoming Activities Section -->
     <section class="mt-10">
      <div class="flex justify-between items-center bg-white rounded-md py-5 px-4">
        <h3 class="text-base font-medium text-[#171717]">Upcoming activities</h3>
        <a href="#" class="text-[#171717]">View all</a>
      </div>
      <div class="pt-3 rounded-lg">
        <div v-if="upcomingActivities.length === 0" class="text-center text-gray-500 py-12">
          <img src="@/assets/icons/event-illustrations.svg" alt="No events" class="h-12 w-12 mx-auto mb-2" />
          <p>No Upcoming event found</p>
        </div>
        <div v-else>
          <div v-for="activity in upcomingActivities" :key="activity.id" class="flex justify-between items-center bg-white p-4 rounded-lg mb-2">
        <div class="flex items-center gap-x-3">
        <div  class="flex items-center gap-x-3">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="48" height="48" rx="24" fill="white"/>
            <rect x="1" y="1" width="48" height="48" rx="24" stroke="#F9FAFB"/>
            <rect x="3" y="3" width="44" height="44" rx="22" fill="#F0F5FD"/>
            <path d="M27.9168 22.0835C28.06 22.1044 28.1992 22.1306 28.3335 22.1616C28.5798 22.2185 28.703 22.2469 28.8506 22.3647C28.9347 22.4319 29.0398 22.5648 29.086 22.6626C29.1668 22.8339 29.1668 23.0001 29.1668 23.3324V27.8585C29.1668 28.2722 28.7335 28.5565 28.3335 28.4641C27.9503 28.3755 27.5276 28.3265 27.0835 28.3265C26.2847 28.3265 25.5554 28.4852 25.0002 28.7467C24.445 29.0082 23.7156 29.1668 22.9168 29.1668C22.4727 29.1668 22.05 29.1178 21.6668 29.0293C21.4205 28.9724 21.2973 28.9439 21.1497 28.8262C21.0656 28.759 20.9605 28.626 20.9144 28.5283C20.8335 28.357 20.8335 28.1908 20.8335 27.8585V23.3324C20.8335 22.9186 21.2668 22.6344 21.6668 22.7268C21.8011 22.7578 21.9403 22.784 22.0835 22.8049" stroke="#6A9AEB" stroke-linecap="round"/>
            <path d="M26.0418 25.6252C26.0418 26.2005 25.5755 26.6668 25.0002 26.6668C24.4249 26.6668 23.9585 26.2005 23.9585 25.6252C23.9585 25.0499 24.4249 24.5835 25.0002 24.5835C25.5755 24.5835 26.0418 25.0499 26.0418 25.6252Z" fill="white" stroke="#6A9AEB"/>
            <path d="M22.2915 26.0415V26.0453" stroke="#6A9AEB" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M27.7085 25.2051V25.2088" stroke="#6A9AEB" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25.0002 20.8335V22.5002M23.3335 22.0835V22.9168M26.6668 21.2502V22.0835" stroke="#6A9AEB" stroke-linecap="round"/>
            </svg>
          <div>
            <h4 class="font-medium text-[#1D2739] text-sm">{{ activity.title }}</h4>
            <p class="text-sm text-[#667185]">{{ activity.date }}</p>
          </div>
        </div>
        </div>
            <span class="text-xs font-semibold rounded-full text-[#DD900D] bg-[#FEF6E7] px-3 py-1">{{ activity.status }}</span>
          </div>
        </div>
      </div>
     </section>

      <!-- Recent Transactions Section -->
   <section class="mt-10">
    <div class="flex justify-between items-center bg-white rounded-md py-5 px-4">
      <h3 class="text-base font-medium text-[#171717]">Recent transactions</h3>
      <a href="#" class="text-[#171717]">View all</a>
    </div>
    <div class="pt-3 rounded-lg">
      <div v-if="recentTransactions.length === 0" class="text-center text-gray-500 py-12">
        <img src="@/assets/icons/transaction-illustration.svg" alt="No transactions" class="h-12 w-12 mx-auto mb-2" />
        <p>No recent transactions made</p>
      </div>
      <div v-else>
        <div v-for="transaction in recentTransactions" :key="transaction.id" class="flex justify-between items-center bg-white p-4 rounded-lg mb-2">
    <div class="flex items-center gap-x-3">
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="48" height="48" rx="24" fill="white"/>
        <rect x="1" y="1" width="48" height="48" rx="24" stroke="#F9FAFB"/>
        <rect x="3" y="3" width="44" height="44" rx="22" fill="#F0F5FD"/>
        <path d="M27.9168 22.0835C28.06 22.1044 28.1992 22.1306 28.3335 22.1616C28.5798 22.2185 28.703 22.2469 28.8506 22.3647C28.9347 22.4319 29.0398 22.5648 29.086 22.6626C29.1668 22.8339 29.1668 23.0001 29.1668 23.3324V27.8585C29.1668 28.2722 28.7335 28.5565 28.3335 28.4641C27.9503 28.3755 27.5276 28.3265 27.0835 28.3265C26.2847 28.3265 25.5554 28.4852 25.0002 28.7467C24.445 29.0082 23.7156 29.1668 22.9168 29.1668C22.4727 29.1668 22.05 29.1178 21.6668 29.0293C21.4205 28.9724 21.2973 28.9439 21.1497 28.8262C21.0656 28.759 20.9605 28.626 20.9144 28.5283C20.8335 28.357 20.8335 28.1908 20.8335 27.8585V23.3324C20.8335 22.9186 21.2668 22.6344 21.6668 22.7268C21.8011 22.7578 21.9403 22.784 22.0835 22.8049" stroke="#6A9AEB" stroke-linecap="round"/>
        <path d="M26.0418 25.6252C26.0418 26.2005 25.5755 26.6668 25.0002 26.6668C24.4249 26.6668 23.9585 26.2005 23.9585 25.6252C23.9585 25.0499 24.4249 24.5835 25.0002 24.5835C25.5755 24.5835 26.0418 25.0499 26.0418 25.6252Z" fill="white" stroke="#6A9AEB"/>
        <path d="M22.2915 26.0415V26.0453" stroke="#6A9AEB" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M27.7085 25.2051V25.2088" stroke="#6A9AEB" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M25.0002 20.8335V22.5002M23.3335 22.0835V22.9168M26.6668 21.2502V22.0835" stroke="#6A9AEB" stroke-linecap="round"/>
        </svg>
        
      <div class="space-y-1">
        <h4 class="font-medium text-[#1D2739] text-sm">{{ transaction.title }}</h4>
        <p class="text-sm text-[#667185]">{{ transaction.date }}</p>
      </div>
    </div>
          <span class="text-sm font-semibold text-[#292929]">{{ transaction.amount }}</span>
        </div>
      </div>
    </div>
   </section>
    </div>
  </div>

  <CoreModal
  :isOpen="showWelcomeModal"
  @close="showWelcomeModal = false"
  >
    <CoreWelcome @close="showWelcomeModal = false" @start="router.push('/dashboard/listings?view=grid')" class="" />
  </CoreModal>
</main>
  </template>
  
  <script setup lang="ts">
  import { useGreeting } from '@/composables/core/useGreeting'
  import { useUser } from '@/composables/auth/user'
  const { user } = useUser()
  const { greeting } = useGreeting()
  import { dynamicIcons } from '@/utils/assets'
  const router = useRouter()

  const showWelcomeModal = ref(false)

  onMounted(() => {
    showWelcomeModal.value = true
  })

definePageMeta({
  middleware: "auth"
});
  const setupActions = ref([
    { title: 'Profile Information', description: 'Complete your profile for a better chance of approval when applying to rent a home.', path: '/profile' },
    { title: 'Explore Available Spaces', description: 'Explore a wide range of properties to find the perfect match for your lifestyle and budget.', path: '/dashboard/listings' },
    { title: 'Set up your payment preference', description: 'Search for homes that suit your preferences.', path: '#' }
  ]);
  
  const paymentActions = ref([
    { title: 'Pay Rent', icon: 'pay-rent' },
    { title: 'Pay Utility Bills', icon: 'utility-bills' },
    { title: 'Request maintenance', icon: 'request-maintance' }
  ]);
  
  const upcomingActivities = ref([
    { id: 1, title: 'Plumbing maintenance', date: '03/04/2024', status: 'Upcoming' },
    { id: 2, title: 'Rent payment', date: '03/04/2024', status: 'Due' },
    { id: 3, title: 'Scheduled property viewing', date: '03/04/2024', status: 'Upcoming' }
  ]);
  
  const recentTransactions = ref([
    { id: 1, title: 'Electricity bill', date: '03/04/2024, 16:00 pm', amount: '₦50,000.00' },
    { id: 2, title: 'Cable bill', date: '03/04/2024, 16:00 pm', amount: '₦50,000.00' },
    { id: 3, title: 'Security bill', date: '03/04/2024, 16:00 pm', amount: '₦50,000.00' }
  ]);
  </script>
  
  <style scoped>
  /* Add additional styles as needed */
  </style>
  