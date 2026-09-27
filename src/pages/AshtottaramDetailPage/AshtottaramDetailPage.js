import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAshtottaramById } from '../../data/ashtottaram/ashtottaramData';
import useTextToSpeech from '../../hooks/useTextToSpeech';
import './AshtottaramDetailPage.css';

const AshtottaramDetailPage = () => {
  const { deityId } = useParams();
  const navigate = useNavigate();
  const [deity, setDeity] = useState(null);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
  const { speak, stop, isPlaying } = useTextToSpeech();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterView, setFilterView] = useState('all'); // 'all', 'sanskrit', 'transliteration'

  useEffect(() => {
    const deityData = getAshtottaramById(deityId);
    if (deityData) {
      setDeity(deityData);
    } else {
      navigate('/ashtottaram');
    }
  }, [deityId, navigate]);

  useEffect(() => {
    // Cleanup: Cancel any ongoing speech when component unmounts or deity changes
    return () => {
      stop();
    };
  }, [deityId, stop]);

  const speakText = (text, index) => {
    stop();

    // If already playing this name, stop it
    if (isPlaying && currentPlayingIndex === index) {
      setCurrentPlayingIndex(null);
      return;
    }

    let lang = index.includes('sanskrit') ? 'hi' : 'en';

    speak(text, 0.8, 1, lang, {
      onStart: () => setCurrentPlayingIndex(index),
      onEnd: () => setCurrentPlayingIndex(null),
      onError: () => setCurrentPlayingIndex(null)
    });
  };

  const filteredNames = deity?.names.filter(name => {
    const searchLower = searchTerm.toLowerCase();
    return (
      name.sanskrit.toLowerCase().includes(searchLower) ||
      name.transliteration.toLowerCase().includes(searchLower) ||
      name.meaning.toLowerCase().includes(searchLower) ||
      (name.mantra && name.mantra.toLowerCase().includes(searchLower)) ||
      (name.mantraSanskrit && name.mantraSanskrit.toLowerCase().includes(searchLower))
    );
  });

  if (!deity) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="ashtottaram-detail-page">
      {/* Header */}
      <div className="ashtottaram-header">
        <button className="back-btn" onClick={() => navigate('/ashtottaram')}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Ashtottarams
        </button>
        <div className="header-content">
          <div className="header-image">
            <img src={deity.image} alt={deity.name} />
          </div>
          <div className="header-text">
            <h1>{deity.name}</h1>
            <p className="header-subtitle">{deity.title}</p>
            <p className="header-description">{deity.description}</p>
            <div className="header-stats">
              <span className="stat">
                <strong>{deity.names.length}</strong> Names
              </span>
              <span className="stat-divider">•</span>
              <span className="stat">
                <strong>108</strong> Verses
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="ashtottaram-controls">
        <div className="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Search by Sanskrit, transliteration, or meaning..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        <div className="view-filters">
          <button
            className={`view-btn ${filterView === 'all' ? 'active' : ''}`}
            onClick={() => setFilterView('all')}
          >
            All
          </button>
          <button
            className={`view-btn ${filterView === 'sanskrit' ? 'active' : ''}`}
            onClick={() => setFilterView('sanskrit')}
          >
            Sanskrit
          </button>
          <button
            className={`view-btn ${filterView === 'transliteration' ? 'active' : ''}`}
            onClick={() => setFilterView('transliteration')}
          >
            Transliteration
          </button>
        </div>
      </div>

      {/* Names List */}
      <div className="names-container">
        <div className="names-header">
          <h2>108 Names</h2>
          <p className="names-count">
            Showing {filteredNames.length} of {deity.names.length} names
          </p>
        </div>

        <div className="names-list">
          {filteredNames.map((name, index) => (
            <div key={index} className="name-card">
              <div className="name-number">{name.number || index + 1}</div>
              <div className="name-content">
                {(filterView === 'all' || filterView === 'sanskrit') && (
                  <div className="name-row sanskrit-row">
                    <span className="name-label">Sanskrit:</span>
                    <span className="name-text sanskrit">{name.sanskrit}</span>
                    <button
                      className={`audio-btn ${isPlaying && currentPlayingIndex === `${index}-sanskrit` ? 'playing' : ''}`}
                      onClick={() => speakText(name.sanskrit, `${index}-sanskrit`)}
                      title="Listen to pronunciation"
                      aria-label="Listen to Sanskrit pronunciation"
                      aria-pressed={isPlaying && currentPlayingIndex === `${index}-sanskrit`}
                    >
                      {isPlaying && currentPlayingIndex === `${index}-sanskrit` ? '⏸️' : '🔊'}
                    </button>
                  </div>
                )}
                {(filterView === 'all' || filterView === 'transliteration') && (
                  <div className="name-row">
                    <span className="name-label">Transliteration:</span>
                    <span className="name-text">{name.transliteration}</span>
                    <button
                      className={`audio-btn ${isPlaying && currentPlayingIndex === `${index}-trans` ? 'playing' : ''}`}
                      onClick={() => speakText(name.transliteration, `${index}-trans`)}
                      title="Listen to pronunciation"
                      aria-label="Listen to transliteration pronunciation"
                      aria-pressed={isPlaying && currentPlayingIndex === `${index}-trans`}
                    >
                      {isPlaying && currentPlayingIndex === `${index}-trans` ? '⏸️' : '🔊'}
                    </button>
                  </div>
                )}
                {filterView === 'all' && name.mantra && (
                  <div className="name-row mantra-row">
                    <span className="name-label">Mantra (Sanskrit):</span>
                    <span className="name-text mantra sanskrit-mantra">{name.mantraSanskrit}</span>
                    <button
                      className={`audio-btn ${isPlaying && currentPlayingIndex === `${index}-mantra-sanskrit` ? 'playing' : ''}`}
                      onClick={() => speakText(name.mantraSanskrit, `${index}-mantra-sanskrit`)}
                      title="Listen to pronunciation"
                      aria-label="Listen to Mantra pronunciation"
                      aria-pressed={isPlaying && currentPlayingIndex === `${index}-mantra-sanskrit`}
                    >
                      {isPlaying && currentPlayingIndex === `${index}-mantra-sanskrit` ? '⏸️' : '🔊'}
                    </button>
                  </div>
                )}
                {filterView === 'all' && name.mantra && (
                  <div className="name-row mantra-row">
                    <span className="name-label">Mantra (English):</span>
                    <span className="name-text mantra english-mantra">{name.mantra}</span>
                  </div>
                )}
                {filterView === 'all' && (
                  <div className="name-row meaning-row">
                    <span className="name-label">Meaning:</span>
                    <span className="name-text meaning">{name.meaning}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredNames.length === 0 && (
          <div className="no-results">
            <p>No names found matching "{searchTerm}"</p>
            <button className="clear-btn" onClick={() => setSearchTerm('')}>
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="instructions-section">
        <h3>How to Chant</h3>
        <div className="instructions-grid">
          <div className="instruction-card">
            <div className="instruction-icon">1</div>
            <p>Sit in a clean, peaceful place facing east or north</p>
          </div>
          <div className="instruction-card">
            <div className="instruction-icon">2</div>
            <p>Light a lamp or incense and offer flowers to the deity</p>
          </div>
          <div className="instruction-card">
            <div className="instruction-icon">3</div>
            <p>Chant each name with "Om" prefix and "Namaha" suffix</p>
          </div>
          <div className="instruction-card">
            <div className="instruction-icon">4</div>
            <p>Use a mala (rosary) to count 108 repetitions</p>
          </div>
          <div className="instruction-card">
            <div className="instruction-icon">5</div>
            <p>Maintain focus and devotion throughout the chanting</p>
          </div>
          <div className="instruction-card">
            <div className="instruction-icon">6</div>
            <p>Conclude with meditation and gratitude</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AshtottaramDetailPage;
