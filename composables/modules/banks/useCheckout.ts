import { ref } from 'vue'

const paymentResponse = ref({})

export function useCheckout({ amount, cust_id, currency, transRef }) {
  const paymentResponse = ref({});

  function checkout() {
    return new Promise((resolve, reject) => {
      if (!transRef.value || (typeof transRef.value !== "string" && typeof transRef.value !== "number")) {
        console.error("Invalid transaction reference provided:", transRef.value);
        reject("Invalid transaction reference. Expected a string or number.");
        return;
      }

      const paymentRequest = {
        merchant_code: "MX79193",
        pay_item_id: "Default_Payable_MX79193",
        txn_ref: transRef.value, // Access transRef.value
        amount: amount.value,
        cust_id: cust_id.value,
        currency: currency.value,
        site_redirect_url: window.location.origin,
        onComplete: (response) => paymentCallback(response, transRef.value, resolve, reject),
        mode: "TEST",
      };

      console.log("Payment request:", paymentRequest);

      try {
        window.webpayCheckout(paymentRequest);
      } catch (error) {
        console.error("Error invoking webpayCheckout:", error);
        reject("Payment initialization failed. Please try again.");
      }
    });
  }

  function paymentCallback(response, transRefValue, resolve, reject) {
    if (response) {
      paymentResponse.value = response;
      resolve({ transactionReference: transRefValue, response });
    } else {
      reject("Payment failed or no response received");
    }
  }

  return { checkout, paymentResponse };
}
