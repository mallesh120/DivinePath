import { dhruvaStoryScenes } from './dhruva_story.js';

export const bhagavataPuranaObject = {
  id: 'bhagavata-purana',
  title: 'Bhagavata Purana (Tales of Devotion)',
  type: 'Purana',
  summary: 'A collection of the greatest stories of devotion to Lord Vishnu, highlighting the supreme power of Bhakti (pure love).',
  imageUrl: '/images/literature/cover_bhagavata_purana_1787402033405.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "The Bhagavata Purana is one of the most revered texts in Hinduism, focusing entirely on Bhakti—pure, selfless devotion to God. While it contains the detailed life of Lord Krishna, it is also famous for stories of ordinary people and children whose incredible faith moved the universe.",
  chapters: [
    { 
      title: "The Unmovable Star: Story of Dhruva",
      summary: "How a heartbroken five-year-old boy prayed to Lord Vishnu and became the eternal Pole Star.",
      scenes: dhruvaStoryScenes 
    }
  ]
};
