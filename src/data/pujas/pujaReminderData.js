// Puja reminders and deity-day associations

export const deityDays = {
  monday: {
    deity: 'Lord Shiva',
    color: 'White',
    puja: 'Shiva Puja',
    timing: 'Morning (6-8 AM) or Evening (6-7 PM)',
    offerings: ['Bel leaves', 'Milk', 'Honey', 'Fruits', 'White flowers'],
    mantra: 'Om Namah Shivaya',
    duration: '15-30 minutes',
    benefits: 'Peace of mind, removal of negativity, spiritual growth'
  },
  tuesday: {
    deity: 'Lord Hanuman',
    color: 'Red',
    puja: 'Hanuman Puja',
    timing: 'Morning (sunrise) or Evening',
    offerings: ['Sindoor', 'Red flowers', 'Laddoo', 'Banana', 'Betel leaves'],
    mantra: 'Om Hanumate Namah',
    duration: '15-20 minutes',
    benefits: 'Strength, courage, protection from obstacles'
  },
  wednesday: {
    deity: 'Lord Ganesha',
    color: 'Green',
    puja: 'Ganesha Puja',
    timing: 'Morning (preferably)',
    offerings: ['Durva grass', 'Modak', 'Red flowers', 'Coconut'],
    mantra: 'Om Gam Ganapataye Namah',
    duration: '15-20 minutes',
    benefits: 'Success, wisdom, removal of obstacles'
  },
  thursday: {
    deity: 'Lord Vishnu / Brihaspati',
    color: 'Yellow',
    puja: 'Vishnu Puja',
    timing: 'Morning or Evening',
    offerings: ['Tulsi leaves', 'Yellow flowers', 'Banana', 'Chana dal', 'Sweets'],
    mantra: 'Om Namo Narayanaya',
    duration: '20-30 minutes',
    benefits: 'Prosperity, knowledge, marital harmony'
  },
  friday: {
    deity: 'Goddess Lakshmi / Durga',
    color: 'White/Red',
    puja: 'Lakshmi Puja',
    timing: 'Evening (after sunset)',
    offerings: ['Lotus', 'Sweets', 'Fruits', 'Incense', 'Ghee lamp'],
    mantra: 'Om Shreem Mahalakshmyai Namah',
    duration: '20-30 minutes',
    benefits: 'Wealth, prosperity, family harmony'
  },
  saturday: {
    deity: 'Lord Shani / Hanuman',
    color: 'Black/Blue',
    puja: 'Shani Puja',
    timing: 'Morning or Evening',
    offerings: ['Mustard oil', 'Black sesame', 'Black cloth', 'Iron items'],
    mantra: 'Om Sham Shanicharaya Namah',
    duration: '15-20 minutes',
    benefits: 'Relief from hardships, discipline, protection'
  },
  sunday: {
    deity: 'Lord Surya',
    color: 'Red/Orange',
    puja: 'Surya Puja',
    timing: 'Early morning (during sunrise)',
    offerings: ['Red flowers', 'Jaggery', 'Wheat', 'Arghya (water offering)'],
    mantra: 'Om Suryaya Namah',
    duration: '15-20 minutes',
    benefits: 'Health, vitality, success, father\'s well-being'
  }
};

export const pujaTypes = [
  {
    id: 'daily',
    name: 'Daily Puja',
    description: 'Simple daily worship at home',
    duration: '10-15 minutes',
    items: ['Incense', 'Lamp', 'Flowers', 'Water', 'Bell'],
    steps: [
      'Light lamp and incense',
      'Ring bell',
      'Offer water and flowers',
      'Chant mantra 108 times',
      'Perform aarti'
    ]
  },
  {
    id: 'morning',
    name: 'Morning Puja',
    description: 'Start your day with prayers',
    timing: '6-8 AM',
    duration: '15-20 minutes',
    items: ['Fresh flowers', 'Incense', 'Lamp', 'Water', 'Prasad'],
    steps: [
      'Clean puja space',
      'Light lamp and incense',
      'Offer fresh flowers',
      'Morning prayers',
      'Distribute prasad'
    ]
  },
  {
    id: 'evening',
    name: 'Evening Aarti',
    description: 'Evening worship with family',
    timing: '6-7 PM',
    duration: '15-20 minutes',
    items: ['Lamp', 'Incense', 'Bell', 'Flowers', 'Prasad'],
    steps: [
      'Light multiple lamps',
      'Gather family',
      'Sing aarti',
      'Offer food as bhog',
      'Distribute prasad'
    ]
  },
  {
    id: 'special',
    name: 'Special Day Puja',
    description: 'Extended worship on festivals/Ekadashi',
    duration: '30-45 minutes',
    items: ['Multiple offerings', 'Special prasad', 'Flowers', 'Fruits', 'Incense'],
    steps: [
      'Elaborate puja setup',
      'Detailed rituals',
      'Extended mantras',
      'Special bhog offering',
      'Family participation'
    ]
  }
];

