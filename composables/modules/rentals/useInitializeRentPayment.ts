import { rental_api } from "@/api_factory/modules/rental";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
const loading = ref(false);
const payload = ref({
  rentalApplicationId: "",
  rentAmount: '',
});

export const useInitializeRentPayment = () => {
  const initializeRentPayment = async () => {
    loading.value = true;
    const res = (await rental_api.$_initialize_rent_payment(payload.value)) as any;
    console.log(res, "bank accounts here");
    if (res.type !== "ERROR") {
		showToast({
			title: "Success",
			message: "Rent payment was made successfully",
			toastType: "success",
			duration: 3000
		  });
    }
    loading.value = false;
  };

  const setPayloadObj = (data: any) => {
    payload.value.rentAmount = data.rentAmount
    payload.value.rentalApplicationId = data.rentalApplicationId
  }

  return { initializeRentPayment, loading, payload, setPayloadObj  };
};
