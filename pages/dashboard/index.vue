<template>
  <main>
    <TopNavBar class="" />
    <div class="bg-gray-25 min-h-screen p-3 lg:p-6">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-lg text-[#1D2739] font-medium mb-6">
          {{ greeting ?? "Hello" }}, {{ user?.firstName ?? "Nil" }}
          {{ user?.lastName ?? "Nil" }}
        </h1>

        <!-- Setup Actions Section -->
        <!-- {{  myHomeInfo }} -->
        <div class="space-y-2 mb-8">
          <div
            v-for="action in setupActions"
            :key="action.title"
            @click="router.push(action.path)"
            class="flex cursor-pointer justify-between items-center bg-white p-4 py-6 rounded-lg"
          >
            <div class="flex items-center gap-x-3">
              <div>
                <input
                  disabled
                  type="checkbox"
                  :checked="action.checked"
                  class="form-checkbox h-5 w-5 text-blue-600"
                />
              </div>
              <div>
                <h2 class="text-base font-medium text-[#1D2739]">
                  {{ action.title }}
                </h2>
                <p class="text-[#667185] text-sm font-light gap-x-2">
                  {{ action.description }}
                </p>
              </div>
            </div>
            <div>
              <svg
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.00003 1C1.00003 1 5 3.94593 5 5C5 6.05413 1 9 1 9"
                  stroke="#667185"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
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
              payment.isDisabled ? 'cursor-not-allowed opacity-25' : '',
            ]"
            @click.prevent="
              !Object.keys(myHomeInfo).length && handleAction(payment)
            "
          >
            <img
              :src="dynamicIcons(payment.icon)"
              alt=""
              class="h-10 w-10 mx-auto mb-2"
            />

            <h3 class="text-xs font-medium text-[#1D2739]">
              {{
                payment.isPaid
                  ? payment.icon === "pay-rent"
                    ? "Rent Paid"
                    : payment.icon === "utility-bills"
                    ? "Utility Bill"
                    : payment.title
                  : payment.title
              }}
            </h3>
          </button>
        </div>

        <!-- Rental Applications -->
        <div
          class="bg-white p-4 py-6 rounded-lg mb-8 flex justify-between items-center"
        >
          <div
            @click="router.push('/dashboard/rental-applications')"
            class="flex cursor-pointer items-center gap-x-3"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99935 18.3332L9.99935 4.99984C9.99935 3.42849 9.99935 2.64281 9.51118 2.15466C9.02302 1.6665 8.23737 1.6665 6.66602 1.6665L4.99935 1.6665C3.428 1.6665 2.64232 1.6665 2.15417 2.15466C1.66602 2.64281 1.66602 3.42849 1.66602 4.99984L1.66602 14.9998C1.66602 16.5712 1.66602 17.3568 2.15417 17.845C2.64232 18.3332 3.428 18.3332 4.99935 18.3332H9.99935Z"
                fill="#1A47C5"
                stroke="#1A47C5"
                stroke-width="1.5"
              />
              <path
                d="M10 18.3332H15C16.5713 18.3332 17.357 18.3332 17.8452 17.845C18.3333 17.3568 18.3333 16.5712 18.3333 14.9998V9.99984C18.3333 8.4285 18.3333 7.64281 17.8452 7.15466C17.357 6.6665 16.5713 6.6665 15 6.6665H10"
                fill="#1A47C5"
              />
              <path
                d="M10 18.3332H15C16.5713 18.3332 17.357 18.3332 17.8452 17.845C18.3333 17.3568 18.3333 16.5712 18.3333 14.9998V9.99984C18.3333 8.4285 18.3333 7.64281 17.8452 7.15466C17.357 6.6665 16.5713 6.6665 15 6.6665H10"
                stroke="#1A47C5"
                stroke-width="1.5"
              />
              <path
                d="M15.416 13.3333H12.916M15.416 10H12.916"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M7.08398 11.6667H4.58398M7.08398 8.33333H4.58398M7.08398 5H4.58398"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>

            <div class="space-y-1">
              <h3 class="font-medium text-lg text-[#1D2739]">
                Rental applications
              </h3>
              <p class="text-[#667185] font-light text-sm gap-x-2">
                View all your rental applications and their statuses, including
                visitation scheduled, sent, approved, rejected, and cancelled.
              </p>
            </div>
          </div>
          <svg
            width="6"
            height="10"
            viewBox="0 0 6 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.00003 1C1.00003 1 5 3.94593 5 5C5 6.05413 1 9 1 9"
              stroke="#667185"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="">
          <h2 class="text-base font-medium text-[#171717] pb-2 text-[#171717]">
            Recent applications
          </h2>
          <div v-if="!loadingRentals && rentalsList.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="rental in filteredRentals"
              @click="handleSelectedRental(rental)"
              :key="rental.id"
              class=" cursor-pointer rounded-l overflow-hidden relative"
            >

            <img v-if="rental.house.bookmark !== null" class='absolute right-2 top-2' src="@/assets/icons/liked.svg" />
            <img v-if="rental.house.bookmark == null" class='absolute right-2 top-2' src="@/assets/icons/un-liked.svg" />
              <!-- Image Section -->
              <!-- <img
                v-if="rental?.house?.images"
                :src="rental?.house?.images[0]"
                alt="Living Room"
                class="object-cover"
              /> -->
              <img class='h-72 object-cover rounded-xl' src="@/assets/img/home-Image.png" />

              <!-- Text Overlay with Transparent Background -->
              <div
                class="m-2 mt-3 rounded-b-lg"
              >
                <!-- Property Title -->
                <div class="flex justify-between items-center pb-0">
                  <h3 class="font-semibold text-sm">
                    {{ rental?.house?.name }}
                  </h3>
                  <!-- <span class="font-medium text-base">{{
                    formatCurrency(rental?.room?.rentAmount)
                  }}</span> -->
                </div>

                <!-- Address with Location Icon -->
                <p class="text-sm flex text-[#79797F] items-center space-x-1">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.80885 10.6835C6.59205 10.8865 6.3022 11 6.00055 11C5.6989 11 5.4091 10.8865 5.19225 10.6835C3.20651 8.813 0.54538 6.72345 1.84314 3.68983C2.54482 2.04958 4.22917 1 6.00055 1C7.77195 1 9.4563 2.04958 10.158 3.68983C11.4541 6.71965 8.7995 8.81945 6.80885 10.6835Z" fill="#5B8469" stroke="#5B8469"/>
