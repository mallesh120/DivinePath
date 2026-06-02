export const kidsStories = [
  {
    id: "rama-returns",
    title: "Lord Rama Returns to Ayodhya",
    relatedFestival: "Diwali",
    pages: [
      {
        id: 1,
        text: "Long ago, the brave Prince Rama, his wife Sita, and his brother Lakshmana had to live in the forest for 14 years.",
        imageEmoji: "🌳",
        interactiveElement: "tap-to-grow"
      },
      {
        id: 2,
        text: "While in the forest, a ten-headed demon king named Ravana took Sita away to his kingdom of Lanka.",
        imageEmoji: "👹",
        interactiveElement: "shake"
      },
      {
        id: 3,
        text: "Rama, with the help of his strong friend Hanuman and an army of monkeys, fought a great battle and defeated Ravana.",
        imageEmoji: "🏹",
        interactiveElement: "sparkle"
      },
      {
        id: 4,
        text: "When Rama, Sita, and Lakshmana finally returned to their home in Ayodhya, the people were so happy! It was very dark because it was a new moon night.",
        imageEmoji: "🌑",
        interactiveElement: null
      },
      {
        id: 5,
        text: "So, all the people lit thousands of little clay lamps called Diyas to light their path and welcome them home. This is why we celebrate Diwali, the festival of lights!",
        imageEmoji: "🪔",
        interactiveElement: "light-up"
      }
    ]
  },
  {
    id: "hanuman-ring",
    title: "Hanuman Brings the Ring",
    relatedFestival: "Hanuman Jayanti",
    pages: [
      {
        id: 1,
        text: "Lord Rama was searching for Sita. He gave his special ring to Hanuman and said, 'When you find Sita, show her this ring so she knows you are my friend.'",
        imageEmoji: "💍",
        interactiveElement: "glow"
      },
      {
        id: 2,
        text: "Hanuman leaped across the ocean and found Sita sitting sadly in a garden in Lanka.",
        imageEmoji: "🌊",
        interactiveElement: "bounce"
      },
      {
        id: 3,
        text: "He quietly dropped the ring in front of her. When Sita saw the ring, she was filled with joy because she knew Rama was coming to save her!",
        imageEmoji: "🐒",
        interactiveElement: "give-ring"
      }
    ]
  },
  {
    id: "ganesha-elephant-head",
    title: "Ganesha's Elephant Head",
    coverImage: "🐘",
    description: "Learn how Ganesha got his elephant head.",
    tags: ["gods", "ganesha"],
    pages: [
      {
        id: 1,
        text: "Parvati created a boy from sandalwood paste and asked him to guard her door.",
        image: "👦",
        animation: {
          type: "spring",
          whileTap: { scale: 1.1, rotate: 10 }
        }
      },
      {
        id: 2,
        text: "Lord Shiva returned, but the brave boy did not know him and stopped him.",
        image: "🔱",
        animation: {
          type: "shake",
          whileTap: { x: [-10, 10, -10, 10, 0] }
        }
      },
      {
        id: 3,
        text: "Shiva was angry and the boy lost his head. Parvati was very sad.",
        image: "😢",
        animation: {
          type: "fade",
          whileTap: { opacity: 0.5 }
        }
      },
      {
        id: 4,
        text: "To make Parvati happy, Shiva gave the boy the head of a strong, wise elephant!",
        image: "🐘",
        animation: {
          type: "bounce",
          whileTap: { y: -50 }
        }
      },
      {
        id: 5,
        text: "He was named Ganesha, the lord of beginnings and remover of obstacles.",
        image: "🌸",
        animation: {
          type: "spin",
          whileTap: { rotate: 360 }
        }
      }
    ]
  },
  {
    id: "krishna-govardhana",
    title: "Krishna Lifts Govardhana",
    coverImage: "⛰️",
    description: "How little Krishna protected his village from the rain.",
    tags: ["gods", "krishna"],
    pages: [
      {
        id: 1,
        text: "The village of Vrindavan was preparing for a big storm.",
        image: "⛈️",
        animation: {
          type: "shake",
          whileTap: { x: [-10, 10, -10, 10, 0] }
        }
      },
      {
        id: 2,
        text: "Lord Indra sent heavy rains, and the people were scared.",
        image: "🌧️",
        animation: {
          type: "bounce",
          whileTap: { y: 20 }
        }
      },
      {
        id: 3,
        text: "Little Krishna told everyone not to worry and led them to Mount Govardhana.",
        image: "🦚",
        animation: {
          type: "spring",
          whileTap: { scale: 1.2 }
        }
      },
      {
        id: 4,
        text: "With just his little finger, Krishna lifted the entire mountain like an umbrella!",
        image: "⛰️",
        animation: {
          type: "spring",
          whileTap: { y: -100, scale: 1.2 }
        }
      },
      {
        id: 5,
        text: "The villagers were safe, and Indra realized Krishna was very special.",
        image: "🙏",
        animation: {
          type: "fade",
          whileTap: { opacity: 0.5 }
        }
      }
    ]
  },
  {
    id: "story-of-holi",
    title: "The Story of Holi",
    coverImage: "🎨",
    description: "The colorful festival of spring and joy.",
    tags: ["festivals", "holi"],
    pages: [
      {
        id: 1,
        text: "Long ago, there was a good prince named Prahlada who prayed to Lord Vishnu.",
        image: "👑",
        animation: {
          type: "spring",
          whileTap: { scale: 1.1 }
        }
      },
      {
        id: 2,
        text: "His father, the king, didn't like this and asked Holika to sit in a fire with the prince.",
        image: "🔥",
        animation: {
          type: "shake",
          whileTap: { x: [-10, 10, -10, 10, 0] }
        }
      },
      {
        id: 3,
        text: "But Vishnu protected Prahlada, and he was completely safe!",
        image: "🛡️",
        animation: {
          type: "bounce",
          whileTap: { y: -20 }
        }
      },
      {
        id: 4,
        text: "Today, we celebrate this victory of good over bad with Holi, the festival of colors.",
        image: "🎨",
        animation: {
          type: "spring",
          whileTap: { rotate: [0, -10, 10, -10, 10, 0] }
        }
      },
      {
        id: 5,
        text: "People throw colorful powder and water, laughing and playing together!",
        image: "💦",
        animation: {
          type: "spring",
          whileTap: { scale: 1.5, rotate: 360 }
        }
      }
    ]
  }
];
