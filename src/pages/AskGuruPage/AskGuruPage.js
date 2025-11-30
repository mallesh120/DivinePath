import React, { useState, useRef, useEffect } from 'react';
import './AskGuruPage.css';

const AskGuruPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'guru',
      text: 'Namaste! 🙏 I am here to guide you on your spiritual journey. Ask me anything about Hindu philosophy, scriptures, dharma, meditation, or life\'s deeper questions.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedTopics = [
    { icon: '🕉️', text: 'What is Dharma?', category: 'Philosophy' },
    { icon: '🧘', text: 'How to meditate effectively?', category: 'Practice' },
    { icon: '♻️', text: 'Explain Karma', category: 'Concepts' },
    { icon: '🌸', text: 'Path to liberation (Moksha)', category: 'Goals' },
    { icon: '📿', text: 'Benefits of chanting mantras', category: 'Practice' },
    { icon: '💫', text: 'Understanding the Atman', category: 'Philosophy' }
  ];

  // Sample responses (in production, this would connect to an AI backend)
  const guruResponses = {
    dharma: {
      text: "Dharma is one of the most profound concepts in Hindu philosophy. It refers to righteous duty, moral law, and the cosmic order that sustains the universe.\n\nIn the Bhagavad Gita (3.35), Lord Krishna says: 'Better is one's own dharma, though imperfect, than the dharma of another well performed. Better is death in one's own dharma; the dharma of another invites danger.'\n\nDharma operates at multiple levels:\n• Sanatana Dharma - Universal eternal duties\n• Varna Dharma - Duties according to one's nature\n• Ashrama Dharma - Duties for different life stages\n• Individual Dharma - One's personal obligations\n\nLiving according to dharma brings harmony, peace, and spiritual progress.",
      scripture: "Bhagavad Gita 3.35"
    },
    meditation: {
      text: "Meditation (Dhyana) is a powerful tool for spiritual growth and self-realization. Here are key principles from ancient texts:\n\n1. **Posture**: Sit in a comfortable, stable position with spine erect (Yoga Sutras 2.46)\n\n2. **Breath**: Focus on natural breathing to calm the mind\n\n3. **Object of Focus**: Choose a mantra, deity form, or breath\n\n4. **Regular Practice**: Consistency is more important than duration\n\n5. **Detachment**: Observe thoughts without judgment\n\nThe Bhagavad Gita (6.25) advises: 'Gradually, step by step, with full conviction, the mind should be drawn away from all material objects and fixed on the Self alone through the intelligence.'\n\nStart with 10-15 minutes daily and gradually increase.",
      scripture: "Bhagavad Gita 6.25, Yoga Sutras 2.46"
    },
    karma: {
      text: "Karma is the law of cause and effect governing all actions and their consequences. Every action creates an imprint (samskara) that shapes our future.\n\n**Three Types of Karma:**\n\n1. **Sanchita Karma** - Accumulated karma from past lives\n2. **Prarabdha Karma** - Karma being experienced in this life\n3. **Kriyamana Karma** - New karma being created now\n\nThe Bhagavad Gita teaches Karma Yoga - performing actions without attachment to results. Lord Krishna says (2.47): 'You have a right to perform your prescribed duty, but you are not entitled to the fruits of action.'\n\n**How to Work with Karma:**\n• Act with pure intention\n• Surrender results to the Divine\n• Accept circumstances with equanimity\n• Perform selfless service",
      scripture: "Bhagavad Gita 2.47"
    },
    moksha: {
      text: "Moksha (liberation) is the ultimate goal - freedom from the cycle of birth and death (samsara) and union with the Supreme Reality.\n\n**Four Paths to Moksha:**\n\n1. **Jnana Yoga** - Path of knowledge and wisdom\n2. **Bhakti Yoga** - Path of devotion and love\n3. **Karma Yoga** - Path of selfless action\n4. **Raja Yoga** - Path of meditation and mind control\n\nThe Upanishads teach that moksha is realizing the truth: 'Tat Tvam Asi' (You are That) - your true nature is identical with Brahman, the Supreme Reality.\n\n**Prerequisites for Liberation:**\n• Discrimination (Viveka)\n• Dispassion (Vairagya)\n• Six virtues (control of mind, senses, etc.)\n• Desire for liberation (Mumukshutva)\n\nMoksha is not going somewhere, but awakening to what you already are.",
      scripture: "Chandogya Upanishad 6.8.7"
    },
    mantras: {
      text: "Mantras are sacred sound vibrations that purify the mind and invoke divine consciousness. Their power lies in both meaning and sonic resonance.\n\n**Benefits of Mantra Chanting:**\n\n• Calms and focuses the mind\n• Purifies subtle energy channels\n• Invokes divine grace\n• Transforms consciousness\n• Protects from negative energies\n• Leads to self-realization\n\n**Popular Mantras:**\n\n1. **Om** - The primordial sound, essence of all mantras\n2. **Gayatri Mantra** - For illumination of intellect\n3. **Maha Mrityunjaya** - For healing and protection\n4. **Om Namah Shivaya** - Invocation of Lord Shiva\n\nThe Mandukya Upanishad states: 'Om is the imperishable sound, the whole universe is its exposition.'\n\n**For Best Results:**\n• Chant with proper pronunciation\n• Practice regularly, ideally at sunrise\n• Maintain mental focus and devotion\n• Understand the meaning",
      scripture: "Mandukya Upanishad 1"
    },
    atman: {
      text: "Atman is the eternal, unchanging Self - your true nature beyond body and mind. Understanding Atman is central to spiritual realization.\n\n**Nature of Atman:**\n\n• Eternal and indestructible\n• Pure consciousness (Sat-Chit-Ananda)\n• Identical with Brahman (Supreme Reality)\n• Beyond time, space, and causation\n• Witness of all experiences\n\nThe Bhagavad Gita (2.20) declares: 'For the soul there is neither birth nor death. It is not slain when the body is slain.'\n\nThe Upanishads teach through the mahavakyas (great sayings):\n• 'Aham Brahmasmi' - I am Brahman\n• 'Tat Tvam Asi' - You are That\n• 'Ayam Atma Brahma' - This Self is Brahman\n\n**Realization Process:**\n1. Discrimination between Self and non-self\n2. Meditation on 'Who am I?'\n3. Negation of false identifications\n4. Direct experience of pure being\n\nYou are not the body, mind, or ego - you are the eternal, blissful Atman.",
      scripture: "Bhagavad Gita 2.20, Brihadaranyaka Upanishad"
    },
    default: {
      text: "That's a profound question. Let me share wisdom from our scriptures.\n\nThe essence of all spiritual teaching can be found in the Bhagavad Gita's core messages:\n\n1. **Know Your True Self** - You are the eternal Atman, not the temporary body-mind\n\n2. **Do Your Duty** - Perform your dharma without attachment to results\n\n3. **Surrender to the Divine** - Offer all actions to God\n\n4. **Practice Equanimity** - Remain balanced in pleasure and pain, success and failure\n\n5. **Cultivate Devotion** - Develop love and devotion to the Supreme\n\nAs Lord Krishna teaches (18.66): 'Abandon all varieties of dharma and simply surrender unto Me alone. I shall liberate you from all sinful reactions; do not fear.'\n\nFeel free to ask more specific questions about any aspect of spiritual practice, philosophy, or scriptures.",
      scripture: "Bhagavad Gita 18.66"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getGuruResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('dharma')) {
      return guruResponses.dharma;
    } else if (lowerMessage.includes('meditat')) {
      return guruResponses.meditation;
    } else if (lowerMessage.includes('karma')) {
      return guruResponses.karma;
    } else if (lowerMessage.includes('moksha') || lowerMessage.includes('liberation')) {
      return guruResponses.moksha;
    } else if (lowerMessage.includes('mantra') || lowerMessage.includes('chant')) {
      return guruResponses.mantras;
    } else if (lowerMessage.includes('atman') || lowerMessage.includes('self') || lowerMessage.includes('soul')) {
      return guruResponses.atman;
    } else {
      return guruResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getGuruResponse(inputMessage);
      const guruMsg = {
        id: messages.length + 2,
        type: 'guru',
        text: response.text,
        scripture: response.scripture,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, guruMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const handleTopicClick = (topic) => {
    setInputMessage(topic);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="ask-guru-page">
      <div className="guru-header">
        <h1>Ask a Guru</h1>
        <p className="guru-subtitle">
          AI-powered spiritual guidance based on ancient Hindu scriptures and teachings
        </p>
      </div>

      <div className="guru-container">
        <div className="chat-section">
          <div className="messages-container">
            {messages.map(message => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-avatar">
                  {message.type === 'guru' ? '🧘‍♂️' : '🙏'}
                </div>
                <div className="message-content">
                  <div className="message-text">{message.text}</div>
                  {message.scripture && (
                    <div className="scripture-reference">
                      📖 Reference: {message.scripture}
                    </div>
                  )}
                  <div className="message-time">
                    {message.timestamp.toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message guru">
                <div className="message-avatar">🧘‍♂️</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="input-container">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask your spiritual question..."
              rows="2"
            />
            <button onClick={handleSendMessage} className="send-btn">
              Send 📤
            </button>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="suggested-topics">
            <h3>Suggested Topics</h3>
            <div className="topics-grid">
              {suggestedTopics.map((topic, index) => (
                <button
                  key={index}
                  className="topic-btn"
                  onClick={() => handleTopicClick(topic.text)}
                >
                  <span className="topic-icon">{topic.icon}</span>
                  <div className="topic-text">
                    <div className="topic-title">{topic.text}</div>
                    <div className="topic-category">{topic.category}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="guru-info">
            <h3>About This Feature</h3>
            <p>
              Our AI Guru is trained on sacred texts including the Bhagavad Gita, 
              Upanishads, Puranas, and teachings of great saints. Ask questions about:
            </p>
            <ul>
              <li>Hindu philosophy and concepts</li>
              <li>Spiritual practices and meditation</li>
              <li>Dharma and righteous living</li>
              <li>Life guidance and moral dilemmas</li>
              <li>Scripture interpretations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskGuruPage;
