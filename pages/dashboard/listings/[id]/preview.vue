<template>
  <main>
    <TopNavBar>
      <template #extra>
        <button
          @click="toggleView"
          type="button"
          class="flex cursor-pointer items-center space-x-1 bg-[#1D1D1D] px-3 py-3 rounded-md hover:bg-gray-700"
        >
          <svg
            v-if="listView"
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

          <svg
            v-else
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

          <span>{{ listView ? "List view" : "Map View" }}</span>
        </button>
      </template>
    </TopNavBar>
    <!--  -->
    <section v-if="!loading">
      <section>
        <div
          class="flex justify-between max-w-7xl mx-auto items-center pt-3 px-6"
        >
          <!-- Breadcrumb -->
          <div class="flex items-center space-x-4">
            <svg @click="router.back()" class="cursor-pointer"  width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="18" fill="#EAEAEA"/>
              <path d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            <a href="#" class="text-gray-500 hover:text-gray-700 text-sm"
              >Listings</a
            >
            <span class="text-gray-400 text-sm">|</span>
            <h1 class="text-gray-800 font-semibold text-sm">
              {{ propertyObj.name }}
            </h1>
          </div>

          <!-- Action Icons -->
          <div class="flex items-center space-x-3">
            <!-- Share Icon -->
            <button @click="showShareModal = true" class=" ">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="36" height="36" rx="18" fill="#EAEAEA" />
                <path
                  d="M25.5 13.417C25.5 14.7977 24.3807 15.917 23 15.917C21.6192 15.917 20.5 14.7977 20.5 13.417C20.5 12.0363 21.6192 10.917 23 10.917C24.3807 10.917 25.5 12.0363 25.5 13.417Z"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
                <path
                  d="M15.5 18C15.5 19.3807 14.3807 20.5 13 20.5C11.6193 20.5 10.5 19.3807 10.5 18C10.5 16.6192 11.6193 15.5 13 15.5C14.3807 15.5 15.5 16.6192 15.5 18Z"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
                <path
                  d="M25.5 22.583C25.5 23.9638 24.3807 25.083 23 25.083C21.6192 25.083 20.5 23.9638 20.5 22.583C20.5 21.2023 21.6192 20.083 23 20.083C24.3807 20.083 25.5 21.2023 25.5 22.583Z"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
                <path
                  d="M15.2734 16.9585L20.6901 14.459M15.2734 19.0423L20.6901 21.5419"
                  stroke="#1D2739"
                  stroke-width="1.5"
                />
              </svg>
            </button>

            <!-- Favorite Icon -->
            <!-- <CoreBookmark :property="propertyObj" /> -->
            <!-- <button @click="handleFavorite" class="">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="36" height="36" rx="18" fill="#EAEAEA" />
                <path
                  d="M24.2192 11.3285C21.9844 9.95769 20.034 10.5101 18.8623 11.39C18.3818 11.7508 18.1417 11.9312 18.0003 11.9312C17.859 11.9312 17.6188 11.7508 17.1383 11.39C15.9667 10.5101 14.0162 9.95769 11.7815 11.3285C8.84872 13.1275 8.18509 19.0624 14.9499 24.0695C16.2384 25.0232 16.8827 25.5 18.0003 25.5C19.118 25.5 19.7622 25.0232 21.0507 24.0695C27.8156 19.0624 27.1519 13.1275 24.2192 11.3285Z"
                  stroke="#1D2739"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button> -->
            <button
            @click="toggleLike"
            class=" "
          >
            <svg v-if="propertyObj?.bookmarked"
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
        
            <svg v-else
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
          </div>
        </div>
      </section>
      <div class="max-w-7xl mx-auto pt-4 pb-8">
        <section v-if="!loading">
          <ImageGallery :loading="loading" :property="propertyObj" :images="allImages" />
        <!-- <PropertyImageGallery :loading="loading" :property="propertyObj" :images="allImages" /> -->

        <PropertyDetails class="mt-10" :property="propertyObj" />
        </section>
        <section v-else>
          <div class="rounded-md p-4 w-full mx-auto mt-10">
            <div class="animate-pulse flex space-x-4">
              <!-- <div class="rounded-md bg-slate-200 h-44 w-44"></div> -->
              <div class="flex-1 space-y-6 py-1">
                <div class="h-32 bg-slate-200 rounded"></div>
                <div class="space-y-3">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="h-32 w-full bg-slate-200 rounded col-span-2"></div>
                    <div class="h-32 w-full bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div class="h-32 w-full bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <SimilarProperties class="mt-16" v-if="!loadingSimilarProperties" :properties="propertyList" />
        <section v-else>
          <div class="rounded-md p-4 w-full mx-auto mt-10">
            <div class="animate-pulse flex space-x-4">
              <div class="flex-1 space-y-6 py-1">
                <div class="h-32 bg-slate-200 rounded"></div>
                <div class="space-y-3">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="h-32 w-full bg-slate-200 rounded col-span-2"></div>
                    <div class="h-32 w-full bg-slate-200 rounded col-span-1"></div>
                  </div>
                  <div class="h-32 w-full bg-slate-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <CoreModal :isOpen="showShareModal" @close="showShareModal = false">
      <div
        class="bg-white w-full m-14 lg:m-0 rounded-lg relative space-y-10"
        @click.stop
      >
        <div class="space-y-7">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-lg pt-3 font-medium text-[#1D2739]">
                Share using
              </h2>
            </div>
            <!-- Close Button -->
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

            <!-- Modal Content -->
          </div>

          <div class="flex justify-between mb-6">
            <!-- Instagram -->
            <div @click="triggerNativeShare" class="flex cursor-pointer flex-col items-center space-y-2">
              <!-- <img src="/instagram-icon.svg" alt="Instagram" class="w-12 h-12 mb-2" /> -->
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
            <!-- X (Twitter) -->
            <div @click="shareOnTwitter" class="flex flex-col items-center cursor-pointer space-y-2">
              <!-- <img src="/twitter-icon.svg" alt="Twitter" class="w-12 h-12 mb-2" /> -->
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
            <!-- WhatsApp -->
            <div @click="shareOnWhatsApp" class="flex flex-col items-center cursor-pointer space-y-2">
              <!-- <img src="/whatsapp-icon.svg" alt="WhatsApp" class="w-12 h-12 mb-2" /> -->
              <svg width="61"
              height="60" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0"/>
                  <path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white"/>
                  <path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white"/>
                  <defs>
                  <linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#5BD066"/>
                  <stop offset="1" stop-color="#27B43E"/>
                  </linearGradient>
                  </defs>
                  </svg>

              <span class="text-sm text-[#1D2739]">WhatsApp</span>
            </div>
            <!-- Facebook -->
            <div @click="shareOnFacebook" class="flex flex-col items-center cursor-pointer space-y-2">
              <!-- <img src="/facebook-icon.svg" alt="Facebook" class="w-12 h-12 mb-2" /> -->
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

        <!-- Copy Link -->
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
    <CoreFullScreenLoader
      :visible="loading"
      text="Please wait while we fetch property information.."
      logo="/path-to-your-logo.png"
    />
  </main>
</template>

<script setup lang="ts">
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
// import { useCustomToast } from '@/composables/core/useCustomToast'
import { useFetchSimilarProperty } from "@/composables/modules/property/fetchSimilarProperties";
import { useBookmarkProperty } from "@/composables/modules/property/bookmark";
import { useImageExtractor } from "@/composables/core/useExtractImages";
const { bookmarkProperty, loading: favoriting } = useBookmarkProperty();
import { dynamicImage } from "@/utils/assets"; 
const { showToast } = useCustomToast();
const { propertyObj, loading, getProperty } = useFetchProperty();
const { propertyList, loading: loadingSimilarProperties } = useFetchSimilarProperty()
const router = useRouter();
import { useCustomToast } from '@/composables/core/useCustomToast'
// const { showToast } = useCustomToast();
const route = useRoute()

const { extractImages } = useImageExtractor();
   const allImages = computed(() => extractImages(propertyObj.value)); 
// Property Images
// const mainImage = ref("property1.png");
// const secondaryImage1 = ref("property1.png");
// const secondaryImage2 = ref("property1.png");
// const secondaryImage3 = ref("property1.png");
// const secondaryImage4 = ref("property1.png");

const showShareModal = ref(false);
// const showBookingModal = ref(true);

// Property Manager

// Similar Properties

const handleFavorite = () => {};

const shareLink = ref(`https://www.blackcountry.com/${route.fullPath}`);
// Function to copy the link to the clipboard
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    // useNuxtApp().$toast.success("Link copied!", {
    //   autoClose: 5000,
    //   dangerouslyHTMLString: true,
    // });
    showToast({
					title: "Success",
					message: 'Link copied!',
					toastType: "success",
					duration: 3000
				  });
  } catch (err) {
    // useNuxtApp().$toast.error("Failed to copy link", {
    //   autoClose: 5000,
    //   dangerouslyHTMLString: true,
    // });
    showToast({
					title: "Error",
					message: 'Failed to copy link',
					toastType: "error",
					duration: 3000
				  });
  }
};

