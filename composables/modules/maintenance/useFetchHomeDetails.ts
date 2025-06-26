import { ref, onMounted } from 'vue';
import { maintenance_api } from '@/api_factory/modules/maintenance';

export const useFetchMyHomeDetails = () => {
  const loading = ref(false);
  const myHomeInfo = ref({});

  const fetchMyHomeDetails = async () => {
    try {
      loading.value = true;
      const response = await maintenance_api.$_get_my_home() as any

      if (response?.type !== 'ERROR') {
        myHomeInfo.value = response?.data || {};

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
  onMounted(() => {
    fetchMyHomeDetails()
  });

  return {
    fetchMyHomeDetails,
    loading,
    myHomeInfo,
  };
};
