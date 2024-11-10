<template>
    <section class="bg-white rounded-lg">
      <h2 class="text- font-medium border-[0.5px] px-6 rounded-lg py-3 border-gray-50 mb-4">Move - out checklist</h2>
    
      <div class="border-[0.5px] border-gray-100 rounded-lg p-5 bg-white">
        <div class="mb-6">
        <h3 class="text-md">Significance of move - out checklist.</h3>
        <p class="text-gray-600 text-sm">
          The purpose of a checklist is to document the property's condition at move-out, ensuring accountability, legal protection, and effective maintenance planning.
        </p>
      </div>
        <HomeChecklistSection title="Kitchen (If applicable)" :items="kitchenItems" />
        <HomeChecklistSection title="Bathroom (If applicable)" :items="bathroomItems" />
        <HomeChecklistSection title="Living Rooms (If applicable)" :items="livingRoomItems" />
        <HomeChecklistSection title="Bedroom (If applicable)" :items="bedroomItems" />
        <HomeChecklistSection title="Common areas (If applicable)" :items="commonAreasItems" />
        <HomeChecklistSection title="Utilities and Appliances (If applicable)" :items="utilitiesItems" />
        <!-- Add more sections as needed -->
      </div>
    </section>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'  
  const kitchenItems = ref([
    'Floors',
    'Walls',
    'Stove/Oven',
    'Refrigerator',
    'Sink',
    'Cabinets',
    'Dishwasher',
    'Countertops',
    'Ceiling',
    'Windows',
    'Doors',
    'Locks'
  ])
  
  const bathroomItems = ref([
    'Floors',
    'Walls',
    'Shower/Tub',
    'Sink',
    'Cabinets',
    'Toilet',
    'Mirror',
    'Towel Rack',
    'Doors',
    'Locks'
  ])

  const livingRoomItems = ref([
    'Floors',
    'Walls',
    'Shower/Tub',
    'Sink',
    'Cabinets',
    'Toilet',
    'Mirror',
    'Towel Rack',
    'Doors',
    'Locks'
  ])

  const bedroomItems = ref([
    'Floors',
    'Walls',
    'Shower/Tub',
    'Sink',
    'Cabinets',
    'Toilet',
    'Mirror',
    'Towel Rack',
    'Doors',
    'Locks'
  ])

  const commonAreasItems = ref([
    'Floors',
    'Walls',
    'Shower/Tub',
    'Sink',
    'Cabinets',
    'Toilet',
    'Mirror',
    'Towel Rack',
    'Doors',
    'Locks'
  ])

  const utilitiesItems = ref([
    'Floors',
    'Walls',
    'Shower/Tub',
    'Sink',
    'Cabinets',
    'Toilet',
    'Mirror',
    'Towel Rack',
    'Doors',
    'Locks'
  ])
  </script>
  
  <style scoped>
  /* Optional: Additional custom styles */
  </style>
  