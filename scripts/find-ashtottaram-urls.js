/**
 * Ashtottaram URL Finder
 * 
 * This script helps you find the correct URLs for deity Ashtottarams
 * on drikpanchang.com by listing all available 108 names pages
 * 
 * Usage:
 *   node scripts/find-ashtottaram-urls.js
 */

const https = require('https');

console.log('\n🕉️  Ashtottaram URL Finder');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('Fetching list of available Ashtottarams...\n');

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
 * Extract deity URLs from the main collection page
 */
function extractDeityURLs(html) {
  const deities = [];
  
  // Pattern: Look for links to 108 names pages
  // Example: <a href="/deities-namavali/gods/lord-shiva/shiva-ashtottara-shatanamavali.html?lang=en">
  const linkRegex = /<a[^>]*href=["']([^"']*ashtottara-shatanamavali\.html(?:\?lang=en)?)["'][^>]*>(.*?)<\/a>/gi;
  
  let match;
  while ((match = linkRegex.exec(html)) !== null) {
    let url = match[1];
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    
    // Make URL absolute if it's relative
    if (url.startsWith('/')) {
      url = 'https://www.drikpanchang.com' + url;
    }
    
    // Remove ?lang=en parameter
    url = url.replace(/\?lang=en/, '');
    
    // Extract deity info from URL
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const deityId = fileName.replace('-ashtottara-shatanamavali.html', '');
    
    // Determine category from URL
    const category = url.includes('/gods/') ? 'god' : 'goddess';
    
    // Format deity name from text or ID
    let deityName = text || deityId;
    if (!deityName.startsWith('Lord') && !deityName.startsWith('Goddess')) {
      deityName = category === 'god' ? `Lord ${capitalize(deityId)}` : `Goddess ${capitalize(deityId)}`;
    }
    
    deities.push({
      url,
      id: deityId,
      name: deityName,
      category
    });
  }
  
  return deities;
}

/**
 * Capitalize first letter
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Generate batch-scrape.js content
 */
function generateBatchScript(deities) {
  let code = `/**
 * Batch Ashtottaram Scraper
 * Auto-generated deity list
 * 
 * Usage:
 *   node scripts/batch-scrape.js
 */

const { spawn } = require('child_process');
const path = require('path');

// List of deities to scrape (auto-discovered from drikpanchang.com)
const deities = [\n`;

  deities.forEach((deity, index) => {
    code += `  {\n`;
    code += `    url: '${deity.url}',\n`;
    code += `    id: '${deity.id}',\n`;
    code += `    name: '${deity.name}',\n`;
    code += `    category: '${deity.category}'\n`;
    code += `  }`;
    if (index < deities.length - 1) {
      code += ',\n';
    } else {
      code += '\n';
    }
  });

  code += `];\n\n// ... rest of batch scraper code follows ...\n`;
  
  return code;
}

/**
 * Main execution
 */
async function main() {
  try {
    const collectionsURL = 'https://www.drikpanchang.com/deities-namavali/deities-ashtottara-shatanamavali.html';
    
    console.log(`📥 Fetching from: ${collectionsURL}\n`);
    const html = await fetchHTML(collectionsURL);
    
    console.log('🔍 Extracting deity URLs...\n');
    const deities = extractDeityURLs(html);
    
    if (deities.length === 0) {
      console.log('❌ No Ashtottaram URLs found.');
      console.log('💡 You may need to manually find the URLs on drikpanchang.com\n');
      return;
    }
    
    console.log(`✅ Found ${deities.length} Ashtottarams!\n`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Print gods
    const gods = deities.filter(d => d.category === 'god');
    if (gods.length > 0) {
      console.log('🕉️  GODS:\n');
      gods.forEach((deity, i) => {
        console.log(`${i + 1}. ${deity.name} (${deity.id})`);
        console.log(`   ${deity.url}\n`);
      });
    }
    
    // Print goddesses
    const goddesses = deities.filter(d => d.category === 'goddess');
    if (goddesses.length > 0) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('🕉️  GODDESSES:\n');
      goddesses.forEach((deity, i) => {
        console.log(`${i + 1}. ${deity.name} (${deity.id})`);
        console.log(`   ${deity.url}\n`);
      });
    }
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📋 To scrape a single deity, use:\n');
    console.log('node scripts/scrape-ashtottaram.js \\');
    console.log(`  "${deities[0].url}" \\`);
    console.log(`  "${deities[0].id}" \\`);
    console.log(`  "${deities[0].name}" \\`);
    console.log(`  "${deities[0].category}"\n`);
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📝 URLs saved to: scripts/output/deity-urls.json\n');
    
    // Save to JSON file
    const fs = require('fs');
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const jsonPath = path.join(outputDir, 'deity-urls.json');
    fs.writeFileSync(jsonPath, JSON.stringify(deities, null, 2), 'utf8');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

const path = require('path');
main();
