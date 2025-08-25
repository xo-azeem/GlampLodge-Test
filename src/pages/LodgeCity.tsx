import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SearchIcon, CalendarIcon, UsersIcon, Building, Wifi, Shield, Eye, ArrowRight, Star, MapPin } from 'lucide-react';
import { Accommodations } from '../components/LodgeCityAccommodations';
import { Features } from '../components/Features';
import { CallToAction } from '../components/CallToAction';
import { Hero } from '../components/Hero';
interface LodgeCityProps {
  selectedLocation: string;
}

export const LodgeCity = ({ selectedLocation }: LodgeCityProps) => {
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
        title: 'Urban Sophistication',
        subtitle: "Canada's most vibrant cities await your arrival",
        bgImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
      };
    } else {
      return {
        title: 'Metropolitan Elegance', 
        subtitle: "Discover luxury living in Pakistan's dynamic urban centers",
        bgImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'
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

  // City-specific features with updated design
  const cityFeatures = [
    {
    id: 1,
      title: 'Prime Locations',
      description: 'Strategically positioned in the heart of the city with seamless access to culture, commerce, and connectivity.',
      icon: Building
    },
    {
    id: 2,
      title: 'Smart Living',
      description: 'Cutting-edge technology, ultra-fast connectivity, and intelligent home systems in every residence.',
      icon: Wifi
    },
    {
    id: 3,
      title: 'Secure Sanctuary',
      description: 'Advanced security systems, 24/7 monitoring, and emergency response for complete peace of mind.',
      icon: Shield
    },
    {
    id: 4,
      title: 'Skyline Views',
      description: 'Breathtaking panoramic views of the urban landscape from thoughtfully designed spaces.',
      icon: Eye
    }
  ];

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Hero Section */}
      <Hero selectedLocation={selectedLocation} pageType="lodge" />
      
      {/* City Features Section */}
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
              Urban <span className="text-primary">Excellence</span>
            </h2>
            <p className="text-text-secondary text-xl max-w-3xl mx-auto font-light">
              Every detail designed for the modern city dweller.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cityFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-border bg-muted/70"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 bg-primary/10">
                  <feature.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-medium text-text mb-4">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodations */}
      <Accommodations selectedLocation={selectedLocation} />
      
      {/* Features */}
      {/*<Features />*/}
      
      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};