import React, { useState } from 'react';
import './PersonalizedShlokaPage.css';

const PersonalizedShlokaPage = () => {
  const [situation, setSituation] = useState('');
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const emotions = [
    { emoji: '😰', label: 'Anxious', value: 'anxious' },
    { emoji: '😢', label: 'Sad', value: 'sad' },
    { emoji: '😡', label: 'Angry', value: 'angry' },
    { emoji: '😕', label: 'Confused', value: 'confused' },
    { emoji: '😌', label: 'Peaceful', value: 'peaceful' },
    { emoji: '😊', label: 'Happy', value: 'happy' },
    { emoji: '🙏', label: 'Grateful', value: 'grateful' },
    { emoji: '💪', label: 'Motivated', value: 'motivated' }
  ];

  const shlokaDatabase = {
    anxious: {
      shloka: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥',
      transliteration: 'Yogasthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanañjaya\nSiddhyasiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate',
      meaning: 'Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called yoga.',
      context: 'This verse from the Bhagavad Gita (2.48) teaches us to remain balanced in all situations. When you feel anxious, remember that outcomes are not entirely in your control. Focus on your efforts and duties without attachment to results.',
      source: 'Bhagavad Gita 2.48',
      application: 'When anxiety strikes, this shloka reminds you to focus on what you can control - your actions and attitude. Let go of worrying about outcomes and maintain inner balance.',
      practices: [
        'Chant this shloka 11 times in the morning',
        'Practice detachment from results in daily tasks',
        'Meditate on the concept of equanimity',
        'Write down what you can and cannot control'
      ]
    },
    sad: {
      shloka: 'न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥',
      transliteration: 'Na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ\nAjo nityaḥ śāśvato\'yaṁ purāṇo na hanyate hanyamāne śarīre',
      meaning: 'The soul is never born and never dies. It is unborn, eternal, ever-existing, and primeval. It is not slain when the body is slain.',
      context: 'From Bhagavad Gita (2.20), this verse reminds us of our eternal nature. Sadness often comes from attachment and loss, but understanding that the true self is immortal brings profound comfort.',
      source: 'Bhagavad Gita 2.20',
      application: 'In times of grief or sadness, remember that your true nature is eternal. Physical forms change, but the essence of who you are remains untouched.',
      practices: [
        'Reflect on the eternal nature of the soul',
        'Practice self-inquiry: "Who am I beyond this body?"',
        'Chant "Om" to connect with your eternal self',
        'Read about the nature of Atman in Upanishads'
      ]
    },
    angry: {
      shloka: 'क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥',
      transliteration: 'Krodhād bhavati sammohaḥ sammohāt smṛti-vibhramaḥ\nSmṛti-bhraṁśād buddhi-nāśo buddhi-nāśāt praṇaśyati',
      meaning: 'From anger comes delusion; from delusion, loss of memory; from loss of memory, destruction of intelligence; and from destruction of intelligence, one perishes.',
      context: 'Bhagavad Gita (2.63) warns about the destructive chain reaction of anger. This verse helps you become aware of anger\'s progression and stop it before it causes harm.',
      source: 'Bhagavad Gita 2.63',
      application: 'When you feel angry, pause and recognize where you are in this chain. Awareness itself can break the cycle before it leads to regrettable actions.',
      practices: [
        'Take 10 deep breaths when anger arises',
        'Practice the cooling breath (Sheetali Pranayama)',
        'Chant "Om Shanti" to invoke peace',
        'Reflect on this verse when calm returns'
      ]
    },
    confused: {
      shloka: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
      transliteration: 'Yadā yadā hi dharmasya glānir bhavati bhārata\nAbhyutthānam adharmasya tadātmānaṁ sṛjāmyaham',
      meaning: 'Whenever there is a decline in righteousness and a rise in unrighteousness, O Arjuna, at that time I manifest myself.',
      context: 'Bhagavad Gita (4.7) assures us that divine guidance appears when we need it most. In times of confusion, trust that clarity will come.',
      source: 'Bhagavad Gita 4.7',
      application: 'When confused about your path, remember that the divine within and around you will guide you toward dharma. Be patient and stay open to guidance.',
      practices: [
        'Pray for clarity before major decisions',
        'Journal to clarify your thoughts',
        'Seek counsel from wise elders or mentors',
        'Meditate on your dharma (life purpose)'
      ]
    },
    peaceful: {
      shloka: 'सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ।\nततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि॥',
      transliteration: 'Sukha-duḥkhe same kṛtvā lābhālābhau jayājayau\nTato yuddhāya yujyasva naivaṁ pāpam avāpsyasi',
      meaning: 'Treating pleasure and pain, gain and loss, victory and defeat alike, engage in your duty. Thus you will not incur sin.',
      context: 'Bhagavad Gita (2.38) teaches equanimity. When you feel peaceful, use this state to strengthen your capacity for balance in all circumstances.',
      source: 'Bhagavad Gita 2.38',
      application: 'In moments of peace, deepen your practice of equanimity so it becomes your natural state, not just a temporary feeling.',
      practices: [
        'Deepen your meditation practice',
        'Observe the impermanence of all states',
        'Practice gratitude for this peaceful moment',
        'Use this calm to prepare for future challenges'
      ]
    },
    happy: {
      shloka: 'यं लब्ध्वा चापरं लाभं मन्यते नाधिकं ततः।\nयस्मिन्स्थितो न दुःखेन गुरुणापि विचाल्यते॥',
      transliteration: 'Yaṁ labdhvā cāparaṁ lābhaṁ manyate nādhikaṁ tataḥ\nYasmin sthito na duḥkhena guruṇāpi vicālyate',
      meaning: 'Upon gaining this, one thinks there is no greater gain. Being established in this state, one is not shaken even by the heaviest sorrow.',
      context: 'Bhagavad Gita (6.22) describes the supreme joy of spiritual realization. True happiness comes from inner peace, not external circumstances.',
      source: 'Bhagavad Gita 6.22',
      application: 'Recognize that worldly happiness is temporary. Use joyful moments to turn inward and discover the eternal bliss within.',
      practices: [
        'Share your happiness with others through service',
        'Express gratitude for blessings received',
        'Remember this feeling during difficult times',
        'Channel joy into spiritual practices'
      ]
    },
    grateful: {
      shloka: 'अन्नाद्भवन्ति भूतानि पर्जन्यादन्नसम्भवः।\nयज्ञाद्भवति पर्जन्यो यज्ञः कर्मसमुद्भवः॥',
      transliteration: 'Annād bhavanti bhūtāni parjanyād anna-sambhavaḥ\nYajñād bhavati parjanyo yajñaḥ karma-samudbhavaḥ',
      meaning: 'All beings come from food, food comes from rain, rain comes from sacrifice, and sacrifice comes from prescribed duties.',
      context: 'Bhagavad Gita (3.14) reveals the interconnectedness of all existence. Gratitude deepens when we recognize how everything is connected.',
      source: 'Bhagavad Gita 3.14',
      application: 'Express gratitude by recognizing the chain of causes that brings blessings to you. Honor this through selfless action and offerings.',
      practices: [
        'Offer food before eating (prasadam)',
        'Thank all who contribute to your well-being',
        'Perform acts of service as gratitude',
        'Keep a daily gratitude journal'
      ]
    },
    motivated: {
      shloka: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      transliteration: 'Karmaṇy evādhikāras te mā phaleṣu kadācana\nMā karma-phala-hetur bhūr mā te saṅgo\'stv akarmaṇi',
      meaning: 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results, nor be attached to not doing your duty.',
      context: 'Bhagavad Gita (2.47), one of the most famous verses, guides motivated individuals to act with dedication while maintaining detachment from outcomes.',
      source: 'Bhagavad Gita 2.47',
      application: 'Channel your motivation into consistent action without anxiety about results. This is the essence of Karma Yoga.',
      practices: [
        'Set clear intentions for your actions',
        'Focus on excellence in effort, not outcomes',
        'Dedicate your work to a higher purpose',
        'Celebrate the action itself, not just results'
      ]
    }
  };

  const handleGetShloka = () => {
    if (situation.trim() === '' && selectedEmotion === '') {
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      const emotion = selectedEmotion || 'peaceful';
      const shloka = shlokaDatabase[emotion] || shlokaDatabase.peaceful;
      setRecommendations(shloka);
      setIsAnalyzing(false);
    }, 1500);
  };

  const playAudio = () => {
    alert('Audio pronunciation feature coming soon! 🔊');
  };

  return (
    <div className="personalized-shloka-page">
      <div className="shloka-header">
        <h1>Personalized Shloka</h1>
        <p className="shloka-subtitle">
          Receive AI-curated verses from ancient scriptures that resonate with your current life situation
        </p>
      </div>

      <div className="shloka-container">
        {!recommendations ? (
          <div className="input-section-shloka">
            <div className="situation-card">
              <h2>What's on your mind?</h2>
              <p className="situation-instruction">
                Share your current situation, challenge, or what you're experiencing. 
                The more honest you are, the more relevant the guidance will be.
              </p>

              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="Describe your current situation or what you're feeling..."
                rows="6"
                className="situation-textarea"
              />

              <div className="emotions-section">
                <h3>How are you feeling right now?</h3>
                <div className="emotions-grid">
                  {emotions.map((emotion) => (
                    <button
                      key={emotion.value}
                      className={`emotion-btn ${selectedEmotion === emotion.value ? 'selected' : ''}`}
                      onClick={() => setSelectedEmotion(emotion.value)}
                    >
                      <span className="emotion-emoji">{emotion.emoji}</span>
                      <span className="emotion-label">{emotion.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGetShloka}
                className="get-shloka-btn"
                disabled={(situation.trim() === '' && selectedEmotion === '') || isAnalyzing}
              >
                {isAnalyzing ? 'Finding Your Verse... 🙏' : 'Get My Shloka 📿'}
              </button>
            </div>

            <div className="shloka-info">
              <h3>Why Shlokas Matter</h3>
              <div className="info-content">
                <div className="info-item">
                  <span className="info-icon">📖</span>
                  <div>
                    <h4>Ancient Wisdom</h4>
                    <p>Shlokas from Bhagavad Gita and Upanishads contain timeless truths that guide us through life's challenges.</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">🧘</span>
                  <div>
                    <h4>Practical Guidance</h4>
                    <p>Each verse offers practical wisdom that can be applied to modern life situations and emotional states.</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">💫</span>
                  <div>
                    <h4>Transformative Power</h4>
                    <p>Regular contemplation of shlokas transforms consciousness and brings clarity to confused minds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="recommendations-section">
            <div className="recommendations-header">
              <h2>Your Personalized Shloka</h2>
              <button
                onClick={() => {
                  setRecommendations(null);
                  setSituation('');
                  setSelectedEmotion('');
                }}
                className="new-shloka-btn"
              >
                Get Another Shloka
              </button>
            </div>

            <div className="shloka-display">
              <div className="shloka-sanskrit">
                <h3>Sanskrit</h3>
                <p className="sanskrit-text">{recommendations.shloka}</p>
                <button onClick={playAudio} className="audio-btn">
                  🔊 Play Pronunciation
                </button>
              </div>

              <div className="shloka-transliteration">
                <h3>Transliteration</h3>
                <p className="transliteration-text">{recommendations.transliteration}</p>
              </div>

              <div className="shloka-meaning">
                <h3>Meaning</h3>
                <p>{recommendations.meaning}</p>
              </div>

              <div className="shloka-context">
                <h3>📚 Context & Explanation</h3>
                <p>{recommendations.context}</p>
                <div className="source-tag">
                  Source: {recommendations.source}
                </div>
              </div>

              <div className="shloka-application">
                <h3>🎯 How to Apply This</h3>
                <p>{recommendations.application}</p>
              </div>

              <div className="shloka-practices">
                <h3>🙏 Suggested Practices</h3>
                <ul>
                  {recommendations.practices.map((practice, index) => (
                    <li key={index}>{practice}</li>
                  ))}
                </ul>
              </div>

              <div className="reflection-card">
                <h4>💭 Reflection Exercise</h4>
                <p>
                  Take a few moments to sit quietly with this verse. Close your eyes, 
                  take three deep breaths, and let the meaning sink into your consciousness. 
                  How does this wisdom apply to your current situation?
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedShlokaPage;
