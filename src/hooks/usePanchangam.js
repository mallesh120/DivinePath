import { useState, useEffect } from 'react';
import { getPanchangam, Observer } from '@ishubhamx/panchangam-js';

// Tithi names
const tithiNames = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
];

// Nakshatra names
const nakshatraNames = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

export const usePanchangam = () => {
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [panchangamData, setPanchangamData] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            elevation: 0.5
          });

          // Get place name using reverse geocoding
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            setPlaceName(data.address.city || data.address.town || data.address.village || 'Unknown Location');
          } catch (error) {
            console.error('Error getting location name:', error);
            setPlaceName('Unknown Location');
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to get your location. Using default location (Bangalore).");
          setLocation({
            latitude: 12.9716,
            longitude: 77.5946,
            elevation: 0.920
          });
          setPlaceName('Bangalore');
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Using default location (Bangalore).");
      setLocation({
        latitude: 12.9716,
        longitude: 77.5946,
        elevation: 0.920
      });
      setPlaceName('Bangalore');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading || !location) return;

    try {
      const today = new Date();
      const observer = new Observer(
        location.latitude,
        location.longitude,
        location.elevation
      );

      const panchangam = getPanchangam(today, observer);

      const formatTime = (date) => {
        if (!(date instanceof Date)) return 'N/A';
        return date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
      };

      const calculateYamagandam = (sunrise, sunset, dayOfWeek) => {
        if (!sunrise || !sunset) return 'N/A';
        const daylightDuration = sunset.getTime() - sunrise.getTime();
        const partDuration = daylightDuration / 8;
        const yamaPeriods = { 0: 4, 1: 3, 2: 2, 3: 1, 4: 0, 5: 6, 6: 5 }; // Sunday:0 to Saturday:6
        const yamaPart = yamaPeriods[dayOfWeek];
        const startTime = new Date(sunrise.getTime() + (yamaPart * partDuration));
        const endTime = new Date(startTime.getTime() + partDuration);
        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
      };

      const calculateDurmuhurtham = (sunrise, dayOfWeek) => {
        if (!sunrise) return 'N/A';
        const muhurtaDuration = (24 * 60) / 30 * 60 * 1000; // 48 minutes
        const durmuhurthamPeriods = {
          0: [8, 9],   // Sunday
          1: [4, 12],  // Monday
          2: [3, 7],   // Tuesday
          3: [4, 5],   // Wednesday
          4: [2, 10],  // Thursday
          5: [1, 3],   // Friday
          6: [0, 14],  // Saturday
        };
        const periods = durmuhurthamPeriods[dayOfWeek];
        const startTime1 = new Date(sunrise.getTime() + (periods[0] * muhurtaDuration));
        const endTime1 = new Date(startTime1.getTime() + muhurtaDuration);

        if (dayOfWeek !== 0 && dayOfWeek !== 3) {
          const startTime2 = new Date(sunrise.getTime() + (periods[1] * muhurtaDuration));
          const endTime2 = new Date(startTime2.getTime() + muhurtaDuration);
          return `${formatTime(startTime1)} - ${formatTime(endTime1)}, ${formatTime(startTime2)} - ${formatTime(endTime2)}`;
        }
        return `${formatTime(startTime1)} - ${formatTime(endTime1)}`;
      };

      const rahuKalamStart = panchangam.rahuKalamStart;
      const rahuKalamEnd = panchangam.rahuKalamEnd;

      const formattedData = {
        location: placeName,
        day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][panchangam.vara] || 'N/A',
        tithi: tithiNames[panchangam.tithi - 1] || 'N/A',
        nakshatra: nakshatraNames[panchangam.nakshatra - 1] || 'N/A',
        sunrise: formatTime(panchangam.sunrise),
        sunset: formatTime(panchangam.sunset),
        rahuKalam: `${rahuKalamStart.toLocaleTimeString()} - ${rahuKalamEnd.toLocaleTimeString()}`,
        yamagandam: calculateYamagandam(panchangam.sunrise, panchangam.sunset, panchangam.vara),
        durmuhurtham: calculateDurmuhurtham(panchangam.sunrise, panchangam.vara)
      };

      setPanchangamData(formattedData);
    } catch (err) {
      console.error('Error calculating panchangam:', err);
      setError('Error calculating panchangam data');
    }
  }, [loading, location, placeName]);

  return { loading, error, panchangamData };
};
