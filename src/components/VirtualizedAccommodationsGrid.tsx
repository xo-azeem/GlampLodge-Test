import { motion } from 'framer-motion';
import { StarIcon, MapPinIcon, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Accommodation } from '../data/glampingAccommodations';
import { ReactNode, useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { AccommodationDetailsCard } from './AccommodationDetailsCard';
import { OptimizedImage } from './OptimizedImage';
import { AccommodationCardSkeleton } from './AccommodationCardSkeleton';
import { FlagIcon } from './FlagIcon';

interface VirtualizedAccommodationsGridProps {
  accommodations: Accommodation[];
  selectedLocation: string;
  title: ReactNode;
  description: string;
}

export const VirtualizedAccommodationsGrid = ({
  accommodations,
  selectedLocation,
  title,
  description
}: VirtualizedAccommodationsGridProps) => {
  const { theme } = useTheme();
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [visibleItems, setVisibleItems] = useState(3); // Start with 3 items
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset visible items when location changes
  useEffect(() => {
    setVisibleItems(3);
  }, [selectedLocation]);

  const handleDetailsClick = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedAccommodation(null);
  };

  // Intersection Observer for progressive loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => Math.min(prev + 2, accommodations.length));
          }
        });
      }, 
      { 
        rootMargin: '100px',
        threshold: 0.1 
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [accommodations.length, selectedLocation]);

  // Memoized visible accommodations
  const visibleAccommodations = useMemo(() => 
    accommodations.slice(0, visibleItems), 
    [accommodations, visibleItems]
  );

  // Memoized skeleton items for remaining accommodations
  const skeletonItems = useMemo(() => 
    Array.from({ length: Math.max(0, accommodations.length - visibleItems) }, (_, i) => i), 
    [accommodations.length, visibleItems]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Very fast stagger
        delayChildren: 0.05
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const renderAccommodationCard = useCallback((accommodation: Accommodation, index: number) => (
    <motion.div
      key={accommodation.id}
      variants={cardVariants}
      className="group cursor-pointer"
    >
      <motion.div
        whileHover={{ 
          scale: 1.02, 
          y: -8,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl transition-all duration-500 flex flex-col relative border h-full"
        style={{
          background: `rgba(var(--background-rgb), ${theme === 'dark' ? '0.1' : '0.8'})`,
          borderColor: theme === 'dark'
            ? `rgba(255, 255, 255, 0.15)`
            : `rgba(var(--border-rgb), 0.4)`,
          borderWidth: '1px',
          borderStyle: 'solid',
          boxShadow: theme === 'dark'
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.15)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `rgba(var(--background-rgb), ${theme === 'dark' ? '0.15' : '0.9'})`;
          e.currentTarget.style.borderColor = `rgba(var(--primary-rgb), 0.6)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = `rgba(var(--background-rgb), ${theme === 'dark' ? '0.1' : '0.8'})`;
          e.currentTarget.style.borderColor = theme === 'dark'
            ? `rgba(255, 255, 255, 0.15)`
            : `rgba(var(--border-rgb), 0.4)`;
        }}
      >
        {/* Optimized Image Section */}
        <div className="aspect-[5/4] xs:aspect-[4/3] sm:aspect-[16/10] md:aspect-[5/4] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden relative">
          <OptimizedImage
            src={accommodation.image}
            alt={accommodation.title}
            className="w-full h-full"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            priority={index < 3} // Prioritize first 3 images
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2 content-center">
            {accommodation.badges.map((badge, badgeIndex) => (
              <motion.span
                key={badgeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * badgeIndex, duration: 0.5 }}
                className="backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                style={{
                  background: `rgba(var(--primary-rgb), 0.9)`
                }}
              >
                {badge}
              </motion.span>
            ))}
          </div>
          
          {/* Type Badge */}
          <div className="absolute top-4 right-4">
            <span className="backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                  style={{
                    background: theme === 'dark' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)'
                  }}>
              {accommodation.type}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex-1 flex flex-col">
          {/* Header with Title and Price */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 
                className="text-lg xs:text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-light mb-1 sm:mb-2 group-hover:translate-x-1 transition-transform duration-300"
                style={{ color: 'var(--text)' }}
              >
                {accommodation.title}
              </h3>
              <div className="flex items-center text-sm group-hover:translate-x-2 transition-transform duration-300"
                   style={{ color: 'var(--text-secondary)' }}>
                <MapPinIcon size={14} className="mr-1" style={{ color: 'var(--primary)' }} />
                {accommodation.location}
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                {accommodation.price}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {accommodation.period}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <StarIcon size={16} className="mr-1" style={{ color: 'var(--primary)' }} fill="currentColor" />
              <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                {accommodation.rating}
              </span>
            </div>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              ({accommodation.reviews} reviews)
            </span>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--text-secondary)' }}>
            {accommodation.description}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-sm" style={{ color: 'var(--text)' }}>
              Key Features:
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {accommodation.features.map((feature, featureIndex) => (
                <div key={featureIndex} 
                     className={`flex items-center text-sm ${theme === 'dark' ? 'text-text-secondary' : 'text-black'}`}
                     style={{ 
                       opacity: theme === 'dark' ? 0.8 : 1
                     }}>
                  <div className="w-2 h-2 rounded-full mr-2" style={{ background: 'var(--primary)' }}></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-auto">
            <motion.a
              href={accommodation.airbnbLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 px-4 rounded-xl transition-all duration-300 font-medium text-white flex items-center justify-center group"
              style={{
                background: 'var(--primary)',
                boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)'
              }}
            >
              <span>Book on Airbnb</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleDetailsClick(accommodation)}
              className="px-4 py-3 border-2 rounded-xl transition-all duration-300 font-medium flex items-center justify-center group"
              style={{
                borderColor: 'var(--primary)',
                color: 'var(--primary)'
              }}
            >
              <span>Details</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  ), [theme]);

  return (
    <section 
      key={`accommodations-${selectedLocation}`}
      id="accommodations" 
      className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-3 xs:px-4 sm:px-6 relative transition-all duration-300"
      style={{
        background: theme === 'dark'
          ? 'linear-gradient(180deg, rgba(var(--background-secondary-rgb), 1) 0%, rgba(var(--background-rgb), 1) 100%)'
          : 'linear-gradient(180deg, rgba(var(--background-secondary-rgb), 1) 0%, rgba(var(--background-rgb), 1) 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header Section */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-8 xs:mb-10 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28"
        >
          {/* Location Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-xl border transition-all duration-300"
            style={{
              background: `rgba(var(--primary-rgb), ${theme === 'dark' ? '0.15' : '0.1'})`,
              borderColor: `rgba(var(--primary-rgb), 0.3)`,
              color: 'var(--primary)'
            }}
          >
            <span className="mr-2 text-lg">
              <FlagIcon 
                country={selectedLocation === 'International' ? 'International' : 'Pakistan'} 
                size={20} 
              />
            </span>
            {selectedLocation === 'International' ? 'International Properties' : 'Pakistani Properties'}
          </motion.div>

          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin mb-3 xs:mb-4 sm:mb-6 md:mb-8 lg:mb-10"
            style={{ color: 'var(--text)' }}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-text-secondary text-sm xs:text-base sm:text-lg md:text-xl max-w-4xl mx-auto font-light leading-relaxed px-2"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Accommodations Grid */}
        <motion.div
          key={`grid-${selectedLocation}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12"
        >
          {/* Render visible accommodations */}
          {visibleAccommodations.map((accommodation, index) => 
            renderAccommodationCard(accommodation, index)
          )}

          {/* Render skeleton items for remaining accommodations */}
          {skeletonItems.map((index) => (
            <AccommodationCardSkeleton key={`skeleton-${index}`} />
          ))}

          {/* Empty state */}
          {accommodations.length === 0 && (
            <motion.div
              variants={cardVariants}
              className="col-span-full flex flex-col items-center justify-center py-16 px-8"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <svg 
                    className="w-12 h-12 text-primary" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4">
                  Coming Soon
                </h3>
                <p className="text-text-secondary text-lg max-w-md mx-auto leading-relaxed">
                  We're working hard to bring you amazing accommodations in {selectedLocation}. 
                  Stay tuned for exciting new properties coming your way!
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-8 flex items-center justify-center space-x-2 text-primary"
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Load more trigger */}
        {visibleItems < accommodations.length && (
          <div ref={containerRef} className="h-20 flex items-center justify-center">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-text-secondary text-sm"
            >
              Loading more accommodations...
            </motion.div>
          </div>
        )}
      </div>

      {/* Accommodation Details Card */}
      <AccommodationDetailsCard
        accommodation={selectedAccommodation}
        isOpen={isDetailsOpen}
        onClose={handleCloseDetails}
      />
    </section>
  );
};
