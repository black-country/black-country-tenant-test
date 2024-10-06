<template>
<main>
    <div class="min-h-screen  max-w-4xl mx-auto">
        <div class="bg-white shadow-lg rounded-lg p-8">
          <h2 class="text-2xl font-bold">Lease Agreement</h2>
          <p class="text-gray-500">This is a legally binding agreement. If not understood, consult an Attorney.</p>
    
          <div class="mt-6 space-y-4">
            <!-- Full Lease Agreement Content -->
            <section>
              <h3 class="font-bold">1. Parties</h3>
              <p>This Lease Agreement is entered into on 08/04/2024 between:</p>
              <ul>
                <li><strong>Nwachukwu Jacob</strong>, hereinafter referred to as the "Property Manager"</li>
                <li><strong>Ada Dennis</strong>, hereinafter referred to as the "Tenant"</li>
              </ul>
            </section>
    
            <section>
              <h3 class="font-bold">2. Property</h3>
              <p>The Landlord agrees to lease to the Tenant, and the Tenant agrees to rent from the Landlord, located at:</p>
              <p>………………………………</p>
            </section>
    
            <section>
              <h3 class="font-bold">3. Terms of Lease</h3>
              <p>The lease shall commence on [Start Date] and continue until [End Date], unless terminated earlier as provided in this agreement.</p>
            </section>
    
            <section>
              <h3 class="font-bold">4. Rent and Payments</h3>
              <ul>
                <li>The Tenant agrees to pay rent in the amount of [Monthly Rent] per month, due on the [Day of the Month] of each month.</li>
                <li>Rent payments shall be made by [Accepted Payment Method], to be delivered to the Landlord or as directed by the Landlord.</li>
              </ul>
            </section>
    
            <section>
              <h3 class="font-bold">5. Security Deposit</h3>
              <ul>
                <li>The Tenant shall provide a security deposit in the amount of [Security Deposit Amount] upon execution of this agreement.</li>
                <li>The security deposit shall be held by the Landlord as security for the performance of the Tenant's obligations under this lease.</li>
              </ul>
            </section>
    
            <section>
              <h3 class="font-bold">6. Use of Property</h3>
              <ul>
                <li>The Tenant shall use the property solely for residential purposes and shall not engage in any illegal activities on the premises.</li>
                <li>The Tenant shall comply with all applicable laws, rules, and regulations governing the use of the property.</li>
              </ul>
            </section>
    
            <section>
              <h3 class="font-bold">7. Maintenance and Repairs</h3>
              <ul>
                <li>The Landlord shall be responsible for maintaining the property in good repair, including repairs to the structure, plumbing, heating, and electrical systems.</li>
                <li>The Tenant shall be responsible for maintaining the property in a clean and sanitary condition and promptly reporting any maintenance issues to the Landlord.</li>
              </ul>
            </section>
    
            <section>
              <h3 class="font-bold">8. Termination</h3>
              <ul>
                <li>Either party may terminate this lease agreement by providing [Notice Period] written notice to the other party.</li>
                <li>In the event of termination, the Tenant shall vacate the premises and return possession of the property to the Landlord in the same condition as at the commencement of the lease.</li>
              </ul>
            </section>
          </div>
    
          <footer class="flex justify-between items-center mt-8">
            <button @click="rejectAgreement" class="bg-red-500 text-white px-6 py-3 rounded shadow hover:bg-red-600">
              Reject Agreement
            </button>
            <button @click="openModal" class="bg-green-500 text-white px-6 py-3 rounded shadow hover:bg-green-600">
              Accept & Sign
            </button>
          </footer>
        </div>
    
        <!-- Display Signed Signature -->
        <div v-if="signedSignature" class="mt-6">
          <h4 class="font-bold">Signature:</h4>
          <img :src="signedSignature" alt="Signature" class="mt-2 h-16 border" />
        </div>
    
        <!-- Signature Modal -->
        <SignatureModal v-if="isModalOpen" @close="closeModal" @sign="appendSignature" />
      </div>
      <CoreModal :isOpen="isModalOpen" @close="isModalOpen = false">
          <SignatureComponent class="w-1/2 mx-auto" />
        </CoreModal>
</main>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const isModalOpen = ref(false);
  const signedSignature = ref<string | null>(null);
  
  const openModal = () => {
    isModalOpen.value = true;
  };
  
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  const appendSignature = (signature: string) => {
    signedSignature.value = signature;
    closeModal();
  };
  
  const rejectAgreement = () => {
    console.log('Agreement Rejected');
  };
  </script>
  
  <style scoped>
  /* Additional custom styles */
  </style>
  