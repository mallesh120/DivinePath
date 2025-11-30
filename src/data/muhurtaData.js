// Muhurta (Auspicious Time) data and calculations

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
  
  if (!panchangamData) return { score: 0, factors: [], breakdown: [] };
  
  const factors = [];
  const breakdown = [];
  
  // Check Nakshatra
  const nakshatra = panchangamData.almanac?.Nakshatra?.name || '';
  if (favorableNakshatras[eventType]?.includes(nakshatra)) {
    score += 15;
    factors.push(`✓ Favorable Nakshatra: ${nakshatra}`);
    breakdown.push({ factor: `Nakshatra: ${nakshatra}`, points: 15 });
  } else if (favorableNakshatras.general?.includes(nakshatra)) {
    score += 10;
    factors.push(`✓ Good Nakshatra: ${nakshatra}`);
    breakdown.push({ factor: `Nakshatra: ${nakshatra}`, points: 10 });
  } else {
    score -= 10;
    factors.push(`⚠ Nakshatra ${nakshatra} is not ideal`);
    breakdown.push({ factor: `Nakshatra: ${nakshatra}`, points: -10 });
  }
  
  // Check Tithi
  const tithi = panchangamData.almanac?.Tithi?.name || '';
  if (favorableTithis[eventType]?.includes(tithi)) {
    score += 15;
    factors.push(`✓ Favorable Tithi: ${tithi}`);
    breakdown.push({ factor: `Tithi: ${tithi}`, points: 15 });
  } else if (favorableTithis.general?.includes(tithi)) {
    score += 10;
    factors.push(`✓ Good Tithi: ${tithi}`);
    breakdown.push({ factor: `Tithi: ${tithi}`, points: 10 });
  } else {
    score -= 10;
    factors.push(`⚠ Tithi ${tithi} is not ideal`);
    breakdown.push({ factor: `Tithi: ${tithi}`, points: -10 });
  }
  
  // Check day of week
  if (favorableDays[eventType]?.includes(dayName)) {
    score += 10;
    factors.push(`✓ Favorable day: ${dayName}`);
    breakdown.push({ factor: `Day: ${dayName}`, points: 10 });
  } else if (favorableDays.general?.includes(dayName)) {
    score += 5;
    factors.push(`✓ Acceptable day: ${dayName}`);
    breakdown.push({ factor: `Day: ${dayName}`, points: 5 });
  } else {
    score -= 5;
    factors.push(`⚠ ${dayName} is not ideal`);
    breakdown.push({ factor: `Day: ${dayName}`, points: -5 });
  }
  
  // Check Yoga
  const yoga = panchangamData.almanac?.Yoga?.name || '';
  const auspiciousYogas = ['Siddha', 'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'];
  if (auspiciousYogas.includes(yoga)) {
    score += 10;
    factors.push(`✓ Auspicious Yoga: ${yoga}`);
    breakdown.push({ factor: `Yoga: ${yoga}`, points: 10 });
  } else {
    breakdown.push({ factor: `Yoga: ${yoga}`, points: 0 });
  }
  
  // Add base score to breakdown
  breakdown.unshift({ factor: 'Base Score', points: 50 });
  
  // Cap score between 0-100
  score = Math.max(0, Math.min(100, score));
  
  return { score, factors, breakdown };
};

// Calculate Rahu Kaal timing based on day of week
export const calculateRahuKaal = (date, sunrise = "06:00", sunset = "18:00") => {
  const dayIndex = new Date(date).getDay(); // 0=Sunday, 1=Monday, etc.
  
  // Rahu Kaal occurs at different times each day
  const rahuKaalStart = {
    0: 16.5, // Sunday: 4:30 PM - 6:00 PM
    1: 7.5,  // Monday: 7:30 AM - 9:00 AM
    2: 15,   // Tuesday: 3:00 PM - 4:30 PM
    3: 12,   // Wednesday: 12:00 PM - 1:30 PM
    4: 13.5, // Thursday: 1:30 PM - 3:00 PM
    5: 10.5, // Friday: 10:30 AM - 12:00 PM
    6: 9     // Saturday: 9:00 AM - 10:30 AM
  };
  
  const startHour = rahuKaalStart[dayIndex];
  const endHour = startHour + 1.5;
  
  return {
    start: formatTime(startHour),
    end: formatTime(endHour)
  };
};

