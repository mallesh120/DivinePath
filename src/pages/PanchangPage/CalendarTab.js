import React, { useState } from 'react';
import { festivalsData } from '../../data/festivals/festivalsData';
import './PanchangPage.css';

const CalendarTab = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFestival, setSelectedFestival] = useState(null);

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

  // Generate calendar grid
  const renderCalendarDays = () => {
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const totalSlots = [...blanks, ...days];

    return totalSlots.map((day, index) => {
      if (!day) return <div key={`blank-${index}`} className="cal-cell blank"></div>;
      
      const dayFestivals = getFestivalsForDay(day);
      const hasFestival = dayFestivals.length > 0;
      
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();

      return (
        <div 
          key={`day-${day}`} 
          className={`cal-cell ${isToday ? 'today' : ''} ${hasFestival ? 'has-event' : ''}`}
          onClick={() => hasFestival && setSelectedFestival(dayFestivals[0])}
        >
          <span className="cal-date">{day}</span>
          {hasFestival && <span className="cal-dot"></span>}
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

      {/* Interactive Bottom Sheet for Festival Details */}
      {selectedFestival && (
        <>
          <div className="bottom-sheet-overlay" onClick={() => setSelectedFestival(null)}></div>
          <div className="bottom-sheet glass-panel">
            <button className="close-sheet-btn" onClick={() => setSelectedFestival(null)}>×</button>
            <div className="sheet-content">
              <h3>{selectedFestival.name}</h3>
              <p className="sheet-lunar-date">{selectedFestival.lunarDate}</p>
              <p className="sheet-desc">{selectedFestival.description}</p>
              
              <div className="sheet-rituals">
                <h4>Suggested Practices:</h4>
                <ul>
                  {selectedFestival.rituals.map((ritual, idx) => (
                    <li key={idx}>{ritual}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CalendarTab;
