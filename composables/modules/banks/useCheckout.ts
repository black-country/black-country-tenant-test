// import { ref } from 'vue'

// const paymentResponse = ref({})

// export function useCheckout({ amount, cust_id, currency, transRef }) {
//   const paymentResponse = ref({});

//   function checkout() {
//     return new Promise((resolve, reject) => {
//       if (!transRef.value || (typeof transRef.value !== "string" && typeof transRef.value !== "number")) {
//         console.error("Invalid transaction reference provided:", transRef.value);
//         reject("Invalid transaction reference. Expected a string or number.");
//         return;
//       }

//       const paymentRequest = {
//         merchant_code: "MX79193",
//         pay_item_id: "Default_Payable_MX79193",
//         txn_ref: transRef.value, // Access transRef.value
//         amount: amount.value,
//         cust_id: cust_id.value,
//         currency: currency.value,
//         site_redirect_url: window.location.origin,
//         onComplete: (response) => paymentCallback(response, transRef.value, resolve, reject),
//         mode: "TEST",
//       };

//       console.log("Payment request:", paymentRequest);

//       try {
//         window.webpayCheckout(paymentRequest);
//       } catch (error) {
//         console.error("Error invoking webpayCheckout:", error);
//         reject("Payment initialization failed. Please try again.");
//       }
//     });
//   }

//   function paymentCallback(response, transRefValue, resolve, reject) {
//     if (response) {
//       paymentResponse.value = response;
//       resolve({ transactionReference: transRefValue, response });
//     } else {
//       reject("Payment failed or no response received");
//     }
//   }

//   return { checkout, paymentResponse };
// }

import { ref } from 'vue'
import { useCustomToast } from '~/composables/core/useCustomToast';

const paymentResponse = ref({})
const paymentStatus = ref('idle') // Will track payment status

export function useCheckout({ amount, cust_id, currency, transRef }) {
  const { showToast } = useCustomToast();
  const paymentResponse = ref({});

  // Define payment status constants
  const PAYMENT_STATUS = {
    IDLE: 'idle',
    PROCESSING: 'processing',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    FAILED: 'failed'
  }

  function checkout() {
    return new Promise((resolve, reject) => {
      if (!transRef.value || (typeof transRef.value !== "string" && typeof transRef.value !== "number")) {
        console.error("Invalid transaction reference provided:", transRef.value);
        reject("Invalid transaction reference. Expected a string or number.");
        return;
      }

      paymentStatus.value = PAYMENT_STATUS.PROCESSING;

      const paymentRequest = {
        merchant_code: "MX79193",
        pay_item_id: "Default_Payable_MX79193",
        txn_ref: transRef.value,
        amount: amount.value,
        cust_id: cust_id.value,
        currency: currency.value,
        site_redirect_url: window.location.origin,
        onComplete: (response) => paymentCallback(response, transRef.value, resolve, reject),
        mode: "TEST",
      };

      console.log("Payment request:", paymentRequest);

      try {
        // Add event listener for when user closes the payment window
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible' && paymentStatus.value === PAYMENT_STATUS.PROCESSING) {
            // Check if payment is still processing when user returns to the page
            setTimeout(() => {
              if (paymentStatus.value === PAYMENT_STATUS.PROCESSING) {
                paymentStatus.value = PAYMENT_STATUS.CANCELLED;
                reject({ status: 'cancelled', message: 'Payment process was cancelled' });
              }
            }, 1000); // Give a short delay for the onComplete callback to fire if payment was actually completed
          }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        window.webpayCheckout(paymentRequest);
      } catch (error) {
        console.error("Error invoking webpayCheckout:", error);
        paymentStatus.value = PAYMENT_STATUS.FAILED;
        reject("Payment initialization failed. Please try again.");
      }
    });
  }

  function paymentCallback(response, transRefValue, resolve, reject) {
    if (!response) {
      paymentStatus.value = PAYMENT_STATUS.FAILED;
      reject("Payment failed or no response received");
      return;
    }

    paymentResponse.value = response;

    // Check for specific cancellation indicators in the response
    if (
      response.resp === "00" || // Successful transaction
      response.resp === "Z0"    // Transaction completed
    ) {
      paymentStatus.value = PAYMENT_STATUS.COMPLETED;
      resolve({ transactionReference: transRefValue, response });
      showToast({
        title: "Success",
        message: 'Payment successful',
        toastType: "success",
        duration: 3000
      });
    } else if (
      response.resp === "Z6" || // Transaction Cancelled
      response.resp === "Z7"    // Payment page closed
    ) {
      paymentStatus.value = PAYMENT_STATUS.CANCELLED;
      reject({
        status: 'cancelled',
        message: 'Payment was cancelled by user',
        response
      });
    } else {
      paymentStatus.value = PAYMENT_STATUS.FAILED;
      reject({
        status: 'failed',
        message: 'Payment failed',
        response
      });
    }
  }

  return {
    checkout,
    paymentResponse,
    paymentStatus,
    PAYMENT_STATUS // Export status constants
  };
}