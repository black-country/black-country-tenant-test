import { ref } from 'vue'

const paymentResponse = ref({})

export function useCheckout({ amount, cust_id, currency, transRef }) {
  // function checkout() {
  //   return new Promise((resolve, reject) => {
  //     // const transRef = randomReference()
  //     const paymentRequest = {
  //       merchant_code: 'MX79193',
  //       pay_item_id: 'Default_Payable_MX79193',
  //       txn_ref: transRef,
  //       amount: amount.value,
  //       cust_id: cust_id.value,
  //       currency: currency.value,
  //       site_redirect_url: window.location.origin,
  //       onComplete: (response) => paymentCallback(response, transRef, resolve, reject),
  //       mode: 'TEST'
  //     }
  //     window.webpayCheckout(paymentRequest)
  //   })
  // }

  function checkout() {
    return new Promise((resolve, reject) => {
      if (!transRef || (typeof transRef !== 'string' && typeof transRef !== 'number') || `${transRef}`.trim() === '') {
        console.error("Invalid transaction reference provided:", transRef);
        reject("Invalid transaction reference. Expected a non-empty string or number.");
        return;
      }
  
      const paymentRequest = {
        merchant_code: 'MX79193',
        pay_item_id: 'Default_Payable_MX79193',
        txn_ref: `${transRef}`, // Ensure it's a string
        amount: amount.value,
        cust_id: cust_id.value,
        currency: currency.value,
        site_redirect_url: window.location.origin,
        onComplete: (response) => paymentCallback(response, transRef, resolve, reject),
        mode: 'TEST',
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
  

  function paymentCallback(response, transRef, resolve, reject) {
    // console.log(response, 'response here')
    if (response) {
      paymentResponse.value = response
      // alert(response.desc)
      resolve({ transactionReference: transRef, response })
    } else {
      reject('Payment failed or no response received')
    }
  }

  return { checkout, paymentResponse }
}


