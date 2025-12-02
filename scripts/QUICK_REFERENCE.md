# Playwright Scraper - Quick Reference Card

## 🚀 Installation (First Time)
```bash
npm install playwright
npx playwright install chromium
```

## ✅ Test Setup
```bash
npm run test-playwright
# or
node scripts/test-playwright-setup.js
```

## 🎯 Single Deity Scrape
```bash
node scripts/scrape-playwright.js \
  "<URL>" \
  "<deity-id>" \
  "<Deity Title>" \
  "<category>"
```

**Example:**
```bash
node scripts/scrape-playwright.js \
  "https://www.drikpanchang.com/deities-namavali/gods/lord-vishnu/108-vishnu-names.html" \
  "vishnu" \
  "Lord Vishnu" \
  "god"
```

## 🔥 Batch Scrape (8 Deities)
```bash
npm run scrape-batch
# or
node scripts/batch-scrape-playwright.js
```

## 📁 Output Location
```
scripts/output/
  ├── vishnu-ashtottaram.js
  ├── vishnu-ashtottaram.json
  ├── shiva-ashtottaram.js
  ├── shiva-ashtottaram.json
  └── ...
```

## 🔗 Popular URLs

### Gods
- **Vishnu:** `/gods/lord-vishnu/108-vishnu-names.html`
- **Shiva:** `/gods/lord-shiva/108-shiva-names.html`
- **Krishna:** `/gods/lord-krishna/108-krishna-names.html`
- **Rama:** `/gods/lord-rama/108-rama-names.html`
- **Hanuman:** `/gods/god-hanuman/108-hanuman-names.html`
- **Ganesha:** `/gods/lord-ganesha/108-ganesha-names.html`

### Goddesses
- **Lakshmi:** `/goddesses/lakshmi/108-lakshmi-names.html`
- **Durga:** `/goddesses/durga/108-durga-names.html`
- **Saraswati:** `/goddesses/saraswati/108-saraswati-names.html`

Base URL: `https://www.drikpanchang.com/deities-namavali`

## 🛠️ Integration Steps

1. **Review output:**
   ```bash
   cat scripts/output/vishnu-ashtottaram.js
   ```

2. **Copy to app:**
   - Open `src/data/ashtottaramData.js`
   - Copy export from output file
   - Add to exports object

3. **Add image:**
   - Place in `src/assets/images/Gods/` or `Goddesses/`
   - Name: `{deity-id}.png`
   - Recommended size: 400x400px

4. **Test:**
   ```bash
   npm start
   # Navigate to /ashtottaram
   ```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Playwright not found | `npm install playwright` |
| Browser not found | `npx playwright install chromium` |
| Timeout error | Check internet, verify URL works manually |
| No names found | URL incorrect or page structure changed |
| Wrong count | Check output, manually add missing names |

## 📖 Documentation

- **Complete Guide:** `scripts/PLAYWRIGHT_GUIDE.md`
- **General Docs:** `scripts/README.md`
- **Summary:** `scripts/PLAYWRIGHT_SCRAPER_SUMMARY.md`

## ⚡ Commands Summary

| Task | Command |
|------|---------|
| Test setup | `npm run test-playwright` |
| Single scrape | `node scripts/scrape-playwright.js <args>` |
| Batch scrape | `npm run scrape-batch` |
| View output | `ls scripts/output/` |
| Start app | `npm start` |

## 💡 Tips

- ✅ Test with one deity first
- ✅ Always review output files
- ✅ Keep backups of ashtottaramData.js
- ✅ Use 3s delay between requests (already set)
- ✅ Fall back to manual formatter if issues occur

## 🎓 Need Help?

1. Check error message (they're descriptive)
2. Run test script: `npm run test-playwright`
3. Read PLAYWRIGHT_GUIDE.md
4. Try manual formatter as fallback

---

**Quick Links:**
- 📖 Full Guide: [PLAYWRIGHT_GUIDE.md](./PLAYWRIGHT_GUIDE.md)
- 📚 Detailed Summary: [PLAYWRIGHT_SCRAPER_SUMMARY.md](./PLAYWRIGHT_SCRAPER_SUMMARY.md)
- 🔧 Setup Test: `npm run test-playwright`

---

✨ Happy scraping! 🙏
