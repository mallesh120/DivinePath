import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import SidebarLayout from './components/SidebarLayout/SidebarLayout';
import PageTransition from './components/PageTransition/PageTransition';
import LoadingSpinner from './components/ui/LoadingSpinner/LoadingSpinner';
import KidsLayout from './components/KidsLayout/KidsLayout';
import './App.css';



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

const LiteratureLibraryPage = lazy(() => import('./pages/LiteratureLibraryPage/LiteratureLibraryPage'));
const GodDetailPage = lazy(() => import('./pages/GodDetailPage/GodDetailPage'));
// FestivalsPage has been merged into PanchangPage
const FestivalDetailPage = lazy(() => import('./pages/FestivalDetailPage/FestivalDetailPage'));
const PanchangPage = lazy(() => import('./pages/PanchangPage/PanchangPage'));
const PujaListPage = lazy(() => import('./pages/PujaListPage/PujaListPage'));
const PujaGuidePage = lazy(() => import('./pages/PujaGuidePage/PujaGuidePage'));
const AshtottaramDetailPage = lazy(() => import('./pages/AshtottaramDetailPage/AshtottaramDetailPage'));
const MuhurtaFinderPage = lazy(() => import('./pages/MuhurtaFinderPage/MuhurtaFinderPage'));
const FastingGuidePage = lazy(() => import('./pages/FastingGuidePage/FastingGuidePage'));
const FestivalCountdownPage = lazy(() => import('./pages/FestivalCountdownPage/FestivalCountdownPage'));
const PujaReminderPage = lazy(() => import('./pages/PujaReminderPage/PujaReminderPage'));
const BookLandingPage = lazy(() => import('./pages/BookLandingPage/BookLandingPage'));
const UniversalReaderPage = lazy(() => import('./pages/UniversalReaderPage/UniversalReaderPage'));
const SacredTextsPage = lazy(() => import('./pages/SacredTextsPage/SacredTextsPage'));
const StotramCategoryPage = lazy(() => import('./pages/StotramCategoryPage/StotramCategoryPage'));
const StotramReaderPage = lazy(() => import('./pages/StotramReaderPage/StotramReaderPage'));
const JapaMalaPage = lazy(() => import('./pages/JapaMalaPage/JapaMalaPage'));
const VirtualShrinePage = lazy(() => import('./pages/VirtualShrinePage/VirtualShrinePage'));

// Loading fallback component
const LoadingFallback = () => <LoadingSpinner />;

// Wrapper for Main Layout
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
  const [themeClass, setThemeClass] = useState('theme-night');

  // Determine dynamic theme based on current time
  useEffect(() => {
    const getThemeClass = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 8) return 'theme-dawn';
      if (hour >= 8 && hour < 17) return 'theme-day';
      if (hour >= 17 && hour < 20) return 'theme-dusk';
      return 'theme-night';
    };

    setThemeClass(getThemeClass());

    // Update theme every minute to catch transitions
    const interval = setInterval(() => {
      setThemeClass(getThemeClass());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Helper to wrap route elements with page transitions
  const withTransition = (Component) => (
    <PageTransition>
      <Component />
    </PageTransition>
  );

  return (
    <div className={`App ${themeClass}`}>
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingFallback />}>
          <Routes location={location} key={location.pathname.split('/')[1]}>
            {/* Main Application Routes */}
            <Route path="/" element={<AdultsLayoutWrapper />}>
              <Route index element={withTransition(PersonalizedDashboard)} />
              <Route path="devotional" element={withTransition(HomePage)} />
              <Route path="gods" element={withTransition(GodsGalleryPage)} />

              <Route path="gods/:godId" element={withTransition(GodDetailPage)} />
              <Route path="library" element={withTransition(LiteratureLibraryPage)} />
              <Route path="festivals" element={<Navigate to="/calendar" state={{ activeTab: 'festivals' }} replace />} />
              <Route path="festivals/:festivalId" element={withTransition(FestivalDetailPage)} />
              <Route path="calendar" element={withTransition(PanchangPage)} />
              <Route path="pujas" element={withTransition(PujaListPage)} />
              <Route path="puja/:pujaId" element={withTransition(PujaGuidePage)} />
              <Route path="ashtottaram/:deityId" element={withTransition(AshtottaramDetailPage)} />
              <Route path="library/:bookId" element={withTransition(BookLandingPage)} />
              <Route path="library/:bookId/:chapterId" element={withTransition(UniversalReaderPage)} />
              <Route path="muhurta-finder" element={withTransition(MuhurtaFinderPage)} />
              <Route path="fasting-guide" element={withTransition(FastingGuidePage)} />
              <Route path="sacred-texts" element={withTransition(SacredTextsPage)} />
              <Route path="stotrams/:categorySlug" element={withTransition(StotramCategoryPage)} />
              <Route path="stotrams/read/:stotramTitle" element={withTransition(StotramReaderPage)} />
              <Route path="festival-countdown" element={withTransition(FestivalCountdownPage)} />
              <Route path="puja-reminders" element={withTransition(PujaReminderPage)} />
              <Route path="japa-mala" element={withTransition(JapaMalaPage)} />
              <Route path="virtual-shrine" element={withTransition(VirtualShrinePage)} />
              <Route path="mandir" element={<Navigate to="/virtual-shrine" replace />} />
            </Route>

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



            {/* Catch all redirect to root */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}

export default App;
