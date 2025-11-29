// Bhagavad Gita - 18 Chapters
// Each chapter includes verses, audio narration support, and illustrations

export const bhagavadGitaObject = {
  id: 3,
  title: 'Bhagavad Gita',
  type: 'scripture',
  summary: 'The divine dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra, covering philosophy, devotion, and the path to enlightenment.',
  imageUrl: '/assets/images/bhagavad_gita.png', // To be added
  introduction: "The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture that is part of the epic Mahabharata. It presents a synthesis of Hindu ideas about dharma, theistic bhakti, and the yogic ideals of moksha. The text is a dialogue between Prince Arjuna and the god Krishna, who serves as his charioteer.",
  hasAudio: true,
  hasIllustrations: true,
  chapters: [
    {
      number: 1,
      title: "Arjuna Vishada Yoga (The Yoga of Arjuna's Dejection)",
      verses: 47,
      summary: "Arjuna sees his friends and relatives on the opposing side and is overcome with grief and moral dilemma about fighting them.",
      keyTeachings: [
        "Setting the stage for the discourse",
        "Arjuna's moral crisis",
        "The nature of duty and righteousness"
      ],
      audioUrl: null, // To be added when audio files are available
      illustration: null, // To be added when illustrations are available
      sampleVerses: [
        {
          number: 1,
          sanskrit: "धृतराष्ट्र उवाच | धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः |",
          transliteration: "dhṛtarāṣṭra uvāca | dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ",
          translation: "Dhritarashtra said: O Sanjaya, what did my sons and the sons of Pandu do when they assembled on the sacred field of Kurukshetra, eager for battle?"
        }
      ]
    },
    {
      number: 2,
      title: "Sankhya Yoga (The Yoga of Knowledge)",
      verses: 72,
      summary: "Krishna begins his teachings, explaining the eternal nature of the soul and introducing the concept of Karma Yoga.",
      keyTeachings: [
        "The immortality of the soul",
        "The path of selfless action (Karma Yoga)",
        "Equanimity in success and failure",
        "The nature of the self-realized person"
      ],
      audioUrl: null,
      illustration: null,
      sampleVerses: [
        {
          number: 47,
          sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन |",
          transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana",
          translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action."
        }
      ]
    },
    {
      number: 3,
      title: "Karma Yoga (The Yoga of Action)",
      verses: 43,
      summary: "Krishna elaborates on Karma Yoga, explaining the importance of performing one's duty without attachment to results.",
      keyTeachings: [
        "The importance of action",
        "Selfless service",
        "Transcending desire and attachment",
        "The role of sacrifice (yajna)"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 4,
      title: "Jnana Karma Sanyasa Yoga (The Yoga of Knowledge and Renunciation)",
      verses: 42,
      summary: "Krishna reveals his divine nature, the purpose of his incarnations, and the relationship between knowledge and action.",
      keyTeachings: [
        "Divine incarnation (Avatar)",
        "The ancient yoga tradition",
        "Knowledge through sacrifice",
        "The nature of action and inaction"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 5,
      title: "Karma Sanyasa Yoga (The Yoga of Renunciation of Action)",
      verses: 29,
      summary: "Krishna explains that both the path of renunciation and the path of selfless action lead to liberation.",
      keyTeachings: [
        "Unity of knowledge and action",
        "True renunciation",
        "Inner peace through detachment",
        "Seeing the divine in all beings"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 6,
      title: "Atma Samyama Yoga (The Yoga of Self-Mastery)",
      verses: 47,
      summary: "Krishna describes the practice of meditation and the discipline required to control the mind.",
      keyTeachings: [
        "The practice of meditation (dhyana)",
        "Controlling the mind",
        "The characteristics of a true yogi",
        "Gradual progress on the spiritual path"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 7,
      title: "Jnana Vijnana Yoga (The Yoga of Knowledge and Wisdom)",
      verses: 30,
      summary: "Krishna explains his divine nature and the different paths devotees take to reach him.",
      keyTeachings: [
        "Knowledge of the Absolute Truth",
        "Material and spiritual nature",
        "Different types of devotees",
        "The rare soul who truly knows Krishna"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 8,
      title: "Aksara Brahma Yoga (The Yoga of the Imperishable Absolute)",
      verses: 28,
      summary: "Krishna explains the concepts of the imperishable Brahman, karma, and how to remember him at the time of death.",
      keyTeachings: [
        "The nature of Brahman",
        "Remembering God at death",
        "The path of light and darkness after death",
        "Unwavering devotion"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 9,
      title: "Raja Vidya Raja Guhya Yoga (The Yoga of Royal Knowledge and Royal Secret)",
      verses: 34,
      summary: "Krishna reveals the most confidential knowledge about devotion and how all creation emanates from and returns to him.",
      keyTeachings: [
        "The supreme secret",
        "Divine manifestation in creation",
        "Pure devotion (bhakti)",
        "God's equal love for all"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 10,
      title: "Vibhuti Yoga (The Yoga of Divine Glories)",
      verses: 42,
      summary: "Krishna describes his divine manifestations and glories that can be perceived in the world.",
      keyTeachings: [
        "Divine manifestations in creation",
        "The glory of God in all things",
        "How to see the divine everywhere",
        "Krishna as the source of all"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 11,
      title: "Visvarupa Darsana Yoga (The Yoga of the Vision of the Universal Form)",
      verses: 55,
      summary: "Arjuna requests to see Krishna's universal form. Krishna grants him divine vision to behold his cosmic manifestation.",
      keyTeachings: [
        "The universal form of God",
        "Divine vision granted to Arjuna",
        "The awesome power of the Supreme",
        "Return to the personal form"
      ],
      audioUrl: null,
      illustration: null,
      isIconic: true // This is the most famous chapter with Vishvarupa
    },
    {
      number: 12,
      title: "Bhakti Yoga (The Yoga of Devotion)",
      verses: 20,
      summary: "Krishna explains the path of devotion and the qualities of his devotees.",
      keyTeachings: [
        "The superiority of bhakti (devotion)",
        "Qualities of a true devotee",
        "Personal vs. impersonal worship",
        "The path most dear to Krishna"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 13,
      title: "Ksetra Ksetrajna Vibhaga Yoga (The Yoga of Distinction between Field and Knower)",
      verses: 35,
      summary: "Krishna explains the difference between the body (field) and the soul (knower of the field).",
      keyTeachings: [
        "The body and the knower of the body",
        "Material nature and consciousness",
        "Knowledge and the object of knowledge",
        "The Supreme Soul in all beings"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 14,
      title: "Gunatraya Vibhaga Yoga (The Yoga of Division of Three Gunas)",
      verses: 27,
      summary: "Krishna describes the three modes of material nature (gunas) and how to transcend them.",
      keyTeachings: [
        "The three gunas: sattva, rajas, tamas",
        "How the gunas bind the soul",
        "Transcending the gunas",
        "Symptoms of one who has transcended"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 15,
      title: "Purusottama Yoga (The Yoga of the Supreme Person)",
      verses: 20,
      summary: "Krishna describes the imperishable tree of material existence and reveals himself as the Supreme Person.",
      keyTeachings: [
        "The cosmic tree of material existence",
        "The perishable and imperishable",
        "The Supreme Person (Purushottama)",
        "Knowledge that leads to liberation"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 16,
      title: "Daivasura Sampad Vibhaga Yoga (The Yoga of Divine and Demoniac Natures)",
      verses: 24,
      summary: "Krishna contrasts divine and demoniac qualities, explaining which lead to liberation and which to bondage.",
      keyTeachings: [
        "Divine qualities (daivi sampad)",
        "Demoniac qualities (asuri sampad)",
        "The fate of the demoniac",
        "The importance of scripture"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 17,
      title: "Sraddhatraya Vibhaga Yoga (The Yoga of Division of Three Kinds of Faith)",
      verses: 28,
      summary: "Krishna explains how the three gunas influence faith, worship, food, sacrifice, austerity, and charity.",
      keyTeachings: [
        "Three types of faith",
        "Worship according to one's nature",
        "Sattvic, rajasic, and tamasic foods",
        "Charity, austerity, and sacrifice in three modes"
      ],
      audioUrl: null,
      illustration: null
    },
    {
      number: 18,
      title: "Moksa Sanyasa Yoga (The Yoga of Liberation through Renunciation)",
      verses: 78,
      summary: "The final chapter synthesizes all teachings, emphasizing complete surrender to Krishna as the ultimate path to liberation.",
      keyTeachings: [
        "True renunciation vs. abandonment",
        "Types of knowledge, action, and doer",
        "The five factors of action",
        "Complete surrender to God",
        "The ultimate instruction: abandon all dharmas and surrender"
      ],
      audioUrl: null,
      illustration: null,
      isConclusion: true
    }
  ]
};
