/**
 * Hindu Calendar Calculations
 * Calculates festival dates based on lunar calendar (Panchang)
 */

/**
 * Calculate the Julian Day Number from a Gregorian date
 */
function gregorianToJD(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + 
         Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

/**
 * Calculate the Gregorian date from Julian Day Number
 */
// eslint-disable-next-line no-unused-vars
function jdToGregorian(jd) {
  const a = jd + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  
  const day = e - Math.floor((153 * m + 2) / 5) + 1;
  const month = m + 3 - 12 * Math.floor(m / 10);
  const year = 100 * b + d - 4800 + Math.floor(m / 10);
  
  return { year, month, day };
}

/**
 * Calculate moon phase (0 = new moon, 1 = full moon)
 */
function getMoonPhase(year, month, day) {
  const jd = gregorianToJD(year, month, day);
  
  // Moon's mean longitude
  const moonLong = 218.316 + 13.176396 * (jd - 2451545.0);
  
  // Sun's mean longitude
  const sunLong = 280.466 + 0.9856474 * (jd - 2451545.0);
  
  // Moon phase
  const phase = (moonLong - sunLong) % 360;
  return (phase + 360) % 360;
}

/**
 * Find the date of a specific lunar phase (New Moon or Full Moon)
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {string} phase - 'new' or 'full'
 */
function findLunarPhaseDate(year, month, phase) {
  const targetPhase = phase === 'new' ? 0 : 180;
  const daysInMonth = new Date(year, month, 0).getDate();
  
  let closestDay = 15; // Start from mid-month
  let minDiff = 360;
  
  // Search through the month
  for (let day = 1; day <= daysInMonth; day++) {
    const moonPhase = getMoonPhase(year, month, day);
    const diff = Math.min(
      Math.abs(moonPhase - targetPhase),
      Math.abs(moonPhase - targetPhase + 360),
      Math.abs(moonPhase - targetPhase - 360)
    );
    
    if (diff < minDiff) {
      minDiff = diff;
      closestDay = day;
    }
  }
  
  return closestDay;
}

/**
 * Calculate Diwali date (Kartik Amavasya - New Moon in October/November)
 */
export function calculateDiwali(year) {
  // Diwali occurs on the new moon between mid-October and mid-November
  let day = findLunarPhaseDate(year, 10, 'new'); // Try October first
  
  // If the new moon is too early in October, check November
  if (day < 15) {
    const novDay = findLunarPhaseDate(year, 11, 'new');
    if (novDay < 20) {
      day = novDay;
      return new Date(year, 10, day); // November (month 10)
    }
  }
  
  return new Date(year, 9, day); // October (month 9)
}

/**
 * Calculate Holi date (Phalguna Purnima - Full Moon in February/March)
 */
export function calculateHoli(year) {
  // Holi is celebrated on Phalguna Purnima (full moon in Feb/March)
  let day = findLunarPhaseDate(year, 3, 'full'); // Try March
  
  if (day > 20) {
    return new Date(year, 2, day); // March (month 2)
  }
  
  // Check late February
  const febDay = findLunarPhaseDate(year, 2, 'full');
  if (febDay > 20) {
    return new Date(year, 1, febDay); // February (month 1)
  }
  
  return new Date(year, 2, day); // Default to March
}

/**
 * Calculate Janmashtami date (Krishna's birthday - Bhadrapada Krishna Ashtami)
 * Occurs on the 8th day after full moon in August/September
 */
export function calculateJanmashtami(year) {
  const fullMoonDay = findLunarPhaseDate(year, 8, 'full'); // August
  
  // 8th day after full moon (Krishna Paksha Ashtami)
  let day = fullMoonDay + 8;
  let month = 7; // August (month 7)
  
  // Handle month overflow
  const daysInAugust = new Date(year, 8, 0).getDate();
  if (day > daysInAugust) {
    day = day - daysInAugust;
    month = 8; // September
  }
  
  return new Date(year, month, day);
}

/**
 * Calculate Ganesh Chaturthi (Bhadrapada Shukla Chaturthi - 4th day after new moon in Aug/Sep)
 */
export function calculateGaneshChaturthi(year) {
  const newMoonDay = findLunarPhaseDate(year, 8, 'new'); // August
  
  // 4th day after new moon
  let day = newMoonDay + 4;
  let month = 7; // August (month 7)
  
  const daysInAugust = new Date(year, 8, 0).getDate();
  if (day > daysInAugust) {
    day = day - daysInAugust;
    month = 8; // September
  }
  
  return new Date(year, month, day);
}

/**
 * Calculate Navratri start date (Ashwin Shukla Pratipada - day after new moon in Sep/Oct)
 */
export function calculateNavratri(year) {
  const newMoonDay = findLunarPhaseDate(year, 9, 'new'); // September
  
  // Day after new moon
  let day = newMoonDay + 1;
  let month = 8; // September (month 8)
  
  const daysInSep = new Date(year, 9, 0).getDate();
  if (day > daysInSep) {
    day = day - daysInSep;
    month = 9; // October
  }
  
  return new Date(year, month, day);
}

/**
 * Calculate Dussehra (Vijayadashami - 10th day of Navratri)
 */
export function calculateDussehra(year) {
  const navratri = calculateNavratri(year);
  const dussehra = new Date(navratri);
  dussehra.setDate(dussehra.getDate() + 9); // 10th day
  return dussehra;
}

/**
 * Calculate Ram Navami (9th day of Chaitra - March/April)
 */
export function calculateRamNavami(year) {
  const newMoonDay = findLunarPhaseDate(year, 3, 'new'); // March
  
  // 9th day after new moon
  let day = newMoonDay + 9;
  let month = 2; // March (month 2)
  
  const daysInMarch = new Date(year, 3, 0).getDate();
  if (day > daysInMarch) {
    day = day - daysInMarch;
    month = 3; // April
  }
  
  return new Date(year, month, day);
}

/**
 * Calculate Maha Shivaratri (13th night/14th day before new moon in Feb/March)
 */
export function calculateMahaShivaratri(year) {
  const newMoonDay = findLunarPhaseDate(year, 3, 'new'); // March
  
  // 13th/14th day before new moon
  let day = newMoonDay - 14;
  let month = 2; // March (month 2)
  
  if (day < 1) {
    const daysInFeb = new Date(year, 2, 0).getDate();
    day = daysInFeb + day;
    month = 1; // February
  }
  
  return new Date(year, month, day);
}

/**
 * Calculate Raksha Bandhan (Shravan Purnima - Full moon in July/August)
 */
export function calculateRakshaBandhan(year) {
  const fullMoonDay = findLunarPhaseDate(year, 8, 'full'); // August
  
  // Check if full moon is in early August or late July
  if (fullMoonDay < 10) {
    const julyFull = findLunarPhaseDate(year, 7, 'full');
    if (julyFull > 20) {
      return new Date(year, 6, julyFull); // July
    }
  }
  
  return new Date(year, 7, fullMoonDay); // August
}

/**
 * Calculate Guru Purnima (Ashadha Purnima - Full moon in June/July)
 */
export function calculateGuruPurnima(year) {
  const fullMoonDay = findLunarPhaseDate(year, 7, 'full'); // July
  
  if (fullMoonDay < 10) {
    const juneFull = findLunarPhaseDate(year, 6, 'full');
    if (juneFull > 20) {
      return new Date(year, 5, juneFull); // June
    }
  }
  
  return new Date(year, 6, fullMoonDay); // July
}

/**
 * Format date as YYYY-MM-DD
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate all Hindu festival dates for a given year
 * @param {number} year - The year to calculate festivals for
 * @param {object} location - Location object with latitude/longitude (optional)
 */
export function generateFestivalDatesForYear(year, location = null) {
  // Apply timezone offset if location is provided
  // For now, the calculations are universal, but can be adjusted based on location
  const diwali = calculateDiwali(year);
  const navratri = calculateNavratri(year);
  const dussehra = calculateDussehra(year);
  
  return {
    diwali: {
      date: formatDate(diwali),
      endDate: formatDate(new Date(diwali.getTime() + 4 * 24 * 60 * 60 * 1000)) // 5 days
    },
    holi: {
      date: formatDate(calculateHoli(year)),
      endDate: formatDate(calculateHoli(year))
    },
    navratri: {
      date: formatDate(navratri),
      endDate: formatDate(dussehra)
    },
    dussehra: {
      date: formatDate(dussehra),
      endDate: formatDate(dussehra)
    },
    janmashtami: {
      date: formatDate(calculateJanmashtami(year)),
      endDate: formatDate(calculateJanmashtami(year))
    },
    ganeshChaturthi: {
      date: formatDate(calculateGaneshChaturthi(year)),
      endDate: formatDate(calculateGaneshChaturthi(year))
    },
    ramNavami: {
      date: formatDate(calculateRamNavami(year)),
      endDate: formatDate(calculateRamNavami(year))
    },
    mahaShivaratri: {
      date: formatDate(calculateMahaShivaratri(year)),
      endDate: formatDate(calculateMahaShivaratri(year))
    },
    rakshaBandhan: {
      date: formatDate(calculateRakshaBandhan(year)),
      endDate: formatDate(calculateRakshaBandhan(year))
    },
    guruPurnima: {
      date: formatDate(calculateGuruPurnima(year)),
      endDate: formatDate(calculateGuruPurnima(year))
    }
  };
}

/**
 * Get all calculated festivals for multiple years
 */
export function getCalculatedFestivals(startYear, endYear) {
  const festivals = [];
  
  for (let year = startYear; year <= endYear; year++) {
    const dates = generateFestivalDatesForYear(year);
    festivals.push({ year, dates });
  }
  
  return festivals;
}
