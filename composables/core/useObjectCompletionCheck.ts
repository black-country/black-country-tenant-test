import { ref } from 'vue';

export function useObjectCompletionCheck() {
  const isObjectComplete = ref(false);

  // Exclude specific keys from the check
  const excludedKeys = ['city', 'cityId', 'deletedAt', 'shouldContactReferences'];

  /**
   * Checks if at least 90% of the values in the object (excluding specific keys) are populated.
   * @param {Object} obj - The object to check.
   * @returns {boolean} - True if 90% of the object's values are available, false otherwise.
   */
  function checkObjectCompletion(obj) {
    if (!obj || typeof obj !== 'object') {
      return false;
    }

    // Filter out the excluded keys
    const relevantKeys = Object.keys(obj).filter(key => !excludedKeys.includes(key));
    const totalFields = relevantKeys.length;

    // Count only populated fields among the relevant keys
    const populatedFields = relevantKeys.filter(
      (key) => obj[key] !== null && obj[key] !== undefined && obj[key] !== ''
    ).length;

    const completionPercentage = (populatedFields / totalFields) * 100;

    isObjectComplete.value = completionPercentage >= 90;
    return isObjectComplete.value;
  }

  return {
    isObjectComplete,
    checkObjectCompletion,
  };
}
