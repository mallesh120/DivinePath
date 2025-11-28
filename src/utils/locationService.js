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
          localStorage.setItem('userLocationTime', Date.now().toString());
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
          localStorage.setItem('userLocation', JSON.stringify(location));
          localStorage.setItem('userLocationTime', Date.now().toString());
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
        timeout: 10000,
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
 * Popular cities worldwide with significant Hindu populations
 */
export const WORLD_CITIES = [
  // India
  { name: 'New Delhi', latitude: 28.6139, longitude: 77.2090, country: 'India', region: 'India' },
  { name: 'Mumbai', latitude: 19.0760, longitude: 72.8777, country: 'India', region: 'India' },
  { name: 'Bangalore', latitude: 12.9716, longitude: 77.5946, country: 'India', region: 'India' },
  { name: 'Chennai', latitude: 13.0827, longitude: 80.2707, country: 'India', region: 'India' },
  { name: 'Kolkata', latitude: 22.5726, longitude: 88.3639, country: 'India', region: 'India' },
  { name: 'Hyderabad', latitude: 17.3850, longitude: 78.4867, country: 'India', region: 'India' },
  // USA
  { name: 'New York', latitude: 40.7128, longitude: -74.0060, country: 'USA', region: 'Americas' },
  { name: 'Los Angeles', latitude: 34.0522, longitude: -118.2437, country: 'USA', region: 'Americas' },
  { name: 'San Francisco', latitude: 37.7749, longitude: -122.4194, country: 'USA', region: 'Americas' },
  { name: 'Chicago', latitude: 41.8781, longitude: -87.6298, country: 'USA', region: 'Americas' },
  { name: 'Houston', latitude: 29.7604, longitude: -95.3698, country: 'USA', region: 'Americas' },
  // Canada
  { name: 'Toronto', latitude: 43.6532, longitude: -79.3832, country: 'Canada', region: 'Americas' },
  { name: 'Vancouver', latitude: 49.2827, longitude: -123.1207, country: 'Canada', region: 'Americas' },
  // UK
  { name: 'London', latitude: 51.5074, longitude: -0.1278, country: 'UK', region: 'Europe' },
  { name: 'Leicester', latitude: 52.6369, longitude: -1.1398, country: 'UK', region: 'Europe' },
  // Europe
  { name: 'Amsterdam', latitude: 52.3676, longitude: 4.9041, country: 'Netherlands', region: 'Europe' },
  { name: 'Paris', latitude: 48.8566, longitude: 2.3522, country: 'France', region: 'Europe' },
  // Asia-Pacific
  { name: 'Singapore', latitude: 1.3521, longitude: 103.8198, country: 'Singapore', region: 'Asia-Pacific' },
  { name: 'Kuala Lumpur', latitude: 3.1390, longitude: 101.6869, country: 'Malaysia', region: 'Asia-Pacific' },
  { name: 'Sydney', latitude: -33.8688, longitude: 151.2093, country: 'Australia', region: 'Asia-Pacific' },
  { name: 'Melbourne', latitude: -37.8136, longitude: 144.9631, country: 'Australia', region: 'Asia-Pacific' },
  { name: 'Dubai', latitude: 25.2048, longitude: 55.2708, country: 'UAE', region: 'Middle East' },
  // South Asia
  { name: 'Kathmandu', latitude: 27.7172, longitude: 85.3240, country: 'Nepal', region: 'South Asia' },
  { name: 'Colombo', latitude: 6.9271, longitude: 79.8612, country: 'Sri Lanka', region: 'South Asia' },
  // Africa
  { name: 'Durban', latitude: -29.8587, longitude: 31.0218, country: 'South Africa', region: 'Africa' },
  { name: 'Nairobi', latitude: -1.2864, longitude: 36.8172, country: 'Kenya', region: 'Africa' }
];

// Keep the old export for backward compatibility
export const INDIAN_CITIES = WORLD_CITIES.filter(city => city.country === 'India');
