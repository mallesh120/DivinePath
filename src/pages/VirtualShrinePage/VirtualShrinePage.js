import React from 'react';
import VirtualShrine from '../../components/VirtualShrine/VirtualShrine';
import GradientHeader from '../../components/ui/GradientHeader/GradientHeader';
import './VirtualShrinePage.css';

const VirtualShrinePage = () => {
  return (
    <div className="virtual-shrine-page">
      <GradientHeader 
        title="Sacred Mandir & Aarti Altar" 
        subtitle="Experience Daily Darshan, Ring Temple Bells, Light Diyas & Offer Pushpanjali"
      />
      <div className="virtual-shrine-page-content">
        <VirtualShrine />
      </div>
    </div>
  );
};

export default VirtualShrinePage;
