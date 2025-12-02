# Playwright Scraper Quick Start Guide

## 🚀 Getting Started

### Installation

1. **Install Playwright** (one-time setup):
```bash
npm install playwright
```

2. **Install browser** (one-time setup):
```bash
npx playwright install chromium
```

That's it! You're ready to scrape.

---

## 📖 Usage Guide

### Single Deity Scraping

Use `scrape-playwright.js` to scrape one deity at a time.

**Command:**
```bash
node scripts/scrape-playwright.js <deity-url> <deity-id> <deity-title> <category>
```

**Examples:**

```bash
# Lord Vishnu
node scripts/scrape-playwright.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-vishnu/108-vishnu-names.html" \
  "vishnu" \
  "Lord Vishnu" \
  "god"

# Goddess Lakshmi
node scripts/scrape-playwright.js \
  "https://www.drikpanchang.com/deities-namavali/goddesses/lakshmi/108-lakshmi-names.html" \
  "lakshmi" \
  "Goddess Lakshmi" \
  "goddess"

# Lord Shiva
node scripts/scrape-playwright.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-shiva/108-shiva-names.html" \
  "shiva" \
  "Lord Shiva" \
  "god"
```

**Parameters:**
- `deity-url`: Full URL to the deity's 108 names page on drikpanchang.com
- `deity-id`: Short identifier (e.g., "vishnu", "lakshmi") - used for filenames
- `deity-title`: Display name (e.g., "Lord Vishnu", "Goddess Lakshmi")
- `category`: Either "god" or "goddess"

---

### Batch Scraping (Multiple Deities)

Use `batch-scrape-playwright.js` to scrape multiple deities automatically.

**Command:**
```bash
node scripts/batch-scrape-playwright.js
```

**Default deities included:**
- Lord Vishnu
- Lord Shiva
- Lord Krishna
- Lord Rama
- Lord Hanuman
- Goddess Lakshmi
- Goddess Durga
- Goddess Saraswati

**To customize:**
Edit the `DEITIES` array in `batch-scrape-playwright.js` to add/remove deities.

**Features:**
- ✅ Scrapes all deities sequentially
- ✅ 3-second delay between requests (respectful to server)
- ✅ Single browser instance (efficient)
- ✅ Progress tracking for each deity
- ✅ Summary report at the end

---

## 📁 Output Files

Both scripts generate two files per deity:

1. **JavaScript file:** `scripts/output/{deity-id}-ashtottaram.js`
   - Ready to copy into `src/data/ashtottaramData.js`
   - Formatted as an ES6 export

2. **JSON file:** `scripts/output/{deity-id}-ashtottaram.json`
   - Pure data format
   - Useful for other purposes

**Example output structure:**
```javascript
export const vishnuAshtottaram = {
  id: 'vishnu',
  name: 'Lord Vishnu',
  title: 'Ashtottara Shatanamavali',
  description: 'The Preserver, one of the principal deities of Hinduism',
  image: '/images/Gods/vishnu.png',
  category: 'god',
  names: [
    {
      number: 1,
      sanskrit: 'विष्णु',
      transliteration: 'Vishnu',
      mantraSanskrit: 'ॐ विष्णवे नमः।',
      mantra: 'Om Vishnave Namah',
      meaning: 'The All-Pervading Lord'
    },
    // ... 107 more names
  ]
};
```

---

## 🔧 Integration Steps

After scraping, follow these steps to add the data to your app:

### 1. Review Generated Files
```bash
# Check the output
ls scripts/output/
cat scripts/output/vishnu-ashtottaram.js
```

### 2. Copy to App Data File
```javascript
// Open src/data/ashtottaramData.js
// Copy the export from the generated file
// Add it to the exports object

export const ashtottaramData = {
  ganesha: ganeshaAshtottaram,
  vishnu: vishnuAshtottaram,  // ← Add your new deity here
  // ... other deities
};
```

