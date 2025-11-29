import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

/**
 * AudioPlayer component for narration playback
 * Supports play, pause, seeking, and volume control
 */
const AudioPlayer = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!audioUrl) {
    return (
      <div className="audio-player-placeholder">
        <p>🎧 Audio narration coming soon</p>
      </div>
    );
  }

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={audioUrl} />
      
      <div className="audio-info">
        <div className="audio-icon">🎧</div>
        <div className="audio-title">{title}</div>
      </div>

      <div className="audio-controls">
        <button className="play-pause-btn" onClick={togglePlayPause}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <div className="progress-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <input
            type="range"
            className="progress-bar"
            min="0"
            max="100"
            value={(currentTime / duration) * 100 || 0}
            onChange={handleSeek}
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        <div className="volume-control">
          <span className="volume-icon">{volume > 0.5 ? '🔊' : volume > 0 ? '🔉' : '🔇'}</span>
          <input
            type="range"
            className="volume-bar"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
