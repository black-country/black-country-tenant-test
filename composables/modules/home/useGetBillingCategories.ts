import { ref, onMounted } from 'vue';
import { home_api } from '@/api_factory/modules/home';

export const useFetchBillingCategories = () => {
  const loading = ref(false);
  const billingCategories = ref([]);

  const fetchBillingCategories = async () => {
    try {
      loading.value = true;
      const response = await home_api.$_get_billing_categories() as any
       console.log(response.data, 'rws here')
      if (response?.type !== 'ERROR') {
        billingCategories.value = response?.data?.BillerCategories || [];

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
    fetchBillingCategories()
  });

  return {
    loading,
    billingCategories,
  };
};
