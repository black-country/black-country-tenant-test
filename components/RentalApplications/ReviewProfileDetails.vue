<template>
<main>
  <div v-if="!loadingProfile" class="h-screen flex flex-col justify-between">
    <h2 class="text-xl font-medium text-[#1D2739] mb-4">Review your profile details</h2>
    {{profileObj}}
    <p class="mb-6 text-[#667185]">
      Please review your profile details and make any necessary edits before proceeding.
      Fields marked with a <span class="text-red-600">*</span> are required to complete your application.
    </p>

    <div class="space-y-4">
      <!-- Personal Information -->

     <!-- Pre-Screening Questions -->
<div class="">
  <div class="flex justify-between items-center text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
    <h3 class="text-base font-medium">Pre-Screening Questions</h3>
    <button class="text-[#1D2739] text-base font-medium cursor-pointer" @click="editSection('screening-questions')">Edit</button>
  </div>
  <ul class="text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
    <li v-for="(question, idx) in profile.screeningQuestions" :key="idx" class="text-sm font-light flex flex-col justify-between">
      <p>{{ question?.question }}</p>
      <p class="font-semibold">{{ question?.answer || '---' }}</p>
    </li>
  </ul>
</div>


      <div class="">
        <div class="flex justify-between items-center text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
          <h3 class="text-base font-medium">Personal Information</h3>
          <button class="text-[#1D2739] text-base font-medium cursor-pointer" @click="editSection('personal-information')">Edit</button>
        </div>
        <ul class="text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
          <li class="text-[#6617185] text-sm font-light flex justify-between items-center"><strong>Name: <span class="text-red-600">*</span></strong>{{ profile.personal.name || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Email address: <span class="text-red-600">*</span></strong>{{ profile.personal.email || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Phone number: <span class="text-red-600">*</span></strong>{{ profile.personal.phone || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Date of Birth: <span class="text-red-600">*</span></strong>{{ profile.personal.dob || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Gender: </strong>{{ profile.personal.gender || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Marital status: </strong>{{ profile.personal.maritalStatus || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>State of Origin: <span class="text-red-600">*</span></strong>{{ profile.personal.stateOfOrigin || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>LGA: </strong>{{ profile.personal.lga || '---' }}</li>
        </ul>
      </div>

      <!-- Rental History -->
      <div class="">
        <div class="flex justify-between items-center text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
          <h3 class="text-base font-medium">Rental History</h3>
          <button class="text-[#1D2739] cursor-pointer" @click="editSection('rental-history')">Edit</button>
        </div>
        <ul class="text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Current Landlord: </strong>{{ profile.rental.currentLandlord || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Rental Address: </strong>{{ profile.rental.address || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Length of Tenancy: </strong>{{ profile.rental.lengthOfTenancy || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Reason for moving out: </strong>{{ profile.rental.reasonForMovingOut || '---' }}</li>
        </ul>
      </div>

      <!-- Employment Information -->
      <div class="">
        <div class="flex justify-between items-center text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
          <h3 class="text-base font-medium">Employment Information</h3>
          <button class="text-[#1D2739] cursor-pointer" @click="editSection('employment-information')">Edit</button>
        </div>
        <ul class="text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Employment Status: </strong>{{ profile.employment.status || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Employer's full name: </strong>{{ profile.employment.employerName || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Occupation: </strong>{{ profile.employment.occupation || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Organization Address: </strong>{{ profile.employment.organizationAddress || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Monthly Net Salary: </strong>{{ profile.employment.salary || '---' }}</li>
        </ul>
      </div>

      <!-- Next of Kin -->
      <div class="">
        <div class="flex justify-between items-center text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
          <h3 class="text-base font-medium">Next of Kin</h3>
          <button class="text-[#1D2739] cursor-pointer" @click="editSection('next-of-kin')">Edit</button>
        </div>
        <ul class="text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Full Name: </strong>{{ profile.nextOfKin.fullName || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Relationship: </strong>{{ profile.nextOfKin.relationship || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Email address: </strong>{{ profile.nextOfKin.email || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Residential Address: </strong>{{ profile.nextOfKin.address || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Phone number: </strong>{{ profile.nextOfKin.phone || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Occupation: </strong>{{ profile.nextOfKin.occupation || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Organization Name: </strong>{{ profile.nextOfKin.organizationName || '---' }}</li>
          <li class="text-[#667185] text-sm font-light flex justify-between items-center"><strong>Office Address: </strong>{{ profile.nextOfKin.officeAddress || '---' }}</li>
        </ul>
      </div>


    <!-- Uploaded Document Section -->
    <div class="">
      <div class="flex justify-between items-center text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
        <h3 class="text-base font-medium">Uploaded Document</h3>
        <button class="text-[#1D2739]" @click="editSection('uploaded-document')">Edit</button>
      </div>

      <div class="text-gray-600 space-y-3 mt-2 bg-white rounded-lg p-3 border-gray-50 border-[0.5px]">
        <div class="flex justify-between items-center">
          <strong>Document Type: </strong>{{ profile.document.type || '---' }}
        </div>
        <div class="mt-2 space-x-2 grid grid-cols-2 gap-6">
          <div v-for="(url, idx) in profile.document.fileUrls" :key="idx" class=" bg-gray-200 rounded-md">
            <img :src="url" alt="Document Image" class="w-full h-full object-cover rounded-md" />
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="bg-white fixed bottom-0 left-0 right-0 px-6 py-4 flex justify-center  border-[0.5px]">
      <div class="max-w-2xl w-full flex justify-between">
        <button class="px-6 py-3 text-sm rounded-md bg-white border text-[#292929]" @click="goBack">Cancel</button>
        <button  :disabled="processing" class="px-6 py-3 text-sm rounded-md disabled:cursor-not-allowed disabled:opacity-25  bg-[#292929] text-white" @click="goNext">{{processing ? 'processing..' : 'Continue'}}</button>
      </div>
  </div>
  </div>
  <section  class="p-8 max-w-7xl mx-auto" v-else>
    <div class="rounded-md p-4 w-full mx-auto">
      <div class="animate-pulse flex space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="h-32 bg-slate-200 rounded"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-3 gap-4">
              <div class="h-32 w-full bg-slate-200 rounded col-span-2"></div>
              <div class="h-32 w-full bg-slate-200 rounded col-span-1"></div>
            </div>
            <div class="h-32 w-full bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
</template>

<script setup lang="ts">
import { use_tenant_profile } from '@/composables/auth/fetchProfile'
import { useRouter, useRoute } from 'vue-router';
import { useFormPersistence } from '@/composables/core/useFormPersistence';
import { useUser } from "@/composables/auth/user";
import { useCreateRentalApplication } from '@/composables/modules/rentals/createRetals'
const { createRentalApplication, loading, setPayload } = useCreateRentalApplication()
const { user } = useUser();
const { loading: loadingProfile, profileObj } = use_tenant_profile()

const processing = ref(false)

const profile = ref({
  personal: {
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    stateOfOrigin: '',
    lga: ''
  },
  rental: {
    currentLandlord: '',
    address: '',
    lengthOfTenancy: '',
    reasonForMovingOut: ''
  },
  employment: {
    status: '',
    employerName: '',
    occupation: '',
    organizationAddress: '',
    salary: ''
  },
  nextOfKin: {
    fullName: '',
    relationship: '',
    email: '',
    address: '',
    phone: '',
    occupation: '',
    organizationName: '',
    officeAddress: ''
  },
  document: {
    type: '',
    fileUrls: []
  },
  screeningQuestions: [
    {id: '', question: '', answer: '' },
    {id: '', question: '', answer: '' },
    {id: '', question: '', answer: '' }
  ]
});

onMounted(() => {
  // Ensure profileObj has data before attempting to prefill
  // if (profileObj.value && !loadingProfile) {
  //   profile.value.personal = 'marquis'
  //   // Prefill personal information
  //   // profile.value.personal = {
  //   //   name: 'marquis',
  //   //   email: profileObj.value.email,
  //   //   phone: profileObj.value.phoneNumber,
  //   //   dob: profileObj.value.dateOfBirth ? new Date(profileObj.value.dateOfBirth).toISOString().split('T')[0] : '',
  //   //   gender: profileObj.value.gender,
  //   //   maritalStatus: profileObj.value.maritalStatus,
  //   //   stateOfOrigin: profileObj.value.stateOfOrigin || '', // Assuming `stateOfOrigin` is available
  //   //   lga: profileObj.value.lga || '' // Assuming `lga` is available
  //   // }
  // }
});


// Load and save profile data using the persistence composable
const { saveData, loadData } = useFormPersistence();

const extractValuesFromArray = (dataArray: any, mapping: any) => {
  const result = {};
  
  // Ensure dataArray is an array before using forEach
  if (Array.isArray(dataArray)) {
    dataArray.forEach((item: any) => {
      const labelKey = Object.keys(mapping).find(key => mapping[key] === item.label);
      if (labelKey) {
        result[labelKey] = item.value;
      }
    });
  } else {
    console.warn('Expected an array but got:', dataArray);
  }
  
  return result;
};

// Define the label mappings for each section
const personalMapping = {
  name: 'Name',
  email: 'Email address',
  phone: 'Phone number',
  dob: 'Date of Birth',
  gender: 'Gender',
  maritalStatus: 'Marital status',
  stateOfOrigin: 'State of Origin',
  lga: 'Local Government (LGA)'
};

const rentalMapping = {
  currentLandlord: 'Current Landlord',
  address: 'Rental Address',
  lengthOfTenancy: 'Length of Tenancy',
  reasonForMovingOut: 'Reason for moving out'
};

const employmentMapping = {
  status: 'Current employment status',
  employerName: 'Employer\'s full name',
  occupation: 'Occupation',
  organizationAddress: 'Organization address',
  salary: 'Monthly Net Salary'
};

const nextOfKinMapping = {
  fullName: 'Full Name',
  relationship: 'Relationship',
  email: 'Email address',
  address: 'Residential address',
  phone: 'Phone Number',
  occupation: 'Occupation',
  organizationName: 'Organization name',
  officeAddress: 'Office address'
};


onMounted(() => {
  const personal = loadData('personal-information');
  const rental = loadData('rental-history');
  const employment = loadData('employment-information');
  const nextOfKin = loadData('next-of-kin');
  const document = loadData('uploaded-document'); // Assuming document is not an array
  const prescreening = loadData('prescreening');  // Pre-screening questions

  if (Array.isArray(personal) && personal.length) {
    profile.value.personal = extractValuesFromArray(personal, personalMapping);
  }
  if (Array.isArray(rental) && rental.length) {
    profile.value.rental = extractValuesFromArray(rental, rentalMapping);
  }
  if (Array.isArray(employment) && employment.length) {
    profile.value.employment = extractValuesFromArray(employment, employmentMapping);
  }
  if (Array.isArray(nextOfKin) && nextOfKin.length) {
    profile.value.nextOfKin = extractValuesFromArray(nextOfKin, nextOfKinMapping);
  }
  if (document) {
    profile.value.document = document;
  }
  if (Array.isArray(prescreening) && prescreening.length) {
    profile.value.screeningQuestions = prescreening.map((q: any) => ({
      id: q.id,
      question: q.question,
      answer: q.answer || '', // Ensure answer is set
    }));
  }
});

// Navigation and actions
const router = useRouter();
const route = useRoute();


const saveProfile = () => {
  saveData('personal-information', profile.value.personal);
  saveData('rental-history', profile.value.rental);
  saveData('employment-information', profile.value.employment);
  saveData('next-of-kin', profile.value.nextOfKin);
  saveData('uploaded-document', profile.value.document);
  saveData('prescreening', profile.value.screeningQuestions); // Save pre-screening questions
};

const goBack = () => {
  router.push({ query: { step: '1' } });
};

const isQuestionsArrayEmpty = computed(() => {
  return profile.value.screeningQuestions.every(question => !question.answer.trim());
});

const goNext = async () => {
  // Create an array of question-answer pairs
  const questionAnswerPairs = profile.value.screeningQuestions.map(q => ({
    questionId: q.id,
    answer: q.answer
  }));

  // Construct the payload
  const payload = {
    houseId: route.params.id,
    roomId: localStorage.getItem('roomId') || '', // Fallback if roomId is null
    idDocument: profile.value.document,
    questionAnswers: questionAnswerPairs
  };

  // Check if the questions array is empty, then save and go to next step
  if (isQuestionsArrayEmpty.value) {
    saveProfile();
    router.push({ query: { step: '3' } });
  } else {
    processing.value = true;
    setPayload(payload);
    
    try {
      await createRentalApplication(user.value.id);
    } catch (error) {
      console.error('Error creating rental application:', error);
    } finally {
      processing.value = false;
    }
  }

  console.log(profile.value.screeningQuestions, 'here');
};


const editSection = (section: string) => {
  if(section === 'screening-questions'){
    router.push(`/dashboard/listings/${route.params.id}/rental-applications/create?step=1`)
  } else if (section === 'uploaded-document') {
    router.push(`/dashboard/listings/${route.params.id}/rental-applications/create?step=3`)
  } else {
    router.push(`/dashboard/listings/${route.params.id}/rental-applications/edit/${section}`);
  }
};
</script>
