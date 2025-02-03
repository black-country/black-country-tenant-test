<!-- <template>
    <div class="flex-1 z-10 overflow-y-auto p-4 space-y-3 bg-white">
      <div v-for="(msg, index) in sortedMessagesWithHeaders" :key="msg.id || msg.dateHeader">
        <div v-if="msg.isHeader" class="text-center my-3 text-sm text-gray-400">
          {{ msg.dateHeader }}
        </div>
        
        <ChatMessageBubble
          v-else
          :message="msg"
          :isMine="msg.senderId === user.id"
          :status="msg.status"
          :messages="messages"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import moment from 'moment';
  import { computed } from 'vue';
  import { useUser } from "@/composables/auth/user";
  
  const { user } = useUser();
  const props = defineProps({
    messages: Array,
    roomChats: Array
  });
  
  // Merge messages and roomChats, then sort and add date headers
  const sortedMessagesWithHeaders = computed(() => {
    const allMessages = [...props.messages, ...props.roomChats];
    const sorted = allMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
    const messagesWithHeaders = [];
    let lastDateHeader = '';
  
    sorted.forEach((msg) => {
      const messageDate = formatMessageDate(msg.createdAt);
  
      // Add a date header if it differs from the last one
      if (messageDate !== lastDateHeader) {
        messagesWithHeaders.push({ isHeader: true, dateHeader: messageDate });
        lastDateHeader = messageDate;
      }
      messagesWithHeaders.push(msg);
    });
  
    return messagesWithHeaders;
  });
  
  // Helper to format dates into "Today", "Yesterday", or a full date
  const formatMessageDate = (date: string): string => {
    const today = moment().startOf('day');
    const messageDate = moment(date);
  
    if (messageDate.isSame(today, 'day')) {
      return 'Today';
    } else if (messageDate.isSame(today.clone().subtract(1, 'days'), 'day')) {
      return 'Yesterday';
    } else {
      return messageDate.format('MMMM D, YYYY');
    }
  };



// Watch for new messages and scroll to the bottom
watch(props.messages, (newMessages) => {
  if (newMessages.length > 0) {
    scrollToBottom();
  }
}, { deep: true });


const scrollToBottom = () => {
      const chatWindow = document.querySelector('.custom-scrollbar');
      if (chatWindow) {
        chatWindow.scrollTop = chatWindow.scrollHeight;
      }
    };


onMounted(() => {
      scrollToBottom();
    });

    // Watch for changes in messages and scroll to the bottom
    watch(
      () => props.messages,
      async (newMessages) => {
        if (newMessages.length > 0) {
          await nextTick(); // Ensure DOM updates are applied before scrolling
          scrollToBottom();
        }
      },
      { deep: true }
    );
  </script>
   -->

<!-- 
   <template>
    <div ref="scrollContainer" class="flex-1 scroll-container z-10 overflow-y-auto p-4 space-y-3 bg-white">
      <div v-for="(msg, index) in sortedMessagesWithHeaders" :key="msg.id || msg.dateHeader">
        <span class="text-red-500">{{ user.id }}</span>
        <span class="text-green-500">{{ msg.senderId }}</span>
        <div v-if="msg.isHeader" class="text-center my-3 text-sm text-gray-400">
          {{ msg.dateHeader }}
        </div>
        <ChatMessageBubble
          v-else
          :message="msg"
          :isMine="msg?.senderId === user?.id"
          :status="msg.status"
          :messages="messages"
        />
      </div>
    </div>
  </template>
  

   <script setup lang="ts">
  import moment from 'moment';
  import { computed } from 'vue';
  import { useUser } from "@/composables/auth/user";
  
  const { user } = useUser();
  const props = defineProps({
    messages: Array,
    roomChats: Array,
    selectedUser: Object
  });
  
  // Merge messages and roomChats, then sort and add date headers
  const sortedMessagesWithHeaders = computed(() => {
    const allMessages = [...props.messages, ...props.roomChats];
    const sorted = allMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
    const messagesWithHeaders = [];
    let lastDateHeader = '';
  
    sorted.forEach((msg) => {
      const messageDate = formatMessageDate(msg.createdAt);
  
      // Add a date header if it differs from the last one
      if (messageDate !== lastDateHeader) {
        messagesWithHeaders.push({ isHeader: true, dateHeader: messageDate });
        lastDateHeader = messageDate;
      }
      messagesWithHeaders.push(msg);
    });
  
    return messagesWithHeaders;
  });

