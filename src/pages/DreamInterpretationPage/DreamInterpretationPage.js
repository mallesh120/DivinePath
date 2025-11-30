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

  // Sample interpretations based on keywords
  const interpretDream = (dream) => {
    const lowerDream = dream.toLowerCase();
    
    if (lowerDream.includes('elephant') || lowerDream.includes('ganesha')) {
      return {
        mainInterpretation: "Dreaming of an elephant is highly auspicious in Hindu tradition. It represents the presence and blessings of Lord Ganesha, the remover of obstacles.",
        spiritualSignificance: "Your dream indicates that obstacles in your path will be removed. Lord Ganesha is guiding you towards success and wisdom. This is an excellent time to start new ventures or overcome challenges.",
        scriptureReference: "The elephant-headed deity Ganesha is invoked at the beginning of all endeavors. Your dream suggests divine support for your current undertakings.",
        symbolsFound: [
          { symbol: '🐘', name: 'Elephant', interpretation: 'Wisdom, success, removal of obstacles' }
        ],
        recommendations: [
          'Chant the Ganesha mantra: Om Gam Ganapataye Namaha',
          'Begin important tasks on Wednesdays',
          'Practice patience and wisdom in decision-making',
          'Offer prayers to Lord Ganesha'
        ]
      };
    } else if (lowerDream.includes('snake') || lowerDream.includes('serpent')) {
      return {
        mainInterpretation: "Snakes in dreams hold deep spiritual significance in Hindu symbolism, representing kundalini energy, transformation, and the presence of Lord Shiva.",
        spiritualSignificance: "This dream indicates a period of spiritual awakening and transformation. The snake represents dormant spiritual energy within you that is ready to rise. It may also suggest the need to confront and transform fears.",
        scriptureReference: "In Hindu scriptures, the snake (Naga) is associated with Lord Shiva and represents cosmic energy. The Kundalini serpent at the base of the spine symbolizes spiritual potential.",
        symbolsFound: [
          { symbol: '🐍', name: 'Snake', interpretation: 'Transformation, kundalini awakening, spiritual power' }
        ],
        recommendations: [
          'Practice meditation to awaken kundalini safely',
          'Worship Lord Shiva or chant Om Namah Shivaya',
          'Seek guidance from a guru if pursuing kundalini yoga',
          'Embrace transformation in your life'
        ]
      };
    } else if (lowerDream.includes('water') || lowerDream.includes('river') || lowerDream.includes('ocean')) {
      return {
        mainInterpretation: "Water in dreams represents the flow of emotions, purification, and consciousness. It is deeply connected to spiritual cleansing and emotional healing.",
        spiritualSignificance: "Your dream suggests a need for emotional purification or indicates that you are going through a cleansing process. Clear, flowing water signifies positive changes, while turbulent water may indicate emotional turmoil that needs attention.",
        scriptureReference: "Sacred rivers like Ganga are revered for their purifying properties. Water symbolizes the flow of prana (life force) and consciousness in Vedic tradition.",
        symbolsFound: [
          { symbol: '🌊', name: 'Water', interpretation: 'Emotional flow, purification, consciousness' }
        ],
        recommendations: [
          'Practice emotional release through meditation',
          'Consider ritual bathing or purification practices',
          'Flow with life\'s changes rather than resisting',
          'Address suppressed emotions mindfully'
        ]
      };
    } else if (lowerDream.includes('temple') || lowerDream.includes('deity') || lowerDream.includes('god')) {
      return {
        mainInterpretation: "Seeing a temple or deity in your dream is extremely auspicious. It indicates divine presence, spiritual progress, and blessings from higher powers.",
        spiritualSignificance: "This dream is a call to deepen your spiritual practice. The divine is reaching out to you, inviting you to strengthen your connection through devotion and practice. Pay attention to which deity appeared, as they may have specific guidance for you.",
        scriptureReference: "The Bhagavad Gita teaches that God reveals Himself to sincere devotees. Your dream is a form of divine grace (kripa) showing you are on the right spiritual path.",
        symbolsFound: [
          { symbol: '🕉️', name: 'Divine Presence', interpretation: 'Spiritual progress, blessings, divine guidance' }
        ],
        recommendations: [
          'Increase your spiritual practice and devotion',
          'Visit temples and sacred places',
          'Study sacred scriptures',
          'Offer gratitude through prayer and meditation'
        ]
      };
    } else if (lowerDream.includes('fire') || lowerDream.includes('flame')) {
      return {
        mainInterpretation: "Fire in dreams represents transformation, purification, and divine energy. It symbolizes the burning away of karma and impurities.",
        spiritualSignificance: "Your dream indicates a period of transformation and purification. The fire represents Agni, the sacred fire that consumes impurities and transforms consciousness. This is a time of spiritual refinement.",
        scriptureReference: "Agni (fire) is one of the most important deities in the Vedas. It serves as the messenger between humans and gods, transforming offerings into divine energy.",
        symbolsFound: [
          { symbol: '🔥', name: 'Fire', interpretation: 'Transformation, purification, divine power' }
        ],
        recommendations: [
          'Embrace changes and transformation in your life',
          'Practice fire ceremonies (havan) if possible',
          'Let go of old patterns that no longer serve you',
          'Cultivate inner spiritual fire through practice'
        ]
      };
    } else {
      return {
        mainInterpretation: "Your dream contains significant spiritual symbolism. Dreams are considered messages from the subconscious mind and can offer guidance on your spiritual journey.",
        spiritualSignificance: "According to Hindu tradition, dreams can be prophetic, reflecting our karma, or providing divine guidance. The Upanishads discuss different states of consciousness, with dreams being an important realm of experience.",
        scriptureReference: "The Mandukya Upanishad explores four states of consciousness: waking, dreaming, deep sleep, and transcendental. Dreams provide insights into the deeper layers of consciousness.",
        symbolsFound: [
          { symbol: '🌙', name: 'Dream State', interpretation: 'Messages from subconscious, karmic reflections' }
        ],
        recommendations: [
          'Keep a dream journal to track patterns',
          'Meditate before sleep for clearer dreams',
          'Reflect on the emotions felt in the dream',
          'Consider the dream\'s message for your current life situation'
        ]
      };
    }
  };

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
