<!-- <template>
<main>
  <TopNavBar />
 <section class="min-h-screen flex flex-col justify-between">
  <div class="p-8 bg-gray-25 min-h-screen">
    <div class="max-w-xl mx-auto">
      <div class="text-sm text-gray-500 mb-4">
        <span>Profile</span>
        <span class="mx-2">|</span>
        <span class="font-semibold text-gray-700">Login and security</span>
      </div>

      <h2 class="text-xl font-semibold text-gray-700 mb-6">Change password</h2>
      <form @submit.prevent="change_password" class="space-y-6">
        <div>
          <label class="block text-gray-600 mb-2">Current password</label>
          <div class="relative">
            <input v-model="credential.currentPassword.value"  :type="currentPassword ? 'text' : 'password'"  placeholder="Enter current password" class="mt-1 block w-full bg-[#E4E7EC] text-sm px-4 py-4 border-[0.5px] border-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
            <div @click="toggleCurrentPassword" class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer">
              <svg class="absolute -top-1 right-3"  v-if="!currentPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669" stroke="#1D2739" stroke-width="2" stroke-linecap="round"/>
                  <path d="M12.5 11.25L13.75 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.6665 9.16669L18.3332 10.8334" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.6665 10.8334L3.33317 9.16669" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.5 11.25L6.25 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
  
                  <svg  class="absolute -top-1 right-3" v-if="currentPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z" stroke="#1D2739" stroke-width="2"/>
                      <path d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z" stroke="#1D2739" stroke-width="1.5"/>
                      </svg>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-gray-600 mb-2">New password</label>
          <div class="relative">
            <input  v-model="credential.newPassword.value" :type="newPassword ? 'text' : 'password'" placeholder="Enter new password" class="mt-1 block w-full bg-[#E4E7EC] text-sm px-4 py-4 border-[0.5px] border-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            <div @click="toggleNewPassword" class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer">
              <svg  class="absolute -top-1 right-3" v-if="!newPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669" stroke="#1D2739" stroke-width="2" stroke-linecap="round"/>
                  <path d="M12.5 11.25L13.75 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.6665 9.16669L18.3332 10.8334" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.6665 10.8334L3.33317 9.16669" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.5 11.25L6.25 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
  
                  <svg  class="absolute -top-1 right-3" v-if="newPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z" stroke="#1D2739" stroke-width="2"/>
                      <path d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z" stroke="#1D2739" stroke-width="1.5"/>
                      </svg>
            </div>
          </div>
        </div>
        <div>
          <label class="block text-gray-600 mb-2">Confirm password</label>
          <div class="relative">
            <input  v-model="credential.confirmPassword.value" type="password" placeholder="Confirm password" class="mt-1 block w-full bg-[#E4E7EC] text-sm px-4 py-4 border-[0.5px] border-gray-100 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
            <div @click="toggleConfirmShowPassword" class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer">
              <svg class="absolute -top-1 right-3"  v-if="!showConfirmPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669" stroke="#1D2739" stroke-width="2" stroke-linecap="round"/>
                  <path d="M12.5 11.25L13.75 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.6665 9.16669L18.3332 10.8334" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1.6665 10.8334L3.33317 9.16669" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.5 11.25L6.25 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
  
                  <svg  class="absolute -top-1 right-3" v-if="showConfirmPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z" stroke="#1D2739" stroke-width="2"/>
                      <path d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z" stroke="#1D2739" stroke-width="1.5"/>
                      </svg>
            </div>
          </div>
        </div>
        <p
        v-if="passwordMismatch"
        class="text-red-500 text-xs mt-2"
      >
        Passwords do not match.
      </p>
      </form>
    </div>
  </div>
    <div>
    <div class="flex justify-between p-4 bg-white max-w-2xl mx-auto  w-full">
      <button @click="router.push('/profile/login-security')" class="text-[#292929] border text-sm rounded-md px-4 py-3 hover:bg-gray-100">Cancel</button>
      <button type="submit" :disabled="disabled || loading" @click="change_password" class="text-white disabled:opacity-25 text-sm disabled: cursor-not-allowed font-medium rounded-md px-6 py-3 bg-[#292929]">{{updating ? 'Processing..' : 'Update and Logout'}}</button>
    </div>
    </div>
 </section>
