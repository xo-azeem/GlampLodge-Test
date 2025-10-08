import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Star, 
  MapPin, 
  Calendar, 
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
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Use real images from accommodation data
  const allImages = accommodation ? accommodation.images || [accommodation.image] : [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset image index when modal opens
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (event.key === 'ArrowLeft') {
        prevImage();
      } else if (event.key === 'ArrowRight') {
        nextImage();
      } else if (event.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (event.key === 'f' || event.key === 'F') {
        setIsFullscreen(!isFullscreen);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, allImages.length, onClose, isFullscreen]);

  const nextImage = () => {
    if (allImages.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = () => {
    if (allImages.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
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
                     alt={`${accommodation.title} - Image ${currentImageIndex + 1}`}
                     className="w-full h-full object-contain cursor-pointer bg-gray-100"
                     initial={{ opacity: 0, scale: 1.1 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.5 }}
                     onClick={(e) => {
                       e.stopPropagation();
                       setIsFullscreen(true);
                     }}
                     onError={(e) => {
                       console.error('Image failed to load:', allImages[currentImageIndex]);
                       e.currentTarget.src = '/src/assets/Listings/Murree/LivingRoom.png'; // Fallback image
                     }}
                   />
                  
                  {/* Image Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md bg-black/30 text-white hover:bg-black/50 transition-all duration-200 z-10"
                        style={{ backdropFilter: 'blur(8px)' }}
                      >
                        <ChevronLeft size={24} />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full backdrop-blur-md bg-black/30 text-white hover:bg-black/50 transition-all duration-200 z-10"
                        style={{ backdropFilter: 'blur(8px)' }}
                      >
                        <ChevronRight size={24} />
                      </motion.button>
                    </>
                  )}

                  {/* Image Indicators */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                      {allImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentImageIndex 
                              ? 'bg-white scale-125 shadow-lg' 
                              : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                   {/* Image Counter and Fullscreen Button */}
                   <div className="absolute top-4 right-4 flex items-center space-x-2">
                     {allImages.length > 1 && (
                       <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                         {currentImageIndex + 1} / {allImages.length}
                       </div>
                     )}
                     <motion.button
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                       onClick={(e) => {
                         e.stopPropagation();
                         setIsFullscreen(true);
                       }}
                       className="p-3 bg-black/70 text-white rounded-full backdrop-blur-sm hover:bg-black/90 transition-all duration-200 z-20"
                       title="View fullscreen (Press F)"
                     >
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                       </svg>
                     </motion.button>
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
                      <motion.a
                        href={accommodation?.airbnbLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-4 px-6 rounded-2xl font-semibold text-white flex items-center justify-center space-x-2"
                        style={{
                          background: 'var(--primary)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                        }}
                      >
                        <Calendar size={20} />
                        <span>Book on Airbnb</span>
                      </motion.a>
                      
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
                      
                      <motion.a
                        href={accommodation?.airbnbLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-4 border-2 rounded-2xl font-semibold flex items-center justify-center space-x-2"
                        style={{
                          borderColor: 'var(--primary)',
                          color: 'var(--primary)'
                        }}
                      >
                        <ExternalLink size={20} />
                        <span>View on Airbnb</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           </motion.div>
         </>
       )}

       {/* Fullscreen Image Modal */}
       <AnimatePresence>
         {isFullscreen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[60] flex items-center justify-center"
             style={{ background: 'rgba(0, 0, 0, 0.95)' }}
             onClick={() => setIsFullscreen(false)}
           >
             {/* Close Button */}
             <motion.button
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.8 }}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.9 }}
               onClick={() => setIsFullscreen(false)}
               className="absolute top-6 right-6 p-3 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-black/70 transition-all duration-200 z-10"
             >
               <X size={24} />
             </motion.button>

             {/* Fullscreen Image */}
             <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="relative flex items-center justify-center"
               onClick={(e) => e.stopPropagation()}
               style={{ 
                 width: '100vw', 
                 height: '100vh',
                 maxWidth: '100vw',
                 maxHeight: '100vh'
               }}
             >
               <motion.img
                 key={`fullscreen-${currentImageIndex}`}
                 src={allImages[currentImageIndex]}
                 alt={`${accommodation?.title} - Full View`}
                 className="max-w-full max-h-full object-contain"
                 style={{
                   maxWidth: '100vw',
                   maxHeight: '100vh',
                   width: 'auto',
                   height: 'auto'
                 }}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 0.3 }}
               />

               {/* Navigation Controls */}
               {allImages.length > 1 && (
                 <>
                   <motion.button
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={(e) => {
                       e.stopPropagation();
                       prevImage();
                     }}
                     className="absolute left-8 top-1/2 -translate-y-1/2 p-4 bg-black/60 text-white rounded-full backdrop-blur-sm hover:bg-black/80 transition-all duration-200 z-10"
                   >
                     <ChevronLeft size={28} />
                   </motion.button>
                   
                   <motion.button
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={(e) => {
                       e.stopPropagation();
                       nextImage();
                     }}
                     className="absolute right-8 top-1/2 -translate-y-1/2 p-4 bg-black/60 text-white rounded-full backdrop-blur-sm hover:bg-black/80 transition-all duration-200 z-10"
                   >
                     <ChevronRight size={28} />
                   </motion.button>
                 </>
               )}

               {/* Image Counter */}
               {allImages.length > 1 && (
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 text-white px-6 py-3 rounded-full text-lg font-medium backdrop-blur-sm z-10"
                 >
                   {currentImageIndex + 1} / {allImages.length}
                 </motion.div>
               )}

               {/* Thumbnail Strip */}
               {allImages.length > 1 && (
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-3 z-10"
                 >
                   {allImages.map((image, index) => (
                     <button
                       key={index}
                       onClick={(e) => {
                         e.stopPropagation();
                         setCurrentImageIndex(index);
                       }}
                       className={`w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                         index === currentImageIndex 
                           ? 'ring-3 ring-white scale-110 shadow-lg' 
                           : 'opacity-60 hover:opacity-100 hover:scale-105'
                       }`}
                     >
                       <img
                         src={image}
                         alt={`Thumbnail ${index + 1}`}
                         className="w-full h-full object-cover"
                       />
                     </button>
                   ))}
                 </motion.div>
               )}
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
     </AnimatePresence>
   );
 };
