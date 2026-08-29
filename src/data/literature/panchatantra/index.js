import { monkeyCrocodileScenes } from './monkey_crocodile_story.js';

export const panchatantraObject = {
  id: 'panchatantra',
  title: 'Panchatantra (Wisdom Tales)',
  type: 'Moral Stories',
  summary: 'Ancient fables featuring clever animals that teach profound lessons about friendship, strategy, and practical wisdom.',
  imageUrl: '/images/literature/cover_panchatantra_1787402043269.jpg',
  hasIllustrations: true,
  hasAudio: false,
  introduction: "The Panchatantra is a world-famous collection of ancient Indian fables. Written by a wise scholar to teach three foolish princes how to rule a kingdom, these brilliant stories use talking animals to teach practical life lessons, strategy, and the true meaning of friendship.",
  chapters: [
    { 
      title: "The Monkey and the Crocodile",
      summary: "A classic tale of a clever monkey who must use his wits to escape a foolish crocodile's betrayal.",
      scenes: monkeyCrocodileScenes 
    }
  ]
};