//   const sortedMessagesWithHeaders = computed(() => {
//   // Create a Map of messages from roomChats for quick lookup
//   const roomChatsMap = new Map(props.roomChats.map((msg) => [msg.id, msg]));

//   // Filter props.messages to only include those that exist in roomChatsMap
//   const filteredMessages = props.messages.filter((msg) => roomChatsMap.has(msg.id));

//   // Merge and prioritize roomChats
//   const allMessages = [
//     ...filteredMessages.map((msg) => ({ ...msg, ...roomChatsMap.get(msg.id) })),
//     ...props.roomChats.filter((msg) => !filteredMessages.some((m) => m.id === msg.id)),
//   ];

//   // Sort all messages by createdAt
//   const sorted = allMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

//   // Add date headers
//   const messagesWithHeaders = [];
//   let lastDateHeader = '';

//   sorted.forEach((msg) => {
//     const messageDate = formatMessageDate(msg.createdAt);

//     // Add a date header if it differs from the last one
//     if (messageDate !== lastDateHeader) {
//       messagesWithHeaders.push({ isHeader: true, dateHeader: messageDate });
//       lastDateHeader = messageDate;
//     }
//     messagesWithHeaders.push(msg);
//   });

//   return messagesWithHeaders;
// });

  
  // Helper to format dates into "Today", "Yesterday", or a full date
  const formatMessageDate = (date: string): string => {
    const today = moment().startOf('day');
    const messageDate = moment(date);
  
    if (messageDate.isSame(today, 'day')) {
      return 'Today';
    } else if (messageDate.isSame(today.clone().subtract(1, 'days'), 'day')) {
      return 'Yesterday';
    } else {
      return messageDate.format('MMMM D, YYYY');
    }
  };

  // Reference to the scrollable container
const scrollContainer = ref<HTMLDivElement | null>(null);

  // Scroll-to-bottom function
const scrollToBottomPage = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
  }
};

  watch(
      () => props.selectedUser, // Watched property
      (newValue, oldValue) => {
        console.log(newValue, 'new selected user');
        console.log(oldValue, 'previous selected user');
        scrollToBottomPage();
      }
    );

  </script>
  
  <style>
