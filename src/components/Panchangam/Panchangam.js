import React, { useState, useEffect } from 'react';
import { getPanchangam, Observer } from '@ishubhamx/panchangam-js';
import './Panchangam.css';
import {
  tithiNames,
  nakshatraNames,
  formatTime,
  calculateYamagandam,
  calculateDurmuhurtham
} from './panchangamUtils';

const Panchangam = () => {
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            elevation: 0.5
          });

          // Get place name using reverse geocoding
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            setPlaceName(data.address.city || data.address.town || data.address.village || 'Unknown Location');
          } catch (error) {
            console.error('Error getting location name:', error);
            setPlaceName('Unknown Location');
          }

          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Unable to get your location. Using default location (Bangalore).");
          setLocation({
            latitude: 12.9716,
            longitude: 77.5946,
            elevation: 0.920
          });
          setPlaceName('Bangalore');
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser. Using default location (Bangalore).");
      setLocation({
        latitude: 12.9716,
        longitude: 77.5946,
        elevation: 0.920
      });
      setPlaceName('Bangalore');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="panchangam-floating-widget">
        <button className="panchangam-toggle-button">
          Today's Panchangam
        </button>
      </div>
    );
  }

  try {
    const today = new Date();
    const observer = new Observer(
      location?.latitude || 12.9716,
      location?.longitude || 77.5946,
      location?.elevation || 0.920
    );

    const panchangam = getPanchangam(today, observer);

    // // Get Rahu Kalam times
    const rahuKalamStart = panchangam.rahuKalamStart;
    const rahuKalamEnd = panchangam.rahuKalamEnd;

    // // Debug logging to verify calculations
    // console.log('Day:', panchangam.vara);
    // console.log('Sunrise:', panchangam.sunrise);
    // console.log('Sunset:', panchangam.sunset);
    // console.log('Rahu Kalam:', rahuKalam); 
    
    // const yamagandam = getYamagandam(panchangam.sunrise, panchangam.sunset);

    // console.log('Yamagandam:', yamagandam);
    // const durmuhurtham = getDurmuhurtham(panchangam.sunrise, panchangam.sunset);
    // console.log('Durmuhurtham:', durmuhurtham);

    const formattedData = {
      location: placeName,
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][panchangam.vara] || 'N/A',
      tithi: tithiNames[panchangam.tithi - 1] || 'N/A',
      nakshatra: nakshatraNames[panchangam.nakshatra - 1] || 'N/A',
      sunrise: formatTime(panchangam.sunrise),
      sunset: formatTime(panchangam.sunset),
      rahuKalam: `${formatTime(rahuKalamStart)} - ${formatTime(rahuKalamEnd)}`,
      yamagandam: calculateYamagandam(panchangam.sunrise, panchangam.sunset, panchangam.vara),
      durmuhurtham: calculateDurmuhurtham(panchangam.sunrise, panchangam.vara)
    };

    return (
      <div className={`panchangam-floating-widget ${!isMinimized ? 'open' : ''}`}>
                <button 
          className="panchangam-toggle-button"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? "Today's Panchangam" : '×'}
        </button>
        <div className="panchangam-content">
          <h2 className="panchangam-title">Today's Panchangam</h2>
          {error && <div className="panchangam-error">{error}</div>}
          <div className="panchangam-grid">
            {Object.entries(formattedData).map(([key, value]) => (
              <div key={key} className="panchangam-item">
                <span className="panchangam-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                <span className="panchangam-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching Panchangam data:', error);
    return <div className="panchangam-widget">Error loading Panchangam data</div>;
  }
};

export default Panchangam;