// Reminder settings structure
export const defaultReminderSettings = {
  enabled: false,
  dailyReminder: {
    enabled: true,
    time: '18:00', // 6 PM
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  },
  specialDays: {
    enabled: true,
    ekadashi: true,
    purnima: true,
    amavasya: true,
    deityDays: {
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    }
  },
  notificationPreference: 'browser', // 'browser' or 'none'
  soundEnabled: true,
  advanceReminder: 30 // minutes before
};

// Save reminder settings to localStorage
export const saveReminderSettings = (settings) => {
  localStorage.setItem('puja_reminder_settings', JSON.stringify(settings));
};

// Load reminder settings from localStorage
export const loadReminderSettings = () => {
  const saved = localStorage.getItem('puja_reminder_settings');
  return saved ? JSON.parse(saved) : defaultReminderSettings;
};

// Get today's puja information
export const getTodayPujaInfo = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  return deityDays[today];
};

// Check if notification permission is granted
export const checkNotificationPermission = () => {
  if (!('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
};

// Request notification permission
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    return 'unsupported';
  }
  
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }
  
  return 'denied';
};

// Send puja reminder notification
export const sendPujaReminder = (pujaInfo) => {
  if (Notification.permission === 'granted') {
    const notification = new Notification('🙏 Puja Reminder', {
      body: `Time for ${pujaInfo.puja} (${pujaInfo.deity})`,
      icon: '/logo192.png',
      badge: '/logo192.png',
      tag: 'puja-reminder',
      requireInteraction: false,
      silent: false
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    setTimeout(() => notification.close(), 10000); // Auto close after 10 seconds
  }
};

// Calculate next reminder time
export const getNextReminderTime = (settings) => {
  const now = new Date();
  const [hours, minutes] = settings.dailyReminder.time.split(':');
  const reminderTime = new Date();
  reminderTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  // If time has passed today, set for tomorrow
  if (now > reminderTime) {
    reminderTime.setDate(reminderTime.getDate() + 1);
  }

  return reminderTime;
};

// Check if puja reminder should be shown
export const shouldShowReminder = (settings, panchangamData = null) => {
  if (!settings.enabled) return false;

  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];

  // Check daily reminder
  if (settings.dailyReminder.enabled && settings.dailyReminder.days.includes(today)) {
    return true;
  }

  // Check special days (requires Panchangam data)
  if (settings.specialDays.enabled && panchangamData) {
    // Check Ekadashi
    if (settings.specialDays.ekadashi && panchangamData.tithi?.toLowerCase().includes('ekadashi')) {
      return true;
    }

    // Check Purnima
    if (settings.specialDays.purnima && panchangamData.tithi?.toLowerCase().includes('purnima')) {
      return true;
    }

    // Check Amavasya
    if (settings.specialDays.amavasya && panchangamData.tithi?.toLowerCase().includes('amavasya')) {
      return true;
    }
  }

  // Check deity days
  if (settings.specialDays.deityDays[today]) {
    return true;
  }

  return false;
};

// Get puja completion history from localStorage
export const getPujaHistory = () => {
  const history = localStorage.getItem('puja_history');
  return history ? JSON.parse(history) : [];
};

// Mark puja as completed
export const markPujaCompleted = (pujaType = 'daily') => {
  const history = getPujaHistory();
  const today = new Date().toISOString().split('T')[0];
  
  const entry = {
    date: today,
    type: pujaType,
    deity: getTodayPujaInfo().deity,
    timestamp: new Date().toISOString()
  };

  // Check if already completed today
  const alreadyCompleted = history.some(h => h.date === today && h.type === pujaType);
  
  if (!alreadyCompleted) {
    history.push(entry);
    // Keep only last 90 days
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const filtered = history.filter(h => new Date(h.date) >= ninetyDaysAgo);
    localStorage.setItem('puja_history', JSON.stringify(filtered));
  }

  return entry;
};

// Get puja streak (consecutive days)
export const getPujaStreak = () => {
  const history = getPujaHistory();
  if (history.length === 0) return 0;

  const sortedHistory = history
    .map(h => h.date)
    .filter((date, index, self) => self.indexOf(date) === index) // Unique dates
    .sort()
    .reverse();

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < sortedHistory.length; i++) {
    const historyDate = new Date(sortedHistory[i]);
    historyDate.setHours(0, 0, 0, 0);
    
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);

    if (historyDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};
