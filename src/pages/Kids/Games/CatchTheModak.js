import React, { useState, useEffect, useRef, useCallback } from 'react';
import useSoundEffects from '../../../hooks/useSoundEffects';
import { useSadhana } from '../../../hooks/useSadhana';
import ArcadePlayerShell from './ArcadePlayerShell';
import { getGameHighScore, saveGameHighScore } from './arcadeCatalog';
import ganeshaIdleSrc from '../../../assets/images/Gods/ganesha_3d_idle.jpg';
import ganeshaRunSrc from '../../../assets/images/Gods/ganesha_3d_running.jpg';
import ganeshaEatSrc from '../../../assets/images/Gods/ganesha_eating.jpg';
import ganeshaHurtSrc from '../../../assets/images/Gods/ganesha_hurt.jpg';
import './CatchTheModak.css';

const CANVAS_W = 800;
const CANVAS_H = 520;
const FLOOR_Y = 468;

// Helper to strip near-white backgrounds from JPG sprites into a clean transparent canvas
const createTransparentSprite = (img) => {
  try {
    const off = document.createElement('canvas');
    const size = 180;
    off.width = size;
    off.height = size;
    const ctx = off.getContext('2d');
    ctx.drawImage(img, 0, 0, size, size);
    const imgData = ctx.getImageData(0, 0, size, size);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      if (r > 238 && g > 238 && b > 238) {
        d[i + 3] = 0;
      } else if (r > 220 && g > 220 && b > 220) {
        d[i + 3] = Math.floor(((238 - Math.max(r, g, b)) / 18) * 255);
      }
    }
    ctx.putImageData(imgData, 0, 0);
    return off;
  } catch (e) {
    return img;
  }
};

const drawModak = (ctx, x, y, r) => {
  ctx.save();
  ctx.translate(x, y);
  const grad = ctx.createRadialGradient(-r * 0.2, -r * 0.1, r * 0.1, 0, 0, r);
  grad.addColorStop(0, '#fffbeb');
  grad.addColorStop(0.65, '#fde047');
  grad.addColorStop(1, '#d97706');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.bezierCurveTo(r * 0.5, -r * 0.2, r * 0.95, r * 0.2, r * 0.85, r * 0.65);
  ctx.bezierCurveTo(r * 0.75, r * 0.98, -r * 0.75, r * 0.98, -r * 0.85, r * 0.65);
  ctx.bezierCurveTo(-r * 0.95, r * 0.2, -r * 0.5, -r * 0.2, 0, -r);
  ctx.fill();

  ctx.strokeStyle = 'rgba(180, 83, 9, 0.55)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.85);
  ctx.quadraticCurveTo(-r * 0.35, r * 0.2, -r * 0.3, r * 0.8);
  ctx.moveTo(0, -r * 0.85);
  ctx.lineTo(0, r * 0.85);
  ctx.moveTo(0, -r * 0.85);
  ctx.quadraticCurveTo(r * 0.35, r * 0.2, r * 0.3, r * 0.8);
  ctx.stroke();
  ctx.restore();
};

