<template>
<main>
  <TopNavBar />
  <section class="space-y-6 max-w-3xl mx-auto mt-6">
    <div class="flex items-center space-x-4">
            <svg @click="router.back()" class="cursor-pointer"  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
              <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            <a href="#" class="text-gray-500 hover:text-gray-700 text-sm"
              >Dashboard</a
            >
            <span class="text-gray-400 text-sm">|</span>
            <h1 class="text-gray-800 font-semibold text-sm">
              Recent transactions
            </h1>
          </div>

    <div v-for="(group, date) in groupedTransactions" :key="date" class="space-y-4">
      <h2 class="bg-white py-3.5 rounded-lg px-6 border-[0.5px] border-gray-50 text-sm text-gray-600">{{ formatDate(date) }}</h2>
      
      <div class="bg-white rounded-lg divide-y">
        <div v-for="transaction in group" :key="transaction.id"
                class="flex justify-between items-center border-[0.5px] border-gray-50 bg-white p-4 rounded-lg mb-2">
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
        <!-- <div v-for="transaction in group" :key="transaction.id" 
             class="p-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17 10H3M3 10L8 15M3 10L8 5" stroke="currentColor" stroke-width="2"/>
              </svg>
            </div>
            <div>
              <p class="font-medium">{{ getTransactionTitle(transaction) }}</p>
              <p class="text-sm text-gray-500">
                {{ formatDateTime(transaction.transactionDate) }}
              </p>
            </div>
          </div>
          <p class="font-semibold" :class="transaction.transactionType === 'CREDIT' ? 'text-green-600' : 'text-red-600'">
            ₦{{ formatAmount(transaction.amountSubunit) }}
          </p>
        </div> -->
      </div>
    </div>
  </section>
 <!-- <section class="space-y-6">
    <div class="flex items-center border-b border-gray-50 pb-4">
        <button class="flex items-center gap-x-3 bg-gray-25 rounded-lg px-5 py-3.5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 5C12.5 5 7.50001 8.68242 7.5 10C7.49999 11.3177 12.5 15 12.5 15" stroke="#292929" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="font-semibold">Back</span>            
        </button>
        <p class="font-bold text-xl">Upcoming (Due) payments</p>
    </div>
    <div class="px-4 sm:px-6 lg:px-8 border border-gray-25 rounded-xl bg-white max-w-4xl mx-auto">
        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle">
                <table class="min-w-full divide-y divide-gray-50">
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">Tenant name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Property</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Payment frequency</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Payment count</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-medium text-gray-900">Expiry date</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50 bg-white">
                      <tr class="h-16" v-for="(item, idx) in expiringLeases" :key="idx">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6 lg:pl-8">{{ item.tenant_name ?? 'Nil'}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.property ?? 'Nil'}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.payment_frequency ?? 'Nil'}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ item.payment_count ?? 'Nil'}}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {{ item.expiry_date ?? 'Nil' }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
            </div>
          </div>
        </div>
      </div>
 </section> -->
</main>
</template>

<!-- <script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const expiringLeases = ref([
  {
    tenant_name: 'Gary Schimmel',
    property: 'Morar - Parisian',
    payment_frequency: 'Yearly',
    payment_count: '1/1',
    expiry_date: '22/03/2024'
  },
  {
    tenant_name: 'Gary Schimmel',
    property: 'Morar - Parisian',
    payment_frequency: 'Yearly',
    payment_count: '1/1',
    expiry_date: '22/03/2024'
  },
  {
    tenant_name: 'Gary Schimmel',
    property: 'Morar - Parisian',
    payment_frequency: 'Yearly',
    payment_count: '1/1',
    expiry_date: '22/03/2024'
  },
  {
    tenant_name: 'Gary Schimmel',
    property: 'Morar - Parisian',
    payment_frequency: 'Yearly',
    payment_count: '1/1',
    expiry_date: '22/03/2024'
  },
  {
    tenant_name: 'Gary Schimmel',
    property: 'Morar - Parisian',
    payment_frequency: 'Yearly',
    payment_count: '1/1',
    expiry_date: '22/03/2024'
  }
])

</script> -->


<script setup lang="ts">
import moment from "moment";
import { useCurrencyFormatter } from '@/composables/core/useCurrencyFormatter';
import { useGetTransactionHistory } from '@/composables/modules/payment/useFetchPaymenttHistory'
const { formatCurrency } = useCurrencyFormatter()
const { paymentList, loading } = useGetTransactionHistory()

interface Currency {
  code: string;
  name: string;
  conversionFactor: number;
}

interface Room {
  name: string;
  rentAmount: number;
  currency: Currency;
}

interface House {
  name: string;
}

interface RentPayment {
  rentFrequency: string;
  rentAmount: string;
  room: Room;
  house: House;
}

interface Transaction {
  id: string;
  amountSubunit: string;
  transactionDate: string;
  transactionType: string;
  narration: string;
  rentPayment: RentPayment | null;
}

definePageMeta({
  middleware: "auth",
});

// const transactions = ref<Transaction[]>([]);

// Group transactions by date
const groupedTransactions = computed(() => {
  return paymentList.value.reduce((groups, transaction) => {
    const date = transaction.transactionDate.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);
});

// Format date for display
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// Format date and time
const formatDateTime = (dateStr: string) => {
  return new Date(dateStr).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format amount from subunits
const formatAmount = (amountSubunit: string) => {
  const amount = parseInt(amountSubunit) / 100;
  return amount.toLocaleString('en-US');
};

definePageMeta({
  middleware: "auth",
});

// Get transaction title
const getTransactionTitle = (transaction: Transaction) => {
  if (transaction.rentPayment) {
    return `Rent Payment - ${transaction.rentPayment.house.name}`;
  }
  return transaction.narration || 'Transaction';
};

// Fetch transactions on mount
// onMounted(async () => {
//   try {
//     // Replace with actual API call
//     transactions.value = [
//       {
//         id: "2a72aa41-9696-4218-90e3-e35b2dc06218",
//         amountSubunit: "800000000",
//         transactionDate: "2024-11-15T20:13:16.665Z",
//         transactionType: "RENT",
//         narration: "rent payment",
//         rentPayment: {
//           rentFrequency: "annual",
//           rentAmount: "8000000",
//           room: {
//             name: "Room 3",
//             rentAmount: 80000,
//             currency: {
//               code: "NGN",
//               name: "Nigerian Naira",
//               conversionFactor: 100
//             }
//           },
//           house: {
//             name: "Marquis Abah Properties"
//           }
//         }
//       }
//     ];
//   } catch (error) {
//     console.error('Failed to fetch transactions:', error);
//   }
// });
</script>