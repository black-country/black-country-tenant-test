<template>
  <MessagingView>
    <div>
      <div class="w-full h-32 bg-white"></div>
      <div class="relative -mt-32 h-screen flex lg:flex-row flex-col">
        <!-- Sidebar - User List -->
        <div
          class="w-full lg:w-[350px] border-r border-gray-200 flex flex-col bg-white overflow-y-auto fixed lg:relative z-50 h-full lg:h-auto transition-transform transform"
          :class="{
            '-translate-x-full': !openSideNav && !isDesktop,
            'translate-x-0': openSideNav || isDesktop,
          }">
          <section class="lg:hidden flex items-center justify-between w-full px-2">
            <div class="flex items-center justify-between">
              <button class="lg:hidden p-2" @click="openSideNav = false">
                <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect y="0.3125" width="36" height="36" rx="18" fill="#EAEAEA" />
                  <path d="M20.5 13.3125C20.5 13.3125 15.5 16.9949 15.5 18.3125C15.5 19.6302 20.5 23.3125 20.5 23.3125"
                    stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <p class="font-semibold">Messages</p>
            </div>

            <div class="flex items-center justify-between">
              <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.107 22.6218C11.9298 23.7835 12.722 24.5898 13.6921 24.9916C17.411 26.5323 22.5864 26.5323 26.3053 24.9916C27.2754 24.5898 28.0676 23.7835 27.8905 22.6218C27.7815 21.9079 27.243 21.3134 26.844 20.7329C26.3214 19.9632 26.2695 19.1236 26.2695 18.2305C26.2695 14.7787 23.4619 11.9805 19.9987 11.9805C16.5355 11.9805 13.728 14.7787 13.728 18.2305C13.7279 19.1236 13.676 19.9632 13.1534 20.7329C12.7544 21.3134 12.2159 21.9079 12.107 22.6218Z"
                  stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M16.668 26.1445C17.05 27.5822 18.3976 28.6445 20.0013 28.6445C21.6051 28.6445 22.9526 27.5822 23.3346 26.1445"
                  stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <svg width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.3125" width="40" height="40" rx="8" fill="#292929" />
                <path
                  d="M20.0817 20.4943C20.0817 21.7367 19.8544 22.8049 19.3999 23.6989C18.9453 24.589 18.3222 25.2746 17.5305 25.7557C16.7427 26.233 15.8468 26.4716 14.843 26.4716C13.8355 26.4716 12.9358 26.233 12.1442 25.7557C11.3563 25.2746 10.7351 24.5871 10.2805 23.6932C9.82599 22.7992 9.59872 21.733 9.59872 20.4943C9.59872 19.2519 9.82599 18.1856 10.2805 17.2955C10.7351 16.4015 11.3563 15.7159 12.1442 15.2386C12.9358 14.7576 13.8355 14.517 14.843 14.517C15.8468 14.517 16.7427 14.7576 17.5305 15.2386C18.3222 15.7159 18.9453 16.4015 19.3999 17.2955C19.8544 18.1856 20.0817 19.2519 20.0817 20.4943ZM18.343 20.4943C18.343 19.5473 18.1896 18.75 17.8828 18.1023C17.5798 17.4508 17.1631 16.9583 16.6328 16.625C16.1063 16.2879 15.5097 16.1193 14.843 16.1193C14.1726 16.1193 13.5741 16.2879 13.0476 16.625C12.5211 16.9583 12.1044 17.4508 11.7976 18.1023C11.4946 18.75 11.343 19.5473 11.343 20.4943C11.343 21.4413 11.4946 22.2405 11.7976 22.892C12.1044 23.5398 12.5211 24.0322 13.0476 24.3693C13.5741 24.7027 14.1726 24.8693 14.843 24.8693C15.5097 24.8693 16.1063 24.7027 16.6328 24.3693C17.1631 24.0322 17.5798 23.5398 17.8828 22.892C18.1896 22.2405 18.343 21.4413 18.343 20.4943ZM22.2706 26.3125V14.6761H26.4183C27.3198 14.6761 28.0679 14.8314 28.6626 15.142C29.2611 15.4527 29.7081 15.8826 30.0036 16.4318C30.299 16.9773 30.4467 17.608 30.4467 18.3239C30.4467 19.036 30.2971 19.6629 29.9979 20.2045C29.7024 20.7424 29.2554 21.161 28.657 21.4602C28.0623 21.7595 27.3142 21.9091 26.4126 21.9091H23.2706V20.3977H26.2536C26.8217 20.3977 27.2839 20.3163 27.6399 20.1534C27.9998 19.9905 28.263 19.7538 28.4297 19.4432C28.5964 19.1326 28.6797 18.7595 28.6797 18.3239C28.6797 17.8845 28.5945 17.5038 28.424 17.1818C28.2573 16.8598 27.9941 16.6136 27.6342 16.4432C27.2782 16.2689 26.8104 16.1818 26.2308 16.1818H24.0263V26.3125H22.2706ZM28.0149 21.0625L30.8899 26.3125H28.8899L26.0717 21.0625H28.0149Z"
                  fill="#EBE5E0" />
              </svg>
            </div>
          </section>

          <div class="flex items-center space-x-2 p-2 border-b-[0.5px] border-gray-100 relative py-3.5">
            <div class="relative flex items-center bg-[#EAEAEA] rounded-lg px-3 py-2 w-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.386a1 1 0 11-1.414 1.415l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clip-rule="evenodd" />
              </svg>
              <input v-model="searchTerm" type="text"
                class="bg-[#EAEAEA] text-gray-600 text-sm ml-2 py-1.5 focus:outline-none w-full" placeholder="Search" />
            </div>
            <div class="relative">
              <button @click="toggleDropdown" class="bg-[#EAEAEA] p-3 rounded-lg transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8333 3.33398H2.5" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M9.16667 15.834H2.5" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M17.5001 15.834H14.1667" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M17.5001 9.58398H9.16675" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M17.4999 3.33398H15.8333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M4.16667 9.58398H2.5" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path
                  d="M12.0833 1.66602C12.4715 1.66602 12.6657 1.66602 12.8188 1.72945C13.023 1.81402 13.1853 1.97626 13.2698 2.18045C13.3333 2.33359 13.3333 2.52773 13.3333 2.91602V3.74935C13.3333 4.13763 13.3333 4.33177 13.2698 4.48492C13.1853 4.68911 13.023 4.85134 12.8188 4.93592C12.6657 4.99935 12.4715 4.99935 12.0833 4.99935C11.695 4.99935 11.5008 4.99935 11.3477 4.93592C11.1435 4.85134 10.9813 4.68911 10.8967 4.48492C10.8333 4.33177 10.8333 4.13763 10.8333 3.74935V2.91602C10.8333 2.52773 10.8333 2.33359 10.8967 2.18045C10.9813 1.97626 11.1435 1.81402 11.3477 1.72945C11.5008 1.66602 11.695 1.66602 12.0833 1.66602Z"
                  stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M10.4167 14.166C10.805 14.166 10.9992 14.166 11.1523 14.2294C11.3565 14.314 11.5187 14.4763 11.6033 14.6804C11.6667 14.8336 11.6667 15.0278 11.6667 15.416V16.2493C11.6667 16.6376 11.6667 16.8318 11.6033 16.9849C11.5187 17.1891 11.3565 17.3513 11.1523 17.4359C10.9992 17.4993 10.805 17.4993 10.4167 17.4993C10.0285 17.4993 9.83433 17.4993 9.68116 17.4359C9.477 17.3513 9.31475 17.1891 9.23017 16.9849C9.16675 16.8318 9.16675 16.6376 9.16675 16.2493V15.416C9.16675 15.0278 9.16675 14.8336 9.23017 14.6804C9.31475 14.4763 9.477 14.314 9.68116 14.2294C9.83433 14.166 10.0285 14.166 10.4167 14.166Z"
                  stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M7.91675 7.91602C8.30503 7.91602 8.49917 7.91602 8.65233 7.97945C8.8565 8.06402 9.01875 8.22626 9.10333 8.43043C9.16675 8.5836 9.16675 8.77777 9.16675 9.16602V9.99935C9.16675 10.3876 9.16675 10.5818 9.10333 10.7349C9.01875 10.9391 8.8565 11.1013 8.65233 11.1859C8.49917 11.2493 8.30503 11.2493 7.91675 11.2493C7.52846 11.2493 7.33432 11.2493 7.18118 11.1859C6.97699 11.1013 6.81476 10.9391 6.73018 10.7349C6.66675 10.5818 6.66675 10.3876 6.66675 9.99935V9.16602C6.66675 8.77777 6.66675 8.5836 6.73018 8.43043C6.81476 8.22626 6.97699 8.06402 7.18118 7.97945C7.33432 7.91602 7.52846 7.91602 7.91675 7.91602Z"
                  stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div v-if="showDropdown" class="absolute right-0 mt-2 w-44 bg-white rounded-lg border-[0.5px] border-gray-25 z-20 shadow">
                      <ul>
                        <li
                          @click="filterChats('all')"
                          class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer hover:bg-gray-100"
                        >
                          All
                        </li>
                        <li
                          @click="filterChats('read')"
                          class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer hover:bg-gray-100"
                        >
                          Read
                        </li>
                        <li
                          @click="filterChats('unread')"
                          class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer hover:bg-gray-100"
                        >
                          Unread
                        </li>
                      </ul>
                    </div>
            </div>
            <!-- <div
              v-if="showDropdown"
              class="fixed inset-0 z-50 bg-black/50"
              @click="toggleDropdown"
            >
              <div
                class="absolute ml-72 mt-4 top-10 w-80 bg-white rounded-lg border-[0.5px] border-gray-100 shadow"
              >
                <ul>
                  <li
                    class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer"
                  >
                    Read
                  </li>
                  <li
                    class="flex items-center justify-between text-sm px-4 py-1 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer"
                  >
                    Unread
                  </li>
                </ul>
              </div>
            </div> -->
          </div>
          <div v-if="!loadingActiveChats && filteredChats.length" class="overflow-auto flex-1">
            <ChatUserList class="p-3" :loading="loadingActiveChats" :users="filteredChats"
               @selectUser="selectUser" />
          </div>
          <div v-else class="flex flex-col items-center justify-center flex-1 p-4">
            <img src="@/assets/icons/conversation-illustration.svg" />
            <p class="text-gray-800">No conversations found</p>
          </div>
        </div>
        <!-- Chat Window -->
        <div class="flex-1 flex flex-col bg-white h-full" :class="{ hidden: !selectedUser && !isDesktop }">
          <div class="flex items-center justify-between border-b-[0.5px] border-gray-200">
            <button class="lg:hidden p-2" @click="toggleSideNav">
              <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33203 4.48047H16.6654" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M3.33203 10.3125H16.6654" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M3.33203 16.1445H16.6654" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
            <ChatHeader :selectedUser="selectedUser || roomChatsList" :isConnected="isConnected" />
          </div>

          <div v-if="!loadingRoomChats && roomChatsList.length" class="flex-1 overflow-y-auto p-3">
            <!-- {{ roomChatsList }} -->
            <!-- {{ messages }} -->
            <ChatWindow :roomChats="roomChatsList" :messages="currentRoomMessages" :selectedUser="selectedUser" />
          </div>
          <div v-else class="flex flex-col items-center justify-center flex-1 p-4">
            <img src="@/assets/icons/conversation-illustration.svg" />
            <p class="text-gray-800">Start a conversation</p>
          </div>

          <ChatMessageInput v-model="newMessage" :isConnected="isConnected" :isSending="messageStatus === 'sending'"
            @sendMessage="sendMessageToUser" />
        </div>
      </div>

      
    </div>
  </MessagingView>
  <!-- <MessagingView>
  <div>
    <div class="w-full h-32" style="background-color: white"></div>
    <div class="" style="margin-top: -128px;">
      <div class="h-screen">
        <div class="flex border-[0.5px] border-gray-25 rounded h-full">


          <div class="w-[500px] border-[0.5px] flex flex-col">
            <div class="flex items-center space-x-4 p-2 ">

              <div class="relative flex items-center bg-[#EAEAEA] rounded-lg px-3 py-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" viewBox="0 0 20 20"
                  fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.386a1 1 0 11-1.414 1.415l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                    clip-rule="evenodd" />
                </svg>
                <input type="text" class="bg-[#EAEAEA] text-gray-600 text-sm ml-2 py-1.5 focus:outline-none w-full"
                  placeholder="Search" />
              </div>


              <button @click="toggleDropdown" class="bg-[#EAEAEA] p-2 rounded-lg  transition-colors">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.8333 3.33398H2.5" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M9.16667 15.834H2.5" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M17.5001 15.834H14.1667" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M17.5001 9.58398H9.16675" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M17.4999 3.33398H15.8333" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M4.16667 9.58398H2.5" stroke="#1D2739" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path
                    d="M12.0833 1.66602C12.4715 1.66602 12.6657 1.66602 12.8188 1.72945C13.023 1.81402 13.1853 1.97626 13.2698 2.18045C13.3333 2.33359 13.3333 2.52773 13.3333 2.91602V3.74935C13.3333 4.13763 13.3333 4.33177 13.2698 4.48492C13.1853 4.68911 13.023 4.85134 12.8188 4.93592C12.6657 4.99935 12.4715 4.99935 12.0833 4.99935C11.695 4.99935 11.5008 4.99935 11.3477 4.93592C11.1435 4.85134 10.9813 4.68911 10.8967 4.48492C10.8333 4.33177 10.8333 4.13763 10.8333 3.74935V2.91602C10.8333 2.52773 10.8333 2.33359 10.8967 2.18045C10.9813 1.97626 11.1435 1.81402 11.3477 1.72945C11.5008 1.66602 11.695 1.66602 12.0833 1.66602Z"
                    stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M10.4167 14.166C10.805 14.166 10.9992 14.166 11.1523 14.2294C11.3565 14.314 11.5187 14.4763 11.6033 14.6804C11.6667 14.8336 11.6667 15.0278 11.6667 15.416V16.2493C11.6667 16.6376 11.6667 16.8318 11.6033 16.9849C11.5187 17.1891 11.3565 17.3513 11.1523 17.4359C10.9992 17.4993 10.805 17.4993 10.4167 17.4993C10.0285 17.4993 9.83433 17.4993 9.68116 17.4359C9.477 17.3513 9.31475 17.1891 9.23017 16.9849C9.16675 16.8318 9.16675 16.6376 9.16675 16.2493V15.416C9.16675 15.0278 9.16675 14.8336 9.23017 14.6804C9.31475 14.4763 9.477 14.314 9.68116 14.2294C9.83433 14.166 10.0285 14.166 10.4167 14.166Z"
                    stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  <path
                    d="M7.91675 7.91602C8.30503 7.91602 8.49917 7.91602 8.65233 7.97945C8.8565 8.06402 9.01875 8.22626 9.10333 8.43043C9.16675 8.5836 9.16675 8.77777 9.16675 9.16602V9.99935C9.16675 10.3876 9.16675 10.5818 9.10333 10.7349C9.01875 10.9391 8.8565 11.1013 8.65233 11.1859C8.49917 11.2493 8.30503 11.2493 7.91675 11.2493C7.52846 11.2493 7.33432 11.2493 7.18118 11.1859C6.97699 11.1013 6.81476 10.9391 6.73018 10.7349C6.66675 10.5818 6.66675 10.3876 6.66675 9.99935V9.16602C6.66675 8.77777 6.66675 8.5836 6.73018 8.43043C6.81476 8.22626 6.97699 8.06402 7.18118 7.97945C7.33432 7.91602 7.52846 7.91602 7.91675 7.91602Z"
                    stroke="#1D2739" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>

              </button>

              <div v-if="showDropdown" class="fixed inset-0 z-50" @click="toggleDropdown">

                <div
                  class="absolute left-[170px] mt-4 top-10 w-44 bg-white rounded-lg border-[0.5px] border-gray-25 z-20 shadow">
                  <ul>
                    <li
                      class="flex items-center justify-between text-sm px-4 py-2 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer ">
                      Read
                    </li>
                    <li
                      class="flex items-center justify-between text-sm px-4 py-1 mb-2 border-b text-[#1D2739] last:border-b-0 border-gray-100 cursor-pointer ">
                      Unread
                    </li>
                  </ul>
                </div>
              </div>
            </div>

  
            <div v-if="!loadingActiveChats && activeChatsList.length" class="bg-grey-lighter flex-1 overflow-auto">
            <div class="bg-grey-lighter flex-1 overflow-auto">
              <ChatUserList class="px-3 flex items-center bg-grey-light cursor-pointer" :loading="loadingActiveChats"
              :users="activeChatsList" @selectUser="selectUser" />
            </div>
          </div>
            <section v-else-if="loadingActiveChats && !activeChatsList?.length">
        <div class="rounded-md p-4 w-full mx-auto">
          <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-6 py-1">
              <div class="h-44 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
       </section>
      <section v-else class="flex flex-col justify-between items-center space-y-2 mt-10">
             <svg width="152" height="124" viewBox="0 0 152 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="76" cy="58" r="52" fill="#EAEAEA"/>
            <circle cx="21" cy="25" r="5" fill="#BDBDBD"/>
            <circle cx="18" cy="109" r="7" fill="#BDBDBD"/>
            <circle cx="145" cy="41" r="7" fill="#BDBDBD"/>
            <circle cx="134" cy="14" r="4" fill="#BDBDBD"/>
            <g filter="url(#filter0_b_6853_118795)">
            <rect x="52" y="34" width="48" height="48" rx="24" fill="#9D9D9D"/>
            <path d="M85.9598 56.9707C86.0134 57.8009 86.0134 58.6607 85.9598 59.4909C85.6856 63.7332 82.3536 67.1125 78.1706 67.3905C76.7435 67.4854 75.2536 67.4852 73.8294 67.3905C73.339 67.3579 72.8044 67.2409 72.344 67.0513C71.8318 66.8403 71.5756 66.7348 71.4454 66.7508C71.3153 66.7668 71.1264 66.9061 70.7487 67.1846C70.0827 67.6757 69.2437 68.0285 67.9994 67.9982C67.3703 67.9829 67.0557 67.9752 66.9148 67.7351C66.774 67.495 66.9494 67.1626 67.3002 66.4978C67.7867 65.5758 68.095 64.5203 67.6279 63.6746C66.8234 62.4666 66.1401 61.036 66.0402 59.4909C65.9866 58.6607 65.9866 57.8009 66.0402 56.9707C66.3144 52.7284 69.6464 49.3491 73.8294 49.0711C75.0318 48.9911 75.2812 48.9786 76.5 49.0337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M72.5 61H79.5M72.5 56H76" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M86 51.5C86 53.433 84.433 55 82.5 55C80.567 55 79 53.433 79 51.5C79 49.567 80.567 48 82.5 48C84.433 48 86 49.567 86 51.5Z" stroke="white" stroke-width="1.5"/>
            </g>
            <defs>
            <filter id="filter0_b_6853_118795" x="44" y="26" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_6853_118795"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_6853_118795" result="shape"/>
            </filter>
            </defs>
            </svg>
            <h2 class="text-[#1D2739]">No conversations found</h2>
            <p class="text-[#667185]">You have not contacted anyone</p>
      </section>

          </div>


  
          <div class="w-full border-[0.5px] border-gray-100 flex flex-col">


            <ChatHeader :selectedUser="selectedUser || roomChatsList" :isConnected="isConnected" />

  
            <div v-if="!loadingRoomChats"  class="flex-1 overflow-auto" style="background-color: white">
              <div class="py-2 px-3">
                <ChatWindow v-if="roomChatsList?.length && !loadingRoomChats" class="z-10" :roomChats="roomChatsList" :messages="messages" :selectedUser="selectedUser" />
                <section v-else-if="loading && !roomChatsList?.length">
                <div class="rounded-md p-4 w-full mx-auto">
                  <div class="animate-pulse flex space-x-4">
                    <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
                  </div>
                </div>
              </section>
               <section v-else class="flex flex-col justify-between items-center space-y-2 mt-10">
             <svg width="152" height="124" viewBox="0 0 152 124" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="76" cy="58" r="52" fill="#EAEAEA"/>
            <circle cx="21" cy="25" r="5" fill="#BDBDBD"/>
            <circle cx="18" cy="109" r="7" fill="#BDBDBD"/>
            <circle cx="145" cy="41" r="7" fill="#BDBDBD"/>
            <circle cx="134" cy="14" r="4" fill="#BDBDBD"/>
            <g filter="url(#filter0_b_6853_118795)">
            <rect x="52" y="34" width="48" height="48" rx="24" fill="#9D9D9D"/>
            <path d="M85.9598 56.9707C86.0134 57.8009 86.0134 58.6607 85.9598 59.4909C85.6856 63.7332 82.3536 67.1125 78.1706 67.3905C76.7435 67.4854 75.2536 67.4852 73.8294 67.3905C73.339 67.3579 72.8044 67.2409 72.344 67.0513C71.8318 66.8403 71.5756 66.7348 71.4454 66.7508C71.3153 66.7668 71.1264 66.9061 70.7487 67.1846C70.0827 67.6757 69.2437 68.0285 67.9994 67.9982C67.3703 67.9829 67.0557 67.9752 66.9148 67.7351C66.774 67.495 66.9494 67.1626 67.3002 66.4978C67.7867 65.5758 68.095 64.5203 67.6279 63.6746C66.8234 62.4666 66.1401 61.036 66.0402 59.4909C65.9866 58.6607 65.9866 57.8009 66.0402 56.9707C66.3144 52.7284 69.6464 49.3491 73.8294 49.0711C75.0318 48.9911 75.2812 48.9786 76.5 49.0337" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M72.5 61H79.5M72.5 56H76" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M86 51.5C86 53.433 84.433 55 82.5 55C80.567 55 79 53.433 79 51.5C79 49.567 80.567 48 82.5 48C84.433 48 86 49.567 86 51.5Z" stroke="white" stroke-width="1.5"/>
            </g>
            <defs>
            <filter id="filter0_b_6853_118795" x="44" y="26" width="64" height="64" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="4"/>
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_6853_118795"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_6853_118795" result="shape"/>
            </filter>
            </defs>
            </svg>
            <h2 class="text-[#1D2739]">Start a conversation</h2>
      </section> 
              </div>
            </div> 

            <section class="flex-1 overflow-auto" v-if="loadingRoomChats">
              <div class="rounded-md p-4 w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-96 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </section>


            <ChatMessageInput v-model="newMessage" :isConnected="isConnected" :isSending="messageStatus === 'sending'"
              @sendMessage="sendMessageToUser" />
          </div>
        </div>
      </div>
    </div>
  </div>
