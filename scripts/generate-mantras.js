#!/usr/bin/env node

/**
 * Generate Mantra Audio Files using Free TTS
 * 
 * This script uses free text-to-speech APIs to generate audio files for mantras.
 * Options:
 * 1. Google Translate TTS (free, no API key needed)
 * 2. eSpeak (offline, free, open source)
 * 3. Say command (macOS built-in)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Mantra texts for each deity
const mantras = {
  ganesha: "Om Gam Ganapataye Namaha",
  shiva: "Om Namah Shivaya",
  vishnu: "Om Namo Bhagavate Vasudevaya",
  brahma: "Om Namo Rajo Gushe Srishti Sthithou Palayithou",
  lakshmi: "Om Shreem Hreem Shreem Kamale Kamalalaye Praseed Praseed",
  parvati: "Sarva Mangala Mangalye Sive Sarvartha Sadhike Saranye Trayambike Gauri Narayani Namostute",
  saraswati: "Om Aim Saraswatyai Namah",
  hanuman: "Om Hanumate Namah",
  durga: "Om Dum Durgayei Namaha",
  kali: "Om Krim Kalikaye Namah",
  krishna: "Om Klim Krishnaya Namah",
  rama: "Om Shri Ramaya Namah",
  surya: "Om Suryaya Namah",
  chandra: "Om Chandraya Namah",
  indra: "Om Indraya Namah",
  agni: "Om Agnaye Namah",
  kartikeya: "Om Saravanabhavaya Namah",
  kubera: "Om Shreem Hreem Kleem Shreem Kleem Kuberaya Namah",
  yama: "Om Suryaputraya Vidmahe Mahakalaya Dhimahi Tanno Yama Prachodayat"
};

const outputDir = path.join(__dirname, '../public/audio/mantras');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🕉️  Generating Mantra Audio Files...\n');

/**
 * Method 1: Use macOS 'say' command (best for Mac users)
 */
function generateWithSay(name, text, callback) {
  const outputFile = path.join(outputDir, `${name}.aiff`);
  const mp3File = path.join(outputDir, `${name}.mp3`);
  
  // Generate AIFF first
  exec(`say -v Samantha "${text}" -o "${outputFile}"`, (err) => {
    if (err) {
      console.log(`❌ Failed to generate ${name} with 'say' command`);
      callback(false);
      return;
    }
    
    // Convert to MP3 if ffmpeg is available
    exec(`which ffmpeg`, (ffmpegErr) => {
      if (!ffmpegErr) {
        exec(`ffmpeg -i "${outputFile}" -codec:a libmp3lame -qscale:a 2 "${mp3File}" -y`, (convertErr) => {
          if (!convertErr) {
            fs.unlinkSync(outputFile); // Remove AIFF file
            console.log(`✅ Generated: ${name}.mp3`);
            callback(true);
          } else {
            console.log(`⚠️  Generated ${name}.aiff (install ffmpeg to convert to mp3)`);
            callback(true);
          }
        });
      } else {
        console.log(`⚠️  Generated ${name}.aiff (install ffmpeg to convert to mp3)`);
        callback(true);
      }
    });
  });
}

/**
 * Method 2: Use Google Translate TTS API (free, no key needed)
 */
function generateWithGoogleTTS(name, text, callback) {
  const encodedText = encodeURIComponent(text);
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=hi&client=tw-ob&q=${encodedText}`;
  const outputFile = path.join(outputDir, `${name}.mp3`);
  
  const file = fs.createWriteStream(outputFile);
  
  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    }
  }, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`✅ Generated: ${name}.mp3`);
      callback(true);
    });
  }).on('error', (err) => {
    fs.unlink(outputFile, () => {});
    console.log(`❌ Failed to generate ${name}: ${err.message}`);
    callback(false);
  });
}

/**
 * Generate all mantras
 */
async function generateAll() {
  console.log('Checking available TTS methods...\n');
  
  // Check if running on macOS
  exec('uname', (err, stdout) => {
    const isMac = !err && stdout.trim() === 'Darwin';
    
    if (isMac) {
      console.log('✓ macOS detected - using "say" command\n');
      
      const names = Object.keys(mantras);
      let current = 0;
      
      function processNext() {
        if (current >= names.length) {
          console.log('\n✨ All mantras generated!');
          console.log(`📁 Location: ${outputDir}\n`);
          return;
        }
        
        const name = names[current];
        const text = mantras[name];
        current++;
        
        generateWithSay(name, text, () => {
          setTimeout(processNext, 500); // Small delay between generations
        });
      }
      
      processNext();
      
    } else {
      console.log('ℹ️  Using Google Translate TTS (Hindi voice for Sanskrit)\n');
      
      const names = Object.keys(mantras);
      let current = 0;
      
      function processNext() {
        if (current >= names.length) {
          console.log('\n✨ All mantras generated!');
          console.log(`📁 Location: ${outputDir}\n`);
          return;
        }
        
        const name = names[current];
        const text = mantras[name];
        current++;
        
        generateWithGoogleTTS(name, text, () => {
          setTimeout(processNext, 1000); // Delay to avoid rate limiting
        });
      }
      
      processNext();
    }
  });
}

// Run the generator
generateAll();
