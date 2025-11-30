import React, { useState } from 'react';
import './DreamInterpretationPage.css';

const DreamInterpretationPage = () => {
  const [dreamText, setDreamText] = useState('');
  const [interpretation, setInterpretation] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonSymbols = [
    { symbol: '🐘', name: 'Elephant', meaning: 'Wisdom, Lord Ganesha\'s blessings, obstacles being removed' },
    { symbol: '🐍', name: 'Snake', meaning: 'Kundalini energy, transformation, hidden fears or wisdom' },
    { symbol: '🪷', name: 'Lotus', meaning: 'Spiritual awakening, purity, divine consciousness' },
    { symbol: '🔱', name: 'Trident', meaning: 'Lord Shiva\'s presence, power, destruction of ego' },
    { symbol: '🌊', name: 'Water', meaning: 'Emotions, purification, flow of consciousness' },
    { symbol: '🔥', name: 'Fire', meaning: 'Transformation, purification, divine energy' },
    { symbol: '🕉️', name: 'Om Symbol', meaning: 'Divine presence, spiritual awakening, cosmic consciousness' },
    { symbol: '🦚', name: 'Peacock', meaning: 'Lord Murugan/Kartikeya, victory, beauty' },
    { symbol: '🐄', name: 'Cow', meaning: 'Abundance, motherhood, divine nourishment' },
    { symbol: '🌙', name: 'Moon', meaning: 'Mind, emotions, Lord Shiva, cycles' },
    { symbol: '☀️', name: 'Sun', meaning: 'Consciousness, clarity, divine illumination' },
    { symbol: '🦁', name: 'Lion', meaning: 'Courage, Goddess Durga, power' }
  ];

  const handleAnalyze = async () => {
    if (dreamText.trim() === '') return;

    setIsAnalyzing(true);

    try {
      const response = await fetch('/.netlify/functions/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `I had this dream: ${dreamText}\n\nPlease interpret this dream from a Hindu spiritual perspective.`,
          featureType: 'dream-interpretation'
        })
      });

      const data = await response.json();

      if (data.success) {
        const result = {
          mainInterpretation: data.response,
          spiritualSignificance: 'Based on Hindu dream interpretation traditions',
          scriptureReference: 'Various Hindu texts on dream symbolism',
          symbolsFound: [],
          recommendations: []
        };
        setInterpretation(result);
      } else {
        throw new Error(data.error || 'Failed to interpret dream');
      }
    } catch (error) {
      console.error('Error analyzing dream:', error);
      const errorResult = {
        mainInterpretation: '🙏 Unable to interpret your dream at this moment. Please try again shortly.',
        spiritualSignificance: '',
        scriptureReference: '',
        symbolsFound: [],
        recommendations: []
      };
      setInterpretation(errorResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSymbolClick = (symbol) => {
    setDreamText(dreamText + ' ' + symbol.name);
  };

  return (
    <div className="dream-interpretation-page">
      <div className="dream-header">
        <h1>Dream Interpretation</h1>
        <p className="dream-subtitle">
          Understand the spiritual meaning of your dreams based on Hindu scriptures and ancient symbolism
        </p>
      </div>

      <div className="dream-container">
        {!interpretation ? (
          <div className="input-section">
            <div className="dream-input-card">
              <h2>Describe Your Dream</h2>
              <p className="input-instruction">
                Share the details of your dream, including symbols, emotions, and events you remember.
                The more detail you provide, the better the interpretation.
              </p>

              <textarea
                value={dreamText}
                onChange={(e) => setDreamText(e.target.value)}
                placeholder="I dreamed about..."
                rows="8"
                className="dream-textarea"
              />

              <button
                onClick={handleAnalyze}
                className="analyze-btn"
                disabled={dreamText.trim() === '' || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing Your Dream... 🔮' : 'Interpret My Dream 🌙'}
              </button>
            </div>

            <div className="common-symbols-section">
              <h3>Common Hindu Dream Symbols</h3>
              <p>Click on any symbol to add it to your dream description</p>
              
              <div className="symbols-grid">
                {commonSymbols.map((item, index) => (
                  <div
                    key={index}
                    className="symbol-card"
                    onClick={() => handleSymbolClick(item)}
                  >
                    <div className="symbol-icon">{item.symbol}</div>
                    <div className="symbol-name">{item.name}</div>
                    <div className="symbol-meaning">{item.meaning}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="interpretation-section">
            <div className="interpretation-header">
              <h2>Your Dream Interpretation</h2>
              <button
                onClick={() => setInterpretation(null)}
                className="new-dream-btn"
              >
                Analyze Another Dream
              </button>
            </div>

            <div className="interpretation-content">
              <div className="interpretation-card main-interpretation">
                <h3>🌙 Main Interpretation</h3>
                <p>{interpretation.mainInterpretation}</p>
              </div>

              <div className="interpretation-card spiritual-significance">
                <h3>✨ Spiritual Significance</h3>
                <p>{interpretation.spiritualSignificance}</p>
              </div>

              <div className="interpretation-card scripture-reference">
                <h3>📖 Scripture Reference</h3>
                <p>{interpretation.scriptureReference}</p>
              </div>

              <div className="interpretation-card symbols-found">
                <h3>🔍 Symbols Found in Your Dream</h3>
                <div className="found-symbols">
                  {interpretation.symbolsFound.map((symbol, index) => (
                    <div key={index} className="found-symbol">
                      <span className="found-symbol-icon">{symbol.symbol}</span>
                      <div>
                        <strong>{symbol.name}</strong>
                        <p>{symbol.interpretation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="interpretation-card recommendations">
                <h3>🙏 Spiritual Recommendations</h3>
                <ul>
                  {interpretation.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              <div className="dream-journal-tip">
                <h4>💭 Dream Journal Tip</h4>
                <p>
                  Keep a notebook by your bedside. Write down your dreams immediately upon waking 
                  for the most accurate recall. Patterns in your dreams can reveal deeper spiritual insights.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DreamInterpretationPage;
