import { ref, onMounted } from 'vue';
import { home_api } from '@/api_factory/modules/home';

const route = useRoute()

export const useFetchBillersInfo = () => {
  const loading = ref(false);
  const billersListObj = ref([]);

  const fetchBillersInfo = async (billerId: any) => {
    try {
      loading.value = true;
      const response = await home_api.$_get_billers_info(billerId) as any
      console.log(response, 'res ponse gere')

      if (response?.status === 200 || response?.status === 201) {
        billersListObj.value = response?.data || {};

      } else {
        console.error('Failed to fetch home info:', response);
      }
    } catch (error) {
      console.error('Error fetching home info:', error);
    } finally {
      loading.value = false;
    }
    loading.value = false;
  };


  return {
    loading,   
    billersListObj,
    fetchBillersInfo
  };
};
