// Import the scenes from each Kanda file
import { balaKandaScenes } from './bala_kanda.js';
import { ayodhyaKandaScenes } from './ayodhya_kanda.js';
import { aranyaKandaScenes } from './aranya_kanda.js';
import { kishkindhaKandaScenes } from './kishkindha_kanda.js';
import { sundaraKandaScenes } from './sundara_kanda.js';
import { yuddhaKandaScenes } from './yuddha_kanda.js';
import { uttaraKandaScenes } from './uttara_kanda.js';


// Import the main cover image for the Ramayana
import ramayanaImage from '../../../assets/images/ramayana.webp';

export const ramayanaObject = {
  id: 1,
  title: 'Ramayana',
  type: 'epic',
  summary: 'An ancient epic which follows the journey of Prince Rama to rescue his wife Sita from the demon king Ravana.',
  imageUrl: ramayanaImage,
  introduction: "The Ramayana, attributed to the sage Valmiki, is a foundational epic of Hindu literature. It narrates the life and trials of Rama, the seventh avatar of Vishnu. The story is traditionally divided into seven books, or Kandas, each detailing a different phase of his remarkable journey.",
  kandas: [
    { title: "Bala Kanda (Book of Childhood)",
      summary: "The birth and early life of Rama and his brothers, their education, and Rama's marriage to Sita.",
      scenes: balaKandaScenes },
    { title: "Ayodhya Kanda (Book of Ayodhya)", 
      summary: "The preparations for Rama's coronation and his sudden, heartbreaking exile to the forest for 14 years.", 
      scenes: ayodhyaKandaScenes },
    { title: "Aranya Kanda (Book of the Forest)", 
      summary: "Life in the forest and the abduction of Sita by the demon king Ravana.", 
      scenes: aranyaKandaScenes },
    { title: "Kishkindha Kanda (Book of the Monkey Kingdom)", 
      summary: "Rama's alliance with the monkey king Sugriva and the launch of the search for Sita.", 
      scenes: kishkindhaKandaScenes },
    { title: "Sundara Kanda (Book of Beauty)", 
      summary: "Hanuman's heroic journey to Lanka, his discovery of Sita, and his report back to Rama.", 
      scenes: sundaraKandaScenes },
    { title: "Yuddha Kanda (Book of War)", 
      summary: "The epic battle between Rama's army and Ravana's forces, culminating in Ravana's defeat.", 
      scenes: yuddhaKandaScenes },
    { title: "Uttara Kanda (Epilogue)", 
      summary: "The final years of Rama and Sita, and the conclusion of their story.", 
      scenes: uttaraKandaScenes }
  ]
};