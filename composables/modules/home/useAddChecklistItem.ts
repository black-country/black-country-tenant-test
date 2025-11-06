import { home_api } from "@/api_factory/modules/home";
import { useCustomToast } from '@/composables/core/useCustomToast'

const loading = ref(false)
const checklistPayload = ref({
    list: [],
    applicationId: ''
})

export const useAddChecklistItem = () => {
    const { showToast } = useCustomToast();
    const router = useRouter()
	const addChecklistItem = async (id: string) => {
        const applicationId = id || checklistPayload.value.applicationId
		loading.value = true
		const res = await home_api.$_add_checklist_item(applicationId, checklistPayload.value) as any
        if (res.type !== 'ERROR') {
            showToast({
                title: "Success",
                message: res.data.message || "Checklist item was added successfully",
                toastType: "success",
                duration: 3000
              });
              router.push('/dashboard/home/checklist-success')
        }
        loading.value = false
	}

    const setPayload = (data: any) => {
        checklistPayload.value.list = data.list
        checklistPayload.value.applicationId = data.applicationId
    }
	return { loading, checklistPayload, addChecklistItem, setPayload }
}