const drawLaddoo = (ctx, x, y, r) => {
  ctx.save();
  ctx.translate(x, y);
  const grad = ctx.createRadialGradient(-r * 0.25, -r * 0.25, r * 0.1, 0, 0, r * 0.9);
  grad.addColorStop(0, '#fef08a');
  grad.addColorStop(0.55, '#fb923c');
  grad.addColorStop(1, '#c2410c');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.85, 0, Math.PI * 2);
  ctx.fill();

  // Motichoor pearls
  ctx.fillStyle = 'rgba(254, 240, 138, 0.65)';
  const dots = [
    [-0.3, -0.3],
    [0.25, -0.35],
    [0, 0.1],
    [-0.35, 0.25],
    [0.35, 0.2],
  ];
  dots.forEach(([dx, dy]) => {
    ctx.beginPath();
    ctx.arc(dx * r, dy * r, r * 0.12, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();
};

const drawLotus = (ctx, x, y, r) => {
  ctx.save();
  ctx.translate(x, y);
  // Glow
  ctx.fillStyle = 'rgba(244, 114, 182, 0.3)';
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.25, 0, Math.PI * 2);
  ctx.fill();

  // Petals
  const angles = [-0.6, -0.3, 0, 0.3, 0.6];
  angles.forEach((ang, idx) => {
    ctx.save();
    ctx.rotate(ang);
    ctx.fillStyle = idx === 2 ? '#f472b6' : '#ec4899';
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.2, r * 0.32, r * 0.72, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  });
  ctx.restore();
};

const drawPowerOrb = (ctx, x, y, r, color, symbol) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.font = `${Math.round(r)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(symbol, 0, 2);
  ctx.restore();
};

const drawStone = (ctx, x, y, r, rot) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.fillStyle = '#64748b';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-r * 0.6, -r * 0.7);
  ctx.lineTo(r * 0.5, -r * 0.65);
  ctx.lineTo(r * 0.85, 0);
  ctx.lineTo(r * 0.45, r * 0.75);
  ctx.lineTo(-r * 0.55, r * 0.8);
  ctx.lineTo(-r * 0.85, 0.1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
};

const CatchTheModakStage = ({ isPaused, reportScore }) => {
  const canvasRef = useRef(null);
  const { playClick, playSuccess, playError, playPop, playGameOver } = useSoundEffects();
  const { awardStars } = useSadhana(true);

  const [uiState, setUiState] = useState({
    phase: 'playing', // 'playing' | 'gameover'
    score: 0,
    highScore: getGameHighScore('modak'),
    lives: 3,
    level: 1,
    combo: 0,
    starsEarned: 0,
    newRecord: false,
  });

  useEffect(() => {
    if (reportScore) reportScore(uiState.score);
  }, [uiState.score, reportScore]);

  const spritesRef = useRef({
    idle: null,
    run: null,
    eat: null,
    hurt: null,
  });

  const gameRef = useRef({
    phase: 'playing',
    score: 0,
    lives: 3,
    level: 1,
    combo: 0,
    maxCombo: 0,
    playerX: CANVAS_W / 2,
    targetX: CANVAS_W / 2,
    facing: 1,
    moveDir: 0,
    keys: { left: false, right: false },
    eatTimer: 0,
    hurtTimer: 0,
    shieldTimer: 0,
    magnetTimer: 0,
    shakeTimer: 0,
    spawnTimer: 0,
    items: [],
    particles: [],
    floatingTexts: [],
    clouds: [
      { x: 110, y: 75, r: 42, speed: 12 },
      { x: 380, y: 55, r: 54, speed: 8 },
      { x: 640, y: 95, r: 38, speed: 15 },
    ],
    awardedMilestones: 0,
    lastTime: 0,
  });

  // Load and process Ganesha sprites
  useEffect(() => {
    const loadSprite = (src, key) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        spritesRef.current[key] = createTransparentSprite(img);
      };
    };
    loadSprite(ganeshaIdleSrc, 'idle');
    loadSprite(ganeshaRunSrc, 'run');
    loadSprite(ganeshaEatSrc, 'eat');
    loadSprite(ganeshaHurtSrc, 'hurt');
  }, []);

  const resetRound = useCallback(() => {
    try {
      playClick();
    } catch (e) {}
    gameRef.current = {
      ...gameRef.current,
      phase: 'playing',
      score: 0,
      lives: 3,
      level: 1,
      combo: 0,
      maxCombo: 0,
      playerX: CANVAS_W / 2,
      targetX: CANVAS_W / 2,
      facing: 1,
      moveDir: 0,
      eatTimer: 0,
      hurtTimer: 0,
      shieldTimer: 0,
      magnetTimer: 0,
      shakeTimer: 0,
      spawnTimer: 0,
      items: [],
      particles: [],
      floatingTexts: [],
      awardedMilestones: 0,
      lastTime: performance.now(),
    };
    setUiState({
      phase: 'playing',
      score: 0,
      highScore: getGameHighScore('modak'),
      lives: 3,
      level: 1,
      combo: 0,
      starsEarned: 0,
      newRecord: false,
    });
  }, [playClick]);

  // Keyboard listeners
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        gameRef.current.keys.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        gameRef.current.keys.right = true;
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

  // Mouse & Touch pointer handler
  const updatePointerX = (clientX) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const relX = ((clientX - rect.left) / rect.width) * CANVAS_W;
    gameRef.current.targetX = Math.max(55, Math.min(CANVAS_W - 55, relX));
  };

  // Main 60FPS Canvas Loop
  useEffect(() => {
    let animId;

    const spawnItem = (g) => {
      const roll = Math.random();
      let type = 'modak';
      let points = 10;
      let isGood = true;
      let radius = 22;

      if (roll < 0.36) {
        type = 'modak';
        points = 10;
      } else if (roll < 0.62) {
        type = 'laddoo';
        points = 20;
      } else if (roll < 0.70) {
        type = 'lotus';
        points = 40;
      } else if (roll < 0.75) {
        type = 'shield';
        points = 25;
      } else if (roll < 0.80) {
        type = 'magnet';
        points = 25;
      } else {
        type = 'stone';
        points = 0;
        isGood = false;
        radius = 21;
      }

      const speedBase = 175 + g.level * 28;
      g.items.push({
        id: Math.random(),
        type,
        isGood,
        points,
        x: 55 + Math.random() * (CANVAS_W - 110),
        y: -30,
        vy: speedBase + Math.random() * 65,
        vx: (Math.random() - 0.5) * 28,
        r: radius,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 4,
      });
    };

    const addBurst = (g, x, y, color, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const spd = 70 + Math.random() * 140;
        g.particles.push({
          x,
          y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 40,
          r: 3 + Math.random() * 4,
          color,
          life: 0.55,
          maxLife: 0.55,
        });
      }
    };

    const addFloatingText = (g, x, y, text, color = '#fde047') => {
      g.floatingTexts.push({
        x,
        y,
        text,
        color,
        life: 0.9,
        maxLife: 0.9,
      });
    };

    const step = (now) => {
      const g = gameRef.current;
      if (!g.lastTime) g.lastTime = now;
      const dt = Math.min(0.05, (now - g.lastTime) / 1000);
      g.lastTime = now;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');

        if (!isPaused && g.phase === 'playing') {
          // Player movement (Keyboard or Pointer smoothing)
          const keySpeed = 460;
          if (g.keys.left) {
            g.targetX = Math.max(55, g.playerX - keySpeed * dt);
          } else if (g.keys.right) {
            g.targetX = Math.min(CANVAS_W - 55, g.playerX + keySpeed * dt);
          }

          const diffX = g.targetX - g.playerX;
          if (Math.abs(diffX) > 1.5) {
            g.facing = diffX > 0 ? 1 : -1;
            g.moveDir = Math.sign(diffX);
          } else {
            g.moveDir = 0;
          }
          g.playerX += diffX * Math.min(1, dt * 16);

          // Timers
          if (g.eatTimer > 0) g.eatTimer -= dt;
          if (g.hurtTimer > 0) g.hurtTimer -= dt;
          if (g.shieldTimer > 0) g.shieldTimer -= dt;
          if (g.magnetTimer > 0) g.magnetTimer -= dt;
          if (g.shakeTimer > 0) g.shakeTimer -= dt;

          // Clouds
          g.clouds.forEach((c) => {
            c.x += c.speed * dt;
            if (c.x - c.r * 2 > CANVAS_W) c.x = -c.r * 2;
          });

          // Spawning
          const spawnInterval = Math.max(0.38, 1.05 - g.level * 0.08);
          g.spawnTimer += dt;
          if (g.spawnTimer >= spawnInterval) {
            g.spawnTimer = 0;
            spawnItem(g);
          }

          // Update items
          const playerY = FLOOR_Y - 56;
          const remainingItems = [];

          for (let i = 0; i < g.items.length; i++) {
            const it = g.items[i];

            // Magnet attraction for good items
            if (g.magnetTimer > 0 && it.isGood && it.y > 60) {
              const dx = g.playerX - it.x;
              const dy = playerY - it.y;
              const dist = Math.hypot(dx, dy);
              if (dist < 280 && dist > 1) {
                it.x += (dx / dist) * 340 * dt;
                it.y += (dy / dist) * 180 * dt;
              }
            }

            it.x += it.vx * dt;
            it.y += it.vy * dt;
            it.rot += it.vRot * dt;

            if (it.x < 35 || it.x > CANVAS_W - 35) it.vx *= -1;

            // Check catch collision
            const distToPlayer = Math.hypot(it.x - g.playerX, it.y - playerY);
            if (distToPlayer < 56) {
              if (it.isGood) {
                g.combo += 1;
                if (g.combo > g.maxCombo) g.maxCombo = g.combo;
                const mult = Math.min(5, 1 + Math.floor(g.combo / 5));
                const gained = it.points * mult;
                g.score += gained;
                g.eatTimer = 0.35;

                if (it.type === 'lotus') {
                  if (g.lives < 4) g.lives += 1;
                  addFloatingText(g, it.x, it.y - 12, `🪷 +1 HEART & +${gained}`, '#f472b6');
                  try {
                    playSuccess();
                  } catch (e) {}
                } else if (it.type === 'shield') {
                  g.shieldTimer = 6.5;
                  addFloatingText(g, it.x, it.y - 12, '🛡️ DIVINE SHIELD!', '#38bdf8');
                  try {
                    playSuccess();
                  } catch (e) {}
                } else if (it.type === 'magnet') {
                  g.magnetTimer = 6.5;
                  addFloatingText(g, it.x, it.y - 12, '🧲 SWEET MAGNET!', '#c084fc');
                  try {
                    playSuccess();
                  } catch (e) {}
                } else {
                  addFloatingText(
                    g,
                    it.x,
                    it.y - 10,
                    mult > 1 ? `+${gained} (${mult}x!)` : `+${gained}`,
                    mult > 1 ? '#4ade80' : '#fde047'
                  );
                  try {
                    playPop(1 + Math.min(0.8, g.combo * 0.06));
                  } catch (e) {}
                }

                addBurst(
                  g,
                  it.x,
                  it.y,
                  it.type === 'laddoo' ? '#fb923c' : '#fde047',
                  12
                );

                // Level progression & Dharma Stars
                const newLevel = 1 + Math.floor(g.score / 180);
                if (newLevel > g.level) {
                  g.level = newLevel;
                  addFloatingText(
                    g,
                    CANVAS_W / 2,
                    140,
                    `⚡ LEVEL ${newLevel} UP!`,
                    '#38bdf8'
                  );
                }

                const milestones = Math.floor(g.score / 200);
                if (milestones > g.awardedMilestones && g.awardedMilestones < 3) {
                  g.awardedMilestones = milestones;
                  awardStars(1);
                }
              } else {
                // Hit a stone!
                if (g.shieldTimer > 0) {
                  addBurst(g, it.x, it.y, '#38bdf8', 14);
                  addFloatingText(g, it.x, it.y - 10, '🛡️ BLOCKED!', '#38bdf8');
                  try {
                    playPop(0.8);
                  } catch (e) {}
                } else {
                  g.lives -= 1;
                  g.combo = 0;
                  g.hurtTimer = 0.45;
                  g.shakeTimer = 0.35;
                  addBurst(g, it.x, it.y, '#ef4444', 15);
                  addFloatingText(g, it.x, it.y - 10, '💥 OUCH! -1 ❤️', '#f87171');
                  try {
                    playError();
                  } catch (e) {}

                  if (g.lives <= 0) {
                    g.phase = 'gameover';
                    const isNew = saveGameHighScore('modak', g.score);
                    if (g.score >= 80 && g.awardedMilestones === 0) {
                      g.awardedMilestones = 1;
                      awardStars(1);
                    }
                    try {
                      playGameOver();
                    } catch (e) {}
                    setUiState({
                      phase: 'gameover',
                      score: g.score,
                      highScore: getGameHighScore('modak'),
                      lives: 0,
                      level: g.level,
                      combo: g.maxCombo,
                      starsEarned: g.awardedMilestones,
                      newRecord: isNew,
                    });
                  }
                }
              }

              if (g.phase === 'playing') {
                saveGameHighScore('modak', g.score);
                setUiState((prev) => ({
                  ...prev,
                  score: g.score,
                  highScore: Math.max(prev.highScore, g.score),
                  lives: g.lives,
                  level: g.level,
                  combo: g.combo,
                  starsEarned: g.awardedMilestones,
                }));
              }
              continue;
            }

            // Missed bottom
            if (it.y > FLOOR_Y + 12) {
              if (it.isGood && (it.type === 'modak' || it.type === 'laddoo')) {
                g.combo = 0;
              }
              continue;
            }

            remainingItems.push(it);
          }
          g.items = remainingItems;

          // Update particles
          g.particles = g.particles.filter((p) => {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.vy += 260 * dt;
            p.life -= dt;
            return p.life > 0;
          });

          // Update floating texts
          g.floatingTexts = g.floatingTexts.filter((ft) => {
            ft.y -= 48 * dt;
            ft.life -= dt;
            return ft.life > 0;
          });
        }

        // === RENDER CANVAS ===
        ctx.save();
        if (g.shakeTimer > 0) {
          ctx.translate((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8);
        }

        // Sky Backdrop
        const skyGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_H);
        skyGrad.addColorStop(0, '#1e1b4b');
        skyGrad.addColorStop(0.5, '#3b82f6');
        skyGrad.addColorStop(0.88, '#fde68a');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Distant Sun / Halo behind Ganesha's temple
        const sunGrad = ctx.createRadialGradient(
          CANVAS_W / 2,
          FLOOR_Y - 60,
          20,
          CANVAS_W / 2,
          FLOOR_Y - 60,
          240
        );
        sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.55)');
        sunGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Clouds
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        g.clouds.forEach((c) => {
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
          ctx.arc(c.x + c.r * 0.75, c.y + 4, c.r * 0.75, 0, Math.PI * 2);
          ctx.arc(c.x - c.r * 0.75, c.y + 6, c.r * 0.7, 0, Math.PI * 2);
          ctx.fill();
        });

        // Distant Temple Silhouettes & Mountains
        ctx.fillStyle = 'rgba(30, 27, 75, 0.22)';
        ctx.beginPath();
        ctx.moveTo(0, FLOOR_Y);
        ctx.lineTo(120, 340);
        ctx.lineTo(250, FLOOR_Y);
        ctx.lineTo(410, 310);
        ctx.lineTo(580, FLOOR_Y);
        ctx.lineTo(700, 350);
        ctx.lineTo(CANVAS_W, FLOOR_Y);
        ctx.closePath();
        ctx.fill();

        // Temple Floor
        const floorGrad = ctx.createLinearGradient(0, FLOOR_Y, 0, CANVAS_H);
        floorGrad.addColorStop(0, '#f59e0b');
        floorGrad.addColorStop(1, '#b45309');
        ctx.fillStyle = floorGrad;
        ctx.fillRect(0, FLOOR_Y, CANVAS_W, CANVAS_H - FLOOR_Y);

        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, FLOOR_Y);
        ctx.lineTo(CANVAS_W, FLOOR_Y);
        ctx.stroke();

        // Draw Falling Items
        g.items.forEach((it) => {
          if (it.type === 'modak') drawModak(ctx, it.x, it.y, it.r);
          else if (it.type === 'laddoo') drawLaddoo(ctx, it.x, it.y, it.r);
          else if (it.type === 'lotus') drawLotus(ctx, it.x, it.y, it.r);
          else if (it.type === 'shield')
            drawPowerOrb(ctx, it.x, it.y, it.r, '#0284c7', '🛡️');
          else if (it.type === 'magnet')
            drawPowerOrb(ctx, it.x, it.y, it.r, '#9333ea', '🧲');
          else drawStone(ctx, it.x, it.y, it.r, it.rot);
        });

        // Draw Ganesha Player
        const pX = g.playerX;
        const pY = FLOOR_Y - 54;

        // Powerup Auras around Ganesha
        if (g.shieldTimer > 0) {
          ctx.save();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.85)';
          ctx.fillStyle = 'rgba(56, 189, 248, 0.16)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(pX, pY, 58, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }
        if (g.magnetTimer > 0) {
          ctx.save();
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.75)';
          ctx.setLineDash([6, 6]);
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(pX, pY, 68, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Choose active Ganesha sprite
        let activeSprite = spritesRef.current.idle;
        if (g.hurtTimer > 0 && spritesRef.current.hurt) {
          activeSprite = spritesRef.current.hurt;
        } else if (g.eatTimer > 0 && spritesRef.current.eat) {
          activeSprite = spritesRef.current.eat;
        } else if (Math.abs(g.moveDir) > 0 && spritesRef.current.run) {
          activeSprite = spritesRef.current.run;
        }

        ctx.save();
        ctx.translate(pX, pY);
        if (g.facing < 0) ctx.scale(-1, 1);
        if (g.eatTimer > 0) {
          const pulse = 1 + Math.sin(g.eatTimer * 25) * 0.12;
          ctx.scale(pulse, 2 - pulse);
        }
        if (activeSprite) {
          ctx.drawImage(activeSprite, -54, -56, 108, 108);
        } else {
          // Fallback before image finishes loading
          ctx.font = '56px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('🐘', 0, 0);
        }
        ctx.restore();

        // Particles
        g.particles.forEach((p) => {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Floating Score Popups
        g.floatingTexts.forEach((ft) => {
          ctx.save();
          ctx.globalAlpha = Math.max(0, ft.life / ft.maxLife);
          ctx.font = '900 18px sans-serif';
          ctx.textAlign = 'center';
          ctx.strokeStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.lineWidth = 4;
          ctx.strokeText(ft.text, ft.x, ft.y);
          ctx.fillStyle = ft.color;
          ctx.fillText(ft.text, ft.x, ft.y);
          ctx.restore();
        });

        // Top In-Canvas Arcade HUD Bar
        ctx.fillStyle = 'rgba(15, 23, 42, 0.68)';
        ctx.beginPath();
        ctx.roundRect(16, 14, CANVAS_W - 32, 48, 14);
        ctx.fill();

        ctx.font = '800 17px sans-serif';
        ctx.fillStyle = '#fde047';
        ctx.textAlign = 'left';
        ctx.fillText(`⭐ SCORE: ${g.score}`, 32, 44);

        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`LVL ${g.level}`, 195, 44);

        const mult = Math.min(5, 1 + Math.floor(g.combo / 5));
        ctx.fillStyle = mult > 1 ? '#4ade80' : '#cbd5e1';
        ctx.fillText(
          mult > 1 ? `🔥 COMBO x${g.combo} (${mult}x FEVER!)` : `Combo: ${g.combo}`,
          285,
          44
        );

        // Active powerup timer badges
        if (g.shieldTimer > 0) {
          ctx.fillStyle = '#38bdf8';
          ctx.fillText(`🛡️ ${Math.ceil(g.shieldTimer)}s`, 530, 44);
        } else if (g.magnetTimer > 0) {
          ctx.fillStyle = '#c084fc';
          ctx.fillText(`🧲 ${Math.ceil(g.magnetTimer)}s`, 530, 44);
        }

        // Lives on right
        ctx.textAlign = 'right';
        ctx.font = '20px sans-serif';
        ctx.fillText('❤️'.repeat(Math.max(0, g.lives)), CANVAS_W - 32, 44);

        ctx.restore();
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, awardStars, playError, playGameOver, playPop, playSuccess]);

  return (
    <div className="modak-canvas-stage">
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="arcade-game-canvas"
        onMouseMove={(e) => updatePointerX(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches && e.touches[0]) {
            updatePointerX(e.touches[0].clientX);
          }
        }}
      />

      {uiState.phase === 'gameover' && (
        <div className="canvas-gameover-overlay">
          <div className="gameover-modal-card">
            <div className="gameover-badge">
              {uiState.newRecord ? '🏆 NEW ARCADE RECORD!' : '🥟 ROUND COMPLETE'}
            </div>
            <h2>Sweet Feast Finished!</h2>
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
                <span>MAX COMBO</span>
                <strong>{uiState.combo}x</strong>
              </div>
            </div>

            {uiState.starsEarned > 0 && (
              <div className="gameover-stars-banner">
                ⭐ +{uiState.starsEarned} Dharma{' '}
                {uiState.starsEarned === 1 ? 'Star' : 'Stars'} Earned!
              </div>
            )}

            <button className="canvas-replay-btn" onClick={resetRound}>
              🔄 Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const CatchTheModak = () => {
  return (
    <ArcadePlayerShell gameId="modak" liveStatLabel="SCORE">
      {({ isPaused, reportScore }) => (
        <CatchTheModakStage isPaused={isPaused} reportScore={reportScore} />
      )}
    </ArcadePlayerShell>
  );
};

export default CatchTheModak;
