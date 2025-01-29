<!-- components/RentalApplication.vue -->
<template>
   <main>
    <!-- {{ !!rentalObj?.rentalLeaseAgreement }} -->
     <!-- <div v-if="!loading && Object.keys(propertyObj?.rentalApplication).length" class="max-w-3xl mx-auto p-4"> -->
      <div v-if="!loading && propertyObj?.rentalApplication && Object.keys(propertyObj.rentalApplication).length" class="max-w-3xl mx-auto p-4">
      <!-- Navigation -->
      <div class="flex items-center gap-2 mb-8 text-gray-600">
        <button @click="router.back()" class="">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
                <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

        </button>
        <div class="flex gap-2">
          <span class="text-[#667185]">Dashboard</span>
          <span>|</span>
          <span class="text-[#667185]">Rental applications</span>
          <span>|</span>
          <span class="font-medium text-[#1D2739]">Room applied to</span>
        </div>
      </div>
  
      <!-- Progress Steps -->
      <ProgressSteps :rentalObj="rentalObj"  />
  
      <!-- Property Details -->
      <div class="mb-6 mt-16 ">
        <div v-if="rentalObj?.house?.images" class="flex items-center gap-4">
          <div class="border-[0.5px] border-gray-100 rounded-lg rounded-xl">
            <img :src="rentalObj?.house?.images[0]" alt="Room preview" class="w-20 border-[0.5px] border-gray-100 rounded-lg rounded-xl h-20 object-cover" />
          </div>
          <div>
            <h2 class="text-lg font-semibold">{{ rentalObj?.house?.name }}: {{ rentalObj?.room?.name }}</h2>
            <NuxtLink :to="`/dashboard/listings/${propertyObj?.id}/preview`" class="text-[#2E5C3D] font-medium underline text-sm">View property details</NuxtLink>
          </div>
        </div>
      </div>
  
      <!-- Note -->
      <div class="bg-[#E8EDFB] p-4 rounded-lg mb-6">
        <div class="flex gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.609 18.334H6.38398C3.55898 18.334 1.66732 16.3507 1.66732 13.4007V6.59149C1.66732 3.64982 3.55898 1.66732 6.38398 1.66732H13.609C16.434 1.66732 18.334 3.64982 18.334 6.59149V13.4007C18.334 16.3507 16.434 18.334 13.609 18.334ZM10.009 12.4498C10.4007 12.4498 10.7257 12.7757 10.7257 13.1748C10.7257 13.5832 10.4007 13.9082 9.99235 13.9082C9.59235 13.9082 9.26735 13.5832 9.26735 13.1748C9.26735 12.7757 9.59235 12.4498 10.009 12.4498ZM9.27562 6.84982C9.27562 6.44982 9.60062 6.12482 10.009 6.12482C10.409 6.12482 10.734 6.44982 10.734 6.84982V10.5331C10.734 10.934 10.409 11.2665 10.009 11.2665C9.60062 11.2665 9.27562 10.934 9.27562 10.5331V6.84982Z" fill="#4A71E0"/>
            </svg>

          <span class="font-medium">Note</span>
        </div>
        <p class="mt-1 text-sm text-gray-600">
          {{ rentalObj?.note ?? 'Nil' }}
        </p>
      </div>
  
      <!-- Availability and Price -->
      <div class="flex border-[0.5px] py-4 px-3 rounded-lg border-gray-100 justify-between items-center mb-6">
        <div>
          <span class="text-gray-900 font-medium text-sm">Available Now</span>
        </div>
        <div>
          <span class="text-gray-900 font-medium">{{ formatCurrency(rentalObj?.room?.rentAmount) ?? '0.00' }}</span>
          <span class="text-gray-600 ml-2">{{rentalObj?.room?.rentFrequency ?? 'Nil'}}</span>
        </div>
      </div>
  
      <!-- Room Type -->
      <div class="mb-6 border-[0.5px] py-4 px-3 rounded-lg border-gray-100 flex justify-between items-center">
        <span class="text-gray-600 text-sm">Room Type</span>
        <div v-if="rentalObj?.room?.isMaster" class="inline-flex items-center gap-2 px-3 py-3 bg-[#FEF6E7] text-xs text-[#DD900D] rounded-full mt-2">
          <span>Master Bedroom</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.34546 6.8707C2.08675 6.15467 1.9574 5.79667 2.01256 5.56726C2.07288 5.31634 2.25133 5.12072 2.47942 5.05547C2.68795 4.9958 3.01235 5.13998 3.66115 5.42834C4.23502 5.6834 4.52195 5.81093 4.79154 5.80384C5.08838 5.79602 5.37392 5.67699 5.60106 5.46637C5.80736 5.27508 5.94574 4.97025 6.22248 4.36059L6.8324 3.017C7.34186 1.89466 7.5966 1.3335 8 1.3335C8.4034 1.3335 8.65813 1.89466 9.1676 3.017L9.77753 4.36059C10.0543 4.97025 10.1927 5.27508 10.3989 5.46637C10.6261 5.67699 10.9116 5.79602 11.2085 5.80384C11.4781 5.81093 11.765 5.6834 12.3389 5.42834C12.9877 5.13998 13.3121 4.9958 13.5206 5.05547C13.7487 5.12072 13.9271 5.31634 13.9875 5.56726C14.0426 5.79667 13.9133 6.15467 13.6545 6.87063L12.5425 9.9483C12.0668 11.2648 11.829 11.9231 11.3312 12.295C10.8335 12.6668 10.1903 12.6668 8.90386 12.6668H7.09613C5.80972 12.6668 5.16651 12.6668 4.66876 12.295C4.17102 11.9231 3.93318 11.2648 3.45748 9.9483L2.34546 6.8707Z" fill="#F3A218" stroke="#F3A218" stroke-width="1.5"/>
          <path d="M4.66602 14.6665H11.3327H4.66602Z" fill="#F3A218"/>
          <path d="M4.66602 14.6665H11.3327" stroke="#F3A218" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M8 9.3335H8.006" stroke="#FEF6E7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </div>
      </div>
  
      <!-- Gallery -->
      <div class="mb-6 border-[0.5px] py-4 px-3 rounded-lg border-gray-100">
        <button class="w-full flex items-center justify-between">
          <div class="flex items-center gap-4">
            <img src="@/assets/img/gallery3.png" alt="Gallery preview" class="w-12 h-12 rounded-lg object-cover" />
            <div class="flex justify-start items-start flex-col">
              <h3 class="font-medium">Gallery</h3>
              <NuxtLink :to="`/dashboard/listings/${rentalObj?.house?.id}/room-interior-images`" class="text-sm text-[#2E5C3D] underlined">Click to view photos of all common areas</NuxtLink>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
  
      <!-- Interior Features -->
      <div class="">
          <h5 class="font-medium mb-4 px-3 border-[0.5px] border-gray-50 py-4 rounded-lg">Interior Features</h5>
          
          <div class="mb-4 border-[0.5px] border-gray-50 py-4 rounded-lg px-3">
            <span class="text-gray-600 text-sm">Furnished:</span>
            <span class="ml-2">{{ rentalObj?.room?.isFurnished ? 'Yes' : 'No' }}</span>
          </div>

      <div class="border-[0.5px] rounded-lg border-gray-50 p-3 bg-white">
        <h4 class="text-gray-600 mb-3 text-sm">Amenities</h4>

