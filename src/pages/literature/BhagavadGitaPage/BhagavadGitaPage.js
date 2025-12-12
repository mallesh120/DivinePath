import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { literatureData } from '../../../data/literature';
import AudioPlayer from '../../../components/AudioPlayer/AudioPlayer';
import './BhagavadGitaPage.css';

const BhagavadGitaPage = () => {
  const { storyId } = useParams();
  const gita = literatureData.find((s) => s.id === parseInt(storyId));
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [expandedChapters, setExpandedChapters] = useState({});

  if (!gita || gita.type !== 'scripture') {
    return (
      <div className="story-not-found">
        <h2>Scripture not found!</h2>
        <Link to="/library">Back to the Library</Link>
      </div>
    );
  }

  const toggleChapterExpansion = (chapterNumber) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterNumber]: !prev[chapterNumber]
    }));
  };

  const selectChapter = (chapter) => {
    setSelectedChapter(chapter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedChapter) {
    return (
      <div className="gita-page">
        <div className="gita-container">
          <button 
            className="back-to-chapters-btn"
            onClick={() => setSelectedChapter(null)}
          >
            ← Back to All Chapters
          </button>

          <div className="chapter-detail">
            <div className="chapter-header">
              <span className="chapter-number">Chapter {selectedChapter.number}</span>
              <h1 className="chapter-title">{selectedChapter.title}</h1>
              <p className="chapter-verses">{selectedChapter.verses} Verses</p>
            </div>

            {selectedChapter.illustration && (
              <div className="chapter-illustration">
                <img src={selectedChapter.illustration} alt={selectedChapter.title} />
              </div>
            )}

            <div className="chapter-summary-section">
              <h2>📖 Summary</h2>
              <p>{selectedChapter.summary}</p>
            </div>

            {selectedChapter.keyTeachings && (
              <div className="key-teachings-section">
                <h2>✨ Key Teachings</h2>
                <ul className="teachings-list">
                  {selectedChapter.keyTeachings.map((teaching, index) => (
                    <li key={index}>{teaching}</li>
                  ))}
                </ul>
              </div>
            )}

            {gita.hasAudio && (
              <div className="audio-section">
                <h2>🎧 Audio Narration</h2>
                <AudioPlayer 
                  audioUrl={selectedChapter.audioUrl} 
                  title={`Chapter ${selectedChapter.number}: ${selectedChapter.title}`}
                />
              </div>
            )}

            {selectedChapter.sampleVerses && selectedChapter.sampleVerses.length > 0 && (
              <div className="verses-section">
                <h2>📜 Sample Verses</h2>
                {selectedChapter.sampleVerses.map((verse) => (
                  <div key={verse.number} className="verse-card">
                    <div className="verse-number">Verse {verse.number}</div>
                    <div className="verse-sanskrit">{verse.sanskrit}</div>
                    <div className="verse-transliteration">{verse.transliteration}</div>
                    <div className="verse-translation">{verse.translation}</div>
                  </div>
                ))}
              </div>
            )}

            {selectedChapter.isIconic && (
              <div className="iconic-badge">
                ⭐ Most Famous Chapter - Vishvarupa Darshana
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gita-page">
      <div className="gita-container">
        <div className="gita-hero">
          <h1 className="gita-title">{gita.title}</h1>
          <p className="gita-summary">{gita.summary}</p>
        </div>

        {gita.imageUrl && (
          <div className="gita-image-container">
            <img src={gita.imageUrl} alt={gita.title} className="gita-image" />
          </div>
        )}

        <div className="gita-intro">
          <h2>📚 Introduction</h2>
          <p>{gita.introduction}</p>
        </div>

        <div className="features-badges">
          {gita.hasAudio && <span className="feature-badge">🎧 Audio Narration Available</span>}
          {gita.hasIllustrations && <span className="feature-badge">🎨 Illustrated</span>}
          <span className="feature-badge">📖 {gita.chapters.length} Chapters</span>
        </div>

        <div className="chapters-section">
          <h2>📖 Chapters ({gita.chapters.length})</h2>
          <div className="chapters-grid">
            {gita.chapters.map((chapter) => (
              <div 
                key={chapter.number} 
                className={`chapter-card ${expandedChapters[chapter.number] ? 'expanded' : ''}`}
              >
                <div 
                  className="chapter-card-header"
                  onClick={() => toggleChapterExpansion(chapter.number)}
                >
                  <span className="chapter-num">Chapter {chapter.number}</span>
                  {chapter.isIconic && <span className="iconic-star">⭐</span>}
                  {chapter.isConclusion && <span className="conclusion-badge">🏁</span>}
                </div>
                <h3 className="chapter-card-title">{chapter.title}</h3>
                <p className="chapter-card-verses">{chapter.verses} verses</p>
                
                {expandedChapters[chapter.number] && (
                  <div className="chapter-card-expanded">
                    <p className="chapter-card-summary">{chapter.summary}</p>
                    {chapter.keyTeachings && (
                      <div className="chapter-key-teachings">
                        <strong>Key Teachings:</strong>
                        <ul>
                          {chapter.keyTeachings.slice(0, 3).map((teaching, idx) => (
                            <li key={idx}>{teaching}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button 
                      className="read-chapter-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        selectChapter(chapter);
                      }}
                    >
                      Read Full Chapter
                    </button>
                  </div>
                )}
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

export default BhagavadGitaPage;
