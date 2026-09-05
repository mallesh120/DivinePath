import React, { useState } from 'react';
import './ShlokaCardModal.css';

const THEMES = [
  { id: 'saffron', name: 'Saffron Glow', gradient: 'linear-gradient(135deg, #bf5700, #ff8c00)' },
  { id: 'gold', name: 'Temple Gold', gradient: 'linear-gradient(135deg, #785208, #d4af37)' },
  { id: 'indigo', name: 'Cosmic Indigo', gradient: 'linear-gradient(135deg, #161b33, #432371)' },
  { id: 'forest', name: 'Sacred Forest', gradient: 'linear-gradient(135deg, #0d3b32, #1f6f57)' }
];

const ShlokaCardModal = ({ isOpen, onClose, shloka }) => {
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !shloka) return null;

  const handleCopyText = async () => {
    const textToCopy = `🕉️ ${shloka.title || 'Sacred Shloka'}\n\n"${shloka.sanskrit || ''}"\n\n${shloka.transliteration ? `(${shloka.transliteration})\n\n` : ''}${shloka.english || shloka.meaning || ''}\n\n— Shared from DivinePath (divinepath.app)`;
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleNativeShare = async () => {
    const textToShare = `🕉️ ${shloka.title}\n\n"${shloka.sanskrit}"\n\n${shloka.english || shloka.meaning || ''}\n\n— DivinePath`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: shloka.title || 'Sacred Shloka',
          text: textToShare,
          url: window.location.origin
        });
      } catch (e) {
        // User cancelled share
      }
    } else {
      handleCopyText();
    }
  };

  return (
    <div className="shloka-modal-backdrop" onClick={onClose}>
      <div className="shloka-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="shloka-modal-header">
          <div className="modal-title-wrap">
            <span className="modal-sacred-icon">🪔</span>
            <h3>Sacred Quote Card</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">×</button>
        </div>

        {/* Theme Picker */}
        <div className="shloka-theme-picker">
          <span className="theme-picker-label">Card Theme:</span>
          <div className="theme-swatches">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                className={`theme-swatch-btn ${activeTheme.id === theme.id ? 'active' : ''}`}
                style={{ background: theme.gradient }}
                onClick={() => setActiveTheme(theme)}
                title={theme.name}
              >
                {activeTheme.id === theme.id && <span className="swatch-check">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Printable / Shareable Card Canvas */}
        <div 
          className="shloka-card-canvas" 
          id="shloka-card-element"
          style={{ background: activeTheme.gradient }}
        >
          <div className="card-ornament-border">
            <div className="card-top-icon">🕉️</div>
            
            <h4 className="card-shloka-title">{shloka.title || 'Sacred Shloka'}</h4>
            
            <p className="card-shloka-sanskrit">{shloka.sanskrit}</p>
            
            {shloka.transliteration && (
              <p className="card-shloka-translit">{shloka.transliteration}</p>
            )}

            <div className="card-divider-flourish">❖ ❖ ❖</div>

            <p className="card-shloka-english">
              {shloka.english || shloka.meaning || shloka.description}
            </p>

            <div className="card-footer">
              <span className="card-source">{shloka.source || 'Sanatana Dharma'}</span>
              <span className="card-watermark">DivinePath</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="shloka-card-actions">
          <button className="action-btn copy-btn" onClick={handleCopyText}>
            {copied ? '✓ Copied Text!' : '📋 Copy Shloka Text'}
          </button>
          
          <button className="action-btn share-btn" onClick={handleNativeShare}>
            ✨ Share Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShlokaCardModal;
