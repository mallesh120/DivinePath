import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { literatureData } from '../../data/literature';
import GradientHeader from '../../components/ui/GradientHeader/GradientHeader';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import './UniversalReaderPage.css';

const UniversalReaderPage = () => {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();

  // Speech Synthesis & Narration State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(-1);
  const utteranceRef = useRef(null);
  const itemRefs = useRef([]);

  // Reader Customization State
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('divine_reader_font_size') || 'normal');
  const [isZenMode, setIsZenMode] = useState(false);

  // Clean up audio on unmount or navigation
  useEffect(() => {
    window.scrollTo(0, 0); 
    
    // Stop speaking if navigating away
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setActiveItemIndex(-1);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [bookId, chapterId]);
  
  const book = literatureData.find((s) => s.id === parseInt(bookId) || s.id === bookId);

  // Find sections array safely
  const sections = book ? (
    book.chapters ||
    book.kandas ||
    book.parvas ||
    book.mandalas ||
    book.kaandas ||
    book.samhitas ||
    book.books
  ) : null;

  // Chapter ID could be an array index (stringified) or a specific string ID
  const currentIndex = sections ? sections.findIndex(
    (s, idx) => s.id === chapterId || idx.toString() === chapterId
  ) : -1;

  const chapter = (sections && currentIndex !== -1) ? sections[currentIndex] : null;
  const title = chapter ? (chapter.title || `Chapter ${chapter.number || currentIndex + 1}`) : '';

  // Save Reading History into localStorage
  useEffect(() => {
    if (book && chapter) {
      const record = {
        bookId: book.id,
        bookTitle: book.title,
        chapterId: chapter.id || currentIndex,
        chapterTitle: title,
        timestamp: Date.now()
      };
      try {
        localStorage.setItem('divine_path_last_read', JSON.stringify(record));
        const historyStr = localStorage.getItem('divine_path_reading_history');
        const history = historyStr ? JSON.parse(historyStr) : [];
        const filtered = history.filter(h => !(h.bookId === record.bookId && h.chapterId === record.chapterId));
        filtered.unshift(record);
        localStorage.setItem('divine_path_reading_history', JSON.stringify(filtered.slice(0, 10)));
      } catch (e) {
        console.warn('Could not save reading history', e);
      }
    }
  }, [book, chapter, currentIndex, title]);

  if (!book) {
    return (
      <div className="reader-not-found">
        <h2>Sacred Text not found!</h2>
        <Link to="/library" className="back-btn">Return to Library</Link>
      </div>
    );
  }

  if (!sections) {
    return (
      <div className="reader-not-found">
        <h2>No content available for this text yet.</h2>
        <Link to={`/library/${book.id}`} className="back-btn">Go Back</Link>
      </div>
    );
  }
  
  if (currentIndex === -1) {
    return (
      <div className="reader-not-found">
        <h2>Chapter not found!</h2>
        <Link to={`/library/${book.id}`} className="back-btn">Go Back</Link>
      </div>
    );
  }
  
  // Navigation helpers
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sections.length - 1;
  const prevChapterRoute = isFirst ? null : `/library/${book.id}/${sections[currentIndex - 1].id || currentIndex - 1}`;
  const nextChapterRoute = isLast ? null : `/library/${book.id}/${sections[currentIndex + 1].id || currentIndex + 1}`;

  // Font size handler
  const handleFontSizeChange = (size) => {
    setFontSize(size);
    localStorage.setItem('divine_reader_font_size', size);
  };

  // Sequential Audio Narration Handlers
  const speakNarrativeItem = (index) => {
    if (!('speechSynthesis' in window)) {
      alert("Sorry, your browser does not support text-to-speech!");
      return;
    }

    const items = chapter.scenes || chapter.sampleVerses || (chapter.content ? chapter.content.split('\n\n') : []);
    if (!items || index >= items.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setActiveItemIndex(-1);
      return;
    }

    setActiveItemIndex(index);

    // Smooth scroll into view
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    let textToRead = '';
    if (chapter.scenes) {
      textToRead = items[index].text;
    } else if (chapter.sampleVerses) {
      const v = items[index];
      textToRead = `Verse ${v.number}. ${v.transliteration || ''}. Translation: ${v.translation}`;
    } else {
      textToRead = items[index];
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'en-US';
    utterance.volume = 1;
    utterance.rate = 0.95;

    const voices = window.speechSynthesis.getVoices();
    const gentleVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha") || v.lang === 'en-US');
    if (gentleVoice) utterance.voice = gentleVoice;

    utterance.onerror = (e) => {
      console.error("Speech error", e);
      setIsPlaying(false);
      setActiveItemIndex(-1);
    };

    utterance.onend = () => {
      if (index + 1 < items.length) {
        setTimeout(() => {
          speakNarrativeItem(index + 1);
        }, 600);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setActiveItemIndex(-1);
      }
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleStartNarration = (fromIndex = 0) => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }
    speakNarrativeItem(fromIndex);
  };

  const handlePauseNarration = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStopNarration = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setActiveItemIndex(-1);
    }
  };

  const renderContent = () => {
    // 1. Text Content (Mythology shorts)
    if (chapter.content) {
      const paragraphs = chapter.content.split('\n\n');
      return (
        <div className="prose-content">
          {paragraphs.map((paragraph, index) => (
            <p 
              key={index}
              ref={el => itemRefs.current[index] = el}
              className={activeItemIndex === index ? 'active-narration-scene' : ''}
              onClick={() => handleStartNarration(index)}
              title="Click to listen from this paragraph"
            >
              {paragraph}
            </p>
          ))}
        </div>
      );
    }

    // 2. Scene-based Content (Ramayana, Mahabharata, Vedas, Puranas)
    if (chapter.scenes && chapter.scenes.length > 0) {
      return (
        <div className="scenes-container">
          {chapter.scenes.map((scene, idx) => (
            <div 
              key={idx} 
              ref={el => itemRefs.current[idx] = el}
              className={`scene-block ${activeItemIndex === idx ? 'active-narration-scene' : ''}`}
            >
              {scene.imageUrl && (
                <div className="scene-image-wrapper">
                  <img src={scene.imageUrl} alt={`Scene ${idx + 1}`} className="scene-image" loading="lazy" />
                </div>
              )}
              <div className="scene-text-card">
                <div className="scene-text-header">
                  <span className="scene-number-tag">Scene {idx + 1}</span>
                  <button 
                    className="scene-listen-btn"
                    onClick={() => handleStartNarration(idx)}
                    title="Narrate from this scene"
                  >
                    {activeItemIndex === idx && isPlaying ? '🔊 Narrating...' : '▶ Listen'}
                  </button>
                </div>
                <p className="scene-text">{scene.text}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // 3. Verses Content (Bhagavad Gita)
    if (chapter.sampleVerses && chapter.sampleVerses.length > 0) {
      return (
        <div className="verses-container">
          <p className="prose-content">{chapter.summary}</p>
          <h3 className="verses-header">Sacred Verses</h3>
          {chapter.sampleVerses.map((verse, idx) => (
            <div 
              key={verse.number || idx} 
              ref={el => itemRefs.current[idx] = el}
              className={`verse-card ${activeItemIndex === idx ? 'active-narration-scene' : ''}`}
            >
              <div className="verse-card-top">
                <div className="verse-number">Verse {verse.number}</div>
                <button 
                  className="scene-listen-btn"
                  onClick={() => handleStartNarration(idx)}
                  title="Listen to this verse"
                >
                  {activeItemIndex === idx && isPlaying ? '🔊 Chanting...' : '▶ Listen'}
                </button>
              </div>
              <div className="verse-sanskrit">{verse.sanskrit}</div>
              <div className="verse-transliteration">{verse.transliteration}</div>
              <div className="verse-translation">{verse.translation}</div>
            </div>
          ))}
        </div>
      );
    }

    // 4. Stories/Summaries Collection (Puranas)
    if (chapter.stories && chapter.stories.length > 0) {
      return (
        <div className="purana-stories-container">
          <p className="prose-content">{chapter.summary}</p>
          {chapter.stories.map((story, idx) => (
            <div key={idx} className="purana-story-block">
              <h3 className="purana-story-title">{story.title}</h3>
              {story.illustrationUrl && (
                <div className="scene-image-wrapper">
                  <img src={story.illustrationUrl} alt={story.title} className="scene-image" loading="lazy" />
                </div>
              )}
              <p className="scene-text">{story.summary}</p>
              {story.keyMessage && (
                <div className="spiritual-essence-box">
                  <strong>💡 Key Message: </strong> {story.keyMessage}
                </div>
              )}
            </div>
          ))}
          {/* Sacred Places specialized logic for Shiva Purana */}
          {chapter.sacredPlaces && (
            <div className="sacred-places-section">
              <h3 className="purana-story-title">🕉️ Sacred Places (Jyotirlingas)</h3>
              <div className="places-grid">
                {chapter.sacredPlaces.map((place, idx) => (
                  <div key={idx} className="place-card">
                    <div className="place-name">{place.name}</div>
                    <div className="place-location">📍 {place.location}</div>
                    <div className="place-significance">{place.significance}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Fallback
    return <p className="prose-content">{chapter.summary || chapter.description}</p>;
  };

  // Determine if it's a kid's story (e.g., from the short stories or panchatantra)
  const isKidsStory = chapter.category?.includes('Panchatantra');
  const generatedImageUrl = isKidsStory 
    ? `/images/kids/${chapter.id}.png`
    : null;

  const totalNarrativeItems = (chapter.scenes && chapter.scenes.length) || 
                              (chapter.sampleVerses && chapter.sampleVerses.length) || 
                              (chapter.content ? chapter.content.split('\n\n').length : 0);

  return (
    <div className={`universal-reader-page ${isZenMode ? 'zen-mode' : ''}`} data-font-size={fontSize}>
      {/* Floating Zen Mode Exit Button */}
      {isZenMode && (
        <button 
          className="exit-zen-btn"
          onClick={() => setIsZenMode(false)}
          title="Exit Zen Mode"
        >
          ✕ Exit Zen Mode
        </button>
      )}

      {/* Top Navigation & Customization Toolbar */}
      <div className="reader-toolbar glass-panel">
        <div className="reader-nav-top">
          <Link to={`/library/${book.id}`} className="reader-back-btn">
            &larr; Back to {book.title}
          </Link>
        </div>

        <div className="reader-controls-cluster">
          {/* Font Sizing */}
          <div className="font-size-toggles" title="Adjust text size">
            <button 
              className={`font-btn ${fontSize === 'small' ? 'active' : ''}`}
              onClick={() => handleFontSizeChange('small')}
            >
              A-
            </button>
            <button 
              className={`font-btn ${fontSize === 'normal' ? 'active' : ''}`}
              onClick={() => handleFontSizeChange('normal')}
            >
              A
            </button>
            <button 
              className={`font-btn ${fontSize === 'large' ? 'active' : ''}`}
              onClick={() => handleFontSizeChange('large')}
            >
              A+
            </button>
            <button 
              className={`font-btn ${fontSize === 'xlarge' ? 'active' : ''}`}
              onClick={() => handleFontSizeChange('xlarge')}
            >
              A++
            </button>
          </div>

          {/* Zen Mode Toggle */}
          <button 
            className={`zen-toggle-btn ${isZenMode ? 'active' : ''}`}
            onClick={() => setIsZenMode(!isZenMode)}
            title="Toggle Distraction-free Zen Mode"
          >
            🧘 {isZenMode ? 'Exit Zen' : 'Zen Mode'}
          </button>

          {/* Master Narration Controls */}
          <div className="narration-controls-pill">
            {(!isPlaying || isPaused) ? (
              <button 
                onClick={() => handleStartNarration(activeItemIndex >= 0 ? activeItemIndex : 0)} 
                className="narration-action-btn play"
                title="Narrate chapter sequentially"
              >
                ▶ {isPaused ? 'Resume' : 'Narrate'}
              </button>
            ) : (
              <button 
                onClick={handlePauseNarration} 
                className="narration-action-btn pause"
                title="Pause narration"
              >
                ⏸ Pause
              </button>
            )}
            
            {(isPlaying || isPaused) && (
              <button 
                onClick={handleStopNarration} 
                className="narration-action-btn stop"
                title="Stop narration"
              >
                ⏹ Stop
              </button>
            )}

            {activeItemIndex >= 0 && (
              <span className="narration-progress-tag">
                {activeItemIndex + 1}/{totalNarrativeItems}
              </span>
            )}
          </div>
        </div>
      </div>

      <GradientHeader 
        title={title} 
        subtitle={chapter.category || (chapter.verses ? `${chapter.verses} Verses` : book.title)}
      />

      <article className="reader-article">
        {/* Render Characters if they exist */}
        {chapter.characters && (
          <div className="reader-characters-banner">
            <span className="characters-label">Key Figures:</span>
            <div className="characters-list">
              {chapter.characters.map((char, index) => (
                <span key={index} className="character-tag">{char}</span>
              ))}
            </div>
          </div>
        )}

        {/* Free Kids Visuals & Audio Player */}
        {isKidsStory && (
          <div className="kids-story-header">
            {generatedImageUrl && (
              <div className="kids-illustration-wrapper">
                <img 
                  src={generatedImageUrl} 
                  onError={(e) => { e.target.onerror = null; e.target.src = '/images/kids/default.png'; }}
                  alt={`${title} illustration`} 
                  className="kids-illustration" 
                />
                <div className="illustration-badge">✨ Magic Canvas</div>
              </div>
            )}
            
            <div className="kids-audio-player">
              <h3 className="audio-title">🎧 Listen to the Story</h3>
              <div className="audio-controls">
                {(!isPlaying || isPaused) && (
                  <button onClick={() => handleStartNarration(0)} className="btn-play">
                    ▶ Play
                  </button>
                )}
                {isPlaying && (
                  <button onClick={handlePauseNarration} className="btn-pause">
                    ⏸ Pause
                  </button>
                )}
                {(isPlaying || isPaused) && (
                  <button onClick={handleStopNarration} className="btn-stop">
                    ⏹ Stop
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Legacy Pre-Recorded Audio (If manually added) */}
        {chapter.audioUrl && (
          <div className="reader-audio-section">
            <AudioPlayer audioUrl={chapter.audioUrl} title={title} />
          </div>
        )}

        {/* Dynamic Content Renderer */}
        <div className="reader-dynamic-content">
          {renderContent()}
        </div>

        {/* Special highlight for Morals/Key Teachings */}
        {chapter.moral && (
          <div className="spiritual-essence-box">
            <h3 className="essence-title">✨ Spiritual Essence</h3>
            <p className="essence-text">{chapter.moral}</p>
          </div>
        )}

        {chapter.keyTeachings && (
          <div className="spiritual-essence-box">
            <h3 className="essence-title">✨ Key Teachings</h3>
            <ul className="teachings-list-reader">
               {chapter.keyTeachings.map((teaching, idx) => (
                 <li key={idx} className="essence-text">{teaching}</li>
               ))}
            </ul>
          </div>
        )}

        {/* --- NEW KID-FRIENDLY SECTIONS --- */}
        {chapter.culturalTreasure && (
          <div className="kids-learning-box treasure-box">
            <h3 className="learning-title">🏛️ Cultural Treasure</h3>
            <p className="learning-text">{chapter.culturalTreasure}</p>
          </div>
        )}

        {chapter.thinkAboutIt && (
          <div className="kids-learning-box question-box">
            <h3 className="learning-title">🤔 Think About It!</h3>
            <p className="learning-text">{chapter.thinkAboutIt}</p>
          </div>
        )}

        {chapter.vocabulary && chapter.vocabulary.length > 0 && (
          <div className="kids-learning-box vocab-box">
            <h3 className="learning-title">📚 Word of the Day</h3>
            <div className="vocab-list">
              {chapter.vocabulary.map((v, idx) => (
                <div key={idx} className="vocab-card">
                  <span className="vocab-word">{v.word}:</span>
                  <span className="vocab-def">{v.definition}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="reader-pagination">
          {prevChapterRoute ? (
             <button onClick={() => navigate(prevChapterRoute)} className="pagination-btn">
               &larr; Previous
             </button>
          ) : <div></div>}
          
          {nextChapterRoute ? (
             <button onClick={() => navigate(nextChapterRoute)} className="pagination-btn next">
               Next &rarr;
             </button>
          ) : (
            <Link to={`/library/${book.id}`} className="pagination-btn finish">
               Finish Book
             </Link>
          )}
        </div>
      </article>
    </div>
  );
};

export default UniversalReaderPage;
