// import { auth_api } from "@/api_factory/modules/auth";
// import { useRouter } from "vue-router";
// import { ref } from "vue";
// import { useUser } from '@/composables/auth/user'
// import { useCustomToast } from '@/composables/core/useCustomToast'
// import { use_tenant_profile } from "@/composables/auth/fetchProfile";
// const { loading, profileObj } = use_tenant_profile();

// const { showToast } = useCustomToast();

// export const use_update_profile = () => {
//   const Router = useRouter();
//   const { updateUser } = useUser()
  
//   const credential = ref({
//     firstName: "",
//     lastName: "",
//     email: "",
//     isEmailVerified: false,
//     isActive: false,
//     phoneNumber: "",
//     dateOfBirth: "",
//     gender: "",
//     maritalStatus: "",
//     profilePicture: null,
//     currentLandlord: null,
//     rentalAddress: null,
//     lengthOfTenancy: null,
//     reasonForMovingOut: null,
//     employmentStatus: null,
//     employerName: null,
//     employerAddress: null,
//     occupation: null,
//     monthlyNetSalary: null,
//     nextOfKinName: null,
//     nextOfKinRelationship: null,
//     nextOfKinEmail: null,
//     nextOfKinAddress: null,
//     nextOfKinPhone: null,
//     nextOfKinOccupation: null,
//     nextOfKinEmployer: null,
//     nextOfKinEmployerAddress: null,
//     shouldContactReferences: null,
//     cityId: null
//   }) as any;

//   const locationCredential = ref({
//     state: '',
//     lga: ''
//   })

//   const loading = ref(false);
//   const error = ref(null); // Track error messages

//   const updateProfile = async (profilePayload: any) => {
//     loading.value = true;
//     error.value = null; // Reset error before the API call

//     try {
//       const res = await auth_api.$_update_profile(profilePayload);
    
//       loading.value = false;

//       if (res.type !== "ERROR") {
//         locationCredential.value.state = res?.data?.city?.steteName
//         locationCredential.value.lga = res?.data?.city?.name
//         showToast({
//           title: "Success",
//           message: 'Profile was updated successfully',
//           toastType: "success",
//           duration: 3000
//         });
//         Router.push('/profile/profile-update-success')
//         const data = {
//           profilePicture: res.data.profilePicture
//         }
//         updateUser(data)
//         console.log(res, 'res here ooooo again')
//         return res;
//       } else {
//         console.log(res, 'res here')
//         showToast({
//           title: "Error",
//           message: res.data.error,
//           toastType: "error",
//           duration: 3000
//         });
//         // If API returns an error, set the error state
//         error.value = res.message || "An error occurred while updating the profile.";
//         return Promise.reject(error.value);
//       }
//     } catch (err: any) {
//       console.log(err, 'res here')
//       loading.value = false;
//       showToast({
//         title: "Error",
//         message: err.message || "An unexpected error occurred while updating the profile.",
//         toastType: "error",
//         duration: 3000
//       });
//       return Promise.reject(error.value); // Return the error to the calling function
//     }
//   };


//   onMounted(() => {

//   })

//   return { credential, updateProfile, loading, error, locationCredential };
// };



import { auth_api } from "@/api_factory/modules/auth";
import { useRouter } from "vue-router";
import { ref, watch, onMounted } from "vue";
import { useUser } from '@/composables/auth/user'
import { useCustomToast } from '@/composables/core/useCustomToast'
import { use_tenant_profile } from "@/composables/auth/fetchProfile";

