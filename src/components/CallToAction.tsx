import React from 'react';
import { PhoneIcon, MailIcon, MessageCircleIcon, StarIcon } from 'lucide-react';

export const CallToAction = () => {
  return (
    <section id="contact" className="py-24 bg-background-secondary relative overflow-hidden transition-colors">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-block bg-muted text-text-secondary px-6 py-3 rounded-full text-sm font-semibold border border-border">
              Ready to Book?
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-text">
            Your Perfect Stay
            <span className="text-primary"> Awaits</span>
          </h2>

          <p className="text-xl md:text-2xl mb-12 text-text-secondary max-w-3xl mx-auto leading-relaxed">
            From urban apartments to mountain retreats, discover exceptional
            rentals that match your travel dreams.
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-text-secondary">Premium Properties</div>
            </div>
            <div className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="text-4xl font-bold text-primary mb-2">15K+</div>
              <div className="text-text-secondary">Happy Guests</div>
            </div>
            <div className="bg-background p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-center mb-2">
                <span className="text-4xl font-bold text-primary">4.9</span>
                <StarIcon size={32} className="text-primary fill-primary ml-2" />
              </div>
              <div className="text-text-secondary">Average Rating</div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-background p-10 rounded-3xl border border-border hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <PhoneIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text">
                Instant Booking
              </h3>
              <p className="mb-8 text-text-secondary leading-relaxed">
                Book your ideal rental instantly with our streamlined
                reservation system. No waiting, no hassle.
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white py-4 px-8 rounded-xl transition-all duration-300 font-semibold w-full">
                Book Now
              </button>
            </div>

            <div className="bg-background p-10 rounded-3xl border border-border hover:shadow-lg transition-all duration-300 group">
              <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircleIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-text">
                Expert Support
              </h3>
              <p className="mb-8 text-text-secondary leading-relaxed">
                Our travel experts are here 24/7 to help you find the perfect
                accommodation for your needs.
              </p>
              <button className="bg-accent hover:bg-accent/90 text-white py-4 px-8 rounded-xl transition-all duration-300 font-semibold w-full">
                Get Help
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-background rounded-3xl p-8 border border-border">
            <h3 className="text-2xl font-bold mb-8 text-text">
              Get in Touch
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center space-x-4 bg-muted rounded-2xl px-6 py-4 hover:bg-secondary transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <PhoneIcon size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="text-text font-semibold">Call Us</div>
                  <div className="text-primary">+1 (800) RENTHUB</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 bg-muted rounded-2xl px-6 py-4 hover:bg-secondary transition-colors cursor-pointer">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <MailIcon size={20} className="text-white" />
                </div>
                <div className="text-left">
                  <div className="text-text font-semibold">Email Us</div>
                  <div className="text-primary">hello@glamplodges.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};