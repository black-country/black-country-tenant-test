import { auth_api } from '@/api_factory/modules/auth'
export const use_auth_social_signin = () => {
	const Router = useRouter()
	const credential = {
		isToken: ref(''),
        provider: ref(''),
        app: ref('')
	}

	const loading = ref(false)

	const social_signin = async () => {
		loading.value = true
		const res = (await auth_api.$_social_signin({
			idToken: credential.isToken.value,
            provider: credential.provider.value,
            app: credential.app.value
		})) as any

		loading.value = false
		if (res.type !== 'ERROR') {
			Router.push('/dashboard')
		}
	}

	return { credential, social_signin, loading }
}
