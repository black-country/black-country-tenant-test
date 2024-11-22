import { ref } from 'vue'
import { maintenance_api } from '@/api_factory/modules/maintenance'
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

export const useInitiateMoveIn = () => {
  const loading = ref(false)
  const canceledRequest = ref(null)
  const router = useRouter()
  const route = useRoute()

  const intiateMoveIn = async () => {
    loading.value = true
    const res = await maintenance_api.$_initiate_move_in() as any
    console.log(res, 'here')
    if (res.type !== 'ERROR') {
        showToast({
            title: "Success",
            message: "Move-in was initiated successful",
            toastType: "success",
            duration: 3000
          });
          router.push({
            path: `/dashboard/listings/${route.params.id}/rental-applications/verify-movein-otp`,
            query: { ...route.query, otpId: res?.data?.data?.otpId }, // Update the query with the new step
          })
          // router.push(`/dashboard/home/verify-movein-otp?otpId=${res?.data?.data?.otpId}`)
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
    intiateMoveIn,
    loading,
    canceledRequest
  }
}
