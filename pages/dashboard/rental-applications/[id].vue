<template>
    <main>
        <TopNavBar />
            <div class="container mx-auto p-8">
              <!-- Image Section with Progress Overlay -->
              <section class="relative">
                <img src="@/assets/img/rental-details.png" alt="Property" class="w-full h-[500px] object-cover rounded-lg" />
          
                <!-- Progress Steps Overlay -->
                <div class="absolute bottom-0 left-0 right-0 p-4  bg-gradient-to-t from-black/80 to-transparent text-white">
                  <div class="flex justify-center space-x-8 ">
                    <!-- Step 1 -->
                    <div class="text-center">
                      <span class="inline-block w-8 h-8 bg-green-600 text-white rounded-full leading-8">1</span>
                      <p class="mt-2 text-sm">Tour Schedule</p>
                    </div>
                    <!-- Step 2 -->
                    <div class="text-center">
                      <span class="inline-block w-8 h-8 bg-gray-400 text-white rounded-full leading-8">2</span>
                      <p class="mt-2 text-sm">Application sent</p>
                    </div>
                    <!-- Step 3 -->
                    <div class="text-center">
                      <span class="inline-block w-8 h-8 bg-gray-400 text-white rounded-full leading-8">3</span>
                      <p class="mt-2 text-sm">Agreement signed</p>
                    </div>
                    <!-- Step 4 -->
                    <div class="text-center">
                      <span class="inline-block w-8 h-8 bg-gray-400 text-white rounded-full leading-8">4</span>
                      <p class="mt-2 text-sm">Payment made</p>
                    </div>
                  </div>
                </div>
              </section>
              <template>
                <div class="container mx-auto p-8">
                  <!-- Main Layout -->
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    <!-- Left Column: Property Details -->
                    <div class="lg:col-span-2 space-y-6">
                      <!-- Property Title -->
                      <h1 class="text-2xl font-semibold">Jason Gardens</h1>
                      <p class="text-gray-500 flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M12 2c-3.866 0-7 3.134-7 7 0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9a2 2 0 100-4 2 2 0 000 4z"></path>
                        </svg>
                        <span>Iconic Tower, off Ajose Adeogun VI, Lagos.</span>
                      </p>
              
                      <!-- Tabs Section -->
                      <div class="border-b border-gray-200">
                        <nav class="flex space-x-4">
                          <button
                            class="py-2 px-4 text-sm font-medium text-gray-700 border-b-2"
                            :class="{'border-black': activeTab === 'overview', 'border-transparent': activeTab !== 'overview'}"
                            @click="activeTab = 'overview'"
                          >
                            Property Overview
                          </button>
                          <button
                            class="py-2 px-4 text-sm font-medium text-gray-700 border-b-2"
                            :class="{'border-black': activeTab === 'common', 'border-transparent': activeTab !== 'common'}"
                            @click="activeTab = 'common'"
                          >
                            Common areas
                          </button>
                          <button
                            class="py-2 px-4 text-sm font-medium text-gray-700 border-b-2"
                            :class="{'border-black': activeTab === 'room1', 'border-transparent': activeTab !== 'room1'}"
                            @click="activeTab = 'room1'"
                          >
                            Room 1
                          </button>
                          <button
                            class="py-2 px-4 text-sm font-medium text-gray-700 border-b-2"
                            :class="{'border-black': activeTab === 'room2', 'border-transparent': activeTab !== 'room2'}"
                            @click="activeTab = 'room2'"
                          >
                            Room 2
                          </button>
                        </nav>
                      </div>
              
                      <!-- Property Description -->
                      <div>
                        <h2 class="text-lg font-semibold">Property Description</h2>
                        <p class="text-gray-600 mt-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fusce rhoncus eu justo sit. Eget dui proin elit lorem hendrerit.
                          Aliquet dignissim sit sem arcu turpis sit.
                        </p>
                      </div>
              
                      <!-- Property Highlight Section -->
                      <div>
                        <h2 class="text-lg font-semibold">Property Highlight</h2>
                        <div class="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <p><strong>Property size:</strong> 18632345 sqf</p>
                            <p><strong>Number of bedrooms:</strong> 5</p>
                            <p><strong>Flooring type:</strong> Tiles</p>
                          </div>
                          <div>
                            <p><strong>Number of bathrooms:</strong> 6</p>
                            <p><strong>Floor number:</strong> 5</p>
                            <p><strong>Architecture:</strong> Apartment</p>
                            <p><strong>Rooms available:</strong> 3 rooms available Now</p>
                          </div>
                        </div>
                      </div>
              
                      <!-- Co-living Information -->
                      <div>
                        <h2 class="text-lg font-semibold">Co-living with:</h2>
                        <table class="min-w-full mt-2 table-auto text-gray-600">
                          <thead class="bg-gray-100">
                            <tr>
                              <th class="px-4 py-2">Occupants</th>
                              <th class="px-4 py-2">Room occupied</th>
                              <th class="px-4 py-2">Available from</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td class="border px-4 py-2">Rita</td>
                              <td class="border px-4 py-2">1</td>
                              <td class="border px-4 py-2">24/05/2024</td>
                            </tr>
                            <tr>
                              <td class="border px-4 py-2">Maxwell</td>
                              <td class="border px-4 py-2">2</td>
                              <td class="border px-4 py-2">Not available</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
              
                      <!-- Property Visitation -->
                      <div>
                        <h2 class="text-lg font-semibold">Property Visitation</h2>
                        <ul class="text-gray-600 mt-2">
                          <li><strong>Monday:</strong> 10:00 AM</li>
                          <li><strong>Tuesday:</strong> 10:00 AM</li>
                          <li><strong>Wednesday:</strong> 10:00 AM</li>
                        </ul>
                      </div>
                    </div>
              
                    <!-- Right Column: Manager Details and Amenities -->
                    <div class="space-y-6">
                      <!-- Property Manager -->
                      <div class="border border-gray-200 rounded-lg p-6">
                        <div class="flex items-center space-x-4">
                          <img src="https://example.com/manager.jpg" class="w-12 h-12 rounded-full" alt="Manager" />
                          <div>
                            <h4 class="font-semibold">Joy Adetunji</h4>
                            <p class="text-sm text-gray-500">Property Manager</p>
                          </div>
                        </div>
                        <button class="mt-4 w-full bg-black text-white py-2 rounded-md">
                          Send Application
                        </button>
                      </div>
              
                      <!-- Neighborhood Amenities -->
                      <div class="border border-gray-200 rounded-lg p-6">
                        <h4 class="font-semibold mb-4">Neighborhood Amenities</h4>
                        <div class="flex space-x-4 mb-4">
                          <button class="px-4 py-2 rounded-full bg-gray-200 text-sm font-medium">Hospital</button>
                          <button class="px-4 py-2 rounded-full bg-gray-200 text-sm font-medium">Schools</button>
                          <button class="px-4 py-2 rounded-full bg-gray-200 text-sm font-medium">Market/Shopping Plaza</button>
                          <button class="px-4 py-2 rounded-full bg-gray-200 text-sm font-medium">Police Station</button>
                        </div>
              
                        <!-- List of Nearby Amenities -->
                        <div class="space-y-4">
                          <div class="flex justify-between">
                            <div>
                              <h5 class="font-semibold">Glory International Prim/Sec School</h5>
                              <p class="text-sm text-gray-500">10521 Veterans Ademola way</p>
                              <p class="text-sm text-gray-500">Public school</p>
                            </div>
                            <span class="text-sm text-gray-500">20 min drive</span>
                          </div>
              
                          <div class="flex justify-between">
                            <div>
                              <h5 class="font-semibold">Glory International Prim/Sec School</h5>
                              <p class="text-sm text-gray-500">10521 Veterans Ademola way</p>
                              <p class="text-sm text-gray-500">Public school</p>
                            </div>
                            <span class="text-sm text-gray-500">20 min drive</span>
                          </div>
                        </div>
                      </div>
                    </div>
              
                  </div>
                </div>
              </template>
              
          
              <!-- Bottom Action Buttons -->
              <div class="mt-8 grid grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
                <!-- Button 1: Reschedule Tour -->
                <button class="flex flex-col items-center p-4 bg-white">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#292929"/>
                        <path d="M13.666 20.1626C13.666 17.2578 13.666 15.8053 14.5008 14.9029C15.3355 14.0005 16.679 14.0005 19.366 14.0005H20.6327C23.3197 14.0005 24.6632 14.0005 25.4979 14.9029C26.3327 15.8053 26.3327 17.2578 26.3327 20.1626V20.505C26.3327 23.4099 26.3327 24.8623 25.4979 25.7648C24.6632 26.6672 23.3197 26.6672 20.6327 26.6672H19.366C16.679 26.6672 15.3355 26.6672 14.5008 25.7648C13.666 24.8623 13.666 23.4099 13.666 20.505V20.1626Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 17.3335H26" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.333 17.3335H25.6663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.9977 20.667H20.0037M19.9977 23.3337H20.0037M22.6613 20.667H22.6673M17.334 20.667H17.34M17.334 23.3337H17.34" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M24.001 13.333V14.6663M16.001 13.333V14.6663" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
                  <span class="mt-2 text-sm font-medium text-gray-600">Reschedule Tour</span>
                </button>
                
                <!-- Button 2: Apply -->
                <button class="flex flex-col items-center p-4 ">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#292929"/>
                        <path d="M26.0311 14.0356C24.5791 12.4719 13.657 16.3025 13.666 17.701C13.6762 19.2869 17.9314 19.7748 19.1108 20.1057C19.8201 20.3047 20.01 20.5087 20.1735 21.2524C20.9142 24.6207 21.2861 26.296 22.1336 26.3334C23.4845 26.3931 27.4482 15.5617 26.0311 14.0356Z" stroke="white" stroke-width="1.5"/>
                        <path d="M19.666 20.3333L21.9993 18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
                  <span class="mt-2 text-sm font-medium">Apply</span>
                </button>
                
                <!-- Button 3: Sign Agreement -->
                <button class="flex flex-col items-center p-4 ">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#292929"/>
                        <path d="M22.8101 15.3221L23.7445 14.3876C24.2607 13.8715 25.0975 13.8715 25.6136 14.3876C26.1297 14.9037 26.1297 15.7405 25.6136 16.2566L24.6791 17.1911M22.8101 15.3221L19.3208 18.8114C18.6239 19.5082 18.2755 19.8566 18.0382 20.2812C17.801 20.7058 17.5623 21.7084 17.334 22.6672C18.2927 22.4389 19.2953 22.2002 19.7199 21.9629C20.1445 21.7256 20.4929 21.3772 21.1898 20.6804L24.6791 17.1911M22.8101 15.3221L24.6791 17.1911" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M26 20.0005C26 22.8289 26 24.2432 25.1213 25.1218C24.2427 26.0005 22.8284 26.0005 20 26.0005C17.1716 26.0005 15.7574 26.0005 14.8787 25.1218C14 24.2432 14 22.8289 14 20.0005C14 17.1721 14 15.7578 14.8787 14.8792C15.7574 14.0005 17.1716 14.0005 20 14.0005" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                        
                        
                  <span class="mt-2 text-sm font-medium">Sign agreement</span>
                </button>
                
                <!-- Button 4: Make Payment -->
                <button class="flex flex-col items-center p-4 ">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="40" height="40" rx="8" fill="#292929"/>
                        <path d="M21.6663 20.0002C21.6663 20.9206 20.9201 21.6668 19.9997 21.6668C19.0792 21.6668 18.333 20.9206 18.333 20.0002C18.333 19.0797 19.0792 18.3335 19.9997 18.3335C20.9201 18.3335 21.6663 19.0797 21.6663 20.0002Z" stroke="white" stroke-width="1.5"/>
                        <path d="M24.6673 19.4281C24.4506 19.3967 24.228 19.3729 24.0007 19.3569M16.0007 20.644C15.7733 20.6281 15.5507 20.6042 15.334 20.5728" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.9997 25.0002C19.1113 25.4151 17.9444 25.6668 16.6663 25.6668C15.9557 25.6668 15.2795 25.589 14.6663 25.4486C13.6661 25.2194 13.333 24.6178 13.333 23.5908V16.4095C13.333 15.7529 14.0264 15.302 14.6663 15.4486C15.2795 15.589 15.9557 15.6668 16.6663 15.6668C17.9444 15.6668 19.1113 15.4151 19.9997 15.0002C20.888 14.5853 22.0549 14.3335 23.333 14.3335C24.0436 14.3335 24.7199 14.4113 25.333 14.5518C26.3875 14.7933 26.6663 15.4137 26.6663 16.4095V23.5908C26.6663 24.2474 25.973 24.6984 25.333 24.5518C24.7199 24.4113 24.0436 24.3335 23.333 24.3335C22.0549 24.3335 20.888 24.5852 19.9997 25.0002Z" stroke="white" stroke-width="1.5"/>
                        </svg>
                        
                  <span class="mt-2 text-sm font-medium">Make payment</span>
                </button>
              </div>
            </div>
          
    <div class="container mx-auto p-8">
      <!-- Header Image and Progress -->
      <section class="relative">
        <img :src="property.image" class="w-full h-[500px] object-cover rounded-lg" alt="Property Image" />
        <div class="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-4 flex justify-center">
          <div class="flex space-x-8">
            <div v-for="step in progressSteps" :key="step.id" class="text-center">
              <span :class="['w-8 h-8 flex items-center justify-center rounded-full border', step.completed ? 'border-green-500' : 'border-gray-400']">{{ step.id }}</span>
              <p>{{ step.label }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Property Information -->
      <section class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Property Description and Tabs -->
        <div class="lg:col-span-2">
          <h1 class="text-2xl font-semibold">{{ property.name }}</h1>
          <p class="text-gray-600 mb-4">{{ property.address }}</p>
  
          <!-- Tabs -->
          <div class="flex space-x-4 border-b border-gray-200 mb-6">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="setActiveTab(tab)"
              :class="['pb-2 border-b-2', activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-500']"
              class="text-lg"
            >
              {{ tab }}
            </button>
          </div>
  
          <!-- Tab Content -->
          <div v-if="activeTab === 'Property Overview'" class="space-y-6">
            <p class="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ultricies auctor turpis eget laoreet.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Property Size:</strong> 18632 sqft</p>
                <p><strong>Number of Bedrooms:</strong> 5</p>
                <p><strong>Flooring Type:</strong> Tiles</p>
              </div>
              <div>
                <p><strong>Number of Bathrooms:</strong> 6</p>
                <p><strong>Architecture:</strong> Apartment</p>
                <p><strong>Available Rooms:</strong> 3</p>
              </div>
            </div>
          </div>
  
          <!-- Add other Tab Content for Rooms, Common Areas -->
        </div>
  
        <!-- Manager and Amenities -->
        <aside class="space-y-6">
          <div class="p-6 border border-gray-200 rounded-lg">
            <div class="flex items-center space-x-4">
              <img src="https://example.com/manager-profile.jpg" class="w-12 h-12 rounded-full" alt="Manager" />
              <div>
                <h4 class="font-semibold">Joy Adetunji</h4>
                <p class="text-sm text-gray-500">Property Manager</p>
              </div>
            </div>
            <button class="mt-4 w-full bg-black text-white py-2 rounded-md">
              Send Application
            </button>
          </div>
  
          <!-- Neighborhood Amenities -->
          <div class="p-6 border border-gray-200 rounded-lg">
            <h4 class="font-semibold mb-4">Neighborhood Amenities</h4>
            <div class="flex space-x-4">
              <button
                v-for="amenity in amenities"
                :key="amenity"
                @click="setActiveAmenity(amenity)"
                :class="['px-4 py-2 rounded-full border', activeAmenity === amenity ? 'border-black bg-gray-100' : 'border-gray-300']"
              >
                {{ formatAmenities(amenity) }}
              </button>
            </div>
  
            <div v-if="activeAmenity === 'Hospital'" class="mt-4 space-y-4">
              <div v-for="hospital in hospitals" :key="hospital.id" class="flex items-start justify-between">
                <div>
                  <p class="font-semibold">{{ hospital.name }}</p>
                  <p class="text-sm text-gray-500">{{ hospital.address }}</p>
                </div>
                <span class="text-sm text-gray-500">{{ hospital.driveTime }}</span>
              </div>
            </div>
            <!-- Add Similar Conditions for Schools, Shopping -->
          </div>
        </aside>
      </section>
  
      <!-- Similar Properties Section -->
      <section class="mt-12">
        <h4 class="text-xl font-semibold mb-6">Similar Properties</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="similar in similarProperties"
            :key="similar.id"
            class="p-4 border border-gray-200 rounded-lg"
          >
            <img :src="similar.image" class="w-full h-40 object-cover rounded-lg" alt="Similar Property" />
            <h5 class="mt-4 text-lg font-semibold">{{ similar.name }}</h5>
            <p class="text-sm text-gray-500">{{ similar.address }}</p>
          </div>
        </div>
      </section>
  
      <!-- Bottom Buttons -->
      <div class="fixed bottom-0 w-full bg-white p-4 flex justify-around">
        <button class="flex flex-col items-center text-gray-600">
          <i class="icon-calendar mb-2"></i>
          Reschedule Tour
        </button>
        <button class="flex flex-col items-center text-black">
          <i class="icon-apply mb-2"></i>
          Apply
        </button>
        <button class="flex flex-col items-center text-gray-400" disabled>
          <i class="icon-agreement mb-2"></i>
          Sign Agreement
        </button>
        <button class="flex flex-col items-center text-gray-400" disabled>
          <i class="icon-payment mb-2"></i>
          Make Payment
        </button>
      </div>
    </div>
    </main>
  </template>
  
  <script setup lang="ts">
import { ref } from 'vue';
import { formatAmenities } from '~/composables/core/useFormatAmenities';

const property = ref({
  name: 'Jason Gardens',
  address: 'Iconic Tower, off Ajose Adeogun VI, Lagos',
  image: 'https://example.com/property.jpg',
});

const progressSteps = ref([
  { id: 1, label: 'Tour Schedule', completed: true },
  { id: 2, label: 'Application sent', completed: true },
  { id: 3, label: 'Agreement signed', completed: false },
  { id: 4, label: 'Payment made', completed: false },
]);

const tabs = ref(['Property Overview', 'Common areas', 'Room 1', 'Room 2']);
const activeTab = ref('Property Overview');
const setActiveTab = (tab: string) => {
  activeTab.value = tab;
};

const amenities = ref(['Hospital', 'Schools', 'Market/Shopping Plaza', 'Police Station']);
const activeAmenity = ref('Hospital');
const setActiveAmenity = (amenity: string) => {
  activeAmenity.value = amenity;
};

const hospitals = ref([
  { id: 1, name: 'Glory International Prim/Sec School', address: '10521 Veterans Ademola Way', driveTime: '20 min drive' },
  { id: 2, name: 'City Hospital', address: 'Veterans Avenue, Lagos', driveTime: '25 min drive' },
]);

const similarProperties = ref([
  { id: 1, name: 'Greenwood Estate', address: 'Lekki Phase 1, Lagos', image: 'https://example.com/similar1.jpg' },
  { id: 2, name: 'Silver Heights', address: 'Victoria Island, Lagos', image: 'https://example.com/similar2.jpg' },
  { id: 3, name: 'Sunny Gardens', address: 'Ajah, Lagos', image: 'https://example.com/similar3.jpg' },
  { id: 4, name: 'Pinewood', address: 'Ikeja, Lagos', image: 'https://example.com/similar4.jpg' },
]);
</script>
