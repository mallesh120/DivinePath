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
        <div className="ad-label">Advertisement</div>
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-2625225850696115"
             data-ad-slot="9130931310"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdSenseWidget;
