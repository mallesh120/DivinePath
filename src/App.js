import React from 'react';
import { Routes, Route } from 'react-router-dom';


// Import Pages and Components
import HomePage from './pages/HomePage/HomePage';
import GodsGalleryPage from './pages/GodsGalleryPage/GodsGalleryPage';
import AllGodsGalleryPage from './pages/AllGodsGalleryPage/AllGodsGalleryPage';
import LiteratureLibraryPage from './pages/LiteratureLibraryPage/LiteratureLibraryPage';
import GodDetailPage from './pages/GodDetailPage/GodDetailPage';
import LiteratureDetailPage from './pages/LiteratureDetailPage/LiteratureDetailPage'; // 1. Import the new page
import PanchangamPage from './pages/PanchangamPage/PanchangamPage';
import FestivalsPage from './pages/FestivalsPage/FestivalsPage';
import FestivalDetailPage from './pages/FestivalDetailPage/FestivalDetailPage';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import StoryPlayerPage from './pages/StoryPlayerPage/StoryPlayerPage'; // Import the new page
import RamayanaTOCPage from './pages/RamayanaPage/RamayanaTOCPage';
import SidebarLayout from './components/SidebarLayout/SidebarLayout';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gods" element={<GodsGalleryPage />} />
          <Route path="/gods/all" element={<AllGodsGalleryPage />} />
          <Route path="/gods/:godId" element={<GodDetailPage />} />
          <Route path="/library" element={<LiteratureLibraryPage />} />
          <Route path="/festivals" element={<FestivalsPage />} />
          <Route path="/festivals/:festivalId" element={<FestivalDetailPage />} />
          <Route path="/panchangam" element={<PanchangamPage />} />
          {/* This route is for standard literature like the Mahabharata */}
          <Route path="/library/:storyId" element={<LiteratureDetailPage />} />

          {/* This is our new route for the Ramayana Table of Contents */}
          <Route path="/library/ramayana/:storyId" element={<RamayanaTOCPage />} />

          {/* This is the updated story player route */}
          <Route path="/story/:storyId/:kandaIndex" element={<StoryPlayerPage />} />
        </Routes>
      </SidebarLayout>
    </div>
  );
}

export default App;
