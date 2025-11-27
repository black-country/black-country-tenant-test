import { home_api } from "@/api_factory/modules/home";
import { useCustomToast } from '@/composables/core/useCustomToast'

const loading = ref(false)
const payload = ref({
    customerId: "",
    billerId:  "",
    rentalApplicationId: "",
    serviceId: "",
    amount: ""
})

export const useInitializeBillPayment = () => {
    const { showToast } = useCustomToast();
    const router = useRouter()
    const initializeBillPayment = async (payload: any) => {
        loading.value = true
        const res = await home_api.$_initialize_bill_payment(payload) as any
        console.log(res, 'res here')
        if (res.type !== 'ERROR') {
            showToast({
                title: "Success",
                message: "Bill Payment Initialized Successfully",
                toastType: "success",
                duration: 3000
              });
        } else {
            showToast({
                title: "Error",
                message: res?.data?.error || 'Soemthing went wrong',
                toastType: "error",
                duration: 3000
              });
        }
        loading.value = false
    }

    return { loading, initializeBillPayment, payload }
}
