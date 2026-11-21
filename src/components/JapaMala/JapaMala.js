import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useSadhana } from '../../hooks/useSadhana';
import './JapaMala.css';

const BEADS_PER_MALA = 108;
const TOTAL_SLOTS = BEADS_PER_MALA + 1; // 108 beads + 1 Sumeru (Guru) bead
const SLOT_ANGLE_DEG = 360 / TOTAL_SLOTS;
const QUARTER_MARKERS = new Set([27, 54, 81]);
const MALA_GOALS = [1, 3, 5, 11, 16];
const STRAND_OFFSETS = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

const SCRIPT_MODES = [
  { id: 'both', label: 'Both' },
  { id: 'english', label: 'English' },
  { id: 'sanskrit', label: 'संस्कृत' },
];

const STORAGE_KEYS = {
  BEAD_COUNT: 'divine_path_japa_bead_count',
  COMPLETED_MALAS: 'divine_path_japa_malas',
  SELECTED_MANTRA: 'divine_path_japa_mantra_id',
  SOUND_ENABLED: 'divine_path_japa_sound_enabled',
  MALA_GOAL: 'divine_path_japa_mala_goal',
  CUSTOM_MANTRA: 'divine_path_japa_custom_mantra',
  SCRIPT_MODE: 'divine_path_japa_script_mode',
};

const MANTRAS = [
  {
    id: 'shiva',
    name: 'Om Namah Shivaya',
    deity: 'Lord Shiva',
    sanskrit: 'ॐ नमः शिवाय',
    english: 'Om Namah Shivaya',
    meaning: 'I bow to Shiva, the supreme auspicious inner self.',
  },
  {
    id: 'krishna',
    name: 'Maha Mantra (Hare Krishna)',
    deity: 'Lord Krishna',
    sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥',
    english: 'Hare Krishna Hare Krishna, Krishna Krishna Hare Hare · Hare Rama Hare Rama, Rama Rama Hare Hare',
    meaning: 'O Lord, O Divine Energy of the Lord, please engage me in Your devotional service.',
  },
  {
    id: 'gayatri',
    name: 'Gayatri Mantra',
    deity: 'Savitr · Divine Light',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    english: 'Om Bhur Bhuvah Svah, Tat Savitur Varenyam, Bhargo Devasya Dhimahi, Dhiyo Yo Nah Prachodayat',
    meaning: 'May the Supreme Divine Light illuminate our intellect and dispel darkness.',
  },
  {
    id: 'ganesha',
    name: 'Om Gam Ganapataye Namaha',
    deity: 'Lord Ganesha',
    sanskrit: 'ॐ गं गणपतये नमः',
    english: 'Om Gam Ganapataye Namaha',
    meaning: 'Salutations to Ganesha, the remover of all obstacles.',
  },
  {
    id: 'vasudeva',
    name: 'Om Namo Bhagavate Vasudevaya',
    deity: 'Lord Vishnu',
    sanskrit: 'ॐ नमो भगवते वासुदेवाय',
    english: 'Om Namo Bhagavate Vasudevaya',
    meaning: 'I surrender to Lord Vishnu, the omnipresent supreme divinity.',
  },
  {
    id: 'mrityunjaya',
    name: 'Maha Mrityunjaya Mantra',
    deity: 'Tryambaka Shiva',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
    english: 'Om Tryambakam Yajamahe, Sugandhim Pushtivardhanam · Urvarukamiva Bandhanan, Mrityor Mukshiya Maamritat',
    meaning: 'We worship the three-eyed Lord who nourishes and bestows liberation from death.',
  },
  {
    id: 'silent',
    name: 'Silent Contemplation (So Hum)',
    deity: 'Inner Self · Atman',
    sanskrit: 'सो ऽहम्',
    english: 'So Hum (So Ham)',
    meaning: 'I am That — universal consciousness.',
  },
  {
    id: 'custom',
    name: 'Custom Personal Mantra',
    deity: 'Personal Sankalpa',
    sanskrit: 'ॐ शान्तिः शान्तिः शान्तिः',
    english: 'Om Shanti Shanti Shanti',
    meaning: 'May peace radiate within, around, and everywhere.',
  },
];

const readSafeInt = (key, fallback, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = parseInt(raw, 10);
    if (Number.isNaN(parsed)) return fallback;
    return Math.min(max, Math.max(min, parsed));
  } catch (e) {
    return fallback;
  }
};

