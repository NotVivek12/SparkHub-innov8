import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Lightbulb, MessageCircle, User, Plus } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navigation = ({ className = '' }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Community', href: '/community', icon: MessageCircle },
    ...(isAuthenticated ? [
      { 
        name: user?.role === 'mentor' ? 'Dashboard' : 'Dashboard', 
        href: user?.role === 'mentor' ? '/mentor-dashboard' : '/student-dashboard', 
        icon: Users 
      },
      { name: 'Submit', href: '/submit-idea', icon: Plus },
      { name: 'Profile', href: '/profile', icon: User },
    ] : [])
  ];

  // Update active index based on current route
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.href === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname, navItems]);

  return (
    <motion.nav 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`
        fixed bottom-0 left-0 right-0 z-50 md:hidden
        glass border-t border-gray-700/50 backdrop-blur-xl
        ${className}
      `}
    >
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item, index) => {
          const isActive = index === activeIndex;
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className="relative flex flex-col items-center p-3 rounded-xl transition-all duration-200 min-w-0"
              onClick={() => setActiveIndex(index)}
            >
              {/* Background for active item */}
              {isActive && (
                <motion.div
                  layoutId="activeBackground"
                  className="absolute inset-0 bg-gradient-primary rounded-xl shadow-lg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              {/* Icon */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  y: isActive ? -2 : 0
                }}
                transition={{ duration: 0.2 }}
                className="relative z-10"
              >
                <item.icon 
                  className={`
                    w-6 h-6 transition-colors duration-200
                    ${isActive ? 'text-white' : 'text-gray-400'}
                  `} 
                />
              </motion.div>

              {/* Label */}
              <motion.span
                animate={{
                  fontSize: isActive ? '0.75rem' : '0.625rem',
                  fontWeight: isActive ? '600' : '400',
                  opacity: isActive ? 1 : 0.7
                }}
                transition={{ duration: 0.2 }}
                className={`
                  mt-1 text-center leading-tight relative z-10 whitespace-nowrap
                  ${isActive ? 'text-white' : 'text-gray-400'}
                `}
              >
                {item.name}
              </motion.span>

              {/* Active indicator dot */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 w-2 h-2 bg-white rounded-full"
                />
              )}

              {/* Ripple effect on tap */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-xl opacity-0"
                animate={isActive ? { opacity: [0, 0.3, 0] } : {}}
                transition={{ duration: 0.6 }}
              />
            </Link>
          );
        })}
      </div>

      {/* Home indicator line for iPhone-style */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </motion.nav>
  );
};

export default Navigation;