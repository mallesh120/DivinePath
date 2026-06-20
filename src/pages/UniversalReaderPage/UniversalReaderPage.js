import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { literatureData } from '../../data/literature';
import GradientHeader from '../../components/ui/GradientHeader/GradientHeader';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import './UniversalReaderPage.css';

const UniversalReaderPage = () => {
  const { bookId, chapterId } = useParams();
  const navigate = useNavigate();

  // Speech Synthesis State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef(null);

  // Clean up audio on unmount or navigation
  useEffect(() => {
    window.scrollTo(0, 0); 
    
    // Stop speaking if navigating away
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [bookId, chapterId]);
  
  const book = literatureData.find((s) => s.id === parseInt(bookId) || s.id === bookId);

  if (!book) {
    return (
      <div className="reader-not-found">
        <h2>Sacred Text not found!</h2>
        <Link to="/adults/library" className="back-btn">Return to Library</Link>
      </div>
    );
  }

  // Find sections array
  const sections =
    book.chapters ||
    book.kandas ||
    book.parvas ||
    book.mandalas ||
    book.kaandas ||
    book.samhitas ||
    book.books;

  if (!sections) {
    return (
      <div className="reader-not-found">
        <h2>No content available for this text yet.</h2>
        <Link to={`/adults/library/${book.id}`} className="back-btn">Go Back</Link>
      </div>
    );
  }

  // Chapter ID could be an array index (stringified) or a specific string ID
  const currentIndex = sections.findIndex(
    (s, idx) => s.id === chapterId || idx.toString() === chapterId
  );
  
  if (currentIndex === -1) {
    return (
      <div className="reader-not-found">
        <h2>Chapter not found!</h2>
        <Link to={`/adults/library/${book.id}`} className="back-btn">Go Back</Link>
      </div>
    );
  }

  const chapter = sections[currentIndex];
  
  // Navigation helpers
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sections.length - 1;
  const prevChapterRoute = isFirst ? null : `/adults/library/${book.id}/${sections[currentIndex - 1].id || currentIndex - 1}`;
  const nextChapterRoute = isLast ? null : `/adults/library/${book.id}/${sections[currentIndex + 1].id || currentIndex + 1}`;

  const title = chapter.title || `Chapter ${chapter.number || currentIndex + 1}`;

  // Audio Playback Handlers
  const handlePlayAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert("Sorry, your browser doesn't support text-to-speech!");
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    // Cancel any existing speech
    window.speechSynthesis.cancel();

    // Plain text content (remove markdown or special symbols if needed)
    let textToRead = chapter.content || chapter.summary || title;
    
    // Add moral and teachings if present
    if (chapter.moral) textToRead += ". The moral of the story is: " + chapter.moral;
    if (chapter.culturalTreasure) textToRead += ". Cultural treasure: " + chapter.culturalTreasure;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'en-US';
    utterance.volume = 1;

    // Try to find a nice gentle voice, ideally female for bedtime stories
    const voices = window.speechSynthesis.getVoices();
    const gentleVoice = voices.find(v => v.name.includes("Google US English") || v.name.includes("Samantha"));
    if (gentleVoice) {
      utterance.voice = gentleVoice;
    }

    utterance.onerror = (e) => {
      console.error("Speech error", e);
      setIsPlaying(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const handlePauseAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const renderContent = () => {
    // 1. Text Content (Mythology shorts)
    if (chapter.content) {
      return (
        <div className="prose-content">
          {chapter.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      );
    }

    // 2. Scene-based Content (Ramayana, Mahabharata)
    if (chapter.scenes && chapter.scenes.length > 0) {
      return (
        <div className="scenes-container">
          {chapter.scenes.map((scene, idx) => (
            <div key={idx} className="scene-block">
              {scene.imageUrl && (
                <div className="scene-image-wrapper">
                  <img src={scene.imageUrl} alt={`Scene ${idx + 1}`} className="scene-image" />
                </div>
              )}
              <p className="scene-text">{scene.text}</p>
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
          {chapter.sampleVerses.map(verse => (
            <div key={verse.number} className="verse-card">
              <div className="verse-number">Verse {verse.number}</div>
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
                  <img src={story.illustrationUrl} alt={story.title} className="scene-image" />
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

  return (
    <div className="universal-reader-page">
      <div className="reader-nav-top">
        <Link to={`/adults/library/${book.id}`} className="reader-back-btn">
          &larr; Back to {book.title}
        </Link>
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
                  <button onClick={handlePlayAudio} className="btn-play">
                    ▶ Play
                  </button>
                )}
                {isPlaying && (
                  <button onClick={handlePauseAudio} className="btn-pause">
                    ⏸ Pause
                  </button>
                )}
                {(isPlaying || isPaused) && (
                  <button onClick={handleStopAudio} className="btn-stop">
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
            <Link to={`/adults/library/${book.id}`} className="pagination-btn finish">
               Finish Book
             </Link>
          )}
        </div>
      </article>
    </div>
  );
};

export default UniversalReaderPage;
