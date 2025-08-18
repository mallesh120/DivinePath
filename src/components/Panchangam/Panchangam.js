import React, { useState, useEffect } from 'react';
import { getPanchangam, Observer } from '@ishubhamx/panchangam-js';
import './Panchangam.css';

// Tithi names
const tithiNames = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
  'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
  'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'
];

// Nakshatra names
const nakshatraNames = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada',
  'Uttara Bhadrapada', 'Revati'
];

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
    return <div className="panchangam-widget">Loading location data...</div>;
  }

  try {
    const today = new Date();
    const observer = new Observer(
      location?.latitude || 12.9716,
      location?.longitude || 77.5946,
      location?.elevation || 0.920
    );

    const panchangam = getPanchangam(today, observer);

    const getRahuKalam = (sunrise, sunset) => {
      if (!(sunrise instanceof Date) || !(sunset instanceof Date)) {
        return { start: 'N/A', end: 'N/A' };
      }

      // Get total daylight duration in milliseconds
      const daylightDuration = sunset.getTime() - sunrise.getTime();
      // Each part is 1/8th of daylight
      const partDuration = daylightDuration / 8;
      const rahuPeriods = {
        0: 7, // Sunday - 8th part
        1: 1, // Monday - 2nd part
        2: 4, // Tuesday - 5th part
        3: 2, // Wednesday - 3rd part
        4: 5, // Thursday - 6th part
        5: 3, // Friday - 4th part
        6: 0  // Saturday - 1st part
      };

      const dayOfWeek = panchangam.vara;
      const rahuPart = rahuPeriods[dayOfWeek];
      
      // Calculate start and end times
      const rahuStart = new Date(sunrise.getTime() + (rahuPart * partDuration));
      const rahuEnd = new Date(rahuStart.getTime() + partDuration);

      // Format times
      const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };

      return {
        start: rahuStart.toLocaleTimeString('en-US', options),
        end: rahuEnd.toLocaleTimeString('en-US', options)
      };
    };

    // Calculate Yamagandam (approximately)
    const getYamagandam = (sunrise, sunset) => {
      const duration = (sunset - sunrise) / 8;
      const yamaPeriods = {
        0: 1, // Sunday - 1st period
        1: 6, // Monday - 6th period
        2: 4, // Tuesday - 4th period
        3: 2, // Wednesday - 2nd period
        4: 7, // Thursday - 7th period
        5: 5, // Friday - 5th period
        6: 3  // Saturday - 3rd period
      };
      
      const period = yamaPeriods[panchangam.vara];
      const start = new Date(sunrise.getTime() + (duration * (period - 1)));
      const end = new Date(sunrise.getTime() + (duration * period));
      
      return {
        start: start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        end: end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      };
    };

    // Calculate Durmuhurtham (approximately)
    const getDurmuhurtham = (sunrise, sunset) => {
      // Simplified calculation - actual calculation would be more complex
      const duration = (sunset - sunrise) / 15; // Day divided into 15 muhurtas
      const start = new Date(sunrise.getTime() + (duration * 6)); // Example period
      const end = new Date(start.getTime() + duration);
      
      return {
        start: start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        end: end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      };
    };

    // Get Rahu Kalam times
    const rahuKalam = getRahuKalam(panchangam.sunrise, panchangam.sunset);

    // Debug logging to verify calculations
    console.log('Day:', panchangam.vara);
    console.log('Sunrise:', panchangam.sunrise);
    console.log('Sunset:', panchangam.sunset);
    console.log('Rahu Kalam:', rahuKalam);      const yamagandam = getYamagandam(panchangam.sunrise, panchangam.sunset);
    const durmuhurtham = getDurmuhurtham(panchangam.sunrise, panchangam.sunset);

    const formattedData = {
      location: placeName,
      day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][panchangam.vara] || 'N/A',
      tithi: tithiNames[panchangam.tithi - 1] || 'N/A',
      nakshatra: nakshatraNames[panchangam.nakshatra - 1] || 'N/A',
      sunrise: panchangam.sunrise instanceof Date 
        ? panchangam.sunrise.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
          })
        : 'N/A',
      sunset: panchangam.sunset instanceof Date
        ? panchangam.sunset.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
          })
        : 'N/A',
      rahuKalam: `${rahuKalam.start} - ${rahuKalam.end}`,
      yamagandam: `${yamagandam.start} - ${yamagandam.end}`,
      durmuhurtham: `${durmuhurtham.start} - ${durmuhurtham.end}`
    };

    return (
      <div className={`panchangam-widget ${isMinimized ? 'minimized' : ''}`}>
        <div className="panchangam-header">
          <h2 className="panchangam-title">Today's Panchangam</h2>
          <button 
            className="panchangam-toggle"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? '↓' : '↑'}
          </button>
        </div>
        {!isMinimized && (
          <>
            {error && <div className="panchangam-error">{error}</div>}
            <div className="panchangam-grid">
              {Object.entries(formattedData).map(([key, value]) => (
                <div key={key} className="panchangam-item">
                  <span className="panchangam-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className="panchangam-value">{value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error fetching Panchangam data:', error);
    return <div className="panchangam-widget">Error loading Panchangam data</div>;
  }
};

export default Panchangam;