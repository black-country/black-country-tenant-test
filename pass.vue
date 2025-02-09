<template>
    <main>
      <TopNavBar />
      <div class="max-w-2xl mx-auto p-6 mb-20">
        <svg
          @click="router.back()"
          class="cursor-pointer"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="36" height="36" rx="18" fill="#EAEAEA" />
          <path
            d="M20.5 13C20.5 13 15.5 16.6824 15.5 18C15.5 19.3177 20.5 23 20.5 23"
            stroke="#1D2739"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
  
        <h2 class="text-xl font-medium mb-4 text-[#1D2739] my-4">
          {{ sectionTitle }}
        </h2>
  
        <form @submit.prevent="saveSection">
          <!-- Standard Fields -->
          <div v-for="(field, index) in fields" :key="index" class="mb-4">
            <label v-if="field.label !== 'State of Origin' && field.label !== 'Local Government'"
              class="text-sm font-medium text-[#1D2739]"
            >
              {{ field.label }}
              <span v-if="field.isCompulsory" class="text-red-600">*</span>
            </label>
  
            <div v-if="field.type === 'text'">
              <input v-model="field.value" type="text" class="input-field" />
            </div>
            <div v-if="field.type === 'email'">
              <input v-model="field.value" type="email" class="input-field" />
            </div>
            <div v-if="field.type === 'number'">
              <input v-model="field.value" type="number" class="input-field" />
            </div>
            <div v-if="field.type === 'textarea'">
              <textarea v-model="field.value" class="input-field" rows="4"></textarea>
            </div>
            <div v-if="field.type === 'file'">
              <input type="file" @change="handleFileUpload($event, field)" class="input-field" />
              <p v-if="field.preview">{{ field.preview }}</p>
            </div>
          </div>
  
          <!-- 🟢 Emergency Contacts Section -->
          <h3 class="text-lg font-semibold mt-6 mb-2 text-[#1D2739]">Reference and Emergency Contacts</h3>
  
          <div v-for="(contact, index) in referenceContacts" :key="index" class="mb-6 border p-4 rounded-lg">
            <h4 class="font-semibold text-sm text-gray-700">
              {{ index + 1 }}. Emergency contact
            </h4>
  
            <!-- Full Name & Relationship -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-sm font-medium text-[#1D2739]">
                  Full Name <span class="text-red-600">*</span>
                </label>
                <input v-model="contact.fullName" type="text" class="input-field" placeholder="Enter full name" />
              </div>
  
              <div>
                <label class="text-sm font-medium text-[#1D2739]">
                  Relationship <span class="text-red-600">*</span>
                </label>
                <select v-model="contact.relationship" class="input-field">
                  <option v-for="option in ['Mother', 'Father', 'Sibling', 'Spouse', 'Friend', 'Colleague', 'Other']"
                    :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
            </div>
  
            <!-- Phone Number -->
            <div class="mt-4">
              <label class="text-sm font-medium text-[#1D2739]">
                Phone Number <span class="text-red-600">*</span>
              </label>
              <input v-model="contact.phoneNumber" type="number" class="input-field" placeholder="Enter your phone number" />
            </div>
  
            <!-- Residential Address -->
            <div class="mt-4">
              <label class="text-sm font-medium text-[#1D2739]">
                Residential Address <span class="text-red-600">*</span>
              </label>
              <input v-model="contact.residentialAddress" type="text" class="input-field" placeholder="Enter residential address" />
            </div>
  
            <!-- Remove Contact Button -->
            <button v-if="referenceContacts.length > 1"
              type="button"
              @click="removeReferenceContact(index)"
              class="mt-4 px-3 py-1 text-sm rounded-md bg-red-500 text-white">
              Remove Contact
            </button>
          </div>
  
          <!-- Add Emergency Contact Button -->
          <button type="button" @click="addReferenceContact"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            + Add Another Contact
          </button>
  
          <!-- Consent Checkbox -->
          <div class="mt-4 flex items-center">
            <input type="checkbox" v-model="consentToContactReferences" class="mr-2" />
            <label class="text-sm text-[#1D2739]">
              I consent to Homeowner/Property Manager contacting my References
            </label>
          </div>
  
          <!-- Form Buttons -->
          <div class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center border-[0.5px]">
            <div class="max-w-2xl w-full flex justify-between">
              <button class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]" @click="goBack">
                Cancel
              </button>
              <button
                :disabled="!isFormValid || loading"
                type="submit"
                class="px-6 py-3 text-sm rounded-md bg-[#292929] text-white disabled:cursor-not-allowed disabled:opacity-25">
                {{ loading ? "Processing..." : "Save" }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  </template>
  