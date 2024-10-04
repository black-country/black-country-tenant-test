import { rental_api } from "@/api_factory/modules/rental";
const loading = ref(false)

export const useCancelRental = () => {
	const cancelRental = async (id: string | number) => {
		loading.value = true
		const res = await rental_api.$_cancel_rental(id) as any

        if (res.type !== 'ERROR') {
			useRouter().push('/dashboard/')
        }
        loading.value = false
	}

	return { cancelRental, loading }
}
