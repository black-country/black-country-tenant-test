import { ref } from "vue";
import { maintenance_api } from "@/api_factory/modules/maintenance";
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();

const payload = ref({
  isConfirmedCompleted: true, // boolean
  satisfactoryLevel: "", // values ("very_dissatisfied", "dissatisfied", "neutral", "satisfied", "very_satisfied")
});

export const useConfirmMaintenanceRequest = () => {
  const loading = ref(false);
  const confirmedRequest = ref(null);

  const confirmMaintenanceRequest = async (id: string) => {
    loading.value = true;
    const res = (await maintenance_api.$_confirm_maintenence_request(
      id, payload.value
    )) as any;

    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "Maintenance request was confirmed successfully",
        toastType: "success",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  const setPayload = (data: any) => {
    payload.value.satisfactoryLevel = data.satisfactoryLevel,
    payload.value.isConfirmedCompleted = true
  }

  return {
    confirmMaintenanceRequest,
    loading,
    confirmedRequest,
    setPayload
  };
};
