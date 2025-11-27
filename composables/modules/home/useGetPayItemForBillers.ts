import { ref, onMounted } from 'vue';
import { home_api } from '@/api_factory/modules/home';

export const useFetchPayItemsByBillers = () => {
  const loading = ref(false);
  const payItemsList = ref([]);

  const fetcPayItemsByBillers = async (id: string) => {
    try {
      loading.value = true;
      const response = await home_api.$_get_payitem_for_billers(id) as any

      if (response?.type !== 'ERROR') {
        payItemsList.value = response?.data?.PaymentItems || [];

      } else {
        console.error('Failed to fetch home info:', response);
      }
    } catch (error) {
      console.error('Error fetching home info:', error);
    } finally {
      loading.value = false;
    }
  };


  return {
    loading,
    payItemsList,
    fetcPayItemsByBillers
  };
};
