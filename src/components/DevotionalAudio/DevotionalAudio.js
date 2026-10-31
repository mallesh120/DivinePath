import React, { useState, useRef, useEffect, useCallback } from 'react';
import { devotionalTracks } from '../../data/devotionalAudioData';
import './DevotionalAudio.css';

const DevotionalAudio = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState('all');
  const [progress, setProgress] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const audioRef = useRef(null);
  const synthCtxRef = useRef(null);
  const chimeTimerRef = useRef(null);
  const progressTimerRef = useRef(null);

  const filteredTracks = filter === 'all'
    ? devotionalTracks
    : devotionalTracks.filter(track => track.type === filter);

  const currentAudioTrack = filteredTracks[currentTrack] || filteredTracks[0];

  const stopSynthAndSpeech = useCallback(() => {
    if (chimeTimerRef.current) {
      clearInterval(chimeTimerRef.current);
      chimeTimerRef.current = null;
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (synthCtxRef.current) {
      try {
        synthCtxRef.current.close();
      } catch (e) {}
      synthCtxRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const triggerBellChime = useCallback((ctx, freq = 528) => {
    if (!ctx || ctx.state === 'closed') return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 3.2);
    } catch (e) {}
  }, []);

  const startSynthSoundscape = useCallback((track) => {
    stopSynthAndSpeech();
    if (!track) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        synthCtxRef.current = ctx;

        const base = track.baseFreq || 136.1;
        const freqs = [base * 0.5, base, base * 1.5, base * 2];
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.05, ctx.currentTime);
        masterGain.connect(ctx.destination);

        freqs.forEach((f, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(f, ctx.currentTime);
          oscGain.gain.setValueAtTime(idx === 1 ? 0.5 : 0.2, ctx.currentTime);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
        });

        triggerBellChime(ctx, track.chimeFreq || 528);
        chimeTimerRef.current = setInterval(() => {
          triggerBellChime(ctx, track.chimeFreq || 528);
        }, 6500);
      }
    } catch (e) {}

    if (voiceEnabled && track.chantText && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(track.chantText);
        utterance.rate = 0.82;
        utterance.pitch = 0.95;
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }

    const totalSec = track.durationSeconds || 240;
    progressTimerRef.current = setInterval(() => {
      setElapsedSeconds(prev => {
        const next = prev + 1;
        setProgress(Math.min(100, (next / totalSec) * 100));
        if (next >= totalSec) {
          stopSynthAndSpeech();
          setIsPlaying(false);
          return 0;
        }
        return next;
      });
    }, 1000);
  }, [stopSynthAndSpeech, triggerBellChime, voiceEnabled]);

  useEffect(() => {
    return () => {
      stopSynthAndSpeech();
    };
  }, [stopSynthAndSpeech]);

  const startPlayback = useCallback((track) => {
    if (!track) return;
    setIsPlaying(true);

    // Start ambient tanpura/meditation soundscape + guided chant
    startSynthSoundscape(track);

    // Also play bundled mantra MP3 if available
    if (track.audioFile && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play()?.catch(() => {});
    }
  }, [startSynthSoundscape]);

  const pausePlayback = useCallback(() => {
    setIsPlaying(false);
    stopSynthAndSpeech();
    audioRef.current?.pause();
  }, [stopSynthAndSpeech]);

  const handleFilterChange = (nextFilter) => {
    pausePlayback();
    setFilter(nextFilter);
    setCurrentTrack(0);
    setProgress(0);
    setElapsedSeconds(0);
  };

  const playPauseHandler = () => {
    if (isPlaying) {
      pausePlayback();
    } else {
      startPlayback(currentAudioTrack);
    }
  };

  const selectTrack = (index) => {
    pausePlayback();
    setCurrentTrack(index);
    setProgress(0);
    setElapsedSeconds(0);
    const chosen = filteredTracks[index];
    setTimeout(() => {
      startPlayback(chosen);
    }, 60);
  };

  const previousTrack = () => {
    if (currentTrack > 0) {
      selectTrack(currentTrack - 1);
    }
  };

  const nextTrack = () => {
    if (currentTrack < filteredTracks.length - 1) {
      selectTrack(currentTrack + 1);
    }
  };

  const formatSecs = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="audio-widget">
      <div className="audio-header">
        <h2 className="audio-title">🎵 Devotional Audio</h2>
        <p className="audio-subtitle">Sacred Tanpura Soundscapes, Mantras & Guided Meditation</p>
      </div>

      <div className="audio-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => handleFilterChange('all')}
        >
          All Tracks
        </button>
        <button 
          className={`filter-btn ${filter === 'meditation' ? 'active' : ''}`}
          onClick={() => handleFilterChange('meditation')}
        >
          🧘 Meditation
        </button>
        <button 
          className={`filter-btn ${filter === 'bhajan' ? 'active' : ''}`}
          onClick={() => handleFilterChange('bhajan')}
        >
          🙏 Bhajans
        </button>
      </div>

      {currentAudioTrack && (
        <div className="now-playing">
          <div className="now-playing-header">
            <span className="now-playing-label">
              {isPlaying ? `Now Playing • ${formatSecs(elapsedSeconds)}` : 'Ready to Play'}
            </span>
            <span className="track-type-badge">
              {currentAudioTrack.type === 'meditation' ? '🧘 Meditation' : '🙏 Bhajan'}
            </span>
          </div>
          <h3 className="now-playing-title">{currentAudioTrack.title}</h3>
          <p className="now-playing-description">{currentAudioTrack.description}</p>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>

          {currentAudioTrack.audioFile && (
            <audio 
              ref={audioRef} 
              src={currentAudioTrack.audioFile}
              loop
            />
          )}

          <div className="audio-controls">
            <button 
              className="control-btn" 
              onClick={previousTrack}
              disabled={currentTrack === 0}
              title="Previous Track"
            >
              ⏮️
            </button>
            <button className="control-btn play-pause" onClick={playPauseHandler} title={isPlaying ? 'Pause' : 'Play'}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button 
              className="control-btn" 
              onClick={nextTrack}
              disabled={currentTrack === filteredTracks.length - 1}
              title="Next Track"
            >
              ⏭️
            </button>
            <button
              className="control-btn"
              onClick={() => setVoiceEnabled(v => !v)}
              title={voiceEnabled ? 'Voice Guidance On' : 'Ambient Drone Only'}
              style={{ fontSize: '0.9rem', opacity: voiceEnabled ? 1 : 0.6 }}
            >
              {voiceEnabled ? '🗣️' : '🔕'}
            </button>
          </div>
        </div>
      )}

      <div className="playlist">
        <h3 className="playlist-title">Playlist ({filteredTracks.length} tracks)</h3>
        <div className="playlist-tracks">
          {filteredTracks.map((track, index) => (
            <div
              key={track.id}
              className={`playlist-item ${index === currentTrack ? 'active' : ''}`}
              onClick={() => selectTrack(index)}
            >
              <div className="playlist-item-info">
                <span className="playlist-item-icon">
                  {track.type === 'meditation' ? '🧘' : '🙏'}
                </span>
                <div className="playlist-item-details">
                  <h4 className="playlist-item-title">{track.title}</h4>
                  <p className="playlist-item-description">{track.description}</p>
                </div>
              </div>
              <span className="playlist-item-duration">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DevotionalAudio;
