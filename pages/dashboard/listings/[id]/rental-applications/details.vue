<template>
  <main>
    <TopNavBar />
    <RentalApplication  />
  </main>
</template>

<script setup lang="ts">
import { useInitializeRentPayment } from "@/composables/modules/rentals/useInitializeRentPayment";
import { useFetchRental } from '@/composables/modules/rentals/fetchRentalsById'
import { useGetRental } from "@/composables/modules/rentals/useFetchRental";
// import { useCheckout } from "@/composables/modules/banks/useCheckout";
import { useCancelRental } from "@/composables/modules/rentals/cancelRentals";
import { useFetchProperty } from "@/composables/modules/property/fetchProperty";
import { useFetchSimilarProperty } from "@/composables/modules/property/fetchSimilarProperties";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { useBookmarkProperty } from "@/composables/modules/property/bookmark";
const { bookmarkProperty, loading: favoriting } = useBookmarkProperty();
const { propertyList, loading: loadingSimilarProperties } =
  useFetchSimilarProperty();
  const { propertyObj, loading } = useFetchProperty();
const { cancelRental, loading: cancelling } = useCancelRental();
const { loadingRental, rentalObj, getRental } = useGetRental();
const { rentalObj: rental, loading: fetching } = useFetchRental()
const {
  initializeRentPayment,
  loading: initializing,
  payload,
  responseObj,
  setPayloadObj 
} = useInitializeRentPayment();
const router = useRouter()
const route = useRoute()

// watch(
//     () => route,
//     (newId, oldId) => {
//         console.log(newId?.params?.id, 'updated route here 00000000')
//         // fetchPolicyById();
//         getRental(propertyObj);
//     },
//     { immediate: true } // Ensures the watcher runs immediately
// );

// const route = useRoute();
const { showToast } = useCustomToast();

const showCancelModal = ref(false);


const onCancel = () => {
  showCancelModal.value = false;
};

const onConfirm = async () => {
  await cancelRental(propertyObj.value.rentalApplication.id);
  showCancelModal.value = false;
};
// Property Images

const selectedOption = ref<string | null>(null);

const paymentOptions = [
  { label: "Pay with Transfer", value: "transfer" },
  { label: "Pay with Card", value: "card" },
  { label: "Pay with Linked Bank", value: "bank" },
];

const selectPaymentOption = (value: string) => {
  selectedOption.value = value;
};

const proceed = async () => {
  const payloadObj = {
      rentalApplicationId: propertyObj.value.rentalApplication?.id,
      rentAmount: propertyObj.value.rentalApplication?.room?.rentAmount
    };
    
    setPayloadObj(payloadObj);
    await initializeRentPayment();
};

const cancel = () => {
  selectedOption.value = null;
};

const showShareModal = ref(false);
// const showBookingModal = ref(true);

// Property Manager

// Similar Properties

// const handleFavorite = () => {};

const shareLink = ref(`https://www.blackcountry.com/${route.fullPath}`);
// Function to copy the link to the clipboard
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(shareLink.value);
    showToast({
      title: "Success",
      message: "Link copied!",
      toastType: "success",
      duration: 3000,
    });
  } catch (err) {
    showToast({
      title: "Error",
      message: "Failed to copy link",
      toastType: "error",
      duration: 3000,
    });
  }
};

definePageMeta({
  middleware: "auth",
});

const showPaymentModal = ref(false);

// const steps = ref([
//   { label: 'Tour Schedule', status: 'completed', progress: propertyObj?.value?.rentalApplication?.progress },
//   { label: 'Application sent', status: 'active', progress: propertyObj?.value?.rentalApplication?.progress },
//   { label: 'Agreement signed', status: 'pending', progress: propertyObj?.value?.rentalApplication?.progress },
//   { label: 'Payment made', status: 'pending', progress: propertyObj?.value?.rentalApplication?.progress }
// ]);

const steps = ref([
  {
    label: "Tour Schedule",
    status: "completed",
    progressKey: "tour-scheduled",
  },
  {
    label: "Application Sent",
    status: "active",
    progressKey: "application-sent",
  },
  {
    label: "Agreement Signed",
    status: "pending",
    progressKey: "agreement-signed",
  },
  { label: "Payment Made", status: "pending", progressKey: "payment-made" },
]);

const currentProgress = computed(
  () => propertyObj?.value?.rentalApplication?.progress || "tour-scheduled"
);

// Determine button states
const isCancelEnabled = computed(
  () => currentProgress.value === "application-sent"
);


const isScheduleTourCancelApplicationDisabled = computed(
  () => currentProgress.value === "agreement-pending-signage" || propertyObj?.value?.rentalLeaseAgreement?.status === 'PENDING_SIGNAGE'
);

const isScheduleTourDisabled = computed(() => {
  return currentProgress.value === "agreement-pending-signage" || propertyObj?.value?.rentalLeaseAgreement?.status === 'PENDING_SIGNAGE' ||  currentProgress.value === "agreement-signed" ||  currentProgress.value === "application-sent"
})

const isCancelApplicationDisabled = computed(() => {
  return currentProgress.value === "agreement-pending-signage" || propertyObj?.value?.rentalLeaseAgreement?.status === 'PENDING_SIGNAGE' ||  currentProgress.value === "agreement-signed" ||  currentProgress.value === "application-sent"
})

const isMakePaymentDisabled = computed(() => {
  return currentProgress.value === "agreement-pending-signage" || propertyObj?.value?.rentalLeaseAgreement?.status === 'PENDING_SIGNAGE' || currentProgress.value === "application-sent"
})

const isSignBtnEnabled = computed(() => {
  return currentProgress.value === "agreement-pending-signage" || propertyObj?.value?.rentalLeaseAgreement?.status === 'PENDING_SIGNAGE' ||  currentProgress.value !== "agreement-signed" ||  currentProgress.value === "application-sent"
})

const isRescheduleEnabled = computed(
  () => currentProgress.value === "application-sent"
);
const isSignAgreementEnabled = computed(
  () => currentProgress.value === "agreement-signed"
);
const isMakePaymentEnabled = computed(
  () => currentProgress.value === "payment-made"
);


// const cancelApplication = () => {
//   console.log('Cancel application clicked');
//   await cancelRental(proper)
//   // Your cancel logic here...
// };

const toggleLike = async () => {
  await bookmarkProperty(propertyObj.value.id);
};
</script>

<style scoped>
/* Additional styling for specific elements can be added here */
</style>
