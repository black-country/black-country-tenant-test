import { ref } from 'vue'
import { maintenance_api } from '@/api_factory/modules/maintenance'
import { useInitiateMoveIn } from '@/composables/modules/maintenance/useInitiateMoveIn'
const { intiateMoveIn, loading } = useInitiateMoveIn()

export const useFetchMyHomeInfo = () => {
  const loading = ref(false)
  const myHomeInfo = ref({})
  const router = useRouter()
  const route = useRoute()

  const fetchMyHomeInfo = async () => {
    loading.value = true
  
      const res = await maintenance_api.$_get_my_home() as any

      console.log(res, 'here')

      if (res.type !== 'ERROR') {
        myHomeInfo.value = res?.data || {}

        console.log(myHomeInfo.value)

        if(!res?.data?.movedIn){
          router.push({
            path: route.path,
            query: { ...route.query, applicationId: res?.data?.id }
          })
          intiateMoveIn();
        } else {
          router.push('/dashboard/home/details')
        }
    }
    loading.value = false

  }


  onMounted(() => {
    fetchMyHomeInfo()
})

  return {
    fetchMyHomeInfo,
    loading,
    myHomeInfo
  }
}
