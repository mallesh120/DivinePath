/**
 * Retry Failed Deities - Playwright Scraper
 * 
 * This script retries scraping for deities that failed in the batch scrape.
 * Uses longer timeout (60s) and longer delays (5s) to handle slow responses.
 * 
 * Usage:
 *   node scripts/retry-failed-deities.js
 */

const fs = require('fs');
const path = require('path');

// Check if Playwright is installed
let playwright;
try {
  playwright = require('playwright');
} catch (error) {
  console.error('❌ Error: Playwright is not installed.');
  console.error('\nPlease install Playwright by running:');
  console.error('  npm install playwright');
  console.error('  npx playwright install chromium');
  process.exit(1);
}

// Failed deities to retry
const FAILED_DEITIES = [
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-krishna/108-krishna-names.html',
    id: 'krishna',
    title: 'Lord Krishna',
    category: 'god',
    description: 'The eighth avatar of Lord Vishnu'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/goddesses/lakshmi/108-lakshmi-names.html',
    id: 'lakshmi',
    title: 'Goddess Lakshmi',
    category: 'goddess',
    description: 'The Goddess of Wealth and Prosperity'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/goddesses/durga/108-durga-names.html',
    id: 'durga',
    title: 'Goddess Durga',
    category: 'goddess',
    description: 'The Divine Mother, Goddess of Power'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/goddesses/saraswati/108-saraswati-names.html',
    id: 'saraswati',
    title: 'Goddess Saraswati',
    category: 'goddess',
    description: 'The Goddess of Knowledge and Arts'
  }
];

// Configuration - Increased timeouts and delays
const DELAY_BETWEEN_REQUESTS = 5000; // 5 seconds between requests
const REQUEST_TIMEOUT = 60000; // 60 seconds timeout (2x original)

/**
 * Utility functions
 */
function extractTransliteration(mantraEnglish) {
  if (!mantraEnglish) return '';
  let transliteration = mantraEnglish
    .replace(/^Om\s+/i, '')
    .replace(/\s+Namah[aḥ]?[।।]?$/i, '')
    .trim();
  return transliteration;
}

function cleanText(text) {
  if (!text) return '';
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/।+$/, '')
    .trim();
}

