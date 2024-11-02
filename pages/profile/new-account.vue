<template>
    <main>
      <TopNavBar />
      <div class="bg-gray-25 min-h-screen flex flex-col justify-between">
        <div class="max-w-2xl mx-auto w-full">
          <div class="max-w-3xl mx-auto p-6">
            <div class="text-gray-500 flex-col">
              <svg @click="router.back()" class="cursor-pointer" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#EAEAEA" />
                <path
                  d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
  
              <h2 class="text-lg font-semibold text-[#1D2739] mt-4">Link a bank account</h2>
            </div>
  
            <div class="mt-6 space-y-4">
                <div class="relative">
                <label class="text-[#1D2739] text-base">Bank Name</label>
                <!-- <select
                  v-if="!loading"
                  v-model="selectedBank"
                  @change="handleBankSelection"
                  :disabled="!isAccountNumberValid"
                  class="w-full p-2 mt-1 outline-none focus-within:border-2 pl-6 focus-within:border-[#5B8469] border-[0.5px] text-base rounded-md bg-[#E4E7EC] py-4"
                >
                  <option v-for="(bank, idx) in banksList" :key="idx" :value="bank">{{ bank.name }}</option>
                </select> -->
                <select
                  v-if="!loading"
                  v-model="selectedBank"
                  @change="handleBankSelection"
                  class="w-full p-2 mt-1 outline-none focus-within:border-2 pl-6 focus-within:border-[#5B8469] border-[0.5px] text-base rounded-md bg-[#E4E7EC] py-4"
                >
                  <option v-for="(bank, idx) in banksList" :key="idx" :value="bank">{{ bank.name }}</option>
                </select>
  
                <div v-else class="animate-pulse flex space-x-4">
                    <div class="rounded-md bg-slate-200 h-14 w-full"></div>
                </div>
  
              </div>

              <div class="relative">
                <label class="text-[#1D2739] text-base">Account Number</label>
                <input
                  v-model="payload.accountNumber"
                  type="text"
                  :disabled="!selectedBank?.name"
                  @blur="validateAccountNumber"
                  class="w-full p-2 mt-1 disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-within:border-2 pl-6 focus-within:border-[#5B8469] border-[0.5px] text-base rounded-md bg-[#E4E7EC] py-4"
                />
                <span v-if="accountNumberError" class="text-red-500 text-base">{{ accountNumberError }}</span>
              </div>
    
              <div v-if="payload.accountName && !resolvingBankInfo" class="relative">
                <label class="text-[#1D2739] text-base">Account Name</label>
                <div class="flex items-center space-x-2">
                  <input
                    readonly
                    disabled
                    type="text"
                    :value="payload.accountName"
                    class="w-full p-2 mt-1 disabled:cursor-not-allowed outline-none focus-within:border-2 pl-6 focus-within:border-[#5B8469] border-[0.5px] text-base rounded-md bg-[#E4E7EC] py-4"
                  />
                </div>
              </div>

              <div v-if="resolvingBankInfo">
                <div
                class="rounded-md h-16 bg-gray-100 animate-pulse p-4 w-full mx-auto mt-10"
                ></div>
              </div>
  
              <div class="mt-4 flex items-center justify-center space-x-2 text-gray-500 pt-5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.99815 1.33398C5.99297 1.33398 4.6928 2.67998 3.15516 3.17058C2.52994 3.37007 2.21733 3.46981 2.09082 3.61042C1.9643 3.75102 1.92726 3.95648 1.85316 4.3674C1.0603 8.76465 2.79328 12.83 6.92622 14.4123C7.37028 14.5823 7.59228 14.6673 8.00035 14.6673C8.40835 14.6673 8.63042 14.5823 9.07442 14.4123C13.2071 12.8299 14.9384 8.76465 14.1453 4.3674C14.0712 3.95641 14.0341 3.75092 13.9076 3.61031C13.7811 3.4697 13.4685 3.37002 12.8433 3.17064C11.305 2.68008 10.0034 1.33398 7.99815 1.33398Z"
                    stroke="#1D2739"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.89075 6.91992C6.17077 6.91992 5.81077 7.43992 5.73077 7.75992C5.65077 8.07992 5.65077 9.23992 5.69877 9.71992C5.85877 10.3199 6.25877 10.5679 6.65077 10.6479C7.01075 10.6799 8.53075 10.6679 8.97075 10.6679C9.61075 10.6799 10.0907 10.4399 10.2907 9.71992C10.3307 9.47992 10.3707 8.15992 10.2707 7.75992C10.0587 7.11992 9.53075 6.91992 9.13075 6.91992H6.89075Z"
                    stroke="#1D2739"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M6.83398 6.63838C6.83398 6.59838 6.83945 6.3681 6.84038 6.07838C6.84125 5.81365 6.81798 5.55838 6.94438 5.32478C7.41798 4.38238 8.77798 4.47838 9.11398 5.43838C9.17218 5.59643 9.17572 5.84699 9.17398 6.07838C9.17178 6.37404 9.17798 6.63838 9.17798 6.63838"
                    stroke="#1D2739"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
  
                <p class="text-[#667185]">Protected with advanced encryption</p>
              </div>
              <!-- <div class="flex justify-between p-4 pt-20 max-w-2xl mx-auto w-full">
              <button class="text-[#292929] border rounded-md px-4 py-3 hover:bg-gray-100">Cancel</button>
              <button :disabled="accountNumberError" @click="handleAddCard" class="text-white disabled:cursor-not-allowed disabled:opacity-25 font-medium rounded-md px-6 py-3 bg-[#292929]">{{ processing ? 'processing...' : 'Link Bank Account' }}</button>
            </div> -->

            <div class="sticky bottom-0 left-0 right-0 bg-white border-t">
        <div class="max-w-2xl mx-auto w-full px-4 py-4 flex justify-between">
          <button @click="router.back()" class="text-[#292929] border rounded-md px-4 py-3 hover:bg-gray-100">
            Cancel
          </button>
          <button 
            :disabled="accountNumberError || processing" 
            @click="handleAddCard" 
            class="text-white disabled:cursor-not-allowed disabled:opacity-25 font-medium rounded-md px-6 py-3 bg-[#292929]"
          >
            {{ processing ? 'processing...' : 'Link Bank Account' }}
          </button>
        </div>
      </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useResolveBank } from '@/composables/modules/banks/useResolveBanks'
  import { useAddBankAccount } from '@/composables/modules/banks/useAddAccount'
  import { useFetchNigerianBanks } from '@/composables/modules/banks/useFetchNigerianBanks'
  
  const { loading, banksList } = useFetchNigerianBanks()
  const { addBankAccount, loading: processing, setPayload, payload } = useAddBankAccount()
  const { resolveBank, resolvingBankInfo, bankObj } = useResolveBank()
  const router = useRouter()
  
  const accountNumberError = ref<string | null>(null)
  const isAccountNumberValid = ref(false)
  const selectedBank = ref(null)
  
  // Function to validate account number
  const validateAccountNumber = () => {
    const accountNumberRegex = /^[0-9]{10}$/ // Sample regex for a 10-digit account number
    isAccountNumberValid.value = accountNumberRegex.test(payload.value.accountNumber)
    accountNumberError.value = isAccountNumberValid.value ? null : 'Invalid account number'
  }
  
  // Watcher to check account number validity
  watch(() => payload.value.accountNumber, validateAccountNumber)
  
  
  // Function to handle bank selection and update payload with bank details
  const handleBankSelection = () => {
    console.log(selectedBank.value, 'here selected')
    if (selectedBank.value) {
      payload.value.bankSortCode = selectedBank.value.sortCode
      payload.value.bankName = selectedBank.value.name
    //   resolveAccount()
    }
  }

  watch(isAccountNumberValid, (val) => {
    console.log(val, 'here')
    if(val){
        resolveAccount()
    }
  })

  
  // Function to resolve account owner based on bank and account number
  const resolveAccount = async () => {
    if (isAccountNumberValid.value && payload.value.bankSortCode) {
      try {
        const accountOwner = await resolveBank(payload.value.accountNumber, payload.value.bankSortCode)
        payload.value.accountName = accountOwner.data.accountName // Assuming the response has 'accountName'
      } catch (error) {
        accountNumberError.value = 'Failed to resolve account. Please try again.'
      }
    }
  }
  
  const handleAddCard = () => {
    console.log('cloicled')
    addBankAccount()
  }
  
  definePageMeta({
    middleware: "auth",
  })
  </script>
  
  <style scoped>
  .loader {
    border: 2px solid #f3f3f3;
    border-top: 2px solid #5b8469;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 0.7s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  