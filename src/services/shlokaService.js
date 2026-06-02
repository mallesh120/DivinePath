import { kidsShlokas } from '../data/kids/shlokas';

/**
 * Service to fetch shlokas. 
 * Designed as an async abstraction so it can be easily swapped to Firebase Firestore in the future.
 */
class ShlokaService {
  /**
   * Fetches the daily shloka.
   * Currently uses local data, but structured to return a Promise for future DB integration.
   * @returns {Promise<Object>} The shloka object for the day.
   */
  async getDailyShloka() {
    // Simulate network delay to ensure UI handles loading states properly (useful for when we move to Firebase)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Pick a shloka based on the current day of the year so it changes daily but stays consistent for 24h
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % kidsShlokas.length;
    
    return kidsShlokas[index];
  }

  /**
   * Fetches all available shlokas.
   * @returns {Promise<Array>} Array of all shlokas.
   */
  async getAllShlokas() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return kidsShlokas;
  }
}

export const shlokaService = new ShlokaService();
