// Comprehensive Puja/Ritual Guide Data

export const pujaCategories = {
  DAILY: 'Daily Puja',
  FESTIVAL: 'Festival Puja',
  SPECIAL: 'Special Occasion',
  VRAT: 'Vrat/Fasting',
  HOUSEWARMING: 'Griha Pravesh',
  OCCASIONAL: 'Occasional'
};

export const difficultyLevels = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced'
};

export const pujasData = [
  {
    id: 'ganesh-puja',
    name: 'Ganesh Puja',
    deity: 'Lord Ganesha',
    deityImage: 'ganesha.jpg',
    category: pujaCategories.DAILY,
    difficulty: difficultyLevels.BEGINNER,
    duration: '30-45 minutes',
    occasion: 'New beginnings, removing obstacles, daily worship',
    bestTime: 'Early morning (6-8 AM) or evening (6-8 PM)',
    description: 'Ganesh Puja is performed to invoke Lord Ganesha, the remover of obstacles. Ideal for starting new ventures, daily worship, and seeking blessings for success.',
    
    benefits: [
      'Removes obstacles from life',
      'Brings wisdom and prosperity',
      'Ensures success in new endeavors',
      'Promotes mental clarity and focus',
      'Protects from negative energies'
    ],

    materials: {
      deity: [
        'Ganesha idol or picture',
        'Chowki or platform for the idol',
        'Red cloth to cover the platform'
      ],
      flowers: [
        'Red hibiscus flowers (21 pieces)',
        'Durva grass (sacred grass)',
        'Tulsi leaves',
        'Fresh flower garland'
      ],
      offerings: [
        'Modak (sweet dumplings) - 21 pieces',
        'Ladoo',
        'Fresh fruits (banana, apple, coconut)',
        'Betel leaves and nuts',
        'Jaggery'
      ],
      puja_items: [
        'Incense sticks (agarbatti)',
        'Camphor (kapoor)',
        'Ghee lamp/diya with cotton wicks',
        'Kumkum (red vermillion)',
        'Haldi (turmeric powder)',
        'Chandan (sandalwood paste)',
        'Akshat (unbroken rice)',
        'Holy water (Ganga jal)',
        'Small bell',
        'Aarti plate'
      ],
      additional: [
        'Clean cloth for cleaning idol',
        'Small bowl for offerings',
        'Matches or lighter'
      ]
    },

    steps: [
      {
        stepNumber: 1,
        title: 'Preparation and Purification',
        description: 'Cleanse yourself and the puja area. Take a bath and wear clean clothes. Clean the puja area and spread a red cloth on the platform.',
        duration: '5 minutes',
        image: null,
        tips: ['Face east or north during puja', 'Keep all materials organized and within reach'],
        mantra: null
      },
      {
        stepNumber: 2,
        title: 'Invocation (Avahana)',
        description: 'Place the Ganesha idol on the platform. Light the ghee lamp and incense sticks. Ring the bell and invite Lord Ganesha to be present.',
        duration: '3 minutes',
        image: null,
        tips: ['Visualize Lord Ganesha\'s presence', 'Maintain focus and devotion'],
        mantra: 'Om Gam Ganapataye Namaha'
      },
      {
        stepNumber: 3,
        title: 'Offering Water (Achamana)',
        description: 'Offer water three times to Lord Ganesha by sprinkling it with a spoon or your right hand. This purifies the deity.',
        duration: '2 minutes',
        image: null,
        tips: ['Use clean water', 'Sprinkle gently around the idol'],
        mantra: 'Om Achyutaya Namaha, Om Anantaya Namaha, Om Govindaya Namaha'
      },
      {
        stepNumber: 4,
        title: 'Applying Kumkum and Chandan',
        description: 'Apply kumkum (red vermillion) and chandan (sandalwood paste) to the forehead of Lord Ganesha. Offer haldi and kumkum.',
        duration: '3 minutes',
        image: null,
        tips: ['Apply with ring finger', 'Use fresh kumkum and chandan'],
        mantra: 'Om Ganadhyakshaya Namaha'
      },
      {
        stepNumber: 5,
        title: 'Offering Flowers',
        description: 'Offer red hibiscus flowers one by one to Lord Ganesha while chanting his names. Offer durva grass (sacred grass) in bunches of 3, 5, or 21.',
        duration: '5 minutes',
        image: null,
        tips: ['Offer flowers at the feet of the deity', 'Durva grass is very auspicious for Ganesha'],
        mantra: 'Om Vakratundaya Namaha, Om Ekadantaya Namaha, Om Lambhodaraya Namaha'
      },
      {
        stepNumber: 6,
        title: 'Offering Food (Naivedya)',
        description: 'Offer modaks, ladoos, fruits, and other sweets to Lord Ganesha. Place them in front of the deity and offer with devotion.',
        duration: '3 minutes',
        image: null,
        tips: ['Modak is Ganesha\'s favorite', 'Offer with both hands'],
        mantra: 'Om Gajananaya Namaha'
      },
      {
        stepNumber: 7,
        title: 'Aarti',
        description: 'Perform aarti by circling the lit camphor or ghee lamp in front of Lord Ganesha in a clockwise direction. Ring the bell continuously.',
        duration: '5 minutes',
        image: null,
        tips: ['Perform 3, 5, or 7 circles', 'Sing or play Ganesha Aarti'],
        mantra: 'Jai Ganesh Jai Ganesh Jai Ganesh Deva, Mata Jaki Parvati Pita Mahadeva'
      },
      {
        stepNumber: 8,
        title: 'Pushpanjali and Prayers',
        description: 'Offer flowers with folded hands and recite Ganesha mantras or prayers. Ask for his blessings and express your wishes.',
        duration: '5 minutes',
        image: null,
        tips: ['Speak from your heart', 'Express gratitude'],
        mantra: 'Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Deva Sarva Karyeshu Sarvada'
      },
      {
        stepNumber: 9,
        title: 'Pradakshina (Circumambulation)',
        description: 'Walk around the deity in a clockwise direction 3 times, or perform mental pradakshina if space is limited.',
        duration: '2 minutes',
        image: null,
        tips: ['Keep deity to your right', 'Maintain reverence'],
        mantra: 'Om Gam Ganapataye Namaha'
      },
      {
        stepNumber: 10,
        title: 'Conclusion and Prasad',
        description: 'Seek forgiveness for any mistakes during the puja. Distribute the prasad (blessed food) to family members and accept it as divine blessing.',
        duration: '3 minutes',
        image: null,
        tips: ['Share prasad with everyone', 'Keep some for yourself'],
        mantra: 'Om Kshama Prarthana - Om Gajananaya Namaha'
      }
    ],

    mantras: [
      {
        name: 'Ganesh Beej Mantra',
        sanskrit: 'ॐ गं गणपतये नमः',
        transliteration: 'Om Gam Ganapataye Namaha',
        meaning: 'Salutations to Lord Ganesha',
        repetitions: 108
      },
      {
        name: 'Vakratunda Stotra',
        sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
        transliteration: 'Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Deva Sarva Karyeshu Sarvada',
        meaning: 'O Lord with the curved trunk and massive body, whose brilliance equals millions of suns, please remove all obstacles from my endeavors always',
        repetitions: 1
      },
      {
        name: 'Ganesh Gayatri',
        sanskrit: 'ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि। तन्नो दन्ती प्रचोदयात्॥',
        transliteration: 'Om Ekadantaya Vidmahe Vakratundaya Dhimahi, Tanno Danti Prachodayat',
        meaning: 'We meditate on the one-tusked Lord, we contemplate on the curved-trunk Lord, may that Ganesha inspire us',
        repetitions: 1
      }
    ],

    tips: [
      'Always invoke Lord Ganesha at the beginning of any puja or auspicious occasion',
      'Wednesday is especially auspicious for Ganesha worship',
      'Durva grass (sacred grass) is highly favored by Lord Ganesha',
      'Offer food items made with jaggery as Ganesha loves sweet offerings',
      'Maintain cleanliness and purity during the puja',
      'Perform puja with complete devotion and concentration'
    ],

    panchangamGuidance: {
      avoidDays: ['Amavasya (new moon) for regular puja', 'Inauspicious nakshatras'],
      bestDays: ['Wednesday', 'Chaturthi (4th day of lunar fortnight)', 'Ganesh Chaturthi'],
      bestNakshatra: ['Pushya', 'Hasta', 'Ashwini']
    },

    videoTutorial: null,
    pdfGuide: null
  },

  {
    id: 'lakshmi-puja',
    name: 'Lakshmi Puja',
    deity: 'Goddess Lakshmi',
    deityImage: 'lakshmi.jpg',
    category: pujaCategories.FESTIVAL,
    difficulty: difficultyLevels.INTERMEDIATE,
    duration: '45-60 minutes',
    occasion: 'Diwali, Fridays, prosperity and wealth',
    bestTime: 'Evening (after sunset) especially on Fridays',
    description: 'Lakshmi Puja is performed to invoke Goddess Lakshmi, the deity of wealth, prosperity, and abundance. Most prominently performed during Diwali.',

    benefits: [
      'Attracts wealth and prosperity',
      'Removes financial obstacles',
      'Brings good fortune to home and business',
      'Ensures family harmony and happiness',
      'Blesses with abundance and success'
    ],

    materials: {
      deity: [
        'Lakshmi idol or picture',
        'Ganesha idol (to be worshipped first)',
        'Red or yellow cloth for platform',
        'Small coins or currency notes'
      ],
      flowers: [
        'Lotus flowers (if available)',
        'Red roses or marigolds',
        'Jasmine flowers',
        'Fresh flower garland'
      ],
      offerings: [
        'Kheer (rice pudding)',
        'Panchamrit (mixture of milk, curd, ghee, honey, sugar)',
        'Fresh fruits',
        'Dry fruits and nuts',
        'Sweets (especially made with milk)',
        'Betel leaves and nuts'
      ],
      puja_items: [
        'Ghee lamp/diyas (at least 5)',
        'Incense sticks',
        'Camphor',
        'Kumkum and haldi',
        'Chandan',
        'Akshat (rice)',
        'Holy water',
        'Kalash (water pot with mango leaves and coconut)',
        'Bell',
        'Aarti plate',
        'Rangoli colors'
      ],
      additional: [
        'New broom (symbolic)',
        'Account books or wallet',
        'Silver/gold jewelry (for blessing)',
        'Clean red/yellow cloth'
      ]
    },

    steps: [
      {
        stepNumber: 1,
        title: 'Preparation',
        description: 'Clean the entire house, especially the puja area. Take a bath and wear clean, preferably new clothes. Create a beautiful rangoli at the entrance.',
        duration: '10 minutes',
        tips: ['Evening time is most auspicious', 'Keep main door open to welcome Lakshmi'],
        mantra: null
      },
      {
        stepNumber: 2,
        title: 'Setup Kalash and Altar',
        description: 'Set up a kalash (water pot) with mango leaves and coconut. Place idols of Ganesha and Lakshmi on the platform. Arrange coins or currency notes near Lakshmi.',
        duration: '5 minutes',
        tips: ['Face north or east', 'Place Ganesha on the left of Lakshmi'],
        mantra: null
      },
      {
        stepNumber: 3,
        title: 'Light Lamps',
        description: 'Light ghee diyas in the puja room and around the house, especially at the entrance and corners. Light at least 5 lamps for Lakshmi.',
        duration: '5 minutes',
        tips: ['Use ghee for best results', 'Keep lamps lit throughout the puja'],
        mantra: 'Om Shreem Mahalakshmyai Namaha'
      },
      {
        stepNumber: 4,
        title: 'Ganesh Puja',
        description: 'First worship Lord Ganesha for obstacle removal. Offer flowers, kumkum, and chandan to Ganesha.',
        duration: '5 minutes',
        tips: ['Always invoke Ganesha first', 'Offer modak if available'],
        mantra: 'Om Gam Ganapataye Namaha'
      },
      {
        stepNumber: 5,
        title: 'Lakshmi Invocation',
        description: 'Invoke Goddess Lakshmi by chanting her mantras. Invite her to be present and bless your home.',
        duration: '5 minutes',
        tips: ['Visualize golden light', 'Feel her divine presence'],
        mantra: 'Om Shreem Hreem Shreem Kamale Kamalalaye Prasida Prasida'
      },
      {
        stepNumber: 6,
        title: 'Panchamrit Abhishekam',
        description: 'Perform abhishekam (ritual bathing) of Lakshmi idol with panchamrit. Gently pour panchamrit over the idol.',
        duration: '5 minutes',
        tips: ['Perform only if you have a metal idol', 'Wipe gently with clean cloth after'],
        mantra: 'Om Mahalakshmyai Namaha'
      },
      {
        stepNumber: 7,
        title: 'Offering Kumkum and Flowers',
        description: 'Apply kumkum and chandan. Offer lotus flowers or red/yellow flowers while chanting Lakshmi\'s 108 names or mantras.',
        duration: '8 minutes',
        tips: ['Offer flowers with devotion', 'Red and yellow are auspicious colors for Lakshmi'],
        mantra: 'Om Shreem Mahalakshmyai Namaha (108 times)'
      },
      {
        stepNumber: 8,
        title: 'Naivedya (Food Offering)',
        description: 'Offer kheer, fruits, sweets, and other food items to the goddess. Sprinkle water around the offerings.',
        duration: '5 minutes',
        tips: ['Offer with love and devotion', 'Include variety of sweets'],
        mantra: 'Om Annapurnayai Namaha'
      },
      {
        stepNumber: 9,
        title: 'Lakshmi Aarti',
        description: 'Perform aarti with camphor or ghee lamp. Sing Lakshmi Aarti while ringing the bell. Circle the lamp in clockwise direction.',
        duration: '7 minutes',
        tips: ['Sing or play recorded aarti', 'Family members can join'],
        mantra: 'Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata...'
      },
      {
        stepNumber: 10,
        title: 'Pushpanjali and Prayers',
        description: 'Offer flowers with folded hands. Pray for prosperity, health, and happiness for your family.',
        duration: '3 minutes',
        tips: ['Pray from heart', 'Include wishes for others too'],
        mantra: 'Mahalakshmi Ashtakam or personal prayers'
      },
      {
        stepNumber: 11,
        title: 'Touch Account Books/Wallet',
        description: 'Place your account books, business records, or wallet at Lakshmi\'s feet for blessings. Touch them to the idol.',
        duration: '2 minutes',
        tips: ['Symbolic gesture for business prosperity', 'Keep them overnight if possible'],
        mantra: 'Om Shreem Hreem Shreem'
      },
      {
        stepNumber: 12,
        title: 'Conclusion and Prasad',
        description: 'Seek forgiveness for errors. Distribute prasad. Keep the lamps lit as long as possible. Ideally keep them burning till late night.',
        duration: '5 minutes',
        tips: ['Share prasad with all', 'Keep altar clean'],
        mantra: 'Om Shanti Shanti Shanti'
      }
    ],

    mantras: [
      {
        name: 'Lakshmi Beej Mantra',
        sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
        transliteration: 'Om Shreem Mahalakshmyai Namaha',
        meaning: 'Salutations to Goddess Mahalakshmi',
        repetitions: 108
      },
      {
        name: 'Lakshmi Gayatri',
        sanskrit: 'ॐ महालक्ष्म्यै च विद्महे विष्णु पत्न्यै च धीमहि। तन्नो लक्ष्मी प्रचोदयात्॥',
        transliteration: 'Om Mahalakshmyai Cha Vidmahe Vishnu Patnyai Cha Dhimahi, Tanno Lakshmi Prachodayat',
        meaning: 'We meditate on Goddess Mahalakshmi, consort of Lord Vishnu, may she inspire and guide us',
        repetitions: 1
      }
    ],

    tips: [
      'Friday is the most auspicious day for Lakshmi Puja',
      'Keep your home clean and well-lit to invite prosperity',
      'Never let the lamps extinguish during Diwali night',
      'Offer food items made with milk as Lakshmi loves purity',
      'Open all doors and windows to let prosperity enter',
      'Worship Lakshmi with complete faith and devotion'
    ],

    panchangamGuidance: {
      avoidDays: ['Amavasya after sunset for general puja', 'Inauspicious muhurtas'],
      bestDays: ['Friday', 'Diwali Amavasya', 'Lakshmi Panchami', 'Full moon nights'],
      bestNakshatra: ['Pushya', 'Rohini', 'Shravana']
    },

    videoTutorial: null,
    pdfGuide: null
  },

  {
    id: 'satyanarayan-puja',
    name: 'Satyanarayan Puja',
    deity: 'Lord Satyanarayan (Vishnu)',
    deityImage: 'satyanarayan.jpg',
    category: pujaCategories.OCCASIONAL,
    difficulty: difficultyLevels.INTERMEDIATE,
    duration: '2-3 hours',
    occasion: 'Special occasions, fulfilling vows, seeking blessings',
    bestTime: 'Morning or evening',
    description: 'Satyanarayan Puja is a popular Hindu ritual dedicated to Lord Vishnu in his Satyanarayan form. Performed for prosperity, fulfillment of wishes, and family wellbeing.',

    benefits: [
      'Fulfills wishes and desires',
      'Brings peace and prosperity to family',
      'Removes difficulties and obstacles',
      'Promotes spiritual growth',
      'Ensures family harmony and happiness'
    ],

    materials: {
      deity: [
        'Satyanarayan picture or Vishnu idol',
        'Kalash with mango leaves and coconut',
        'Yellow or white cloth',
        'Small chowki or platform'
      ],
      flowers: [
        'Tulsi leaves (essential)',
        'Lotus flowers',
        'Yellow or white flowers',
        'Flower garland'
      ],
      offerings: [
        'Panchamrit',
        'Banana (ripe, 5 pieces)',
        'Seasonal fruits',
        'Chana dal (Bengal gram) - 1/2 cup',
        'Ghee - 1/2 cup',
        'Sugar or jaggery - 1 cup',
        'Cardamom powder',
        'Cashews and raisins',
        'Betel leaves and nuts'
      ],
      puja_items: [
        'Ghee lamp',
        'Incense sticks',
        'Camphor',
        'Kumkum, haldi, chandan',
        'Akshat',
        'Holy water',
        'Kalash',
        'Bell',
        'Aarti plate',
        'Red thread (mauli)'
      ],
      special: [
        'Satyanarayan Katha book',
        'New coins (for prasad)',
        'Clean cloth for covering prasad'
      ]
    },

    steps: [
      {
        stepNumber: 1,
        title: 'Preparation',
        description: 'Clean the house and puja area. Take a bath and wear clean clothes. Keep all puja materials ready. Prepare the prasad ingredients.',
        duration: '15 minutes',
        tips: ['Invite family and friends', 'Keep prasad ingredients separate'],
        mantra: null
      },
      {
        stepNumber: 2,
        title: 'Kalash Sthapana',
        description: 'Set up the kalash (water pot) with mango leaves and coconut. Place it on a mound of rice. This represents the presence of divine energies.',
        duration: '5 minutes',
        tips: ['Tie red thread around kalash', 'Fill with clean water'],
        mantra: 'Om Varunaaya Namaha'
      },
      {
        stepNumber: 3,
        title: 'Ganesh Puja',
        description: 'Invoke Lord Ganesha first. Offer flowers, kumkum, and prayers for obstacle-free puja.',
        duration: '5 minutes',
        tips: ['Always begin with Ganesha worship', 'Keep it brief'],
        mantra: 'Om Gam Ganapataye Namaha'
      },
      {
        stepNumber: 4,
        title: 'Sankalp (Taking Vow)',
        description: 'Take water in your right hand, state your name, gotra (if known), and purpose of the puja. Make your intention clear.',
        duration: '3 minutes',
        tips: ['State your wish clearly', 'Speak with conviction'],
        mantra: 'Sankalp mantra from priest or book'
      },
      {
        stepNumber: 5,
        title: 'Satyanarayan Invocation',
        description: 'Invoke Lord Satyanarayan by chanting mantras. Place the idol or picture and offer your respects.',
        duration: '5 minutes',
        tips: ['Visualize Lord Vishnu', 'Feel divine presence'],
        mantra: 'Om Namo Bhagavate Vasudevaya'
      },
      {
        stepNumber: 6,
        title: 'Shodashopachar Puja',
        description: 'Perform 16-step worship including offering water, flowers, kumkum, chandan, clothes, sacred thread, incense, lamp, and food.',
        duration: '20 minutes',
        tips: ['Follow traditional sequence', 'Offer each item with mantra'],
        mantra: 'Various mantras for each offering'
      },
      {
        stepNumber: 7,
        title: 'Reading Satyanarayan Katha',
        description: 'Read or listen to the five chapters of Satyanarayan Katha. This is the most important part of the puja. Everyone should listen attentively.',
        duration: '45-60 minutes',
        tips: ['Read with devotion', 'Everyone should sit and listen', 'Can be read in Hindi, Sanskrit, or regional language'],
        mantra: null
      },
      {
        stepNumber: 8,
        title: 'Preparing Prasad',
        description: 'While Katha is being read, someone can prepare the prasad. Mix cooked chana dal with ghee, sugar, cardamom, and dry fruits.',
        duration: '20 minutes',
        tips: ['Cook dal until soft', 'Add generous ghee', 'Keep warm'],
        mantra: 'Om Namo Narayanaya'
      },
      {
        stepNumber: 9,
        title: 'Offering Prasad',
        description: 'After Katha, offer the prepared prasad to Lord Satyanarayan. Place it in front of the deity with devotion.',
        duration: '5 minutes',
        tips: ['Offer with both hands', 'Include fruits and bananas'],
        mantra: 'Om Satyanarayanaya Namaha'
      },
      {
        stepNumber: 10,
        title: 'Aarti',
        description: 'Perform aarti with ghee lamp and camphor. Sing Satyanarayan Aarti while ringing the bell.',
        duration: '10 minutes',
        tips: ['Everyone should stand for aarti', 'Sing with devotion'],
        mantra: 'Jai Lakshmi Ramana...'
      },
      {
        stepNumber: 11,
        title: 'Pradakshina and Pranam',
        description: 'Perform pradakshina (circumambulation) and bow down to seek blessings.',
        duration: '5 minutes',
        tips: ['Circle 3 times clockwise', 'Touch feet of deity if idol'],
        mantra: 'Om Namo Narayanaya'
      },
      {
        stepNumber: 12,
        title: 'Prasad Distribution',
        description: 'Distribute prasad to all attendees. Everyone should accept prasad with reverence. Take the blessings home.',
        duration: '10 minutes',
        tips: ['Don\'t refuse prasad', 'Give prasad to those who couldn\'t attend', 'Eat with devotion'],
        mantra: null
      }
    ],

    mantras: [
      {
        name: 'Satyanarayan Dhyana Mantra',
        sanskrit: 'ॐ नमो भगवते वासुदेवाय',
        transliteration: 'Om Namo Bhagavate Vasudevaya',
        meaning: 'Salutations to Lord Vasudeva (Krishna/Vishnu)',
        repetitions: 108
      },
      {
        name: 'Vishnu Mantra',
        sanskrit: 'ॐ श्री विष्णवे नमः',
        transliteration: 'Om Shri Vishnave Namaha',
        meaning: 'Salutations to Lord Vishnu',
        repetitions: 108
      }
    ],

    tips: [
      'Full moon day (Purnima) is highly auspicious for this puja',
      'Can be performed on any auspicious occasion or to fulfill a vow',
      'Reading the Katha with faith is essential - don\'t skip it',
      'Invite family and friends to participate',
      'Fast until the puja is complete for maximum benefits',
      'Perform with complete devotion and sincerity'
    ],

    panchangamGuidance: {
      avoidDays: ['Amavasya', 'Eclipses', 'Inauspicious tithis'],
      bestDays: ['Purnima (full moon)', 'Ekadashi', 'Thursday', 'Specific occasions like birthdays, housewarming'],
      bestNakshatra: ['Pushya', 'Rohini', 'Uttara Phalguni']
    },

    videoTutorial: null,
    pdfGuide: null
  }
];

// Helper functions

export const getPujaById = (id) => {
  return pujasData.find(puja => puja.id === id);
};

export const getPujasByCategory = (category) => {
  return pujasData.filter(puja => puja.category === category);
};

export const getPujasByDifficulty = (difficulty) => {
  return pujasData.filter(puja => puja.difficulty === difficulty);
};

export const searchPujas = (query) => {
  const lowerQuery = query.toLowerCase();
  return pujasData.filter(puja =>
    puja.name.toLowerCase().includes(lowerQuery) ||
    puja.deity.toLowerCase().includes(lowerQuery) ||
    puja.occasion.toLowerCase().includes(lowerQuery) ||
    puja.description.toLowerCase().includes(lowerQuery)
  );
};

export const getAllMaterialsForPuja = (pujaId) => {
  const puja = getPujaById(pujaId);
  if (!puja) return [];
  
  const allMaterials = [];
  Object.keys(puja.materials).forEach(category => {
    puja.materials[category].forEach(item => {
      allMaterials.push({ category, item });
    });
  });
  return allMaterials;
};

export default pujasData;
