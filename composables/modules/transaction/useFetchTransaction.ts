import { transaction_api } from "@/api_factory/modules/transaction";
const loading = ref(false)
const transactionObj = ref({})
const route = useRoute()

export const useFetchTransaction = () => {
	const fetchTransaction = async () => {
		loading.value = true
		const res = await  transaction_api.$_get_transaction_details(route.params.id) as any
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