const readSafeBool = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return raw === 'true';
  } catch (e) {
    return fallback;
  }
};

const readSafeJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch (e) {
    return fallback;
  }
};

const writeSafeStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Ignore storage quota / private mode restrictions
  }
};

const formatDuration = (totalSeconds) => {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

// Precompute 108 beads on a 340x340 SVG ring.
// Slot 0 = Sumeru (Guru) bead at 12 o'clock (-90 deg).
// Slots 1..108 = Japa beads clockwise at equal 360/109 degree intervals.
const SVG_CENTER = 170;
const RING_RADIUS = 146;
const BEAD_COORDS = Array.from({ length: BEADS_PER_MALA }, (_, index) => {
  const beadNumber = index + 1;
  const angleDeg = -90 + beadNumber * SLOT_ANGLE_DEG;
  const angleRad = (angleDeg * Math.PI) / 180;
  return {
    beadNumber,
    cx: Number((SVG_CENTER + RING_RADIUS * Math.cos(angleRad)).toFixed(2)),
    cy: Number((SVG_CENTER + RING_RADIUS * Math.sin(angleRad)).toFixed(2)),
    isQuarter: QUARTER_MARKERS.has(beadNumber),
  };
});

const JapaMala = () => {
  const prefersReducedMotion = useReducedMotion();

  const [selectedMantraId, setSelectedMantraId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SELECTED_MANTRA);
      if (saved && MANTRAS.some((m) => m.id === saved)) return saved;
    } catch (e) {
      // ignore
    }
    return MANTRAS[0].id;
  });

  const [scriptMode, setScriptMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCRIPT_MODE);
      if (saved && SCRIPT_MODES.some((s) => s.id === saved)) return saved;
    } catch (e) {
      // ignore
    }
    return 'both';
  });

  const [customMantra, setCustomMantra] = useState(() =>
    readSafeJson(STORAGE_KEYS.CUSTOM_MANTRA, {
      text: 'ॐ शान्तिः शान्तिः शान्तिः',
      english: 'Om Shanti Shanti Shanti',
      meaning: 'May peace radiate within, around, and everywhere.',
    })
  );

  const [beadCount, setBeadCount] = useState(() =>
    readSafeInt(STORAGE_KEYS.BEAD_COUNT, 0, 0, BEADS_PER_MALA - 1)
  );
  // Monotonic step counter so the circular mala and bead strand glide smoothly forward even across 108 -> 0
  const [beadStep, setBeadStep] = useState(() =>
    readSafeInt(STORAGE_KEYS.BEAD_COUNT, 0, 0, BEADS_PER_MALA - 1)
  );
  const [moveDirection, setMoveDirection] = useState(1);

  const [completedMalas, setCompletedMalas] = useState(() =>
    readSafeInt(STORAGE_KEYS.COMPLETED_MALAS, 0, 0)
  );
  const [malaGoal, setMalaGoal] = useState(() => {
    const saved = readSafeInt(STORAGE_KEYS.MALA_GOAL, 1, 1, 108);
    return MALA_GOALS.includes(saved) ? saved : 1;
  });
  const [soundEnabled, setSoundEnabled] = useState(() =>
    readSafeBool(STORAGE_KEYS.SOUND_ENABLED, true)
  );

  const [isBeadAnimating, setIsBeadAnimating] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const [malaBanner, setMalaBanner] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [strandGap, setStrandGap] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= 480 ? 36 : 46
  );

  const audioCtxRef = useRef(null);
  const animTimerRef = useRef(null);
  const bannerTimerRef = useRef(null);
  const resetConfirmTimerRef = useRef(null);

  const { streak, japaCount, incrementJapa } = useSadhana(false);

  const selectedMantra = useMemo(() => {
    const base = MANTRAS.find((m) => m.id === selectedMantraId) || MANTRAS[0];
    if (base.id === 'custom') {
      return {
        ...base,
        sanskrit: customMantra.text.trim() || base.sanskrit,
        english: customMantra.english.trim() || base.english,
        meaning: customMantra.meaning.trim() || base.meaning,
      };
    }
    return base;
  }, [selectedMantraId, customMantra]);

  // Responsive bead spacing for the sliding Rudraksha strand
  useEffect(() => {
    const updateGap = () => {
      setStrandGap(window.innerWidth <= 480 ? 36 : 46);
    };
    window.addEventListener('resize', updateGap);
    return () => window.removeEventListener('resize', updateGap);
  }, []);

  // Persist user preferences and progress safely
  useEffect(() => {
    writeSafeStorage(STORAGE_KEYS.BEAD_COUNT, String(beadCount));
  }, [beadCount]);

  useEffect(() => {
    writeSafeStorage(STORAGE_KEYS.COMPLETED_MALAS, String(completedMalas));
  }, [completedMalas]);

  useEffect(() => {
    writeSafeStorage(STORAGE_KEYS.SELECTED_MANTRA, selectedMantraId);
  }, [selectedMantraId]);

  useEffect(() => {
    writeSafeStorage(STORAGE_KEYS.SCRIPT_MODE, scriptMode);
  }, [scriptMode]);

  useEffect(() => {
    writeSafeStorage(STORAGE_KEYS.SOUND_ENABLED, String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    writeSafeStorage(STORAGE_KEYS.MALA_GOAL, String(malaGoal));
  }, [malaGoal]);

  useEffect(() => {
    writeSafeStorage(STORAGE_KEYS.CUSTOM_MANTRA, JSON.stringify(customMantra));
  }, [customMantra]);

  // Session timer
  useEffect(() => {
    if (!sessionActive) return undefined;
    const id = window.setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, [sessionActive]);

  // Cleanup AudioContext and pending timers on unmount
  useEffect(() => {
    return () => {
      if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
      if (bannerTimerRef.current) window.clearTimeout(bannerTimerRef.current);
      if (resetConfirmTimerRef.current) window.clearTimeout(resetConfirmTimerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Reused Web Audio API chime (avoids AudioContext exhaustion bug)
  const playBeadChime = useCallback((beadNum) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const isMalaComplete = beadNum === BEADS_PER_MALA;
      const isQuarter = QUARTER_MARKERS.has(beadNum);

      const triggerTone = (freq, peakGain, duration, waveType = 'sine', delay = 0) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = waveType;
        osc.frequency.setValueAtTime(freq, now + delay);

        gain.gain.setValueAtTime(0.0001, now + delay);
        gain.gain.linearRampToValueAtTime(peakGain, now + delay + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + duration + 0.02);
      };

      if (isMalaComplete) {
        triggerTone(432, 0.24, 2.8, 'sine', 0);
        triggerTone(648, 0.12, 2.4, 'sine', 0.04);
        triggerTone(864, 0.07, 2.0, 'triangle', 0.08);
      } else if (isQuarter) {
        triggerTone(528, 0.14, 0.9, 'sine', 0);
        triggerTone(792, 0.06, 0.75, 'triangle', 0.02);
      } else {
        triggerTone(528, 0.1, 0.45, 'sine', 0);
        triggerTone(1056, 0.03, 0.28, 'triangle', 0);
      }
    } catch (e) {
      // Audio may be restricted before user gesture
    }
  }, []);

  const handleChant = useCallback(() => {
    const nextBead = beadCount + 1;
    setMoveDirection(1);

    if (!sessionActive) {
      setSessionActive(true);
    }

    if (confirmReset) {
      setConfirmReset(false);
    }

    // Haptic pulse on mobile devices
    if (window.navigator && window.navigator.vibrate) {
      if (nextBead === BEADS_PER_MALA) {
        window.navigator.vibrate([60, 45, 60, 45, 90]);
      } else if (QUARTER_MARKERS.has(nextBead)) {
        window.navigator.vibrate([35, 30, 35]);
      } else {
        window.navigator.vibrate(20);
      }
    }

    if (soundEnabled) {
      playBeadChime(nextBead);
    }

    // Sync with daily Sadhana counter
    incrementJapa();

    // Smooth pulse + ripple
    setIsBeadAnimating(true);
    setRippleKey((prev) => prev + 1);
    if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
    animTimerRef.current = window.setTimeout(() => setIsBeadAnimating(false), 180);

    if (nextBead >= BEADS_PER_MALA) {
      const nextTotalMalas = completedMalas + 1;
      setCompletedMalas(nextTotalMalas);
      setBeadCount(0);
      // Advance by 2 slots so bead 108 passes and the Sumeru crown glides right back to 12 o'clock
      setBeadStep((prev) => prev + 2);
      setMalaBanner(`Mala #${nextTotalMalas} Complete — Om Shanti`);
      if (bannerTimerRef.current) window.clearTimeout(bannerTimerRef.current);
      bannerTimerRef.current = window.setTimeout(() => setMalaBanner(null), 4500);
    } else {
      setBeadCount(nextBead);
      setBeadStep((prev) => prev + 1);
      if (malaBanner) setMalaBanner(null);
    }
  }, [
    beadCount,
    completedMalas,
    confirmReset,
    incrementJapa,
    malaBanner,
    playBeadChime,
    sessionActive,
    soundEnabled,
  ]);

  const handleUndo = useCallback(() => {
    if (beadCount === 0) return;
    setMoveDirection(-1);
    setBeadCount((prev) => Math.max(0, prev - 1));
    setBeadStep((prev) => Math.max(0, prev - 1));
    setConfirmReset(false);
  }, [beadCount]);

  const handleResetClick = useCallback(() => {
    if (!confirmReset) {
      setConfirmReset(true);
      if (resetConfirmTimerRef.current) window.clearTimeout(resetConfirmTimerRef.current);
      resetConfirmTimerRef.current = window.setTimeout(() => {
        setConfirmReset(false);
      }, 4000);
      return;
    }

    setMoveDirection(-1);
    setBeadCount(0);
    setBeadStep(0);
    setSessionSeconds(0);
    setSessionActive(false);
    setConfirmReset(false);
    setMalaBanner(null);
    if (resetConfirmTimerRef.current) window.clearTimeout(resetConfirmTimerRef.current);
  }, [confirmReset]);

  const cancelReset = useCallback(() => {
    setConfirmReset(false);
    if (resetConfirmTimerRef.current) window.clearTimeout(resetConfirmTimerRef.current);
  }, []);

  // Keyboard support: Space/Enter to chant (when not focused in an input/button/select), Escape to exit focus mode
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (focusMode) setFocusMode(false);
        if (confirmReset) setConfirmReset(false);
        return;
      }

      if (event.key !== ' ' && event.key !== 'Enter') return;

      const target = event.target;
      const tagName = target && target.tagName ? target.tagName.toLowerCase() : '';
      if (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        tagName === 'button' ||
        tagName === 'a' ||
        (target && target.isContentEditable)
      ) {
        return;
      }

      event.preventDefault();
      handleChant();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleChant, focusMode, confirmReset]);

  const progressPercent = Math.round((beadCount / BEADS_PER_MALA) * 100);
  const currentQuarter = Math.min(4, Math.floor(beadCount / 27) + 1);
  const todaysMalas = Math.floor(japaCount / BEADS_PER_MALA);
  const goalProgressPercent = Math.min(100, Math.round((todaysMalas / malaGoal) * 100));
  const ringRotationDeg = -(beadStep * SLOT_ANGLE_DEG);
  const rudrakshaBgUrl = `${process.env.PUBLIC_URL || ''}/images/rudraksha_bead.png`;

  const ringSpring = prefersReducedMotion
    ? { duration: 0.05 }
    : { type: 'spring', stiffness: 220, damping: 24, mass: 0.75 };

  const strandSpring = prefersReducedMotion
    ? { duration: 0.05 }
    : { type: 'spring', stiffness: 320, damping: 28, mass: 0.65 };

  return (
    <div className={`japa-mala-container ${focusMode ? 'focus-mode' : ''}`}>
      {/* Session Stats & Mantra Controls */}
      {!focusMode && (
        <section className="japa-panel japa-controls-card" aria-label="Session settings and progress">
          <div className="japa-stats-strip">
            <div className="japa-stat-pill">
              <span className="stat-value">{completedMalas}</span>
              <span className="stat-label">Total Malas</span>
            </div>
            <div className="japa-stat-pill">
              <span className="stat-value">
                {todaysMalas} / {malaGoal}
              </span>
              <span className="stat-label">Today’s Goal</span>
            </div>
            <div className="japa-stat-pill">
              <span className="stat-value">{japaCount}</span>
              <span className="stat-label">Today’s Beads</span>
            </div>
            <div className="japa-stat-pill">
              <span className="stat-value">{formatDuration(sessionSeconds)}</span>
              <span className="stat-label">Session</span>
            </div>
            {streak > 0 && (
              <div className="japa-stat-pill streak-pill">
                <span className="stat-value">🔥 {streak}</span>
                <span className="stat-label">Day Streak</span>
              </div>
            )}
          </div>

          <div className="japa-goal-bar-wrap" aria-label={`Daily goal progress ${goalProgressPercent}%`}>
            <div className="japa-goal-bar-track">
              <div
                className="japa-goal-bar-fill"
                style={{ width: `${goalProgressPercent}%` }}
              />
            </div>
          </div>

          <div className="japa-selectors-row">
            <div className="japa-field japa-mantra-field">
              <label htmlFor="mantra-select" className="japa-field-label">
                Sacred Mantra
              </label>
              <select
                id="mantra-select"
                className="japa-select"
                value={selectedMantraId}
                onChange={(e) => setSelectedMantraId(e.target.value)}
              >
                {MANTRAS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.deity})
                  </option>
                ))}
              </select>
            </div>

            <div className="japa-field japa-goal-field">
              <label htmlFor="mala-goal-select" className="japa-field-label">
                Daily Goal
              </label>
              <select
                id="mala-goal-select"
                className="japa-select"
                value={malaGoal}
                onChange={(e) => setMalaGoal(parseInt(e.target.value, 10))}
              >
                {MALA_GOALS.map((goal) => (
                  <option key={goal} value={goal}>
                    {goal} {goal === 1 ? 'Mala' : 'Malas'} ({goal * BEADS_PER_MALA})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedMantraId === 'custom' && (
            <div className="japa-custom-mantra-inputs">
              <div className="japa-field">
                <label htmlFor="custom-mantra-text" className="japa-field-label">
                  Sanskrit / Original Text
                </label>
                <input
                  id="custom-mantra-text"
                  type="text"
                  className="japa-text-input"
                  value={customMantra.text}
                  onChange={(e) =>
                    setCustomMantra((prev) => ({ ...prev, text: e.target.value }))
                  }
                  placeholder="e.g. ॐ नमो नारायणाय"
                  maxLength={140}
                />
              </div>
              <div className="japa-field">
                <label htmlFor="custom-mantra-english" className="japa-field-label">
                  English Pronunciation
                </label>
                <input
                  id="custom-mantra-english"
                  type="text"
                  className="japa-text-input"
                  value={customMantra.english}
                  onChange={(e) =>
                    setCustomMantra((prev) => ({ ...prev, english: e.target.value }))
                  }
                  placeholder="e.g. Om Namo Narayanaya"
                  maxLength={140}
                />
              </div>
              <div className="japa-field japa-field-full">
                <label htmlFor="custom-mantra-meaning" className="japa-field-label">
                  Meaning / Intention (optional)
                </label>
                <input
                  id="custom-mantra-meaning"
                  type="text"
                  className="japa-text-input"
                  value={customMantra.meaning}
                  onChange={(e) =>
                    setCustomMantra((prev) => ({ ...prev, meaning: e.target.value }))
                  }
                  placeholder="Write your sankalpa or translation"
                  maxLength={180}
                />
              </div>
            </div>
          )}
        </section>
      )}

      {/* Main Sacred 108-Bead Rosary Altar */}
      <section className="japa-panel japa-rosary-canvas" aria-label="108-bead Japa Mala altar">
        <div className="japa-canvas-topbar">
          <span className="japa-quarter-pill">
            Quarter {currentQuarter} of 4 · {progressPercent}%
          </span>

          <div className="japa-topbar-right">
            <div className="japa-script-toggle" role="group" aria-label="Mantra script display">
              {SCRIPT_MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  className={`japa-script-btn ${scriptMode === mode.id ? 'active' : ''}`}
                  onClick={() => setScriptMode(mode.id)}
                  aria-pressed={scriptMode === mode.id}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={`japa-focus-toggle ${focusMode ? 'active' : ''}`}
              onClick={() => setFocusMode((prev) => !prev)}
              aria-pressed={focusMode}
              title={focusMode ? 'Exit Dhyana Focus Mode (Esc)' : 'Enter Dhyana Focus Mode'}
            >
              {focusMode ? '✕ Exit Focus' : '✦ Focus'}
            </button>
          </div>
        </div>

        {/* Mantra Sacred Text Display (Sanskrit + English Phonetic + Meaning) */}
        <div className="active-mantra-banner">
          <p className="mantra-deity-tag">{selectedMantra.deity}</p>
          {(scriptMode === 'both' || scriptMode === 'sanskrit') && (
            <h2 className="mantra-sanskrit" lang="sa">
              {selectedMantra.sanskrit}
            </h2>
          )}
          {(scriptMode === 'both' || scriptMode === 'english') && (
            <p
              className={`mantra-english ${
                scriptMode === 'english' ? 'is-primary-script' : ''
              }`}
            >
              {selectedMantra.english}
            </p>
          )}
          <p className="mantra-translation">{selectedMantra.meaning}</p>
        </div>

        {/* Mala Completion Celebration Banner */}
        <div className="mala-live-region" aria-live="polite" aria-atomic="true">
          {malaBanner && (
            <div className="mala-complete-toast" role="status">
              <span aria-hidden="true">✨</span> {malaBanner} <span aria-hidden="true">✨</span>
            </div>
          )}
        </div>

        {/* Interactive Rotating 108-Bead Circular Mala & Central Count Orb */}
        <div
          className={`mala-wheel-wrapper ${isBeadAnimating ? 'pulsing' : ''}`}
          onClick={handleChant}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              handleChant();
            }
          }}
          aria-label={`Chant next bead. Current bead ${beadCount} of 108. Completed malas: ${completedMalas}.`}
        >
          <svg
            className="mala-ring-svg"
            viewBox="0 0 340 340"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <radialGradient id="beadDoneGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fde047" />
                <stop offset="55%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#9a3412" />
              </radialGradient>
              <radialGradient id="beadActiveGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#fde047" />
                <stop offset="100%" stopColor="#ea580c" />
              </radialGradient>
              <radialGradient id="sumeruGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </radialGradient>
            </defs>

            {/* Fixed Golden Chant Pointer at 12 o'clock (stationary thumb position) */}
            <g className="mala-fixed-pointer">
              <polygon points="170,13 164,3 176,3" fill="#f59e0b" />
              <circle
                cx={SVG_CENTER}
                cy={SVG_CENTER - RING_RADIUS}
                r={12}
                className="mala-pointer-ring"
              />
            </g>

            {/* Rotating 108-Bead + Sumeru Ring */}
            <motion.g
              animate={{ rotate: ringRotationDeg }}
              transition={ringSpring}
              style={{ originX: '170px', originY: '170px' }}
            >
              {/* Sacred Mala Thread */}
              <circle
                cx={SVG_CENTER}
                cy={SVG_CENTER}
                r={RING_RADIUS}
                className="mala-thread-circle"
              />

              {/* 108 Individual Beads */}
              {BEAD_COORDS.map((bead) => {
                const isCompleted = bead.beadNumber <= beadCount;
                const isCurrent = bead.beadNumber === beadCount;
                const radius = isCurrent ? 5.6 : bead.isQuarter ? 4.4 : 3.2;

                return (
                  <g key={bead.beadNumber}>
                    {isCurrent && (
                      <circle
                        cx={bead.cx}
                        cy={bead.cy}
                        r={10}
                        className="mala-bead-halo"
                      />
                    )}
                    <circle
                      cx={bead.cx}
                      cy={bead.cy}
                      r={radius}
                      className={`mala-svg-bead ${
                        isCurrent
                          ? 'is-current'
                          : isCompleted
                          ? 'is-completed'
                          : 'is-remaining'
                      } ${bead.isQuarter ? 'is-quarter' : ''}`}
                      fill={
                        isCurrent
                          ? 'url(#beadActiveGrad)'
                          : isCompleted
                          ? 'url(#beadDoneGrad)'
                          : undefined
                      }
                    />
                  </g>
                );
              })}

              {/* Sumeru (Guru) Bead at Slot 0 */}
              <g className="mala-sumeru-group">
                <circle
                  cx={SVG_CENTER}
                  cy={SVG_CENTER - RING_RADIUS}
                  r={8.5}
                  fill="url(#sumeruGrad)"
                  className="mala-sumeru-bead"
                />
                <circle
                  cx={SVG_CENTER}
                  cy={SVG_CENTER - RING_RADIUS - 11}
                  r={3.2}
                  fill="#ea580c"
                  opacity="0.9"
                />
              </g>
            </motion.g>
          </svg>

          {/* Central Count Orb */}
          <div className="mala-count-orb">
            {rippleKey > 0 && (
              <span key={rippleKey} className="orb-ripple" aria-hidden="true" />
            )}
            <span className="meru-symbol" aria-hidden="true">
              🕉️
            </span>
            <div className="bead-large-number">{beadCount}</div>
            <div className="bead-max-label">of {BEADS_PER_MALA}</div>
            <div className="round-progress-bar" aria-hidden="true">
              <div
                className="round-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Close-Up Tactile Rudraksha Bead Strand (Slides & Rolls on Every Chant) */}
        <div
          className="rudraksha-strand-viewport"
          onClick={handleChant}
          aria-hidden="true"
        >
          <div className="rudraksha-strand-thread" />
          <div className="rudraksha-active-frame" />

          <div className="rudraksha-strand-track">
            <AnimatePresence initial={false}>
              {STRAND_OFFSETS.map((offset) => {
                const absId = beadStep + offset;
                const slot = ((absId % TOTAL_SLOTS) + TOTAL_SLOTS) % TOTAL_SLOTS;
                const isCenter = offset === 0;
                const isSumeru = slot === 0;
                const isQuarter = QUARTER_MARKERS.has(slot);
                const isChanted = offset < 0;
                const absOffset = Math.abs(offset);

                const scale = isCenter
                  ? 1.34
                  : absOffset === 1
                  ? 0.96
                  : absOffset === 2
                  ? 0.86
                  : absOffset === 3
                  ? 0.74
                  : 0.62;
                const opacity = isCenter
                  ? 1
                  : absOffset === 1
                  ? 0.92
                  : absOffset === 2
                  ? 0.72
                  : absOffset === 3
                  ? 0.45
                  : 0.22;

                return (
                  <motion.div
                    key={absId}
                    className={`rudraksha-bead-item ${isCenter ? 'is-center' : ''} ${
                      isSumeru ? 'is-sumeru' : ''
                    } ${isQuarter ? 'is-quarter' : ''} ${isChanted ? 'is-chanted' : ''}`}
                    initial={{
                      x: (offset + moveDirection) * strandGap,
                      scale: 0.45,
                      opacity: 0,
                      rotate: (offset + moveDirection) * 28,
                    }}
                    animate={{
                      x: offset * strandGap,
                      scale,
                      opacity,
                      rotate: offset * 24,
                    }}
                    exit={{
                      x: (offset - moveDirection) * strandGap,
                      scale: 0.45,
                      opacity: 0,
                      rotate: (offset - moveDirection) * 28,
                    }}
                    transition={strandSpring}
                    style={{
                      backgroundImage: isSumeru ? undefined : `url(${rudrakshaBgUrl})`,
                    }}
                  >
                    {isSumeru && <span className="strand-sumeru-om">ॐ</span>}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <p className="chant-tap-hint">
          Tap the mala or press <kbd>Space</kbd> to pull the next bead
        </p>
      </section>

      {/* Footer Action Controls */}
      <section className="japa-panel japa-footer-controls" aria-label="Chanting actions">
        <button
          type="button"
          className="japa-chant-main-btn"
          onClick={handleChant}
        >
          🕉️ Chant Bead ({beadCount + 1}/{BEADS_PER_MALA})
        </button>

        <div className="japa-secondary-actions">
          <button
            type="button"
            className="japa-action-btn"
            onClick={handleUndo}
            disabled={beadCount === 0}
            title="Undo last bead"
          >
            ↶ Undo
          </button>

          <button
            type="button"
            className={`japa-action-btn japa-sound-toggle ${soundEnabled ? 'active' : ''}`}
            onClick={() => setSoundEnabled((prev) => !prev)}
            aria-pressed={soundEnabled}
            title="Toggle Temple Bell Chime"
          >
            {soundEnabled ? '🔔 Chimes ON' : '🔕 Muted'}
          </button>

          {!confirmReset ? (
            <button
              type="button"
              className="japa-action-btn japa-reset-btn"
              onClick={handleResetClick}
              disabled={beadCount === 0 && sessionSeconds === 0}
              title="Reset current round"
            >
              ↺ Reset
            </button>
          ) : (
            <div className="japa-reset-confirm-group" role="group" aria-label="Confirm reset">
              <button
                type="button"
                className="japa-action-btn japa-reset-confirm"
                onClick={handleResetClick}
              >
                Confirm Reset
              </button>
              <button
                type="button"
                className="japa-action-btn"
                onClick={cancelReset}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JapaMala;
