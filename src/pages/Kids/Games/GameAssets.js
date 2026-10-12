import React from 'react';

export const ModakSVG = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="modakGrad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
        <stop offset="0%" stopColor="#fff5d1" />
        <stop offset="70%" stopColor="#fde073" />
        <stop offset="100%" stopColor="#eeb638" />
      </radialGradient>
      <filter id="shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
    </defs>
    <path
      d="M50 10 C30 50, 15 65, 15 80 C15 95, 30 95, 50 95 C70 95, 85 95, 85 80 C85 65, 70 50, 50 10 Z"
      fill="url(#modakGrad)"
      filter="url(#shadow)"
    />
    <path d="M50 15 C45 45, 35 70, 35 90" stroke="#d59b25" strokeWidth="2" fill="none" opacity="0.6"/>
    <path d="M50 15 C55 45, 65 70, 65 90" stroke="#d59b25" strokeWidth="2" fill="none" opacity="0.6"/>
    <path d="M50 10 V95" stroke="#d59b25" strokeWidth="2" fill="none" opacity="0.6"/>
  </svg>
);

export const LaddooSVG = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="laddooGrad" cx="40%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#ffea94" />
        <stop offset="60%" stopColor="#ffb03a" />
        <stop offset="100%" stopColor="#d17200" />
      </radialGradient>
      <filter id="laddooShadow">
        <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.3" />
      </filter>
      <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#d17200" opacity="0.3"/>
        <circle cx="7" cy="7" r="1" fill="#ffea94" opacity="0.5"/>
      </pattern>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#laddooGrad)" filter="url(#laddooShadow)" />
    <circle cx="50" cy="50" r="40" fill="url(#dots)" />
  </svg>
);

export const StoneSVG = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="stoneGrad" x1="20%" y1="10%" x2="80%" y2="90%">
        <stop offset="0%" stopColor="#a0a0a0" />
        <stop offset="50%" stopColor="#6e6e6e" />
        <stop offset="100%" stopColor="#404040" />
      </linearGradient>
      <filter id="stoneShadow">
        <feDropShadow dx="2" dy="5" stdDeviation="2" floodOpacity="0.5" />
      </filter>
    </defs>
    <path
      d="M30 20 L70 25 L85 55 L75 85 L35 90 L15 65 Z"
      fill="url(#stoneGrad)"
      filter="url(#stoneShadow)"
    />
    <path d="M30 20 L45 50 L75 85" stroke="#555" strokeWidth="2" fill="none" opacity="0.5"/>
    <path d="M70 25 L45 50 L15 65" stroke="#888" strokeWidth="2" fill="none" opacity="0.5"/>
  </svg>
);

export const TwigSVG = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="twigShadow">
        <feDropShadow dx="1" dy="3" stdDeviation="2" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Branch */}
    <path d="M20 80 Q 40 60, 80 30" stroke="#5c3a21" strokeWidth="6" strokeLinecap="round" filter="url(#twigShadow)" fill="none"/>
    <path d="M40 60 Q 55 50, 70 65" stroke="#5c3a21" strokeWidth="4" strokeLinecap="round" fill="none"/>
    {/* Leaves */}
    <path d="M70 65 C 80 55, 90 65, 85 75 C 75 85, 65 75, 70 65 Z" fill="#4caf50" filter="url(#twigShadow)"/>
    <path d="M80 30 C 90 20, 100 30, 95 40 C 85 50, 75 40, 80 30 Z" fill="#388e3c" filter="url(#twigShadow)"/>
  </svg>
);
