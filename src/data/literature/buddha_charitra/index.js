import { buddhaStoryScenes } from './buddha_story.js';

export const buddhaCharitraObject = {
  id: 'buddha-charitra',
  title: 'Buddha (The Awakened One)',
  type: 'Dashavatara',
  summary: 'The story of Lord Vishnu\'s ninth avatar, the prince who gave up his kingdom to find enlightenment and teach peace.',
  imageUrl: '/images/literature/cover_buddha_charitra_1787402013330.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "In the ninth of the ten great avatars, Lord Vishnu takes birth as Siddhartha Gautama, who becomes the Buddha. This peaceful and profound story tells of a prince who leaves his luxurious palace to discover the cause of human suffering and teaches the world the path of enlightenment and non-violence.",
  chapters: [
    { 
      title: "The Search for Truth",
      summary: "How Prince Siddhartha left his palace, meditated under the Bodhi tree, and became the Awakened One.",
      scenes: buddhaStoryScenes 
    }
  ]
};
