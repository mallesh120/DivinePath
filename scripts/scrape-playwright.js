/**
 * Playwright-based Ashtottaram Scraper
 * 
 * This script uses Playwright to navigate drikpanchang.com and extract
 * the 108 names (Ashtottara Shatanamavali) for Hindu deities.
 * 
 * Features:
 * - Browser automation for reliable data extraction
 * - Handles dynamic content and JavaScript rendering
 * - Extracts Sanskrit names, transliteration, mantras, and meanings
 * - Generates formatted JSON and JavaScript output files
 * 
 * Usage:
 *   node scripts/scrape-playwright.js <deity-url> <deity-id> <deity-title> <category>
 * 
 * Example:
 *   node scripts/scrape-playwright.js \
 *     "https://www.drikpanchang.com/deities-namavali/gods/lord-vishnu/108-vishnu-names.html" \
 *     "vishnu" \
 *     "Lord Vishnu" \
 *     "god"
 * 
 * Requirements:
 *   npm install playwright
 *   npx playwright install chromium
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

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 4) {
  console.error('Usage: node scrape-playwright.js <deity-url> <deity-id> <deity-title> <category>');
  console.error('\nExample:');
  console.error('  node scrape-playwright.js \\');
  console.error('    "https://www.drikpanchang.com/deities-namavali/gods/lord-vishnu/108-vishnu-names.html" \\');
  console.error('    "vishnu" \\');
  console.error('    "Lord Vishnu" \\');
  console.error('    "god"');
  console.error('\nCategory must be either "god" or "goddess"');
  process.exit(1);
}

const [deityUrl, deityId, deityTitle, category] = args;

// Validate category
if (category !== 'god' && category !== 'goddess') {
  console.error('❌ Error: Category must be either "god" or "goddess"');
  process.exit(1);
}

// Validate URL
if (!deityUrl.includes('drikpanchang.com')) {
  console.error('❌ Error: URL must be from drikpanchang.com');
  process.exit(1);
}

/**
 * Extract transliteration from English mantra
 * Removes "Om" prefix and mantra ending (Namah, Namaha, etc.)
 */
function extractTransliteration(mantraEnglish) {
  if (!mantraEnglish) return '';
  
  // Remove "Om" and common endings
  let transliteration = mantraEnglish
    .replace(/^Om\s+/i, '')
    .replace(/\s+Namah[aḥ]?[।।]?$/i, '')
    .trim();
  
  return transliteration;
}

/**
 * Clean and format text
 */
function cleanText(text) {
  if (!text) return '';
  return text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/।+$/, '')
    .trim();
}

/**
 * Escape single quotes for JavaScript code generation
 */
