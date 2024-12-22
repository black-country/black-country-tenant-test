import { ref } from 'vue'
import { maintenance_api } from '@/api_factory/modules/maintenance'

export const useFetchMaintenanceRequests = () => {
  const loading = ref(false)
  const maintenanceRequests = ref([])


  const tenantId = ref('')
  const houseId = ref('')
  const page = ref(1)
  const perPage = ref(20)
  const status = ref('') // To store the sort type

  const fetchMaintenanceRequests = async () => {
    loading.value = true
  
      const res = await maintenance_api.$_fetch_maitenence_request(
        page.value,
        perPage.value,
        status.value,
        tenantId.value,
        houseId.value
      ) as any

      console.log(res, 'here')

      if (res.type !== 'ERROR') {
        // maintenanceRequests.value = res?.data?.result || []
        maintenanceRequests.value = res?.data?.result ? (res?.data?.result || []).sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB.getTime() - dateA.getTime(); // Sort descending by createdAt
        }) : []
    }
    loading.value = false

  }

    // Watch searchQuery to trigger the search when it changes
    watch(status, () => {
        fetchMaintenanceRequests() 
    })

  onMounted(() => {
    fetchMaintenanceRequests()
})

  return {
    fetchMaintenanceRequests,
    loading,
    maintenanceRequests,
    status
  }
}
