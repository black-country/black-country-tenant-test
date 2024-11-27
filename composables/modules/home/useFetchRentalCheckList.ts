import { home_api } from "@/api_factory/modules/home";
import { useUser } from "@/composables/auth/user";
const loading = ref(false)
const rentalChecklist = ref([])
const { user } = useUser()

export const useFetchRentalChecklist = () => {
	const fetchRentalChecklist = async () => {
		loading.value = true
		const res = await home_api.$_get_rental_checklist(user?.value?.rentalApplicationId) as any
        console.log(res, 'res hrer')
        if (res.type !== 'ERROR') {
			rentalChecklist.value = res?.data
        }
        loading.value = false
	}

	onMounted(() => {
		fetchRentalChecklist()
	})

	return { loading, rentalChecklist }
}
