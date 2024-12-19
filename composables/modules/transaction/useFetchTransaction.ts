import { transaction_api } from "@/api_factory/modules/transaction";
import { useUser } from "@/composables/auth/user";
const loading = ref(false)
const transactionObj = ref({})
const route = useRoute()
const { user } = useUser()

export const useFetchTransaction = () => {
    const route = useRoute()
	const fetchTransaction = async () => {
		loading.value = true
		const res = await  transaction_api.$_get_transaction_details(user?.value?.id, route?.params?.id) as any
        console.log(res, 'res hweere')
        if (res.type !== 'ERROR') {
            transactionObj.value = res?.data ?? {}
        }
        loading.value = false
	}

    onMounted(() => {
        fetchTransaction()
    })

	return { loading, transactionObj }
}
