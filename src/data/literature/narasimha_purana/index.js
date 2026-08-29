import { narasimhaStoryScenes } from './narasimha_story.js';

export const narasimhaPuranaObject = {
  id: 'narasimha-purana',
  title: 'Narasimha Avatar (The Half-Lion)',
  type: 'Dashavatara',
  summary: 'The story of Lord Vishnu\'s fourth avatar, a fierce half-man, half-lion who emerged from a pillar to protect his little devotee Prahlada.',
  imageUrl: '/images/literature/cover_narasimha_purana_1787401935635.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "In the fourth of the ten great avatars, Lord Vishnu takes the terrifying but protective form of Narasimha, a being with the body of a man and the head and claws of a lion. This thrilling story tells of how he outsmarted a tricky magical boon to defeat a cruel tyrant and save a devoted child.",
  chapters: [
    { 
      title: "The Roar from the Pillar",
      summary: "How Lord Vishnu became a fierce lion-man to protect little Prahlada from his wicked demon father.",
      scenes: narasimhaStoryScenes 
    }
  ]
};
