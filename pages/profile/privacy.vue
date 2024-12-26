<template>
 <main>
  <TopNavBar />
  <div class="lg:p-8 p-3 bg-gray-25 min-h-screen">
    <div class="max-w-3xl mx-auto">
      <svg
            @click="router.back()"
            class="cursor-pointer mb-3"
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
      <!-- Breadcrumbs -->
      <div class="text-sm text-gray-500 mb-4">
        <span>Profile</span>
        <span class="mx-2">|</span>
        <span class="font-semibold text-[#1D2739]">Privacy Policy</span>
      </div>

      <!-- Date -->
      <div class="text-sm text-gray-500 mb-6">
        <p class="text-[#1D2739]">Current as of <strong>20 Jan 2022</strong></p>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-semibold text-[#667185] mb-6">Privacy Policy</h1>

      <!-- Paragraphs -->
      <div class="space-y-6 text-gray-700 font-light leading-relaxed">
        <p>
          Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus.
        </p>

        <h2 class="font-semibold text-[#1D2739]  text-lg">Lorem ipsum dolor sit amet consectetur.</h2>
        <p class="text-[#667185]">
          Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
        </p>

        <h2 class="font-semibold text-[#1D2739]  text-lg">Lorem ipsum dolor sit amet consectetur. Nibh.</h2>
        <p class="text-[#667185]">
          Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
        </p>

        <h2 class="font-semibold text-[#1D2739]  text-lg">Lorem ipsum dolor sit amet consectetur. Tincidunt aenean amet purus id urna. Purus.</h2>
        <p class="text-[#667185]">
          Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
        </p>

        <h2 class="font-semibold text-[#1D2739] text-lg">Lorem ipsum dolor sit amet consectetur.</h2>
        <p class="text-[#667185]">
          Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
        </p>

        <h2 class="font-semibold text-[#1D2739] text-lg">Lorem ipsum dolor sit amet consectetur.</h2>
        <p class="text-[#667185]">
          Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
        </p>

        <h2 class="font-semibold text-[#1D2739]  text-lg">Lorem ipsum dolor sit amet consectetur. Molestie nunc turpis tellus neque sed.</h2>
        <p class="text-[#667185]">
          Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
        </p>
      </div>
    </div>
  </div>
 </main>
  </template>
  
  <script setup lang="ts">
  const router = useRouter()
//   definePageMeta({
//   middleware: "auth",
// });
  </script>
  
  <style scoped></style>
  