// Fasting guide data for different days and occasions

export const fastingDays = {
  weekly: [
    {
      day: 'Monday',
      deity: 'Lord Shiva',
      significance: 'Somvar Vrat for marital bliss and spiritual growth',
      duration: 'Sunrise to sunset or full day',
      toEat: ['Fruits (especially white/yellow)', 'Milk', 'Curd', 'Sabudana khichdi', 'Peanuts', 'Singhara flour items', 'Sendha namak (rock salt)', 'Potatoes', 'Cucumber'],
      toAvoid: ['Regular salt', 'Grains (wheat, rice)', 'Onion', 'Garlic', 'Non-vegetarian food', 'Eggs', 'Alcohol', 'Regular spices'],
      color: 'White',
      mantra: 'Om Namah Shivaya',
      benefits: ['Peaceful mind', 'Marital harmony', 'Removal of obstacles', 'Spiritual elevation']
    },
    {
      day: 'Tuesday',
      deity: 'Lord Hanuman',
      significance: 'Mangalvar Vrat for strength and courage',
      duration: 'Sunrise to sunset',
      toEat: ['Red foods', 'Wheat chapati', 'Jaggery', 'Red lentils', 'Bananas', 'Dates', 'Sweet potato', 'Peanuts', 'Fruits'],
      toAvoid: ['Salty food', 'Non-vegetarian food', 'Onion', 'Garlic', 'Eggs', 'Alcohol'],
      color: 'Red/Orange',
      mantra: 'Om Hanumate Namah',
      benefits: ['Physical strength', 'Mental courage', 'Protection from evil', 'Success in endeavors']
    },
    {
      day: 'Wednesday',
      deity: 'Lord Ganesha / Lord Vitthala',
      significance: 'Budhvar Vrat for wisdom and prosperity',
      duration: 'Sunrise to sunset',
      toEat: ['Green vegetables', 'Green gram', 'Fruits', 'Milk', 'Sabudana', 'Potatoes', 'Singhara flour', 'Sendha namak'],
      toAvoid: ['Grains', 'Regular salt', 'Non-vegetarian food', 'Onion', 'Garlic', 'Eggs'],
      color: 'Green',
      mantra: 'Om Gan Ganapataye Namah',
      benefits: ['Enhanced intelligence', 'Business success', 'Good education', 'Clear thinking']
    },
    {
      day: 'Thursday',
      deity: 'Lord Vishnu / Brihaspati',
      significance: 'Guruvar Vrat for prosperity and knowledge',
      duration: 'Sunrise to sunset',
      toEat: ['Yellow foods', 'Chana dal', 'Bananas', 'Turmeric', 'Besan items', 'Yellow rice', 'Mango', 'Pineapple', 'Yellow lentils'],
      toAvoid: ['Salt', 'Non-vegetarian food', 'Onion', 'Garlic', 'Eggs', 'Alcohol', 'Black items'],
      color: 'Yellow',
      mantra: 'Om Namo Bhagavate Vasudevaya',
      benefits: ['Wealth accumulation', 'Knowledge gain', 'Guru\'s blessings', 'Marital harmony']
    },
    {
      day: 'Friday',
      deity: 'Goddess Lakshmi / Santoshi Mata',
      significance: 'Shukravar Vrat for wealth and beauty',
      duration: 'Sunrise to sunset',
      toEat: ['White foods', 'Milk', 'Curd', 'White rice', 'Kheer', 'Fruits', 'Coconut', 'Cashews', 'Sabudana'],
      toAvoid: ['Sour items', 'Tamarind', 'Non-vegetarian food', 'Onion', 'Garlic', 'Eggs', 'Alcohol', 'Bitter foods'],
      color: 'White/Pink',
      mantra: 'Om Shreem Mahalakshmyai Namah',
      benefits: ['Financial prosperity', 'Marital bliss', 'Beauty', 'Good fortune']
    },
    {
      day: 'Saturday',
      deity: 'Lord Shani / Lord Hanuman',
      significance: 'Shanivar Vrat to reduce malefic effects',
      duration: 'Sunrise to sunset',
      toEat: ['Black items', 'Urad dal', 'Black sesame', 'Mustard oil items', 'Black chana', 'Iron-rich foods', 'Bananas'],
      toAvoid: ['Salty snacks', 'Non-vegetarian food', 'Onion', 'Garlic', 'Eggs', 'Alcohol'],
      color: 'Black/Blue',
      mantra: 'Om Sham Shanicharaya Namah',
      benefits: ['Reduced obstacles', 'Patience', 'Discipline', 'Long-term success']
    },
    {
      day: 'Sunday',
      deity: 'Lord Surya (Sun)',
      significance: 'Ravivar Vrat for health and vitality',
      duration: 'Sunrise to sunset',
      toEat: ['Wheat items', 'Jaggery', 'Red/orange foods', 'Dates', 'Copper vessel water', 'Fruits', 'Ghee'],
      toAvoid: ['Salt', 'Non-vegetarian food', 'Onion', 'Garlic', 'Eggs', 'Alcohol'],
      color: 'Red/Orange',
      mantra: 'Om Suryaya Namah',
      benefits: ['Good health', 'Vitality', 'Success', 'Strong willpower']
    }
  ],
  ekadashi: {
    name: 'Ekadashi Vrat',
    deity: 'Lord Vishnu',
    significance: 'Most auspicious day, occurs twice a month (11th day of lunar cycle)',
    duration: 'Full day (24 hours) or sunrise to next day sunrise',
    toEat: ['Fruits (all types)', 'Milk', 'Dry fruits', 'Peanuts', 'Sabudana', 'Singhara flour', 'Makhana', 'Potatoes', 'Sweet potato', 'Sendha namak only'],
    toAvoid: ['All grains (rice, wheat, etc.)', 'Pulses/lentils', 'Regular salt', 'Onion', 'Garlic', 'Non-vegetarian', 'Eggs', 'Honey (for some traditions)', 'Leafy vegetables'],
    strictMode: ['Only water', 'Tulsi water', 'Fruits (for less strict)'],
    mantra: 'Om Namo Bhagavate Vasudevaya',
    benefits: ['Spiritual cleansing', 'Moksha', 'Health benefits', 'Mental clarity']
  },
  special: [
    {
      name: 'Maha Shivaratri',
      date: 'February (Phalguna Krishna Chaturdashi)',
      deity: 'Lord Shiva',
      duration: '24 hours with night vigil',
      toEat: ['Only fruits', 'Milk', 'Water', 'Some observe complete fast'],
      toAvoid: ['All grains', 'Salt', 'Cooked food', 'Non-vegetarian'],
      specialty: 'Night vigil with prayers every 3 hours'
    },
    {
      name: 'Navratri (9 days)',
      date: 'Twice yearly - Chaitra & Ashwin',
      deity: 'Goddess Durga',
      duration: '9 days',
      toEat: ['Sabudana', 'Singhara flour', 'Kuttu flour', 'Fruits', 'Milk', 'Potatoes', 'Peanuts', 'Makhana', 'Sendha namak'],
      toAvoid: ['Grains', 'Regular salt', 'Onion', 'Garlic', 'Non-vegetarian', 'Eggs', 'Alcohol'],
      specialty: 'One meal per day for strict observers'
    },
    {
      name: 'Karwa Chauth',
      date: 'October/November (Kartik Krishna Chaturthi)',
      deity: 'For spouse\'s long life',
      duration: 'Sunrise to moonrise (no water)',
      toEat: ['Before sunrise: Full meal', 'After moonrise: Full meal'],
      toAvoid: ['Food and water throughout the day'],
      specialty: 'Married women observe for husband\'s well-being'
    }
  ]
};

