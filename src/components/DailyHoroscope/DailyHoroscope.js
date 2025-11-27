import React from 'react';
import { Link } from 'react-router-dom';
import { usePanchangam } from '../../hooks/usePanchangam';
import './DailyHoroscope.css';

const DailyHoroscope = () => {
  const { loading, error, panchangamData } = usePanchangam();

  // Daily predictions based on Tithi and Nakshatra
  const getDailyGuidance = (tithi, nakshatra) => {
    const tithiGuidance = {
      'Pratipada': 'New beginnings are favored. Start new projects with confidence.',
      'Dwitiya': 'Focus on partnerships and cooperation. Two minds work better than one.',
      'Tritiya': 'Creative energy is high. Express yourself through art or communication.',
      'Chaturthi': 'Remove obstacles from your path. Invoke Ganesha\'s blessings.',
      'Panchami': 'Knowledge and learning are highlighted. Good day for study.',
      'Shashthi': 'Health and wellness take priority. Take care of your body.',
      'Saptami': 'Victory over challenges. Courage and determination will prevail.',
      'Ashtami': 'Transformation and change. Embrace Durga\'s powerful energy.',
      'Navami': 'Divine feminine power. Honor the goddess within and without.',
      'Dashami': 'Completion of tasks. Finish what you\'ve started.',
      'Ekadashi': 'Spiritual practices bring rewards. Fast and meditate.',
      'Dwadashi': 'Balance material and spiritual pursuits harmoniously.',
      'Trayodashi': 'Overcome fears and negative energies with devotion.',
      'Chaturdashi': 'Seek Shiva\'s blessings. Release what no longer serves you.',
      'Purnima': 'Fullness and completion. Gratitude brings abundance.',
      'Amavasya': 'Rest and introspection. Honor your ancestors.'
    };

    const nakshatraGuidance = {
      'Ashwini': 'Swift action and healing energies surround you.',
      'Bharani': 'Transformative day. Release old patterns.',
      'Krittika': 'Cut through confusion with clarity and sharp insight.',
      'Rohini': 'Creativity and growth. Nurture your dreams.',
      'Mrigashira': 'Seek knowledge. Curiosity leads to discovery.',
      'Ardra': 'Emotional storms clear the way for new growth.',
      'Punarvasu': 'Return to basics. Renewal and restoration.',
      'Pushya': 'Nourishment and support. Give and receive freely.',
      'Ashlesha': 'Deep intuition. Trust your inner knowing.',
      'Magha': 'Honor traditions. Ancestral wisdom guides you.',
      'Purva Phalguni': 'Enjoyment and pleasure. Balance work with leisure.',
      'Uttara Phalguni': 'Partnerships flourish. Cooperation brings success.',
      'Hasta': 'Skillful hands create wonders. Focus on craftsmanship.',
      'Chitra': 'Beauty and creativity shine. Design your ideal life.',
      'Swati': 'Independence and freedom. Move with the wind.',
      'Vishakha': 'Determined focus achieves goals. Stay committed.',
      'Anuradha': 'Friendship and devotion. Nurture relationships.',
      'Jyeshtha': 'Power and responsibility. Lead with wisdom.',
      'Mula': 'Get to the root. Deep transformation begins.',
      'Purva Ashadha': 'Invincible energy. Victory is assured.',
      'Uttara Ashadha': 'Lasting success. Build solid foundations.',
      'Shravana': 'Listen deeply. Wisdom comes through hearing.',
      'Dhanishta': 'Prosperity and rhythm. Abundance flows.',
      'Shatabhisha': 'Healing and secrets revealed. Mystical day.',
      'Purva Bhadrapada': 'Intense spiritual energy. Meditate deeply.',
      'Uttara Bhadrapada': 'Depth and wisdom. Connect with cosmic consciousness.',
      'Revati': 'Journey\'s end and new beginnings. Safe passage assured.'
    };

    return {
      tithi: tithiGuidance[tithi] || 'Follow your dharma with devotion.',
      nakshatra: nakshatraGuidance[nakshatra] || 'Stars guide your path today.'
    };
  };

  if (loading) {
    return (
      <div className="horoscope-widget">
        <h2 className="horoscope-title">🌟 Daily Guidance</h2>
        <div className="horoscope-loading">Loading cosmic insights...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="horoscope-widget">
        <h2 className="horoscope-title">🌟 Daily Guidance</h2>
        <div className="horoscope-error">{error}</div>
      </div>
    );
  }

  const guidance = getDailyGuidance(
    panchangamData?.almanac?.Tithi?.name,
    panchangamData?.almanac?.Nakshatra?.name
  );

  return (
    <div className="horoscope-widget">
      <div className="horoscope-header">
        <h2 className="horoscope-title">🌟 Daily Spiritual Guidance</h2>
        <Link to="/panchangam" className="view-full-panchangam">
          View Full Panchangam →
        </Link>
      </div>

      <div className="horoscope-content">
        <div className="cosmic-info">
          <div className="info-card">
            <span className="info-icon">🌙</span>
            <div className="info-details">
              <h4 className="info-label">Tithi</h4>
              <p className="info-value">{panchangamData?.almanac?.Tithi?.name}</p>
              {panchangamData?.almanac?.Tithi?.endTime && (
                <span className="info-time">Until {panchangamData.almanac.Tithi.endTime}</span>
              )}
            </div>
          </div>

          <div className="info-card">
            <span className="info-icon">⭐</span>
            <div className="info-details">
              <h4 className="info-label">Nakshatra</h4>
              <p className="info-value">{panchangamData?.almanac?.Nakshatra?.name}</p>
              {panchangamData?.almanac?.Nakshatra?.endTime && (
                <span className="info-time">Until {panchangamData.almanac.Nakshatra.endTime}</span>
              )}
            </div>
          </div>
        </div>

        <div className="guidance-section">
          <div className="guidance-card">
            <h4 className="guidance-label">🌙 Tithi Guidance</h4>
            <p className="guidance-text">{guidance.tithi}</p>
          </div>

          <div className="guidance-card">
            <h4 className="guidance-label">⭐ Nakshatra Insight</h4>
            <p className="guidance-text">{guidance.nakshatra}</p>
          </div>
        </div>

        <div className="timings-highlight">
          <h3 className="timings-highlight-title">🕉️ Today's Key Timings</h3>
          <div className="timings-compact">
            <div className="timing-compact-item auspicious">
              <span className="timing-compact-label">Best Time:</span>
              <span className="timing-compact-value">{Object.values(panchangamData?.auspicious || {})[0]}</span>
            </div>
            <div className="timing-compact-item inauspicious">
              <span className="timing-compact-label">Avoid:</span>
              <span className="timing-compact-value">{Object.values(panchangamData?.inauspicious || {})[0]}</span>
            </div>
          </div>
          <p className="timings-note">
            For complete auspicious & inauspicious timings, <Link to="/panchangam">view full Panchangam</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DailyHoroscope;
