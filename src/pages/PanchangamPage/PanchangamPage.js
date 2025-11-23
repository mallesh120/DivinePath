import React from 'react';
import { usePanchangam } from '../../hooks/usePanchangam';
import './PanchangamPage.css';

const PanchangamPage = () => {
  const { loading, error, panchangamData } = usePanchangam();

  if (loading) {
    return <div className="panchangam-page-loading">Loading Panchangam data...</div>;
  }

  if (!panchangamData && error) {
    return <div className="panchangam-page-error">{error}</div>;
  }

  if (!panchangamData) {
    return <div className="panchangam-page-error">No data available</div>;
  }

  return (
    <div className="panchangam-page">
      <h1 className="panchangam-header">Today's Panchangam</h1>
      {error && <div className="panchangam-page-error">{error}</div>}
      <div className="panchangam-container">
        {Object.entries(panchangamData).map(([key, value]) => (
          <div key={key} className="panchangam-detail-card">
            <h3 className="panchangam-detail-label">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </h3>
            <p className="panchangam-detail-value">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PanchangamPage;
