import { useState, useEffect } from 'react';
import { getPanchangam, Observer, yogaNames, karanaNames } from '@ishubhamx/panchangam-js';

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
const nakshatraNamesList = [
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

        if (dayLength <= 0) return 'Calculation Error';

        const partLength = dayLength / totalParts;

        const startTime = new Date(sunrise.getTime() + (startPartIndex * partLength));
        const endTime = new Date(startTime.getTime() + (durationParts * partLength));

        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
      };

      // --- Inauspicious Timings ---
      const calculateRahuKalam = (sunrise, sunset, dayOfWeek) => {
        const rahuIndices = { 0: 7, 1: 1, 2: 6, 3: 4, 4: 5, 5: 3, 6: 2 };
        return calculateTimeRange(sunrise, sunset, rahuIndices[dayOfWeek], 1, 8);
      };

      const calculateYamagandam = (sunrise, sunset, dayOfWeek) => {
        const yamaIndices = { 0: 4, 1: 3, 2: 2, 3: 1, 4: 0, 5: 6, 6: 5 };
        return calculateTimeRange(sunrise, sunset, yamaIndices[dayOfWeek], 1, 8);
      };

      const calculateGulikaiKalam = (sunrise, sunset, dayOfWeek) => {
        const gulikaiIndices = { 0: 6, 1: 5, 2: 4, 3: 3, 4: 2, 5: 1, 6: 0 };
        return calculateTimeRange(sunrise, sunset, gulikaiIndices[dayOfWeek], 1, 8);
      };

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

      // --- Auspicious Timings ---

      // Brahma Muhurta: 96 mins (2 muhurtas) before Sunrise
      const calculateBrahmaMuhurta = (sunrise) => {
        if (!sunrise) return 'N/A';
        const start = new Date(sunrise.getTime() - (96 * 60 * 1000));
        const end = new Date(sunrise.getTime() - (48 * 60 * 1000));
        return `${formatTime(start)} - ${formatTime(end)}`;
      };

      // Abhijit Muhurta: 8th Muhurta of the day (Midday)
      // Exception: Not applicable on Wednesdays (index 3) in some traditions,
      // but usually calculated as standard. We'll show it.
      const calculateAbhijitMuhurta = (sunrise, sunset) => {
        // 8th part out of 15
        return calculateTimeRange(sunrise, sunset, 7, 1, 15);
      };

      // Godhuli Muhurta: 12 mins before sunset to 12 mins after sunset
      const calculateGodhuliMuhurta = (sunset) => {
        if (!sunset) return 'N/A';
        const start = new Date(sunset.getTime() - (12 * 60 * 1000));
        const end = new Date(sunset.getTime() + (12 * 60 * 1000));
        return `${formatTime(start)} - ${formatTime(end)}`;
      };

      // Amrit Kalam & Varjyam require complex Nakshatra calculations which are not fully exposed
      // by the current library usage easily without custom logic.
      // We will omit them for now to avoid inaccuracy.

      const formattedData = {
        meta: {
          location: placeName,
          day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][panchangamDay.vara] || 'N/A',
        },
        almanac: {
          Tithi: {
            name: tithiNames[panchangamNow.tithi - 1] || 'N/A',
            endTime: panchangamNow.tithiEndTime ? formatTime(panchangamNow.tithiEndTime) : null
          },
          Nakshatra: {
            name: nakshatraNamesList[panchangamNow.nakshatra - 1] || 'N/A',
            endTime: panchangamNow.nakshatraEndTime ? formatTime(panchangamNow.nakshatraEndTime) : null
          },
          Yoga: {
            name: yogaNames[panchangamNow.yoga] || 'N/A',
            endTime: panchangamNow.yogaEndTime ? formatTime(panchangamNow.yogaEndTime) : null
          },
          Karana: {
            name: typeof panchangamNow.karana === 'string' ? panchangamNow.karana : (karanaNames[panchangamNow.karana] || 'N/A'),
            // Karana is half-tithi, transitions are available in array but single end time is complex to pick
          }
        },
        solarLunar: {
          Sunrise: formatTime(panchangamDay.sunrise),
          Sunset: formatTime(panchangamDay.sunset),
          Moonrise: formatTime(panchangamDay.moonrise),
          Moonset: formatTime(panchangamDay.moonset),
        },
        auspicious: {
          "Brahma Muhurta": calculateBrahmaMuhurta(panchangamDay.sunrise),
          "Abhijit Muhurta": calculateAbhijitMuhurta(panchangamDay.sunrise, panchangamDay.sunset),
          "Godhuli Muhurta": calculateGodhuliMuhurta(panchangamDay.sunset),
        },
        inauspicious: {
          "Rahu Kalam": calculateRahuKalam(panchangamDay.sunrise, panchangamDay.sunset, panchangamDay.vara),
          "Yamagandam": calculateYamagandam(panchangamDay.sunrise, panchangamDay.sunset, panchangamDay.vara),
          "Gulikai Kalam": calculateGulikaiKalam(panchangamDay.sunrise, panchangamDay.sunset, panchangamDay.vara),
          "Durmuhurtham": calculateDurmuhurtham(panchangamDay.sunrise, panchangamDay.sunset, panchangamDay.vara),
        }
      };

      setPanchangamData(formattedData);
    } catch (err) {
      console.error('Error calculating panchangam:', err);
      setError('Error calculating panchangam data');
    }
  }, [loading, location, placeName]);

  return { loading, error, panchangamData };
};
