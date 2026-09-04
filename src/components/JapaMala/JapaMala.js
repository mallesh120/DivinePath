import React, { useState, useEffect } from 'react';
import { useSadhana } from '../../hooks/useSadhana';
import './JapaMala.css';

const MANTRAS = [
  {
    id: 'shiva',
    name: 'Om Namah Shivaya',
    deity: 'Lord Shiva',
    sanskrit: 'ॐ नमः शिवाय',
    meaning: 'I bow to Shiva, the supreme auspicious inner self.'
  },
  {
    id: 'krishna',
    name: 'Maha Mantra (Hare Krishna)',
    deity: 'Lord Krishna',
    sanskrit: 'हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥',
    meaning: 'O Lord, O Divine Energy of the Lord, please engage me in Your devotional service.'
  },
  {
    id: 'gayatri',
    name: 'Gayatri Mantra',
    deity: 'Savitr / Divine Light',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
    meaning: 'May the Supreme Divine Light illuminate our intellect and dispel darkness.'
  },
  {
    id: 'ganesha',
    name: 'Om Gam Ganapataye Namaha',
    deity: 'Lord Ganesha',
    sanskrit: 'ॐ गं गणपतये नमः',
    meaning: 'Salutations to Ganesha, the remover of all obstacles.'
  },
  {
    id: 'vasudeva',
    name: 'Om Namo Bhagavate Vasudevaya',
    deity: 'Lord Vishnu',
    sanskrit: 'ॐ नमो भगवते वासुदेवाय',
    meaning: 'I surrender to Lord Krishna / Vishnu, the omnipresent supreme divinity.'
  },
  {
    id: 'mrityunjaya',
    name: 'Maha Mrityunjaya Mantra',
    deity: 'Tryambaka Shiva',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् । उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात् ॥',
    meaning: 'We worship the three-eyed Lord who nourishes and bestows liberation from death.'
  },
  {
    id: 'silent',
    name: 'Silent Contemplation / So Hum',
    deity: 'Inner Self (Atman)',
    sanskrit: 'सो ऽहम्',
    meaning: 'I am That — universal consciousness.'
  }
];

const playBeadChime = (beadNum) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    const isMalaComplete = beadNum === 108;
    const baseFreq = isMalaComplete ? 432 : 528; // Sacred Solfeggio Love / Om tuning
    const duration = isMalaComplete ? 2.5 : 0.8;
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 2.01, ctx.currentTime);
    
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(isMalaComplete ? 0.4 : 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch (e) {
    // Audio context may be restricted before user gesture
  }
};

