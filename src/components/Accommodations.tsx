import React from 'react';
import { StarIcon, MapPinIcon, WifiIcon, CarIcon, UtensilsIcon, TvIcon } from 'lucide-react';
interface AccommodationsProps {
  selectedLocation: string;
}
export const Accommodations = ({
  selectedLocation
}: AccommodationsProps) => {
  const getAccommodations = () => {
    if (selectedLocation === 'Canada') {
      return [{
        id: 1,
        title: 'Modern Downtown Apartment',
        location: 'Mississauga, ON',
        type: 'City Rental',
        price: 'CAD $120',
        period: 'per night',
        rating: 4.8,
        reviews: 127,
        description: 'Stylish apartment in the heart of Mississauga with city views and modern amenities.',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Free WiFi', 'Kitchen', 'Parking', 'City View'],
        badges: ['Popular', 'Instant Book']
      }, {
        id: 2,
        title: 'Luxury Mountain Lodge',
        location: 'Banff, AB',
        type: 'Resort Camping',
        price: 'CAD $250',
        period: 'per night',
        rating: 4.9,
        reviews: 89,
        description: 'Experience luxury camping with stunning mountain views and premium amenities.',
        image: 'https://images.unsplash.com/photo-1533601017-dc61895e03c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Mountain View', 'Fireplace', 'Hot Tub', 'Hiking Trails'],
        badges: ['Luxury', 'Mountain View']
      }, {
        id: 3,
        title: 'Coastal Glamping Dome',
        location: 'Tofino, BC',
        type: 'Glamping',
        price: 'CAD $180',
        period: 'per night',
        rating: 4.7,
        reviews: 156,
        description: 'Unique geodesic dome experience with ocean views and modern comfort.',
        image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Ocean View', 'Private Deck', 'Telescope', 'Beach Access'],
        badges: ['Unique', 'Ocean View']
      }];
    } else {
      return [{
        id: 1,
        title: 'Heritage Haveli Suite',
        location: 'Lahore, Punjab',
        type: 'City Rental',
        price: 'PKR 8,500',
        period: 'per night',
        rating: 4.6,
        reviews: 98,
        description: 'Traditional Pakistani architecture meets modern comfort in the cultural heart of Lahore.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Traditional Décor', 'Rooftop Terrace', 'AC', 'WiFi'],
        badges: ['Heritage', 'Cultural']
      }, {
        id: 2,
        title: 'Mountain Resort Cottage',
        location: 'Murree, Punjab',
        type: 'Resort Camping',
        price: 'PKR 12,000',
        period: 'per night',
        rating: 4.8,
        reviews: 74,
        description: 'Cozy mountain retreat with panoramic valley views and crisp mountain air.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Valley View', 'Fireplace', 'Garden', 'Pine Forest'],
        badges: ['Mountain Escape', 'Family Friendly']
      }, {
        id: 3,
        title: 'Luxury Camping Pod',
        location: 'Murree Hills, Punjab',
        type: 'Glamping',
        price: 'PKR 15,000',
        period: 'per night',
        rating: 4.9,
        reviews: 42,
        description: 'Modern glamping pods with all amenities while surrounded by nature.',
        image: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
        features: ['Modern Amenities', 'Forest View', 'Heated', 'Private Bathroom'],
        badges: ['New', 'Luxury Camping']
      }];
    }
  };
  const accommodations = getAccommodations();
  return <section id="rooms" className="py-24 bg-gradient-to-br from-[#F8FAF9] to-[#EAF5EE]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-block bg-[#A1D1B1]/20 text-[#A1D1B1] px-4 py-2 rounded-full text-sm font-medium">
              {selectedLocation === 'Canada' ? '🇨🇦 Canadian Properties' : '🇵🇰 Pakistani Properties'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C2529] mb-6">
            Premium Accommodations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {selectedLocation === 'Canada' ? 'From urban apartments to mountain lodges, discover comfort across Canada' : 'Experience Pakistan\'s rich culture and natural beauty with our curated stays'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accommodations.map(accommodation => <div key={accommodation.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#A1D1B1]/20">
              <div className="relative h-64 overflow-hidden">
                <img src={accommodation.image} alt={accommodation.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {accommodation.badges.map((badge, index) => <span key={index} className="bg-[#A1D1B1]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                      {badge}
                    </span>)}
                </div>
                
                {/* Type Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-[#1C2529]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                    {accommodation.type}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#1C2529] mb-1 group-hover:text-[#A1D1B1] transition-colors">
                      {accommodation.title}
                    </h3>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPinIcon size={14} className="mr-1 text-[#A1D1B1]" />
                      {accommodation.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#1C2529]">{accommodation.price}</div>
                    <div className="text-xs text-gray-500">{accommodation.period}</div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarIcon size={16} className="text-[#A1D1B1] fill-[#A1D1B1] mr-1" />
                    <span className="text-sm font-medium text-[#1C2529]">{accommodation.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({accommodation.reviews} reviews)</span>
                </div>
                
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {accommodation.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-[#1C2529] mb-3 text-sm">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {accommodation.features.map((feature, index) => <div key={index} className="flex items-center text-gray-600 text-sm">
                        <div className="w-2 h-2 bg-[#A1D1B1] rounded-full mr-2"></div>
                        {feature}
                      </div>)}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-[#1C2529] to-[#2A373D] hover:from-[#2A373D] hover:to-[#3B4A52] text-white py-3 px-4 rounded-xl transition-all duration-300 font-medium hover:shadow-lg transform hover:-translate-y-1">
                    Book Now
                  </button>
                  <button className="px-4 py-3 border-2 border-[#A1D1B1] text-[#A1D1B1] hover:bg-[#A1D1B1] hover:text-white rounded-xl transition-all duration-300 font-medium">
                    Details
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};