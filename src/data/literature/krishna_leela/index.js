import { krishnaStoryScenes } from './krishna_story.js';

export const krishnaLeelaObject = {
  id: 'krishna-leela',
  title: 'Krishna (The Divine Statesman)',
  type: 'Dashavatara',
  summary: 'The story of Lord Vishnu\'s eighth avatar, the mischievous butter-thief who delivered the Bhagavad Gita.',
  imageUrl: '/images/literature/cover_krishna_leela_1787401978908.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "In the eighth of the ten great avatars, Lord Vishnu takes birth as Krishna. From a playful child stealing butter in Vrindavan, to the slayer of demons, and finally the wise charioteer who delivered the Bhagavad Gita, Krishna's life is full of divine magic, love, and profound philosophy.",
  chapters: [
    { 
      title: "The Flute Player of Vrindavan",
      summary: "How a magical baby survived a wicked king, lifted a mountain on his finger, and guided a prince through an epic war.",
      scenes: krishnaStoryScenes 
    }
  ]
};
