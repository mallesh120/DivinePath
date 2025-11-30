// Muhurta (Auspicious Time) data and calculations
import { usePanchangam } from '../hooks/usePanchangam';

// Event types for Muhurta
export const muhurtaEventTypes = [
  { 
    id: 'wedding', 
    name: 'Wedding/Marriage', 
    icon: '💑', 
    duration: '3-4 hours',
    description: 'Marriage ceremony and related rituals',
    considerations: ['Avoid Rahu Kaal and Yamaganda', 'Consider birth charts of bride and groom', 'Choose favorable month and season']
  },
  { 
    id: 'housewarming', 
    name: 'Griha Pravesh (Housewarming)', 
    icon: '🏠', 
    duration: '2-3 hours',
    description: 'First entry into new home',
    considerations: ['Avoid inauspicious days', 'Perform puja before entry', 'Choose morning muhurta']
  },
  { 
    id: 'vehicle', 
    name: 'Vehicle Purchase', 
    icon: '🚗', 
    duration: '1-2 hours',
    description: 'Buying or taking delivery of new vehicle',
    considerations: ['Choose auspicious nakshatra', 'Avoid Saturdays for two-wheelers', 'Perform vehicle puja']
  },
  { 
    id: 'business', 
    name: 'Business Start', 
    icon: '💼', 
    duration: '1-2 hours',
    description: 'Opening new business or office',
    considerations: ['Choose Thursday or Wednesday', 'Morning muhurta preferred', 'Perform Ganesh puja']
  },
  { 
    id: 'education', 
    name: 'Education Start (Vidyarambham)', 
    icon: '📚', 
    duration: '1 hour',
    description: 'Beginning formal education',
    considerations: ['Avoid inauspicious nakshatras', 'Morning hours preferred', 'Seek blessings of Saraswati']
  },
  { 
    id: 'travel', 
    name: 'Travel/Journey', 
    icon: '✈️', 
    duration: 'Departure time',
    description: 'Starting a journey or pilgrimage',
    considerations: ['Check direction-based auspicious days', 'Avoid Rahu Kaal', 'Prefer early morning departure']
  },
  { 
    id: 'naming', 
    name: 'Naming Ceremony', 
    icon: '👶', 
    duration: '1-2 hours',
    description: 'Formal naming of newborn child',
    considerations: ['Usually performed on 11th or 12th day', 'Consider birth nakshatra', 'Choose name based on nakshatra']
  },
  { 
    id: 'thread', 
    name: 'Thread Ceremony (Upanayana)', 
    icon: '🔱', 
    duration: '3-4 hours',
    description: 'Sacred thread ceremony for boys',
    considerations: ['Odd years of age preferred', 'Avoid inauspicious months', 'Consult family priest for exact muhurta']
  }
];

// Favorable months for different events
export const favorableMonths = {
  wedding: {
    excellent: ['Margashirsha', 'Pausha', 'Magha', 'Phalguna'],
    good: ['Chaitra', 'Vaishakha'],
    avoid: ['Ashadha', 'Shravana', 'Bhadrapada', 'Ashwin'] // Monsoon & Pitru Paksha
  },
  housewarming: {
    excellent: ['Vaishakha', 'Jyeshtha', 'Margashirsha', 'Magha'],
    good: ['Chaitra', 'Pausha', 'Phalguna'],
    avoid: ['Ashadha', 'Shravana', 'Bhadrapada']
  },
  vehicle: {
    excellent: ['All months except avoided'],
    good: ['Any auspicious day'],
    avoid: ['During Pitru Paksha']
  }
};

