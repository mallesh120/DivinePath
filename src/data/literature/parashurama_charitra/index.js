import { parashuramaStoryScenes } from './parashurama_story.js';

export const parashuramaCharitraObject = {
  id: 'parashurama-charitra',
  title: 'Parashurama (The Warrior Sage)',
  type: 'Dashavatara',
  summary: 'The fierce story of Lord Vishnu\'s sixth avatar, a mighty Brahmin warrior armed with an axe who rid the world of corrupt kings.',
  imageUrl: '/images/literature/cover_parashurama_charitra_1787401956037.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "In the sixth of the ten great avatars, Lord Vishnu takes the form of Parashurama, a unique blend of a learned sage and a terrifying warrior. This story tells of his quest to punish wicked, arrogant kings and restore justice to the earth with his divine axe.",
  chapters: [
    { 
      title: "The Vow of the Axe-Wielding Sage",
      summary: "How Parashurama fought a thousand-armed king to protect a magical cow, and later rid the world of corrupt rulers.",
      scenes: parashuramaStoryScenes 
    }
  ]
};
