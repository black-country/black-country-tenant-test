import { settings_api } from "@/api_factory/modules/settings";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
const router  = useRouter()
const loading = ref(false)
const payload = ref({
    email: ''
})

export const useInitiateDeleteAccount = () => {
    const initiateDeleteAccount = async () => {
        loading.value = true
        const res = await  settings_api.$_initiate_delete_account(payload.value) as any
        if (res.type !== 'ERROR') {
            showToast({
                title: "Success",
                message: 'OTP has been sent successfully',
                toastType: "success",
                duration: 3000
              });
              loading.value = false
              router.push({ path: '/profile/account-deletion-otp-verification', query: { email: payload.value.email }})
        } else {
            showToast({
                title: "Error",
                message: res?.data?.error,
                toastType: "error",
                duration: 3000
              });
        }
        loading.value = false
    }

    const setPayload = (data: any) => {
        payload.value.email = data.email
    }

    return { initiateDeleteAccount, loading, payload, setPayload }
}
