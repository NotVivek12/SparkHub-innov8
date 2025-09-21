import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Lightbulb, MessageCircle, User, Plus, Award, PanelRight } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navigation = ({ className = '' }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { 
      name: 'Home', 
      href: '/', 
      icon: Home, 
      description: 'Main page',
      gradient: 'from-blue-400 to-indigo-500'
    },
    { 
      name: 'Community', 
      href: '/community', 
      icon: MessageCircle,
      description: 'Connect with others',
      gradient: 'from-purple-400 to-pink-500'
    },
    ...(isAuthenticated ? [
      { 
        name: user?.role === 'mentor' ? 'Mentor' : 'Dashboard', 
        href: user?.role === 'mentor' ? '/mentor-dashboard' : '/student-dashboard', 
        icon: user?.role === 'mentor' ? Award : PanelRight,
        description: user?.role === 'mentor' ? 'Mentor dashboard' : 'Your projects',
        gradient: 'from-emerald-400 to-cyan-500'
      },
      { 
        name: 'Create', 
        href: '/submit-idea', 
        icon: Plus,
        description: 'Submit new idea',
        gradient: 'from-amber-400 to-orange-500'
      },
      { 
        name: 'Profile', 
        href: '/profile', 
        icon: User,
        description: 'Your account',
        gradient: 'from-sky-400 to-blue-500'
      },
    ] : [])
  ];

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.href === location.pathname);
    if (currentIndex !== -1) setActiveIndex(currentIndex);
  }, [location.pathname, navItems]);

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`
        fixed bottom-0 left-0 right-0 z-50 md:hidden
        glass-strong border-t border-gray-700/30 backdrop-blur-xl shadow-large
        ${className}
      `}
    >
      <div className="flex items-center justify-around py-3 px-4">
        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setActiveIndex(index)}
              className="relative flex flex-col items-center p-3 rounded-xl transition-all duration-200"
            >
              {/* Active background */}
              {isActive && (
                <motion.div
                  layoutId="activeBackground"
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-xl shadow-lg opacity-90 pointer-events-none`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{ scale: isActive ? 1.2 : 1, y: isActive ? -4 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
                className="relative z-10"
              >
                <item.icon 
                  className={isActive 
                    ? "w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"
                    : "w-6 h-6 text-gray-400 transition-all duration-300"
                  }
                  strokeWidth={isActive ? 2.5 : 2} 
                />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{ fontSize: isActive ? '0.8rem' : '0.65rem', fontWeight: isActive ? '600' : '400', opacity: isActive ? 1 : 0.7, y: isActive ? 1 : 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`mt-1.5 text-center relative z-10 whitespace-nowrap ${isActive ? 'text-white' : 'text-gray-400'}`}
              >
                {item.name}
              </motion.span>

              {/* Tooltip */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -42, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.9 }}
                    className="absolute bottom-full mb-1 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg shadow-lg whitespace-nowrap z-20 pointer-events-none"
                  >
                    {item.description}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-1 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.7)] pointer-events-none"
                />
              )}

              {/* Ripple overlay */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-xl opacity-0 pointer-events-none"
                animate={isActive ? { opacity: [0, 0.4, 0] } : {}}
                transition={{ duration: 0.5 }}
              />
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center pb-2">
        <motion.div 
          whileHover={{ width: "40%", opacity: 0.8 }}
          transition={{ duration: 0.3 }}
          className="w-32 h-1 bg-gray-600/60 rounded-full backdrop-blur-sm pointer-events-none"
        />
      </div>
    </motion.nav>
  );
};

export default Navigation;