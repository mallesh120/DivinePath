/**
 * Rate Limiter for API calls
 * Limits: 15 calls per minute
 */

class RateLimiter {
  constructor(maxCalls = 15, windowMs = 60000) {
    this.maxCalls = maxCalls;
    this.windowMs = windowMs;
    this.calls = [];
  }

  /**
   * Check if we can make a call
   * @returns {boolean} true if call is allowed
   */
  canMakeCall() {
    const now = Date.now();
    
    // Remove calls outside the time window
    this.calls = this.calls.filter(timestamp => now - timestamp < this.windowMs);
    
    return this.calls.length < this.maxCalls;
  }

  /**
   * Record a call
   */
  recordCall() {
    this.calls.push(Date.now());
  }

  /**
   * Get remaining calls in current window
   * @returns {number} remaining calls
   */
  getRemainingCalls() {
    const now = Date.now();
    this.calls = this.calls.filter(timestamp => now - timestamp < this.windowMs);
    return Math.max(0, this.maxCalls - this.calls.length);
  }

  /**
   * Get time until reset (in seconds)
   * @returns {number} seconds until oldest call expires
   */
  getTimeUntilReset() {
    if (this.calls.length === 0) return 0;
    
    const now = Date.now();
    const oldestCall = Math.min(...this.calls);
    const timeUntilExpiry = this.windowMs - (now - oldestCall);
    
    return Math.max(0, Math.ceil(timeUntilExpiry / 1000));
  }

  /**
   * Reset the limiter
   */
  reset() {
    this.calls = [];
  }
}

// Create singleton instance
const aiRateLimiter = new RateLimiter(15, 60000); // 15 calls per minute

// Local storage keys
const STORAGE_KEYS = {
  DAILY_USAGE: 'ai_daily_usage',
  LAST_RESET: 'ai_last_reset',
  TOTAL_CALLS: 'ai_total_calls'
};

/**
 * Get usage statistics from local storage
 */
export const getUsageStats = () => {
  const dailyUsage = parseInt(localStorage.getItem(STORAGE_KEYS.DAILY_USAGE) || '0');
  const lastReset = localStorage.getItem(STORAGE_KEYS.LAST_RESET);
  const totalCalls = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_CALLS) || '0');
  
  // Check if we need to reset daily usage
  const today = new Date().toDateString();
  if (lastReset !== today) {
    localStorage.setItem(STORAGE_KEYS.DAILY_USAGE, '0');
    localStorage.setItem(STORAGE_KEYS.LAST_RESET, today);
    return {
      dailyUsage: 0,
      totalCalls,
      remaining: aiRateLimiter.getRemainingCalls(),
      resetIn: aiRateLimiter.getTimeUntilReset()
    };
  }
  
  return {
    dailyUsage,
    totalCalls,
    remaining: aiRateLimiter.getRemainingCalls(),
    resetIn: aiRateLimiter.getTimeUntilReset()
  };
};

/**
 * Record an API call
 */
const recordUsage = () => {
  const dailyUsage = parseInt(localStorage.getItem(STORAGE_KEYS.DAILY_USAGE) || '0');
  const totalCalls = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_CALLS) || '0');
  
  localStorage.setItem(STORAGE_KEYS.DAILY_USAGE, String(dailyUsage + 1));
  localStorage.setItem(STORAGE_KEYS.TOTAL_CALLS, String(totalCalls + 1));
  localStorage.setItem(STORAGE_KEYS.LAST_RESET, new Date().toDateString());
};

/**
 * Check if AI call is allowed and make the call
 * @param {Function} apiCallFn - The API function to call
 * @returns {Promise} - Result or error
 */
export const makeAICall = async (apiCallFn) => {
  // Check rate limit
  if (!aiRateLimiter.canMakeCall()) {
    const resetIn = aiRateLimiter.getTimeUntilReset();
    throw new Error(
      `Rate limit exceeded. Please wait ${resetIn} seconds before trying again.`
    );
  }

  try {
    // Record the call
    aiRateLimiter.recordCall();
    recordUsage();
    
    // Make the actual API call
    const result = await apiCallFn();
    return result;
  } catch (error) {
    // If the call failed, we don't undo the rate limit
    // This prevents rapid retry attacks
    throw error;
  }
};

/**
 * Check if user can make a call without actually making it
 * @returns {Object} { allowed, remaining, resetIn, message }
 */
export const checkAICallAllowed = () => {
  const allowed = aiRateLimiter.canMakeCall();
  const remaining = aiRateLimiter.getRemainingCalls();
  const resetIn = aiRateLimiter.getTimeUntilReset();
  
  return {
    allowed,
    remaining,
    resetIn,
    message: allowed 
      ? `You have ${remaining} AI calls remaining in the next minute.`
      : `Rate limit reached. Please wait ${resetIn} seconds.`
  };
};

export default aiRateLimiter;
