import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { literatureData } from '../../data/literature';
import AudioPlayer from '../../components/AudioPlayer/AudioPlayer';
import './PuranaPage.css';

const PuranaPage = () => {
  const { storyId } = useParams();
  const purana = literatureData.find((s) => s.id === parseInt(storyId));
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);

  if (!purana || purana.type !== 'purana') {
    return (
      <div className="story-not-found">
        <h2>Purana not found!</h2>
        <Link to="/library">Back to the Library</Link>
      </div>
    );
  }

  const books = purana.books || purana.samhitas || [];
  const booksLabel = purana.books ? 'books' : 'samhitas';

  if (selectedStory && selectedBook) {
    return (
      <div className="purana-page">
        <div className="purana-container">
          <button 
            className="back-btn"
            onClick={() => setSelectedStory(null)}
          >
            ← Back to {selectedBook.title}
          </button>

          <div className="story-detail">
            <h1 className="story-title">{selectedStory.title}</h1>
            
            {selectedStory.illustrationUrl && (
              <div className="story-illustration">
                <img src={selectedStory.illustrationUrl} alt={selectedStory.title} />
              </div>
            )}

            {!selectedStory.illustrationUrl && selectedStory.hasIllustration && (
              <div className="illustration-placeholder">
                <p>🎨 Illustration coming soon</p>
              </div>
            )}

            <div className="story-summary-section">
              <h2>📖 Story</h2>
              <p>{selectedStory.summary}</p>
            </div>

            {selectedStory.keyMessage && (
              <div className="key-message-section">
                <h2>💡 Key Message</h2>
                <p className="key-message">{selectedStory.keyMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (selectedBook) {
    return (
      <div className="purana-page">
        <div className="purana-container">
          <button 
            className="back-btn"
            onClick={() => setSelectedBook(null)}
          >
            ← Back to All {booksLabel.charAt(0).toUpperCase() + booksLabel.slice(1)}
          </button>

          <div className="book-detail">
            <div className="book-header">
              <span className="book-number">{booksLabel === 'books' ? 'Book' : 'Samhita'} {selectedBook.number}</span>
              <h1 className="book-title">{selectedBook.title}</h1>
              <p className="book-chapters">{selectedBook.chapters} Chapters</p>
            </div>

            {selectedBook.illustration && (
              <div className="book-illustration">
                <img src={selectedBook.illustration} alt={selectedBook.title} />
              </div>
            )}

            <div className="book-summary-section">
              <h2>📖 Summary</h2>
              <p>{selectedBook.summary}</p>
            </div>

            {selectedBook.keyTopics && (
              <div className="key-topics-section">
                <h2>✨ Key Topics</h2>
                <ul className="topics-list">
                  {selectedBook.keyTopics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}

            {purana.hasAudio && (
              <div className="audio-section">
                <h2>🎧 Audio Narration</h2>
                <AudioPlayer 
                  audioUrl={selectedBook.audioUrl} 
                  title={selectedBook.title}
                />
              </div>
            )}

            {selectedBook.stories && selectedBook.stories.length > 0 && (
              <div className="stories-section">
                <h2>📚 Featured Stories</h2>
                <div className="stories-grid">
                  {selectedBook.stories.map((story, index) => (
                    <div 
                      key={index} 
                      className="story-card"
                      onClick={() => setSelectedStory(story)}
                    >
                      <h3 className="story-card-title">{story.title}</h3>
                      <p className="story-card-summary">{story.summary}</p>
                      {story.hasIllustration && (
                        <span className="illustration-badge">🎨 Illustrated</span>
                      )}
                      <button className="read-story-btn">Read Story</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedBook.sacredPlaces && (
              <div className="sacred-places-section">
                <h2>🕉️ The Twelve Jyotirlingas</h2>
                <div className="places-grid">
                  {selectedBook.sacredPlaces.map((place, index) => (
                    <div key={index} className="place-card">
                      <div className="place-name">{place.name}</div>
                      <div className="place-location">📍 {place.location}</div>
                      <div className="place-significance">{place.significance}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="purana-page">
      <div className="purana-container">
        <div className="purana-hero">
          <h1 className="purana-title">{purana.title}</h1>
          <p className="purana-summary">{purana.summary}</p>
        </div>

        {purana.imageUrl && (
          <div className="purana-image-container">
            <img src={purana.imageUrl} alt={purana.title} className="purana-image" />
          </div>
        )}

        <div className="purana-intro">
          <h2>📚 Introduction</h2>
          <p>{purana.introduction}</p>
        </div>

        <div className="features-badges">
          {purana.hasAudio && <span className="feature-badge">🎧 Audio Narration Available</span>}
          {purana.hasIllustrations && <span className="feature-badge">🎨 Illustrated Stories</span>}
          <span className="feature-badge">📖 {books.length} {booksLabel.charAt(0).toUpperCase() + booksLabel.slice(1)}</span>
        </div>

        <div className="books-section">
          <h2>📖 {booksLabel.charAt(0).toUpperCase() + booksLabel.slice(1)} ({books.length})</h2>
          <div className="books-grid">
            {books.map((book) => (
              <div 
                key={book.number} 
                className="book-card"
                onClick={() => setSelectedBook(book)}
              >
                <div className="book-card-header">
                  <span className="book-num">{booksLabel === 'books' ? 'Book' : 'Samhita'} {book.number}</span>
                </div>
                <h3 className="book-card-title">{book.title}</h3>
                <p className="book-card-chapters">{book.chapters} chapters</p>
                <p className="book-card-summary">{book.summary}</p>
                {book.stories && book.stories.length > 0 && (
                  <span className="stories-badge">📚 {book.stories.length} Featured Stories</span>
                )}
                <button className="explore-book-btn">Explore</button>
              </div>
            ))}
          </div>
        </div>

        <Link to="/library" className="back-link">
          ← Back to Library
        </Link>
      </div>
    </div>
  );
};

export default PuranaPage;
