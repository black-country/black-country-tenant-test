<template>
    <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
      <div class="text-center my-3 text-sm text-gray-400">Today</div>
      <ChatMessageBubble
      v-for="(msg, index) in roomChats"
      :key="index"
      :message="msg"
      :isMine="msg.senderId === user.id"
      :status="msg.status"
      />
    </div>
  </template>
  
  <script setup lang="ts">  
  import { useUser } from "@/composables/auth/user";
  const { user } = useUser();
  const props = defineProps({
    messages: Array,
    roomChats: Array
  });
  </script>
  
  <style scoped></style>
  
<!-- 
   <template>
    <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
      <div class="text-center my-3 text-sm text-gray-400">Today</div>
  {{messages}}dddd
      <ChatMessageBubble
        v-for="(msg, index) in messages"
        :key="index"
        :message="msg"
        :isMine="msg.senderId === user.id"
        :status="msg.status"
      />
    </div>
  </template>
  
  <script setup lang="ts">  
  import { useWebSocket } from "@/composables/modules/messages/sockets"; // Assuming the path
  import { useUser } from "@/composables/auth/user";
  
  // Get user data
  const { user } = useUser();
  
  // Connect to WebSocket and get messages
  const { messages, connectWebSocket, sendMessage, isConnected } = useWebSocket();
  
  // Connect to the WebSocket on component mount
  connectWebSocket();
  </script>
   -->