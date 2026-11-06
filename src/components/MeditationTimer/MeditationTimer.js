import React, { useState, useEffect, useRef, useCallback } from 'react';
import './MeditationTimer.css';

const AUDIO_TRACKS = [
  { id: 'om', name: '🕉️ 136.1 Hz Cosmic Om & Tanpura' },
  { id: 'flute', name: '🪈 Peaceful Harmonic Flute & Chimes' },
  { id: 'nature', name: '🌿 Sacred River & Temple Breeze' },
  { id: 'silent', name: '🧘 Silent Timer (Bell Only)' },
];

const playTempleBell = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    const partials = [
      { freq: 528, gain: 0.35, decay: 3.0 },
      { freq: 792, gain: 0.2, decay: 2.2 },
      { freq: 1056, gain: 0.12, decay: 1.5 }
    ];
    partials.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      g.gain.setValueAtTime(gain, now);
      g.gain.exponentialRampToValueAtTime(0.0001, now + decay);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + decay);
    });
    setTimeout(() => {
      try { ctx.close(); } catch (e) {}
    }, 3200);
  } catch (e) {}
};

const MeditationTimer = ({ onClose, onComplete, initialMinutes = 5 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(AUDIO_TRACKS[0]);

  const synthCtxRef = useRef(null);
  const chimeIntervalRef = useRef(null);

  const stopAmbientAudio = useCallback(() => {
    if (chimeIntervalRef.current) {
      clearInterval(chimeIntervalRef.current);
      chimeIntervalRef.current = null;
    }
    if (synthCtxRef.current) {
      try {
        synthCtxRef.current.close();
      } catch (e) {}
      synthCtxRef.current = null;
    }
  }, []);

  const startAmbientAudio = useCallback((trackId) => {
    stopAmbientAudio();
    if (!trackId || trackId === 'silent') return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      synthCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
      masterGain.connect(ctx.destination);

      if (trackId === 'om') {
        // 136.1 Hz Cosmic Om + fifth & octave tanpura harmonics
        [68.05, 136.1, 204.15, 272.2].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = i % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          g.gain.setValueAtTime(i === 1 ? 0.5 : 0.2, ctx.currentTime);
          osc.connect(g);
          g.connect(masterGain);
          osc.start();
        });
      } else if (trackId === 'flute') {
        // Warm pentatonic Bansuri pad with gentle LFO vibrato
        const notes = [261.63, 329.63, 392.0, 523.25];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          g.gain.setValueAtTime(i === 0 ? 0.4 : 0.18, ctx.currentTime);
          osc.connect(g);
          g.connect(masterGain);
          osc.start();
        });
        chimeIntervalRef.current = setInterval(() => {
          if (!synthCtxRef.current || synthCtxRef.current.state === 'closed') return;
          const now = synthCtxRef.current.currentTime;
          const scale = [523.25, 587.33, 659.25, 783.99, 880.0];
          const note = scale[Math.floor(Math.random() * scale.length)];
          const osc = synthCtxRef.current.createOscillator();
          const g = synthCtxRef.current.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(note, now);
          g.gain.setValueAtTime(0.05, now);
          g.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
          osc.connect(g);
          g.connect(synthCtxRef.current.destination);
          osc.start(now);
          osc.stop(now + 2.8);
        }, 4500);
      } else if (trackId === 'nature') {
        // Soft filtered river/wind noise + gentle 432Hz harmonic pad
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 0.35;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(420, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        whiteNoise.start();

        const pad = ctx.createOscillator();
        pad.type = 'sine';
        pad.frequency.setValueAtTime(216, ctx.currentTime);
        const padGain = ctx.createGain();
        padGain.gain.setValueAtTime(0.2, ctx.currentTime);
        pad.connect(padGain);
        padGain.connect(masterGain);
        pad.start();
      }
    } catch (e) {}
  }, [stopAmbientAudio]);

  useEffect(() => {
    return () => {
      stopAmbientAudio();
    };
  }, [stopAmbientAudio]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      // Timer finished!
      setIsActive(false);
      setIsCompleted(true);
      stopAmbientAudio();
      playTempleBell();
      if (onComplete) onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete, stopAmbientAudio]);

  const toggleTimer = () => {
    if (!isActive) {
      setIsActive(true);
      playTempleBell();
      startAmbientAudio(selectedTrack.id);
    } else {
      setIsActive(false);
      stopAmbientAudio();
    }
  };

  const handleTrackChange = (e) => {
    const track = AUDIO_TRACKS.find(t => t.id === e.target.value) || AUDIO_TRACKS[0];
    setSelectedTrack(track);
    if (isActive) {
      startAmbientAudio(track.id);
    }
  };

  const handleClose = () => {
    stopAmbientAudio();
    if (onClose) onClose();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="meditation-overlay">
      <div className="meditation-modal glass-panel">
        <button className="close-btn" onClick={handleClose}>×</button>
        
        <h2 className="meditation-title">Daily Meditation</h2>
        <p className="meditation-subtitle">Find your center and breathe.</p>
        
        {/* Breathing Animation Circle */}
        <div className="breathing-container">
          <div className={`breathing-circle ${isActive ? 'animating' : ''} ${isCompleted ? 'completed-circle' : ''}`}>
             <div className="timer-text">
               {isCompleted ? "OM" : formatTime(timeLeft)}
             </div>
          </div>
        </div>

        <div className="meditation-controls">
          {!isCompleted && (
            <div className="track-selector-wrapper">
              <select 
                className="track-selector" 
                value={selectedTrack.id} 
                onChange={handleTrackChange}
              >
                {AUDIO_TRACKS.map(track => (
                  <option key={track.id} value={track.id}>{track.name}</option>
                ))}
              </select>
            </div>
          )}
          {!isCompleted ? (
            <button className="timer-play-btn" onClick={toggleTimer}>
              {isActive ? 'Pause' : 'Start Session'}
            </button>
          ) : (
            <button className="timer-play-btn success" onClick={handleClose}>
              Done
            </button>
          )}
        </div>
        
        <div className="meditation-hint">
          {isActive ? "Breathe in... Breathe out..." : "Tap Start to begin your sacred dhyana session."}
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;
