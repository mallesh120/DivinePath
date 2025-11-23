// Tithi names
export const tithiNames = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
];

// Nakshatra names
export const nakshatraNames = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

export const formatTime = (date) => {
  if (!(date instanceof Date)) return 'N/A';
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
};

export const calculateYamagandam = (sunrise, sunset, dayOfWeek) => {
  if (!sunrise || !sunset) return 'N/A';
  const daylightDuration = sunset.getTime() - sunrise.getTime();
  const partDuration = daylightDuration / 8;
  const yamaPeriods = { 0: 4, 1: 3, 2: 2, 3: 1, 4: 0, 5: 6, 6: 5 }; // Sunday:0 to Saturday:6
  const yamaPart = yamaPeriods[dayOfWeek];
  const startTime = new Date(sunrise.getTime() + (yamaPart * partDuration));
  const endTime = new Date(startTime.getTime() + partDuration);
  return `${formatTime(startTime)} - ${formatTime(endTime)}`;
};

export const calculateDurmuhurtham = (sunrise, dayOfWeek) => {
  if (!sunrise) return 'N/A';
  const muhurtaDuration = 48 * 60 * 1000; // 48 minutes
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
  // Some days have a second period
  if (dayOfWeek !== 0 && dayOfWeek !== 3) {
    const startTime2 = new Date(sunrise.getTime() + (periods[1] * muhurtaDuration));
    const endTime2 = new Date(startTime2.getTime() + muhurtaDuration);
    return `${formatTime(startTime1)} - ${formatTime(endTime1)}, ${formatTime(startTime2)} - ${formatTime(endTime2)}`;
  }
  return `${formatTime(startTime1)} - ${formatTime(endTime1)}`;
};
