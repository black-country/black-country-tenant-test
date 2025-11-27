import { ref, onMounted, onUnmounted, computed } from "vue";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/composables/auth/user";
import { useCustomToast } from '@/composables/core/useCustomToast';

const { showToast } = useCustomToast();

// Global state to prevent flickering
const globalMessageCache = ref<Record<string, any[]>>({});

export const useWebSocket = () => {
  const { token, user } = useUser();
  const messagesByRoom = globalMessageCache; // Use global cache
  const activeRoomId = ref<string | null>(null);
  const newMessage = ref("");
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const isConnected = ref(false);
  const socket = ref<Socket | null>(null);
  const pendingMessages = ref<Set<string>>(new Set());

  const currentRoomMessages = computed(() => {
    if (!activeRoomId.value) return [];
    return messagesByRoom.value[activeRoomId.value] || [];
  });

  const setActiveRoom = (roomId: string) => {
    activeRoomId.value = roomId;
    if (!messagesByRoom.value[roomId]) {
      messagesByRoom.value[roomId] = [];
    }
  };

  const initializeSocket = () => {
    if (socket.value?.connected) return;

    socket.value = io(baseUrl, {
      auth: { token: token.value },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.value.on("connect", () => {
      isConnected.value = true;
      showToast({
        title: "Connected",
        message: "Chat connection established",
        toastType: "success",
        duration: 2000
      });
    });

    socket.value.on("disconnect", () => {
      isConnected.value = false;
    });

    socket.value.on("message.new", (data: any) => {
      if (!data?.message) return;
      
      const message = data.message;
      const roomId = message.room?.id || message.recipientId;
      
      if (!roomId) return;

      // Remove from pending
      if (pendingMessages.value.has(message.id)) {
        pendingMessages.value.delete(message.id);
      }

      // Initialize room if needed
      if (!messagesByRoom.value[roomId]) {
        messagesByRoom.value[roomId] = [];
      }

      // Check if message exists
      const existingIndex = messagesByRoom.value[roomId].findIndex(m => m.id === message.id);
      
      if (existingIndex !== -1) {
        // Update existing message
        const updated = [...messagesByRoom.value[roomId]];
        updated[existingIndex] = { ...message, status: 'received' };
        messagesByRoom.value = {
          ...messagesByRoom.value,
          [roomId]: updated
        };
      } else {
        // Add new message
        messagesByRoom.value = {
          ...messagesByRoom.value,
          [roomId]: [...messagesByRoom.value[roomId], {
            ...message,
            status: 'received'
          }]
        };
      }
    });

    socket.value.on("error", (error) => {
      console.error("Socket error:", error);
    });
  };

  const sendMessage = async (payload: {
    recipientId: string;
    recipientType: string;
    content: string;
    room?: string;
    messageType: string;
  }): Promise<any> => {
    if (!socket.value?.connected) {
      throw new Error("Not connected");
    }

    if (!payload.content?.trim()) {
      throw new Error("Empty message");
    }

    const roomId = payload.room || payload.recipientId;
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const currentUserId = user.value?.id;

    // Create optimistic message with correct senderId
    const optimisticMessage = {
      id: tempId,
      content: payload.content,
      senderId: currentUserId, // Use actual user ID
      senderType: user.value?.role || 'USER',
      recipientId: payload.recipientId,
      recipientType: payload.recipientType,
      messageType: payload.messageType,
      room: { id: roomId },
      roomId: roomId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'sending',
      readAt: null,
      receivedAt: null
    };

    // Add to pending
    pendingMessages.value.add(tempId);

    // Initialize room if needed
    if (!messagesByRoom.value[roomId]) {
      messagesByRoom.value[roomId] = [];
    }

    // Add optimistic message immediately
    const currentMessages = [...messagesByRoom.value[roomId]];
    currentMessages.push(optimisticMessage);
    
    messagesByRoom.value = {
      ...messagesByRoom.value,
      [roomId]: currentMessages
    };

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        pendingMessages.value.delete(tempId);
        // Update to error state
        const messages = [...messagesByRoom.value[roomId]];
        const idx = messages.findIndex(m => m.id === tempId);
        if (idx !== -1) {
          messages[idx] = { ...messages[idx], status: 'error' };
          messagesByRoom.value = {
            ...messagesByRoom.value,
            [roomId]: messages
          };
        }
        reject(new Error('Timeout'));
      }, 30000);

      socket.value?.emit("message.new", payload, (response: any) => {
        clearTimeout(timeout);
        pendingMessages.value.delete(tempId);

        if (response?.status === "success" && response?.data) {
          // Replace optimistic with real message - PRESERVE senderId
          const messages = [...messagesByRoom.value[roomId]];
          const idx = messages.findIndex(m => m.id === tempId);
          
          if (idx !== -1) {
            // Ensure senderId is preserved
            const serverMessage = {
              ...response.data,
              status: 'sent',
              senderId: response.data.senderId || currentUserId, // Fallback to current user
            };
            
            messages[idx] = serverMessage;
            messagesByRoom.value = {
              ...messagesByRoom.value,
              [roomId]: messages
            };
          }
          
          resolve(response.data);
        } else {
          // Update to error
          const messages = [...messagesByRoom.value[roomId]];
          const idx = messages.findIndex(m => m.id === tempId);
          if (idx !== -1) {
            messages[idx] = { ...messages[idx], status: 'error' };
            messagesByRoom.value = {
              ...messagesByRoom.value,
              [roomId]: messages
            };
          }
          reject(new Error(response?.message || 'Failed to send'));
        }
      });
    });
  };

  const markMessageAsRead = (roomId: string, recipientId: string) => {
    if (!socket.value?.connected || !roomId) return;

    socket.value.emit("message.read.all", { roomId, recipientId }, (response: any) => {
      if (response?.status === "success") {
        if (messagesByRoom.value[roomId]) {
          const messages = [...messagesByRoom.value[roomId]];
          const updated = messages.map(msg =>
            !msg.readAt && msg.senderId !== user.value.id
              ? { ...msg, readAt: new Date().toISOString() }
              : msg
          );
          
          messagesByRoom.value = {
            ...messagesByRoom.value,
            [roomId]: updated
          };
        }
      }
    });
  };

  const retryMessage = async (messageId: string, roomId: string) => {
    const message = messagesByRoom.value[roomId]?.find(m => m.id === messageId);
    if (!message || message.status !== 'error') return;

    const messages = [...messagesByRoom.value[roomId]];
    const idx = messages.findIndex(m => m.id === messageId);
    
    if (idx !== -1) {
      messages[idx] = { ...messages[idx], status: 'sending' };
      messagesByRoom.value = {
        ...messagesByRoom.value,
        [roomId]: messages
      };
    }

    try {
      await sendMessage({
        recipientId: message.recipientId,
        recipientType: message.recipientType || 'USER',
        content: message.content,
        room: roomId,
        messageType: message.messageType || 'private'
      });
    } catch (error) {
      throw error;
    }
  };

  // Merge new messages without flickering
  const mergeMessages = (roomId: string, newMessages: any[]) => {
    if (!newMessages || newMessages.length === 0) return;

    const existing = messagesByRoom.value[roomId] || [];
    const existingIds = new Set(existing.map(m => m.id));
    
    // Only add truly new messages
    const toAdd = newMessages.filter(m => !existingIds.has(m.id));
    
    if (toAdd.length === 0) return;

    const merged = [...existing, ...toAdd].sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    messagesByRoom.value = {
      ...messagesByRoom.value,
      [roomId]: merged
    };
  };

  onMounted(() => {
    initializeSocket();
  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.off("message.new");
      socket.value.disconnect();
      socket.value = null;
    }
  });

  return {
    newMessage,
    isConnected,
    sendMessage,
    socket: socket.value,
    messagesByRoom,
    currentRoomMessages,
    setActiveRoom,
    activeRoomId,
    markMessageAsRead,
    retryMessage,
    mergeMessages
  };
};