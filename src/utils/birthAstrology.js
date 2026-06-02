import { getPanchangam, Observer } from '@ishubhamx/panchangam-js';

// Nakshatra names
export const nakshatraNames = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

// Ruling deities for each nakshatra
export const nakshatraDeities = {
  'Ashwini': { deity: 'Ashwini Kumaras', planet: 'Ketu', element: 'Earth' },
  'Bharani': { deity: 'Yama', planet: 'Venus', element: 'Earth' },
  'Krittika': { deity: 'Agni', planet: 'Sun', element: 'Fire' },
  'Rohini': { deity: 'Brahma', planet: 'Moon', element: 'Earth' },
  'Mrigashira': { deity: 'Soma (Chandra)', planet: 'Mars', element: 'Earth' },
  'Ardra': { deity: 'Rudra (Shiva)', planet: 'Rahu', element: 'Water' },
  'Punarvasu': { deity: 'Aditi', planet: 'Jupiter', element: 'Water' },
  'Pushya': { deity: 'Brihaspati', planet: 'Saturn', element: 'Water' },
  'Ashlesha': { deity: 'Nagas (Serpents)', planet: 'Mercury', element: 'Water' },
  'Magha': { deity: 'Pitris (Ancestors)', planet: 'Ketu', element: 'Water' },
  'Purva Phalguni': { deity: 'Bhaga', planet: 'Venus', element: 'Water' },
  'Uttara Phalguni': { deity: 'Aryaman', planet: 'Sun', element: 'Fire' },
  'Hasta': { deity: 'Savitar (Surya)', planet: 'Moon', element: 'Air' },
  'Chitra': { deity: 'Vishwakarma', planet: 'Mars', element: 'Fire' },
  'Swati': { deity: 'Vayu', planet: 'Rahu', element: 'Air' },
  'Vishakha': { deity: 'Indra-Agni', planet: 'Jupiter', element: 'Fire' },
  'Anuradha': { deity: 'Mitra', planet: 'Saturn', element: 'Water' },
  'Jyeshtha': { deity: 'Indra', planet: 'Mercury', element: 'Air' },
  'Mula': { deity: 'Nirriti (Alakshmi)', planet: 'Ketu', element: 'Air' },
  'Purva Ashadha': { deity: 'Apas (Waters)', planet: 'Venus', element: 'Water' },
  'Uttara Ashadha': { deity: 'Vishvadevas', planet: 'Sun', element: 'Air' },
  'Shravana': { deity: 'Vishnu', planet: 'Moon', element: 'Air' },
  'Dhanishta': { deity: 'Vasus', planet: 'Mars', element: 'Ether' },
  'Shatabhisha': { deity: 'Varuna', planet: 'Rahu', element: 'Ether' },
  'Purva Bhadrapada': { deity: 'Aja Ekapada', planet: 'Jupiter', element: 'Fire' },
  'Uttara Bhadrapada': { deity: 'Ahir Budhnya', planet: 'Saturn', element: 'Ether' },
  'Revati': { deity: 'Pushan', planet: 'Mercury', element: 'Ether' }
};