export const use_update_profile = () => {
  const Router = useRouter();
  const { updateUser } = useUser();
  const { showToast } = useCustomToast();
  const { profileObj } = use_tenant_profile();

  interface LocationCredential {
    state: string;
    lga: string;
  }

  interface ProfileCredential {
    firstName: string;
    lastName: string;
    email: string;
    isEmailVerified: boolean;
    isActive: boolean;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    maritalStatus: string;
    profilePicture: string | null;
    currentLandlord: string | null;
    rentalAddress: string | null;
    lengthOfTenancy: string | null;
    reasonForMovingOut: string | null;
    employmentStatus: string | null;
    employerName: string | null;
    employerAddress: string | null;
    occupation: string | null;
    monthlyNetSalary: string | null;
    nextOfKinName: string | null;
    nextOfKinRelationship: string | null;
    nextOfKinEmail: string | null;
    nextOfKinAddress: string | null;
    nextOfKinPhone: string | null;
    nextOfKinOccupation: string | null;
    nextOfKinEmployer: string | null;
    nextOfKinEmployerAddress: string | null;
    shouldContactReferences: boolean | null;
    cityId: string | null;
  }

  const credential = ref<ProfileCredential>({
    firstName: "",
    lastName: "",
    email: "",
    isEmailVerified: false,
    isActive: false,
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    profilePicture: null,
    currentLandlord: null,
    rentalAddress: null,
    lengthOfTenancy: null,
    reasonForMovingOut: null,
    employmentStatus: null,
    employerName: null,
    employerAddress: null,
    occupation: null,
    monthlyNetSalary: null,
    nextOfKinName: null,
    nextOfKinRelationship: null,
    nextOfKinEmail: null,
    nextOfKinAddress: null,
    nextOfKinPhone: null,
    nextOfKinOccupation: null,
    nextOfKinEmployer: null,
    nextOfKinEmployerAddress: null,
    shouldContactReferences: null,
    cityId: null
  });

  const locationCredential = ref<LocationCredential>({
    state: '',
    lga: ''
  });

  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);

  const populateCredentials = (profile: any) => {
    if (!profile) return;

    // Populate main credentials
    Object.keys(credential.value).forEach((key) => {
      if (key in profile) {
        credential.value[key as keyof ProfileCredential] = profile[key];
      }
    });

    // Populate location credentials
    if (profile.city) {
      locationCredential.value = {
        state: profile.city.stateName,
        lga: profile.city.name
      };
    }
  };

  // Watch for profile changes
  watch(() => profileObj.value, (newProfile) => {
    populateCredentials(newProfile);
  }, { immediate: true });

  onMounted(() => {
    if (profileObj.value) {
      populateCredentials(profileObj.value);
    }
  });

  const validateProfile = (profileData: ProfileCredential): string | null => {
    if (!profileData.firstName || !profileData.lastName) {
      return "First name and last name are required";
    }
    if (!profileData.email) {
      return "Email is required";
    }
    if (!profileData.phoneNumber) {
      return "Phone number is required";
    }
    // Add more validation as needed
    return null;
  };

  const updateProfile = async (profilePayload: Partial<ProfileCredential>) => {
    loading.value = true;
    error.value = null;

    try {
      // Validate profile data
      const validationError = validateProfile(profilePayload as ProfileCredential);
      if (validationError) {
        throw new Error(validationError);
      }

      const res = await auth_api.$_update_profile(profilePayload);
      
      if (res.type !== "ERROR") {
        // Update location credentials
        if (res.data?.city) {
          locationCredential.value = {
            state: res.data.city.stateName,
            lga: res.data.city.name
          };
        }

        // Update user profile picture
        updateUser({
          profilePicture: res.data.profilePicture
        });

        // Show success message
        showToast({
          title: "Success",
          message: 'Profile was updated successfully',
          toastType: "success",
          duration: 3000
        });

        // Navigate to success page
        Router.push('/profile/profile-update-success');
        
        return res;
      } else {
        throw new Error(res.data.error || "Failed to update profile");
      }
    } catch (err: any) {
      error.value = err.message || "An unexpected error occurred while updating the profile.";
      
      showToast({
        title: "Error",
        message: error.value,
        toastType: "error",
        duration: 3000
      });

      return Promise.reject(error.value);
    } finally {
      loading.value = false;
    }
  };

  const resetForm = () => {
    credential.value = {
      firstName: "",
      lastName: "",
      email: "",
      isEmailVerified: false,
      isActive: false,
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      maritalStatus: "",
      profilePicture: null,
      currentLandlord: null,
      rentalAddress: null,
      lengthOfTenancy: null,
      reasonForMovingOut: null,
      employmentStatus: null,
      employerName: null,
      employerAddress: null,
      occupation: null,
      monthlyNetSalary: null,
      nextOfKinName: null,
      nextOfKinRelationship: null,
      nextOfKinEmail: null,
      nextOfKinAddress: null,
      nextOfKinPhone: null,
      nextOfKinOccupation: null,
      nextOfKinEmployer: null,
      nextOfKinEmployerAddress: null,
      shouldContactReferences: null,
      cityId: null
    };
    locationCredential.value = {
      state: '',
      lga: ''
    };
  };

  return {
    credential,
    locationCredential,
    loading,
    error,
    updateProfile,
    resetForm
  };
};