// Upcoming Ekadashi dates (sample - should be calculated from Panchangam)
export const upcomingEkadashis = [
  { date: '2025-12-10', name: 'Mokshada Ekadashi', significance: 'Liberation from sins' },
  { date: '2025-12-25', name: 'Putrada Ekadashi', significance: 'Blessing of children' },
  { date: '2026-01-09', name: 'Saphala Ekadashi', significance: 'Success and prosperity' },
  { date: '2026-01-24', name: 'Pausha Putrada Ekadashi', significance: 'Well-being of children' },
  { date: '2026-02-08', name: 'Jaya Ekadashi', significance: 'Victory in all endeavors' },
  { date: '2026-02-23', name: 'Vijaya Ekadashi', significance: 'Victory over enemies' }
];

// Fasting recipes
export const fastingRecipes = {
  breakfast: [
    { name: 'Sabudana Khichdi', ingredients: ['Sabudana', 'Peanuts', 'Potatoes', 'Sendha namak'], prep: '15 min' },
    { name: 'Singhara Halwa', ingredients: ['Singhara flour', 'Ghee', 'Jaggery'], prep: '20 min' },
    { name: 'Fruit Salad', ingredients: ['Mixed fruits', 'Lemon juice', 'Black pepper'], prep: '10 min' }
  ],
  lunch: [
    { name: 'Kuttu Ki Roti', ingredients: ['Kuttu flour', 'Potatoes', 'Sendha namak'], prep: '25 min' },
    { name: 'Aloo Sabzi', ingredients: ['Potatoes', 'Tomatoes', 'Cumin', 'Sendha namak'], prep: '20 min' },
    { name: 'Dahi Aloo', ingredients: ['Potatoes', 'Yogurt', 'Cumin', 'Sendha namak'], prep: '15 min' }
  ],
  snacks: [
    { name: 'Makhana Namkeen', ingredients: ['Makhana', 'Ghee', 'Sendha namak', 'Black pepper'], prep: '10 min' },
    { name: 'Sabudana Vada', ingredients: ['Sabudana', 'Peanuts', 'Potatoes', 'Green chili'], prep: '30 min' },
    { name: 'Mixed Nuts', ingredients: ['Cashews', 'Almonds', 'Raisins'], prep: '0 min' }
  ],
  dinner: [
    { name: 'Sabudana Kheer', ingredients: ['Sabudana', 'Milk', 'Sugar', 'Cardamom'], prep: '25 min' },
    { name: 'Singhara Paratha', ingredients: ['Singhara flour', 'Potatoes', 'Ghee'], prep: '20 min' },
    { name: 'Fruit Bowl', ingredients: ['Seasonal fruits', 'Honey'], prep: '5 min' }
  ]
};

