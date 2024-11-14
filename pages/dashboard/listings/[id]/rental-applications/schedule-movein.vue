<template>
  <main>
    <TopNavBar />
      <div class="p-6  min-h-screen max-w-2xl mx-auto">
          <nav class="flex items-center space-x-2 text-gray-600 text-sm mb-4">
            <span class="cursor-pointer hover:text-gray-800">Dashboard</span>
            <span class="text-gray-400">|</span>
            <span class="cursor-pointer hover:text-gray-800">Jason Gardens</span>
            <span class="text-gray-400">|</span>
            <span class="text-gray-800 font-medium">Schedule move-in</span>
          </nav>
     
          <BookingModal :property="propertyObj" class="m-6 lg:m-0" />
        </div>
        <div class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center  border-[0.5px]">
            <div class="max-w-2xl w-full flex justify-between">
              <button @click="router.back()" class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]">Cancel</button>
              <button @click="router.push('/dashboard/listings/${route.params.id}/rental-applications/movein-success')" class="px-6 py-3 text-sm rounded-md bg-[#292929] text-white">Schedule move-in</button>
            </div>
        </div>
  </main>
    </template>
    
    <script setup lang="ts">
    import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
     const { propertyObj, loading } = useFetchProperty();
     const router = useRouter()
    </script>
    
    <style scoped>
    .form-radio {
      border-radius: 50%;
      height: 1.25rem;
      width: 1.25rem;
      border: 2px solid #cbd5e1; /* Tailwind color: border-gray-300 */
    }
    </style>