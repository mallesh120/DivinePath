const HIGHSCORE_STORAGE_KEY = 'divinepath_arcade_highscores';
const PLAYCOUNT_STORAGE_KEY = 'divinepath_arcade_plays';

export const ARCADE_GAMES = [
  {
    id: 'modak',
    title: 'Catch the Modak DX',
    subtitle: "Ganesha's Sweet Feast",
    category: 'action',
    categoryLabel: '⚡ Action Arcade',
    route: '/kids/games/modak',
    icon: '🥟',
    secondaryIcons: ['🍬', '🪷', '⚡'],
    ribbon: 'HOT 🔥',
    ribbonType: 'hot',
    rating: '4.9',
    basePlays: 1420,
    featured: true,
    engineBadge: 'HTML5 Canvas • 60 FPS',
    description:
      'Move Lord Ganesha across the golden mandapa to catch falling Modaks, Laddoos, and Sacred Lotuses! Build 5x Fever combos, activate Magnet & Shield power-ups, and dodge falling stones.',
    shortDescription:
      'Catch falling Modaks, build 5x Fever combos & unlock divine power-ups in 60 FPS!',
    rewardTag: '⭐ +1 to +3 Stars',
    scoreUnit: 'pts',
    defaultHighScore: 0,
    themeGradient: 'linear-gradient(135deg, #FF8008 0%, #FFC837 100%)',
    stageBg: 'linear-gradient(180deg, #1e1b4b 0%, #4338ca 55%, #f59e0b 100%)',
    controls: [
      { key: '🖱️ Mouse / Touch', action: 'Slide Ganesha Left & Right' },
      { key: '◀ ▶ or A / D', action: 'Move with Keyboard Arrows' },
      { key: 'P / Space', action: 'Pause / Resume Game' },
    ],
    tips: [
      'Catch 5 sweets in a row without missing to activate FEVER MODE (2x–5x points)!',
      'Pink Sacred Lotuses restore +1 Heart and grant bonus points.',
      'Blue Sudarshan Shields protect Ganesha from falling stones for 6 seconds!',
    ],
  },
  {
    id: 'archery',
    title: "Arjuna's Archery",
    subtitle: 'Matsya Yantra Bowmaster',
    category: 'skill',
    categoryLabel: '🏹 Aim & Skill',
    route: '/kids/games/archery',
    icon: '🏹',
    secondaryIcons: ['🎯', '🐟', '🌬️'],
    ribbon: 'NEW ✨',
    ribbonType: 'new',
    rating: '4.9',
    basePlays: 980,
    featured: false,
    engineBadge: 'HTML5 Physics • 60 FPS',
    description:
      'Draw the legendary Gandiva bow! Aim with real projectile physics, compensate for wind gusts, and hit moving targets, Golden Chakras, and the revolving Matsya Yantra fish-eye!',
    shortDescription:
      'Pull back the Gandiva bow, calculate wind & trajectory, and strike the bullseye!',
    rewardTag: '⭐ +2 Stars Reward',
    scoreUnit: 'pts',
    defaultHighScore: 0,
    themeGradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    stageBg: 'linear-gradient(180deg, #0f172a 0%, #1e3a8a 60%, #0284c7 100%)',
    controls: [
      { key: '🖱️ Click & Drag', action: 'Pull Bowstring & Aim Angle' },
      { key: '🖐️ Release', action: 'Fire Golden Arrow' },
      { key: '🌬️ Wind Meter', action: 'Adjust Aim for Wind Speed' },
    ],
    tips: [
      'Bullseye hits don’t consume an arrow from your quiver AND boost your streak multiplier!',
      'Watch the Wind vane at the top of the screen before releasing long-distance shots.',
      'Hit the Golden Fish (Matsya target) for a massive +100 Bonus!',
    ],
  },
  {
    id: 'hanuman',
    title: 'Hanuman Sky Leap',
    subtitle: 'Quest for Sanjeevani',
    category: 'action',
    categoryLabel: '⚡ Action Arcade',
    route: '/kids/games/hanuman',
    icon: '🐒',
    secondaryIcons: ['⛰️', '☁️', '🌿'],
    ribbon: 'NEW ✨',
    ribbonType: 'new',
    rating: '4.8',
    basePlays: 1150,
    featured: false,
    engineBadge: 'HTML5 Canvas • 60 FPS',
    description:
      'Soar higher and higher into the Himalayan skies! Bounce across golden clouds, lotus springs, and moving wind currents to gather glowing Sanjeevani herbs and golden mangoes.',
    shortDescription:
      'Bounce across Himalayan clouds & lotus springs to collect glowing Sanjeevani herbs!',
    rewardTag: '⭐ +2 Stars Reward',
    scoreUnit: 'm',
    defaultHighScore: 0,
    themeGradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
    stageBg: 'linear-gradient(180deg, #31102F 0%, #9A3412 55%, #FBBF24 100%)',
    controls: [
      { key: '◀ ▶ or A / D', action: 'Steer Hanuman in Mid-Air' },
      { key: '🖱️ Mouse / Touch', action: 'Guide Horizontal Flight' },
      { key: '🌿 Sanjeevani Herb', action: 'Super Rocket Boost Upward!' },
    ],
    tips: [
      'Pink Lotus pads give a 1.8x high-bounce leap into the upper clouds!',
      'Grabbing a glowing Sanjeevani Herb launches Hanuman in a golden invincible flight!',
      'You can wrap around the left and right edges of the screen!',
    ],
  },
  {
    id: 'trivia',
    title: 'Divine Trivia Showdown',
    subtitle: '4 Epic Mythology Packs',
    category: 'brain',
    categoryLabel: '🧠 Brain & Quiz',
    route: '/kids/games/trivia',
    icon: '🧠',
    secondaryIcons: ['👑', '🦚', '🪔'],
    ribbon: 'POPULAR ⭐',
    ribbonType: 'popular',
    rating: '4.8',
    basePlays: 1640,
    featured: false,
    engineBadge: 'Interactive Quiz Stage',
    description:
      'Test your wisdom across 4 exciting mythology packs: Ramayana Heroes, Krishna Leelas, Sacred Festivals, and Divine Animal Vahanas! Build answer streaks to maximize your score.',
    shortDescription:
      'Explore 4 mythology quiz packs on Ramayana heroes, Krishna leelas, festivals & vahanas!',
    rewardTag: '⭐ +1 Star per Pack',
    scoreUnit: 'pts',
    defaultHighScore: 0,
    themeGradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    stageBg: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 60%, #4f46e5 100%)',
    controls: [
      { key: '🖱️ Click / Tap', action: 'Select Answer Option (A, B, C, D)' },
      { key: '🔥 Answer Streak', action: 'Consecutive Correct Answers = Bonus Points' },
    ],
    tips: [
      'Read the wisdom explanation after each question to learn secret stories from the Puranas!',
      'Get a 100% Perfect Score to unlock the Golden Trophy badge!',
    ],
  },
  {
    id: 'memory',
    title: 'Sacred Memory Match',
    subtitle: '3 Card Decks & Combo Timer',
    category: 'brain',
    categoryLabel: '🧠 Brain & Puzzle',
    route: '/kids/games/memory',
    icon: '🎴',
    secondaryIcons: ['🕉️', '🐘', '🔱'],
    ribbon: 'CLASSIC 💎',
    ribbonType: 'classic',
    rating: '4.7',
    basePlays: 1290,
    featured: false,
    engineBadge: 'Interactive Card Stage',
    description:
      'Flip enchanted temple cards to match pairs of Sacred Symbols, Divine Animal Friends, and Epic Legends! Fewer moves and faster matches earn higher arcade scores.',
    shortDescription:
      'Flip temple cards to pair sacred symbols, divine animal friends, and legendary heroes!',
    rewardTag: '⭐ +1 Star Reward',
    scoreUnit: 'pts',
    defaultHighScore: 0,
    themeGradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    stageBg: 'linear-gradient(180deg, #064e3b 0%, #047857 60%, #10b981 100%)',
    controls: [
      { key: '🖱️ Click / Tap', action: 'Flip up to 2 Cards at a Time' },
      { key: '🎨 Deck Tabs', action: 'Switch between Symbols, Animals & Legends' },
    ],
    tips: [
      'Fewer moves = a higher Efficiency Bonus at the end of the round!',
      'Try beating all 3 decks (Sacred Symbols, Divine Friends, Epic Legends)!',
    ],
  },
  {
    id: 'chanting',
    title: 'Mantra & Shloka Garden',
    subtitle: 'Interactive Temple Soundboard',
    category: 'zen',
    categoryLabel: '🌸 Zen & Audio',
    route: '/kids/chanting',
    icon: '🌸',
    secondaryIcons: ['🔔', '🪔', '🕉️'],
    ribbon: 'ZEN 🌸',
    ribbonType: 'zen',
    rating: '4.9',
    basePlays: 890,
    featured: false,
    engineBadge: 'Audio Synthesizer',
    description:
      'Step into a peaceful interactive garden to listen to divine chants, practice Sanskrit shlokas, offer floating flowers, and ring temple bells!',
    shortDescription:
      'Listen to divine chants, practice Sanskrit shlokas, offer flowers & ring temple bells!',
    rewardTag: '⭐ Daily Habit',
    scoreUnit: '',
    defaultHighScore: 0,
    themeGradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    stageBg: 'linear-gradient(180deg, #500724 0%, #831843 60%, #db2777 100%)',
    controls: [
      { key: '🔔 Temple Bell', action: 'Tap to Ring Sacred Resonance' },
      { key: '🌸 Offer Flower', action: 'Shower Petals & Earn Dharma Stars' },
    ],
    tips: ['Practice one shloka each day to build your 7-day Shloka Mastery streak!'],
  },
];

