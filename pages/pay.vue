<!-- <template>
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Purchase Item</h2>
      

      <div class="mb-6">
        <p class="text-gray-600">Item: <span class="font-semibold">Sample Item</span></p>
        <p class="text-gray-600">Price: <span class="font-semibold">₦5000</span></p>
      </div>
      

      <button
        @click="makePayment"
        class="px-4 py-2 bg-blue-600 text-white bg-black rounded-md hover:bg-blue-700 focus:outline-none"
      >
        Pay with Interswitch
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  
  const router = useRouter();
  const amount = ref(5000); // Amount in kobo, so ₦5000 is 500000 kobo
  
  // Function to initiate the payment
  const makePayment = () => {
    if (typeof window.InlineCheckout === 'undefined') {
      alert('Interswitch Inline Checkout is not loaded');
      return;
    }

    function randomReference() {
    const length = 10
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }

  const transRef = randomReference()
  
    const paymentOptions = {
      amount: amount.value, // amount in kobo
      currency: "NGN", // Currency
      email: "customer@example.com", // Customer email
      phone: "08012345678", // Customer phone number
      ref: transRef, // Unique transaction reference
      merchantCode: 'MX19329', // Your Interswitch merchant code
      redirectUrl: `${window.location.origin}/payment-success`, // Redirect URL after payment success
      onComplete: function(response) {
        console.log("Payment response:", response);
        // Redirect to a success page or handle response as needed
        if (response.status === 'SUCCESSFUL') {
          router.push('/payment-success');
        } else {
          alert('Payment was not successful');
        }
      },
      onClose: function() {
        alert('Payment window closed');
      }
    };
  
    // Open the Interswitch Inline Checkout
    window.InlineCheckout.open(paymentOptions);
  };
  </script>
  
  <style scoped>
  /* Add any additional custom styles here */
  </style>
   -->

   <template>
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Purchase Item</h2>
      
      <div class="mb-6">
        <p class="text-gray-600">Item: <span class="font-semibold">Sample Item</span></p>
        <p class="text-gray-600">Price: <span class="font-semibold">₦5000</span></p>
      </div>
      
      <button
        @click="handlePayment"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        :disabled="!isScriptLoaded"
      >
        Pay with Interswitch
      </button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { useInterswitchLoader } from '@/composables/useInterswitchLoader';
  
  const router = useRouter();
  const amount = ref(5000);
  const { isScriptLoaded, loadScript } = useInterswitchLoader();
  
  // Function to initiate payment
  const makePayment = () => {
    const paymentOptions = {
      amount: amount.value,
      currency: 'NGN',
      email: 'customer@example.com',
      phone: '08012345678',
      ref: `unique-ref-${Date.now()}`, // Unique transaction reference
      merchantCode: 'YOUR_MERCHANT_CODE', // Replace with your actual merchant code
      redirectUrl: `${window.location.origin}/payment-success`,
      onComplete: (response: any) => {
        console.log('Payment response:', response);
        if (response.status === 'SUCCESSFUL') {
          router.push('/payment-success');
        } else {
          alert('Payment was not successful');
        }
      },
      onClose: () => alert('Payment window closed'),
    };
  
    window.InlineCheckout.open(paymentOptions);
  };
  
  // Load the script when the component mounts
  onMounted(async () => {
    try {
      await loadScript();
      console.log('Interswitch script loaded successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to load Interswitch payment script');
    }
  });
  
  // Handle payment button click
//   const handlePayment = () => {
//     if (isScriptLoaded.value) {
//       makePayment();
//     } else {
//       alert('Payment script not loaded yet. Please try again later.');
//     }
//   };


// const isScriptLoaded = ref(false);

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://newwebpay.qa.interswitchng.com/inline-checkout.js';
  script.onload = () => {
    isScriptLoaded.value = true;
  };
  script.onerror = () => console.error('Failed to load Interswitch checkout script');
  document.head.appendChild(script);
});

const handlePayment = () => {
  if (!isScriptLoaded.value) {
    alert('Payment script not loaded yet. Please try again later.');
    return;
  }

  // Your payment initiation code here
};

  </script>
  
  <style scoped>
  /* Additional custom styles if needed */
  </style>
  