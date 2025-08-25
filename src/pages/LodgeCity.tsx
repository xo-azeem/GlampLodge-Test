import React from 'react';
import { motion } from 'framer-motion';
import { Building, Wifi, Shield, Eye } from 'lucide-react';
import { LodgeCityAccommodations } from '../components/LodgeCityAccommodations';
import { Features } from '../components/Features';
import { CallToAction } from '../components/CallToAction';
import { Hero } from '../components/Hero';

interface LodgeCityProps {
  selectedLocation: string;
}

export const LodgeCity = ({ selectedLocation }: LodgeCityProps) => {
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
              Urban <span className="text-primary">Excellence</span>
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
              Every detail designed for the modern city dweller.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {cityFeatures.map((feature, index) => (
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
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-primary/10"
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <feature.icon size={28} className="text-primary" />
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
      <LodgeCityAccommodations selectedLocation={selectedLocation} />

      {/* Features Section */}
      {/* <Features /> */}
      
      {/* Call to Action */}
      <CallToAction />
    </div>
  );
};