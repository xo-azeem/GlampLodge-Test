import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { LodgeCity } from './pages/LodgeCity';
import { GlampLodge } from './pages/GlampLodge';
import { Login } from './pages/Login';
import { UserProfile } from './pages/UserProfile';
import { ThemeProvider } from './context/ThemeContext';
import { RouteScrollToTop, ScrollToTopButton } from './components/ScrollToTop';
import { LoadingPage } from './components/LoadingPage';

export function App() {
  const [selectedLocation, setSelectedLocation] = useState('Canada');
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mainPageReady, setMainPageReady] = useState(false);

  // Handle initial loading
  useEffect(() => {
    // Only show loading page on initial load (not on route changes)
    if (isInitialLoad) {
      // Preload critical assets and prepare main page
      const preloadEverything = async () => {
        try {
          // Preload images
          const imageUrls = [
            'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
          ];

          const imagePromises = imageUrls.map(url => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = resolve;
              img.onerror = reject;
              img.src = url;
            });
          });

          // Wait for images to load
          await Promise.allSettled(imagePromises);
          
          // Additional delay to ensure all components are ready
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          setMainPageReady(true);
        } catch (error) {
          console.log('Asset preloading completed with some errors:', error);
          // Continue even if some assets fail to load
          setMainPageReady(true);
        }
      };

      preloadEverything();
    }
  }, [isInitialLoad]);

  const handleLoadingComplete = () => {
    if (mainPageReady) {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  // Show loading page immediately on initial load
  if (isLoading && isInitialLoad) {
    return (
      <ThemeProvider>
        <LoadingPage onLoadingComplete={handleLoadingComplete} />
        {/* Load main page components in background - hidden */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', visibility: 'hidden' }}>
          <Router future={{ v7_relativeSplatPath: true }}>
            <MainLayout selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}>
              <Home selectedLocation={selectedLocation} />
            </MainLayout>
          </Router>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Router future={{ v7_relativeSplatPath: true }}>
        {/* Automatic scroll to top on route changes and location changes */}
        <RouteScrollToTop selectedLocation={selectedLocation} />
        
        <div className="w-full min-h-screen bg-background text-text transition-colors">
          <Routes>
            <Route path="/" element={
              <MainLayout selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}>
                <Home selectedLocation={selectedLocation} />
              </MainLayout>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={
              <MainLayout selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}>
                <Home selectedLocation={selectedLocation} />
              </MainLayout>
            } />
            <Route path="/lodge-city" element={
              <MainLayout selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}>
                <LodgeCity selectedLocation={selectedLocation} />
              </MainLayout>
            } />
            <Route path="/glamp-lodge" element={
              <MainLayout selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}>
                <GlampLodge selectedLocation={selectedLocation} />
              </MainLayout>
            } />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
          
          {/* Visual scroll to top button */}
          <ScrollToTopButton />
        </div>
      </Router>
    </ThemeProvider>
  );
}