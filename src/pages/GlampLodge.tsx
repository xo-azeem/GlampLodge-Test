import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SearchIcon, CalendarIcon, UsersIcon, TreePine, Wifi, Mountain, Star, ArrowRight, MapPin, Heart } from 'lucide-react';
import { Features } from '../components/Features';
import { CallToAction } from '../components/CallToAction';

interface GlampLodgeProps {
  selectedLocation: string;
}

export const GlampLodge = ({ selectedLocation }: GlampLodgeProps) => {
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

  const getHeroContent = () => {
    if (selectedLocation === 'Canada') {
      return {
        title: 'Nature\'s Luxury',
        subtitle: 'Where Canada\'s wilderness meets uncompromising comfort',
        bgImage: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
      };
    } else {
      return {
        title: 'Wild Elegance',
        subtitle: 'Discover Pakistan\'s natural beauty through luxury camping',
        bgImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
      };
    }
  };

  const content = getHeroContent();

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

  // Glamping accommodations
  const getGlampingAccommodations = () => {
    if (selectedLocation === 'Canada') {
      return [
        {
        id: 1,
        title: 'Luxury Geodesic Dome',
        location: 'Banff, AB',
        type: 'Mountain View',
        price: 'CAD $250',
        period: 'per night',
        rating: 4.9,
        reviews: 89,
        description: 'Experience luxury camping with stunning mountain views and premium amenities.',
        image: 'https://images.unsplash.com/photo-1533601017-dc61895e03c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Mountain View', 'Fireplace', 'Hot Tub', 'Hiking Trails'],
        badges: ['Luxury', 'Mountain View']
        },
        {
        id: 2,
        title: 'Coastal Glamping Dome',
        location: 'Tofino, BC',
        type: 'Ocean View',
        price: 'CAD $180',
        period: 'per night',
        rating: 4.7,
        reviews: 156,
        description: 'Unique geodesic dome experience with ocean views and modern comfort.',
        image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Ocean View', 'Private Deck', 'Telescope', 'Beach Access'],
        badges: ['Unique', 'Ocean View']
        },
        {
        id: 3,
        title: 'Forest Retreat Dome',
        location: 'Algonquin Park, ON',
        type: 'Forest View',
        price: 'CAD $195',
        period: 'per night',
        rating: 4.8,
        reviews: 112,
        description: 'Secluded forest dome with panoramic views of the Canadian wilderness.',
        image: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
        features: ['Forest View', 'Wildlife Watching', 'Star Gazing', 'Nature Trails'],
        badges: ['Secluded', 'Forest']
        }
      ];
    } else {
      return [
        {
        id: 1,
        title: 'Mountain Glamping Pod',
        location: 'Murree Hills, Punjab',
        type: 'Mountain View',
        price: 'PKR 15,000',
        period: 'per night',
        rating: 4.9,
        reviews: 42,
        description: 'Modern glamping pods with all amenities while surrounded by nature.',
        image: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Modern Amenities', 'Forest View', 'Heated', 'Private Bathroom'],
        badges: ['New', 'Luxury Camping']
        },
        {
        id: 2,
        title: 'Riverside Luxury Tent',
        location: 'Hunza Valley',
        type: 'River View',
        price: 'PKR 18,000',
        period: 'per night',
        rating: 4.8,
        reviews: 35,
        description: 'Premium canvas tents with stunning views of the river and mountains.',
        image: 'https://images.unsplash.com/photo-1595274459742-4a41d35784be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['River View', 'Mountain View', 'Luxury Bedding', 'Outdoor Dining'],
        badges: ['Scenic', 'Premium']
        },
        {
        id: 3,
        title: 'Desert Glamping Experience',
        location: 'Thar Desert, Sindh',
        type: 'Desert View',
        price: 'PKR 12,000',
        period: 'per night',
          rating: 4.6,
        reviews: 28,
          description: 'Unique desert camping with traditional hospitality and modern comfort.',
          image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
          features: ['Desert View', 'Cultural Experience', 'Camel Rides', 'Traditional Meals'],
          badges: ['Cultural', 'Adventure']
        }
      ];
    }
  };

  const accommodations = getGlampingAccommodations();

  // Glamping-specific features with updated design
  const glampingFeatures = [
    {
        id: 1,
      title: 'Natural Immersion',
      description: 'Thoughtfully placed in pristine natural settings that connect you deeply with the environment.',
      icon: TreePine
    },
    {
        id: 2,
      title: 'Modern Comfort',
      description: 'All the amenities of luxury accommodation while maintaining harmony with nature.',
      icon: Wifi
    },
    {
        id: 3,
      title: 'Scenic Locations',
      description: 'Handpicked locations offering breathtaking views and unique natural experiences.',
      icon: Mountain
    },
    {
        id: 4,
      title: 'Adventure Ready',
      description: 'Easy access to hiking trails, stargazing spots, and outdoor adventure activities.',
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Hero Section */}
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
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(145, 188, 138, 0.4) 0%, transparent 50%)`
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
                backgroundColor: 'rgba(145, 188, 138, 0.15)',
                borderColor: 'rgba(145, 188, 138, 0.4)',
                textShadow: '0 1px 4px rgba(0,0,0,0.3)'
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <TreePine size={16} className="mr-2" style={{ color: 'var(--accent)' }} />
              GlampLodge | {selectedLocation === 'Canada' ? '🇨🇦 Canada' : '🇵🇰 Pakistan'}
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
                  0 8px 32px -8px rgba(145, 188, 138, 0.2),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                `
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: `
                  0 40px 80px -12px rgba(0, 0, 0, 0.5),
                  0 12px 40px -8px rgba(145, 188, 138, 0.3),
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
                    "linear-gradient(45deg, rgba(145, 188, 138, 0.1) 0%, rgba(91, 133, 131, 0.1) 100%)",
                    "linear-gradient(135deg, rgba(91, 133, 131, 0.1) 0%, rgba(145, 188, 138, 0.1) 100%)",
                    "linear-gradient(225deg, rgba(145, 188, 138, 0.1) 0%, rgba(91, 133, 131, 0.1) 100%)"
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
                      background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(145, 188, 138, 0.3)' : 'rgba(91, 133, 131, 0.3)'} 0%, transparent 70%)`,
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

              <div className="relative z-10">
                <motion.h3 
                  className="text-2xl font-light mb-8 text-center text-white/95"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Find Your Natural Retreat
                </motion.h3>
                
                <motion.div 
                  variants={searchContainerVariants}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
                >
                  {/* Location Field */}
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
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <SearchIcon size={20} className="text-white/80" />
                      </motion.div>
                      <div className="flex-1">
                        <label className="text-xs block mb-1 text-white/70 font-medium">Location</label>
                        <select className="bg-transparent text-sm font-medium focus:outline-none w-full text-white/90">
                          {selectedLocation === 'Canada' ? (
                            <>
                          <option value="">Select Location</option>
                          <option value="banff">Banff National Park</option>
                              <option value="tofino">Tofino, BC</option>
                              <option value="algonquin">Algonquin Park</option>
                            </>
                          ) : (
                            <>
                          <option value="">Select Location</option>
                          <option value="murree">Murree Hills</option>
                          <option value="hunza">Hunza Valley</option>
                          <option value="thar">Thar Desert</option>
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
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <CalendarIcon size={20} className="text-white/80" />
                      </motion.div>
                      <div className="flex-1">
                        <label className="text-xs block mb-1 text-white/70 font-medium">Check-in</label>
                        <input 
                          type="date" 
                          className="bg-transparent text-sm font-medium focus:outline-none w-full text-white/90"
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
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <CalendarIcon size={20} className="text-white/80" />
                      </motion.div>
                      <div className="flex-1">
                        <label className="text-xs block mb-1 text-white/70 font-medium">Check-out</label>
                        <input 
                          type="date" 
                          className="bg-transparent text-sm font-medium focus:outline-none w-full text-white/90"
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
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <UsersIcon size={20} className="text-white/80" />
                      </motion.div>
                      <div className="flex-1">
                        <label className="text-xs block mb-1 text-white/70 font-medium">Guests</label>
                        <select className="bg-transparent text-sm font-medium focus:outline-none w-full text-white/90">
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
                    boxShadow: "0 20px 40px -12px rgba(145, 188, 138, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-5 rounded-2xl font-medium shadow-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, rgba(145, 188, 138, 0.9) 0%, rgba(91, 133, 131, 0.9) 100%)',
                    boxShadow: '0 8px 32px -8px rgba(145, 188, 138, 0.3)'
                  }}
                >
                  {/* Button Background Animation */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "linear-gradient(135deg, rgba(145, 188, 138, 0.9) 0%, rgba(91, 133, 131, 0.9) 100%)",
                        "linear-gradient(135deg, rgba(91, 133, 131, 0.9) 0%, rgba(145, 188, 138, 0.9) 100%)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  <div className="relative z-10 flex items-center text-white">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <SearchIcon size={20} className="mr-3 group-hover:scale-110 transition-transform" />
                    </motion.div>
                    <span className="text-lg">Find Glamping Experiences</span>
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

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="flex justify-center space-x-12 text-center">
            {[
              { number: "150+", label: "Nature Retreats", icon: TreePine },
              { number: "20K+", label: "Nature Lovers", icon: Heart },
              { number: "4.9", label: "Experience Rating", icon: Star }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.1, y: -4 }}
                className="cursor-default"
              >
                <div className="flex items-center justify-center mb-2">
                  <stat.icon size={20} className="mr-2 text-accent" />
                  <div className="text-2xl md:text-3xl font-light text-white">{stat.number}</div>
                </div>
                <div className="text-white/80 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Glamping Features Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-secondary/20 to-accent/20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-extralight text-text mb-6">
              Nature's <span className="text-accent">Luxury</span>
            </h2>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto font-light">
              Where adventure meets uncompromising comfort.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {glampingFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-border bg-muted/70"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-accent/10">
                  <feature.icon size={28} className="text-accent" />
            </div>
                <h3 className="text-xl font-medium text-text mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodations Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-extralight text-text mb-6">
              Glamping <span className="text-accent">Experiences</span>
            </h2>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto font-light">
              Handpicked luxury accommodations in nature's most beautiful settings.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {accommodations.map((accommodation, index) => (
              <motion.div
                key={accommodation.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-border bg-muted/80"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={accommodation.image}
                    alt={accommodation.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {accommodation.badges.map((badge, badgeIndex) => (
                      <span 
                        key={badgeIndex}
                        className="bg-accent/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star size={14} className="text-accent fill-current" />
                      <span className="text-text text-sm font-medium">{accommodation.rating}</span>
                      <span className="text-text-secondary text-xs">({accommodation.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-medium text-text mb-1">{accommodation.title}</h3>
                      <div className="flex items-center text-text-secondary text-sm">
                        <MapPin size={14} className="mr-1" />
                        {accommodation.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-accent">{accommodation.price}</div>
                      <div className="text-text-secondary text-sm">{accommodation.period}</div>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                    {accommodation.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {accommodation.features.slice(0, 3).map((feature, featureIndex) => (
                      <span 
                        key={featureIndex}
                        className="bg-muted text-text-secondary px-3 py-1 rounded-full text-xs"
                      >
                          {feature}
                      </span>
                    ))}
                    {accommodation.features.length > 3 && (
                      <span className="text-text-secondary text-xs px-3 py-1">
                        +{accommodation.features.length - 3} more
              </span>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-accent text-white py-3 rounded-xl font-medium hover:bg-accent/90 transition-colors group flex items-center justify-center"
                  >
                    View Details
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <Features />
      
      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};