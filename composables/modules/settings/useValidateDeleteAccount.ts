import { settings_api } from "@/api_factory/modules/settings";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
const loading = ref(false)
const payload = ref({
    email: '',
    otpCode: ""
})

export const useValidateDeleteAccountOTP = () => {
    const validateDeleteAccountOTP = async () => {
        loading.value = true
        const res = await  settings_api.$_validate_delete_request(payload.value) as any
        if (res.type !== 'ERROR') {
            showToast({
                title: "Success",
                message: 'Account deletion validation was smuccessful',
                toastType: "success",
                duration: 3000
              });
        }
        loading.value = false
    }

    return { validateDeleteAccountOTP, loading, payload }
}