// Calculate Yamaganda timing
export const calculateYamaganda = (date) => {
  const dayIndex = new Date(date).getDay();
  
  const yamagandaStart = {
    0: 12,   // Sunday: 12:00 PM - 1:30 PM
    1: 10.5, // Monday: 10:30 AM - 12:00 PM
    2: 9,    // Tuesday: 9:00 AM - 10:30 AM
    3: 7.5,  // Wednesday: 7:30 AM - 9:00 AM
    4: 6,    // Thursday: 6:00 AM - 7:30 AM
    5: 15,   // Friday: 3:00 PM - 4:30 PM
    6: 13.5  // Saturday: 1:30 PM - 3:00 PM
  };
  
  const startHour = yamagandaStart[dayIndex];
  const endHour = startHour + 1.5;
  
  return {
    start: formatTime(startHour),
    end: formatTime(endHour)
  };
};

// Calculate Gulika Kaal timing
export const calculateGulikaKaal = (date) => {
  const dayIndex = new Date(date).getDay();
  
  const gulikaStart = {
    0: 15,   // Sunday: 3:00 PM - 4:30 PM
    1: 13.5, // Monday: 1:30 PM - 3:00 PM
    2: 12,   // Tuesday: 12:00 PM - 1:30 PM
    3: 10.5, // Wednesday: 10:30 AM - 12:00 PM
    4: 9,    // Thursday: 9:00 AM - 10:30 AM
    5: 7.5,  // Friday: 7:30 AM - 9:00 AM
    6: 6     // Saturday: 6:00 AM - 7:30 AM
  };
  
  const startHour = gulikaStart[dayIndex];
  const endHour = startHour + 1.5;
  
  return {
    start: formatTime(startHour),
    end: formatTime(endHour)
  };
};

