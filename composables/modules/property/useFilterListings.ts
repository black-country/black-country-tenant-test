import { ref, watch } from 'vue';
import { property_api } from "@/api_factory/modules/property";
import { useCustomToast } from '@/composables/core/useCustomToast'

const { showToast } = useCustomToast();
const loading = ref(false);

const properties = ref([])

export const useFilterProperty = () => {
  // Reactive state for filter payload
  const filterPayload = ref<FilterPayload>({
    order: [{ field: 'price', value: 'DESC' }],
    sharedCount: 0,
    houseTypeIds: [],
    priceMin: 200000,
    priceMax: 3000000,
    bedroomsCount: [],
    bathroomsCount: [],
    roomSizeMin: 200,
    roomSizeMax: 6000,
    roomSizeUnit: 'sqm',
    amenities: [],
    pets: []
  });

  // Dynamically set filter payload
  const setPayload = (newFilterPayload: Partial<FilterPayload>) => {
    Object.assign(filterPayload.value, newFilterPayload);
  };

  // Function to handle property filtering
  const filterProperty = async () => {
    loading.value = true;

    try {
      const res = await property_api.$_filter_listings(filterPayload.value);
       console.log(res, 'tes here')
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: "Properties filtered successfully.",
          toastType: "success",
          duration: 3000
        });
        properties.value = res?.data?.result || []
      } else {
        showToast({
          title: "Error",
          message: res.data.error,
          toastType: "error",
          duration: 3000
        });
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "An unexpected error occurred.",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  return { filterProperty, properties, setPayload, loading, filterPayload };
};
