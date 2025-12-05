import { samhita1Scenes, samhita2Scenes } from './samhita';

export const yajurvedaObject = {
  id: 'yajurveda',
  title: 'Yajurveda',
  summary: 'The Veda of ritual formulas, providing detailed instructions for sacred ceremonies that maintain cosmic order.',
  imageUrl: 'https://via.placeholder.com/300x400?text=Yajurveda',
  introduction: 'The Yajurveda, also known as the Yajus Veda or Veda of Ritual Formulas, is distinguished among the four Vedas for its primary focus on the correct performance of sacrifices and rituals (yajnas). Containing approximately 3,880 verses organized into two major samhitas (recensions) - the Madhyandina Samhita and the Kanva Samhita - the Yajurveda provides detailed instructions for conducting religious ceremonies. These are not mere mechanical actions but spiritual practices through which human consciousness aligns with cosmic order. The Yajurveda teaches that through proper ritual, performed with sincere intention and correct understanding, humans can maintain universal harmony and achieve spiritual realization.',
  author: 'Ancient Vedic Seers (Rishis)',
  language: 'Vedic Sanskrit',
  samhitas: [
    {
      id: 'samhita_1',
      title: 'Samhita 1 - Madhyandina Recension',
      description: 'Foundational mantras and instructions for the performance of rituals, establishing the principles that underlie all Vedic ceremonies and sacrifices.',
      scenes: samhita1Scenes
    },
    {
      id: 'samhita_2',
      title: 'Samhita 2 - Kanva Recension',
      description: 'Continuation and expansion of ritual instructions, providing complete guidance for all types of ceremonial practices and their cosmic significance.',
      scenes: samhita2Scenes
    }
  ]
};
