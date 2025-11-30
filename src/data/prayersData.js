// Daily prayers, mantras, and aartis
export const dailyPrayers = [
  {
    id: 1,
    name: "Gayatri Mantra",
    deity: "Universal Prayer",
    sanskrit: "ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यं । भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥",
    transliteration: "Om Bhūr Bhuvaḥ Svaḥ, Tat Savitur Vareṇyaṃ, Bhargo Devasya Dhīmahi, Dhiyo Yo Naḥ Prachodayāt",
    meaning: "We meditate on the glory of the Creator; Who has created the Universe; Who is worthy of Worship; Who is the embodiment of Knowledge and Light; Who is the remover of all Sin and Ignorance; May He enlighten our Intellect.",
    time: "Morning"
  },
  {
    id: 2,
    name: "Mahamrityunjaya Mantra",
    deity: "Lord Shiva",
    sanskrit: "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात् ॥",
    transliteration: "Om Tryambakaṃ Yajāmahe Sugandhiṃ Puṣṭi-Vardhanam, Urvārukam-Iva Bandhanān Mṛtyor-Mukṣīya Mā-'mṛtāt",
    meaning: "We worship the Three-eyed Lord Shiva who is fragrant and who nourishes all. Like the fruit falls off from the bondage of the stem, may He liberate us from death for the sake of immortality.",
    time: "Anytime"
  },
  {
    id: 3,
    name: "Shanti Mantra",
    deity: "Peace Prayer",
    sanskrit: "ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्वि नावधीतमस्तु मा विद्विषावहै । ॐ शान्तिः शान्तिः शान्तिः ॥",
    transliteration: "Om Saha Nāvavatu, Saha Nau Bhunaktu, Saha Vīryaṃ Karavāvahai, Tejasvi Nāvadhītamastu Mā Vidviṣāvahai, Om Śāntiḥ Śāntiḥ Śāntiḥ",
    meaning: "May He protect us both together; may He nourish us both together; May we work conjointly with great energy, May our study be vigorous and effective; May we not mutually dispute, Om Peace, Peace, Peace.",
    time: "Morning/Evening"
  },
  {
    id: 4,
    name: "Ganesh Mantra",
    deity: "Lord Ganesha",
    sanskrit: "ॐ गं गणपतये नमः",
    transliteration: "Om Gaṃ Gaṇapataye Namaḥ",
    meaning: "I bow to Lord Ganesha, the remover of obstacles. Salutations to the Lord of all beings.",
    time: "Morning (Start of day)"
  },
  {
    id: 5,
    name: "Hanuman Chalisa - Opening",
    deity: "Lord Hanuman",
    sanskrit: "श्रीगुरु चरन सरोज रज, निज मन मुकुर सुधारि । बरनउं रघुबर बिमल जसु, जो दायक फल चारि ॥",
    transliteration: "Śrī Guru Charana Saroja Raja, Nija Mana Mukura Sudhāri, Baranaūṃ Raghubara Bimala Jasu, Jo Dāyaka Phala Chāri",
    meaning: "With the dust of Guru's lotus feet, I cleanse the mirror of my mind and then narrate the sacred glory of Sri Ram Chandra, who bestows the four fruits of life.",
    time: "Morning/Evening"
  },
  {
    id: 6,
    name: "Vishnu Mantra",
    deity: "Lord Vishnu",
    sanskrit: "ॐ नमो भगवते वासुदेवाय",
    transliteration: "Om Namo Bhagavate Vāsudevāya",
    meaning: "I bow to Lord Vasudeva (Krishna/Vishnu), the Supreme Personality of Godhead.",
    time: "Anytime"
  },
  {
    id: 7,
    name: "Lakshmi Mantra",
    deity: "Goddess Lakshmi",
    sanskrit: "ॐ श्रीं महालक्ष्म्यै नमः",
    transliteration: "Om Śrīṃ Mahālakṣmyai Namaḥ",
    meaning: "I bow to Goddess Mahalakshmi, the supreme goddess of wealth, prosperity, and abundance.",
    time: "Morning/Evening"
  },
  {
    id: 8,
    name: "Saraswati Mantra",
    deity: "Goddess Saraswati",
    sanskrit: "ॐ ऐं सरस्वत्यै नमः",
    transliteration: "Om Aiṃ Sarasvatyai Namaḥ",
    meaning: "I bow to Goddess Saraswati, the goddess of knowledge, music, arts, and wisdom.",
    time: "Morning (Before studies)"
  }
];

// Get prayer based on time of day
export const getPrayerOfTheDay = () => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 12) {
    // Morning: Gayatri Mantra or Ganesh Mantra
    return dailyPrayers[Math.random() < 0.5 ? 0 : 3];
  } else if (hour >= 12 && hour < 17) {
    // Afternoon: Vishnu or Shanti Mantra
    return dailyPrayers[Math.random() < 0.5 ? 5 : 2];
  } else if (hour >= 17 && hour < 21) {
    // Evening: Hanuman or Lakshmi Mantra
    return dailyPrayers[Math.random() < 0.5 ? 4 : 6];
  } else {
    // Night: Mahamrityunjaya Mantra
    return dailyPrayers[1];
  }
};

// Aarti collection
export const aartis = [
  {
    id: 1,
    name: "Om Jai Jagdish Hare",
    deity: "Universal Aarti",
    description: "Universal aarti sung for all deities"
  },
  {
    id: 2,
    name: "Aarti Kunj Bihari Ki",
    deity: "Lord Krishna",
    description: "Evening aarti for Lord Krishna"
  },
  {
    id: 3,
    name: "Jai Ganesh Deva",
    deity: "Lord Ganesha",
    description: "Aarti for Lord Ganesha"
  },
  {
    id: 4,
    name: "Om Jai Shiv Omkara",
    deity: "Lord Shiva",
    description: "Aarti for Lord Shiva"
  }
];
