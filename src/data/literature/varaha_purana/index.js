import { varahaStoryScenes } from './varaha_story.js';

export const varahaPuranaObject = {
  id: 'varaha-purana',
  title: 'Varaha Avatar (The Giant Boar)',
  type: 'Dashavatara',
  summary: 'The story of Lord Vishnu\'s third avatar, a giant boar who rescued Mother Earth from the bottom of the cosmic ocean.',
  imageUrl: '/images/literature/cover_varaha_purana_1787401924773.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "In the third of the ten great avatars, Lord Vishnu takes the fierce form of Varaha, a colossal boar. This thrilling story tells of how he defeated the powerful demon Hiranyaksha to save Mother Earth (Bhumi Devi) from sinking into the dark cosmic ocean.",
  chapters: [
    { 
      title: "The Rescue of Mother Earth",
      summary: "How Lord Vishnu became a giant boar to defeat a terrifying demon and lift the Earth back to safety on his tusks.",
      scenes: varahaStoryScenes 
    }
  ]
};
