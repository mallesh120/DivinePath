import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPujaById } from '../../data/pujasData';
import MaterialsChecklist from '../../components/MaterialsChecklist/MaterialsChecklist';
import usePanchangam from '../../hooks/usePanchangam';
import './PujaGuidePage.css';

const PujaGuidePage = () => {
  const { pujaId } = useParams();
  const puja = getPujaById(pujaId);
  const [currentStep, setCurrentStep] = useState(0);
  const [showMaterials, setShowMaterials] = useState(true);
  const [completedSteps, setCompletedSteps] = useState([]);
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

  if (!puja) {
    return (
      <div className="puja-not-found">
        <div className="not-found-content">
          <span className="not-found-icon">🔍</span>
          <h2>Puja Not Found</h2>
          <p>The puja you're looking for doesn't exist.</p>
          <Link to="/pujas" className="back-to-list-btn">
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

  const isLastStep = currentStep === puja.steps.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="puja-guide-page">
      <div className="puja-guide-header">
        <Link to="/pujas" className="back-link">← Back to Pujas</Link>
        <div className="puja-guide-title">
          <h1>{puja.name}</h1>
          <div className="puja-meta">
            <span className="deity-name">🕉️ {puja.deity}</span>
            <span className="difficulty-badge" data-difficulty={puja.difficulty.toLowerCase()}>
              {puja.difficulty}
            </span>
            <span className="duration-badge">⏱️ {puja.duration}</span>
          </div>
        </div>
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            {completedSteps.length} of {puja.steps.length} steps completed ({progress}%)
          </div>
        </div>
      </div>

      <div className="puja-guide-container">
        <div className="guide-sidebar">
          <div className="sidebar-section">
            <button 
              className={`sidebar-toggle ${showMaterials ? 'active' : ''}`}
              onClick={() => setShowMaterials(!showMaterials)}
            >
              <span>📋 Materials Checklist</span>
              <span className="toggle-icon">{showMaterials ? '▼' : '▶'}</span>
            </button>
            {showMaterials && (
              <div className="materials-section">
                <MaterialsChecklist puja={puja} />
              </div>
            )}
          </div>

          {panchangam && puja.panchangamGuidance && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">🌙 Timing Guidance</h3>
              <div className="timing-info">
                <div className="current-timing">
                  <p><strong>Current Tithi:</strong> {panchangam.tithi}</p>
                  <p><strong>Current Nakshatra:</strong> {panchangam.nakshatra}</p>
                </div>
                {puja.panchangamGuidance.bestDays && (
                  <div className="best-days">
                    <strong>Best Days:</strong>
                    <ul>
                      {puja.panchangamGuidance.bestDays.map((day, idx) => (
                        <li key={idx}>{day}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {puja.panchangamGuidance.avoidDays && (
                  <div className="avoid-days">
                    <strong>Days to Avoid:</strong>
                    <ul>
                      {puja.panchangamGuidance.avoidDays.map((day, idx) => (
                        <li key={idx}>{day}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {puja.panchangamGuidance.bestNakshatra && (
                  <div className="best-nakshatra">
                    <strong>Best Nakshatras:</strong>
                    <p>{puja.panchangamGuidance.bestNakshatra.join(', ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="sidebar-section">
            <h3 className="sidebar-title">✨ Benefits</h3>
            <ul className="benefits-list">
              {puja.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>

          {puja.tips && puja.tips.length > 0 && (
            <div className="sidebar-section">
              <h3 className="sidebar-title">💡 Tips</h3>
              <ul className="tips-list">
                {puja.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="guide-main">
          <div className="steps-navigation">
            <div className="steps-list">
              {puja.steps.map((step, idx) => (
                <div
                  key={step.stepNumber}
                  className={`step-nav-item ${idx === currentStep ? 'active' : ''} ${completedSteps.includes(step.stepNumber) ? 'completed' : ''}`}
                  onClick={() => setCurrentStep(idx)}
                >
                  <div className="step-number">
                    {completedSteps.includes(step.stepNumber) ? '✓' : step.stepNumber}
                  </div>
                  <div className="step-title-short">{step.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="current-step-content">
            <div className="step-header">
              <div className="step-number-large">Step {currentStepData.stepNumber}</div>
              <h2 className="step-title">{currentStepData.title}</h2>
              {currentStepData.duration && (
                <span className="step-duration">⏱️ {currentStepData.duration}</span>
              )}
            </div>

            <div className="step-description">
              <p>{currentStepData.description}</p>
            </div>

            {currentStepData.mantra && (
              <div className="mantra-section">
                <h3 className="mantra-title">🕉️ Mantra</h3>
                <div className="mantra-content">
                  <div className="mantra-sanskrit">
                    <strong>Sanskrit:</strong>
                    <p>{currentStepData.mantra.sanskrit}</p>
                  </div>
                  <div className="mantra-transliteration">
                    <strong>Transliteration:</strong>
                    <p>{currentStepData.mantra.transliteration}</p>
                  </div>
                  <div className="mantra-meaning">
                    <strong>Meaning:</strong>
                    <p>{currentStepData.mantra.meaning}</p>
                  </div>
                  {currentStepData.mantra.repetitions && (
                    <div className="mantra-repetitions">
                      <strong>Repetitions:</strong> {currentStepData.mantra.repetitions}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStepData.tips && currentStepData.tips.length > 0 && (
              <div className="step-tips">
                <h4>💡 Tips for this step:</h4>
                <ul>
                  {currentStepData.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="step-completion">
              <label className="completion-checkbox">
                <input
                  type="checkbox"
                  checked={completedSteps.includes(currentStepData.stepNumber)}
                  onChange={() => toggleStepCompletion(currentStepData.stepNumber)}
                />
                <span>Mark this step as completed</span>
              </label>
            </div>

            <div className="step-navigation-buttons">
              <button 
                className="nav-btn prev-btn" 
                onClick={handlePrevStep}
                disabled={isFirstStep}
              >
                ← Previous Step
              </button>
              {completedSteps.length === puja.steps.length && (
                <button className="reset-btn" onClick={resetProgress}>
                  Reset Progress
                </button>
              )}
              <button 
                className="nav-btn next-btn" 
                onClick={handleNextStep}
                disabled={isLastStep}
              >
                {isLastStep ? 'Completed ✓' : 'Next Step →'}
              </button>
            </div>
          </div>

          {puja.mantras && puja.mantras.length > 0 && (
            <div className="all-mantras-section">
              <h3>📿 All Mantras for {puja.name}</h3>
              <div className="mantras-grid">
                {puja.mantras.map((mantra, idx) => (
                  <div key={idx} className="mantra-card">
                    <div className="mantra-card-sanskrit">{mantra.sanskrit}</div>
                    <div className="mantra-card-transliteration">{mantra.transliteration}</div>
                    <div className="mantra-card-meaning">{mantra.meaning}</div>
                    {mantra.repetitions && (
                      <div className="mantra-card-repetitions">
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
