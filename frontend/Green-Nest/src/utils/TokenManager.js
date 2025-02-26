import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Retrieves the authentication token from AsyncStorage.
 * @returns {Promise<string|null>} The stored token or null if not found.
 */
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Error retrieving token from storage:", error);
    return null;
  }
};

/**
 * Stores the authentication token in AsyncStorage.
 * @param {string} token - The token to be stored.
 */
export const storeAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Error saving token to storage:", error);
  }
};

/**
 * Removes the authentication token from AsyncStorage.
 */
export const clearAuthToken = async () => {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Error clearing token from storage:", error);
  }
};
