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


import { rental_api } from "@/api_factory/modules/rental";
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useCheckout } from "@/composables/modules/banks/useCheckout";
import { useUser } from "@/composables/auth/user";
import { ref, computed } from "vue";

export const useInitializeRentPayment = () => {
  const { user } = useUser();
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const payload = ref({
    rentalApplicationId: "",
    rentAmount: "",
  });
  const responseObj = ref({});
  
  const cust_id = computed(() => user.value?.email || "");
  const amount = computed(() => payload.value?.rentAmount || 0);
  const currency = computed(() => "566");
  const transRef = ref(""); // Will be updated after the API call

  const { checkout, paymentResponse } = useCheckout({
    amount,
    cust_id,
    currency,
    transRef: computed(() => transRef.value),
  });

  const initializeRentPayment = async () => {
    loading.value = true;
    try {
      const res = (await rental_api.$_initialize_rent_payment(payload.value)) as any;
  
      if (res.type !== "ERROR" && typeof res.data?.trxReference === 'string' && res.data.trxReference.trim() !== '') {
        transRef.value = res?.data?.trxReference; // Set the transRef from the API response
  
        showToast({
          title: "Success",
          message: "Rent payment was successfully initialized",
          toastType: "success",
          duration: 3000,
        });
  
        await checkout(); 
        responseObj.value = res.data;
  
        // Uncomment this line if you want to redirect after successful payment
        // router.push(`/dashboard/listings/${rentalObj.value.id}/rental-applications/payment-success`);
      } else {
        const errorMessage = res.data?.error || "Transaction reference is invalid.";
        console.error("API Error:", errorMessage);
        showToast({
          title: "Error",
          message: errorMessage,
          toastType: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error initializing rent payment:", error);
      showToast({
        title: "Error",
        message: "Something went wrong. Please try again.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
  };
  

  // const initializeRentPayment = async () => {
  //   loading.value = true;
  //   try {
  //     const res = (await rental_api.$_initialize_rent_payment(payload.value)) as any;
  //     console.log(res, "bank accounts here");
  
  //     if (res.type !== "ERROR" && res.data?.trxReference) {
  //       transRef.value = `${res.data.trxReference}`; // Set the transRef from the API response
  
  //       showToast({
  //         title: "Success",
  //         message: "Rent payment was successfully initialized",
  //         toastType: "success",
  //         duration: 3000,
  //       });
  
  //       await checkout(); // Call the checkout functionality
  //       responseObj.value = res.data;
  
  //       // Uncomment this line if you want to redirect after successful payment
  //       // router.push(`/dashboard/listings/${rentalObj.value.id}/rental-applications/payment-success`);
  //     } else {
  //       const errorMessage = res.data?.error || "An error occurred during payment initialization.";
  //       console.error("API Error:", errorMessage);
  //       showToast({
  //         title: "Error",
  //         message: errorMessage,
  //         toastType: "error",
  //         duration: 3000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error initializing rent payment:", error);
  //     showToast({
  //       title: "Error",
  //       message: "Something went wrong. Please try again.",
  //       toastType: "error",
  //       duration: 3000,
  //     });
  //   } finally {
  //     loading.value = false;
  //   }
  // };
  

  // const initializeRentPayment = async () => {
  //   loading.value = true;
  //   try {
  //     const res = (await rental_api.$_initialize_rent_payment(payload.value)) as any;
  //     console.log(res, "bank accounts here");

  //     if (res.type !== "ERROR") {
  //       transRef.value = res.data.trxReference; // Set the transRef from the API response

  //       showToast({
  //         title: "Success",
  //         message: "Rent payment was successfully initialized",
  //         toastType: "success",
  //         duration: 3000,
  //       });

  //       await checkout(); // Call the checkout functionality
  //       responseObj.value = res.data;

  //       // Uncomment this line if you want to redirect after successful payment
  //       // router.push(`/dashboard/listings/${rentalObj.value.id}/rental-applications/payment-success`);
  //     } else {
  //       showToast({
  //         title: "Error",
  //         message: res.data.error || "An error occurred during payment initialization.",
  //         toastType: "error",
  //         duration: 3000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error initializing rent payment:", error);
  //     showToast({
  //       title: "Error",
  //       message: "Something went wrong. Please try again.",
  //       toastType: "error",
  //       duration: 3000,
  //     });
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  const setPayloadObj = (data: any) => {
    payload.value.rentAmount = data.rentAmount;
    payload.value.rentalApplicationId = data.rentalApplicationId;
  };

  return { initializeRentPayment, loading, payload, responseObj, setPayloadObj };
};
