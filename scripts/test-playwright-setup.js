#!/usr/bin/env node

/**
 * Test Playwright Scraper Setup
 * 
 * This script checks if your environment is properly configured
 * for using the Playwright scraper.
 * 
 * Usage:
 *   node scripts/test-playwright-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Playwright Scraper Setup\n');
console.log('='.repeat(60) + '\n');

let allTestsPassed = true;

// Test 1: Check if Playwright is installed
console.log('1️⃣  Checking Playwright installation...');
try {
  const playwright = require('playwright');
  console.log('   ✅ Playwright is installed (v' + playwright.version() + ')');
} catch (error) {
  console.log('   ❌ Playwright is NOT installed');
  console.log('   💡 Run: npm install playwright');
  allTestsPassed = false;
}
console.log();

// Test 2: Check if Chromium is installed
console.log('2️⃣  Checking Chromium browser...');
try {
  const playwright = require('playwright');
  const browserPath = playwright.chromium.executablePath();
  if (fs.existsSync(browserPath)) {
    console.log('   ✅ Chromium browser is installed');
    console.log('   📁 Location: ' + browserPath.substring(0, 50) + '...');
  } else {
    console.log('   ⚠️  Chromium path exists but browser not found');
    console.log('   💡 Run: npx playwright install chromium');
    allTestsPassed = false;
  }
} catch (error) {
  console.log('   ❌ Cannot verify Chromium installation');
  console.log('   💡 Run: npx playwright install chromium');
  allTestsPassed = false;
}
console.log();

// Test 3: Check if scraper scripts exist
console.log('3️⃣  Checking scraper scripts...');
const scripts = [
  'scrape-playwright.js',
  'batch-scrape-playwright.js',
  'format-ashtottaram.js'
];

scripts.forEach(script => {
  const scriptPath = path.join(__dirname, script);
  if (fs.existsSync(scriptPath)) {
    console.log(`   ✅ ${script} exists`);
  } else {
    console.log(`   ❌ ${script} NOT FOUND`);
    allTestsPassed = false;
  }
});
console.log();

// Test 4: Check if output directory exists or can be created
console.log('4️⃣  Checking output directory...');
const outputDir = path.join(__dirname, 'output');
if (fs.existsSync(outputDir)) {
  console.log('   ✅ Output directory exists');
  console.log('   📁 Location: ' + outputDir);
} else {
  try {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log('   ✅ Output directory created');
    console.log('   📁 Location: ' + outputDir);
  } catch (error) {
    console.log('   ❌ Cannot create output directory');
    console.log('   Error: ' + error.message);
    allTestsPassed = false;
  }
}
console.log();

// Test 5: Check if documentation exists
console.log('5️⃣  Checking documentation...');
const docs = [
  'README.md',
  'PLAYWRIGHT_GUIDE.md',
  'SCRAPING_GUIDE.md'
];

docs.forEach(doc => {
  const docPath = path.join(__dirname, doc);
  if (fs.existsSync(docPath)) {
    console.log(`   ✅ ${doc} exists`);
  } else {
    console.log(`   ⚠️  ${doc} not found (optional)`);
  }
});
console.log();

// Test 6: Try a simple Playwright operation
console.log('6️⃣  Testing basic Playwright functionality...');
(async () => {
  try {
    const playwright = require('playwright');
    const browser = await playwright.chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('data:text/html,<h1>Test</h1>');
    const content = await page.content();
    await browser.close();
    
    if (content.includes('Test')) {
      console.log('   ✅ Playwright can launch browser and load pages');
    } else {
      console.log('   ⚠️  Playwright launched but page content unexpected');
    }
  } catch (error) {
    console.log('   ❌ Playwright test failed');
    console.log('   Error: ' + error.message);
    allTestsPassed = false;
  }
  
  console.log();
  console.log('='.repeat(60));
  console.log();
  
  // Final summary
  if (allTestsPassed) {
    console.log('🎉 All tests passed! You\'re ready to scrape!');
    console.log();
    console.log('📖 Quick Start:');
    console.log('   1. View examples: cat scripts/PLAYWRIGHT_GUIDE.md');
    console.log('   2. Try single scrape: node scripts/scrape-playwright.js <url> <id> <title> <category>');
    console.log('   3. Or batch scrape: node scripts/batch-scrape-playwright.js');
    console.log();
    console.log('✨ Happy scraping! 🙏');
  } else {
    console.log('⚠️  Some tests failed. Please fix the issues above.');
    console.log();
    console.log('🔧 Common fixes:');
    console.log('   1. Install Playwright: npm install playwright');
    console.log('   2. Install Chromium: npx playwright install chromium');
    console.log('   3. Check file permissions in the scripts directory');
    console.log();
    console.log('📖 For detailed help, see: scripts/PLAYWRIGHT_GUIDE.md');
  }
  
  console.log();
  process.exit(allTestsPassed ? 0 : 1);
})();
