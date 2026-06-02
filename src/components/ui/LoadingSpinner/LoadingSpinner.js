import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ fullHeight = true }) => (
  <div className={`${styles.container} ${fullHeight ? styles.fullHeight : ''}`}>
    <div className={styles.cosmicSpinner}></div>
  </div>
);

export default LoadingSpinner;
