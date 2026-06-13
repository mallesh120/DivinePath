import React, { useState, useEffect, useRef } from 'react';
import './MeditationTimer.css';

const AUDIO_TRACKS = [
  { id: 'om', name: 'Om Chanting', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 'flute', name: 'Peaceful Flute', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 'nature', name: 'Nature Sounds', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'silent', name: 'Silent Timer', url: '' },
];

const MeditationTimer = ({ onClose, onComplete, initialMinutes = 5 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(AUDIO_TRACKS[0]);
  
  const audioRef = useRef(null);

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
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (onComplete) onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => {
    if (!isActive) {
      setIsActive(true);
      if (audioRef.current && selectedTrack.url) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
    } else {
      setIsActive(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  };

  const handleTrackChange = (e) => {
    const track = AUDIO_TRACKS.find(t => t.id === e.target.value);
    setSelectedTrack(track);
    if (isActive && audioRef.current) {
      if (track.url) {
        // Must pause current, update src via state, and play again. 
        // We handle the actual play in a useEffect or rely on the audio tag reactive src
      } else {
        audioRef.current.pause();
      }
    }
  };

  useEffect(() => {
    if (isActive && audioRef.current) {
      if (selectedTrack.url) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [selectedTrack, isActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="meditation-overlay">
      <div className="meditation-modal glass-panel">
        <button className="close-btn" onClick={onClose}>×</button>
        
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
            <button className="timer-play-btn success" onClick={onClose}>
              Done
            </button>
          )}
        </div>
        
        {/* Ambient Audio */}
        {selectedTrack.url && (
          <audio 
            ref={audioRef} 
            src={selectedTrack.url} 
            loop 
          />
        )}
        
        <div className="meditation-hint">
          {isActive ? "Breathe in... Breathe out..." : "Tap Start to begin Om chanting."}
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;
