<template>
  <div class="py-4">
    <!-- Debug: {{ computedList }} -->
    <h2 class="text-lg text-[#1D2739] mb-4">
      {{ computedList?.Name ?? 'Electricity Bill' }}
    </h2>
    <p class="text-sm text-gray-600 mb-4">
      {{ computedList?.Description ?? 'Pay for your electricity bills here' }}
    </p>

    <div class="space-y-4">
      <!-- Step 1: Select Biller -->
      <div>
        <label class="block text-[#1D2739] text-sm mb-1">
          Electricity Distribution type (DisCos)
        </label>
        <select
          v-model="selectedBiller"
          @change="onBillerChange"
          :disabled="loadingPayItems"
          class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] outline-none border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">Select DisCo type</option>
          <option
            v-for="biller in computedList?.Billers"
            :key="biller.Id"
            :value="biller"
          >
            {{ biller.Name }}
          </option>
        </select>
      </div>

      <!-- Step 2: Select Payment Item (Package) -->
      <div v-if="selectedBiller && payItemsList?.length > 0">
        <label class="block text-[#1D2739] text-sm mb-1">
          Select Package/Service
        </label>
        <select
          v-model="selectedPaymentItem"
          class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] outline-none border-gray-100"
        >
          <option value="">Select a package</option>
          <option
            v-for="item in payItemsList"
            :key="item.Id"
            :value="item"
          >
            {{ item.Name }} 
            <span v-if="item.IsAmountFixed">
              - {{ item.CurrencySymbol }}{{ formatAmount(item.Amount) }}
            </span>
          </option>
        </select>
      </div>

      <!-- Loading indicator for payment items -->
      <div v-if="loadingPayItems" class="text-center py-4">
        <p class="text-sm text-gray-600">Loading available packages...</p>
      </div>

      <!-- Step 3: Enter Customer ID (Meter Number/Smart Card etc) -->
      <div v-if="selectedBiller && selectedPaymentItem">
        <label class="block text-[#1D2739] text-sm mb-1">
          {{ selectedPaymentItem.ConsumerIdField || selectedBiller.CustomerField1 || 'Customer ID' }}
        </label>
        <input
          v-model="customerId"
          type="text"
          :placeholder="`Enter your ${selectedPaymentItem.ConsumerIdField || selectedBiller.CustomerField1}`"
          class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] outline-none border-gray-100"
        />
      </div>

      <!-- Step 4: Phone Number (if required) -->
      <div v-if="selectedBiller && selectedBiller.CustomerField2 && selectedPaymentItem">
        <label class="block text-[#1D2739] text-sm mb-1">
          {{ selectedBiller.CustomerField2 }}
        </label>
        <input
          v-model="phoneNumber"
          type="tel"
          :placeholder="`Enter your ${selectedBiller.CustomerField2}`"
          class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] outline-none border-gray-100"
        />
      </div>

      <!-- Step 5: Amount (if not fixed) -->
      <div v-if="selectedPaymentItem && !selectedPaymentItem.IsAmountFixed">
        <label class="block text-[#1D2739] text-sm mb-1">
          Amount ({{ selectedPaymentItem.CurrencySymbol }})
        </label>
        <input
          v-model.number="amount"
          type="number"
          placeholder="Enter amount"
          min="0"
          class="w-full px-3 py-4 bg-[#F0F2F5] text-sm rounded border-[0.5px] outline-none border-gray-100"
        />
      </div>

      <!-- Payment Summary -->
      <div v-if="selectedPaymentItem && isFormValid" class="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 class="text-sm font-medium text-[#1D2739] mb-2">Payment Summary</h3>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Biller:</span>
            <span class="text-[#1D2739] font-medium">{{ selectedBiller.Name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Package:</span>
            <span class="text-[#1D2739] font-medium">{{ selectedPaymentItem.Name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">{{ selectedPaymentItem.ConsumerIdField }}:</span>
            <span class="text-[#1D2739] font-medium">{{ customerId }}</span>
          </div>
          <div class="flex justify-between border-t pt-2 mt-2">
            <span class="text-gray-600 font-medium">Amount:</span>
            <span class="text-[#1D2739] font-bold">
              {{ selectedPaymentItem.CurrencySymbol }}{{ formatAmount(paymentAmount) }}
            </span>
          </div>
        </div>
      </div>

      <HomeRecentPayments />

      <div class="flex justify-between pt-20">
        <button
          type="button"
          @click="router.back()"
          :disabled="loadingPayment"
          class="px-6 py-3 text-sm border border-gray-300 rounded-md text-[#292929] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          :disabled="!isFormValid || loadingPayment"
          @click="handleContinue"
          class="px-6 py-3 text-sm bg-[#292929] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loadingPayment ? 'Processing...' : 'Continue' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useFetchPayItemsByBillers } from "@/composables/modules/home/useGetPayItemForBillers";
import { useFetchBillersInfo } from "@/composables/modules/home/useGetBillersInfo";
import { useInitializeBillPayment } from "@/composables/modules/home/useInitializeBillPayment";

const router = useRouter();

// Composables with renamed loading states
const { 
  loading: loadingPayItems,
  payItemsList,
  fetcPayItemsByBillers 
} = useFetchPayItemsByBillers();

const { 
  loading: loadingBillerInfo,   
  billersListObj: billerInfoObj,
  fetchBillersInfo 
} = useFetchBillersInfo();

const { 
  loading: loadingPayment, 
  initializeBillPayment, 
  payload: paymentPayload 
} = useInitializeBillPayment();

const props = defineProps({
  billersList: {
    type: Object,
    default: () => ({}),
  },
  categoryId: {
    type: Number,
    default: null,
  },
});

// Form state
const selectedBiller = ref<any>(null);
const selectedPaymentItem = ref<any>(null);
const customerId = ref(''); // Meter number, smart card number, etc
const phoneNumber = ref('');
const amount = ref<number>(0);

// Get the specific category from BillerList.Category array
const computedList = computed(() => {
  const categories = props?.billersList?.BillerList?.Category;

  if (!Array.isArray(categories) || categories.length === 0) {
    return {};
  }

  // If categoryId is provided, find that specific category
  if (props.categoryId) {
    return categories.find((cat) => cat.Id === props.categoryId) || categories[0];
  }

  // Find electricity category
  const electricityCategory = categories.find(
    (cat) =>
      cat.Name?.toLowerCase().includes('electricity') ||
      cat.Name?.toLowerCase().includes('utility')
  );

  return electricityCategory || categories[0];
});

// Calculate payment amount (from fixed amount or user input)
const paymentAmount = computed(() => {
  if (!selectedPaymentItem.value) return 0;
  
  if (selectedPaymentItem.value.IsAmountFixed) {
    // Convert from kobo to naira (assuming Amount is in kobo)
    return parseFloat(selectedPaymentItem.value.Amount) / 100;
  }
  
  return amount.value || 0;
});

// Form validation
const isFormValid = computed(() => {
  const hasBiller = !!selectedBiller.value;
  const hasPaymentItem = !!selectedPaymentItem.value;
  const hasCustomerId = !!customerId.value?.trim();
  const hasPhoneIfRequired = selectedBiller.value?.CustomerField2 
    ? !!phoneNumber.value?.trim()
    : true;
  const hasValidAmount = selectedPaymentItem.value?.IsAmountFixed 
    ? true 
    : amount.value > 0;

  return hasBiller && hasPaymentItem && hasCustomerId && hasPhoneIfRequired && hasValidAmount;
});

// Watch for biller selection and fetch payment items
const onBillerChange = async () => {
  if (!selectedBiller.value) return;
  
  // Reset dependent fields
  selectedPaymentItem.value = null;
  customerId.value = '';
  phoneNumber.value = '';
  amount.value = 0;
  
  // Fetch payment items for the selected biller
  try {
    await fetcPayItemsByBillers(selectedBiller.value.Id);
  } catch (error) {
    console.error('Error fetching payment items:', error);
    // You might want to show an error message to the user
  }
};

// Reset amount when payment item changes
watch(selectedPaymentItem, (newItem) => {
  if (newItem && newItem.IsAmountFixed) {
    amount.value = parseFloat(newItem.Amount) / 100; // Convert from kobo to naira
  } else {
    amount.value = 0;
  }
});

// Handle continue/payment initialization
const handleContinue = async () => {
  if (!isFormValid.value) return;

  try {
    // Prepare payment payload
    const paymentData = {
      customerId: customerId.value.trim(),
      billerId: selectedBiller.value.Id.toString(),
      rentalApplicationId: "", // You might need to get this from somewhere or generate it
      serviceId: selectedPaymentItem.value.PaydirectItemCode || selectedPaymentItem.value.Code,
      amount: Math.round(paymentAmount.value * 100), // Convert to kobo
    };

    console.log('Initializing payment with:', paymentData);

    // Initialize payment
    await initializeBillPayment(paymentData);

    // After successful initialization, you might want to:
    // 1. Navigate to payment confirmation page
    // 2. Show success message
    // 3. Clear form
    
    // Example: Navigate to next step
    // router.push({ 
    //   name: 'payment-confirmation', 
    //   query: { 
    //     billerId: selectedBiller.value.Id,
    //     amount: paymentAmount.value 
    //   } 
    // });

  } catch (error) {
    console.error('Payment initialization failed:', error);
    // Show error message to user
    alert('Payment initialization failed. Please try again.');
  }
};

// Utility function to format amount
const formatAmount = (amount: string | number): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  // If amount is in kobo, convert to naira
  const inNaira = numAmount > 10000 ? numAmount / 100 : numAmount;
  return inNaira.toLocaleString('en-NG', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
};
</script>

<style scoped>
/* Additional styles if needed */
</style>