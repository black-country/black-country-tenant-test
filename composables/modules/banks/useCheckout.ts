import { ref } from 'vue'

const paymentResponse = ref({})

export function useCheckout({ amount, cust_id, currency, transRef }) {
  function checkout() {
    return new Promise((resolve, reject) => {
      // const transRef = randomReference()
      const paymentRequest = {
        merchant_code: 'MX79193',
        pay_item_id: 'Default_Payable_MX79193',
        txn_ref: transRef,
        amount: amount.value,
        cust_id: cust_id.value,
        currency: currency.value,
        site_redirect_url: window.location.origin,
        onComplete: (response) => paymentCallback(response, transRef, resolve, reject),
        mode: 'TEST'
      }
      window.webpayCheckout(paymentRequest)
    })
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
