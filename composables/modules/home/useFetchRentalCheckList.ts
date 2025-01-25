// import { home_api } from "@/api_factory/modules/home";
// import { useUser } from "@/composables/auth/user";
// const loading = ref(false)
// const rentalChecklist = ref([])
// const { user } = useUser()
// const route = useRoute()

// export const useFetchRentalChecklist = () => {
// 	const route = useRoute()

// 	const fetchRentalChecklist = async () => {
// 		const route = useRoute()
// 		loading.value = true
// 		const res = await home_api.$_get_rental_checklist(route?.params?.rentalId) as any
//         if (res.type !== 'ERROR') {
// 			rentalChecklist.value = res?.data
//         }
//         loading.value = false
// 	}

// 	onMounted(() => {
// 		fetchRentalChecklist()
// 	})

// 	watch(() => route, () => {
// 		fetchRentalChecklist()
// 	})

// 	return { loading, rentalChecklist }
// }

import { home_api } from "@/api_factory/modules/home";
import { useUser } from "@/composables/auth/user";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

const loading = ref(false);
const rentalChecklist = ref([]);
const { user } = useUser();

export const useFetchRentalChecklist = () => {
    const route = useRoute(); // Declare the route at the top level

    const fetchRentalChecklist = async () => {
        console.log(route, 'router here')
        const rentalId = route?.query?.rentalId; // Get the rentalId from the route params
        if (!rentalId) {
            console.error("Rental ID is missing from the route parameters");
            return;
        }
        loading.value = true;
        try {
            const res = await home_api.$_get_rental_checklist(rentalId) as any; // Pass rentalId to the API
            if (res.type !== 'ERROR') {
                rentalChecklist.value = res?.data;
            }
        } catch (error) {
            console.error("Error fetching rental checklist:", error);
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        fetchRentalChecklist(); // Fetch the checklist on component mount
    });

    watch(() => route.query.rentalId, () => {
        fetchRentalChecklist(); // Re-fetch the checklist when rentalId changes
    });

    return { loading, rentalChecklist };
};
