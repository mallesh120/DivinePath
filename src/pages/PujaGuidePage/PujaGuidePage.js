import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPujaById } from '../../data/pujas/pujasData';
import MaterialsChecklist from '../../components/MaterialsChecklist/MaterialsChecklist';
import { usePanchangam } from '../../hooks/usePanchangam';
import styles from './PujaGuidePage.module.css';

const PujaGuidePage = () => {
  const { pujaId } = useParams();
  const puja = getPujaById(pujaId);
  const [currentStep, setCurrentStep] = useState(0);
  const [showMaterials, setShowMaterials] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingSection, setPlayingSection] = useState(null);
  const { panchangam } = usePanchangam();

  useEffect(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem(`puja_${pujaId}_completed`);
    if (saved) {
      setCompletedSteps(JSON.parse(saved));
    }
  }, [pujaId]);

  useEffect(() => {
    // Save completed steps to localStorage
    localStorage.setItem(`puja_${pujaId}_completed`, JSON.stringify(completedSteps));
  }, [completedSteps, pujaId]);

  // Load voices when component mounts
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Chrome loads voices asynchronously
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  // Stop audio when component unmounts or step changes
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, [currentStep]);

  if (!puja) {
    return (
      <div className={styles['puja-not-found']}>
        <div className={styles['not-found-content']}>
          <span className={styles['not-found-icon']}>🔍</span>
          <h2>Puja Not Found</h2>
          <p>The puja you're looking for doesn't exist.</p>
          <Link to="/adults/pujas" className={styles['back-to-list-btn']}>
            Browse All Pujas
          </Link>
        </div>
      </div>
    );
  }

  const currentStepData = puja.steps[currentStep];
  const progress = ((completedSteps.length / puja.steps.length) * 100).toFixed(0);

  const handleNextStep = () => {
    if (currentStep < puja.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleStepCompletion = (stepNumber) => {
    if (completedSteps.includes(stepNumber)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepNumber));
    } else {
      setCompletedSteps([...completedSteps, stepNumber]);
    }
  };

  const resetProgress = () => {
    setCompletedSteps([]);
    setCurrentStep(0);
  };

  const speakText = (text, section) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    if (isPlayingAudio && playingSection === section) {
      // If already playing this section, stop it
      setIsPlayingAudio(false);
      setPlayingSection(null);
      return;
    }

    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Try to use a Hindi voice if available, otherwise use default
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find(voice => 
        voice.lang.startsWith('hi') || voice.lang.startsWith('sa')
      );
      
      if (hindiVoice) {
        utterance.voice = hindiVoice;
      }
      
      utterance.rate = 0.8; // Slower for better pronunciation
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsPlayingAudio(true);
        setPlayingSection(section);
      };

      utterance.onend = () => {
        setIsPlayingAudio(false);
        setPlayingSection(null);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setPlayingSection(null);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser. Please use Chrome, Safari, or Edge.');
    }
  };

  const isLastStep = currentStep === puja.steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className={styles['puja-guide-page']}>
      <div className={styles['puja-guide-header']}>
        <Link to="/adults/pujas" className={styles['back-link']}>← Back to Pujas</Link>
        <div className={styles['puja-guide-title']}>
          <h1>{puja.name}</h1>
          <div className={styles['puja-meta']}>
            <span className={styles['deity-name']}>🕉️ {puja.deity}</span>
            <span className={styles['difficulty-badge']} data-difficulty={puja.difficulty.toLowerCase()}>
              {puja.difficulty}
            </span>
            <span className={styles['duration-badge']}>⏱️ {puja.duration}</span>
          </div>
        </div>
        <div className={styles['progress-section']}>
          <div className={styles['progress-bar']}>
            <div className={styles['progress-fill']} style={{ width: `${progress}%` }}></div>
          </div>
          <div className={styles['progress-text']}>
            {completedSteps.length} of {puja.steps.length} steps completed ({progress}%)
          </div>
        </div>
      </div>

      <div className={styles['puja-guide-container']}>
        <div className={styles['guide-sidebar']}>
          <div className={styles['sidebar-section']}>
            <button 
              className={`sidebar-toggle ${showMaterials ? styles.active : ''}`}
              onClick={() => setShowMaterials(!showMaterials)}
            >
              <span>📋 Materials Checklist</span>
              <span className={styles['toggle-icon']}>{showMaterials ? '▼' : '▶'}</span>
            </button>
            {showMaterials && (
              <div className={styles['materials-section']}>
                <MaterialsChecklist puja={puja} />
              </div>
            )}
          </div>

          {panchangam && puja.panchangamGuidance && (
            <div className={styles['sidebar-section']}>
              <h3 className={styles['sidebar-title']}>🌙 Timing Guidance</h3>
              <div className={styles['timing-info']}>
                <div className={styles['current-timing']}>
                  <p><strong>Current Tithi:</strong> {panchangam.tithi}</p>
                  <p><strong>Current Nakshatra:</strong> {panchangam.nakshatra}</p>
                </div>
                {puja.panchangamGuidance.bestDays && (
                  <div className={styles['best-days']}>
                    <strong>Best Days:</strong>
                    <ul>
                      {puja.panchangamGuidance.bestDays.map((day, idx) => (
                        <li key={idx}>{day}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {puja.panchangamGuidance.avoidDays && (
                  <div className={styles['avoid-days']}>
                    <strong>Days to Avoid:</strong>
                    <ul>
                      {puja.panchangamGuidance.avoidDays.map((day, idx) => (
                        <li key={idx}>{day}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {puja.panchangamGuidance.bestNakshatra && (
                  <div className={styles['best-nakshatra']}>
                    <strong>Best Nakshatras:</strong>
                    <p>{puja.panchangamGuidance.bestNakshatra.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={styles['sidebar-section']}>
            <h3 className={styles['sidebar-title']}>✨ Benefits</h3>
            <ul className={styles['benefits-list']}>
              {puja.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>

          {puja.tips && puja.tips.length > 0 && (
            <div className={styles['sidebar-section']}>
              <h3 className={styles['sidebar-title']}>💡 Tips</h3>
              <ul className={styles['tips-list']}>
                {puja.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles['guide-main']}>
          <div className={styles['current-step-content']}>
            <div className={styles['step-progress-bar']}>
              <div className={styles['progress-indicator']}>
                <span className={styles['current-step-info']}>
                  Step {currentStepData.stepNumber} of {puja.steps.length}
                </span>
                <span className={styles['step-title-inline']}>{currentStepData.title}</span>
              </div>
              <div className={styles['mini-progress-bar']}>
                <div 
                  className={styles['mini-progress-fill']} 
                  style={{ width: `${((currentStep + 1) / puja.steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className={styles['step-header']}>
              <div className={styles['step-number-large']}>Step {currentStepData.stepNumber}</div>
              <h2 className={styles['step-title']}>{currentStepData.title}</h2>
              {currentStepData.duration && (
                <span className={styles['step-duration']}>⏱️ {currentStepData.duration}</span>
              )}
            </div>

            <div className={styles['step-description']}>
              <p>{currentStepData.description}</p>
            </div>

            {currentStepData.mantra && (
              <div className={styles['mantra-section']}>
                <h3 className={styles['mantra-title']}>🕉️ Mantra</h3>
                <div className={styles['mantra-content']}>
                  <div className={styles['mantra-sanskrit']}>
                    <div className={styles['mantra-text-header']}>
                      <strong>Sanskrit:</strong>
                      <button
                        className={`${styles['audio-btn']} ${isPlayingAudio && playingSection === 'sanskrit' ? styles.playing : ''}`}
                        onClick={() => speakText(currentStepData.mantra.sanskrit, 'sanskrit')}
                        title="Listen to Sanskrit pronunciation"
                        aria-label="Listen to Sanskrit pronunciation"
                        aria-pressed={isPlayingAudio && playingSection === 'sanskrit'}
                      >
                        {isPlayingAudio && playingSection === 'sanskrit' ? '⏸️ Pause' : '🔊 Listen'}
                      </button>
                    </div>
                    <p>{currentStepData.mantra.sanskrit}</p>
                  </div>
                  <div className={styles['mantra-transliteration']}>
                    <div className={styles['mantra-text-header']}>
                      <strong>Transliteration:</strong>
                      <button
                        className={`${styles['audio-btn']} ${isPlayingAudio && playingSection === 'transliteration' ? styles.playing : ''}`}
                        onClick={() => speakText(currentStepData.mantra.transliteration, 'transliteration')}
                        title="Listen to pronunciation guide"
                        aria-label="Listen to transliteration pronunciation"
                        aria-pressed={isPlayingAudio && playingSection === 'transliteration'}
                      >
                        {isPlayingAudio && playingSection === 'transliteration' ? '⏸️ Pause' : '🔊 Listen'}
                      </button>
                    </div>
                    <p>{currentStepData.mantra.transliteration}</p>
                  </div>
                  <div className={styles['mantra-meaning']}>
                    <div className={styles['mantra-text-header']}>
                      <strong>Meaning:</strong>
                      <button
                        className={`${styles['audio-btn']} ${isPlayingAudio && playingSection === 'meaning' ? styles.playing : ''}`}
                        onClick={() => speakText(currentStepData.mantra.meaning, 'meaning')}
                        title="Listen to meaning"
                        aria-label="Listen to meaning pronunciation"
                        aria-pressed={isPlayingAudio && playingSection === 'meaning'}
                      >
                        {isPlayingAudio && playingSection === 'meaning' ? '⏸️ Pause' : '🔊 Listen'}
                      </button>
                    </div>
                    <p>{currentStepData.mantra.meaning}</p>
                  </div>
                  {currentStepData.mantra.repetitions && (
                    <div className={styles['mantra-repetitions']}>
                      <strong>Repetitions:</strong> {currentStepData.mantra.repetitions}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStepData.tips && currentStepData.tips.length > 0 && (
              <div className={styles['step-tips']}>
                <h4>💡 Tips for this step:</h4>
                <ul>
                  {currentStepData.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles['step-completion']}>
              <label className={styles['completion-checkbox']}>
                <input
                  type="checkbox"
                  checked={completedSteps.includes(currentStepData.stepNumber)}
                  onChange={() => toggleStepCompletion(currentStepData.stepNumber)}
                />
                <span>Mark this step as completed</span>
              </label>
            </div>

            <div className={styles['step-navigation-buttons']}>
              <button 
                className={`${styles['nav-btn']} ${styles['prev-btn']}`} 
                onClick={handlePrevStep}
                disabled={isFirstStep}
              >
                ← Previous Step
              </button>
              {completedSteps.length === puja.steps.length && (
                <button className={styles['reset-btn']} onClick={resetProgress}>
                  Reset Progress
                </button>
              )}
              <button 
                className={`${styles['nav-btn']} ${styles['next-btn']}`} 
                onClick={handleNextStep}
                disabled={isLastStep}
              >
                {isLastStep ? 'Completed ✓' : 'Next Step →'}
              </button>
            </div>
          </div>

          {puja.mantras && puja.mantras.length > 0 && (
            <div className={styles['all-mantras-section']}>
              <h3>📿 All Mantras for {puja.name}</h3>
              <div className={styles['mantras-grid']}>
                {puja.mantras.map((mantra, idx) => (
                  <div key={idx} className={styles['mantra-card']}>
                    <div className={styles['mantra-card-sanskrit']}>{mantra.sanskrit}</div>
                    <div className={styles['mantra-card-transliteration']}>{mantra.transliteration}</div>
                    <div className={styles['mantra-card-meaning']}>{mantra.meaning}</div>
                    {mantra.repetitions && (
                      <div className={styles['mantra-card-repetitions']}>
                        Repeat {mantra.repetitions} times
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PujaGuidePage;
