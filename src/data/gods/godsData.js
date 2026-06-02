import ganeshaImage from '../../assets/images/Gods/ganesha.webp';
import shivaImage from '../../assets/images/Gods/Shiva.webp';
import vishnuImage from '../../assets/images/Gods/vishnu.webp';
import brahmaImage from '../../assets/images/Gods/brahma.webp';
import lakshmiImage from '../../assets/images/Gods/lakshmi.webp';
import parvatiImage from '../../assets/images/Gods/parvati.webp';
import saraswatiImage from '../../assets/images/Gods/saraswati.webp';
import hanumanImage from '../../assets/images/Gods/hanuman.webp';
import durgaImage from '../../assets/images/Gods/durga.webp';
import kaliImage from '../../assets/images/Gods/kali.webp';
import krishnaImage from '../../assets/images/Gods/krishna.webp';
import ramaImage from '../../assets/images/Gods/rama.webp';
import suryaImage from '../../assets/images/Gods/surya.webp';
import chandraImage from '../../assets/images/Gods/chandra.webp';
import indraImage from '../../assets/images/Gods/indra.webp';
import agniImage from '../../assets/images/Gods/agni.webp';
import kartikeyaImage from '../../assets/images/Gods/kartikeya.webp';
import kuberaImage from '../../assets/images/Gods/kubera.webp';
import yamaImage from '../../assets/images/Gods/yama.webp';

