import { home_api } from "@/api_factory/modules/home";
const loading = ref(false)
const checklist = ref([])

export const useFetchChecklist = () => {
	const fetchChecklist = async () => {
		loading.value = true
		const res = await home_api.$_fetch_checklist() as any
        console.log(res, 'res hrer')
        if (res.type !== 'ERROR') {
			checklist.value = res?.data
        }
        loading.value = false
	}

	onMounted(() => {
		fetchChecklist()
	})

	return { loading, checklist }
}
