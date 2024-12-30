import { settings_api } from "@/api_factory/modules/settings";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
const loading = ref(false)
const payload = ref({
    notifications: {
        emailNotification: true,
        rentDueReminder: true,
        leaseRenewalNotice: true,
        propertyAlert: true,
        rentalApplicationUpdate: true,
        maintenanceUpdate: true,
        securityAlert: true,
        pushAndInappNotification: true
    }
})

export const useCreatePreferences = () => {
    const createPreferences = async () => {
        loading.value = true
        const res = await  settings_api.$_create_preferences(payload.value) as any
        if (res.type !== 'ERROR') {
            showToast({
                title: "Success",
                message: 'Notification preference was created successfully.',
                toastType: "success",
                duration: 3000
              });
        }
        loading.value = false
    }

    const setPayload = (data: any) => {
        console.log(data, 'data here')
       payload.value.notifications = data.notifications
    }


    return { createPreferences, loading, payload, setPayload }
}