// Health benefits of fasting
export const fastingBenefits = [
  { benefit: 'Detoxification', description: 'Helps body eliminate toxins' },
  { benefit: 'Digestive Rest', description: 'Gives digestive system a break' },
  { benefit: 'Mental Clarity', description: 'Improves focus and concentration' },
  { benefit: 'Spiritual Growth', description: 'Enhances spiritual awareness' },
  { benefit: 'Weight Management', description: 'Natural calorie restriction' },
  { benefit: 'Improved Metabolism', description: 'Resets metabolic processes' }
];

// Tips for successful fasting
export const fastingTips = [
  '💧 Stay well hydrated with water, coconut water, or nimbu pani',
  '🥤 Drink milk or fresh fruit juices for energy',
  '🍎 Eat fruits rich in water content like watermelon, cucumber',
  '⚠️ Avoid overeating after breaking the fast',
  '🧘 Practice meditation and prayer during fasting',
  '😴 Get adequate rest and avoid strenuous activities',
  '🚶 Light walking is beneficial, avoid heavy exercise',
  '📿 Spend time in spiritual activities and reading scriptures'
];

// Get fasting guide for today
export const getTodaysFastingGuide = () => {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  return fastingDays.weekly.find(day => day.day === today);
};

// Check if today is Ekadashi (simplified - should use real Panchangam)
export const isTodayEkadashi = (panchangamData) => {
  if (!panchangamData || !panchangamData.almanac) return false;
  const tithi = panchangamData.almanac.Tithi?.name || '';
  return tithi.toLowerCase().includes('ekadashi');
};
