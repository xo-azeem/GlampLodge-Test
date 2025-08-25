import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SearchIcon, CalendarIcon, UsersIcon, TreePine, Wifi, Mountain, Star, ArrowRight, MapPin, Heart } from 'lucide-react';
import { Features } from '../components/Features';
import { CallToAction } from '../components/CallToAction';
import { Accommodations } from '../components/GlampingAccomodations';
import { Hero } from '../components/Hero';
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
      <Hero selectedLocation={selectedLocation} pageType="glamp" />

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
      <Accommodations selectedLocation={selectedLocation} />

      {/* Features */}
      {/* <Features /> */}
      
      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};