import { generateFestivalDatesForYear } from '../../utils/hinduCalendar';

// Festival dates for 2025-2026 (based on Hindu lunar calendar)
// This will be used as both static data and templates for calculation
export const festivalsData = [
  {
    id: 'diwali',
    name: 'Diwali',
    shortName: 'Deepavali',
    category: 'Major Festival',
    date: '2025-10-20',
    endDate: '2025-10-24',
    month: 'October',
    duration: '5 days',
    lunarDate: 'Kartik Amavasya',
    description: 'The Festival of Lights, celebrating the victory of light over darkness and good over evil.',
    significance: 'Commemorates Lord Rama\'s return to Ayodhya after 14 years of exile and his victory over Ravana. Also celebrates Goddess Lakshmi, the goddess of wealth and prosperity.',
    rituals: [
      'Lighting diyas (oil lamps) and candles',
      'Lakshmi Puja on the main day',
      'Bursting firecrackers',
      'Exchanging gifts and sweets',
      'Rangoli decorations',
      'Wearing new clothes'
    ],
    deities: ['Lakshmi', 'Rama', 'Ganesha'],
    colors: ['#FFD700', '#FF6347', '#FF4500']
  },
  {
    id: 'holi',
    name: 'Holi',
    shortName: 'Festival of Colors',
    category: 'Major Festival',
    date: '2025-03-14',
    endDate: '2025-03-14',
    month: 'March',
    duration: '2 days',
    lunarDate: 'Phalguna Purnima',
    description: 'The Festival of Colors, celebrating spring, love, and the victory of good over evil.',
    significance: 'Celebrates the divine love of Radha and Krishna, and commemorates the burning of Holika, symbolizing the triumph of devotion over evil.',
    rituals: [
      'Holika Dahan bonfire on the eve',
      'Playing with colored powders and water',
      'Dancing to traditional music',
      'Preparing festive foods like gujiya',
      'Visiting friends and family',
      'Forgetting past conflicts'
    ],
    deities: ['Krishna', 'Radha'],
    colors: ['#FF1493', '#00CED1', '#FFD700', '#32CD32']
  },
  {
    id: 'navaratri',
    name: 'Navaratri',
    shortName: 'Nine Nights',
    category: 'Major Festival',
    date: '2025-09-22',
    endDate: '2025-10-01',
    month: 'September/October',
    duration: '9 nights and 10 days',
    lunarDate: 'Ashwin Shukla Pratipada to Dashami',
    description: 'Nine nights dedicated to worshiping the nine forms of Goddess Durga.',
    significance: 'Celebrates the victory of Goddess Durga over the demon Mahishasura, symbolizing the triumph of good over evil.',
    rituals: [
      'Daily puja to different forms of Durga',
      'Fasting during the nine days',
      'Garba and Dandiya Raas dances',
      'Kanya Puja on the eighth or ninth day',
      'Reading Durga Saptashati',
      'Decorating with flowers and lights'
    ],
    deities: ['Durga', 'Lakshmi', 'Saraswati'],
    colors: ['#DC143C', '#FFD700', '#4169E1']
  },
  {
    id: 'dussehra',
    name: 'Dussehra',
    shortName: 'Vijayadashami',
    category: 'Major Festival',
    date: '2025-10-02',
    endDate: '2025-10-02',
    month: 'October',
    duration: '1 day',
    lunarDate: 'Ashwin Shukla Dashami',
    description: 'Celebrates the victory of Lord Rama over Ravana and Goddess Durga over Mahishasura.',
    significance: 'Marks the end of Navaratri and symbolizes the victory of righteousness over evil. Also commemorates Rama\'s victory in the Ramayana.',
    rituals: [
      'Burning effigies of Ravana, Kumbhakarna, and Meghanada',
      'Ram Lila performances',
      'Durga idol immersion in some regions',
      'Worship of weapons and tools',
      'Community celebrations and processions'
    ],
    deities: ['Rama', 'Durga'],
    colors: ['#DC143C', '#FFD700']
  },
  {
    id: 'janmashtami',
    name: 'Janmashtami',
    shortName: 'Krishna Jayanti',
    category: 'Major Festival',
    date: '2025-08-16',
    endDate: '2025-08-17',
    month: 'August',
    duration: '1-2 days',
    lunarDate: 'Bhadrapada Krishna Ashtami',
    description: 'Celebrates the birth of Lord Krishna, the eighth avatar of Vishnu.',
    significance: 'Commemorates the birth of Krishna at midnight in Mathura. Celebrates his divine playfulness and teachings in the Bhagavad Gita.',
    rituals: [
      'Midnight prayers and aartis',
      'Fasting until midnight',
      'Dahi Handi (pot breaking) competitions',
      'Decorating Krishna idols',
      'Singing bhajans and kirtans',
      'Reading from Bhagavad Gita'
    ],
    deities: ['Krishna', 'Radha'],
    colors: ['#4169E1', '#FFD700']
  },
  {
    id: 'ganesh-chaturthi',
    name: 'Ganesh Chaturthi',
    shortName: 'Vinayaka Chavithi',
    category: 'Major Festival',
    date: '2025-08-27',
    endDate: '2025-09-05',
    month: 'August/September',
    duration: '10 days',
    lunarDate: 'Bhadrapada Shukla Chaturthi',
    description: 'Celebrates the birth of Lord Ganesha, the remover of obstacles.',
    significance: 'Honors Ganesha as the god of new beginnings, wisdom, and prosperity. Marks his birthday according to Hindu mythology.',
    rituals: [
      'Installing clay Ganesha idols at home',
      'Daily puja and offerings of modaks',
      'Chanting mantras and singing aartis',
      'Community pandal celebrations',
      'Visarjan (immersion) on the last day',
      'Cultural programs and processions'
    ],
    deities: ['Ganesha'],
    colors: ['#FF6347', '#FFD700']
  },
  {
    id: 'maha-shivaratri',
    name: 'Maha Shivaratri',
    shortName: 'Great Night of Shiva',
    category: 'Major Festival',
    date: '2025-02-26',
    endDate: '2025-02-26',
    month: 'February',
    duration: '1 night',
    lunarDate: 'Phalguna Krishna Chaturdashi',
    description: 'The Great Night of Shiva, celebrating the marriage of Shiva and Parvati.',
    significance: 'Commemorates the night when Shiva performed the Tandava dance and also marks his marriage to Parvati. Believed to be the night when Shiva saved the world by drinking poison.',
    rituals: [
      'All-night vigil and meditation',
      'Fasting throughout the day and night',
      'Offering bel leaves to Shiva lingam',
      'Chanting "Om Namah Shivaya"',
      'Abhishekam with milk, honey, and water',
      'Visiting Shiva temples'
    ],
    deities: ['Shiva', 'Parvati'],
    colors: ['#4169E1', '#FFFFFF']
  },
  {
    id: 'ram-navami',
    name: 'Ram Navami',
    shortName: 'Rama\'s Birthday',
    category: 'Major Festival',
    date: '2025-04-06',
    endDate: '2025-04-06',
    month: 'April',
    duration: '1 day',
    lunarDate: 'Chaitra Shukla Navami',
    description: 'Celebrates the birth of Lord Rama, the seventh avatar of Vishnu.',
    significance: 'Marks the birth of Rama in Ayodhya. Celebrates his life as depicted in the Ramayana and his ideals of dharma, duty, and righteousness.',
    rituals: [
      'Reciting the Ramayana',
      'Ram Katha (storytelling)',
      'Bhajans and kirtans',
      'Fasting until noon',
      'Processions with Rama idols',
      'Distributing prasad'
    ],
    deities: ['Rama', 'Sita', 'Hanuman'],
    colors: ['#FFD700', '#32CD32']
  },
  {
    id: 'hanuman-jayanti',
    name: 'Hanuman Jayanti',
    shortName: 'Hanuman\'s Birthday',
    category: 'Festival',
    date: '2025-04-12',
    endDate: '2025-04-12',
    month: 'April',
    duration: '1 day',
    lunarDate: 'Chaitra Purnima',
    description: 'Celebrates the birth of Lord Hanuman, the devoted servant of Rama.',
    significance: 'Honors Hanuman\'s devotion, strength, and selfless service to Lord Rama. Celebrated for courage and protection.',
    rituals: [
      'Reciting Hanuman Chalisa',
      'Visiting Hanuman temples',
      'Offering sindoor and jasmine flowers',
      'Reading Sundara Kanda from Ramayana',
      'Distributing prasad',
      'Organizing wrestling matches in some regions'
    ],
    deities: ['Hanuman'],
    colors: ['#FF4500', '#FFD700']
  },
  {
    id: 'raksha-bandhan',
    name: 'Raksha Bandhan',
    shortName: 'Rakhi',
    category: 'Festival',
    date: '2025-08-09',
    endDate: '2025-08-09',
    month: 'August',
    duration: '1 day',
    lunarDate: 'Shravana Purnima',
    description: 'Celebrates the bond between brothers and sisters.',
    significance: 'Sisters tie rakhi (sacred thread) on brothers\' wrists, and brothers vow to protect their sisters. Symbolizes love and duty between siblings.',
    rituals: [
      'Sisters tying rakhi on brothers\' wrists',
      'Brothers giving gifts to sisters',
      'Performing aarti',
      'Sharing sweets',
      'Family gatherings',
      'Prayers for well-being'
    ],
    deities: [],
    colors: ['#FF1493', '#FFD700']
  },
  {
    id: 'makar-sankranti',
    name: 'Makar Sankranti',
    shortName: 'Harvest Festival',
    category: 'Festival',
    date: '2025-01-14',
    endDate: '2025-01-14',
    month: 'January',
    duration: '1 day',
    lunarDate: 'Pausha/Magha (Solar calendar)',
    description: 'Marks the transition of the sun into Capricorn and the beginning of longer days.',
    significance: 'Celebrates the harvest season and marks the end of winter. Dedicated to Surya (Sun God). Known by different names in different regions.',
    rituals: [
      'Flying kites',
      'Taking holy dips in rivers',
      'Preparing til-gul (sesame sweets)',
      'Donating to the needy',
      'Offering prayers to the Sun',
      'Bonfires in some regions'
    ],
    deities: ['Surya'],
    colors: ['#FFD700', '#FF6347']
  },
  {
    id: 'ugadi',
    name: 'Ugadi',
    shortName: 'Telugu New Year',
    category: 'Festival',
    date: '2025-03-30',
    endDate: '2025-03-30',
    month: 'March',
    duration: '1 day',
    lunarDate: 'Chaitra Shukla Pratipada',
    description: 'Marks the Telugu and Kannada New Year.',
    significance: 'Celebrates the beginning of a new year and new beginnings. Time for fresh starts and new ventures.',
    rituals: [
      'Preparing Ugadi Pachadi (six tastes)',
      'Oil bath in the morning',
      'Decorating homes with mango leaves',
      'Panchanga Sravanam (hearing predictions)',
      'Wearing new clothes',
      'Visiting temples'
    ],
    deities: ['Brahma'],
    colors: ['#32CD32', '#FFD700']
  },
  {
    id: 'pongal',
    name: 'Pongal',
    shortName: 'Thai Pongal',
    category: 'Festival',
    date: '2025-01-14',
    endDate: '2025-01-17',
    month: 'January',
    duration: '4 days',
    lunarDate: 'Thai month (Solar calendar)',
    description: 'Tamil harvest festival dedicated to the Sun God.',
    significance: 'Thanks the Sun God, nature, and cattle for a successful harvest. Celebrates prosperity and abundance.',
    rituals: [
      'Cooking Pongal (sweet rice) in new pots',
      'Decorating with kolam (rangoli)',
      'Worshiping the Sun God',
      'Mattu Pongal for cattle',
      'Decorating cattle with flowers',
      'Family gatherings and feasts'
    ],
    deities: ['Surya', 'Indra'],
    colors: ['#FFD700', '#32CD32']
  },
  {
    id: 'onam',
    name: 'Onam',
    shortName: 'Kerala\'s Harvest Festival',
    category: 'Festival',
    date: '2025-09-05',
    endDate: '2025-09-14',
    month: 'September',
    duration: '10 days',
    lunarDate: 'Chingam month',
    description: 'Kerala\'s harvest festival welcoming King Mahabali.',
    significance: 'Commemorates the homecoming of the legendary King Mahabali. Celebrates unity, harmony, and prosperity.',
    rituals: [
      'Creating Pookalam (flower rangoli)',
      'Preparing Onam Sadya (feast)',
      'Vallamkali (snake boat races)',
      'Kathakali performances',
      'Wearing traditional Kerala saree',
      'Pulikali (tiger dance)'
    ],
    deities: ['Vamana', 'Mahabali'],
    colors: ['#FFD700', '#FFFFFF', '#32CD32']
  },
  {
    id: 'karva-chauth',
    name: 'Karva Chauth',
    shortName: 'Karwa Chauth',
    category: 'Festival',
    date: '2025-10-09',
    endDate: '2025-10-09',
    month: 'October',
    duration: '1 day',
    lunarDate: 'Kartik Krishna Chaturthi',
    description: 'A fasting festival observed by married women for their husbands\' long life.',
    significance: 'Married women fast from sunrise to moonrise, praying for their husbands\' well-being and longevity.',
    rituals: [
      'Fasting without water from sunrise',
      'Applying mehendi',
      'Dressing in bridal attire',
      'Listening to Karva Chauth story',
      'Moon worship in the evening',
      'Breaking fast after seeing moon'
    ],
    deities: ['Parvati', 'Shiva'],
    colors: ['#DC143C', '#FFD700']
  },
  // 2026 Festivals
  {
    id: 'makar-sankranti-2026',
    name: 'Makar Sankranti',
    shortName: 'Harvest Festival',
    category: 'Festival',
    date: '2026-01-14',
    endDate: '2026-01-14',
    month: 'January',
    duration: '1 day',
    lunarDate: 'Pausha/Magha (Solar calendar)',
    description: 'Marks the transition of the sun into Capricorn and the beginning of longer days.',
    significance: 'Celebrates the harvest season and marks the end of winter. Dedicated to Surya (Sun God). Known by different names in different regions.',
    rituals: [
      'Flying kites',
      'Taking holy dips in rivers',
      'Preparing til-gul (sesame sweets)',
      'Donating to the needy',
      'Offering prayers to the Sun',
      'Bonfires in some regions'
    ],
    deities: ['Surya'],
    colors: ['#FFD700', '#FF6347']
  },
  {
    id: 'pongal-2026',
    name: 'Pongal',
    shortName: 'Thai Pongal',
    category: 'Festival',
    date: '2026-01-14',
    endDate: '2026-01-17',
    month: 'January',
    duration: '4 days',
    lunarDate: 'Thai month (Solar calendar)',
    description: 'Tamil harvest festival dedicated to the Sun God.',
    significance: 'Thanks the Sun God, nature, and cattle for a successful harvest. Celebrates prosperity and abundance.',
    rituals: [
      'Cooking Pongal (sweet rice) in new pots',
      'Decorating with kolam (rangoli)',
      'Worshiping the Sun God',
      'Mattu Pongal for cattle',
      'Decorating cattle with flowers',
      'Family gatherings and feasts'
    ],
    deities: ['Surya', 'Indra'],
    colors: ['#FFD700', '#32CD32']
  },
  {
    id: 'maha-shivaratri-2026',
    name: 'Maha Shivaratri',
    shortName: 'Great Night of Shiva',
    category: 'Major Festival',
    date: '2026-02-17',
    endDate: '2026-02-17',
    month: 'February',
    duration: '1 night',
    lunarDate: 'Phalguna Krishna Chaturdashi',
    description: 'The Great Night of Shiva, celebrating the marriage of Shiva and Parvati.',
    significance: 'Commemorates the night when Shiva performed the Tandava dance and also marks his marriage to Parvati. Believed to be the night when Shiva saved the world by drinking poison.',
    rituals: [
      'All-night vigil and meditation',
      'Fasting throughout the day and night',
      'Offering bel leaves to Shiva lingam',
      'Chanting "Om Namah Shivaya"',
      'Abhishekam with milk, honey, and water',
      'Visiting Shiva temples'
    ],
    deities: ['Shiva', 'Parvati'],
    colors: ['#4169E1', '#FFFFFF']
  },
  {
    id: 'holi-2026',
    name: 'Holi',
    shortName: 'Festival of Colors',
    category: 'Major Festival',
    date: '2026-03-04',
    endDate: '2026-03-04',
    month: 'March',
    duration: '2 days',
    lunarDate: 'Phalguna Purnima',
    description: 'The Festival of Colors, celebrating spring, love, and the victory of good over evil.',
    significance: 'Celebrates the divine love of Radha and Krishna, and commemorates the burning of Holika, symbolizing the triumph of devotion over evil.',
    rituals: [
      'Holika Dahan bonfire on the eve',
      'Playing with colored powders and water',
      'Dancing to traditional music',
      'Preparing festive foods like gujiya',
      'Visiting friends and family',
      'Forgetting past conflicts'
    ],
    deities: ['Krishna', 'Radha'],
    colors: ['#FF1493', '#00CED1', '#FFD700', '#32CD32']
  },
  {
    id: 'ugadi-2026',
    name: 'Ugadi',
    shortName: 'Telugu New Year',
    category: 'Festival',
    date: '2026-03-22',
    endDate: '2026-03-22',
    month: 'March',
    duration: '1 day',
    lunarDate: 'Chaitra Shukla Pratipada',
    description: 'Marks the Telugu and Kannada New Year.',
    significance: 'Celebrates the beginning of a new year and new beginnings. Time for fresh starts and new ventures.',
    rituals: [
      'Preparing Ugadi Pachadi (six tastes)',
      'Oil bath in the morning',
      'Decorating homes with mango leaves',
      'Panchanga Sravanam (hearing predictions)',
      'Wearing new clothes',
      'Visiting temples'
    ],
    deities: ['Brahma'],
    colors: ['#32CD32', '#FFD700']
  },
  {
    id: 'ram-navami-2026',
    name: 'Ram Navami',
    shortName: 'Rama\'s Birthday',
    category: 'Major Festival',
    date: '2026-03-28',
    endDate: '2026-03-28',
    month: 'March',
    duration: '1 day',
    lunarDate: 'Chaitra Shukla Navami',
    description: 'Celebrates the birth of Lord Rama, the seventh avatar of Vishnu.',
    significance: 'Marks the birth of Rama in Ayodhya. Celebrates his life as depicted in the Ramayana and his ideals of dharma, duty, and righteousness.',
    rituals: [
      'Reciting the Ramayana',
      'Ram Katha (storytelling)',
      'Bhajans and kirtans',
      'Fasting until noon',
      'Processions with Rama idols',
      'Distributing prasad'
    ],
    deities: ['Rama', 'Sita', 'Hanuman'],
    colors: ['#FFD700', '#32CD32']
  },
  {
    id: 'hanuman-jayanti-2026',
    name: 'Hanuman Jayanti',
    shortName: 'Hanuman\'s Birthday',
    category: 'Festival',
    date: '2026-04-11',
    endDate: '2026-04-11',
    month: 'April',
    duration: '1 day',
    lunarDate: 'Chaitra Purnima',
    description: 'Celebrates the birth of Lord Hanuman, the devoted servant of Rama.',
    significance: 'Honors Hanuman\'s devotion, strength, and selfless service to Lord Rama. Celebrated for courage and protection.',
    rituals: [
      'Reciting Hanuman Chalisa',
      'Visiting Hanuman temples',
      'Offering sindoor and jasmine flowers',
      'Reading Sundara Kanda from Ramayana',
      'Distributing prasad',
      'Organizing wrestling matches in some regions'
    ],
    deities: ['Hanuman'],
    colors: ['#FF4500', '#FFD700']
  },
  {
    id: 'raksha-bandhan-2026',
    name: 'Raksha Bandhan',
    shortName: 'Rakhi',
    category: 'Festival',
    date: '2026-08-28',
    endDate: '2026-08-28',
    month: 'August',
    duration: '1 day',
    lunarDate: 'Shravana Purnima',
    description: 'Celebrates the bond between brothers and sisters.',
    significance: 'Sisters tie rakhi (sacred thread) on brothers\' wrists, and brothers vow to protect their sisters. Symbolizes love and duty between siblings.',
    rituals: [
      'Sisters tying rakhi on brothers\' wrists',
      'Brothers giving gifts to sisters',
      'Performing aarti',
      'Sharing sweets',
      'Family gatherings',
      'Prayers for well-being'
    ],
    deities: [],
    colors: ['#FF1493', '#FFD700']
  },
  {
    id: 'janmashtami-2026',
    name: 'Janmashtami',
    shortName: 'Krishna Jayanti',
    category: 'Major Festival',
    date: '2026-09-04',
    endDate: '2026-09-05',
    month: 'September',
    duration: '1-2 days',
    lunarDate: 'Bhadrapada Krishna Ashtami',
    description: 'Celebrates the birth of Lord Krishna, the eighth avatar of Vishnu.',
    significance: 'Commemorates the birth of Krishna at midnight in Mathura. Celebrates his divine playfulness and teachings in the Bhagavad Gita.',
    rituals: [
      'Midnight prayers and aartis',
      'Fasting until midnight',
      'Dahi Handi (pot breaking) competitions',
      'Decorating Krishna idols',
      'Singing bhajans and kirtans',
      'Reading from Bhagavad Gita'
    ],
    deities: ['Krishna', 'Radha'],
    colors: ['#4169E1', '#FFD700']
  },
  {
    id: 'ganesh-chaturthi-2026',
    name: 'Ganesh Chaturthi',
    shortName: 'Vinayaka Chavithi',
    category: 'Major Festival',
    date: '2026-09-15',
    endDate: '2026-09-24',
    month: 'September',
    duration: '10 days',
    lunarDate: 'Bhadrapada Shukla Chaturthi',
    description: 'Celebrates the birth of Lord Ganesha, the remover of obstacles.',
    significance: 'Honors Ganesha as the god of new beginnings, wisdom, and prosperity. Marks his birthday according to Hindu mythology.',
    rituals: [
      'Installing clay Ganesha idols at home',
      'Daily puja and offerings of modaks',
      'Chanting mantras and singing aartis',
      'Community pandal celebrations',
      'Visarjan (immersion) on the last day',
      'Cultural programs and processions'
    ],
    deities: ['Ganesha'],
    colors: ['#FF6347', '#FFD700']
  },
  {
    id: 'navaratri-2026',
    name: 'Navaratri',
    shortName: 'Nine Nights',
    category: 'Major Festival',
    date: '2026-10-13',
    endDate: '2026-10-22',
    month: 'October',
    duration: '9 nights and 10 days',
    lunarDate: 'Ashwin Shukla Pratipada to Dashami',
    description: 'Nine nights dedicated to worshiping the nine forms of Goddess Durga.',
    significance: 'Celebrates the victory of Goddess Durga over the demon Mahishasura, symbolizing the triumph of good over evil.',
    rituals: [
      'Daily puja to different forms of Durga',
      'Fasting during the nine days',
      'Garba and Dandiya Raas dances',
      'Kanya Puja on the eighth or ninth day',
      'Reading Durga Saptashati',
      'Decorating with flowers and lights'
    ],
    deities: ['Durga', 'Lakshmi', 'Saraswati'],
    colors: ['#DC143C', '#FFD700', '#4169E1']
  },
  {
    id: 'dussehra-2026',
    name: 'Dussehra',
    shortName: 'Vijayadashami',
    category: 'Major Festival',
    date: '2026-10-22',
    endDate: '2026-10-22',
    month: 'October',
    duration: '1 day',
    lunarDate: 'Ashwin Shukla Dashami',
    description: 'Celebrates the victory of Lord Rama over Ravana and Goddess Durga over Mahishasura.',
    significance: 'Marks the end of Navaratri and symbolizes the victory of righteousness over evil. Also commemorates Rama\'s victory in the Ramayana.',
    rituals: [
      'Burning effigies of Ravana, Kumbhakarna, and Meghanada',
      'Ram Lila performances',
      'Durga idol immersion in some regions',
      'Worship of weapons and tools',
      'Community celebrations and processions'
    ],
    deities: ['Rama', 'Durga'],
    colors: ['#DC143C', '#FFD700']
  },
  {
    id: 'karva-chauth-2026',
    name: 'Karva Chauth',
    shortName: 'Karwa Chauth',
    category: 'Festival',
    date: '2026-10-28',
    endDate: '2026-10-28',
    month: 'October',
    duration: '1 day',
    lunarDate: 'Kartik Krishna Chaturthi',
    description: 'A fasting festival observed by married women for their husbands\' long life.',
    significance: 'Married women fast from sunrise to moonrise, praying for their husbands\' well-being and longevity.',
    rituals: [
      'Fasting without water from sunrise',
      'Applying mehendi',
      'Dressing in bridal attire',
      'Listening to Karva Chauth story',
      'Moon worship in the evening',
      'Breaking fast after seeing moon'
    ],
    deities: ['Parvati', 'Shiva'],
    colors: ['#DC143C', '#FFD700']
  },
  {
    id: 'diwali-2026',
    name: 'Diwali',
    shortName: 'Deepavali',
    category: 'Major Festival',
    date: '2026-11-08',
    endDate: '2026-11-12',
    month: 'November',
    duration: '5 days',
    lunarDate: 'Kartik Amavasya',
    description: 'The Festival of Lights, celebrating the victory of light over darkness and good over evil.',
    significance: 'Commemorates Lord Rama\'s return to Ayodhya after 14 years of exile and his victory over Ravana. Also celebrates Goddess Lakshmi, the goddess of wealth and prosperity.',
    rituals: [
      'Lighting diyas (oil lamps) and candles',
      'Lakshmi Puja on the main day',
      'Bursting firecrackers',
      'Exchanging gifts and sweets',
      'Rangoli decorations',
      'Wearing new clothes'
    ],
    deities: ['Lakshmi', 'Rama', 'Ganesha'],
    colors: ['#FFD700', '#FF6347', '#FF4500']
  }
];

