import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FacebookIcon, 
  InstagramIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  MapPinIcon, 
  PhoneIcon, 
  MailIcon, 
  ArrowRightIcon, 
  HeartIcon,
  TreePineIcon,
  Send
} from 'lucide-react';

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const socialLinks = [
    { icon: FacebookIcon, href: '#', label: 'Facebook' },
    { icon: InstagramIcon, href: '#', label: 'Instagram' },
    { icon: TwitterIcon, href: '#', label: 'Twitter' },
    { icon: LinkedinIcon, href: '#', label: 'LinkedIn' }
  ];

  const canadaLocations = [
    'Mississauga, ON',
    'Niagra Falls, ON',
    'Quebec City, QC',
  ];

  const pakistanLocations = [
    'Lahore, Punjab',
    'Murree, Punjab',
    'Patriata, Punjab',
    'Bhurban, Punjab',
  ];

  const quickLinks = [
    'About Us',
    'How It Works',
    'Help Center'
  ];

  const contactInfo = [
    { icon: PhoneIcon, title: 'Call Us', info: '+92 327 5889098', color: 'var(--primary)' },
    { icon: MailIcon, title: 'Email Us', info: 'glamplodges@gmail.com', color: 'var(--accent)' },
  ];

  return (
    <footer className="bg-background border-t transition-colors"
      style={{
        borderColor: 'rgba(var(--border-rgb), 0.1)'
      }}
    >
      {/* Newsletter Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="relative py-20"
        style={{
          background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.03) 0%, rgba(var(--accent-rgb), 0.03) 100%)'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={itemVariants} className="mb-8">
              <div 
                className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-medium mb-6"
                style={{
                  background: 'rgba(var(--muted-rgb), 0.8)',
                  border: '1px solid rgba(var(--border-rgb), 0.2)',
                  color: 'var(--text-secondary)'
                }}
              >
                <Send size={16} className="mr-2" />
                Stay Updated
            </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 text-text leading-tight">
              Get Exclusive{' '}
              <span className="text-primary">Deals & Updates</span>
            </h3>
              <p className="text-text-secondary text-xl leading-relaxed font-light max-w-2xl mx-auto">
                Be the first to know about new properties, special offers, and travel tips.
              </p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            >
              <motion.div 
                className="flex-1 relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-6 py-4 rounded-2xl text-text placeholder-text-secondary focus:outline-none transition-all duration-300 border-2 border-transparent focus:border-primary/30"
                  style={{
                    background: 'rgba(var(--background-rgb), 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(var(--border-rgb), 0.3)'
                  }}
                />
              </motion.div>
              <motion.button 
                className="px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                  boxShadow: '0 4px 20px rgba(var(--primary-rgb), 0.3)'
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 30px rgba(var(--primary-rgb), 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe 
                <ArrowRightIcon size={18} className="ml-2" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Footer Content */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="py-20"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              {/* Logo and Text Section */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <div className="flex items-center space-x-3">
                  <img
                    src="/Logo.png"
                    alt="Logo"
                    className="w-24 h-24 flex-shrink-0"
                  />
                  <Link to="/" className="block">
                    <div className="text-xl font-bold text-text tracking-tight">
                      GlampLodges<span className="text-primary">+</span>
                    </div>
                    <span className="text-xs text-text-secondary font-medium">
                      Premium Rentals
                    </span>
                  </Link>
                </div>
                <p className="text-text-secondary leading-relaxed text-lg font-light pl-5">
                  Connecting travelers with premium accommodations across Canada and Pakistan. 
                  From city apartments to mountain retreats, we make every stay exceptional.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-3 pl-5">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={social.label}
                    href={social.href} 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group"
                    style={{
                      background: 'rgba(var(--muted-rgb), 0.6)',
                      border: '1px solid rgba(var(--border-rgb), 0.2)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      y: -2,
                      background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                      boxShadow: '0 4px 20px rgba(var(--primary-rgb), 0.3)'
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <social.icon size={20} className="text-text-secondary group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

          {/* Canada Locations */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-6 flex items-center text-text">
              🇨🇦 Canada Locations
            </h4>
            <ul className="space-y-3">
                {canadaLocations.map((location, index) => (
                  <motion.li
                    key={location}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <motion.a 
                      href="#" 
                      className="text-text-secondary hover:text-primary transition-colors flex items-center group font-medium"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRightIcon size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {location}
                    </motion.a>
                  </motion.li>
                ))}
            </ul>
            </motion.div>

          {/* Pakistan Locations */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-6 flex items-center text-text">
              🇵🇰 Pakistan Locations
            </h4>
            <ul className="space-y-3">
                {pakistanLocations.map((location, index) => (
                  <motion.li
                    key={location}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <motion.a 
                      href="#" 
                      className="text-text-secondary hover:text-primary transition-colors flex items-center group font-medium"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRightIcon size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {location}
                    </motion.a>
                  </motion.li>
                ))}
            </ul>
            </motion.div>

          {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-bold mb-6 text-text">Quick Links</h4>
            <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <motion.a 
                      href="#" 
                      className="text-text-secondary hover:text-primary transition-colors flex items-center group font-medium"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRightIcon size={14} className="mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </motion.a>
                  </motion.li>
                ))}
            </ul>
            </motion.div>
        </div>

          {/* Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 mx-auto w-full md:max-w-4xl"
          >
            {contactInfo.map((contact) => (
              <motion.div
                key={contact.title}
                variants={itemVariants}
                className="p-6 rounded-3xl transition-all duration-300 backdrop-blur-sm flex-1"
                style={{
                  background: 'rgba(var(--muted-rgb), 0.4)',
                  border: '1px solid rgba(var(--border-rgb), 0.2)'
                }}
                whileHover={{
                  scale: 1.02,
                  y: -4,
                  background: 'rgba(var(--muted-rgb), 0.6)',
                  boxShadow: '0 8px 32px rgba(var(--primary-rgb), 0.1)'
                }}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${contact.color}20 0%, ${contact.color}10 100%)`,
                      border: `1px solid ${contact.color}30`
                    }}
                    whileHover={{ rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <contact.icon size={22} style={{ color: contact.color }} />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-text mb-1">{contact.title}</div>
                    <div className="font-medium" style={{ color: contact.color }}>
                      {contact.info}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        {/* Bottom Bar */}
          <motion.div 
            variants={itemVariants}
            className="pt-8 text-center"
            style={{
              borderTop: '1px solid rgba(var(--border-rgb), 0.1)'
            }}
          >
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="text-text-secondary text-sm">
                &copy; {new Date().getFullYear()} GlampLodges+. All rights reserved.
            </span>
              <motion.span 
                className="flex items-center gap-2 justify-center text-text-secondary text-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                Made with 
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <HeartIcon size={14} className="text-red-500" />
                </motion.div>
              by the GlampLodges+ Team
              </motion.span>
          </div>
          </motion.div>
        </div>
      </motion.section>
    </footer>
  );
};