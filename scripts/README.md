# Ashtottaram Data Tools

## 🎯 **Recommended: Manual Data Entry with Formatter** (Most Reliable)

The web scraping approach is complex due to website structure. The best method is to manually copy data and use our formatter.

### Quick Steps:

1. **Visit drikpanchang.com** and find a deity's 108 names page
2. **Copy the text** (all 108 names with Sanskrit, transliteration, mantras, meanings)
3. **Create a text file** with 5 lines per name:
   ```
   गजानन
   Gajanana
   ॐ गजाननाय नमः।
   Om Gajananaya Namah
   Elephant-Faced Lord
   
   गणाध्यक्ष
   Ganadhyaksha
   ॐ गणाध्यक्षाय नमः।
   Om Ganadhyakshaya Namah
   Lord of All Ganas
   
   ... (repeat for all 108 names)
   ```

4. **Run the formatter:**
   ```bash
   node scripts/format-ashtottaram.js shiva-names.txt shiva "Lord Shiva" god
   ```

5. **Copy generated code** from `scripts/output/shiva-ashtottaram.js`
6. **Paste** into `src/data/ashtottaramData.js`
7. **Add deity image** to `src/assets/images/Gods/` or `Goddesses/`

### 📁 Available Tools

- **format-ashtottaram.js** - Converts manually copied text to JSON format (RECOMMENDED ✅)
- **scrape-playwright.js** - Browser automation scraper using Playwright (NEW 🤖)
- **scrape-ashtottaram.js** - Basic HTTP scraper (may need adjustment)
- **batch-scrape.js** - Batch scraping (experimental)
- **find-ashtottaram-urls.js** - URL discovery tool

---

## 🕉️ Web Scraping Scripts

### Option 1: Playwright Scraper (🤖 NEW - Automated Browser Automation)

**File:** `scrape-playwright.js`

Automated browser-based scraper using Playwright. Opens a real browser, navigates the website, and extracts data automatically - just like a human would!

**Prerequisites:**
```bash
# Install Playwright (if not already installed)
npm install playwright

# Install Chromium browser
npx playwright install chromium
```

**Usage:**
```bash
node scripts/scrape-playwright.js <deity-url> <deity-id> <deity-title> <category>
```

**Example:**
```bash
# Scrape Lord Vishnu's 108 names
node scripts/scrape-playwright.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-vishnu/108-vishnu-names.html" \
  "vishnu" \
  "Lord Vishnu" \
  "god"

# Scrape Goddess Lakshmi's 108 names
node scripts/scrape-playwright.js \
  "https://www.drikpanchang.com/deities-namavali/goddesses/lakshmi/108-lakshmi-names.html" \
  "lakshmi" \
  "Goddess Lakshmi" \
  "goddess"
```

**Features:**
- ✅ **Fully automated** - Just provide the URL and it does the rest
- ✅ **Real browser** - Handles JavaScript-rendered content perfectly
- ✅ **Complete extraction** - Gets all 108 names with Sanskrit, transliteration, mantras, and meanings
- ✅ **Formatted output** - Generates both `.js` and `.json` files ready to use
- ✅ **Reliable** - Works with the current website structure
- ✅ **Progress feedback** - Shows what it's doing at each step

**Output:**
- `scripts/output/{deity-id}-ashtottaram.js` - JavaScript module ready to copy
- `scripts/output/{deity-id}-ashtottaram.json` - JSON data for other uses

**When to use:**
- ✅ When you want to automate scraping multiple deities
- ✅ When the data is consistently structured on the website
- ✅ For bulk extraction of deity names
- ✅ When you want the most up-to-date data from the website

**📖 Detailed Guide:** See [PLAYWRIGHT_GUIDE.md](./PLAYWRIGHT_GUIDE.md) for complete instructions

---

### Option 2: Batch Playwright Scraper (🔥 For Multiple Deities)

**File:** `batch-scrape-playwright.js`

Scrape multiple deities automatically in one go!

**Usage:**
```bash
# Scrapes 8 popular deities automatically
node scripts/batch-scrape-playwright.js
```

**Features:**
- ✅ Scrapes 8 deities: Vishnu, Shiva, Krishna, Rama, Hanuman, Lakshmi, Durga, Saraswati
- ✅ Respectful delays between requests (3 seconds)
- ✅ Single browser instance (efficient)
- ✅ Progress tracking and summary report
- ✅ Generates all output files in one run

