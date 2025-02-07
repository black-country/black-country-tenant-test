// import { ref } from 'vue'
// import { maintenance_api } from '@/api_factory/modules/maintenance'
// import { useCustomToast } from '@/composables/core/useCustomToast'
// import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
// const { propertyObj } = useFetchProperty();
// const { showToast } = useCustomToast();

// const credential = ref({
//   otp: ''
// })

// const applicationId = ref(route?.query?.applicationId || propertyObj.value.rentalApplication.id )
// // 

// export const useVerifyMoveInOTP = () => {
//   const loading = ref(false)
//   const route = useRoute()
//   const router = useRouter()

//   const verifyMoveIn = async () => {
    
//     let otpCode;
//     if(credential?.value?.otp){
//       otpCode = String(credential?.value?.otp?.join(""));
//     }
//     const payload = {
//       otpCode
//     }
//     loading.value = true
//     const res = await maintenance_api.$_verify_move_in(applicationId, payload) as any
//     if (res.type !== 'ERROR') {
//         showToast({
//             title: "Success",
//             message: "Move-in OTP was verified successfully",
//             toastType: "success",
//             duration: 3000
//           });
//           router.push('/dashboard/home/details')
//     } else {
//         showToast({
//             title: "Error",
//             message: res?.data?.error || 'Something went wrong',
//             toastType: "error",
//             duration: 3000
//           }); 
//     }
//     loading.value = false
//   }

//   const setCredential = (data: any) => {
//     credential.value.otp = data.otp
//     applicationId.value = data.applicationId
//   }

//   return {
//     loading,
//     setCredential,
//     verifyMoveIn,
//     credential
//   }
// }

import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { maintenance_api } from '@/api_factory/modules/maintenance'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";

const { propertyObj } = useFetchProperty();
const { showToast } = useCustomToast();

export const useVerifyMoveInOTP = () => {
  const loading = ref(false)
  const route = useRoute()
  const router = useRouter()

  const credential = ref({
    otp: ''
  });

  // Ensure applicationId properly references rentalApplication ID or query param
  const applicationId = ref(route?.query?.applicationId || propertyObj.value?.rentalApplication?.id);

  const verifyMoveIn = async () => {
    if (!credential.value.otp) {
      showToast({
        title: "Error",
        message: "Please enter a valid OTP",
        toastType: "error",
        duration: 3000
      });
      return;
    }

    const otpCode = String(credential.value.otp?.join("") || "");
    const payload = { otpCode };

    loading.value = true;

    try {
      const res = await maintenance_api.$_verify_move_in(applicationId.value, payload) as any;
      
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: "Move-in OTP was verified successfully",
          toastType: "success",
          duration: 3000
        });
        router.push('/dashboard/home/details');
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Something went wrong',
          toastType: "error",
          duration: 3000
        });
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "An unexpected error occurred",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  const setCredential = (data: any) => {
    credential.value.otp = data.otp;
    applicationId.value = data.applicationId; // Ensure applicationId updates correctly
  };

  return {
    loading,
    setCredential,
    verifyMoveIn,
    credential,
    applicationId
  };
};
