import { home_api } from "@/api_factory/modules/home";
import { useCustomToast } from '@/composables/core/useCustomToast'

const loading = ref(false)
const checklistPayload = ref({
    list: []
})

export const useAddChecklistItem = () => {
    const { showToast } = useCustomToast();
    const router = useRouter()
	const addChecklistItem = async (id: string) => {
		loading.value = true
		const res = await home_api.$_add_checklist_item(id, checklistPayload.value) as any
        if (res.type !== 'ERROR') {
            showToast({
                title: "Success",
                message: "Checklist item was added successfully",
                toastType: "success",
                duration: 3000
              });
              router.push('/dashboard/home/checklist-success')
        }
        loading.value = false
	}

    const setPayload = (data: any) => {
        checklistPayload.value.list = data.list
    }
	return { loading, checklistPayload, addChecklistItem, setPayload }
}
