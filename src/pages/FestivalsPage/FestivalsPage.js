import React, { useState, useMemo, useEffect } from 'react';
import { sortFestivalsByDate, getAllFestivalsWithCalculated } from '../../data/festivals/festivalsData';
import FestivalCard from '../../components/FestivalCard/FestivalCard';
import { getLocationForFestivals, WORLD_CITIES, setUserLocation } from '../../utils/locationService';
import './FestivalsPage.css';

const FestivalsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'name'
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
    </div>
  );
};

export default FestivalsPage;
