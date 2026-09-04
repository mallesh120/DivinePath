import React, { useState, useEffect, useRef } from 'react';
import shivaImg from '../../assets/images/Gods/Shiva.webp';
import krishnaImg from '../../assets/images/Gods/krishna.webp';
import ganeshaImg from '../../assets/images/Gods/ganesha.webp';
import lakshmiImg from '../../assets/images/Gods/lakshmi.webp';
import hanumanImg from '../../assets/images/Gods/hanuman.webp';
import durgaImg from '../../assets/images/Gods/durga.webp';
import ramaImg from '../../assets/images/Gods/rama.webp';
import saraswatiImg from '../../assets/images/Gods/saraswati.webp';
import vishnuImg from '../../assets/images/Gods/vishnu.webp';
import './VirtualShrine.css';

const DEITIES = [
  {
    id: 'ganesha',
    name: 'Lord Ganesha',
    title: 'Vighnaharta • Remover of Obstacles',
    mantra: 'ॐ गं गणपतये नमः',
    image: ganeshaImg,
    prasad: 'Modak & Sacred Durva',
    blessing: 'May Lord Ganesha remove all obstacles from your path and bless you with auspicious wisdom.'
  },
  {
    id: 'shiva',
    name: 'Lord Shiva',
    title: 'Mahadeva • The Auspicious Cosmic Yogi',
    mantra: 'ॐ नमः शिवाय',
    image: shivaImg,
    prasad: 'Bilva Leaves & Pure Milk',
    blessing: 'May Mahadeva bestow inner stillness, peace, and spiritual liberation upon you.'
  },
  {
    id: 'krishna',
    name: 'Lord Krishna',
    title: 'Govinda • Embodiment of Divine Love & Joy',
    mantra: 'हरे कृष्ण हरे राम',
    image: krishnaImg,
    prasad: 'Fresh Butter & Tulasi Leaves',
    blessing: 'May Sri Krishna fill your heart with supreme love, devotion, and boundless joy.'
  },
  {
    id: 'lakshmi',
    name: 'Goddess Lakshmi',
    title: 'Mahalakshmi • Mother of Abundance & Grace',
    mantra: 'ॐ श्रीं महालक्ष्म्यै नमः',
    image: lakshmiImg,
    prasad: 'Sweet Rice Kheer & Lotus Petals',
    blessing: 'May Goddess Lakshmi bestow auspicious prosperity, health, and spiritual abundance.'
  },
  {
    id: 'hanuman',
    name: 'Lord Hanuman',
    title: 'Sankat Mochan • Embodiment of Strength & Devotion',
    mantra: 'ॐ हं हनुमते नमः',
    image: hanumanImg,
    prasad: 'Boondi Laddus & Sindoor',
    blessing: 'May Veer Hanuman protect you with infinite courage, strength, and pure devotion.'
  },
  {
    id: 'durga',
    name: 'Goddess Durga',
    title: 'Mahashakti • The Divine Protector & Mother',
    mantra: 'ॐ दुं दुर्गायै नमः',
    image: durgaImg,
    prasad: 'Pomegranate & Halwa',
    blessing: 'May Mother Durga destroy negativity, fear, and grant unwavering righteous strength.'
  },
  {
    id: 'rama',
    name: 'Lord Rama',
    title: 'Maryada Purushottama • Supreme Ideal of Dharma',
    mantra: 'श्री राम जय राम जय जय राम',
    image: ramaImg,
    prasad: 'Sweet Fruits & Tulasi Water',
    blessing: 'May Lord Rama guide you along the eternal path of truth, integrity, and righteousness.'
  },
  {
    id: 'saraswati',
    name: 'Goddess Saraswati',
    title: 'Vagdevi • Goddess of Wisdom, Arts & Speech',
    mantra: 'ॐ ऐं सरस्वत्यै नमः',
    image: saraswatiImg,
    prasad: 'Yellow Fruits & Sacred Vidya',
    blessing: 'May Mother Saraswati illuminate your speech, knowledge, arts, and discernment.'
  },
  {
    id: 'vishnu',
    name: 'Lord Vishnu',
    title: 'Narayana • The Supreme Preserver',
    mantra: 'ॐ नमो नारायणाय',
    image: vishnuImg,
    prasad: 'Yellow Sweets & Sacred Tulasi',
    blessing: 'May Lord Narayana preserve righteousness, peace, and spiritual harmony in your life.'
  }
];

