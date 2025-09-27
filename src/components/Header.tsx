import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, TreePineIcon, SunIcon, MoonIcon, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../hooks/useAuth';

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
  const { user, userProfile, signOut } = useAuth();

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
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-0">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            <img
              src="/Logo.png"
              alt="Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
            />
            <Link to="/" className="block">
              <div className="text-lg sm:text-xl font-bold text-text tracking-tight">
                GlampLodges<span className="text-primary">+</span>
              </div>
              <span className="text-xs text-text-secondary font-medium hidden sm:block">
                Premium Rentals
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
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
                  className={`px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${getActiveClass(item.path)} hover:bg-muted/50`}
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
                      className={`px-3 lg:px-4 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all duration-300 ${
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
            {/* User Profile Button - Show when logged in */}
            {user ? (
              <motion.button 
                onClick={() => window.location.href = '/profile'}
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
                aria-label="User Profile"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                  {userProfile?.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              </motion.button>
            ) : (
              /* Guest Login/Signup Button */
              <motion.button 
                onClick={() => window.location.href = '/login'}
                className="px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300"
                style={{
                  background: 'rgba(var(--muted-rgb), 0.6)',
                  border: '1px solid rgba(var(--border-rgb), 0.3)',
                  color: 'var(--text)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 4px 20px rgba(var(--primary-rgb), 0.15)'
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Sign In"
              >
                Sign In
              </motion.button>
            )}

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
              className="hidden sm:flex items-center px-4 lg:px-6 py-2 lg:py-3 rounded-2xl text-xs lg:text-sm font-semibold text-white transition-all duration-300 shadow-lg"
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
              className="md:hidden p-2 lg:p-3 rounded-2xl transition-all duration-300"
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
                {isMenuOpen ? <XIcon size={18} className="text-text" /> : <MenuIcon size={18} className="text-text" />}
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
              className="md:hidden mt-6 overflow-hidden"
            >
              <div 
                className="p-4 sm:p-6 rounded-3xl"
                style={{
                  background: 'rgba(var(--background-rgb), 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(var(--border-rgb), 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Mobile Navigation */}
                <nav className="space-y-2 mb-4 sm:mb-6">
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
                        className={`block py-2 sm:py-3 px-3 sm:px-4 rounded-2xl text-center text-sm sm:text-base font-medium transition-all duration-300 ${getActiveClass(item.path)} hover:bg-muted/50`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* User Profile Link - Show when logged in, Login link for guests */}
                  {user ? (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <Link 
                        to="/profile"
                        className="block py-3 px-4 rounded-2xl text-center font-medium transition-all duration-300 text-primary hover:bg-primary/10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold">
                            {userProfile?.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                          Profile
                        </div>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <Link 
                        to="/login"
                        className="block py-3 px-4 rounded-2xl text-center font-medium transition-all duration-300 text-primary hover:bg-primary/10"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <User size={20} />
                          Sign In
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </nav>

                {/* Mobile Location Selector - Only show on non-home pages */}
                {!isHomePage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="flex space-x-2 sm:space-x-3 mb-4 sm:mb-6"
                  >
                    {['Canada', 'Pakistan'].map((country) => (
                      <motion.button 
                        key={country}
                        onClick={() => setSelectedLocation(country)} 
                        className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 ${
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
                  className="w-full py-3 sm:py-4 rounded-2xl text-sm sm:text-base text-white font-semibold shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)',
                    boxShadow: '0 4px 20px rgba(var(--accent-rgb), 0.3)'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Book Now
                </motion.button>

                {/* Mobile Logout Button - Only show when logged in */}
                {user && (
                  <motion.button 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                    onClick={async () => {
                      try {
                        await signOut();
                        window.location.href = '/';
                      } catch (error) {
                        console.error('Logout error:', error);
                      }
                    }}
                    className="w-full py-3 sm:py-4 rounded-2xl text-sm sm:text-base font-semibold border-2 transition-all duration-300 mt-2 sm:mt-3"
                    style={{
                      borderColor: '#ef4444',
                      color: '#ef4444'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign Out
                  </motion.button>
                )}
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};