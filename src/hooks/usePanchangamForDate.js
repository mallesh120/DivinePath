import { useState, useEffect } from 'react';

/**
 * Hook to fetch Panchangam (Hindu calendar) data for a specific date
 * @param {number} year - Year
 * @param {number} month - Month (0-11)
 * @param {number} day - Day of month
 * @param {object} location - Location with latitude and longitude
 */
export const usePanchangamForDate = (year, month, day, location) => {
  const [panchangData, setPanchangData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location || !year || month === undefined || !day) {
      return;
    }

    const fetchPanchangData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Create date object for the specific day
        const date = new Date(year, month, day);
        const isoDateTime = date.toISOString();

        const response = await fetch(
          `/api/panchangam-for-date?` +
          `latitude=${location.latitude}&` +
          `longitude=${location.longitude}&` +
          `datetime=${isoDateTime}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch Panchangam data');
        }

        const data = await response.json();
        setPanchangData(data);
      } catch (err) {
        console.error('Error fetching Panchangam data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPanchangData();
  }, [year, month, day, location]);

  return { panchangData, loading, error };
};

/**
 * Calculate basic Hindu calendar information for any date
 * This provides approximate values when API is not available
 */
export const calculateBasicPanchang = (year, month, day) => {
  const date = new Date(year, month, day);
  const dayOfYear = Math.floor((date - new Date(year, 0, 0)) / 86400000);
  
  // Approximate tithi (lunar day) - 30 tithis per lunar month
  const tithi = ((dayOfYear % 30) + 1);
  const tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
  ];
  
  // Approximate nakshatra (27 nakshatras)
  const nakshatra = (dayOfYear % 27);
  const nakshatraNames = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati'
  ];
  
  // Day of week
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const vara = weekdays[date.getDay()];
  
  return {
    tithi: tithiNames[Math.floor(tithi / 2) % 15],
    nakshatra: nakshatraNames[nakshatra],
    vara: vara,
    paksha: tithi <= 15 ? 'Shukla Paksha' : 'Krishna Paksha'
  };
};
