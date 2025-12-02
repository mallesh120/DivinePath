/**
 * Batch Ashtottaram Scraper
 * 
 * This script scrapes multiple deity Ashtottarams in sequence
 * 
 * Usage:
 *   node scripts/batch-scrape.js
 */

const { spawn } = require('child_process');
const path = require('path');

// List of popular deities to scrape
// Add more URLs as you find them on drikpanchang.com
const deities = [
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-shiva/shiva-ashtottara-shatanamavali.html',
    id: 'shiva',
    name: 'Lord Shiva',
    category: 'god'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-vishnu/vishnu-ashtottara-shatanamavali.html',
    id: 'vishnu',
    name: 'Lord Vishnu',
    category: 'god'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-krishna/krishna-ashtottara-shatanamavali.html',
    id: 'krishna',
    name: 'Lord Krishna',
    category: 'god'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-rama/rama-ashtottara-shatanamavali.html',
    id: 'rama',
    name: 'Lord Rama',
    category: 'god'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/god-hanuman/hanuman-ashtottara-shatanamavali.html',
    id: 'hanuman',
    name: 'Lord Hanuman',
    category: 'god'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/goddesses/lakshmi/lakshmi-ashtottara-shatanamavali.html',
    id: 'lakshmi',
    name: 'Goddess Lakshmi',
    category: 'goddess'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/goddesses/durga/durga-ashtottara-shatanamavali.html',
    id: 'durga',
    name: 'Goddess Durga',
    category: 'goddess'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/goddesses/saraswati/saraswati-ashtottara-shatanamavali.html',
    id: 'saraswati',
    name: 'Goddess Saraswati',
    category: 'goddess'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-surya/surya-ashtottara-shatanamavali.html',
    id: 'surya',
    name: 'Lord Surya',
    category: 'god'
  },
  {
    url: 'https://www.drikpanchang.com/deities-namavali/gods/lord-kartikeya/kartikeya-ashtottara-shatanamavali.html',
    id: 'kartikeya',
    name: 'Lord Kartikeya',
    category: 'god'
  }
];

let currentIndex = 0;
let successCount = 0;
let failCount = 0;

console.log('\n🕉️  Batch Ashtottaram Scraper');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Total deities to scrape: ${deities.length}\n`);

/**
 * Scrape a single deity
 */
function scrapeDeity(deity) {
  return new Promise((resolve, reject) => {
    console.log(`\n[${ currentIndex + 1}/${deities.length}] Scraping ${deity.name}...`);
    console.log(`URL: ${deity.url}\n`);
    
    const scriptPath = path.join(__dirname, 'scrape-ashtottaram.js');
    const child = spawn('node', [scriptPath, deity.url, deity.id, deity.name, deity.category]);
    
    let output = '';
    let errorOutput = '';
    
    child.stdout.on('data', (data) => {
      const text = data.toString();
      output += text;
      process.stdout.write(text);
    });
    
    child.stderr.on('data', (data) => {
      const text = data.toString();
      errorOutput += text;
      process.stderr.write(text);
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        successCount++;
        resolve({ deity, success: true });
      } else {
        failCount++;
        resolve({ deity, success: false, error: errorOutput });
      }
    });
  });
}

/**
 * Process all deities sequentially
 */
async function processAll() {
  for (const deity of deities) {
    await scrapeDeity(deity);
    currentIndex++;
    
    // Add a small delay between requests to be respectful to the server
    if (currentIndex < deities.length) {
      console.log('\n⏳ Waiting 2 seconds before next request...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  // Print summary
  console.log('\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 BATCH SCRAPING SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log(`Total attempted: ${deities.length}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}\n`);
  
  if (successCount > 0) {
    console.log('📁 All generated files are in: scripts/output/\n');
    console.log('📌 Next steps:');
    console.log('   1. Review all generated files in scripts/output/');
    console.log('   2. Copy the content from each *-ashtottaram.js file');
    console.log('   3. Paste into src/data/ashtottaramData.js');
    console.log('   4. Add missing deity images to src/assets/images/Gods/ and Goddesses/\n');
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

// Run the batch process
processAll().catch(error => {
  console.error('❌ Batch process error:', error);
  process.exit(1);
});
