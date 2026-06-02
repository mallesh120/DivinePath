import React from 'react';
import styles from './SpiritualCard.module.css';

const SpiritualCard = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`${styles.card} ${onClick ? styles.clickable : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

export default SpiritualCard;
