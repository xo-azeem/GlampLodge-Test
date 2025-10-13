import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Sphere, 
  MeshDistortMaterial, 
  Float, 
  Environment,
  Stars,
  Cloud
} from '@react-three/drei';
import * as THREE from 'three';
import Spline from '@splinetool/react-spline';
import { 
  ChevronRight, 
  Building, 
  TreePine, 
  ArrowRight, 
  Heart, 
  MapPin,
  Award
} from 'lucide-react';
import { FlagIcon } from '../components/FlagIcon';

interface HomeProps {
  selectedLocation: string;
}

// Error Boundary Component for 3D Scene
class Scene3DErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// 3D Background Scene Component - Stars and Clouds only (for Hero section)
const BackgroundScene = React.memo(() => {
  const cloudRef = useRef<THREE.Group>(null);
  
  // Store initial time to ensure consistent animation
  const startTimeRef = useRef<number | null>(null);
  
  useFrame((state) => {
    // Initialize start time on first frame
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }
    
    // Use elapsed time from start for consistent animation
    const time = state.clock.elapsedTime - startTimeRef.current;
    
    // Cloud animation - completely independent and natural
    if (cloudRef.current) {
      cloudRef.current.rotation.y = time * 0.03; // Slower, more natural rotation
      cloudRef.current.position.x = Math.sin(time * 0.1) * 2; // Gentle drift
      cloudRef.current.position.z = Math.cos(time * 0.08) * 1;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <Stars 
        radius={300} 
        depth={60} 
        count={20000} 
        factor={7} 
        saturation={0} 
        fade 
        speed={0.3}
      />
      
      {/* Enhanced Animated Clouds - Natural movement only */}
      <group ref={cloudRef}>
        <Cloud
          key="cloud-1" // Add keys for stability
          opacity={0.3}
          speed={0.2}
          bounds={[8, 1.2, 8]}
          segments={18}
          position={[0, 4, -10]}
          color="#ffffff"
        />
        <Cloud
          key="cloud-2" // Add keys for stability
          opacity={0.25}
          speed={0.3}
          bounds={[6, 1, 6]}
          segments={14}
          position={[-6, 3, -8]}
          color="#f8f8f8"
        />
        <Cloud
          key="cloud-3" // Add keys for stability
          opacity={0.2}
          speed={0.25}
          bounds={[5, 0.8, 5]}
          segments={12}
          position={[8, 2, -12]}
          color="#f0f0f0"
        />
      </group>

      {/* Optimized lighting setup */}
      <ambientLight intensity={0.3} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        castShadow 
        color="#ffeaa7"
      />
      <pointLight 
        position={[-10, -10, -10]} 
        color="#a49760" 
        intensity={0.6}
        distance={40}
        decay={1}
      />
      <spotLight
        position={[15, 15, 15]}
        angle={0.25}
        penumbra={0.4}
        intensity={0.4}
        color="#6b7f3e"
        distance={60}
        decay={1.5}
      />
    </>
  );
});

// 3D Background Scene Component - With Spheres (for other sections)
const BackgroundSceneWithSpheres = React.memo(() => {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Group>(null);
  const sphereGroup = useRef<THREE.Group>(null);
  
  // Store initial time to ensure consistent animation
  const startTimeRef = useRef<number | null>(null);
  
  useFrame((state) => {
    // Initialize start time on first frame
    if (startTimeRef.current === null) {
      startTimeRef.current = state.clock.elapsedTime;
    }
    
    // Use elapsed time from start for consistent animation
    const time = state.clock.elapsedTime - startTimeRef.current;
    
    // Animated spheres - independent of cursor
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
      meshRef.current.rotation.y = time * 0.1;
    }
    
    // Cloud animation - completely independent and natural
    if (cloudRef.current) {
      cloudRef.current.rotation.y = time * 0.03; // Slower, more natural rotation
      cloudRef.current.position.x = Math.sin(time * 0.1) * 2; // Gentle drift
      cloudRef.current.position.z = Math.cos(time * 0.08) * 1;
    }
    
    // Group animation for spheres - independent movement
    if (sphereGroup.current) {
      sphereGroup.current.rotation.z = Math.sin(time * 0.1) * 0.05;
      sphereGroup.current.position.y = Math.sin(time * 0.3) * 0.2;
    }
  });

  return (
    <>
      <Environment preset="sunset" />
      <Stars 
        radius={300} 
        depth={60} 
        count={20000} 
        factor={7} 
        saturation={0} 
        fade 
        speed={0.3}
      />
      
      {/* Enhanced Floating Geometric Shapes */}
      <group ref={sphereGroup}>
        <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
          <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5} position={[-4, 0, -5]}>
            <MeshDistortMaterial
              color="#a49760"
              attach="material"
              distort={0.25}
              speed={1.2}
              roughness={0.3}
              metalness={0.7}
              emissive="#a49760"
              emissiveIntensity={0.08}
            />
          </Sphere>
        </Float>

        <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.2}>
          <Sphere args={[0.8, 100, 200]} scale={1.8} position={[4, 2, -3]}>
            <MeshDistortMaterial
              color="#6b7f3e"
              attach="material"
              distort={0.3}
              speed={1.5}
              roughness={0.25}
              metalness={0.6}
              emissive="#6b7f3e"
              emissiveIntensity={0.08}
            />
          </Sphere>
        </Float>

        {/* Additional smaller spheres for more dynamic feel */}
        <Float speed={2.2} rotationIntensity={1.5} floatIntensity={2.0}>
          <Sphere args={[0.3, 50, 100]} scale={1} position={[6, -2, -2]}>
            <MeshDistortMaterial
              color="#ffffff"
              attach="material"
              distort={0.15}
              speed={2.0}
              roughness={0.1}
              metalness={0.8}
              emissive="#ffffff"
              emissiveIntensity={0.04}
            />
          </Sphere>
        </Float>

        <Float speed={1.6} rotationIntensity={1.0} floatIntensity={1.8}>
          <Sphere args={[0.4, 50, 100]} scale={1.2} position={[-6, 1, -4]}>
            <MeshDistortMaterial
              color="#c9b575"
              attach="material"
              distort={0.2}
              speed={1.8}
              roughness={0.2}
              metalness={0.65}
              emissive="#c9b575"
              emissiveIntensity={0.06}
            />
          </Sphere>
        </Float>
      </group>

      {/* Enhanced Animated Clouds - Natural movement only */}
      <group ref={cloudRef}>
        <Cloud
          key="cloud-1" // Add keys for stability
          opacity={0.3}
          speed={0.2}
          bounds={[8, 1.2, 8]}
          segments={18}
          position={[0, 4, -10]}
          color="#ffffff"
        />
        <Cloud
          key="cloud-2" // Add keys for stability
          opacity={0.25}
          speed={0.3}
          bounds={[6, 1, 6]}
          segments={14}
          position={[-6, 3, -8]}
          color="#f8f8f8"
        />
        <Cloud
          key="cloud-3" // Add keys for stability
          opacity={0.2}
          speed={0.25}
          bounds={[5, 0.8, 5]}
          segments={12}
          position={[8, 2, -12]}
          color="#f0f0f0"
        />
      </group>

      {/* Optimized lighting setup */}
      <ambientLight intensity={0.3} color="#ffffff" />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        castShadow 
        color="#ffeaa7"
      />
      <pointLight 
        position={[-10, -10, -10]} 
        color="#a49760" 
        intensity={0.6}
        distance={40}
        decay={1}
      />
      <spotLight
        position={[15, 15, 15]}
        angle={0.25}
        penumbra={0.4}
        intensity={0.4}
        color="#6b7f3e"
        distance={60}
        decay={1.5}
      />
    </>
  );
});

