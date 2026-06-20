import React from 'react';
import styles from './GradientHeader.module.css';

const GradientHeader = ({ title, subtitle, date, className = '' }) => (
  <div className={`${styles.header} ${className}`}>
    <div className={styles.content}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {date && <p className={styles.date}>{date}</p>}
    </div>
  </div>
);

export default GradientHeader;
