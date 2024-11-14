import { ref } from 'vue'

const paymentResponse = ref({})

export function useCheckout({ amount, cust_id, currency }) {
  function randomReference() {
    const length = 10
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }

  function checkout() {
    return new Promise((resolve, reject) => {
      const transRef = randomReference()
      const paymentRequest = {
        merchant_code: 'MX19329',
        pay_item_id: 'Default_Payable_MX19329',
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