// The Holy Trinity (Trimurti)
export const trimurtiData = [
  {
    id: 'brahma',
    name: "Brahma",
    title: "The Creator",
    description: "The creator god in the Hindu Trinity, responsible for the creation of the universe.",
    longDescription: "Brahma is the creator of the universe and all beings. He is depicted with four heads, representing the four Vedas, and is the source of all knowledge. Though he is one of the Trinity, temples dedicated to him are rare.",
    mantra: "Om Namo Rajo Gushe Srishti Sthithou Palayithou",
    imageUrl: brahmaImage,
    role: "Creation",
    symbols: ["Four Heads", "Vedas", "Lotus", "Swan"],
    consort: {
      id: 'saraswati',
      name: "Saraswati",
      description: "The goddess of knowledge, music, art, wisdom, and learning.",
      longDescription: "Saraswati is the Hindu goddess of knowledge, music, art, speech, wisdom, and learning. She is depicted as a beautiful woman in white, seated on a lotus, playing the veena.",
      mantra: "Om Aim Saraswatyai Namah",
      imageUrl: saraswatiImage,
      symbols: ["Veena", "Book", "Lotus", "Swan"]
    },
    family: [],
    avatars: []
  },
  {
    id: 'vishnu',
    name: "Vishnu",
    title: "The Preserver",
    description: "The preserver and protector of the universe. He returns to earth to restore balance.",
    longDescription: "Vishnu is the preserver of the universe and maintains cosmic order (dharma). He is believed to have incarnated in various forms known as avatars, descending to earth whenever evil threatens to overcome good. He rests on the cosmic serpent Shesha in the ocean of milk.",
    mantra: "Om Namo Bhagavate Vasudevaya",
    imageUrl: vishnuImage,
    role: "Preservation",
    symbols: ["Conch", "Discus", "Mace", "Lotus"],
    consort: {
      id: 'lakshmi',
      name: "Lakshmi",
      description: "The goddess of wealth, fortune, and prosperity.",
      longDescription: "Lakshmi is the goddess of wealth, fortune, and prosperity (both material and spiritual). She is the active energy of Vishnu and represents beauty, purity, and generosity. Her four hands represent the four goals of human life: dharma, kama, artha, and moksha.",
      mantra: "Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed",
      imageUrl: lakshmiImage,
      symbols: ["Lotus", "Gold Coins", "Owl", "Elephants"]
    },
    family: [],
    avatars: [
      {
        name: "Matsya",
        description: "The Fish - Saved humanity from the great flood",
        order: 1
      },
      {
        name: "Kurma",
        description: "The Tortoise - Supported Mount Mandara during churning of the ocean",
        order: 2
      },
      {
        name: "Varaha",
        description: "The Boar - Rescued Earth from the demon Hiranyaksha",
        order: 3
      },
      {
        name: "Narasimha",
        description: "The Man-Lion - Defeated the demon king Hiranyakashipu",
        order: 4
      },
      {
        name: "Vamana",
        description: "The Dwarf - Subdued the demon king Bali",
        order: 5
      },
      {
        name: "Parashurama",
        description: "Rama with an Axe - Warrior sage who fought corrupt kshatriyas",
        order: 6
      },
      {
        name: "Rama",
        description: "Prince of Ayodhya - Hero of the Ramayana, embodiment of dharma",
        order: 7
      },
      {
        name: "Krishna",
        description: "The Divine Cowherd - Teacher of Bhagavad Gita, central to Mahabharata",
        order: 8
      },
      {
        name: "Buddha",
        description: "The Enlightened One - Founded Buddhism and taught compassion",
        order: 9
      },
      {
        name: "Kalki",
        description: "The Future Avatar - Will appear at the end of Kali Yuga to restore dharma",
        order: 10
      }
    ]
  },
  {
    id: 'shiva',
    name: "Shiva",
    title: "The Destroyer & Transformer",
    description: "One of the principal deities, known as the destroyer and transformer.",
    longDescription: "Shiva is the destroyer and transformer within the Trimurti. His destruction is not arbitrary but necessary for regeneration and new creation. He is depicted in deep meditation on Mount Kailash or dancing the cosmic dance (Tandava). He represents the ascetic ideal and the householder simultaneously.",
    mantra: "Om Namah Shivaya",
    imageUrl: shivaImage,
    role: "Destruction & Transformation",
    symbols: ["Trident", "Damaru", "Third Eye", "Crescent Moon", "Snake", "Ganga"],
    consort: {
      id: 'parvati',
      name: "Parvati",
      description: "The goddess of fertility, love, and devotion.",
      longDescription: "Parvati is the Hindu goddess of fertility, love, beauty, harmony, marriage, children, and devotion. She is the gentle and nurturing aspect of the Supreme Hindu goddess Adi Parashakti. As the mother goddess, she has many forms and names, including Durga and Kali.",
      mantra: "Sarva Mangala Mangalye Sive Sarvartha Sadhike Saranye Trayambike Gauri Narayani Namostute",
      imageUrl: parvatiImage,
      symbols: ["Lion", "Lotus", "Trident"]
    },
    family: [
      {
        id: 'ganesha',
        name: "Ganesha",
        relation: "Son",
        description: "Remover of obstacles, god of beginnings",
        imageUrl: ganeshaImage
      },
      {
        id: 'kartikeya',
        name: "Kartikeya",
        relation: "Son",
        description: "God of war and victory",
        imageUrl: kartikeyaImage
      }
    ],
    avatars: [
      {
        name: "Hanuman",
        description: "The Monkey God - Devotee of Rama, symbol of devotion and strength"
      },
      {
        name: "Bhairava",
        description: "The Fierce Form - Protector and guardian of sacred spaces"
      },
      {
        name: "Nataraja",
        description: "The Cosmic Dancer - Performs the divine dance of creation and destruction"
      }
    ]
  }
];

