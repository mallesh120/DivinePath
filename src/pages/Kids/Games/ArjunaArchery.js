import React, { useState, useEffect, useRef, useCallback } from 'react';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import ArcadePlayerShell from './ArcadePlayerShell';
import { getGameHighScore, saveGameHighScore } from './arcadeCatalog';
import './CatchTheModak.css';

const CANVAS_W = 800;
const CANVAS_H = 520;
const BOW_X = 115;
const BOW_Y = 355;
const GRAVITY = 540;

const ArjunaArcheryStage = ({ isPaused }) => {
  const canvasRef = useRef(null);
  const { playClick, playSuccess, playError, playPop, playJump, playGameOver } =
    useSoundEffects();
  const { awardStars } = useSadhana(true);

  const [uiState, setUiState] = useState({
    phase: 'playing',
    score: 0,
    highScore: getGameHighScore('archery'),
    arrows: 8,
    streak: 0,
    starsEarned: 0,
    newRecord: false,
  });

  const stateRef = useRef({
    phase: 'playing',
    score: 0,
    arrowsLeft: 8,
    streak: 0,
    maxStreak: 0,
    wind: 0,
    isDragging: false,
    dragStart: { x: BOW_X, y: BOW_Y },
    dragCurr: { x: BOW_X - 40, y: BOW_Y + 15 },
    aimAngle: -0.35,
    aimPower: 620,
    activeArrow: null,
    stuckArrows: [],
    target: {
      x: 685,
      y: 280,
      vy: 75,
      r: 46,
    },
    fishWheel: {
      x: 545,
      y: 118,
      angle: 0,
      radius: 46,
      hitCooldown: 0,
    },
    particles: [],
    floatingTexts: [],
    awardedStars: 0,
    lastTime: 0,
  });

  const randomizeWind = () => {
    // Wind acceleration between -110 and +110
    return Math.round((Math.random() - 0.5) * 180);
  };

  const resetRound = useCallback(() => {
    try {
      playClick();
    } catch (e) {}
    stateRef.current = {
      ...stateRef.current,
      phase: 'playing',
      score: 0,
      arrowsLeft: 8,
      streak: 0,
      maxStreak: 0,
      wind: randomizeWind(),
      isDragging: false,
      activeArrow: null,
      stuckArrows: [],
      target: { x: 685, y: 280, vy: 80, r: 46 },
      fishWheel: { x: 545, y: 118, angle: 0, radius: 46, hitCooldown: 0 },
      particles: [],
      floatingTexts: [],
      awardedStars: 0,
      lastTime: performance.now(),
    };
    setUiState({
      phase: 'playing',
      score: 0,
      highScore: getGameHighScore('archery'),
      arrows: 8,
      streak: 0,
      starsEarned: 0,
      newRecord: false,
    });
  }, [playClick]);

  const toCanvasCoords = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((clientY - rect.top) / rect.height) * CANVAS_H,
    };
  };

  const handlePointerDown = (clientX, clientY) => {
    const s = stateRef.current;
    if (isPaused || s.phase !== 'playing' || s.activeArrow || s.arrowsLeft <= 0) return;
    const pt = toCanvasCoords(clientX, clientY);
    s.isDragging = true;
    s.dragStart = pt;
    s.dragCurr = pt;
  };

  const handlePointerMove = (clientX, clientY) => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    const pt = toCanvasCoords(clientX, clientY);
    s.dragCurr = pt;

    // Pull vector (from current pointer to start/bow)
    let dx = s.dragStart.x - pt.x;
    let dy = s.dragStart.y - pt.y;
    // Allow aiming either by pulling back left OR pointing toward target
    if (dx < 15) {
      dx = Math.max(25, pt.x - BOW_X);
      dy = pt.y - BOW_Y;
    }
    const dist = Math.min(130, Math.max(30, Math.hypot(dx, dy)));
    const angle = Math.max(-1.25, Math.min(0.35, Math.atan2(dy, dx)));
    s.aimAngle = angle;
    s.aimPower = 380 + (dist / 130) * 480;
  };

  const handlePointerUp = () => {
    const s = stateRef.current;
    if (!s.isDragging) return;
    s.isDragging = false;
    if (s.activeArrow || s.arrowsLeft <= 0) return;

    s.arrowsLeft -= 1;
    s.activeArrow = {
      x: BOW_X,
      y: BOW_Y,
      vx: Math.cos(s.aimAngle) * s.aimPower,
      vy: Math.sin(s.aimAngle) * s.aimPower,
      angle: s.aimAngle,
      trail: [],
    };
    try {
      playJump();
    } catch (e) {}
  };

  useEffect(() => {
    let animId;

    const addBurst = (s, x, y, color, count = 14) => {
      for (let i = 0; i < count; i++) {
        const ang = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const spd = 80 + Math.random() * 160;
        s.particles.push({
          x,
          y,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 30,
          r: 3 + Math.random() * 4,
          color,
          life: 0.6,
          maxLife: 0.6,
        });
      }
    };

    const addText = (s, x, y, text, color = '#fde047') => {
      s.floatingTexts.push({ x, y, text, color, life: 1.0, maxLife: 1.0 });
    };

    const checkGameEnd = (s) => {
      if (s.arrowsLeft <= 0 && !s.activeArrow) {
        s.phase = 'gameover';
        const isNew = saveGameHighScore('archery', s.score);
        if (s.score >= 100 && s.awardedStars === 0) {
          s.awardedStars = 1;
          awardStars(1);
        }
        try {
          playGameOver();
        } catch (e) {}
        setUiState({
          phase: 'gameover',
          score: s.score,
          highScore: getGameHighScore('archery'),
          arrows: 0,
          streak: s.maxStreak,
          starsEarned: s.awardedStars,
          newRecord: isNew,
        });
      } else {
        saveGameHighScore('archery', s.score);
        setUiState((prev) => ({
          ...prev,
          score: s.score,
          highScore: Math.max(prev.highScore, s.score),
          arrows: s.arrowsLeft,
          streak: s.streak,
          starsEarned: s.awardedStars,
        }));
      }
    };

    const step = (now) => {
      const s = stateRef.current;
      if (!s.lastTime) s.lastTime = now;
      const dt = Math.min(0.04, (now - s.lastTime) / 1000);
      s.lastTime = now;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');

        if (!isPaused && s.phase === 'playing') {
          // Move main target vertically
          const speedScale = 1 + Math.min(1.5, s.score / 350);
          s.target.y += s.target.vy * speedScale * dt;
          if (s.target.y < 145) {
            s.target.y = 145;
            s.target.vy = Math.abs(s.target.vy);
          } else if (s.target.y > 410) {
            s.target.y = 410;
            s.target.vy = -Math.abs(s.target.vy);
          }

          // Rotate Matsya Yantra (Golden Fish Wheel)
          s.fishWheel.angle += 1.65 * dt;
          if (s.fishWheel.hitCooldown > 0) s.fishWheel.hitCooldown -= dt;

          // Update active arrow
          if (s.activeArrow) {
            const arr = s.activeArrow;
            arr.trail.push({ x: arr.x, y: arr.y });
            if (arr.trail.length > 12) arr.trail.shift();

            arr.vx += s.wind * dt;
            arr.vy += GRAVITY * dt;
            arr.x += arr.vx * dt;
            arr.y += arr.vy * dt;
            arr.angle = Math.atan2(arr.vy, arr.vx);

            const tipX = arr.x + Math.cos(arr.angle) * 22;
            const tipY = arr.y + Math.sin(arr.angle) * 22;

            // Check Matsya Yantra revolving fish collision
            const fishX =
              s.fishWheel.x + Math.cos(s.fishWheel.angle) * s.fishWheel.radius;
            const fishY =
              s.fishWheel.y + Math.sin(s.fishWheel.angle) * s.fishWheel.radius;
            const distFish = Math.hypot(tipX - fishX, tipY - fishY);

            if (distFish < 26 && s.fishWheel.hitCooldown <= 0) {
              s.fishWheel.hitCooldown = 1.0;
              s.streak += 1;
              if (s.streak > s.maxStreak) s.maxStreak = s.streak;
              const pts = 100 * Math.min(4, s.streak);
              s.score += pts;
              s.arrowsLeft += 1; // Refund arrow!
              if (s.awardedStars < 2) {
                s.awardedStars += 1;
                awardStars(1);
              }
              addBurst(s, fishX, fishY, '#fde047', 22);
              addText(
                s,
                fishX,
                fishY - 15,
                `🐟 MATSYA EYE! +${pts} (+1 🏹)`,
                '#fde047'
              );
              try {
                playSuccess();
              } catch (e) {}
              s.activeArrow = null;
              s.wind = randomizeWind();
              checkGameEnd(s);
            } else if (
              Math.abs(tipX - s.target.x) < 18 &&
              Math.abs(tipY - s.target.y) <= s.target.r + 4
            ) {
              // Hit Main Target!
              const offset = Math.abs(tipY - s.target.y);
              let basePts = 15;
              let label = '+15 HIT!';
              let color = '#38bdf8';

              if (offset <= 12) {
                basePts = 50;
                s.arrowsLeft += 1; // Free arrow on bullseye!
                label = '🎯 BULLSEYE! +1 🏹';
                color = '#fde047';
                try {
                  playSuccess();
                } catch (e) {}
              } else if (offset <= 27) {
                basePts = 30;
                label = '✨ GREAT SHOT!';
                color = '#4ade80';
                try {
                  playPop(1.3);
                } catch (e) {}
              } else {
                try {
                  playPop(1.0);
                } catch (e) {}
              }

              s.streak += 1;
              if (s.streak > s.maxStreak) s.maxStreak = s.streak;
              const mult = Math.min(4, 1 + Math.floor(s.streak / 3));
              const totalPts = basePts * mult;
              s.score += totalPts;

              if (s.score >= 250 && s.awardedStars < 2) {
                s.awardedStars += 1;
                awardStars(1);
              }

              addBurst(s, tipX, tipY, color, 16);
              addText(
                s,
                tipX - 30,
                tipY - 16,
                `${label} (+${totalPts})`,
                color
              );

              s.stuckArrows.push({ dy: tipY - s.target.y, life: 3.5 });
              s.activeArrow = null;
              s.wind = randomizeWind();
              checkGameEnd(s);
            } else if (tipX > CANVAS_W + 30 || tipY > CANVAS_H - 38 || tipX < -30) {
              // Missed shot!
              s.streak = 0;
              addText(
                s,
                Math.min(CANVAS_W - 80, Math.max(80, tipX)),
                Math.min(CANVAS_H - 60, tipY),
                'MISSED!',
                '#f87171'
              );
              try {
                playError();
              } catch (e) {}
              s.activeArrow = null;
              s.wind = randomizeWind();
              checkGameEnd(s);
            }
          }

          // Update stuck arrows
          s.stuckArrows = s.stuckArrows.filter((sa) => {
            sa.life -= dt;
            return sa.life > 0;
          });

          // Particles & texts
          s.particles = s.particles.filter((p) => {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 240 * dt;
            p.life -= dt;
            return p.life > 0;
          });

          s.floatingTexts = s.floatingTexts.filter((ft) => {
            ft.y -= 42 * dt;
            ft.life -= dt;
            return ft.life > 0;
          });
        }

        // === RENDER ===
        const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(0.55, '#1e3a8a');
        bgGrad.addColorStop(0.88, '#0284c7');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Royal Swayamvara Pavilion Pillars in background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        for (let px = 80; px < CANVAS_W; px += 180) {
          ctx.fillRect(px, 70, 26, FLOOR_H_POS - 70);
        }

        // Ground & Reflection Pool (for Matsya Yantra!)
        const groundY = 472;
        ctx.fillStyle = '#15803d';
        ctx.fillRect(0, groundY, CANVAS_W, CANVAS_H - groundY);

        // Sacred Water Reflection Pool below the Matsya Wheel
        ctx.fillStyle = '#0369a1';
        ctx.beginPath();
        ctx.ellipse(s.fishWheel.x, groundY + 12, 85, 16, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw Revolving Matsya Yantra (Golden Fish Wheel)
        ctx.save();
        ctx.translate(s.fishWheel.x, s.fishWheel.y);
        // Hanging chain from ceiling
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, -s.fishWheel.y);
        ctx.lineTo(0, 0);
        ctx.stroke();

        // Wheel ring
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.55)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, s.fishWheel.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Revolving Golden Fish
        const fx = Math.cos(s.fishWheel.angle) * s.fishWheel.radius;
        const fy = Math.sin(s.fishWheel.angle) * s.fishWheel.radius;
        ctx.fillStyle = '#fde047';
        ctx.beginPath();
        ctx.arc(fx, fy, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '22px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🐟', fx, fy);
        ctx.restore();

        // Draw Moving Archery Target
        const tx = s.target.x;
        const ty = s.target.y;
        const tr = s.target.r;

        // Target stand rope
        ctx.strokeStyle = 'rgba(255,255,255,0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, 70);
        ctx.lineTo(tx, groundY);
        ctx.stroke();

        // Concentric Target Rings (side-profile ellipse)
        const rings = [
          { r: tr, color: '#ffffff' },
          { r: tr * 0.78, color: '#2563eb' },
          { r: tr * 0.52, color: '#ef4444' },
          { r: tr * 0.26, color: '#fde047' },
        ];
        rings.forEach((rg) => {
          ctx.fillStyle = rg.color;
          ctx.beginPath();
          ctx.ellipse(tx, ty, 14, rg.r, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        });

        // Stuck arrows on target
        s.stuckArrows.forEach((sa) => {
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(tx - 38, ty + sa.dy);
          ctx.lineTo(tx - 4, ty + sa.dy);
          ctx.stroke();
        });

        // Draw Aim Trajectory Preview Dots when dragging or aiming
        if (!s.activeArrow && s.arrowsLeft > 0) {
          const vx0 = Math.cos(s.aimAngle) * s.aimPower;
          const vy0 = Math.sin(s.aimAngle) * s.aimPower;
          for (let stepIdx = 1; stepIdx <= 14; stepIdx++) {
            const t = stepIdx * 0.055;
            const px = BOW_X + vx0 * t + 0.5 * s.wind * t * t;
            const py = BOW_Y + vy0 * t + 0.5 * GRAVITY * t * t;
            ctx.fillStyle =
              stepIdx % 2 === 0
                ? 'rgba(254, 240, 138, 0.85)'
                : 'rgba(56, 189, 248, 0.75)';
            ctx.beginPath();
            ctx.arc(px, py, Math.max(2, 5.5 - stepIdx * 0.25), 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw Arjuna & Gandiva Bow
        ctx.save();
        ctx.translate(BOW_X, BOW_Y);

        // Arjuna Silhouette / Stand
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(-22, -18, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '28px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👑', -22, -36);

        ctx.rotate(s.aimAngle);
        // Gandiva Golden Bow Arc
        ctx.strokeStyle = '#fde047';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(-10, 0, 48, -Math.PI * 0.42, Math.PI * 0.42);
        ctx.stroke();

        // Bowstring
        const pullOffset = s.isDragging ? -Math.min(28, (s.aimPower - 380) / 18) : -4;
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(2, -46);
        ctx.lineTo(pullOffset, 0);
        ctx.lineTo(2, 46);
        ctx.stroke();

        // Nocked Arrow if not fired
        if (!s.activeArrow && s.arrowsLeft > 0) {
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(pullOffset, 0);
          ctx.lineTo(pullOffset + 54, 0);
          ctx.stroke();
          // Arrowhead
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.moveTo(pullOffset + 62, 0);
          ctx.lineTo(pullOffset + 48, -6);
          ctx.lineTo(pullOffset + 48, 6);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();

        // Draw Flying Arrow
        if (s.activeArrow) {
          const arr = s.activeArrow;
          // Golden Trail
          ctx.strokeStyle = 'rgba(253, 224, 71, 0.45)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          arr.trail.forEach((pt, idx) => {
            if (idx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();

          ctx.save();
          ctx.translate(arr.x, arr.y);
          ctx.rotate(arr.angle);
          ctx.strokeStyle = '#fde047';
          ctx.lineWidth = 3.5;
          ctx.beginPath();
          ctx.moveTo(-24, 0);
          ctx.lineTo(22, 0);
          ctx.stroke();

          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.moveTo(28, 0);
          ctx.lineTo(16, -6);
          ctx.lineTo(16, 6);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        // Particles & Floating Texts
        s.particles.forEach((p) => {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        s.floatingTexts.forEach((ft) => {
          ctx.save();
          ctx.globalAlpha = Math.max(0, ft.life / ft.maxLife);
          ctx.font = '900 18px sans-serif';
          ctx.textAlign = 'center';
          ctx.strokeStyle = 'rgba(15, 23, 42, 0.9)';
          ctx.lineWidth = 4;
          ctx.strokeText(ft.text, ft.x, ft.y);
          ctx.fillStyle = ft.color;
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
        });

        // Top HUD Bar
        ctx.fillStyle = 'rgba(15, 23, 42, 0.72)';
        ctx.beginPath();
        ctx.roundRect(16, 14, CANVAS_W - 32, 48, 14);
        ctx.fill();

        ctx.font = '800 17px sans-serif';
        ctx.fillStyle = '#fde047';
        ctx.textAlign = 'left';
        ctx.fillText(`⭐ SCORE: ${s.score}`, 32, 44);

        ctx.fillStyle = s.streak > 1 ? '#4ade80' : '#cbd5e1';
        ctx.fillText(`🔥 STREAK: ${s.streak}x`, 210, 44);

        // Wind Vane Indicator
        const windDir = s.wind > 8 ? '▶' : s.wind < -8 ? '◀' : '•';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(
          `🌬️ WIND: ${windDir} ${Math.abs(Math.round(s.wind / 10))} mph`,
          375,
          44
        );

        // Quiver Arrows Left
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fef08a';
        ctx.fillText(`🏹 QUIVER: ${s.arrowsLeft}`, CANVAS_W - 32, 44);

        // Bottom Prompt
        ctx.textAlign = 'center';
        ctx.font = '700 13px sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fillText(
          '🖱️ Drag anywhere to aim the Gandiva Bow & release to shoot! Bullseye = Free Arrow!',
          CANVAS_W / 2,
          CANVAS_H - 14
        );
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, awardStars, playError, playGameOver, playJump, playPop, playSuccess]);

  const FLOOR_H_POS = 472;

  return (
    <div className="modak-canvas-stage">
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="arcade-game-canvas"
        onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
        onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
        onMouseUp={handlePointerUp}
        onTouchStart={(e) => {
          if (e.touches && e.touches[0]) {
            handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchMove={(e) => {
          if (e.touches && e.touches[0]) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchEnd={handlePointerUp}
      />

      {uiState.phase === 'gameover' && (
        <div className="canvas-gameover-overlay">
          <div className="gameover-modal-card">
            <div className="gameover-badge">
              {uiState.newRecord ? '🏆 NEW ARCHERY RECORD!' : '🏹 QUIVER COMPLETE'}
            </div>
            <h2>Gandiva Trial Complete!</h2>
            <div className="gameover-score-grid">
              <div className="go-stat-box">
                <span>FINAL SCORE</span>
                <strong>{uiState.score} pts</strong>
              </div>
              <div className="go-stat-box">
                <span>BEST RECORD</span>
                <strong>{uiState.highScore} pts</strong>
              </div>
              <div className="go-stat-box">
                <span>BEST STREAK</span>
                <strong>{uiState.streak}x</strong>
              </div>
            </div>

            {uiState.starsEarned > 0 && (
              <div className="gameover-stars-banner">
                ⭐ +{uiState.starsEarned} Dharma{' '}
                {uiState.starsEarned === 1 ? 'Star' : 'Stars'} Earned!
              </div>
            )}

            <button className="canvas-replay-btn" onClick={resetRound}>
              🔄 Shoot Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ArjunaArchery = () => {
  return (
    <ArcadePlayerShell gameId="archery">
      {({ isPaused }) => <ArjunaArcheryStage isPaused={isPaused} />}
    </ArcadePlayerShell>
  );
};

export default ArjunaArchery;

