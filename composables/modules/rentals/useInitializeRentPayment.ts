// import { rental_api } from "@/api_factory/modules/rental";
// import { useCustomToast } from '@/composables/core/useCustomToast'
// import { useGetRental } from "@/composables/modules/rentals/useFetchRental";
// import { useCheckout } from "@/composables/modules/banks/useCheckout";
// import { useUser } from "@/composables/auth/user";
// const { loadingRental, rentalObj } = useGetRental();
// const { user } = useUser()
// const { showToast } = useCustomToast();
// const loading = ref(false);
// const payload = ref({
//   rentalApplicationId: "",
//   rentAmount: '',
// });

// const router = useRouter()

// const responseObj = ref({})

// const cust_id = ref(user.value.email || '');
// const amount = ref(payload.value?.rentAmount || 0);
// const currency = ref('566');

// const { checkout, paymentResponse } = useCheckout({
//   amount: computed(() => amount.value),
//   cust_id: computed(() => cust_id.value),
//   currency: computed(() => currency.value),
//   transRef: 
// });

// export const useInitializeRentPayment = () => {
//   const initializeRentPayment = async () => {
//     loading.value = true;
//     const res = (await rental_api.$_initialize_rent_payment(payload.value)) as any;
//     console.log(res, "bank accounts here");
//     if (res.type !== "ERROR") {
// 		showToast({
// 			title: "Success",
// 			message: "Rent payment was successfully successfully",
// 			toastType: "success",
// 			duration: 3000
// 		  });
//       checkout()
//       responseObj.value = res.data

//       // router.push(`/dashboard/listings/${rentalObj.value.id}/rental-applications/payment-success`);
//     } else {
//       showToast({
//         title: "Error",
//         message: res.data.error,
//         toastType: "error",
//         duration: 3000
//         });
//     }
//     loading.value = false;
//   };

//   const setPayloadObj = (data: any) => {
//     payload.value.rentAmount = data.rentAmount
//     payload.value.rentalApplicationId = data.rentalApplicationId
//   }

//   return { initializeRentPayment, loading, payload, responseObj,  setPayloadObj  };
// };


// import { rental_api } from "@/api_factory/modules/rental";
// import { useCustomToast } from '@/composables/core/useCustomToast'
// import { useCheckout } from "@/composables/modules/banks/useCheckout";
// import { useUser } from "@/composables/auth/user";
// import { ref, computed } from "vue";

// export const useInitializeRentPayment = () => {
//   const { user } = useUser();
//   const { showToast } = useCustomToast();
//   const loading = ref(false);
//   const payload = ref({
//     rentalApplicationId: "",
//     rentAmount: "",
//   });
//   const responseObj = ref({});
  
//   const cust_id = computed(() => user.value?.email || "");
//   const amount = computed(() => payload.value?.rentAmount || 0);
//   const currency = computed(() => "566");
//   const transRef = ref(""); // Will be updated after the API call


//   const initializeRentPayment = async () => {
//     loading.value = true;

//     const { checkout, paymentResponse } = useCheckout({
//       amount,
//       cust_id,
//       currency,
//       transRef: computed(() => transRef.value),
//     });

//     try {
//       const res = (await rental_api.$_initialize_rent_payment(payload.value)) as any;
  
//       if (res.type !== "ERROR" && typeof res.data?.trxReference === 'string' && res.data.trxReference.trim() !== '') {
//         transRef.value = res?.data?.trxReference; // Set the transRef from the API response
//         console.log(res?.data, 'here ooooo')
  
//         showToast({
//           title: "Success",
//           message: "Rent payment was successfully initialized",
//           toastType: "success",
//           duration: 3000,
//         });
  
//         await checkout(); 
//         // responseObj.value = res.data;
  
//         // Uncomment this line if you want to redirect after successful payment
//         // router.push(`/dashboard/listings/${rentalObj.value.id}/rental-applications/payment-success`);
//       } else {
//         const errorMessage = res.data?.error || "Transaction reference is invalid.";
//         console.error("API Error:", errorMessage);
//         showToast({
//           title: "Error",
//           message: errorMessage,
//           toastType: "error",
//           duration: 3000,
//         });
//       }
//     } catch (error) {
//       console.error("Error initializing rent payment:", error);
//       showToast({
//         title: "Error",
//         message: "Something went wrong. Please try again.",
//         toastType: "error",
//         duration: 3000,
//       });
//     } finally {
//       loading.value = false;
//     }
//   };
  

//   // const initializeRentPayment = async () => {
//   //   loading.value = true;
//   //   try {
//   //     const res = (await rental_api.$_initialize_rent_payment(payload.value)) as any;
//   //     console.log(res, "bank accounts here");
  
//   //     if (res.type !== "ERROR" && res.data?.trxReference) {
//   //       transRef.value = `${res.data.trxReference}`; // Set the transRef from the API response
  
//   //       showToast({
//   //         title: "Success",
//   //         message: "Rent payment was successfully initialized",
//   //         toastType: "success",
//   //         duration: 3000,
//   //       });
  
