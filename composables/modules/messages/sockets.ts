// import { ref, onMounted, onBeforeUnmount } from "vue";
// import { io } from "socket.io-client";
// import { useUser } from "@/composables/auth/user";
// import { useGetRoomChats } from '@/composables/modules/messages/fetchRoomMessages'

// export const useWebSocket = () => {
//   const { token } = useUser();
//   const messages = ref([]) as any;
//   const { getRoomChats, roomChatsList } = useGetRoomChats()
//   const newMessage = ref("");
//   const baseUrl = import.meta.env.VITE_BASE_URL;
//   const socketUrl = `${baseUrl}`;
//   const isConnected = ref(false);

//   let socket: any;

//   const connectWebSocket = () => {
//     onMounted(() => {
//       socket = io(socketUrl, {
//         query: {
//           token: token.value,
//         },
//         transports: ["websocket"],
//       });

//       socket.on("message.new", (message: any) => {
//         console.log(message, 'web socket from tenant nee')
//         messages.value.push(message);
//       });

//       // Listen for updated message list after sending a new message or receiving one
//       socket.on("messages.update", (updatedMessages: any) => {
//         messages.value = updatedMessages;
//       });

//       socket.on("disconnect", () => {
//         isConnected.value = false;
//         console.log("Disconnected from server");
//       });

//       socket.on("error", (error: any) => {
//         console.log(error, "error occured");
//         console.log("Something went wrong");
//       });

//       socket.on("connect", () => {
//         isConnected.value = true;
//         console.log("Connected to WebSocket server");
//       });

//       // Fetch all messages on initial connection
//       socket.emit("messages.fetch", {}, (response: any) => {
//         if (response.status === "success") {
//           messages.value = response.data;
//         } else {
//           console.log("Failed to fetch messages:", response);
//         }
//       });
//     });

//     onBeforeUnmount(() => {
//       if (socket) {
//         socket.off("message.new");
//         socket.off("messages.update"); // Clean up the listener
//         socket.close();
//       }
//     });
//   };

//   function sendMessage(payload: any) {
//     const message = {
//       recipientId: payload.recipientId,
//       recipientType: payload.recipientType,
//       content: payload.content,
//       room: payload.room,
//       messageType: payload.messageType,
//     };

//     console.log(message,'message from socket composable')

//      // Optimistically add the message to the messages array with status 'sending'
//   const temporaryMessageId = Math.random().toString(36).substring(7); // Create a temporary ID for the message
//   const tempMessage = {
//     ...message,
//     id: temporaryMessageId,
//     status: "sending", // Status to show it’s being sent
//   };

//   messages.value.push(tempMessage); // Add the message optimistically

//     // Emit the message to the server
//     socket.emit("message.new", message, (response: any) => {
//       // If the response from the WebSocket server indicates success, push the message to the messages array
//       if (response.status === "success") {
//         const index = messages.value.findIndex((msg: any) => msg.id === temporaryMessageId);
//         if (index !== -1) {
//           // Replace the temporary message with the confirmed message data
//           messages.value[index] = {
//             ...response.data,
//             status: "sent", // Update the status to 'sent'
//           };
//         }

//         messages.value.push({
//           ...response.data,
//           status: "sent",
//         });

//         getRoomChats(response?.data?.room?.id)

//         const { $emitter } = useNuxtApp();
//         $emitter.emit('customEvent', { data: response?.data?.room?.id, response: response?.data });

//         // const nuxtApp = useNuxtApp(); // Access the nuxtApp to use the global event emitter
//         // nuxtApp.$emitter.emit('messageSent', response.data);

//         socket.emit("messages.fetch", {}, (fetchResponse: any) => {
//           if (fetchResponse.status === "success") {
//             messages.value = fetchResponse.data; // Update the messages list
//           } else {
//             console.log("Failed to update messages:", fetchResponse);
//           }
//         });
//       } else {
//         console.log("Message failed to send:", response);

//         const index = messages.value.findIndex((msg: any) => msg.id === temporaryMessageId);
//         if (index !== -1) {
//           messages.value[index].status = "error"; // Update the status to 'error'
//         }
//         console.log("Message failed to send:", response);