// All gods data (for backward compatibility and detailed pages)
export const godsData = [
  {
    id: 1,
    name: "Ganesha",
    description: "The elephant-headed god of beginnings, wisdom, and the remover of obstacles.",
    longDescription: "Ganesha is one of the most worshipped deities in the Hindu pantheon. His elephant head symbolizes wisdom and his large belly represents generosity and acceptance. He is invoked before the start of any new venture to ensure its success. He is the son of Shiva and Parvati.",
    mantra: "Om Gam Ganapataye Namaha",
    mantraAudio: "/audio/mantras/ganesha.mp3",
    imageUrl: ganeshaImage,
    parent: "Shiva",
    imageGallery: [ganeshaImage],
    festivals: [
      { name: "Ganesh Chaturthi", date: "Aug-Sep", description: "10-day festival celebrating Ganesha's birth" },
      { name: "Ganesh Jayanti", date: "Jan-Feb", description: "Birthday celebration in Magha month" }
    ],
    relatedStories: [
      { title: "Birth of Ganesha", epic: "Shiva Purana", link: "/literature/puranas/shiva" },
      { title: "Ganesha and the Moon", epic: "Puranas", link: "/literature/puranas" }
    ]
  },
  {
    id: 2,
    name: "Shiva",
    description: "One of the principal deities, known as the destroyer and transformer.",
    longDescription: "Shiva, part of the Hindu Trinity, is a complex deity who represents destruction for the purpose of re-creation. He is often depicted in deep meditation or dancing the Tandava. His followers are called Shaivites.",
    mantra: "Om Namah Shivaya",
    mantraAudio: "/audio/mantras/shiva.mp3",
    imageUrl: shivaImage,
    trinity: true,
    imageGallery: [shivaImage],
    festivals: [
      { name: "Maha Shivaratri", date: "Feb-Mar", description: "The great night of Shiva, most important Shiva festival" },
      { name: "Shravan Somvar", date: "July-Aug", description: "Mondays in the holy month of Shravan" }
    ],
    relatedStories: [
      { title: "Samudra Manthan", epic: "Puranas", link: "/literature/puranas" },
      { title: "Marriage of Shiva and Parvati", epic: "Shiva Purana", link: "/literature/puranas/shiva" }
    ]
  },
  {
    id: 3,
    name: "Vishnu",
    description: "The preserver and protector of the universe. He returns to earth to restore balance.",
    longDescription: "Vishnu is the central god in Vaishnavism and another member of the Hindu Trinity. He is believed to have incarnated in various forms, known as avatars (like Rama and Krishna), to vanquish evil and uphold cosmic order.",
    mantra: "Om Namo Bhagavate Vasudevaya",
    mantraAudio: "/audio/mantras/vishnu.mp3",
    imageUrl: vishnuImage,
    trinity: true,
    imageGallery: [vishnuImage],
    festivals: [
      { name: "Vaikunta Ekadashi", date: "Dec-Jan", description: "Most important Vishnu festival" },
      { name: "Vishnu Jayanti", date: "March-April", description: "Appearance day of Lord Vishnu" }
    ],
    relatedStories: [
      { title: "Dashavatara Stories", epic: "Puranas", link: "/literature/puranas" },
      { title: "Vishnu's Cosmic Sleep", epic: "Vishnu Purana", link: "/literature/puranas/vishnu" }
    ]
  },
  {
    id: 4,
    name: "Brahma",
    description: "The creator god in the Hindu Trinity, responsible for the creation of the universe.",
    longDescription: "Brahma is the creator of the universe and all beings. He is depicted with four heads, representing the four Vedas, and is the source of all knowledge. He is the consort of Saraswati, the goddess of knowledge.",
    mantra: "Om Namo Rajo Gushe Srishti Sthithou Palayithou",
    mantraAudio: "/audio/mantras/brahma.mp3",
    imageUrl: brahmaImage,
    trinity: true,
    imageGallery: [brahmaImage],
    festivals: [
      { name: "Brahma Jayanti", date: "Oct-Nov", description: "Birthday of Lord Brahma on Kartik Purnima" }
    ],
    relatedStories: [
      { title: "Creation of the Universe", epic: "Brahma Purana", link: "/literature/puranas" },
      { title: "Why Brahma is Not Worshipped", epic: "Puranas", link: "/literature/puranas" }
    ]
  },
  {
    id: 5,
    name: "Lakshmi",
    description: "The goddess of wealth, fortune, and prosperity. She is the consort of Vishnu.",
    longDescription: "Lakshmi is the goddess of wealth, fortune, and prosperity. She is the wife and active energy of Vishnu. Her four hands represent the four goals of human life: dharma, kama, artha, and moksha.",
    mantra: "Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed",
    mantraAudio: "/audio/mantras/lakshmi.mp3",
    imageUrl: lakshmiImage,
    parent: "Vishnu",
    imageGallery: [lakshmiImage],
    festivals: [
      { name: "Diwali", date: "Oct-Nov", description: "Festival of lights celebrating Lakshmi" },
      { name: "Varalakshmi Vratam", date: "July-Aug", description: "Special worship day for married women" }
    ],
    relatedStories: [
      { title: "Birth from Ocean of Milk", epic: "Puranas", link: "/literature/puranas" },
      { title: "Lakshmi and Vishnu", epic: "Vishnu Purana", link: "/literature/puranas/vishnu" }
    ]
  },
  {
    id: 6,
    name: "Parvati",
    description: "The goddess of fertility, love, and devotion. She is the consort of Shiva.",
    longDescription: "Parvati is the wife of Shiva and the mother of Ganesha and Kartikeya. She represents the gentle and nurturing aspect of the divine feminine energy.",
    mantra: "Sarva Mangala Mangalye Sive Sarvartha Sadhike Saranye Trayambike Gauri Narayani Namostute",
    mantraAudio: "/audio/mantras/parvati.mp3",
    imageUrl: parvatiImage,
    parent: "Shiva",
    imageGallery: [parvatiImage, durgaImage, kaliImage],
    festivals: [
      { name: "Teej", date: "July-Aug", description: "Festival celebrating marital bliss" },
      { name: "Gauri Tritiya", date: "April-May", description: "Worship of Goddess Gauri" }
    ],
    relatedStories: [
      { title: "Parvati's Penance for Shiva", epic: "Shiva Purana", link: "/literature/puranas/shiva" },
      { title: "Birth of Ganesha", epic: "Puranas", link: "/literature/puranas" }
    ]
  },
  {
    id: 7,
    name: "Saraswati",
    description: "The goddess of knowledge, music, art, wisdom, and learning. She is the consort of Brahma.",
    longDescription: "Saraswati is the Hindu goddess of knowledge, music, art, speech, wisdom, and learning. She is a part of the trinity of Saraswati, Lakshmi, and Parvati.",
    mantra: "Om Aim Saraswatyai Namah",
    mantraAudio: "/audio/mantras/saraswati.mp3",
    imageUrl: saraswatiImage,
    parent: "Brahma",
    category: "Goddess",
    imageGallery: [saraswatiImage],
    festivals: [
      { name: "Vasant Panchami", date: "Jan-Feb", description: "Spring festival celebrating knowledge and arts" },
      { name: "Saraswati Puja", date: "Jan-Feb", description: "Worship of the goddess of learning" }
    ],
    relatedStories: [
      { title: "Saraswati and the Vedas", epic: "Brahma Purana", link: "/literature/puranas" },
      { title: "Origin of Saraswati River", epic: "Puranas", link: "/literature/puranas" }
    ]
  },
  {
    id: 8,
    name: "Hanuman",
    description: "The monkey god, symbol of devotion, strength, and loyalty.",
    longDescription: "Hanuman is the divine vanara (monkey) companion of Lord Rama. He is revered as a symbol of physical strength, perseverance, devotion, and dedication. He is considered an avatar of Shiva.",
    mantra: "Om Hanumate Namah",
    mantraAudio: "/audio/mantras/hanuman.mp3",
    imageUrl: hanumanImage,
    category: "Major Deity",
    parent: "Shiva",
    imageGallery: [hanumanImage],
    festivals: [
      { name: "Hanuman Jayanti", date: "March-April", description: "Birthday celebration of Hanuman" },
      { name: "Hanuman Chalisa Recitation", date: "Every Tuesday", description: "Weekly devotional practice" }
    ],
    relatedStories: [
      { title: "Hanuman Meets Rama", epic: "Ramayana", link: "/literature/ramayana/kishkindha" },
      { title: "Hanuman Brings Sanjeevani", epic: "Ramayana", link: "/literature/ramayana/yuddha" },
      { title: "Hanuman Crosses the Ocean", epic: "Ramayana", link: "/literature/ramayana/sundara" }
    ]
  },
  {
    id: 9,
    name: "Durga",
    description: "The fierce warrior goddess who combats evil and demonic forces.",
    longDescription: "Durga is a principal form of the Goddess, also known as Devi and Shakti. She is the warrior form of Parvati, created to defeat demons and protect the cosmos. She rides a lion or tiger and has eight to ten arms carrying weapons.",
    mantra: "Om Dum Durgayei Namaha",
    mantraAudio: "/audio/mantras/durga.mp3",
    imageUrl: durgaImage,
    category: "Goddess",
    parent: "Shiva",
    imageGallery: [durgaImage, parvatiImage],
    festivals: [
      { name: "Durga Puja", date: "Sep-Oct", description: "Nine-day festival celebrating victory of good over evil" },
      { name: "Navaratri", date: "Sep-Oct", description: "Nine nights of Goddess worship" }
    ],
    relatedStories: [
      { title: "Slaying of Mahishasura", epic: "Devi Mahatmya", link: "/literature/puranas" },
      { title: "Birth of Durga", epic: "Devi Bhagavata Purana", link: "/literature/puranas" }
    ]
  },
  {
    id: 10,
    name: "Kali",
    description: "The fierce form of the Divine Mother associated with time and change.",
    longDescription: "Kali is the fierce aspect of Parvati. She is the goddess of time, change, power, and destruction. Despite her fearsome appearance, she is considered the loving mother goddess who protects her devotees.",
    mantra: "Om Krim Kalikaye Namah",
    mantraAudio: "/audio/mantras/kali.mp3",
    imageUrl: kaliImage,
    category: "Goddess",
    parent: "Shiva",
    imageGallery: [kaliImage, parvatiImage],
    festivals: [
      { name: "Kali Puja", date: "Oct-Nov", description: "Celebrated on new moon night of Diwali" },
      { name: "Kali Jayanti", date: "Nov-Dec", description: "Appearance day of Goddess Kali" }
    ],
    relatedStories: [
      { title: "Kali and Shiva", epic: "Puranas", link: "/literature/puranas" },
      { title: "Slaying of Raktabija", epic: "Devi Mahatmya", link: "/literature/puranas" }
    ]
  },
  {
    id: 11,
    name: "Krishna",
    description: "The eighth avatar of Vishnu, teacher of the Bhagavad Gita.",
    longDescription: "Krishna is a major deity in Hinduism. He is worshipped as the eighth avatar of Vishnu and also as the supreme God in his own right. He is the god of protection, compassion, tenderness, and love.",
    mantra: "Om Klim Krishnaya Namah",
    mantraAudio: "/audio/mantras/krishna.mp3",
    imageUrl: krishnaImage,
    category: "Major Deity",
    parent: "Vishnu",
    imageGallery: [krishnaImage, vishnuImage],
    festivals: [
      { name: "Krishna Janmashtami", date: "Aug-Sep", description: "Birthday celebration of Lord Krishna" },
      { name: "Holi", date: "Feb-Mar", description: "Festival of colors associated with Krishna" }
    ],
    relatedStories: [
      { title: "Birth of Krishna", epic: "Bhagavata Purana", link: "/literature/puranas" },
      { title: "Krishna and Arjuna", epic: "Mahabharata", link: "/literature/mahabharata" },
      { title: "Lifting Govardhan Hill", epic: "Bhagavata Purana", link: "/literature/puranas" }
    ]
  },
  {
    id: 12,
    name: "Rama",
    description: "The seventh avatar of Vishnu, hero of the Ramayana.",
    longDescription: "Rama is the seventh avatar of Vishnu and is considered the ideal man and king. His life and journey is one of adherence to dharma despite harsh tests and obstacles. The Ramayana narrates his story.",
    mantra: "Om Shri Ramaya Namah",
    mantraAudio: "/audio/mantras/rama.mp3",
    imageUrl: ramaImage,
    category: "Major Deity",
    parent: "Vishnu",
    imageGallery: [ramaImage, vishnuImage],
    festivals: [
      { name: "Ram Navami", date: "March-April", description: "Birthday of Lord Rama" },
      { name: "Dussehra", date: "Sep-Oct", description: "Celebrates Rama's victory over Ravana" }
    ],
    relatedStories: [
      { title: "Birth and Childhood", epic: "Ramayana", link: "/literature/ramayana/bala" },
      { title: "Exile and Sita's Abduction", epic: "Ramayana", link: "/literature/ramayana/aranya" },
      { title: "War with Ravana", epic: "Ramayana", link: "/literature/ramayana/yuddha" }
    ]
  },
  {
    id: 13,
    name: "Surya",
    description: "The Sun God, source of light and energy.",
    longDescription: "Surya is the solar deity in Hinduism. He is considered the creator of the universe and the source of all life. He is one of the Navagraha (nine planetary deities).",
    mantra: "Om Suryaya Namah",
    mantraAudio: "/audio/mantras/surya.mp3",
    imageUrl: suryaImage,
    category: "Navagraha",
    imageGallery: [suryaImage],
    festivals: [
      { name: "Makar Sankranti", date: "January 14", description: "Sun's transition to Capricorn" },
      { name: "Chhath Puja", date: "Oct-Nov", description: "Worship of Sun God for prosperity" },
      { name: "Ratha Saptami", date: "Jan-Feb", description: "Surya's birthday celebration" }
    ],
    relatedStories: [
      { title: "Surya and Karna", epic: "Mahabharata", link: "/literature/mahabharata" },
      { title: "Surya's Chariot", epic: "Puranas", link: "/literature/puranas" }
    ]
  },
  {
    id: 14,
    name: "Chandra",
    description: "The Moon God, controller of emotions and mind.",
    longDescription: "Chandra is the lunar deity in Hinduism. He is associated with the mind, emotions, and fertility. He is one of the Navagraha (nine planetary deities).",
    mantra: "Om Chandraya Namah",
    mantraAudio: "/audio/mantras/chandra.mp3",
    imageUrl: chandraImage,
    category: "Navagraha",
    imageGallery: [chandraImage],
    festivals: [
      { name: "Sharad Purnima", date: "Oct-Nov", description: "Full moon night when moon rays have healing properties" },
      { name: "Karva Chauth", date: "Oct-Nov", description: "Women fast for husband's longevity, break fast seeing moon" }
    ],
    relatedStories: [
      { title: "Chandra's Curse", epic: "Puranas", link: "/literature/puranas" },
      { title: "Moon's 27 Wives", epic: "Puranas", link: "/literature/puranas" }
    ]
  },
  {
    id: 15,
    name: "Indra",
    description: "The King of Gods and ruler of heaven.",
    longDescription: "Indra is the king of the gods (Devas) and heaven (Svarga) in Hindu mythology. He is the god of rain, thunderstorms, and war. He wields the Vajra (thunderbolt).",
    mantra: "Om Indraya Namah",
    mantraAudio: "/audio/mantras/indra.mp3",
    imageUrl: indraImage,
    category: "Vedic God",
    imageGallery: [indraImage],
    festivals: [
      { name: "Indra Jatra", date: "Aug-Sep", description: "Festival honoring Indra, especially in Nepal" }
    ],
    relatedStories: [
      { title: "Indra and Vritra", epic: "Rig Veda", link: "/literature/vedas" },
      { title: "Indra's Pride", epic: "Bhagavata Purana", link: "/literature/puranas" }
    ]
  },
  {
    id: 16,
    name: "Agni",
    description: "The Fire God, messenger between humans and gods.",
    longDescription: "Agni is the Hindu god of fire. He accepts sacrifices made by humans and carries them to the gods. He is one of the most important Vedic deities.",
    mantra: "Om Agnaye Namah",
    mantraAudio: "/audio/mantras/agni.mp3",
    imageUrl: agniImage,
    category: "Vedic God",
    imageGallery: [agniImage],
    festivals: [
      { name: "Holi", date: "Feb-Mar", description: "Holika Dahan involves worship of Agni" },
      { name: "Agni Nakshatra", date: "Various", description: "Worship during fire-related auspicious days" }
    ],
    relatedStories: [
      { title: "Agni in Vedic Rituals", epic: "Rig Veda", link: "/literature/vedas" },
      { title: "Birth of Agni", epic: "Puranas", link: "/literature/puranas" }
    ]
  },
  {
    id: 17,
    name: "Kartikeya",
    description: "The God of war and victory, son of Shiva and Parvati.",
    longDescription: "Kartikeya, also known as Murugan, Skanda, and Subrahmanya, is the Hindu god of war. He is the commander of the army of the gods and was created to defeat the demon Tarakasura.",
    mantra: "Om Saravanabhavaya Namah",
    mantraAudio: "/audio/mantras/kartikeya.mp3",
    imageUrl: kartikeyaImage,
    category: "Major Deity",
    parent: "Shiva",
    imageGallery: [kartikeyaImage],
    festivals: [
      { name: "Skanda Shashti", date: "Oct-Nov", description: "Six-day festival celebrating victory over demons" },
      { name: "Thaipusam", date: "Jan-Feb", description: "Tamil festival honoring Murugan" }
    ],
    relatedStories: [
      { title: "Birth of Kartikeya", epic: "Shiva Purana", link: "/literature/puranas/shiva" },
      { title: "Slaying of Tarakasura", epic: "Skanda Purana", link: "/literature/puranas" }
    ]
  },
  {
    id: 18,
    name: "Kubera",
    description: "The God of wealth and prosperity.",
    longDescription: "Kubera is the Lord of wealth and the god-king of the semi-divine Yakshas. He is the guardian of the North direction and is often depicted as a dwarf with a large belly.",
    mantra: "Om Shreem Hreem Kleem Shreem Kleem Kuberaya Namah",
    mantraAudio: "/audio/mantras/kubera.mp3",
    imageUrl: kuberaImage,
    category: "Other",
    imageGallery: [kuberaImage],
    festivals: [
      { name: "Dhanteras", date: "Oct-Nov", description: "Worship of wealth deities including Kubera" },
      { name: "Akshaya Tritiya", date: "April-May", description: "Auspicious day for wealth and prosperity" }
    ],
    relatedStories: [
      { title: "Kubera and Ravana", epic: "Ramayana", link: "/literature/ramayana" },
      { title: "Kubera's Wealth", epic: "Puranas", link: "/literature/puranas" }
    ]
  },
  {
    id: 19,
    name: "Yama",
    description: "The God of death and justice.",
    longDescription: "Yama is the god of death and the king of ancestors. He judges the dead and assigns them their due punishment or reward based on their karma.",
    mantra: "Om Suryaputraya Vidmahe Mahakalaya Dhimahi Tanno Yama Prachodayat",
    mantraAudio: "/audio/mantras/yama.mp3",
    imageUrl: yamaImage,
    category: "Other",
    imageGallery: [yamaImage],
    festivals: [
      { name: "Yama Dwitiya", date: "Oct-Nov", description: "Bhai Dooj - brother-sister festival" },
      { name: "Naraka Chaturdashi", date: "Oct-Nov", description: "Remembrance of Yama and ancestors" }
    ],
    relatedStories: [
      { title: "Savitri and Satyavan", epic: "Mahabharata", link: "/literature/mahabharata" },
      { title: "Yama and Nachiketa", epic: "Katha Upanishad", link: "/literature/upanishads" }
    ]
  },
];

