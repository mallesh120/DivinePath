import { kaanda1Scenes } from './kaanda_1';
import { kaanda10Scenes } from './kaanda_10';
import { kaanda20Scenes } from './kaanda_20';

// For kaandas 2-9 and 11-19, create placeholder scene arrays
const createKaandaScenes = (kaandaNumber) => [
  {
    text: `The ${kaandaNumber} kaanda of the Atharvaveda contains hymns addressing various aspects of spiritual practice and material well-being. These verses provide guidance for navigating the complexities of earthly existence while maintaining spiritual awareness.`,
    imageUrl: "https://placehold.co/600x400/EA580C/ffffff?text=Atharvaveda+Scene"
  },
  {
    text: `Prayers in this kaanda invoke divine protection and blessings for specific purposes. The Atharvaveda recognizes that different situations require different approaches, and provides mantras tailored to diverse human needs.`,
    imageUrl: "https://placehold.co/600x400/EA580C/ffffff?text=Atharvaveda+Scene"
  },
  {
    text: `Hymns emphasize the importance of proper conduct and ethical behavior as foundations for success. The Atharvaveda teaches that material prosperity flows naturally to those who live in harmony with cosmic principles.`,
    imageUrl: "https://placehold.co/600x400/EA580C/ffffff?text=Atharvaveda+Scene"
  },
  {
    text: `The kaanda contains teachings on specific practices and rituals suited to the concerns addressed within its hymns. These practical instructions demonstrate how to apply the wisdom of the Vedas to daily life.`,
    imageUrl: "https://placehold.co/600x400/EA580C/ffffff?text=Atharvaveda+Scene"
  },
  {
    text: `Spiritual and mundane concerns are addressed together, reflecting the Atharvaveda's integrated approach to human development. Progress in one area supports progress in others when guided by dharma.`,
    imageUrl: "https://placehold.co/600x400/EA580C/ffffff?text=Atharvaveda+Scene"
  },
  {
    text: `Prayers in this section invoke both personal benefit and the welfare of society. Individual and collective well-being are understood as interconnected aspects of a single cosmic harmony.`,
    imageUrl: "https://placehold.co/600x400/EA580C/ffffff?text=Atharvaveda+Scene"
  },
  {
    text: `The Atharvaveda's practical wisdom is evident throughout, offering guidance that remains relevant across centuries. The principles taught here adapt to different times and circumstances while maintaining eternal truths.`,
    imageUrl: "https://placehold.co/600x400/EA580C/ffffff?text=Atharvaveda+Scene"
  },
  {
    text: `Hymns conclude with affirmations of faith in divine providence and the cosmic order. By aligning with these principles through knowledge and practice, humans can achieve all legitimate goals and spiritual fulfillment.`,
    imageUrl: "https://placehold.co/600x400/EA580C/ffffff?text=Atharvaveda+Scene"
  }
];

