import { kurmaStoryScenes } from './kurma_story.js';

export const kurmaPuranaObject = {
  id: 'kurma-purana',
  title: 'Kurma Avatar (The Giant Tortoise)',
  type: 'Dashavatara',
  summary: 'The story of Lord Vishnu\'s second avatar, a massive tortoise who supported a mountain on his back to churn the cosmic ocean.',
  imageUrl: '/images/literature/cover_kurma_purana_1787361576998.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "In the second of the ten great avatars, Lord Vishnu takes the form of Kurma, a colossal, invincible tortoise. This story details the epic Samudra Manthan (Churning of the Cosmic Ocean), where gods and demons worked together to find the nectar of immortality.",
  chapters: [
    { 
      title: "The Churning of the Ocean",
      summary: "How Lord Vishnu supported Mount Mandara on his back as a giant tortoise so the gods and demons could churn the ocean for the nectar of immortality.",
      scenes: kurmaStoryScenes 
    }
  ]
};
