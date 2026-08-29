import { matsyaStoryScenes } from './matsya_story.js';

export const matsyaPuranaObject = {
  id: 'matsya-purana',
  title: 'Matsya Avatar (The Giant Fish)',
  type: 'Dashavatara',
  summary: 'The story of Lord Vishnu\'s first avatar, a giant fish who saved the world from a cosmic flood.',
  imageUrl: '/images/literature/cover_matsya_purana_1787361567185.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "In the first of the ten great avatars (Dashavatara), Lord Vishnu takes the form of Matsya, a miraculous giant fish. This epic story tells of his mission to rescue the sacred Vedas from a terrible demon and save all species of life from a massive, world-ending flood.",
  chapters: [
    { 
      title: "The Great Flood and the Little Fish",
      summary: "King Manu discovers a tiny fish that grows to the size of a mountain, revealing itself as Lord Vishnu.",
      scenes: matsyaStoryScenes 
    }
  ]
};
