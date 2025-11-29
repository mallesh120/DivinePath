# Hindu Calendar (Panchang) Integration in Festival Calendar

## Overview
Enhanced the festival calendar to display full Hindu calendar (Panchang) details for each day, including:
- **Tithi** (Lunar day)
- **Nakshatra** (Lunar mansion/constellation)
- **Vara** (Day of the week)
- **Paksha** (Lunar fortnight - Shukla/Krishna)

## Files Modified

### 1. `/src/hooks/usePanchangamForDate.js` (NEW)
Created a new hook for fetching and calculating Panchang data:
- `usePanchangamForDate()` - Hook to fetch live Panchang data from API
- `calculateBasicPanchang()` - Calculate approximate Panchang values locally

### 2. `/netlify/functions/panchangam-for-date.js` (NEW)
Serverless function to fetch Panchang data from Prokerala API:
- Fetches detailed Panchang data (tithi, nakshatra, yoga, karana)
- Fetches inauspicious periods (Rahu Kala, Yamaganda, etc.)
- Uses OAuth authentication with Prokerala API
- Returns combined data for a specific date and location

### 3. `/src/pages/FestivalsPage/FestivalsPage.js`
Enhanced the calendar view to display Panchang information:
- Import `calculateBasicPanchang` function
- Calculate Panchang for each calendar day
- Display Tithi and Nakshatra in calendar cells
- Show full Panchang details in the date modal
- Allow clicking any date (not just festival dates) to view details

### 4. `/src/pages/FestivalsPage/FestivalsPage.css`
Added styles for Panchang display:
- `.calendar-panchang-info` - Container for Panchang in calendar cells
- `.panchang-tithi` - Tithi display (purple color)
- `.panchang-nakshatra` - Nakshatra display (italic style)
- `.panchang-details-section` - Modal section for detailed Panchang
- `.panchang-details-grid` - Grid layout for Panchang items
- `.panchang-detail-item` - Individual Panchang data item

## Features Implemented

### Calendar Day View
Each calendar day now shows:
1. **Date number** (at top)
2. **Tithi name** (in purple, e.g., "Pratipada", "Ekadashi")
3. **Nakshatra name** (in italic, e.g., "Ashwini", "Rohini")
4. **Festival dots** (if festivals exist on that day)

### Date Details Modal
When clicking any date, you'll see:
1. **Hindu Calendar (Panchang) Section**:
   - Tithi with full name
   - Nakshatra with full name
   - Vara (day of the week)
   - Paksha (Shukla or Krishna)

2. **Festivals Section** (if any festivals exist):
   - Festival names
   - Festival descriptions

## How It Works

### Calculation Method
Currently using **local calculation** (`calculateBasicPanchang`):
- Calculates approximate Tithi based on day of year
- Calculates approximate Nakshatra based on day of year
- Determines Vara (weekday) from JavaScript Date object
- Determines Paksha based on lunar cycle approximation

### Future Enhancement: Live API Integration
The infrastructure is ready for live API integration:
1. `usePanchangamForDate` hook can fetch real-time data
2. `panchangam-for-date.js` Netlify function handles API calls
3. Requires Prokerala API credentials in environment variables:
   - `PROKERALA_CLIENT_ID`
   - `PROKERALA_CLIENT_SECRET`

To enable live API:
```javascript
// In CalendarView component, replace:
const panchangInfo = calculateBasicPanchang(year, month, day);

// With:
const { panchangData } = usePanchangamForDate(year, month, day, userLocation);
const panchangInfo = panchangData?.panchang || calculateBasicPanchang(year, month, day);
```

## Benefits

### For Users
- ✅ Understand the Hindu calendar context for each day
- ✅ See which Tithi a festival falls on
- ✅ Know the Nakshatra for auspicious activities
- ✅ Identify Paksha (waxing/waning moon phase)
- ✅ Click any date to see full Panchang details

### For Developers
- ✅ Modular hook-based architecture
- ✅ Serverless function for API calls
- ✅ Fallback to local calculations
- ✅ Clean separation of concerns
- ✅ Easy to switch between local and API data

## Technical Details

### Panchang Terminology
- **Tithi**: Lunar day (1-15 in each Paksha)
- **Nakshatra**: One of 27 lunar mansions
- **Vara**: Day of the week (Sun-Sat)
- **Paksha**: Lunar fortnight
  - Shukla Paksha (waxing moon)
  - Krishna Paksha (waning moon)
- **Yoga**: Combination of Sun and Moon positions
- **Karana**: Half of a Tithi

### API Endpoint
```
GET /api/panchangam-for-date?latitude={lat}&longitude={lng}&datetime={iso_date}
```

### Response Format
```json
{
  "date": "2025-01-15T00:00:00Z",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "panchang": {
    "tithi": { "name": "Ekadashi", ... },
    "nakshatra": { "name": "Rohini", ... },
    "yoga": { "name": "...", ... },
    "karana": { "name": "...", ... }
  },
  "inauspiciousPeriods": { ... }
}
```

## Testing

1. Navigate to Festivals page
2. Switch to Calendar view
3. Observe Tithi and Nakshatra on each day
4. Click any date to see full Panchang details
5. Verify festivals still display correctly
6. Check that year filter works with Panchang display

## Next Steps (Optional Future Enhancements)

1. **Live API Integration**
   - Enable real-time Panchang data from Prokerala
   - Cache API responses to reduce calls
   - Show loading states during API fetch

2. **Enhanced Display**
   - Color-code auspicious vs inauspicious days
   - Show moon phase icon
   - Display Rahu Kala and other inauspicious periods
   - Add tooltips with more Panchang details

3. **User Preferences**
   - Toggle Panchang display on/off
   - Choose which Panchang elements to show
   - Select Ayanamsa system (currently using Lahiri)

4. **Performance Optimization**
   - Batch fetch entire month of Panchang data
   - Implement smart caching strategy
   - Preload adjacent months

## Conclusion

The festival calendar now provides comprehensive Hindu calendar information, making it a complete spiritual calendar tool. Users can see both festival dates and the underlying Panchang that determines those dates, enhancing their understanding of Hindu timekeeping and auspicious occasions.
