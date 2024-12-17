import { home_api } from "@/api_factory/modules/home";
import { useUser } from "@/composables/auth/user";
const loading = ref(false)
const rentalChecklist = ref([])
const { user } = useUser()

export const useFetchMoveOutRentalChecklist = () => {
	const fetchMoveOutRentalChecklist = async () => {
		loading.value = true
		const res = await home_api.$_get_move_out_rental_checklist(user?.value?.rentalApplicationId) as any
        if (res.type !== 'ERROR') {
			rentalChecklist.value = res?.data
        }
        loading.value = false
	}

	onMounted(() => {
		fetchMoveOutRentalChecklist()
	})

	return { loading, rentalChecklist }
}
