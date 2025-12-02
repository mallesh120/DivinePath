/**
 * Ashtottaram Web Scraper
 * 
 * This script scrapes 108 names (Ashtottara Shatanamavali) of Hindu deities
 * from drikpanchang.com and converts them to the JSON format used in ashtottaramData.js
 * 
 * Usage:
 *   node scripts/scrape-ashtottaram.js <deity-url> <deity-id> <deity-name> <category>
 * 
 * Example:
 *   node scripts/scrape-ashtottaram.js \
 *     "https://www.drikpanchang.com/deities-namavali/gods/lord-shiva/shiva-ashtottara-shatanamavali.html" \
 *     "shiva" \
 *     "Lord Shiva" \
 *     "god"
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 4) {
  console.error('Usage: node scrape-ashtottaram.js <url> <deity-id> <deity-name> <category>');
  console.error('Example: node scrape-ashtottaram.js "https://www.drikpanchang.com/deities-namavali/gods/lord-shiva/shiva-ashtottara-shatanamavali.html" "shiva" "Lord Shiva" "god"');
  process.exit(1);
}

const [url, deityId, deityName, category] = args;

console.log(`\n🕉️  Ashtottaram Scraper`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
console.log(`Deity: ${deityName}`);
console.log(`URL: ${url}`);
console.log(`Category: ${category}`);
console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);

/**
 * Fetch HTML content from URL
 */
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Parse HTML and extract 108 names
 * This is a simple parser - may need adjustment based on actual HTML structure
 */
function parseAshtottaram(html) {
  const names = [];
  
  // Pattern 1: Look for numbered list items with Sanskrit text
  // Example: <td>1</td><td>ॐ नमः</td><td>Om Namah</td><td>Meaning</td>
  const tableRowRegex = /<tr[^>]*>[\s\S]*?<td[^>]*>(\d+)<\/td>[\s\S]*?<td[^>]*>(.*?)<\/td>[\s\S]*?<td[^>]*>(.*?)<\/td>[\s\S]*?<td[^>]*>(.*?)<\/td>[\s\S]*?<\/tr>/gi;
  
  let match;
  while ((match = tableRowRegex.exec(html)) !== null) {
    const number = parseInt(match[1]);
    let mantraSanskrit = cleanHTML(match[2]);
    let transliteration = cleanHTML(match[3]);
    let meaning = cleanHTML(match[4]);
    
    // Extract just the name from the mantra (remove "ॐ" and "नमः")
    let sanskrit = extractSanskritName(mantraSanskrit);
    
    // Extract just the name from the mantra text (remove "Om" and "Namah")
    let mantra = transliteration;
    transliteration = extractEnglishName(transliteration);
    
    names.push({
      number,
      sanskrit,
      transliteration,
      mantraSanskrit,
      mantra,
      meaning
    });
  }
  
  // If table parsing didn't work, try alternative patterns
  if (names.length === 0) {
    console.log('\n⚠️  Table parsing failed. Trying alternative patterns...\n');
    
    // Pattern 2: Look for list items
    const listItemRegex = /<li[^>]*>(.*?)<\/li>/gi;
    let itemNumber = 1;
    
    while ((match = listItemRegex.exec(html)) !== null && itemNumber <= 108) {
      const content = cleanHTML(match[1]);
      
      // Try to extract Sanskrit and meaning
      const parts = content.split(/[–—-]/);
      if (parts.length >= 2) {
        names.push({
          number: itemNumber,
          sanskrit: parts[0].trim(),
          transliteration: parts[0].trim(),
          mantraSanskrit: `ॐ ${parts[0].trim()} नमः।`,
          mantra: `Om ${parts[0].trim()} Namah`,
          meaning: parts[1].trim()
        });
        itemNumber++;
      }
    }
  }
  
  return names;
}

/**
 * Clean HTML tags and entities
 */
