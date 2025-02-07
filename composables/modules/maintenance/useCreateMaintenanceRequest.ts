import { ref } from "vue";
import { maintenance_api } from "@/api_factory/modules/maintenance";
import { useUser } from "@/composables/auth/user";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
const { user }  = useUser()

const payload = ref({
  type: "", 
  urgencyLevel: "", 
  description: "",
  images: [],
});

const router = useRouter()

export const useCreateMaintenanceRequest = () => {
  const loading = ref(false);
  const router = useRouter()
  const createMaintenanceRequest = async () => {
    // const houseId = "01b4f4d4-3927-43e5-97de-8b1df3366a56"
    loading.value = true;
    const res = await maintenance_api.$_create_maintenence_request(user.value.house.id, payload.value) as any
     console.log(res, 'res')
     if(res.status == 201) {
        showToast({
          title: "Success",
          message: "Maintenance request was created successfully",
          toastType: "success",
          duration: 3000,
        });
        window.location.href = '/dashboard/home/success'
     } else {
        showToast({
          title: "Error",
          message: "Failed to create maintenance request.",
          toastType: "error",
          duration: 3000,
        });
     }
     loading.value = false;
  };
  

  // const createMaintenanceRequest = async () => {
  //   loading.value = true;
  //   const houseId = "01b4f4d4-3927-43e5-97de-8b1df3366a56"
  //   console.log(houseId, 'house id here')
  //   // const res = await maintenance_api.$_create_maintenence_request(houseId, payload) as any

  //   // if (res.type !== 'ERROR') {
  //   //     showToast({
  //   //         title: "Success",
  //   //         message: "Maintenance request was created successfully",
  //   //         toastType: "success",
  //   //         duration: 3000
  //   //       });
  //   // }
  //   // loading.value = false
  // };

  const setPayload = (data: any) => {
    payload.value.type = data.type
    payload.value.urgencyLevel = data.urgencyLevel
    payload.value.description = data.description
    payload.value.images = data.images 
  }

  const isFormEnabled = computed(() => {
    return (
      payload.value.description &&
      payload.value.images.length > 0 &&
      payload.value.type &&
      payload.value.urgencyLevel
    )
  })
  return {
    createMaintenanceRequest,
    loading,
    payload,
    setPayload,
    isFormEnabled
  };
};