<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
  <div 
    v-for="(amenity, idx) in displayedCommonAreas" 
    :key="idx" 
    class="flex items-center gap-2 p-3.5 text-sm border-gray-100 border-[0.5px] rounded-lg">
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.8">
      <g clip-path="url(#clip0_11791_102864)">
      <rect width="20" height="20" rx="4" fill="#292929"/>
      <path d="M0.192595 14.7782C0.192595 14.1829 1.45745 13.9055 2.31235 13.9055C2.55481 13.9055 2.9619 13.9543 2.9619 14.2805C2.9619 14.9187 1.6461 15.2669 0.970074 15.2669C0.611338 15.2669 0.192595 15.1388 0.192595 14.7782ZM3.39144 14.2805C3.39144 13.8915 3.10795 13.476 2.31235 13.476C1.43054 13.476 -0.237077 13.7482 -0.237077 14.7782C-0.237077 15.3275 0.248142 15.6964 0.970074 15.6964C1.81432 15.6964 3.39144 15.2812 3.39144 14.2805ZM-2.55469 18.6281C-1.45546 19.0225 0.21159 19.4316 2.39825 19.4316C5.84286 19.4316 10.4224 19.0265 10.4224 15.5243C10.4224 14.1852 9.58204 13.5934 8.90673 13.1178C8.31286 12.6995 7.94693 12.4144 7.90937 11.8469C7.88462 11.4728 8.06075 11.1335 8.26494 10.7408C8.49388 10.3003 8.75333 9.80112 8.75333 9.16984C8.75333 8.31307 8.11788 7.39084 6.7228 7.39084C5.61436 7.39084 4.59183 7.82425 3.50943 8.28329C2.11737 8.87355 0.53925 9.54268 -1.69072 9.54268C-1.99881 9.54268 -2.28589 9.52167 -2.55469 9.48425V7.1242C-2.044 7.18765 -1.52989 7.21952 -1.01528 7.2196C1.65272 7.2196 3.5231 6.31996 5.17331 5.52622C6.5789 4.85005 7.9065 4.21157 9.52923 4.21157C11.7723 4.21157 12.9458 5.48233 12.9458 6.73755C12.9458 7.58078 12.5083 8.09435 12.0453 8.63785C11.5681 9.1979 11.0747 9.77709 11.0747 10.7164C11.0747 11.618 11.4288 12.1025 11.7713 12.571C12.171 13.1178 12.5844 13.6835 12.5844 15.0269C12.5844 17.5906 10.1575 19.1775 7.79239 20.1152H-2.55469V18.6281ZM-2.55469 16.5168C-1.49543 16.8984 -0.378129 17.0937 0.747755 17.0943C2.69641 17.0943 5.96547 16.6643 5.96547 13.7851C5.96547 12.9381 5.28527 11.745 3.77291 11.745C2.75483 11.745 1.95261 12.0127 1.17686 12.2715C0.387723 12.5347 -0.357519 12.7834 -1.33501 12.7834C-1.76196 12.7834 -2.17106 12.7099 -2.55469 12.5929V10.4374C-2.26794 10.4711 -1.97945 10.4879 -1.69072 10.4876C0.731497 10.4876 2.47625 9.74787 3.87824 9.15343C4.91286 8.71469 5.80632 8.33581 6.7228 8.33581C7.52301 8.33581 7.80821 8.76664 7.80821 9.16984C7.80821 9.57016 7.62273 9.92703 7.42631 10.305C7.19089 10.758 6.92411 11.2715 6.96627 11.9095C7.03577 12.9559 7.74058 13.4524 8.36236 13.8904C8.98529 14.3291 9.47727 14.6755 9.47727 15.5243C9.47727 16.796 8.7434 18.4865 2.39825 18.4865C0.11633 18.4865 -1.56453 18.0051 -2.55469 17.6133V16.5168ZM-2.55469 13.0441C-2.16861 13.15 -1.76052 13.2131 -1.33501 13.2131C-0.287729 13.2131 0.52601 12.9415 1.31284 12.6791C2.09032 12.4196 2.82448 12.1747 3.77291 12.1747C5.10496 12.1747 5.53594 13.2597 5.53594 13.7851C5.53594 15.669 3.88025 16.6647 0.747755 16.6647C-0.594374 16.6647 -1.73174 16.3657 -2.55469 16.0533V13.0441ZM-2.55469 4.83853C-2.16734 4.92467 -1.77182 4.96867 -1.37502 4.96977C1.13498 4.96977 3.0645 3.91846 5.10727 2.80555C7.1673 1.68316 9.29755 0.522625 12.1069 0.522625C13.4075 0.522625 14.5158 0.898771 15.3116 1.61049C16.0843 2.30148 16.4928 3.24314 16.4928 4.3336C16.4928 5.47772 15.7903 6.50731 15.0467 7.59719C14.2386 8.78189 13.4026 10.0067 13.4026 11.4928C13.4026 14.641 15.9538 16.4834 20.4194 16.5836V17.7153C20.4002 17.7169 20.3813 17.7211 20.3632 17.7278C17.1244 18.9779 15.0311 16.7472 14.9373 16.6427C14.9171 16.6145 14.8903 16.5916 14.8593 16.5759C14.8283 16.5603 14.7939 16.5525 14.7592 16.553C14.7244 16.5536 14.6904 16.5626 14.6599 16.5792C14.6294 16.5958 14.6033 16.6196 14.584 16.6485C14.5594 16.686 14.5475 16.7305 14.5499 16.7754H14.5484C14.5484 16.7813 14.5327 17.3908 13.9984 18.289C13.7058 18.781 13.2131 19.425 12.3941 20.1152H8.89233C9.38777 19.881 9.91904 19.5935 10.4264 19.2475C12.1434 18.0765 13.014 16.6565 13.014 15.0269C13.014 13.5432 12.538 12.892 12.1181 12.3174C11.7887 11.8669 11.5042 11.4777 11.5042 10.7164C11.5042 9.93523 11.9258 9.44036 12.3722 8.91644C12.8653 8.33768 13.3753 7.73907 13.3753 6.73755C13.3753 5.26879 12.0542 3.78189 9.52923 3.78189C7.8085 3.78189 6.43803 4.44109 4.98711 5.13899C3.29963 5.95071 1.55473 6.78992 -1.01528 6.78992C-1.59835 6.78992 -2.12256 6.74603 -2.55469 6.68991V4.83853ZM-2.55469 0.82826C-2.06112 1.16743 -1.3294 1.45652 -0.265138 1.45652C2.12931 1.45652 3.91781 0.387938 5.81136 -0.743526C7.73569 -1.89326 9.7255 -3.08215 12.4503 -3.08215C14.9169 -3.08215 17.0486 -2.21373 18.786 -0.501205C19.6022 0.303324 20.1343 1.11534 20.4194 1.61279V4.19229C20.4146 4.20746 20.4106 4.22288 20.4074 4.23848C20.306 4.73119 19.524 5.3675 18.6962 6.04108C17.1212 7.32263 15.1611 8.91744 15.1701 11.4073C15.1739 12.4546 15.6169 13.3998 16.3856 14.0008C17.1027 14.5611 17.9871 14.7486 18.8493 14.7486C19.3981 14.7484 19.9375 14.6722 20.4194 14.5683V16.1542C16.2268 16.0569 13.8323 14.3704 13.8323 11.4928C13.8323 10.1394 14.6301 8.97011 15.4015 7.83937C16.1492 6.74344 16.9224 5.61025 16.9224 4.3336C16.9224 1.83684 14.9421 0.092947 12.1069 0.092947C9.18805 0.092947 7.00915 1.2801 4.90178 2.4284C2.90837 3.51439 1.02547 4.54009 -1.37502 4.54009C-1.7939 4.54009 -2.19034 4.48397 -2.55469 4.39734V0.82826ZM20.4194 7.54783C20.1422 7.77648 19.8754 7.98283 19.6174 8.18227C18.5018 9.04422 17.6207 9.72514 17.6207 10.9897C17.6207 11.5706 17.8423 12.0204 18.2612 12.2904C18.5982 12.5075 19.0237 12.589 19.4537 12.589C19.7861 12.589 20.1206 12.5401 20.4194 12.4677V13.5989C18.9136 13.9622 17.7201 13.8443 16.9677 13.2561C16.4287 12.8348 16.1178 12.1596 16.1153 11.4038C16.1078 9.36554 17.7997 7.98873 19.2926 6.77409C19.7045 6.43896 20.0923 6.12267 20.4194 5.80926V7.54783ZM20.4194 12.0235C19.7983 12.1897 18.9837 12.2446 18.4939 11.9294C18.1954 11.737 18.0504 11.4296 18.0504 10.9897C18.0504 9.93609 18.8178 9.34295 19.88 8.52216C20.0609 8.38299 20.2407 8.2424 20.4194 8.1004V12.0235ZM20.4194 20.1152H13.0474C14.3478 18.9039 14.7728 17.806 14.9104 17.2087C15.1917 17.4523 15.6607 17.8002 16.3036 18.0824C17.2116 18.4808 18.6568 18.8128 20.4194 18.1651V20.1152Z" fill="white" fill-opacity="0.9"/>
      </g>
      </g>
      <defs>
      <clipPath id="clip0_11791_102864">
      <rect width="20" height="20" rx="4" fill="white"/>
      </clipPath>
      </defs>
      </svg>
    <span>{{ amenity?.name }}</span>
  </div>
