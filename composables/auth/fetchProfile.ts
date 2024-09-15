import { auth_api } from '@/api_factory/modules/auth'
export const use_fetch_profile = () => {

	const loading = ref(false)
    const profileObj = ref({})

	const fetch_profile = async () => {
		loading.value = true
		const res = (await auth_api.$_fetch_profile()) as any

		loading.value = false
		if (res.type !== 'ERROR') {
            profileObj.value = res.data
			return res.data
		}
	}

	return { fetch_profile, loading, profileObj }
}
