#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const pkgDir = path.resolve(__dirname, '..', 'node_modules', '@ishubhamx', 'panchangam-js', 'dist');

if (!fs.existsSync(pkgDir)) {
  console.log('Package dist folder not found, nothing to strip.');
  process.exit(0);
}

const files = fs.readdirSync(pkgDir).filter(f => f.endsWith('.js'));
let count = 0;
files.forEach(f => {
  const p = path.join(pkgDir, f);
  let content = fs.readFileSync(p, 'utf8');
  const orig = content;
  // Remove sourceMappingURL comments (both valid and invalid references)
  content = content.replace(/\/\/#\s*sourceMappingURL=.*/g, '');
  content = content.replace(/\/\*# sourceMappingURL=.* \*\//g, '');
  if (content !== orig) {
    try { fs.copyFileSync(p, p + '.bak'); } catch (e) {}
    fs.writeFileSync(p, content, 'utf8');
    console.log('Stripped sourceMappingURL from', p);
    count++;
  }
});

if (count === 0) console.log('No sourceMappingURL entries found to strip.');
else console.log('Stripped sourceMappingURL from', count, 'files.');

// Also remove .map files in dist to avoid source-map-loader trying to load sources that aren't published
const mapFiles = fs.readdirSync(pkgDir).filter(f => f.endsWith('.map'));
let mapCount = 0;
mapFiles.forEach(m => {
  const mp = path.join(pkgDir, m);
  try {
    fs.copyFileSync(mp, mp + '.bak');
    fs.unlinkSync(mp);
    console.log('Removed map file', mp);
    mapCount++;
  } catch (e) {
    // ignore
  }
});
if (mapCount > 0) console.log('Removed', mapCount, 'map files.');
