<template>
  <main>
    <TopNavBar class="" />
    <div class="bg-gray-25 min-h-screen p-6">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-lg text-[#1D2739] font-medium mb-6">{{ greeting ?? 'Hello' }}, {{ user?.firstName ?? 'Nil' }}
          {{ user?.lastName ?? 'Nil' }}</h1>


        <!-- Setup Actions Section -->
         <!-- {{  myHomeInfo }} -->
        <div class="space-y-2 mb-8">
          <div v-for="action in setupActions" :key="action.title" @click="router.push(action.path)"
            class="flex cursor-pointer justify-between items-center bg-white p-4 py-6 rounded-lg">
            <div class="flex items-center gap-x-3">
              <div>
                <input disabled type="checkbox" :checked="action.checked" class="form-checkbox h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 class="text-base font-medium text-[#1D2739]">{{ action.title }}</h2>
                <p class="text-[#667185] text-sm font-light gap-x-2">{{ action.description }}</p>
              </div>
            </div>
            <div>
              <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.00003 1C1.00003 1 5 3.94593 5 5C5 6.05413 1 9 1 9" stroke="#667185" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Payment Actions -->
        <!-- <div class="flex justify-between mb-8 rounded-lg">
          <NuxtLink :class="[payment.isDisabled ? 'cursor-not-allowed opacity-25' : '']"  v-for="payment in paymentActions" :key="payment.title" :to="payment.link"
            class="w-1/3 block cursor-pointer bg-white p-6 text-center" @click.prevent="handleAction(payment)">
            <img :src="dynamicIcons(payment.icon)" alt="" class="h-10 w-10 mx-auto mb-2" />

            <h3 class="text-xs font-medium text-[#1D2739]">
              {{ 
                  payment.isPaid 
                    ? (payment.icon === 'pay-rent' ? 'Rent Paid' : 
                      payment.icon === 'utility-bills' ? 'Utility Bill Paid' : payment.title)
                    : payment.title 
                }}

            </h3>
          </NuxtLink>
        </div> -->

        <div class="flex justify-between mb-8 rounded-lg">
  <button
    v-for="payment in paymentActions"
    :key="payment.title"
    :disabled="!Object.keys(myHomeInfo).length"
    :class="[
      'w-1/3 block bg-white p-6 text-center',
      payment.isDisabled ? 'cursor-not-allowed opacity-25' : ''
    ]"
    @click.prevent="!Object.keys(myHomeInfo).length && handleAction(payment)"
  >
    <img
      :src="dynamicIcons(payment.icon)"
      alt=""
      class="h-10 w-10 mx-auto mb-2"
    />

    <h3 class="text-xs font-medium text-[#1D2739]">
      {{
        payment.isPaid
          ? payment.icon === 'pay-rent'
            ? 'Rent Paid'
            : payment.icon === 'utility-bills'
            ? 'Utility Bill Paid'
            : payment.title
          : payment.title
      }}
    </h3>
  </button>
</div>


        <div class="">
          <h2 class="text-base font-medium text-[#171717]">Recent applications</h2>
          <RecentApplications :hideRejected="true" />
        </div>


        <!-- Rental Applications -->
        <div class="bg-white p-4 py-6 rounded-lg mb-8 flex justify-between items-center">
          <div @click="router.push('/dashboard/rental-applications')" class="flex cursor-pointer items-center gap-x-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="#1A47C5" stroke-width="1.5" />
              <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11"
                stroke="#1A47C5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M11.992 8H12.001" stroke="#1A47C5" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>

            <div>
              <h3 class="text-sm font-medium text-[#1D2739]">Rental applications</h3>
              <p class="text-[#667185] text-xs font-light gap-x-2">Manage your rental applications</p>
            </div>
          </div>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.00003 1C1.00003 1 5 3.94593 5 5C5 6.05413 1 9 1 9" stroke="#667185" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <!-- Upcoming Activities Section -->
        <section class="mt-10">
          <div class="flex justify-between items-center bg-white rounded-md py-5 px-4">
            <h3 class="text-base font-medium text-[#171717]">Upcoming activities</h3>
            <NuxtLink to="/dashboard/upcoming-activities" class="text-[#171717]">View all</NuxtLink>
          </div>
          <UpcomingActivities />
        </section>

        <!-- Recent Transactions Section -->
        <section class="mt-10">
          <div class="flex justify-between items-center bg-white rounded-md py-5 px-4">
            <h3 class="text-base font-medium text-[#171717]">Recent transactions</h3>
            <NuxtLink to="/dashboard/payment-list" class="text-[#171717]">View all</NuxtLink>
          </div>
          <div class="pt-3 rounded-lg">
            <div v-if="!paymentList?.length && !loading" class="text-center text-gray-500 py-12">
              <img src="@/assets/icons/transaction-illustration.svg" alt="No transactions"
                class="h-12 w-12 mx-auto mb-2" />
              <p>No recent transactions made</p>
            </div>
            <section class="mb-6" v-if="!paymentList?.length && loading">
            <div class="animate-pulse flex space-x-4 h-20 bg-slate-200 rounded"></div>
            </section>
            <div v-else>
              <div @click="router.push(`/dashboard/transaction/${transaction.id}/maintenance-request`)" v-for="transaction in paymentList" :key="transaction.id"
                class="flex justify-between items-center bg-white p-4 rounded-lg mb-2">
                <div class="flex items-center gap-x-3">
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1" width="48" height="48" rx="24" fill="white" />
                    <rect x="1" y="1" width="48" height="48" rx="24" stroke="#F9FAFB" />
                    <rect x="3" y="3" width="44" height="44" rx="22" fill="#F0F5FD" />
                    <path
                      d="M27.9168 22.0835C28.06 22.1044 28.1992 22.1306 28.3335 22.1616C28.5798 22.2185 28.703 22.2469 28.8506 22.3647C28.9347 22.4319 29.0398 22.5648 29.086 22.6626C29.1668 22.8339 29.1668 23.0001 29.1668 23.3324V27.8585C29.1668 28.2722 28.7335 28.5565 28.3335 28.4641C27.9503 28.3755 27.5276 28.3265 27.0835 28.3265C26.2847 28.3265 25.5554 28.4852 25.0002 28.7467C24.445 29.0082 23.7156 29.1668 22.9168 29.1668C22.4727 29.1668 22.05 29.1178 21.6668 29.0293C21.4205 28.9724 21.2973 28.9439 21.1497 28.8262C21.0656 28.759 20.9605 28.626 20.9144 28.5283C20.8335 28.357 20.8335 28.1908 20.8335 27.8585V23.3324C20.8335 22.9186 21.2668 22.6344 21.6668 22.7268C21.8011 22.7578 21.9403 22.784 22.0835 22.8049"
                      stroke="#6A9AEB" stroke-linecap="round" />
                    <path
                      d="M26.0418 25.6252C26.0418 26.2005 25.5755 26.6668 25.0002 26.6668C24.4249 26.6668 23.9585 26.2005 23.9585 25.6252C23.9585 25.0499 24.4249 24.5835 25.0002 24.5835C25.5755 24.5835 26.0418 25.0499 26.0418 25.6252Z"
                      fill="white" stroke="#6A9AEB" />
                    <path d="M22.2915 26.0415V26.0453" stroke="#6A9AEB" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M27.7085 25.2051V25.2088" stroke="#6A9AEB" stroke-linecap="round"
                      stroke-linejoin="round" />
                    <path d="M25.0002 20.8335V22.5002M23.3335 22.0835V22.9168M26.6668 21.2502V22.0835" stroke="#6A9AEB"
                      stroke-linecap="round" />
                  </svg>

                  <div class="space-y-1">
                    <h4 class="font-medium text-[#1D2739] text-sm">{{ transaction?.narration ?? 'Nil' }}</h4>
                    <p class="text-xs text-[#667185]">
                      {{  moment(transaction?.transactionDate).format("MMMM Do YYYY, HH:MM A") ?? 'Nil' }}
                    </p>
                  </div>
                </div>
                <span class="text-sm font-semibold text-[#292929]">{{ formatCurrency(transaction?.amountSubunit) ?? '0.00' }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    <CoreModal :isOpen="showWelcomeModal" @close="closeWelcomeModal">
      <CoreWelcome @close="closeWelcomeModal" @start="startTour" class="" />
    </CoreModal>
  </main>
</template>

<script setup lang="ts">
import moment from "moment";
import { dynamicIcons } from '@/utils/assets'
import { use_tenant_profile } from '@/composables/auth/fetchProfile'
const { loading: fetchong, profileObj } = use_tenant_profile()
import { useFetchUpcomingActivities } from '@/composables/modules/settings/useFetchUpcomingActivities'
import { useFetchMaintenanceRequests } from '@/composables/modules/maintenance/useFetchMaintenanceRequests'
const { maintenanceRequests, loading: fetchingRequests } = useFetchMaintenanceRequests()
import { useCurrencyFormatter } from '@/composables/core/useCurrencyFormatter';
const { formatCurrency } = useCurrencyFormatter()
import { useGetTransactionHistory } from '@/composables/modules/payment/useFetchPaymenttHistory'
import { useInitializeRentPayment } from '@/composables/modules/rentals/useInitializeRentPayment'
import { useFetchMyHomeInfo } from '@/composables/modules/home/useFetchMyHomeInfo'
// import { useCheckout } from '@/composables/modules/banks/useCheckout'
import { useFetchBankAccounts } from '@/composables/modules/banks/useFetchBankAccounts'
import { useObjectCompletionCheck } from '@/composables/core/useObjectCompletionCheck';
const { isObjectComplete, checkObjectCompletion } = useObjectCompletionCheck();
import { useGreeting } from '@/composables/core/useGreeting'
import { useUser } from '@/composables/auth/user'
const { user } = useUser()
const { loading: fetchingMyHomeInfo, myHomeInfo } = useFetchMyHomeInfo()
const { paymentList, loading } = useGetTransactionHistory()
const { loading: fetchingUpcomingActivities, upcomingActivitiesList } = useFetchUpcomingActivities()
  // import { useFetchMyHomeInfo } from '@/composables/modules/maintenance/useGetMyHome'
  // const { loading: fetching, myHomeInfo } = useFetchMyHomeInfo()
const {
  initializeRentPayment,
  loading: initializing,
  payload,
  responseObj,
  setPayloadObj
} = useInitializeRentPayment();
const { greeting } = useGreeting()
const { bankAccounts } = useFetchBankAccounts()

const showWelcomeModal = ref(false)

const modalValue = localStorage.getItem('welcome-modal-shown');

onMounted(() => {
   if(!profileObj?.hasTakenTour){
    showWelcomeModal.value = true
   }


   if(modalValue){
    showWelcomeModal.value = false
  }
   
  })

  const closeWelcomeModal = () => {
    localStorage.setItem('welcome-modal-shown', 'true');
    showWelcomeModal.value = false
  }


const statusClasses = (status: string) => {
  // Convert status to lowercase to handle inconsistent casing
  switch (status.toLowerCase()) {
    case 'upcoming':
      return 'bg-[#FEF6E7] text-[#DD900D]'
    case 'pending':
      return 'bg-[#E8EDFB] text-[#1D4ED8]'
    case 'cancelled':
      return 'bg-[#F9FAFB] text-[#1D2739]'
    case 'completed':
      return 'bg-[#E7F6EC] text-[#099137]'
    case 'declined':
      return 'bg-[#FBEAE9] text-[#BA110B]'
    default:
      return ''
  }
}

const router = useRouter()

const selectedStatus = ref<string>('All requests')

// const cust_id = computed(() => user.value?.email || "");
// const amount =  myHomeInfo?.value?.rentPayment?.amount;
// const currency = computed(() => "566");
// const transRef = ref(""); // Transaction reference from the API response

// const { checkout, paymentResponse } = useCheckout({
//   amount,
//   cust_id,
//   currency,
//   transRef, // Pass transRef directly
// });
const requests = computed(() =>
  maintenanceRequests.value.map((req) => ({
    ...req,
    id: req.id,
    type: req.type,
    date: new Date(req.createdAt).toISOString().split('T')[0],
    status: req.status.charAt(0).toUpperCase() + req.status.slice(1), // Capitalize status
  }))
)

const filteredRequestsByStatus = (date: string) => {
  return requests.value.filter((req) =>
    req.date === date && (selectedStatus.value === 'All requests' || req.status === selectedStatus.value)
  )
}

// const router = useRouter()

const isAccountSetupComplete = computed(() => {
  return bankAccounts.value.length ? true : false
})


const isComplete = checkObjectCompletion(user.value);

onMounted(() => {
  // Check if the welcome modal has already been shown
  const welcomeShown = localStorage.getItem('welcome-modal-shown');

  // If the modal has not been shown, run the modal
  if (!welcomeShown) {
    showWelcomeModal.value = true;
    localStorage.setItem('welcome-modal-shown', 'true'); // Corrected the key here
  }
});

//   onMounted(() => {
//   // Check if the tour has already run
//   const welcomeShown = localStorage.getItem('welcome-modal-shown');

//   // If tour has not been shown, run the tour
//   if (!welcomeShown) {
//     showWelcomeModal.value = true
//     localStorage.setItem('welcome-modal-show', 'true');
//   }
// });

// onMounted(() => {
//   showWelcomeModal.value = true
// })


definePageMeta({
  middleware: "auth"
});
const setupActions = ref([
  { checked: isComplete, title: 'Profile Information', description: 'Complete your profile for a better chance of approval when applying to rent a home.', path: '/profile' },
  { checked: profileObj?.value?.hasExploredListing, title: 'Explore Available Spaces', description: 'Explore a wide range of properties to find the perfect match for your lifestyle and budget.', path: '/dashboard/listings' },
  // { checked: isAccountSetupComplete.value, title: 'Set up your payment preference', description: 'Search for homes that suit your preferences.', path: '/profile/payment-information' }
]);


const paymentActions = ref([
  { isDisabled: myHomeInfo?.value?.movedIn, isPaid: myHomeInfo.value && myHomeInfo?.value?.status === 'RENT_ACTIVE', title: 'Pay Rent', icon: 'pay-rent', link: '#', action: 'pay-rent' },
  { isDisabled: myHomeInfo?.value?.movedIn, isPaid: true, title: 'Pay Utility Bills', icon: 'utility-bills', link: '#', action: 'pay-utility-bills' },
  { isDisabled: myHomeInfo?.value?.movedIn, isPaid: true, title: 'Request Maintenance', icon: 'request-maintance', link: '/dashboard/home/create' }
]);

const proceed = async () => {
  const payloadObj = {
    rentalApplicationId: myHomeInfo?.value?.rentPayment?.id,
    rentAmount: myHomeInfo?.value?.room?.rentAmount
  };

  setPayloadObj(payloadObj);
  await initializeRentPayment();

}

const handleAction = (payment) => {
  if (payment.action === 'pay-rent' || payment.action === 'pay-utility-bills') {
    proceed();
  }
};

// Format date to a readable format
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Extract unique dates from requests and sort them
const requestDates = computed(() =>
  [...new Set(requests.value.map((req) => req.date))].sort()
)

const startTour = () => {
  localStorage.setItem('welcome-modal-shown', 'false'); // Corrected the key here
  router.push('/dashboard/listings')
}

</script>

<style scoped>
/* Add additional styles as needed */
</style>