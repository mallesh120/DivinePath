# Mantra Audio Files

This directory contains audio recordings of mantras for each deity.

## Auto-Generate Audio Files (FREE!)

We've created a script to automatically generate all mantra audio files using free text-to-speech:

### Quick Start:
```bash
# Generate all 19 mantra files
node scripts/generate-mantras.js
```

### For MP3 format (recommended):
1. Install ffmpeg first:
   ```bash
   # macOS
   brew install ffmpeg
   
   # Ubuntu/Debian
   sudo apt-get install ffmpeg
   
   # Windows (use Chocolatey)
   choco install ffmpeg
   ```

2. Run the generator:
   ```bash
   node scripts/generate-mantras.js
   ```

### What it does:
- ✅ Generates audio for all 19 deity mantras
- ✅ Uses macOS "say" command (Mac) or Google TTS (other OS)
- ✅ Free, no API key needed
- ✅ Outputs MP3 files (with ffmpeg) or AIFF files (without)

## Required Audio Files:
- ganesha.mp3
- shiva.mp3
- vishnu.mp3
- brahma.mp3
- lakshmi.mp3
- parvati.mp3
- saraswati.mp3
- hanuman.mp3
- durga.mp3
- kali.mp3
- krishna.mp3
- rama.mp3
- surya.mp3
- chandra.mp3
- indra.mp3
- agni.mp3
- kartikeya.mp3
- kubera.mp3
- yama.mp3

## Format:
- Format: MP3
- Quality: 128kbps or higher
- Duration: 30-60 seconds recommended

## Sources:
You can obtain mantra audio from:
1. Record your own pronunciation
2. Use text-to-speech services for Sanskrit
3. Download from royalty-free sources
4. Commission professional recordings

## Note:
Until actual audio files are added, the audio player will show but may not play.
