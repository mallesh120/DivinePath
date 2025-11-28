/**
 * Location Service
 * Handles user location detection and storage
 */

const DEFAULT_LOCATION = {
  latitude: 28.6139, // New Delhi
  longitude: 77.2090,
  city: 'New Delhi',
  country: 'India',
  timezone: 'Asia/Kolkata'
};

/**
 * Get user's current location using browser Geolocation API
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported, using default location');
      resolve(DEFAULT_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Try to get city name using reverse geocoding
        try {
          const locationDetails = await reverseGeocode(latitude, longitude);
          const location = {
            latitude,
            longitude,
            ...locationDetails
          };
          
          // Cache the location
          localStorage.setItem('userLocation', JSON.stringify(location));
          resolve(location);
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
          const location = {
            latitude,
            longitude,
            city: 'Unknown',
            country: 'Unknown',
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          };
          resolve(location);
        }
      },
      (error) => {
        console.warn('Geolocation permission denied or failed:', error);
        // Try to get cached location
        const cached = getCachedLocation();
        resolve(cached || DEFAULT_LOCATION);
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 3600000 // 1 hour
      }
    );
  });
};

/**
 * Reverse geocode coordinates to get city/country info
 */
const reverseGeocode = async (latitude, longitude) => {
  try {
    // Using OpenStreetMap Nominatim API (free, no API key required)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      {
        headers: {
          'User-Agent': 'DivinePath-App'
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Geocoding failed');
    }
    
    const data = await response.json();
    const address = data.address || {};
    
    return {
      city: address.city || address.town || address.village || address.state || 'Unknown',
      country: address.country || 'Unknown',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
};

/**
 * Get cached location from localStorage
 */
export const getCachedLocation = () => {
  try {
    const cached = localStorage.getItem('userLocation');
    if (cached) {
      const location = JSON.parse(cached);
      // Check if cache is less than 24 hours old
      const cacheTime = localStorage.getItem('userLocationTime');
      if (cacheTime) {
        const age = Date.now() - parseInt(cacheTime, 10);
        if (age < 24 * 60 * 60 * 1000) { // 24 hours
          return location;
        }
      }
    }
  } catch (error) {
    console.error('Error reading cached location:', error);
  }
  return null;
};

/**
 * Get location for festival calculations
 * Returns cached location if available, otherwise requests permission
 */
export const getLocationForFestivals = async () => {
  // First check cache
  const cached = getCachedLocation();
  if (cached) {
    return cached;
  }
  
  // If no cache, try to get user's location
  try {
    const location = await getUserLocation();
    localStorage.setItem('userLocationTime', Date.now().toString());
    return location;
  } catch (error) {
    console.error('Failed to get user location:', error);
    return DEFAULT_LOCATION;
  }
};

/**
 * Manually set location
 */
export const setUserLocation = (latitude, longitude, city, country) => {
  const location = {
    latitude,
    longitude,
    city: city || 'Unknown',
    country: country || 'Unknown',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  
  localStorage.setItem('userLocation', JSON.stringify(location));
  localStorage.setItem('userLocationTime', Date.now().toString());
  
  return location;
};

/**
 * Clear cached location
 */
export const clearLocationCache = () => {
  localStorage.removeItem('userLocation');
  localStorage.removeItem('userLocationTime');
};

/**
 * Popular Indian cities with coordinates
 */
export const INDIAN_CITIES = [
  { name: 'New Delhi', latitude: 28.6139, longitude: 77.2090, region: 'North' },
  { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777, region: 'West' },
  { name: 'Bangalore', latitude: 12.9716, longitude: 77.5946, region: 'South' },
  { name: 'Chennai', latitude: 13.0827, longitude: 80.2707, region: 'South' },
  { name: 'Kolkata', latitude: 22.5726, longitude: 88.3639, region: 'East' },
  { name: 'Hyderabad', latitude: 17.3850, longitude: 78.4867, region: 'South' },
  { name: 'Pune', latitude: 18.5204, longitude: 73.8567, region: 'West' },
  { name: 'Ahmedabad', latitude: 23.0225, longitude: 72.5714, region: 'West' },
  { name: 'Jaipur', latitude: 26.9124, longitude: 75.7873, region: 'North' },
  { name: 'Lucknow', latitude: 26.8467, longitude: 80.9462, region: 'North' },
  { name: 'Varanasi', latitude: 25.3176, longitude: 82.9739, region: 'North' },
  { name: 'Amritsar', latitude: 31.6340, longitude: 74.8723, region: 'North' }
];
