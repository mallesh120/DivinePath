import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import SidebarLayout from './components/SidebarLayout/SidebarLayout';
import PageTransition from './components/PageTransition/PageTransition';
import LoadingSpinner from './components/ui/LoadingSpinner/LoadingSpinner';
import KidsLayout from './components/KidsLayout/KidsLayout';
import './App.css';

// Lazy load Zone Selector
const ZoneSelectorPage = lazy(() => import('./pages/ZoneSelectorPage/ZoneSelectorPage'));

// Lazy load Kids Zone components
const KidsDashboard = lazy(() => import('./pages/Kids/KidsDashboard/KidsDashboard'));
const StorybookViewer = lazy(() => import('./pages/Kids/Storybook/StorybookViewer'));
const KidsTriviaGame = lazy(() => import('./pages/Kids/Games/KidsTriviaGame'));
const KidsGamesHub = lazy(() => import('./pages/Kids/Games/KidsGamesHub'));
const MemoryMatch = lazy(() => import('./pages/Kids/Games/MemoryMatch'));
const KidsChanting = lazy(() => import('./pages/Kids/Chanting/KidsChanting'));

// Lazy load Adults Zone components (Original Pages)
const PersonalizedDashboard = lazy(() => import('./pages/PersonalizedDashboard/PersonalizedDashboard'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const GodsGalleryPage = lazy(() => import('./pages/GodsGalleryPage/GodsGalleryPage'));
const AllGodsGalleryPage = lazy(() => import('./pages/AllGodsGalleryPage/AllGodsGalleryPage'));
const LiteratureLibraryPage = lazy(() => import('./pages/LiteratureLibraryPage/LiteratureLibraryPage'));
const GodDetailPage = lazy(() => import('./pages/GodDetailPage/GodDetailPage'));
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
const BookLandingPage = lazy(() => import('./pages/BookLandingPage/BookLandingPage'));
const UniversalReaderPage = lazy(() => import('./pages/UniversalReaderPage/UniversalReaderPage'));

// Loading fallback component
const LoadingFallback = () => <LoadingSpinner />;

// Root Component to redirect based on Zone preference
const RootRouter = () => {
  const preferredZone = localStorage.getItem('preferredZone');
  if (preferredZone === 'kids') {
    return <Navigate to="/kids/home" replace />;
  } else if (preferredZone === 'adults') {
    return <Navigate to="/adults" replace />;
  }
  return <Navigate to="/selector" replace />;
};

// Wrapper for Adult Layout
const AdultsLayoutWrapper = () => (
  <>
    <Navbar />
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  </>
);

function App() {
  const location = useLocation();

  // Helper to wrap route elements with page transitions
  const withTransition = (Component) => (
    <PageTransition>
      <Component />
    </PageTransition>
  );

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location} key={location.pathname.split('/')[1]}>
            {/* Entry Routing */}
            <Route path="/" element={<RootRouter />} />
            <Route path="/selector" element={withTransition(ZoneSelectorPage)} />

            {/* Kids Zone */}
            <Route path="/kids" element={<KidsLayout />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={withTransition(KidsDashboard)} />
              <Route path="stories" element={withTransition(StorybookViewer)} />
              <Route path="stories/:storyId" element={withTransition(StorybookViewer)} />
              <Route path="games" element={withTransition(KidsGamesHub)} />
              <Route path="games/trivia" element={withTransition(KidsTriviaGame)} />
              <Route path="games/memory" element={withTransition(MemoryMatch)} />
              <Route path="chanting" element={withTransition(KidsChanting)} />
            </Route>

            {/* Adults Zone */}
            <Route path="/adults" element={<AdultsLayoutWrapper />}>
              <Route index element={withTransition(PersonalizedDashboard)} />
              <Route path="devotional" element={withTransition(HomePage)} />
              <Route path="gods" element={withTransition(GodsGalleryPage)} />
              <Route path="gods/all" element={withTransition(AllGodsGalleryPage)} />
              <Route path="gods/:godId" element={withTransition(GodDetailPage)} />
              <Route path="library" element={withTransition(LiteratureLibraryPage)} />
              <Route path="festivals" element={withTransition(FestivalsPage)} />
              <Route path="festivals/:festivalId" element={withTransition(FestivalDetailPage)} />
              <Route path="calendar" element={withTransition(HinduCalendarPage)} />
              <Route path="pujas" element={withTransition(PujaListPage)} />
              <Route path="puja/:pujaId" element={withTransition(PujaGuidePage)} />
              <Route path="ashtottaram" element={withTransition(AshtottaramListPage)} />
              <Route path="ashtottaram/:deityId" element={withTransition(AshtottaramDetailPage)} />
              <Route path="library/:bookId" element={withTransition(BookLandingPage)} />
              <Route path="library/:bookId/:chapterId" element={withTransition(UniversalReaderPage)} />
              <Route path="muhurta-finder" element={withTransition(MuhurtaFinderPage)} />
              <Route path="fasting-guide" element={withTransition(FastingGuidePage)} />
              <Route path="festival-countdown" element={withTransition(FestivalCountdownPage)} />
              <Route path="puja-reminders" element={withTransition(PujaReminderPage)} />
            </Route>

            {/* Catch all redirect to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}

export default App;
