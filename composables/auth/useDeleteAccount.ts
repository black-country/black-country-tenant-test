// composables/useDeleteAccount.ts
import { ref } from 'vue'
import { auth_api } from '@/api_factory/modules/auth'
import { useUser } from '@/composables/auth/user'
const router = useRouter()

export const useDeleteAccount = () => {
  const currentStep = ref<number>(1)
  const { user } = useUser()
  const isLoading = ref<boolean>(false)
  const userEmail = ref<string>('')
  const deleteReason = ref<string>('')
  const isEmailValid = ref<boolean>(false)

  const validateEmail = (email: string) => {
    // const storedUser = localStorage.getItem('user')
    // if (!storedUser) return false
    
    // const user = JSON.parse(storedUser) as User
    return user.value.email === email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleEmailChange = (email: string) => {
    userEmail.value = email
    isEmailValid.value = validateEmail(email)
  }

  const submitDeletion = async () => {
    isLoading.value = true
    const res = await auth_api.$_delete_account({
        email: userEmail.value,
        reason: deleteReason.value,
      }) as any

      if(res.type !== 'ERROR') {
        router.push('/delete-account-success')
      }
  }

  return {
    currentStep,
    isLoading,
    userEmail,
    deleteReason,
    isEmailValid,
    handleEmailChange,
    submitDeletion,
  }
}