<path d="M7.75 5.5C7.75 6.4665 6.9665 7.25 6 7.25C5.0335 7.25 4.25 6.4665 4.25 5.5C4.25 4.5335 5.0335 3.75 6 3.75C6.9665 3.75 7.75 4.5335 7.75 5.5Z" fill="#EAEAEA" stroke="#5B8469"/>
</svg>

                  <span>{{ rental?.house?.address.slice(0, 30) }}...</span>
                </p>

                <!-- Price and Status -->
                <div class="flex justify-between absolute top-60 left-2 items-center mt-2">
                  <!-- Status Badge with Light Background -->
                  <span
                    v-if="rental.status === 'PENDING'"
                    class="bg-[#E7F6EC] text-[#099137] text-xs px-2 py-2 rounded-full flex items-center"
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="4" cy="4" r="3" fill="#099137" />
                    </svg>
                    Application sent
                  </span>
                  <span
                    v-if="rental.status === 'APPROVED'"
                    class="bg-[#E7F6EC] text-[#099137] text-xs px-2 py-2 rounded-full flex items-center"
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="4" cy="4" r="3" fill="#099137" />
                    </svg>
                    Approved application
                  </span>
                  <span
                    v-if="rental.status === 'CANCELLED'"
                    class="bg-[#F9FAFB] text-[#1D2739] text-xs px-2 py-2 rounded-full flex items-center"
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="4" cy="4" r="3" fill="#1D2739" />
                    </svg>

                    Cancelled
                  </span>
                  <span
                    v-if="rental.status === 'REJECTED'"
                    class="bg-[#FBEAE9] text-[#BA110B] text-xs px-2 py-2 rounded-full flex items-center"
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="4" cy="4" r="3" fill="#BA110B" />
                    </svg>

                    Rejected
                  </span>
                  <span
                    v-if="rental.status === 'Scheduled visitation'"
                    class="bg-[#FEF6E7] text-[#DD900D] text-xs px-2 py-2 rounded-full flex items-center"
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="4" cy="4" r="3" fill="#DD900D" />
                    </svg>

                    Scheduled visitation
                  </span>
                </div>
              </div>
            </div>
          </div>
          <section  class="max-w-7xl mx-auto" v-else-if="loadingRentals && !rentalsList.length">
          <div class="animate-pulse h-44 bg-gray-50 flex space-x-4 rounded-md w-full mx-auto">
            
          </div>
      </section>
      <div v-else class="text-center text-gray-500 py-12">
              <img src="@/assets/icons/event-illustrations.svg" alt="No events" class="h-12 w-12 mx-auto mb-2" />
              <p>No Recent Rentals Available</p>
            </div>
          <!-- <RecentApplications :hideRejected="true" /> -->
        </div>

        <!-- Upcoming Activities Section -->
        <section class="mt-10">
          <div
            class="flex justify-between items-center bg-white rounded-md py-5 px-4"
          >
            <h3 class="text-base font-medium text-[#171717]">
              Upcoming activities
            </h3>
            <NuxtLink to="/dashboard/upcoming-activities" class="text-[#171717]"
              >View all</NuxtLink
            >
          </div>
          <UpcomingActivities />
        </section>

        <!-- Recent Transactions Section -->
        <section class="mt-10">
          <div
            class="flex justify-between items-center bg-white rounded-md py-5 px-4"
          >
            <h3 class="text-base font-medium text-[#171717]">
              Recent transactions
            </h3>
            <NuxtLink to="/dashboard/payment-list" class="text-[#171717]"
              >View all</NuxtLink
            >
          </div>
          <div class="pt-3 rounded-lg">
            <div
              v-if="!paymentList?.length && !loading"
              class="text-center text-gray-500 py-12"
            >
              <img
                src="@/assets/icons/transaction-illustration.svg"
                alt="No transactions"
                class="h-12 w-12 mx-auto mb-2"
              />
              <p>No recent transactions made</p>
            </div>
            <section class="mb-6" v-if="!paymentList?.length && loading">
              <div
                class="animate-pulse flex space-x-4 h-20 bg-slate-200 rounded"
              ></div>
            </section>
            <div v-else>
              <div
                @click="
                  router.push(
                    `/dashboard/transaction/${transaction.id}/maintenance-request`
                  )
                "
                v-for="transaction in paymentList"
                :key="transaction.id"
                class="flex justify-between items-center bg-white p-4 rounded-lg mb-2"
              >
                <div class="flex items-center gap-x-3">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="48"
                      height="48"
                      rx="24"
                      fill="white"
                    />
                    <rect
                      x="1"
                      y="1"
                      width="48"
                      height="48"
                      rx="24"
                      stroke="#F9FAFB"
                    />
                    <rect
                      x="3"
                      y="3"
                      width="44"
                      height="44"
                      rx="22"
                      fill="#F0F5FD"
                    />
                    <path
                      d="M27.9168 22.0835C28.06 22.1044 28.1992 22.1306 28.3335 22.1616C28.5798 22.2185 28.703 22.2469 28.8506 22.3647C28.9347 22.4319 29.0398 22.5648 29.086 22.6626C29.1668 22.8339 29.1668 23.0001 29.1668 23.3324V27.8585C29.1668 28.2722 28.7335 28.5565 28.3335 28.4641C27.9503 28.3755 27.5276 28.3265 27.0835 28.3265C26.2847 28.3265 25.5554 28.4852 25.0002 28.7467C24.445 29.0082 23.7156 29.1668 22.9168 29.1668C22.4727 29.1668 22.05 29.1178 21.6668 29.0293C21.4205 28.9724 21.2973 28.9439 21.1497 28.8262C21.0656 28.759 20.9605 28.626 20.9144 28.5283C20.8335 28.357 20.8335 28.1908 20.8335 27.8585V23.3324C20.8335 22.9186 21.2668 22.6344 21.6668 22.7268C21.8011 22.7578 21.9403 22.784 22.0835 22.8049"
                      stroke="#6A9AEB"
                      stroke-linecap="round"
                    />
                    <path
                      d="M26.0418 25.6252C26.0418 26.2005 25.5755 26.6668 25.0002 26.6668C24.4249 26.6668 23.9585 26.2005 23.9585 25.6252C23.9585 25.0499 24.4249 24.5835 25.0002 24.5835C25.5755 24.5835 26.0418 25.0499 26.0418 25.6252Z"
                      fill="white"
                      stroke="#6A9AEB"
                    />
                    <path
                      d="M22.2915 26.0415V26.0453"
                      stroke="#6A9AEB"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M27.7085 25.2051V25.2088"
                      stroke="#6A9AEB"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M25.0002 20.8335V22.5002M23.3335 22.0835V22.9168M26.6668 21.2502V22.0835"
                      stroke="#6A9AEB"
                      stroke-linecap="round"
                    />
                  </svg>

                  <div class="space-y-1">
                    <h4 class="font-medium text-[#1D2739] text-sm">
                      {{ transaction?.narration ?? "Nil" }}
                    </h4>
                    <p class="text-xs text-[#667185]">
                      {{
                        moment(transaction?.transactionDate).format(
                          "MMMM Do YYYY, HH:MM A"
                        ) ?? "Nil"
                      }}
                    </p>
                  </div>
                </div>
                <span class="text-sm font-semibold text-[#292929]">{{
                  formatCurrency(transaction?.amountSubunit) ?? "0.00"
                }}</span>
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
import { useGetRentals } from "@/composables/modules/rentals/fetchAllRentals";
import { dynamicIcons } from "@/utils/assets";
import { use_tenant_profile } from "@/composables/auth/fetchProfile";
const { loading: fetchong, profileObj } = use_tenant_profile();
import { useFetchUpcomingActivities } from "@/composables/modules/settings/useFetchUpcomingActivities";
import { useFetchMaintenanceRequests } from "@/composables/modules/maintenance/useFetchMaintenanceRequests";
const { maintenanceRequests, loading: fetchingRequests } =
  useFetchMaintenanceRequests();
