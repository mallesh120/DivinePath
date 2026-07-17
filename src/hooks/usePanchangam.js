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
  const dateMid = new Date(year, month, day, 12, 0, 0, 0); // Midday for tithi/nakshatra
  const dateStart = new Date(year, month, day, 0, 0, 0, 0); // Start of day for timings
  
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
    const panchangNow = getPanchangam(dateMid, targetObserver);
    const panchangDay = getPanchangam(dateStart, targetObserver);
    
    // Calculate simple auspiciousness rating based on tithi
    // (5 = best, 1 = worst)
    let auspiciousness = 3;
    const t = panchangNow.tithi; // 0-indexed: 0-14 Shukla, 15-29 Krishna
    
    if (t === 10 || t === 25 || t === 14) {
      auspiciousness = 5; // Ekadashi, Purnima
    } else if (t === 1 || t === 2 || t === 4 || t === 6 || t === 9 || t === 11 || t === 16 || t === 17 || t === 19 || t === 21 || t === 24 || t === 26) {
      auspiciousness = 4; // Generally good tithis
    } else if (t === 3 || t === 8 || t === 13 || t === 18 || t === 23 || t === 28) {
      auspiciousness = 2; // Rikta tithis (empty hands)
    } else if (t === 29 || t === 7 || t === 22) {
      auspiciousness = 1; // Amavasya, Ashtami
    }

    const formatTime = (isoString) => {
      if (!isoString) return 'N/A';
      return new Date(isoString).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
      });
    };

    const isShukla = panchangNow.paksha === 'Shukla';
    const tithiInPaksha = (t % 15) + 1; // 1 to 15
    
    // Moon illumination %
    const moonIllumination = isShukla 
      ? Math.round((tithiInPaksha / 15) * 100) 
      : Math.round(((15 - tithiInPaksha) / 15) * 100);

    return {
      auspiciousness,
      isEkadashi: t === 10 || t === 25,
      isPurnima: t === 14,
      isAmavasya: t === 29,
      isPradosham: t === 12 || t === 27,
      isChaturthi: t === 3 || t === 18,
      isAshtami: t === 7 || t === 22,
      moonPhase: isShukla ? 'Waxing Crescent/Gibbous' : 'Waning Crescent/Gibbous',
      moonIllumination: t === 14 ? 100 : t === 29 ? 0 : moonIllumination,
      hinduMonth: panchangNow.masa?.name || 'N/A',
      paksha: (panchangNow.paksha || '') + ' Paksha',
      rashi: panchangNow.moonRashi?.name || 'N/A',
      tithi: tithiNames[t] || 'N/A',
      tithiIndex: tithiInPaksha,
      nakshatra: nakshatraNames[panchangNow.nakshatra - 1] || 'N/A',
      yoga: yogaNames[panchangNow.yoga - 1] || 'N/A',
      karana: panchangNow.karana || 'N/A',
      vara: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][panchangNow.vara],
      sunrise: formatTime(panchangDay.sunrise),
      sunset: formatTime(panchangDay.sunset),
      auspicious: {
        "Brahma Muhurta": panchangDay.brahmaMuhurta ? `${formatTime(panchangDay.brahmaMuhurta.start)} - ${formatTime(panchangDay.brahmaMuhurta.end)}` : 'N/A',
        "Abhijit Muhurta": panchangDay.abhijitMuhurta ? `${formatTime(panchangDay.abhijitMuhurta.start)} - ${formatTime(panchangDay.abhijitMuhurta.end)}` : 'N/A',
      },
      inauspicious: {
        "Rahu Kalam": panchangDay.rahuKalamStart ? `${formatTime(panchangDay.rahuKalamStart)} - ${formatTime(panchangDay.rahuKalamEnd)}` : 'N/A',
        "Yamagandam": panchangDay.yamagandaKalam ? `${formatTime(panchangDay.yamagandaKalam.start)} - ${formatTime(panchangDay.yamagandaKalam.end)}` : 'N/A',
        "Gulikai Kalam": panchangDay.gulikaKalam ? `${formatTime(panchangDay.gulikaKalam.start)} - ${formatTime(panchangDay.gulikaKalam.end)}` : 'N/A',
      },
      bestFor: []
    };
  } catch (error) {
    console.error("Error calculating panchang for calendar:", error);
    return {
      auspiciousness: 3, isEkadashi: false, isPurnima: false, isAmavasya: false, 
      isPradosham: false, isChaturthi: false, isAshtami: false,
      moonPhase: 'N/A', moonIllumination: 0, hinduMonth: 'N/A', paksha: 'N/A', 
      rashi: 'N/A', tithi: 'N/A', tithiIndex: 1, nakshatra: 'N/A', yoga: 'N/A', 
      karana: 'N/A', vara: 'N/A', sunrise: 'N/A', sunset: 'N/A', 
      auspicious: {}, inauspicious: {}, bestFor: []
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
