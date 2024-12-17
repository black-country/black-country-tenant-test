import { ref, watch } from 'vue';
import { property_api } from "@/api_factory/modules/property";
import { useCustomToast } from '@/composables/core/useCustomToast'

const { showToast } = useCustomToast();
const loading = ref(false);

const properties = ref([])

export const useFilterProperty = () => {
  // Reactive state for filter payload
  const filterPayload = ref({
    order: [
      {
        "field": "price",
        "value": "DESC"
    },
    {
        "field": "createdAt",
        "value": "DESC"
    }
    ],
    sharedCount: 0,
    houseTypeIds: [],
    priceMin: 200000,
    priceMax: 3000000,
    bedroomsCount: [],
    bathroomsCount: [],
    roomSizeMin: 1000,
    roomSizeMax: 3000,
    roomSizeUnit: '',
    amenities: [],
    availabilityFrom: "",
    isFurnished: [true, false],
    availableNow: false,
    pets: []
  });

  // Dynamically set filter payload
  const setPayload = (newFilterPayload: any) => {
    Object.assign(filterPayload.value, newFilterPayload);
  };

  // Function to handle property filtering
  const filterProperty = async () => {
    loading.value = true;

    try {
      const res = await property_api.$_filter_listings(filterPayload.value) as any
       console.log(res, 'tes here')
      if (res.status == 201) {
        showToast({
          title: "Success",
          message: "Properties filtered successfully.",
          toastType: "success",
          duration: 3000
        });
        properties.value = res?.data?.result ?? []
        return res?.data?.result
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


// import { ref, watch } from 'vue';
// import { property_api } from "@/api_factory/modules/property";
// import { useCustomToast } from '@/composables/core/useCustomToast';

// interface FilterPayload {
//   order?: { field: string; value: string }[];
//   sharedCount?: number;
//   houseTypeIds?: number[];
//   priceMin?: number;
//   priceMax?: number;
//   bedroomsCount?: number[];
//   bathroomsCount?: number[];
//   roomSizeMin?: number;
//   roomSizeMax?: number;
//   roomSizeUnit?: string;
//   amenities?: string[];
//   availabilityFrom?: string;
//   isFurnished?: boolean[];
//   availableNow?: boolean;
//   pets?: string[];
// }

// export const useFilterProperty = () => {
//   const { showToast } = useCustomToast();
//   const loading = ref(false);
//   const properties = ref([]);
  
//   // Store initial state
//   const initialState: FilterPayload = {
//     order: [
//       { field: "price", value: "DESC" },
//       { field: "createdAt", value: "DESC" }
//     ],
//     sharedCount: 0,
//     houseTypeIds: [],
//     priceMin: 200000,
//     priceMax: 3000000,
//     bedroomsCount: [],
//     bathroomsCount: [],
//     roomSizeMin: 1000,
//     roomSizeMax: 3000,
//     roomSizeUnit: '',
//     amenities: [],
//     availabilityFrom: "",
//     isFurnished: [true, false],
//     availableNow: false,
//     pets: []
//   };

//   // Current filter state
//   const filterPayload = ref<FilterPayload>({ ...initialState });
  
//   // Store for tracking changed fields
//   const changedFields = ref<FilterPayload>({});

//   // Watch for changes in filterPayload
//   watch(filterPayload, (newVal, oldVal) => {
//     if (!oldVal) return;

//     // Compare each field and store only changed values
//     Object.keys(newVal).forEach((key) => {
//       const typedKey = key as keyof FilterPayload;
//       const newValue = newVal[typedKey];
//       const oldValue = oldVal[typedKey];

//       if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
//         changedFields.value[typedKey] = newValue;
//       }
//     });
//   }, { deep: true });

//   // Function to set payload and track changes
//   const setPayload = (newFilterPayload: Partial<FilterPayload>) => {
//     Object.entries(newFilterPayload).forEach(([key, value]) => {
//       const typedKey = key as keyof FilterPayload;
//       if (JSON.stringify(filterPayload.value[typedKey]) !== JSON.stringify(value)) {
//         filterPayload.value[typedKey] = value;
//         changedFields.value[typedKey] = value;
//       }
//     });
//   };

//   // Reset changed fields after successful API call
//   const resetChangedFields = () => {
//     changedFields.value = {};
//   };

//   // Function to handle property filtering
//   const filterProperty = async () => {
//     if (Object.keys(changedFields.value).length === 0) {
//       showToast({
//         title: "Info",
//         message: "No changes to filter",
//         toastType: "info",
//         duration: 3000
//       });
//       return;
//     }

//     loading.value = true;

//     try {
//       const res = await property_api.$_filter_listings(changedFields.value);
//       console.log(res, 'filter tes')
//       if (res.status === 201) {
//         showToast({
//           title: "Success",
//           message: "Properties filtered successfully.",
//           toastType: "success",
//           duration: 3000
//         });
//         properties.value = res?.data?.result || [];
//         resetChangedFields(); // Reset after successful API call
//         return res?.data?.result;
//       } else {
//         showToast({
//           title: "Error",
//           message: res.data.error,
//           toastType: "error",
//           duration: 3000
//         });
//       }
//     } catch (error) {
//       showToast({
//         title: "Error",
//         message: "An unexpected error occurred.",
//         toastType: "error",
//         duration: 3000
//       });
//     } finally {
//       loading.value = false;
//     }
//   };

//   // Function to reset filters to initial state
//   const resetFilters = () => {
//     filterPayload.value = { ...initialState };
//     changedFields.value = {};
//   };

//   return {
//     filterProperty,
//     properties,
//     setPayload,
//     loading,
//     filterPayload,
//     resetFilters,
//   };
// };