const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, '../src/pages/PujaGuidePage/PujaGuidePage.js');
let code = fs.readFileSync(targetFilePath, 'utf8');

// Replace import
code = code.replace("import './PujaGuidePage.css';", "import styles from './PujaGuidePage.module.css';");

// Use regex to find className="something" and className={`something ${var}`}
// It's a bit complex for template literals, let's just handle simple strings and single-class template literals first

code = code.replace(/className="([^"]+)"/g, (match, classes) => {
  const parts = classes.split(' ').filter(Boolean);
  if (parts.length === 1) {
    if (parts[0].startsWith('progress-') && match.includes('progress-fill')) {
      // Keep static for things that might need global if they exist, but let's assume all are modules
      return `className={styles['${parts[0]}']}`;
    }
    return `className={styles['${parts[0]}']}`;
  } else {
    const mapped = parts.map(p => `\${styles['${p}']}`).join(' ');
    return `className={\`${mapped}\`}`;
  }
});

// Handle conditional classes like className={`step-card ${currentStep === index ? 'active' : ''}`}
code = code.replace(/className=\{`([^`]+)`\}/g, (match, inner) => {
  // complex to parse safely with regex, let's do simple token replacement
  // e.g. "step-card ${isCompleted ? 'completed' : ''}" 
  // becomes `${styles['step-card']} ${isCompleted ? styles.completed : ''}`
  let newInner = inner.replace(/([a-zA-Z0-9-]+)(?![a-zA-Z0-9-]*')/g, (word) => {
    // avoid replacing variable names or keywords
    if (['currentStep', 'index', 'active', 'completed', 'playing', 'isPlayingAudio', 'playingSection', 'step'].includes(word)) return word;
    if (word.startsWith('${')) return word;
    if (word === 'step-card' || word === 'audio-btn' || word === 'action-btn' || word === 'hamburger-line' || word === 'navbar-hamburger') return `\${styles['${word}']}`;
    return word; // fallback
  });
  
  // Specific replacements for PujaGuidePage logic
  newInner = newInner.replace("step-card ${", "${styles['step-card']} ${");
  newInner = newInner.replace("'active'", "styles.active");
  newInner = newInner.replace("'completed'", "styles.completed");
  newInner = newInner.replace("'playing'", "styles.playing");
  
  return `className={\`${newInner}\`}`;
});

// Manual fixes for known complex ones
code = code.replace("className={`step-card \\${currentStep === index ? styles.active : ''} \\${completedSteps.includes(index) ? styles.completed : ''}`}", 
                    "className={`\\${styles['step-card']} \\${currentStep === index ? styles['active'] : ''} \\${completedSteps.includes(index) ? styles['completed'] : ''}`}");
                    
code = code.replace("className={`audio-btn \\${isPlayingAudio && playingSection === 'sanskrit' ? styles.playing : ''}`}",
                    "className={`\\${styles['audio-btn']} \\${isPlayingAudio && playingSection === 'sanskrit' ? styles['playing'] : ''}`}");

code = code.replace("className={`audio-btn \\${isPlayingAudio && playingSection === 'transliteration' ? styles.playing : ''}`}",
                    "className={`\\${styles['audio-btn']} \\${isPlayingAudio && playingSection === 'transliteration' ? styles['playing'] : ''}`}");

code = code.replace("className={`audio-btn \\${isPlayingAudio && playingSection === 'meaning' ? styles.playing : ''}`}",
                    "className={`\\${styles['audio-btn']} \\${isPlayingAudio && playingSection === 'meaning' ? styles['playing'] : ''}`}");

code = code.replace("className={`action-btn next-btn \\${isLastStep ? styles.disabled : ''}`}",
                    "className={`\\${styles['action-btn']} \\${styles['next-btn']} \\${isLastStep ? styles['disabled'] : ''}`}");

code = code.replace("className={`action-btn \\${completedSteps.includes(currentStep) ? styles.completed : ''}`}",
                    "className={`\\${styles['action-btn']} \\${completedSteps.includes(currentStep) ? styles['completed'] : ''}`}");

fs.writeFileSync(targetFilePath, code);
console.log('Done mapping classes in PujaGuidePage.js');
