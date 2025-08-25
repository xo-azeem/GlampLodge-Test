import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SearchIcon, CalendarIcon, UsersIcon, Building, TreePine, ArrowRight } from 'lucide-react';

interface HeroProps {
  selectedLocation: string;
  pageType: 'lodge' | 'glamp';
}

interface HeroContent {
  title: string;
  subtitle: string;
  bgImage: string;
  searchTitle: string;
  icon: React.ComponentType<any>;
}

export const Hero = ({ selectedLocation, pageType }: HeroProps) => {
  const { scrollYProgress } = useScroll();
  
  // iOS-style smooth spring physics
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '20%']), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.4], [1, 0]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.3], [1, 0.95]), springConfig);

  // Cursor tracking for interactive light effect
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getHeroContent = (): HeroContent => {
    if (pageType === 'lodge') {
      if (selectedLocation === 'Canada') {
        return {
          title: 'Urban Sophistication',
          subtitle: "Canada's most vibrant cities await your arrival",
          bgImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          searchTitle: 'Find Your Perfect City Escape',
          icon: Building
        };
      } else {
        return {
          title: 'Metropolitan Elegance', 
          subtitle: "Discover luxury living in Pakistan's dynamic urban centers",
          bgImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          searchTitle: 'Find Your Perfect City Escape',
          icon: Building
        };
      }
    } else { // glamp
      if (selectedLocation === 'Canada') {
        return {
          title: 'Nature\'s Luxury',
          subtitle: 'Where Canada\'s wilderness meets uncompromising comfort',
          bgImage: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          searchTitle: 'Find Your Perfect Nature Escape',
          icon: TreePine
        };
      } else {
        return {
          title: 'Wild Elegance',
          subtitle: 'Discover Pakistan\'s natural beauty through luxury camping',
          bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          searchTitle: 'Find Your Perfect Nature Escape',
          icon: TreePine
        };
      }
    }
  };

  const content = getHeroContent();
  const IconComponent = content.icon;

  // Refined animation variants with iOS-style easing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] // iOS spring curve
      }
    }
  };

  // Enhanced glassmorphism search bar animation variants
  const searchContainerVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      filter: "blur(20px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const searchFieldVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: -15,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.section 
      style={{ y, opacity, scale }}
      className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden pt-20"
    >
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${content.bgImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
        
        {/* Dynamic Gradient Overlay - Follows Cursor */}
        <motion.div 
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(164, 151, 96, 0.4) 0%, transparent 50%)`
          }}
          className="absolute inset-0 transition-all duration-300 ease-out"
        />
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl mx-auto"
      >
        {/* Brand Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.span 
            className="inline-flex items-center text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg backdrop-blur-xl border"
            style={{ 
              backgroundColor: 'rgba(164, 151, 96, 0.15)',
              borderColor: 'rgba(164, 151, 96, 0.4)',
              textShadow: '0 1px 4px rgba(0,0,0,0.3)'
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <IconComponent size={16} className="mr-2" style={{ color: 'var(--primary)' }} />
            {pageType === 'lodge' ? 'LodgeCity' : 'GlampLodge'} | {selectedLocation === 'Canada' ? '🇨🇦 Canada' : '🇵🇰 Pakistan'}
          </motion.span>
        </motion.div>

        {/* Main Title */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.h1 
            className="text-5xl md:text-7xl font-extralight text-white tracking-tight mb-6"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)' }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {content.title}
          </motion.h1>
          <motion.p 
            className="text-white/95 text-xl md:text-2xl font-light max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {content.subtitle}
          </motion.p>
        </motion.div>

        {/* Enhanced Glassmorphism Search Bar */}
        <motion.div 
          variants={searchContainerVariants}
          className="mb-12 perspective-1000"
        >
          <motion.div 
            className="backdrop-blur-3xl rounded-[2rem] p-8 shadow-2xl border max-w-5xl mx-auto relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              boxShadow: `
                0 32px 64px -12px rgba(0, 0, 0, 0.4),
                0 8px 32px -8px rgba(164, 151, 96, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.2),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: `
                0 40px 80px -12px rgba(0, 0, 0, 0.5),
                0 12px 40px -8px rgba(164, 151, 96, 0.3),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1)
              `
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Animated Background Gradient */}
            <motion.div 
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(164, 151, 96, 0.1) 0%, rgba(178, 167, 124, 0.1) 100%)",
                  "linear-gradient(135deg, rgba(178, 167, 124, 0.1) 0%, rgba(164, 151, 96, 0.1) 100%)",
                  "linear-gradient(225deg, rgba(164, 151, 96, 0.1) 0%, rgba(178, 167, 124, 0.1) 100%)"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
            />
            
            {/* Floating Orbs */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-32 h-32 rounded-full opacity-20"
                  style={{
                    background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(164, 151, 96, 0.3)' : 'rgba(178, 167, 124, 0.3)'} 0%, transparent 70%)`,
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 20}%`,
                  }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.1, 0.3, 0.1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Select and Search Bar */}
            <div className="relative z-10">
              <motion.h3 
                className="text-2xl font-light mb-8 text-center text-white/95"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {content.searchTitle}
              </motion.h3>
              
              <motion.div 
                variants={searchContainerVariants}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
              >
                {/* Location/City Field */}
                <motion.div 
                  variants={searchFieldVariants}
                  className="group"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="flex items-center space-x-3 rounded-2xl p-5 transition-all duration-300 backdrop-blur-sm border relative overflow-hidden"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <SearchIcon size={20} className="text-white/80" />
                    
                    <div className="flex-1">
                      <label className="text-xs block mb-1 text-white/70 font-medium text-left">
                        {pageType === 'lodge' ? 'City' : 'Location'}
                      </label>
                      <select className="bg-transparent text-sm font-medium focus:outline-none w-full text-white/90 [&>option]:bg-gray-700 [&>option]:text-white">
                        {selectedLocation === 'Canada' ? (
                          <>
                            <option value="">Select {pageType === 'lodge' ? 'City' : 'Location'}</option>
                            <option value="toronto">{pageType === 'lodge' ? 'Toronto' : 'Algonquin Park'}</option>
                            <option value="vancouver">{pageType === 'lodge' ? 'Vancouver' : 'Whistler'}</option>
                            <option value="montreal">{pageType === 'lodge' ? 'Montreal' : 'Banff National Park'}</option>
                          </>
                        ) : (
                          <>
                            <option value="">Select {pageType === 'lodge' ? 'City' : 'Location'}</option>
                            <option value="lahore">{pageType === 'lodge' ? 'Lahore' : 'Skardu'}</option>
                            <option value="karachi">{pageType === 'lodge' ? 'Karachi' : 'Hunza Valley'}</option>
                            <option value="islamabad">{pageType === 'lodge' ? 'Islamabad' : 'Naran Kaghan'}</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                </motion.div>
                
                {/* Check-in Field */}
                <motion.div 
                  variants={searchFieldVariants}
                  className="group"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="flex items-center space-x-3 rounded-2xl p-5 transition-all duration-300 backdrop-blur-sm border"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <CalendarIcon size={20} className="text-white/80" />
                    <div className="flex-1">
                      <label className="text-xs block mb-1 text-white/70 font-medium text-left">Check-in</label>
                      <input 
                        type="date" 
                        className="bg-transparent text-sm font-medium focus:outline-none w-full text-white/90 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Check-out Field */}
                <motion.div 
                  variants={searchFieldVariants}
                  className="group"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="flex items-center space-x-3 rounded-2xl p-5 transition-all duration-300 backdrop-blur-sm border"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <CalendarIcon size={20} className="text-white/80" />
                    <div className="flex-1">
                      <label className="text-xs block mb-1 text-white/70 font-medium text-left">Check-out</label>
                      <input 
                        type="date" 
                        className="bg-transparent text-sm font-medium focus:outline-none w-full text-white/90 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Guests Field */}
                <motion.div 
                  variants={searchFieldVariants}
                  className="group"
                  whileHover={{ scale: 1.05, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div 
                    className="flex items-center space-x-3 rounded-2xl p-5 transition-all duration-300 backdrop-blur-sm border"
                    style={{ 
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <UsersIcon size={20} className="text-white/80" />
                    <div className="flex-1">
                      <label className="text-xs block mb-1 text-white/70 font-medium text-left">Guests</label>
                      <select className="bg-transparent text-sm font-medium focus:outline-none w-full text-white/90 [&>option]:bg-gray-700 [&>option]:text-white">
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4+ Guests</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Enhanced Search Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  y: -4,
                  boxShadow: "0 20px 40px -12px rgba(164, 151, 96, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-5 rounded-2xl font-medium shadow-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(164, 151, 96, 0.9) 0%, rgba(178, 167, 124, 0.9) 100%)',
                  boxShadow: '0 8px 32px -8px rgba(164, 151, 96, 0.3)'
                }}
              >
                {/* Button Background Animation */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(164, 151, 96, 0.9) 0%, rgba(178, 167, 124, 0.9) 100%)",
                      "linear-gradient(135deg, rgba(178, 167, 124, 0.9) 0%, rgba(164, 151, 96, 0.9) 100%)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <div className="relative z-10 flex items-center text-white">
                  <SearchIcon size={20} className="mr-3 group-hover:scale-110 transition-transform" />
                  <span className="text-lg">Search Available {pageType === 'lodge' ? 'Apartments' : 'Sites'}</span>
                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight size={18} className="ml-3 group-hover:scale-110 transition-transform" />
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};