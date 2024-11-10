import { ref } from 'vue'
import { maintenance_api } from '@/api_factory/modules/maintenance'
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

export const useCancelMaintenanceRequest = () => {
  const loading = ref(false)
  const canceledRequest = ref(null)

  const cancelMaintenanceRequest = async (id: string) => {
    loading.value = true
    const res = await maintenance_api.$_cancel_maintenence_request(id) as any

    if (res.type !== 'ERROR') {
        showToast({
            title: "Success",
            message: "Maintenance request was cancelled successfully",
            toastType: "success",
            duration: 3000
          });
    }
    loading.value = false
  }

  return {
    cancelMaintenanceRequest,
    loading,
    canceledRequest
  }
}
