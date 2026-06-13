import React from 'react';
import './StreakCalendar.css';

const StreakCalendar = ({ streak, completionHistory }) => {
  // Generate the last 7 days
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last7Days.push(d);
  }

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
  };

  const isCompleted = (date) => {
    const dateStr = date.toLocaleDateString();
    return completionHistory.includes(dateStr);
  };

  return (
    <div className="streak-calendar-container">
      <div className="streak-header">
        <div className="streak-fire">
          <span className="fire-icon">🔥</span>
          <span className="streak-count">{streak} Day Streak</span>
        </div>
      </div>
      
      <div className="streak-days">
        {last7Days.map((date, index) => {
          const completed = isCompleted(date);
          const isToday = index === 6;
          
          return (
            <div key={index} className={`streak-day-item ${isToday ? 'is-today' : ''}`}>
              <div className={`streak-circle ${completed ? 'completed' : ''}`}>
                {completed && '✓'}
              </div>
              <span className="streak-day-label">{getDayName(date)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StreakCalendar;
