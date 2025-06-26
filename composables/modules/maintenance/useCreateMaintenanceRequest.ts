import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { maintenance_api } from "@/api_factory/modules/maintenance";
import { useUser } from "@/composables/auth/user";
import { useCustomToast } from '@/composables/core/useCustomToast'
import { useFetchMyHomeDetails } from "@/composables/modules/maintenance/useFetchHomeDetails"

const { showToast } = useCustomToast();
const { myHomeInfo, fetchMyHomeDetails } = useFetchMyHomeDetails()

const payload = ref({
  type: "", 
  urgencyLevel: "", 
  description: "",
  images: [],
});

const router = useRouter()

export const useCreateMaintenanceRequest = () => {
  const { user }  = useUser()
  const loading = ref(false);
  const router = useRouter()
  
  const createMaintenanceRequest = async () => {
    loading.value = true;
    const res = await maintenance_api.$_create_maintenence_request(myHomeInfo.value.house.id || user.value.house.id, payload.value) as any
     console.log(res, 'res')
     if(res.status == 201) {
        showToast({
          title: "Success",
          message: "Maintenance request was created successfully",
          toastType: "success",
          duration: 3000,
        });
        // window.location.href = '/dashboard/home/success'
        router.back();
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
  
  const clearInputs = () => {
    payload.value.type = "";
    payload.value.urgencyLevel = "";
    payload.value.description = "";
    payload.value.images = [];
  }

  const setPayload = (data: any) => {
    payload.value.type = data.type
    payload.value.urgencyLevel = data.urgencyLevel
    payload.value.description = data.description
    payload.value.images = data.images 
  }

  const isFormEnabled = computed(() => {
    return (
      payload.value.description &&
      // payload.value.images.length > 0 &&
      payload.value.type &&
      payload.value.urgencyLevel
    )
  })

    // Fetch data on component mount
  onMounted(() => {
      fetchMyHomeDetails()
    });
  
  
  return {
    createMaintenanceRequest,
    loading,
    payload,
    setPayload,
    isFormEnabled,
    clearInputs
  };
};