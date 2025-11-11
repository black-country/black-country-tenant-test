<template>
  <div class="max-w-lg mx-auto p-3 lg:p-8 bg-white">
    <svg
      @click="router.back()"
      class="cursor-pointer"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="18" fill="#EAEAEA" />
      <path
        d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23"
        stroke="#1D2739"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <!-- Form Header -->
    <div class="text-center mb-6 flex justify-center items-center flex-col gap-y-3 pb-4">
       <img src="@/assets/icons/logo.svg" />
      <h2 class="text-2xl font-medium text-[#1D2739]">Create an account</h2>
    </div>

    <!-- Registration Form -->
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label for="full-name" class="block text-sm font-medium text-[#1D2739]">Full name</label>
        <input
          type="text"
          id="full-name"
          v-model="credential.fullName.value"
          placeholder="Enter your full name"
          class="mt-1 block w-full bg-[#E4E7EC] text-sm px-4 py-4 border-[0.5px] border-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div class="mb-4 relative">
        <label for="email" class="block text-sm font-medium text-[#1D2739]">Email address</label>
        <input
          type="email"
          id="email"
          v-model.trim="payload.email.value"
          placeholder="Enter your email address"
          class="mt-1 block w-full bg-[#E4E7EC] text-sm px-4 py-4 border-[0.5px] border-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div v-if="processing" class="absolute inset-y-0 right-4 top-6 flex items-center">
          <svg class="animate-spin h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
          </svg>
        </div>
        <p v-if="emailExists" class="text-red-500 text-xs mt-2">Email already exists.</p>
      </div>

      <!-- Password -->
      <div class="mb-1 relative">
        <label for="password" class="block text-sm font-medium text-[#1D2739]">
          Password (6+ characters minimum)
        </label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          minlength="6"
          v-model.trim="credential.password.value"
          placeholder="Enter your password"
          class="mt-1 block w-full bg-[#E4E7EC] text-sm px-4 py-4 border-[0.5px] border-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          aria-invalid="true"
          :aria-describedby="passwordTooShort ? 'password-help' : undefined"
        />
        <div
          @click="toggleShowPassword"
          class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer"
        >
          <!-- (eye icons unchanged) -->
          <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669" stroke="#1D2739" stroke-width="2" stroke-linecap="round"/>
            <path d="M12.5 11.25L13.75 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.6665 9.16669L18.3332 10.8334" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.6665 10.8334L3.33317 9.16669" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 11.25L6.25 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z" stroke="#1D2739" stroke-width="2"/>
            <path d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z" stroke="#1D2739" stroke-width="1.5"/>
          </svg>
        </div>
      </div>
      <!-- Password too short message -->
      <p
        v-if="hasTypedPassword && passwordTooShort"
        id="password-help"
        class="text-red-500 text-xs mt-2"
      >
        Password must be at least 6 characters long.
      </p>

      <!-- Confirm password -->
      <div class="mb-4 relative mt-2">
        <label for="confirm-password" class="block text-sm font-medium text-[#1D2739]">Confirm password</label>
        <input
          :type="showConfirmPassword ? 'text' : 'password'"
          id="confirm-password"
          minlength="6"
          v-model.trim="credential.confirmPassword.value"
          placeholder="Confirm your password"
          class="mt-1 block w-full bg-[#E4E7EC] text-sm px-4 py-4 border-[0.5px] border-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <div @click="toggleConfirmShowPassword" class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer">
          <!-- (eye icons unchanged) -->
          <svg v-if="!showConfirmPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669" stroke="#1D2739" stroke-width="2" stroke-linecap="round"/>
            <path d="M12.5 11.25L13.75 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.6665 9.16669L18.3332 10.8334" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M1.6665 10.8334L3.33317 9.16669" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7.5 11.25L6.25 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z" stroke="#1D2739" stroke-width="2"/>
            <path d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z" stroke="#1D2739" stroke-width="1.5"/>
          </svg>
        </div>
        <p v-if="passwordMismatch && hasTypedConfirmPassword" class="text-red-500 text-xs mt-2">
          Passwords do not match.
        </p>
      </div>

      <div class="mb-4 flex items-center">
        <input
          id="terms"
          type="checkbox"
          v-model="credential.agreement.value"
          class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label for="terms" class="ml-2 block text-sm text-gray-900">
          I have read and have agreed to BlackCountry's
          <NuxtLink to="/terms" class="text-[#326543]">Terms of Service</NuxtLink> and
          <NuxtLink to="/privacy" class="text-[#326543]">Privacy Policy</NuxtLink>
        </label>
      </div>

      <button
        type="submit"
        :disabled="isFormDisabled || processing || emailExists || passwordTooShort"
        class="w-full py-3 disabled:cursor-not-allowed disabled:opacity-25 px-4 bg-[#292929] mt-6 text-white rounded-md shadow-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        {{ loading ? "Processing..." : "Continue" }}
      </button>
    </form>

    <p class="mt-6 text-center text-gray-600">
      Have an account?
      <NuxtLink to="/tenant/login" class="text-[#326543] font-semibold">Login</NuxtLink>
    </p>
  </div>

  <CoreFullScreenLoader :visible="loading" text="Authenticating" logo="" />
</template>

<script setup lang="ts">
import { use_auth_register } from "@/composables/auth/register";
import { use_tenant_exist } from "@/composables/auth/tenantExist";

const { credential, register, loading, isFormDisabled, passwordMismatch, populateObj } = use_auth_register();
const { credential: payload, handle_tenant_exist, loading: processing } = use_tenant_exist();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const emailExists = ref(false);
const hasTypedConfirmPassword = ref(false);

// NEW: track password typing + short length
const hasTypedPassword = ref(false);
const passwordTooShort = ref(false);

const toggleShowPassword = () => { showPassword.value = !showPassword.value; };
const router = useRouter();
const toggleConfirmShowPassword = () => { showConfirmPassword.value = !showConfirmPassword.value; };

// Watch email to check existence
watch(
  () => payload.email.value,
  async (newEmail) => {
    if (newEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      processing.value = true;
      const response = await handle_tenant_exist(newEmail);
      emailExists.value = !!response?.exists;
      processing.value = false;
    } else {
      emailExists.value = false;
    }
  }
);

// Watch confirm password to decide when to show mismatch
watch(
  () => credential.confirmPassword.value,
  () => { hasTypedConfirmPassword.value = true; }
);

// NEW: Watch password for live 6+ rule
watch(
  () => credential.password.value,
  (val = "") => {
    hasTypedPassword.value = true;
    const len = typeof val === "string" ? val.length : 0;
    passwordTooShort.value = len > 0 && len < 6;
  }
);

// Submit
const handleRegister = () => {
  const { ...data } = payload;
  const payloadObj = {
    fullName: credential.fullName.value,
    email: data.email.value,
    password: credential.password.value,
    confirmPassword: credential.confirmPassword.value,
    agreement: credential.agreement.value,
  };
  populateObj(payloadObj);
  register();
};
</script>
