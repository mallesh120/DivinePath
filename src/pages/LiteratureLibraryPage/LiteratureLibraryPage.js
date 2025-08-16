import React from 'react';
import { literatureData } from '../../data/literature'; // 1. Import literature data
import LiteratureCard from '../../components/LitratureCard/LiteratureCard'; // 2. Import the new card
import './LiteratureLibraryPage.css'; // This file already exists
import '../../pages/GodsGalleryPage/GodsGalleryPage'; // 3. We can reuse some styles!

const LiteratureLibraryPage = () => {
  return (
    // We reuse the 'gallery-page' class for consistent background and padding
    <div className="gallery-page">
      <h1 className="gallery-title">Literature Library</h1>
      {/* We reuse the 'gallery-grid' for the responsive card layout */}
      <div className="gallery-grid">
        {literatureData.map((story) => (
          <LiteratureCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default LiteratureLibraryPage;