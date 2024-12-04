// composables/useProfileCompletion.ts

import { ref } from 'vue';

/**
 * Composable to calculate the profile completion percentage
 * @param profileData - The profile object with fields and values
 * @returns The profile completion percentage
 */
export const useProfileCompletion = (profileData: Record<string, any>) => {
  // Ref to hold the completion percentage
  const completionPercentage = ref(0);

  // Watch the profileData object to calculate completion
  const calculateCompletion = () => {
    const totalFields = Object.keys(profileData).length;
    const filledFields = Object.values(profileData).filter(value => value !== null && value !== undefined).length;

    // Calculate the percentage based on filled fields
    completionPercentage.value = Math.round((filledFields / totalFields) * 100);
  };

  // Initial calculation of completion percentage
  calculateCompletion();

  // Return the completion percentage
  return { completionPercentage };
};