### 3. Add Deity Image
Place the deity image in the appropriate folder:
- **Gods:** `src/assets/images/Gods/{deity-id}.png`
- **Goddesses:** `src/assets/images/Goddesses/{deity-id}.png`

Image requirements:
- Format: PNG (preferred) or JPG
- Recommended size: 400x400px minimum
- Transparent background preferred

### 4. Test in App
```bash
# Start the development server
npm start

# Navigate to /ashtottaram page
# Verify:
# - Deity appears in the list
# - Image displays correctly
# - All 108 names load
# - Sanskrit and transliteration are correct
# - Mantras and meanings display properly
```

---

## 🐛 Troubleshooting

### Browser Not Installed
**Error:** `Executable doesn't exist`

**Solution:**
```bash
npx playwright install chromium
```

### Timeout Errors
**Error:** `Timeout exceeded while waiting for selector`

**Causes:**
- Slow internet connection
- Website is down or slow
- Website structure changed

**Solutions:**
- Try again after a few minutes
- Check your internet connection
- Visit the URL manually to verify it's accessible

### No Names Extracted
**Error:** `No names were extracted from the page`

**Causes:**
- URL is incorrect
- Website structure has changed
- Page requires authentication or has restrictions

**Solutions:**
- Verify the URL by visiting it in a browser
- Check if the page shows 108 names when you visit it manually
- If structure changed, you may need to update the selector logic

### Wrong Number of Names
**Warning:** `Expected 108 names but found X`

**Causes:**
- Some names might have different HTML structure
- Page might be partially loaded

**Solutions:**
- Check the generated file to see which names are present
- Manually add missing names using the format-ashtottaram.js tool

---

## 🎯 Best Practices

1. **Test with one deity first** before batch scraping
2. **Check output files** to ensure data quality
3. **Add delays** between requests when scraping multiple deities
4. **Keep backups** of your ashtottaramData.js file
5. **Verify in app** after each addition

---

## 🆘 Need Help?

If you encounter issues:

1. **Check the console output** - it provides detailed error messages
2. **Verify the URL** - visit it manually in a browser
3. **Review the generated files** - check if data looks correct
4. **Use the manual formatter** as a fallback - always reliable!

---

## 📚 Available URLs

### Popular Gods
- **Lord Ganesha:** https://www.drikpanchang.com/deities-namavali/gods/lord-ganesha/108-ganesha-names.html
- **Lord Vishnu:** https://www.drikpanchang.com/deities-namavali/gods/lord-vishnu/108-vishnu-names.html
- **Lord Shiva:** https://www.drikpanchang.com/deities-namavali/gods/lord-shiva/108-shiva-names.html
- **Lord Krishna:** https://www.drikpanchang.com/deities-namavali/gods/lord-krishna/108-krishna-names.html
- **Lord Rama:** https://www.drikpanchang.com/deities-namavali/gods/lord-rama/108-rama-names.html
- **Lord Hanuman:** https://www.drikpanchang.com/deities-namavali/gods/god-hanuman/108-hanuman-names.html

### Popular Goddesses
- **Goddess Lakshmi:** https://www.drikpanchang.com/deities-namavali/goddesses/lakshmi/108-lakshmi-names.html
- **Goddess Durga:** https://www.drikpanchang.com/deities-namavali/goddesses/durga/108-durga-names.html
- **Goddess Saraswati:** https://www.drikpanchang.com/deities-namavali/goddesses/saraswati/108-saraswati-names.html

Find more at: https://www.drikpanchang.com/deities-namavali/deities-ashtottara-shatanamavali.html

---

## ✨ Quick Reference

| Task | Command |
|------|---------|
| Install Playwright | `npm install playwright` |
| Install browser | `npx playwright install chromium` |
| Scrape one deity | `node scripts/scrape-playwright.js <url> <id> <title> <category>` |
| Scrape multiple | `node scripts/batch-scrape-playwright.js` |
| View output | `ls scripts/output/` |
| Test in app | `npm start` |

---

Happy scraping! 🙏✨
