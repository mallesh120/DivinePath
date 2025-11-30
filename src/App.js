import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import SidebarLayout from './components/SidebarLayout/SidebarLayout';
import './App.css';

// Lazy load all page components for better performance
const PersonalizedDashboard = lazy(() => import('./pages/PersonalizedDashboard/PersonalizedDashboard'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const GodsGalleryPage = lazy(() => import('./pages/GodsGalleryPage/GodsGalleryPage'));
const AllGodsGalleryPage = lazy(() => import('./pages/AllGodsGalleryPage/AllGodsGalleryPage'));
const LiteratureLibraryPage = lazy(() => import('./pages/LiteratureLibraryPage/LiteratureLibraryPage'));
const GodDetailPage = lazy(() => import('./pages/GodDetailPage/GodDetailPage'));
const LiteratureDetailPage = lazy(() => import('./pages/LiteratureDetailPage/LiteratureDetailPage'));
const FestivalsPage = lazy(() => import('./pages/FestivalsPage/FestivalsPage'));
const FestivalDetailPage = lazy(() => import('./pages/FestivalDetailPage/FestivalDetailPage'));
const HinduCalendarPage = lazy(() => import('./pages/HinduCalendarPage/HinduCalendarPage'));
const PujaListPage = lazy(() => import('./pages/PujaListPage/PujaListPage'));
const PujaGuidePage = lazy(() => import('./pages/PujaGuidePage/PujaGuidePage'));
const AshtottaramListPage = lazy(() => import('./pages/AshtottaramListPage/AshtottaramListPage'));
const AshtottaramDetailPage = lazy(() => import('./pages/AshtottaramDetailPage/AshtottaramDetailPage'));
const MuhurtaFinderPage = lazy(() => import('./pages/MuhurtaFinderPage/MuhurtaFinderPage'));
const FastingGuidePage = lazy(() => import('./pages/FastingGuidePage/FastingGuidePage'));
const FestivalCountdownPage = lazy(() => import('./pages/FestivalCountdownPage/FestivalCountdownPage'));
const PujaReminderPage = lazy(() => import('./pages/PujaReminderPage/PujaReminderPage'));
const StoryPlayerPage = lazy(() => import('./pages/StoryPlayerPage/StoryPlayerPage'));
const RamayanaTOCPage = lazy(() => import('./pages/RamayanaPage/RamayanaTOCPage'));
const BhagavadGitaPage = lazy(() => import('./pages/BhagavadGitaPage/BhagavadGitaPage'));
const PuranaPage = lazy(() => import('./pages/PuranaPage/PuranaPage'));
const AIFeaturesPage = lazy(() => import('./pages/AIFeaturesPage/AIFeaturesPage'));
const AskGuruPage = lazy(() => import('./pages/AskGuruPage/AskGuruPage'));
const DreamInterpretationPage = lazy(() => import('./pages/DreamInterpretationPage/DreamInterpretationPage'));
const NameSuggestionPage = lazy(() => import('./pages/NameSuggestionPage/NameSuggestionPage'));
const PersonalizedShlokaPage = lazy(() => import('./pages/PersonalizedShlokaPage/PersonalizedShlokaPage'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '400px',
    fontSize: '1.2rem',
    color: '#667eea'
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <div className="App">
      <Navbar />
      <SidebarLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<PersonalizedDashboard />} />
            <Route path="/devotional" element={<HomePage />} />
            <Route path="/gods" element={<GodsGalleryPage />} />
            <Route path="/gods/all" element={<AllGodsGalleryPage />} />
            <Route path="/gods/:godId" element={<GodDetailPage />} />
            <Route path="/library" element={<LiteratureLibraryPage />} />
            <Route path="/festivals" element={<FestivalsPage />} />
            <Route path="/festivals/:festivalId" element={<FestivalDetailPage />} />
            <Route path="/calendar" element={<HinduCalendarPage />} />
            <Route path="/pujas" element={<PujaListPage />} />
            <Route path="/puja/:pujaId" element={<PujaGuidePage />} />
            <Route path="/ashtottaram" element={<AshtottaramListPage />} />
            <Route path="/ashtottaram/:deityId" element={<AshtottaramDetailPage />} />
            {/* This route is for standard literature like the Mahabharata */}
            <Route path="/library/:storyId" element={<LiteratureDetailPage />} />

            {/* Route for Bhagavad Gita (scripture type) */}
            <Route path="/library/scripture/:storyId" element={<BhagavadGitaPage />} />

            {/* Route for Puranas */}
            <Route path="/library/purana/:storyId" element={<PuranaPage />} />

            {/* This is our new route for the Ramayana Table of Contents */}
            <Route path="/library/ramayana/:storyId" element={<RamayanaTOCPage />} />

            {/* This is the updated story player route */}
            <Route path="/story/:storyId/:kandaIndex" element={<StoryPlayerPage />} />
            
            {/* Practical Hindu Living Routes */}
            <Route path="/muhurta-finder" element={<MuhurtaFinderPage />} />
            <Route path="/fasting-guide" element={<FastingGuidePage />} />
            <Route path="/festival-countdown" element={<FestivalCountdownPage />} />
            <Route path="/puja-reminders" element={<PujaReminderPage />} />

            {/* AI-Powered Features Routes */}
            <Route path="/ai" element={<AIFeaturesPage />} />
            <Route path="/ai/ask-guru" element={<AskGuruPage />} />
            <Route path="/ai/dream-interpretation" element={<DreamInterpretationPage />} />
            <Route path="/ai/name-suggestion" element={<NameSuggestionPage />} />
            <Route path="/ai/personalized-shloka" element={<PersonalizedShlokaPage />} />
          </Routes>
        </Suspense>
      </SidebarLayout>
    </div>
  );
}

export default App;
