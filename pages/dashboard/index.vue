<template>
  <main>
    <TopNavBar class="" />
    <div class="bg-gray-25 min-h-screen p-6">
      <!-- {{ myHomeInfo }} -->
      <div class="max-w-4xl mx-auto">
        <h1 class="text-lg text-[#1D2739] font-medium mb-6">{{ greeting ?? 'Hello' }}, {{ user.firstName ?? 'Nil' }}
          {{ user.lastName ?? 'Nil' }}</h1>

        <!-- Setup Actions Section -->
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
        <div class="flex justify-between mb-8 rounded-lg">
          <NuxtLink v-for="payment in paymentActions" :key="payment.title" :to="payment.link"
            class="w-1/3 block cursor-pointer bg-white p-6 text-center" @click.prevent="handleAction(payment)">
            <img :src="dynamicIcons(payment.icon)" alt="" class="h-10 w-10 mx-auto mb-2" />
            <!-- <img v-else :src="dynamicIcons('tick')" alt="" class="h-9 w-9 mx-auto mb-2" /> -->

            <h3 class="text-xs font-medium text-[#1D2739]">
              {{ 
                  payment.isPaid 
                    ? (payment.icon === 'pay-rent' ? 'Rent Paid' : 
                      payment.icon === 'utility-bills' ? 'Utility Bill Paid' : payment.title)
                    : payment.title 
                }}

            </h3>
          </NuxtLink>
        </div>


        <div class="">
          <h2 class="text-base font-medium text-[#171717]">Recent applications</h2>
          <RecentApplications />
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
            <a href="#" class="text-[#171717]">View all</a>
          </div>
          <div
          v-if="!requestDates.some(date => filteredRequestsByStatus(date).length > 0) && !loading"
          class="flex flex-col items-center mt-20 text-gray-500"
        >
          <div class="flex items-center justify-center mb-4">
            <svg width="152" height="124" viewBox="0 0 152 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="76" cy="58" r="52" fill="#EAEAEA"/>
            <circle cx="21" cy="25" r="5" fill="#BDBDBD"/>
            <circle cx="18" cy="109" r="7" fill="#BDBDBD"/>
            <circle cx="145" cy="41" r="7" fill="#BDBDBD"/>
            <circle cx="134" cy="14" r="4" fill="#BDBDBD"/>
            <g filter="url(#filter0_b_6053_208442)">
            <rect x="52" y="34" width="48" height="48" rx="24" fill="#9D9D9D"/>
            <path d="M83 51C83.3437 51.0502 83.6777 51.113 84 51.1874C84.5912 51.324 84.8868 51.3923 85.241 51.6749C85.443 51.8361 85.6952 52.1552 85.8059 52.3897C86 52.801 86 53.1998 86 53.9974V64.8599C86 65.853 84.96 66.5351 84 66.3134C83.0803 66.1009 82.0659 65.9832 81 65.9832C79.0829 65.9832 77.3325 66.364 76 66.9916C74.6675 67.6192 72.9171 68 71 68C69.9341 68 68.9197 67.8823 68 67.6699C67.4088 67.5333 67.1132 67.465 66.759 67.1824C66.557 67.0212 66.3048 66.7021 66.1941 66.4676C66 66.0563 66 65.6575 66 64.8599V53.9974C66 53.0043 67.04 52.3222 68 52.544C68.3223 52.6184 68.6563 52.6812 69 52.7314" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M78.5 59.5C78.5 60.8807 77.3807 62 76 62C74.6193 62 73.5 60.8807 73.5 59.5C73.5 58.1193 74.6193 57 76 57C77.3807 57 78.5 58.1193 78.5 59.5Z" stroke="white" stroke-width="1.5"/>
            <path d="M69.5 60.5V60.509" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M82.5 58.4922V58.5012" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M76 48V52M72 51V53M80 49V51" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
            </g>
            <defs>
            <filter id="filter0_b_6053_208442" x="44" y="26" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_6053_208442"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_6053_208442" result="shape"/>
            </filter>
            </defs>
            </svg>

          </div>
          <p>No request made yet</p>
        </div>

        <!-- Requests List -->
        <div v-else-if="!fetchingRequests && requestDates.length">
          <div class="space-y-4">
            <div v-for="date in requestDates" :key="date" class="space-y-2">
              <h3
                class="text-gray-400 text-sm p-4 bg-white border-[0.5px] border-gray-50 rounded-lg"
              >
                {{ formatDate(date) }}
              </h3>
              <div
                v-for="request in filteredRequestsByStatus(date)"
                :key="request.id"
                @click="handleSelectedRequest(request)"
                class="flex items-center cursor-pointer justify-between p-4 bg-white border-[0.5px] border-gray-50 rounded-lg"
              >
                <div class="flex items-center gap-x-3">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="44" height="44" rx="22" fill="#F0F5FD" />
                    <path
                      d="M15.5037 24.4221C15.5264 24.2067 15.6825 24.033 15.9948 23.6857L16.6822 22.9173C16.8502 22.7045 16.9694 22.334 16.9694 22.0005C16.9694 21.6673 16.8502 21.2967 16.6822 21.084L15.9948 20.3155C15.6825 19.9682 15.5264 19.7946 15.5037 19.5791C15.4811 19.3636 15.5977 19.1612 15.831 18.7564L16.1601 18.1853C16.4089 17.7534 16.5334 17.5375 16.7451 17.4514C16.9568 17.3653 17.1962 17.4332 17.6751 17.5691L18.4886 17.7982C18.7944 17.8687 19.1151 17.8287 19.3943 17.6853L19.6189 17.5557C19.8583 17.4024 20.0424 17.1763 20.1443 16.9106L20.367 16.2457C20.5133 15.8057 20.5865 15.5857 20.7608 15.4598C20.9351 15.334 21.1665 15.334 21.6294 15.334H22.3726C22.8355 15.334 23.067 15.334 23.2412 15.4598C23.4155 15.5857 23.4887 15.8057 23.6351 16.2457L23.8577 16.9106C23.9596 17.1763 24.1437 17.4024 24.3831 17.5557L24.6077 17.6853C24.8869 17.8287 25.2077 17.8687 25.5134 17.7982L26.3269 17.5691C26.8057 17.4332 27.0452 17.3653 27.2569 17.4514C27.4687 17.5375 27.5931 17.7534 27.8419 18.1853L28.171 18.7564C28.4043 19.1612 28.5209 19.3636 28.4983 19.5791C28.4756 19.7946 28.3195 19.9682 28.0072 20.3155L27.3198 21.084C27.1519 21.2967 27.0325 21.6673 27.0325 22.0005C27.0325 22.334 27.1518 22.7045 27.3198 22.9173L28.0072 23.6857C28.3195 24.033 28.4756 24.2067 28.4983 24.4221C28.5209 24.6377 28.4043 24.8401 28.171 25.2449L27.8419 25.8159C27.5931 26.2478 27.4687 26.4638 27.2569 26.5499C27.0452 26.636 26.8057 26.5681 26.3269 26.4321L25.5134 26.203C25.2076 26.1325 24.8868 26.1725 24.6076 26.316L24.3831 26.4456C24.1437 26.5989 23.9596 26.8249 23.8577 27.0907L23.6351 27.7557C23.4887 28.1957 23.4155 28.4157 23.2412 28.5415C23.067 28.6673 22.8355 28.6673 22.3726 28.6673H21.6294C21.1665 28.6673 20.9351 28.6673 20.7608 28.5415C20.5865 28.4157 20.5133 28.1957 20.367 27.7557"
                      stroke="#6A9AEB"
                      stroke-linecap="round"
                    />
                  </svg>
                  <div class="space-y-1">
                    <h4 class="text-[#1D2739] text-sm">{{ request.type }}</h4>
                    <p class="text-xs text-[#667185]">{{ request.date }}</p>
                  </div>
                </div>
                <span
                  :class="statusClasses(request.status)"
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ request.status }}
                </span>
                <!-- <span
                  :class="statusClasses(request.status)"
                  class="px-2 py-1 text-xs font-semibold rounded-full text-xs px-3"
                >
                  {{ request.status }}
                </span> -->
              </div>
            </div>
          </div>
        </div>
        <section v-else>
          <div class="rounded-md p-4 w-full mx-auto mt-4">
            <div class="animate-pulse h-60 bg-slate-200 flex space-x-4"></div>
          </div>
        </section>
          <!-- <div class="pt-3 rounded-lg">
            <div v-if="upcomingActivities.length === 0" class="text-center text-gray-500 py-12">
              <img src="@/assets/icons/event-illustrations.svg" alt="No events" class="h-12 w-12 mx-auto mb-2" />
              <p>No Upcoming event found</p>
            </div>
            <div v-else>
              <div v-for="activity in upcomingActivities" :key="activity.id"
                class="flex justify-between items-center bg-white p-4 rounded-lg mb-2">
                <div class="flex items-center gap-x-3">
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
                      <path d="M25.0002 20.8335V22.5002M23.3335 22.0835V22.9168M26.6668 21.2502V22.0835"
                        stroke="#6A9AEB" stroke-linecap="round" />
                    </svg>
                    <div>
                      <h4 class="font-medium text-[#1D2739] text-sm">{{ activity.title }}</h4>
                      <p class="text-sm text-[#667185]">{{ activity.date }}</p>
                    </div>
                  </div>
                </div>
                <span class="text-xs font-semibold rounded-full text-[#DD900D] bg-[#FEF6E7] px-3 py-1">{{
                  activity.status }}</span>
              </div>
            </div>
          </div> -->
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
              <div v-for="transaction in paymentList" :key="transaction.id"
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

    <CoreModal :isOpen="showWelcomeModal" @close="showWelcomeModal = false">
      <CoreWelcome @close="showWelcomeModal = false" @start="router.push('/dashboard/listings?view=grid')" class="" />
    </CoreModal>
  </main>
