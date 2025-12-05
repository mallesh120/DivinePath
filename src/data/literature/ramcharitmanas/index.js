import { balKandScenes } from './bal_kand';
import { ayodhyaKandScenes } from './ayodhya_kand';
import { aranyaKandScenes } from './aranya_kand';
import { kishkindhaKandScenes } from './kishkindha_kand';
import { sundaraKandScenes } from './sundara_kand';
import { lankaKandScenes } from './lanka_kand';
import { uttarKandScenes } from './uttar_kand';

export const ramcharitmanasObject = {
  id: 'ramcharitmanas',
  title: 'Ramcharitmanas',
  summary: 'The beloved epic tale of Lord Rama by Sant Tulsidas, celebrating devotion, dharma, and divine love.',
  imageUrl: 'https://via.placeholder.com/300x400?text=Ramcharitmanas',
  introduction: 'The Ramcharitmanas, composed by the great saint Tulsidas, is one of the most beloved and widely read epics in Hindu tradition. Written in Awadhi language with devotional fervor, it tells the divine story of Lord Rama with poetic grace and spiritual profundity. The epic encompasses seven kandas (books) that narrate the incarnation, trials, heroic deeds, and ultimate triumph of Rama, along with profound lessons on dharma (righteousness), bhakti (devotion), and the eternal nature of divinity.',
  author: 'Sant Tulsidas',
  language: 'Awadhi (Hindi)',
  kandas: [
    {
      id: 'bal_kand',
      title: 'Bal Kand (Book of Childhood)',
      description: 'The divine incarnation of Lord Rama - his miraculous birth, childhood exploits, and early encounters that showcase his extraordinary divine nature.',
      scenes: balKandScenes
    },
    {
      id: 'ayodhya_kand',
      title: 'Ayodhya Kand (Book of Ayodhya)',
      description: 'Rama\'s exile - the court intrigue, the breaking of hearts, and the beginning of the sacred journey that tests the virtue and devotion of all involved.',
      scenes: ayodhyaKandScenes
    },
    {
      id: 'aranya_kand',
      title: 'Aranya Kand (Book of the Forest)',
      description: 'The forest exile - spiritual growth, encounters with sages and demons, and the fateful abduction of Sita that sets the stage for the great war.',
      scenes: aranyaKandScenes
    },
    {
      id: 'kishkindha_kand',
      title: 'Kishkindha Kand (Book of the Monkey Kingdom)',
      description: 'Rama\'s alliance with the monkeys - the restoration of Sugriva, the search for Sita, and the gathering of forces for the ultimate battle.',
      scenes: kishkindhaKandScenes
    },
    {
      id: 'sundara_kand',
      title: 'Sundara Kand (Book of Beauty)',
      description: 'Hanuman\'s heroic mission - the crossing of the ocean, discovery of Sita, and the famous demonstration of devotion and courage in Lanka.',
      scenes: sundaraKandScenes
    },
    {
      id: 'lanka_kand',
      title: 'Lanka Kand (Book of Lanka)',
      description: 'The great war - the final confrontation between Rama and Ravana, the triumph of righteousness over evil, and the rescue of Sita.',
      scenes: lankaKandScenes
    },
    {
      id: 'uttar_kand',
      title: 'Uttar Kand (Book of Conclusion)',
      description: 'The return and reign of Rama - the establishment of Ramrajya, the golden age of righteousness, and the eternal teachings of the epic.',
      scenes: uttarKandScenes
    }
  ]
};
