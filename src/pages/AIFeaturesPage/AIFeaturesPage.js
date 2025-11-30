import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AIFeaturesPage.css';

const AIFeaturesPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Guidance', 'Analysis', 'Recommendations'];

  const features = [
    {
      id: 1,
      title: 'Ask a Guru',
      category: 'Guidance',
      description: 'Get answers to your spiritual questions from an AI chatbot trained on ancient Hindu scriptures and teachings.',
      icon: '🧘‍♂️',
      features: [
        'Scripture-based answers',
        'Dharma guidance',
        'Meditation advice',
        'Philosophical discussions'
      ],
      route: '/ai/ask-guru',
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)'
    },
    {
      id: 2,
      title: 'Dream Interpretation',
      category: 'Analysis',
      description: 'Understand the spiritual meaning of your dreams based on Hindu scriptures and ancient symbolism.',
      icon: '🌙',
      features: [
        'Scripture references',
        'Symbol meanings',
        'Spiritual significance',
        'Actionable insights'
      ],
      route: '/ai/dream-interpretation',
      gradient: 'linear-gradient(135deg, #4E54C8 0%, #8F94FB 100%)'
    },
    {
      id: 3,
      title: 'Name Suggestion',
      category: 'Recommendations',
      description: 'Find the perfect name for your baby with meanings, nakshatra-based recommendations, and deity associations.',
      icon: '👶',
      features: [
        'Nakshatra-based names',
        'Deity associations',
        'Numerology insights',
        'Gender-specific options'
      ],
      route: '/ai/name-suggestion',
      gradient: 'linear-gradient(135deg, #11998E 0%, #38EF7D 100%)'
    },
    {
      id: 4,
      title: 'Personalized Shloka',
      category: 'Recommendations',
      description: 'Receive AI-curated verses from ancient scriptures that resonate with your current life situation and emotions.',
      icon: '📿',
      features: [
        'Situation-based verses',
        'Meaning & context',
        'Audio pronunciation',
        'Daily inspiration'
      ],
      route: '/ai/personalized-shloka',
      gradient: 'linear-gradient(135deg, #FA8BFF 0%, #2BD2FF 100%)'
    }
  ];

  const filteredFeatures = selectedCategory === 'All'
    ? features
    : features.filter(f => f.category === selectedCategory);

  return (
    <div className="ai-features-page">
      <div className="ai-features-header">
        <h1>AI-Powered Features</h1>
        <p className="ai-subtitle">
          Harness the power of artificial intelligence trained on ancient wisdom to enhance your spiritual journey
        </p>
      </div>

      <div className="ai-features-container">
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="features-grid">
          {filteredFeatures.map(feature => (
            <div key={feature.id} className="feature-card">
              <div className="feature-header" style={{ background: feature.gradient }}>
                <div className="feature-icon">{feature.icon}</div>
                <span className="feature-category-badge">{feature.category}</span>
              </div>
              
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                <div className="feature-list">
                  <h4>Key Features:</h4>
                  <ul>
                    {feature.features.map((item, index) => (
                      <li key={index}>
                        <span className="check-icon">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className="try-feature-btn"
                  onClick={() => navigate(feature.route)}
                  style={{ background: feature.gradient }}
                >
                  Try Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="ai-info-section">
          <div className="info-card">
            <div className="info-icon">🤖</div>
            <h3>AI Technology</h3>
            <p>Our AI models are trained on thousands of verses from Bhagavad Gita, Upanishads, Puranas, and other sacred texts.</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">🔒</div>
            <h3>Privacy First</h3>
            <p>Your questions and data are private and secure. We don't store personal information or share your queries.</p>
          </div>
          
          <div className="info-card">
            <div className="info-icon">✨</div>
            <h3>Continuously Learning</h3>
            <p>Our AI improves over time, providing increasingly accurate and relevant spiritual guidance.</p>
          </div>
        </div>

        <div className="coming-soon-section">
          <h3>Coming Soon</h3>
          <div className="coming-soon-grid">
            <div className="coming-soon-card">
              <span className="soon-icon">🎯</span>
              <h4>Karma Analysis</h4>
              <p>Understand your karmic patterns and get personalized remedies</p>
            </div>
            <div className="coming-soon-card">
              <span className="soon-icon">🌟</span>
              <h4>Spiritual Path Finder</h4>
              <p>AI-guided personalized spiritual practice recommendations</p>
            </div>
            <div className="coming-soon-card">
              <span className="soon-icon">📖</span>
              <h4>Scripture Study Guide</h4>
              <p>Interactive learning with AI-powered explanations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIFeaturesPage;
