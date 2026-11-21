import React from 'react';
import styles from './SpiritualCard.module.css';

const SpiritualCard = ({ children, className = '', onClick }) => {
  const handleKeyDown = onClick
    ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(e);
        }
      }
    : undefined;

  return (
    <div
      className={`${styles.card} ${onClick ? styles.clickable : ''} ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default SpiritualCard;
