#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const pkgDir = path.resolve(__dirname, '..', 'node_modules', '@ishubhamx', 'panchangam-js', 'dist');

if (!fs.existsSync(pkgDir)) {
  console.log('Package dist folder not found, nothing to strip.');
  process.exit(0);
}

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

let count = 0;
let mapCount = 0;

walkDir(pkgDir, (filePath) => {
  if (filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    const orig = content;
    // Remove sourceMappingURL comments (both valid and invalid references)
    content = content.replace(/\/\/#\s*sourceMappingURL=.*/g, '');
    content = content.replace(/\/\*# sourceMappingURL=.* \*\//g, '');
    if (content !== orig) {
      try { fs.copyFileSync(filePath, filePath + '.bak'); } catch (e) {}
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Stripped sourceMappingURL from', filePath);
      count++;
    }
  } else if (filePath.endsWith('.map')) {
    try {
      fs.copyFileSync(filePath, filePath + '.bak');
      fs.unlinkSync(filePath);
      console.log('Removed map file', filePath);
      mapCount++;
    } catch (e) {
      // ignore
    }
  }
});

if (count === 0) console.log('No sourceMappingURL entries found to strip.');
else console.log('Stripped sourceMappingURL from', count, 'files.');

if (mapCount > 0) console.log('Removed', mapCount, 'map files.');
