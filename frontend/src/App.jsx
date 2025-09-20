import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Navigation';
import ParticleBackground from './components/animations/ParticleBackground';
import FloatingElements from './components/animations/FloatingElements';
import MorphingShapes from './components/animations/MorphingShapes';
import PageTransition from './components/animations/PageTransitions';
import LoadingSpinner from './components/ui/LoadingSpinner';
import TailwindTest from './components/TailwindTest';
import useUIStore from './store/uiStore';
import useAuthStore from './store/authStore';

function App() {
  const { theme, globalLoading } = useUIStore();
  const { initializeMockUser, isAuthenticated } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const [isLowPerformanceDevice, setIsLowPerformanceDevice] = useState(false);
  
  // Initialize app
  useEffect(() => {
    const initApp = async () => {
      try {
        // Add a smooth startup animation delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Auto-login for development (uncomment one)
        // initializeMockUser('student');
        // initializeMockUser('mentor');
        
        setIsInitializing(false);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsInitializing(false);
      }
    };

    initApp();
  }, [initializeMockUser]);

  // Apply theme to document
  useEffect(() => {
    console.log('Theme changed to:', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Also add/remove a class on the document for Tailwind dark mode support
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    }
  }, [theme]);
  
  // Detect low performance devices
  useEffect(() => {
    // Simple detection based on browser/platform indicators
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    
    const isOlderDevice = 
      // Older browsers
      /MSIE|Trident|Edge\/(?:12|13|14|15|16|17)/i.test(navigator.userAgent) ||
      // Check for low-memory devices
      (navigator.deviceMemory && navigator.deviceMemory < 4);
    
    // Test animation performance
    let start = performance.now();
    let framesCount = 0;
    let testTimer;
    
    const testFrame = () => {
      framesCount++;
      const elapsed = performance.now() - start;
      
      if (elapsed < 1000) {
        testTimer = requestAnimationFrame(testFrame);
      } else {
        const fps = framesCount / (elapsed / 1000);
        // If FPS is below threshold, consider it a low performance device
        setIsLowPerformanceDevice(fps < 40 || isMobile || isOlderDevice);
        cancelAnimationFrame(testTimer);
      }
    };
    
    testTimer = requestAnimationFrame(testFrame);
    
    return () => {
      if (testTimer) {
        cancelAnimationFrame(testTimer);
      }
    };
  }, []);

  // Prevent zoom on mobile inputs
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      );
    }
  }, []);

  // Show loading screen during initialization
  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute rounded-full w-96 h-96 bg-primary-500/20 blur-3xl -top-32 -left-32" />
            <div className="absolute rounded-full w-96 h-96 bg-indigo-500/20 blur-3xl top-1/2 right-0" />
            <div className="absolute rounded-full w-96 h-96 bg-cyan-500/20 blur-3xl bottom-0 left-1/3" />
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
          className="text-center z-10 px-6"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            }}
            className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-glow"
          >
            <span className="text-white font-bold text-4xl">S</span>
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: { delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            }}
            className="text-4xl font-bold mb-2"
          >
            <span className="bg-gradient-primary bg-clip-text text-transparent">SparkHub</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              transition: { delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
            }}
            className="text-blue-300 font-medium mb-8"
          >
            Innovation Platform
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              transition: { delay: 0.7, duration: 0.6 }
            }}
          >
            <LoadingSpinner size="lg" />
            <p className="text-gray-400 mt-4">Initializing your innovation platform...</p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background Effects - adjust based on device performance */}
      {!prefersReducedMotion && (
        <>
          <ParticleBackground 
            particleCount={isLowPerformanceDevice ? 40 : 80} 
            interactionMode="attract" 
          />
          <MorphingShapes 
            shapeCount={isLowPerformanceDevice ? 4 : 7} 
            colorMode="blue" 
          />
          {!isLowPerformanceDevice && <FloatingElements />}
        </>
      )}
      
      {/* Gradient Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>
      
      {/* Global Loading Overlay */}
      <AnimatePresence>
        {globalLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100] flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center glass p-8 rounded-2xl border border-gray-800/50 shadow-2xl max-w-md"
            >
              <LoadingSpinner size="xl" />
              <p className="text-white mt-4 font-medium text-lg">Loading...</p>
              <p className="text-gray-400 mt-2 text-sm">Please wait while we prepare your content</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 pt-20 pb-20 md:pb-0"
        >
          {/* Tailwind CSS Test Component */}
          {/* <div className="container mx-auto px-4 py-8 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 shadow-lg">
              <TailwindTest />
            </div>
          </div> */}
          <PageTransition>
            <Outlet />
          </PageTransition>
        </motion.main>
        
        <Footer />
        
        {/* Mobile Navigation - Only show when authenticated */}
        {isAuthenticated && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Navigation />
          </motion.div>
        )}
      </div>

      {/* Background Pattern Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Subtle animated gradient border */}
      <div className="fixed inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-10 animate-shimmer" />

      {/* Performance monitoring overlay (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 glass-sm rounded-lg p-3 text-xs text-gray-400 z-50 border border-gray-800/30 shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-blue-400' : 'bg-amber-400'}`} />
            <div>Theme: {theme}</div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${isAuthenticated ? 'bg-green-400' : 'bg-gray-400'}`} />
            <div>Auth: {isAuthenticated ? 'Yes' : 'No'}</div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${globalLoading ? 'bg-purple-400 animate-pulse' : 'bg-gray-400'}`} />
            <div>Loading: {globalLoading ? 'Yes' : 'No'}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLowPerformanceDevice ? 'bg-amber-400' : 'bg-green-400'}`} />
            <div>Performance: {isLowPerformanceDevice ? 'Optimized' : 'High'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;