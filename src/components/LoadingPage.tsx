import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TreePine, Building, Globe } from 'lucide-react';

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { text: 'Initializing...', duration: 800 },
    { text: 'Loading 3D Assets...', duration: 1200 },
    { text: 'Preparing Spline Models...', duration: 1000 },
    { text: 'Optimizing Performance...', duration: 600 },
    { text: 'Finalizing Experience...', duration: 400 }
  ];

  useEffect(() => {
    let currentProgress = 0;
    let currentStepIndex = 0;
    const totalDuration = loadingSteps.reduce((sum, step) => sum + step.duration, 0);
    
    const interval = setInterval(() => {
      currentProgress += 100 / (totalDuration / 100);
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
      
      setProgress(currentProgress);
      
      // Update loading text based on progress
      const stepProgress = currentProgress / 100;
      const newStepIndex = Math.floor(stepProgress * loadingSteps.length);
      
      if (newStepIndex !== currentStepIndex && newStepIndex < loadingSteps.length) {
        currentStepIndex = newStepIndex;
        setCurrentStep(newStepIndex);
        setLoadingText(loadingSteps[newStepIndex].text);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white overflow-hidden"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          margin: 0,
          padding: 0,
          border: 'none',
          outline: 'none',
          boxSizing: 'border-box'
        }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#a49760]/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-[#a49760] to-[#c9b575]"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
              rotate: [360, 180, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl bg-gradient-to-r from-[#6b7f3e] to-[#7d9147]"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-12"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-thin tracking-tight leading-tight"
              animate={{
                background: [
                  "linear-gradient(135deg, #ffffff 0%, #a49760 40%, #ffffff 80%)",
                  "linear-gradient(135deg, #a49760 0%, #ffffff 40%, #a49760 80%)",
                  "linear-gradient(135deg, #ffffff 0%, #a49760 40%, #ffffff 80%)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% 200%",
                filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.3))"
              }}
            >
              GlampLodges<span className="text-[#a49760]">+</span>
            </motion.h1>
            
            <motion.p 
              className="text-white/80 text-lg sm:text-xl font-light mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.8, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Where Dreams Meet Adventure
            </motion.p>
          </motion.div>

          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-8"
          >
            {/* Spinning loader */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 rounded-full border-4 border-[#a49760]/20 border-t-[#a49760]"></div>
              <div className="absolute inset-2 rounded-full border-2 border-[#6b7f3e]/20 border-t-[#6b7f3e]"></div>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto mb-4">
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#a49760] to-[#6b7f3e] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-sm text-white/60 mt-2">
                <span>Loading...</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Loading Text */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-white/90 text-base sm:text-lg font-light"
            >
              {loadingText}
            </motion.div>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center space-x-8 sm:space-x-12"
          >
            {[
              { icon: Building, label: "City Escapes" },
              { icon: TreePine, label: "Nature Retreats" },
              { icon: Globe, label: "Global Locations" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.2, duration: 0.4 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                  className="w-12 h-12 mx-auto mb-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                >
                  <item.icon size={20} className="text-[#a49760]" />
                </motion.div>
                <p className="text-xs sm:text-sm text-white/70">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="mt-12 text-center"
          >
            <motion.div
              animate={{ 
                opacity: [0.5, 1, 0.5],
                scale: [0.95, 1, 0.95]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="inline-flex items-center text-white/60 text-sm"
            >
              <Sparkles size={16} className="mr-2" />
              Preparing your luxury experience...
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
