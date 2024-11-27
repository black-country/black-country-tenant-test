import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { maintenance_api } from '@/api_factory/modules/maintenance';
import { useInitiateMoveIn } from '@/composables/modules/maintenance/useInitiateMoveIn';

export const useFetchMyHomeInfo = () => {
  const loading = ref(false);
  const myHomeInfo = ref({});
  const router = useRouter();
  const route = useRoute();

  const fetchMyHomeInfo = async () => {
    try {
      loading.value = true;
      const response = await maintenance_api.$_get_my_home();

      if (response?.type !== 'ERROR') {
        myHomeInfo.value = response?.data || {};

        // Update localStorage with user data if needed
        const userObj = JSON.parse(localStorage.getItem('user') || '{}');
        if (response?.data?.movedIn) {
          localStorage.setItem('user', JSON.stringify({ ...userObj, ...response?.data }));
          router.push('/dashboard/home/details');
        }
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
  onMounted(fetchMyHomeInfo);

  return {
    fetchMyHomeInfo,
    loading,
    myHomeInfo,
  };
};
