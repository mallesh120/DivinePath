# Ashtottaram Data Tools

## ⭐ **Recommended Approach: Copy & Paste with Converter**

The most reliable method is to copy the formatted data you already have and use the converter:

### Quick Steps:
1. **Copy** the deity names from your source (like you did for Vishnu and Shiva)
2. **Save** to a text file:
   ```bash
   cat > deity_names.txt
   # Paste the text (each group of 6 lines: Sanskrit, Transliteration, Number, Sanskrit Mantra, English Mantra, Meaning)
   # Press Ctrl+D when done
   ```
3. **Convert**:
   ```bash
   cd scripts
   source venv/bin/activate
   python convert_text_to_js.py deity_names.txt
   ```
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
