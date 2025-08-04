import React from 'react';
import { WifiIcon, ThermometerIcon, LockIcon, ShieldIcon, HeartIcon, CoffeeIcon, CarIcon, UtensilsIcon, TvIcon, MapPinIcon, ClockIcon, CheckCircleIcon } from 'lucide-react';
export const Features = () => {
  const features = [{
    id: 1,
    title: 'High-Speed WiFi',
    description: 'Blazing fast internet connectivity in all properties for work and entertainment.',
    icon: <WifiIcon size={28} className="text-[#A1D1B1]" />,
    category: 'Technology'
  }, {
    id: 2,
    title: 'Climate Control',
    description: 'Advanced HVAC systems ensuring perfect temperature year-round.',
    icon: <ThermometerIcon size={28} className="text-[#A1D1B1]" />,
    category: 'Comfort'
  }, {
    id: 3,
    title: 'Smart Security',
    description: 'Keyless entry, CCTV monitoring, and 24/7 security for your peace of mind.',
    icon: <LockIcon size={28} className="text-[#A1D1B1]" />,
    category: 'Security'
  }, {
    id: 4,
    title: 'Premium Kitchen',
    description: 'Fully equipped kitchens with modern appliances and cooking essentials.',
    icon: <UtensilsIcon size={28} className="text-[#A1D1B1]" />,
    category: 'Amenities'
  }, {
    id: 5,
    title: 'Entertainment Center',
    description: 'Smart TVs, streaming services, and premium sound systems.',
    icon: <TvIcon size={28} className="text-[#A1D1B1]" />,
    category: 'Entertainment'
  }, {
    id: 6,
    title: 'Free Parking',
    description: 'Dedicated parking spaces available at all urban locations.',
    icon: <CarIcon size={28} className="text-[#A1D1B1]" />,
    category: 'Convenience'
  }, {
    id: 7,
    title: 'Prime Locations',
    description: 'Strategic locations near attractions, business districts, and transport.',
    icon: <MapPinIcon size={28} className="text-[#A1D1B1]" />,
    category: 'Location'
  }, {
    id: 8,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for any assistance you need.',
    icon: <ClockIcon size={28} className="text-[#A1D1B1]" />,
    category: 'Service'
  }, {
    id: 9,
    title: 'Luxury Amenities',
    description: 'Premium bedding, toiletries, coffee stations, and welcome packages.',
    icon: <HeartIcon size={28} className="text-[#A1D1B1]" />,
    category: 'Luxury'
  }];
  const categories = [...new Set(features.map(f => f.category))];
  return <section id="features" className="py-24 bg-gradient-to-br from-[#EAF5EE] via-[#F8FAF9] to-[#EAF5EE]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="mb-6">
            <span className="inline-block bg-[#A1D1B1]/20 text-[#A1D1B1] px-6 py-3 rounded-full text-sm font-semibold border border-[#A1D1B1]/30">
              Why Choose RentHub
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C2529] mb-6 leading-tight">
            Premium Features &
            <span className="text-[#A1D1B1]"> Amenities</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Every property is carefully selected and equipped with modern amenities to ensure 
            your stay is comfortable, convenient, and memorable.
          </p>
        </div>

        {/* Feature Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(category => <span key={category} className="bg-white border border-[#A1D1B1]/30 text-[#1C2529] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#A1D1B1]/10 transition-colors cursor-pointer">
              {category}
            </span>)}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map(feature => <div key={feature.id} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-[#A1D1B1]/20 hover:border-[#A1D1B1]/40 transform hover:-translate-y-2">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#A1D1B1]/20 to-[#A1D1B1]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <span className="inline-block bg-[#A1D1B1]/10 text-[#A1D1B1] text-xs font-medium px-3 py-1 rounded-full mb-2">
                    {feature.category}
                  </span>
                  <h3 className="text-xl font-bold text-[#1C2529] group-hover:text-[#A1D1B1] transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="flex items-center mt-4 text-[#A1D1B1] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <CheckCircleIcon size={16} className="mr-2" />
                <span className="text-sm font-medium">Included</span>
              </div>
            </div>)}
        </div>

        {/* Bottom CTA */}
        <div className="bg-gradient-to-r from-[#1C2529] to-[#2A373D] rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-24 h-24 border border-[#A1D1B1] rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-32 h-32 border border-[#A1D1B1] rounded-full"></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Experience <span className="text-[#A1D1B1]">Luxury?</span>
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied guests who have chosen RentHub for their premium accommodation needs.
            </p>
            <button className="bg-[#A1D1B1] hover:bg-[#8FC0A0] text-[#1C2529] py-4 px-10 rounded-xl transition-all duration-300 font-semibold hover:shadow-xl transform hover:-translate-y-1">
              Browse Properties
            </button>
          </div>
        </div>
      </div>
    </section>;
};