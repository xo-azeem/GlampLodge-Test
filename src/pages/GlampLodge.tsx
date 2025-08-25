import React from 'react';
import { motion } from 'framer-motion';
import { TreePine, Wifi, Mountain, Star } from 'lucide-react';
import { Features } from '../components/Features';
import { CallToAction } from '../components/CallToAction';
import { GlampingAccommodations } from '../components/GlampingAccommodations';
import { Hero } from '../components/Hero';

interface GlampLodgeProps {
  selectedLocation: string;
}

export const GlampLodge = ({ selectedLocation }: GlampLodgeProps) => {
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
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.1, 0.25, 1] // iOS bezier curve
            }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-extralight text-text mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true }}
            >
              Nature's <span className="text-accent">Luxury</span>
            </motion.h2>
            <motion.p 
              className="text-text-secondary text-xl max-w-3xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              viewport={{ once: true }}
            >
              Where adventure meets uncompromising comfort.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {glampingFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.12,
                  ease: [0.25, 0.1, 0.25, 1] // iOS bezier
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  transition: { 
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1]
                  }
                }}
                className="backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-border bg-muted/70 cursor-pointer"
              >
                <motion.div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-accent/10"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <feature.icon size={28} className="text-accent" />
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-medium text-text mb-4 tracking-tight"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.12 + 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-text-secondary leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.12 + 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {feature.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodations Section */}
      <GlampingAccommodations selectedLocation={selectedLocation} />

      {/* Features Section */}
      {/* <Features /> */}
      
      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};