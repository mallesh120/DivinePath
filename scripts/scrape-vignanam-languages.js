/**
 * Vaidika Vignanam Language Scraper
 * 
 * Scrapes stotrams in multiple languages from vignanam.org based on the titles
 * present in english.json.
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const LANGUAGES = ['sanskrit', 'telugu', 'tamil', 'kannada', 'malayalam', 'gujarati', 'oriya', 'bengali', 'hindi'];
const ENGLISH_JSON_PATH = path.join(__dirname, '../public/data/stotrams/english.json');
const SITEMAP_PATH = path.join(__dirname, '../vignanam_sitemap.xml');
const OUTPUT_DIR = path.join(__dirname, '../public/data/stotrams');

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log('Starting Vaidika Vignanam language scraper...');
  
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error('vignanam_sitemap.xml not found! Please run the scratch script to fetch it first.');
    process.exit(1);
  }

  const sitemap = fs.readFileSync(SITEMAP_PATH, 'utf8');
  const sitemapUrls = new Set();
  const regex = /<loc>\s*([^<]+)\s*<\/loc>/g;
  let match;
  while ((match = regex.exec(sitemap)) !== null) {
    sitemapUrls.add(match[1].trim());
  }

  const englishData = JSON.parse(fs.readFileSync(ENGLISH_JSON_PATH, 'utf8'));
  const validSlugs = [];

  // 1. Map to slugs
  englishData.forEach(stotram => {
    const slug = stotram.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const urlPath = `english/${slug}.html`;
    
    if (sitemapUrls.has(urlPath)) {
      validSlugs.push({
        title: stotram.title,
        category: stotram.category,
        slug: slug
      });
    } else {
      // Fuzzy mapping attempts can be added here
      // console.log(`Skipping: ${stotram.title} (No exact slug match found)`);
    }
  });

  console.log(`Found ${validSlugs.length} stotrams with valid slugs out of ${englishData.length}.`);

  // Initialize output data
  const outputData = {};
  LANGUAGES.forEach(lang => outputData[lang] = []);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // 2. Scrape each language for each valid slug
  for (let i = 0; i < validSlugs.length; i++) {
    const item = validSlugs[i];
    console.log(`\n[${i + 1}/${validSlugs.length}] Scraping: ${item.title}`);
    
    for (const lang of LANGUAGES) {
      const url = `https://vignanam.org/${lang}/${item.slug}.html`;
      
      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
        
        // Check for 404
        const is404 = await page.evaluate(() => document.title.includes('404') || document.body.innerText.includes('Not Found'));
        if (is404) {
          console.log(`  - ${lang}: Not Found`);
          continue;
        }

        const verses = await page.evaluate(() => {
          const content = document.querySelector('#content') || document.querySelector('.content') || document.body;
          if (!content) return [];
          const elements = Array.from(content.querySelectorAll('p, .stotra-text, .verse'));
          return elements.map(el => el.innerText.trim()).filter(t => t.length > 0);
        });

        if (verses.length > 0) {
          outputData[lang].push({
            category: item.category,
            title: item.title,
            verses: verses
          });
          console.log(`  - ${lang}: Success (${verses.length} verses)`);
        } else {
          console.log(`  - ${lang}: No verses extracted`);
        }
      } catch (err) {
        console.error(`  - ${lang}: Error (${err.message.split('\\n')[0]})`);
      }
      
      // Delay to respect server
      await delay(1000);
    }
    
    // Save partial progress every 10 stotrams
    if (i > 0 && i % 10 === 0) {
      console.log('Saving partial progress...');
      saveData(outputData);
    }
  }

  await browser.close();

  // Final save
  console.log('\\nScraping complete. Saving final JSON files...');
  saveData(outputData);
}

function saveData(data) {
  LANGUAGES.forEach(lang => {
    if (data[lang].length > 0) {
      const filePath = path.join(OUTPUT_DIR, `${lang}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data[lang], null, 2));
    }
  });
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
