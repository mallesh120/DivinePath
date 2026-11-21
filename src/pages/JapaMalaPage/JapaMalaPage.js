import React from 'react';
import JapaMala from '../../components/JapaMala/JapaMala';
import GradientHeader from '../../components/ui/GradientHeader/GradientHeader';
import './JapaMalaPage.css';

const JapaMalaPage = () => {
  return (
    <div className="japa-mala-page">
      <div className="japa-mala-page-inner">
        <GradientHeader
          title="Sacred Japa Mala"
          subtitle="108 Beads of Mindful Chanting, Dhyana & Meditation"
        />
        <main className="japa-mala-page-content" aria-label="Japa Mala Meditation Counter">
          <JapaMala />
        </main>
      </div>
    </div>
  );
};

export default JapaMalaPage;