</main>
  </template>
  
  <script setup lang="ts">
  import { use_change_password } from '@/composables/auth/changePassword'
  const { change_password, credential, loading, disabled, passwordMismatch } = use_change_password()
  const router = useRouter()
  const currentPassword = ref(false);
const newPassword = ref(false);
const showConfirmPassword = ref(false);

const toggleNewPassword = () => {
  newPassword.value = !newPassword.value;
};

const toggleConfirmShowPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const toggleCurrentPassword = () => {
  currentPassword.value = !currentPassword.value;
};


// definePageMeta({
//   middleware: "auth",
// });
  </script> -->


  <template>
  <main>
    <TopNavBar />
    <main>
      <section class="min-h-screen flex flex-col justify-between">
       <div class="p-8 bg-gray-25 min-h-screen">
         <div class="max-w-xl mx-auto">
           <h2 class="text-xl font-semibold text-gray-700 mb-6">Change password</h2>
     
           <div class="space-y-6">
  
             <div>
               <label class="block text-gray-600 mb-2 text-sm">Current password</label>
               <div class="relative">
                 <input v-model="credential.currentPassword.value"  :type="currentPassword ? 'text' : 'password'"  placeholder="Enter current password"  :class="[errorMessage === 'New password cannot be the same as the current password.' ? 'border-[0.5px] border-red-500' : 'border-[0.5px] border-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500']" class="mt-1 block w-full outline-none bg-[#E4E7EC] text-sm px-4 py-4  rounded-md" />
                 <div @click="toggleCurrentPassword" class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer">
                   <svg class="absolute -top-1 right-3"  v-if="!currentPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669" stroke="#1D2739" stroke-width="2" stroke-linecap="round"/>
                       <path d="M12.5 11.25L13.75 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M16.6665 9.16669L18.3332 10.8334" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M1.6665 10.8334L3.33317 9.16669" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M7.5 11.25L6.25 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
       
                       <svg  class="absolute -top-1 right-3" v-if="currentPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z" stroke="#1D2739" stroke-width="2"/>
                           <path d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z" stroke="#1D2739" stroke-width="1.5"/>
                           </svg>
                 </div>
                 <p
                 v-if="errorMessage === 'New password cannot be the same as the current password.'"
                 class="text-red-500 text-xs font-medium mt-2"
               >
               {{ errorMessage }}
               </p> 
               </div>
             </div>
             <div>
               <label class="block text-gray-600 mb-2 text-sm">New password</label>
               <div class="relative">
                 <input  v-model="credential.newPassword.value" :type="newPassword ? 'text' : 'password'" placeholder="Enter new password"  :class="[errorMessage === 'New password and confirmation do not match.' ? 'border-[0.5px] border-red-500' : 'border-[0.5px] border-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500']" class="mt-1 block w-full outline-none bg-[#E4E7EC] text-sm px-4 py-4  rounded-md"  />
                 <div @click="toggleNewPassword" class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer">
                   <svg  class="absolute -top-1 right-3" v-if="!newPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669" stroke="#1D2739" stroke-width="2" stroke-linecap="round"/>
                       <path d="M12.5 11.25L13.75 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M16.6665 9.16669L18.3332 10.8334" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M1.6665 10.8334L3.33317 9.16669" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M7.5 11.25L6.25 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
       
                       <svg  class="absolute -top-1 right-3" v-if="newPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z" stroke="#1D2739" stroke-width="2"/>
                           <path d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z" stroke="#1D2739" stroke-width="1.5"/>
                           </svg>
                 </div>
               </div>
             </div>
             <div>
               <label class="block text-gray-600 mb-2 text-sm">Confirm password</label>
               <div class="relative">
                 <input  v-model="credential.confirmPassword.value" :type="showConfirmPassword ? 'text' : 'password'" placeholder="Confirm password" :class="[errorMessage === 'New password and confirmation do not match.' ? 'border-[0.5px] border-red-500' : 'border-[0.5px] border-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500']" class="mt-1 block w-full outline-none bg-[#E4E7EC] text-sm px-4 py-4  rounded-md" />
                 <div @click="toggleConfirmShowPassword" class="absolute inset-y-0 right-4 top-6 flex items-center cursor-pointer">
                   <svg class="absolute -top-1 right-3"  v-if="!showConfirmPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M18.3332 6.66669C18.3332 6.66669 14.9998 11.6667 9.99984 11.6667C4.99984 11.6667 1.6665 6.66669 1.6665 6.66669" stroke="#1D2739" stroke-width="2" stroke-linecap="round"/>
                       <path d="M12.5 11.25L13.75 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M16.6665 9.16669L18.3332 10.8334" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M1.6665 10.8334L3.33317 9.16669" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       <path d="M7.5 11.25L6.25 13.3333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
       
                       <svg  class="absolute -top-1 right-3" v-if="showConfirmPassword" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M17.9532 9.20419C18.2065 9.55944 18.3332 9.7371 18.3332 10C18.3332 10.2629 18.2065 10.4406 17.9532 10.7959C16.8148 12.3922 13.9075 15.8334 9.99984 15.8334C6.09215 15.8334 3.18492 12.3922 2.04654 10.7959C1.79318 10.4406 1.6665 10.2629 1.6665 10C1.6665 9.7371 1.79318 9.55944 2.04654 9.20419C3.18492 7.60789 6.09215 4.16669 9.99984 4.16669C13.9075 4.16669 16.8148 7.60789 17.9532 9.20419Z" stroke="#1D2739" stroke-width="2"/>
                           <path d="M12.5 10C12.5 8.61925 11.3807 7.5 10 7.5C8.61925 7.5 7.5 8.61925 7.5 10C7.5 11.3807 8.61925 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10Z" stroke="#1D2739" stroke-width="1.5"/>
                           </svg>
                 </div>
                 <p
                 v-if="errorMessage === 'New password and confirmation do not match.'"
                 class="text-red-500 text-xs font-medium mt-2"
               >
               {{ errorMessage }}
               </p>
               </div>
               <!-- <p
               v-if="errorMessage"
               class="text-red-500 text-xsm mt-2"
             >
             {{ errorMessage }}
             </p> -->
             </div>
           </div>
           <div class="w-full">
            <div
            class="flex justify-between p-4 mt-6 max-w-2xl mx-auto w-full"
          >
            <button
               @click="router.push('/dashboard/profile')"
              class="text-[#292929] border rounded-md px-4 py-2.5 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button @click="change_password" :disabled="disabled"  type="button" class="text-white disabled:cursor-not-allowed disabled:opacity-25 font-medium rounded-md px-6 py-2.5 bg-[#292929]">
              {{loading ? 'Processing...' : 'Save'}}
            </button>
          </div>
          </div>
         </div>
       </div>
       
      </section>
     </main>
  </main>
    </template>
    
    <script setup lang="ts">
    import Layout from '@/layouts/dashboard.vue';
    import { use_change_password } from '@/composables/auth/changePassword'
    const { change_password, credential, loading, disabled, passwordMismatch, errorMessage } = use_change_password()
    const currentPassword = ref(false);
  const newPassword = ref(false);
  const showConfirmPassword = ref(false);
  const router = useRouter()
  
  const toggleNewPassword = () => {
    newPassword.value = !newPassword.value;
  };
  
  const toggleConfirmShowPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value;
  };
  
  const toggleCurrentPassword = () => {
    currentPassword.value = !currentPassword.value
  };
  
  definePageMeta({
       middleware: 'auth'
  })
    </script>