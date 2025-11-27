import React from 'react';
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
        <h2 className="horoscope-title">🌟 Daily Guidance from Panchangam</h2>
        <div className="horoscope-meta">
          <span className="horoscope-location">📍 {panchangamData?.meta?.location}</span>
          <span className="horoscope-day">📅 {panchangamData?.meta?.day}</span>
        </div>
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

        <div className="timings-section">
          <h3 className="section-heading">🕉️ Auspicious Times</h3>
          <div className="timings-grid">
            {Object.entries(panchangamData?.auspicious || {}).map(([name, time]) => (
              <div key={name} className="timing-item auspicious">
                <span className="timing-name">{name}</span>
                <span className="timing-value">{time}</span>
              </div>
            ))}
          </div>

          <h3 className="section-heading">⚠️ Avoid These Times</h3>
          <div className="timings-grid">
            {Object.entries(panchangamData?.inauspicious || {}).map(([name, time]) => (
              <div key={name} className="timing-item inauspicious">
                <span className="timing-name">{name}</span>
                <span className="timing-value">{time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="solar-info">
          <div className="solar-item">
            <span className="solar-icon">🌅</span>
            <div>
              <p className="solar-label">Sunrise</p>
              <p className="solar-value">{panchangamData?.solarLunar?.Sunrise}</p>
            </div>
          </div>
          <div className="solar-item">
            <span className="solar-icon">🌇</span>
            <div>
              <p className="solar-label">Sunset</p>
              <p className="solar-value">{panchangamData?.solarLunar?.Sunset}</p>
            </div>
          </div>
          <div className="solar-item">
            <span className="solar-icon">🌔</span>
            <div>
              <p className="solar-label">Moonrise</p>
              <p className="solar-value">{panchangamData?.solarLunar?.Moonrise}</p>
            </div>
          </div>
          <div className="solar-item">
            <span className="solar-icon">🌘</span>
            <div>
              <p className="solar-label">Moonset</p>
              <p className="solar-value">{panchangamData?.solarLunar?.Moonset}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyHoroscope;