const JapaMala = () => {
  const [selectedMantra, setSelectedMantra] = useState(MANTRAS[0]);
  const [beadCount, setBeadCount] = useState(() => {
    return parseInt(localStorage.getItem('divine_path_japa_bead_count') || '0', 10);
  });
  const [completedMalas, setCompletedMalas] = useState(() => {
    return parseInt(localStorage.getItem('divine_path_japa_malas') || '0', 10);
  });
  const [isBeadAnimating, setIsBeadAnimating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const { streak } = useSadhana(false);

  useEffect(() => {
    localStorage.setItem('divine_path_japa_bead_count', beadCount.toString());
  }, [beadCount]);

  useEffect(() => {
    localStorage.setItem('divine_path_japa_malas', completedMalas.toString());
  }, [completedMalas]);

  const handleChant = () => {
    const nextBead = beadCount + 1;
    
    // Haptic pulse on mobile if supported
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(nextBead === 108 ? [50, 50, 50] : 30);
    }

    if (soundEnabled) {
      playBeadChime(nextBead);
    }

    setIsBeadAnimating(true);
    setTimeout(() => setIsBeadAnimating(false), 200);

    if (nextBead >= 108) {
      setCompletedMalas(prev => prev + 1);
      setBeadCount(0);
    } else {
      setBeadCount(nextBead);
    }
  };

  const handleResetCurrentMala = () => {
    if (window.confirm('Reset current round to bead 0?')) {
      setBeadCount(0);
    }
  };

  const currentBeadNumber = beadCount;
  const progressPercent = Math.round((currentBeadNumber / 108) * 100);

  return (
    <div className="japa-mala-container">
      {/* Top Header Card */}
      <div className="japa-header-card glass-panel">
        <div className="japa-title-row">
          <div className="japa-title-left">
            <span className="japa-sacred-icon">📿</span>
            <div>
              <h2 className="japa-main-title">108 Sacred Japa Mala</h2>
              <p className="japa-subtitle">Mindful Mantra Chanting & Dhyana</p>
            </div>
          </div>
          <div className="japa-stats-badges">
            <div className="mala-badge">
              <span className="badge-number">{completedMalas}</span>
              <span className="badge-label">Malas Done</span>
            </div>
            {streak > 0 && (
              <div className="streak-badge">
                <span className="badge-number">🔥 {streak}</span>
                <span className="badge-label">Day Streak</span>
              </div>
            )}
          </div>
        </div>

        {/* Mantra Selector Dropdown */}
        <div className="japa-mantra-selector">
          <label htmlFor="mantra-select" className="mantra-label">Select Sacred Mantra:</label>
          <select 
            id="mantra-select"
            className="mantra-dropdown"
            value={selectedMantra.id}
            onChange={(e) => {
              const found = MANTRAS.find(m => m.id === e.target.value);
              if (found) setSelectedMantra(found);
            }}
          >
            {MANTRAS.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.deity})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center Sacred Focus & Chanting Rosary */}
      <div className="japa-rosary-canvas glass-panel" onClick={handleChant}>
        {/* Mantra Sacred Text Display */}
        <div className="active-mantra-banner">
          <h3 className="mantra-deity-tag">{selectedMantra.deity}</h3>
          <p className="mantra-sanskrit">{selectedMantra.sanskrit}</p>
          <p className="mantra-translation">{selectedMantra.meaning}</p>
        </div>

        {/* Circular Beads & Guru Bead Altar */}
        <div className={`mala-center-hub ${isBeadAnimating ? 'pulsing' : ''}`}>
          <div className="mala-guru-meru">
            <span className="meru-symbol">🕉️</span>
            <span className="meru-label">Sumeru</span>
          </div>

          <div className="mala-count-orb">
            <div className="bead-large-number">{currentBeadNumber}</div>
            <div className="bead-max-label">of 108 Beads</div>
            <div className="round-progress-bar">
              <div 
                className="round-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <p className="chant-tap-hint">Tap anywhere to chant next bead</p>
        </div>

        {/* Beads Track Indicator Ribbon */}
        <div className="beads-visual-ribbon">
          {Array.from({ length: 12 }).map((_, i) => {
            const beadRelative = (currentBeadNumber + i - 6 + 108) % 108;
            const isCenter = i === 6;
            return (
              <div 
                key={i} 
                className={`bead-node ${isCenter ? 'current-bead' : ''}`}
                title={`Bead ${beadRelative}`}
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL || ''}/images/rudraksha_bead.png)`
                }}
              >
                {isCenter && <span className="bead-ring-glow"></span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Controls & Sound Toggle */}
      <div className="japa-footer-controls glass-panel">
        <button 
          className="japa-chant-main-btn"
          onClick={handleChant}
        >
          🕉️ Chant ({currentBeadNumber + 1}/108)
        </button>

        <div className="japa-secondary-actions">
          <button 
            className={`japa-sound-toggle ${soundEnabled ? 'active' : ''}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            title="Toggle Bell Chime Audio"
          >
            {soundEnabled ? '🔔 Chimes ON' : '🔕 Muted'}
          </button>

          <button 
            className="japa-reset-btn"
            onClick={handleResetCurrentMala}
            title="Reset bead counter"
          >
            ↺ Reset Bead
          </button>
        </div>
      </div>
    </div>
  );
};

export default JapaMala;
