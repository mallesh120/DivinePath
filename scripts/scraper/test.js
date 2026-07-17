const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeStotram(url) {
  const { data: html } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5'
    }
  });

  const $ = cheerio.load(html);
  console.log("HTML length:", html.length);
  console.log("Start of HTML:", html.substring(0, 200));
  
  const title = $('h2.posttitle').text().trim();
  console.log("Title:", title);
  
  const verses = [];
  $('div[data-role="content"] p').each((i, el) => {
    $(el).find('br').replaceWith('\n');
    const verseText = $(el).text().trim();
    if (verseText) {
      verses.push(verseText);
    }
  });

  console.log("Verses length:", verses.length);
  if (verses.length > 0) {
    console.log("First verse:", verses[0]);
  }
}

scrapeStotram('https://vignanam.org/mobile/english/ganapati-prarthana-ghanapatham.html');
