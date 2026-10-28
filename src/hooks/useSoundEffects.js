import { useCallback, useRef, useEffect, useState } from 'react';

const MUTE_STORAGE_KEY = 'divinepath_arcade_muted';

const useSoundEffects = () => {
  const audioCtxRef = useRef(null);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          audioCtxRef.current = new AudioContext();
        }
      }
    };

    const handleMuteEvent = (e) => {
      setIsMuted(Boolean(e.detail));
    };

    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('divineArcadeMuteChange', handleMuteEvent);
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('divineArcadeMuteChange', handleMuteEvent);
    };
  }, []);

  const checkMuted = () => {
    try {
      return localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch (e) {
      return isMuted;
    }
  };

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(MUTE_STORAGE_KEY, String(next));
        window.dispatchEvent(new CustomEvent('divineArcadeMuteChange', { detail: next }));
      } catch (e) {}
      return next;
    });
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtxRef.current = new AudioContext();
      }
    }
    return audioCtxRef.current;
  };

  const playClick = useCallback(() => {
    if (checkMuted()) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playSuccess = useCallback(() => {
    if (checkMuted()) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const playNote = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

      gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
      gain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + duration);
    };

    // Chime: C5, E5, G5, C6
    playNote(523.25, 0, 0.25);
    playNote(659.25, 0.08, 0.25);
    playNote(783.99, 0.16, 0.25);
    playNote(1046.5, 0.24, 0.45);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playError = useCallback(() => {
    if (checkMuted()) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(130, ctx.currentTime + 0.22);

    gain.gain.setValueAtTime(0.28, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playPop = useCallback((pitchMultiplier = 1) => {
    if (checkMuted()) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const baseFreq = Math.min(1200, 440 * pitchMultiplier);
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.45, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playJump = useCallback(() => {
    if (checkMuted()) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(280, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.16);

    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const playGameOver = useCallback(() => {
    if (checkMuted()) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const notes = [392.0, 349.23, 329.63, 261.63];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.14);
      gain.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.14 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.14);
      osc.stop(ctx.currentTime + i * 0.14 + 0.25);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    playClick,
    playSuccess,
    playError,
    playPop,
    playJump,
    playGameOver,
    isMuted,
    toggleMute,
  };
};

export default useSoundEffects;
