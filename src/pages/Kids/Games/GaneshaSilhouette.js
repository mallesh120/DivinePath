import React from 'react';

const GaneshaSilhouette = ({ className }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    style={{ fill: 'currentColor', width: '100%', height: '100%' }}
  >
    {/* Crown */}
    <circle cx="50" cy="15" r="10" />
    <rect x="40" y="15" width="20" height="10" />
    
    {/* Left Ear */}
    <ellipse cx="25" cy="40" rx="15" ry="20" transform="rotate(-20 25 40)" />
    
    {/* Right Ear */}
    <ellipse cx="75" cy="40" rx="15" ry="20" transform="rotate(20 75 40)" />
    
    {/* Head */}
    <circle cx="50" cy="35" r="15" />
    
    {/* Belly */}
    <circle cx="50" cy="65" r="22" />
    
    {/* Hands */}
    <circle cx="20" cy="60" r="8" />
    <circle cx="80" cy="60" r="8" />
    
    {/* Feet */}
    <ellipse cx="35" cy="85" rx="12" ry="6" />
    <ellipse cx="65" cy="85" rx="12" ry="6" />
    
    {/* Trunk - Using a thick stroke to form the curve seamlessly */}
    <path 
      d="M 50 40 Q 50 75 35 80 Q 25 80 25 70 Q 25 60 32 60" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="11" 
      strokeLinecap="round" 
    />
  </svg>
);

export default GaneshaSilhouette;
