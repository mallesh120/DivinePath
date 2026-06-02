import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { literatureData } from '../../data/literature';
import GradientHeader from '../../components/ui/GradientHeader/GradientHeader';
import SpiritualCard from '../../components/ui/SpiritualCard/SpiritualCard';
import './BookLandingPage.css';

const BookLandingPage = () => {
  const { bookId } = useParams();
  
  // Find the requested book, handling both int and string IDs
  const book = literatureData.find((s) => s.id === parseInt(bookId) || s.id === bookId);

  if (!book) {
    return (
      <div className="book-not-found">
        <h2>Sacred Text not found!</h2>
        <Link to="/adults/library" className="back-to-library-btn">Return to Library</Link>
      </div>
    );
  }

  // Universally resolve the book's sections/chapters array
  const sections =
    book.chapters ||
    book.kandas ||
    book.parvas ||
    book.mandalas ||
    book.kaandas ||
    book.samhitas ||
    book.books;

  // Universally determine the section terminology
  let sectionLabel = "Chapters";
  if (book.kandas) sectionLabel = "Kandas";
  else if (book.parvas) sectionLabel = "Parvas";
  else if (book.mandalas) sectionLabel = "Mandalas";
  else if (book.kaandas) sectionLabel = "Kaandas";
  else if (book.samhitas) sectionLabel = "Samhitas";
  else if (book.books) sectionLabel = "Books";

  return (
    <div className="book-landing-page">
      <GradientHeader 
        title={book.title} 
        subtitle={book.author ? `Composed by ${book.author}` : "Ancient Wisdom"}
      />

      <div className="book-landing-hero">
        <div className="book-hero-image-container">
          <img src={book.coverImage || book.imageUrl} alt={book.title} className="book-hero-image" />
        </div>
        <div className="book-hero-details">
          <h2>About this {book.type || 'Text'}</h2>
          <p className="book-intro-text">{book.introduction || book.description || book.summary}</p>
          
          <div className="book-features">
            {book.hasAudio && <span className="feature-pill">🎧 Audio Available</span>}
            {book.hasIllustrations && <span className="feature-pill">🎨 Illustrated</span>}
            <span className="feature-pill">📖 {sections ? sections.length : 0} {sectionLabel}</span>
          </div>
        </div>
      </div>

      <div className="book-table-of-contents">
        <h2>{sectionLabel}</h2>
        
        {!sections || sections.length === 0 ? (
          <p className="coming-soon-text">Content is currently being transcribed. Please check back later.</p>
        ) : (
          <div className="toc-grid">
            {sections.map((section, index) => {
              // The routing identifier: either its unique string ID or its array index
              const routeId = section.id || index;
              
              // Handle title, since some sections like 'Gita chapters' might just say '1' -> 'Chapter 1'
              const title = section.title || `${sectionLabel.slice(0, -1)} ${section.number || index + 1}`;
              
              return (
                <SpiritualCard key={routeId}>
                  <Link to={`/library/${book.id}/${routeId}`} className="toc-card-link">
                    <div className="toc-card-content">
                      <h3 className="toc-card-title">{title}</h3>
                      
                      {/* Subtitle / Category / Verses */}
                      {(section.category || section.verses) && (
                        <div className="toc-card-subtitle">
                          {section.category || `${section.verses} Verses`}
                        </div>
                      )}

                      {/* Summary / Description / Characters */}
                      <p className="toc-card-summary">
                        {section.summary || section.description || (section.characters ? `Characters: ${section.characters.slice(0, 3).join(', ')}...` : 'Explore the sacred verses...')}
                      </p>
                      
                      <div className="toc-card-action">Read &rarr;</div>
                    </div>
                  </Link>
                </SpiritualCard>
              );
            })}
          </div>
        )}
      </div>

      <div className="back-link-container">
        <Link to="/adults/library" className="back-to-library-btn">
          &larr; Back to Literature Library
        </Link>
      </div>
    </div>
  );
};

export default BookLandingPage;