// Helper functions to format and filter festivals

// Format date to a readable string
export const formatFestivalDate = (dateString) => {
  // Add time to ensure it's interpreted as local date
  const date = new Date(dateString + 'T00:00:00');
  
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric',
    year: 'numeric',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });
};

// Format date range for multi-day festivals
export const formatDateRange = (startDate, endDate) => {
  if (startDate === endDate) {
    return formatFestivalDate(startDate);
  }
  
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Same month
  if (start.getMonth() === end.getMonth()) {
    return `${start.toLocaleDateString('en-US', { month: 'long', timeZone: userTimeZone })} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
  }
  
  // Different months
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: userTimeZone })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: userTimeZone })}`;
};

// Get days until festival
export const getDaysUntilFestival = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const festivalDate = new Date(dateString + 'T00:00:00');
  festivalDate.setHours(0, 0, 0, 0);
  
  const diffTime = festivalDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Check if festival is happening today
export const isFestivalToday = (startDate, endDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const start = new Date(startDate + 'T00:00:00');
  start.setHours(0, 0, 0, 0);
  
  const end = new Date(endDate + 'T00:00:00');
  end.setHours(0, 0, 0, 0);
  
  return today >= start && today <= end;
};

// Check if festival is upcoming (within next 30 days)
export const isUpcoming = (dateString) => {
  const days = getDaysUntilFestival(dateString);
  return days > 0 && days <= 30;
};

// Check if festival has passed
export const hasPassed = (endDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const festivalEnd = new Date(endDate + 'T00:00:00');
  festivalEnd.setHours(0, 0, 0, 0);
  
  return festivalEnd < today;
};

// Get festival status
export const getFestivalStatus = (startDate, endDate) => {
  if (isFestivalToday(startDate, endDate)) {
    return 'today';
  }
  
  const daysUntil = getDaysUntilFestival(startDate);
  
  if (daysUntil < 0) {
    return 'past';
  } else if (daysUntil === 0) {
    return 'today';
  } else if (daysUntil <= 7) {
    return 'this-week';
  } else if (daysUntil <= 30) {
    return 'this-month';
  } else {
    return 'future';
  }
};

// Sort festivals by date
export const sortFestivalsByDate = (festivals) => {
  return [...festivals].sort((a, b) => {
    const dateA = new Date(a.date + 'T00:00:00');
    const dateB = new Date(b.date + 'T00:00:00');
    return dateA - dateB;
  });
};

// Helper functions to filter and sort festivals
export const getFestivalsByCategory = (category) => {
  return festivalsData.filter(festival => festival.category === category);
};

export const getFestivalsByMonth = (month) => {
  return festivalsData.filter(festival => festival.month.includes(month));
};

export const getFestivalsByDeity = (deity) => {
  return festivalsData.filter(festival => 
    festival.deities.some(d => d.toLowerCase() === deity.toLowerCase())
  );
};

export const getUpcomingFestivals = (limit = null) => {
  const upcoming = festivalsData.filter(festival => {
    const days = getDaysUntilFestival(festival.date);
    return days >= 0;
  });
  
  const sorted = sortFestivalsByDate(upcoming);
  return limit ? sorted.slice(0, limit) : sorted;
};

export const getPastFestivals = () => {
  return festivalsData.filter(festival => hasPassed(festival.endDate));
};

export const getTodaysFestivals = () => {
  return festivalsData.filter(festival => 
    isFestivalToday(festival.date, festival.endDate)
  );
};

export const getFestivalById = (id) => {
  return festivalsData.find(festival => festival.id === id);
};

/**
 * Generate festivals dynamically for a specific year using Hindu calendar calculations
 * @param {number} year - Year to generate festivals for
 * @param {object} location - Location object with latitude/longitude (optional)
 */
export const generateFestivalsForYear = (year, location = null) => {
  const calculatedDates = generateFestivalDatesForYear(year, location);
  const generatedFestivals = [];
  
  // Map of festival IDs to their calculated date keys
  const festivalDateMap = {
    'diwali': 'diwali',
    'holi': 'holi',
    'navaratri': 'navratri',
    'dussehra': 'dussehra',
    'janmashtami': 'janmashtami',
    'ganesh-chaturthi': 'ganeshChaturthi',
    'maha-shivaratri': 'mahaShivaratri',
    'raksha-bandhan': 'rakshaBandhan',
    'guru-purnima': 'guruPurnima',
    'ram-navami': 'ramNavami'
  };
  
  // Find templates for calculable festivals and update their dates
  festivalsData.forEach(template => {
    const dateKey = festivalDateMap[template.id];
    if (dateKey && calculatedDates[dateKey]) {
      const { date, endDate } = calculatedDates[dateKey];
      const festivalDate = new Date(date);
      const monthName = festivalDate.toLocaleString('en-US', { month: 'long' });
      
      generatedFestivals.push({
        ...template,
        date,
        endDate,
        month: monthName,
        year
      });
    }
  });
  
  return generatedFestivals;
};

/**
 * Get all festivals including dynamically generated ones for multiple years
 * @param {number} startYear - Start year
 * @param {number} endYear - End year
 * @param {object} location - Location object with latitude/longitude (optional)
 */
export const getAllFestivalsWithCalculated = (startYear = 2025, endYear = 2035, location = null) => {
  const allFestivals = [...festivalsData];
  
  // Generate festivals for years not in the static data
  for (let year = startYear; year <= endYear; year++) {
    const yearExists = festivalsData.some(f => f.date && f.date.startsWith(year.toString()));
    
    if (!yearExists) {
      const generatedForYear = generateFestivalsForYear(year, location);
      allFestivals.push(...generatedForYear);
    }
  }
  
  return sortFestivalsByDate(allFestivals);
};

