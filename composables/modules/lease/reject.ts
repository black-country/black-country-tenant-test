import { lease_api } from "@/api_factory/modules/lease";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
const loading = ref(false)
const route = useRoute()
const router = useRouter()

export const useRejectLease = () => {
	const rejectLeaseAgreement = async (id: string | number) => {
        const payload = {
            rejectionReason : ""
        }
		loading.value = true;
		try {
			const res = await lease_api.$_reject_lease_agreement(id, payload) as any;

			if (res.type !== 'ERROR') {
				showToast({
					title: "Success",
					message: "Lease Agreement was rejected successfully!",
					toastType: "success",
					duration: 3000
				});
				router.push(`/dashboard/listings/${route?.params?.id}/rental-applications/lease-signed-success`)
				window.location.href = `/dashboard/listings/${route?.params?.id}/rental-applications/lease-signed-success`
				return res;  // Fix: The return statement was incomplete.
			} else {
				showToast({
					title: "Error",
					message: res.data?.error || 'Something went wrong while signing the lease agreement!',
					toastType: "error",
					duration: 3000
				});
			}
		} catch (error) {
			// Catch and handle any unexpected errors
			showToast({
				title: "Error",
				message: 'An unexpected error occurred while rejecting lease agreement.',
				toastType: "error",
				duration: 3000
			});
		} finally {
			loading.value = false;  // Ensure loading is set to false after the operation
		}
	};

	return { rejectLeaseAgreement, loading };
};