//   //       await checkout(); // Call the checkout functionality
//   //       responseObj.value = res.data;
  
//   //       // Uncomment this line if you want to redirect after successful payment
//   //       // router.push(`/dashboard/listings/${rentalObj.value.id}/rental-applications/payment-success`);
//   //     } else {
//   //       const errorMessage = res.data?.error || "An error occurred during payment initialization.";
//   //       console.error("API Error:", errorMessage);
//   //       showToast({
//   //         title: "Error",
//   //         message: errorMessage,
//   //         toastType: "error",
//   //         duration: 3000,
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("Error initializing rent payment:", error);
//   //     showToast({
//   //       title: "Error",
//   //       message: "Something went wrong. Please try again.",
//   //       toastType: "error",
//   //       duration: 3000,
//   //     });
//   //   } finally {
//   //     loading.value = false;
//   //   }
//   // };
  

//   // const initializeRentPayment = async () => {
//   //   loading.value = true;
//   //   try {
//   //     const res = (await rental_api.$_initialize_rent_payment(payload.value)) as any;
//   //     console.log(res, "bank accounts here");

//   //     if (res.type !== "ERROR") {
//   //       transRef.value = res.data.trxReference; // Set the transRef from the API response

//   //       showToast({
//   //         title: "Success",
//   //         message: "Rent payment was successfully initialized",
//   //         toastType: "success",
//   //         duration: 3000,
//   //       });

//   //       await checkout(); // Call the checkout functionality
//   //       responseObj.value = res.data;

//   //       // Uncomment this line if you want to redirect after successful payment
//   //       // router.push(`/dashboard/listings/${rentalObj.value.id}/rental-applications/payment-success`);
//   //     } else {
//   //       showToast({
//   //         title: "Error",
//   //         message: res.data.error || "An error occurred during payment initialization.",
//   //         toastType: "error",
//   //         duration: 3000,
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("Error initializing rent payment:", error);
//   //     showToast({
//   //       title: "Error",
//   //       message: "Something went wrong. Please try again.",
//   //       toastType: "error",
//   //       duration: 3000,
//   //     });
//   //   } finally {
//   //     loading.value = false;
//   //   }
//   // };

//   const setPayloadObj = (data: any) => {
//     payload.value.rentAmount = data.rentAmount;
//     payload.value.rentalApplicationId = data.rentalApplicationId;
//   };

//   return { initializeRentPayment, loading, payload, responseObj, setPayloadObj };
// };

import { rental_api } from "@/api_factory/modules/rental";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useCheckout } from "@/composables/modules/banks/useCheckout";
import { useUser } from "@/composables/auth/user";
import { ref, computed } from "vue";

export const useInitializeRentPayment = () => {
  const { user } = useUser();
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const router = useRouter()
  const route = useRoute()
  const payload = ref({
    rentalApplicationId: "",
    rentAmount: "",
  });
  const responseObj = ref({});

  // Reactive references for checkout parameters
  const cust_id = computed(() => user.value?.email || "");
  const amount =  ref("");
  const currency = computed(() => "566");
  const transRef = ref(""); // Transaction reference from the API response

  // Pass transRef directly to useCheckout
  const { checkout, paymentResponse } = useCheckout({
    amount,
    cust_id,
    currency,
    transRef, // Pass transRef directly
  });

  const initializeRentPayment = async () => {
    loading.value = true;

    try {
      // Call the API to initialize rent payment
      const res = (await rental_api.$_initialize_rent_payment(payload.value)) as any;

      console.log(res, "API Response");
      loading.value = false;
      if (
        res.type !== "ERROR" &&
        typeof res.data?.trxReference === "string" &&
        res.data.trxReference.trim() !== ""
      ) {
        // Set the transaction reference
        transRef.value = res.data.trxReference;
        amount.value = res.data.amountSubUnit;
        loading.value = false;

        console.log(res?.data, "Transaction initialized successfully");

        // Show success toast
        // showToast({
        //   title: "Success",
        //   message: "Rent payment was successfully initialized",
        //   toastType: "success",
        //   duration: 3000,
        // });

        // Proceed to checkout
        await checkout();

        // Update the response object for further use
        responseObj.value = res.data;
        router.push(`/dashboard/listings/${route.query.rentalId}/rental-applications/payment-success`);

        // Uncomment if redirection is required
      } else {
        const errorMessage = res.data?.error || "Transaction reference is invalid.";
        console.error("API Error:", errorMessage);

        // Show error toast
        showToast({
          title: "Error",
          message: errorMessage,
          toastType: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error initializing rent payment:", error);

      // Show generic error toast
      showToast({
        title: "Error",
        message: "Something went wrong. Please try again.",
        toastType: "error",
        duration: 3000,
      });
      loading.value = false;
    } finally {
      // Reset the loading state
      loading.value = false;
    }
  };

  // Function to set payload dynamically
  const setPayloadObj = (data: any) => {
    payload.value.rentAmount = data.rentAmount;
    payload.value.rentalApplicationId = data.rentalApplicationId;
  };

  return { initializeRentPayment, loading, payload, responseObj, setPayloadObj };
};
