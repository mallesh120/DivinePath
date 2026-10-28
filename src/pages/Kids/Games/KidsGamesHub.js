import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import {
  ARCADE_GAMES,
  ARCADE_CATEGORIES,
  getHighScores,
  getPlayCounts,
} from './arcadeCatalog';
import './KidsGamesHub.css';

const KidsGamesHub = () => {
  const navigate = useNavigate();
  const { playClick, isMuted, toggleMute } = useSoundEffects();
  const { stars } = useSadhana(true);

  const [activeCategory, setActiveCategory] = useState('all');
  const [highScores, setHighScores] = useState(() => getHighScores());
  const [playCounts, setPlayCounts] = useState(() => getPlayCounts());

  useEffect(() => {
    setHighScores(getHighScores());
    setPlayCounts(getPlayCounts());
    const handleUpdate = () => {
      setHighScores(getHighScores());
      setPlayCounts(getPlayCounts());
    };
    window.addEventListener('divineArcadeScoreUpdate', handleUpdate);
    return () => window.removeEventListener('divineArcadeScoreUpdate', handleUpdate);
  }, []);

  const handleGameSelect = (route) => {
    try {
      playClick();
    } catch (e) {}
    navigate(route);
  };

  const featuredGame = ARCADE_GAMES.find((g) => g.featured) || ARCADE_GAMES[0];
  const filteredGames =
    activeCategory === 'all'
      ? ARCADE_GAMES
      : ARCADE_GAMES.filter((g) => g.category === activeCategory);

  const totalArcadeScore = Object.values(highScores).reduce(
    (sum, val) => sum + (Number(val) || 0),
    0
  );
  const gamesMastered = Object.values(highScores).filter((v) => v > 0).length;

  return (
    <KidsPageTransition>
      <div className="games-hub-container">
        {/* Top Miniclip-Style Arcade Portal Header & Stats Bar */}
        <div className="arcade-portal-masthead">
          <div className="masthead-left">
            <div className="portal-live-pill">
              <span className="live-dot" />
              <span>DIVINE ARCADE PORTAL • 60 FPS HTML5 PLAYER</span>
            </div>
            <h2>🕹️ Divine Games Arcade</h2>
            <p>
              Instant-play action games, physics challenges & mythology puzzles — no
              plugins needed!
            </p>
          </div>

          <div className="masthead-stats-row">
            <div className="portal-stat-box stars">
              <span className="stat-emoji">⭐</span>
              <div>
                <span className="stat-lbl">DHARMA STARS</span>
                <strong className="stat-num">{stars}</strong>
              </div>
            </div>

            <div className="portal-stat-box score">
              <span className="stat-emoji">🏆</span>
              <div>
                <span className="stat-lbl">ARCADE SCORE</span>
                <strong className="stat-num">{totalArcadeScore}</strong>
              </div>
            </div>

            <div className="portal-stat-box trophies">
              <span className="stat-emoji">🎖️</span>
              <div>
                <span className="stat-lbl">RECORDS SET</span>
                <strong className="stat-num">
                  {gamesMastered}/{ARCADE_GAMES.length}
                </strong>
              </div>
            </div>

            <button
              type="button"
              className={`portal-sound-btn ${isMuted ? 'muted' : ''}`}
              onClick={toggleMute}
              title={isMuted ? 'Unmute Arcade Audio' : 'Mute Arcade Audio'}
            >
              <span>{isMuted ? '🔇' : '🔊'}</span>
              <span>{isMuted ? 'Muted' : 'SFX On'}</span>
            </button>
          </div>
        </div>

        {/* Featured Game of the Day Hero Banner */}
        <motion.div
          className="featured-arcade-banner"
          style={{ background: featuredGame.stageBg }}
          whileHover={{ y: -3 }}
          onClick={() => handleGameSelect(featuredGame.route)}
        >
          <div className="featured-banner-content">
            <div className="featured-badges-row">
              <span className="featured-spotlight-tag">🔥 FEATURED GAME OF THE DAY</span>
              <span className="featured-engine-tag">{featuredGame.engineBadge}</span>
              <span className="featured-rating-tag">★ {featuredGame.rating}</span>
            </div>
            <h3>{featuredGame.title}</h3>
            <p>{featuredGame.description}</p>

            <div className="featured-actions-row">
              <button type="button" className="featured-play-btn" tabIndex="-1">
                ▶ LAUNCH IN PLAYER
              </button>
              <span className="featured-best-pill">
                🏆 Your Best: {highScores[featuredGame.id] || 0}{' '}
                {featuredGame.scoreUnit}
              </span>
              <span className="featured-reward-pill">{featuredGame.rewardTag}</span>
            </div>
          </div>

          <div className="featured-banner-visual">
            <div className="featured-stage-preview">
              <span className="featured-giant-icon">{featuredGame.icon}</span>
              <div className="featured-floating-badges">
                {featuredGame.secondaryIcons.map((ic, i) => (
                  <span key={i} className={`float-mini-icon idx-${i}`}>
                    {ic}
                  </span>
                ))}
              </div>
              <div className="featured-screen-caption">CLICK TO PLAY • 60 FPS</div>
            </div>
          </div>
        </motion.div>

        {/* Category Filter Bar */}
        <div className="arcade-category-bar">
          <div className="category-tabs">
            {ARCADE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`arcade-cat-pill ${
                  activeCategory === cat.id ? 'active' : ''
                }`}
                onClick={() => {
                  try {
                    playClick();
                  } catch (e) {}
                  setActiveCategory(cat.id);
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <span className="category-count-label">
            Showing {filteredGames.length}{' '}
            {filteredGames.length === 1 ? 'Game' : 'Games'}
          </span>
        </div>

        {/* Miniclip-Style Thumbnail Cards Grid */}
        <div className="games-grid">
          {filteredGames.map((game) => {
            const personalBest = highScores[game.id] || 0;
            const totalPlays = game.basePlays + (playCounts[game.id] || 0);

            return (
              <motion.div
                key={game.id}
                className={`arcade-game-card cat-${game.category}`}
                whileHover={{ y: -7 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGameSelect(game.route)}
              >
                {/* Visual Stage Thumbnail Header */}
                <div
                  className="arcade-card-thumb"
                  style={{ background: game.stageBg }}
                >
                  {game.ribbon && (
                    <span className={`arcade-ribbon ${game.ribbonType}`}>
                      {game.ribbon}
                    </span>
                  )}

                  <span className="thumb-engine-chip">{game.engineBadge}</span>

                  <div className="thumb-center-emblem">
                    <span className="thumb-main-emoji">{game.icon}</span>
                    <div className="thumb-mini-Cluster">
                      {game.secondaryIcons.map((sec, idx) => (
                        <span key={idx} className="thumb-sec-emoji">
                          {sec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Play Visor Overlay */}
                  <div className="thumb-hover-visor">
                    <span className="visor-play-pill">▶ PLAY NOW</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="arcade-card-body">
                  <div className="card-meta-top">
                    <span className="card-category-tag">{game.categoryLabel}</span>
                    <span className="card-rating-plays">
                      ★ {game.rating} • {totalPlays.toLocaleString()} plays
                    </span>
                  </div>

                  <h3>{game.title}</h3>
                  <p>{game.shortDescription}</p>

                  <div className="arcade-card-footer">
                    <div className="card-footer-tags">
                      {personalBest > 0 ? (
                        <span className="card-best-record">
                          🏆 Best: {personalBest} {game.scoreUnit}
                        </span>
                      ) : (
                        <span className="card-reward-tag">{game.rewardTag}</span>
                      )}
                    </div>

                    <button type="button" className="arcade-play-btn" tabIndex="-1">
                      Play ▶
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </KidsPageTransition>
  );
};

export default KidsGamesHub;