</MessagingView> -->
</template>

<script setup lang="ts">
import { useCreateRoom } from "@/composables/modules/messages/createRoom";
import MessagingView from "@/layouts/MessagingView.vue";
import { useGetActiveChats } from "@/composables/modules/messages/fetchActiveChats";
import { useGetRoomChats } from "@/composables/modules/messages/fetchRoomMessages";
import { useWebSocket } from "@/composables/modules/messages/sockets";
import { ref, watch, onMounted, onUnmounted, computed } from "vue";
import { useRouter, useRoute, useNuxtApp } from "#app";

const { loadingActiveChats, activeChatsList, getActiveChats } = useGetActiveChats();
const { getRoomChats, loadingRoomChats, roomChatsList } = useGetRoomChats();
const { messagesByRoom, currentRoomMessages, setActiveRoom, socket, newMessage, isConnected, sendMessage, markMessageAsRead } = useWebSocket();
const { createRoom, loading: creatingRoom, roomObj } = useCreateRoom();

const router = useRouter();
const route = useRoute();
const { $emitter } = useNuxtApp();

const selectedUser = ref<any>(null);
const messageStatus = ref("idle");

const openSideNav = ref(false);

// Watch for selected user changes and fetch room chats
watch(selectedUser, async (newVal) => {
  if (newVal?.id) {
    try {
      await getRoomChats(newVal.id);
    } catch (error) {
      console.error("Failed to fetch room chats:", error);
    }
  }
});
const showDropdown = ref(false);

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}


