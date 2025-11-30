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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    const currentQuestion = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call Netlify serverless function
      const response = await fetch('/.netlify/functions/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: currentQuestion,
          featureType: 'ask-guru'
        })
      });

      const data = await response.json();

      if (data.success) {
        const guruMsg = {
          id: messages.length + 2,
          type: 'guru',
          text: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, guruMsg]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error calling AI:', error);
      const errorMsg = {
        id: messages.length + 2,
        type: 'guru',
        text: '🙏 My apologies, I am having trouble connecting to divine wisdom at this moment. Please try again in a few moments.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
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
