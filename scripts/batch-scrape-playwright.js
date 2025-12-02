/**
 * Batch Playwright Scraper for Multiple Deities
 * 
 * Scrapes 108 names for multiple deities in sequence using Playwright.
 * Includes delays between requests to be respectful to the server.
 * 
 * Usage:
 *   node scripts/batch-scrape-playwright.js
 * 
 * The script will scrape all deities defined in the DEITIES array below.
 * Edit the array to add or remove deities.
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

// Define deities to scrape
const DEITIES = [
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-vishnu/108-vishnu-names.html',
    id: 'vishnu',
    title: 'Lord Vishnu',
    category: 'god',
    description: 'The Preserver, one of the principal deities of Hinduism'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-shiva/108-shiva-names.html',
    id: 'shiva',
    title: 'Lord Shiva',
    category: 'god',
    description: 'The Destroyer, one of the principal deities of Hinduism'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-krishna/108-krishna-names.html',
    id: 'krishna',
    title: 'Lord Krishna',
    category: 'god',
    description: 'The eighth avatar of Lord Vishnu'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-rama/108-rama-names.html',
    id: 'rama',
    title: 'Lord Rama',
    category: 'god',
    description: 'The seventh avatar of Lord Vishnu'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/god-hanuman/108-hanuman-names.html',
    id: 'hanuman',
    title: 'Lord Hanuman',
    category: 'god',
    description: 'The devoted follower of Lord Rama'
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
    description: 'The Goddess of Power and Strength'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/goddesses/saraswati/108-saraswati-names.html',
    id: 'saraswati',
    title: 'Goddess Saraswati',
    category: 'goddess',
    description: 'The Goddess of Knowledge and Arts'
  }
];

// Configuration
const DELAY_BETWEEN_REQUESTS = 3000; // 3 seconds between requests
const REQUEST_TIMEOUT = 30000; // 30 seconds timeout

/**
 * Utility functions (same as in scrape-playwright.js)
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
  
  let jsCode = `// ${deityTitle} Ashtottara Shatanamavali\n`;
  jsCode += `// 108 Names of ${deityTitle}\n`;
  jsCode += `// Auto-generated from drikpanchang.com\n\n`;
  
  jsCode += `export const ${deityId}Ashtottaram = {\n`;
  jsCode += `  id: '${deityId}',\n`;
  jsCode += `  name: '${escapeSingleQuotes(deityTitle)}',\n`;
  jsCode += `  title: 'Ashtottara Shatanamavali',\n`;
  jsCode += `  description: '${escapeSingleQuotes(description || `108 Names of ${deityTitle}`)}',\n`;
  jsCode += `  image: '${imagePath}',\n`;
  jsCode += `  category: '${category}',\n`;
  jsCode += `  names: [\n`;
  
  names.forEach((name, index) => {
    jsCode += `    {\n`;
    jsCode += `      number: ${name.number},\n`;
    jsCode += `      sanskrit: '${escapeSingleQuotes(name.sanskrit)}',\n`;
    jsCode += `      transliteration: '${escapeSingleQuotes(name.transliteration)}',\n`;
    jsCode += `      mantraSanskrit: '${escapeSingleQuotes(name.mantraSanskrit)}',\n`;
    jsCode += `      mantra: '${escapeSingleQuotes(name.mantra)}',\n`;
    jsCode += `      meaning: '${escapeSingleQuotes(name.meaning)}'\n`;
    jsCode += `    }${index < names.length - 1 ? ',' : ''}\n`;
  });
  
  jsCode += `  ]\n`;
  jsCode += `};\n`;
  
  return jsCode;
}

/**
 * Scrape a single deity
 */