import { useCurrencyFormatter } from "@/composables/core/useCurrencyFormatter";
const { formatCurrency } = useCurrencyFormatter();
import { useGetTransactionHistory } from "@/composables/modules/payment/useFetchPaymenttHistory";
import { useInitializeRentPayment } from "@/composables/modules/rentals/useInitializeRentPayment";
import { useFetchMyHomeInfo } from "@/composables/modules/home/useFetchMyHomeInfo";
// import { useCheckout } from '@/composables/modules/banks/useCheckout'
import { useFetchBankAccounts } from "@/composables/modules/banks/useFetchBankAccounts";
import { useObjectCompletionCheck } from "@/composables/core/useObjectCompletionCheck";
const { isObjectComplete, checkObjectCompletion } = useObjectCompletionCheck();
const { loadingRentals, rentalsList } = useGetRentals();
import { useGreeting } from "@/composables/core/useGreeting";
import { useUser } from "@/composables/auth/user";
const { user } = useUser();
const { loading: fetchingMyHomeInfo, myHomeInfo } = useFetchMyHomeInfo();
const { paymentList, loading } = useGetTransactionHistory();
const { loading: fetchingUpcomingActivities, upcomingActivitiesList } =
  useFetchUpcomingActivities();
// import { useFetchMyHomeInfo } from '@/composables/modules/maintenance/useGetMyHome'
// const { loading: fetching, myHomeInfo } = useFetchMyHomeInfo()

