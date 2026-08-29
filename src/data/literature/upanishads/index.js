import { nachiketaStoryScenes } from './nachiketa_story.js';

export const upanishadsObject = {
  id: 'upanishads',
  title: 'The Upanishads (Secret Teachings)',
  type: 'Philosophy',
  summary: 'The deepest philosophical texts of Hinduism, exploring the nature of the soul and the universe through beautiful stories.',
  imageUrl: '/images/literature/cover_upanishads_1787402053497.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "The Upanishads are the philosophical heart of the Vedas, often exploring the deepest questions of existence: Who are we? What happens after death? What is the universe made of? They teach these profound truths not through lectures, but through fascinating stories of dialogue between brilliant teachers and curious students.",
  chapters: [
    { 
      title: "The Boy Who Interviewed Death (Katha Upanishad)",
      summary: "The incredible story of a fearless young boy named Nachiketa who traveled to the underworld to ask the God of Death the ultimate secret of life.",
      scenes: nachiketaStoryScenes 
    }
  ]
};
