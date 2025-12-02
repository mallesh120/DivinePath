/**
 * Universal Playwright Scraper for Ashtottaram
 * 
 * This scraper handles BOTH old and new HTML structures on drikpanchang.com
 * 
 * Old structure: article > div > div > div (3 child divs)
 * New structure: article.dpLyricsWrapper > div > div.dpNameListCard
 * 
 * Usage:
 *   node scripts/scrape-universal.js <url> <id> <title> <category>
 * 
 * Example:
 *   node scripts/scrape-universal.js \
 *     "https://www.drikpanchang.com/deities-namavali/gods/lord-krishna/108-krishna-names.html" \
 *     "krishna" \
 *     "Lord Krishna" \
 *     "god"
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
 * Main scraping function
 */
async function scrapeAshtottaram() {
  // Get command line arguments
  const url = process.argv[2];
  const deityId = process.argv[3];
  const deityTitle = process.argv[4];
  const category = process.argv[5];
  const description = process.argv[6] || '';
  
  if (!url || !deityId || !deityTitle || !category) {
    console.error('❌ Error: Missing required arguments');
    console.error('\nUsage:');
    console.error('  node scripts/scrape-universal.js <url> <id> <title> <category> [description]');
    console.error('\nExample:');
    console.error('  node scripts/scrape-universal.js \\');
    console.error('    "https://www.drikpanchang.com/deities-namavali/gods/lord-krishna/108-krishna-names.html" \\');
    console.error('    "krishna" \\');
    console.error('    "Lord Krishna" \\');
    console.error('    "god"');
    process.exit(1);
  }
  
  console.log('🌟 Universal Ashtottaram Scraper - Playwright');
  console.log('=' .repeat(60));
  console.log(`Deity: ${deityTitle}`);
  console.log(`ID: ${deityId}`);
  console.log(`Category: ${category}`);
  console.log(`URL: ${url}`);
  console.log('=' .repeat(60));
  
  let browser;
  try {
    console.log('\n🚀 Launching browser...');
    browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log('⏳ Loading page...');
    await page.goto(url, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    console.log('⏳ Waiting for content...');
    await page.waitForSelector('article', { timeout: 15000 });
    await page.waitForTimeout(2000); // Extra time for JS rendering
    
    console.log('📝 Extracting names...');
    
    // Try to extract using ALL THREE methods
    const names = await page.evaluate(() => {
      const extractedNames = [];
      
      // METHOD 1: New structure with dpNameListCard classes (full format with meanings)
      const newCards = document.querySelectorAll('.dpNameListCard');
      if (newCards.length > 0) {
        console.log(`Found ${newCards.length} cards using NEW structure (dpNameListCard)`);
        
        newCards.forEach((card) => {
          const titleDiv = card.querySelector('.dpNameCardTitle');
          const mantraDiv = card.querySelector('.dpNameCardMantra');
          const infoDiv = card.querySelector('.dpNameCardInfo');
          
          // Check if it has the full format (with Sanskrit name and meaning)
          if (titleDiv && mantraDiv && infoDiv) {
            const sanskritEl = titleDiv.querySelector('.dpPrimaryTitle');
            const numberEl = titleDiv.querySelector('.dpNameCardIndex');
            const mantraSanskritEl = mantraDiv.querySelector('.dpListPrimaryTitle');
            const mantraEnglishEl = mantraDiv.querySelector('.dpSecondaryMantra');
            
            const number = numberEl ? parseInt(numberEl.textContent.trim()) : 0;
            let sanskrit = sanskritEl ? sanskritEl.textContent.trim() : '';
            const mantraSanskrit = mantraSanskritEl ? mantraSanskritEl.textContent.trim() : '';
            const mantraEnglish = mantraEnglishEl ? mantraEnglishEl.textContent.trim() : '';
            const meaning = infoDiv.textContent.trim();
            
            // If no Sanskrit name in title, extract from mantra (hybrid format like Murugan)
            if (!sanskrit && mantraSanskrit) {
              const match = mantraSanskrit.match(/ॐ\s*(.+?)\s*नमः/);
              if (match) {
                sanskrit = match[1].trim();
              }
            }
            
            if (number > 0 && mantraSanskrit) {
              extractedNames.push({
                number,
                sanskrit: sanskrit || `Name ${number}`,
                mantraSanskrit,
                mantraEnglish,
                meaning
              });
            }
          }
          // Check if it's simplified format (only mantras, no Sanskrit name or meaning)
          else if (titleDiv && mantraDiv && !infoDiv) {
            const numberEl = titleDiv.querySelector('.dpNameCardIndex');
            const mantraSanskritEl = mantraDiv.querySelector('.dpListPrimaryTitle');
            const mantraEnglishEl = mantraDiv.querySelector('.dpSecondaryMantra');
            
            const number = numberEl ? parseInt(numberEl.textContent.trim()) : 0;
            const mantraSanskrit = mantraSanskritEl ? mantraSanskritEl.textContent.trim() : '';
            const mantraEnglish = mantraEnglishEl ? mantraEnglishEl.textContent.trim() : '';
            
            // Extract Sanskrit name from mantra (between ॐ and नमः)
            let sanskrit = '';
            if (mantraSanskrit) {
              const match = mantraSanskrit.match(/ॐ\s*(.+?)\s*नमः/);
              if (match) {
                sanskrit = match[1].trim();
              }
            }
            
            if (number > 0 && mantraSanskrit) {
              extractedNames.push({
                number,
                sanskrit: sanskrit || `Name ${number}`,
                mantraSanskrit,
                mantraEnglish,
                meaning: '' // No meaning in simplified format
              });
            }
          }
        });
        
        if (extractedNames.length > 0) {
          return extractedNames;
        }
      }
      
      // METHOD 2: Old structure with nested divs
      console.log('Trying OLD structure (article > div > div > div)...');
      const nameContainers = document.querySelectorAll('article > div > div > div');
      
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
    
    await browser.close();
    
    if (names.length === 0) {
      throw new Error('No names were extracted from the page. The HTML structure may have changed.');
    }
    
    console.log(`✅ Extracted ${names.length} names`);
    
    if (names.length !== 108) {
      console.log(`⚠️  Warning: Expected 108 names but found ${names.length}`);
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
      deityId,
      deityTitle,
      category,
      processedNames,
      description
    );
    
    const jsFilePath = path.join(outputDir, `${deityId}-ashtottaram.js`);
    fs.writeFileSync(jsFilePath, jsCode, 'utf8');
    console.log(`💾 Saved: ${jsFilePath}`);
    
    // Save JSON file
    const jsonData = {
      id: deityId,
      title: deityTitle,
      category: category,
      description: description,
      names: processedNames
    };
    
    const jsonFilePath = path.join(outputDir, `${deityId}-ashtottaram.json`);
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
    console.log(`💾 Saved: ${jsonFilePath}`);
    
    console.log('\n✅ Scraping completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Review the generated files');
    console.log('2. Copy the JavaScript code to src/data/ashtottaramData.js');
    console.log('3. Add deity image to src/assets/images/Gods/ or Goddesses/');
    console.log('4. Test in your app');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check if the URL is correct and accessible');
    console.error('2. Verify Chromium is installed: npx playwright install chromium');
    console.error('3. Try visiting the URL in your browser to verify it loads');
    console.error('4. If the error persists, the website structure may have changed');
    process.exit(1);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the scraper
scrapeAshtottaram().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