function escapeSingleQuotes(text) {
  return text.replace(/'/g, "\\'");
}

/**
 * Generate JavaScript code for the deity
 */
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
 * Main scraping function using Playwright
 */
async function scrapeAshtottaram() {
  console.log('🚀 Starting Playwright scraper...\n');
  console.log(`📍 URL: ${deityUrl}`);
  console.log(`🏷️  Deity: ${deityTitle}`);
  console.log(`📁 ID: ${deityId}`);
  console.log(`📂 Category: ${category}\n`);
  
  let browser;
  
  try {
    // Launch browser
    console.log('🌐 Launching browser...');
    browser = await playwright.chromium.launch({
      headless: true, // Set to false for debugging
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    });
    
    const page = await context.newPage();
    
    // Navigate to the page
    console.log('📄 Loading page...');
    await page.goto(deityUrl, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Wait for content to load
    await page.waitForSelector('article', { timeout: 10000 });
    console.log('✅ Page loaded successfully\n');
    
    // Extract the 108 names
    console.log('🔍 Extracting names...');
    const names = await page.evaluate(() => {
      const results = [];
      
      // Find the article container with all names
      const article = document.querySelector('article');
      if (!article) return results;
      
      // Get all name containers (each name is in a div with three child divs)
      const nameContainers = article.querySelectorAll('div > div > div');
      
      for (const container of nameContainers) {
        const childDivs = container.querySelectorAll(':scope > div');
        
        // Each name has 3 divs: name+number, mantras, meaning
        if (childDivs.length >= 3) {
          const nameDiv = childDivs[0];
          const mantraDiv = childDivs[1];
          const meaningDiv = childDivs[2];
          
          // Extract Sanskrit name and number
          const sanskritEl = nameDiv.querySelector('div:first-child');
          const numberEl = nameDiv.querySelector('div:last-child');
          
          // Extract mantras
          const mantraSanskritEl = mantraDiv.querySelector('div:first-child');
          const mantraEnglishEl = mantraDiv.querySelector('div:last-child');
          
          // Extract meaning
          const meaningText = meaningDiv.textContent?.trim();
          
          if (sanskritEl && numberEl && mantraSanskritEl && mantraEnglishEl && meaningText) {
            const sanskritText = sanskritEl.textContent?.trim();
            const numberText = numberEl.textContent?.trim().replace(/['"]/g, '');
            const mantraSanskrit = mantraSanskritEl.textContent?.trim();
            const mantraEnglish = mantraEnglishEl.textContent?.trim();
            
            // Only add if we have all required data
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
    
    // Close browser
    await browser.close();
    console.log('🔒 Browser closed\n');
    
    // Validate results
    if (names.length === 0) {
      console.error('❌ Error: No names were extracted from the page.');
      console.error('   The page structure might have changed or the URL is incorrect.');
      process.exit(1);
    }
    
    console.log(`✅ Found ${names.length} names\n`);
    
    if (names.length !== 108) {
      console.warn(`⚠️  Warning: Expected 108 names but found ${names.length}`);
    }
    
    // Process names - add transliteration
    const processedNames = names.map(name => ({
      ...name,
      sanskrit: cleanText(name.sanskrit),
      transliteration: extractTransliteration(name.mantra),
      mantraSanskrit: cleanText(name.mantraSanskrit),
      mantra: cleanText(name.mantra),
      meaning: cleanText(name.meaning)
    }));
    
    // Sort by number to ensure correct order
    processedNames.sort((a, b) => a.number - b.number);
    
    // Show preview
    console.log('📋 Preview of first 3 names:');
    processedNames.slice(0, 3).forEach(name => {
      console.log(`\n${name.number}. ${name.sanskrit} (${name.transliteration})`);
      console.log(`   ${name.mantra}`);
      console.log(`   ${name.meaning.substring(0, 50)}...`);
    });
    console.log();
    
    // Create output directory
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate outputs
    const jsCode = generateJSCode(deityId, deityTitle, category, processedNames);
    const jsonData = {
      id: deityId,
      name: deityTitle,
      title: 'Ashtottara Shatanamavali',
      description: `108 Names of ${deityTitle}`,
      image: `/images/${category === 'god' ? 'Gods' : 'Goddesses'}/${deityId}.png`,
      category: category,
      names: processedNames
    };
    
    // Write files
    const jsFile = path.join(outputDir, `${deityId}-ashtottaram.js`);
    const jsonFile = path.join(outputDir, `${deityId}-ashtottaram.json`);
    
    fs.writeFileSync(jsFile, jsCode);
    fs.writeFileSync(jsonFile, JSON.stringify(jsonData, null, 2));
    
    console.log('✅ Files generated successfully!\n');
    console.log(`📄 JavaScript: ${jsFile}`);
    console.log(`📄 JSON: ${jsonFile}\n`);
    
    // Integration instructions
    console.log('📝 Next steps:');
    console.log('1. Review the generated files');
    console.log('2. Copy the JavaScript code to src/data/ashtottaramData.js');
    console.log(`3. Add deity image to src/assets/images/${category === 'god' ? 'Gods' : 'Goddesses'}/${deityId}.png`);
    console.log('4. Test the app to verify the data displays correctly\n');
    
    console.log('✨ Scraping completed successfully!\n');
    
  } catch (error) {
    console.error('\n❌ Error during scraping:');
    console.error(error.message);
    
    if (error.message.includes('Target closed') || error.message.includes('Page closed')) {
      console.error('\n💡 Tip: The page might have redirected or closed unexpectedly.');
      console.error('   Try visiting the URL manually to check if it\'s accessible.');
    } else if (error.message.includes('timeout')) {
      console.error('\n💡 Tip: The page took too long to load.');
      console.error('   Check your internet connection or try again later.');
    } else if (error.message.includes('Executable doesn\'t exist')) {
      console.error('\n💡 Tip: Playwright browsers are not installed.');
      console.error('   Run: npx playwright install chromium');
    }
    
    if (browser) {
      await browser.close();
    }
    
    process.exit(1);
  }
}

// Run the scraper
scrapeAshtottaram();
