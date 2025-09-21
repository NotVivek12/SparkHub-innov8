import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search, Bell, User, Settings, LogOut, Menu, X,
  Home, Users, Lightbulb, MessageCircle, Plus, Moon, Sun
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const {
    theme,
    toggleTheme,
    notifications,
    getUnreadNotificationCount,
    searchQuery,
    setSearchQuery,
    setSearchActive
  } = useUIStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const searchInputRef = useRef(null);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Community', href: '/community', icon: MessageCircle },
    ...(isAuthenticated ? [
      {
        name: user?.role === 'mentor' ? 'Mentor Dashboard' : 'Dashboard',
        href: user?.role === 'mentor' ? '/mentor-dashboard' : '/student-dashboard',
        icon: Users
      },
      { name: 'Submit Idea', href: '/submit-idea', icon: Plus },
    ] : [])
  ];

  const unreadCount = getUnreadNotificationCount();

  // Handle search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchActive(true);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate('/');
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800/50 shadow-large"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-2xl">S</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">SparkHub</span>
                <div className="text-xs text-gray-400 -mt-1">Innovation Platform</div>
              </div>
            </Link>
          </motion.div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ideas, mentors, projects..."
                  className="
                    w-full pl-12 pr-12 py-3 
                    bg-gray-800/60 border border-gray-700 rounded-xl 
                    text-white placeholder-gray-400 
                    focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none 
                    transition-all duration-200 
                    hover:bg-gray-800/80
                  "
                />
                {searchQuery && (
                  <motion.button
                    type="button"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={index}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                      ? 'text-blue-400 bg-blue-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                console.log('Toggle theme clicked, current theme:', theme);
                toggleTheme();
              }}
              className="p-2 bg-gray-800 dark:bg-gray-700 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/70 dark:hover:bg-gray-600 border border-gray-700"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-400" />}
            </motion.button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative dropdown">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                      >
                        {unreadCount}
                      </motion.span>
                    )}
                  </motion.button>

                  {/* Notifications Dropdown */}
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-80 glass rounded-xl border border-gray-700 shadow-2xl"
                    >
                      <div className="p-4 border-b border-gray-700">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-white">Notifications</h3>
                          {unreadCount > 0 && (
                            <span className="text-xs text-gray-400">{unreadCount} unread</span>
                          )}
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                          notifications.slice(0, 5).map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-700/50 last:border-b-0 hover:bg-gray-700/30 transition-colors ${!notification.read ? 'bg-blue-500/10' : ''
                                }`}
                            >
                              <p className="text-white text-sm">{notification.message}</p>
                              <p className="text-gray-400 text-xs mt-1">
                                {new Date(notification.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-400">
                            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>No notifications yet</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative dropdown">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user?.avatar || user?.name?.charAt(0) || 'U'}
                    </div>
                    <span className="hidden sm:block text-white font-medium">{user?.name}</span>
                  </motion.button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-64 glass rounded-xl border border-gray-700 shadow-2xl overflow-hidden"
                    >
                      {/* Profile Header */}
                      <div className="p-4 bg-gradient-primary/20">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                            {user?.avatar || user?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-white">{user?.name}</p>
                            <p className="text-blue-300 text-sm capitalize">{user?.role}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                        <hr className="my-2 border-gray-700" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              /* Auth Buttons */
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-700/50"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-gradient-primary text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-700 py-4"
          >
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </form>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                        ? 'text-blue-400 bg-blue-500/20'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                      }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth */}
            {!isAuthenticated && (
              <div className="pt-4 border-t border-gray-700 mt-4 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center py-3 text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center bg-gradient-primary text-white py-3 rounded-lg font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;