function cleanHTML(str) {
  return str
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp;
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

/**
 * Extract Sanskrit name from mantra
 * Example: "ॐ गणाध्यक्षाय नमः।" -> "गणाध्यक्ष"
 */
function extractSanskritName(mantra) {
  return mantra
    .replace(/ॐ\s*/g, '')
    .replace(/\s*नमः।?/g, '')
    .replace(/ाय$/g, '')
    .replace(/े$/g, '')
    .replace(/यै$/g, '')
    .trim();
}

/**
 * Extract English name from mantra
 * Example: "Om Ganadhyakshaya Namah" -> "Ganadhyaksha"
 */
function extractEnglishName(mantra) {
  return mantra
    .replace(/^Om\s+/i, '')
    .replace(/\s+Namah?$/i, '')
    .replace(/aya$/i, 'a')
    .replace(/aye$/i, 'a')
    .replace(/yai$/i, '')
    .trim();
}

/**
 * Generate JavaScript object code
 */
function generateJSCode(deityId, deityName, category, names) {
  const imageCategory = category === 'god' ? 'Gods' : 'Goddesses';
  
  let code = `  ${deityId}: {\n`;
  code += `    id: '${deityId}',\n`;
  code += `    name: '${deityName}',\n`;
  code += `    title: '${deityName} Ashtottara Shatanamavali',\n`;
  code += `    description: '108 Names of ${deityName}',\n`;
  code += `    image: require('../assets/images/${imageCategory}/${deityId}.png'),\n`;
  code += `    category: '${category}',\n`;
  code += `    names: [\n`;
  
  names.forEach((name, index) => {
    code += `      { number: ${name.number}, sanskrit: '${escapeSingleQuotes(name.sanskrit)}', transliteration: '${escapeSingleQuotes(name.transliteration)}', mantraSanskrit: '${escapeSingleQuotes(name.mantraSanskrit)}', mantra: '${escapeSingleQuotes(name.mantra)}', meaning: '${escapeSingleQuotes(name.meaning)}' }`;
    if (index < names.length - 1) {
      code += ',\n';
    } else {
      code += '\n';
    }
  });
  
  code += `    ]\n`;
  code += `  }`;
  
  return code;
}

/**
 * Escape single quotes in strings
 */
function escapeSingleQuotes(str) {
  return str.replace(/'/g, "\\'");
}

/**
 * Generate JSON format
 */
function generateJSON(deityId, deityName, category, names) {
  return JSON.stringify({
    id: deityId,
    name: deityName,
    title: `${deityName} Ashtottara Shatanamavali`,
    description: `108 Names of ${deityName}`,
    image: `../assets/images/${category === 'god' ? 'Gods' : 'Goddesses'}/${deityId}.png`,
    category: category,
    names: names
  }, null, 2);
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log('📥 Fetching HTML...');
    const html = await fetchHTML(url);
    console.log('✅ HTML fetched successfully\n');
    
    console.log('🔍 Parsing 108 names...');
    const names = parseAshtottaram(html);
    console.log(`✅ Found ${names.length} names\n`);
    
    if (names.length === 0) {
      console.error('❌ No names found. The HTML structure might be different than expected.');
      console.log('\n💡 Tips:');
      console.log('   1. Check if the URL is correct');
      console.log('   2. Try opening the URL in a browser to verify the page structure');
      console.log('   3. You may need to manually adjust the parsing logic in this script\n');
      process.exit(1);
    }
    
    if (names.length !== 108) {
      console.warn(`⚠️  Warning: Expected 108 names but found ${names.length}\n`);
    }
    
    // Generate JavaScript code
    console.log('📝 Generating JavaScript code...');
    const jsCode = generateJSCode(deityId, deityName, category, names);
    
    // Generate JSON
    const jsonData = generateJSON(deityId, deityName, category, names);
    
    // Create output directory
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save JavaScript code
    const jsFilePath = path.join(outputDir, `${deityId}-ashtottaram.js`);
    fs.writeFileSync(jsFilePath, jsCode, 'utf8');
    console.log(`✅ JavaScript code saved to: ${jsFilePath}\n`);
    
    // Save JSON
    const jsonFilePath = path.join(outputDir, `${deityId}-ashtottaram.json`);
    fs.writeFileSync(jsonFilePath, jsonData, 'utf8');
    console.log(`✅ JSON data saved to: ${jsonFilePath}\n`);
    
    // Print preview
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Preview (first 3 names):');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    names.slice(0, 3).forEach(name => {
      console.log(`${name.number}. ${name.sanskrit} (${name.transliteration})`);
      console.log(`   Mantra: ${name.mantraSanskrit}`);
      console.log(`   Meaning: ${name.meaning}\n`);
    });
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Scraping completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📌 Next steps:');
    console.log(`   1. Review the generated files in: ${outputDir}`);
    console.log(`   2. Copy the content from ${deityId}-ashtottaram.js`);
    console.log('   3. Paste it into src/data/ashtottaramData.js');
    console.log(`   4. Add deity image: src/assets/images/${category === 'god' ? 'Gods' : 'Goddesses'}/${deityId}.png\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
