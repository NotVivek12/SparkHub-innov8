import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Navigation from './components/layout/Navigation';
import ParticleBackground from './components/animations/ParticleBackground';
import FloatingElements from './components/animations/FloatingElements';
import MorphingShapes from './components/animations/MorphingShapes';
import PageTransition from './components/animations/PageTransitions';
import LoadingSpinner from './components/ui/LoadingSpinner';
import useUIStore from './store/uiStore';
import useAuthStore from './store/authStore';

function App() {
  const { theme, globalLoading } = useUIStore();
  const { initializeMockUser, isAuthenticated } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  // Initialize app
  useEffect(() => {
    const initApp = async () => {
      try {
        // Simulate initialization delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
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
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f172a' : '#ffffff');
    }
  }, [theme]);

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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <span className="text-white font-bold text-3xl">S</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient mb-4">SparkHub</h1>
          <LoadingSpinner size="lg" />
          <p className="text-gray-400 mt-4">Initializing your innovation platform...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 relative">
      {/* Background Effects */}
      <ParticleBackground particleCount={50} />
      <FloatingElements />
      <MorphingShapes shapeCount={5} />
      
      {/* Global Loading Overlay */}
      <AnimatePresence>
        {globalLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[100] flex items-center justify-center"
          >
            <div className="text-center">
              <LoadingSpinner size="xl" />
              <p className="text-white mt-4">Loading...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 pt-20 pb-20 md:pb-0">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
        
        <Footer />
        
        {/* Mobile Navigation - Only show when authenticated */}
        {isAuthenticated && <Navigation />}
      </div>

      {/* Background Pattern Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Performance monitoring overlay (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 glass rounded-lg p-2 text-xs text-gray-400 z-50">
          <div>Theme: {theme}</div>
          <div>Auth: {isAuthenticated ? 'Yes' : 'No'}</div>
          <div>Loading: {globalLoading ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  );
}

export default App;