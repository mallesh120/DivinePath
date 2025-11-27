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
        mantra: {
          sanskrit: 'ॐ गं गणपतये नमः',
          transliteration: 'Om Gam Ganapataye Namaha',
          meaning: 'Salutations to Lord Ganesha, the remover of obstacles',
          repetitions: 11
        }
      },
      {
        stepNumber: 3,
        title: 'Offering Water (Achamana)',
        description: 'Offer water three times to Lord Ganesha by sprinkling it with a spoon or your right hand. This purifies the deity.',
        duration: '2 minutes',
        image: null,
        tips: ['Use clean water', 'Sprinkle gently around the idol'],
        mantra: {
          sanskrit: 'ॐ अच्युताय नमः । ॐ अनन्ताय नमः । ॐ गोविन्दाय नमः',
          transliteration: 'Om Achyutaya Namaha, Om Anantaya Namaha, Om Govindaya Namaha',
          meaning: 'Salutations to the infallible one, salutations to the infinite one, salutations to the protector of all',
          repetitions: 3
        }
      },
      {
        stepNumber: 4,
        title: 'Applying Kumkum and Chandan',
        description: 'Apply kumkum (red vermillion) and chandan (sandalwood paste) to the forehead of Lord Ganesha. Offer haldi and kumkum.',
        duration: '3 minutes',
        image: null,
        tips: ['Apply with ring finger', 'Use fresh kumkum and chandan'],
        mantra: {
          sanskrit: 'ॐ गणाध्यक्षाय नमः',
          transliteration: 'Om Ganadhyakshaya Namaha',
          meaning: 'Salutations to the Lord of all groups and assemblies',
          repetitions: 1
        }
      },
      {
        stepNumber: 5,
        title: 'Offering Flowers',
        description: 'Offer red hibiscus flowers one by one to Lord Ganesha while chanting his names. Offer durva grass (sacred grass) in bunches of 3, 5, or 21.',
        duration: '5 minutes',
        image: null,
        tips: ['Offer flowers at the feet of the deity', 'Durva grass is very auspicious for Ganesha'],
        mantra: {
          sanskrit: 'ॐ वक्रतुण्डाय नमः । ॐ एकदन्ताय नमः । ॐ लम्बोदराय नमः',
          transliteration: 'Om Vakratundaya Namaha, Om Ekadantaya Namaha, Om Lambhodaraya Namaha',
          meaning: 'Salutations to the curved-trunk Lord, salutations to the one-tusked Lord, salutations to the large-bellied Lord',
          repetitions: 21
        }
      },
      {
        stepNumber: 6,
        title: 'Offering Food (Naivedya)',
        description: 'Offer modaks, ladoos, fruits, and other sweets to Lord Ganesha. Place them in front of the deity and offer with devotion.',
        duration: '3 minutes',
        image: null,
        tips: ['Modak is Ganesha\'s favorite', 'Offer with both hands'],
        mantra: {
          sanskrit: 'ॐ गजाननाय नमः',
          transliteration: 'Om Gajananaya Namaha',
          meaning: 'Salutations to the elephant-faced Lord',
          repetitions: 1
        }
      },
      {
        stepNumber: 7,
        title: 'Aarti',
        description: 'Perform aarti by circling the lit camphor or ghee lamp in front of Lord Ganesha in a clockwise direction. Ring the bell continuously.',
        duration: '5 minutes',
        image: null,
        tips: ['Perform 3, 5, or 7 circles', 'Sing or play Ganesha Aarti'],
        mantra: {
          sanskrit: 'जय गणेश जय गणेश जय गणेश देवा। माता जाकी पार्वती पिता महादेवा॥',
          transliteration: 'Jai Ganesh Jai Ganesh Jai Ganesh Deva, Mata Jaki Parvati Pita Mahadeva',
          meaning: 'Victory to Lord Ganesha, whose mother is Parvati and father is Mahadeva (Shiva)',
          repetitions: 'Duration of aarti'
        }
      },
      {
        stepNumber: 8,
        title: 'Pushpanjali and Prayers',
        description: 'Offer flowers with folded hands and recite Ganesha mantras or prayers. Ask for his blessings and express your wishes.',
        duration: '5 minutes',
        image: null,
        tips: ['Speak from your heart', 'Express gratitude'],
        mantra: {
          sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
          transliteration: 'Vakratunda Mahakaya Suryakoti Samaprabha, Nirvighnam Kuru Me Deva Sarva Karyeshu Sarvada',
          meaning: 'O Lord with curved trunk and massive body, brilliant as millions of suns, please remove all obstacles from my endeavors always',
          repetitions: 1
        }
      },
      {
        stepNumber: 9,
        title: 'Pradakshina (Circumambulation)',
        description: 'Walk around the deity in a clockwise direction 3 times, or perform mental pradakshina if space is limited.',
        duration: '2 minutes',
        image: null,
        tips: ['Keep deity to your right', 'Maintain reverence'],
        mantra: {
          sanskrit: 'ॐ गं गणपतये नमः',
          transliteration: 'Om Gam Ganapataye Namaha',
          meaning: 'Salutations to Lord Ganesha',
          repetitions: 3
        }
      },
      {
        stepNumber: 10,
        title: 'Conclusion and Prasad',
        description: 'Seek forgiveness for any mistakes during the puja. Distribute the prasad (blessed food) to family members and accept it as divine blessing.',
        duration: '3 minutes',
        image: null,
        tips: ['Share prasad with everyone', 'Keep some for yourself'],
        mantra: {
          sanskrit: 'ॐ क्षमा प्रार्थना । ॐ गजाननाय नमः',
          transliteration: 'Om Kshama Prarthana, Om Gajananaya Namaha',
          meaning: 'O Lord, please forgive any errors in this worship. Salutations to the elephant-faced Lord',
          repetitions: 1
        }
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
        mantra: {
          sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
          transliteration: 'Om Shreem Mahalakshmyai Namaha',
          meaning: 'Salutations to Goddess Mahalakshmi, the great goddess of wealth and prosperity',
          repetitions: 5
        }
      },
      {
        stepNumber: 4,
        title: 'Ganesh Puja',
        description: 'First worship Lord Ganesha for obstacle removal. Offer flowers, kumkum, and chandan to Ganesha.',
        duration: '5 minutes',
        tips: ['Always invoke Ganesha first', 'Offer modak if available'],
        mantra: {
          sanskrit: 'ॐ गं गणपतये नमः',
          transliteration: 'Om Gam Ganapataye Namaha',
          meaning: 'Salutations to Lord Ganesha, the remover of obstacles',
          repetitions: 11
        }
      },
      {
        stepNumber: 5,
        title: 'Lakshmi Invocation',
        description: 'Invoke Goddess Lakshmi by chanting her mantras. Invite her to be present and bless your home.',
        duration: '5 minutes',
        tips: ['Visualize golden light', 'Feel her divine presence'],
        mantra: {
          sanskrit: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद',
          transliteration: 'Om Shreem Hreem Shreem Kamale Kamalalaye Prasida Prasida',
          meaning: 'O Goddess Lakshmi who resides in the lotus, please be pleased and grant your blessings',
          repetitions: 11
        }
      },
      {
        stepNumber: 6,
        title: 'Panchamrit Abhishekam',
        description: 'Perform abhishekam (ritual bathing) of Lakshmi idol with panchamrit. Gently pour panchamrit over the idol.',
        duration: '5 minutes',
        tips: ['Perform only if you have a metal idol', 'Wipe gently with clean cloth after'],
        mantra: {
          sanskrit: 'ॐ महालक्ष्म्यै नमः',
          transliteration: 'Om Mahalakshmyai Namaha',
          meaning: 'Salutations to the great Goddess Lakshmi',
          repetitions: 5
        }
      },
      {
        stepNumber: 7,
        title: 'Offering Kumkum and Flowers',
        description: 'Apply kumkum and chandan. Offer lotus flowers or red/yellow flowers while chanting Lakshmi\'s 108 names or mantras.',
        duration: '8 minutes',
        tips: ['Offer flowers with devotion', 'Red and yellow are auspicious colors for Lakshmi'],
        mantra: {
          sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
          transliteration: 'Om Shreem Mahalakshmyai Namaha',
          meaning: 'Salutations to Goddess Mahalakshmi',
          repetitions: 108
        }
      },
      {
        stepNumber: 8,
        title: 'Naivedya (Food Offering)',
        description: 'Offer kheer, fruits, sweets, and other food items to the goddess. Sprinkle water around the offerings.',
        duration: '5 minutes',
        tips: ['Offer with love and devotion', 'Include variety of sweets'],
        mantra: {
          sanskrit: 'ॐ अन्नपूर्णायै नमः',
          transliteration: 'Om Annapurnayai Namaha',
          meaning: 'Salutations to Goddess Annapurna, the provider of nourishment',
          repetitions: 1
        }
      },
      {
        stepNumber: 9,
        title: 'Lakshmi Aarti',
        description: 'Perform aarti with camphor or ghee lamp. Sing Lakshmi Aarti while ringing the bell. Circle the lamp in clockwise direction.',
        duration: '7 minutes',
        tips: ['Sing or play recorded aarti', 'Family members can join'],
        mantra: {
          sanskrit: 'ॐ जय लक्ष्मी माता। मैया जय लक्ष्मी माता॥',
          transliteration: 'Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata',
          meaning: 'Victory to Mother Lakshmi, O Divine Mother Lakshmi',
          repetitions: 'Duration of aarti'
        }
      },
      {
        stepNumber: 10,
        title: 'Pushpanjali and Prayers',
        description: 'Offer flowers with folded hands. Pray for prosperity, health, and happiness for your family.',
        duration: '3 minutes',
        tips: ['Pray from heart', 'Include wishes for others too'],
        mantra: {
          sanskrit: 'महालक्ष्मी अष्टकम्',
          transliteration: 'Mahalakshmi Ashtakam or personal prayers',
          meaning: 'Eight verses in praise of Goddess Mahalakshmi',
          repetitions: 1
        }
      },
      {
        stepNumber: 11,
        title: 'Touch Account Books/Wallet',
        description: 'Place your account books, business records, or wallet at Lakshmi\'s feet for blessings. Touch them to the idol.',
        duration: '2 minutes',
        tips: ['Symbolic gesture for business prosperity', 'Keep them overnight if possible'],
        mantra: {
          sanskrit: 'ॐ श्रीं ह्रीं श्रीं',
          transliteration: 'Om Shreem Hreem Shreem',
          meaning: 'Sacred beej mantras for prosperity and divine energy',
          repetitions: 3
        }
      },
      {
        stepNumber: 12,
        title: 'Conclusion and Prasad',
        description: 'Seek forgiveness for errors. Distribute prasad. Keep the lamps lit as long as possible. Ideally keep them burning till late night.',
        duration: '5 minutes',
        tips: ['Share prasad with all', 'Keep altar clean'],
        mantra: {
          sanskrit: 'ॐ शान्ति शान्ति शान्तिः',
          transliteration: 'Om Shanti Shanti Shanti',
          meaning: 'Om Peace Peace Peace - May peace prevail',
          repetitions: 3
        }
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
        mantra: {
          sanskrit: 'ॐ वरुणाय नमः',
          transliteration: 'Om Varunaaya Namaha',
          meaning: 'Salutations to Lord Varuna, the deity of water',
          repetitions: 1
        }
      },
      {
        stepNumber: 3,
        title: 'Ganesh Puja',
        description: 'Invoke Lord Ganesha first. Offer flowers, kumkum, and prayers for obstacle-free puja.',
        duration: '5 minutes',
        tips: ['Always begin with Ganesha worship', 'Keep it brief'],
        mantra: {
          sanskrit: 'ॐ गं गणपतये नमः',
          transliteration: 'Om Gam Ganapataye Namaha',
          meaning: 'Salutations to Lord Ganesha',
          repetitions: 11
        }
      },
      {
        stepNumber: 4,
        title: 'Sankalp (Taking Vow)',
        description: 'Take water in your right hand, state your name, gotra (if known), and purpose of the puja. Make your intention clear.',
        duration: '3 minutes',
        tips: ['State your wish clearly', 'Speak with conviction'],
        mantra: {
          sanskrit: 'सङ्कल्प मन्त्र',
          transliteration: 'Sankalp mantra as per tradition',
          meaning: 'I take this vow to perform Satyanarayan Puja for [state purpose]',
          repetitions: 1
        }
      },
      {
        stepNumber: 5,
        title: 'Satyanarayan Invocation',
        description: 'Invoke Lord Satyanarayan by chanting mantras. Place the idol or picture and offer your respects.',
        duration: '5 minutes',
        tips: ['Visualize Lord Vishnu', 'Feel divine presence'],
        mantra: {
          sanskrit: 'ॐ नमो भगवते वासुदेवाय',
          transliteration: 'Om Namo Bhagavate Vasudevaya',
          meaning: 'Salutations to Lord Vasudeva (Vishnu), the Supreme Being',
          repetitions: 108
        }
      },
      {
        stepNumber: 6,
        title: 'Shodashopachar Puja',
        description: 'Perform 16-step worship including offering water, flowers, kumkum, chandan, clothes, sacred thread, incense, lamp, and food.',
        duration: '20 minutes',
        tips: ['Follow traditional sequence', 'Offer each item with mantra'],
        mantra: {
          sanskrit: 'विविध उपचार मन्त्र',
          transliteration: 'Various mantras for each of the 16 offerings',
          meaning: 'Specific mantras accompany each offering in the traditional 16-step worship',
          repetitions: 'One for each offering'
        }
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
        mantra: {
          sanskrit: 'ॐ नमो नारायणाय',
          transliteration: 'Om Namo Narayanaya',
          meaning: 'Salutations to Lord Narayana (Vishnu)',
          repetitions: 'While preparing'
        }
      },
      {
        stepNumber: 9,
        title: 'Offering Prasad',
        description: 'After Katha, offer the prepared prasad to Lord Satyanarayan. Place it in front of the deity with devotion.',
        duration: '5 minutes',
        tips: ['Offer with both hands', 'Include fruits and bananas'],
        mantra: {
          sanskrit: 'ॐ सत्यनारायणाय नमः',
          transliteration: 'Om Satyanarayanaya Namaha',
          meaning: 'Salutations to Lord Satyanarayan, the embodiment of truth',
          repetitions: 1
        }
      },
      {
        stepNumber: 10,
        title: 'Aarti',
        description: 'Perform aarti with ghee lamp and camphor. Sing Satyanarayan Aarti while ringing the bell.',
        duration: '10 minutes',
        tips: ['Everyone should stand for aarti', 'Sing with devotion'],
        mantra: {
          sanskrit: 'जय लक्ष्मी रमणा',
          transliteration: 'Jai Lakshmi Ramana (Vishnu Aarti)',
          meaning: 'Victory to the consort of Lakshmi (Lord Vishnu)',
          repetitions: 'Duration of aarti'
        }
      },
      {
        stepNumber: 11,
        title: 'Pradakshina and Pranam',
        description: 'Perform pradakshina (circumambulation) and bow down to seek blessings.',
        duration: '5 minutes',
        tips: ['Circle 3 times clockwise', 'Touch feet of deity if idol'],
        mantra: {
          sanskrit: 'ॐ नमो नारायणाय',
          transliteration: 'Om Namo Narayanaya',
          meaning: 'Salutations to Lord Narayana',
          repetitions: 3
        }
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
  },

  {
    id: 'diwali-puja',
    name: 'Diwali Lakshmi Puja',
    deity: 'Goddess Lakshmi & Lord Ganesha',
    deityImage: 'lakshmi-ganesha.jpg',
    category: pujaCategories.FESTIVAL,
    difficulty: difficultyLevels.INTERMEDIATE,
    duration: '1-1.5 hours',
    occasion: 'Diwali festival (Kartik Amavasya)',
    bestTime: 'Evening during Pradosh Kaal (after sunset)',
    description: 'Diwali Puja is the most important ritual of Diwali, performed on Amavasya to welcome Goddess Lakshmi and Lord Ganesha for prosperity and good fortune.',
    
    benefits: [
      'Attracts wealth and prosperity',
      'Brings peace and harmony to home',
      'Removes poverty and financial troubles',
      'Ensures divine blessings for the coming year',
      'Brings success in business and career'
    ],

    materials: {
      deity: [
        'Lakshmi and Ganesha idols or pictures',
        'Red or yellow cloth',
        'Kalash with mango leaves and coconut',
        'Platform/chowki'
      ],
      flowers: [
        'Lotus flowers (fresh)',
        'Marigold flowers',
        'Rose petals',
        'Tulsi leaves',
        'Flower garlands'
      ],
      offerings: [
        'Kheer (rice pudding)',
        'Ladoo and other sweets',
        'Dry fruits and nuts',
        'Fresh fruits',
        'Panchamrit',
        'Betel leaves and nuts',
        'Coins and currency notes'
      ],
      puja_items: [
        'Ghee diyas (at least 21)',
        'Incense sticks',
        'Camphor',
        'Kumkum and haldi',
        'Chandan',
        'Akshat',
        'Holy water',
        'Bell',
        'Aarti plate',
        'Rangoli colors'
      ],
      additional: [
        'New broom (for Lakshmi)',
        'Account books/wallet',
        'Silver coins',
        'Clean white/red cloth'
      ]
    },

    steps: [
      {
        stepNumber: 1,
        title: 'Cleaning and Preparation',
        description: 'Clean entire house thoroughly. Create rangoli at entrance. Take bath and wear new/clean clothes. Light diyas throughout house.',
        duration: '30 minutes',
        tips: ['Open all doors and windows', 'Keep entrance well-lit', 'Remove old items'],
        mantra: null
      },
      {
        stepNumber: 2,
        title: 'Setup Altar and Kalash',
        description: 'Set up the altar facing north or east. Place kalash with mango leaves and coconut. Arrange Lakshmi and Ganesha idols. Place coins near Lakshmi.',
        duration: '10 minutes',
        tips: ['Use red cloth for Lakshmi', 'Place Ganesha on left', 'Keep account books nearby'],
        mantra: null
      },
      {
        stepNumber: 3,
        title: 'Light Lamps',
        description: 'Light at least 21 ghee diyas around the house and puja area. The more lamps, the better for attracting Lakshmi.',
        duration: '10 minutes',
        tips: ['Use pure ghee', 'Light lamps in all rooms', 'Keep lamps burning all night'],
        mantra: {
          sanskrit: 'ॐ दीपज्योति परब्रह्म',
          transliteration: 'Om Deepajyoti Parabrahma',
          meaning: 'The light of the lamp is the Supreme Brahman',
          repetitions: 1
        }
      },
      {
        stepNumber: 4,
        title: 'Ganesh Puja',
        description: 'First worship Lord Ganesha. Offer flowers, kumkum, and modak. Seek blessings for obstacle-free puja.',
        duration: '5 minutes',
        tips: ['Always begin with Ganesha', 'Offer his favorite modak'],
        mantra: {
          sanskrit: 'ॐ गं गणपतये नमः',
          transliteration: 'Om Gam Ganapataye Namaha',
          meaning: 'Salutations to Lord Ganesha',
          repetitions: 11
        }
      },
      {
        stepNumber: 5,
        title: 'Lakshmi Invocation',
        description: 'Invoke Goddess Lakshmi with mantras. Visualize her arriving in golden light. Welcome her to your home.',
        duration: '5 minutes',
        tips: ['Feel her presence', 'Keep attitude of devotion', 'Open doors for her entry'],
        mantra: {
          sanskrit: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद। श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः',
          transliteration: 'Om Shreem Hreem Shreem Kamale Kamalalaye Prasida Prasida, Shreem Hreem Shreem Om Mahalakshmyai Namaha',
          meaning: 'O Goddess who resides in lotus, please be pleased and grant your presence and blessings',
          repetitions: 11
        }
      },
      {
        stepNumber: 6,
        title: 'Lakshmi Puja',
        description: 'Perform detailed worship of Goddess Lakshmi. Apply kumkum and chandan. Offer flowers, especially lotus.',
        duration: '10 minutes',
        tips: ['Offer yellow/red flowers', 'Chant Lakshmi mantras', 'Offer with devotion'],
        mantra: {
          sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
          transliteration: 'Om Shreem Mahalakshmyai Namaha',
          meaning: 'Salutations to Goddess Mahalakshmi',
          repetitions: 108
        }
      },
      {
        stepNumber: 7,
        title: 'Offering Bhog',
        description: 'Offer kheer, sweets, fruits, and other food items. Sprinkle water to purify. Offer to both Lakshmi and Ganesha.',
        duration: '5 minutes',
        tips: ['Offer variety of sweets', 'Include dry fruits', 'Offer with love'],
        mantra: {
          sanskrit: 'ॐ अन्नपूर्णे सदापूर्णे शङ्करप्राणवल्लभे। ज्ञानवैराग्यसिद्ध्यर्थं भिक्षां देहि च पार्वति॥',
          transliteration: 'Om Annapurne Sadapurne Shankara Pranavallabhe, Jnana Vairagya Siddhyartham Bhiksham Dehi Cha Parvati',
          meaning: 'O Annapurna, always full, beloved of Shankara, grant me alms for knowledge and detachment, O Parvati',
          repetitions: 1
        }
      },
      {
        stepNumber: 8,
        title: 'Lakshmi Aarti',
        description: 'Perform aarti with ghee lamp and camphor. Sing "Om Jai Lakshmi Mata". Ring bell throughout.',
        duration: '10 minutes',
        tips: ['Family members join', 'Sing with devotion', 'Circle lamp clockwise'],
        mantra: {
          sanskrit: 'ॐ जय लक्ष्मी माता। मैया जय लक्ष्मी माता। तुमको निशदिन सेवत। हर विष्णु विधाता॥',
          transliteration: 'Om Jai Lakshmi Mata, Maiya Jai Lakshmi Mata, Tumko Nish Din Sevat, Har Vishnu Vidhata',
          meaning: 'Victory to Mother Lakshmi, whom Vishnu and all gods serve day and night',
          repetitions: 'Duration of aarti'
        }
      },
      {
        stepNumber: 9,
        title: 'Worship of Wealth',
        description: 'Place account books, business documents, wallet, and gold/silver items at Lakshmi\'s feet for blessings.',
        duration: '5 minutes',
        tips: ['Touch items to idol', 'Seek business prosperity', 'Keep overnight if possible'],
        mantra: {
          sanskrit: 'ॐ श्रीं ह्रीं क्लीं महालक्ष्म्यै नमः',
          transliteration: 'Om Shreem Hreem Kleem Mahalakshmyai Namaha',
          meaning: 'Salutations to Goddess Mahalakshmi with seed mantras of prosperity',
          repetitions: 21
        }
      },
      {
        stepNumber: 10,
        title: 'Prasad Distribution',
        description: 'Distribute prasad to family and guests. Share the blessings of Lakshmi with everyone.',
        duration: '10 minutes',
        tips: ['Give to all present', 'Share with neighbors', 'Eat with reverence'],
        mantra: {
          sanskrit: 'ॐ शान्ति शान्ति शान्तिः',
          transliteration: 'Om Shanti Shanti Shanti',
          meaning: 'Om Peace Peace Peace',
          repetitions: 3
        }
      }
    ],

    mantras: [
      {
        name: 'Mahalakshmi Ashtakam',
        sanskrit: 'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते। शङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥',
        transliteration: 'Namaste\'stu Mahamaye Shripithe Surapujite, Shankhachakra Gadahaste Mahalakshmi Namo\'stu Te',
        meaning: 'Salutations to you O Mahamaya, seated on the divine seat, worshipped by gods, holding conch, disc and mace, salutations to Mahalakshmi',
        repetitions: 8
      },
      {
        name: 'Lakshmi Beej Mantra',
        sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
        transliteration: 'Om Shreem Mahalakshmyai Namaha',
        meaning: 'Salutations to Goddess Mahalakshmi',
        repetitions: 108
      }
    ],

    tips: [
      'Diwali puja should be performed during Pradosh Kaal on Amavasya',
      'Keep maximum lamps lit - symbolizes welcoming Lakshmi',
      'Wear new clothes, preferably red, yellow or white',
      'Keep doors and windows open during puja',
      'Never let the main diya extinguish throughout the night',
      'Distribute sweets and meet relatives after puja',
      'Play gambling or business games after puja (tradition for prosperity)'
    ],

    panchangamGuidance: {
      avoidDays: ['Perform only on Diwali Amavasya'],
      bestDays: ['Kartik Amavasya (Diwali night)', 'During Pradosh Kaal'],
      bestNakshatra: ['Any nakshatra on Diwali is auspicious']
    },

    videoTutorial: null,
    pdfGuide: null
  },

  {
    id: 'durga-puja',
    name: 'Durga Puja (Navaratri)',
    deity: 'Goddess Durga',
    deityImage: 'durga.jpg',
    category: pujaCategories.FESTIVAL,
    difficulty: difficultyLevels.INTERMEDIATE,
    duration: '45-60 minutes per day',
    occasion: 'Navaratri - Nine days of Goddess worship',
    bestTime: 'Morning or evening during Navaratri',
    description: 'Durga Puja during Navaratri celebrates the nine forms of Goddess Durga. Performed for nine days to invoke her divine shakti and seek protection.',
    
    benefits: [
      'Destroys evil and negativity',
      'Grants strength and courage',
      'Protects from enemies and dangers',
      'Brings victory in all endeavors',
      'Fulfills desires and wishes'
    ],

    materials: {
      deity: [
        'Durga idol or picture',
        'Kalash with mango leaves',
        'Red cloth',
        'Platform'
      ],
      flowers: [
        'Red hibiscus flowers',
        'Marigold',
        'Lotus',
        'Jasmine',
        'Bilva leaves'
      ],
      offerings: [
        'Panchamrit',
        'Sweets (especially jaggery-based)',
        'Fruits (banana, apple, pomegranate)',
        'Coconut',
        'Betel leaves and nuts'
      ],
      puja_items: [
        'Ghee lamp',
        'Incense sticks',
        'Camphor',
        'Kumkum and haldi',
        'Chandan',
        'Akshat',
        'Holy water',
        'Bell',
        'Durga Saptashati book'
      ]
    },

    steps: [
      {
        stepNumber: 1,
        title: 'Purification',
        description: 'Take bath and wear clean clothes. Clean puja area. Light lamp and incense.',
        duration: '5 minutes',
        tips: ['Wear red/yellow colors', 'Face east', 'Keep area pure'],
        mantra: null
      },
      {
        stepNumber: 2,
        title: 'Kalash Sthapana',
        description: 'Establish kalash with water, mango leaves, and coconut. This represents the presence of Goddess.',
        duration: '5 minutes',
        tips: ['Tie red thread around kalash', 'Place on rice mound'],
        mantra: {
          sanskrit: 'ॐ गङ्गे च यमुने चैव गोदावरी सरस्वती। नर्मदे सिन्धु कावेरी जलेऽस्मिन् संनिधिं कुरु॥',
          transliteration: 'Om Gange Cha Yamune Chaiva Godavari Sarasvati, Narmade Sindhu Kaveri Jale\'smin Sannidhim Kuru',
          meaning: 'O sacred rivers Ganga, Yamuna, Godavari, Saraswati, Narmada, Sindhu and Kaveri, please be present in this water',
          repetitions: 1
        }
      },
      {
        stepNumber: 3,
        title: 'Ganesha Puja',
        description: 'Invoke Lord Ganesha first for obstacle-free worship.',
        duration: '3 minutes',
        tips: ['Brief but essential', 'Offer flowers'],
        mantra: {
          sanskrit: 'ॐ गं गणपतये नमः',
          transliteration: 'Om Gam Ganapataye Namaha',
          meaning: 'Salutations to Lord Ganesha',
          repetitions: 5
        }
      },
      {
        stepNumber: 4,
        title: 'Durga Invocation',
        description: 'Invoke Goddess Durga by chanting her mantras. Visualize her divine form with ten arms riding a lion.',
        duration: '5 minutes',
        tips: ['Meditate on her form', 'Feel divine presence'],
        mantra: {
          sanskrit: 'ॐ दुं दुर्गायै नमः',
          transliteration: 'Om Dum Durgayai Namaha',
          meaning: 'Salutations to Goddess Durga',
          repetitions: 108
        }
      },
      {
        stepNumber: 5,
        title: 'Abhishekam',
        description: 'If idol present, perform abhishekam with panchamrit. Otherwise, offer symbolically.',
        duration: '5 minutes',
        tips: ['Pour gently', 'Clean idol after'],
        mantra: {
          sanskrit: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे',
          transliteration: 'Om Aim Hreem Kleem Chamundayai Vichche',
          meaning: 'Salutations to Goddess Chamunda with seed mantras',
          repetitions: 3
        }
      },
      {
        stepNumber: 6,
        title: 'Offering Flowers',
        description: 'Offer red flowers (hibiscus preferred) to Goddess. Offer one flower for each name while chanting 108 names.',
        duration: '10 minutes',
        tips: ['Red hibiscus is most auspicious', 'Offer with devotion'],
        mantra: {
          sanskrit: 'ॐ दुर्गायै नमः',
          transliteration: 'Om Durgayai Namaha (with each name)',
          meaning: 'Salutations to Goddess Durga',
          repetitions: 108
        }
      },
      {
        stepNumber: 7,
        title: 'Reading Durga Saptashati',
        description: 'Read or listen to portions from Durga Saptashati (700 verses). Even a few chapters bring immense benefits.',
        duration: '15-20 minutes',
        tips: ['Read with pronunciation guide', 'Even listening is beneficial', 'Can read in parts'],
        mantra: null
      },
      {
        stepNumber: 8,
        title: 'Offering Bhog',
        description: 'Offer sweets, fruits, and food to the Goddess. Traditional offerings include kheer, halwa, and prasad.',
        duration: '5 minutes',
        tips: ['Include jaggery items', 'Offer seasonal fruits'],
        mantra: {
          sanskrit: 'ॐ महागौर्यै नमः',
          transliteration: 'Om Mahagauryai Namaha',
          meaning: 'Salutations to the Great White Goddess (Mahagauri)',
          repetitions: 1
        }
      },
      {
        stepNumber: 9,
        title: 'Durga Aarti',
        description: 'Perform aarti with ghee lamp. Sing Durga Aarti while ringing bell.',
        duration: '7 minutes',
        tips: ['Stand for aarti', 'Family members join', 'Circle lamp clockwise'],
        mantra: {
          sanskrit: 'जय अम्बे गौरी मैया जय श्यामा गौरी। तुमको निशदिन ध्यावत हरि ब्रह्मा शिव री॥',
          transliteration: 'Jai Ambe Gauri Maiya Jai Shyama Gauri, Tumko Nishdin Dhyavat Hari Brahma Shiv Ri',
          meaning: 'Victory to Mother Ambe Gauri, whom Hari, Brahma and Shiva meditate upon day and night',
          repetitions: 'Duration of aarti'
        }
      },
      {
        stepNumber: 10,
        title: 'Conclusion and Prasad',
        description: 'Seek blessings and forgiveness. Distribute prasad to all.',
        duration: '5 minutes',
        tips: ['Share prasad', 'Keep some for fasting devotees'],
        mantra: {
          sanskrit: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
          transliteration: 'Ya Devi Sarvabhuteshu Shaktirupena Samsthita, Namastasyai Namastasyai Namastasyai Namo Namaha',
          meaning: 'Salutations again and again to the Goddess who resides in all beings in the form of power',
          repetitions: 3
        }
      }
    ],

    mantras: [
      {
        name: 'Durga Beej Mantra',
        sanskrit: 'ॐ दुं दुर्गायै नमः',
        transliteration: 'Om Dum Durgayai Namaha',
        meaning: 'Salutations to Goddess Durga',
        repetitions: 108
      },
      {
        name: 'Navarna Mantra',
        sanskrit: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे',
        transliteration: 'Om Aim Hreem Kleem Chamundayai Vichche',
        meaning: 'The nine-syllable mantra invoking Goddess Chamunda',
        repetitions: 108
      }
    ],

    tips: [
      'Perform puja to different Navadurga forms on each day',
      'Fasting during nine days brings maximum benefits',
      'Red color is most auspicious for Durga',
      'Kumari puja on 8th or 9th day is highly recommended',
      'Read at least one chapter of Durga Saptashati daily',
      'Maintain celibacy and purity during nine days'
    ],

    panchangamGuidance: {
      avoidDays: ['None during Navaratri - all nine days are auspicious'],
      bestDays: ['All nine days of Navaratri', 'First day (Ghatasthapana)', '8th day (Maha Ashtami)', '9th day (Maha Navami)'],
      bestNakshatra: ['Any during Navaratri period']
    },

    videoTutorial: null,
    pdfGuide: null
  },

  {
    id: 'shivaratri-puja',
    name: 'Maha Shivaratri Puja',
    deity: 'Lord Shiva',
    deityImage: 'shiva.jpg',
    category: pujaCategories.FESTIVAL,
    difficulty: difficultyLevels.INTERMEDIATE,
    duration: '1-2 hours (performed 4 times during night)',
    occasion: 'Maha Shivaratri - Great Night of Shiva',
    bestTime: 'Four prahar during Shivaratri night',
    description: 'Maha Shivaratri is the most auspicious night for Lord Shiva worship. Devotees stay awake all night, performing abhishekam and chanting mantras.',
    
    benefits: [
      'Liberation from sins and past karma',
      'Spiritual enlightenment',
      'Blessing for marriage seekers',
      'Destroys ego and negativity',
      'Grants moksha (liberation)'
    ],

    materials: {
      deity: [
        'Shiva Lingam',
        'Shiva photo/idol',
        'Platform for lingam'
      ],
      flowers: [
        'Bel (bilva) leaves - most essential',
        'Datura flowers',
        'White flowers',
        'Lotus'
      ],
      offerings: [
        'Milk',
        'Yogurt',
        'Honey',
        'Ghee',
        'Sugar/jaggery',
        'Fruits (especially ber)',
        'Bhang/thandai (traditional)',
        'Dry fruits'
      ],
      puja_items: [
        'Ghee lamp',
        'Incense',
        'Camphor',
        'White sandalwood paste',
        'Kumkum',
        'Akshat',
        'Holy water from Ganga',
        'Bell',
        'Rudraksha mala',
        'Vibhuti (sacred ash)'
      ]
    },

    steps: [
      {
        stepNumber: 1,
        title: 'Fasting and Preparation',
        description: 'Observe complete fast or fruit fast. Take bath before starting puja. Wear white or saffron clothes.',
        duration: '10 minutes',
        tips: ['Complete fast is most beneficial', 'Stay awake entire night', 'Maintain celibacy'],
        mantra: null
      },
      {
        stepNumber: 2,
        title: 'Sankalp',
        description: 'Take water in right palm and make resolution for performing Shivaratri vrat and puja.',
        duration: '3 minutes',
        tips: ['State your name and gotra', 'Express sincere intention'],
        mantra: {
          sanskrit: 'ॐ तत्सत् अद्य महाशिवरात्रौ व्रतं करिष्ये',
          transliteration: 'Om Tat Sat, Adya Mahashivaratrau Vratam Karishye',
          meaning: 'Today on Maha Shivaratri I will observe the sacred vow',
          repetitions: 1
        }
      },
      {
        stepNumber: 3,
        title: 'Dhyana (Meditation)',
        description: 'Meditate on Lord Shiva in his cosmic form. Visualize him with trident, snake, and crescent moon.',
        duration: '5-10 minutes',
        tips: ['Close eyes', 'Focus on third eye', 'Feel divine presence'],
        mantra: {
          sanskrit: 'ॐ नमः शिवाय',
          transliteration: 'Om Namah Shivaya',
          meaning: 'Salutations to Lord Shiva',
          repetitions: 108
        }
      },
      {
        stepNumber: 4,
        title: 'Rudra Abhishekam - First Prahar',
        description: 'Perform abhishekam with milk while chanting Rudram. Pour milk over Shiva Lingam in continuous stream.',
        duration: '15 minutes',
        tips: ['Pour from height', 'Continuous stream', 'Chant mantras'],
        mantra: {
          sanskrit: 'ॐ नमो भगवते रुद्राय',
          transliteration: 'Om Namo Bhagavate Rudraya',
          meaning: 'Salutations to Lord Rudra',
          repetitions: 11
        }
      },
      {
        stepNumber: 5,
        title: 'Bilva Patra Offering',
        description: 'Offer bel leaves in sets of three. Each set represents Trinity (Brahma, Vishnu, Shiva) and three eyes of Shiva.',
        duration: '10 minutes',
        tips: ['Use fresh leaves', 'Three leaves per set', 'Offer with devotion'],
        mantra: {
          sanskrit: 'त्रिदलं त्रिगुणाकारं त्रिनेत्रं च त्रयायुधम्। त्रिजन्मपापसंहारं एकबिल्वं शिवार्पणम्॥',
          transliteration: 'Tridalam Trigunaakaram Trinetram Cha Trayayudham, Trijanma Papa Samharam Eka Bilvam Shivarpanam',
          meaning: 'The three-leafed bilva represents the three qualities, three eyes, three weapons - one bilva leaf destroys sins of three births',
          repetitions: 'With each bilva set'
        }
      },
      {
        stepNumber: 6,
        title: 'Second Prahar Abhishekam',
        description: 'Perform abhishekam with yogurt/curd in the second quarter of night.',
        duration: '15 minutes',
        tips: ['Fresh yogurt', 'Repeat mantra chanting'],
        mantra: {
          sanskrit: 'ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि तन्नो रुद्रः प्रचोदयात्',
          transliteration: 'Om Tatpurushaya Vidmahe Mahadevaya Dhimahi Tanno Rudrah Prachodayat',
          meaning: 'We know the Supreme Being, we meditate on the Great God, may Rudra enlighten us',
          repetitions: 11
        }
      },
      {
        stepNumber: 7,
        title: 'Third Prahar Abhishekam',
        description: 'Perform abhishekam with honey in the third quarter. Honey symbolizes sweetness of devotion.',
        duration: '15 minutes',
        tips: ['Pure honey', 'Clean lingam between abhishekams'],
        mantra: {
          sanskrit: 'ॐ नमः शिवाय शान्ताय कारणत्रयहेतवे। निवेदयामि चात्मानं त्वं गतिः परमेश्वर॥',
          transliteration: 'Om Namah Shivaya Shantaya Karana Traya Hetave, Nivedayami Chatmanam Tvam Gatih Parameshvara',
          meaning: 'Salutations to the peaceful Shiva, cause of all causes, I surrender myself to you, O Supreme Lord',
          repetitions: 11
        }
      },
      {
        stepNumber: 8,
        title: 'Fourth Prahar Abhishekam',
        description: 'Perform final abhishekam with ghee. This is the most auspicious prahar before dawn.',
        duration: '15 minutes',
        tips: ['Pure cow ghee', 'Most powerful time', 'Increase mantra chanting'],
        mantra: {
          sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥',
          transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam, Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat',
          meaning: 'We worship the three-eyed one who nourishes all beings; may He liberate us from death for immortality, as a cucumber is severed from its vine',
          repetitions: 11
        }
      },
      {
        stepNumber: 9,
        title: 'Shiva Aarti and Stuti',
        description: 'Perform aarti with camphor. Sing Shiva aarti and stuti (hymns of praise).',
        duration: '10 minutes',
        tips: ['Stand for aarti', 'Ring bell', 'Entire family participates'],
        mantra: {
          sanskrit: 'जय शिव ओंकारा स्वामी जय शिव ओंकारा। ब्रह्मा विष्णु सदाशिव अर्धांगी धारा॥',
          transliteration: 'Jai Shiv Omkara Swami Jai Shiv Omkara, Brahma Vishnu Sadashiva Ardhangadhaara',
          meaning: 'Victory to Lord Shiva, who is Om personified, who has Parvati as his half',
          repetitions: 'Duration of aarti'
        }
      },
      {
        stepNumber: 10,
        title: 'Prasad and Parana',
        description: 'Distribute prasad. Break fast next day after sunrise with proper rituals.',
        duration: '10 minutes',
        tips: ['Break fast next morning', 'Offer prasad to Shiva first', 'Distribute to all'],
        mantra: {
          sanskrit: 'कर्पूरगौरं करुणावतारं संसारसारं भुजगेन्द्रहारम्। सदा वसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥',
          transliteration: 'Karpur Gauram Karunavataram Samsara Saram Bhujagendra Haram, Sada Vasantam Hridayaravinde Bhavam Bhavanisahitam Namami',
          meaning: 'I bow to Lord Shiva who is camphor-white, embodiment of compassion, essence of the world, wears serpent as garland, resides in the lotus of heart with Bhavani',
          repetitions: 3
        }
      }
    ],

    mantras: [
      {
        name: 'Maha Mrityunjaya Mantra',
        sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥',
        transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam, Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat',
        meaning: 'The great death-conquering mantra for protection and liberation',
        repetitions: 108
      },
      {
        name: 'Panchakshari Mantra',
        sanskrit: 'ॐ नमः शिवाय',
        transliteration: 'Om Namah Shivaya',
        meaning: 'The five-syllable mantra - salutations to Shiva',
        repetitions: 'Throughout the night'
      }
    ],

    tips: [
      'Stay awake entire night - sleeping on Shivaratri wastes the opportunity',
      'Perform abhishekam in all four prahars for maximum benefit',
      'Bel leaves are most essential - never skip',
      'Fasting purifies body and mind',
      'Chanting Om Namah Shivaya throughout night brings great merit',
      'Reading Shiva Purana or listening to Shiva stories is beneficial',
      'Visit Shiva temple if possible during night',
      'Maintain celibacy and pure thoughts'
    ],

    panchangamGuidance: {
      avoidDays: ['Perform only on Maha Shivaratri night'],
      bestDays: ['Chaturdashi tithi of Phalguna month (dark fortnight)', 'Night vigil is essential'],
      bestNakshatra: ['Any nakshatra on Shivaratri is auspicious']
    },

    videoTutorial: null,
    pdfGuide: null
  },

  {
    id: 'janmashtami-puja',
    name: 'Janmashtami Puja',
    deity: 'Lord Krishna',
    deityImage: 'krishna.jpg',
    category: pujaCategories.FESTIVAL,
    difficulty: difficultyLevels.INTERMEDIATE,
    duration: '1-1.5 hours',
    occasion: 'Krishna Janmashtami - Birth of Lord Krishna',
    bestTime: 'Midnight (Nishita Kaal - around 12 AM)',
    description: 'Janmashtami celebrates the birth of Lord Krishna at midnight. Devotees fast during day and perform puja at midnight with great devotion.',
    
    benefits: [
      'Removes obstacles and difficulties',
      'Brings joy and prosperity',
      'Spiritual wisdom and devotion',
      'Protection from evil forces',
      'Fulfillment of righteous desires'
    ],

    materials: {
      deity: [
        'Krishna idol (baby Krishna or Bal Gopal)',
        'Small cradle (jhula)',
        'Yellow cloth',
        'Peacock feather',
        'Flute'
      ],
      flowers: [
        'Tulsi leaves - most important',
        'Yellow flowers',
        'Rose',
        'Jasmine',
        'Marigold'
      ],
      offerings: [
        'Makhan (white butter)',
        'Mishri (rock sugar)',
        'Panchamrit',
        'Chhappan Bhog (56 items if possible)',
        'Dry fruits',
        'Fruits (especially banana)',
        'Milk',
        'Panjiri'
      ],
      puja_items: [
        'Ghee lamp',
        'Incense',
        'Camphor',
        'Chandan',
        'Kumkum',
        'Akshat',
        'Holy water',
        'Bell',
        'Conch',
        'Bhagavad Gita'
      ]
    },

    steps: [
      {
        stepNumber: 1,
        title: 'Fasting and Preparation',
        description: 'Observe fast during day. Take bath before midnight puja. Decorate puja area and cradle.',
        duration: '15 minutes',
        tips: ['Fast broken only after midnight puja', 'Yellow decorations', 'Prepare 56 or 108 items for bhog'],
        mantra: null
      },
      {
        stepNumber: 2,
        title: 'Sankalp',
        description: 'Make resolution to perform Janmashtami vrat and puja with devotion.',
        duration: '3 minutes',
        tips: ['State your intention', 'Pray for devotion'],
        mantra: {
          sanskrit: 'ॐ श्री कृष्णाय नमः। अद्य श्री कृष्ण जन्माष्टमी व्रतं करिष्ये',
          transliteration: 'Om Shri Krishnaya Namaha, Adya Shri Krishna Janmashtami Vratam Karishye',
          meaning: 'Salutations to Lord Krishna, today I will observe the Janmashtami vow',
          repetitions: 1
        }
      },
      {
        stepNumber: 3,
        title: 'Krishna Dhyana',
        description: 'Meditate on Lord Krishna as a divine child. Visualize his enchanting form with peacock feather, flute, and beautiful smile.',
        duration: '5 minutes',
        tips: ['Close eyes', 'Feel divine love', 'Imagine child Krishna'],
        mantra: {
          sanskrit: 'ॐ कृष्णाय वासुदेवाय हरये परमात्मने। प्रणत क्लेशनाशाय गोविन्दाय नमो नमः॥',
          transliteration: 'Om Krishnaya Vasudevaya Haraye Paramatmane, Pranata Klesha Nashaya Govindaya Namo Namaha',
          meaning: 'Salutations to Krishna, son of Vasudeva, destroyer of sorrows, the Supreme Soul, Govinda',
          repetitions: 3
        }
      },
      {
        stepNumber: 4,
        title: 'Ganesha Puja',
        description: 'Brief Ganesha worship for obstacle-free celebration.',
        duration: '3 minutes',
        tips: ['Keep it brief', 'Focus remains on Krishna'],
        mantra: {
          sanskrit: 'ॐ गं गणपतये नमः',
          transliteration: 'Om Gam Ganapataye Namaha',
          meaning: 'Salutations to Lord Ganesha',
          repetitions: 5
        }
      },
      {
        stepNumber: 5,
        title: 'Krishna Abhishekam',
        description: 'At midnight, bathe Krishna idol with panchamrit and water. This represents his birth bath.',
        duration: '10 minutes',
        tips: ['Exactly at midnight', 'Gently bathe baby Krishna', 'Use lukewarm water'],
        mantra: {
          sanskrit: 'ॐ देवकीसुत गोविन्द वासुदेव जगत्पते। देहि मे तनयं कृष्ण त्वामहं शरणं गतः॥',
          transliteration: 'Om Devaki Suta Govinda Vasudeva Jagatpate, Dehi Me Tanayam Krishna Tvamaham Sharanam Gatah',
          meaning: 'O son of Devaki, Govinda, Vasudeva, Lord of universe, I take refuge in you',
          repetitions: 3
        }
      },
      {
        stepNumber: 6,
        title: 'Dressing and Decoration',
        description: 'Dress Krishna idol in new yellow clothes. Place peacock feather and flute. Place in decorated cradle.',
        duration: '5 minutes',
        tips: ['Yellow is auspicious', 'Decorate cradle beautifully', 'Place on soft bedding'],
        mantra: null
      },
      {
        stepNumber: 7,
        title: 'Offering 108 Names',
        description: 'Offer flowers/tulsi while chanting 108 names of Krishna. One offering per name.',
        duration: '15 minutes',
        tips: ['Tulsi leaves preferred', 'Chant with devotion', 'Can use flower petals'],
        mantra: {
          sanskrit: 'ॐ केशवाय नमः, ॐ नारायणाय नमः, ॐ माधवाय नमः...',
          transliteration: 'Om Keshavaya Namaha, Om Narayanaya Namaha, Om Madhavaya Namaha...',
          meaning: 'Salutations to each of the 108 names of Krishna',
          repetitions: 108
        }
      },
      {
        stepNumber: 8,
        title: 'Offering Bhog',
        description: 'Offer Chhappan Bhog (56 items) or as many varieties as possible. Makhan and mishri are essential.',
        duration: '10 minutes',
        tips: ['Include butter and sweets', 'Multiple varieties', 'Offer with love'],
        mantra: {
          sanskrit: 'ॐ श्री कृष्णाय नमः। अन्नं ब्रह्म रसो विष्णुः भोक्ता देवो महेश्वरः',
          transliteration: 'Om Shri Krishnaya Namaha, Annam Brahma Raso Vishnuh Bhokta Devo Maheshvarah',
          meaning: 'Food is Brahma, essence is Vishnu, the enjoyer is Shiva',
          repetitions: 1
        }
      },
      {
        stepNumber: 9,
        title: 'Krishna Aarti and Bhajans',
        description: 'Perform aarti while singing Krishna bhajans. Rock the cradle gently during singing.',
        duration: '15 minutes',
        tips: ['Family sings together', 'Rock cradle lovingly', 'Clap and enjoy'],
        mantra: {
          sanskrit: 'ॐ जय जगदीश हरे स्वामी जय जगदीश हरे। भक्त जनों के संकट दास जनों के संकट क्षण में दूर करे॥',
          transliteration: 'Om Jai Jagadish Hare Swami Jai Jagadish Hare, Bhakta Janon Ke Sankat Das Janon Ke Sankat Kshan Mein Dur Kare',
          meaning: 'Victory to the Lord of the universe who removes devotees\' difficulties in an instant',
          repetitions: 'Duration of aarti'
        }
      },
      {
        stepNumber: 10,
        title: 'Prasad and Breaking Fast',
        description: 'Distribute prasad to all. Break fast with prasad after midnight.',
        duration: '10 minutes',
        tips: ['Share with neighbors', 'Eat prasad happily', 'Celebrate with joy'],
        mantra: {
          sanskrit: 'वसुदेवसुतं देवं कंसचाणूरमर्दनम्। देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥',
          transliteration: 'Vasudeva Sutam Devam Kamsa Chanura Mardanam, Devaki Paramananda Krishnam Vande Jagadgurum',
          meaning: 'I bow to Krishna, son of Vasudeva, destroyer of Kamsa and Chanura, supreme joy of Devaki, teacher of the world',
          repetitions: 3
        }
      }
    ],

    mantras: [
      {
        name: 'Krishna Moola Mantra',
        sanskrit: 'ॐ कृष्णाय नमः',
        transliteration: 'Om Krishnaya Namaha',
        meaning: 'Salutations to Lord Krishna',
        repetitions: 108
      },
      {
        name: 'Hare Krishna Maha Mantra',
        sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे। हरे राम हरे राम राम राम हरे हरे॥',
        transliteration: 'Hare Krishna Hare Krishna Krishna Krishna Hare Hare, Hare Rama Hare Rama Rama Rama Hare Hare',
        meaning: 'The great mantra for liberation and divine love',
        repetitions: 108
      }
    ],

    tips: [
      'Midnight is exact birth time - don\'t miss it',
      'Dahi handi celebration can be done next day',
      'Read Bhagavad Gita or Krishna stories during day',
      'Tulsi leaves are essential - Krishna loves tulsi',
      'Sing bhajans with family - creates joyful atmosphere',
      'Children especially enjoy rocking Krishna\'s cradle',
      'Visit Krishna temple if possible',
      'Offer butter - Krishna\'s favorite'
    ],

    panchangamGuidance: {
      avoidDays: ['Perform only on Krishna Janmashtami'],
      bestDays: ['Ashtami tithi of Bhadrapada month (dark fortnight)', 'Rohini Nakshatra conjunction is most auspicious'],
      bestNakshatra: ['Rohini - Krishna was born in Rohini']
    },

    videoTutorial: null,
    pdfGuide: null
  },

  {
    id: 'ganesh-chaturthi-puja',
    name: 'Ganesh Chaturthi Puja',
    deity: 'Lord Ganesha',
    deityImage: 'ganesha.jpg',
    category: pujaCategories.FESTIVAL,
    difficulty: difficultyLevels.ADVANCED,
    duration: '1.5-2 hours daily for 10 days',
    occasion: 'Ganesh Chaturthi - Birth celebration of Lord Ganesha',
    bestTime: 'Morning and evening during 10-day festival',
    description: 'Ganesh Chaturthi is celebrated for 10 days with daily elaborate puja. Ganesha idol is installed on first day and immersed on 10th day with Visarjan ceremony.',
    
    benefits: [
      'Removes all obstacles from life',
      'Brings wisdom and prosperity',
      'Success in new ventures',
      'Family harmony and happiness',
      'Spiritual and material growth'
    ],

    materials: {
      deity: [
        'Eco-friendly Ganesha idol (clay)',
        'Wooden platform (patta)',
        'Red cloth',
        'Decoration items',
        'Modak mold'
      ],
      flowers: [
        'Red hibiscus - most auspicious',
        'Durva grass (21 blades)',
        'Marigold',
        'Rose',
        'Jasmine',
        'Lotus'
      ],
      offerings: [
        'Modak (21 or 108)',
        'Ladoo',
        'Fruits',
        'Coconut',
        'Jaggery',
        'Sesame seeds',
        'Sugarcane',
        'Betel leaves and nuts'
      ],
      puja_items: [
        'Ghee lamp',
        'Incense',
        'Camphor',
        'Red sandalwood',
        'Kumkum',
        'Haldi',
        'Akshat',
        'Holy water',
        'Bell',
        'Conch',
        'Kalash',
        'Mango leaves',
        'Sindoor'
      ]
    },

    steps: [
      {
        stepNumber: 1,
        title: 'Pranapratishtha (Day 1)',
        description: 'Install Ganesha idol with proper rituals. This invokes life force into the idol. Clean area, setup platform, place idol facing north.',
        duration: '20 minutes',
        tips: ['Use eco-friendly clay idol', 'Face north or east', 'Decorate beautifully', 'Invite with devotion'],
        mantra: {
          sanskrit: 'आवाहयामि देवेशं गणनाथं गणाधिपम्। आगच्छ परमेशान वासोऽत्र निधीयताम्॥',
          transliteration: 'Avahayami Devesham Gananatham Ganadhipam, Agacha Parameshan Vaso\'tra Nidhiyatam',
          meaning: 'I invoke the Lord of gods, Lord of ganas, leader of all groups. Please come, O Supreme Lord, and reside here',
          repetitions: 3
        }
      },
      {
        stepNumber: 2,
        title: 'Shodashopachar Puja',
        description: 'Perform 16-step traditional puja including dhyana, asana, padya, arghya, achamana, snana, vastra, gandha, pushpa, dhupa, deepa, naivedya, tambula, dakshina, aarti, and pradakshina.',
        duration: '30 minutes',
        tips: ['Follow all 16 steps', 'Take time for each offering', 'Maintain purity'],
        mantra: {
          sanskrit: 'ॐ गं गणपतये नमः',
          transliteration: 'Om Gam Ganapataye Namaha',
          meaning: 'Salutations to Lord Ganesha',
          repetitions: 'With each offering'
        }
      },
      {
        stepNumber: 3,
        title: 'Durva Grass Offering',
        description: 'Offer 21 blades of durva grass (doob). This is most beloved to Ganesha and very auspicious.',
        duration: '5 minutes',
        tips: ['Fresh green durva', 'Count 21 blades', 'Tie together or offer in sets of 3'],
        mantra: {
          sanskrit: 'दूर्वांकुरैः सप्रवालैः पूजितो यो वरप्रदः। तस्मै गणाधिपतये नमो नित्यं गणात्मने॥',
          transliteration: 'Durvankuraih Sapravalair Pujito Yo Varapradah, Tasmai Ganadhipataye Namo Nityam Ganatmane',
          meaning: 'Salutations to the Lord of ganas who grants boons when worshipped with tender durva grass',
          repetitions: 21
        }
      },
      {
        stepNumber: 4,
        title: 'Offering 21 Modaks',
        description: 'Offer 21 modaks (can be more - 108 is highly auspicious). Modak is Ganesha\'s favorite sweet.',
        duration: '5 minutes',
        tips: ['Homemade modak is best', 'Steam or fried both acceptable', 'Coconut-jaggery filling traditional'],
        mantra: {
          sanskrit: 'ॐ मोदकप्रियाय नमः',
          transliteration: 'Om Modakapriyaya Namaha',
          meaning: 'Salutations to the one who loves modak',
          repetitions: 1
        }
      },
      {
        stepNumber: 5,
        title: 'Ganesha Atharvashirsha Path',
        description: 'Recite Ganesha Atharvashirsha, the most powerful Vedic hymn to Ganesha. Even listening brings great benefits.',
        duration: '15 minutes',
        tips: ['Can listen to audio', 'Read with meaning', 'Very powerful prayer'],
        mantra: {
          sanskrit: 'ॐ भद्रं कर्णेभिः श्रृणुयाम देवा भद्रं पश्येमाक्षभिर्यजत्राः',
          transliteration: 'Om Bhadram Karnebhih Shrunuyama Deva Bhadram Pashyemakshabhiryajatrah',
          meaning: 'O gods, may we hear auspicious things with our ears and see auspicious things with our eyes',
          repetitions: 'Full recitation'
        }
      },
      {
        stepNumber: 6,
        title: 'Ganapati Stotra',
        description: 'Recite or sing various Ganesha stotras like Vakratunda Mahakaya, Suklam Bharadharam, etc.',
        duration: '10 minutes',
        tips: ['Multiple stotras can be chanted', 'Sing with family', 'Create devotional atmosphere'],
        mantra: {
          sanskrit: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
          transliteration: 'Vakratunda Mahakaya Surya Koti Samaprabha, Nirvighnam Kuru Me Deva Sarvakaryeshu Sarvada',
          meaning: 'O Lord with curved trunk, large body, brilliance of million suns, make all my endeavors free of obstacles',
          repetitions: 3
        }
      },
      {
        stepNumber: 7,
        title: 'Offering 108 Names',
        description: 'Offer flowers while chanting 108 names of Ganesha. Red flowers preferred.',
        duration: '20 minutes',
        tips: ['Red hibiscus best', 'One flower per name', 'Maintain rhythm'],
        mantra: {
          sanskrit: 'ॐ गणाधिपतये नमः, ॐ उमापुत्राय नमः, ॐ विघ्नराजाय नमः...',
          transliteration: 'Om Ganadhipataye Namaha, Om Umaputraya Namaha, Om Vighnarajaya Namaha...',
          meaning: 'Salutations to each of the 108 names of Lord Ganesha',
          repetitions: 108
        }
      },
      {
        stepNumber: 8,
        title: 'Daily Aarti',
        description: 'Perform aarti twice daily (morning and evening) throughout 10 days. Sing Sukhkarta Dukhharta or Jai Ganesh Deva.',
        duration: '10 minutes',
        tips: ['Family participates', 'Ring bell', 'Sing enthusiastically', 'Light 5 or 21 lamps'],
        mantra: {
          sanskrit: 'सुखकर्ता दुःखहर्ता वार्ता विघ्नाची। नुरवी पुरवी प्रेम कृपा जयाची॥',
          transliteration: 'Sukhkarta Dukhharta Varta Vighnachi, Nurvi Purvi Prem Kripa Jayachi',
          meaning: 'Giver of happiness, remover of sorrows, destroyer of obstacles, shower your love and grace upon us',
          repetitions: 'Duration of aarti'
        }
      },
      {
        stepNumber: 9,
        title: 'Cultural Programs',
        description: 'Organize bhajans, kirtans, cultural programs during 10 days. Community participation brings collective blessings.',
        duration: 'Variable',
        tips: ['Invite neighbors', 'Organize competitions', 'Share prasad', 'Create festive atmosphere'],
        mantra: null
      },
      {
        stepNumber: 10,
        title: 'Visarjan (Immersion) - Day 10',
        description: 'On 10th day (Anant Chaturdashi), perform final puja and immerse idol in water body. Bid farewell with promise to return next year.',
        duration: '30 minutes + procession',
        tips: ['Choose eco-friendly location', 'Procession with music', 'Cry for departure - shows devotion', 'Promise next year'],
        mantra: {
          sanskrit: 'गणपति बप्पा मोरया। पुढच्या वर्षी लवकर या॥',
          transliteration: 'Ganapati Bappa Morya, Pudchya Varshi Lavkar Ya',
          meaning: 'Hail Lord Ganesha, please come back soon next year',
          repetitions: 'Throughout procession'
        }
      }
    ],

    mantras: [
      {
        name: 'Ganesha Beej Mantra',
        sanskrit: 'ॐ गं गणपतये नमः',
        transliteration: 'Om Gam Ganapataye Namaha',
        meaning: 'Seed mantra for Lord Ganesha',
        repetitions: 108
      },
      {
        name: 'Ganesha Gayatri',
        sanskrit: 'ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि तन्नो दन्ती प्रचोदयात्',
        transliteration: 'Om Ekadantaya Vidmahe Vakratundaya Dhimahi Tanno Danti Prachodayat',
        meaning: 'We meditate on the one with single tusk, we concentrate on the one with curved trunk, may the tusked one enlighten us',
        repetitions: 108
      }
    ],

    tips: [
      'Day 1 (Pranapratishtha) and Day 10 (Visarjan) are most important',
      'Eco-friendly clay idol dissolves easily and doesn\'t harm environment',
      'Modak is essential - make fresh daily if possible',
      'Maintain cleanliness and purity for 10 days',
      'Avoid non-vegetarian food during festival',
      'Moon viewing forbidden on Chaturthi - causes false accusations',
      'Organize community celebrations for collective blessings',
      'Take idol to different homes in colony/society',
      'Visarjan procession with drums, music creates joy',
      'Save pieces of dissolved idol as prasad'
    ],

    panchangamGuidance: {
      avoidDays: ['Don\'t look at moon on Ganesh Chaturthi day'],
      bestDays: ['Bhadrapada Shukla Chaturthi (4th day of bright fortnight)', '10-day celebration ending on Anant Chaturdashi'],
      bestNakshatra: ['Swati or Hasta nakshatra is most auspicious for installation']
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