export const atharvavedaObject = {
  id: 'atharvaveda',
  title: 'Atharvaveda',
  summary: 'The fourth Veda focusing on practical spiritual wisdom, healing practices, and the integration of material and spiritual life.',
  imageUrl: 'https://placehold.co/600x800/EA580C/ffffff?text=Atharvaveda',
  introduction: 'The Atharvaveda is the fourth Veda and stands apart from the Rigveda, Yajurveda, and Samaveda in its unique focus on practical applications of Vedic wisdom to daily life. Containing approximately 6,000 hymns organized in 20 kaandas (books), the Atharvaveda addresses healing, protection, prosperity, relationships, and both spiritual and material well-being. Unlike the other Vedas which focus primarily on ritual and philosophy, the Atharvaveda provides practical mantras and guidance for navigating life\'s challenges. It recognizes both material and spiritual dimensions of human experience and offers comprehensive guidance for achieving success, health, longevity, and ultimately, spiritual liberation.',
  author: 'Ancient Vedic Seers (Rishis)',
  language: 'Vedic Sanskrit',
  kaandas: [
    {
      id: 'kaanda_1',
      title: 'Kaanda 1 (Book One)',
      description: 'Introduction to protective and healing practices, establishment of foundations for well-being, and recognition of divine and supernatural forces.',
      scenes: kaanda1Scenes
    },
    {
      id: 'kaanda_2',
      title: 'Kaanda 2 (Book Two)',
      description: 'Exploration of specific illnesses and their remedies, understanding of disease causation, and restoration of health through divine intervention.',
      scenes: createKaandaScenes(2)
    },
    {
      id: 'kaanda_3',
      title: 'Kaanda 3 (Book Three)',
      description: 'Hymns addressing fertility, successful reproduction, and the blessing of children - essential concerns of an agrarian society.',
      scenes: createKaandaScenes(3)
    },
    {
      id: 'kaanda_4',
      title: 'Kaanda 4 (Book Four)',
      description: 'Prayers for prosperity, success in undertakings, and removal of obstacles to achievement.',
      scenes: createKaandaScenes(4)
    },
    {
      id: 'kaanda_5',
      title: 'Kaanda 5 (Book Five)',
      description: 'Rituals and mantras for various purposes, demonstrating the practical application of Vedic wisdom.',
      scenes: createKaandaScenes(5)
    },
    {
      id: 'kaanda_6',
      title: 'Kaanda 6 (Book Six)',
      description: 'Addressing relationships, social harmony, and the dynamics of human interactions.',
      scenes: createKaandaScenes(6)
    },
    {
      id: 'kaanda_7',
      title: 'Kaanda 7 (Book Seven)',
      description: 'Protective rituals against negative forces, misfortune, and malevolent influences.',
      scenes: createKaandaScenes(7)
    },
    {
      id: 'kaanda_8',
      title: 'Kaanda 8 (Book Eight)',
      description: 'Complex rituals and advanced practices for specific outcomes and spiritual advancement.',
      scenes: createKaandaScenes(8)
    },
    {
      id: 'kaanda_9',
      title: 'Kaanda 9 (Book Nine)',
      description: 'Philosophical teachings interwoven with practical guidance, bridging material and spiritual concerns.',
      scenes: createKaandaScenes(9)
    },
    {
      id: 'kaanda_10',
      title: 'Kaanda 10 (Book Ten)',
      description: 'Deeper aspects of spiritual practice, relationship between consciousness and cosmic principles.',
      scenes: kaanda10Scenes
    },
    {
      id: 'kaanda_11',
      title: 'Kaanda 11 (Book Eleven)',
      description: 'Continuation of complex practices and wisdom teachings for the advancement of practitioners.',
      scenes: createKaandaScenes(11)
    },
    {
      id: 'kaanda_12',
      title: 'Kaanda 12 (Book Twelve)',
      description: 'Rituals and meditations for specific spiritual goals and transformations.',
      scenes: createKaandaScenes(12)
    },
    {
      id: 'kaanda_13',
      title: 'Kaanda 13 (Book Thirteen)',
      description: 'Hymns addressing the mysteries of existence and the nature of ultimate reality.',
      scenes: createKaandaScenes(13)
    },
    {
      id: 'kaanda_14',
      title: 'Kaanda 14 (Book Fourteen)',
      description: 'Advanced teachings on consciousness, meditation, and spiritual realization.',
      scenes: createKaandaScenes(14)
    },
    {
      id: 'kaanda_15',
      title: 'Kaanda 15 (Book Fifteen)',
      description: 'Philosophical discourses integrated with practical guidance for integrated living.',
      scenes: createKaandaScenes(15)
    },
    {
      id: 'kaanda_16',
      title: 'Kaanda 16 (Book Sixteen)',
      description: 'Teachings on the nature of self, identity, and the path to self-realization.',
      scenes: createKaandaScenes(16)
    },
    {
      id: 'kaanda_17',
      title: 'Kaanda 17 (Book Seventeen)',
      description: 'Synthesis of earlier teachings with emphasis on universal principles applicable to all.',
      scenes: createKaandaScenes(17)
    },
    {
      id: 'kaanda_18',
      title: 'Kaanda 18 (Book Eighteen)',
      description: 'Comprehensive wisdom teachings on dharma, the ethical foundation of all success.',
      scenes: createKaandaScenes(18)
    },
    {
      id: 'kaanda_19',
      title: 'Kaanda 19 (Book Nineteen)',
      description: 'Prayers for the ultimate spiritual goal and the transcendence of all limitations.',
      scenes: createKaandaScenes(19)
    },
    {
      id: 'kaanda_20',
      title: 'Kaanda 20 (Book Twenty)',
      description: 'Culmination of Atharvaveda wisdom with final teachings on liberation and ultimate truth.',
      scenes: kaanda20Scenes
    }
  ]
};
