import { ref } from 'vue'
import { maintenance_api } from '@/api_factory/modules/maintenance'
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

export const useMoveIn = () => {
  const loading = ref(false)
  const canceledRequest = ref(null)

  const moveIn = async (applicationId: string) => {
    loading.value = true
    const res = await maintenance_api.$_move_in(applicationId) as any

    if (res.type !== 'ERROR') {
        showToast({
            title: "Success",
            message: "Move-in was successful",
            toastType: "success",
            duration: 3000
          });
    } else {
        showToast({
            title: "Error",
            message: "Something went wrong",
            toastType: "error",
            duration: 3000
          }); 
    }
    loading.value = false
  }

  return {
    moveIn,
    loading,
    canceledRequest
  }
}
