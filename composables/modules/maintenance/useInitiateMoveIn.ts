import { ref } from 'vue'
import { maintenance_api } from '@/api_factory/modules/maintenance'
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

export const useInitiateMoveIn = () => {
  const loading = ref(false)
  const canceledRequest = ref(null)

  const onotiateMoveIn = async (id: string) => {
    loading.value = true
    const res = await maintenance_api.$_initiate_move_in() as any

    if (res.type !== 'ERROR') {
        showToast({
            title: "Success",
            message: "Move-in was initiated successful",
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
    onotiateMoveIn,
    loading,
    canceledRequest
  }
}
