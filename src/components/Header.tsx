import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, TreePineIcon, SunIcon, MoonIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

export const Header = ({
  selectedLocation,
  setSelectedLocation
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Determine which brand is active based on the current path
  const getActiveClass = (path: string) => {
    return location.pathname === path ? 'text-primary font-medium' : 'text-text-secondary hover:text-text';
  };

  // Check if we're on the home page to hide location selector
  const isHomePage = location.pathname === '/';

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full fixed top-0 z-50 transition-all duration-300"
      style={{
        background: 'rgba(var(--background-rgb), 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(var(--border-rgb), 0.2)',
        boxShadow: '0 1px 30px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="relative"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="w-11 h-11 rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                  boxShadow: '0 4px 20px rgba(var(--primary-rgb), 0.25)'
                }}
              >
                <TreePineIcon size={22} className="text-white relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </div>
            </motion.div>
            <Link to="/" className="block">
              <motion.div
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold text-text tracking-tight">
                  GlampLodges<span className="text-primary">+</span>
                </h1>
                <span className="text-xs text-text-secondary font-medium">
                Premium Rentals
              </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
        {/* Brand Navigation */}
            <nav className="flex items-center space-x-1">
              {[
                { path: '/', label: 'Home' },
                { path: '/lodge-city', label: 'LodgeCity' },
                { path: '/glamp-lodge', label: 'GlampLodge' }
              ].map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${getActiveClass(item.path)} hover:bg-muted/50`}
                >
                  {item.label}
            </Link>
              ))}
            </nav>

            {/* Location Selector - Only show on non-home pages */}
            <AnimatePresence>
              {!isHomePage && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center rounded-2xl p-1 backdrop-blur-sm"
                  style={{
                    background: 'rgba(var(--muted-rgb), 0.6)',
                    border: '1px solid rgba(var(--border-rgb), 0.3)'
                  }}
                >
                  {['Canada', 'Pakistan'].map((country) => (
                    <motion.button 
                      key={country}
                      onClick={() => setSelectedLocation(country)} 
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        selectedLocation === country 
                          ? 'text-white shadow-sm' 
                          : 'text-text-secondary hover:text-text hover:bg-white/10'
                      }`}
                      style={{
                        background: selectedLocation === country 
                          ? 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)'
                          : 'transparent'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {country === 'Canada' ? '🇨🇦' : '🇵🇰'} {country}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <motion.button 
              onClick={toggleTheme} 
              className="p-3 rounded-2xl transition-all duration-300"
              style={{
                background: 'rgba(var(--muted-rgb), 0.6)',
                border: '1px solid rgba(var(--border-rgb), 0.3)'
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 4px 20px rgba(var(--primary-rgb), 0.15)'
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? 
                  <MoonIcon size={18} className="text-text" /> : 
                  <SunIcon size={18} className="text-text" />
                }
              </motion.div>
            </motion.button>

            {/* Book Now Button */}
            <motion.button 
              className="hidden md:flex items-center px-6 py-3 rounded-2xl text-sm font-semibold text-white transition-all duration-300 shadow-lg"
              style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)',
                boxShadow: '0 4px 20px rgba(var(--accent-rgb), 0.3)'
              }}
              whileHover={{ 
                scale: 1.02,
                y: -1,
                boxShadow: '0 8px 30px rgba(var(--accent-rgb), 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Book Now
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button 
              className="lg:hidden p-3 rounded-2xl transition-all duration-300"
              style={{
                background: 'rgba(var(--muted-rgb), 0.6)',
                border: '1px solid rgba(var(--border-rgb), 0.3)'
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? <XIcon size={20} className="text-text" /> : <MenuIcon size={20} className="text-text" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mt-6 overflow-hidden"
            >
              <div 
                className="p-6 rounded-3xl"
                style={{
                  background: 'rgba(var(--background-rgb), 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(var(--border-rgb), 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Mobile Navigation */}
                <nav className="space-y-2 mb-6">
                  {[
                    { path: '/', label: 'Home' },
                    { path: '/lodge-city', label: 'LodgeCity' },
                    { path: '/glamp-lodge', label: 'GlampLodge' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link 
                        to={item.path}
                        className={`block py-3 px-4 rounded-2xl text-center font-medium transition-all duration-300 ${getActiveClass(item.path)} hover:bg-muted/50`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Location Selector - Only show on non-home pages */}
                {!isHomePage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex space-x-3 mb-6"
                  >
                    {['Canada', 'Pakistan'].map((country) => (
                      <motion.button 
                        key={country}
                        onClick={() => setSelectedLocation(country)} 
                        className={`flex-1 py-3 px-4 rounded-2xl text-sm font-medium transition-all duration-300 ${
                          selectedLocation === country 
                            ? 'text-white shadow-sm' 
                            : 'text-text-secondary hover:text-text'
                        }`}
                        style={{
                          background: selectedLocation === country 
                            ? 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)'
                            : 'rgba(var(--muted-rgb), 0.5)',
                          border: '1px solid rgba(var(--border-rgb), 0.2)'
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {country === 'Canada' ? '🇨🇦' : '🇵🇰'} {country}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Mobile Book Now Button */}
                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="w-full py-4 rounded-2xl text-white font-semibold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)',
                    boxShadow: '0 4px 20px rgba(var(--accent-rgb), 0.3)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
            Book Now
                </motion.button>
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};