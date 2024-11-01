import { banks_api } from "@/api_factory/modules/banks";
import { useUser } from '@/composables/auth/user'
const { user } = useUser()
const loading = ref(false)

export const useCreateCard = () => {
	const createCard = async () => {
		loading.value = true
		const res = await  banks_api.$_create_card(user.value.userId) as any
        if (res.type !== 'ERROR') {

        }
        loading.value = false
	}

	return { createCard, loading }
}