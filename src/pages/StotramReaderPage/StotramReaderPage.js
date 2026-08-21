import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import GradientHeader from '../../components/ui/GradientHeader/GradientHeader';
import '../UniversalReaderPage/UniversalReaderPage.css'; // Reuse Universal Reader styles

const StotramReaderPage = () => {
  const { stotramTitle } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categorySlug = searchParams.get('category');
  
  const [stotram, setStotram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(localStorage.getItem('stotramLanguage') || 'english');

  const languages = [
    { id: 'english', label: 'English' },
    { id: 'sanskrit', label: 'Sanskrit / Devanagari' },
    { id: 'telugu', label: 'Telugu' },
    { id: 'tamil', label: 'Tamil' },
    { id: 'kannada', label: 'Kannada' },
    { id: 'malayalam', label: 'Malayalam' },
    { id: 'gujarati', label: 'Gujarati' },
    { id: 'oriya', label: 'Odia' },
    { id: 'bengali', label: 'Bengali' },
    { id: 'hindi', label: 'Hindi' }
  ];

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    localStorage.setItem('stotramLanguage', newLang);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchStotram = async () => {
      setLoading(true);
      try {
        const decodedTitle = decodeURIComponent(stotramTitle);
        
        // Try fetching selected language first
        let response = await fetch(`/data/stotrams/${language}.json`);
        let data = [];
        if (response.ok) {
          try {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
              data = await response.json();
            }
          } catch (e) {
            console.warn(`Failed to parse ${language}.json`);
          }
        }
        
        let found = data.find(item => item.title === decodedTitle);
        
        // Fallback to English if not found (or if JSON parse failed)
        if (!found && language !== 'english') {
          console.warn(`Stotram not found in ${language}, falling back to English`);
          response = await fetch('/data/stotrams/english.json');
          if (response.ok) {
            try {
              data = await response.json();
              found = data.find(item => item.title === decodedTitle);
            } catch (e) {
              console.error('Failed to parse english.json');
            }
          }
        }
        
        setStotram(found);
      } catch (error) {
        console.error('Error fetching stotram:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStotram();
  }, [stotramTitle, language]);

  if (loading) {
    return (
      <div className="universal-reader-page">
        <div className="reader-loading" style={{ textAlign: 'center', padding: '100px 0', color: 'var(--accent-gold)' }}>
          <div className="spinner" style={{ margin: '0 auto 20px' }}></div>
          <p>Loading Sacred Text...</p>
        </div>
      </div>
    );
  }

  if (!stotram) {
    return (
      <div className="universal-reader-page">
        <div className="reader-not-found">
          <h2>Stotram not found!</h2>
          <Link to="/stotrams" className="back-btn">Return to Library</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="universal-reader-page">
      <div className="reader-nav-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link 
          to={categorySlug ? `/stotrams/${categorySlug}` : '/stotrams'} 
          className="reader-back-btn"
        >
          &larr; Back
        </Link>
        <div className="language-selector" style={{ position: 'relative' }}>
          <select 
            value={language} 
            onChange={handleLanguageChange}
            style={{
              appearance: 'none',
              padding: '8px 30px 8px 15px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid var(--accent-gold)',
              color: 'var(--accent-gold)',
              fontSize: '0.9rem',
              cursor: 'pointer',
              outline: 'none',
              backdropFilter: 'blur(5px)',
              fontWeight: '500'
            }}
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id} style={{ color: '#333' }}>
                {lang.label}
              </option>
            ))}
          </select>
          <span style={{ 
            position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', 
            color: 'var(--accent-gold)', pointerEvents: 'none', fontSize: '0.8rem' 
          }}>
            ▼
          </span>
        </div>
      </div>

      <GradientHeader 
        title={stotram.title} 
        subtitle={stotram.category}
      />

      <article className="reader-article" style={{ fontFamily: 'var(--font-telugu), sans-serif' }}>
        <div className="reader-dynamic-content" style={{ textAlign: 'center' }}>
          <div className="prose-content stotram-telugu-text">
            {stotram.verses && stotram.verses.map((verse, index) => (
              <p 
                key={index} 
                style={{ 
                  fontSize: '1.4rem', 
                  lineHeight: '2', 
                  marginBottom: '2rem',
                  color: 'var(--text-primary)'
                }}
              >
                {verse.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>
        </div>

        <div className="reader-pagination">
          <div />
          <Link 
            to={categorySlug ? `/stotrams/${categorySlug}` : '/stotrams'} 
            className="pagination-btn finish"
          >
             Finish Reading
          </Link>
        </div>
      </article>
    </div>
  );
};

export default StotramReaderPage;