// Watch for new messages and scroll to the bottom
watch(
  currentRoomMessages,
  (newMessages) => {
    if (newMessages.length > 0) {
      scrollToBottom();
    }
  },
  { deep: true }
);

// Watch `activeChatsList` to handle delayed population
watch(
  activeChatsList,
  (newVal) => {
    console.log(newVal, "active chats (watch)");
    const userId = route.query.userId;
    if (userId) {
      const user = newVal.find((u) => u?.participant?.id === userId);
      if (user) {
        selectUser(user);
      } else {
        if (newVal.length === 1) {
          selectUser(newVal[0]);
        }
      }
    }

    if (newVal.length) {
      selectUser(newVal[0]);
      console.log("only one item found");
    }
  },
  { immediate: true }
);

onMounted(async () => {
  if (route.query.agentId) {
    const payload = {
      participantId: route.query.agentId as string,
      participantType: "AGENT",
    };
    await createRoom(payload);
    getActiveChats();
  }

  $emitter.on("customEvent", async (payload: any) => {
    if (payload.data) {
      await getRoomChats(payload.data);
      scrollToBottom();
    }
  });
});

// Scroll to the bottom of the chat window
const scrollToBottom = () => {
  const chatWindow = document.querySelector(".custom-scrollbar");
  if (chatWindow) {
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }
};

