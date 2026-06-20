export const dharmaChallenges = [
  {
    id: 1,
    title: "Practice Ahimsa (Non-violence)",
    description: "Today, practice non-violence in your speech. Avoid complaining, criticizing, or using harsh words toward yourself or others."
  },
  {
    id: 2,
    title: "Practice Seva (Selfless Service)",
    description: "Do one small act of kindness today without expecting any acknowledgment or reward in return."
  },
  {
    id: 3,
    title: "Practice Santosha (Contentment)",
    description: "Find three things you are deeply grateful for right now. Whenever you feel lack today, return to this feeling of sufficiency."
  },
  {
    id: 4,
    title: "Practice Satya (Truthfulness)",
    description: "Speak only the absolute truth today, but ensure your truth is delivered with kindness and compassion."
  },
  {
    id: 5,
    title: "Digital Fasting (Tapas)",
    description: "Dedicate 2 hours today where you turn off all screens and notifications. Use this time for reflection, reading, or family."
  }
];

// Simple helper to get a challenge based on the day of the year
export const getDailyChallenge = () => {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  return dharmaChallenges[dayOfYear % dharmaChallenges.length];
};
