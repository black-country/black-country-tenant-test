import { settings_api } from "@/api_factory/modules/settings";
const loading = ref(false)
const policiesList = ref([])

export const useFetchPrivacyPolicy = () => {
    const getPrivacyPolicy = async () => {
        loading.value = true
        const res = await  settings_api.$_fetch_faq() as any
        console.log(res, 'res hweere')
        if (res.type !== 'ERROR') {
            policiesList.value = res?.data ?? []
        }
        loading.value = false
    }

    onMounted(() => {
        getPrivacyPolicy()
    })

    return { loading, policiesList }
}
