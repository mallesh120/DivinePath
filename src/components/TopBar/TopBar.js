import React from 'react';
import { usePanchangam } from '../../hooks/usePanchangam';
import './TopBar.css';

const TopBar = () => {
  const { loading, panchangamData } = usePanchangam();

  if (loading || !panchangamData) {
    return <div className="top-bar">Loading location details...</div>;
  }

  return (
    <div className="top-bar">
      <div className="top-bar-item">
        <span className="top-bar-label">Location:</span>
        <span className="top-bar-value">{panchangamData.location}</span>
      </div>
      <div className="top-bar-item">
        <span className="top-bar-label">Sunrise:</span>
        <span className="top-bar-value">{panchangamData.sunrise}</span>
      </div>
      <div className="top-bar-item">
        <span className="top-bar-label">Sunset:</span>
        <span className="top-bar-value">{panchangamData.sunset}</span>
      </div>
    </div>
  );
};

export default TopBar;