const filteredRentalApplications = computed(() => {
  return rentalsList.value.filter(
    (application: any) =>
      application.status !== "RENT_ACTIVE" && application.status !== "REJECTED"
  );
});

const filteredRentals = computed(() => {
  // Apply the filter and also exclude 'RENT_ACTIVE'
  return rentalsList.value.filter((rental: any) => rental.status && rental.status !== 'RENT_ACTIVE').slice(0, 3);
});

const {
  initializeRentPayment,
  loading: initializing,
  payload,
  responseObj,
  setPayloadObj,
} = useInitializeRentPayment();
const { greeting } = useGreeting();
const { bankAccounts } = useFetchBankAccounts();

const showWelcomeModal = ref(false);

const modalValue = localStorage.getItem("welcome-modal-shown");

onMounted(() => {
  if (!profileObj?.hasTakenTour) {
    showWelcomeModal.value = true;
  }

  if (modalValue) {
    showWelcomeModal.value = false;
  }
});

const closeWelcomeModal = () => {
  localStorage.setItem("welcome-modal-shown", "true");
  showWelcomeModal.value = false;
};

const statusClasses = (status: string) => {
  // Convert status to lowercase to handle inconsistent casing
  switch (status.toLowerCase()) {
    case "upcoming":
      return "bg-[#FEF6E7] text-[#DD900D]";
    case "pending":
      return "bg-[#E8EDFB] text-[#1D4ED8]";
    case "cancelled":
      return "bg-[#F9FAFB] text-[#1D2739]";
    case "completed":
      return "bg-[#E7F6EC] text-[#099137]";
    case "declined":
      return "bg-[#FBEAE9] text-[#BA110B]";
    default:
      return "";
  }
};