</div>
      </div>

          <div v-if="rentalObj?.room?.features?.length > 6" class="mt-4">
            <button @click="toggleView" class="text-[#2E5C3D] hover:text-blue-700 transition">
              {{ showMore ? 'View less' : 'View more' }}
            </button>
          </div>
        </div>
        {{ currentStage }}
        <div class="flex mt-8 p-0 m-0 w-full">
    <!-- Cancel Application Button -->
    <button
      :disabled="!isCancelApplicationEnabled"
      @click="showCancelModal = true"
      class="flex-1 flex disabled:cursor-not-allowed disabled:opacity-25 justify-center items-center flex-col gap-y-3 text-sm py-3 px-4 text-[#1D2739] rounded-lg"
    >
      <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.333984" width="40" height="40" rx="8" fill="#FBEAE9" />
        <path
          d="M24.9993 15.3335L15.666 24.6668M15.666 15.3335L24.9993 24.6668"
          stroke="#BA110B"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      Cancel application
    </button>

    <!-- Sign Agreement Button -->
     <!-- {{ rentalObj }} -->
    <button
      :disabled="!isSignAgreementEnabled"
      @click="router.push(`/dashboard/listings/${route?.params?.id}/rental-applications/lease-agreement?rentalId=${route?.query?.rentalId}`)"
      class="flex-1 flex justify-center items-center text-sm flex-col gap-y-3 text-sm py-3 px-4 text-gray-400 rounded-lg disabled:opacity-25 disabled:cursor-not-allowed"
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="#292929" />
        <path
          d="M22.8101 15.3221L23.7445 14.3876C24.2607 13.8715 25.0975 13.8715 25.6136 14.3876C26.1297 14.9037 26.1297 15.7405 25.6136 16.2566L24.6791 17.1911M22.8101 15.3221L19.3208 18.8114C18.6239 19.5082 18.2755 19.8566 18.0382 20.2812C17.801 20.7058 17.5623 21.7084 17.334 22.6672C18.2927 22.4389 19.2953 22.2002 19.7199 21.9629C20.1445 21.7256 20.4929 21.3772 21.1898 20.6804L24.6791 17.1911M22.8101 15.3221L24.6791 17.1911"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M26 20.0005C26 22.8289 26 24.2432 25.1213 25.1218C24.2427 26.0005 22.8284 26.0005 20 26.0005C17.1716 26.0005 15.7574 26.0005 14.8787 25.1218C14 24.2432 14 22.8289 14 20.0005C14 17.1721 14 15.7578 14.8787 14.8792C15.7574 14.0005 17.1716 14.0005 20 14.0005"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      Sign agreement
    </button>

    <!-- Make Payment Button -->
    <button
      :disabled="!isMakePaymentEnabled"
      @click="proceed"
      class="flex-1 flex disabled:cursor-not-allowed disabled:opacity-25 justify-center items-center text-sm flex-col gap-y-3 text-sm py-3 px-4 text-gray-400 rounded-lg"
    >
      <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.666016" width="40" height="40" rx="8" fill="#292929" />
        <path
          d="M22.3324 20.0002C22.3324 20.9206 21.5862 21.6668 20.6657 21.6668C19.7452 21.6668 18.999 20.9206 18.999 20.0002C18.999 19.0797 19.7452 18.3335 20.6657 18.3335C21.5862 18.3335 22.3324 19.0797 22.3324 20.0002Z"
          stroke="white"
          stroke-width="1.5"
        />
        <path
          d="M25.3333 19.4281C25.1166 19.3967 24.894 19.3729 24.6667 19.3569M16.6667 20.644C16.4393 20.6281 16.2167 20.6042 16 20.5728"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M20.6657 25.0002C19.7774 25.4151 18.6104 25.6668 17.3324 25.6668C16.6217 25.6668 15.9455 25.589 15.3324 25.4486C14.3321 25.2194 13.999 24.6178 13.999 23.5908V16.4095C13.999 15.7529 14.6924 15.302 15.3324 15.4486C15.9455 15.589 16.6217 15.6668 17.3324 15.6668C18.6104 15.6668 19.7774 15.4151 20.6657 15.0002C21.554 14.5853 22.721 14.3335 23.999 14.3335C24.7096 14.3335 25.3859 14.4113 25.999 14.5518C27.0535 14.7933 27.3324 15.4137 27.3324 16.4095V23.5908C27.3324 24.2474 26.639 24.6984 25.999 24.5518C25.3859 24.4113 24.7096 24.3335 23.999 24.3335C22.721 24.3335 21.554 24.5852 20.6657 25.0002Z"
          stroke="white"
          stroke-width="1.5"
        />
      </svg>
      Make payment
    </button>

    <!-- Move In Button -->
    <button
      v-if="isMoveInEnabled"
      @click="moveIn"
      class="flex-1 flex justify-center items-center text-sm flex-col gap-y-3 text-sm py-3 px-4 text-green-600 rounded-lg"
    >
    <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.666016" width="40" height="40" rx="8" fill="#292929"/>
            <path d="M15.332 18.1359C15.332 16.7538 15.332 16.0627 15.5704 15.5015C15.7696 15.0327 16.0839 14.6303 16.48 14.3371C16.9541 13.986 17.5905 13.8624 18.8631 13.6152C20.1865 13.3581 20.8482 13.2295 21.3632 13.4344C21.791 13.6046 22.1514 13.926 22.3846 14.3452C22.6654 14.8499 22.6654 15.5685 22.6654 17.0057V22.9936C22.6654 24.4308 22.6654 25.1494 22.3846 25.6541C22.1514 26.0734 21.791 26.3948 21.3632 26.5649C20.8482 26.7698 20.1865 26.6413 18.8631 26.3841C17.5905 26.1369 16.9541 26.0133 16.48 25.6623C16.0839 25.3691 15.7696 24.9667 15.5704 24.4979C15.332 23.9366 15.332 23.2455 15.332 21.8635V18.1359Z" stroke="white" stroke-width="1.5"/>
            <path d="M22.667 25.1991C23.6319 25.2995 24.9336 25.6081 25.6253 24.726C26.0003 24.2478 26.0003 23.5194 26.0003 22.0626V17.9381C26.0003 16.4812 26.0003 15.7528 25.6253 15.2747C24.9336 14.3926 23.6319 14.7012 22.667 14.8015" stroke="white" stroke-width="1.5"/>
            <path d="M20.666 20.6663V19.333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25.333 25.1509H27.333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.999 25.333H15.999" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

      Move In
    </button>
       </div>
        <!-- <div class="flex mt-8 p-0 m-0 w-full">
            <button
              :disabled="currentStage !== 'Application Sent'"
              @click="showCancelModal = true"
              class="flex-1 flex disabled:cursor-not-allowed disabled:opacity-25 justify-center items-center flex-col gap-y-3 text-sm py-3 px-4 text-[#1D2739] rounded-lg"
            >
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.333984" width="40" height="40" rx="8" fill="#FBEAE9" />
                <path
                  d="M24.9993 15.3335L15.666 24.6668M15.666 15.3335L24.9993 24.6668"
                  stroke="#BA110B"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Cancel application
            </button>

            <button
              :disabled="currentStage !== 'Application Approved'"
              @click="router.push(`/dashboard/listings/${route?.params?.id}/rental-applications/lease-agreement`)"
              class="flex-1 flex justify-center items-center text-sm flex-col gap-y-3 text-sm py-3 px-4 text-gray-400 rounded-lg disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="40" height="40" rx="8" fill="#292929" />
                <path
                  d="M22.8101 15.3221L23.7445 14.3876C24.2607 13.8715 25.0975 13.8715 25.6136 14.3876C26.1297 14.9037 26.1297 15.7405 25.6136 16.2566L24.6791 17.1911M22.8101 15.3221L19.3208 18.8114C18.6239 19.5082 18.2755 19.8566 18.0382 20.2812C17.801 20.7058 17.5623 21.7084 17.334 22.6672C18.2927 22.4389 19.2953 22.2002 19.7199 21.9629C20.1445 21.7256 20.4929 21.3772 21.1898 20.6804L24.6791 17.1911M22.8101 15.3221L24.6791 17.1911"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M26 20.0005C26 22.8289 26 24.2432 25.1213 25.1218C24.2427 26.0005 22.8284 26.0005 20 26.0005C17.1716 26.0005 15.7574 26.0005 14.8787 25.1218C14 24.2432 14 22.8289 14 20.0005C14 17.1721 14 15.7578 14.8787 14.8792C15.7574 14.0005 17.1716 14.0005 20 14.0005"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              Sign agreement
            </button>

            <button
              :disabled="currentStage !== 'Application Signed'"
              @click="proceed"
              class="flex-1 flex disabled:cursor-not-allowed disabled:opacity-25 justify-center items-center text-sm flex-col gap-y-3 text-sm py-3 px-4 text-gray-400 rounded-lg"
            >
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.666016" width="40" height="40" rx="8" fill="#292929" />
                <path
                  d="M22.3324 20.0002C22.3324 20.9206 21.5862 21.6668 20.6657 21.6668C19.7452 21.6668 18.999 20.9206 18.999 20.0002C18.999 19.0797 19.7452 18.3335 20.6657 18.3335C21.5862 18.3335 22.3324 19.0797 22.3324 20.0002Z"
                  stroke="white"
                  stroke-width="1.5"
                />
                <path
                  d="M25.3333 19.4281C25.1166 19.3967 24.894 19.3729 24.6667 19.3569M16.6667 20.644C16.4393 20.6281 16.2167 20.6042 16 20.5728"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.6657 25.0002C19.7774 25.4151 18.6104 25.6668 17.3324 25.6668C16.6217 25.6668 15.9455 25.589 15.3324 25.4486C14.3321 25.2194 13.999 24.6178 13.999 23.5908V16.4095C13.999 15.7529 14.6924 15.302 15.3324 15.4486C15.9455 15.589 16.6217 15.6668 17.3324 15.6668C18.6104 15.6668 19.7774 15.4151 20.6657 15.0002C21.554 14.5853 22.721 14.3335 23.999 14.3335C24.7096 14.3335 25.3859 14.4113 25.999 14.5518C27.0535 14.7933 27.3324 15.4137 27.3324 16.4095V23.5908C27.3324 24.2474 26.639 24.6984 25.999 24.5518C25.3859 24.4113 24.7096 24.3335 23.999 24.3335C22.721 24.3335 21.554 24.5852 20.6657 25.0002Z"
                  stroke="white"
                  stroke-width="1.5"
                />
              </svg>
              Make payment
            </button>

            <button
              v-if="currentStage === 'Payment made'"
              @click="moveIn"
              class="flex-1 flex justify-center items-center text-sm flex-col gap-y-3 text-sm py-3 px-4 text-green-600 rounded-lg"
            >
            <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.666016" width="40" height="40" rx="8" fill="#292929"/>
            <path d="M15.332 18.1359C15.332 16.7538 15.332 16.0627 15.5704 15.5015C15.7696 15.0327 16.0839 14.6303 16.48 14.3371C16.9541 13.986 17.5905 13.8624 18.8631 13.6152C20.1865 13.3581 20.8482 13.2295 21.3632 13.4344C21.791 13.6046 22.1514 13.926 22.3846 14.3452C22.6654 14.8499 22.6654 15.5685 22.6654 17.0057V22.9936C22.6654 24.4308 22.6654 25.1494 22.3846 25.6541C22.1514 26.0734 21.791 26.3948 21.3632 26.5649C20.8482 26.7698 20.1865 26.6413 18.8631 26.3841C17.5905 26.1369 16.9541 26.0133 16.48 25.6623C16.0839 25.3691 15.7696 24.9667 15.5704 24.4979C15.332 23.9366 15.332 23.2455 15.332 21.8635V18.1359Z" stroke="white" stroke-width="1.5"/>
            <path d="M22.667 25.1991C23.6319 25.2995 24.9336 25.6081 25.6253 24.726C26.0003 24.2478 26.0003 23.5194 26.0003 22.0626V17.9381C26.0003 16.4812 26.0003 15.7528 25.6253 15.2747C24.9336 14.3926 23.6319 14.7012 22.667 14.8015" stroke="white" stroke-width="1.5"/>
            <path d="M20.666 20.6663V19.333" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M25.333 25.1509H27.333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.999 25.333H15.999" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

              Move In
            </button>
  </div> -->
        <!-- <button :disabled="isCancelApplicationDisabled"
        @click="showCancelModal = true" class="flex-1 flex disabled:cursor-not-allowed disabled:opacity-25 justify-center items-center flex-col gap-y-3 text-sm py-3 px-4  text-[#1D2739] rounded-lg">
          <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.333984" width="40" height="40" rx="8" fill="#FBEAE9"/>
