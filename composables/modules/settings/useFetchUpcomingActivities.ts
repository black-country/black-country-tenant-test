import { settings_api } from "@/api_factory/modules/settings";
import { useUser } from "@/composables/auth/user";
const loading = ref(false)
const upcomingActivitiesList = ref({})

export const useFetchUpcomingActivities = () => {
    const { user } = useUser()
	const getUpcomingActivities = async () => {
		loading.value = true
		const res = await  settings_api.$_fetch_upcoming_activities(user?.value?.id) as any
        console.log(res, 'res hweere')
        if (res.status == 200) {
            upcomingActivitiesList.value = res?.data?.result || []
        }
        loading.value = false
	}


    onMounted(() => {
        getUpcomingActivities()
    })

	return { loading, upcomingActivitiesList, getUpcomingActivities }
}