const router = useRouter();

const selectedStatus = ref<string>("All requests");

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
    date: new Date(req.createdAt).toISOString().split("T")[0],
    status: req.status.charAt(0).toUpperCase() + req.status.slice(1), // Capitalize status
  }))
);

const filteredRequestsByStatus = (date: string) => {
  return requests.value.filter(
    (req) =>
      req.date === date &&
      (selectedStatus.value === "All requests" ||
        req.status === selectedStatus.value)
  );
};

// const router = useRouter()

const isAccountSetupComplete = computed(() => {
  return bankAccounts.value.length ? true : false;
});

const isComplete = checkObjectCompletion(user.value);

onMounted(() => {
  // Check if the welcome modal has already been shown
  const welcomeShown = localStorage.getItem("welcome-modal-shown");

  // If the modal has not been shown, run the modal
  if (!welcomeShown) {
    showWelcomeModal.value = true;
    localStorage.setItem("welcome-modal-shown", "true"); // Corrected the key here
  }
});

const handleSelectedRental = (item) => {
   if(item.status === 'Scheduled visitation'){
     router.push(`/dashboard/listings/${item?.house?.id}/rental-applications/details?type=scheduled?rentalId=${item?.id}`)
   } else {
    router.push(`/dashboard/listings/${item?.house?.id}/rental-applications/details?rentalId=${item?.id}`)
   }
}

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
  middleware: "auth",
});
const setupActions = ref([
  {
    checked: isComplete,
    title: "Profile Information",
    description:
      "Complete your profile for a better chance of approval when applying to rent a home.",
    path: "/profile",
  },
  {
    checked: profileObj?.value?.hasExploredListing,
    title: "Explore Available Spaces",
    description:
      "Explore a wide range of properties to find the perfect match for your lifestyle and budget.",
    path: "/dashboard/listings",
  },
  // { checked: isAccountSetupComplete.value, title: 'Set up your payment preference', description: 'Search for homes that suit your preferences.', path: '/profile/payment-information' }
]);

const paymentActions = ref([
  {
    isDisabled: myHomeInfo?.value?.movedIn,
    isPaid: myHomeInfo.value && myHomeInfo?.value?.status === "RENT_ACTIVE",
    title: "Pay Rent",
    icon: "pay-rent",
    link: "#",
    action: "pay-rent",
  },
  {
    isDisabled: myHomeInfo?.value?.movedIn,
    isPaid: true,
    title: "Pay Utility Bills",
    icon: "utility-bills",
    link: "#",
    action: "pay-utility-bills",
  },
  {
    isDisabled: myHomeInfo?.value?.movedIn,
    isPaid: true,
    title: "Request Maintenance",
    icon: "request-maintance",
    link: "/dashboard/home/create",
  },
]);

const proceed = async () => {
  const payloadObj = {
    rentalApplicationId: myHomeInfo?.value?.rentPayment?.id,
    rentAmount: myHomeInfo?.value?.room?.rentAmount,
  };

  setPayloadObj(payloadObj);
  await initializeRentPayment();
};

const handleAction = (payment) => {
  if (payment.action === "pay-rent" || payment.action === "pay-utility-bills") {
    proceed();
  }
};

// Format date to a readable format
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Extract unique dates from requests and sort them
const requestDates = computed(() =>
  [...new Set(requests.value.map((req) => req.date))].sort()
);

const startTour = () => {
  localStorage.setItem("welcome-modal-shown", "false"); // Corrected the key here
  // router.push("/dashboard/listings");
};
</script>

<style scoped>
/* Add additional styles as needed */
</style>
