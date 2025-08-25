import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, MapPinIcon, WifiIcon, CarIcon, UtensilsIcon, TvIcon, ArrowRight, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AccommodationsProps {
  selectedLocation: string;
}

export const GlampingAccommodations = ({
  selectedLocation
}: AccommodationsProps) => {
  const { theme } = useTheme();

  const getAccommodations = () => {
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

  const accommodations = getAccommodations();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section 
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
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-xl border transition-all duration-300"
            style={{
              background: `rgba(var(--primary-rgb), ${theme === 'dark' ? '0.15' : '0.1'})`,
              borderColor: `rgba(var(--primary-rgb), 0.3)`,
              color: 'var(--primary)'
            }}
          >
            <span className="mr-2 text-lg">
              {selectedLocation === 'Canada' ? '🇨🇦' : '🇵🇰'}
            </span>
            {selectedLocation === 'Canada' ? 'Canadian Properties' : 'Pakistani Properties'}
          </motion.div>

          {/* Main Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin mb-3 xs:mb-4 sm:mb-6 md:mb-8 lg:mb-10"
            style={{ color: 'var(--text)' }}
          >
            Premium <span style={{ color: 'var(--primary)' }}>Accommodations</span>
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-text-secondary text-sm xs:text-base sm:text-lg md:text-xl max-w-4xl mx-auto font-light leading-relaxed px-2"
          >
            {selectedLocation === 'Canada' 
              ? 'From urban apartments to mountain lodges, discover comfort across Canada' 
              : 'Experience Pakistan\'s rich culture and natural beauty with our curated stays'
            }
          </motion.p>
        </motion.div>

        {/* Accommodations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12"
        >
          {accommodations.map((accommodation, index) => (
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
                {/* Image Section */}
                <div className="aspect-[5/4] xs:aspect-[4/3] sm:aspect-[16/10] md:aspect-[5/4] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden relative">
                  <motion.img
                    src={accommodation.image}
                    alt={accommodation.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
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
                    <span className="backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20"
                          style={{
                            background: `rgba(var(--text-rgb), 0.8)`
                          }}>
                      {accommodation.type}
                    </span>
                  </div>

                  {/* Favorite Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-16 p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300"
                    style={{
                      background: `rgba(var(--background-rgb), 0.3)`
                    }}
                  >
                    <Heart size={16} className="text-white/80 group-hover:text-red-400 transition-colors" />
                  </motion.button>
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
                        <div key={featureIndex} className="flex items-center text-sm"
                             style={{ color: 'var(--text-secondary)' }}>
                          <div className="w-2 h-2 rounded-full mr-2" style={{ background: 'var(--primary)' }}></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-4 rounded-xl transition-all duration-300 font-medium text-white flex items-center justify-center group"
                      style={{
                        background: 'var(--primary)',
                        boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <span>Book Now</span>
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
          ))}
        </motion.div>
      </div>
    </section>
  );
};