<template>
  <main>
    <TopNavBar class="mb-6" />
    <section v-if="!fetching" class="max-w-4xl mx-auto mt-10 p-4 lg:p-0">
      <!-- Property Overview Section -->
      <HomePropertyOverview :myHomeInfo="myHomeInfo" />

      <div
        @click="handleClick"
        class="space-y-2 mb-8 border-[0.5px] border-gray-50 rounded-md mt-4"
      >
        <div
          class="flex cursor-pointer justify-between items-center bg-white p-4 py-6 rounded-lg"
        >
          <div class="flex items-center gap-x-3">
            <div>
              <input
                :disabled="user.hasMoveInChecklist"
                type="checkbox"
                :checked="user.hasMoveInChecklist"
                class="form-checkbox h-5 w-5 text-blue-600"
              />
            </div>
            <div>
              <h2 class="text-base font-medium text-[#1D2739]">
                Move-in checklist
              </h2>
              <p class="text-[#667185] text-sm font-light gap-x-2">
                Take a moment to inspect the property and report any
                discrepancies using our move-in checklist
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

      <HomeActionButtons :myHomeInfo="myHomeInfo" />

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
              @click="handleTransaction"
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
    </section>
    <CoreFullScreenLoader
      :visible="fetching"
      text="Fetching Home Details"
      logo=""
    />
  </main>
</template>

<script setup lang="ts">
import moment from "moment";
import { useFetchMaintenanceRequests } from "@/composables/modules/maintenance/useFetchMaintenanceRequests";
const { maintenanceRequests, loading: fetchingRequests } =
  useFetchMaintenanceRequests();
import { useFetchMyHomeInfo } from "@/composables/modules/maintenance/useGetMyHome";
import { useCurrencyFormatter } from "@/composables/core/useCurrencyFormatter";
import { useGetTransactionHistory } from "@/composables/modules/payment/useFetchPaymenttHistory";
const { loading: fetching, myHomeInfo } = useFetchMyHomeInfo();
const { paymentList, loading } = useGetTransactionHistory();
import { useUser } from "@/composables/auth/user";
const { formatCurrency } = useCurrencyFormatter();
const { user } = useUser();
const router = useRouter();

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

const selectedStatus = ref<string>("All requests");

const handleClick = () => {
  if (!user.value.hasMoveInChecklist) {
    router.push({
      path: "/dashboard/home/move-in-checklist",
      query: { rentalId: myHomeInfo?.value?.id },
    });
  }
};

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

const handleTransaction = (transaction: any) => {
  router.push(`/dashboard/transaction/${transaction.id}/payment`);
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

onMounted(() => {
  if(!user?.value?.hasHome){
    router.push('/dashboard/home')
  }
})

// const handleMoveOut = () => {
//   router.push('/dashboard/home/move-out-check')
// }
</script>
