import ganeshaImage from '../assets/images/Gods/ganesha.png';
import shivaImage from '../assets/images/Gods/Shiva.png';
import vishnuImage from '../assets/images/Gods/vishnu.png';
import brahmaImage from '../assets/images/Gods/brahma.png';
import lakshmiImage from '../assets/images/Gods/lakshmi.png';
import parvatiImage from '../assets/images/Gods/parvati.png';
import saraswatiImage from '../assets/images/Gods/saraswati.png';

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
        description: "God of war and victory"
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
    imageUrl: ganeshaImage,
    parent: "Shiva"
  },
  {
    id: 2,
    name: "Shiva",
    description: "One of the principal deities, known as the destroyer and transformer.",
    longDescription: "Shiva, part of the Hindu Trinity, is a complex deity who represents destruction for the purpose of re-creation. He is often depicted in deep meditation or dancing the Tandava. His followers are called Shaivites.",
    mantra: "Om Namah Shivaya",
    imageUrl: shivaImage,
    trinity: true
  },
  {
    id: 3,
    name: "Vishnu",
    description: "The preserver and protector of the universe. He returns to earth to restore balance.",
    longDescription: "Vishnu is the central god in Vaishnavism and another member of the Hindu Trinity. He is believed to have incarnated in various forms, known as avatars (like Rama and Krishna), to vanquish evil and uphold cosmic order.",
    mantra: "Om Namo Bhagavate Vasudevaya",
    imageUrl: vishnuImage,
    trinity: true
  },
  {
    id: 4,
    name: "Brahma",
    description: "The creator god in the Hindu Trinity, responsible for the creation of the universe.",
    longDescription: "Brahma is the creator of the universe and all beings. He is depicted with four heads, representing the four Vedas, and is the source of all knowledge. He is the consort of Saraswati, the goddess of knowledge.",
    mantra: "Om Namo Rajo Gushe Srishti Sthithou Palayithou",
    imageUrl: brahmaImage,
    trinity: true
  },
  {
    id: 5,
    name: "Lakshmi",
    description: "The goddess of wealth, fortune, and prosperity. She is the consort of Vishnu.",
    longDescription: "Lakshmi is the goddess of wealth, fortune, and prosperity. She is the wife and active energy of Vishnu. Her four hands represent the four goals of human life: dharma, kama, artha, and moksha.",
    mantra: "Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed",
    imageUrl: lakshmiImage,
    parent: "Vishnu"
  },
  {
    id: 6,
    name: "Parvati",
    description: "The goddess of fertility, love, and devotion. She is the consort of Shiva.",
    longDescription: "Parvati is the wife of Shiva and the mother of Ganesha and Kartikeya. She represents the gentle and nurturing aspect of the divine feminine energy.",
    mantra: "Sarva Mangala Mangalye Sive Sarvartha Sadhike Saranye Trayambike Gauri Narayani Namostute",
    imageUrl: parvatiImage,
    parent: "Shiva"
  },
  {
    id: 7,
    name: "Saraswati",
    description: "The goddess of knowledge, music, art, wisdom, and learning. She is the consort of Brahma.",
    longDescription: "Saraswati is the Hindu goddess of knowledge, music, art, speech, wisdom, and learning. She is a part of the trinity of Saraswati, Lakshmi, and Parvati.",
    mantra: "Om Aim Saraswatyai Namah",
    imageUrl: saraswatiImage,
    parent: "Brahma"
  },
];