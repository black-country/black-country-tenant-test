import { property_api } from "@/api_factory/modules/property";
import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();

const searchPayload = ref({
    searchTerm: "black",
    imageUrl: "",
    results: [
        {
            id: "",
            name: ""
        }
    ]
})

export const useSaveSearch = () => {
    const loading = ref(false)
	const saveSearch = async () => {
		loading.value = true
		const res = await property_api.$_save_search(searchPayload.value) as any

        if (res.type !== 'ERROR') {
            showToast({
                title: "Success",
                message: "Success",
                toastType: "success",
                duration: 3000
              });
        } else {
            showToast({
                title: "Error",
                message: res.data.error,
                toastType: "error",
                duration: 3000
              });
        }
        loading.value = false
	}

    const setPayload = (data: any) => {
        searchPayload.value.searchTerm = data?.searchQuery
        searchPayload.value.imageUrl = data?.imageUrl,
        searchPayload.value.results = [
            {
                id: data?.propertyId,
                name: data?.propertyName
            }
        ]
    }

	return { saveSearch, loading, setPayload }
}