// const selectUser = (user: any) => {
//   selectedUser.value = user;
// };

// User selection
// const selectUser = async (user: any) => {
//   console.log(user, 'selected user')
//   selectedUser.value = user;
//   markMessageAsRead(user?.lastMessage?.roomId, user?.lastMessage?.recipientId)
//   console.log(user?.lastMessage?.roomId, user?.lastMessage?.recipientId)
//   await getRoomChats(selectedUser?.value?.id);
//   router.push({ query: { agentId: user?.participant?.id } });
// };


const selectUser = async (user: any) => {
  console.log(user, 'selected user');
  selectedUser.value = user;

  if (user?.lastMessage?.roomId && user?.lastMessage?.recipientId) {
    await markMessageAsRead(user.lastMessage.roomId, user.lastMessage.recipientId);
  }

  await nextTick();

  await getRoomChats(selectedUser.value?.id);
  router.push({ query: { agentId: user?.participant?.id } });
};

watch(activeChatsList, (newChats) => {
  if (selectedUser.value) {
    const selectedChat = newChats.find(chat => chat.id === selectedUser.value.id);
    if (selectedChat) {
      selectedChat.unreadMessagesCount = 0; 
    }
  }
});


const sendMessageToUser = async (content: string) => {
  if (!selectedUser.value?.participant?.id || !isConnected.value) {
    console.error(
      "Cannot send message: No recipient selected or not connected"
    );
    return;
  }

  const userId = selectedUser?.value?.participant?.id || route?.query?.agentId;

  if (!userId || !isConnected.value) {
    console.error(
      "Cannot send message: No recipient selected or not connected"
    );
    return;
  }

  messageStatus.value = "sending";

  try {
    const socketPayload = {
      content,
      recipientId: selectedUser?.value?.participant?.id,
      recipientType: selectedUser?.value?.participant?.role,
      messageType: "private",
      room: selectedUser.value.id, // Include room ID if needed
    };

    await sendMessage(socketPayload);
    messageStatus.value = "sent";
    newMessage.value = ""; // Clear input after successful send
  } catch (error) {
    console.error("Failed to send message:", error);
    messageStatus.value = "error";
  }
  await getActiveChats();
};
onMounted(async () => {
  if (route.query.agentId) {
    const payload = {
      participantId: route.query.agentId as string,
      participantType: "AGENT",
    };
    await createRoom(payload);
    getActiveChats();
  }

  $emitter.on("customEvent", async (payload: any) => {
    if (payload.data) {
      await getRoomChats(payload.data);
      scrollToBottom();
    }
  });
});


