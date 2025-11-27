// Ashtottara Shatanamavali (108 Names) of Hindu Deities
// Data source: https://www.drikpanchang.com/deities-namavali/deities-ashtottara-shatanamavali.html

export const ashtottaramData = {
  // GODS
  ganesha: {
    id: 'ganesha',
    name: 'Lord Ganesha',
    title: 'Ganesha Ashtottara Shatanamavali',
    description: '108 Names of Lord Ganesha, the remover of obstacles and lord of beginnings',
    image: require('../assets/images/Gods/ganesha.png'),
    category: 'god',
    names: [
      { sanskrit: 'गजानन', transliteration: 'Gajananaya', meaning: 'One who has an elephant face' },
      { sanskrit: 'गणाध्यक्ष', transliteration: 'Ganadhyakshaya', meaning: 'Lord of all ganas (groups)' },
      { sanskrit: 'विघ्नराज', transliteration: 'Vighnarajaya', meaning: 'King of obstacles' },
      { sanskrit: 'विनायक', transliteration: 'Vinayakaya', meaning: 'The supreme leader' },
      { sanskrit: 'द्वैमातुर', transliteration: 'Dvaimaturaya', meaning: 'One who has two mothers' },
      { sanskrit: 'द्विमुख', transliteration: 'Dvimukhaya', meaning: 'One who has two faces' },
      { sanskrit: 'पार्वतीनन्दन', transliteration: 'Parvatinandanaya', meaning: 'Son of Parvati' },
      { sanskrit: 'मुक्तिदाय', transliteration: 'Muktidaya', meaning: 'Bestower of liberation' },
      { sanskrit: 'अमितशक्ति', transliteration: 'Amitashaktaye', meaning: 'One with immeasurable power' },
      { sanskrit: 'गणेश', transliteration: 'Ganeshaya', meaning: 'Lord of all beings' },
      // Add remaining 98 names... (truncated for demo)
      { sanskrit: 'सर्वसिद्धिप्रद', transliteration: 'Sarvasiddhipradaya', meaning: 'Bestower of all perfections' },
    ]
  },

  vishnu: {
    id: 'vishnu',
    name: 'Lord Vishnu',
    title: 'Vishnu Ashtottara Shatanamavali',
    description: '108 Names of Lord Vishnu, the preserver of the universe',
    image: require('../assets/images/Gods/vishnu.png'),
    category: 'god',
    names: [
      { sanskrit: 'विष्णु', transliteration: 'Vishnave', meaning: 'The all-pervading one' },
      { sanskrit: 'लक्ष्मीपति', transliteration: 'Lakshmipataye', meaning: 'Consort of Lakshmi' },
      { sanskrit: 'जनार्दन', transliteration: 'Janardanaya', meaning: 'Liberator of people' },
      { sanskrit: 'माधव', transliteration: 'Madhavaya', meaning: 'Husband of goddess Ma (Lakshmi)' },
      { sanskrit: 'वासुदेव', transliteration: 'Vasudevaya', meaning: 'Son of Vasudeva' },
      { sanskrit: 'नारायण', transliteration: 'Narayanaya', meaning: 'The refuge of all beings' },
      { sanskrit: 'हरि', transliteration: 'Haraye', meaning: 'The remover of sorrow' },
      { sanskrit: 'कृष्ण', transliteration: 'Krishnaya', meaning: 'The dark-complexioned one' },
      { sanskrit: 'पद्मनाभ', transliteration: 'Padmanabhaya', meaning: 'One with lotus in navel' },
      { sanskrit: 'दामोदर', transliteration: 'Damodaraya', meaning: 'One tied with rope around waist' },
      // Add remaining 98 names... (truncated for demo)
      { sanskrit: 'पुरुषोत्तम', transliteration: 'Purushottamaya', meaning: 'The supreme personality' },
    ]
  },

  shiva: {
    id: 'shiva',
    name: 'Lord Shiva',
    title: 'Shiva Ashtottara Shatanamavali',
    description: '108 Names of Lord Shiva, the destroyer and transformer',
    image: require('../assets/images/Gods/Shiva.png'),
    category: 'god',
    names: [
      { sanskrit: 'शिव', transliteration: 'Shivaya', meaning: 'The auspicious one' },
      { sanskrit: 'महेश्वर', transliteration: 'Maheshwaraya', meaning: 'The great lord' },
      { sanskrit: 'शम्भु', transliteration: 'Shambhave', meaning: 'The benevolent one' },
      { sanskrit: 'पिनाकी', transliteration: 'Pinakine', meaning: 'Bearer of the bow Pinaka' },
      { sanskrit: 'शशिशेखर', transliteration: 'Shashishekharaya', meaning: 'One who has moon on his head' },
      { sanskrit: 'वामदेव', transliteration: 'Vamadevaraya', meaning: 'The beautiful god' },
      { sanskrit: 'विरूपाक्ष', transliteration: 'Virupakshaya', meaning: 'One with unusual eyes' },
      { sanskrit: 'कपर्दी', transliteration: 'Kapardine', meaning: 'One with matted hair' },
      { sanskrit: 'नीललोहित', transliteration: 'Nilalohitaya', meaning: 'Blue-throated one' },
      { sanskrit: 'शङ्कर', transliteration: 'Shankaraya', meaning: 'The giver of joy' },
      // Add remaining 98 names... (truncated for demo)
      { sanskrit: 'महादेव', transliteration: 'Mahadevaya', meaning: 'The great god' },
    ]
  },

  // GODDESSES
  lakshmi: {
    id: 'lakshmi',
    name: 'Goddess Lakshmi',
    title: 'Lakshmi Ashtottara Shatanamavali',
    description: '108 Names of Goddess Lakshmi, the goddess of wealth and prosperity',
    image: require('../assets/images/Gods/lakshmi.png'),
    category: 'goddess',
    names: [
      { sanskrit: 'प्रकृति', transliteration: 'Prakritayai', meaning: 'Nature' },
      { sanskrit: 'विकृति', transliteration: 'Vikritayai', meaning: 'Multi-faceted nature' },
      { sanskrit: 'विद्या', transliteration: 'Vidyayai', meaning: 'Knowledge' },
      { sanskrit: 'सर्वभूतहिते रता', transliteration: 'Sarvabhutahiteratayai', meaning: 'One who is devoted to welfare of all' },
      { sanskrit: 'श्रद्धा', transliteration: 'Shraddhayai', meaning: 'Faith' },
      { sanskrit: 'विभूति', transliteration: 'Vibhutayai', meaning: 'Prosperity' },
      { sanskrit: 'सुरभि', transliteration: 'Surabhayai', meaning: 'The celestial cow' },
      { sanskrit: 'परमात्मिका', transliteration: 'Paramatmikayai', meaning: 'Supreme soul' },
      { sanskrit: 'वाचा', transliteration: 'Vachayai', meaning: 'Speech' },
      { sanskrit: 'पद्मालया', transliteration: 'Padmalayayai', meaning: 'Residing on lotus' },
      // Add remaining 98 names... (truncated for demo)
      { sanskrit: 'श्री', transliteration: 'Shriyai', meaning: 'Auspiciousness' },
    ]
  },

  durga: {
    id: 'durga',
    name: 'Goddess Durga',
    title: 'Durga Ashtottara Shatanamavali',
    description: '108 Names of Goddess Durga, the invincible mother goddess',
    image: require('../assets/images/Gods/durga.png'),
    category: 'goddess',
    names: [
      { sanskrit: 'श्री', transliteration: 'Shriyai', meaning: 'The auspicious one' },
      { sanskrit: 'उमा', transliteration: 'Umayai', meaning: 'Daughter of Himavan' },
      { sanskrit: 'भवानी', transliteration: 'Bhavanyai', meaning: 'Consort of Bhava (Shiva)' },
      { sanskrit: 'दुर्गा', transliteration: 'Durgayai', meaning: 'The invincible one' },
      { sanskrit: 'शिवा', transliteration: 'Shivayai', meaning: 'The auspicious' },
      { sanskrit: 'पार्वती', transliteration: 'Parvatyai', meaning: 'Daughter of the mountain' },
      { sanskrit: 'महामाया', transliteration: 'Mahayayai', meaning: 'The great illusion' },
      { sanskrit: 'सर्वभूतहितप्रदा', transliteration: 'Sarvabhutahitapradayai', meaning: 'Bestower of good to all beings' },
      { sanskrit: 'काली', transliteration: 'Kalyai', meaning: 'The dark one' },
      { sanskrit: 'महाकाली', transliteration: 'Mahakalyai', meaning: 'The great dark one' },
      // Add remaining 98 names... (truncated for demo)
      { sanskrit: 'त्रिदशेश्वरी', transliteration: 'Tridasheshwaryai', meaning: 'Goddess of the three worlds' },
    ]
  },

  saraswati: {
    id: 'saraswati',
    name: 'Goddess Saraswati',
    title: 'Saraswati Ashtottara Shatanamavali',
    description: '108 Names of Goddess Saraswati, the goddess of knowledge and arts',
    image: require('../assets/images/Gods/saraswati.png'),
    category: 'goddess',
    names: [
      { sanskrit: 'सरस्वती', transliteration: 'Saraswatyai', meaning: 'The flowing one' },
      { sanskrit: 'महाभद्रा', transliteration: 'Mahabhadrayai', meaning: 'The supremely auspicious' },
      { sanskrit: 'महापात्रा', transliteration: 'Mahapatrayai', meaning: 'Supremely sacred' },
      { sanskrit: 'महामाया', transliteration: 'Mahayayai', meaning: 'The great illusion' },
      { sanskrit: 'वाराही', transliteration: 'Varahyai', meaning: 'Boar incarnation' },
      { sanskrit: 'वैष्णवी', transliteration: 'Vaishnayai', meaning: 'Follower of Vishnu' },
      { sanskrit: 'चित्रा', transliteration: 'Chitrayai', meaning: 'The one in various colors' },
      { sanskrit: 'वाणी', transliteration: 'Vanyai', meaning: 'Speech' },
      { sanskrit: 'मेधा', transliteration: 'Medhayai', meaning: 'Intelligence' },
      { sanskrit: 'विद्या', transliteration: 'Vidyayai', meaning: 'Knowledge' },
      // Add remaining 98 names... (truncated for demo)
      { sanskrit: 'ज्ञानरूपिणी', transliteration: 'Jnanarupinyai', meaning: 'Embodiment of knowledge' },
    ]
  },

  // Additional deities can be added here following the same structure:
  // rama, krishna, hanuman, etc.
};

// Get list of all ashtottarams
export const getAshtottaramList = () => {
  return Object.values(ashtottaramData).map(deity => ({
    id: deity.id,
    name: deity.name,
    title: deity.title,
    description: deity.description,
    image: deity.image,
    category: deity.category,
    namesCount: deity.names.length
  }));
};

// Get a specific ashtottaram by ID
export const getAshtottaramById = (id) => {
  return ashtottaramData[id] || null;
};

// Get ashtottarams by category (god/goddess)
export const getAshtottaramsByCategory = (category) => {
  return Object.values(ashtottaramData).filter(deity => deity.category === category);
};

export default ashtottaramData;
