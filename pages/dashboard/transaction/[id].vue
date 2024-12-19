<template>
    <TopNavBar />
    <section>
      <div v-if="transactionObj?.transactionType !== 'RENT'" class="max-w-2xl mx-auto px-4 py-6">
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center space-x-2 mb-8">
        <button @click="router.back()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <span>Dashboard</span>
          <span>|</span>
          <span>Upcoming activities</span>
          <span>|</span>
          <span class="font-medium text-gray-900">Plumbing maintenance</span>
        </div>
      </nav>
  
      <!-- Main Content -->
      <div class="bg-white rounded-lg space-y-2">
        <!-- Header -->
        <div class="flex justify-between items-center px-6 border-[0.5px] py-3 border-gray-100 rounded-lg">
          <h1 class="text-sm font-semibold">Request Details</h1>
          <span class="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
            Upcoming
          </span>
        </div>
  
        <!-- Details Grid -->
        <div class="space-y-3">
          <section class="space-y-4 border-[0.5px] border-gray-100 rounded-lg p-3">
            <div class="flex justify-between items-center">
              <div class="text-sm text-[#667185]">Service assigned to</div>
              <div class="text-sm text-[#1D2739]">{{ requestData.assignedTo }}</div>
            </div>
  
            <div class="flex justify-between items-center">
            <div class="text-sm text-[#667185]">Service date</div>
              <div class="text-sm text-[#1D2739]">{{ requestData.serviceDate }}</div>
            </div>
            
            <div class="flex justify-between items-center">
              <div class="text-sm text-[#667185]">Time</div>
              <div class="text-sm text-[#1D2739]">{{ requestData.time }}</div>
            </div>
          </section>
  
          <section class="space-y-4 border-[0.5px] border-gray-100 rounded-lg p-3">
            <div class="flex justify-between items-center">
              <div class="text-sm text-[#667185]">Maintenance type</div>
              <div class="text-sm text-[#1D2739]">{{ requestData.maintenanceType }}</div>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-sm text-[#667185]">Rent Amount</div>
              <div class="text-sm text-[#1D2739]">{{ requestData.rentAmount }}</div>
            </div>
          <div>
            <div class="text-sm text-gray-600 mb-2">Description</div>
            <p class="text-gray-800 text-[#1D2739] text-sm">{{ requestData.description }}</p>
          </div>
        </section>
  
          <!-- Images -->
          <div class="border-[0.5px] border-gray-100 rounded-lg p-3">
            <div class="text-sm text-gray-600 mb-4">Images</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <img 
                v-for="(image, index) in requestData.images" 
                :key="index"
                :src="image"
                :alt="`Plumbing maintenance image ${index + 1}`"
                class="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>


    <div v-if="transactionObj?.transactionType === 'RENT'" class="">
      <!-- {{ transactionObj  }} -->
    <nav class="flex items-center space-x-2 mb- max-w-2xl mx-auto my-4">
        <button @click="router.back()" class="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <div class="flex items-center space-x-2 text-sm text-gray-600">
          <span>Dashboard</span>
          <span>|</span>
          <span>Recent transactions</span>
          <span>|</span>
          <span class="font-medium text-gray-900">Rent payment</span>
        </div>
      </nav>

    <!-- Main Content -->
    <div class="max-w-2xl mx-auto">
      <!-- Rent Details Section -->
     <section>
      <h2 class="text-sm  font-medium py-3 bg-white rounded-lg border-[0.5px] border-gray-100 px-3 mb-3">Rent Details</h2>
      
      <div class="space-y-4 bg-white rounded-lg p-4 border-[0.5px] border-gray-100">
        <!-- Property Details -->
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Property Name</p>
            <p class="text-sm text-[#1D2739]">{{  transactionObj?.rentPayment?.house?.name ?? 'Nil' }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Address</p>
            <p class="text-sm text-[#1D2739]">{{ transactionObj?.rentPayment?.house?.address ?? 'Nil' }}</p>
          </div>
     

        <!-- Rent Information -->
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Rent Amount</p>
            <p class="text-sm text-[#1D2739]">{{ transactionObj?.amount ?? 'Nil' }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Rent tenure</p>
            <p class="text-sm text-[#1D2739]">{{ transactionObj?.rentPayment?.rentFrequency ?? 'Nil' }}</p>
          </div>

        <!-- Dates -->
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Start Date</p>
            <p class="text-sm text-[#1D2739]">{{ transactionObj?.rentPayment?.paymentDate ?? 'Nil' }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">End Date</p>
            <p class="text-sm text-[#1D2739]">{{ transactionObj?.rentPayment?.dueDate ?? 'Nil' }}</p>
          </div>
      </div>
     </section>

      <!-- Transaction Details Section -->
    <section>
      <h2 class="text-sm  font-medium py-3 bg-white rounded-lg border-[0.5px] border-gray-100 px-3 mt-8 mb-3">Transaction Details</h2>
      
      <div class="space-y-4 bg-white rounded-lg p-4 border-[0.5px] border-gray-100">
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Amount</p>
            <p class="text-sm text-[#1D2739]">{{ transactionObj?.amount ?? 'Nil' }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Ref Number</p>
            <p class="text-sm text-[#1D2739]">{{ transactionObj?.rentPayment?.trxReference }}</p>
          </div>



          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Payment method</p>
            <p class="text-sm text-[#1D2739]">{{ rentPaymentDetails.paymentMethod }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Date</p>
            <p class="text-sm text-[#1D2739]">{{ rentPaymentDetails.date }}</p>
          </div>



          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Time</p>
            <p class="text-sm text-[#1D2739]">{{ rentPaymentDetails.time }}</p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-[#667185]">Status</p>
            <p class="inline-block px-3 py-1 bg-green-50 text-green-600 rounded-full">
              {{ rentPaymentDetails.status }}
            </p>
          </div>
   
      </div>
    </section>
    </div>
  </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { useFetchTransaction } from '@/composables/modules/transaction/useFetchTransaction'
  const { loading, transactionObj } = useFetchTransaction()
  import image1 from '@/assets/img/gallery1.png'
  interface MaintenanceRequest {
    assignedTo: string;
    serviceDate: string;
    time: string;
    maintenanceType: string;
    rentAmount: string;
    description: string;
    images: string[];
  }
  
  const requestData = ref<MaintenanceRequest>({
    assignedTo: "Anthony Jerry",
    serviceDate: "12/12/2024",
    time: "10:30 AM",
    maintenanceType: "Plumbing service",
    rentAmount: "High",
    description: "Lorem ipsum dolor sit amet consectetur. Pellentesque aliquam volutpat suspendisse neque. Tristique diam semper vitae egestas ac maecenas cursus. Dictumst viverra amet felis purus consectetur molestie ut. Egestas aenean est nibh suspendisse sagittis viverra et.",
    images: [
    image1,image1,
    image1
    ]
  });
  
  const router = useRouter()



  // Types for the rent payment details
interface RentPayment {
  propertyName: string;
  address: string;
  rentAmount: string;
  rentTenure: string;
  startDate: string;
  endDate: string;
  amount: string;
  refNumber: string;
  paymentMethod: string;
  date: string;
  time: string;
  status: string;
}

// Sample data object
const rentPaymentDetails: RentPayment = {
  propertyName: "Jason C0-living Space",
  address: "",
  rentAmount: "NGN 800,000.00",
  rentTenure: "365 days",
  startDate: "31/12/2023",
  endDate: "31/12/2024",
  amount: "NGN 800,000.00",
  refNumber: "639854089636237690",
  paymentMethod: "Card",
  date: "12/12/2024",
  time: "10:30 AM",
  status: "Success"
};
  </script>
  



