/**
 * Manual Ashtottaram Data Entry Helper
 * 
 * This script helps you quickly format manually copied Ashtottaram data
 * into the DivinePath JSON format.
 * 
 * Usage:
 *   node scripts/format-ashtottaram.js <input-file> <deity-id> <deity-name> <category>
 * 
 * Input file format (text file with one name per line):
 * 
 *   गजानन
 *   Gajanana
 *   ॐ गजाननाय नमः।
 *   Om Gajananaya Namah
 *   Elephant-Faced Lord
 *   
 *   गणाध्यक्ष
 *   Ganadhyaksha
 *   ॐ गणाध्यक्षाय नमः।
 *   Om Ganadhyakshaya Namah
 *   Lord of All Ganas
 *   
 *   ... (108 names total, 5 lines per name + blank line)
 * 
 * Example:
 *   node scripts/format-ashtottaram.js shiva-names.txt shiva "Lord Shiva" god
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 4) {
  console.error('\n❌ Missing arguments!\n');
  console.error('Usage: node format-ashtottaram.js <input-file> <deity-id> <deity-name> <category>\n');
  console.error('Example:');
  console.error('  node scripts/format-ashtottaram.js shiva-names.txt shiva "Lord Shiva" god\n');
  process.exit(1);
}

const [inputFile, deityId, deityName, category] = args;

console.log('\n🕉️  Ashtottaram Data Formatter');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Deity: ${deityName}`);
console.log(`Input: ${inputFile}`);
console.log(`Category: ${category}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

/**
 * Parse input file
 */
function parseInput(content) {
  const names = [];
  const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  let i = 0;
  let nameNumber = 1;
  
  while (i < lines.length && nameNumber <= 108) {
    // Expect 5 lines per name:
    // 1. Sanskrit name
    // 2. Transliteration
    // 3. Sanskrit mantra
    // 4. English mantra
    // 5. Meaning
    
    if (i + 4 >= lines.length) {
      console.warn(`⚠️  Warning: Incomplete data at line ${i + 1}. Stopping at name ${nameNumber - 1}.`);
      break;
    }
    
    const sanskrit = lines[i];
    const transliteration = lines[i + 1];
    const mantraSanskrit = lines[i + 2];
    const mantra = lines[i + 3];
    const meaning = lines[i + 4];
    
    names.push({
      number: nameNumber,
      sanskrit,
      transliteration,
      mantraSanskrit,
      mantra,
      meaning
    });
    
    i += 5;
    nameNumber++;
  }
  
  return names;
}

/**
 * Escape single quotes
 */
function escapeSingleQuotes(str) {
  return str.replace(/'/g, "\\'");
}

/**
 * Generate JavaScript code
 */
function generateJSCode(deityId, deityName, category, names) {
  const imageCategory = category === 'god' ? 'Gods' : 'Goddesses';
  
  let code = `  ${deityId}: {\n`;
  code += `    id: '${deityId}',\n`;
  code += `    name: '${deityName}',\n`;
  code += `    title: '${deityName} Ashtottara Shatanamavali',\n`;
  code += `    description: '108 Names of ${deityName}',\n`;
  code += `    image: require('../assets/images/${imageCategory}/${deityId}.png'),\n`;
  code += `    category: '${category}',\n`;
  code += `    names: [\n`;
  
  names.forEach((name, index) => {
    code += `      { number: ${name.number}, sanskrit: '${escapeSingleQuotes(name.sanskrit)}', transliteration: '${escapeSingleQuotes(name.transliteration)}', mantraSanskrit: '${escapeSingleQuotes(name.mantraSanskrit)}', mantra: '${escapeSingleQuotes(name.mantra)}', meaning: '${escapeSingleQuotes(name.meaning)}' }`;
    if (index < names.length - 1) {
      code += ',\n';
    } else {
      code += '\n';
    }
  });
  
  code += `    ]\n`;
  code += `  }`;
  
  return code;
}

/**
 * Main execution
 */
function main() {
  try {
    console.log('📥 Reading input file...');
    
    if (!fs.existsSync(inputFile)) {
      console.error(`❌ Error: Input file not found: ${inputFile}\n`);
      process.exit(1);
    }
    
    const content = fs.readFileSync(inputFile, 'utf8');
    console.log('✅ File read successfully\n');
    
    console.log('🔍 Parsing names...');
    const names = parseInput(content);
    console.log(`✅ Found ${names.length} names\n`);
    
    if (names.length === 0) {
      console.error('❌ No names found in input file.\n');
      console.log('💡 Expected format (5 lines per name):');
      console.log('   Line 1: Sanskrit name');
      console.log('   Line 2: Transliteration');
      console.log('   Line 3: Sanskrit mantra');
      console.log('   Line 4: English mantra');
      console.log('   Line 5: Meaning\n');
      process.exit(1);
    }
    
    if (names.length !== 108) {
      console.warn(`⚠️  Warning: Expected 108 names but found ${names.length}\n`);
    }
    
    // Generate JavaScript code
    console.log('📝 Generating JavaScript code...');
    const jsCode = generateJSCode(deityId, deityName, category, names);
    
    // Create output directory
    const outputDir = path.join(__dirname, 'output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Save JavaScript code
    const jsFilePath = path.join(outputDir, `${deityId}-ashtottaram.js`);
    fs.writeFileSync(jsFilePath, jsCode, 'utf8');
    console.log(`✅ JavaScript code saved to: ${jsFilePath}\n`);
    
    // Save JSON
    const jsonData = JSON.stringify({
      id: deityId,
      name: deityName,
      title: `${deityName} Ashtottara Shatanamavali`,
      description: `108 Names of ${deityName}`,
      image: `../assets/images/${category === 'god' ? 'Gods' : 'Goddesses'}/${deityId}.png`,
      category: category,
      names: names
    }, null, 2);
    
    const jsonFilePath = path.join(outputDir, `${deityId}-ashtottaram.json`);
    fs.writeFileSync(jsonFilePath, jsonData, 'utf8');
    console.log(`✅ JSON data saved to: ${jsonFilePath}\n`);
    
    // Print preview
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Preview (first 3 names):');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    names.slice(0, 3).forEach(name => {
      console.log(`${name.number}. ${name.sanskrit} (${name.transliteration})`);
      console.log(`   Mantra: ${name.mantraSanskrit}`);
      console.log(`   ${name.mantra}`);
      console.log(`   Meaning: ${name.meaning}\n`);
    });
    
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Formatting completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('📌 Next steps:');
    console.log(`   1. Review: ${jsFilePath}`);
    console.log('   2. Copy the content');
    console.log('   3. Paste into src/data/ashtottaramData.js');
    console.log(`   4. Add image: src/assets/images/${category === 'god' ? 'Gods' : 'Goddesses'}/${deityId}.png\n`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