// Mantras based on nakshatra deity
export const nakshatraMantras = {
  'Ashwini': [
    'Om Ashwini Kumarabhyam Namah',
    'Om Namo Bhagavate Vasudevaya',
    'Mahamrityunjaya Mantra'
  ],
  'Bharani': [
    'Om Yamaya Namah',
    'Om Shri Durgayai Namah',
    'Om Namah Shivaya'
  ],
  'Krittika': [
    'Om Agnaye Namah',
    'Gayatri Mantra',
    'Om Suryaya Namah'
  ],
  'Rohini': [
    'Om Brahmane Namah',
    'Om Chandraya Namah',
    'Om Lakshmi Narayanaya Namah'
  ],
  'Mrigashira': [
    'Om Chandraya Namah',
    'Om Somaya Namah',
    'Chandra Beej Mantra'
  ],
  'Ardra': [
    'Om Namah Shivaya',
    'Mahamrityunjaya Mantra',
    'Om Rudraya Namah'
  ],
  'Punarvasu': [
    'Om Aditiyai Namah',
    'Om Gurave Namah',
    'Guru Beej Mantra'
  ],
  'Pushya': [
    'Om Brihaspataye Namah',
    'Om Gurave Namah',
    'Vishnu Sahasranama'
  ],
  'Ashlesha': [
    'Om Namo Narayanaya',
    'Budh Beej Mantra',
    'Om Budhaya Namah'
  ],
  'Magha': [
    'Om Pitrabhyo Namah',
    'Pitru Tarpanam Mantra',
    'Om Ketave Namah'
  ],
  'Purva Phalguni': [
    'Om Shukraya Namah',
    'Om Lakshmi Narayanaya Namah',
    'Shukra Beej Mantra'
  ],
  'Uttara Phalguni': [
    'Om Aryamne Namah',
    'Om Suryaya Namah',
    'Aditya Hridayam'
  ],
  'Hasta': [
    'Om Savitre Namah',
    'Gayatri Mantra',
    'Savitri Mantra'
  ],
  'Chitra': [
    'Om Vishwakarmane Namah',
    'Om Mangalaya Namah',
    'Mars Beej Mantra'
  ],
  'Swati': [
    'Om Vayave Namah',
    'Hanuman Chalisa',
    'Om Hanumate Namah'
  ],
  'Vishakha': [
    'Om Indraya Namah',
    'Om Agnaye Namah',
    'Om Gurave Namah'
  ],
  'Anuradha': [
    'Om Mitraya Namah',
    'Om Shani Devaya Namah',
    'Shani Beej Mantra'
  ],
  'Jyeshtha': [
    'Om Indraya Namah',
    'Om Budhaya Namah',
    'Indra Mantra'
  ],
  'Mula': [
    'Om Nirritiyai Namah',
    'Om Ganeshaya Namah',
    'Om Ketave Namah'
  ],
  'Purva Ashadha': [
    'Om Adbhyo Namah',
    'Om Shukraya Namah',
    'Varuna Mantra'
  ],
  'Uttara Ashadha': [
    'Om Vishvedevebhyo Namah',
    'Om Suryaya Namah',
    'Universal Peace Mantra'
  ],
  'Shravana': [
    'Om Namo Narayanaya',
    'Om Vishnave Namah',
    'Vishnu Mantra'
  ],
  'Dhanishta': [
    'Om Vasubhyo Namah',
    'Om Mangalaya Namah',
    'Ashta Vasu Mantra'
  ],
  'Shatabhisha': [
    'Om Varunaya Namah',
    'Varuna Mantra',
    'Rahu Beej Mantra'
  ],
  'Purva Bhadrapada': [
    'Om Aja Ekapadaya Namah',
    'Om Gurave Namah',
    'Shiva Mantra'
  ],
  'Uttara Bhadrapada': [
    'Om Ahir Budhnyaya Namah',
    'Om Shani Devaya Namah',
    'Serpent Deity Mantra'
  ],
  'Revati': [
    'Om Pushne Namah',
    'Om Budhaya Namah',
    'Mercury Mantra'
  ]
};

// Weekday ruling planets and deities
export const weekdayInfo = {
  0: { day: 'Sunday', planet: 'Sun', deity: 'Surya', color: 'Red', mantra: 'Om Suryaya Namah' },
  1: { day: 'Monday', planet: 'Moon', deity: 'Chandra', color: 'White', mantra: 'Om Chandraya Namah' },
  2: { day: 'Tuesday', planet: 'Mars', deity: 'Mangal/Hanuman', color: 'Red', mantra: 'Om Mangalaya Namah' },
  3: { day: 'Wednesday', planet: 'Mercury', deity: 'Budha', color: 'Green', mantra: 'Om Budhaya Namah' },
  4: { day: 'Thursday', planet: 'Jupiter', deity: 'Guru/Brihaspati', color: 'Yellow', mantra: 'Om Gurave Namah' },
  5: { day: 'Friday', planet: 'Venus', deity: 'Shukra', color: 'White/Pink', mantra: 'Om Shukraya Namah' },
  6: { day: 'Saturday', planet: 'Saturn', deity: 'Shani', color: 'Black/Blue', mantra: 'Om Shani Devaya Namah' }
};

