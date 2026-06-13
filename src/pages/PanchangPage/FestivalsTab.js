import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { sortFestivalsByDate, getAllFestivalsWithCalculated } from '../../data/festivals/festivalsData';
import FestivalCard from '../../components/FestivalCard/FestivalCard';
import { getLocationForFestivals, WORLD_CITIES, setUserLocation } from '../../utils/locationService';
import './FestivalsTab.css';

const HINDU_LUNAR_MONTHS = [
  'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha', 'Shravana', 'Bhadrapada',
  'Ashwin', 'Kartik', 'Margashirsha', 'Pausha', 'Magha', 'Phalguna'
];

const FestivalsTab = () => {
  const [selectedLunarMonth, setSelectedLunarMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
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

  // Dynamic theme is now handled globally in App.js

  // Get all festivals including calculated ones for 2020-2120
  const allFestivals = useMemo(() => 
    getAllFestivalsWithCalculated(2020, 2120, userLocation), 
    [userLocation]
  );

  // Parse Lunar Month from festival.lunarDate
  const getLunarMonth = (lunarDateStr) => {
    if (!lunarDateStr) return 'Unknown';
    const parts = lunarDateStr.split(' ');
    return parts[0] || 'Unknown';
  };

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

  // Extract unique festivals that have an associated Puja
  const festivalsWithPujas = useMemo(() => {
    const map = new Map();
    allFestivals
      .filter(f => f.pujaId)
      .forEach(f => {
        if (!map.has(f.pujaId)) {
          map.set(f.pujaId, f);
        }
      });
    return Array.from(map.values());
  }, [allFestivals]);

  // Filter festivals based on year
  const festivalsForYear = useMemo(() => {
    return allFestivals.filter(festival => {
      return !festival.date || new Date(festival.date).getFullYear() === selectedYear;
    });
  }, [allFestivals, selectedYear]);

  // Group festivals by Lunar Month
  const festivalsByLunarMonth = useMemo(() => {
    const grouped = {};
    HINDU_LUNAR_MONTHS.forEach(m => grouped[m] = []);
    grouped['Unknown'] = [];

    const sorted = sortFestivalsByDate(festivalsForYear);
    sorted.forEach(festival => {
      let month = getLunarMonth(festival.lunarDate);
      if (!HINDU_LUNAR_MONTHS.includes(month)) {
        // Fallback for slightly different spellings or unmapped
        month = HINDU_LUNAR_MONTHS.find(m => month.includes(m) || m.includes(month)) || 'Unknown';
      }
      if (grouped[month]) {
        grouped[month].push(festival);
      } else {
        grouped['Unknown'].push(festival);
      }
    });

    return grouped;
  }, [festivalsForYear]);

  // Filter groups by selected tab
  const displayGroups = useMemo(() => {
    if (selectedLunarMonth === 'All') {
      return HINDU_LUNAR_MONTHS.map(m => ({ month: m, festivals: festivalsByLunarMonth[m] }))
        .filter(g => g.festivals.length > 0);
    }
    return [{ month: selectedLunarMonth, festivals: festivalsByLunarMonth[selectedLunarMonth] || [] }]
      .filter(g => g.festivals.length > 0);
  }, [festivalsByLunarMonth, selectedLunarMonth]);

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
    <div className="festivals-tab">
      <div className="festivals-tab-header">
        
        {/* Location Display */}
        {userLocation && (
          <div className="location-badge-glass">
            <span className="streak-icon">📍</span>
            <div className="streak-info">
              <span className="streak-count">{userLocation.city}</span>
              <span className="streak-label">{userLocation.country}</span>
            </div>
            <button 
              className="edit-name-btn"
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              title="Change Location"
            >
              ✏️
            </button>
          </div>
        )}
      </div>

      <div className="dashboard-container">
        {/* Location Picker Dropdown */}
        {showLocationPicker && (
          <div className="location-picker glass-panel">
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

      <div className="festivals-filters-container">
        <div className="festivals-year-picker">
          <span className="festival-filter-label">Viewing Year:</span>
          <select
            className="festival-filter-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="lunar-months-nav">
          <button 
            className={`lunar-month-pill ${selectedLunarMonth === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedLunarMonth('All')}
          >
            All Year
          </button>
          {HINDU_LUNAR_MONTHS.map(month => (
            <button 
              key={month}
              className={`lunar-month-pill ${selectedLunarMonth === month ? 'active' : ''} ${festivalsByLunarMonth[month]?.length === 0 ? 'empty' : ''}`}
              onClick={() => setSelectedLunarMonth(month)}
            >
              {month}
              {festivalsByLunarMonth[month]?.length > 0 && (
                <span className="festival-count-badge">{festivalsByLunarMonth[month].length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="festivals-content-area">
        
        {/* Pooja Vidhanam Section */}
        {festivalsWithPujas.length > 0 && selectedLunarMonth === 'All' && (
          <div className="lunar-month-section puja-vidhanam-section">
            <h2 className="lunar-month-header">
              <span className="lunar-month-title">Pooja Vidhanam</span>
              <span className="lunar-month-subtitle">Guides for Festivals</span>
            </h2>
            <div className="puja-vidhanam-grid">
              {festivalsWithPujas.map(festival => (
                <Link key={festival.pujaId} to={`/adults/puja/${festival.pujaId}`} className="puja-vidhanam-card">
                  <div className="puja-vidhanam-icon">🪔</div>
                  <div className="puja-vidhanam-info">
                    <h3>{festival.name} Puja</h3>
                    <p>View detailed procedure</p>
                  </div>
                  <div className="puja-vidhanam-arrow">→</div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {displayGroups.length > 0 ? (
          displayGroups.map(group => (
            <div key={group.month} className="lunar-month-section">
              <h2 className="lunar-month-header">
                <span className="lunar-month-title">{group.month} Month</span>
                <span className="lunar-month-subtitle">Festivals</span>
              </h2>
              <div className="festivals-grid">
                {group.festivals.map(festival => (
                  <FestivalCard key={festival.id} festival={festival} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="no-festivals glass-panel">
            <span className="no-festivals-icon">🪔</span>
            <h3>No festivals found</h3>
            <p>Try selecting a different year or lunar month.</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default FestivalsTab;
