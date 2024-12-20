<template>
  <TopNavBar />
  <section v-if="!loading && Object.keys(transactionObj)?.length" class="">
    <nav class="flex items-center space-x-2 mb-  my-4">
      <button
        @click="router.back()"
        class="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div class="flex items-center space-x-2 text-sm text-gray-600">
        <span>Dashboard</span>
        <span>|</span>
        <span>Recent transactions</span>
        <span>|</span>
        <span class="font-medium text-gray-900">Rent payment</span>
      </div>
    </nav>
    <div class="max-w-2xl mx-auto">
      <!-- Rent Details Section -->
      <section>
        <h2
          class="text-sm font-medium py-3 bg-white rounded-lg border-[0.5px] border-gray-100 px-3 mb-3"
        >
          Rent Details
        </h2>

        <div
          class="space-y-4 bg-white rounded-lg p-4 border-[0.5px] border-gray-100"
        >
          <!-- Property Details -->
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Property Name</p>
            <p class="text-sm text-[#1D2739]">
              {{ transactionObj?.rentPayment?.house?.name ?? "Nil" }}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Address</p>
            <p class="text-sm text-[#1D2739]">
              {{ transactionObj?.rentPayment?.house?.address ?? "Nil" }}
            </p>
          </div>

          <!-- Rent Information -->
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Rent Amount</p>
            <p class="text-sm text-[#1D2739]">
              {{ formatCurrency(transactionObj?.amount) ?? "0.00" }}
              <!-- {{ transactionObj?.amount ?? 'Nil' }} -->
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Rent tenure</p>
            <p class="text-sm text-[#1D2739]">
              {{ transactionObj?.rentPayment?.rentFrequency ?? "Nil" }}
            </p>
          </div>

          <!-- Dates -->
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Start Date</p>
            <p class="text-sm text-[#1D2739]">
              {{
                moment(transactionObj?.rentPayment?.paymentDate).format(
                  "MMMM Do YYYY, HH:MM A"
                ) ?? "Nil"
              }}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">End Date</p>
            <p class="text-sm text-[#1D2739]">
              {{
                moment(transactionObj?.rentPayment?.dueDate).format(
                  "MMMM Do YYYY, HH:MM A"
                ) ?? "Nil"
              }}
            </p>
          </div>
        </div>
      </section>

      <!-- Transaction Details Section -->
      <section>
        <h2
          class="text-sm font-medium py-3 bg-white rounded-lg border-[0.5px] border-gray-100 px-3 mt-8 mb-3"
        >
          Transaction Details
        </h2>

        <div
          class="space-y-4 bg-white rounded-lg p-4 border-[0.5px] border-gray-100"
        >
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Amount</p>
            <p class="text-sm text-[#1D2739]">
              {{ formatCurrency(transactionObj?.amount) ?? "0.00" }}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Ref Number</p>
            <p class="text-sm text-[#1D2739]">
              {{ transactionObj?.rentPayment?.trxReference }}
            </p>
          </div>

          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Payment method</p>
            <p class="text-sm text-[#1D2739]">
              {{ rentPaymentDetails.paymentMethod }}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Date</p>
            <p class="text-sm text-[#1D2739]">
              {{
                moment(transactionObj?.rentPayment?.paymentDate).format(
                  "MMMM Do YYYY"
                ) ?? "Nil"
              }}
            </p>
          </div>

          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Time</p>
            <p class="text-sm text-[#1D2739]">
              {{
                moment(transactionObj?.rentPayment?.paymentDate).format(
                  "HH:MM A"
                ) ?? "Nil"
              }}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Status</p>
            <p
              class="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full"
            >
              {{ rentPaymentDetails.status }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </section>
  <section class="max-w-2xl mx-auto" v-else-if="loading && !Object.keys(transactionObj)?.length">
      <div class="rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
        </div>
      </div>
    </section>
    <section v-else class="border-[0.5px] max-w-2xl mx-auto border-gray-100 flex justify-center items-center rounded-lg">
         No DATA AVAILABLE
    </section>
</template>

<script setup lang="ts">
import moment from "moment";
import { useCurrencyFormatter } from "@/composables/core/useCurrencyFormatter";
const { formatCurrency } = useCurrencyFormatter();
import { useFetchTransaction } from "@/composables/modules/transaction/useFetchTransaction";
const { loading, transactionObj } = useFetchTransaction();
</script>