definePageMeta({
  middleware: "auth",
});

const toggleLike = async() => {
  await bookmarkProperty(propertyObj.value.id);
  getProperty();
};

// Define the link and text you want to share
// const shareUrl = ref('https://yourwebsite.com')
const shareText = ref('Check this out!')

// Facebook Share Function
const shareOnFacebook = () => {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

// Twitter Share Function
const shareOnTwitter = () => {
  const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareLink.value)}&text=${encodeURIComponent(shareText.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

// WhatsApp Share Function
const shareOnWhatsApp = () => {
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText.value)}%20${encodeURIComponent(shareLink.value)}`
  window.open(url, '_blank', 'width=600,height=400')
}

// Instagram doesn't support direct URL sharing like Facebook and Twitter, so we can provide a message
const shareOnInstagram = () => {
  alert('Instagram sharing requires the app to be opened directly. No direct URL sharing available.')
}

const triggerNativeShare = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Check this out!',
      text: shareText.value,
      url: shareText.value
    })
    .then(() => {
      showToast({
          title: "Success",
          message: "Successfully shared!",
          toastType: "success",
          duration: 3000
        });
    })
    .catch((error) => {
      showToast({
          title: "Error",
          message: `Error sharing:', ${error}`,
          toastType: "error",
          duration: 3000
        });
      // console.error('Error sharing:', error);
    });
  } else {
    showToast({
          title: "Error",
          message: 'Web Share API not supported on this browser.',
          toastType: "error",
          duration: 3000
        });
    // alert('Web Share API not supported on this browser.');
  }
}

</script>

<style scoped>
/* Additional styling for specific elements can be added here */
</style>
