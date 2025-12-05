// Import the scenes from each Parva file
import { adiParvaScenes } from './adi_parva.js';
import { sabhaParvaScenes } from './sabha_parva.js';
import { vanaParvaScenes } from './vana_parva.js';
import { virataParvaScenes } from './virata_parva.js';
import { bhishmaParvaScenes } from './bhishma_parva.js';
import { dronaParvaScenes } from './drona_parva.js';
import { karnaParvaScenes } from './karna_parva.js';
import { shantiParvaScenes } from './shanti_parva.js';

// Import the main cover image for the Mahabharata
import mahabharataImage from '../../../assets/images/mahabharata.png';

export const mahabharataObject = {
  id: 2,
  title: 'Mahabharata',
  type: 'epic',
  summary: 'The epic tale of a great war between two branches of a royal family, exploring themes of duty, honor, and righteousness.',
  imageUrl: mahabharataImage,
  introduction: "The Mahabharata is the longest epic poem ever written, composed by the great sage Vyasa. It recounts the story of two branches of a royal family - the Pandavas and the Kauravas - and their struggle for supremacy over the kingdom of Hastinapura. Through this grand narrative, the epic explores the eternal questions of dharma (righteousness), karma (action), and the complexities of human existence.",
  parvas: [
    { 
      title: "Adi Parva (Book of the Beginning)",
      summary: "The creation of the world, the lineage of the Kuru dynasty, the birth of the Pandavas and Kauravas, and the fateful game of dice that sets in motion the events leading to the great war.",
      scenes: adiParvaScenes 
    },
    { 
      title: "Sabha Parva (Book of the Assembly Hall)", 
      summary: "The establishment of the Pandava kingdom, the second game of dice where they lose everything, the public disrobing of Draupadi, and their exile for thirteen years.", 
      scenes: sabhaParvaScenes 
    },
    { 
      title: "Vana Parva (Book of the Forest)", 
      summary: "The exile of the Pandavas in the forest, their encounters with great sages, Arjuna's divine quest for celestial weapons, and Krishna's counsel to the brothers.", 
      scenes: vanaParvaScenes 
    },
    { 
      title: "Virata Parva (Book of Virata)", 
      summary: "The thirteenth year of exile where the Pandavas must remain completely incognito, serving King Virata in different disguises until the completion of their exile.", 
      scenes: virataParvaScenes 
    },
    { 
      title: "Bhishma Parva (Book of Bhishma)", 
      summary: "Failed peace negotiations lead to the great war at Kurukshetra. The Bhagavad Gita is revealed by Krishna to Arjuna, and the great warrior Bhishma falls after ten days of combat.", 
      scenes: bhishmaParvaScenes 
    },
    { 
      title: "Drona Parva (Book of Drona)", 
      summary: "Drona takes command of the Kaurava army. Abhimanyu's tragic death in the Chakra Vyuh, Arjuna's vow to slay Jayadratha, and the fall of the mighty teacher Drona.", 
      scenes: dronaParvaScenes 
    },
    { 
      title: "Karna Parva (Book of Karna)", 
      summary: "Karna emerges as the last hope of the Kauravas. The epic duel between Arjuna and Karna concludes with Karna's death and the near-end of the war.", 
      scenes: karnaParvaScenes 
    },
    { 
      title: "Shanti Parva (Book of Peace)", 
      summary: "The restoration of peace, Yudhishthira's coronation, the mourning of those lost in the war, and the eternal lessons imparted by the great epic.", 
      scenes: shantiParvaScenes 
    }
  ]
};
