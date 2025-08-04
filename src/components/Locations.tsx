import React from 'react';
import { MapPinIcon } from 'lucide-react';
export const Locations = () => {
  const locations = [{
    id: 1,
    name: 'Banff National Park',
    province: 'Alberta',
    description: 'Experience the majesty of the Canadian Rockies with stunning mountain views.',
    image: 'https://images.unsplash.com/photo-1609811692040-1d2bf2dba7d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80'
  }, {
    id: 2,
    name: 'Tofino Coastal Reserve',
    province: 'British Columbia',
    description: 'Fall asleep to the sound of waves in our oceanside domes on Vancouver Island.',
    image: 'https://images.unsplash.com/photo-1559554498-1e6089f4d640?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }, {
    id: 3,
    name: 'Algonquin Provincial Park',
    province: 'Ontario',
    description: "Nestled in the heart of Ontario's most famous park, surrounded by lakes and forests.",
    image: 'https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
  }, {
    id: 4,
    name: 'Gaspésie National Park',
    province: 'Quebec',
    description: 'Mountain and sea views combine in this breathtaking eastern Quebec location.',
    image: 'https://images.unsplash.com/photo-1573766917336-21b1f3d87e0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }];
  return <section id="locations" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2529] mb-4">
            Stunning Locations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our geodesic domes in some of Canada's most beautiful
            natural settings, from coast to coast.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map(location => <div key={location.id} className="group relative overflow-hidden rounded-xl shadow-lg h-80 border border-[#A1D1B1]/30">
              <img src={location.image} alt={location.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C2529]/90 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center mb-2">
                  <MapPinIcon size={20} className="mr-2 text-[#A1D1B1]" />
                  <span className="text-[#A1D1B1]">{location.province}</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{location.name}</h3>
                <p className="text-white/80 mb-4">{location.description}</p>
                <button className="self-start bg-[#A1D1B1]/20 backdrop-blur-sm hover:bg-[#A1D1B1]/30 text-white py-2 px-4 rounded-lg transition-colors border border-[#A1D1B1]">
                  Explore Location
                </button>
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};