**Customize:**
Edit the `DEITIES` array in the script to add/remove deities

**When to use:**
- ✅ When you need to scrape 5+ deities
- ✅ For initial database population
- ✅ For bulk updates when website changes

---

### Option 3: HTTP Scraper (Basic - Legacy)

### 📁 Scraper Files

- **scrape-ashtottaram.js** - Single deity scraper
- **batch-scrape.js** - Batch scraper for multiple deities
- **output/** - Generated files saved here

### 🚀 Single Deity Scrape

```bash
node scripts/scrape-ashtottaram.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-shiva/shiva-ashtottara-shatanamavali.html" \
  "shiva" \
  "Lord Shiva" \
  "god"
```

**Note:** If this fails, the HTML structure may have changed. Use the manual formatter instead.

### 📋 Output

Generated files in `scripts/output/`:
- `{deity-id}-ashtottaram.js` - Ready to paste into ashtottaramData.js
- `{deity-id}-ashtottaram.json` - Raw JSON for reference
4. **Copy** the output and paste into `ashtottaramData.js`

### Even Quicker (macOS):
```bash
# After copying text to clipboard:
./scripts/quick_convert.sh
```

## Setup (First Time Only)

```bash
cd scripts
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Why This Approach Works Best

- ✅ **Reliable**: Works with any text format you copy
- ✅ **English Meanings**: Preserves the English translations you have
- ✅ **Clean Data**: Avoids HTML parsing issues
- ✅ **Fast**: Just copy, paste, convert - done!

## Web Scraper Note

The web scraper (`scrape_ashtottaram.py`) is included but may require adjustments based on website structure changes. Most deity name pages on drikpanchang.com have:
- Concatenated text without clear separators
- Meanings in Hindi instead of English
- Varying HTML structures

**Use the text converter instead** - it's much more reliable!

## Tools

### 1. Text Converter (Recommended - Easier!)

If you've already copied the names from a website, use this tool to convert to JavaScript format:

**Step 1:** Copy the deity names from the website (like drikpanchang.com)

**Step 2:** Save to a text file or pipe directly:

```bash
# Option A: Save to file first
cat > lakshmi_names.txt
# Paste the text (each line: Sanskrit, Transliteration, Number, Sanskrit Mantra, English Mantra, Meaning)
# Press Ctrl+D when done

python convert_text_to_js.py lakshmi_names.txt
```

```bash
# Option B: Pipe directly
pbpaste | python convert_text_to_js.py
```

**Step 3:** Copy the output and paste into `ashtottaramData.js`

### 2. Web Scraper (Advanced)

Automatically scrape from websites (may need URL adjustments):

```bash
python scrape_ashtottaram.py <URL>
```

**Note:** Website structures change frequently. The text converter is more reliable.

## Common Deity URLs (for reference)

- Lakshmi: Search "Lakshmi 108 names" on drikpanchang.com
- Durga: Search "Durga 108 names" on drikpanchang.com  
- Saraswati: Search "Saraswati 108 names" on drikpanchang.com
- Hanuman: Search "Hanuman 108 names" on drikpanchang.com
- Krishna: Search "Krishna 108 names" on drikpanchang.com
- Rama: Search "Rama 108 names" on drikpanchang.com

## Expected Input Format

The converter expects this format (6 lines per name):
```
शिव
Shiva
1
ॐ शिवाय नमः।
Om Shivaya Namah
One Who is the Most Auspicious
महेश्वर
Maheshvara
2
ॐ महेश्वराय नमः।
Om Maheshvaraya Namah
The One Who is Lord of Gods
...
```

## Output

Both tools will:
1. Print formatted JavaScript code ready to paste into `ashtottaramData.js`
2. Save a JSON backup file (scraper only)
3. Validate the data structure

## Quick Example

```bash
# Activate virtual environment
cd scripts
source venv/bin/activate

# Copy text from website using your browser
# Then convert it:
pbpaste | python convert_text_to_js.py

# Output will be ready to paste into ashtottaramData.js
```

## Notes

- Each name includes: number, sanskrit, transliteration, mantraSanskrit, mantra, and meaning
- Output is ready to paste directly into the `names` array
- The converter handles escaping of special characters automatically

## Troubleshooting

If the script doesn't find names:
1. Check if the URL is correct
2. The website structure might have changed
3. Try viewing the page source to understand the HTML structure
4. You may need to adjust the parsing logic in the script
