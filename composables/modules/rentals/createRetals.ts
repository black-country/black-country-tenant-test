import { rental_api } from "@/api_factory/modules/rental";

const rentalApplicationPayload = ref({
    id: '',
    houseId: '',
    roomId: '',
    idDocument: {
      type: '',
      fileUrls: [],
    },
    questionAnswers: [],
  });

export function useCreateRentalApplication() {
    const loading = ref(false)


  const createRentalApplication = async () => {
    loading.value = true;

    const payload = {
        houseId: rentalApplicationPayload.value.houseId,
        roomId: rentalApplicationPayload.value.roomId,
        idDocument: rentalApplicationPayload.value.idDocument,
        questionAnswers: rentalApplicationPayload.value.questionAnswers
    }

    const res = await rental_api.$_create(rentalApplicationPayload.value.id, payload) as any
    if (res.type !== 'ERROR') {
        useRouter().push('/dashboard/rentals')
    }
    loading.value = false
  }

  return {
    loading,
    createRentalApplication,
    rentalApplicationPayload
  };
}