<path d="M24.9993 15.3335L15.666 24.6668M15.666 15.3335L24.9993 24.6668" stroke="#BA110B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          Cancel application
        </button>
        <button
         :disabled="propertyObj?.rentalApplication?.progress === 'application-sent' || propertyObj?.rentalApplication?.status === 'PENDING' || !isSignBtnEnabled || propertyObj?.rentalApplication?.rentalLeaseAgreement.status === 'SIGNED'"
                  @click="router.push(`/dashboard/listings/${route?.params?.id}/rental-applications/lease-agreement`)"
         class="flex-1 flex justify-center items-center text-sm flex-col gap-y-3 text-sm py-3 px-4  text-gray-400 rounded-lg disabled:opacity-25 disabled:cursor-not-allowed">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="40" height="40" rx="8" fill="#292929"/>
<path d="M22.8101 15.3221L23.7445 14.3876C24.2607 13.8715 25.0975 13.8715 25.6136 14.3876C26.1297 14.9037 26.1297 15.7405 25.6136 16.2566L24.6791 17.1911M22.8101 15.3221L19.3208 18.8114C18.6239 19.5082 18.2755 19.8566 18.0382 20.2812C17.801 20.7058 17.5623 21.7084 17.334 22.6672C18.2927 22.4389 19.2953 22.2002 19.7199 21.9629C20.1445 21.7256 20.4929 21.3772 21.1898 20.6804L24.6791 17.1911M22.8101 15.3221L24.6791 17.1911" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26 20.0005C26 22.8289 26 24.2432 25.1213 25.1218C24.2427 26.0005 22.8284 26.0005 20 26.0005C17.1716 26.0005 15.7574 26.0005 14.8787 25.1218C14 24.2432 14 22.8289 14 20.0005C14 17.1721 14 15.7578 14.8787 14.8792C15.7574 14.0005 17.1716 14.0005 20 14.0005" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
</svg>

          Sign agreement
        </button>
        <button
         :disabled="propertyObj?.rentalApplication?.progress === 'agreement-pending-signage' || isMakePaymentDisabled"
                  @click="proceed"
         class="flex-1 flex disabled:cursor-not-allowed disabled:opacity-25 justify-center items-center text-sm flex-col gap-y-3 text-sm py-3 px-4  text-gray-400 rounded-lg cursor-not-allowed">
          <svg class="" width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.666016" width="40" height="40" rx="8" fill="#292929"/>
