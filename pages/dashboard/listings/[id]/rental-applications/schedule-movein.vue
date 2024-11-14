<!-- <template>
    <main class="max-w-4xl mx-auto">
        <BookingModal :property="property" class="m-6 lg:m-0" />
    </main>
</template> -->

<template>
    <div class="container mx-auto p-6 max-w-2xl">
  <!-- Breadcrumbs -->
  <div class="text-sm text-gray-500 mb-4">
    <span>Dashboard</span> &gt; <span>Jason Gardens</span> &gt; <span class="text-black font-semibold">Schedule move-in</span>
  </div>

  <BookingModal :property="property" class="m-6 lg:m-0" />

  <!-- Footer Buttons -->
  <div class="flex justify-between mt-8">
    <button class="border border-gray-400 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
    <button class="bg-black text-white px-4 py-2 rounded-md">Schedule move-in</button>
  </div>
</div>

</template>