// Favorable Nakshatras for different events
export const favorableNakshatras = {
  wedding: ['Rohini', 'Mrigashira', 'Magha', 'Uttara Phalguni', 'Hasta', 'Swati', 'Anuradha', 'Uttara Ashadha', 'Uttara Bhadrapada', 'Revati'],
  housewarming: ['Ashwini', 'Rohini', 'Mrigashira', 'Pushya', 'Magha', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Anuradha', 'Uttara Ashadha', 'Shravana', 'Revati'],
  vehicle: ['Ashwini', 'Rohini', 'Mrigashira', 'Pushya', 'Uttara Phalguni', 'Hasta', 'Anuradha', 'Pushya', 'Revati'],
  general: ['Ashwini', 'Rohini', 'Mrigashira', 'Pushya', 'Hasta', 'Anuradha', 'Revati']
};

// Favorable Tithis
export const favorableTithis = {
  wedding: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi'],
  housewarming: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi'],
  vehicle: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi'],
  general: ['Dwitiya', 'Tritiya', 'Panchami', 'Saptami', 'Dashami', 'Ekadashi', 'Trayodashi']
};

// Days of the week favorability
export const favorableDays = {
  wedding: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
  housewarming: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
  vehicle: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'],
  business: ['Wednesday', 'Thursday', 'Friday'],
  general: ['Monday', 'Wednesday', 'Thursday', 'Friday']
};

// Avoid these days/periods
export const periodsToAvoid = [
  { name: 'Amavasya', description: 'New Moon - Avoid all auspicious activities' },
  { name: 'Purnima', description: 'Full Moon - Avoid weddings' },
  { name: 'Rahu Kaal', description: 'Daily inauspicious period (1.5 hours)' },
  { name: 'Pitru Paksha', description: '15 days before Diwali - Avoid all celebrations' },
  { name: 'Kharmas', description: 'When Sun is in Sagittarius - Avoid weddings' },
  { name: 'Solar/Lunar Eclipse', description: 'Avoid all activities during eclipse period' }
];

// Calculate Muhurta score (0-100)
export const calculateMuhurtaScore = (eventType, panchangamData, selectedDate) => {
  let score = 50; // Base score
  const dayName = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
  
  if (!panchangamData) return { score: 0, factors: ['Panchangam data unavailable'] };
  
  const factors = [];
  
  // Check Nakshatra
  const nakshatra = panchangamData.almanac?.Nakshatra?.name || '';
  if (favorableNakshatras[eventType]?.includes(nakshatra)) {
    score += 15;
    factors.push(`✓ Favorable Nakshatra: ${nakshatra}`);
  } else if (favorableNakshatras.general?.includes(nakshatra)) {
    score += 10;
    factors.push(`✓ Good Nakshatra: ${nakshatra}`);
  } else {
    score -= 10;
    factors.push(`⚠ Nakshatra ${nakshatra} is not ideal`);
  }
  
  // Check Tithi
  const tithi = panchangamData.almanac?.Tithi?.name || '';
  if (favorableTithis[eventType]?.includes(tithi)) {
    score += 15;
    factors.push(`✓ Favorable Tithi: ${tithi}`);
  } else if (favorableTithis.general?.includes(tithi)) {
    score += 10;
    factors.push(`✓ Good Tithi: ${tithi}`);
  } else {
    score -= 10;
    factors.push(`⚠ Tithi ${tithi} is not ideal`);
  }
  
  // Check day of week
  if (favorableDays[eventType]?.includes(dayName)) {
    score += 10;
    factors.push(`✓ Favorable day: ${dayName}`);
  } else if (favorableDays.general?.includes(dayName)) {
    score += 5;
    factors.push(`✓ Acceptable day: ${dayName}`);
  } else {
    score -= 5;
    factors.push(`⚠ ${dayName} is not ideal`);
  }
  
  // Check Yoga
  const yoga = panchangamData.almanac?.Yoga?.name || '';
  const auspiciousYogas = ['Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'];
  if (auspiciousYogas.includes(yoga)) {
    score += 10;
    factors.push(`✓ Auspicious Yoga: ${yoga}`);
  }
  
  // Cap score between 0-100
  score = Math.max(0, Math.min(100, score));
  
  return { score, factors };
};

// Get auspicious time periods for the day
export const getAuspiciousTimePeriods = (panchangamData) => {
  if (!panchangamData) return [];
  
  const periods = [];
  
  // Brahma Muhurta (1.5 hours before sunrise)
  const sunrise = panchangamData.solarLunar?.Sunrise;
  if (sunrise) {
    periods.push({
      name: 'Brahma Muhurta',
      time: 'Before Sunrise',
      description: 'Most auspicious for spiritual activities',
      suitableFor: ['Meditation', 'Prayer', 'Study']
    });
  }
  
  // Abhijit Muhurta (Noon for 48 minutes)
  periods.push({
    name: 'Abhijit Muhurta',
    time: '11:36 AM - 12:24 PM',
    description: 'Overcome obstacles, good for all activities',
    suitableFor: ['All auspicious activities', 'Important decisions']
  });
  
  // Godhuli Muhurta (Sunset time)
  const sunset = panchangamData.solarLunar?.Sunset;
  if (sunset) {
    periods.push({
      name: 'Godhuli Muhurta',
      time: 'Around Sunset',
      description: 'Auspicious for prayers and rituals',
      suitableFor: ['Evening prayers', 'Lighting lamps', 'Meditation']
    });
  }
  
  return periods;
};

// Generate recommendations
export const getMuhurtaRecommendations = (eventType, score, factors) => {
  const recommendations = [];
  
  if (score >= 80) {
    recommendations.push('✅ Excellent Muhurta! This is a highly auspicious time.');
    recommendations.push('🎯 Proceed with confidence. All major factors are favorable.');
  } else if (score >= 65) {
    recommendations.push('✓ Good Muhurta. Most factors are favorable.');
    recommendations.push('💡 Consider consulting a priest for precise timing.');
  } else if (score >= 50) {
    recommendations.push('⚠ Moderate Muhurta. Some factors are favorable.');
    recommendations.push('🔍 Recommend finding a better date if possible.');
    recommendations.push('👨‍🏫 Consult an astrologer for detailed analysis.');
  } else {
    recommendations.push('❌ Not recommended. Several unfavorable factors.');
    recommendations.push('📅 Please select a different date.');
    recommendations.push('🙏 Consult a qualified astrologer for best dates.');
  }
  
  return recommendations;
};

// Sample muhurta dates (for next 90 days)
export const generateSampleMuhurtaDates = (eventType) => {
  const dates = [];
  const today = new Date();
  
  // This is a simplified version - in production, integrate with real Panchangam calculations
  const sampleDates = [
    { date: '2025-12-15', score: 85, factors: ['Favorable Nakshatra', 'Good Tithi', 'Thursday'] },
    { date: '2025-12-20', score: 78, factors: ['Good Nakshatra', 'Favorable Tithi', 'Friday'] },
    { date: '2025-12-27', score: 82, factors: ['Excellent Nakshatra', 'Good Tithi', 'Monday'] },
    { date: '2026-01-05', score: 88, factors: ['Perfect Nakshatra', 'Excellent Tithi', 'Wednesday'] },
    { date: '2026-01-12', score: 75, factors: ['Good Nakshatra', 'Favorable Tithi', 'Thursday'] },
    { date: '2026-01-19', score: 80, factors: ['Favorable Nakshatra', 'Good Tithi', 'Friday'] }
  ];
  
  return sampleDates;
};

// Helper function for MuhurtaFinderPage - wraps existing functionality
export const getMuhurtaRecommendation = (panchangamData, eventType) => {
  if (!panchangamData) {
    return {
      status: 'unavailable',
      score: 0,
      favorableFactors: [],
      unfavorableFactors: ['Panchangam data not available'],
      recommendations: ['Please check your internet connection and try again']
    };
  }

  const score = calculateMuhurtaScore(eventType.id, panchangamData, new Date());
  const recommendations = getMuhurtaRecommendations(eventType.id, score, {
    nakshatra: panchangamData.almanac?.Nakshatra?.name,
    tithi: panchangamData.almanac?.Tithi?.name,
    day: panchangamData.day
  });

  // Determine status based on score
  let status = 'avoid';
  if (score >= 70) status = 'auspicious';
  else if (score >= 50) status = 'moderate';

  return {
    status,
    score,
    favorableFactors: recommendations.favorableFactors || [],
    unfavorableFactors: recommendations.unfavorableFactors || [],
    recommendations: recommendations.suggestions || []
  };
};