<path d="M22.3324 20.0002C22.3324 20.9206 21.5862 21.6668 20.6657 21.6668C19.7452 21.6668 18.999 20.9206 18.999 20.0002C18.999 19.0797 19.7452 18.3335 20.6657 18.3335C21.5862 18.3335 22.3324 19.0797 22.3324 20.0002Z" stroke="white" stroke-width="1.5"/>
<path d="M25.3333 19.4281C25.1166 19.3967 24.894 19.3729 24.6667 19.3569M16.6667 20.644C16.4393 20.6281 16.2167 20.6042 16 20.5728" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20.6657 25.0002C19.7774 25.4151 18.6104 25.6668 17.3324 25.6668C16.6217 25.6668 15.9455 25.589 15.3324 25.4486C14.3321 25.2194 13.999 24.6178 13.999 23.5908V16.4095C13.999 15.7529 14.6924 15.302 15.3324 15.4486C15.9455 15.589 16.6217 15.6668 17.3324 15.6668C18.6104 15.6668 19.7774 15.4151 20.6657 15.0002C21.554 14.5853 22.721 14.3335 23.999 14.3335C24.7096 14.3335 25.3859 14.4113 25.999 14.5518C27.0535 14.7933 27.3324 15.4137 27.3324 16.4095V23.5908C27.3324 24.2474 26.639 24.6984 25.999 24.5518C25.3859 24.4113 24.7096 24.3335 23.999 24.3335C22.721 24.3335 21.554 24.5852 20.6657 25.0002Z" stroke="white" stroke-width="1.5"/>
</svg>

          Make payment
        </button> -->
      </div>

     <div v-else class="flex justify-center border-gray-100 text-base space-y-6 m-6 font-medium border-[0.5px] py-4 rounded-lg items-center flex-col">
            <img class="" src="@/assets/icons/event-illustrations.svg" />
            No rental application available

            <div class="px-6 pt-6 w-full">
    <button 
    class="bg-[#292929] text-white w-full text-sm py-4 rounded-lg font-semibold" 
    @click="handleSuccess">
    Okay
  </button>
   </div>
      </div>


    <CoreModal :isOpen="showShareModal" @close="showShareModal = false">
      <div
        class="bg-white p-6 w-full m-14 lg:m-0 rounded-lg lg:w-3/12 relative space-y-10"
        @click.stop
      >
        <div class="space-y-7">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-lg pt-3 font-medium text-[#1D2739]">
                Share using
              </h2>
            </div>
            <div>
              <button class="" @click="showShareModal = false">
                <svga
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="36" height="36" rx="4" fill="#F9FAFB" />
                  <path
                    d="M23 13L13 23M13 13L23 23"
                    stroke="#344054"
                    stroke-width="1.67"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svga>
              </button>
            </div>

  
          </div>

          <div class="flex justify-between mb-6">
            <div class="flex flex-col items-center space-y-2">
              <svg
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30.125" cy="30" r="30" fill="#FEF7FF" />
                <rect
                  x="15.916"
                  y="15.085"
                  width="29.1667"
                  height="29.8295"
                  rx="8"
                  fill="url(#paint0_radial_6053_214487)"
                />
                <rect
                  x="15.916"
                  y="15.085"
                  width="29.1667"
                  height="29.8295"
                  rx="8"
                  fill="url(#paint1_radial_6053_214487)"
                />
                <rect
                  x="15.916"
                  y="15.085"
                  width="29.1667"
                  height="29.8295"
                  rx="8"
                  fill="url(#paint2_radial_6053_214487)"
                />
                <path
                  d="M37.7923 24.1407C37.7923 25.0233 37.0928 25.7387 36.2298 25.7387C35.3669 25.7387 34.6673 25.0233 34.6673 24.1407C34.6673 23.2582 35.3669 22.5427 36.2298 22.5427C37.0928 22.5427 37.7923 23.2582 37.7923 24.1407Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M30.5007 35.3268C33.3771 35.3268 35.709 32.9419 35.709 30.0001C35.709 27.0582 33.3771 24.6734 30.5007 24.6734C27.6242 24.6734 25.2923 27.0582 25.2923 30.0001C25.2923 32.9419 27.6242 35.3268 30.5007 35.3268ZM30.5007 33.1961C32.2265 33.1961 33.6257 31.7652 33.6257 30.0001C33.6257 28.235 32.2265 26.8041 30.5007 26.8041C28.7748 26.8041 27.3757 28.235 27.3757 30.0001C27.3757 31.7652 28.7748 33.1961 30.5007 33.1961Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20.084 29.574C20.084 25.9941 20.084 24.2041 20.7652 22.8368C21.3644 21.6341 22.3205 20.6562 23.4965 20.0434C24.8335 19.3467 26.5837 19.3467 30.084 19.3467H30.9173C34.4176 19.3467 36.1678 19.3467 37.5048 20.0434C38.6808 20.6562 39.6369 21.6341 40.2361 22.8368C40.9173 24.2041 40.9173 25.9941 40.9173 29.574V30.4262C40.9173 34.0061 40.9173 35.796 40.2361 37.1634C39.6369 38.3661 38.6808 39.344 37.5048 39.9568C36.1678 40.6535 34.4176 40.6535 30.9173 40.6535H30.084C26.5837 40.6535 24.8335 40.6535 23.4965 39.9568C22.3205 39.344 21.3644 38.3661 20.7652 37.1634C20.084 35.796 20.084 34.0061 20.084 30.4262V29.574ZM30.084 21.4774H30.9173C32.7019 21.4774 33.915 21.479 34.8527 21.5574C35.766 21.6337 36.2331 21.772 36.5589 21.9418C37.343 22.3504 37.9804 23.0023 38.3798 23.8041C38.5459 24.1373 38.6811 24.6151 38.7558 25.5492C38.8324 26.5082 38.834 27.7489 38.834 29.574V30.4262C38.834 32.2513 38.8324 33.492 38.7558 34.451C38.6811 35.3851 38.5459 35.8628 38.3798 36.1961C37.9804 36.9979 37.343 37.6498 36.5589 38.0584C36.2331 38.2282 35.766 38.3665 34.8527 38.4428C33.915 38.5212 32.7019 38.5228 30.9173 38.5228H30.084C28.2994 38.5228 27.0863 38.5212 26.1486 38.4428C25.2353 38.3665 24.7682 38.2282 24.4424 38.0584C23.6583 37.6498 23.0209 36.9979 22.6215 36.1961C22.4554 35.8628 22.3202 35.3851 22.2455 34.451C22.1689 33.492 22.1673 32.2513 22.1673 30.4262V29.574C22.1673 27.7489 22.1689 26.5082 22.2455 25.5492C22.3202 24.6151 22.4554 24.1373 22.6215 23.8041C23.0209 23.0023 23.6583 22.3504 24.4424 21.9418C24.7682 21.772 25.2353 21.6337 26.1486 21.5574C27.0863 21.479 28.2994 21.4774 30.084 21.4774Z"
                  fill="white"
                />
                <defs>
                  <radialGradient
                    id="paint0_radial_6053_214487"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(26.3327 37.4571) rotate(-55.9754) scale(26.9935 26.7735)"
                  >
                    <stop stop-color="#B13589" />
                    <stop offset="0.79309" stop-color="#C62F94" />
                    <stop offset="1" stop-color="#8A3AC8" />
                  </radialGradient>
                  <radialGradient
                    id="paint1_radial_6053_214487"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(25.291 45.9798) rotate(-65.6239) scale(23.9769 23.6276)"
                  >
                    <stop stop-color="#E0E8B7" />
                    <stop offset="0.444662" stop-color="#FB8A2E" />
                    <stop offset="0.71474" stop-color="#E2425C" />
                    <stop offset="1" stop-color="#E2425C" stop-opacity="0" />
                  </radialGradient>
                  <radialGradient
                    id="paint2_radial_6053_214487"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(14.3535 16.1503) rotate(-8.31232) scale(40.5299 8.85781)"
                  >
                    <stop offset="0.156701" stop-color="#406ADC" />
                    <stop offset="0.467799" stop-color="#6A45BE" />
                    <stop offset="1" stop-color="#6A45BE" stop-opacity="0" />
                  </radialGradient>
                </defs>
              </svg>

              <span class="text-sm text-[#1D2739]">Instagram</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <svg
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30.375" cy="30" r="30" fill="#F0F2F5" />
                <rect
                  x="15.1992"
                  y="15"
                  width="30"
                  height="30"
                  rx="8"
                  fill="black"
                />
                <path
                  d="M34.527 23H36.7714L31.8682 28.6041L37.6364 36.23H33.1199L29.5824 31.6049L25.5347 36.23H23.289L28.5335 30.2358L23 23H27.6312L30.8287 27.2275L34.527 23ZM33.7393 34.8866H34.983L26.9554 24.2728H25.6209L33.7393 34.8866Z"
                  fill="white"
                />
              </svg>

              <span class="text-sm text-[#1D2739]">Twitter</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <svg
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30.375" cy="30" r="30" fill="#F0F2F5" />
                <rect
                  x="15.1992"
                  y="15"
                  width="30"
                  height="30"
                  rx="8"
                  fill="black"
                />
                <path
                  d="M34.527 23H36.7714L31.8682 28.6041L37.6364 36.23H33.1199L29.5824 31.6049L25.5347 36.23H23.289L28.5335 30.2358L23 23H27.6312L30.8287 27.2275L34.527 23ZM33.7393 34.8866H34.983L26.9554 24.2728H25.6209L33.7393 34.8866Z"
                  fill="white"
                />
              </svg>

              <span class="text-sm text-[#1D2739]">WhatsApp</span>
            </div>
            <div class="flex flex-col items-center space-y-2">
              <svg
                width="61"
                height="60"
                viewBox="0 0 61 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="30.875" cy="30" r="30" fill="#E6F1FF" />
                <rect
                  x="15.5"
                  y="15"
                  width="30"
                  height="30"
                  rx="8"
                  fill="#1877F2"
                />
                <path
                  d="M36.3359 34.3359L37.0039 30H32.8438V27.1875C32.8438 26.0039 33.4238 24.8438 35.2871 24.8438H37.1797V21.1523C37.1797 21.1523 35.4629 20.8594 33.8223 20.8594C30.3945 20.8594 28.1562 22.9336 28.1562 26.6953V30H24.3477V34.3359H28.1562V45H32.8438V34.3359H36.3359Z"
                  fill="white"
                />
              </svg>

              <span class="text-sm text-[#1D2739]">Facebook</span>
            </div>
          </div>
        </div>

        <div class="pt-4">
          <h3 class="font-medium mb-2 text-[#1D2739]">Copy Link</h3>
          <div class="relative">
            <input
              type="text"
              class="border-[0.5px] rounded-lg w-full py-4 px-4 text-[#667185] bg-[#E4E7EC]"
              :value="shareLink"
              readonly
            />
            <button
              class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full"
              @click="copyLink"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1309 11.0152C11.2623 11.8838 9.85408 11.8838 8.98541 11.0152C8.11684 10.1466 8.11684 8.73833 8.98541 7.8697L10.9514 5.90375C11.7804 5.07467 13.1012 5.03694 13.975 5.79055M13.7037 3.15146C14.5723 2.28285 15.9806 2.28285 16.8492 3.15146C17.7178 4.02006 17.7178 5.42836 16.8492 6.29696L14.8832 8.26291C14.0542 9.092 12.7335 9.12975 11.8597 8.37608"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M17.5 10.8333C17.5 13.976 17.5 15.5474 16.5237 16.5237C15.5474 17.5 13.976 17.5 10.8333 17.5H9.16667C6.02397 17.5 4.45262 17.5 3.47631 16.5237C2.5 15.5474 2.5 13.976 2.5 10.8333V9.16667C2.5 6.02397 2.5 4.45262 3.47631 3.47631C4.45262 2.5 6.02397 2.5 9.16667 2.5"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </CoreModal>

    <CoreModal :isOpen="showPaymentModal" @close="showPaymentModal = false">
      <div
        class="bg-white rounded-lg max-w-lg w-full lg:w-1/2 mx-auto text-center"
      >
        <h2
          class="text-xl font-medium text-[#1D2739] text-start px-6 pt-6 mb-4"
        >
          Select Payment method
        </h2>
        <div class="space-y-4">
          <div
            v-for="(option, index) in paymentOptions"
            :key="index"
            class="flex px-6 justify-between border-b last:border-b-0 items-center p-3 cursor-pointer"
            @click="selectPaymentOption(option.value)"
          >
            <span class="text- text-[#1D2739]">{{ option.label }}</span>
            <input
              type="radio"
              :value="option.value"
              v-model="selectedOption"
              class="text-green-600 h-6 w-6"
            />
          </div>
        </div>
        <div class="flex justify-between mt-10 px-6 pb-6">
          <button
            @click="cancel"
            class="w-full mr-2 py-3.5 border border-gray-300 rounded-md text-[#292929] font-semibold text-sm hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            @click="proceed"
            :disabled="!selectedOption"
            class="w-full ml-2 py-3.5 bg-[#292929] text-white rounded-md text-sm hover:bg-gray-800"
          >
            Continue
          </button>
        </div>
      </div>
    </CoreModal>

    <CoreModalWithoutCloseBtn
      :isOpen="showCancelModal"
      @close="showCancelModal = false"
    >
      <div
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        @click.self="onCancel"
      >
        <div
          class="bg-white rounded-xl p-6 max-w-sm w-full text-center"
        >
          <div
            class="flex justify-center items-center bg-yellow-500 rounded-full w-16 h-16 mx-auto mb-4"
          >
            <svg
              width="65"
              height="64"
              viewBox="0 0 65 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.921875"
                width="63.1513"
                height="64"
                rx="31.5756"
                fill="#F3A218"
              />
              <path
                d="M42.2031 32.375C42.2031 26.8521 37.7259 22.375 32.2031 22.375C26.6803 22.375 22.2031 26.8521 22.2031 32.375C22.2031 37.8978 26.6803 42.375 32.2031 42.375C37.7259 42.375 42.2031 37.8978 42.2031 32.375Z"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M32.4453 37.375V32.375C32.4453 31.9036 32.4453 31.6679 32.2988 31.5214C32.1524 31.375 31.9167 31.375 31.4453 31.375"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M32.1953 28.377H32.2043"
                stroke="white"
                stroke-width="3.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <h2 class="text-lg font-semibold text-gray-700 mb-2">
            Cancel Rental Application
          </h2>
          <p class="text-gray-500 mb-6">
            Are you sure you want to cancel rental application process?
          </p>
          <div class="space-y-3">
            <button
              type="button"
              :disabled="cancelling"
              class="w-full disabled:cursor-not-allowed text-sm disabled:opacity-25 bg-[#292929] text-white py-3.5 rounded-md font-semibold"
              @click="onConfirm"
            >
              {{ cancelling ? "processing.." : "Yes, Proceed" }}
            </button>
            <button
              type="button"
              class="w-full bg-[#EBE5E0] text-gray-700 text-sm py-3.5 rounded-md font-semibold"
              @click="onCancel"
            >
              No, Continue
            </button>
          </div>
        </div>
      </div>
    </CoreModalWithoutCloseBtn>

    <CoreLoadingScreen :loading="initializing" />
    <CoreFullScreenLoader :visible="loading" text="Fetching rental details..." />
   </main>
  </template>
  
  <script setup lang="ts">
  import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
  import { useInitializeRentPayment } from "@/composables/modules/rentals/useInitializeRentPayment";
  import { useCurrencyFormatter} from "@/composables/core/useCurrencyFormatter";
  import { useCancelRental } from "@/composables/modules/rentals/cancelRentals";
    import { useFetchRental } from '@/composables/modules/rentals/fetchRentalsById'
  const { rentalObj, loading: fetching } = useFetchRental()
  const { propertyObj, loading } = useFetchProperty();
  const { formatCurrency } = useCurrencyFormatter()
  const { cancelRental, loading: cancelling } = useCancelRental();
  const route = useRoute()
  const router = useRouter()


  const {
  initializeRentPayment,
  loading: initializing,
  payload,
  responseObj,
  setPayloadObj 
} = useInitializeRentPayment();

  const showCancelModal = ref(false);
  const onCancel = () => {
  showCancelModal.value = false;
};

const onConfirm = async () => {
  await cancelRental(propertyObj.value.rentalApplication.id);
  showCancelModal.value = false;
};
const selectedOption = ref<string | null>(null);

const selectPaymentOption = (value: string) => {
  selectedOption.value = value;
};

// Determine button states
const isCancelEnabled = computed(
  () => propertyObj?.value?.rentalLeaseAgreement?.progress === "application-sent"
);

const handleSuccess = () => {
  router.push(`/dashboard/listings/${route?.params?.id}/preview`);
};




const isScheduleTourCancelApplicationDisabled = computed(
  () => propertyObj?.value?.rentalLeaseAgreement?.status === 'PENDING_SIGNAGE'
);

const isScheduleTourDisabled = computed(() => {
  return  propertyObj?.value?.rentalLeaseAgreement?.status === 'PENDING_SIGNAGE' ||  propertyObj?.value?.rentalLeaseAgreement?.progress === "agreement-signed" ||  propertyObj?.value?.rentalLeaseAgreement?.progress === "application-sent"
})

const isCancelApplicationDisabled = computed(() => {
  return  propertyObj?.value?.rentalLeaseAgreement?.status === 'PENDING_SIGNAGE' ||  propertyObj?.value?.rentalLeaseAgreement?.progress === "agreement-signed" ||  propertyObj?.value?.rentalLeaseAgreement?.progress === "application-sent" || propertyObj?.value?.rentalApplication?.status === "APPROVED"
})

const isMakePaymentDisabled = computed(() => {
  return  propertyObj?.value?.rentalLeaseAgreement?.status === 'PENDING_SIGNAGE' || propertyObj?.value?.rentalLeaseAgreement?.progress === "application-sent"
})

const isSignBtnEnabled = computed(() => {
  return propertyObj?.value?.rentalLeaseAgreement?.status === 'PENDING_SIGNAGE' ||  propertyObj?.value?.rentalLeaseAgreement?.progress !== "agreement-signed" ||  propertyObj?.value?.rentalLeaseAgreement?.progress === "application-sent"
})

const proceed = async () => {
  if(propertyObj?.value?.rentalApplication?.progress === 'agreement-pending-signage' || propertyObj?.value?.rentalApplication?.progress === 'application-sent') {
    return 
  } else {
    const payloadObj = {
      rentalApplicationId: rentalObj?.value?.id,
      rentAmount: rentalObj.value?.room?.rentAmount
    };
    
    setPayloadObj(payloadObj);
    await initializeRentPayment();
  }
};

// State to track whether the user wants to see more common areas
const showMore = ref(false);

// Computed property to conditionally display common areas
const displayedCommonAreas = computed(() => {
  return showMore.value ? rentalObj?.value?.room?.features : rentalObj?.value?.room?.features.slice(0, 6);
});

// Toggle "View more" / "View less"
const toggleView = () => {
  showMore.value = !showMore.value;
};

// Compute the current stage based on the stages object
// const currentStage = computed(() => {
//   const stages = rentalObj.value.stages || {};
//   const activeStage = Object.values(stages).find(
//     (stage: any) => stage.status === "pending" || stage.status === "done"
//   );
//   return activeStage?.label || "";
// });

// Compute the current stage based on rentalObj stages

// Determine the current stage based on rentalObj stages
// const currentStage = computed(() => {
//   const stages = rentalObj.value.stages || {};
//   return Object.values(stages).find(
//     (stage: any) => stage.status === "pending" || stage.status === "done"
//   )?.label;
// });

// // Button states
// const isCancelApplicationEnabled = computed(() => currentStage.value === "Application Sent");
// const isSignAgreementEnabled = computed(() => currentStage.value === "Application Approved");
// const isMakePaymentEnabled = computed(() => currentStage.value === "Application Signed");
// const isMoveInEnabled = computed(() => currentStage.value === "Payment made");

// Determine the current stage by finding the highest "done" stage
const currentStage = computed(() => {
  const stages = rentalObj?.value?.stages || {};
  return Object.values(stages)
    .filter((stage: any) => stage.status === "done")
    .reduce((highest, stage) => stage.label, "");
});

// Button states
const isCancelApplicationEnabled = computed(() => currentStage.value === "Application Sent");
const isSignAgreementEnabled = computed(() => currentStage.value === "Application Approved");
const isMakePaymentEnabled = computed(() => currentStage.value === "Application Signed");
const isMoveInEnabled = computed(() => currentStage.value === "Payment made");

  </script>