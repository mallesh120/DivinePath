import React, { useEffect } from 'react';
import './AdSenseWidget.css';

const AdSenseWidget = () => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className="adsense-widget-container">
        <p className="ad-label">Advertisement</p>
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-2625225850696115"
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdSenseWidget;
