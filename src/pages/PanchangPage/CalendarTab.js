import React, { useState } from 'react';
import { festivalsData } from '../../data/festivals/festivalsData';
import { calculateBasicPanchang } from '../../hooks/usePanchangam';
import './PanchangPage.css';

const CalendarTab = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayDetails, setSelectedDayDetails] = useState(null);

  // Calendar logic
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sunday
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Find festivals for a given day
  const getFestivalsForDay = (day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return festivalsData.filter(f => f.date === formattedDate || (f.date <= formattedDate && f.endDate >= formattedDate));
  };

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

    return totalSlots.map((day, index) => {
      if (!day) return <div key={`blank-${index}`} className="cal-cell blank"></div>;
      
      const dayFestivals = getFestivalsForDay(day);
      const hasFestival = dayFestivals.length > 0;
      
      const panchang = calculateBasicPanchang(year, month, day);
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

      return (
        <div 
          key={`day-${day}`} 
          className={`cal-cell ${isToday ? 'today' : ''} ${hasFestival ? 'has-event' : ''}`}
          onClick={() => handleDayClick(day, dayFestivals, panchang)}
        >
          <span className="cal-date">{day}</span>
          <div className="cal-panchang-info">
            <div className="cal-tithi" title={panchang.tithi}>{panchang.tithi}</div>
            <div className="cal-nakshatra" title={panchang.nakshatra}>{panchang.nakshatra}</div>
          </div>
          <div className="cal-indicators">
            {panchang.isPurnima && <span className="moon-icon purnima" title="Purnima">🌕</span>}
            {panchang.isAmavasya && <span className="moon-icon amavasya" title="Amavasya">🌑</span>}
            {hasFestival && <span className="cal-dot"></span>}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="calendar-tab-container">
      {/* Calendar Header */}
      <div className="cal-header glass-panel">
        <button className="cal-nav-btn" onClick={prevMonth}>&lt;</button>
        <h2 className="cal-month-title">{monthNames[month]} {year}</h2>
        <button className="cal-nav-btn" onClick={nextMonth}>&gt;</button>
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

      {/* Interactive Bottom Sheet for Day Details */}
      {selectedDayDetails && (
        <>
          <div className="bottom-sheet-overlay" onClick={() => setSelectedDayDetails(null)}></div>
          <div className="bottom-sheet glass-panel scrollable-sheet">
            <button className="close-sheet-btn" onClick={() => setSelectedDayDetails(null)}>×</button>
            <div className="sheet-content">
              <h3>{monthNames[selectedDayDetails.month]} {selectedDayDetails.day}, {selectedDayDetails.year}</h3>
              <p className="sheet-lunar-date">
                {selectedDayDetails.panchang.hinduMonth} • {selectedDayDetails.panchang.tithi} {selectedDayDetails.panchang.paksha}
              </p>
              
              {selectedDayDetails.festivals.length > 0 && (
                <div className="sheet-section">
                  <h4 className="section-title">Festivals:</h4>
                  {selectedDayDetails.festivals.map((fest, idx) => (
                    <div key={idx} className="festival-detail">
                      <strong>{fest.name}</strong>
                      <p>{fest.description}</p>
                      {fest.rituals && fest.rituals.length > 0 && (
                        <ul className="sheet-rituals-list">
                          {fest.rituals.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="sheet-section">
                <h4 className="section-title">Panchang Details:</h4>
                <div className="panchang-grid">
                  <div className="panchang-item"><span>Nakshatra:</span> {selectedDayDetails.panchang.nakshatra}</div>
                  <div className="panchang-item"><span>Yoga:</span> {selectedDayDetails.panchang.yoga}</div>
                  <div className="panchang-item"><span>Karana:</span> {selectedDayDetails.panchang.karana}</div>
                  <div className="panchang-item"><span>Moon Phase:</span> {selectedDayDetails.panchang.moonPhase}</div>
                </div>
              </div>

              <div className="sheet-section">
                <h4 className="section-title success">✨ Auspicious Timings</h4>
                <div className="timings-grid">
                  {Object.entries(selectedDayDetails.panchang.auspicious).map(([key, val]) => (
                    val !== 'N/A' && <div key={key} className="timing-box good"><strong>{key}</strong><br/>{val}</div>
                  ))}
                  {Object.values(selectedDayDetails.panchang.auspicious).every(v => v === 'N/A') && (
                    <p className="timing-placeholder">No specific auspicious timings for this day.</p>
                  )}
                </div>
              </div>

              <div className="sheet-section">
                <h4 className="section-title warning">⚠️ Inauspicious Timings</h4>
                <div className="timings-grid">
                  {Object.entries(selectedDayDetails.panchang.inauspicious).map(([key, val]) => (
                    val !== 'N/A' && <div key={key} className="timing-box bad"><strong>{key}</strong><br/>{val}</div>
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
