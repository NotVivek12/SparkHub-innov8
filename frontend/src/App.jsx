import { Outlet } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Home, Users, Lightbulb, MessageCircle, User, Menu, X, Sun, Moon } from 'lucide-react';
import Header from './components/layout/Header';

function App() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // 1. Authentication state is now managed here
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 2. Handlers to change the authentication state
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Toggle theme function
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Apply theme class to html element
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDark]);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Community', href: '/community', icon: MessageCircle },
    { name: 'Student Dashboard', href: '/student-dashboard', icon: Users },
    { name: 'Submit Idea', href: '/submit-idea', icon: Lightbulb },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-200">
      {/* 3. Pass isAuthenticated and handleLogout to the Header */}
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/* Main Content */}
      <main className="pt-0">
        {/* A temporary button to test the auth flow. Remove this later. */}
        <div className="flex justify-center p-4">
          <button 
            onClick={isAuthenticated ? handleLogout : handleLogin} 
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
          >
            {isAuthenticated ? 'Log Out' : 'Simulate Log In'}
          </button>
        </div>
        <Outlet />
      </main>

      {/* Detailed Footer */}
      <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
        {/* Stats Section */}
        <div className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Active Students', value: '10,000+', icon: Users },
                { label: 'Expert Mentors', value: '500+', icon: Users },
                { label: 'Projects Created', value: '2,500+', icon: Lightbulb },
                { label: 'Success Stories', value: '150+', icon: MessageCircle }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <stat.icon className="w-8 h-8 text-blue-500 dark:text-blue-400 transition-colors duration-200" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 transition-colors duration-200 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">SparkHub</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200 mb-6 leading-relaxed">
                  Transforming student ideas into real-world innovations through 
                  mentorship, collaboration, and structured guidance.
                </p>
                <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200 mb-4">
                  <strong className="text-blue-500 dark:text-blue-400 transition-colors duration-200">From Classroom Concept to Real-World Creation</strong>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="text-gray-900 dark:text-white transition-colors duration-200 font-semibold mb-3">Stay Updated</h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none text-sm transition-colors duration-200"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-gray-900 dark:text-white transition-colors duration-200 font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-white transition-colors duration-200">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.747 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z.005-.001z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-1">
              <h4 className="text-gray-900 dark:text-white transition-colors duration-200 font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link to="/how-it-works" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">How it Works</Link></li>
                <li><Link to="/students" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">For Students</Link></li>
                <li><Link to="/mentors" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">For Mentors</Link></li>
                <li><Link to="/success-stories" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Success Stories</Link></li>
                <li><Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Pricing</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-gray-900 dark:text-white transition-colors duration-200 font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/docs" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Documentation</Link></li>
                <li><Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Help Center</Link></li>
                <li><Link to="/community" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Community</Link></li>
                <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Blog</Link></li>
                <li><Link to="/api" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">API Reference</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-gray-900 dark:text-white transition-colors duration-200 font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">About Us</Link></li>
                <li><Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Careers</Link></li>
                <li><Link to="/press" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Press</Link></li>
                <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Contact</Link></li>
                <li><Link to="/partners" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Partners</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-gray-900 dark:text-white transition-colors duration-200 font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Terms of Service</Link></li>
                <li><Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Cookie Policy</Link></li>
                <li><Link to="/conduct" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 text-sm block py-1">Code of Conduct</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-12 transition-colors duration-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 transition-colors duration-200 text-sm">
                <span>&copy; 2024 SparkHub. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  Built with ❤️ for innovators
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>All systems operational</span>
                </div>
                <span>v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;