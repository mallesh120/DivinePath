export const dharmaChallenges = [
  {
    id: 1,
    title: 'Practice Ahimsa (Non-Violence in Speech)',
    description: 'Today, practice non-violence in your speech. Avoid complaining, criticizing, or using harsh words toward yourself or others.'
  },
  {
    id: 2,
    title: 'Practice Seva (Selfless Service)',
    description: 'Do one thoughtful act of kindness today without expecting any acknowledgment or reward in return.'
  },
  {
    id: 3,
    title: 'Practice Santosha (Deep Contentment)',
    description: 'Write down or reflect on three blessings you are deeply grateful for right now. Whenever restlessness arises today, return to sufficiency.'
  },
  {
    id: 4,
    title: 'Practice Satya (Compassionate Truth)',
    description: 'Speak with honesty and integrity today, ensuring your words are truthful, beneficial, and gentle (Satyam Bruyat Priyam Bruyat).'
  },
  {
    id: 5,
    title: 'Digital Tapas (Screen-Free Sanctuary)',
    description: 'Dedicate at least 1 hour today completely free from phones and screens. Use the quiet time for contemplation, reading, or family.'
  },
  {
    id: 6,
    title: 'Anna Dana & Mindful Offering',
    description: 'Before every meal today, pause for three breaths to offer gratitude to the Divine, the earth, and everyone whose labor brought the food to your plate.'
  },
  {
    id: 7,
    title: 'Kshama (Letting Go of Resentment)',
    description: 'Silently forgive someone who may have frustrated or hurt you, releasing the weight of resentment from your own heart.'
  },
  {
    id: 8,
    title: 'Svadhyaya (Sacred Contemplation)',
    description: 'Read one chapter or five verses from a sacred text today and reflect on how a single teaching applies to your life right now.'
  },
  {
    id: 9,
    title: 'Prana Awareness (Conscious Breath)',
    description: 'Three times today — morning, afternoon, and evening — pause for 6 slow, deep yogic breaths to center your awareness.'
  },
  {
    id: 10,
    title: 'Matru-Pitru Vandana (Honoring Elders)',
    description: 'Reach out to a parent, grandparent, mentor, or elder today with a warm message or gesture of appreciation.'
  },
  {
    id: 11,
    title: 'Aparigraha (Decluttering & Simplicity)',
    description: 'Set aside three items you no longer need to donate or share with someone who can use them.'
  },
  {
    id: 12,
    title: 'Bhuta Daya (Kindness to All Living Beings)',
    description: 'Offer water or food to birds or animals, tend to a plant, or walk mindfully in nature appreciating the web of life.'
  },
  {
    id: 13,
    title: 'Nama Smarana (Mantra Remembrance)',
    description: 'While walking, commuting, or doing routine chores today, gently repeat your favorite mantra in rhythm with your steps.'
  },
  {
    id: 14,
    title: 'Mauna (15 Minutes of Intentional Silence)',
    description: 'Observe 15 minutes of complete outer silence today to observe your thoughts without judgment.'
  },
  {
    id: 15,
    title: 'Ishvara Pranidhana (Surrendering Anxiety)',
    description: 'Identify one worry you have been carrying, give your best practical effort, and consciously entrust the outcome to the Divine.'
  },
  {
    id: 16,
    title: 'Mudita (Joy in Others’ Success)',
    description: 'Genuinely celebrate and compliment someone else’s achievement or good fortune today without comparison.'
  },
  {
    id: 17,
    title: 'Saucha (Sanctifying Your Space)',
    description: 'Clean and organize your workspace or home altar today with mindfulness, treating orderliness as an offering.'
  },
  {
    id: 18,
    title: 'Satsanga (Uplifting Conversation)',
    description: 'Steer every conversation you have today toward encouragement, wisdom, and constructive solutions rather than gossip.'
  },
  {
    id: 19,
    title: 'Surya Pranam (Greeting the Morning Light)',
    description: 'Step outside or look toward the morning sky for two minutes, offering gratitude for the light and vitality of a new day.'
  },
  {
    id: 20,
    title: 'Samatva (Equanimity in Challenge)',
    description: 'When an unexpected delay or minor inconvenience happens today, respond with a calm breath and steady patience.'
  },
  {
    id: 21,
    title: 'Atithi Devo Bhava (Warmth to Guests & Strangers)',
    description: 'Greet everyone you interact with today — family, colleagues, or service workers — with genuine warmth and respect.'
  },
  {
    id: 22,
    title: 'Deepa Dhyana (Lighting an Evening Lamp)',
    description: 'At dusk, light a diya or candle (or visit the Virtual Mandir) and sit quietly for two minutes gazing at the steady flame.'
  },
  {
    id: 23,
    title: 'Asteya (Honoring Others’ Time)',
    description: 'Practice non-stealing in its subtle form by being punctual, fully present, and attentive when others speak to you.'
  },
  {
    id: 24,
    title: 'Nishkama Karma (Excellence Without Ego)',
    description: 'Complete your most challenging task today with 100% care and craftsmanship, offering the work itself as worship.'
  },
  {
    id: 25,
    title: 'Sattvic Nourishment',
    description: 'Choose fresh, wholesome, nourishing foods today and eat slowly without distractions or screens.'
  },
  {
    id: 26,
    title: ' Guru Smarana (Gratitude to Teachers)',
    description: 'Recall a lesson from a teacher, book, or life experience that shaped you for the better, and apply it consciously today.'
  },
  {
    id: 27,
    title: 'Abhaya (Cultivating Fearlessness)',
    description: 'Take one positive step today toward a goal or conversation you have been procrastinating out of hesitation.'
  },
  {
    id: 28,
    title: 'Karuna (Active Empathy)',
    description: 'Listen deeply to someone today without interrupting or rushing to talk about yourself.'
  },
  {
    id: 29,
    title: 'Drishti (Seeing the Divine in All)',
    description: 'Silently offer the greeting "Namaste" in your mind to the people you pass today, recognizing the same divine spark within each person.'
  },
  {
    id: 30,
    title: 'Ratri Atma-Nirikshana (Evening Self-Reflection)',
    description: 'Before sleeping tonight, review your day with kindness: give thanks for what went well and set a pure intention for tomorrow.'
  }
];

// Helper to get a challenge based on the day of the year
export const getDailyChallenge = () => {
  const now = new Date();
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  return dharmaChallenges[dayOfYear % dharmaChallenges.length];
};
