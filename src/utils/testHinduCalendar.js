/**
 * Test Hindu Calendar Calculations
 * Run this to verify festival date calculations
 */

const { generateFestivalDatesForYear } = require('./hinduCalendar');

console.log('Testing Hindu Calendar Calculations\n');
console.log('=' .repeat(60));

// Test years 2027, 2030, 2035
const testYears = [2027, 2030, 2035];

testYears.forEach(year => {
  console.log(`\n${year} Festival Dates:`);
  console.log('-'.repeat(60));
  
  const festivals = generateFestivalDatesForYear(year);
  
  Object.entries(festivals).forEach(([name, dates]) => {
    const festivalName = name.charAt(0).toUpperCase() + 
                        name.slice(1).replace(/([A-Z])/g, ' $1');
    console.log(`${festivalName.padEnd(25)} : ${dates.date}`);
    if (dates.endDate !== dates.date) {
      console.log(`${''.padEnd(25)}   to ${dates.endDate}`);
    }
  });
});

console.log('\n' + '='.repeat(60));
console.log('Calculation test complete!');