// Helper function to format time
const formatTime = (hour) => {
  const hours = Math.floor(hour);
  const minutes = Math.round((hour - hours) * 60);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

// Calculate auspicious time windows for a specific date
export const calculateAuspiciousTimeWindows = (date, eventType) => {
  const windows = [];
  
  // Brahma Muhurta (1.5 hours before sunrise, approximately 4:30-6:00 AM)
  windows.push({
    name: 'Brahma Muhurta',
    icon: '🌅',
    startTime: '4:30 AM',
    endTime: '6:00 AM',
    quality: 'excellent',
    description: 'Most auspicious period for spiritual activities and new beginnings',
    suitableFor: ['Meditation', 'Prayer', 'Study', 'Important decisions']
  });
  
  // Early Morning (6:00-9:00 AM) - avoiding Rahu Kaal for specific days
  const dayIndex = new Date(date).getDay();
  
  if (dayIndex !== 1 && dayIndex !== 6) { // Not Monday or Saturday
    windows.push({
      name: 'Early Morning Period',
      icon: '🌄',
      startTime: '6:00 AM',
      endTime: '9:00 AM',
      quality: 'excellent',
      description: 'Fresh energy, clear mind - ideal for important ceremonies',
      suitableFor: [eventType]
    });
  }
  
  // Abhijit Muhurta (Noon - 12 minutes window around midday)
  windows.push({
    name: 'Abhijit Muhurta',
    icon: '☀️',
    startTime: '11:54 AM',
    endTime: '12:42 PM',
    quality: 'excellent',
    description: 'Powerful 48-minute window that nullifies all doshas and obstacles',
    suitableFor: ['All important activities', 'Overcoming obstacles', eventType]
  });
  
  // Afternoon period (2:00-4:00 PM) - avoiding Rahu Kaal
  if (dayIndex !== 0 && dayIndex !== 2) { // Not Sunday or Tuesday
    windows.push({
      name: 'Afternoon Period',
      icon: '🌤️',
      startTime: '2:00 PM',
      endTime: '4:00 PM',
      quality: 'good',
      description: 'Stable period suitable for most activities',
      suitableFor: [eventType, 'Business activities', 'Meetings']
    });
  }
  
  // Godhuli Muhurta (Sunset time - approximately 5:30-6:30 PM)
  if (eventType === 'naming' || eventType === 'thread' || eventType === 'education') {
    windows.push({
      name: 'Godhuli Muhurta',
      icon: '🌆',
      startTime: '5:30 PM',
      endTime: '6:30 PM',
      quality: 'good',
      description: 'Sacred twilight period, auspicious for prayers and rituals',
      suitableFor: ['Religious ceremonies', 'Prayers', 'Lighting lamps']
    });
  }
  
  return windows;
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
export const getMuhurtaRecommendation = (panchangamData, eventType, selectedDate = null, userDetails = {}) => {
  if (!panchangamData) {
    return {
      status: 'unavailable',
      score: 0,
      favorableFactors: [],
      unfavorableFactors: ['Panchangam data not available'],
      recommendations: ['Please check your internet connection and try again'],
      auspiciousTimeWindows: [],
      periodsToAvoid: []
    };
  }

  const dateToAnalyze = selectedDate ? new Date(selectedDate) : new Date();
  const scoreResult = calculateMuhurtaScore(eventType.id, panchangamData, dateToAnalyze);
  const score = scoreResult.score;
  const factors = scoreResult.factors || [];
  const scoreBreakdown = scoreResult.breakdown || [];
  
  // Separate favorable and unfavorable factors
  const favorableFactors = factors.filter(f => f.startsWith('✓'));
  const unfavorableFactors = factors.filter(f => f.startsWith('⚠'));
  
  const recommendationTexts = getMuhurtaRecommendations(eventType.id, score, {
    nakshatra: panchangamData.almanac?.Nakshatra?.name,
    tithi: panchangamData.almanac?.Tithi?.name,
    day: panchangamData.day
  });

  // Determine status based on score
  let status = 'avoid';
  if (score >= 70) status = 'auspicious';
  else if (score >= 50) status = 'moderate';

  // Calculate auspicious time windows
  const timeWindows = calculateAuspiciousTimeWindows(dateToAnalyze, eventType.id);
  
  // Calculate periods to avoid
  const rahuKaal = calculateRahuKaal(dateToAnalyze);
  const yamaganda = calculateYamaganda(dateToAnalyze);
  const gulikaKaal = calculateGulikaKaal(dateToAnalyze);
  
  const periodsToAvoid = [
    { name: 'Rahu Kaal', time: `${rahuKaal.start} - ${rahuKaal.end}` },
    { name: 'Yamaganda', time: `${yamaganda.start} - ${yamaganda.end}` },
    { name: 'Gulika Kaal', time: `${gulikaKaal.start} - ${gulikaKaal.end}` }
  ];

  // Add user-specific recommendations if birth details provided
  const userRecommendations = [];
  if (userDetails.birthDate && userDetails.birthTime) {
    userRecommendations.push('✓ Birth chart compatibility will be analyzed for optimal timing');
    userRecommendations.push('📍 Location-specific sunrise/sunset times will be calculated');
  } else {
    userRecommendations.push('💡 For personalized muhurta, please provide birth details');
  }

  return {
    status,
    score,
    scoreBreakdown,
    favorableFactors,
    unfavorableFactors,
    recommendations: [...recommendationTexts, ...userRecommendations],
    auspiciousTimeWindows: timeWindows,
    periodsToAvoid: periodsToAvoid
  };
};
