import { settings_api } from "@/api_factory/modules/settings";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
const loading = ref(false)
const router = useRouter()
const payload = {
    email: ref(''),
    otpCode: ref("")
}

export const useValidateDeleteAccountOTP = () => {
    const validateDeleteAccountOTP = async () => {
        loading.value = true
        const res = await  settings_api.$_validate_delete_request({
            email: payload.email.value,
            otpCode: payload.otpCode.value
        }) as any
        console.log(res)
        if (res.type !== 'ERROR') {
            showToast({
                title: "Success",
                message: res.data.message,
                toastType: "success",
                duration: 3000
              });
              window.location.href = '/profile/delete-account-success'          
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

    const setPayloadObj = (data: any) => {
      payload.email.value = data.email
      payload.otpCode.value = data.otpCode
    }

    return { validateDeleteAccountOTP, loading, payload, setPayloadObj }
}
