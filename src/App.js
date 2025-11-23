import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';


// Import Pages and Components
import HomePage from './pages/HomePage/HomePage';
import GodsGalleryPage from './pages/GodsGalleryPage/GodsGalleryPage';
import LiteratureLibraryPage from './pages/LiteratureLibraryPage/LiteratureLibraryPage';
import GodDetailPage from './pages/GodDetailPage/GodDetailPage';
import LiteratureDetailPage from './pages/LiteratureDetailPage/LiteratureDetailPage'; // 1. Import the new page
import PanchangamPage from './pages/PanchangamPage/PanchangamPage';
import Navbar from './components/Navbar/Navbar';
import TopBar from './components/TopBar/TopBar';
import './App.css';
import StoryPlayerPage from './pages/StoryPlayerPage/StoryPlayerPage'; // Import the new page
import RamayanaTOCPage from './pages/RamayanaPage/RamayanaTOCPage';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === '/' && <TopBar />}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gods" element={<GodsGalleryPage />} />
        <Route path="/gods/:godId" element={<GodDetailPage />} />
        <Route path="/library" element={<LiteratureLibraryPage />} />
        <Route path="/panchangam" element={<PanchangamPage />} />
        {/* This route is for standard literature like the Mahabharata */}
        <Route path="/library/:storyId" element={<LiteratureDetailPage />} />

        {/* This is our new route for the Ramayana Table of Contents */}
          <Route path="/library/ramayana/:storyId" element={<RamayanaTOCPage />} />

        {/* This is the updated story player route */}
        <Route path="/story/:storyId/:kandaIndex" element={<StoryPlayerPage />} />
      </Routes>
    </div>
  );
}

export default App;
