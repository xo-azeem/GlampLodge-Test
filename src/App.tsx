import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { Home } from './pages/Home';
import { LodgeCity } from './pages/LodgeCity';
import { GlampLodge } from './pages/GlampLodge';
import { Login } from './pages/Login';
import { UserProfile } from './pages/UserProfile';
import { ThemeProvider } from './context/ThemeContext';
import { RouteScrollToTop, ScrollToTopButton } from './components/ScrollToTop';

export function App() {
  const [selectedLocation, setSelectedLocation] = useState('Canada');

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