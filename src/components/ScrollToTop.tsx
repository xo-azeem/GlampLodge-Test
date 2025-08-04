import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

// Route-based scroll to top component
interface RouteScrollToTopProps {
  selectedLocation?: string;
}

export const RouteScrollToTop = ({ selectedLocation }: RouteScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, selectedLocation]); // Now also triggers on location change

  return null;
};

// Visual scroll to top button component
export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled more than 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ 
            duration: 0.3, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 rounded-2xl shadow-lg transition-all duration-300 group"
          style={{
            background: 'rgba(var(--background-rgb), 0.9)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(var(--border-rgb), 0.3)',
            boxShadow: '0 8px 32px rgba(var(--primary-rgb), 0.15)'
          }}
          whileHover={{ 
            scale: 1.05,
            y: -2,
            boxShadow: '0 12px 40px rgba(var(--primary-rgb), 0.25)'
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <motion.div
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronUp 
              size={24} 
              className="text-primary group-hover:scale-110 transition-transform duration-300" 
            />
          </motion.div>
          
          {/* Hover tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap pointer-events-none"
            style={{
              background: 'rgba(var(--background-rgb), 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(var(--border-rgb), 0.2)',
              color: 'var(--text)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            Back to Top
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Combined export for convenience
export const ScrollToTop = {
  Route: RouteScrollToTop,
  Button: ScrollToTopButton
}; 