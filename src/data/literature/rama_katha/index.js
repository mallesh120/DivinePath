import { ramaKathaScenes } from './rama_story.js';

export const ramaKathaObject = {
  id: 'rama-katha',
  title: 'Rama (The Perfect King)',
  type: 'Dashavatara',
  summary: 'The story of Lord Vishnu\'s seventh avatar, the noble Prince Rama who defeated the ten-headed demon Ravana.',
  imageUrl: '/images/literature/cover_rama_katha_1787401968044.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "In the seventh of the ten great avatars, Lord Vishnu takes birth as Rama, the Prince of Ayodhya. This famous story tells of his fourteen-year exile, his alliance with Hanuman and the monkey army, and his epic war against the demon king Ravana to rescue his beloved wife, Sita.",
  chapters: [
    { 
      title: "The Path of Righteousness",
      summary: "How Prince Rama went into exile, built a bridge across the ocean, and defeated Ravana to bring light back to the world.",
      scenes: ramaKathaScenes 
    }
  ]
};
