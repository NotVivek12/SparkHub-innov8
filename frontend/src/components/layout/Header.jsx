
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Settings, LogOut, Menu, X, Home, Users, MessageCircle, Plus, Moon, Sun } from 'lucide-react';

// Custom hook to handle clicks outside of a component
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

// Mock user and notification data
const mockUser = {
  name: 'Samee',
  role: 'student',
  avatar: 'S',
};

const mockNotifications = [
  { id: 1, text: 'Your idea "Quantum Leaps" was approved!', read: false },
  { id: 2, text: 'John commented on your post.', read: true },
  { id: 3, text: 'You have a new mentor assigned.', read: false },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initially set to true to demonstrate the profile menu.
  // In a real app, this would be determined by your authentication state.
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user] = useState(mockUser);
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(mockNotifications);
  const [searchQuery, setSearchQuery] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const profileDropdownRef = useRef(null);
  const notificationsDropdownRef = useRef(null);
  
  useClickOutside(profileDropdownRef, () => setIsProfileOpen(false));
  useClickOutside(notificationsDropdownRef, () => setIsNotificationsOpen(false));

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const getUnreadNotificationCount = () => notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    navigate('/');
  };

  const handleProtectedNavigation = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/login');
    }
    setIsMenuOpen(false); // Close mobile menu after navigating
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home, isProtected: false },
    { name: 'Community', href: '/community', icon: MessageCircle, isProtected: false },
    { name: user?.role === 'mentor' ? 'Mentor Dashboard' : 'Dashboard', href: user?.role === 'mentor' ? '/mentor-dashboard' : '/student-dashboard', icon: Users, isProtected: true },
    { name: 'Submit Idea', href: '/submit-idea', icon: Plus, isProtected: true }
  ];

  const unreadCount = getUnreadNotificationCount();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-3 flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-500">SparkHub</span>
                <div className="text-xs text-gray-500 dark:text-gray-400 -mt-1 transition-colors duration-500">Innovation Platform</div>
              </div>
            </Link>
          </motion.div>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.href;
              const linkProps = (item.isProtected && !isAuthenticated)
                ? { to: '/login', onClick: handleProtectedNavigation }
                : { to: item.href };

              return (
                <Link
                  key={index}
                  {...linkProps}
                  className={`flex items-center gap-2 px-4 py-2 mx-2 rounded-full transition-all duration-200 font-medium ${isActive
                    ? 'text-white bg-blue-600 shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Search Bar (Desktop) */}
            <div className="hidden md:block relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-40 pl-9 pr-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-transparent dark:border-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                />
              </form>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-500" />}
            </motion.button>

            {/* Conditional rendering based on authentication state */}
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative dropdown" ref={notificationsDropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
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
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl"
                    >
                      {notifications.length > 0 ? (
                        <div className="divide-y divide-gray-200 dark:divide-gray-700">
                          {notifications.map(notification => (
                            <div
                              key={notification.id}
                              onClick={() => markNotificationAsRead(notification.id)}
                              className={`p-4 transition-colors ${!notification.read ? 'bg-blue-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'} hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}
                            >
                              <p className={`text-sm ${!notification.read ? 'font-medium text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                {notification.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-gray-400">
                          <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                          <p>No notifications yet</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative dropdown" ref={profileDropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user?.avatar || user?.name?.charAt(0) || 'U'}
                    </div>
                  </motion.button>

                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden"
                    >
                      <div className="p-4 bg-gray-100 dark:bg-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user?.avatar || user?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                            <p className="text-blue-600 dark:text-blue-300 text-sm capitalize">{user?.role}</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link to="/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </Link>
                        <hr className="my-2 border-gray-200 dark:border-gray-700" />
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
              <div className="hidden lg:flex items-center gap-3">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform font-medium shadow-md">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden border-t border-gray-200 dark:border-gray-800 py-4 overflow-hidden">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </form>
            </div>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              {navItems.map((item, index) => {
                const isActive = location.pathname === item.href;
                const linkProps = (item.isProtected && !isAuthenticated)
                  ? { to: '/login', onClick: handleProtectedNavigation }
                  : { to: item.href, onClick: () => setIsMenuOpen(false) };

                return (
                  <Link
                    key={index}
                    {...linkProps}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                      ? 'text-white bg-blue-600'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
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
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4 space-y-2">
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block text-center py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium">
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