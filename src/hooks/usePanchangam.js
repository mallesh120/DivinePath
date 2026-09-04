import { useState, useEffect, useCallback } from 'react';
import { getPanchangam, Observer, yogaNames, tithiNames, nakshatraNames } from '@ishubhamx/panchangam-js';

export const SACRED_CITIES = [
  { id: 'auto', name: '📍 Auto-detect GPS', lat: null, lon: null },
  { id: 'varanasi', name: 'Varanasi (Kashi)', lat: 25.3176, lon: 82.9739, elevation: 0.080 },
  { id: 'ayodhya', name: 'Ayodhya', lat: 26.7922, lon: 82.1998, elevation: 0.093 },
  { id: 'haridwar', name: 'Haridwar', lat: 29.9457, lon: 78.1642, elevation: 0.314 },
  { id: 'tirupati', name: 'Tirupati', lat: 13.6288, lon: 79.4192, elevation: 0.160 },
  { id: 'ujjain', name: 'Ujjain', lat: 23.1765, lon: 75.7885, elevation: 0.494 },
  { id: 'puri', name: 'Puri (Jagannath)', lat: 19.8135, lon: 85.8312, elevation: 0.010 },
  { id: 'rameswaram', name: 'Rameswaram', lat: 9.2876, lon: 79.3129, elevation: 0.010 },
  { id: 'bengaluru', name: 'Bengaluru', lat: 12.9716, lon: 77.5946, elevation: 0.920 },
  { id: 'delhi', name: 'New Delhi', lat: 28.6139, lon: 77.2090, elevation: 0.216 },
  { id: 'mumbai', name: 'Mumbai', lat: 19.0760, lon: 72.8777, elevation: 0.014 },
  { id: 'new_york', name: 'New York (USA)', lat: 40.7128, lon: -74.0060, elevation: 0.010 },
  { id: 'london', name: 'London (UK)', lat: 51.5074, lon: -0.1278, elevation: 0.025 },
  { id: 'toronto', name: 'Toronto (Canada)', lat: 43.6532, lon: -79.3832, elevation: 0.076 },
  { id: 'singapore', name: 'Singapore', lat: 1.3521, lon: 103.8198, elevation: 0.015 },
  { id: 'sydney', name: 'Sydney (Australia)', lat: -33.8688, lon: 151.2093, elevation: 0.019 }
];

/**
 * Calculate accurate Hindu calendar information for any date
 */
export const calculateBasicPanchang = (year, month, day, observer) => {
  const dateMid = new Date(year, month, day, 12, 0, 0, 0); // Midday for tithi/nakshatra
  const dateStart = new Date(year, month, day, 0, 0, 0, 0); // Start of day for timings
  
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
    
    let auspiciousness = 3;
    const t = panchangNow.tithi;
    
    if (t === 10 || t === 25 || t === 14) {
      auspiciousness = 5; // Ekadashi, Purnima
    } else if ([1, 2, 4, 6, 9, 11, 16, 17, 19, 21, 24, 26].includes(t)) {
      auspiciousness = 4;
    } else if ([3, 8, 13, 18, 23, 28].includes(t)) {
      auspiciousness = 2;
    } else if (t === 29 || t === 7 || t === 22) {
      auspiciousness = 1;
    }

    const formatTime = (isoString) => {
      if (!isoString) return 'N/A';
      return new Date(isoString).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
      });
    };

    const isShukla = panchangNow.paksha === 'Shukla';
    const tithiInPaksha = (t % 15) + 1;
    
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
 * Hook to fetch Panchangam (Hindu calendar) data with automatic geolocation and city selection
 */
export const usePanchangam = () => {
  const [selectedCityId, setSelectedCityId] = useState(() => {
    return localStorage.getItem('divine_path_selected_city') || 'auto';
  });
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState('Bengaluru');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [panchangamData, setPanchangamData] = useState(null);

  const applyCity = useCallback((cityId) => {
    if (cityId === 'auto') {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude, elevation: 0.5 });
            try {
              const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              const data = await res.json();
              setPlaceName(data.address?.city || data.address?.town || data.address?.state || 'Local Area');
            } catch {
              setPlaceName('Your Location');
            }
            setLoading(false);
          },
          () => {
            setLocation({ latitude: 12.9716, longitude: 77.5946, elevation: 0.920 });
            setPlaceName('Bengaluru');
            setLoading(false);
          }
        );
      } else {
        setLocation({ latitude: 12.9716, longitude: 77.5946, elevation: 0.920 });
        setPlaceName('Bengaluru');
        setLoading(false);
      }
    } else {
      const city = SACRED_CITIES.find(c => c.id === cityId);
      if (city && city.lat) {
        setLocation({ latitude: city.lat, longitude: city.lon, elevation: city.elevation || 0.1 });
        setPlaceName(city.name);
      }
      setLoading(false);
    }
  }, []);

  const changeCity = (cityId) => {
    setSelectedCityId(cityId);
    localStorage.setItem('divine_path_selected_city', cityId);
    setLoading(true);
    applyCity(cityId);
  };

  useEffect(() => {
    applyCity(selectedCityId);
  }, [selectedCityId, applyCity]);

  useEffect(() => {
    if (loading || !location) return;

    try {
      const now = new Date();
      const todayStart = new Date(now);
      todayStart.setHours(0, 0, 0, 0);

      const observer = new Observer(
        location.latitude,
        location.longitude,
        location.elevation || 0
      );

      const panchangamDay = getPanchangam(todayStart, observer);
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
          cityId: selectedCityId,
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
        },
        // Raw timing timestamps for real-time comparison
        rawTimings: {
          rahuStart: panchangamDay.rahuKalamStart ? new Date(panchangamDay.rahuKalamStart).getTime() : null,
          rahuEnd: panchangamDay.rahuKalamEnd ? new Date(panchangamDay.rahuKalamEnd).getTime() : null,
          abhijitStart: panchangamDay.abhijitMuhurta?.start ? new Date(panchangamDay.abhijitMuhurta.start).getTime() : null,
          abhijitEnd: panchangamDay.abhijitMuhurta?.end ? new Date(panchangamDay.abhijitMuhurta.end).getTime() : null,
          yamagandaStart: panchangamDay.yamagandaKalam?.start ? new Date(panchangamDay.yamagandaKalam.start).getTime() : null,
          yamagandaEnd: panchangamDay.yamagandaKalam?.end ? new Date(panchangamDay.yamagandaKalam.end).getTime() : null,
          gulikaiStart: panchangamDay.gulikaKalam?.start ? new Date(panchangamDay.gulikaKalam.start).getTime() : null,
          gulikaiEnd: panchangamDay.gulikaKalam?.end ? new Date(panchangamDay.gulikaKalam.end).getTime() : null,
          brahmaStart: panchangamDay.brahmaMuhurta?.start ? new Date(panchangamDay.brahmaMuhurta.start).getTime() : null,
          brahmaEnd: panchangamDay.brahmaMuhurta?.end ? new Date(panchangamDay.brahmaMuhurta.end).getTime() : null
        }
      };

      setPanchangamData(formattedData);
    } catch (err) {
      console.error('Error calculating panchangam:', err);
      setError('Error calculating panchangam data');
    }
  }, [loading, location, placeName, selectedCityId]);

  return { 
    loading, 
    error, 
    panchangamData, 
    location, 
    selectedCityId, 
    changeCity, 
    currentCity: selectedCityId,
    setCity: changeCity,
    cities: SACRED_CITIES,
    SACRED_CITIES 
  };
};
