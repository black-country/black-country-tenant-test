import { ref, onMounted } from 'vue';
import { home_api } from '@/api_factory/modules/home';

const route = useRoute()

export const useFetchBillersByCategories = () => {
  const loading = ref(false);
  const billersList = ref({});

  const fetchBillersByCategories = async () => {
    try {
      loading.value = true;
      const response = await home_api.$_get_billers_by_category(route?.query?.billType) as any

      if (response?.type !== 'ERROR') {
        billersList.value = response?.data?.BillerList || {};

      } else {
        console.error('Failed to fetch home info:', response);
      }
    } catch (error) {
      console.error('Error fetching home info:', error);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchBillersByCategories()
  })


  return {
    loading,   
    billersList,
    fetchBillersByCategories
  };
};
