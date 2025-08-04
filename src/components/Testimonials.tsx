import React from 'react';
import { StarIcon } from 'lucide-react';
export const Testimonials = () => {
  const testimonials = [{
    id: 1,
    name: 'Sarah Johnson',
    location: 'Toronto, ON',
    quote: "The geodesic dome at Banff was like something from a dream. Waking up to mountain views while still enjoying all the comforts of a luxury hotel was an experience we'll never forget.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
  }, {
    id: 2,
    name: 'Michael Chen',
    location: 'Vancouver, BC',
    quote: "As someone who typically doesn't enjoy camping, Glamp Lodges completely changed my perspective. The technology integration was seamless, and I never once felt like I was roughing it.",
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80'
  }, {
    id: 3,
    name: 'Emily Tremblay',
    location: 'Montreal, QC',
    quote: 'Our family vacation in the Gaspésie domes was perfect. The kids loved being in nature, and I loved having a comfortable bed and hot shower at the end of each adventure-filled day.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }];
  return <section className="py-20 bg-[#F8FAF9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1C2529] mb-4">
            Guest Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our guests have to say
            about their Glamp Lodges experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => <div key={testimonial.id} className="bg-white rounded-xl overflow-hidden shadow-lg p-8 border border-[#A1D1B1]/30">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-[#A1D1B1]">
                  <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1C2529]">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => <StarIcon key={i} size={18} className="text-[#A1D1B1] fill-[#A1D1B1]" />)}
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>)}
        </div>
      </div>
    </section>;
};