<template>
     <TopNavBar />
         <div class="p-6 max-w-xl mx-auto">
          <div class="flex items-center mb-4">
            <div class="flex items-center gap-x-4">
            <CoreGoBack />
            <!-- Breadcrumbs -->
            <div class="text-sm text-gray-500 my-4">
                <span>Profile</span>
                <span class="mx-2">|</span>
                <span class="font-medium text-gray-700">Delete my account</span>
            </div>
            </div>
          </div>
          <h2 class="text-xl font-semibold text-[#1D2739] mb-1">Confirm your account deletion</h2>
          <p class="text-[#667185] font-light mb-4">Please enter your email address to confirm deleting your account.</p>
          <div class="mb-6 space-y-1">
            <label class="text-[#1D2739] text-sm">Email Address</label>
            <input
              v-model="userEmail"
              @input="handleEmailChange($event.target.value)"
              type="email"
              class="w-full p-3 py-4 outline-none bg-[#F0F2F5] text-sm border-[0.5px] rounded-lg"
              placeholder="Please enter your email address"
            />
          </div>
         <div class="pt-4">
            <button
            @click="initiateDeleteAccount"
            :disabled="!isEmailValid || loading"
            class="w-full py-3.5 disabled:opacity-25 disabled:cursor-not-allowed px-4 bg-[#292929] text-sm  text-white rounded-lg font-medium disabled:opacity-25"
          >
           {{  loading ? 'processing..' : 'Proceed' }}
          </button>
         </div>
        </div>
</template>

<script setup lang="ts">
const router = useRouter()
  import { useDeleteAccount } from '@/composables/auth/useDeleteAccount'
  const { currentStep, isLoading, loading, userEmail, initiateDeleteAccount, deleteReason, isEmailValid, handleEmailChange, submitDeletion } = useDeleteAccount()
</script>