//         // Handle failure case, if necessary (e.g., notify user, retry, etc.)
//         messages.value.push({
//           ...message,
//           status: "error", // Set status as 'error' if message failed to send
//         });
//       }
//     });

//     // Clear the input after attempting to send the message
//     newMessage.value = "";
//   }

//   return {
//     messages,
//     newMessage,
//     connectWebSocket,
//     isConnected,
//     sendMessage,
//   };
// };

import { ref, onMounted, onUnmounted } from "vue";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/composables/auth/user";
import { useGetRoomChats } from '@/composables/modules/messages/fetchRoomMessages';

export const useWebSocket = () => {
  const { token } = useUser();
  const messages = ref<any[]>([]);
  const { getRoomChats } = useGetRoomChats();
  const newMessage = ref("");
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const isConnected = ref(false);
  const socket = ref<Socket | null>(null);

  const initializeSocket = () => {
    socket.value = io(baseUrl, {
      auth: {
        token: token.value,
      },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Connection events
    socket.value.on("connect", () => {
      console.log("Connected to WebSocket server");
      isConnected.value = true;
      fetchInitialMessages();
    });

    socket.value.on("disconnect", () => {
      console.log("Disconnected from server");
      isConnected.value = false;
    });

    socket.value.on("connect_error", (error) => {
      console.error("Connection error:", error);
      isConnected.value = false;
    });

    // Message handling
    // socket.value.on("message.new", (message: any) => {
    //   console.log("New message received:", message);
    //   if (message && !messages.value.some(msg => msg.id === message?.message?.id)) {
    //     messages.value = [...messages.value, {
    //       ...message,
    //       status: 'received'
    //     }];
    //   }
    // });
    socket.value.on("message.new", (message: any) => {
      console.log("New message receivedssssssss:", message.message);
      if (message && !messages.value.some(msg => msg.id === message?.message?.id)) {
        const newMessage = {
          ...message.message, // Use only the message object
          status: 'received' // Set the status here
        };
        messages.value = [...messages.value, newMessage];
      }
    });

    socket.value.on("messages.update", (updatedMessages: any[]) => {
      console.log("Messages updated:", updatedMessages);
      messages.value = updatedMessages.map(msg => ({
        ...msg,
        status: 'received'
      }));
    });
  };

  const fetchInitialMessages = () => {
    if (!socket.value?.connected) return;

    socket.value.emit("messages.fetch", {}, (response: any) => {
      if (response.status === "success") {
        messages.value = response.data.map((msg: any) => ({
          ...msg,
          status: 'received'
        }));
      } else {
        console.error("Failed to fetch messages:", response);
      }
    });
  };

  const sendMessage = async (payload: {
    recipientId: string;
    recipientType: string;
    content: string;
    room?: string;
    messageType: string;
  }) => {
    if (!socket.value?.connected) {
      console.error("Socket not connected");
      return;
    }

    // Create temporary message
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const tempMessage = {
      id: tempId,
      ...payload,
      status: 'sending',
      timestamp: new Date().toISOString(),
    };

    // Add to messages immediately
    messages.value = [...messages.value, tempMessage];

    // Send message
    return new Promise((resolve, reject) => {
      socket.value?.emit("message.new", payload, (response: any) => {
        if (response.status === "success") {
          // Update temp message with actual message data
          messages.value = messages.value.map(msg => 
            msg.id === tempId 
              ? { ...response.data, status: 'sent' }
              : msg
          );

          // Update room chats if needed
          if (payload.room) {
            getRoomChats(response?.data?.room?.id);
          }

          // Emit custom event if needed
          const { $emitter } = useNuxtApp();
          $emitter.emit('messageSent', {
            roomId: response?.data?.room?.id,
            message: response?.data
          });

          resolve(response.data);
        } else {
          // Update temp message to show error
          messages.value = messages.value.map(msg => 
            msg.id === tempId 
              ? { ...msg, status: 'error' }
              : msg
          );
          
          console.error("Failed to send message:", response);
          reject(new Error(response.message || 'Failed to send message'));
        }
      });
    });
  };

  onMounted(() => {
    initializeSocket();
  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.off("message.new");
      socket.value.off("messages.update");
      socket.value.disconnect();
      socket.value = null;
    }
  });

  return {
    messages,
    newMessage,
    isConnected,
    sendMessage,
    socket: socket.value,
  };
};