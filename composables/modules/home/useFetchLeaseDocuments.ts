import { ref, onMounted } from 'vue';
import { home_api } from '@/api_factory/modules/home';
import { useUser } from '@/composables/auth/user';

export const useFetchLeaseDocuments = () => {
  const loading = ref(false);
  const leaseDocuments = ref([]);
  const { user } = useUser()

  const fetchLeaseDocuments = async () => {
    try {
      loading.value = true;
      const response = await home_api.$_get_lease_documents(user?.value?.id) as any
       console.log(response.data, 'rws here')
      if (response?.type !== 'ERROR') {
        leaseDocuments.value = response?.data?.result || [];

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
    fetchLeaseDocuments()
  });

  return {
    loading,
    leaseDocuments,
  };
};
