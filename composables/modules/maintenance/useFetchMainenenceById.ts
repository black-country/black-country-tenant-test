import { ref, onMounted } from 'vue';
import { maintenance_api } from '@/api_factory/modules/maintenance';

export const useFetchMaintenanceDetails = () => {
  const loading = ref(false);
  const maintenanceInfo = ref({});
  const route = useRoute() as any

  const fetchMaintenanceDetails = async () => {
    try {
      loading.value = true;
      const response = await maintenance_api.$_get_maintenence_by_id(route.params.id) as any

      if (response?.type !== 'ERROR') {
        maintenanceInfo.value = response?.data || {};

      } else {
        console.error('Failed to fetch home info:', response);
      }
    } catch (error) {
      console.error('Error fetching home info:', error);
    } finally {
      loading.value = false;
    }
  };

  // Fetch data on component mount
  onMounted(fetchMaintenanceDetails);

  return {
    fetchMaintenanceDetails,
    loading,
    maintenanceInfo,
  };
};