/**
 * Calculate birth nakshatra from date of birth
 * @param {Date} birthDate - Date of birth
 * @param {Object} location - {latitude, longitude, elevation}
 * @returns {Object} Birth nakshatra details
 */
export const calculateBirthNakshatra = (birthDate, location = { latitude: 12.9716, longitude: 77.5946, elevation: 0.920 }) => {
  try {
    const observer = new Observer(location.latitude, location.longitude, location.elevation);
    const panchang = getPanchangam(birthDate, observer);
    
    const nakshatraIndex = panchang.nakshatra - 1;
    const nakshatraName = nakshatraNames[nakshatraIndex];
    const nakshatraInfo = nakshatraDeities[nakshatraName];
    
    return {
      nakshatra: nakshatraName,
      deity: nakshatraInfo?.deity || 'Unknown',
      planet: nakshatraInfo?.planet || 'Unknown',
      element: nakshatraInfo?.element || 'Unknown',
      mantras: nakshatraMantras[nakshatraName] || []
    };
  } catch (error) {
    console.error('Error calculating birth nakshatra:', error);
    return null;
  }
};

/**
 * Get personalized recommendations based on birth details and today's Panchang
 * @param {string} name - User's name
 * @param {Date} birthDate - Date of birth
 * @param {Object} todayPanchang - Today's panchang data
 * @returns {Object} Personalized recommendations
 */
export const getPersonalizedGuidance = (name, birthDate, todayPanchang) => {
  const birthNakshatra = calculateBirthNakshatra(birthDate);
  if (!birthNakshatra) {
    return null;
  }
  
  const birthDay = birthDate.getDay();
  const todayDay = new Date().getDay();
  const birthWeekdayInfo = weekdayInfo[birthDay];
  const todayWeekdayInfo = weekdayInfo[todayDay];
  
  // Check if today is favorable
  const isBirthDayToday = birthDay === todayDay;
  const isFavorablePlanet = birthNakshatra.planet === todayWeekdayInfo.planet;
  
  // Get best timing recommendations
  const bestTimings = [];
  if (todayPanchang?.auspicious) {
    bestTimings.push({
      name: 'Brahma Muhurta',
      time: todayPanchang.auspicious['Brahma Muhurta'],
      description: 'Best for meditation and spiritual practices'
    });
    bestTimings.push({
      name: 'Abhijit Muhurta',
      time: todayPanchang.auspicious['Abhijit Muhurta'],
      description: 'Auspicious for important activities'
    });
  }
  
  // Combine mantras from birth nakshatra and today's weekday
  const recommendedMantras = [
    ...birthNakshatra.mantras,
    todayWeekdayInfo.mantra
  ];
  
  return {
    name,
    birthNakshatra,
    birthWeekday: birthWeekdayInfo,
    todayWeekday: todayWeekdayInfo,
    isBirthDayToday,
    isFavorablePlanet,
    bestTimings,
    recommendedMantras: [...new Set(recommendedMantras)], // Remove duplicates
    specialGuidance: getSpecialGuidance(birthNakshatra, todayPanchang, isBirthDayToday, isFavorablePlanet)
  };
};

/**
 * Generate special guidance text
 */
const getSpecialGuidance = (birthNakshatra, todayPanchang, isBirthDayToday, isFavorablePlanet) => {
  const guidance = [];
  
  if (isBirthDayToday) {
    guidance.push(`🎉 Today is your birth weekday (${birthNakshatra.planet} day)! This is especially auspicious for you.`);
  }
  
  if (isFavorablePlanet) {
    guidance.push(`✨ Today's planetary influence (${birthNakshatra.planet}) aligns with your birth nakshatra, making it a favorable day.`);
  }
  
  guidance.push(`🙏 Your ruling deity is ${birthNakshatra.deity}. Worship and offerings to this deity bring you prosperity.`);
  
  if (todayPanchang?.almanac?.Tithi?.name) {
    guidance.push(`📅 Today's Tithi is ${todayPanchang.almanac.Tithi.name}. Use the auspicious timings for important activities.`);
  }
  
  return guidance;
};
