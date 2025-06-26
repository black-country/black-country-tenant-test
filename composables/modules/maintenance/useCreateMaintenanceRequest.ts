import { ref, computed, onMounted } from "vue";
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
  
  // Computed property to get house ID
  const houseId = computed(() => {
    return myHomeInfo.value?.house?.id || user.value?.house?.id;
  });
  
  // Computed property to check if house ID is available
  const hasHouseId = computed(() => {
    return !!houseId.value;
  });
  
  const createMaintenanceRequest = async () => {
    // Check if house ID is available before proceeding
    if (!hasHouseId.value) {
      showToast({
        title: "Error",
        message: "House information is not available. Please try again later.",
        toastType: "error",
        duration: 3000,
      });
      return;
    }
    
    loading.value = true;
    try {
      const res = await maintenance_api.$_create_maintenence_request(houseId.value, payload.value) as any
      console.log(res, 'res')
      if(res.status == 201) {
         showToast({
           title: "Success",
           message: "Maintenance request was created successfully",
           toastType: "success",
           duration: 3000,
         });
         router.back();
      } else {
         showToast({
           title: "Error",
           message: "Failed to create maintenance request.",
           toastType: "error",
           duration: 3000,
         });
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "An error occurred while creating the maintenance request.",
        toastType: "error",
        duration: 3000,
      });
    } finally {
      loading.value = false;
    }
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
      hasHouseId.value &&
      payload.value.description &&
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
    clearInputs,
    hasHouseId,
    houseId
  };
};