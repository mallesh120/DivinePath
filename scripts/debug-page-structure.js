/**
 * Debug Page Structure - Playwright
 * 
 * This script helps diagnose why certain pages aren't being scraped correctly.
 * It loads a page and prints the HTML structure to help identify the correct selectors.
 * 
 * Usage:
 *   node scripts/debug-page-structure.js <url>
 * 
 * Example:
 *   node scripts/debug-page-structure.js "https://www.drikpanchang.com/deities-namavali/gods/lord-krishna/108-krishna-names.html"
 */

const playwright = require('playwright');
const fs = require('fs');
const path = require('path');

async function debugPageStructure(url) {
  console.log('🔍 Debugging Page Structure');
  console.log('=' .repeat(60));
  console.log(`URL: ${url}`);
  console.log('=' .repeat(60));
  
  const browser = await playwright.chromium.launch({ headless: false }); // Set to false to see the browser
  const page = await browser.newPage();
  
  try {
    console.log('\n⏳ Loading page...');
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(3000); // Wait for JS to render
    
    console.log('✅ Page loaded\n');
    
    // Try different selectors
    console.log('🔎 Testing selectors:\n');
    
    // Test 1: article element
    const articleExists = await page.$('article');
    console.log(`1. article element: ${articleExists ? '✅ Found' : '❌ Not found'}`);
    
    if (articleExists) {
      const articleHTML = await page.$eval('article', el => el.outerHTML.substring(0, 500));
      console.log(`   Preview: ${articleHTML}...\n`);
    }
    
    // Test 2: Direct children of article
    const articleDivs = await page.$$('article > div');
    console.log(`2. article > div: ${articleDivs.length} found`);
    
    // Test 3: Three-level nesting
    const threeLevelDivs = await page.$$('article > div > div > div');
    console.log(`3. article > div > div > div: ${threeLevelDivs.length} found`);
    
    // Test 4: Alternative selectors
    const dpContent = await page.$$('.dp-content');
    console.log(`4. .dp-content class: ${dpContent.length} found`);
    
    const dpNamesList = await page.$$('.dp-names-list');
    console.log(`5. .dp-names-list class: ${dpNamesList.length} found`);
    
    const nameItems = await page.$$('.name-item');
    console.log(`6. .name-item class: ${nameItems.length} found`);
    
    // Test 5: Check for table structure
    const tables = await page.$$('table');
    console.log(`7. table elements: ${tables.length} found`);
    
    const tableRows = await page.$$('tr');
    console.log(`8. tr elements: ${tableRows.length} found`);
    
    // Test 6: Look for specific text patterns
    console.log('\n🔎 Searching for name patterns:\n');
    
    const pageContent = await page.content();
    
    // Check if Sanskrit names are present
    const hasOmPattern = pageContent.includes('ॐ') || pageContent.includes('Om');
    console.log(`Sanskrit Om (ॐ) found: ${hasOmPattern ? '✅ Yes' : '❌ No'}`);
    
    const hasNamePattern = /\d+\.\s*[\u0900-\u097F]+/.test(pageContent);
    console.log(`Numbered Sanskrit names found: ${hasNamePattern ? '✅ Yes' : '❌ No'}`);
    
    // Extract all h1, h2, h3 to understand page structure
    console.log('\n📝 Page headings:');
    const headings = await page.$$eval('h1, h2, h3', elements => 
      elements.map(el => ({ tag: el.tagName, text: el.textContent.trim() }))
    );
    headings.slice(0, 10).forEach((h, i) => {
      console.log(`   ${i + 1}. ${h.tag}: ${h.text}`);
    });
    
    // Try to extract any div containing numbers and Sanskrit
    console.log('\n🔍 Looking for content divs with Sanskrit text:');
    const potentialNameDivs = await page.$$eval('div', divs => {
      return divs
        .map((div, index) => {
          const text = div.textContent.trim();
          const hasSanskrit = /[\u0900-\u097F]/.test(text);
          const hasNumber = /^\d+\./.test(text);
          const children = div.children.length;
          
          if (hasSanskrit && text.length < 200) {
            return {
              index,
              children,
              hasNumber,
              preview: text.substring(0, 100)
            };
          }
          return null;
        })
        .filter(item => item !== null)
        .slice(0, 5); // First 5 matches
    });
    
    potentialNameDivs.forEach((div, i) => {
      console.log(`\n   Match ${i + 1}:`);
      console.log(`   - Children: ${div.children}`);
      console.log(`   - Has number: ${div.hasNumber}`);
      console.log(`   - Preview: ${div.preview}...`);
    });
    
    // Save full HTML for manual inspection
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const htmlPath = path.join(outputDir, 'debug-page.html');
    fs.writeFileSync(htmlPath, pageContent, 'utf8');
    console.log(`\n💾 Full page HTML saved to: ${htmlPath}`);
    
    console.log('\n✅ Debug complete. Review the output above and the HTML file.');
    console.log('💡 Use the selector information to update the scraper code.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await browser.close();
  }
}

// Get URL from command line
const url = process.argv[2];

if (!url) {
  console.error('❌ Error: No URL provided');
  console.error('\nUsage:');
  console.error('  node scripts/debug-page-structure.js <url>');
  console.error('\nExample:');
  console.error('  node scripts/debug-page-structure.js "https://www.drikpanchang.com/deities-namavali/gods/lord-krishna/108-krishna-names.html"');
  process.exit(1);
}

debugPageStructure(url).catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