// Web Audio API Temple Bell Synthesizer
const playTempleBellSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    // Rich resonant bell overtones
    const partials = [
      { freq: 587.33, gain: 0.5, decay: 3.5 }, // D5 fundamental
      { freq: 880.00, gain: 0.35, decay: 2.8 }, // A5 harmonic
      { freq: 1174.66, gain: 0.25, decay: 2.0 }, // D6 octave
      { freq: 1760.00, gain: 0.15, decay: 1.4 }, // A6 sparkle
      { freq: 2349.32, gain: 0.08, decay: 0.8 }  // D7 chime
    ];

    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gainNode.gain.setValueAtTime(gain, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch (e) {
    console.warn('Audio play restricted', e);
  }
};

// Web Audio API Cosmic Om Drone Synthesizer
let omAudioCtx = null;
let omOscNodes = [];

const startOmDrone = () => {
  try {
    if (omAudioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    omAudioCtx = new AudioContext();
    
    // 136.1 Hz Cosmic Om fundamental + 68.05 Hz sub + 272.2 Hz octave
    const freqs = [68.05, 136.1, 272.2];
    const masterGain = omAudioCtx.createGain();
    masterGain.gain.setValueAtTime(0.05, omAudioCtx.currentTime);
    masterGain.connect(omAudioCtx.destination);

    omOscNodes = freqs.map(f => {
      const osc = omAudioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, omAudioCtx.currentTime);
      osc.connect(masterGain);
      osc.start();
      return osc;
    });
  } catch (e) {
    console.warn('Om drone audio context failed', e);
  }
};

const stopOmDrone = () => {
  try {
    if (omOscNodes.length > 0) {
      omOscNodes.forEach(osc => osc.stop());
      omOscNodes = [];
    }
    if (omAudioCtx) {
      omAudioCtx.close();
      omAudioCtx = null;
    }
  } catch (e) {
    console.warn('Stop drone error', e);
  }
};

