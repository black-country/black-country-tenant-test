<template>
    <div v-if="isWelcomeModalActive && !isTourCompleted('home-page')" class="modal-overlay">
      <div class="modal">
        <div class="text-4xl mb-4  flex justify-center items-center">
           <span class="border-2 p-1 border-gray-100 rounded-lg">
             🤝        
           </span>
        </div>
  
        <!-- Title -->
        <h1 class="text-xl font-semibold mb-2 text-[#1D2739]">
            Welcome to BlackCountry! 🥳 🥳🥳
        </h1>
  
        <!-- Description -->
        <p class="text-[#667185] mb-6 leading-snug">
          Welcome to your all-in-one shared-living platform. Search for your ideal  
          home and manage it effortlessly, all within our user-friendly app. Click
          <span class="text-[#1D2739] font-semibold">'Continue'</span> to embark on your personalized <span class="font-semibold text-[#1D2739]">tour</span> of the platform!
        </p>
        <div class="modal-footer  flex justify-between space-x-4 pt-5">
          <button @click="handleAction('skip')" class="flex-1 bg-[#EBE5E0] font-medium text-[#292929] py-3.5 px-4 rounded-lg hover:bg-gray-200">Skip Tour</button>
          <button @click="handleAction('continue')" class="flex-1 bg-[#292929] text-white py-3.5 px-4 rounded-lg hover:bg-gray-900">Continue</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useTourGuide } from "@/composables/core/useTourGuide";
  
  const { isWelcomeModalActive, isTourCompleted, handleWelcomeModalAction } = useTourGuide();
  
  const handleAction = (action: 'skip' | 'continue') => {
    handleWelcomeModalAction(action);
  };


  </script>
  
  <style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    text-align: center;
  }
  
  .modal-header h2 {
    margin-top: 10px;
  }
  
  .modal-body p {
    margin: 20px 0;
  }
  
  .modal-footer {
    display: flex;
    justify-content: space-between;
  }
  
  .btn {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
  }
  </style>
  