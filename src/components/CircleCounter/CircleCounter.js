import React from 'react';
import './CircleCounter.css';

/**
 * CircleCounter - A visual circular counter inspired by traditional mala beads
 * Displays 108 beads in a circle with visual progress tracking
 */
const CircleCounter = ({ count = 0, onIncrement, onReset, maxCount = 108 }) => {
  // Constants
  const VISUAL_BEAD_COUNT = 36; // Display 36 beads for performance (representing 108)
  const CIRCLE_RADIUS = 85; // Radius of the progress circle
  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS; // ~534
  
  // Calculate rotation angle for current progress
  const progressAngle = (count / maxCount) * 360;
  
  // Create array of beads (simplified to 36 visual beads for performance)
  const beadsPerVisualBead = maxCount / VISUAL_BEAD_COUNT;
  const activeBeadCount = Math.ceil(count / beadsPerVisualBead);

  return (
    <div className="circle-counter">
      <h3 className="circle-counter-title">📿 Mantra Japa Counter</h3>
      
      <div className="circle-container">
        {/* Circular progress ring */}
        <svg className="progress-ring" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            className="progress-ring-bg"
            cx="100"
            cy="100"
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            className="progress-ring-circle"
            cx="100"
            cy="100"
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeDasharray={`${(progressAngle / 360) * CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Beads arranged in a circle */}
        <div className="beads-container">
          {Array.from({ length: VISUAL_BEAD_COUNT }).map((_, index) => {
            const angle = (360 / VISUAL_BEAD_COUNT) * index - 90; // Start from top
            const radian = (angle * Math.PI) / 180;
            const radius = 90; // Distance from center
            const x = 100 + radius * Math.cos(radian);
            const y = 100 + radius * Math.sin(radian);
            
            const isActive = index < activeBeadCount;
            
            return (
              <div
                key={index}
                className={`bead ${isActive ? 'bead-active' : ''}`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
              />
            );
          })}
        </div>

        {/* Center display */}
        <div className="counter-display">
          <div className="count-number">{count}</div>
          <div className="count-max">/ {maxCount}</div>
          <div className="count-percentage">{Math.round((count / maxCount) * 100)}%</div>
        </div>
      </div>

      {/* Control buttons */}
      <div className="counter-controls">
        <button className="counter-button increment" onClick={onIncrement}>
          + Count Japa
        </button>
        <button className="counter-button reset" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default CircleCounter;
