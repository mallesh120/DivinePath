// Shiva Purana
// One of the eighteen Mahapuranas, glorifying Lord Shiva

export const shivaPuranaObject = {
  id: 5,
  title: 'Shiva Purana',
  type: 'purana',
  summary: 'One of the eighteen Mahapuranas, dedicated to Lord Shiva, describing his glory, forms, sacred places, and stories of devotees.',
  imageUrl: '/assets/images/shiva_purana.png', // To be added
  introduction: "The Shiva Purana is one of the eighteen Mahapuranas and is dedicated to Lord Shiva. It glorifies Shiva as the supreme being, describes his various forms and manifestations, narrates stories of his devotees, and provides guidelines for worship and spiritual practices. It contains approximately 24,000 verses organized into seven samhitas (sections).",
  hasAudio: true,
  hasIllustrations: true,
  samhitas: [
    {
      number: 1,
      title: "Vidyeshvara Samhita",
      summary: "Introduces the glory of Shiva, the creation of the universe, and fundamental Shaivite philosophy.",
      chapters: 25,
      keyTopics: [
        "Glory and supremacy of Shiva",
        "Creation through Shiva's will",
        "The nature of Shiva's forms",
        "The importance of Shiva worship",
        "The power of the sacred syllable 'Om Namah Shivaya'"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 2,
      title: "Rudra Samhita",
      summary: "The largest section describing Shiva's various manifestations, his marriage to Sati and Parvati, and stories of his devotees.",
      chapters: 67,
      keyTopics: [
        "Birth of Rudra (Shiva)",
        "The story of Daksha's sacrifice and Sati's self-immolation",
        "Shiva's marriage to Parvati",
        "Birth of Kartikeya and Ganesha",
        "Various forms and avatars of Shiva",
        "Stories of devoted followers"
      ],
      audioUrl: null,
      illustration: null,
      stories: [
        {
          title: "Daksha's Sacrifice and Sati's Sacrifice",
          summary: "Sati attends her father Daksha's sacrifice despite Shiva not being invited. Unable to bear the insult to Shiva, she immolates herself.",
          hasIllustration: true,
          illustrationUrl: null,
          keyMessage: "Devotion to one's chosen deity above all else"
        },
        {
          title: "Shiva's Marriage to Parvati",
          summary: "After Sati's death, she is reborn as Parvati and performs severe penance to win Shiva as her husband.",
          hasIllustration: true,
          illustrationUrl: null,
          keyMessage: "The power of devotion and determination"
        },
        {
          title: "Birth of Ganesha",
          summary: "Parvati creates Ganesha from sandalwood paste. Shiva unknowingly beheads him and later restores him with an elephant's head.",
          hasIllustration: true,
          illustrationUrl: null,
          keyMessage: "Obedience and the blessings of misfortune"
        }
      ]
    },
    {
      number: 3,
      title: "Shatrudra Samhita",
      summary: "Describes the hundred forms of Rudra and their significance in creation and destruction.",
      chapters: 42,
      keyTopics: [
        "The hundred Rudras and their manifestations",
        "The cosmic dance of Shiva (Tandava)",
        "Shiva as the destroyer and regenerator",
        "The significance of Shiva's third eye",
        "Shiva's role in the cosmic cycles"
      ],
      audioUrl: null,
      illustration: null,
      stories: [
        {
          title: "The Cosmic Dance (Tandava)",
          summary: "Shiva performs the Tandava, the cosmic dance of creation, preservation, and destruction.",
          hasIllustration: true,
          illustrationUrl: null,
          keyMessage: "The rhythm of the universe"
        }
      ]
    },
    {
      number: 4,
      title: "Koti Rudra Samhita",
      summary: "Elaborates on the countless forms of Shiva and methods of worshipping him.",
      chapters: 43,
      keyTopics: [
        "Infinite forms of Shiva",
        "Methods of Shiva worship",
        "The significance of the Shiva Linga",
        "Sacred mantras and their powers",
        "Rituals for different occasions"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 5,
      title: "Uma Samhita",
      summary: "Contains dialogues between Shiva and Parvati (Uma) on various philosophical and spiritual topics.",
      chapters: 51,
      keyTopics: [
        "Philosophical dialogues between Shiva and Parvati",
        "The nature of reality and illusion (Maya)",
        "The path to liberation",
        "The relationship between the devotee and God",
        "Yoga and meditation practices"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 6,
      title: "Kailasa Samhita",
      summary: "Describes Mount Kailash, Shiva's abode, and the glory of his sacred places.",
      chapters: 23,
      keyTopics: [
        "Mount Kailash - Shiva's abode",
        "The twelve Jyotirlingas",
        "Sacred Shiva temples",
        "Holy rivers associated with Shiva",
        "Pilgrimage to Shiva's sacred places"
      ],
      audioUrl: null,
      illustration: null,
      sacredPlaces: [
        { name: "Somnath", location: "Gujarat", significance: "First Jyotirlinga" },
        { name: "Mallikarjuna", location: "Andhra Pradesh", significance: "Second Jyotirlinga" },
        { name: "Mahakaleshwar", location: "Ujjain, Madhya Pradesh", significance: "Third Jyotirlinga" },
        { name: "Omkareshwar", location: "Madhya Pradesh", significance: "Fourth Jyotirlinga" },
        { name: "Kedarnath", location: "Uttarakhand", significance: "Fifth Jyotirlinga" },
        { name: "Bhimashankar", location: "Maharashtra", significance: "Sixth Jyotirlinga" },
        { name: "Kashi Vishwanath", location: "Varanasi, Uttar Pradesh", significance: "Seventh Jyotirlinga" },
        { name: "Trimbakeshwar", location: "Maharashtra", significance: "Eighth Jyotirlinga" },
        { name: "Vaidyanath", location: "Jharkhand", significance: "Ninth Jyotirlinga" },
        { name: "Nageshwar", location: "Gujarat", significance: "Tenth Jyotirlinga" },
        { name: "Rameshwaram", location: "Tamil Nadu", significance: "Eleventh Jyotirlinga" },
        { name: "Grishneshwar", location: "Maharashtra", significance: "Twelfth Jyotirlinga" }
      ]
    },
    {
      number: 7,
      title: "Vayaviya Samhita",
      summary: "Contains teachings given by Vayu (wind god) about Shiva worship and spiritual practices.",
      chapters: 30,
      keyTopics: [
        "Advanced spiritual practices",
        "Esoteric knowledge of Shiva",
        "The power of devotion (bhakti)",
        "Liberation through Shiva's grace",
        "Stories of great Shiva devotees"
      ],
      audioUrl: null,
      illustration: null,
      stories: [
        {
          title: "Markandeya's Devotion",
          summary: "Young Markandeya, destined to die at sixteen, defeats death through his unwavering devotion to Shiva.",
          hasIllustration: true,
          illustrationUrl: null,
          keyMessage: "Devotion can conquer even death"
        }
      ]
    }
  ]
};
