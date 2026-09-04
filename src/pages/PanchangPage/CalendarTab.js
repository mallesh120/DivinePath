import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Observer } from '@ishubhamx/panchangam-js';
import { getAllFestivalsWithCalculated } from '../../data/festivals/festivalsData';
import { calculateBasicPanchang, usePanchangam } from '../../hooks/usePanchangam';
import './PanchangPage.css';

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CalendarTab = (props) => {
  const hookData = usePanchangam();
  const location = props.location || hookData.location;
  const placeName = props.placeName || hookData.placeName;
  const currentCity = props.currentCity || hookData.currentCity;
  const setCity = props.setCity || hookData.setCity;
  const cities = props.cities || hookData.cities;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayDetails, setSelectedDayDetails] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  // Create observer based on user location
  const targetObserver = useMemo(() => {
    if (location && typeof location.latitude === 'number') {
      return new Observer(location.latitude, location.longitude, location.elevation || 0.2);
    }
    return null;
  }, [location]);

  // Load festivals for viewed year
  const yearFestivals = useMemo(() => {
    try {
      return getAllFestivalsWithCalculated(year - 1, year + 1, location);
    } catch (e) {
      return [];
    }
  }, [year, location]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const jumpToToday = () => setCurrentDate(new Date());

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedDayDetails(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Find festivals for a given day
  const getFestivalsForDay = useCallback((day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return yearFestivals.filter(f => f.date === formattedDate || (f.date <= formattedDate && f.endDate >= formattedDate));
  }, [year, month, yearFestivals]);

  const handleDayClick = (day, dayFestivals, panchang) => {
    setSelectedDayDetails({
      day,
      month,
      year,
      festivals: dayFestivals,
      panchang
    });
  };

  // Generate calendar grid
  const renderCalendarDays = () => {
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const totalSlots = [...blanks, ...days];

    const todayDate = new Date();
    const isCurrentMonth = todayDate.getFullYear() === year && todayDate.getMonth() === month;

    return totalSlots.map((day, index) => {
      if (!day) return <div key={`blank-${index}`} className="cal-cell blank"></div>;

      const dayFestivals = getFestivalsForDay(day);
      const hasFestival = dayFestivals.length > 0;

      const panchang = calculateBasicPanchang(year, month, day, targetObserver, location?.timezone);
      const isToday = isCurrentMonth && todayDate.getDate() === day;

      return (
        <div 
          key={`day-${day}`} 
          className={`cal-cell ${isToday ? 'today' : ''} ${hasFestival ? 'has-event' : ''}`}
          onClick={() => handleDayClick(day, dayFestivals, panchang)}
          role="button"
          tabIndex={0}
        >
          <span className="cal-date">{day}</span>
          <div className="cal-panchang-info">
            <div className="cal-tithi" title={`Tithi: ${panchang.tithi}`}>{panchang.tithi}</div>
            <div className="cal-nakshatra" title={`Nakshatra: ${panchang.nakshatra}`}>{panchang.nakshatra}</div>
          </div>
          <div className="cal-indicators">
            {panchang.isPurnima && <span className="moon-icon purnima" title="Purnima (Full Moon)">🌕</span>}
            {panchang.isAmavasya && <span className="moon-icon amavasya" title="Amavasya (New Moon)">🌑</span>}
            {panchang.isEkadashi && <span className="moon-icon ekadashi" title="Ekadashi Fasting">🌸</span>}
            {hasFestival && <span className="cal-dot" title={dayFestivals.map(f => f.name).join(', ')}></span>}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="calendar-tab-container">
      {/* Calendar Header with Controls */}
      <div className="cal-header glass-panel">
        <div className="cal-header-left">
          <button className="cal-nav-btn" onClick={prevMonth} title="Previous Month" aria-label="Previous Month">‹</button>
          <div className="cal-title-selects">
            <select 
              value={month} 
              onChange={(e) => setCurrentDate(new Date(year, Number(e.target.value), 1))}
              className="cal-month-select"
            >
              {MONTH_NAMES.map((m, idx) => (
                <option key={m} value={idx}>{m}</option>
              ))}
            </select>
            <select
              value={year}
              onChange={(e) => setCurrentDate(new Date(Number(e.target.value), month, 1))}
              className="cal-year-select"
            >
              {Array.from({ length: 30 }, (_, i) => 2020 + i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <button className="cal-nav-btn" onClick={nextMonth} title="Next Month" aria-label="Next Month">›</button>
          <button className="cal-today-btn" onClick={jumpToToday} title="Jump to Today">Today</button>
        </div>

        {/* Location selector */}
        <div className="location-picker-group">
          <span className="location-pin-icon">📍</span>
          <select 
            value={currentCity}
            onChange={(e) => setCity && setCity(e.target.value)}
            className="today-city-select"
            aria-label="Select City"
          >
            {cities && cities.map(c => (
              <option key={c.id} value={c.id}>
                {c.id === 'auto' && placeName ? `${placeName} (Current)` : c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="cal-grid-container glass-panel">
        <div className="cal-weekdays">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
        <div className="cal-grid">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Legend */}
      <div className="cal-legend glass-panel">
        <div className="legend-item"><span className="legend-icon">🌕</span> Purnima</div>
        <div className="legend-item"><span className="legend-icon">🌑</span> Amavasya</div>
        <div className="legend-item"><span className="legend-icon">🌸</span> Ekadashi</div>
        <div className="legend-item"><span className="legend-dot"></span> Festival / Event</div>
      </div>

      {/* Interactive Bottom Sheet for Day Details */}
      {selectedDayDetails && (
        <>
          <div className="bottom-sheet-overlay" onClick={() => setSelectedDayDetails(null)}></div>
          <div className="bottom-sheet glass-panel scrollable-sheet">
            <button className="close-sheet-btn" onClick={() => setSelectedDayDetails(null)} aria-label="Close">×</button>
            <div className="sheet-content">
              <div className="sheet-header">
                <h3>{MONTH_NAMES[selectedDayDetails.month]} {selectedDayDetails.day}, {selectedDayDetails.year}</h3>
                <span className="sheet-day-tag">{selectedDayDetails.panchang.vara}</span>
              </div>
              <p className="sheet-lunar-date">
                {selectedDayDetails.panchang.hinduMonth} • {selectedDayDetails.panchang.tithi} ({selectedDayDetails.panchang.paksha})
              </p>
              <div className="sheet-sun-row">
                <span>🌅 Sunrise: <strong>{selectedDayDetails.panchang.sunrise}</strong></span>
                <span>🌇 Sunset: <strong>{selectedDayDetails.panchang.sunset}</strong></span>
                <span>📍 <strong>{placeName}</strong></span>
              </div>
              
              {/* Festivals on this day */}
              {selectedDayDetails.festivals.length > 0 && (
                <div className="sheet-section festival-highlight-section">
                  <h4 className="section-title">🪔 Festivals & Observances:</h4>
                  {selectedDayDetails.festivals.map((fest, idx) => (
                    <div key={idx} className="festival-detail-card">
                      <div className="festival-detail-header">
                        <strong>{fest.name}</strong>
                        {fest.pujaId && (
                          <Link to={`/puja/${fest.pujaId}`} className="sheet-puja-link">
                            Puja Vidhi 🪔
                          </Link>
                        )}
                      </div>
                      <p>{fest.description}</p>
                      {fest.rituals && fest.rituals.length > 0 && (
                        <div className="sheet-rituals">
                          <span className="rituals-title">Rituals & Traditions:</span>
                          <ul className="sheet-rituals-list">
                            {fest.rituals.map((r, i) => <li key={i}>{r}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Panchang Details */}
              <div className="sheet-section">
                <h4 className="section-title">Panchang Planetary Details:</h4>
                <div className="panchang-grid">
                  <div className="panchang-item"><span>Nakshatra:</span> {selectedDayDetails.panchang.nakshatra}</div>
                  <div className="panchang-item"><span>Moon Sign (Rashi):</span> {selectedDayDetails.panchang.moonRashi || selectedDayDetails.panchang.rashi}</div>
                  <div className="panchang-item"><span>Sun Sign:</span> {selectedDayDetails.panchang.sunRashi}</div>
                  <div className="panchang-item"><span>Yoga:</span> {selectedDayDetails.panchang.yoga}</div>
                  <div className="panchang-item"><span>Karana:</span> {selectedDayDetails.panchang.karana}</div>
                  <div className="panchang-item"><span>Moon Phase:</span> {selectedDayDetails.panchang.moonPhase} ({selectedDayDetails.panchang.moonIllumination}%)</div>
                </div>
              </div>

              {/* Auspicious Timings */}
              <div className="sheet-section">
                <h4 className="section-title success">✨ Auspicious Timings (Shubha)</h4>
                <div className="timings-grid">
                  {Object.entries(selectedDayDetails.panchang.auspicious).map(([key, val]) => (
                    val && val !== 'N/A' && (
                      <div key={key} className="timing-box good">
                        <strong>{key}</strong>
                        <span>{val}</span>
                      </div>
                    )
                  ))}
                  {Object.values(selectedDayDetails.panchang.auspicious).every(v => !v || v === 'N/A') && (
                    <p className="timing-placeholder">No specific auspicious timings recorded for this date.</p>
                  )}
                </div>
              </div>

              {/* Inauspicious Timings */}
              <div className="sheet-section">
                <h4 className="section-title warning">⚠️ Inauspicious Timings (Avoid)</h4>
                <div className="timings-grid">
                  {Object.entries(selectedDayDetails.panchang.inauspicious).map(([key, val]) => (
                    val && val !== 'N/A' && (
                      <div key={key} className="timing-box bad">
                        <strong>{key}</strong>
                        <span>{val}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarTab;
