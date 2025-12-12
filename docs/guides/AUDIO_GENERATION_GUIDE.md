# 🕉️ Generate Mantra Audio Files - Complete Guide

## ✅ FREE Text-to-Speech Solutions Available

### Option 1: Auto-Generate with Our Script (Recommended)

We've created a Node.js script that generates all 19 mantra audio files automatically!

#### Quick Start:
```bash
# Run from project root
npm run generate-mantras
```

or

```bash
node scripts/generate-mantras.js
```

#### What You Get:
- ✅ All 19 deity mantras
- ✅ Uses your system's TTS (free!)
- ✅ macOS: High-quality "say" command
- ✅ Other OS: Google Translate TTS
- ✅ No API keys needed

#### For MP3 Format (Optional):
Install ffmpeg to convert AIFF to MP3:
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian  
sudo apt-get install ffmpeg

# Windows
choco install ffmpeg
```

Then run: `npm run generate-mantras`

---

### Option 2: Install ffmpeg and Convert Existing AIFF Files

If you already ran the script and have `.aiff` files:

```bash
# Install ffmpeg
brew install ffmpeg

# Convert all AIFF to MP3
cd public/audio/mantras
for file in *.aiff; do
  ffmpeg -i "$file" -codec:a libmp3lame -qscale:a 2 "${file%.aiff}.mp3"
  rm "$file"
done
```

---

### Option 3: Use AIFF Files Directly

Browsers support AIFF format! Update the file extension in your code:

**In `src/data/godsData.js`**, change:
```javascript
mantraAudio: "/audio/mantras/ganesha.mp3"
```

To:
```javascript
mantraAudio: "/audio/mantras/ganesha.aiff"
```

Or use this find/replace:
- Find: `.mp3"`
- Replace: `.aiff"`

---

### Option 4: Manual Download from Wikimedia Commons

Limited availability, but you can download:
- [Gayatri Mantra](https://commons.wikimedia.org/wiki/File:Gayatri_mantra.ogg)
- [Om Namo Bhagavate Vasudevaya](https://commons.wikimedia.org/wiki/File:Om_Namo_Bhagavate_Vasudevaya_Pronunciation.oga)
- [Mrityunjaya Mantra](https://commons.wikimedia.org/wiki/File:Mrityunjaya.ogg)

---

### Option 5: Online TTS Services (Manual)

**Google Translate TTS:**
1. Go to https://translate.google.com
2. Enter mantra text (e.g., "Om Gam Ganapataye Namaha")
3. Set language to Hindi
4. Click speaker icon to hear
5. Download using browser extensions

**ResponsiveVoice.com:**
- Free web-based TTS
- Supports Hindi/Sanskrit
- Can download MP3 (premium) or record audio

**Natural Readers:**
- Free online TTS
- Record system audio while playing

---

## 🎯 Recommended Workflow

### For Development (Quick):
1. Run: `npm run generate-mantras`
2. You'll get AIFF files (work in all browsers)
3. Test immediately in your app!

### For Production (Best Quality):
1. Install ffmpeg: `brew install ffmpeg`
2. Run: `npm run generate-mantras`
3. Get high-quality MP3 files
4. Commit to repository

---

## 📝 Generated Files Status

After running the script, you'll have:

✅ ganesha.aiff (or .mp3)
✅ shiva.aiff (or .mp3)
✅ vishnu.aiff (or .mp3)
✅ brahma.aiff (or .mp3)
✅ lakshmi.aiff (or .mp3)
✅ parvati.aiff (or .mp3)
✅ saraswati.aiff (or .mp3)
✅ hanuman.aiff (or .mp3)
✅ durga.aiff (or .mp3)
✅ kali.aiff (or .mp3)
✅ krishna.aiff (or .mp3)
✅ rama.aiff (or .mp3)
✅ surya.aiff (or .mp3)
✅ chandra.aiff (or .mp3)
✅ indra.aiff (or .mp3)
✅ agni.aiff (or .mp3)
✅ kartikeya.aiff (or .mp3)
✅ kubera.aiff (or .mp3)
✅ yama.aiff (or .mp3)

---

## 🔧 Troubleshooting

**Script not running?**
```bash
chmod +x scripts/generate-mantras.js
node scripts/generate-mantras.js
```

**Audio not playing in browser?**
- Check file path: `/audio/mantras/` vs `/public/audio/mantras/`
- Check file extension matches code
- Check browser console for errors
- Try opening audio file directly in browser

**Want better voice quality?**
- Professional recording is best
- Consider commissioning voice artist on Fiverr ($5-20 each)
- Or record yourself with pronunciation guide

---

## 💡 Future Enhancements

- Add multiple language options (Sanskrit, Hindi, English)
- Different voice styles (male, female, chanting)
- Longer versions with repetitions (108 times)
- Background music/ambiance
- Pronunciation breakdown videos

---

## ✨ That's It!

You now have FREE text-to-speech solution for all your mantras! 🎉
