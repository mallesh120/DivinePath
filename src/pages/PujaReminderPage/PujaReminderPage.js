import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  deityDays,
  pujaTypes,
  getTodayPujaInfo,
  checkNotificationPermission,
  requestNotificationPermission,
  saveReminderSettings,
  loadReminderSettings,
  defaultReminderSettings,
  sendPujaReminder,
  getPujaStreak,
  markPujaCompleted,
  getNextReminderTime
} from '../../data/pujas/pujaReminderData';
import './PujaReminderPage.css';

function PujaReminderPage() {
  const [settings, setSettings] = useState(defaultReminderSettings);
  const [notificationPermission, setNotificationPermission] = useState('default');
  const [streak, setStreak] = useState(0);
  const [todayCompleted, setTodayCompleted] = useState(false);
  const [selectedPujaType, setSelectedPujaType] = useState(null);
  const todayPuja = getTodayPujaInfo();

  useEffect(() => {
    const savedSettings = loadReminderSettings();
    setSettings(savedSettings);
    const permission = checkNotificationPermission();
    setNotificationPermission(permission);
    updateStreak();
    checkTodayCompletion();
  }, []);

  const updateStreak = () => {
    const currentStreak = getPujaStreak();
    setStreak(currentStreak);
  };

  const checkTodayCompletion = () => {
    const today = new Date().toISOString().split('T')[0];
    const history = JSON.parse(localStorage.getItem('puja_history') || '[]');
    const completed = history.some(h => h.date === today);
    setTodayCompleted(completed);
  };

  const handleEnableNotifications = async () => {
    const permission = await requestNotificationPermission();
    setNotificationPermission(permission);
    
    if (permission === 'granted') {
      const updatedSettings = { ...settings, enabled: true };
      setSettings(updatedSettings);
      saveReminderSettings(updatedSettings);
    }
  };

  const handleSettingChange = (path, value) => {
    const keys = path.split('.');
    const updatedSettings = { ...settings };
    let current = updatedSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setSettings(updatedSettings);
    saveReminderSettings(updatedSettings);
  };

  const handleToggleDailyDay = (day) => {
    const days = [...settings.dailyReminder.days];
    const index = days.indexOf(day);
    
    if (index > -1) {
      days.splice(index, 1);
    } else {
      days.push(day);
    }
    
    handleSettingChange('dailyReminder.days', days);
  };

  const handleMarkCompleted = (pujaType) => {
    markPujaCompleted(pujaType);
    updateStreak();
    checkTodayCompletion();
    setSelectedPujaType(null);
  };

  const handleTestNotification = () => {
    if (notificationPermission === 'granted') {
      sendPujaReminder(todayPuja);
    }
  };

  const nextReminderTime = getNextReminderTime(settings);

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="puja-reminder-page">
      <div className="puja-header">
        <h1>🙏 Puja Reminders</h1>
        <p className="puja-subtitle">Never Miss Your Daily Worship</p>
      </div>

      <div className="today-puja-card">
        <div className="card-header">
          <h2>Today's Puja</h2>
          {todayCompleted && <span className="completed-badge">✓ Completed Today</span>}
        </div>
        
        <div className="today-content">
          <div className="deity-info">
            <div className="deity-icon">{todayPuja.color === 'White' ? '🔱' :
              todayPuja.color === 'Red' ? '🙏' :
              todayPuja.color === 'Green' ? '🐘' :
              todayPuja.color === 'Yellow' ? '🪔' :
              todayPuja.color === 'White/Red' ? '🪷' :
              todayPuja.color === 'Black/Blue' ? '⚫' : '☀️'}</div>
            <div>
              <h3>{todayPuja.deity}</h3>
              <div className="puja-meta">
                <span>⏰ {todayPuja.timing}</span>
                <span>⏱️ {todayPuja.duration}</span>
                <span>🎨 Color: {todayPuja.color}</span>
              </div>
            </div>
          </div>

          <div className="puja-details">
            <div className="detail-group">
              <h4>🕉️ Mantra</h4>
              <p className="mantra-text">{todayPuja.mantra}</p>
            </div>

            <div className="detail-group">
              <h4>🌺 Offerings</h4>
              <div className="offerings-list">
                {todayPuja.offerings.map((offering, index) => (
                  <span key={index} className="offering-tag">{offering}</span>
                ))}
              </div>
            </div>

            <div className="detail-group">
              <h4>🌟 Benefits</h4>
              <p>{todayPuja.benefits}</p>
            </div>
          </div>

          {!todayCompleted && (
            <button 
              className="complete-btn"
              onClick={() => handleMarkCompleted('daily')}
            >
              Mark as Completed
            </button>
          )}
        </div>

        <div className="streak-display">
          <span className="streak-icon">🔥</span>
          <span className="streak-number">{streak}</span>
          <span className="streak-label">Day Streak</span>
        </div>
      </div>

      <div className="puja-types-section">
        <h2>Puja Types</h2>
        <div className="puja-types-grid">
          {pujaTypes.map((type) => (
            <div
              key={type.id}
              className={`puja-type-card ${selectedPujaType?.id === type.id ? 'selected' : ''}`}
              onClick={() => setSelectedPujaType(type)}
            >
              <div className="type-icon">
                {type.id === 'daily' ? '📿' :
                 type.id === 'morning' ? '🌅' :
                 type.id === 'evening' ? '🌆' : '🎊'}
              </div>
              <h3>{type.name}</h3>
              <p>{type.description}</p>
              {type.timing && <span className="timing-badge">{type.timing}</span>}
            </div>
          ))}
        </div>

        {selectedPujaType && (
          <div className="puja-type-details">
            <h3>{selectedPujaType.name} Guide</h3>
            <div className="details-content">
              <div className="detail-section">
                <h4>⏱️ Duration</h4>
                <p>{selectedPujaType.duration}</p>
              </div>

              <div className="detail-section">
                <h4>🛍️ Required Items</h4>
                <div className="items-list">
                  {selectedPujaType.items.map((item, index) => (
                    <span key={index} className="item-tag">{item}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>📋 Steps</h4>
                <ol className="steps-list">
                  {selectedPujaType.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <button 
                className="complete-btn"
                onClick={() => handleMarkCompleted(selectedPujaType.id)}
              >
                Mark as Completed
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="reminder-settings-section">
        <h2>⚙️ Reminder Settings</h2>

        <div className="notification-status">
          {notificationPermission === 'granted' ? (
            <div className="status-granted">
              <span className="status-icon">✅</span>
              <span>Notifications Enabled</span>
              <button className="test-btn" onClick={handleTestNotification}>
                Test Notification
              </button>
            </div>
          ) : notificationPermission === 'denied' ? (
            <div className="status-denied">
              <span className="status-icon">❌</span>
              <span>Notifications Blocked - Please enable in browser settings</span>
            </div>
          ) : (
            <div className="status-default">
              <span className="status-icon">🔔</span>
              <button className="enable-btn" onClick={handleEnableNotifications}>
                Enable Notifications
              </button>
            </div>
          )}
        </div>

        <div className="settings-form">
          <div className="setting-group">
            <label className="setting-label">
              <input
                type="checkbox"
                checked={settings.dailyReminder.enabled}
                onChange={(e) => handleSettingChange('dailyReminder.enabled', e.target.checked)}
              />
              <span>Daily Reminder</span>
            </label>
            
            {settings.dailyReminder.enabled && (
              <>
                <div className="time-picker">
                  <label>Reminder Time:</label>
                  <input
                    type="time"
                    value={settings.dailyReminder.time}
                    onChange={(e) => handleSettingChange('dailyReminder.time', e.target.value)}
                  />
                </div>

                <div className="days-selector">
                  <label>Days:</label>
                  <div className="days-grid">
                    {days.map((day) => (
                      <button
                        key={day}
                        className={`day-btn ${settings.dailyReminder.days.includes(day) ? 'active' : ''}`}
                        onClick={() => handleToggleDailyDay(day)}
                      >
                        {day.substring(0, 3).toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="next-reminder-info">
                  Next reminder: {nextReminderTime.toLocaleString()}
                </div>
              </>
            )}
          </div>

          <div className="setting-group">
            <label className="setting-label">
              <input
                type="checkbox"
                checked={settings.specialDays.enabled}
                onChange={(e) => handleSettingChange('specialDays.enabled', e.target.checked)}
              />
              <span>Special Days Reminders</span>
            </label>

            {settings.specialDays.enabled && (
              <div className="special-days-options">
                <label className="sub-setting">
                  <input
                    type="checkbox"
                    checked={settings.specialDays.ekadashi}
                    onChange={(e) => handleSettingChange('specialDays.ekadashi', e.target.checked)}
                  />
                  <span>Ekadashi</span>
                </label>
                <label className="sub-setting">
                  <input
                    type="checkbox"
                    checked={settings.specialDays.purnima}
                    onChange={(e) => handleSettingChange('specialDays.purnima', e.target.checked)}
                  />
                  <span>Purnima (Full Moon)</span>
                </label>
                <label className="sub-setting">
                  <input
                    type="checkbox"
                    checked={settings.specialDays.amavasya}
                    onChange={(e) => handleSettingChange('specialDays.amavasya', e.target.checked)}
                  />
                  <span>Amavasya (New Moon)</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="puja-footer">
        <div className="weekly-calendar">
          <h3>Weekly Deity Days</h3>
          <div className="calendar-grid">
            {Object.entries(deityDays).map(([day, info]) => (
              <div key={day} className="calendar-day">
                <div className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                <div className="day-deity">{info.deity}</div>
                <div className="day-color" style={{ background: info.color.toLowerCase() }}></div>
              </div>
            ))}
          </div>
        </div>

        <Link to="/dashboard" className="back-button">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default PujaReminderPage;