</template>

<script setup lang="ts">
import moment from "moment";
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
const {
  initializeRentPayment,
  loading: initializing,
  payload,
  responseObj,
  setPayloadObj
} = useInitializeRentPayment();

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

const { greeting } = useGreeting()
const { bankAccounts } = useFetchBankAccounts()
import { dynamicIcons } from '@/utils/assets'
const router = useRouter()

const isAccountSetupComplete = computed(() => {
  return bankAccounts.value.length ? true : false
})

const showWelcomeModal = ref(false)

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
  { checked: false, title: 'Explore Available Spaces', description: 'Explore a wide range of properties to find the perfect match for your lifestyle and budget.', path: '/dashboard/listings' },
  { checked: isAccountSetupComplete.value, title: 'Set up your payment preference', description: 'Search for homes that suit your preferences.', path: '/profile/payment-information' }
]);


const paymentActions = ref([
  { isPaid: myHomeInfo.value && myHomeInfo?.value?.status === 'RENT_ACTIVE', title: 'Pay Rent', icon: 'pay-rent', link: '#', action: 'pay-rent' },
  { isPaid: true, title: 'Pay Utility Bills', icon: 'utility-bills', link: '#', action: 'pay-utility-bills' },
  { isPaid: true, title: 'Request Maintenance', icon: 'request-maintance', link: '/dashboard/home/create' }
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

</script>

<style scoped>
/* Add additional styles as needed */
</style>