// onMounted(async () => {
//   const userId = route.query.agentId;

//   if (userId) {
//     if (activeChatsList.value?.length > 0) {
//       const user = activeChatsList.value.find((u) => u?.participant?.id === userId);
//       if (user) {
//         await selectUser(user);
//       } else {
//         console.log("User not found in active chats");
//       }
//     } else {
//       const interval = setInterval(() => {
//         if (activeChatsList.value?.length > 0) {
//           clearInterval(interval);
//           const user = activeChatsList.value.find((u) => u?.participant?.id === userId);
//           if (user) {
//             selectUser(user);
//           }
//         }
//       }, 100);
//     }
//   }

//   // Listen for custom events after initial setup
//   $emitter.on("customEvent", async (payload: any) => {
//     if (payload.data) {
//       await getRoomChats(payload.data);
//       scrollToBottom();
//     }
//   });
// });


onUnmounted(() => {
  // Clean up event listeners
  $emitter.off("customEvent");
});

const isDesktop = ref(window.innerWidth >= 1024);

const updateViewMode = () => {
  isDesktop.value = window.innerWidth >= 1024;
  openSideNav.value = isDesktop.value;
};

onMounted(() => {
  window.addEventListener("resize", updateViewMode);
  updateViewMode();
});

watch(
  () => window.innerWidth,
  () => {
    updateViewMode();
  }
);

