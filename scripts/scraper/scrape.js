const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://vignanam.org/mobile/english/';
const INDEX_URL = `${BASE_URL}index.htm`;

// Helper to wait
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to fetch HTML
async function fetchHTML(url) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      }
    });
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

async function scrapeIndex() {
  console.log(`Fetching index: ${INDEX_URL}`);
  const html = await fetchHTML(INDEX_URL);
  if (!html) return [];

  const $ = cheerio.load(html);
  const categories = [];

  $('ul[data-role="listview"] > li').each((i, categoryEl) => {
    const categoryName = $(categoryEl).attr('data-filtertext');
    if (!categoryName) return;

    const stotrams = [];

    $(categoryEl).find('ul li a').each((j, stotramEl) => {
      const title = $(stotramEl).text().trim();
      const href = $(stotramEl).attr('href');
      
      let url = href;
      if (!href.startsWith('http')) {
        url = new URL(href, BASE_URL).href;
      }

      stotrams.push({
        title,
        url
      });
    });

    if (stotrams.length > 0) {
      categories.push({
        category: categoryName,
        stotrams
      });
    }
  });

  return categories;
}

async function scrapeStotram(url) {
  const html = await fetchHTML(url);
  if (!html) return null;

  const $ = cheerio.load(html);
  
  const title = $('h2.posttitle').text().trim();
  
  const verses = [];
  $('div[data-role="content"] p').each((i, el) => {
    $(el).find('br').replaceWith('\n');
    const verseText = $(el).text().trim();
    if (verseText) {
      verses.push(verseText);
    }
  });

  return {
    title,
    verses
  };
}

async function main() {
  console.log('Starting full scraper...');
  const categories = await scrapeIndex();
  console.log(`Found ${categories.length} categories.`);
  
  const results = [];
  
  for (let i = 0; i < categories.length; i++) {
    const categoryInfo = categories[i];
    console.log(`\nProcessing Category [${i + 1}/${categories.length}]: ${categoryInfo.category}`);
    
    for (let j = 0; j < categoryInfo.stotrams.length; j++) {
      const stotram = categoryInfo.stotrams[j];
      console.log(`  -> Fetching [${j + 1}/${categoryInfo.stotrams.length}]: ${stotram.title}`);
      
      const data = await scrapeStotram(stotram.url);
      if (data && data.verses.length > 0) {
        results.push({
          category: categoryInfo.category,
          ...data
        });
      }
      
      // Delay to be polite to the server
      await delay(500);
    }
  }

  const outputPath = path.join(__dirname, 'english_stotrams.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\nSuccessfully scraped and saved to ${outputPath}`);
}

main();
