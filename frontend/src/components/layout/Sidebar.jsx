import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Users, Lightbulb, MessageCircle, User, Settings,
  ChevronLeft, ChevronRight, Bell, Search, Plus, 
  TrendingUp, Award, BookOpen, Calendar
} from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useUIStore from '../../store/uiStore';

const Sidebar = ({ isOpen, onToggle, className = '' }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  const { notifications, getUnreadNotificationCount } = useUIStore();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const unreadCount = getUnreadNotificationCount();

  // Navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { name: 'Home', href: '/', icon: Home, description: 'Dashboard overview' },
      { name: 'Community', href: '/community', icon: MessageCircle, description: 'Browse ideas & discussions' },
    ];

    if (!isAuthenticated) return baseItems;

    if (user?.role === 'student') {
      return [
        ...baseItems,
        { name: 'My Dashboard', href: '/student-dashboard', icon: Users, description: 'Your projects & progress' },
        { name: 'Submit Idea', href: '/submit-idea', icon: Plus, description: 'Create new project' },
        { name: 'My Projects', href: '/my-projects', icon: Lightbulb, description: 'Manage your ideas' },
        { name: 'Learning', href: '/learning', icon: BookOpen, description: 'Resources & tutorials' },
        { name: 'Calendar', href: '/calendar', icon: Calendar, description: 'Schedule & meetings' }
      ];
    }

    if (user?.role === 'mentor') {
      return [
        ...baseItems,
        { name: 'Mentor Dashboard', href: '/mentor-dashboard', icon: Users, description: 'Your mentorships' },
        { name: 'Find Students', href: '/find-students', icon: Search, description: 'Browse student projects' },
        { name: 'My Mentorships', href: '/mentorships', icon: Award, description: 'Active mentoring' },
        { name: 'Analytics', href: '/analytics', icon: TrendingUp, description: 'Impact & metrics' },
        { name: 'Calendar', href: '/calendar', icon: Calendar, description: 'Schedule & meetings' }
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -320, opacity: 0 }
  };

  const itemVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -20, opacity: 0 }
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed left-0 top-0 h-full z-50 glass border-r border-gray-700/50
          ${isCollapsed ? 'w-16' : 'w-80'} 
          lg:relative lg:translate-x-0 ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gradient">SparkHub</h2>
                <p className="text-xs text-gray-400">Innovation Platform</p>
              </div>
            </motion.div>
          )}
          
          <div className="flex items-center gap-2">
            {/* Notifications */}
            {isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
            )}

            {/* Collapse Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCollapseToggle}
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700/50"
            >
              {isCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* User Profile Section */}
        {isAuthenticated && (
          <motion.div 
            className="p-4 border-b border-gray-700/50"
            variants={itemVariants}
          >
            <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                {user?.avatar || user?.name?.charAt(0) || 'U'}
              </div>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="font-semibold text-white truncate">{user?.name}</p>
                  <p className="text-sm text-gray-400 capitalize">{user?.role}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-green-400">Online</span>
                  </div>
                </motion.div>
              )}
            </div>

            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-4 grid grid-cols-2 gap-2 text-center"
              >
                <div className="bg-gray-800/50 rounded-lg p-2">
                  <div className="text-sm font-bold text-blue-400">
                    {user?.role === 'student' ? '3' : '8'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {user?.role === 'student' ? 'Projects' : 'Mentorships'}
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-2">
                  <div className="text-sm font-bold text-green-400">
                    {user?.role === 'student' ? '2' : '5'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {user?.role === 'student' ? 'Active' : 'Completed'}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.href;
            
            return (
              <motion.div
                key={item.href}
                variants={itemVariants}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={item.href}
                  onClick={onToggle}
                  className={`
                    group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-primary text-white shadow-lg shadow-blue-500/25' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }
                    ${isCollapsed ? 'justify-center' : ''}
                  `}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                  
                  {!isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 min-w-0"
                    >
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        {item.description}
                      </div>
                    </motion.div>
                  )}

                  {isCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
                    >
                      {item.name}
                      <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-0 h-0 border-r-4 border-r-gray-800 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
                    </motion.div>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 p-4 space-y-2">
          {isAuthenticated && (
            <>
              <Link
                to="/profile"
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-gray-700/50
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <User className="w-5 h-5" />
                {!isCollapsed && <span>Profile</span>}
              </Link>
              
              <Link
                to="/settings"
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-300 hover:text-white hover:bg-gray-700/50
                  ${isCollapsed ? 'justify-center' : ''}
                `}
              >
                <Settings className="w-5 h-5" />
                {!isCollapsed && <span>Settings</span>}
              </Link>
            </>
          )}

          {/* Footer info */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-4 mt-4 border-t border-gray-700/50"
            >
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">
                  SparkHub v1.0.0
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Resize handle */}
        <div className="absolute right-0 top-0 bottom-0 w-1 bg-transparent hover:bg-blue-500/50 transition-colors cursor-col-resize group">
          <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-8 bg-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;