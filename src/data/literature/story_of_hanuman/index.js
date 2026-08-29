import { hanumanBirthScenes } from './birth_and_childhood.js';
import { hanumanEducationScenes } from './education_and_sugriva.js';
import { hanumanMeetingRamaScenes } from './meeting_rama.js';
import { hanumanSundaraKandaScenes } from './sundara_kanda_journey.js';
import { hanumanRamayanaWarScenes } from './ramayana_war.js';
import { hanumanPostRamayanaScenes } from './post_ramayana_chiranjeevi.js';

export const hanumanStoryObject = {
  id: 'story-of-hanuman',
  title: 'The Story of Hanuman',
  type: 'Biography',
  summary: 'The complete, heroic biography of Lord Hanuman, from his miraculous birth to becoming an immortal guardian of the earth.',
  imageUrl: '/images/literature/cover_hanuman_1787361525880.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "Lord Hanuman is the ultimate symbol of strength, devotion, and selfless service. This detailed biography traces his incredible journey, starting from his birth as the son of the Wind God, his education under the Sun, his divine meeting with Lord Rama, his heroic deeds in the Ramayana, and his eternal life as a Chiranjeevi.",
  chapters: [
    { 
      title: "Chapter 1: Birth and the Leap to the Sun",
      summary: "The divine birth of Maruti, his mischievous attempt to eat the sun, and how he received boons from all the gods to become Hanuman.",
      scenes: hanumanBirthScenes 
    },
    { 
      title: "Chapter 2: Education and the Promise", 
      summary: "Hanuman's incredible education flying backward across the sky with Surya, the Sun God, and his loyalty to Sugriva.", 
      scenes: hanumanEducationScenes 
    },
    { 
      title: "Chapter 3: Meeting the Divine Lord", 
      summary: "Hanuman meets Rama and Lakshmana in the forest, forging an eternal bond, and regains his lost powers to cross the ocean.", 
      scenes: hanumanMeetingRamaScenes 
    },
    { 
      title: "Chapter 4: The Journey to Lanka", 
      summary: "Hanuman's epic leap across the sea, outsmarting demons, finding Mother Sita in the Ashoka grove, and burning the golden city.", 
      scenes: hanumanSundaraKandaScenes 
    },
    { 
      title: "Chapter 5: The Great War and the Sanjeevani", 
      summary: "Hanuman's heroic role in the Ramayana war, including carrying the entire Dronagiri mountain to save Lakshmana's life.", 
      scenes: hanumanRamayanaWarScenes 
    },
    { 
      title: "Chapter 6: The Immortal Guardian (Chiranjeevi)", 
      summary: "Hanuman proves Rama lives in his heart, and receives the ultimate blessing to remain on earth immortally wherever Rama's name is chanted.", 
      scenes: hanumanPostRamayanaScenes 
    }
  ]
};
