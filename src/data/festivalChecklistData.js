// Festival preparation checklists and countdown data

export const majorFestivals = [
  {
    id: 'diwali',
    name: 'Diwali',
    date: '2025-10-20', // Sample date
    daysToGo: 0, // Calculate dynamically
    significance: 'Festival of Lights, Victory of Good over Evil',
    duration: '5 days',
    mainDay: 'Lakshmi Puja on Amavasya',
    checklist: {
      '30days': [
        { task: 'Plan renovation/painting if needed', category: 'Home', done: false },
        { task: 'Order new clothes for family', category: 'Shopping', done: false },
        { task: 'Plan guest list and invitations', category: 'Social', done: false },
        { task: 'Check and order diyas, candles, decorations', category: 'Shopping', done: false }
      ],
      '15days': [
        { task: 'Deep clean entire house', category: 'Home', done: false },
        { task: 'Service AC, fans, lights', category: 'Home', done: false },
        { task: 'Order sweets and dry fruits', category: 'Food', done: false },
        { task: 'Buy puja items (incense, flowers, etc.)', category: 'Spiritual', done: false },
        { task: 'Order crackers (if celebrating)', category: 'Shopping', done: false }
      ],
      '7days': [
        { task: 'Declutter and donate unused items', category: 'Home', done: false },
        { task: 'Polish silver items, clean puja room', category: 'Home', done: false },
        { task: 'Prepare rangoli designs', category: 'Decoration', done: false },
        { task: 'Stock groceries for festive cooking', category: 'Food', done: false }
      ],
      '3days': [
        { task: 'Complete all pending work', category: 'General', done: false },
        { task: 'Set up decorations and lights', category: 'Decoration', done: false },
        { task: 'Prepare festive snacks', category: 'Food', done: false },
        { task: 'Charge all diyas and arrange them', category: 'Decoration', done: false }
      ],
      '1day': [
        { task: 'Final house cleaning', category: 'Home', done: false },
        { task: 'Make rangoli', category: 'Decoration', done: false },
        { task: 'Prepare special dishes', category: 'Food', done: false },
        { task: 'Set up Lakshmi puja area', category: 'Spiritual', done: false },
        { task: 'Test all lights and diyas', category: 'Decoration', done: false }
      ],
      'today': [
        { task: 'Morning bath and wear new clothes', category: 'Personal', done: false },
        { task: 'Perform Lakshmi Puja at muhurat time', category: 'Spiritual', done: false },
        { task: 'Light diyas in evening', category: 'Spiritual', done: false },
        { task: 'Distribute sweets to neighbors', category: 'Social', done: false },
        { task: 'Family celebration and blessings', category: 'Social', done: false }
      ]
    },
    shopping: ['Diyas', 'Candles', 'Rangoli colors', 'Flowers', 'Incense', 'Puja items', 'Sweets', 'Dry fruits', 'New clothes', 'Decorative lights'],
    puja: {
      items: ['Lakshmi idol/photo', 'Ganesh idol', 'Red cloth', 'Flowers (lotus, marigold)', 'Incense', 'Diyas', 'Fruits', 'Sweets', 'Coins', 'Rice', 'Kumkum', 'Turmeric'],
      timing: 'Evening during Amavasya',
      mantra: 'Om Shreem Mahalakshmyai Namah'
    }
  },
  {
    id: 'holi',
    name: 'Holi',
    date: '2026-03-14',
    significance: 'Festival of Colors, Victory of Good over Evil',
    duration: '2 days',
    checklist: {
      '15days': [
        { task: 'Collect wood for Holika bonfire', category: 'Preparation', done: false },
        { task: 'Order organic/herbal colors', category: 'Shopping', done: false },
        { task: 'Plan Holi party or gathering', category: 'Social', done: false }
      ],
      '7days': [
        { task: 'Buy snacks ingredients (gujiya, namak pare)', category: 'Food', done: false },
        { task: 'Prepare protective hair oil', category: 'Personal', done: false },
        { task: 'Stock water balloons and pichkaris', category: 'Shopping', done: false }
      ],
      '3days': [
        { task: 'Make traditional sweets (gujiya, malpua)', category: 'Food', done: false },
        { task: 'Prepare thandai syrup', category: 'Food', done: false },
        { task: 'Set up outdoor play area', category: 'Preparation', done: false }
      ],
      '1day': [
        { task: 'Holika Dahan preparation and ritual', category: 'Spiritual', done: false },
        { task: 'Apply oil to hair and skin', category: 'Personal', done: false },
        { task: 'Arrange colors and water guns', category: 'Preparation', done: false }
      ],
      'today': [
        { task: 'Wear old clothes', category: 'Personal', done: false },
        { task: 'Play with colors (morning)', category: 'Celebration', done: false },
        { task: 'Clean up and bathe', category: 'Personal', done: false },
        { task: 'Serve festive lunch', category: 'Food', done: false },
        { task: 'Visit friends and family', category: 'Social', done: false }
      ]
    },
    shopping: ['Organic colors', 'Water guns', 'Buckets', 'Snacks', 'Thandai ingredients', 'Protective oil'],
    puja: {
      items: ['Wood for bonfire', 'Coconut', 'Wheat stalks', 'Flowers', 'Water'],
      timing: 'Evening before Holi',
      mantra: 'Om Prahlad Narasimhaya Namah'
    }
  },
  {
    id: 'navratri',
    name: 'Navratri',
    date: '2025-09-22',
    significance: '9 Nights of Goddess Worship',
    duration: '9 days',
    checklist: {
      '15days': [
        { task: 'Plan fasting menu for 9 days', category: 'Food', done: false },
        { task: 'Buy new traditional clothes', category: 'Shopping', done: false },
        { task: 'Order Navratri puja items', category: 'Spiritual', done: false }
      ],
      '7days': [
        { task: 'Stock fasting-friendly groceries', category: 'Food', done: false },
        { task: 'Clean and decorate puja space', category: 'Home', done: false },
        { task: 'Plan Garba/Dandiya events', category: 'Social', done: false }
      ],
      '3days': [
        { task: 'Prepare Kalash and setup', category: 'Spiritual', done: false },
        { task: 'Make advance fasting snacks', category: 'Food', done: false },
        { task: 'Arrange flowers for daily puja', category: 'Spiritual', done: false }
      ],
      'today': [
        { task: 'Establish Kalash (Day 1)', category: 'Spiritual', done: false },
        { task: 'Observe fast according to tradition', category: 'Spiritual', done: false },
        { task: 'Perform daily Durga puja', category: 'Spiritual', done: false },
        { task: 'Read Durga Saptashati', category: 'Spiritual', done: false },
        { task: 'Attend Garba/Dandiya (evening)', category: 'Social', done: false }
      ]
    },
    shopping: ['Kalash', 'Coconut', 'Mango leaves', 'Red cloth', 'Chunari', 'Bangles', 'Fruits', 'Flowers', 'Sabudana', 'Singhara flour', 'Dry fruits'],
    puja: {
      items: ['Durga idol/photo', 'Kalash', 'Flowers', 'Fruits', 'Incense', 'Chunari', 'Bangles'],
      timing: 'Morning and evening daily',
      mantra: 'Om Dum Durgayei Namah'
    }
  },
  {
    id: 'janmashtami',
    name: 'Krishna Janmashtami',
    date: '2025-08-16',
    significance: 'Birth of Lord Krishna',
    duration: '1 day + night vigil',
    checklist: {
      '7days': [
        { task: 'Decorate Krishna jhula (swing)', category: 'Decoration', done: false },
        { task: 'Plan midnight celebration', category: 'Social', done: false },
        { task: 'Order puja flowers and items', category: 'Spiritual', done: false }
      ],
      '3days': [
        { task: 'Prepare special bhog items', category: 'Food', done: false },
        { task: 'Make butter and paneer at home', category: 'Food', done: false },
        { task: 'Decorate home with peacock feathers', category: 'Decoration', done: false }
      ],
      '1day': [
        { task: 'Fast during the day', category: 'Spiritual', done: false },
        { task: 'Set up baby Krishna cradle', category: 'Decoration', done: false },
        { task: 'Prepare 56 bhog items', category: 'Food', done: false },
        { task: 'Arrange midnight aarti', category: 'Spiritual', done: false }
      ],
      'today': [
        { task: 'Observe fast', category: 'Spiritual', done: false },
        { task: 'Midnight puja at birth time', category: 'Spiritual', done: false },
        { task: 'Offer 56 bhog to Krishna', category: 'Spiritual', done: false },
        { task: 'Break fast with prasad', category: 'Food', done: false },
        { task: 'Celebrate with bhajans', category: 'Social', done: false }
      ]
    },
    shopping: ['Krishna idol', 'Peacock feathers', 'Butter', 'Mishri', 'Milk products', 'Fruits', 'Flowers', 'Flute', 'Yellow cloth'],
    puja: {
      items: ['Krishna idol', 'Jhula/cradle', 'Makhan', 'Mishri', 'Milk', 'Tulsi', 'Peacock feather', 'Flute'],
      timing: 'Midnight (around 12 AM)',
      mantra: 'Om Kleem Krishnaya Namah'
    }
  },
  {
    id: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    date: '2025-08-27',
    significance: 'Birth of Lord Ganesha',
    duration: '10 days',
    checklist: {
      '15days': [
        { task: 'Order eco-friendly Ganesha idol', category: 'Spiritual', done: false },
        { task: 'Plan 10-day puja schedule', category: 'Spiritual', done: false },
        { task: 'Arrange flower suppliers', category: 'Shopping', done: false }
      ],
      '7days': [
        { task: 'Prepare puja platform', category: 'Home', done: false },
        { task: 'Stock modak ingredients', category: 'Food', done: false },
        { task: 'Buy decoration items', category: 'Shopping', done: false }
      ],
      '3days': [
        { task: 'Clean and decorate puja area', category: 'Home', done: false },
        { task: 'Make advance modaks', category: 'Food', done: false },
        { task: 'Prepare aarti items', category: 'Spiritual', done: false }
      ],
      'today': [
        { task: 'Sthapana (installation) at muhurat', category: 'Spiritual', done: false },
        { task: 'Perform prana pratishtha', category: 'Spiritual', done: false },
        { task: 'Offer modaks and prayers', category: 'Spiritual', done: false },
        { task: 'Evening aarti', category: 'Spiritual', done: false },
        { task: 'Distribute prasad', category: 'Social', done: false }
      ]
    },
    shopping: ['Eco-friendly Ganesh idol', 'Red cloth', 'Modak molds', 'Flowers', 'Durva grass', 'Fruits', 'Coconut', '21 modaks ingredients'],
    puja: {
      items: ['Ganesh idol', 'Red flowers', 'Durva grass', 'Modaks', 'Coconut', 'Jaggery', 'Rice'],
      timing: 'Morning during muhurat',
      mantra: 'Om Gam Ganapataye Namah'
    }
  }
];

