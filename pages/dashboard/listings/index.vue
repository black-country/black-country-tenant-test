<template>
  <main class="">
    <section class="sticky top-0 z-50">
      <nav class="bg-[#292929] text-white py-3 z-10">
        <div class="container mx-auto flex justify-between items-center px-4">
          <NuxtLink
            to="/dashboard"
            class="flex cursor-pointer items-center gap-x-3"
          >
            <!-- Logo -->
            <div class="flex items-center space-x-2">
              <img
                src="@/assets/icons/logo-with-text.svg"
                alt="logo"
                class="object-contain"
              />
            </div>
          </NuxtLink>

          <!-- Hamburger Menu for mobile -->
          <div class="block lg:hidden">
            <button @click="isOpen = true" class="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <!-- Navigation Links and Profile - Hidden on mobile -->
          <div class="hidden lg:flex items-center pl-4 justify-between w-full">
            <div class="flex items-center space-x-6">
              <!-- Links -->
              <div class="flex space-x-6">
               <div ref="dashboardRef">
                <NuxtLink
                :class="[route.path === '/dashboard' ? 'bg-[#1D1D1D]' : '']"
                to="/dashboard"
                class="flex items-center space-x-1 text-gray-300 px-3  py-2 rounded-md hover:text-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.08331 9.99967C2.08331 6.26772 2.08331 4.40175 3.24268 3.24237C4.40205 2.08301 6.26803 2.08301 9.99998 2.08301C13.7319 2.08301 15.5979 2.08301 16.7573 3.24237C17.9166 4.40175 17.9166 6.26772 17.9166 9.99967C17.9166 13.7316 17.9166 15.5976 16.7573 16.757C15.5979 17.9163 13.7319 17.9163 9.99998 17.9163C6.26803 17.9163 4.40205 17.9163 3.24268 16.757C2.08331 15.5976 2.08331 13.7316 2.08331 9.99967Z"
                    stroke="#D0D5DD"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 7.50033H7.91667M14.1667 7.50033H15M10 6.66699V8.33366M12.0833 6.66699V8.33366"
                    stroke="#D0D5DD"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15 12.5003H10M5.83333 12.5003H5M7.91667 11.667V13.3337"
                    stroke="#D0D5DD"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="text-sm">Dashboard</span>
              </NuxtLink>
               </div>
              <div ref="listingsRef">
                <NuxtLink
                :class="[
                  route.path === '/dashboard/listings' ? 'bg-[#1D1D1D]' : '',
                ]"
                to="/dashboard/listings"
                class="flex items-center space-x-1 text-white px-3 py-3 rounded-md"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.66669 15.0003C1.66669 13.7167 1.66669 13.0747 1.95563 12.6032C2.1173 12.3394 2.33913 12.1176 2.60296 11.9559C3.07447 11.667 3.71632 11.667 5.00002 11.667C6.28372 11.667 6.92557 11.667 7.39708 11.9559C7.66091 12.1176 7.88274 12.3394 8.04441 12.6032C8.33335 13.0747 8.33335 13.7167 8.33335 15.0003C8.33335 16.284 8.33335 16.9259 8.04441 17.3974C7.88274 17.6612 7.66091 17.8831 7.39708 18.0447C6.92557 18.3337 6.28372 18.3337 5.00002 18.3337C3.71632 18.3337 3.07447 18.3337 2.60296 18.0447C2.33913 17.8831 2.1173 17.6612 1.95563 17.3974C1.66669 16.9259 1.66669 16.284 1.66669 15.0003Z"
                    fill="#EBE5E0"
                    stroke="#EBE5E0"
                    stroke-width="1.5"
                  />
                  <path
                    d="M11.6667 15.0003C11.6667 13.7167 11.6667 13.0747 11.9556 12.6032C12.1173 12.3394 12.3391 12.1176 12.6029 11.9559C13.0744 11.667 13.7164 11.667 15 11.667C16.2837 11.667 16.9256 11.667 17.3971 11.9559C17.6609 12.1176 17.8828 12.3394 18.0444 12.6032C18.3334 13.0747 18.3334 13.7167 18.3334 15.0003C18.3334 16.284 18.3334 16.9259 18.0444 17.3974C17.8828 17.6612 17.6609 17.8831 17.3971 18.0447C16.9256 18.3337 16.2837 18.3337 15 18.3337C13.7164 18.3337 13.0744 18.3337 12.6029 18.0447C12.3391 17.8831 12.1173 17.6612 11.9556 17.3974C11.6667 16.9259 11.6667 16.284 11.6667 15.0003Z"
                    fill="#EBE5E0"
                    stroke="#EBE5E0"
                    stroke-width="1.5"
                  />
                  <path
                    d="M1.66669 5.00033C1.66669 3.71663 1.66669 3.07478 1.95563 2.60327C2.1173 2.33943 2.33913 2.11761 2.60296 1.95593C3.07447 1.66699 3.71632 1.66699 5.00002 1.66699C6.28372 1.66699 6.92557 1.66699 7.39708 1.95593C7.66091 2.11761 7.88274 2.33943 8.04441 2.60327C8.33335 3.07478 8.33335 3.71663 8.33335 5.00033C8.33335 6.28403 8.33335 6.92588 8.04441 7.39738C7.88274 7.66122 7.66091 7.88304 7.39708 8.04472C6.92557 8.33366 6.28372 8.33366 5.00002 8.33366C3.71632 8.33366 3.07447 8.33366 2.60296 8.04472C2.33913 7.88304 2.1173 7.66122 1.95563 7.39738C1.66669 6.92588 1.66669 6.28403 1.66669 5.00033Z"
                    fill="#EBE5E0"
                    stroke="#EBE5E0"
                    stroke-width="1.5"
                  />
                  <path
                    d="M11.6667 5.00033C11.6667 3.71663 11.6667 3.07478 11.9556 2.60327C12.1173 2.33943 12.3391 2.11761 12.6029 1.95593C13.0744 1.66699 13.7164 1.66699 15 1.66699C16.2837 1.66699 16.9256 1.66699 17.3971 1.95593C17.6609 2.11761 17.8828 2.33943 18.0444 2.60327C18.3334 3.07478 18.3334 3.71663 18.3334 5.00033C18.3334 6.28403 18.3334 6.92588 18.0444 7.39738C17.8828 7.66122 17.6609 7.88304 17.3971 8.04472C16.9256 8.33366 16.2837 8.33366 15 8.33366C13.7164 8.33366 13.0744 8.33366 12.6029 8.04472C12.3391 7.88304 12.1173 7.66122 11.9556 7.39738C11.6667 6.92588 11.6667 6.28403 11.6667 5.00033Z"
                    fill="#EBE5E0"
                    stroke="#EBE5E0"
                    stroke-width="1.5"
                  />
                </svg>
                <span class="text-sm">Listings</span>
              </NuxtLink>
              </div>
               <div ref="myHomeRef">
                <NuxtLink
                to="#"
                class="flex items-center py-2.5 space-x-1 text-gray-300 hover:text-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.95951 11.0113C1.66533 9.09692 1.51824 8.13977 1.88016 7.29123C2.24208 6.44268 3.04505 5.86211 4.65097 4.70096L5.85085 3.83341C7.8486 2.38897 8.84744 1.66675 10 1.66675C11.1526 1.66675 12.1514 2.38897 14.1492 3.83341L15.3491 4.70096C16.955 5.86211 17.7579 6.44268 18.1199 7.29123C18.4818 8.13977 18.3347 9.09692 18.0405 11.0113L17.7897 12.6437C17.3726 15.3575 17.1641 16.7144 16.1909 17.5239C15.2176 18.3334 13.7948 18.3334 10.949 18.3334H9.05102C6.2053 18.3334 4.78245 18.3334 3.80919 17.5239C2.83593 16.7144 2.62741 15.3575 2.21038 12.6437L1.95951 11.0113Z"
                    stroke="#D0D5DD"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                </svg>

                <span class="text-sm">My home</span>
              </NuxtLink>
               </div>
               <div ref="messagesRef">
                <NuxtLink
                to="/dashboard/messages"
                class="flex items-center space-x-1 py-2.5 text-gray-300 hover:text-white"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8089 17.4084C15.2947 17.1768 18.0714 14.3607 18.2999 10.8254C18.3445 10.1336 18.3445 9.41709 18.2999 8.72526C18.0714 5.18999 15.2947 2.37395 11.8089 2.14223C10.6196 2.06318 9.37802 2.06335 8.19118 2.14223C4.70534 2.37395 1.92869 5.18999 1.70022 8.72526C1.65551 9.41709 1.65551 10.1336 1.70022 10.8254C1.78343 12.113 2.35288 13.3052 3.02328 14.3118C3.41253 15.0166 3.15563 15.8962 2.75019 16.6645C2.45786 17.2185 2.31169 17.4955 2.42905 17.6956C2.54642 17.8957 2.80857 17.9021 3.33288 17.9148C4.36974 17.9401 5.06892 17.6461 5.62392 17.2368C5.93869 17.0048 6.09608 16.8887 6.20455 16.8753C6.31302 16.862 6.52649 16.9499 6.95336 17.1258C7.33702 17.2838 7.78248 17.3813 8.19118 17.4084C9.37802 17.4873 10.6196 17.4875 11.8089 17.4084Z"
                    stroke="#D0D5DD"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.99606 10H10.0035M13.3256 10H13.3331M6.66644 10H6.67392"
                    stroke="#D0D5DD"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span class="text-sm">Messages</span>
              </NuxtLink>
               </div>
              </div>
            </div>

            <!-- Right Side: Icons and Profile -->
            <div class="flex items-center">
              <div  ref="propertyViewRef" class="flex items-center">
                <button
                  v-if="viewType === 'grid'"
                  @click="toggleView('map')"
                  type="button"
                  class="flex cursor-pointer items-center space-x-1 bg-[#1D1D1D] px-3 py-3 rounded-md hover:bg-gray-700"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3333 10.0738V7.69615C18.3333 6.07615 18.3333 5.26615 17.8452 4.76287C17.357 4.2596 16.5713 4.2596 15 4.2596H13.2678C12.5033 4.2596 12.497 4.25811 11.8096 3.91332L9.03324 2.52084C7.87402 1.93945 7.29442 1.64875 6.67697 1.66895C6.05951 1.68915 5.49896 2.01715 4.37786 2.67316L3.35464 3.2719C2.53115 3.75375 2.1194 3.99469 1.89302 4.3955C1.66666 4.7963 1.66666 5.28441 1.66666 6.26061V13.1236C1.66666 14.4063 1.66666 15.0476 1.95187 15.4046C2.14166 15.642 2.40762 15.8018 2.70166 15.8547C3.14354 15.9342 3.68456 15.6177 4.76655 14.9844C5.50129 14.5546 6.20842 14.1081 7.08738 14.2292C7.8239 14.3306 8.50832 14.7963 9.16666 15.1265"
                      stroke="#EBE5E0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.66666 1.66797V14.1963"
                      stroke="#FDFCFC"
                      stroke-width="1.5"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.5 4.17383V9.18517"
                      stroke="#FDFCFC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.7558 16.8124L18.2934 18.3316M17.6409 14.698C17.6409 16.3369 16.3127 17.6655 14.6742 17.6655C13.0357 17.6655 11.7073 16.3369 11.7073 14.698C11.7073 13.0591 13.0357 11.7305 14.6742 11.7305C16.3127 11.7305 17.6409 13.0591 17.6409 14.698Z"
                      stroke="#FDFCFC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span>Map View</span>
                </button>
                <button
                  v-if="viewType === 'map'"
                  @click="toggleView('grid')"
                  type="button"
                  class="flex cursor-pointer items-center space-x-1 bg-[#1D1D1D] px-3 py-3 rounded-md hover:bg-gray-700"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.66663 4.16699H16.6666"
                      stroke="#EBE5E0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M3.33337 4.16699H3.34086"
                      stroke="#FDFCFC"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.33337 10H3.34086"
                      stroke="#FDFCFC"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.33337 15.833H3.34086"
                      stroke="#FDFCFC"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.66663 10H16.6666"
                      stroke="#EBE5E0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M6.66663 15.833H16.6666"
                      stroke="#EBE5E0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                  <span>List View</span>
                </button>
              </div>
              <div class="space-x-1 px-2 flex">
                <NuxtLink to="/dashboard/listings/bookmarked" ref="favoritesRef" class="">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" rx="6" fill="#1D1D1D" />
                    <path
                      d="M26.2187 13.3285C23.9839 11.9577 22.0335 12.5101 20.8618 13.39C20.3813 13.7508 20.1412 13.9312 19.9998 13.9312C19.8585 13.9312 19.6183 13.7508 19.1378 13.39C17.9662 12.5101 16.0157 11.9577 13.781 13.3285C10.8482 15.1275 10.1846 21.0624 16.9494 26.0695C18.2379 27.0232 18.8822 27.5 19.9998 27.5C21.1175 27.5 21.7618 27.0232 23.0503 26.0695C29.8151 21.0624 29.1514 15.1275 26.2187 13.3285Z"
                      stroke="#EBE5E0"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </NuxtLink>
                <NuxtLink
                  ref="notificationsRef"
                  to="/dashboard/notifications"
                  class=""
                >
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" rx="6" fill="#1D1D1D" />
                    <path
                      d="M21.4417 27.4998C21.2952 27.7524 21.0849 27.962 20.8319 28.1078C20.5788 28.2535 20.292 28.3302 20 28.3302C19.708 28.3302 19.4212 28.2535 19.1681 28.1078C18.9151 27.962 18.7048 27.7524 18.5583 27.4998M25 16.6665C25 15.3404 24.4732 14.0687 23.5355 13.131C22.5979 12.1933 21.3261 11.6665 20 11.6665C18.6739 11.6665 17.4021 12.1933 16.4645 13.131C15.5268 14.0687 15 15.3404 15 16.6665C15 22.4998 12.5 24.1665 12.5 24.1665H27.5C27.5 24.1665 25 22.4998 25 16.6665Z"
                      stroke="#EBE5E0"
                      stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </NuxtLink>
              </div>
              <!-- {{user}} -->
              <NuxtLink to="/profile" class="flex cursor-pointer items-center space-x-1">
                <img v-if="profileObj?.profilePicture" :src="profileObj?.profilePicture" class="h-10 w-10 rounded-full" />
                <svg v-else width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M38.9271 39.7854C40.9459 37.8885 42.5541 35.5977 43.6524 33.0546C44.7507 30.5115 45.3157 27.7701 45.3125 25C45.3125 13.7812 36.2188 4.6875 25 4.6875C13.7813 4.6875 4.68751 13.7812 4.68751 25C4.68431 27.7701 5.24932 30.5115 6.34762 33.0546C7.44592 35.5977 9.05416 37.8885 11.0729 39.7854C14.8374 43.3414 19.8216 45.3195 25 45.3125C30.1785 45.3195 35.1626 43.3414 38.9271 39.7854ZM12.8021 37.1083C14.2648 35.2784 16.1209 33.8015 18.2326 32.7873C20.3443 31.7731 22.6574 31.2477 25 31.25C27.3427 31.2477 29.6557 31.7731 31.7674 32.7873C33.8792 33.8015 35.7353 35.2784 37.1979 37.1083C35.6021 38.7202 33.7022 39.9992 31.6083 40.8711C29.5144 41.743 27.2682 42.1904 25 42.1875C22.7318 42.1904 20.4856 41.743 18.3917 40.8711C16.2978 39.9992 14.3979 38.7202 12.8021 37.1083ZM32.8125 18.75C32.8125 20.822 31.9894 22.8091 30.5243 24.2743C29.0592 25.7394 27.072 26.5625 25 26.5625C22.928 26.5625 20.9409 25.7394 19.4757 24.2743C18.0106 22.8091 17.1875 20.822 17.1875 18.75C17.1875 16.678 18.0106 14.6909 19.4757 13.2257C20.9409 11.7606 22.928 10.9375 25 10.9375C27.072 10.9375 29.0592 11.7606 30.5243 13.2257C31.9894 14.6909 32.8125 16.678 32.8125 18.75Z" fill="#D6D0CC"/>
                  </svg>
              <span class="font-semibold">{{user?.firstName}} {{user?.lastName}}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 7.50004C15 7.50004 11.3176 12.5 10 12.5C8.68233 12.5 5 7.5 5 7.5" stroke="#EBE5E0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
            </NuxtLink>
            </div>
          </div>
        </div>
      </nav>
    </section>
    <section v-if="viewType === 'grid'">
      <div
        class="lg:flex items-center space-y-6 lg:space-y-0 lg:space-x-4 p-4 bg-white container mx-auto"
      >
        <div
          ref="navigationBarRef"
          class="lg:flex space-y-4 lg:space-y-0 lg:space-x-2 justify-between lg:justify-start"
        >
          <button
            @click="locationTab = 'all'"
            :class="[
              locationTab === 'all'
                ? 'bg-[#5B8469] text-white'
                : 'bg-[#F0F2F5] text-[#1A1A1A]',
            ]"
            class="text-sm w-full px-6 py-2.5 rounded-md"
          >
            All
          </button>
          <button
            @click="locationTab = 'mainland'"
            :class="[
              locationTab === 'mainland'
                ? 'bg-[#5B8469] text-white'
                : 'bg-[#F0F2F5] text-[#1A1A1A]',
            ]"
            class="text-sm w-full px-4 py-2.5 rounded-md"
          >
            Mainland
          </button>
          <button
            @click="locationTab = 'ireland'"
            :class="[
              locationTab === 'ireland'
                ? 'bg-[#5B8469] text-white'
                : 'bg-[#F0F2F5] text-[#1A1A1A]',
            ]"
            class="text-sm w-full px-4 py-2.5 rounded-md"
          >
            Ireland
          </button>

          <div class="relative z-10 w-full">
            <div class="relative inline-block z-50 w-full">
              <button
                @click="toggleDropdown"
                class="px-4 py-2.5 bg-[#F0F2F5] text-gray-800 rounded-md flex items-center justify-between w-full lg:w-64"
              >
                <span class="text-sm">{{
                  selectedOption ? selectedOption.label : "Newest Listing"
                }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>

              <div
                v-if="isDropdownOpen"
                class="absolute mt-2 shadow-lg bg-white rounded-md w-full z-10"
              >
                <ul class="">
                  <li
                    v-for="option in sortOptions"
                    :key="option.value"
                    @click="selectOption(option)"
                    class="px-3 py-3 cursor-pointer flex justify-between items-center"
                  >
                    <span class="text-sm text-[#1D2739]">{{
                      option.label
                    }}</span>
                    <svg
                      v-if="selectedOption.value === option.value"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="19"
                        height="19"
                        rx="9.5"
                        fill="#099137"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="19"
                        height="19"
                        rx="9.5"
                        stroke="#099137"
                      />
                      <path
                        d="M14.6663 6.5L8.24967 12.9167L5.33301 10"
                        stroke="white"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <svg
                      v-else
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="19"
                        height="19"
                        rx="9.5"
                        fill="#F9FAFB"
                      />
                      <rect
                        x="0.5"
                        y="0.5"
                        width="19"
                        height="19"
                        rx="9.5"
                        stroke="#D0D5DD"
                      />
                    </svg>
                  </li>
                </ul>
              </div>
              <div
                v-if="isDropdownOpen"
                class="fixed inset-0 bg-black bg-opacity-50 z-0"
                @click="closeDropdown"
              ></div>
            </div>

            <div class="absolute right-0 mt-2 w-48 bg-white rounded-md hidden">
              <a
                href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >Oldest Listing</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >Price: Low to High</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >Price: High to Low</a
              >
            </div>
          </div>
        </div>

        <div class="flex-grow"></div>
        <div class="flex space-x-2 justify-between lg:justify-start">
          <div class="relative w-full">
            <input
              type="text"
              placeholder="Search"
              v-model="searchQuery"
              class="bg-[#EAEAEA] text-gray-600 text-sm w-full lg:w-auto px-4 py-3 pl-10 rounded-md outline-none"
              @focus="isSearchModalVisible = true"
              @click="isSearchModalVisible = true"
            />
            <svg
              class="top-4 absolute left-3"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1667 11.667L15.1667 14.667"
                stroke="#667185"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13.8333 7.33301C13.8333 4.0193 11.147 1.33301 7.83331 1.33301C4.51961 1.33301 1.83331 4.0193 1.83331 7.33301C1.83331 10.6467 4.51961 13.333 7.83331 13.333C11.147 13.333 13.8333 10.6467 13.8333 7.33301Z"
                stroke="#667185"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <button
            @click="isFilterModalVisible = true"
            type="button"
            class="bg-[#EAEAEA] text-[#1D2739] text-sm px-4 py-2 rounded-md hover:bg-gray-200 flex items-center"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8333 3.33301H2.5"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.16667 15.833H2.5"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5 15.833H14.1667"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5 9.58301H9.16667"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.5 3.33301H15.8333"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.16667 9.58301H2.5"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.0833 1.66699C12.4716 1.66699 12.6657 1.66699 12.8189 1.73043C13.0231 1.815 13.1853 1.97723 13.2699 2.18143C13.3333 2.33457 13.3333 2.52871 13.3333 2.91699V3.75033C13.3333 4.13861 13.3333 4.33275 13.2699 4.48589C13.1853 4.69008 13.0231 4.85232 12.8189 4.93689C12.6657 5.00033 12.4716 5.00033 12.0833 5.00033C11.6951 5.00033 11.5009 5.00033 11.3477 4.93689C11.1436 4.85232 10.9813 4.69008 10.8967 4.48589C10.8333 4.33275 10.8333 4.13861 10.8333 3.75033V2.91699C10.8333 2.52871 10.8333 2.33457 10.8967 2.18143C10.9813 1.97723 11.1436 1.815 11.3477 1.73043C11.5009 1.66699 11.6951 1.66699 12.0833 1.66699Z"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.4167 14.167C10.8049 14.167 10.9991 14.167 11.1523 14.2304C11.3564 14.315 11.5187 14.4772 11.6032 14.6814C11.6667 14.8346 11.6667 15.0287 11.6667 15.417V16.2503C11.6667 16.6386 11.6667 16.8327 11.6032 16.9859C11.5187 17.1901 11.3564 17.3523 11.1523 17.4369C10.9991 17.5003 10.8049 17.5003 10.4167 17.5003C10.0284 17.5003 9.83425 17.5003 9.68108 17.4369C9.47692 17.3523 9.31467 17.1901 9.23008 16.9859C9.16667 16.8327 9.16667 16.6386 9.16667 16.2503V15.417C9.16667 15.0287 9.16667 14.8346 9.23008 14.6814C9.31467 14.4772 9.47692 14.315 9.68108 14.2304C9.83425 14.167 10.0284 14.167 10.4167 14.167Z"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.91667 7.91699C8.30495 7.91699 8.49908 7.91699 8.65225 7.98043C8.85642 8.065 9.01867 8.22723 9.10325 8.43141C9.16667 8.58458 9.16667 8.77874 9.16667 9.16699V10.0003C9.16667 10.3886 9.16667 10.5827 9.10325 10.7359C9.01867 10.9401 8.85642 11.1023 8.65225 11.1869C8.49908 11.2503 8.30495 11.2503 7.91667 11.2503C7.52838 11.2503 7.33424 11.2503 7.1811 11.1869C6.97691 11.1023 6.81468 10.9401 6.7301 10.7359C6.66667 10.5827 6.66667 10.3886 6.66667 10.0003V9.16699C6.66667 8.77874 6.66667 8.58458 6.7301 8.43141C6.81468 8.22723 6.97691 8.065 7.1811 7.98043C7.33424 7.91699 7.52838 7.91699 7.91667 7.91699Z"
                stroke="#1D2739"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            Filter
          </button>
        </div>
      </div>
      <div ref="propertyCardsRef"
        class="p-6 container mx-auto space-y-6 lg:space-y-0 lg:flex flex-wrap gap-7"
      >
        <div
          v-if="!loadingProperties && propertiesList.length"
          v-for="(property, index) in propertiesList"
          :key="index"
          class="relative cursor-pointer min-w-[300px] w-full lg:max-w-[350px] bg-white"
        >
          <button
            @click="toggleLike(index, property)"
            class="absolute top-6 right-6 text-white hover:text-red-500 focus:outline-none"
          >
            <svg
              v-if="property.bookmarked"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#D42620" />
              <path
                d="M27.4626 11.9942C24.7809 10.3492 22.4404 11.0121 21.0344 12.068C20.4578 12.501 20.1696 12.7174 20 12.7174C19.8304 12.7174 19.5422 12.501 18.9656 12.068C17.5596 11.0121 15.2191 10.3492 12.5374 11.9942C9.01807 14.1529 8.22172 21.2749 16.3395 27.2834C17.8857 28.4278 18.6588 29 20 29C21.3412 29 22.1143 28.4278 23.6605 27.2834C31.7783 21.2749 30.9819 14.1529 27.4626 11.9942Z"
                fill="white"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>

            <svg
              v-else
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="40"
                height="40"
                rx="20"
                fill="black"
                fill-opacity="0.6"
              />
              <path
                d="M27.4626 11.9942C24.7809 10.3492 22.4404 11.0121 21.0344 12.068C20.4578 12.501 20.1696 12.7174 20 12.7174C19.8304 12.7174 19.5422 12.501 18.9656 12.068C17.5596 11.0121 15.2191 10.3492 12.5374 11.9942C9.01807 14.1529 8.22172 21.2749 16.3395 27.2834C17.8857 28.4278 18.6588 29 20 29C21.3412 29 22.1143 28.4278 23.6605 27.2834C31.7783 21.2749 30.9819 14.1529 27.4626 11.9942Z"
                stroke="#F9FAFB"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
          <img
            @click="router.push(`/dashboard/listings/${property.id}/preview`)"
            v-if="property?.images?.length"
            :src="property?.images[0]"
            class="rounded-lg cursor-pointer object-cover h-56 w-full"
            alt="alt"
          />
          <img
            @click="router.push(`/dashboard/listings/${property.id}/preview`)"
            v-else
            class="rounded-lg cursor-pointer"
            src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="alt"
          />
          <section
            @click="router.push(`/dashboard/listings/${property.id}/preview`)"
            class="space-y-2 cursor-pointer"
          >
            <div>
              <h3 class="text- font-medium text-[#1D2739] mt-4">
                {{ property?.name }}
              </h3>
              <p class="text-[#79797F] text-sm items-center flex gap-x-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.94366 12.4644C7.69072 12.7012 7.35257 12.8337 7.00064 12.8337C6.64872 12.8337 6.31062 12.7012 6.05762 12.4644C3.74093 10.2822 0.636277 7.84435 2.15032 4.30513C2.96895 2.3915 4.93403 1.16699 7.00064 1.16699C9.06727 1.16699 11.0323 2.3915 11.851 4.30513C13.3631 7.83992 10.2661 10.2897 7.94366 12.4644Z"
                    fill="#5B8469"
                    stroke="#5B8469"
                  />
                  <path
                    d="M9.04165 6.41667C9.04165 7.54425 8.12756 8.45833 6.99998 8.45833C5.8724 8.45833 4.95831 7.54425 4.95831 6.41667C4.95831 5.28908 5.8724 4.375 6.99998 4.375C8.12756 4.375 9.04165 5.28908 9.04165 6.41667Z"
                    fill="#EAEAEA"
                    stroke="#5B8469"
                  />
                </svg>

                {{ property?.address }}
              </p>
            </div>
            <p class="text-[#1D2739] font-medium text-sm">
              {{ property.bedroomCount }} bedrooms |
              {{ property.bathroomCount }} baths | {{ property.size }}
              {{ property.sizeUnit }}
            </p>
            <p class="text-[#1D2739] text-xs">{{ property.available }}</p>
            <p class="text-[#1D2739] text-xs">
              {{ property.availableRoomsCount }} rooms avail.
              <span class="font-medium text-[#326543]">Now</span>
              <span :class="[property.futureAvailableRoomsCount === 0 ? 'hidden' : '']">
               | {{ property.futureAvailableRoomsCount }} room avail. on
                {{ moment(property.leastAvailableDate).format("MMMM Do YYYY") }}
              </span>
            </p>
          </section>
        </div>
        <div
          v-if="loadingProperties"
          class="border-[0.5px] bg-gray-100 shadow rounded-md w-full mx-auto"
        >
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-md bg-slate-100 h-96 w-full"></div>
          </div>
        </div>
      </div>
    </section>
    <section v-else-if="viewType === 'map'" class="z-10">
      <PropertyMap :properties="propertiesList" />
    </section>

    <CoreModal
      :isOpen="isSearchModalVisible"
      @close="isSearchModalVisible = false"
    >
      <div
        class="bg-white p-4 m-6 lg:m-0 rounded-lg w-full lg:w-1/2 relative space-y-5"
        @click.stop
      >
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search"
            class="w-full p-3 py-3 border-[0.5px] pl-10 bg-[#EAEAEA] rounded-md focus:outline-none"
          />
          <svg
            class="absolute top-4 left-4"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6667 12.167L14.6667 15.167"
              stroke="#667185"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.3333 7.83301C13.3333 4.5193 10.647 1.83301 7.33331 1.83301C4.01961 1.83301 1.33331 4.5193 1.33331 7.83301C1.33331 11.1467 4.01961 13.833 7.33331 13.833C10.647 13.833 13.3333 11.1467 13.3333 7.83301Z"
              stroke="#667185"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            v-if="searchQuery"
            @click="clearSearch"
            class="absolute top-4 right-4 cursor-pointer"
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6667 3.83301L3.33337 13.1663M3.33337 3.83301L12.6667 13.1663"
              stroke="#1D2739"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div
          class="mt-4 bg-[#FDFCFC]"
          v-if="searchQuery.length && !loadingSearch && searchResults.length"
        >
          <div class="flex justify-between items-center px-3">
            <p class="text-[#1D2739] font-medium text-sm">
              {{ searchResults.length }} result{{
                searchResults.length > 1 ? "s" : ""
              }}
            </p>

            <button class="text-sm" @click="clearSearch">Clear</button>
          </div>
          <h3 class="text font- text-[#1D2739] pl-3 py-3">Suggested</h3>
          <ul>
            <li
              v-for="(suggestion, index) in searchResults"
              :key="index"
              class="p-2 hover:bg-gray-200 text-[#171717] cursor-pointer"
              @click="selectSuggestion(suggestion)"
            >
              <div class="flex items-center gap-x-3">
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="1"
                    y="1.36035"
                    width="52.1667"
                    height="52"
                    rx="8"
                    fill="white"
                  />
                  <rect
                    x="1"
                    y="1.36035"
                    width="52.1667"
                    height="52"
                    rx="8"
                    stroke="#F9FAFB"
                  />
                  <g clip-path="url(#clip0_1070_65739)">
                    <rect
                      x="3.08301"
                      y="3.36035"
                      width="48"
                      height="48"
                      rx="9.6"
                      fill="#292929"
                    />
                    <path
                      d="M3.54465 38.8279C3.54465 37.3992 6.58031 36.7333 8.63206 36.7333C9.21397 36.7333 10.191 36.8504 10.191 37.6333C10.191 39.165 7.03307 40.0007 5.4106 40.0007C4.54963 40.0007 3.54465 39.6934 3.54465 38.8279ZM11.2219 37.6333C11.2219 36.6998 10.5415 35.7025 8.63206 35.7025C6.51573 35.7025 2.51344 36.3559 2.51344 38.8279C2.51344 40.1461 3.67796 41.0316 5.4106 41.0316C7.43679 41.0316 11.2219 40.0349 11.2219 37.6333ZM-3.04883 48.0675C-0.410675 49.0141 3.59024 49.9959 8.83823 49.9959C17.1053 49.9959 28.0962 49.0238 28.0962 40.6186C28.0962 37.4047 26.0793 35.9843 24.4586 34.8429C23.0333 33.8389 22.1551 33.1548 22.0649 31.7927C22.0055 30.8948 22.4282 30.0805 22.9183 29.138C23.4677 28.0809 24.0904 26.8828 24.0904 25.3678C24.0904 23.3115 22.5653 21.0982 19.2171 21.0982C16.5569 21.0982 14.1028 22.1384 11.5051 23.24C8.16411 24.6567 4.37662 26.2626 -0.975317 26.2626C-1.71472 26.2626 -2.40371 26.2122 -3.04883 26.1224V20.4582C-1.82319 20.6105 -0.589308 20.687 0.645761 20.6872C7.04896 20.6872 11.5379 18.528 15.4984 16.6231C18.8718 15.0003 22.058 13.4679 25.9526 13.4679C31.3359 13.4679 34.1523 16.5177 34.1523 19.5303C34.1523 21.554 33.1024 22.7866 31.9911 24.091C30.8459 25.4351 29.6617 26.8252 29.6617 29.0796C29.6617 31.2433 30.5116 32.4061 31.3335 33.5305C32.2929 34.8429 33.2851 36.2005 33.2851 39.4247C33.2851 45.5775 27.4604 49.3861 21.7841 51.6367H-3.04883V48.0675ZM-3.04883 43.0005C-0.50661 43.9162 2.17491 44.3851 4.87703 44.3864C9.55381 44.3864 17.3995 43.3545 17.3995 36.4443C17.3995 34.4115 15.7671 31.5482 12.1374 31.5482C9.69403 31.5482 7.76868 32.1906 5.90688 32.8119C4.01296 33.4435 2.22438 34.0403 -0.121609 34.0403C-1.14627 34.0403 -2.12812 33.8638 -3.04883 33.583V28.41C-2.36062 28.4908 -1.66825 28.531 -0.975317 28.5305C4.83801 28.5305 9.02542 26.7551 12.3902 25.3284C14.8733 24.2754 17.0176 23.3661 19.2171 23.3661C21.1377 23.3661 21.8221 24.4001 21.8221 25.3678C21.8221 26.3285 21.377 27.185 20.9056 28.0923C20.3406 29.1794 19.7003 30.4116 19.8015 31.9429C19.9683 34.4544 21.6598 35.6458 23.1521 36.6971C24.6471 37.7501 25.8279 38.5813 25.8279 40.6186C25.8279 43.6705 24.0666 47.7277 8.83823 47.7277C3.36161 47.7277 -0.672452 46.5725 -3.04883 45.6321V43.0005ZM-3.04883 34.6661C-2.12225 34.9202 -1.14282 35.0715 -0.121609 35.0715C2.39187 35.0715 4.34485 34.4198 6.23324 33.7899C8.09918 33.1672 9.86118 32.5794 12.1374 32.5794C15.3343 32.5794 16.3687 35.1834 16.3687 36.4443C16.3687 40.9656 12.395 43.3555 4.87703 43.3555C1.65592 43.3555 -1.07375 42.6378 -3.04883 41.8881V34.6661ZM-3.04883 14.9726C-2.1192 15.1794 -1.16995 15.285 -0.217623 15.2876C5.80638 15.2876 10.4372 12.7644 15.3399 10.0935C20.2839 7.39973 25.3966 4.61446 32.1389 4.61446C35.2605 4.61446 37.9204 5.5172 39.8302 7.22532C41.6848 8.88371 42.6652 11.1437 42.6652 13.7608C42.6652 16.5067 40.9792 18.9777 39.1945 21.5934C37.2549 24.4367 35.2488 27.3763 35.2488 30.9428C35.2488 38.4984 41.3716 42.9203 52.0889 43.1607V45.8769C52.0428 45.8807 51.9975 45.8908 51.9542 45.907C44.181 48.907 39.1572 43.5534 38.932 43.3027C38.8834 43.2349 38.8192 43.1799 38.7447 43.1424C38.6702 43.1049 38.5878 43.086 38.5044 43.0874C38.4211 43.0888 38.3393 43.1103 38.2661 43.1502C38.1929 43.1901 38.1305 43.2472 38.0841 43.3165C38.025 43.4067 37.9963 43.5134 38.0023 43.6211H37.9985C37.9985 43.6352 37.9608 45.0981 36.6785 47.2538C35.9764 48.4346 34.794 49.9801 32.8282 51.6367H24.424C25.6131 51.0745 26.8881 50.3845 28.1058 49.5542C32.2266 46.7438 34.316 43.3358 34.316 39.4247C34.316 35.8637 33.1735 34.301 32.1658 32.922C31.3753 31.8407 30.6925 30.9065 30.6925 29.0796C30.6925 27.2047 31.7044 26.017 32.7757 24.7596C33.9592 23.3706 35.1832 21.9339 35.1832 19.5303C35.1832 16.0052 32.0125 12.4367 25.9526 12.4367C21.8228 12.4367 18.5337 14.0188 15.0515 15.6937C11.0015 17.6419 6.81377 19.656 0.645761 19.656C-0.753611 19.656 -2.01173 19.5506 -3.04883 19.416V14.9726ZM-3.04883 5.34798C-1.86427 6.16198 -0.108141 6.85579 2.44609 6.85579C8.19277 6.85579 12.4852 4.2912 17.0297 1.57569C21.6481 -1.18368 26.4236 -4.03699 32.9632 -4.03699C38.8829 -4.03699 43.999 -1.95279 48.1688 2.15726C50.1276 4.08813 51.4048 6.03696 52.0889 7.23085V13.4216C52.0774 13.4581 52.0678 13.4951 52.0602 13.5325C51.8168 14.715 49.9401 16.2422 47.9533 17.8588C44.1734 20.9345 39.469 24.762 39.4908 30.7377C39.4997 33.2511 40.5631 35.5198 42.408 36.962C44.1289 38.3068 46.2514 38.7568 48.3207 38.7568C49.6379 38.7564 50.9323 38.5734 52.0889 38.324V42.1302C42.0267 41.8967 36.28 37.8492 36.28 30.9428C36.28 27.6948 38.1947 24.8884 40.0461 22.1746C41.8405 19.5444 43.6961 16.8248 43.6961 13.7608C43.6961 7.76856 38.9434 3.58323 32.1389 3.58323C25.1337 3.58323 19.9044 6.4324 14.8467 9.18832C10.0625 11.7947 5.54356 14.2564 -0.217623 14.2564C-1.22295 14.2564 -2.17439 14.1217 -3.04883 13.9138V5.34798ZM52.0889 21.4749C51.4237 22.0237 50.7835 22.5189 50.1642 22.9976C47.4867 25.0663 45.3721 26.7005 45.3721 29.7354C45.3721 31.1296 45.904 32.2092 46.9093 32.8571C47.7181 33.3782 48.7393 33.5737 49.7712 33.5737C50.569 33.5737 51.3719 33.4563 52.0889 33.2826V35.9974C48.4751 36.8694 45.6108 36.5866 43.8049 35.1748C42.5112 34.1636 41.7652 32.5432 41.759 30.7294C41.7411 25.8374 45.8017 22.5331 49.3848 19.618C50.3732 18.8137 51.3039 18.0546 52.0889 17.3024V21.4749ZM52.0889 32.2165C50.5984 32.6154 48.6433 32.7473 47.4677 31.9906C46.7515 31.5289 46.4033 30.7912 46.4033 29.7354C46.4033 27.2068 48.2451 25.7832 50.7945 23.8133C51.2286 23.4793 51.6601 23.1419 52.0889 22.8011V32.2165ZM52.0889 51.6367H34.3961C37.5171 48.7295 38.5372 46.0945 38.8674 44.6609C39.5426 45.2456 40.6681 46.0807 42.2111 46.7579C44.3903 47.7142 47.8587 48.5109 52.0889 46.9565V51.6367Z"
                      fill="white"
                    />
                  </g>
                  <rect
                    x="3"
                    y="3"
                    width="48.1667"
                    height="48"
                    rx="6"
                    fill="#F4F4F4"
                    fill-opacity="0.4"
                  />
                  <path
                    d="M28.1615 33.2443C27.8724 33.515 27.4859 33.6663 27.0837 33.6663C26.6815 33.6663 26.2951 33.515 26.006 33.2443C23.3584 30.7503 19.8102 27.9643 21.5405 23.9194C22.4761 21.7324 24.7219 20.333 27.0837 20.333C29.4456 20.333 31.6914 21.7324 32.627 23.9194C34.3551 27.9592 30.8157 30.7589 28.1615 33.2443Z"
                    fill="#5B8469"
                    stroke="#5B8469"
                  />
                  <path
                    d="M29.4167 26.3333C29.4167 27.622 28.372 28.6667 27.0833 28.6667C25.7947 28.6667 24.75 27.622 24.75 26.3333C24.75 25.0447 25.7947 24 27.0833 24C28.372 24 29.4167 25.0447 29.4167 26.3333Z"
                    fill="white"
                    stroke="#5B8469"
                  />
                  <defs>
                    <clipPath id="clip0_1070_65739">
                      <rect
                        x="3.08301"
                        y="3.36035"
                        width="48"
                        height="48"
                        rx="9.6"
                        fill="white"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div class="space-y-2">
                  <p class="text-sm">{{ suggestion.name ?? "Nil" }}</p>
                  <p
                    class="text-xs font-light flex items-center text-[#667185]"
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.84103 9.58228C5.66037 9.75145 5.41883 9.84603 5.16745 9.84603C4.91607 9.84603 4.67458 9.75145 4.49387 9.58228C2.83908 8.02353 0.621476 6.28224 1.70294 3.75422C2.28767 2.38735 3.6913 1.5127 5.16745 1.5127C6.64362 1.5127 8.04724 2.38735 8.63199 3.75422C9.71207 6.27907 7.49991 8.0289 5.84103 9.58228Z"
                        fill="#5B8469"
                        stroke="#5B8469"
                      />
                      <path
                        d="M6.62565 5.26302C6.62565 6.06844 5.97273 6.72135 5.16732 6.72135C4.3619 6.72135 3.70898 6.06844 3.70898 5.26302C3.70898 4.4576 4.3619 3.80469 5.16732 3.80469C5.97273 3.80469 6.62565 4.4576 6.62565 5.26302Z"
                        fill="white"
                        stroke="#5B8469"
                      />
                    </svg>

                    {{ suggestion.address ?? "Nil" }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div
          v-else-if="
            loadingSearch && searchQuery.length && !searchResults.length
          "
          class="rounded-md p-4 w-full mx-auto mt-10"
        >
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-6 py-1">
              <div class="h-32 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
        <p v-else class="flex justify-center text-sm items-center py-10">
          No Search Query Available
        </p>
      </div>
    </CoreModal>

    <CoreModal
      :isOpen="isFilterModalVisible"
      @close="isFilterModalVisible = false"
    >
      <FilterSidebar />
    </CoreModal>

    <CoreModal :isOpen="successModal" @close="successModal = false">
      <div class="p-6 rounded-lg w-5/12 relative" @click.stop>
        <div
          class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
        >
          <div
            class="bg-white rounded-lg p-6 shadow-lg w-full space-y-4 max-w-md relative text-center"
          >
            <div class="flex justify-center items-center mb-4">
              <div class="">
                <svg
                  width="65"
                  height="64"
                  viewBox="0 0 65 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.923828"
                    width="63.1513"
                    height="64"
                    rx="31.5756"
                    fill="#0F973D"
                  />
                  <path
                    d="M44.1631 32.3596C44.1631 25.7418 38.7982 20.377 32.1804 20.377C25.5626 20.377 20.1978 25.7418 20.1978 32.3596C20.1978 38.9774 25.5626 44.3423 32.1804 44.3423C38.7982 44.3423 44.1631 38.9774 44.1631 32.3596Z"
                    stroke="white"
                    stroke-width="1.7974"
                  />
                  <path
                    d="M27.584 32.9633L30.5297 35.9839L37.0103 28.7344"
                    stroke="white"
                    stroke-width="1.7974"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h2 class="text-xl font-medium mb-2 text-[#1D2739]">
              Search saved
            </h2>
            <p class="text-[#667185] mb-6 leading-snug">
              Search saved successfully! You can always access your saved
              searches on the 'Saved' page to pick up where you left off.
            </p>
            <div class="pt-6">
              <button
                @click="successModal = false"
                class="bg-[#292929] text-[#EAEAEA] w-full py-3.5 rounded-md"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      </div>
    </CoreModal>
  </main>
</template>

<script setup lang="ts">
import { useShepherd } from "vue-shepherd";
import "shepherd.js/dist/css/shepherd.css";
import moment from "moment";
import { useGetProperties } from "@/composables/modules/property/fetchProperties";
import { useBookmarkProperty } from "@/composables/modules/property/bookmark";
const { bookmarkProperty, loading } = useBookmarkProperty();
import { dynamicImage } from "@/utils/assets";
import { useUser } from '@/composables/auth/user'
  const { user } = useUser()
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const isOpen = ref(false)
const route = useRoute();
const isSearchModalVisible = ref(false);
const successModal = ref(false);
// const searchQuery = ref("");
const propertySearch = ref("");

// Shepherd tour setup
const tour = useShepherd({
  useModalOverlay: true,
});

const dashboardRef = ref(null);
const listingsRef = ref(null);
const myHomeRef = ref(null);
const messagesRef = ref(null);
const propertyViewRef = ref(null);
const favoritesRef = ref(null);
const notificationsRef = ref(null);
const profileRef = ref(null);
const propertyCardsRef = ref(null)

// onMounted(() => {
//   // Check if the tour has already run
//   const tourStatus = localStorage.getItem('tourShown');

//   // If tour has not been shown, run the tour
//   if (!tourStatus) {
//     // Add tour steps
//     tour.addSteps([
//       {
//         attachTo: { element: dashboardRef.value, on: "bottom" },
//         text:
//           "This is the greeting. It displays your name based on the user data.",
//       },
//       {
//         attachTo: { element: listingsRef.value, on: "bottom" },
//         text:
//           "Explore available properties, filter by preferences, and find your perfect home.",
//       },
//       {
//         attachTo: { element: myHomeRef.value, on: "bottom" },
//         text:
//           "Manage your rented space, pay rent, request maintenance, and more—all from one place.",
//       },
//       {
//         attachTo: { element: messagesRef.value, on: "bottom" },
//         text:
//           "Here you can manage your payment actions such as paying rent or utility bills.",
//       },
//       {
//         attachTo: { element: propertyViewRef.value, on: "bottom" },
//         text: "When in the map view, click to browse properties in a convenient list format, complete with essential details for each listing. Start your search hassle-free!",
//       },
//       {
//         attachTo: { element: favoritesRef.value, on: "top" },
//         text: "Manage your rental applications from here.",
//       },
//       {
//         attachTo: { element: notificationsRef.value, on: "bottom" },
//         text: "Manage your upcoming activities from here.",
//       },
//       {
//         attachTo: { element: profileRef.value, on: "bottom" },
//         text: "Manage your recent transactions from here.",
//       },
//       {
//         attachTo: { element: propertyCardsRef.value, on: "bottom" },
//         text: "Manage your recent transactions from here.",
//       },
//     ]);

//     // Start the tour
//     tour.start();

//     // Save status in local storage to indicate the tour has run
//     localStorage.setItem('tourShown', 'true');
//   }
// });


// onMounted(() => {
//   // Add tour steps
//   tour.addSteps([
//     {
//       attachTo: { element: dashboardRef.value, on: "bottom" },
//       text:
//         "This is the greeting. It displays your name based on the user data.",
//     },
//     {
//       attachTo: { element: listingsRef.value, on: "bottom" },
//       text:
//         "Explore available properties, filter by preferences, and find your perfect home.",
//     },
//     {
//       attachTo: { element: myHomeRef.value, on: "bottom" },
//       text:
//         "Manage your rented space, pay rent, request maintenance, and more—all from one place.",
//     },
//     {
//       attachTo: { element: messagesRef.value, on: "bottom" },
//       text:
//         "Here you can manage your payment actions such as paying rent or utility bills.",
//     },
//     {
//       attachTo: { element: propertyViewRef.value, on: "bottom" },
//       text: "When in the map view, click to browse properties in a convenient list format, complete with essential details for each listing. Start your search hassle-free!",
//     },
//     {
//       attachTo: { element: favoritesRef.value, on: "top" },
//       text: "Manage your rental applications from here.",
//     },
//     {
//       attachTo: { element: notificationsRef.value, on: "bottom" },
//       text: "Manage your upcoming activities from here.",
//     },
//     {
//       attachTo: { element: profileRef.value, on: "bottom" },
//       text: "Manage your recent transactions from here.",
//     },
//     {
//       attachTo: { element: propertyCardsRef.value, on: "bottom" },
//       text: "Manage your recent transactions from here.",
//     },
//   ]);

//   // Start the tour
//   tour.start();
// });

const {
  propertiesList,
  loadingSearch,
  searchResults,
  searchQuery,
  loadingProperties,
  sortBy,
  clearSearch,
} = useGetProperties();

const locationTab = ref("all");

// Set default view based on the query parameter ('grid' or 'map')
const viewType = ref(route.query.view || "grid"); // default to 'grid' if no view query parameter

// Function to toggle between grid and map view
const toggleView = (newViewType: string) => {
  viewType.value = newViewType; // Update the current view type
  updateQueryParam("view", newViewType); // Update the query parameter in the URL
};

// Watch for query parameter changes to update the view
watch(
  () => route.query.view,
  (newView) => {
    if (newView === "grid" || newView === "map") {
      viewType.value = newView; // Update view type based on URL query
    }
  },
  { immediate: true }
);

// Function to update the query parameter in the URL
const updateQueryParam = (key: string, value: string) => {
  router.push({
    query: {
      ...route.query,
      [key]: value,
    },
  });
};

onMounted(() => {
  // Set default view to 'grid' if no 'view' query parameter is present
  if (!route.query.view) {
    updateQueryParam("view", "grid");
  }
});

watch(searchQuery, (val: any) => {
  if (val) {
    isSearchModalVisible.value = true;
  }
});

const showAdvancedFilter = ref(false);

const isFilterModalVisible = ref(false);

// Function to open the modal
const openModal = () => {
  console.log("You clicked");
  showAdvancedFilter.value = true;
  // isFilterModalVisible.value = true
};

// Function to close the modal
const closeModal = () => {
  isFilterModalVisible.value = false;
};

const selectSuggestion = (suggestion: string) => {
  // Close modal after selection
  isSearchModalVisible.value = false;
  router.push(`/dashboard/listings/${suggestion.id}/preview`);
};

const toggleLike = (index: number, property: any) => {
  propertiesList.value[index].bookmarked = !propertiesList.value[index].bookmarked;
  bookmarkProperty(property.id);
};

const handleSearchInput = () => {
  // Logic for handling search
  console.log("Searching:", searchQuery.value);
};

definePageMeta({
  middleware: "auth",
});

const handleButtonClick = () => {
  console.log("ok");
  //  alert('Helo')
  isFilterModalVisible.value = true;
};

const suggestions = ref([
  "Jason Gardens ₦ 30M",
  "Iconic Tower, off Ajose Adegun VI, Lagos.",
  "Surulere",
  "Banana Island",
]);

const emit = defineEmits<{
  (event: "close"): void;
}>();

const props = defineProps({
  isSearchModalVisible: {
    type: Boolean,
    default: false,
  },
});

const propertyTypes = ref([
  "Single-family home",
  "Apartment",
  "Condominium",
  "Townhouse",
  "Duplex",
  "Villa",
  "Bungalow",
  "Loft",
]);

const selectedProperties = ref<string[]>([]);
const filteredResults = ref(645);

const resetFilters = () => {
  selectedProperties.value = [];
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".modal-content")) {
    isFilterModalVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

// Dropdown options
const sortOptions = ref([
  { value: "all", label: "All" },
  { value: "newest", label: "New Listings" },
  { value: "oldest", label: "Oldest Listings" },
  { value: "low-to-high", label: "Lowest price to highest price" },
  { value: "high-to-low", label: "Highest price to Lowest price" },
]);

const isDropdownOpen = ref(false);
const selectedOption = ref(sortOptions.value[1]);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const selectOption = (option: any) => {
  selectedOption.value = option;
  console.log(option.value, "selecetd option");

  if (option.value === "all") {
    sortBy.value = "all";
  }

  if (option.value === "newest") {
    sortBy.value = "newest";
  }

  if (option.value === "oldest") {
    sortBy.value = "oldest";
  }

  if (option.value === "low-to-high") {
    sortBy.value = "lowToHigh";
  }

  if (option.value === "high-to-low") {
    sortBy.value = "highToLow";
  }
  closeDropdown();
};
</script>

<style scoped>
.hide-scroll-bar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scroll-bar::-webkit-scrollbar {
  display: none;
}

/* Shepherd step element background color */
.shepherd-element {
  background-color: red !important; /* Set the background to red */
  border-radius: 8px; /* Optional: Add border-radius for rounded corners */
  color: white; /* Set the text color to white to contrast with red */
}

/* Customize the text inside the step */
.shepherd-content {
  color: white !important; /* Ensure text is readable on a red background */
}

/* Customize the button styles (e.g., Next, Finish) */
.shepherd-button {
  background-color: white; /* White background for buttons */
  color: red; /* Red text color for buttons */
  border: 1px solid red; /* Optional: Red border for buttons */
}

/* Customize button hover state */
.shepherd-button:hover {
  background-color: red; /* Red background on hover */
  color: white; /* White text on hover */
}
</style>