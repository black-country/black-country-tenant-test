import { home_api } from "@/api_factory/modules/home";
import { useCustomToast } from '@/composables/core/useCustomToast'

const loading = ref(false)
const payload = ref({
    rentalApplicationId: "",
    movoutDate: "",
    moveOutTime: "",
    reason: ""
})

export const useCreateMoveOutNotice = () => {
    const { showToast } = useCustomToast();
    const router = useRouter()
	const createMoveOutNotice = async () => {
		loading.value = true
		const res = await home_api.$_create_move_out_notice(payload.value) as any
        console.log(res, 'res here')
        if (res.type !== 'ERROR') {
            showToast({
                title: "Success",
                message: "Move out notice was sent successfully",
                toastType: "success",
                duration: 3000
              });
              router.push('/dashboard/home/notice-sent-success')
        } else {
            showToast({
                title: "Error",
                message: res?.data?.error || 'Soemthing went wrong',
                toastType: "error",
                duration: 3000
              });
        }
        loading.value = false
	}

    const setPayload = (data: any) => {
        payload.value.rentalApplicationId = data?.rentalApplicationId,
        payload.value.movoutDate = data?.movoutDate,
        payload.value.moveOutTime = data?.moveOutTime,
        payload.value.reason = data?.reason
    }
	return { loading, setPayload, createMoveOutNotice, payload }
}
