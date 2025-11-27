import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { godsData, trimurtiData } from '../../data/godsData';
import './GodDetailPage.css';

const GodDetailPage = () => {
  const { godId } = useParams();

  // Check if it's a Trinity god first
  let god = trimurtiData.find((g) => g.id === godId);
  const isTrinity = !!god;

  // If not Trinity, check regular gods
  if (!god) {
    god = godsData.find((g) => g.id === parseInt(godId));
  }

  if (!god) {
    return (
      <div className="god-not-found">
        <h2>God not found!</h2>
        <Link to="/gods">Back to the Gods Gallery</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <Link to="/gods" className="back-link-top">
        ← Back to Gallery
      </Link>

      {/* Trinity Gods */}
      {isTrinity ? (
        <>
          {/* Main God Hero Section */}
          <div className="detail-hero">
            <div className="detail-image-container">
              <img src={god.imageUrl} alt={god.name} className="detail-image" />
            </div>
            <div className="detail-content">
              <h1 className="detail-title">{god.name}</h1>
              <p className="detail-subtitle">{god.title}</p>
              {god.role && (
                <div className="detail-role-badge">{god.role}</div>
              )}
              <p className="detail-long-description">{god.longDescription}</p>
              
              {god.symbols && (
                <div className="detail-symbols">
                  {god.symbols.map((symbol, index) => (
                    <span key={index} className="symbol-tag">{symbol}</span>
                  ))}
                </div>
              )}

              {god.mantra && (
                <div className="detail-mantra-container">
                  <h3 className="mantra-title">Mantra</h3>
                  <p className="mantra-text">"{god.mantra}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Consort, Family, and Avatars Section */}
          {god.consort && (
            <div className="divine-family-container">
              {/* Main Consort Card */}
              <div className="main-consort-card">
                <div className="consort-image-container">
                  <img src={god.consort.imageUrl} alt={god.consort.name} className="consort-image" />
                </div>
                <div className="consort-content">
                  <h3 className="consort-name">{god.consort.name}</h3>
                  <div className="consort-title">Consort</div>
                  <p className="consort-description">{god.consort.longDescription}</p>
                  {god.consort.symbols && (
                    <div className="consort-symbols">
                      <strong>Sacred Symbols:</strong>
                      <div className="symbols-list-small">
                        {god.consort.symbols.map((symbol, index) => (
                          <span key={index} className="symbol-tag-small">{symbol}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {god.consort.mantra && (
                    <div className="consort-mantra">
                      <strong>Mantra:</strong> "{god.consort.mantra}"
                    </div>
                  )}
                </div>
              </div>

              {/* Family and Avatars Grid */}
              <div className="related-deities-grid">
                {/* Family Members */}
                {god.family && god.family.map((member, index) => (
                  <div key={`family-${index}`} className="deity-card">
                    <div className="deity-image-wrapper">
                      {member.imageUrl && (
                        <img src={member.imageUrl} alt={member.name} className="deity-image" />
                      )}
                    </div>
                    <div className="deity-info">
                      <h4 className="deity-name">{member.name}</h4>
                      <span className="deity-badge family-badge">{member.relation}</span>
                      <p className="deity-description">{member.description}</p>
                    </div>
                  </div>
                ))}

                {/* Avatars */}
                {god.avatars && god.avatars.map((avatar, index) => (
                  <div key={`avatar-${index}`} className="deity-card">
                    <div className="deity-info">
                      <h4 className="deity-name">{avatar.name}</h4>
                      <span className="deity-badge avatar-badge">Avatar</span>
                      <p className="deity-description">{avatar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        /* Non-Trinity gods */
        <div className="detail-container">
          <div className="detail-image-container">
            <img src={god.imageUrl} alt={god.name} className="detail-image" />
          </div>
          <div className="detail-content">
            <h1 className="detail-title">{god.name}</h1>
            <p className="detail-long-description">{god.longDescription}</p>
            
            {god.symbols && (
              <div className="detail-symbols">
                {god.symbols.map((symbol, index) => (
                  <span key={index} className="symbol-tag">{symbol}</span>
                ))}
              </div>
            )}

            <div className="detail-mantra-container">
              <h3 className="mantra-title">Mantra</h3>
              <p className="mantra-text">"{god.mantra}"</p>
            </div>

            <Link to="/gods-gallery" className="back-link">
              ← Back to Gallery
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GodDetailPage;