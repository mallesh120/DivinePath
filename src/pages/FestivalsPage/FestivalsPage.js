import React, { useState, useMemo, useEffect } from 'react';
import { sortFestivalsByDate, getAllFestivalsWithCalculated } from '../../data/festivalsData';
import FestivalCard from '../../components/FestivalCard/FestivalCard';
import { getLocationForFestivals, WORLD_CITIES, setUserLocation } from '../../utils/locationService';
import './FestivalsPage.css';

const FestivalsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Add year filter
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'name'
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [userLocation, setUserLocationState] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  // Get user location on mount
  useEffect(() => {
    const loadLocation = async () => {
      const location = await getLocationForFestivals();
      setUserLocationState(location);
    };
    loadLocation();
  }, []);

  // Get all festivals including calculated ones for 2020-2120
  const allFestivals = useMemo(() => 
    getAllFestivalsWithCalculated(2020, 2120, userLocation), 
    [userLocation]
  );

  // Create a map of festivals by date for calendar display
  const festivalsByDate = useMemo(() => {
    const dateMap = {};
    
    allFestivals.forEach(festival => {
      if (festival.date) {
        const startDate = new Date(festival.date);
        const endDate = festival.endDate ? new Date(festival.endDate) : startDate;
        
        // Add festival to all dates in its range
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
          
          if (!dateMap[dateKey]) {
            dateMap[dateKey] = [];
          }
          dateMap[dateKey].push(festival);
          
          // Move to next day
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });
    
    return dateMap;
  }, [allFestivals]);

  // Get min and max years from festival data
  const { minYear, maxYear } = useMemo(() => {
    const years = allFestivals
      .filter(f => f.date)
      .map(f => new Date(f.date).getFullYear());
    
    return {
      minYear: Math.min(...years),
      maxYear: Math.max(...years)
    };
  }, [allFestivals]);

  // Get unique categories and months
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(allFestivals.map(f => f.category))];
    return cats;
  }, [allFestivals]);

  const months = useMemo(() => {
    const monthSet = new Set();
    allFestivals.forEach(f => {
      // Extract individual months from strings like "October/November"
      f.month.split('/').forEach(m => monthSet.add(m.trim()));
    });
    return ['all', ...Array.from(monthSet).sort((a, b) => {
      const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 
                         'July', 'August', 'September', 'October', 'November', 'December'];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    })];
  }, [allFestivals]);

  // Get available years from festival data
  const availableYears = useMemo(() => {
    const years = new Set();
    allFestivals.forEach(f => {
      if (f.date) {
        years.add(new Date(f.date).getFullYear());
      }
    });
    return Array.from(years).sort((a, b) => a - b);
  }, [allFestivals]);

  // Filter and sort festivals based on selected criteria
  const filteredFestivals = useMemo(() => {
    let filtered = allFestivals.filter(festival => {
      const categoryMatch = selectedCategory === 'all' || festival.category === selectedCategory;
      const monthMatch = selectedMonth === 'all' || festival.month.includes(selectedMonth);
      const yearMatch = !festival.date || new Date(festival.date).getFullYear() === selectedYear;
      return categoryMatch && monthMatch && yearMatch;
    });

    // Sort festivals
    if (sortBy === 'date') {
      filtered = sortFestivalsByDate(filtered);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [selectedCategory, selectedMonth, selectedYear, sortBy, allFestivals]);

  const handleLocationChange = async (city) => {
    const selectedCity = WORLD_CITIES.find(c => c.name === city);
    if (selectedCity) {
      const location = setUserLocation(
        selectedCity.latitude,
        selectedCity.longitude,
        selectedCity.name,
        selectedCity.country
      );
      setUserLocationState(location);
      setShowLocationPicker(false);
    }
  };

  return (
    <div className="festivals-page">
      <div className="festivals-page-header">
        <h1 className="festivals-page-title">Hindu Festivals</h1>
        <p className="festivals-page-subtitle">
          Explore the rich tapestry of Hindu festivals celebrating devotion, tradition, 
          and the eternal cycle of seasons. Each festival carries deep spiritual significance 
          and brings communities together in celebration.
        </p>
        
        {/* Location Display */}
        {userLocation && (
          <div className="location-display">
            <span className="location-icon">📍</span>
            <span className="location-text">
              Showing festivals for: <strong>{userLocation.city}, {userLocation.country}</strong>
            </span>
            <button 
              className="change-location-btn"
              onClick={() => setShowLocationPicker(!showLocationPicker)}
            >
              Change Location
            </button>
          </div>
        )}
        
        {/* Location Picker Dropdown */}
        {showLocationPicker && (
          <div className="location-picker">
            <h3>Select Your City Worldwide</h3>
            <p className="location-picker-subtitle">
              Festival dates are calculated based on your location's timezone
            </p>
            
            {/* Group cities by region */}
            {['India', 'Americas', 'Europe', 'Asia-Pacific', 'Middle East', 'South Asia', 'Africa'].map(region => {
              const regionCities = WORLD_CITIES.filter(city => city.region === region);
              if (regionCities.length === 0) return null;
              
              return (
                <div key={region} className="city-region-group">
                  <h4 className="region-heading">{region}</h4>
                  <div className="city-grid">
                    {regionCities.map(city => (
                      <button
                        key={city.name}
                        className={`city-option ${userLocation?.city === city.name ? 'selected' : ''}`}
                        onClick={() => handleLocationChange(city.name)}
                      >
                        {city.name}
                        <span className="city-country">{city.country}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* View Mode Toggle */}
      <div className="view-mode-toggle">
        <button 
          className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
          onClick={() => setViewMode('list')}
        >
          📋 List View
        </button>
        <button 
          className={`view-mode-btn ${viewMode === 'calendar' ? 'active' : ''}`}
          onClick={() => setViewMode('calendar')}
        >
          📅 Calendar View
        </button>
      </div>

      {viewMode === 'list' ? (
        <>
          <div className="festivals-filters">
            <span className="festival-filter-label">Filter & Sort:</span>
            
            <select
              className="festival-filter-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              className="festival-filter-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            <select
              className="festival-filter-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map(month => (
                <option key={month} value={month}>
                  {month === 'all' ? 'All Months' : month}
                </option>
              ))}
            </select>

            <select
              className="festival-filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>

          {filteredFestivals.length > 0 && (
            <div className="festivals-count">
              Showing <span className="festivals-count-number">{filteredFestivals.length}</span> festival
              {filteredFestivals.length !== 1 ? 's' : ''} for {selectedYear}
            </div>
          )}

          <div className="festivals-grid">
            {filteredFestivals.map(festival => (
              <FestivalCard key={festival.id} festival={festival} />
            ))}
          </div>

          {filteredFestivals.length === 0 && (
            <div className="no-festivals">
              <p>No festivals found matching your criteria.</p>
            </div>
          )}
        </>
      ) : (
        <CalendarView 
          year={calendarYear}
          month={calendarMonth}
          onYearChange={setCalendarYear}
          onMonthChange={setCalendarMonth}
          festivalsByDate={festivalsByDate}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          minYear={minYear}
          maxYear={maxYear}
        />
      )}
    </div>
  );
};

// Calendar View Component
const CalendarView = ({ year, month, onYearChange, onMonthChange, festivalsByDate, selectedDate, onDateSelect, minYear, maxYear }) => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  
  const goToPreviousMonth = () => {
    if (month === 0) {
      onMonthChange(11);
      onYearChange(year - 1);
    } else {
      onMonthChange(month - 1);
    }
  };
  
  const goToNextMonth = () => {
    if (month === 11) {
      onMonthChange(0);
      onYearChange(year + 1);
    } else {
      onMonthChange(month + 1);
    }
  };
  
  const getFestivalsForDate = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return festivalsByDate[dateStr] || [];
  };
  
  const handleDateClick = (day) => {
    const festivals = getFestivalsForDate(day);
    if (festivals.length > 0) {
      onDateSelect({ day, month, year, festivals });
    }
  };
  
  // Generate calendar days
  const calendarDays = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const festivals = getFestivalsForDate(day);
    const isToday = day === new Date().getDate() && 
                    month === new Date().getMonth() && 
                    year === new Date().getFullYear();
    const hasFestival = festivals.length > 0;
    
    calendarDays.push(
      <div
        key={day}
        className={`calendar-day ${isToday ? 'today' : ''} ${hasFestival ? 'has-festival' : ''}`}
        onClick={() => handleDateClick(day)}
      >
        <div className="calendar-day-number">{day}</div>
        {hasFestival && (
          <div className="calendar-day-festivals">
            {festivals.slice(0, 2).map((festival, idx) => (
              <div key={idx} className="calendar-festival-dot" title={festival.name}>
                •
              </div>
            ))}
            {festivals.length > 2 && <div className="calendar-festival-more">+{festivals.length - 2}</div>}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="calendar-nav-btn" onClick={goToPreviousMonth}>
          ← Previous
        </button>
        <div className="calendar-header-title">
          <select 
            className="calendar-month-select"
            value={month}
            onChange={(e) => onMonthChange(Number(e.target.value))}
          >
            {monthNames.map((name, idx) => (
              <option key={idx} value={idx}>{name}</option>
            ))}
          </select>
          <select 
            className="calendar-year-select"
            value={year}
            onChange={(e) => onYearChange(Number(e.target.value))}
          >
            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button className="calendar-nav-btn" onClick={goToNextMonth}>
          Next →
        </button>
      </div>
      
      <div className="calendar-weekdays">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>
      
      <div className="calendar-grid">
        {calendarDays}
      </div>
      
      {selectedDate && (
        <div className="calendar-festival-details">
          <h3>Festivals on {monthNames[selectedDate.month]} {selectedDate.day}, {selectedDate.year}</h3>
          <div className="calendar-festival-list">
            {selectedDate.festivals.map((festival, idx) => (
              <div key={idx} className="calendar-festival-item">
                <strong>{festival.name}</strong>
                {festival.description && <p>{festival.description}</p>}
              </div>
            ))}
          </div>
          <button 
            className="calendar-close-details"
            onClick={() => onDateSelect(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FestivalsPage;
