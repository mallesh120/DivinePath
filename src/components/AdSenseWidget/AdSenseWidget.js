import React, { useEffect, useRef } from 'react';
import './AdSenseWidget.css';

const AdSenseWidget = () => {
  const adRef = useRef(null);
  const hasLoadedAd = useRef(false);

  useEffect(() => {
    // Only load ad once to prevent duplicate pushes
    if (hasLoadedAd.current) return;
    
    try {
      // Check if adsbygoogle script is loaded
      if (window.adsbygoogle && adRef.current) {
        window.adsbygoogle.push({});
        hasLoadedAd.current = true;
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="adsense-widget-container">
        <p className="ad-label">Advertisement</p>
        <ins 
             ref={adRef}
             className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-2625225850696115"
             data-ad-slot="9130931310"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdSenseWidget;
