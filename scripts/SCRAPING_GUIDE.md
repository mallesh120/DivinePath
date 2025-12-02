# Ashtottaram Scraping Tool - Complete Guide

## ✅ Working Solution Created!

I've created a **Manual Data Entry Formatter** that converts manually copied Ashtottaram data into the DivinePath JSON format. This is the most reliable approach.

---

## 🎯 Quick Start (Recommended Method)

### Step 1: Find the Deity Data

Visit drikpanchang.com and navigate to:
- **108 Names Collection**: https://www.drikpanchang.com/deities-namavali/deities-ashtottara-shatanamavali.html
- Click on any deity to see their 108 names

### Step 2: Copy the Data

From the deity's page, copy all 108 names. The data should include:
- Sanskrit name (Devanagari script)
- Transliteration (English)
- Sanskrit mantra (with ॐ ... नमः।)
- English mantra (Om ... Namah)
- Meaning/Significance

### Step 3: Create Input File

Create a text file with **5 lines per name** (one blank line between names):

```text
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

**Save as:** `shiva-names.txt` (or any name)

### Step 4: Run the Formatter

```bash
node scripts/format-ashtottaram.js shiva-names.txt shiva "Lord Shiva" god
```

**Parameters:**
- `shiva-names.txt` - Your input file
- `shiva` - Deity ID (lowercase, no spaces)
- `"Lord Shiva"` - Full deity name
- `god` - Category (`god` or `goddess`)

### Step 5: Review Output

Check the generated files in `scripts/output/`:
- `shiva-ashtottaram.js` - JavaScript object ready to paste
- `shiva-ashtottaram.json` - JSON data for reference

### Step 6: Integrate into App

1. Open `src/data/ashtottaramData.js`
2. Copy content from `scripts/output/shiva-ashtottaram.js`
3. Paste into the `ashtottaramData` object (add comma after previous entry)
4. Add deity image: `src/assets/images/Gods/shiva.png`

---

## 📁 Files Created

### Main Tools

1. **`scripts/format-ashtottaram.js`** ✅ WORKING
   - Converts manually copied text to JSON format
   - **This is your primary tool**

2. **`scripts/scrape-ashtottaram.js`** ⚠️ EXPERIMENTAL
   - Attempts automated web scraping
   - May need HTML parsing adjustments

3. **`scripts/batch-scrape.js`** ⚠️ EXPERIMENTAL
   - Batch scraping multiple deities
   - Requires correct URLs

4. **`scripts/find-ashtottaram-urls.js`** ⚠️ EXPERIMENTAL
   - URL discovery tool
   - Website structure makes this challenging

### Sample Files

- **`scripts/sample-input.txt`** - Example input format
- **`scripts/output/`** - Generated files directory

---

## 📋 Complete Example

### Example 1: Lord Shiva

1. **Visit**: https://www.drikpanchang.com/deities-namavali/deities-ashtottara-shatanamavali.html
2. **Find**: Shiva Ashtottara Shatanamavali
3. **Copy** all 108 names
4. **Create**: `shiva-names.txt` with proper format
5. **Run**:
   ```bash
   node scripts/format-ashtottaram.js shiva-names.txt shiva "Lord Shiva" god
   ```
6. **Copy** from: `scripts/output/shiva-ashtottaram.js`
7. **Paste** into: `src/data/ashtottaramData.js`
8. **Add image**: `src/assets/images/Gods/shiva.png`

### Example 2: Goddess Lakshmi

```bash
node scripts/format-ashtottaram.js lakshmi-names.txt lakshmi "Goddess Lakshmi" goddess
```

Image path: `src/assets/images/Goddesses/lakshmi.png`

---

## 🎯 Popular Deities to Add

### Gods (पुरुष देवता)
- ✅ Ganesha (already done)
- Shiva
- Vishnu
- Krishna
- Rama
- Hanuman
- Surya (Sun God)
- Kartikeya/Murugan
- Narasimha
- Venkateswara
- Shani (Saturn)
- Dattatreya

### Goddesses (देवी)
- Lakshmi (partial - needs completion)
- Saraswati (partial - needs completion)
- Durga
- Kali
- Parvati
- Annapurna
- Meenakshi
- Kamakshi
- Sita
- Radha
- Gayatri
- Santoshi Mata

---

## 🔧 Troubleshooting

### Problem: "No names found"

**Solution:** Check your input file format. Each name should have exactly 5 lines:
1. Sanskrit name
2. Transliteration
3. Sanskrit mantra
4. English mantra
5. Meaning

### Problem: "Expected 108 names but found X"

**Solution:** 
- Verify all 108 names are in the file
- Check for missing blank lines between names
- Ensure consistent formatting

### Problem: Special characters not displaying correctly

**Solution:**
- Save text file with UTF-8 encoding
- Use a text editor that supports Devanagari script
- On macOS: TextEdit works fine

### Problem: Formatter crashes

**Solution:**
- Check file path is correct
- Ensure Node.js is installed (v14+)
- Verify file is not empty

---

## 📊 Progress Tracking

Create a checklist to track which deities you've added:

```markdown
### Gods
- [x] Ganesha
- [ ] Shiva  
- [ ] Vishnu
- [ ] Krishna
- [ ] Rama
- [ ] Hanuman
- [ ] Surya
- [ ] Kartikeya

### Goddesses
- [ ] Lakshmi (partial - needs 98 more names)
- [ ] Saraswati (partial - needs 98 more names)
- [ ] Durga
- [ ] Kali
- [ ] Parvati
```

---

## 🚀 Next Steps

1. **Start with popular deities**: Shiva, Vishnu, Krishna, Rama, Hanuman
2. **Complete partial entries**: Lakshmi and Saraswati
3. **Add goddess**: Durga, Kali, Parvati
4. **Gather images**: Find or create deity images
5. **Test in app**: Visit `/ashtottaram` page after each addition

---

## 📝 Notes

- **Data Source**: drikpanchang.com is a reliable source for authentic Ashtottarams
- **Verification**: Always review the generated data for accuracy
- **Attribution**: Consider adding attribution to drikpanchang.com in your app
- **Images**: Ensure you have proper rights/permissions for deity images

---

## 🙏 Tips for Best Results

1. **Copy carefully** - Ensure all 108 names are included
2. **Check formatting** - 5 lines per name, blank line between
3. **Review output** - Always check the generated JavaScript before adding to app
4. **Test incrementally** - Add one deity at a time and test
5. **Keep backups** - Save your input text files for future reference

---

**Made with 🕉️ for DivinePath**

Happy Ashtottaram adding! 🙏