const toggleSideNav = () => {
  openSideNav.value = !openSideNav.value;
};

const filterStatus = ref('all')

const filterChats = (status: 'all' | 'read' | 'unread') => {
  filterStatus.value = status
  showDropdown.value = false
}
const searchTerm = ref('');

const filteredChats = computed(() => {
  let filtered = activeChatsList.value;

  // Filter chats by search term if provided
  if (searchTerm.value) {
    const lowerSearchTerm = searchTerm.value.toLowerCase();
    filtered = filtered.filter(chat => {
      return (
        chat.participant?.firstName.toLowerCase().includes(lowerSearchTerm) ||
        chat.participant?.lastName.toLowerCase().includes(lowerSearchTerm) ||
        chat.lastMessage?.content.toLowerCase().includes(lowerSearchTerm) ||
        chat.participant?.email.toLowerCase().includes(lowerSearchTerm) 
      );
    });
  }

  // Filter chats by read/unread status if not 'all'
  if (filterStatus.value !== 'all') {
    filtered = filtered.filter(chat =>
    filterStatus.value === 'read' ? chat?.unreadMessagesCount <= 0 : chat?.unreadMessagesCount > 0
    );
  }
  console.log(filtered)

  return filtered;
});
</script>

<style scoped>
.backdrop-blur {
  backdrop-filter: blur(4px);
}

.scrollbar-visible::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

.scrollbar-visible::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 4px;
}

.scrollbar-visible::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 4px;
}

.scrollbar-visible {
  /* For Firefox */
  scrollbar-width: thin;
  scrollbar-color: #5b8469 #f5f5f5;
}

@media (max-width: 1024px) {
  .lg-hidden {
    display: block;
  }

  .lg-flex-row {
    flex-direction: column;
  }

  .lg-w-500px {
    width: 100%;
  }

  .lg-border-r {
    border-right: none;
  }
}
</style>
