import { computed } from 'vue';

export function useAvailableRooms(rooms: any) {
  return computed(() => {
    if (!rooms || !Array.isArray(rooms)) return 0;
    return rooms.filter((room: any) => 
      room.availability === 'available_now'
    ).length;
  });
}