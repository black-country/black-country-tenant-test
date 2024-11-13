import { rental_api } from "@/api_factory/modules/rental";

export const useGetRental = () => {
  const loadingRental = ref(false);
  const rentalObj = ref([] as any);
  const route = useRoute() as any;
  const { $_fetch_single_rental } = rental_api;
  const getRental = async () => {
    console.log(route.query.rentalId, "route here");
    loadingRental.value = true;
    try {
      const res = (await $_fetch_single_rental(route.query.rentalId)) as any;
      if (res.type !== "ERROR") {
        rentalObj.value = res?.data
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      loadingRental.value = false;
    }
  };

  onMounted(() => {
    getRental();
  });

  return {
    getRental,
    loadingRental,
    rentalObj,
  };
};
