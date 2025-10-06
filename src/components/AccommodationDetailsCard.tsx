import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Wifi, 
  Car, 
  Coffee, 
  Waves, 
  Mountain, 
  TreePine, 
  Sun, 
  Moon,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Accommodation } from '../data/glampingAccommodations';

interface AccommodationDetailsCardProps {
  accommodation: Accommodation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AccommodationDetailsCard: React.FC<AccommodationDetailsCardProps> = ({
  accommodation,
  isOpen,
  onClose
}) => {
  const { theme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock additional images for the gallery
  const additionalImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1533601017-dc61895e03c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
  ];

  const allImages = accommodation ? [accommodation.image, ...additionalImages] : [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('wifi') || featureLower.includes('internet')) return <Wifi size={20} />;
    if (featureLower.includes('parking') || featureLower.includes('car')) return <Car size={20} />;
    if (featureLower.includes('coffee') || featureLower.includes('kitchen')) return <Coffee size={20} />;
    if (featureLower.includes('ocean') || featureLower.includes('beach') || featureLower.includes('water')) return <Waves size={20} />;
    if (featureLower.includes('mountain') || featureLower.includes('hiking')) return <Mountain size={20} />;
    if (featureLower.includes('forest') || featureLower.includes('nature')) return <TreePine size={20} />;
    if (featureLower.includes('sun') || featureLower.includes('day')) return <Sun size={20} />;
    if (featureLower.includes('night') || featureLower.includes('star')) return <Moon size={20} />;
    return <Star size={20} />;
  };

  if (!accommodation) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.4 
            }}
            className="fixed inset-4 z-50 mx-auto max-w-6xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
            style={{
              background: theme === 'dark' 
                ? 'rgba(20, 20, 20, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: theme === 'dark' 
                ? '1px solid rgba(255, 255, 255, 0.1)' 
                : '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b"
                   style={{ 
                     borderColor: theme === 'dark' 
                       ? 'rgba(255, 255, 255, 0.1)' 
                       : 'rgba(0, 0, 0, 0.1)' 
                   }}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Star size={20} className="text-yellow-500" fill="currentColor" />
                    <span className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
                      {accommodation.rating}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      ({accommodation.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-full transition-colors"
                    style={{
                      background: isFavorite 
                        ? 'var(--primary)' 
                        : theme === 'dark' 
                          ? 'rgba(255, 255, 255, 0.1)' 
                          : 'rgba(0, 0, 0, 0.1)',
                      color: isFavorite 
                        ? 'white' 
                        : 'var(--text)'
                    }}
                  >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full transition-colors"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.1)',
                      color: 'var(--text)'
                    }}
                  >
                    <Share2 size={20} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 rounded-full transition-colors"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.1)',
                      color: 'var(--text)'
                    }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Image Gallery */}
                <div className="relative h-80 sm:h-96 lg:h-[500px] overflow-hidden">
                  <motion.img
                    key={currentImageIndex}
                    src={allImages[currentImageIndex]}
                    alt={accommodation.title}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Image Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md bg-white/20 text-white hover:bg-white/30 transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md bg-white/20 text-white hover:bg-white/30 transition-colors"
                      >
                        <ChevronRight size={24} />
                      </motion.button>
                    </>
                  )}

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-white scale-125' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Title and Location */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-light mb-2" style={{ color: 'var(--text)' }}>
                      {accommodation.title}
                    </h1>
                    <div className="flex items-center text-lg" style={{ color: 'var(--text-secondary)' }}>
                      <MapPin size={20} className="mr-2" style={{ color: 'var(--primary)' }} />
                      {accommodation.location}
                    </div>
                  </div>

                  {/* Price and Type */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>
                        {accommodation.price}
                        <span className="text-lg font-normal ml-2" style={{ color: 'var(--text-secondary)' }}>
                          {accommodation.period}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="px-4 py-2 rounded-full text-sm font-medium"
                           style={{
                             background: `rgba(var(--primary-rgb), 0.1)`,
                             color: 'var(--primary)',
                             border: `1px solid rgba(var(--primary-rgb), 0.3)`
                           }}>
                        {accommodation.type}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-medium mb-3" style={{ color: 'var(--text)' }}>
                      About this place
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {accommodation.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-medium mb-4" style={{ color: 'var(--text)' }}>
                      What this place offers
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {accommodation.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3 p-4 rounded-xl transition-colors hover:scale-105"
                          style={{
                            background: theme === 'dark' 
                              ? 'rgba(255, 255, 255, 0.05)' 
                              : 'rgba(0, 0, 0, 0.05)',
                            border: theme === 'dark' 
                              ? '1px solid rgba(255, 255, 255, 0.1)' 
                              : '1px solid rgba(0, 0, 0, 0.1)'
                          }}
                        >
                          <div style={{ color: 'var(--primary)' }}>
                            {getFeatureIcon(feature)}
                          </div>
                          <span style={{ color: 'var(--text)' }}>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div>
                    <h3 className="text-xl font-medium mb-4" style={{ color: 'var(--text)' }}>
                      Highlights
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {accommodation.badges.map((badge, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="px-4 py-2 rounded-full text-sm font-medium"
                          style={{
                            background: `rgba(var(--primary-rgb), 0.1)`,
                            color: 'var(--primary)',
                            border: `1px solid rgba(var(--primary-rgb), 0.3)`
                          }}
                        >
                          {badge}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Contact and Booking */}
                  <div className="pt-6 border-t"
                       style={{ 
                         borderColor: theme === 'dark' 
                           ? 'rgba(255, 255, 255, 0.1)' 
                           : 'rgba(0, 0, 0, 0.1)' 
                       }}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-4 px-6 rounded-2xl font-semibold text-white flex items-center justify-center space-x-2"
                        style={{
                          background: 'var(--primary)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        <Calendar size={20} />
                        <span>Book Now</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-4 border-2 rounded-2xl font-semibold flex items-center justify-center space-x-2"
                        style={{
                          borderColor: 'var(--primary)',
                          color: 'var(--primary)'
                        }}
                      >
                        <Phone size={20} />
                        <span>Contact</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-4 border-2 rounded-2xl font-semibold flex items-center justify-center space-x-2"
                        style={{
                          borderColor: 'var(--primary)',
                          color: 'var(--primary)'
                        }}
                      >
                        <ExternalLink size={20} />
                        <span>View More</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
