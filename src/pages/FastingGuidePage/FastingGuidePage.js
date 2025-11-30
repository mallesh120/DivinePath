import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  fastingDays,
  getFastingRulesForDay,
  getEkadashiDetails,
  getSpecialFastDetails 
} from '../../data/fastingData';
import './FastingGuidePage.css';

function FastingGuidePage() {
  const [selectedTab, setSelectedTab] = useState('weekly'); // 'weekly', 'ekadashi', 'special'
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSpecial, setSelectedSpecial] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setSelectedTab('weekly');
  };

  const handleSpecialSelect = (festivalName) => {
    setSelectedSpecial(festivalName);
    setSelectedTab('special');
  };

  const renderWeeklyFasting = () => {
    const dayData = selectedDay ? getFastingRulesForDay(selectedDay) : null;

    return (
      <div className="weekly-fasting-section">
        <h2>Weekly Fasting Guide</h2>
        <p className="section-intro">
          Each day of the week is dedicated to a specific deity. Fasting on these days 
          brings blessings and helps develop discipline and devotion.
        </p>

        <div className="days-grid">
          {days.map((day) => {
            const data = getFastingRulesForDay(day);
            return (
              <div
                key={day}
                className={`day-card ${selectedDay === day ? 'selected' : ''}`}
                onClick={() => handleDaySelect(day)}
              >
                <div className="day-name">{day}</div>
                <div className="day-deity">{data.deity}</div>
                <div className="day-icon">
                  {day === 'Monday' ? '🔱' :
                   day === 'Tuesday' ? '🙏' :
                   day === 'Wednesday' ? '🐘' :
                   day === 'Thursday' ? '🪔' :
                   day === 'Friday' ? '🪷' :
                   day === 'Saturday' ? '⚫' : '☀️'}
                </div>
              </div>
            );
          })}
        </div>

        {dayData && (
          <div className="day-details">
            <div className="details-header">
              <h3>{selectedDay} - {dayData.deity}</h3>
            </div>

            <div className="details-content">
              <div className="detail-section">
                <h4>📖 Significance</h4>
                <p>{dayData.significance}</p>
              </div>

              <div className="detail-section">
                <h4>🍽️ Fasting Rules</h4>
                <p>{dayData.fastingRules}</p>
              </div>

              <div className="detail-section">
                <h4>✅ Foods to Eat</h4>
                <div className="food-list">
                  {dayData.foodsToEat.map((food, index) => (
                    <span key={index} className="food-tag allowed">{food}</span>
                  ))}
                </div>
              </div>

              {dayData.foodsToAvoid && dayData.foodsToAvoid.length > 0 && (
                <div className="detail-section">
                  <h4>❌ Foods to Avoid</h4>
                  <div className="food-list">
                    {dayData.foodsToAvoid.map((food, index) => (
                      <span key={index} className="food-tag avoid">{food}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="detail-section benefits">
                <h4>🌟 Benefits</h4>
                <p>{dayData.benefits}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEkadashiFasting = () => {
    const ekadashiData = getEkadashiDetails();

    return (
      <div className="ekadashi-section">
        <h2>Ekadashi Fasting</h2>
        <div className="ekadashi-intro">
          <p>
            Ekadashi occurs twice a month - on the 11th day of the waxing moon (Shukla Paksha) 
            and the 11th day of the waning moon (Krishna Paksha). It is one of the most 
            important fasting days in Hinduism, especially for Lord Vishnu devotees.
          </p>
        </div>

        <div className="ekadashi-details">
          <div className="ekadashi-card">
            <h3>📅 Frequency</h3>
            <p>{ekadashiData.frequency}</p>
          </div>

          <div className="ekadashi-card">
            <h3>🍽️ Fasting Rules</h3>
            <p>{ekadashiData.fastingRules}</p>
          </div>

          <div className="ekadashi-card full-width">
            <h3>❌ Foods to Strictly Avoid</h3>
            <div className="food-grid">
              {ekadashiData.foodsToAvoid.map((food, index) => (
                <span key={index} className="food-tag avoid">{food}</span>
              ))}
            </div>
          </div>

          <div className="ekadashi-card full-width">
            <h3>✅ Permitted Foods</h3>
            <div className="food-grid">
              {ekadashiData.foodsAllowed.map((food, index) => (
                <span key={index} className="food-tag allowed">{food}</span>
              ))}
            </div>
          </div>

          <div className="ekadashi-card">
            <h3>🌅 Breaking the Fast</h3>
            <p>{ekadashiData.breakingFast}</p>
          </div>

          <div className="ekadashi-card benefits">
            <h3>🌟 Benefits</h3>
            <p>{ekadashiData.benefits}</p>
          </div>
        </div>

        <div className="ekadashi-tips">
          <h4>💡 Ekadashi Tips</h4>
          <ul>
            <li>Start preparing mentally a day before</li>
            <li>Avoid heavy physical work on Ekadashi</li>
            <li>Spend time in prayer and meditation</li>
            <li>Read Bhagavad Gita or Vishnu Sahasranama</li>
            <li>Stay awake on Vaikuntha Ekadashi (Margashirsha month)</li>
            <li>Break fast at appropriate time on Dwadashi</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderSpecialFasting = () => {
    const specialFasts = fastingDays.special;

    return (
      <div className="special-fasting-section">
        <h2>Festival-Specific Fasting</h2>
        <p className="section-intro">
          Special fasts observed during major Hindu festivals, each with unique significance and rules.
        </p>

        <div className="special-grid">
          {specialFasts.map((fast) => (
            <div
              key={fast.festival}
              className={`special-card ${selectedSpecial === fast.festival ? 'selected' : ''}`}
              onClick={() => handleSpecialSelect(fast.festival)}
            >
              <div className="special-icon">
                {fast.festival === 'Maha Shivaratri' ? '🔱' :
                 fast.festival === 'Karva Chauth' ? '🌙' :
                 fast.festival === 'Navaratri' ? '🪔' : '🦚'}
              </div>
              <h3>{fast.festival}</h3>
              <p>{fast.significance}</p>
            </div>
          ))}
        </div>

        {selectedSpecial && (
          <div className="special-details">
            {(() => {
              const specialData = getSpecialFastDetails(selectedSpecial);
              return (
                <>
                  <div className="details-header">
                    <h3>{specialData.festival}</h3>
                  </div>

                  <div className="details-content">
                    <div className="detail-section">
                      <h4>📖 Significance</h4>
                      <p>{specialData.significance}</p>
                    </div>

                    <div className="detail-section">
                      <h4>🍽️ Fasting Rules</h4>
                      <p>{specialData.fastingRules}</p>
                    </div>

                    <div className="detail-section">
                      <h4>✅ What to Eat/Drink</h4>
                      <div className="food-list">
                        {specialData.whatToEat.map((food, index) => (
                          <span key={index} className="food-tag allowed">{food}</span>
                        ))}
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>❌ What to Avoid</h4>
                      <div className="food-list">
                        {specialData.whatToAvoid.map((food, index) => (
                          <span key={index} className="food-tag avoid">{food}</span>
                        ))}
                      </div>
                    </div>

                    {specialData.specialNotes && (
                      <div className="detail-section special-notes">
                        <h4>📝 Special Notes</h4>
                        <p>{specialData.specialNotes}</p>
                      </div>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fasting-guide-page">
      <div className="fasting-header">
        <h1>🍃 Fasting Guide</h1>
        <p className="fasting-subtitle">Complete Guide to Hindu Fasting Traditions</p>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${selectedTab === 'weekly' ? 'active' : ''}`}
            onClick={() => setSelectedTab('weekly')}
          >
            Weekly Fasting
          </button>
          <button
            className={`tab ${selectedTab === 'ekadashi' ? 'active' : ''}`}
            onClick={() => setSelectedTab('ekadashi')}
          >
            Ekadashi
          </button>
          <button
            className={`tab ${selectedTab === 'special' ? 'active' : ''}`}
            onClick={() => setSelectedTab('special')}
          >
            Festival Fasts
          </button>
        </div>
      </div>

      <div className="content-area">
        {selectedTab === 'weekly' && renderWeeklyFasting()}
        {selectedTab === 'ekadashi' && renderEkadashiFasting()}
        {selectedTab === 'special' && renderSpecialFasting()}
      </div>

      <div className="fasting-footer">
        <div className="general-tips">
          <h3>💡 General Fasting Tips</h3>
          <div className="tips-grid">
            <div className="tip">
              <span className="tip-icon">💧</span>
              <h4>Stay Hydrated</h4>
              <p>Drink plenty of water throughout the fast</p>
            </div>
            <div className="tip">
              <span className="tip-icon">🧘</span>
              <h4>Rest Well</h4>
              <p>Avoid strenuous activities while fasting</p>
            </div>
            <div className="tip">
              <span className="tip-icon">🙏</span>
              <h4>Stay Positive</h4>
              <p>Focus on prayers and meditation</p>
            </div>
            <div className="tip">
              <span className="tip-icon">🍎</span>
              <h4>Break Mindfully</h4>
              <p>Don't overeat when breaking the fast</p>
            </div>
          </div>
        </div>

        <div className="disclaimer">
          <h4>⚠️ Health Advisory</h4>
          <p>
            If you have any health conditions (diabetes, pregnancy, etc.), consult your doctor 
            before fasting. Listen to your body and break the fast if you feel unwell.
          </p>
        </div>

        <Link to="/dashboard" className="back-button">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default FastingGuidePage;
