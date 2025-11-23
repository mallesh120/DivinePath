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

      // Helper to calculate a time range based on parts of the day
      const calculateTimeRange = (sunrise, sunset, startPartIndex, durationParts = 1, totalParts = 8) => {
        if (!sunrise || !sunset) return 'N/A';
        const dayLength = sunset.getTime() - sunrise.getTime();
        const partLength = dayLength / totalParts;

        const startTime = new Date(sunrise.getTime() + (startPartIndex * partLength));
        const endTime = new Date(startTime.getTime() + (durationParts * partLength));

        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
      };

      // Rahu Kalam: 8th part of the day (Sunday starts at index 7, etc.)
      const calculateRahuKalam = (sunrise, sunset, dayOfWeek) => {
        // Indices (0-7) for Rahu Kalam start time
        // Sun: 7 (4:30-6:00), Mon: 1 (7:30-9:00), Tue: 6 (3:00-4:30), Wed: 4 (12:00-1:30)
        // Thu: 5 (1:30-3:00), Fri: 3 (10:30-12:00), Sat: 2 (9:00-10:30)
        const rahuIndices = { 0: 7, 1: 1, 2: 6, 3: 4, 4: 5, 5: 3, 6: 2 };
        const index = rahuIndices[dayOfWeek];
        return calculateTimeRange(sunrise, sunset, index, 1, 8);
      };

      // Yamagandam: 8th part of the day
      const calculateYamagandam = (sunrise, sunset, dayOfWeek) => {
        // Indices (0-7) for Yamagandam start time
        // Sun: 4, Mon: 3, Tue: 2, Wed: 1, Thu: 0, Fri: 6, Sat: 5
        const yamaIndices = { 0: 4, 1: 3, 2: 2, 3: 1, 4: 0, 5: 6, 6: 5 };
        const index = yamaIndices[dayOfWeek];
        return calculateTimeRange(sunrise, sunset, index, 1, 8);
      };

      // Durmuhurtham: 15 parts of the day (Muhurthas)
      const calculateDurmuhurtham = (sunrise, sunset, dayOfWeek) => {
        // Indices (0-14) for Durmuhurtham start time
        // Sun: 13 (14th), Mon: 8 (9th), Tue: 3 (4th), Wed: 7 (8th)
        // Thu: 5 (6th) & 12 (13th), Fri: 3 (4th) & 8 (9th), Sat: 1 (2nd)
        const durmuhurthamIndices = {
          0: [13],
          1: [8],
          2: [3],
          3: [7],
          4: [5, 12],
          5: [3, 8],
          6: [1]
        };

        const indices = durmuhurthamIndices[dayOfWeek];
        const ranges = indices.map(index => calculateTimeRange(sunrise, sunset, index, 1, 15));
        return ranges.join(', ');
      };

      const formattedData = {
        location: placeName,
        day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][panchangam.vara] || 'N/A',
        tithi: tithiNames[panchangam.tithi - 1] || 'N/A',
        nakshatra: nakshatraNames[panchangam.nakshatra - 1] || 'N/A',
        sunrise: formatTime(panchangam.sunrise),
        sunset: formatTime(panchangam.sunset),
        rahuKalam: calculateRahuKalam(panchangam.sunrise, panchangam.sunset, panchangam.vara),
        yamagandam: calculateYamagandam(panchangam.sunrise, panchangam.sunset, panchangam.vara),
        durmuhurtham: calculateDurmuhurtham(panchangam.sunrise, panchangam.sunset, panchangam.vara)
      };

      setPanchangamData(formattedData);
    } catch (err) {
      console.error('Error calculating panchangam:', err);
      setError('Error calculating panchangam data');
    }
  }, [loading, location, placeName]);

  return { loading, error, panchangamData };
};
