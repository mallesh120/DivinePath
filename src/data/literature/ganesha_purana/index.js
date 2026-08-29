import { ganeshaCreationScenes } from './creation_and_elephant_head.js';
import { ganeshaRaceScenes } from './race_around_the_world.js';
import { ganeshaKuberaScenes } from './ganesha_and_kubera.js';
import { ganeshaMahabharataScenes } from './writing_mahabharata.js';
import { ganeshaMoonScenes } from './ganesha_and_the_moon.js';

export const ganeshaPuranaObject = {
  id: 'ganesha-purana',
  title: 'Stories of Lord Ganesha',
  type: 'Purana',
  summary: 'The wonderful, wisdom-filled stories of Lord Ganesha, the elephant-headed God of Beginnings and Intellect.',
  imageUrl: '/images/literature/cover_ganesha_purana_1787361557998.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "Lord Ganesha is one of the most beloved gods in Hinduism, worshipped as the remover of obstacles and the patron of arts and sciences. These fascinating stories from his childhood teach us about love, humility, intelligence, and devotion.",
  chapters: [
    { 
      title: "Chapter 1: The Creation and the Elephant Head",
      summary: "How Goddess Parvati created her brave son, his fierce battle with Lord Shiva, and how he got his magnificent elephant head.",
      scenes: ganeshaCreationScenes 
    },
    { 
      title: "Chapter 2: The Race Around the World", 
      summary: "A clever competition between Ganesha and Kartikeya for a magical mango that proves wisdom is greater than physical speed.", 
      scenes: ganeshaRaceScenes 
    },
    { 
      title: "Chapter 3: Ganesha and the God of Wealth", 
      summary: "The arrogant Lord Kubera invites Ganesha for a feast, only to learn a terrifying and hilarious lesson about humility.", 
      scenes: ganeshaKuberaScenes 
    },
    { 
      title: "Chapter 4: The One-Tusked Scribe", 
      summary: "How Ganesha broke his own tusk to write down the epic Mahabharata for Sage Vyasa without ever stopping.", 
      scenes: ganeshaMahabharataScenes 
    },
    { 
      title: "Chapter 5: Ganesha and the Laughing Moon", 
      summary: "Why the moon waxes and wanes, and the lesson the Moon God learned about mocking others.", 
      scenes: ganeshaMoonScenes 
    }
  ]
};
