import React, { useState, useRef, useEffect } from 'react';
import { devotionalTracks } from '../../data/devotionalAudioData';
import './DevotionalAudio.css';

const DevotionalAudio = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filter, setFilter] = useState('all');
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const filteredTracks = filter === 'all' 
    ? devotionalTracks 
    : devotionalTracks.filter(track => track.type === filter);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      // Auto-play next track
      if (currentTrack < filteredTracks.length - 1) {
        setCurrentTrack(currentTrack + 1);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
        setProgress(0);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, filteredTracks.length]);

  const playPauseHandler = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play();
    }, 100);
  };

  const previousTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    if (currentTrack < filteredTracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
      setIsPlaying(true);
    }
  };

  const currentAudioTrack = filteredTracks[currentTrack];
  const audioSrc = `/audio/devotional/${currentAudioTrack?.audioFile}`;

  return (
    <div className="audio-widget">
      <div className="audio-header">
        <h2 className="audio-title">🎵 Devotional Audio</h2>
        <p className="audio-subtitle">Meditation & Bhajans for spiritual upliftment</p>
      </div>

      <div className="audio-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Tracks
        </button>
        <button 
          className={`filter-btn ${filter === 'meditation' ? 'active' : ''}`}
          onClick={() => setFilter('meditation')}
        >
          🧘 Meditation
        </button>
        <button 
          className={`filter-btn ${filter === 'bhajan' ? 'active' : ''}`}
          onClick={() => setFilter('bhajan')}
        >
          🙏 Bhajans
        </button>
      </div>

      {currentAudioTrack && (
        <div className="now-playing">
          <div className="now-playing-header">
            <span className="now-playing-label">Now Playing</span>
            <span className="track-type-badge">
              {currentAudioTrack.type === 'meditation' ? '🧘 Meditation' : '🙏 Bhajan'}
            </span>
          </div>
          <h3 className="now-playing-title">{currentAudioTrack.title}</h3>
          <p className="now-playing-description">{currentAudioTrack.description}</p>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>

          <audio 
            ref={audioRef} 
            src={audioSrc}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <div className="audio-controls">
            <button 
              className="control-btn" 
              onClick={previousTrack}
              disabled={currentTrack === 0}
            >
              ⏮️
            </button>
            <button className="control-btn play-pause" onClick={playPauseHandler}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button 
              className="control-btn" 
              onClick={nextTrack}
              disabled={currentTrack === filteredTracks.length - 1}
            >
              ⏭️
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

      <div className="audio-note">
        <p>
          📝 <strong>Note:</strong> Audio files are placeholders. To add actual audio content:
        </p>
        <ol>
          <li>Generate meditation and bhajan audio using text-to-speech</li>
          <li>Record or source authentic devotional content</li>
          <li>Place files in <code>/public/audio/devotional/</code> directory</li>
        </ol>
        <p>Run <code>npm run generate-devotional-audio</code> to create TTS versions.</p>
      </div>
    </div>
  );
};

export default DevotionalAudio;