function escapeSingleQuotes(text) {
  return text.replace(/'/g, "\\'");
}

function generateJSCode(deityId, deityTitle, category, names, description = '') {
  const categoryFolder = category === 'god' ? 'Gods' : 'Goddesses';
  const imagePath = `/images/${categoryFolder}/${deityId}.png`;
  
  const jsCode = `/**
 * ${deityTitle} - 108 Names (Ashtottara Shatanamavali)
 * ${description ? description : 'One of the principal deities of Hinduism'}
 */

export const ${deityId}Ashtottaram = {
  id: '${deityId}',
  title: '${deityTitle}',
  category: '${category}',
  image: '${imagePath}',
  description: '${description ? description : 'One of the principal deities of Hinduism'}',
  names: [
${names.map(name => `    {
      number: ${name.number},
      sanskrit: '${escapeSingleQuotes(name.sanskrit)}',
      transliteration: '${escapeSingleQuotes(name.transliteration)}',
      mantraSanskrit: '${escapeSingleQuotes(name.mantraSanskrit)}',
      mantra: '${escapeSingleQuotes(name.mantra)}',
      meaning: '${escapeSingleQuotes(name.meaning)}'
    }`).join(',\n')}
  ]
};
`;
  
  return jsCode;
}

/**
 * Scrape a single deity with extended timeout
 */
async function scrapeDeity(browser, deity, index, total) {
  console.log(`\n[${index}/${total}] Scraping: ${deity.title}...`);
  console.log(`    URL: ${deity.url}`);
  
  try {
    const page = await browser.newPage();
    
    // Set longer timeout for navigation
    console.log(`    ⏳ Loading page (timeout: ${REQUEST_TIMEOUT / 1000}s)...`);
    await page.goto(deity.url, { 
      waitUntil: 'domcontentloaded', // Changed from 'networkidle' to 'domcontentloaded' for faster loading
      timeout: REQUEST_TIMEOUT 
    });
    
    // Wait for content to load
    console.log('    ⏳ Waiting for content...');
    await page.waitForSelector('article', { timeout: 15000 });
    
    // Give extra time for JavaScript to render
    await page.waitForTimeout(2000);
    
    console.log('    📝 Extracting names...');
    
    // Extract the 108 names
    const names = await page.evaluate(() => {
      const nameContainers = document.querySelectorAll('article > div > div > div');
      const extractedNames = [];
      
      nameContainers.forEach((container) => {
        const childDivs = container.querySelectorAll(':scope > div');
        
        if (childDivs.length >= 3) {
          const nameDiv = childDivs[0];
          const mantraDiv = childDivs[1];
          const meaningDiv = childDivs[2];
          
          const nameText = nameDiv ? nameDiv.textContent.trim() : '';
          const mantraText = mantraDiv ? mantraDiv.textContent.trim() : '';
          const meaningText = meaningDiv ? meaningDiv.textContent.trim() : '';
          
          const nameMatch = nameText.match(/^(\d+)\.\s*(.+)$/);
          const number = nameMatch ? parseInt(nameMatch[1]) : 0;
          const sanskrit = nameMatch ? nameMatch[2].trim() : nameText;
          
          const mantraLines = mantraText.split('\n').map(line => line.trim()).filter(line => line);
          const mantraSanskrit = mantraLines.length > 0 ? mantraLines[0] : '';
          const mantraEnglish = mantraLines.length > 1 ? mantraLines[1] : '';
          
          if (number > 0 && sanskrit) {
            extractedNames.push({
              number,
              sanskrit,
              mantraSanskrit,
              mantraEnglish,
              meaning: meaningText
            });
          }
        }
      });
      
      return extractedNames;
    });
    
    await page.close();
    
    if (names.length === 0) {
      throw new Error('No names were extracted from the page');
    }
    
    console.log(`    ✅ Extracted ${names.length} names`);
    
    if (names.length !== 108) {
      console.log(`    ⚠️  Warning: Expected 108 names but found ${names.length}`);
    }
    
    // Process the names
    const processedNames = names.map(name => ({
      number: name.number,
      sanskrit: cleanText(name.sanskrit),
      transliteration: extractTransliteration(name.mantraEnglish),
      mantraSanskrit: cleanText(name.mantraSanskrit),
      mantra: cleanText(name.mantraEnglish),
      meaning: cleanText(name.meaning)
    }));
    
    // Create output directory
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate and save JavaScript file
    const jsCode = generateJSCode(
      deity.id,
      deity.title,
      deity.category,
      processedNames,
      deity.description
    );
    
    const jsFilePath = path.join(outputDir, `${deity.id}-ashtottaram.js`);
    fs.writeFileSync(jsFilePath, jsCode, 'utf8');
    console.log(`    💾 Saved: ${jsFilePath}`);
    
    // Save JSON file
    const jsonData = {
      id: deity.id,
      title: deity.title,
      category: deity.category,
      description: deity.description,
      names: processedNames
    };
    
    const jsonFilePath = path.join(outputDir, `${deity.id}-ashtottaram.json`);
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log(`    💾 Saved: ${jsonFilePath}`);
    
    return { success: true, deity: deity.title, count: names.length };
    
  } catch (error) {
    console.error(`    ❌ Error: ${error.message}`);
    return { success: false, deity: deity.title, error: error.message };
  }
}

/**
 * Add delay between requests
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main batch scraping function
 */
async function retryFailedDeities() {
  console.log('🔄 Retrying Failed Deities - Playwright Scraper');
  console.log('=' .repeat(60));
  console.log(`📋 Deities to retry: ${FAILED_DEITIES.length}`);
  console.log(`⏱️  Timeout per deity: ${REQUEST_TIMEOUT / 1000}s`);
  console.log(`⏸️  Delay between requests: ${DELAY_BETWEEN_REQUESTS / 1000}s`);
  console.log('=' .repeat(60));
  
  const results = [];
  let browser;
  
  try {
    console.log('\n🚀 Launching browser...');
    browser = await playwright.chromium.launch({ 
      headless: true,
      timeout: 60000 // 60 second browser launch timeout
    });
    console.log('✅ Browser launched successfully');
    
    for (let i = 0; i < FAILED_DEITIES.length; i++) {
      const deity = FAILED_DEITIES[i];
      const result = await scrapeDeity(browser, deity, i + 1, FAILED_DEITIES.length);
      results.push(result);
      
      // Add delay before next request (except for the last one)
      if (i < FAILED_DEITIES.length - 1) {
        console.log(`\n⏸️  Waiting ${DELAY_BETWEEN_REQUESTS / 1000}s before next deity...`);
        await delay(DELAY_BETWEEN_REQUESTS);
      }
    }
    
  } catch (error) {
    console.error('\n❌ Fatal error:', error.message);
    console.error('\nPossible solutions:');
    console.error('1. Check your internet connection');
    console.error('2. Verify Chromium is installed: npx playwright install chromium');
    console.error('3. Try again later if the website is down');
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
      console.log('\n🔒 Browser closed');
    }
  }
  
  // Print summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 RETRY SUMMARY');
  console.log('=' .repeat(60));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n✅ Successful: ${successful.length}/${FAILED_DEITIES.length}`);
  successful.forEach(r => {
    console.log(`   ✓ ${r.deity} (${r.count} names)`);
  });
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed: ${failed.length}/${FAILED_DEITIES.length}`);
    failed.forEach(r => {
      console.log(`   ✗ ${r.deity}: ${r.error}`);
    });
    
    console.log('\n💡 Troubleshooting tips:');
    console.log('   • Wait a few minutes and try again');
    console.log('   • Check if the URLs are accessible in your browser');
    console.log('   • Try scraping failed deities individually with increased timeout');
    console.log('   • Fall back to manual formatter if issues persist');
  }
  
  console.log(`\n📁 Output files saved to: scripts/output/`);
  
  if (successful.length > 0) {
    console.log('\n📝 Next steps:');
    console.log('1. Review the generated files in scripts/output/');
    console.log('2. Copy the JavaScript code to src/data/ashtottaramData.js');
    console.log('3. Add deity images to src/assets/images/Gods/ and Goddesses/');
    console.log('4. Test the app to verify all data displays correctly');
  }
}

// Run the retry script
retryFailedDeities().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
