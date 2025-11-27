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
      { number: 1, sanskrit: 'गजानन', transliteration: 'Gajanana', mantra: 'Om Gajananaya Namah', meaning: 'Elephant-Faced Lord' },
      { number: 2, sanskrit: 'गणाध्यक्ष', transliteration: 'Ganadhyaksha', mantra: 'Om Ganadhyakshaya Namah', meaning: 'Lord of All Ganas (Gods)' },
      { number: 3, sanskrit: 'विघ्नराज', transliteration: 'Vighnaraja', mantra: 'Om Vighnarajaya Namah', meaning: 'Lord of All Hindrances' },
      { number: 4, sanskrit: 'विनायक', transliteration: 'Vinayaka', mantra: 'Om Vinayakaya Namah', meaning: 'Lord of All' },
      { number: 5, sanskrit: 'द्वैमातुर', transliteration: 'Dvaimatura', mantra: 'Om Dvaimaturaya Namah', meaning: 'One who has two Mothers' },
      { number: 6, sanskrit: 'द्विमुख', transliteration: 'Dvimukha', mantra: 'Om Dvimukhaya Namah', meaning: 'Lord with two Heads' },
      { number: 7, sanskrit: 'प्रमुख', transliteration: 'Pramukha', mantra: 'Om Pramukhaya Namah', meaning: 'Supreme Head of the Universe' },
      { number: 8, sanskrit: 'सुमुख', transliteration: 'Sumukha', mantra: 'Om Sumukhaya Namah', meaning: 'Auspicious Face' },
      { number: 9, sanskrit: 'कृती', transliteration: 'Kriti', mantra: 'Om Kritine Namah', meaning: 'Embodiment of the Universe' },
      { number: 10, sanskrit: 'सुप्रदीप', transliteration: 'Supradipa', mantra: 'Om Supradipaya Namah', meaning: 'One who Removes Darkness' },
      { number: 11, sanskrit: 'सुखनिधि', transliteration: 'Sukhanidhi', mantra: 'Om Sukhanidhaye Namah', meaning: 'Treasure of Happiness and Pleasure' },
      { number: 12, sanskrit: 'सुराध्यक्ष', transliteration: 'Suradhyaksha', mantra: 'Om Suradhyakshaya Namah', meaning: 'Sovereign of the Gods' },
      { number: 13, sanskrit: 'सुरारिघ्न', transliteration: 'Surarighna', mantra: 'Om Surarighnaya Namah', meaning: 'The Destroyer of the Enemies of Devas' },
      { number: 14, sanskrit: 'महागणपति', transliteration: 'Mahaganapati', mantra: 'Om Mahaganapataye Namah', meaning: 'Omnipotent and Supreme Lord' },
      { number: 15, sanskrit: 'मान्य', transliteration: 'Manya', mantra: 'Om Manyaya Namah', meaning: 'One Who is Worshipped in Whole Universe' },
      { number: 16, sanskrit: 'महाकाल', transliteration: 'Mahakala', mantra: 'Om Mahakalaya Namah', meaning: 'Lord of the Time / Lord of the Death' },
      { number: 17, sanskrit: 'महाबल', transliteration: 'Mahabala', mantra: 'Om Mahabalaya Namah', meaning: 'Extremely Strong Lord' },
      { number: 18, sanskrit: 'हेरम्ब', transliteration: 'Heramba', mantra: 'Om Herambaya Namah', meaning: "Mother's Beloved Son" },
      { number: 19, sanskrit: 'लम्बजठर', transliteration: 'Lambajathara', mantra: 'Om Lambajatharaya Namah', meaning: 'Long Bellied' },
      { number: 20, sanskrit: 'ह्रस्वग्रीव', transliteration: 'Hrasvagriva', mantra: 'Om Hrasvagrivaya Namah', meaning: 'One With a Small Neck' },
      { number: 21, sanskrit: 'महोदर', transliteration: 'Mahodara', mantra: 'Om Mahodaraya Namah', meaning: 'Having Large Abdomen' },
      { number: 22, sanskrit: 'मदोत्कट', transliteration: 'Madotkata', mantra: 'Om Madotkataya Namah', meaning: 'Full of Excitement' },
      { number: 23, sanskrit: 'महावीर', transliteration: 'Mahavira', mantra: 'Om Mahaviraya Namah', meaning: 'Very Brave and Courageous' },
      { number: 24, sanskrit: 'मन्त्री', transliteration: 'Mantri', mantra: 'Om Mantrine Namah', meaning: 'Possessor of the Power of Mantras' },
      { number: 25, sanskrit: 'मङ्गलस्वर', transliteration: 'Mangalasvara', mantra: 'Om Mangalasvaraya Namah', meaning: 'Who Make Auspicious Sound' },
      { number: 26, sanskrit: 'प्रमध', transliteration: 'Pramadha', mantra: 'Om Pramadhaya Namah', meaning: 'Cause of Universe' },
      { number: 27, sanskrit: 'प्रथम', transliteration: 'Prathama', mantra: 'Om Prathamaya Namah', meaning: 'First Among All Gods' },
      { number: 28, sanskrit: 'प्राज्ञ', transliteration: 'Prajna', mantra: 'Om Prajnaya Namah', meaning: 'The Extremely Intelligent One' },
      { number: 29, sanskrit: 'विघ्नकर्ता', transliteration: 'Vighnakarta', mantra: 'Om Vighnakartre Namah', meaning: 'Creator of Obstacles' },
      { number: 30, sanskrit: 'विघ्नहर्ता', transliteration: 'Vighnaharta', mantra: 'Om Vighnahartre Namah', meaning: 'Demolisher of Obstacles' },
      { number: 31, sanskrit: 'विश्वनेता', transliteration: 'Vishvaneta', mantra: 'Om Vishvanetre Namah', meaning: 'Eye of the Universe / One of Keeps an Eye on the Universe' },
      { number: 32, sanskrit: 'विराट्पति', transliteration: 'Viratpati', mantra: 'Om Viratpataye Namah', meaning: 'Lord of the Universe' },
      { number: 33, sanskrit: 'श्रीपति', transliteration: 'Shripati', mantra: 'Om Shripataye Namah', meaning: 'The Lord of Fortune' },
      { number: 34, sanskrit: 'वाक्पति', transliteration: 'Vakpati', mantra: 'Om Vakpataye Namah', meaning: 'The Lord of Speech' },
      { number: 35, sanskrit: 'शृङ्गारी', transliteration: 'Shringari', mantra: 'Om Shringarine Namah', meaning: 'Decorated with Vermilion' },
      { number: 36, sanskrit: 'अश्रितवत्सल', transliteration: 'Ashritavatsala', mantra: 'Om Ashritavatsalaya Namah', meaning: 'One Who is Kind to His Devotees' },
      { number: 37, sanskrit: 'शिवप्रिय', transliteration: 'Shivapriya', mantra: 'Om Shivapriyaya Namah', meaning: 'Beloved of Lord Shiva' },
      { number: 38, sanskrit: 'शीघ्रकारी', transliteration: 'Shighrakari', mantra: 'Om Shighrakarine Namah', meaning: 'Quick Granter of Boons' },
      { number: 39, sanskrit: 'शाश्वत', transliteration: 'Shashvata', mantra: 'Om Shashvataya Namah', meaning: 'Adoration to the Unchanging One' },
      { number: 40, sanskrit: 'बल', transliteration: 'Bala', mantra: 'Om Balaya Namah', meaning: 'Embodiment of Power' },
      { number: 41, sanskrit: 'बलोत्थित', transliteration: 'Balotthita', mantra: 'Om Balotthitaya Namah', meaning: 'Increasing Power Day by Day' },
      { number: 42, sanskrit: 'भवात्मज', transliteration: 'Bhavatmaja', mantra: 'Om Bhavatmajaya Namah', meaning: 'Son of the Universe' },
      { number: 43, sanskrit: 'पुराणपुरुष', transliteration: 'Puranapurusha', mantra: 'Om Puranapurushaya Namah', meaning: 'The Omnipotent Personality' },
      { number: 44, sanskrit: 'पूषा', transliteration: 'Pusha', mantra: 'Om Pushne Namah', meaning: 'Nourishers of All-Beings' },
      { number: 45, sanskrit: 'पुष्करोत्षिप्तवारी', transliteration: 'Pushkarotshiptavari', mantra: 'Om Pushkarotshiptavarine Namah', meaning: 'Plays in the Lotus Pond' },
      { number: 46, sanskrit: 'अग्रगण्य', transliteration: 'Agraganya', mantra: 'Om Agraganyaya Namah', meaning: 'Pre-eminent Among All Deities' },
      { number: 47, sanskrit: 'अग्रपूज्य', transliteration: 'Agrapujya', mantra: 'Om Agrapujyaya Namah', meaning: 'Worshipped Before Anyone' },
      { number: 48, sanskrit: 'अग्रगामी', transliteration: 'Agragami', mantra: 'Om Agragamine Namah', meaning: 'One Who take the Lead' },
      { number: 49, sanskrit: 'मन्त्रकृत्', transliteration: 'Mantrakrit', mantra: 'Om Mantrakrite Namah', meaning: 'Creator of Mantras' },
      { number: 50, sanskrit: 'चामीकरप्रभ', transliteration: 'Chamikaraprabha', mantra: 'Om Chamikaraprabhaya Namah', meaning: 'Having the Radiance Like Sun' },
      { number: 51, sanskrit: 'सर्व', transliteration: 'Sarva', mantra: 'Om Sarvaya Namah', meaning: 'Present in Every Bit of Universe' },
      { number: 52, sanskrit: 'सर्वोपास्य', transliteration: 'Sarvopasya', mantra: 'Om Sarvopasyaya Namah', meaning: 'Worshipped By All' },
      { number: 53, sanskrit: 'सर्वकर्ता', transliteration: 'Sarvakarta', mantra: 'Om Sarvakartre Namah', meaning: 'Cause of all Activities' },
      { number: 54, sanskrit: 'सर्वनेता', transliteration: 'Sarvaneta', mantra: 'Om Sarvanetre Namah', meaning: 'Watching Everything Happening in the Universe' },
      { number: 55, sanskrit: 'सर्वसिद्धिप्रद', transliteration: 'Sarvasiddhiprada', mantra: 'Om Sarvasiddhipradaya Namah', meaning: 'Granter of All Kind of Accomplishments (Siddhi)' },
      { number: 56, sanskrit: 'सिद्धि', transliteration: 'Siddhi', mantra: 'Om Siddhaye Namah', meaning: 'Lord of All Accomplishments / One Who is Siddha' },
      { number: 57, sanskrit: 'पञ्चहस्त', transliteration: 'Panchahasta', mantra: 'Om Panchahastaya Namah', meaning: 'Five-handed' },
      { number: 58, sanskrit: 'पार्वतीनन्दन', transliteration: 'Parvatinandana', mantra: 'Om Parvatinandanaya Namah', meaning: 'Son of Goddess Parvati' },
      { number: 59, sanskrit: 'प्रभु', transliteration: 'Prabhu', mantra: 'Om Prabhave Namah', meaning: 'Source of the Whole Creation / The Great Lord' },
      { number: 60, sanskrit: 'कुमारगुरु', transliteration: 'Kumaraguru', mantra: 'Om Kumaragurave Namah', meaning: 'The Guru of Lord Kartikeya / Embodiment of Guru' },
      { number: 61, sanskrit: 'अक्षोभ्य', transliteration: 'Akshobhya', mantra: 'Om Akshobhyaya Namah', meaning: 'One Who is Indestructible' },
      { number: 62, sanskrit: 'कुञ्जरासुरभञ्जन', transliteration: 'Kunjarasurabhanjana', mantra: 'Om Kunjarasurabhanjanaya Namah', meaning: 'Destroyer of Kunjarasura' },
      { number: 63, sanskrit: 'प्रमोद', transliteration: 'Pramoda', mantra: 'Om Pramodaya Namah', meaning: 'Granter of Happiness / One Full of Happiness' },
      { number: 64, sanskrit: 'मोदकप्रिय', transliteration: 'Modakapriya', mantra: 'Om Modakapriyaya Namah', meaning: 'One Who Loves Modaka' },
      { number: 65, sanskrit: 'कान्तिमान्', transliteration: 'Kantiman', mantra: 'Om Kantimate Namah', meaning: 'Full of Charm' },
      { number: 66, sanskrit: 'धृतिमान्', transliteration: 'Dhritiman', mantra: 'Om Dhritimate Namah', meaning: 'One Who is Patient and Steadfast' },
      { number: 67, sanskrit: 'कामी', transliteration: 'Kami', mantra: 'Om Kamine Namah', meaning: 'Fulfiller of Wishes' },
      { number: 68, sanskrit: 'कपित्थपनसप्रिय', transliteration: 'Kapitthapanasapriya', mantra: 'Om Kapitthapanasapriyaya Namah', meaning: 'One Who Love Wood Apple and Jackfruit' },
      { number: 69, sanskrit: 'ब्रह्मचारी', transliteration: 'Brahmachari', mantra: 'Om Brahmacharine Namah', meaning: 'One Who follow Celibacy' },
      { number: 70, sanskrit: 'ब्रह्मरूपी', transliteration: 'Brahmarupi', mantra: 'Om Brahmarupine Namah', meaning: 'Almighty God' },
      { number: 71, sanskrit: 'ब्रह्मविद्यादिदानभू', transliteration: 'Brahmavidyadidanabhu', mantra: 'Om Brahmavidyadidanabhuve Namah', meaning: 'Granter of Brahmavidya' },
      { number: 72, sanskrit: 'जिष्णु', transliteration: 'Jishnu', mantra: 'Om Jishnave Namah', meaning: 'Granter of Victory' },
      { number: 73, sanskrit: 'विष्णुप्रिय', transliteration: 'Vishnupriya', mantra: 'Om Vishnupriyaya Namah', meaning: 'Beloved of Lord Vishnu' },
      { number: 74, sanskrit: 'भक्तजीवित', transliteration: 'Bhaktajivita', mantra: 'Om Bhaktajivitaya Namah', meaning: 'Protector of Devotees Life' },
      { number: 75, sanskrit: 'जितमन्मथ', transliteration: 'Jitamanmatha', mantra: 'Om Jitamanmathaya Namah', meaning: 'One Who has control over Mind and Body' },
      { number: 76, sanskrit: 'ऐश्वर्यकारण', transliteration: 'Aishvaryakarana', mantra: 'Om Aishvaryakaranaya Namah', meaning: 'Source of Opulence' },
      { number: 77, sanskrit: 'ज्यायस्', transliteration: 'Jyayas', mantra: 'Om Jyayase Namah', meaning: 'Best and Supreme' },
      { number: 78, sanskrit: 'यक्षकिन्नरसेवित', transliteration: 'Yakshakinnarasevita', mantra: 'Om Yakshakinnarasevitaya Namah', meaning: 'Worshipped by Yakshas and Kinnaras' },
      { number: 79, sanskrit: 'गङ्गासुत', transliteration: 'Gangasuta', mantra: 'Om Gangasutaya Namah', meaning: 'Son of Goddess Ganga' },
      { number: 80, sanskrit: 'गणाधीश', transliteration: 'Ganadhisha', mantra: 'Om Ganadhishaya Namah', meaning: 'Lord of All Ganas' },
      { number: 81, sanskrit: 'गम्भीरनिनद', transliteration: 'Gambhiraninada', mantra: 'Om Gambhiraninadaya Namah', meaning: 'One Who Create Great Sound' },
      { number: 82, sanskrit: 'वटु', transliteration: 'Vatu', mantra: 'Om Vatave Namah', meaning: 'Form of Boy' },
      { number: 83, sanskrit: 'अभीष्टवरद', transliteration: 'Abhishtavarada', mantra: 'Om Abhishtavaradaya Namah', meaning: 'Granter of Desired Boons' },
      { number: 84, sanskrit: 'ज्योतिस्', transliteration: 'Jyotis', mantra: 'Om Jyotishe Namah', meaning: 'Expert in Astrology / Embodiment of Astrology' },
      { number: 85, sanskrit: 'भक्तनिधि', transliteration: 'Bhaktanidhi', mantra: 'Om Bhaktanidhaye Namah', meaning: 'Treasure of devotees' },
      { number: 86, sanskrit: 'भावगम्य', transliteration: 'Bhavagamya', mantra: 'Om Bhavagamyaya Namah', meaning: 'Attainable by the True Devotion Only' },
      { number: 87, sanskrit: 'मङ्गलप्रद', transliteration: 'Mangalaprada', mantra: 'Om Mangalapradaya Namah', meaning: 'Granter of Auspicious Things' },
      { number: 88, sanskrit: 'अव्यक्त', transliteration: 'Avyakta', mantra: 'Om Avyaktaya Namah', meaning: 'Not Clearly Visible' },
      { number: 89, sanskrit: 'अप्राकृतपराक्रम', transliteration: 'Aprakritaparakrama', mantra: 'Om Aprakritaparakramaya Namah', meaning: 'Having Unnatural Power and Courage' },
      { number: 90, sanskrit: 'सत्यधर्मी', transliteration: 'Satyadharmi', mantra: 'Om Satyadharmine Namah', meaning: 'Fond of Truth' },
      { number: 91, sanskrit: 'सखा', transliteration: 'Sakha', mantra: 'Om Sakhaye Namah', meaning: 'Friend of Devotees' },
      { number: 92, sanskrit: 'सरसाम्बुनिधि', transliteration: 'Sarasambunidhi', mantra: 'Om Sarasambunidhaye Namah', meaning: 'Fond of Durva Grass' },
      { number: 93, sanskrit: 'महेश', transliteration: 'Mahesha', mantra: 'Om Maheshaya Namah', meaning: 'Greatest Among All Deities / Son of Lord Shiva' },
      { number: 94, sanskrit: 'दिव्याङ्ग', transliteration: 'Divyanga', mantra: 'Om Divyangaya Namah', meaning: 'The One Who is Divine' },
      { number: 95, sanskrit: 'मणिकिङ्किणीमेखल', transliteration: 'Manikinkinimekhala', mantra: 'Om Manikinkinimekhalaya Namah', meaning: 'With Waistband Made of Precious Gem Stones' },
      { number: 96, sanskrit: 'समस्तदेवतामूर्ति', transliteration: 'Samastadevatamurti', mantra: 'Om Samastadevatamurtaye Namah', meaning: 'Worshipped by all Deities' },
      { number: 97, sanskrit: 'सहिष्णु', transliteration: 'Sahishnu', mantra: 'Om Sahishnave Namah', meaning: 'Tolerant' },
      { number: 98, sanskrit: 'सततोत्थित', transliteration: 'Satatotthita', mantra: 'Om Satatotthitaya Namah', meaning: 'Constantly Rising' },
      { number: 99, sanskrit: 'विघातकारी', transliteration: 'Vighatakari', mantra: 'Om Vighatakarine Namah', meaning: 'Remover of Troubles' },
      { number: 100, sanskrit: 'विश्वग्दृक्', transliteration: 'Vishvagdrik', mantra: 'Om Vishvagdrishe Namah', meaning: "Watching Everyone's Activities" },
      { number: 101, sanskrit: 'विश्वरक्षाकृत्', transliteration: 'Vishvarakshakrit', mantra: 'Om Vishvarakshakrite Namah', meaning: 'Protector of the Universe' },
      { number: 102, sanskrit: 'कल्याणगुरु', transliteration: 'Kalyanaguru', mantra: 'Om Kalyanagurave Namah', meaning: 'One Who Bless as a Teacher' },
      { number: 103, sanskrit: 'उन्मत्तवेष', transliteration: 'Unmattavesha', mantra: 'Om Unmattaveshaya Namah', meaning: 'Full of Joy and Bliss' },
      { number: 104, sanskrit: 'अपराजित', transliteration: 'Aparajita', mantra: 'Om Aparajite Namah', meaning: 'Unconquered' },
      { number: 105, sanskrit: 'समस्तजगदाधार', transliteration: 'Samastajagadadhara', mantra: 'Om Samastajagadadharaya Namah', meaning: 'Support of The Universe' },
      { number: 106, sanskrit: 'सर्वैश्वर्यप्रद', transliteration: 'Sarvaishvaryaprada', mantra: 'Om Sarvaishvaryapradaya Namah', meaning: 'Granter of all Kind of Wealth' },
      { number: 107, sanskrit: 'आक्रान्तचिदचित्प्रभु', transliteration: 'Akrantachidachitprabhu', mantra: 'Om Akrantachidachitprabhave Namah', meaning: 'Source of the Mind and Intellect' },
      { number: 108, sanskrit: 'श्री विघ्नेश्वर', transliteration: 'Shri Vighneshvara', mantra: 'Om Shri Vighneshvaraya Namah', meaning: 'Remover of Obstacles' },
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
