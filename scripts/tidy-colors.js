#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const repoRoot = path.resolve(__dirname, '..');
const cssPattern = path.join(repoRoot, 'src', '**', '*.css');

// Mapping from legacy hex -> theme variable
const mapping = {
  '#ffffff': 'var(--card-bg)',
  '#fff': 'var(--card-bg)',

  '#fffaf0': 'var(--parchment-light)',
  '#fff4e6': 'var(--parchment-light)',
  '#fff9e6': 'var(--parchment-light)',
  '#fff5e6': 'var(--parchment-light)',
  '#fffef7': 'var(--parchment-light)',
  '#fffbf0': 'var(--parchment-light)',
  '#faf9f7': 'var(--parchment-mid)',

  '#f1f1f1': 'var(--neutral-100)',
  '#e0e0e0': 'var(--neutral-200)',
  '#f8f9fa': 'var(--neutral-300)',
  '#f0f0f0': 'var(--neutral-200)',

  '#333': 'var(--text-primary)',
  '#333333': 'var(--text-primary)',
  '#444': 'var(--text-primary)',
  '#555': 'var(--text-secondary)',
  '#555555': 'var(--text-secondary)',
  '#666': 'var(--text-tertiary)',
  '#888': 'var(--text-tertiary)',

  '#ff6600': 'var(--accent-primary)',
  '#ff6b35': 'var(--accent-primary)',
  '#ff9933': 'var(--saffron-primary)',
  '#ffd700': 'var(--gold-accent)',
  '#4a90e2': 'var(--accent-secondary)',
  '#fff08a': 'var(--gold-accent)',
  '#f7f3ff': 'var(--card-bg)',
  '#f7931e': 'var(--accent-primary)',
  '#ffa500': 'var(--accent-primary)',
  '#ff5500': 'var(--accent-primary)',
  '#ff7722': 'var(--accent-primary)',
  '#e65c00': 'var(--accent-primary)'
  ,
  /* Secondary palette mappings */
  '#9c27b0': 'var(--accent-purple)',
  '#7b1fa2': 'var(--accent-purple-2)',
  '#667eea': 'var(--accent-blue)',
  '#2196f3': 'var(--accent-blue-2)',
  '#11998E': 'var(--accent-teal)',
  '#4caf50': 'var(--accent-green)',
  '#2ed573': 'var(--accent-green-2)',
  '#f093fb': 'var(--accent-pink)',
  '#f5576c': 'var(--accent-rose)',
  '#d63447': 'var(--accent-red)',
  '#ffecd2': 'var(--soft-peach)',
  '#fcb69f': 'var(--peach)',
  '#00acc1': 'var(--deep-teal)',
  '#341f97': 'var(--indigo-dark)',
  '#000080': 'var(--navy)',
  '#e0f7fa': 'var(--neutral-200)',
  '#80deea': 'var(--accent-teal)'
};

// Sort keys by length desc so longer hexes like #ffffff are replaced before #fff
const keys = Object.keys(mapping).sort((a,b) => b.length - a.length);

glob(cssPattern, { nodir: true }, (err, files) => {
  if (err) throw err;

  const cssFiles = files.filter(f => !f.endsWith('styles/theme.css'));

  let totalReplacements = 0;

  cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    keys.forEach(hex => {
      const escaped = hex.replace('#', '\\#');
      const re = new RegExp(escaped, 'ig');
      content = content.replace(re, mapping[hex]);
    });

    if (content !== original) {
      // write backup
      try { fs.copyFileSync(file, file + '.bak'); } catch (e) {}
      fs.writeFileSync(file, content, 'utf8');
      const diffCount = (original.match(/var\(/g) || []).length - (content.match(/var\(/g) || []).length;
      console.log(`Updated: ${path.relative(repoRoot, file)}`);
      totalReplacements++;
    }
  });

  console.log('\nTidy colors complete. Files modified:', totalReplacements);
});
