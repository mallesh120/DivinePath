// Daily scripture reading suggestions
// Rotates through key chapters/verses from different scriptures

export const dailyReadings = [
  // Bhagavad Gita - Key Chapters (Days 1-10)
  {
    id: 1,
    scripture: "Bhagavad Gita",
    chapter: 2,
    title: "Sankhya Yoga - The Yoga of Knowledge",
    verses: "1-10",
    summary: "Krishna begins to teach Arjuna about the eternal nature of the soul and the importance of performing one's duty.",
    keyVerse: {
      number: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana, mā karma-phala-hetur bhūr mā te saṅgo 'stvakarmaṇi",
      meaning: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty."
    },
    link: "/literature/3",
    readingTime: "5 min"
  },
  {
    id: 2,
    scripture: "Bhagavad Gita",
    chapter: 4,
    title: "Jnana Yoga - The Yoga of Knowledge",
    verses: "1-10",
    summary: "Krishna explains the divine incarnations and the purpose of His descent to earth.",
    keyVerse: {
      number: 7,
      sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
      transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata, abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham",
      meaning: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Bharata, at that time I manifest Myself on earth."
    },
    link: "/literature/3",
    readingTime: "5 min"
  },
  {
    id: 3,
    scripture: "Bhagavad Gita",
    chapter: 6,
    title: "Dhyana Yoga - The Yoga of Meditation",
    verses: "1-15",
    summary: "Krishna teaches about meditation, controlling the mind, and achieving inner peace.",
    keyVerse: {
      number: 5,
      sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
      transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet, ātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ",
      meaning: "One must deliver oneself with the help of one's mind, and not degrade oneself. The mind is the friend of the conditioned soul, and his enemy as well."
    },
    link: "/literature/3",
    readingTime: "7 min"
  },
  {
    id: 4,
    scripture: "Bhagavad Gita",
    chapter: 12,
    title: "Bhakti Yoga - The Yoga of Devotion",
    verses: "1-12",
    summary: "Krishna explains the path of devotion and the qualities of a true devotee.",
    keyVerse: {
      number: 8,
      sanskrit: "मय्येव मन आधत्स्व मयि बुद्धिं निवेशय। निवसिष्यसि मय्येव अत ऊर्ध्वं न संशयः॥",
      transliteration: "mayy eva mana ādhatsva mayi buddhiṁ niveśaya, nivasiṣyasi mayy eva ata ūrdhvaṁ na saṁśayaḥ",
      meaning: "Just fix your mind upon Me, the Supreme Personality of Godhead, and engage all your intelligence in Me. Thus you will live in Me always, without a doubt."
    },
    link: "/literature/3",
    readingTime: "6 min"
  },
  // Ramayana - Key Kandas (Days 5-8)
  {
    id: 5,
    scripture: "Ramayana",
    chapter: "Bala Kanda",
    title: "The Childhood of Rama",
    verses: "Chapter 1",
    summary: "The birth and childhood of Lord Rama in Ayodhya, his education and early life.",
    keyVerse: {
      sanskrit: "रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः। राजा सर्वस्य लोकस्य देवानामिव वासवः॥",
      transliteration: "rāmo vigrahavān dharmaḥ sādhuḥ satya-parākramaḥ, rājā sarvasya lokasya devānām iva vāsavaḥ",
      meaning: "Rama is the embodiment of dharma, a virtuous soul with true valor, the king of all the worlds like Indra among the gods."
    },
    link: "/ramayana/bala-kanda",
    readingTime: "8 min"
  },
  {
    id: 6,
    scripture: "Ramayana",
    chapter: "Ayodhya Kanda",
    title: "Rama's Exile",
    verses: "Chapter 1",
    summary: "Rama accepts exile to honor his father's promise, demonstrating supreme devotion to duty.",
    keyVerse: {
      sanskrit: "न तत् प्रियं प्रियो ब्रूयात् यत् प्रियं ब्रुवतः प्रियम्। नीतिः सत्यं हितं पथ्यं न तस्यार्थो विरुध्यते॥",
      transliteration: "na tat priyaṁ priyo brūyāt yat priyaṁ bruvataḥ priyam, nītiḥ satyaṁ hitaṁ pathyaṁ na tasyārtho virudhyate",
      meaning: "A true friend does not speak only pleasant words, but what is righteous, truthful, beneficial and proper, even if difficult to hear."
    },
    link: "/ramayana/ayodhya-kanda",
    readingTime: "10 min"
  },
  {
    id: 7,
    scripture: "Ramayana",
    chapter: "Sundara Kanda",
    title: "Hanuman's Leap to Lanka",
    verses: "Chapter 1",
    summary: "Hanuman's heroic journey to Lanka in search of Sita, demonstrating faith and devotion.",
    keyVerse: {
      sanskrit: "यत्र यत्र रघुनाथ कीर्तनं तत्र तत्र कृतमस्तकाञ्जलिम्। भाष्पवारि परिपूर्ण लोचनं मारुतिं नमत राक्षसान्तकम्॥",
      transliteration: "yatra yatra raghunātha kīrtanaṁ tatra tatra kṛtamastakāñjalim, bhāṣpa-vāri paripūrṇa locanaṁ mārutiṁ namata rākṣasāntakam",
      meaning: "Wherever the glories of Lord Rama are sung, there Hanuman appears with folded hands and eyes full of tears of devotion."
    },
    link: "/ramayana/sundara-kanda",
    readingTime: "12 min"
  },
  // Mix of other scriptures (Days 8-10)
  {
    id: 8,
    scripture: "Vishnu Purana",
    chapter: "Book 1",
    title: "The Creation of the Universe",
    verses: "Chapter 1-2",
    summary: "The cosmology and creation of the universe by Lord Vishnu, the supreme protector.",
    keyVerse: {
      sanskrit: "विष्णुः सर्वं जगत् साक्षाद् ईश्वरः परमेश्वरः। सृष्टिस्थित्यन्तकरणं तस्य चैव महात्मनः॥",
      transliteration: "viṣṇuḥ sarvaṁ jagat sākṣād īśvaraḥ parameśvaraḥ, sṛṣṭi-sthity-anta-karaṇaṁ tasya caiva mahātmanaḥ",
      meaning: "Vishnu is the Supreme Lord of all creation, the controller of creation, preservation, and dissolution of the universe."
    },
    link: "/literature/4",
    readingTime: "8 min"
  },
  {
    id: 9,
    scripture: "Shiva Purana",
    chapter: "Rudra Samhita",
    title: "The Glory of Lord Shiva",
    verses: "Chapter 1",
    summary: "Stories illustrating the power, compassion, and cosmic dance of Lord Shiva.",
    keyVerse: {
      sanskrit: "नमः शिवाय च शिवतराय च। नमः शंकराय च शंकरतराय च॥",
      transliteration: "namaḥ śivāya ca śivatarāya ca, namaḥ śaṅkarāya ca śaṅkaratarāya ca",
      meaning: "Salutations to Shiva and to the most auspicious one. Salutations to Shankara and to the most benevolent one."
    },
    link: "/literature/5",
    readingTime: "9 min"
  },
  {
    id: 10,
    scripture: "Bhagavad Gita",
    chapter: 18,
    title: "Moksha Yoga - The Yoga of Liberation",
    verses: "1-12",
    summary: "Krishna's final teachings on liberation, surrender, and the ultimate goal of life.",
    keyVerse: {
      number: 66,
      sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥",
      transliteration: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja, ahaṁ tvā sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
      meaning: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear."
    },
    link: "/literature/3",
    readingTime: "8 min"
  }
];

// Get daily reading based on day of month (cycles through 10 readings)
export const getDailyReading = () => {
  const dayOfMonth = new Date().getDate();
  const index = (dayOfMonth - 1) % dailyReadings.length;
  return dailyReadings[index];
};

// Get all available scriptures for library link
export const availableScriptures = [
  { name: "Bhagavad Gita", link: "/literature/3", chapters: 18 },
  { name: "Ramayana", link: "/ramayana", kandas: 7 },
  { name: "Mahabharata", link: "/literature/2", parvas: 18 },
  { name: "Vishnu Purana", link: "/literature/4", books: 6 },
  { name: "Shiva Purana", link: "/literature/5", samhitas: 7 }
];
