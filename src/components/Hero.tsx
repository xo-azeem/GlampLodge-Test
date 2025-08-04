import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRightIcon, SearchIcon, CalendarIcon, UsersIcon } from 'lucide-react';
interface HeroProps {
  selectedLocation: string;
}
export const Hero = ({
  selectedLocation
}: HeroProps) => {
  const getHeroContent = () => {
    if (selectedLocation === 'Canada') {
      return {
        title: "Premium Rentals Across Canada",
        subtitle: "From city apartments in Mississauga to luxury camping in the Rockies",
        bgImage: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      };
    } else {
      return {
        title: "Discover Pakistan's Hidden Gems",
        subtitle: "Urban stays in Lahore and mountain retreats in Murree await you",
        bgImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      };
    }
  };
  const content = getHeroContent();

  // --- Scroll-triggered video logic ---
  // (Remove all video-related logic and refs)
  // --- End scroll-triggered video logic ---

  return <section className="relative w-full h-screen bg-cover bg-center pt-20" style={{
    backgroundImage: `linear-gradient(rgba(28, 37, 41, 0.6), rgba(28, 37, 41, 0.4)), url(${content.bgImage})`
  }}>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center">
      <div className="max-w-4xl text-white text-center">
        <div className="mb-6 flex justify-center">
        <span className="inline-block bg-[#A1D1B1]/20 backdrop-blur-sm text-[#A1D1B1] px-4 py-2 rounded-full text-sm font-medium border border-[#A1D1B1]/30">
          {selectedLocation === 'Canada' ? '🇨🇦 Explore Canada' : '🇵🇰 Discover Pakistan'}
        </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
        {content.title}
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
        {content.subtitle}
        </p>

        {/* Quick Search Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 border border-white/20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3 bg-white/20 rounded-xl p-4">
          <SearchIcon size={20} className="text-[#A1D1B1]" />
          <div>
            <label className="text-xs text-white/70 block">Location</label>
            <select className="bg-transparent text-white text-sm font-medium focus:outline-none">
            {selectedLocation === 'Canada' ? <>
              <option value="">Select City</option>
              <option value="mississauga">Mississauga</option>
              <option value="banff">Banff</option>
              <option value="tofino">Tofino</option>
              </> : <>
              <option value="">Select City</option>
              <option value="lahore">Lahore</option>
              <option value="murree">Murree</option>
              <option value="islamabad">Islamabad</option>
              </>}
            </select>
          </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/20 rounded-xl p-4">
          <CalendarIcon size={20} className="text-[#A1D1B1]" />
          <div>
            <label className="text-xs text-white/70 block">Check-in</label>
            <input type="date" className="bg-transparent text-white text-sm font-medium focus:outline-none" />
          </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/20 rounded-xl p-4">
          <CalendarIcon size={20} className="text-[#A1D1B1]" />
          <div>
            <label className="text-xs text-white/70 block">Check-out</label>
            <input type="date" className="bg-transparent text-white text-sm font-medium focus:outline-none" />
          </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/20 rounded-xl p-4">
          <UsersIcon size={20} className="text-[#A1D1B1]" />
          <div>
            <label className="text-xs text-white/70 block">Guests</label>
            <select className="bg-transparent text-white text-sm font-medium focus:outline-none">
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4+ Guests</option>
            </select>
          </div>
          </div>
        </div>
        
        <button className="w-full mt-4 bg-gradient-to-r from-[#A1D1B1] to-[#8FC0A0] hover:from-[#8FC0A0] hover:to-[#7AB391] text-white py-4 px-8 rounded-xl transition-all duration-300 font-semibold hover:shadow-xl transform hover:-translate-y-1">
          Search Available Rooms
        </button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <button className="bg-gradient-to-r from-[#1C2529] to-[#2A373D] hover:from-[#2A373D] hover:to-[#3B4A52] text-white py-4 px-10 rounded-full transition-all duration-300 flex items-center justify-center border-2 border-[#A1D1B1]/50 hover:shadow-xl transform hover:-translate-y-1">
          Explore Rooms <ChevronRightIcon size={20} className="ml-3" />
        </button>
        <button className="bg-[#A1D1B1]/20 backdrop-blur-sm hover:bg-[#A1D1B1]/30 text-white py-4 px-10 rounded-full transition-all duration-300 border border-[#A1D1B1] hover:shadow-xl transform hover:-translate-y-1">
          View Locations
        </button>
        </div>
      </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
      <a href="#rooms" className="animate-bounce bg-[#A1D1B1]/20 backdrop-blur-sm p-3 rounded-full border border-[#A1D1B1] hover:bg-[#A1D1B1]/30 transition-colors">
        <ChevronRightIcon size={24} className="text-white transform rotate-90" />
      </a>
      </div>
    </section>;
};