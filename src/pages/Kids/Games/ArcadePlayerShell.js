import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import KidsPageTransition from '../../../components/KidsLayout/KidsPageTransition';
import {
  ARCADE_GAMES,
  getGameHighScore,
  incrementPlayCount,
} from './arcadeCatalog';
import './ArcadePlayerShell.css';

const ArcadePlayerShell = ({
  gameId,
  children,
  liveScore = null,
  liveStatLabel = null,
  onRestart,
  skipPreloader = false,
}) => {
  const navigate = useNavigate();
  const stageContainerRef = useRef(null);
  const { playClick, isMuted, toggleMute } = useSoundEffects();
  const { stars } = useSadhana(true);

  const gameMeta = ARCADE_GAMES.find((g) => g.id === gameId) || ARCADE_GAMES[0];
  const otherGames = ARCADE_GAMES.filter((g) => g.id !== gameId);

  const [loadProgress, setLoadProgress] = useState(skipPreloader ? 100 : 0);
  const [hasBooted, setHasBooted] = useState(skipPreloader);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [highScore, setHighScore] = useState(() => getGameHighScore(gameId));
  const [restartVersion, setRestartVersion] = useState(0);

  // Sync high score updates
  useEffect(() => {
    setHighScore(getGameHighScore(gameId));
    const handleScoreEvent = () => {
      setHighScore(getGameHighScore(gameId));
    };
    window.addEventListener('divineArcadeScoreUpdate', handleScoreEvent);
    return () => window.removeEventListener('divineArcadeScoreUpdate', handleScoreEvent);
  }, [gameId, liveScore]);

  // Simulate classic Flash/Miniclip preloader bar on game mount
  useEffect(() => {
    incrementPlayCount(gameId);
    if (skipPreloader) {
      setLoadProgress(100);
      setHasBooted(true);
      return;
    }

    setLoadProgress(0);
    setHasBooted(false);
    setIsPaused(false);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 28) + 22;
      if (current >= 100) {
        current = 100;
        setLoadProgress(100);
        clearInterval(interval);
      } else {
        setLoadProgress(current);
      }
    }, 90);

    return () => clearInterval(interval);
  }, [gameId, skipPreloader]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      const fsElement =
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement;
      setIsFullscreen(Boolean(fsElement));
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  const handleToggleFullscreen = useCallback(async () => {
    try {
      playClick();
    } catch (e) {}

    const el = stageContainerRef.current;
    if (!el) return;

    const fsElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement;

    if (!fsElement && !isFullscreen) {
      if (el.requestFullscreen) {
        try {
          await el.requestFullscreen();
          return;
        } catch (e) {}
      } else if (el.webkitRequestFullscreen) {
        try {
          el.webkitRequestFullscreen();
          return;
        } catch (e) {}
      }
      // CSS fallback if browser blocks or doesn't support Fullscreen API
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen && fsElement) {
        try {
          await document.exitFullscreen();
          return;
        } catch (e) {}
      } else if (document.webkitExitFullscreen && fsElement) {
        try {
          document.webkitExitFullscreen();
          return;
        } catch (e) {}
      }
      setIsFullscreen(false);
    }
  }, [isFullscreen, playClick]);

  const handleBootLaunch = () => {
    try {
      playClick();
    } catch (e) {}
    setHasBooted(true);
    setIsPaused(false);
  };

  const handleRestartClick = () => {
    try {
      playClick();
    } catch (e) {}
    setIsPaused(false);
    setRestartVersion((v) => v + 1);
    if (onRestart) onRestart();
  };

  const handlePauseToggle = () => {
    if (!hasBooted) return;
    try {
      playClick();
    } catch (e) {}
    setIsPaused((prev) => !prev);
  };

  return (
    <KidsPageTransition>
      <div className="arcade-shell-page">
        {/* Top Portal Breadcrumb & Live Arcade Header */}
        <div className="arcade-top-bar">
          <div className="arcade-top-left">
            <Link
              to="/kids/games"
              className="arcade-back-btn"
              onClick={() => {
                try {
                  playClick();
                } catch (e) {}
              }}
            >
              <span>◀</span> Arcade Lobby
            </Link>
            <div className="arcade-title-group">
              <span className="arcade-title-icon">{gameMeta.icon}</span>
              <div>
                <div className="arcade-title-row">
                  <h1>{gameMeta.title}</h1>
                  <span className="arcade-engine-pill">{gameMeta.engineBadge}</span>
                </div>
                <p className="arcade-subtitle">{gameMeta.subtitle}</p>
              </div>
            </div>
          </div>

          <div className="arcade-top-right">
            <div className="arcade-stat-chip highscore-chip" title="Your Personal Record">
              <span className="chip-icon">🏆</span>
              <div>
                <span className="chip-label">BEST RECORD</span>
                <strong className="chip-val">
                  {highScore} {gameMeta.scoreUnit}
                </strong>
              </div>
            </div>
            <div className="arcade-stat-chip stars-chip" title="Total Dharma Stars">
              <span className="chip-icon">⭐</span>
              <div>
                <span className="chip-label">DHARMA STARS</span>
                <strong className="chip-val">{stars}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Main Miniclip-Style Cabinet Frame */}
        <div
          ref={stageContainerRef}
          className={`arcade-cabinet-frame ${isFullscreen ? 'is-fullscreen' : ''}`}
        >
          {/* Viewport Screen */}
          <div className="arcade-viewport-screen">
            {/* Classic Flash Player Preloader Overlay */}
            <AnimatePresence>
              {!hasBooted && (
                <motion.div
                  className="arcade-preloader-overlay"
                  style={{ background: gameMeta.stageBg }}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="preloader-glint" />
                  <div className="preloader-brand-pill">
                    <span>⚡ DIVINE FLASH-CANVAS PLAYER v2.4</span>
                  </div>

                  <motion.div
                    className="preloader-emblem"
                    animate={{ y: [0, -8, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  >
                    <span className="preloader-main-icon">{gameMeta.icon}</span>
                    <div className="preloader-orbit-icons">
                      {gameMeta.secondaryIcons.map((ic, i) => (
                        <span key={i} className={`orbit-icon orbit-${i}`}>
                          {ic}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <h2 className="preloader-game-title">{gameMeta.title}</h2>
                  <p className="preloader-game-desc">{gameMeta.shortDescription}</p>

                  {/* Controls quick preview inside preloader */}
                  <div className="preloader-controls-strip">
                    {gameMeta.controls.map((ctrl, idx) => (
                      <div key={idx} className="preloader-ctrl-item">
                        <span className="ctrl-key-badge">{ctrl.key}</span>
                        <span className="ctrl-action-label">{ctrl.action}</span>
                      </div>
                    ))}
                  </div>

                  {/* Loading Bar or Launch Button */}
                  <div className="preloader-loader-box">
                    <div className="preloader-bar-track">
                      <div
                        className="preloader-bar-fill"
                        style={{ width: `${loadProgress}%` }}
                      />
                    </div>
                    <div className="preloader-status-row">
                      <span>
                        {loadProgress < 100
                          ? 'LOADING SPRITES & AUDIO SYNTH...'
                          : 'READY TO LAUNCH!'}
                      </span>
                      <span>{loadProgress}%</span>
                    </div>

                    <button
                      className={`preloader-launch-btn ${loadProgress >= 100 ? 'ready' : ''}`}
                      onClick={handleBootLaunch}
                    >
                      {loadProgress >= 100 ? '▶ PLAY GAME NOW' : '⚡ SKIP & PLAY'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pause Overlay */}
            <AnimatePresence>
              {hasBooted && isPaused && (
                <motion.div
                  className="arcade-pause-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="pause-modal-card">
                    <div className="pause-badge">⏸ GAME PAUSED</div>
                    <h3>{gameMeta.title}</h3>
                    <p>Take a breath! Ready to jump back into the action?</p>
                    <div className="pause-actions">
                      <button className="pause-btn resume" onClick={handlePauseToggle}>
                        ▶ Resume Game
                      </button>
                      <button className="pause-btn restart" onClick={handleRestartClick}>
                        🔄 Restart Round
                      </button>
                      <button
                        className="pause-btn lobby"
                        onClick={() => navigate('/kids/games')}
                      >
                        🕹️ Exit to Arcade Lobby
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Game Content Stage */}
            <div className="arcade-stage-mount" key={restartVersion}>
              {typeof children === 'function'
                ? children({
                    isPaused: !hasBooted || isPaused,
                    isMuted,
                    isFullscreen,
                    restartGame: handleRestartClick,
                  })
                : children}
            </div>
          </div>

          {/* Classic Miniclip Bottom Player Control Bar */}
          <div className="arcade-control-bar">
            <div className="control-bar-left">
              <span className="player-led-dot" />
              <span className="player-engine-tag">DIVINE PLAYER</span>
              {liveScore !== null && (
                <span className="control-live-score">
                  {liveStatLabel || 'SCORE'}: <strong>{liveScore}</strong>
                </span>
              )}
              <span className="control-best-score">
                🏆 Best: <strong>{highScore} {gameMeta.scoreUnit}</strong>
              </span>
            </div>

            <div className="control-bar-right">
              <button
                type="button"
                className={`arcade-tool-btn ${isPaused ? 'active' : ''}`}
                onClick={handlePauseToggle}
                disabled={!hasBooted}
                title={isPaused ? 'Resume Game' : 'Pause Game'}
              >
                <span>{isPaused ? '▶' : '⏸'}</span>
                <span className="tool-btn-label">{isPaused ? 'Resume' : 'Pause'}</span>
              </button>

              <button
                type="button"
                className="arcade-tool-btn"
                onClick={handleRestartClick}
                title="Restart Game"
              >
                <span>🔄</span>
                <span className="tool-btn-label">Restart</span>
              </button>

              <button
                type="button"
                className={`arcade-tool-btn ${isMuted ? 'muted' : ''}`}
                onClick={toggleMute}
                title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              >
                <span>{isMuted ? '🔇' : '🔊'}</span>
                <span className="tool-btn-label">{isMuted ? 'Muted' : 'Sound'}</span>
              </button>

              <button
                type="button"
                className={`arcade-tool-btn ${showHowToPlay ? 'active' : ''}`}
                onClick={() => {
                  try {
                    playClick();
                  } catch (e) {}
                  setShowHowToPlay((v) => !v);
                }}
                title="Controls & Pro Tips"
              >
                <span>❓</span>
                <span className="tool-btn-label">How to Play</span>
              </button>

              <button
                type="button"
                className="arcade-tool-btn fullscreen-btn"
                onClick={handleToggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Mode'}
              >
                <span>{isFullscreen ? '🗗' : '⛶'}</span>
                <span className="tool-btn-label">
                  {isFullscreen ? 'Windowed' : 'Fullscreen'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Collapsible / Quick Instructions & Tips Panel */}
        <AnimatePresence>
          {showHowToPlay && (
            <motion.div
              className="arcade-instructions-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="instructions-grid">
                <div className="instructions-col">
                  <h3>🎮 Game Controls</h3>
                  <div className="controls-list">
                    {gameMeta.controls.map((c, i) => (
                      <div key={i} className="control-row-item">
                        <span className="control-key-pill">{c.key}</span>
                        <span className="control-desc-text">{c.action}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="instructions-col">
                  <h3>💡 Arcade Pro Tips</h3>
                  <ul className="tips-list">
                    {gameMeta.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Below Stage: Game Details + Miniclip "More Games" Strip */}
        <div className="arcade-below-stage">
          <div className="arcade-about-card">
            <div className="about-header">
              <span className="about-category-badge">{gameMeta.categoryLabel}</span>
              <span className="about-rating">★ {gameMeta.rating} Rating</span>
              <span className="about-reward">{gameMeta.rewardTag}</span>
            </div>
            <h3>About {gameMeta.title}</h3>
            <p>{gameMeta.description}</p>
            <div className="about-controls-inline">
              {gameMeta.controls.map((c, idx) => (
                <span key={idx} className="inline-ctrl-chip">
                  <strong>{c.key}:</strong> {c.action}
                </span>
              ))}
            </div>
          </div>

          <div className="arcade-more-games">
            <div className="more-games-header">
              <h3>🕹️ More Arcade Games</h3>
              <Link to="/kids/games" className="view-all-link">
                View All ({ARCADE_GAMES.length}) ▶
              </Link>
            </div>
            <div className="more-games-strip">
              {otherGames.map((g) => {
                const best = getGameHighScore(g.id);
                return (
                  <div
                    key={g.id}
                    className="mini-game-card"
                    onClick={() => {
                      try {
                        playClick();
                      } catch (e) {}
                      navigate(g.route);
                    }}
                  >
                    <div
                      className="mini-card-thumb"
                      style={{ background: g.themeGradient }}
                    >
                      <span className="mini-thumb-icon">{g.icon}</span>
                      {g.ribbon && <span className="mini-ribbon">{g.ribbon}</span>}
                    </div>
                    <div className="mini-card-body">
                      <h4>{g.title}</h4>
                      <span className="mini-card-cat">{g.categoryLabel}</span>
                      {best > 0 && (
                        <span className="mini-card-best">
                          🏆 Best: {best} {g.scoreUnit}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </KidsPageTransition>
  );
};

export default ArcadePlayerShell;