BackgroundScene.displayName = 'BackgroundScene';

// 3D Loading Fallback compatible with R3F Canvas
const Loader3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02;
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#a49760"
          emissive="#a49760"
          emissiveIntensity={0.2}
          wireframe
        />
      </Sphere>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
};

// Simple fallback component when 3D fails - iOS style
const Simple3DFallback = ({ isLoading = false }: { isLoading?: boolean }) => (
  <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a0a] to-[#0f0f0f]">
    <div className="absolute inset-0 opacity-15">
      {/* iOS-inspired gradient orbs */}
      <motion.div
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-[#a49760] to-[#c9b575] rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          scale: [1.3, 1, 1.3],
          opacity: [0.15, 0.35, 0.15],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-[#6b7f3e] to-[#7d9147] rounded-full blur-3xl"
      />
    </div>
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-8 h-8 border-2 border-[#a49760] border-t-transparent rounded-full"
        />
      </div>
    )}
  </div>
);

// Enhanced 3D Interactive Card Component - iOS style
interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
}

const Interactive3DCard = ({ children, className = "" }: Interactive3DCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((event.clientX - centerX) * 0.8);
    mouseY.set((event.clientY - centerY) * 0.8);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transform-gpu ${className}`}
      whileHover={{ 
        scale: 1.02, 
        z: 20,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        mass: 0.8
      }}
    >
      {children}
    </motion.div>
  );
};

export const Home = ({ selectedLocation: _selectedLocation }: HomeProps) => {
  const { scrollYProgress } = useScroll();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const [canvasReady, setCanvasReady] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // iOS-inspired smooth scroll animations
  const springConfig = { stiffness: 200, damping: 40, restDelta: 0.001 };
  const heroY = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '30%']), springConfig);
  const heroOpacity = useSpring(useTransform(scrollYProgress, [0, 0.4], [1, 0]), springConfig);
  const heroScale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 0.95]), springConfig);
  const heroBlur = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, 4]), springConfig);

  // Initialize component mount state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize Canvas with intersection observer for better reliability
  useEffect(() => {
    if (!isMounted || !canvasContainerRef.current) return;

    // Ensure we're in browser environment and WebGL is available
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
      } catch (e) {
        return false;
      }
    };

    const initializeCanvas = () => {
      if (typeof window !== 'undefined') {
        const webGLAvailable = checkWebGLSupport();
        setWebGLSupported(webGLAvailable);
        
        if (webGLAvailable) {
          setCanvasReady(true);
        } else {
          setCanvasReady(false);
        }
      } else {
        // Server side or WebGL not supported
        setWebGLSupported(false);
        setCanvasReady(false);
      }
    };

    // Use intersection observer to ensure the container is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Container is visible, initialize canvas after a brief delay
            setTimeout(initializeCanvas, 200);
            observer.disconnect(); // Only initialize once
          }
        });
      },
      { threshold: 0.1 }
    );

    if (canvasContainerRef.current) {
      observer.observe(canvasContainerRef.current);
    }

    // Fallback: initialize after 800ms regardless (increased for better loading experience)
    const fallbackTimer = setTimeout(initializeCanvas, 800);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, [isMounted]);

  // Enhanced mouse parallax effect with smooth tracking
  useEffect(() => {
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 12, // Increased for more visible effect
          y: (e.clientY / window.innerHeight - 0.5) * 12
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // iOS-inspired animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white overflow-hidden">
            {/* Redesigned Hero Section */}
      <motion.section 
        style={{ 
          y: heroY, 
          opacity: heroOpacity, 
          scale: heroScale,
          filter: `blur(${heroBlur}px)`
        }}
        className="relative min-h-screen flex flex-col overflow-hidden"
      >
        {/* 3D Background */}
        <div ref={canvasContainerRef} className="absolute inset-0 z-0">
          {canvasReady && webGLSupported && isMounted ? (
            <Scene3DErrorBoundary fallback={<Simple3DFallback />}>
              <Canvas
                key={canvasReady && isMounted ? 'canvas-mounted' : 'canvas-pending'}
                camera={{ position: [0, 0, 10], fov: 75 }}
                className="absolute inset-0 pointer-events-none"
                dpr={[1, 2]}
                performance={{ min: 0.6 }}
                gl={{ 
                  antialias: true,
                  alpha: true,
                  stencil: false,
                  depth: true,
                  powerPreference: "high-performance",
                  preserveDrawingBuffer: true
                }}
                shadows={false}
                frameloop="always"
                onPointerMove={() => {}}
                onPointerDown={() => {}}
                onPointerUp={() => {}}
                onCreated={(state) => {
                  console.log('Canvas initialized successfully');
                  state.gl.render(state.scene, state.camera);
                }}
              >
                <Suspense fallback={<Loader3D />}>
                  <BackgroundScene />
                </Suspense>
              </Canvas>
            </Scene3DErrorBoundary>
          ) : (
            <Simple3DFallback isLoading={!webGLSupported ? false : !canvasReady || !isMounted} />
          )}
        </div>

        {/* Spline 3D Model */}
        <div className="absolute inset-0 z-10">
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              transform: `translate3d(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px, 0)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <Spline
              scene="https://prod.spline.design/AYEHlRRQDSc0D6mb/scene.splinecode"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>

        {/* Animated Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 z-15"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(164, 151, 96, 0.2) 0%, transparent 60%)",
              "radial-gradient(circle at 70% 60%, rgba(107, 127, 62, 0.2) 0%, transparent 60%)",
              "radial-gradient(circle at 50% 30%, rgba(164, 151, 96, 0.2) 0%, transparent 60%)"
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

                 {/* Top Section - Header */}
         <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="visible"
           className="relative z-20 flex-1 flex flex-col justify-start pt-24 pb-12"
           style={{
             transform: `translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px, 0)`,
             transition: 'transform 0.15s ease-out'
           }}
         >
           <div className="text-center max-w-6xl mx-auto px-6">
             {/* Logo Section */}
             <motion.div variants={itemVariants} className="mb-12 mt-8 py-4">
               <motion.h1 
                 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-thin tracking-tight leading-tight drop-shadow-2xl"
                 whileHover={{ 
                   scale: 1.01, 
                   textShadow: "0 0 40px rgba(164, 151, 96, 0.3)",
                   transition: { duration: 0.4 }
                 }}
                 style={{
                   background: "linear-gradient(135deg, #ffffff 0%, #a49760 40%, #ffffff 80%)",
                   WebkitBackgroundClip: "text",
                   WebkitTextFillColor: "transparent",
                   backgroundSize: "200% 200%",
                   filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.2))",
                   lineHeight: "1.2",
                   paddingBottom: "0.1em",
                   paddingTop: "0.05em"
                 }}
               >
                 GlampLodges<span className="text-[#a49760]">+</span>
               </motion.h1>

               <motion.p 
                 className="text-white text-lg sm:text-xl lg:text-2xl font-light tracking-wide opacity-95 drop-shadow-lg max-w-3xl mx-auto mt-6 mb-8"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 0.95 }}
                 transition={{ delay: 1.2, duration: 1 }}
               >
                 Where Dreams Meet Adventure in Pakistan
               </motion.p>
             </motion.div>
           </div>
         </motion.div>

                 {/* Bottom Section - Luxury Reimagined + Action Buttons */}
         <motion.div 
           variants={itemVariants}
           className="relative z-20 flex-shrink-0 pb-20"
           style={{
             transform: `translate3d(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px, 0)`,
             transition: 'transform 0.15s ease-out'
           }}
         >
           <div className="text-center max-w-6xl mx-auto px-6">
             {/* Luxury Reimagined Section */}
             <motion.div variants={itemVariants} className="mb-16">
               <h2 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-light leading-tight drop-shadow-xl mb-6">
                 Luxury <span className="text-[#a49760]">Reimagined</span>
               </h2>
               <p className="text-white text-base sm:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed font-light opacity-90 drop-shadow-lg">
                 From vibrant city sanctuaries to luxury nature domes — every stay crafted for the extraordinary.
               </p>
             </motion.div>

             {/* Action Buttons */}
             <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center max-w-2xl mx-auto">
              <Link to="/lodge-city" className="w-full sm:w-auto">
                <Interactive3DCard className="w-full">
                  <motion.button
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full px-8 sm:px-10 lg:px-12 py-4 lg:py-5 rounded-2xl font-medium transition-all duration-500 flex items-center justify-center group overflow-hidden backdrop-blur-xl bg-white/10 border border-transparent hover:border-[#a49760]/60 hover:bg-white/15 hover:shadow-[0_0_30px_rgba(164,151,96,0.3)]"
                  >
                    {/* Glass effect background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#a49760]/20 to-[#c9b575]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                         style={{
                           background: 'linear-gradient(45deg, transparent, rgba(164,151,96,0.3), transparent)',
                           backgroundSize: '200% 200%'
                         }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center space-x-3">
                      <Building size={20} className="group-hover:rotate-6 transition-transform duration-300 text-white flex-shrink-0" />
                      <span className="text-white font-semibold text-base lg:text-lg whitespace-nowrap">City Escapes</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300 text-white flex-shrink-0" />
                    </div>
                  </motion.button>
                </Interactive3DCard>
              </Link>
              
              <Link to="/glamp-lodge" className="w-full sm:w-auto">
                <Interactive3DCard className="w-full">
                  <motion.button
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full px-8 sm:px-10 lg:px-12 py-4 lg:py-5 rounded-2xl font-medium transition-all duration-500 flex items-center justify-center group overflow-hidden backdrop-blur-xl bg-white/10 border border-transparent hover:border-[#6b7f3e]/60 hover:bg-white/15 hover:shadow-[0_0_30px_rgba(107,127,62,0.3)]"
                  >
                    {/* Glass effect background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#6b7f3e]/20 to-[#7d9147]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                         style={{
                           background: 'linear-gradient(45deg, transparent, rgba(107,127,62,0.3), transparent)',
                           backgroundSize: '200% 200%'
                         }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center space-x-3">
                      <TreePine size={20} className="group-hover:rotate-6 transition-transform duration-300 text-white flex-shrink-0" />
                      <span className="text-white font-semibold text-base lg:text-lg whitespace-nowrap">Nature Retreats</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300 text-white flex-shrink-0" />
                    </div>
                  </motion.button>
                </Interactive3DCard>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute bottom-16 right-8 z-30"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer group"
            onClick={() => {
              document.getElementById('features-section')?.scrollIntoView({ 
                behavior: 'smooth' 
              });
            }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.05, 0.2]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3.5, 
                ease: "easeInOut" 
              }}
              className="absolute inset-0 rounded-full bg-[#a49760]/20 blur-lg"
            />
            
            <div className="relative w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/10 bg-white/8 shadow-xl group-hover:shadow-[#a49760]/15 transition-all duration-300">
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "easeInOut" 
                }}
                className="flex flex-col items-center"
              >
                <div className="w-0.5 h-3 rounded-full mb-1 bg-[#a49760]" />
                <div className="w-1.5 h-1.5 border-r border-b transform rotate-45 border-[#a49760]" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section*/}
      <section
        id="features-section"
        className="py-12 xs:py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32 px-3 xs:px-4 sm:px-6 relative transition-all duration-300"
        style={{
          background: theme === 'dark'
        ? 'linear-gradient(180deg, rgba(var(--background-secondary-rgb), 1) 0%, rgba(var(--background-rgb), 1) 100%)'
        : 'linear-gradient(180deg, rgba(var(--background-secondary-rgb), 1) 0%, rgba(var(--background-rgb), 1) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true, margin: "-80px" }}
        className="text-center mb-8 xs:mb-10 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-28"
          >
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin mb-3 xs:mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-text">
          Two Worlds, One <span style={{ color: 'var(--primary)' }}>Promise</span>
        </h2>
        <p className="text-text-secondary text-sm xs:text-base sm:text-lg md:text-xl max-w-4xl mx-auto font-light leading-relaxed px-2">
          Choose your perfect escape — urban sophistication or natural serenity.
        </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
        {/* GlampLodge Card */}
        <Link to="/glamp-lodge">
          <Interactive3DCard>
            <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
            >
          <div
            className="backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl transition-all duration-500 flex flex-col relative border"
            style={{
              background: `rgba(var(--background-rgb), ${theme === 'dark' ? '0.1' : '0.8'})`,
              borderColor: theme === 'dark'
            ? `rgba(255, 255, 255, 0.15)`
            : `rgba(var(--border-rgb), 0.4)`,
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: theme === 'dark'
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.3) sm:0 20px 40px -8px rgba(0, 0, 0, 0.4) lg:0 25px 50px -12px rgba(0, 0, 0, 0.4)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.15) sm:0 20px 40px -8px rgba(0, 0, 0, 0.2) lg:0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `rgba(var(--background-rgb), ${theme === 'dark' ? '0.15' : '0.9'})`;
              e.currentTarget.style.borderColor = `rgba(var(--accent-rgb), 0.6)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = `rgba(var(--background-rgb), ${theme === 'dark' ? '0.1' : '0.8'})`;
              e.currentTarget.style.borderColor = theme === 'dark'
            ? `rgba(255, 255, 255, 0.15)`
            : `rgba(var(--border-rgb), 0.4)`;
            }}
          >
            <div className="aspect-[5/4] xs:aspect-[4/3] sm:aspect-[16/10] md:aspect-[5/4] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden relative">
              <motion.img
            src="https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Glamping Dome"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />
            </div>
            {/* Content Section */}
            <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 relative">
              {/* Always visible title */}
              <div className="relative z-20">
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-light mb-1 sm:mb-2 group-hover:translate-x-1 transition-transform duration-300 text-text">
              GlampLodge
            </h3>
            <div className="flex items-center font-medium cursor-pointer text-xs xs:text-sm sm:text-base md:text-sm lg:text-base group-hover:translate-x-2 transition-transform duration-300" style={{ color: 'var(--accent)' }}>
              Discover Nature <ArrowRight size={14} className="xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px] md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] ml-1 sm:ml-2" />
            </div>
              </div>
              {/* Expanding description - iOS style */}
              <div className="overflow-hidden max-h-0 group-hover:max-h-24 sm:group-hover:max-h-28 lg:group-hover:max-h-32 transition-all duration-500 ease-out">
            <div
              className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 delay-100 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t"
              style={{ borderColor: `rgba(var(--border-rgb), 0.3)` }}
            >
              {/* iOS-style handle */}
              <div
                className="h-0.5 sm:h-1 w-8 sm:w-12 rounded-full mx-auto mb-2 sm:mb-3"
                style={{ background: `rgba(var(--text-rgb), 0.3)` }}
              />
              <p className="text-text-secondary text-xs xs:text-sm sm:text-base md:text-sm lg:text-base leading-relaxed text-center">
                Luxury domes nestled in nature's embrace. Where adventure meets uncompromising comfort and breathtaking mountain views.
              </p>
            </div>
              </div>
            </div>
          </div>
            </motion.div>
          </Interactive3DCard>
        </Link>
        {/* LodgeCity Card */}
        <Link to="/lodge-city">
          <Interactive3DCard>
            <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
            >
          <div
            className="backdrop-blur-xl rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl lg:shadow-2xl transition-all duration-500 flex flex-col relative border"
            style={{
              background: `rgba(var(--background-rgb), ${theme === 'dark' ? '0.1' : '0.8'})`,
              borderColor: theme === 'dark'
            ? `rgba(255, 255, 255, 0.15)`
            : `rgba(var(--border-rgb), 0.4)`,
              borderWidth: '1px',
              borderStyle: 'solid',
              boxShadow: theme === 'dark'
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.3) sm:0 20px 40px -8px rgba(0, 0, 0, 0.4) lg:0 25px 50px -12px rgba(0, 0, 0, 0.4)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.15) sm:0 20px 40px -8px rgba(0, 0, 0, 0.2) lg:0 25px 50px -12px rgba(0, 0, 0, 0.25)'
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
            <div className="aspect-[5/4] xs:aspect-[4/3] sm:aspect-[16/10] md:aspect-[5/4] lg:aspect-[4/3] xl:aspect-[16/10] overflow-hidden relative">
              <motion.img
            src="https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="LodgeCity Luxury Suite"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500" />
            </div>
            {/* Content Section */}
            <div className="p-3 xs:p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 relative">
              {/* Always visible title */}
              <div className="relative z-20">
            <h3 className="text-lg xs:text-xl sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl font-light mb-1 sm:mb-2 group-hover:translate-x-1 transition-transform duration-300 text-text">
              LodgeCity
            </h3>
            <div className="flex items-center font-medium cursor-pointer text-xs xs:text-sm sm:text-base md:text-sm lg:text-base group-hover:translate-x-2 transition-transform duration-300" style={{ color: 'var(--primary)' }}>
              Discover City Life <ArrowRight size={14} className="xs:w-4 xs:h-4 sm:w-[18px] sm:h-[18px] md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] ml-1 sm:ml-2" />
            </div>
              </div>
              {/* Expanding description - iOS style */}
              <div className="overflow-hidden max-h-0 group-hover:max-h-24 sm:group-hover:max-h-28 lg:group-hover:max-h-32 transition-all duration-500 ease-out">
            <div
              className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 delay-100 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t"
              style={{ borderColor: `rgba(var(--border-rgb), 0.3)` }}
            >
              {/* iOS-style handle */}
              <div
                className="h-0.5 sm:h-1 w-8 sm:w-12 rounded-full mx-auto mb-2 sm:mb-3"
                style={{ background: `rgba(var(--text-rgb), 0.3)` }}
              />
              <p className="text-text-secondary text-xs xs:text-sm sm:text-base md:text-sm lg:text-base leading-relaxed text-center">
                Urban luxury redefined. Experience the pulse of the city in our curated suites, blending modern design with comfort.
              </p>
            </div>
              </div>
            </div>
          </div>
            </motion.div>
          </Interactive3DCard>
        </Link>
          </div>
        </div>
      </section>

      {/* --- Features Section with 3D Background --- */}
      <section 
        className="py-16 xs:py-20 sm:py-24 md:py-28 lg:py-32 px-3 xs:px-4 sm:px-6 relative overflow-hidden transition-all duration-300"
        style={{
          background: theme === 'dark' 
        ? 'linear-gradient(135deg, rgba(var(--background-secondary-rgb), 1) 0%, rgba(var(--background-rgb), 1) 50%, rgba(var(--background-secondary-rgb), 1) 100%)'
        : 'linear-gradient(135deg, rgba(var(--background-secondary-rgb), 1) 0%, rgba(var(--background-rgb), 1) 50%, rgba(var(--background-secondary-rgb), 1) 100%)'
        }}
      >
        {/* 3D Background (Stars, Clouds, Spheres) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Scene3DErrorBoundary fallback={<Simple3DFallback />}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          className="absolute inset-0"
          dpr={[1, 2]}
          performance={{ min: 0.6 }}
          gl={{ 
            antialias: true,
            alpha: true,
            stencil: false,
            depth: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true
          }}
          shadows={false}
          frameloop="always"
        >
          <Suspense fallback={<Loader3D />}>
            <BackgroundSceneWithSpheres />
          </Suspense>
        </Canvas>
          </Scene3DErrorBoundary>
        </div>
        {/* Soft colored orbs overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-10">
          <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl" 
        style={{ background: 'var(--primary)' }}
          />
          <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" 
        style={{ background: 'var(--accent)' }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-20">
          <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        viewport={{ once: true }}
        className="text-center mb-16 xs:mb-20 sm:mb-24 md:mb-28"
          >
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin mb-6 xs:mb-8 sm:mb-10 text-text">
          Why Choose <span style={{ color: 'var(--primary)' }}>Excellence</span>
        </h2>
        <p className="text-text-secondary text-base xs:text-lg sm:text-xl max-w-4xl mx-auto font-light">
          Every detail crafted for your perfect escape.
        </p>
          </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xs:gap-8 sm:gap-10">
              {[
                {
                  icon: Award,
                  title: "Curated Perfection",
                  description: "Hand-selected properties that exceed the highest standards of luxury and comfort in both urban and natural settings.",
                  delay: 0.1,
                  color: "#a49760"
                },
                {
                  icon: MapPin,
                  title: "Prime Locations",
                  description: "Perfectly positioned in Pakistan and internationally in the most sought-after destinations.",
                  delay: 0.2,
                  color: "#6b7f3e"
                },
                {
                  icon: Heart,
                  title: "Personal Touch",
                  description: "24/7 concierge service ensuring every moment of your stay is extraordinary and memorable.",
                  delay: 0.3,
                  color: "#a49760"
                }
              ].map((feature, index) => (
                <Interactive3DCard key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: feature.delay, ease: [0.25, 0.1, 0.25, 1] }}
                    viewport={{ once: true }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="h-full flex flex-col backdrop-blur-xl p-6 xs:p-8 sm:p-9 lg:p-10 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl hover:shadow-2xl transition-all duration-500 group border relative overflow-hidden"
                    style={{
                      background: `rgba(var(--background-rgb), ${theme === 'dark' ? '0.1' : '0.8'})`,
                      borderColor: theme === 'dark'
                        ? `rgba(255, 255, 255, 0.15)`
                        : `rgba(var(--border-rgb), 0.4)`,
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      boxShadow: theme === 'dark'
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
                        : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `rgba(var(--background-rgb), ${theme === 'dark' ? '0.15' : '0.9'})`;
                      e.currentTarget.style.borderColor = `rgba(var(--${feature.color === '#a49760' ? 'primary' : 'accent'}-rgb), 0.6)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `rgba(var(--background-rgb), ${theme === 'dark' ? '0.1' : '0.8'})`;
                      e.currentTarget.style.borderColor = theme === 'dark'
                        ? `rgba(255, 255, 255, 0.15)`
                        : `rgba(var(--border-rgb), 0.4)`;
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, var(--${feature.color === '#a49760' ? 'primary' : 'accent'}), transparent 70%)`
                      }}
                    />
                    <motion.div
                      className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl xs:rounded-2xl flex items-center justify-center mb-4 xs:mb-6 sm:mb-8 relative"
                      style={{
                        background: `rgba(var(--${feature.color === '#a49760' ? 'primary' : 'accent'}-rgb), ${theme === 'dark' ? '0.15' : '0.1'})`
                      }}
                    >
                      <feature.icon size={20} className="xs:w-6 xs:h-6 sm:w-7 sm:h-7" style={{ color: `var(--${feature.color === '#a49760' ? 'primary' : 'accent'})` }} />
                    </motion.div>
                    <h3 className="text-lg xs:text-xl sm:text-xl font-medium mb-3 xs:mb-4 sm:mb-6 relative text-text">{feature.title}</h3>
                    <p className="text-sm xs:text-base leading-relaxed relative text-text-secondary">{feature.description}</p>
                  </motion.div>
                </Interactive3DCard>
              ))}
            </div>
        </div>
      </section>

       {/* Final CTA Section - iOS style */}
       <section 
         className="py-16 xs:py-20 sm:py-24 md:py-28 lg:py-32 px-3 xs:px-4 sm:px-6 relative overflow-hidden transition-all duration-300"
       >
         <div 
           className="absolute inset-0"
           style={{
             background: theme === 'dark'
               ? 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.95) 0%, rgba(var(--accent-rgb), 0.9) 50%, rgba(var(--background-rgb), 1) 100%)'
               : 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.9) 0%, rgba(var(--accent-rgb), 0.85) 50%, rgba(var(--background-rgb), 1) 100%)'
           }}
         />
         <div 
           className="absolute inset-0" 
           style={{ 
             background: theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)'
           }}
         />
         
         {/* iOS-style floating elements */}
         <div className="absolute inset-0 overflow-hidden">
           <motion.div
             animate={{ 
               rotate: [0, 360],
               scale: [1, 1.15, 1]
             }}
             transition={{ 
               duration: 25, 
               repeat: Infinity, 
               ease: "linear" 
             }}
             className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-2xl"
             style={{
               background: `rgba(var(--background-rgb), ${theme === 'dark' ? '0.08' : '0.15'})`
             }}
           />
           <motion.div
             animate={{ 
               rotate: [360, 0],
               scale: [1.15, 1, 1.15]
             }}
             transition={{ 
               duration: 30, 
               repeat: Infinity, 
               ease: "linear" 
             }}
             className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
             style={{
               background: `rgba(var(--background-rgb), ${theme === 'dark' ? '0.06' : '0.12'})`
             }}
           />
         </div>
         
         <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
           viewport={{ once: true }}
           className="max-w-5xl mx-auto text-center relative z-10"
         >
           <motion.h2 
             className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin mb-8 xs:mb-12 sm:mb-16"
             whileInView={{ scale: [0.95, 1] }}
             transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
             style={{ 
               color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(var(--text-rgb), 1)'
             }}
           >
             Your Adventure Awaits
           </motion.h2>
           
           <motion.p 
             className="text-base xs:text-lg sm:text-xl mb-12 xs:mb-16 sm:mb-20 max-w-3xl mx-auto font-light leading-relaxed"
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 0.8 }}
             transition={{ delay: 0.3, duration: 0.8 }}
             style={{ 
               color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(var(--text-rgb), 0.8)'
             }}
           >
             Join thousands who've discovered that luxury and adventure aren't opposites — they're perfect partners waiting in Pakistan and internationally.
           </motion.p>
           
            <Interactive3DCard>
              <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 xs:px-8 sm:px-12 py-3 xs:py-4 sm:py-5 rounded-xl xs:rounded-2xl font-semibold shadow-2xl transition-all duration-400 text-base xs:text-lg relative overflow-hidden group backdrop-blur-xl border border-white/10"
              style={{
                background: theme === 'dark'
                ? 'rgba(255,255,255,0.12)'
                : 'rgba(255,255,255,0.35)',
                color: theme === 'dark'
                ? '#fff'
                : '#222222',
                boxShadow: theme === 'dark'
                ? '0 25px 50px -12px rgba(255,255,255,0.2)'
                : '0 25px 50px -12px rgba(0,0,0,0.3)',
                border: theme === 'dark'
                ? '1px solid rgba(255,255,255,0.15)'
                : '1px solid rgba(164,151,96,0.15)',
                WebkitBackdropFilter: 'blur(16px)',
                backdropFilter: 'blur(16px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = theme === 'dark'
                ? '0 35px 60px -12px rgba(255,255,255,0.3)'
                : '0 35px 60px -12px rgba(0,0,0,0.4)';
                e.currentTarget.style.background = theme === 'dark'
                ? 'rgba(255,255,255,0.18)'
                : 'rgba(255,255,255,0.45)';
                e.currentTarget.style.borderColor = theme === 'dark'
                ? 'rgba(164,151,96,0.25)'
                : 'rgba(164,151,96,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = theme === 'dark'
                ? '0 25px 50px -12px rgba(255,255,255,0.2)'
                : '0 25px 50px -12px rgba(0,0,0,0.3)';
                e.currentTarget.style.background = theme === 'dark'
                ? 'rgba(255,255,255,0.12)'
                : 'rgba(255,255,255,0.35)';
                e.currentTarget.style.borderColor = theme === 'dark'
                ? 'rgba(255,255,255,0.15)'
                : 'rgba(164,151,96,0.15)';
              }}
              >
              {/* Glass morph gradient overlay */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                background: theme === 'dark'
                  ? 'linear-gradient(135deg, rgba(164,151,96,0.08) 0%, rgba(107,127,62,0.08) 100%)'
                  : 'linear-gradient(135deg, rgba(164,151,96,0.12) 0%, rgba(107,127,62,0.12) 100%)',
                borderRadius: 'inherit',
                opacity: 0.9
                }}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.04, opacity: 1 }}
                transition={{ duration: 0.6 }}
              />
              {/* Glass morph highlight */}
              <motion.div
                className="absolute top-0 left-0 w-2/3 h-1/3 rounded-t-xl pointer-events-none"
                style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
                opacity: 0.7,
                filter: 'blur(8px)'
                }}
                initial={{ x: "-30%" }}
                whileHover={{ x: "10%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center"
                style={{
                color: theme === 'dark'
                  ? '#fff'
                  : '#222222'
                }}
              >
                Begin Your Journey
                <motion.div
                className="ml-3"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.3 }}
                >
                <ChevronRight size={18} className="text-[#a49760]" />
                </motion.div>
              </span>
              </motion.button>
            </Interactive3DCard>
           
           {/* Location indicators - iOS style */}
           <motion.div 
             className="flex justify-center gap-8 xs:gap-12 sm:gap-16 md:gap-20 mt-12 xs:mt-16 sm:mt-20"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.8 }}
           >
             {[
               { country: "International", cities: "Canada", flag: <FlagIcon country="International" size={24} /> },
               { country: "Pakistan", cities: "Lahore • Murree", flag: <FlagIcon country="Pakistan" size={24} /> }
             ].map((location, index) => (
               <motion.div
                 key={index}
                 whileHover={{ scale: 1.08, y: -3 }}
                 className="text-center cursor-default"
                 transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
               >
                 <div className="text-3xl mb-3">{location.flag}</div>
                 <div 
                   className="font-medium"
                   style={{ 
                     color: theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(var(--text-rgb), 0.9)'
                   }}
                 >
                   {location.country}
                 </div>
                 <div 
                   className="text-sm"
                   style={{ 
                     color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(var(--text-rgb), 0.6)'
                   }}
                 >
                   {location.cities}
                 </div>
               </motion.div>
             ))}
           </motion.div>
         </motion.div>
       </section>
     </div>
   );
};