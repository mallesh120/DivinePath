import { mandala1Scenes } from './mandala_1';
import { mandala2Scenes } from './mandala_2';
import { mandala3Scenes } from './mandala_3';
import { mandala4Scenes } from './mandala_4';
import { mandala5Scenes } from './mandala_5';
import { mandala6Scenes } from './mandala_6';
import { mandala7Scenes } from './mandala_7';
import { mandala8Scenes } from './mandala_8';
import { mandala9Scenes } from './mandala_9';
import { mandala10Scenes } from './mandala_10';

export const rigvedaObject = {
  id: 'rigveda',
  title: 'Rigveda',
  summary: 'The most ancient and sacred of the four Vedas, containing profound hymns on cosmic principles and divine wisdom.',
  imageUrl: 'https://placehold.co/600x800/EA580C/ffffff?text=Rigveda',
  introduction: 'The Rigveda is the oldest and most sacred of the four Vedas, the foundational scriptures of Hinduism. Compiled over centuries and containing 10,552 verses organized in 10 mandalas (books), the Rigveda represents humanity\'s earliest attempts to understand the divine and cosmic principles. These hymns praise various deities - Agni, Indra, Soma, Ashvins, and many others - while containing profound philosophical teachings about creation, consciousness, righteousness, and ultimate reality. The Rigveda serves as the source for all Hindu spiritual knowledge and continues to inspire seekers on the path of self-realization.',
  author: 'Ancient Vedic Seers (Rishis)',
  language: 'Vedic Sanskrit',
  mandalas: [
    {
      id: 'mandala_1',
      title: 'Mandala 1 (Book One)',
      description: 'Introduction to the primary deities and fundamental cosmic principles - Agni as the divine intermediary, Indra as cosmic warrior, and the establishment of ritual as means of communion with the divine.',
      scenes: mandala1Scenes
    },
    {
      id: 'mandala_2',
      title: 'Mandala 2 (Book Two)',
      description: 'Deepening exploration of Indra\'s cosmic victories, celestial healers, and the importance of maintaining cosmic order through sacrifice and righteous conduct.',
      scenes: mandala2Scenes
    },
    {
      id: 'mandala_3',
      title: 'Mandala 3 (Book Three)',
      description: 'Philosophical hymns on creation, the cosmic word (Brahmanaspati), the mysteries of life and death, and the path to spiritual liberation.',
      scenes: mandala3Scenes
    },
    {
      id: 'mandala_4',
      title: 'Mandala 4 (Book Four)',
      description: 'Fearsome cosmic principles (Rudra), emphasis on moral conduct, relationship with nature, and transformation of consciousness through spiritual practice.',
      scenes: mandala4Scenes
    },
    {
      id: 'mandala_5',
      title: 'Mandala 5 (Book Five)',
      description: 'Advanced spiritual teachings on consciousness, the divine feminine energy, and the transcendence of individual identity through recognition of universal oneness.',
      scenes: mandala5Scenes
    },
    {
      id: 'mandala_6',
      title: 'Mandala 6 (Book Six)',
      description: 'Blending of devotional emotion with cosmic philosophy, healing practices, community values, and the pursuit of spiritual knowledge through proper guidance.',
      scenes: mandala6Scenes
    },
    {
      id: 'mandala_7',
      title: 'Mandala 7 (Book Seven)',
      description: 'Mystical teachings from ancient seers, cosmic principles and their manifestation, and the vision of unity underlying all diversity in creation.',
      scenes: mandala7Scenes
    },
    {
      id: 'mandala_8',
      title: 'Mandala 8 (Book Eight)',
      description: 'Continuation of spiritual guidance with emphasis on the Soma ritual, overcoming obstacles, and recognition of divine consciousness pervading all existence.',
      scenes: mandala8Scenes
    },
    {
      id: 'mandala_9',
      title: 'Mandala 9 (Book Nine)',
      description: 'Extensive exploration of Soma as sacred substance and cosmic principle - the means of transcending ordinary consciousness and experiencing divine reality.',
      scenes: mandala9Scenes
    },
    {
      id: 'mandala_10',
      title: 'Mandala 10 (Book Ten)',
      description: 'Culmination of Vedic wisdom with profound philosophical teachings on creation, the nature of ultimate reality, and the path to self-realization and immortality.',
      scenes: mandala10Scenes
    }
  ]
};
