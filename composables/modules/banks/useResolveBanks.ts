import { banks_api } from "@/api_factory/modules/banks";
const loading = ref(false)

const bankObj = ref([])

export const useResolveBank = () => {
	const resolveBank = async (accountNumber: string, sortCode: string) => {
		loading.value = true
		const res = await  banks_api.$_resolve_banks(accountNumber, sortCode) as any
		console.log(res, 'resilved')
        if (res.type !== 'ERROR') {
			bankObj.value = res?.data?.data
			return res.data
			loading.value = false
        }
        loading.value = false
	}

	return { resolveBank, loading, bankObj }
}