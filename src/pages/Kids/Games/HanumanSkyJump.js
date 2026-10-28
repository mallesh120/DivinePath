import React, { useState, useEffect, useRef, useCallback } from 'react';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import ArcadePlayerShell from './ArcadePlayerShell';
import { getGameHighScore, saveGameHighScore } from './arcadeCatalog';
import hanumanImgSrc from '../../../assets/images/Gods/hanuman.webp';
import './CatchTheModak.css';

const CANVAS_W = 800;
const CANVAS_H = 520;
const GRAVITY = 880;
const JUMP_VY = -560;

const createPlatforms = () => {
  const list = [
    // Starting wide golden base
    { x: CANVAS_W / 2 - 90, y: 465, w: 180, type: 'normal', vx: 0, item: null },
  ];
  for (let i = 1; i <= 9; i++) {
    const y = 465 - i * 54;
    const w = 105;
    const x = 60 + Math.random() * (CANVAS_W - 120 - w);
    const roll = Math.random();
    const type = roll < 0.18 ? 'lotus' : roll < 0.42 ? 'moving' : 'normal';
    const itemRoll = Math.random();
    const item =
      itemRoll < 0.12 ? 'herb' : itemRoll < 0.35 ? 'mango' : null;
    list.push({
      x,
      y,
      w,
      type,
      vx: type === 'moving' ? (Math.random() < 0.5 ? 95 : -95) : 0,
      item,
    });
  }
  return list;
};

