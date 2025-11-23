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
      const now = new Date();
      // To get the correct Sunrise and Sunset for the current civil day, we must pass the start of the day (Midnight).
      // If we pass 'now' (e.g. 10 AM), the library returns the NEXT Sunrise (tomorrow) and current/next Sunset,
      // which invalidates day length calculations.
      const todayStart = new Date(now);
      todayStart.setHours(0, 0, 0, 0);

      const observer = new Observer(
        location.latitude,
        location.longitude,
        location.elevation
      );

      // Fetch panchangam for timings (Sunrise/Sunset/Vara based on civil day start)
      const panchangamDay = getPanchangam(todayStart, observer);

      // Fetch panchangam for current Tithi/Nakshatra (based on current moment)
      const panchangamNow = getPanchangam(now, observer);

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

        // Safety check for invalid day length (e.g. if sunrise is tomorrow)
        if (dayLength <= 0) return 'Calculation Error';

        const partLength = dayLength / totalParts;

        const startTime = new Date(sunrise.getTime() + (startPartIndex * partLength));
        const endTime = new Date(startTime.getTime() + (durationParts * partLength));

        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
      };

      // Rahu Kalam: 8th part of the day (Sunday starts at index 7, etc.)
      const calculateRahuKalam = (sunrise, sunset, dayOfWeek) => {
        const rahuIndices = { 0: 7, 1: 1, 2: 6, 3: 4, 4: 5, 5: 3, 6: 2 };
        const index = rahuIndices[dayOfWeek];
        return calculateTimeRange(sunrise, sunset, index, 1, 8);
      };

      // Yamagandam: 8th part of the day
      const calculateYamagandam = (sunrise, sunset, dayOfWeek) => {
        const yamaIndices = { 0: 4, 1: 3, 2: 2, 3: 1, 4: 0, 5: 6, 6: 5 };
        const index = yamaIndices[dayOfWeek];
        return calculateTimeRange(sunrise, sunset, index, 1, 8);
      };

      // Gulikai Kalam: 8th part of the day
      const calculateGulikaiKalam = (sunrise, sunset, dayOfWeek) => {
        const gulikaiIndices = { 0: 6, 1: 5, 2: 4, 3: 3, 4: 2, 5: 1, 6: 0 };
        const index = gulikaiIndices[dayOfWeek];
        return calculateTimeRange(sunrise, sunset, index, 1, 8);
      };

      // Durmuhurtham: 15 parts of the day (Muhurthas)
      const calculateDurmuhurtham = (sunrise, sunset, dayOfWeek) => {
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
        "Location": placeName,
        "Day": ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][panchangamDay.vara] || 'N/A',
        "Tithi": tithiNames[panchangamNow.tithi - 1] || 'N/A',
        "Nakshatra": nakshatraNames[panchangamNow.nakshatra - 1] || 'N/A',
        "Sunrise": formatTime(panchangamDay.sunrise),
        "Sunset": formatTime(panchangamDay.sunset),
        "Rahu Kalam": calculateRahuKalam(panchangamDay.sunrise, panchangamDay.sunset, panchangamDay.vara),
        "Yamagandam": calculateYamagandam(panchangamDay.sunrise, panchangamDay.sunset, panchangamDay.vara),
        "Gulikai Kalam": calculateGulikaiKalam(panchangamDay.sunrise, panchangamDay.sunset, panchangamDay.vara),
        "Durmuhurtham": calculateDurmuhurtham(panchangamDay.sunrise, panchangamDay.sunset, panchangamDay.vara)
      };

      setPanchangamData(formattedData);
    } catch (err) {
      console.error('Error calculating panchangam:', err);
      setError('Error calculating panchangam data');
    }
  }, [loading, location, placeName]);

  return { loading, error, panchangamData };
};
