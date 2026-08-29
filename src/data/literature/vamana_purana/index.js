import { vamanaStoryScenes } from './vamana_story.js';

export const vamanaPuranaObject = {
  id: 'vamana-purana',
  title: 'Vamana Avatar (The Dwarf Brahmin)',
  type: 'Dashavatara',
  summary: 'The story of Lord Vishnu\'s fifth avatar, a clever dwarf boy who took back the universe in just three steps.',
  imageUrl: '/images/literature/cover_vamana_purana_1787401945394.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "In the fifth of the ten great avatars, Lord Vishnu takes the form of Vamana, a highly intelligent and radiant dwarf Brahmin boy. This wonderful story shows how he used a generous king's pride to restore balance to the universe without fighting a war.",
  chapters: [
    { 
      title: "The Three Giant Steps",
      summary: "How a tiny boy tricked a powerful king into giving away the entire universe with just three steps.",
      scenes: vamanaStoryScenes 
    }
  ]
};
