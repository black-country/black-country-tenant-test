import { ref } from 'vue'
import { maintenance_api } from '@/api_factory/modules/maintenance'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
const { propertyObj } = useFetchProperty();
const { showToast } = useCustomToast();

const credential = ref({
  otp: ''
})

export const useVerifyMoveInOTP = () => {
  const loading = ref(false)
  const route = useRoute()
  const router = useRouter()

  const verifyMoveIn = async () => {
    const applicationId = route?.query?.applicationId || propertyObj.value.rentalApplication.id
    let otpCode;
    if(credential?.value?.otp){
      otpCode = String(credential?.value?.otp?.join(""));
    }
    const payload = {
      otpCode
    }
    loading.value = true
    const res = await maintenance_api.$_verify_move_in(applicationId, payload) as any
    if (res.type !== 'ERROR') {
        showToast({
            title: "Success",
            message: "Move-in OTP was verified successfully",
            toastType: "success",
            duration: 3000
          });
          router.push('/dashboard/home/details')
    } else {
        showToast({
            title: "Error",
            message: res?.data?.error || 'Something went wrong',
            toastType: "error",
            duration: 3000
          }); 
    }
    loading.value = false
  }

  const setCredential = (data: any) => {
    credential.value.otp = data.otp
  }

  return {
    loading,
    setCredential,
    verifyMoveIn,
    credential
  }
}