const HanumanSkyJumpStage = ({ isPaused, reportScore }) => {
  const canvasRef = useRef(null);
  const { playClick, playSuccess, playPop, playJump, playGameOver } =
    useSoundEffects();
  const { awardStars } = useSadhana(true);

  const hanumanImgRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = hanumanImgSrc;
    img.onload = () => {
      hanumanImgRef.current = img;
    };
  }, []);

  const [uiState, setUiState] = useState({
    phase: 'playing',
    altitude: 0,
    highScore: getGameHighScore('hanuman'),
    herbsCollected: 0,
    starsEarned: 0,
    newRecord: false,
  });

  useEffect(() => {
    if (reportScore) reportScore(`${uiState.altitude} m`);
  }, [uiState.altitude, reportScore]);

  const gameRef = useRef({
    phase: 'playing',
    altitude: 0,
    bonusScore: 0,
    herbs: 0,
    player: {
      x: CANVAS_W / 2,
      y: 390,
      vx: 0,
      vy: JUMP_VY,
      facing: 1,
      boostTimer: 0,
    },
    keys: { left: false, right: false },
    pointerX: null,
    platforms: createPlatforms(),
    particles: [],
    floatingTexts: [],
    awardedStars: 0,
    lastTime: 0,
  });

  const resetRound = useCallback(() => {
    try {
      playClick();
    } catch (e) {}
    gameRef.current = {
      phase: 'playing',
      altitude: 0,
      bonusScore: 0,
      herbs: 0,
      player: {
        x: CANVAS_W / 2,
        y: 390,
        vx: 0,
        vy: JUMP_VY,
        facing: 1,
        boostTimer: 0,
      },
      keys: { left: false, right: false },
      pointerX: null,
      platforms: createPlatforms(),
      particles: [],
      floatingTexts: [],
      awardedStars: 0,
      lastTime: performance.now(),
    };
    setUiState({
      phase: 'playing',
      altitude: 0,
      highScore: getGameHighScore('hanuman'),
      herbsCollected: 0,
      starsEarned: 0,
      newRecord: false,
    });
  }, [playClick]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameRef.current.keys.left = true;
        gameRef.current.pointerX = null;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameRef.current.keys.right = true;
        gameRef.current.pointerX = null;
      }
    };
    const onKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameRef.current.keys.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameRef.current.keys.right = false;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const handlePointerMove = (clientX) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    gameRef.current.pointerX = ((clientX - rect.left) / rect.width) * CANVAS_W;
  };

  useEffect(() => {
    let animId;

    const addBurst = (g, x, y, color, count = 10) => {
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count;
        const spd = 60 + Math.random() * 120;
        g.particles.push({
          x,
          y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          r: 3 + Math.random() * 3.5,
          color,
          life: 0.45,
          maxLife: 0.45,
        });
      }
    };

    const addText = (g, x, y, text, color = '#fde047') => {
      g.floatingTexts.push({ x, y, text, color, life: 0.85, maxLife: 0.85 });
    };

    const step = (now) => {
      const g = gameRef.current;
      if (!g.lastTime) g.lastTime = now;
      const dt = Math.min(0.04, (now - g.lastTime) / 1000);
      g.lastTime = now;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');

        if (!isPaused && g.phase === 'playing') {
          const p = g.player;

          // Horizontal control
          if (g.keys.left) {
            p.vx = -360;
            p.facing = -1;
          } else if (g.keys.right) {
            p.vx = 360;
            p.facing = 1;
          } else if (g.pointerX !== null) {
            const dx = g.pointerX - p.x;
            p.vx = Math.max(-380, Math.min(380, dx * 6.5));
            if (Math.abs(dx) > 4) p.facing = dx > 0 ? 1 : -1;
          } else {
            p.vx *= 0.86;
          }

          p.x += p.vx * dt;
          // Screen wrap around left/right edges!
          if (p.x < -20) p.x = CANVAS_W + 20;
          if (p.x > CANVAS_W + 20) p.x = -20;

          if (p.boostTimer > 0) {
            p.boostTimer -= dt;
            p.vy = -780;
            addBurst(g, p.x, p.y + 24, '#fde047', 2);
          } else {
            p.vy += GRAVITY * dt;
          }

          const prevY = p.y;
          p.y += p.vy * dt;

          // Move platforms horizontally & check landing when falling
          g.platforms.forEach((plat) => {
            if (plat.vx !== 0) {
              plat.x += plat.vx * dt;
              if (plat.x < 30 || plat.x + plat.w > CANVAS_W - 30) {
                plat.vx *= -1;
              }
            }

            // Collectible item pickup
            if (plat.item) {
              const itemX = plat.x + plat.w / 2;
              const itemY = plat.y - 20;
              if (Math.hypot(p.x - itemX, p.y - itemY) < 42) {
                if (plat.item === 'herb') {
                  p.boostTimer = 1.65;
                  g.herbs += 1;
                  g.bonusScore += 60;
                  addText(g, itemX, itemY, '🌿 SANJEEVANI BOOST! +60m', '#4ade80');
                  addBurst(g, itemX, itemY, '#4ade80', 16);
                  try {
                    playSuccess();
                  } catch (e) {}
                } else {
                  g.bonusScore += 25;
                  addText(g, itemX, itemY, '🥭 GOLDEN MANGO +25m', '#fde047');
                  addBurst(g, itemX, itemY, '#fde047', 10);
                  try {
                    playPop(1.3);
                  } catch (e) {}
                }
                plat.item = null;
              }
            }

            // Check bounce landing (only when moving downward)
            if (
              p.vy > 0 &&
              prevY + 26 <= plat.y + 8 &&
              p.y + 26 >= plat.y - 4 &&
              p.x >= plat.x - 18 &&
              p.x <= plat.x + plat.w + 18
            ) {
              if (plat.type === 'lotus') {
                p.vy = JUMP_VY * 1.42;
                addBurst(g, p.x, plat.y, '#f472b6', 14);
                addText(g, p.x, plat.y - 10, '🪷 LOTUS SPRING!', '#f472b6');
                try {
                  playSuccess();
                } catch (e) {}
              } else {
                p.vy = JUMP_VY;
                addBurst(g, p.x, plat.y, '#fde047', 8);
                try {
                  playJump();
                } catch (e) {}
              }
            }
          });

          // Camera scroll upward when Hanuman rises above upper half
          const cameraLine = 215;
          if (p.y < cameraLine) {
            const shift = cameraLine - p.y;
            p.y = cameraLine;
            g.altitude += shift * 0.22;

            g.platforms.forEach((plat) => {
              plat.y += shift;
            });
            g.particles.forEach((pt) => {
              pt.y += shift;
            });
            g.floatingTexts.forEach((ft) => {
              ft.y += shift;
            });

            // Recycle off-screen bottom platforms at the top
            g.platforms.forEach((plat) => {
              if (plat.y > CANVAS_H + 20) {
                const highestY = Math.min(...g.platforms.map((pl) => pl.y));
                plat.y = highestY - (50 + Math.random() * 14);
                plat.w = Math.max(76, 108 - Math.floor(g.altitude / 180) * 4);
                plat.x = 45 + Math.random() * (CANVAS_W - 90 - plat.w);
                const roll = Math.random();
                plat.type =
                  roll < 0.18 ? 'lotus' : roll < 0.48 ? 'moving' : 'normal';
                plat.vx =
                  plat.type === 'moving'
                    ? (Math.random() < 0.5 ? 110 : -110)
                    : 0;
                const itemRoll = Math.random();
                plat.item =
                  itemRoll < 0.11 ? 'herb' : itemRoll < 0.34 ? 'mango' : null;
              }
            });

            const totalScore = Math.floor(g.altitude + g.bonusScore);
            saveGameHighScore('hanuman', totalScore);

            if (totalScore >= 200 && g.awardedStars < 1) {
              g.awardedStars = 1;
              awardStars(1);
            } else if (totalScore >= 500 && g.awardedStars < 2) {
              g.awardedStars = 2;
              awardStars(1);
            }

            setUiState((prev) => ({
              ...prev,
              altitude: totalScore,
              highScore: Math.max(prev.highScore, totalScore),
              herbsCollected: g.herbs,
              starsEarned: g.awardedStars,
            }));
          }

          // Check fall off bottom (Game Over)
          if (p.y > CANVAS_H + 45) {
            g.phase = 'gameover';
            const finalScore = Math.floor(g.altitude + g.bonusScore);
            const isNew = saveGameHighScore('hanuman', finalScore);
            if (finalScore >= 100 && g.awardedStars === 0) {
              g.awardedStars = 1;
              awardStars(1);
            }
            try {
              playGameOver();
            } catch (e) {}
            setUiState({
              phase: 'gameover',
              altitude: finalScore,
              highScore: getGameHighScore('hanuman'),
              herbsCollected: g.herbs,
              starsEarned: g.awardedStars,
              newRecord: isNew,
            });
          }

          // Update particles & texts
          g.particles = g.particles.filter((pt) => {
            pt.x += pt.vx * dt;
            pt.y += pt.vy * dt;
            pt.life -= dt;
            return pt.life > 0;
          });
          g.floatingTexts = g.floatingTexts.filter((ft) => {
            ft.y -= 38 * dt;
            ft.life -= dt;
            return ft.life > 0;
          });
        }

        // === RENDER ===
        const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
        skyGrad.addColorStop(0, '#31102f');
        skyGrad.addColorStop(0.55, '#9a3412');
        skyGrad.addColorStop(1, '#fbbf24');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Glowing Sun / Dronagiri Peak in background
        ctx.fillStyle = 'rgba(254, 240, 138, 0.22)';
        ctx.beginPath();
        ctx.arc(CANVAS_W / 2, 130, 95, 0, Math.PI * 2);
        ctx.fill();

        // Draw Cloud Platforms
        g.platforms.forEach((plat) => {
          ctx.save();
          if (plat.type === 'lotus') {
            ctx.fillStyle = '#ec4899';
            ctx.strokeStyle = '#fbcfe8';
          } else if (plat.type === 'moving') {
            ctx.fillStyle = '#38bdf8';
            ctx.strokeStyle = '#e0f2fe';
          } else {
            ctx.fillStyle = '#fef08a';
            ctx.strokeStyle = '#f59e0b';
          }
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(plat.x, plat.y, plat.w, 16, 9);
          ctx.fill();
          ctx.stroke();

          if (plat.type === 'lotus') {
            ctx.font = '16px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('🪷', plat.x + plat.w / 2, plat.y + 12);
          }

          // Draw collectible item on platform
          if (plat.item) {
            ctx.font = '24px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
              plat.item === 'herb' ? '🌿' : '🥭',
              plat.x + plat.w / 2,
              plat.y - 16
            );
          }
          ctx.restore();
        });

        // Draw Hanuman Player
        const p = g.player;
        ctx.save();
        ctx.translate(p.x, p.y);
        if (p.boostTimer > 0) {
          ctx.fillStyle = 'rgba(250, 204, 21, 0.38)';
          ctx.beginPath();
          ctx.arc(0, 0, 42, 0, Math.PI * 2);
          ctx.fill();
        }
        // Circular avatar frame with Hanuman artwork or emblem
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.fillStyle = '#f97316';
        ctx.fill();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = '#fde047';
        ctx.stroke();

        if (hanumanImgRef.current) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(0, 0, 26, 0, Math.PI * 2);
          ctx.clip();
          ctx.drawImage(hanumanImgRef.current, -26, -26, 52, 52);
          ctx.restore();
        } else {
          ctx.font = '30px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🐒', 0, 2);
        }
        ctx.restore();

        // Particles & Floating Texts
        g.particles.forEach((pt) => {
          ctx.save();
          ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        g.floatingTexts.forEach((ft) => {
          ctx.save();
          ctx.globalAlpha = Math.max(0, ft.life / ft.maxLife);
          ctx.font = '900 17px sans-serif';
          ctx.textAlign = 'center';
          ctx.strokeStyle = 'rgba(15, 23, 42, 0.9)';
          ctx.lineWidth = 4;
          ctx.strokeText(ft.text, ft.x, ft.y);
          ctx.fillStyle = ft.color;
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
        });

        // Top HUD
        const totalScore = Math.floor(g.altitude + g.bonusScore);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
        ctx.beginPath();
        ctx.roundRect(16, 14, CANVAS_W - 32, 48, 14);
        ctx.fill();

        ctx.font = '800 17px sans-serif';
        ctx.fillStyle = '#fde047';
        ctx.textAlign = 'left';
        ctx.fillText(`⛰️ ALTITUDE: ${totalScore} m`, 32, 44);

        ctx.fillStyle = '#4ade80';
        ctx.fillText(`🌿 HERBS: ${g.herbs}`, 265, 44);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#fef08a';
        ctx.fillText(
          `🏆 BEST: ${Math.max(uiState.highScore, totalScore)} m`,
          CANVAS_W - 32,
          44
        );
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, awardStars, playGameOver, playJump, playPop, playSuccess, uiState.highScore]);

  return (
    <div className="modak-canvas-stage">
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="arcade-game-canvas"
        onMouseMove={(e) => handlePointerMove(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches && e.touches[0]) {
            handlePointerMove(e.touches[0].clientX);
          }
        }}
      />

      {uiState.phase === 'gameover' && (
        <div className="canvas-gameover-overlay">
          <div className="gameover-modal-card">
            <div className="gameover-badge">
              {uiState.newRecord ? '🏆 NEW ALTITUDE RECORD!' : '⛰️ FLIGHT COMPLETE'}
            </div>
            <h2>Sanjeevani Sky Quest!</h2>
            <div className="gameover-score-grid">
              <div className="go-stat-box">
                <span>ALTITUDE</span>
                <strong>{uiState.altitude} m</strong>
              </div>
              <div className="go-stat-box">
                <span>BEST RECORD</span>
                <strong>{uiState.highScore} m</strong>
              </div>
              <div className="go-stat-box">
                <span>HERBS FOUND</span>
                <strong>🌿 {uiState.herbsCollected}</strong>
              </div>
            </div>

            {uiState.starsEarned > 0 && (
              <div className="gameover-stars-banner">
                ⭐ +{uiState.starsEarned} Dharma{' '}
                {uiState.starsEarned === 1 ? 'Star' : 'Stars'} Earned!
              </div>
            )}

            <button className="canvas-replay-btn" onClick={resetRound}>
              🔄 Leap Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const HanumanSkyJump = () => {
  return (
    <ArcadePlayerShell gameId="hanuman" liveStatLabel="ALTITUDE">
      {({ isPaused, reportScore }) => (
        <HanumanSkyJumpStage isPaused={isPaused} reportScore={reportScore} />
      )}
    </ArcadePlayerShell>
  );
};

export default HanumanSkyJump;