.scroll-container {
  height: 650px; /* Adjust based on your needs */
  overflow-y: auto;
}
</style>
   -->

   <!-- <template>
    <div
      ref="scrollContainer"
      class="flex-1 scroll-container z-10 overflow-y-auto p-4 space-y-3 bg-white"
    >
      <div v-for="(msg, index) in sortedMessagesWithHeaders" :key="msg.id || msg.dateHeader">
        <div v-if="msg.isHeader" class="text-center my-3 text-sm text-gray-400">
          {{ msg.dateHeader }}
        </div>

        <div
          v-else
          class="flex"
          :class="{
            'justify-start': msg.senderId === route.query.agentId,
            'justify-end': msg.senderId !== route.query.agentId,
          }"
        >
          <ChatMessageBubble
            :message="msg"
            :isMine="msg.senderId === route?.query?.agantId"
            :status="msg.status"
            :messages="messages"
            class="max-w-[75%]"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import moment from "moment";
  import { ref, computed, watch, onMounted, nextTick } from "vue";
  import { useUser } from "@/composables/auth/user";
  
  const route = useRoute()
  const { user } = useUser();
  const props = defineProps({
    messages: Array,
    roomChats: Array,
    selectedUser: Object,
  });
  
  // Merge messages and roomChats, then sort and add date headers
  const sortedMessagesWithHeaders = computed(() => {
    const allMessages = [...props.messages, ...props.roomChats];
    const sorted = allMessages.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  
    const messagesWithHeaders = [];
    let lastDateHeader = "";
  
    sorted.forEach((msg) => {
      const messageDate = formatMessageDate(msg.createdAt);
  
      // Add a date header if it differs from the last one
      if (messageDate !== lastDateHeader) {
        messagesWithHeaders.push({ isHeader: true, dateHeader: messageDate });
        lastDateHeader = messageDate;
      }
      messagesWithHeaders.push(msg);
    });
  
    return messagesWithHeaders;
  });
  
  // Helper to format dates into "Today", "Yesterday", or a full date
  const formatMessageDate = (date: string): string => {
    const today = moment().startOf("day");
    const messageDate = moment(date);
  
    if (messageDate.isSame(today, "day")) {
      return "Today";
    } else if (messageDate.isSame(today.clone().subtract(1, "days"), "day")) {
      return "Yesterday";
    } else {
      return messageDate.format("MMMM D, YYYY");
    }
  };
  
  // Reference to the scrollable container
  const scrollContainer = ref<HTMLDivElement | null>(null);
  
  // Scroll-to-bottom function
  const scrollToBottomPage = () => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  };
  
  // Scroll to bottom when the component is mounted
  onMounted(() => {
    nextTick(() => {
      scrollToBottomPage();
    });
  });
  
  // Scroll when a new message is added
  watch(
    () => props.messages,
    async (newMessages) => {
      if (newMessages.length > 0) {
        await nextTick(); // Wait for DOM updates
        scrollToBottomPage();
      }
    },
    { deep: true }
  );
  
  // Scroll when switching users
  watch(
    () => props.selectedUser,
    () => {
      scrollToBottomPage();
    }
  );
  </script>
  
  <style>
  .scroll-container {
    height: 650px; /* Adjust based on your needs */
    overflow-y: auto;
  }
  </style>
   -->

   <template>
    <div
      ref="scrollContainer"
      class="flex-1 scroll-container z-10 overflow-y-auto p-4 space-y-3 bg-white"
    >
      <div v-for="(msg, index) in sortedMessagesWithHeaders" :key="msg.id || msg.dateHeader">
        <!-- Display date headers -->
        <div v-if="msg.isHeader" class="text-center my-3 py-3 text-sm text-gray-400">
          {{ msg.dateHeader }}
        </div>
  
        <!-- Display chat messages with proper alignment and colors -->
        <div
          v-else
          class="flex items-end"
          :class="{
            'justify-end': msg.senderId === route.query.agentId, // Right-align if the logged-in user sent the message
            'justify-start': msg.senderId !== route.query.agentId, // Left-align otherwise
          }"
        >
          <div
            class="p-3 rounded-lg p-3 rounded-lg z-10 max-w-xs mb-2 w-full"
            :class="msg.senderId === route.query.agentId ? 'bg-[#EBE5E0] mr-auto' : 'bg-[#91D6A8] ml-auto'"
          >
            <p>{{ msg.content }}</p>
            <small class="block text-xs text-right">
              {{ formatDate(msg.createdAt) }}
            </small>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import moment from "moment";
  import { ref, computed, watch, onMounted, nextTick } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const props = defineProps({
    messages: Array,
    roomChats: Array,
    selectedUser: Object,
  });
  
  // Merge messages and roomChats, then sort and add date headers
  const sortedMessagesWithHeaders = computed(() => {
    const allMessages = [...props.messages, ...props.roomChats];
    const sorted = allMessages.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  
    const messagesWithHeaders = [];
    let lastDateHeader = "";
  
    sorted.forEach((msg) => {
      const messageDate = formatMessageDate(msg.createdAt);
  
      // Add a date header if it differs from the last one
      if (messageDate !== lastDateHeader) {
        messagesWithHeaders.push({ isHeader: true, dateHeader: messageDate });
        lastDateHeader = messageDate;
      }
      messagesWithHeaders.push(msg);
    });
  
    return messagesWithHeaders;
  });
  
  // Helper to format dates into "Today", "Yesterday", or a full date
  const formatMessageDate = (date: string): string => {
    const today = moment().startOf("day");
    const messageDate = moment(date);
  
    if (messageDate.isSame(today, "day")) {
      return "Today";
    } else if (messageDate.isSame(today.clone().subtract(1, "days"), "day")) {
      return "Yesterday";
    } else {
      return messageDate.format("MMMM D, YYYY");
    }
  };
  
  // Format message time
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  
  // Reference to the scrollable container
  const scrollContainer = ref<HTMLDivElement | null>(null);
  
  // Scroll-to-bottom function
  const scrollToBottomPage = () => {
    if (scrollContainer.value) {
      scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    }
  };
  
  // Scroll to bottom when the component is mounted
  onMounted(() => {
    nextTick(() => {
      scrollToBottomPage();
    });
  });
  
  // Scroll when a new message is added
  watch(
    () => props.messages,
    async (newMessages) => {
      if (newMessages.length > 0) {
        await nextTick(); // Wait for DOM updates
        scrollToBottomPage();
      }
    },
    { deep: true }
  );
  
  // Scroll when switching users
  watch(
    () => props.selectedUser,
    () => {
      scrollToBottomPage();
    }
  );
  </script>
  
  <style>
  .scroll-container {
    height: 650px; /* Adjust based on your needs */
    overflow-y: auto;
  }
  </style>
  