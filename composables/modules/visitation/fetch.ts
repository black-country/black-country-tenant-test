import { visitation_api } from "@/api_factory/modules/visitation";
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();
const loading = ref(false);
const visitations = ref([])

export const useFetchVisitations = () => {
  const getVisitations = async (tenantId: string | number, houseId: string | number) => {
    loading.value = true;
    const res = (await visitation_api.$_fetch_visitations(tenantId, houseId)) as any;
    if (res.type !== "ERROR") {
        visitations.value = res.data.result
         return res
    } else {
      showToast({
        title: "Error",
        message: res.data.error,
        toastType: "error",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return { getVisitations, loading };
};