const VirtualShrine = () => {
  const [selectedDeity, setSelectedDeity] = useState(DEITIES[0]);
  const [isDiyasLit, setIsDiyasLit] = useState(true);
  const [isBellRinging, setIsBellRinging] = useState(false);
  const [isAartiActive, setIsAartiActive] = useState(false);
  const [isOfferingPrasad, setIsOfferingPrasad] = useState(false);
  const [isOmChantPlaying, setIsOmChantPlaying] = useState(false);
  const [petals, setPetals] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const toastTimerRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Clean up Om audio on unmount
  useEffect(() => {
    return () => {
      stopOmDrone();
    };
  }, []);

  // Bell interaction
  const handleRingBell = () => {
    playTempleBellSound();
    setIsBellRinging(true);
    showToast('🔔 The temple bell rings, dispelling negativity & awakening devotion.');
    setTimeout(() => setIsBellRinging(false), 1500);
  };

  // Diya toggle
  const handleToggleDiya = () => {
    setIsDiyasLit(prev => {
      const next = !prev;
      showToast(next ? '🪔 Diyas lit with golden reverence and sacred light.' : '🪔 Deepam gently extinguished.');
      return next;
    });
  };

  // Pushpanjali (Flower Shower)
  const handlePushpanjali = () => {
    const flowerTypes = ['🌸', '🌺', '🌼', '🪷', '🏵️'];
    const newPetals = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      flower: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
      left: Math.random() * 90 + 5,
      animationDuration: Math.random() * 2 + 2,
      delay: Math.random() * 0.5,
      size: Math.random() * 1.2 + 1
    }));

    setPetals(newPetals);
    showToast('🌸 Pushpanjali offered! Sacred flower blossoms shower before the deity.');
    setTimeout(() => {
      setPetals([]);
    }, 4500);
  };

  // Aarti interaction
  const handlePerformAarti = () => {
    playTempleBellSound();
    setIsAartiActive(true);
    showToast(`🪔 Performing Aarti for ${selectedDeity.name}. Karpura Gauram Karunavataram...`);
    setTimeout(() => {
      setIsAartiActive(false);
    }, 6000);
  };

  // Prasad offering
  const handleOfferPrasad = () => {
    setIsOfferingPrasad(true);
    showToast(`🥥 ${selectedDeity.prasad} offered with devotion. ${selectedDeity.blessing}`);
  };

  // Om drone toggle
  const handleToggleOmDrone = () => {
    if (isOmChantPlaying) {
      stopOmDrone();
      setIsOmChantPlaying(false);
      showToast('🔇 Sacred drone paused.');
    } else {
      startOmDrone();
      setIsOmChantPlaying(true);
      showToast('🕉️ Cosmic Om drone (136.1 Hz) playing in the background.');
    }
  };

  return (
    <div className="virtual-shrine-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="shrine-toast-banner">
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* Flower Petal Shower Canvas */}
      {petals.length > 0 && (
        <div className="petals-overlay-container">
          {petals.map(p => (
            <span 
              key={p.id} 
              className="falling-petal"
              style={{
                left: `${p.left}%`,
                animationDuration: `${p.animationDuration}s`,
                animationDelay: `${p.delay}s`,
                fontSize: `${p.size}rem`
              }}
            >
              {p.flower}
            </span>
          ))}
        </div>
      )}

      {/* Top Deity Selector Carousel */}
      <div className="shrine-deity-selector glass-panel">
        <span className="deity-selector-label">Choose Sanctum Deity (Ishta Devata):</span>
        <div className="deity-thumbnails-row">
          {DEITIES.map(deity => (
            <button
              key={deity.id}
              className={`deity-thumb-btn ${selectedDeity.id === deity.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedDeity(deity);
                showToast(`🕉️ Entered the sanctum of ${deity.name}.`);
              }}
            >
              <img src={deity.image} alt={deity.name} className="thumb-img" />
              <span className="thumb-name">{deity.name.split(' ')[1] || deity.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sanctum Sanctorum (Garbhagriha) Temple Frame */}
      <div className={`sanctum-sanctorum glass-panel ${isDiyasLit ? 'diyas-glowing' : ''}`}>
        {/* Temple Arch & Brass Bell */}
        <div className="temple-arch-top">
          <div className="temple-kalash">🪷</div>
          <div 
            className={`hanging-brass-bell ${isBellRinging ? 'ringing' : ''}`}
            onClick={handleRingBell}
            title="Click to ring temple bell"
          >
            <div className="bell-chain"></div>
            <div className="bell-body">🔔</div>
          </div>
        </div>

        {/* Altar Murti Chamber */}
        <div className="altar-murti-chamber">
          {/* Left Diya */}
          <div className="altar-diya left-diya" onClick={handleToggleDiya} title="Click to toggle Deepam">
            <div className={`diya-flame ${isDiyasLit ? 'lit' : 'unlit'}`}>🔥</div>
            <div className="diya-stand">🪔</div>
          </div>

          {/* Deity Sacred Image */}
          <div className="murti-frame-glow">
            <div className="sacred-aureole-halo"></div>
            <img 
              src={selectedDeity.image} 
              alt={selectedDeity.name} 
              className="deity-murti-img" 
            />

            {/* Aarti Circling Thali Animation */}
            {isAartiActive && (
              <div className="aarti-thali-orbit">
                <div className="aarti-flame-plate">
                  <span className="aarti-icon">🪔</span>
                  <span className="aarti-sparks">✨</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Diya */}
          <div className="altar-diya right-diya" onClick={handleToggleDiya} title="Click to toggle Deepam">
            <div className={`diya-flame ${isDiyasLit ? 'lit' : 'unlit'}`}>🔥</div>
            <div className="diya-stand">🪔</div>
          </div>
        </div>

        {/* Altar Pedestal & Offerings Platform */}
        <div className="altar-pedestal-platform">
          <div className="deity-inscription">
            <h2 className="sanctum-deity-title">{selectedDeity.name}</h2>
            <p className="sanctum-deity-subtitle">{selectedDeity.title}</p>
            <p className="sanctum-deity-mantra">{selectedDeity.mantra}</p>
          </div>

          {/* Prasad Plate if offered */}
          {isOfferingPrasad && (
            <div className="prasad-offered-badge animate-pop">
              <span className="prasad-icon">🥥 🍌 🌺</span>
              <span className="prasad-name">Naivedyam: {selectedDeity.prasad}</span>
            </div>
          )}
        </div>
      </div>

      {/* Altar Devotional Actions Bar */}
      <div className="altar-actions-grid glass-panel">
        <button className="altar-tool-btn" onClick={handleRingBell}>
          <span className="tool-icon">🔔</span>
          <span className="tool-label">Ring Bell</span>
        </button>

        <button className="altar-tool-btn" onClick={handlePushpanjali}>
          <span className="tool-icon">🌸</span>
          <span className="tool-label">Pushpanjali</span>
        </button>

        <button className="altar-tool-btn" onClick={handlePerformAarti}>
          <span className="tool-icon">🪔</span>
          <span className="tool-label">Perform Aarti</span>
        </button>

        <button className="altar-tool-btn" onClick={handleOfferPrasad}>
          <span className="tool-icon">🥥</span>
          <span className="tool-label">Offer Prasad</span>
        </button>

        <button 
          className={`altar-tool-btn ${isOmChantPlaying ? 'active-drone' : ''}`}
          onClick={handleToggleOmDrone}
        >
          <span className="tool-icon">🕉️</span>
          <span className="tool-label">{isOmChantPlaying ? 'Mute Drone' : 'Cosmic Om'}</span>
        </button>
      </div>

      {/* Deity Divine Blessings Card */}
      <div className="deity-blessing-card glass-panel">
        <span className="blessing-om">ॐ</span>
        <p className="blessing-message">"{selectedDeity.blessing}"</p>
      </div>
    </div>
  );
};

export default VirtualShrine;
