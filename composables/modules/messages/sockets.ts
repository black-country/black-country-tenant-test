import { ref, onMounted, onBeforeUnmount } from 'vue';
import { io } from 'socket.io-client';
import { useUser } from "@/composables/auth/user";


export const useWebSocket = () => {
  const { token } = useUser();
  const messages = ref([]) as any 
  const newMessage = ref('');
  const baseUrl = 'https://tracman-8jhi.onrender.com';
  const socketUrl = `${baseUrl}`;
  const isConnected = ref(false);

  let socket: any; 


  const connectWebSocket = () => {
    onMounted(() => {
      socket = io(socketUrl, {
        query: {
          token: token.value,
        },
        transports: ['websocket']
      });

      
      socket.on('message.new', (message: any) => {
        messages.value.push(message);
      });

      socket.on('disconnect', () => {
        isConnected.value = false;
        console.log('Disconnected from server');
      });

      socket.on('error', (error: any) => {
        console.log(error, 'error occured')
        console.log('Something went wrong');
      });


      socket.on('connect', () => {
        isConnected.value = true;
        console.log('Connected to WebSocket server');
      });
    });

    onBeforeUnmount(() => {
      if (socket) {
        socket.off('message.new'); 
        socket.close(); 
      }
    });
  }

  function sendMessage(payload: any) {
    const message = {
      recipientId: payload.recipientId,
      recipientType: payload.recipientType,
      content: payload.content,
      room: payload.room,
      messageType: payload.messageType,
    };
  
    console.log(message, 'message');
  
    // Emit the message to the server
    socket.emit('message.new', message, (response: any) => {
      // If the response from the WebSocket server indicates success, push the message to the messages array
      if (response.status === 'success') {
        messages.value.push({
          ...response.data,
          status: 'sent',
        });
        console.log(messages.value, 'messages array here')
      } else {
        console.log('Message failed to send:', response);
  
        // Handle failure case, if necessary (e.g., notify user, retry, etc.)
        messages.value.push({
          ...message,
          status: 'error', // Set status as 'error' if message failed to send
        });
      }
    });
  
    // Clear the input after attempting to send the message
    newMessage.value = '';
  }
  
  

  return {
    messages,
    newMessage,
    connectWebSocket,
    isConnected,
    sendMessage,
  };
}
