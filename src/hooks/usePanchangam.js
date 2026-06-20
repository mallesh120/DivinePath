import { useState, useEffect } from 'react';
import { getPanchangam, Observer, yogaNames, tithiNames, nakshatraNames } from '@ishubhamx/panchangam-js';

/**
 * Calculate accurate Hindu calendar information for any date
 * @param {number} year - Year
 * @param {number} month - Month (0-11, JavaScript convention)
 * @param {number} day - Day of month
 * @param {Observer} observer - Location observer
 * @returns {object} Accurate panchang information formatted for HinduCalendarPage
 */
export const calculateBasicPanchang = (year, month, day, observer) => {
  const date = new Date(year, month, day);
  date.setHours(12, 0, 0, 0); // Calculate at midday to avoid edge cases near midnight transitions
  
  // Ensure targetObserver is an instance of Observer
  let targetObserver;
  if (observer && typeof observer.latitude === 'number') {
    targetObserver = new Observer(observer.latitude, observer.longitude, observer.elevation || 0);
  } else if (observer && observer.constructor && observer.constructor.name === 'Observer') {
    targetObserver = observer;
  } else {
    targetObserver = new Observer(12.9716, 77.5946, 0.920);
  }
  
  try {
    const panchang = getPanchangam(date, targetObserver);
    
    // Calculate simple auspiciousness rating based on tithi
    // (5 = best, 1 = worst)
    let auspiciousness = 3;
    const t = panchang.tithi;
    
    if (t === 11 || t === 26 || t === 15) {
      auspiciousness = 5; // Ekadashi, Purnima
    } else if (t === 2 || t === 3 || t === 5 || t === 7 || t === 10 || t === 13 || t === 17 || t === 18 || t === 20 || t === 22 || t === 25 || t === 28) {
      auspiciousness = 4; // Generally good tithis
    } else if (t === 4 || t === 9 || t === 14 || t === 19 || t === 24 || t === 29) {
      auspiciousness = 2; // Rikta tithis (empty hands)
    } else if (t === 30 || t === 8 || t === 23) {
      auspiciousness = 1; // Amavasya, Ashtami
    }

    const formatTime = (isoString) => {
      if (!isoString) return 'N/A';
      return new Date(isoString).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
      });
    };

    const isShukla = panchang.paksha === 'Shukla';
    const tithiInPaksha = t > 15 ? t - 15 : t;
    
    // Moon illumination %
    const moonIllumination = isShukla 
      ? Math.round((tithiInPaksha / 15) * 100) 
      : Math.round(((15 - tithiInPaksha) / 15) * 100);

    return {
      auspiciousness,
      isEkadashi: t === 11 || t === 26,
      isPurnima: t === 15,
      isAmavasya: t === 30,
      isPradosham: t === 13 || t === 28,
      isChaturthi: t === 4 || t === 19,
      isAshtami: t === 8 || t === 23,
      moonPhase: isShukla ? 'Waxing Crescent/Gibbous' : 'Waning Crescent/Gibbous',
      moonIllumination: t === 15 ? 100 : t === 30 ? 0 : moonIllumination,
      hinduMonth: panchang.masa?.name || 'N/A',
      paksha: (panchang.paksha || '') + ' Paksha',
      rashi: panchang.moonRashi?.name || 'N/A',
      tithi: tithiNames[t - 1] || 'N/A',
      tithiIndex: tithiInPaksha,
      nakshatra: nakshatraNames[panchang.nakshatra - 1] || 'N/A',
      yoga: yogaNames[panchang.yoga - 1] || 'N/A',
      karana: panchang.karana || 'N/A',
      vara: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][panchang.vara],
      sunrise: formatTime(panchang.sunrise),
      sunset: formatTime(panchang.sunset),
      rahuKala: panchang.rahuKalamStart ? `${formatTime(panchang.rahuKalamStart)} - ${formatTime(panchang.rahuKalamEnd)}` : 'N/A',
      bestFor: []
    };
  } catch (error) {
    console.error("Error calculating panchang for calendar:", error);
    return {
      auspiciousness: 3, isEkadashi: false, isPurnima: false, isAmavasya: false, 
      isPradosham: false, isChaturthi: false, isAshtami: false,
      moonPhase: 'N/A', moonIllumination: 0, hinduMonth: 'N/A', paksha: 'N/A', 
      rashi: 'N/A', tithi: 'N/A', tithiIndex: 1, nakshatra: 'N/A', yoga: 'N/A', 
      karana: 'N/A', vara: 'N/A', sunrise: 'N/A', sunset: 'N/A', rahuKala: 'N/A', bestFor: []
    };
  }
};

/**
 * Hook to fetch Panchangam (Hindu calendar) data with automatic geolocation
 * Uses local astronomical calculations for accuracy
 */
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

      const formatTime = (isoString) => {
        if (!isoString) return 'N/A';
        return new Date(isoString).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        });
      };

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
            name: nakshatraNames[panchangamNow.nakshatra - 1] || 'N/A',
            endTime: panchangamNow.nakshatraEndTime ? formatTime(panchangamNow.nakshatraEndTime) : null
          },
          Yoga: {
            name: yogaNames[panchangamNow.yoga - 1] || 'N/A',
            endTime: panchangamNow.yogaEndTime ? formatTime(panchangamNow.yogaEndTime) : null
          },
          Karana: {
            name: panchangamNow.karana || 'N/A'
          }
        },
        solarLunar: {
          Sunrise: formatTime(panchangamDay.sunrise),
          Sunset: formatTime(panchangamDay.sunset),
          Moonrise: formatTime(panchangamDay.moonrise),
          Moonset: formatTime(panchangamDay.moonset),
        },
        auspicious: {
          "Brahma Muhurta": panchangamDay.brahmaMuhurta ? `${formatTime(panchangamDay.brahmaMuhurta.start)} - ${formatTime(panchangamDay.brahmaMuhurta.end)}` : 'N/A',
          "Abhijit Muhurta": panchangamDay.abhijitMuhurta ? `${formatTime(panchangamDay.abhijitMuhurta.start)} - ${formatTime(panchangamDay.abhijitMuhurta.end)}` : 'N/A',
        },
        inauspicious: {
          "Rahu Kalam": panchangamDay.rahuKalamStart ? `${formatTime(panchangamDay.rahuKalamStart)} - ${formatTime(panchangamDay.rahuKalamEnd)}` : 'N/A',
          "Yamagandam": panchangamDay.yamagandaKalam ? `${formatTime(panchangamDay.yamagandaKalam.start)} - ${formatTime(panchangamDay.yamagandaKalam.end)}` : 'N/A',
          "Gulikai Kalam": panchangamDay.gulikaKalam ? `${formatTime(panchangamDay.gulikaKalam.start)} - ${formatTime(panchangamDay.gulikaKalam.end)}` : 'N/A',
        }
      };

      setPanchangamData(formattedData);
    } catch (err) {
      console.error('Error calculating panchangam:', err);
      setError('Error calculating panchangam data');
    }
  }, [loading, location, placeName]);

  return { loading, error, panchangamData, location };
};
