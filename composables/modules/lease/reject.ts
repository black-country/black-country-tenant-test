import { lease_api } from "@/api_factory/modules/lease";
import { useCustomToast } from "@/composables/core/useCustomToast";
const { showToast } = useCustomToast();
const loading = ref(false);
const route = useRoute();
const router = useRouter();

const payload = {
  rejectionReason: "",
};

export const useRejectLease = () => {
	const router = useRouter();
  const rejectLeaseAgreement = async (id: string | number) => {
    loading.value = true;
	const router = useRouter();
    const res = (await lease_api.$_reject_lease_agreement(id, payload)) as any;

    if (res.type !== "ERROR") {
      showToast({
        title: "Success",
        message: "Lease Agreement was rejected successfully!",
        toastType: "success",
        duration: 3000,
      });
      router.push(
        `/dashboard/listings/${route?.params?.id}/rental-applications/cancellation-success`
      );
      window.location.href = `/dashboard/listings/${route?.params?.id}/rental-applications/cancellation-success`;
    } else {
      showToast({
        title: "Error",
        message:
          res.data?.error ||
          "Something went wrong while signing the lease agreement!",
        toastType: "error",
        duration: 3000,
      });
    }
    loading.value = false;
  };

  return { rejectLeaseAgreement, loading, payload };
};
