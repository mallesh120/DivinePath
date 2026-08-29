import { kalkiStoryScenes } from './kalki_story.js';

export const kalkiPuranaObject = {
  id: 'kalki-purana',
  title: 'Kalki Avatar (The Future Warrior)',
  type: 'Dashavatara',
  summary: 'The prophecy of Lord Vishnu\'s tenth and final avatar, the blazing warrior who will arrive to end the dark age and restore truth.',
  imageUrl: '/images/literature/cover_kalki_purana_1787402023608.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "The tenth and final avatar of Lord Vishnu has not yet arrived! The Kalki Purana tells the epic prophecy of the future. It describes how, at the very end of this dark age (Kali Yuga), Lord Kalki will arrive on a white horse with a blazing sword to destroy evil and bring about a new Golden Age of peace.",
  chapters: [
    { 
      title: "The Prophecy of the Blazing Sword",
      summary: "How Lord Vishnu will return on a white horse at the end of time to cleanse the earth and start a new Golden Age.",
      scenes: kalkiStoryScenes 
    }
  ]
};
