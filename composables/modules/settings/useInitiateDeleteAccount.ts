import { settings_api } from "@/api_factory/modules/settings";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
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
        }
        loading.value = false
    }

    return { initiateDeleteAccount, loading, payload }
}
