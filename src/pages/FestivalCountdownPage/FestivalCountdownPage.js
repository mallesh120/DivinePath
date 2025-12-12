import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  getUpcomingFestivals, 
  getCurrentChecklist,
  saveChecklistProgress,
  loadChecklistProgress,
  getChecklistCompletion 
} from '../../data/festivals/festivalChecklistData';
import './FestivalCountdownPage.css';

function FestivalCountdownPage() {
  const [upcomingFestivals, setUpcomingFestivals] = useState([]);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [checklist, setChecklist] = useState([]);

  useEffect(() => {
    const festivals = getUpcomingFestivals();
    setUpcomingFestivals(festivals);
    
    if (festivals.length > 0 && !selectedFestival) {
      setSelectedFestival(festivals[0]);
    }
  }, [selectedFestival]);

  useEffect(() => {
    if (selectedFestival) {
      const currentChecklist = getCurrentChecklist(selectedFestival);
      const savedProgress = loadChecklistProgress(selectedFestival.id);
      
      if (savedProgress) {
        // Merge saved progress with current checklist
        const mergedChecklist = currentChecklist.map(item => {
          const savedItem = savedProgress.find(s => s.task === item.task);
          return savedItem || item;
        });
        setChecklist(mergedChecklist);
      } else {
        setChecklist(currentChecklist);
      }
    }
  }, [selectedFestival]);

  const handleCheckboxChange = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].done = !updatedChecklist[index].done;
    setChecklist(updatedChecklist);
    
    if (selectedFestival) {
      saveChecklistProgress(selectedFestival.id, updatedChecklist);
    }
  };

  const groupByCategory = (items) => {
    const grouped = {};
    items.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Home': '🏠',
      'Shopping': '🛒',
      'Food': '🍽️',
      'Spiritual': '🙏',
      'Decoration': '🎨',
      'Social': '👥',
      'Personal': '👤',
      'Preparation': '📋',
      'Celebration': '🎉',
      'General': '📌'
    };
    return icons[category] || '•';
  };

  if (upcomingFestivals.length === 0) {
    return (
      <div className="festival-countdown-page">
        <div className="festival-header">
          <h1>🎊 Festival Countdown</h1>
          <p className="festival-subtitle">No major festivals in the next 90 days</p>
        </div>
        <div className="empty-state">
          <p>Check back later for upcoming festival preparations!</p>
          <Link to="/dashboard" className="back-button">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const completion = getChecklistCompletion(checklist);

  return (
    <div className="festival-countdown-page">
      <div className="festival-header">
        <h1>🎊 Festival Countdown</h1>
        <p className="festival-subtitle">Prepare for Upcoming Celebrations</p>
      </div>

      <div className="festivals-overview">
        <h2>Upcoming Festivals (Next 90 Days)</h2>
        <div className="festivals-grid">
          {upcomingFestivals.map((festival) => (
            <div
              key={festival.id}
              className={`festival-card ${selectedFestival?.id === festival.id ? 'selected' : ''}`}
              onClick={() => setSelectedFestival(festival)}
            >
              <div className="festival-name">{festival.name}</div>
              <div className="countdown">
                {festival.daysToGo === 0 ? (
                  <span className="today">TODAY!</span>
                ) : (
                  <>
                    <span className="days">{festival.daysToGo}</span>
                    <span className="label">days to go</span>
                  </>
                )}
              </div>
              <div className="festival-date">
                {new Date(festival.date).toLocaleDateString('en-IN', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFestival && (
        <div className="festival-details-section">
          <div className="festival-info-card">
            <div className="festival-info-header">
              <h2>{selectedFestival.name}</h2>
              <div className="countdown-badge">
                {selectedFestival.daysToGo === 0 ? 'TODAY!' : `${selectedFestival.daysToGo} Days`}
              </div>
            </div>
            
            <div className="festival-meta">
              <div className="meta-item">
                <span className="meta-label">📅 Date:</span>
                <span className="meta-value">
                  {new Date(selectedFestival.date).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="meta-item">
                <span className="meta-label">⏱️ Duration:</span>
                <span className="meta-value">{selectedFestival.duration}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">📖 Significance:</span>
                <span className="meta-value">{selectedFestival.significance}</span>
              </div>
              {selectedFestival.mainDay && (
                <div className="meta-item">
                  <span className="meta-label">🌟 Main Day:</span>
                  <span className="meta-value">{selectedFestival.mainDay}</span>
                </div>
              )}
            </div>

            <div className="puja-info">
              <h3>🙏 Puja Details</h3>
              <div className="puja-grid">
                <div className="puja-section">
                  <h4>Required Items:</h4>
                  <div className="items-list">
                    {selectedFestival.puja.items.map((item, index) => (
                      <span key={index} className="item-tag">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="puja-section">
                  <h4>⏰ Timing:</h4>
                  <p>{selectedFestival.puja.timing}</p>
                </div>
                <div className="puja-section">
                  <h4>🕉️ Mantra:</h4>
                  <p className="mantra">{selectedFestival.puja.mantra}</p>
                </div>
              </div>
            </div>

            <div className="shopping-list">
              <h3>🛒 Shopping List</h3>
              <div className="shopping-items">
                {selectedFestival.shopping.map((item, index) => (
                  <span key={index} className="shopping-tag">{item}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="checklist-section">
            <div className="checklist-header">
              <h3>
                📋 Preparation Checklist 
                {selectedFestival.daysToGo === 0 ? ' (Today)' :
                 selectedFestival.daysToGo === 1 ? ' (1 Day Before)' :
                 selectedFestival.daysToGo <= 3 ? ' (3 Days Before)' :
                 selectedFestival.daysToGo <= 7 ? ' (1 Week Before)' :
                 selectedFestival.daysToGo <= 15 ? ' (2 Weeks Before)' :
                 ' (1 Month Before)'}
              </h3>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${completion}%` }}
                ></div>
                <span className="progress-text">{completion}% Complete</span>
              </div>
            </div>

            {checklist.length > 0 ? (
              <div className="checklist-content">
                {Object.entries(groupByCategory(checklist)).map(([category, items]) => (
                  <div key={category} className="category-group">
                    <h4 className="category-title">
                      {getCategoryIcon(category)} {category}
                    </h4>
                    <div className="tasks-list">
                      {items.map((item, index) => {
                        const globalIndex = checklist.indexOf(item);
                        return (
                          <div key={globalIndex} className="task-item">
                            <label className="checkbox-label">
                              <input
                                type="checkbox"
                                checked={item.done}
                                onChange={() => handleCheckboxChange(globalIndex)}
                              />
                              <span className={`task-text ${item.done ? 'completed' : ''}`}>
                                {item.task}
                              </span>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-checklist">
                <p>All preparations completed! Enjoy the festival! 🎉</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="festival-footer">
        <Link to="/dashboard" className="back-button">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default FestivalCountdownPage;
