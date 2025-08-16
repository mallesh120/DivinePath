import ganeshaImage from '../assets/images/Gods/ganesha.png';
import shivaImage from '../assets/images/Gods/Shiva.png';
import vishnuImage from '../assets/images/Gods/vishnu.png';

export const godsData = [
  {
    id: 1,
    name: "Ganesha",
    description: "The elephant-headed god of beginnings, wisdom, and the remover of obstacles.",
    longDescription: "Ganesha is one of the most worshipped deities in the Hindu pantheon. His elephant head symbolizes wisdom and his large belly represents generosity and acceptance. He is invoked before the start of any new venture to ensure its success.",
    mantra: "Om Gam Ganapataye Namaha",
    imageUrl: ganeshaImage,
  },
  {
    id: 2,
    name: "Shiva",
    description: "One of the principal deities, known as the destroyer and transformer.",
    longDescription: "Shiva, part of the Hindu Trinity, is a complex deity who represents destruction for the purpose of re-creation. He is often depicted in deep meditation or dancing the Tandava. His followers are called Shaivites.",
    mantra: "Om Namah Shivaya",
    imageUrl: shivaImage,
  },
  {
    id: 3,
    name: "Vishnu",
    description: "The preserver and protector of the universe. He returns to earth to restore balance.",
    longDescription: "Vishnu is the central god in Vaishnavism and another member of the Hindu Trinity. He is believed to have incarnated in various forms, known as avatars (like Rama and Krishna), to vanquish evil and uphold cosmic order.",
    mantra: "Om Namo Bhagavate Vasudevaya",
    imageUrl: vishnuImage,
  },
  // ... add similar details for Lakshmi and Saraswati if you wish
];