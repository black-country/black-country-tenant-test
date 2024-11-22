import { ref, computed } from 'vue';

export const useRooms = (roomData: any) => {
  // Check if roomData is defined and is an array
  if (!roomData || !Array.isArray(roomData)) {
    return { rooms: ref([]) }; // Return empty array if data is invalid
  }

  const rooms = ref(
    roomData.map((room: any) => ({
      id: room.id,
      name: room.name,
      price: `#${(room.rentAmount).toLocaleString()}/month`,
      // rentalApplication: Object.keys(room?.rentalApplication).length ? true : false,
      rentalApplication: room?.rentalApplication?.status === 'APPROVED' ? true : false,
      available: room.availability !== 'unavailable' ? true : false
    }))
  );

  const arrangedRooms = computed(() => {
    return rooms.value.sort((a, b) => a.available - b.available);
  });

  return { rooms: arrangedRooms };
}