// Category definitions for filtering
export const godCategories = [
  { id: 'all', name: 'All Gods', description: 'Complete Hindu pantheon' },
  { id: 'trinity', name: 'Holy Trinity', description: 'Brahma, Vishnu, Shiva' },
  { id: 'major', name: 'Major Deities', description: 'Most worshipped gods' },
  { id: 'goddess', name: 'Goddesses', description: 'Divine feminine power' },
  { id: 'navagraha', name: 'Navagraha', description: 'Nine planetary deities' },
  { id: 'vedic', name: 'Vedic Gods', description: 'Ancient Vedic deities' },
  { id: 'other', name: 'Other Deities', description: 'Additional divine beings' }
];

// Helper functions
export const getGodsByCategory = (category) => {
  if (category === 'all') return godsData;
  if (category === 'trinity') return godsData.filter(g => g.trinity);
  if (category === 'major') return godsData.filter(g => g.category === 'Major Deity');
  if (category === 'goddess') return godsData.filter(g => g.category === 'Goddess');
  if (category === 'navagraha') return godsData.filter(g => g.category === 'Navagraha');
  if (category === 'vedic') return godsData.filter(g => g.category === 'Vedic God');
  if (category === 'other') return godsData.filter(g => g.category === 'Other');
  return godsData;
};

export const searchGods = (query) => {
  const lowerQuery = query.toLowerCase();
  return godsData.filter(god => 
    god.name.toLowerCase().includes(lowerQuery) ||
    god.description.toLowerCase().includes(lowerQuery) ||
    god.longDescription.toLowerCase().includes(lowerQuery)
  );
};