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
  const tithiIndex = ((dayOfYear % 30));
  const tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
  ];
  
  // Approximate nakshatra (27 nakshatras)
  const nakshatraIndex = (dayOfYear % 27);
  const nakshatraNames = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
    'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
    'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
    'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
    'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
    'Uttara Bhadrapada', 'Revati'
  ];
  
  // Approximate yoga (27 yogas)
  const yogaIndex = (dayOfYear % 27);
  const yogaNames = [
    'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana',
    'Atiganda', 'Sukarman', 'Dhriti', 'Shula', 'Ganda',
    'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana', 'Vajra',
    'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva',
    'Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma',
    'Indra', 'Vaidhriti'
  ];
  
  // Approximate karana (11 karanas, repeating)
  const karanaIndex = (dayOfYear % 11);
  const karanaNames = [
    'Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja',
    'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna'
  ];
  
  // Day of week
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const vara = weekdays[date.getDay()];
  
  // Hindu months (approximate)
  const hinduMonths = [
    'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada',
    'Ashwin', 'Kartik', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
  ];
  const hinduMonth = hinduMonths[month];
  
  // Rashi (Moon sign) - approximate
  const rashiIndex = Math.floor((dayOfYear % 360) / 30);
  const rashiNames = [
    'Mesha (Aries)', 'Vrishabha (Taurus)', 'Mithuna (Gemini)', 
    'Karka (Cancer)', 'Simha (Leo)', 'Kanya (Virgo)',
    'Tula (Libra)', 'Vrishchika (Scorpio)', 'Dhanu (Sagittarius)',
    'Makara (Capricorn)', 'Kumbha (Aquarius)', 'Meena (Pisces)'
  ];
  
  // Calculate moon phase percentage
  const moonPhase = tithiIndex <= 14 ? 'Waxing' : 'Waning';
  const moonIllumination = tithiIndex <= 15 
    ? Math.round((tithiIndex / 15) * 100)
    : Math.round(((30 - tithiIndex) / 15) * 100);
  
  // Special days
  const tithi = tithiNames[tithiIndex];
  const isEkadashi = tithi === 'Ekadashi';
  const isPurnima = tithi === 'Purnima';
  const isAmavasya = tithi === 'Amavasya';
  const isPradosham = tithi === 'Trayodashi';
  const isChaturthi = tithi === 'Chaturthi';
  const isAshtami = tithi === 'Ashtami';
  
  // Paksha
  const paksha = tithiIndex < 15 ? 'Shukla Paksha' : 'Krishna Paksha';
  
  // Calculate sunrise and sunset (approximate based on latitude)
  const sunriseHour = 6; // Simplified - would need proper calculation
  const sunsetHour = 18;
  
  // Calculate Rahu Kala (inauspicious period)
  const rahuKalaDuration = 1.5; // 1.5 hours
  const dayOfWeek = date.getDay();
  const rahuKalaStart = [16.5, 7.5, 15, 12, 13.5, 10.5, 9][dayOfWeek]; // Approximate times
  
  // Auspiciousness score (1-5 stars)
  let auspiciousness = 3; // Default neutral
  
  // Boost for good nakshatras
  const goodNakshatras = ['Ashwini', 'Rohini', 'Pushya', 'Hasta', 'Revati', 'Shravana', 'Uttara Phalguni'];
  if (goodNakshatras.includes(nakshatraNames[nakshatraIndex])) auspiciousness += 1;
  
  // Boost for good yogas
  const goodYogas = ['Ayushman', 'Siddhi', 'Siddha', 'Sadhya', 'Shubha', 'Dhruva', 'Harshana'];
  if (goodYogas.includes(yogaNames[yogaIndex])) auspiciousness += 0.5;
  
  // Reduce for bad yogas
  const badYogas = ['Vyaghata', 'Vyatipata', 'Vaidhriti', 'Parigha'];
  if (badYogas.includes(yogaNames[yogaIndex])) auspiciousness -= 1;
  
  // Special days boost
  if (isPurnima || isAmavasya) auspiciousness += 0.5;
  
  auspiciousness = Math.max(1, Math.min(5, auspiciousness)); // Clamp between 1-5
  
  // Determine day suitability
  let bestFor = [];
  if (auspiciousness >= 4) {
    bestFor = ['New Beginnings', 'Marriage', 'Business', 'Travel'];
  } else if (auspiciousness >= 3) {
    bestFor = ['Routine Work', 'Studies', 'Family Activities'];
  } else {
    bestFor = ['Spiritual Practice', 'Introspection', 'Planning'];
  }
  
  return {
    // Basic info
    tithi: tithi,
    tithiIndex: (tithiIndex % 15) + 1,
    nakshatra: nakshatraNames[nakshatraIndex],
    yoga: yogaNames[yogaIndex],
    karana: karanaNames[karanaIndex],
    vara: vara,
    paksha: paksha,
    
    // Extended info
    hinduMonth: hinduMonth,
    rashi: rashiNames[rashiIndex],
    
    // Moon phase
    moonPhase: moonPhase,
    moonIllumination: moonIllumination,
    
    // Special days
    isEkadashi: isEkadashi,
    isPurnima: isPurnima,
    isAmavasya: isAmavasya,
    isPradosham: isPradosham,
    isChaturthi: isChaturthi,
    isAshtami: isAshtami,
    
    // Times (approximate)
    sunrise: `${sunriseHour}:00 AM`,
    sunset: `${sunsetHour}:00 PM`,
    rahuKala: `${Math.floor(rahuKalaStart)}:${String(Math.round((rahuKalaStart % 1) * 60)).padStart(2, '0')} - ${Math.floor(rahuKalaStart + rahuKalaDuration)}:${String(Math.round(((rahuKalaStart + rahuKalaDuration) % 1) * 60)).padStart(2, '0')}`,
    
    // Auspiciousness
    auspiciousness: Math.round(auspiciousness),
    bestFor: bestFor
  };
};
