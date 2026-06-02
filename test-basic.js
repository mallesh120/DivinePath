const { getPanchangam, Observer, yogaNames, tithiNames, nakshatraNames } = require('@ishubhamx/panchangam-js');

const calculateBasicPanchang = (year, month, day, observer) => {
  const date = new Date(year, month, day);
  date.setHours(12, 0, 0, 0); // Calculate at midday to avoid edge cases near midnight transitions
  
  // Default observer to Bangalore if not provided
  const targetObserver = observer || new Observer(12.9716, 77.5946, 0.920);
  
  try {
    const panchang = getPanchangam(date, targetObserver);
    console.log("panchang:", Object.keys(panchang));
    
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
    return { error: true };
  }
};

const result = calculateBasicPanchang(2026, 4, 1);
console.log(result);
