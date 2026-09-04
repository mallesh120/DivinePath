import React from 'react';
import JapaMala from '../../components/JapaMala/JapaMala';
import GradientHeader from '../../components/ui/GradientHeader/GradientHeader';
import './JapaMalaPage.css';

const JapaMalaPage = () => {
  return (
    <div className="japa-mala-page">
      <GradientHeader 
        title="Sacred Japa Mala" 
        subtitle="108 Beads of Mindful Chanting, Dhyana & Meditation"
      />
      <div className="japa-mala-page-content">
        <JapaMala />
      </div>
    </div>
  );
};

export default JapaMalaPage;