async function scrapeDeity(browser, deity, index, total) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`📿 [${index + 1}/${total}] Scraping: ${deity.title}`);
  console.log(`${'='.repeat(80)}\n`);
  
  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    const page = await context.newPage();
    
    // Navigate to the page
    console.log(`🌐 Loading: ${deity.url}`);
    await page.goto(deity.url, { waitUntil: 'networkidle', timeout: REQUEST_TIMEOUT });
    
    // Wait for content
    await page.waitForSelector('article', { timeout: 10000 });
    console.log('✅ Page loaded\n');
    
    // Extract names
    console.log('🔍 Extracting names...');
    const names = await page.evaluate(() => {
      const results = [];
      const article = document.querySelector('article');
      if (!article) return results;
      
      const nameContainers = article.querySelectorAll('div > div > div');
      
      for (const container of nameContainers) {
        const childDivs = container.querySelectorAll(':scope > div');
        
        if (childDivs.length >= 3) {
          const nameDiv = childDivs[0];
          const mantraDiv = childDivs[1];
          const meaningDiv = childDivs[2];
          
          const sanskritEl = nameDiv.querySelector('div:first-child');
          const numberEl = nameDiv.querySelector('div:last-child');
          const mantraSanskritEl = mantraDiv.querySelector('div:first-child');
          const mantraEnglishEl = mantraDiv.querySelector('div:last-child');
          const meaningText = meaningDiv.textContent?.trim();
          
          if (sanskritEl && numberEl && mantraSanskritEl && mantraEnglishEl && meaningText) {
            const sanskritText = sanskritEl.textContent?.trim();
            const numberText = numberEl.textContent?.trim().replace(/['"]/g, '');
            const mantraSanskrit = mantraSanskritEl.textContent?.trim();
            const mantraEnglish = mantraEnglishEl.textContent?.trim();
            
            if (sanskritText && numberText && mantraSanskrit && mantraEnglish) {
              results.push({
                number: parseInt(numberText) || 0,
                sanskrit: sanskritText,
                mantraSanskrit: mantraSanskrit,
                mantra: mantraEnglish,
                meaning: meaningText
              });
            }
          }
        }
      }
      
      return results;
    });
    
    await context.close();
    
    if (names.length === 0) {
      console.error(`❌ No names found for ${deity.title}`);
      return { success: false, deity: deity.title, error: 'No names extracted' };
    }
    
    console.log(`✅ Extracted ${names.length} names`);
    
    if (names.length !== 108) {
      console.warn(`⚠️  Warning: Expected 108, got ${names.length}`);
    }
    
    // Process names
    const processedNames = names.map(name => ({
      ...name,
      sanskrit: cleanText(name.sanskrit),
      transliteration: extractTransliteration(name.mantra),
      mantraSanskrit: cleanText(name.mantraSanskrit),
      mantra: cleanText(name.mantra),
      meaning: cleanText(name.meaning)
    }));
    
    processedNames.sort((a, b) => a.number - b.number);
    
    // Create output directory
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate and save files
    const jsCode = generateJSCode(deity.id, deity.title, deity.category, processedNames, deity.description);
    const jsonData = {
      id: deity.id,
      name: deity.title,
      title: 'Ashtottara Shatanamavali',
      description: deity.description || `108 Names of ${deity.title}`,
      image: `/images/${deity.category === 'god' ? 'Gods' : 'Goddesses'}/${deity.id}.png`,
      category: deity.category,
      names: processedNames
    };
    
    const jsFile = path.join(outputDir, `${deity.id}-ashtottaram.js`);
    const jsonFile = path.join(outputDir, `${deity.id}-ashtottaram.json`);
    
    fs.writeFileSync(jsFile, jsCode);
    fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
    
    console.log(`✅ Saved: ${deity.id}-ashtottaram.js`);
    console.log(`✅ Saved: ${deity.id}-ashtottaram.json`);
    
    return { success: true, deity: deity.title, count: names.length };
    
  } catch (error) {
    console.error(`❌ Error scraping ${deity.title}:`, error.message);
    return { success: false, deity: deity.title, error: error.message };
  }
}

/**
 * Delay function
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Main batch scraping function
 */
async function batchScrape() {
  console.log('🚀 Starting Batch Playwright Scraper\n');
  console.log(`📋 Deities to scrape: ${DEITIES.length}`);
  console.log(`⏱️  Delay between requests: ${DELAY_BETWEEN_REQUESTS}ms\n`);
  
  let browser;
  const results = [];
  
  try {
    // Launch browser once for all operations
    console.log('🌐 Launching browser...\n');
    browser = await playwright.chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // Scrape each deity
    for (let i = 0; i < DEITIES.length; i++) {
      const result = await scrapeDeity(browser, DEITIES[i], i, DEITIES.length);
      results.push(result);
      
      // Delay before next request (except for the last one)
      if (i < DEITIES.length - 1) {
        console.log(`\n⏳ Waiting ${DELAY_BETWEEN_REQUESTS / 1000}s before next request...`);
        await delay(DELAY_BETWEEN_REQUESTS);
      }
    }
    
    // Close browser
    await browser.close();
    console.log('\n🔒 Browser closed\n');
    
    // Summary
    console.log('\n' + '='.repeat(80));
    console.log('📊 BATCH SCRAPING SUMMARY');
    console.log('='.repeat(80) + '\n');
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✅ Successful: ${successful.length}/${DEITIES.length}`);
    if (successful.length > 0) {
      successful.forEach(r => {
        console.log(`   ✓ ${r.deity} (${r.count} names)`);
      });
    }
    
    if (failed.length > 0) {
      console.log(`\n❌ Failed: ${failed.length}/${DEITIES.length}`);
      failed.forEach(r => {
        console.log(`   ✗ ${r.deity}: ${r.error}`);
      });
    }
    
    console.log('\n📁 Output files saved to: scripts/output/\n');
    console.log('📝 Next steps:');
    console.log('1. Review the generated files in scripts/output/');
    console.log('2. Copy the JavaScript code to src/data/ashtottaramData.js');
    console.log('3. Add deity images to src/assets/images/Gods/ and Goddesses/');
    console.log('4. Test the app to verify all data displays correctly\n');
    
    console.log('✨ Batch scraping completed!\n');
    
  } catch (error) {
    console.error('\n❌ Fatal error during batch scraping:');
    console.error(error.message);
    
    if (browser) {
      await browser.close();
    }
    
    process.exit(1);
  }
}

// Run the batch scraper
batchScrape();
