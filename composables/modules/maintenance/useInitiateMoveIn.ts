import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { maintenance_api } from '@/api_factory/modules/maintenance'
import { useCustomToast } from '@/composables/core/useCustomToast'

export const useInitiateMoveIn = () => {
  const { showToast } = useCustomToast()
  const loading = ref(false)
  const canceledRequest = ref(null)
  const router = useRouter()
  const route = useRoute()

  const intiateMoveIn = async () => {
    loading.value = true
    
    try {
      const res = await maintenance_api.$_initiate_move_in() as any
      console.log(res, 'here')
      
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: "Move-in was initiated successfully",
          toastType: "success",
          duration: 3000
        })
        
        router.push({
          path: '/dashboard/home/verify-movein-otp',
          query: { ...route.query }
        })
      } else {
        showToast({
          title: "Error",
          message: res?.data?.message || "Something went wrong",
          toastType: "error",
          duration: 3000
        })
      }
    } catch (error) {
      console.error('Move-in initiation error:', error)
      showToast({
        title: "Error",
        message: "Failed to initiate move-in. Please try again.",
        toastType: "error",
        duration: 3000
      })
    } finally {
      loading.value = false
    }
  }

  return {
    intiateMoveIn,
    loading,
    canceledRequest
  }
}