// Get festivals for next 90 days
export const getUpcomingFestivals = () => {
  const today = new Date();
  const threeMonthsLater = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
  
  return majorFestivals
    .map(festival => {
      const festivalDate = new Date(festival.date);
      const daysToGo = Math.ceil((festivalDate - today) / (1000 * 60 * 60 * 24));
      return { ...festival, daysToGo };
    })
    .filter(festival => festival.daysToGo >= 0 && festival.daysToGo <= 90)
    .sort((a, b) => a.daysToGo - b.daysToGo);
};

// Get current checklist based on days remaining
export const getCurrentChecklist = (festival) => {
  if (festival.daysToGo === 0) return festival.checklist.today;
  if (festival.daysToGo === 1) return festival.checklist['1day'];
  if (festival.daysToGo <= 3) return festival.checklist['3days'];
  if (festival.daysToGo <= 7) return festival.checklist['7days'];
  if (festival.daysToGo <= 15) return festival.checklist['15days'];
  if (festival.daysToGo <= 30) return festival.checklist['30days'];
  return [];
};

// Save checklist progress to localStorage
export const saveChecklistProgress = (festivalId, checklist) => {
  const key = `festival_${festivalId}_checklist`;
  localStorage.setItem(key, JSON.stringify(checklist));
};

// Load checklist progress from localStorage
export const loadChecklistProgress = (festivalId) => {
  const key = `festival_${festivalId}_checklist`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
};

// Calculate checklist completion percentage
export const getChecklistCompletion = (checklist) => {
  if (!checklist || checklist.length === 0) return 0;
  const completed = checklist.filter(item => item.done).length;
  return Math.round((completed / checklist.length) * 100);
};