export const ARCADE_CATEGORIES = [
  { id: 'all', label: '🕹️ All Games' },
  { id: 'action', label: '⚡ Action & Arcade' },
  { id: 'skill', label: '🏹 Aim & Skill' },
  { id: 'brain', label: '🧠 Brain & Quiz' },
  { id: 'zen', label: '🌸 Zen & Sound' },
];

export const getHighScores = () => {
  try {
    const raw = localStorage.getItem(HIGHSCORE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

export const getGameHighScore = (gameId) => {
  const scores = getHighScores();
  return scores[gameId] || 0;
};

export const saveGameHighScore = (gameId, score) => {
  try {
    const scores = getHighScores();
    const prev = scores[gameId] || 0;
    if (score > prev) {
      const updated = { ...scores, [gameId]: score };
      localStorage.setItem(HIGHSCORE_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('divineArcadeScoreUpdate', { detail: updated }));
      return true; // New record!
    }
  } catch (e) {}
  return false;
};

export const incrementPlayCount = (gameId) => {
  try {
    const raw = localStorage.getItem(PLAYCOUNT_STORAGE_KEY);
    const counts = raw ? JSON.parse(raw) : {};
    counts[gameId] = (counts[gameId] || 0) + 1;
    localStorage.setItem(PLAYCOUNT_STORAGE_KEY, JSON.stringify(counts));
    return counts[gameId];
  } catch (e) {
    return 1;
  }
};

export const getPlayCounts = () => {
  try {
    const raw = localStorage.getItem(PLAYCOUNT_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
};

