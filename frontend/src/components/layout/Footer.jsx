import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Github, Twitter, Linkedin, Mail, Heart, 
  ArrowUp, Lightbulb, Users, MessageCircle, ChevronRight,
  Globe, ShieldCheck, Award, LifeBuoy, BookOpen, Code,
  Star, Tag, FileText, Info, Briefcase, Newspaper, Phone, 
  Handshake, Cookie, UserCheck
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    Platform: [
      { name: 'How it Works', href: '/how-it-works', icon: Lightbulb },
      { name: 'For Students', href: '/students', icon: Users },
      { name: 'For Mentors', href: '/mentors', icon: Award },
      { name: 'Success Stories', href: '/success-stories', icon: Star },
      { name: 'Pricing', href: '/pricing', icon: Tag }
    ],
    Resources: [
      { name: 'Documentation', href: '/docs', icon: BookOpen },
      { name: 'Help Center', href: '/help', icon: LifeBuoy },
      { name: 'Community', href: '/community', icon: MessageCircle },
      { name: 'Blog', href: '/blog', icon: FileText },
      { name: 'API Reference', href: '/api', icon: Code }
    ],
    Company: [
      { name: 'About Us', href: '/about', icon: Info },
      { name: 'Careers', href: '/careers', icon: Briefcase },
      { name: 'Press', href: '/press', icon: Newspaper },
      { name: 'Contact', href: '/contact', icon: Phone },
      { name: 'Partners', href: '/partners', icon: Handshake }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy', icon: ShieldCheck },
      { name: 'Terms of Service', href: '/terms', icon: FileText },
      { name: 'Cookie Policy', href: '/cookies', icon: Cookie },
      { name: 'Code of Conduct', href: '/conduct', icon: UserCheck }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/sparkhub', color: 'hover:bg-[#2D333B]' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/sparkhub', color: 'hover:bg-[#1DA1F2]' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/sparkhub', color: 'hover:bg-[#0A66C2]' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@sparkhub.com', color: 'hover:bg-gradient-primary' }
  ];

  const stats = [
    { label: 'Active Students', value: '10,000+', icon: Users },
    { label: 'Expert Mentors', value: '500+', icon: Award },
    { label: 'Projects Created', value: '2,500+', icon: Lightbulb },
    { label: 'Success Stories', value: '150+', icon: MessageCircle }
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800/50 relative overflow-hidden">
      {/* Modern Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-[100px]"></div>
        <div className="absolute -top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-500/5 blur-[100px]"></div>
      </div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoLTZ2LTZoNnptLTYtMTJ2Nmg2di02aC02em0xMiA2aDZ2LTZoLTZ2NnptLTYgNnY2aDZ2LTZoLTZ6bTYgNnY2aDZ2LTZoLTZ6bTYtMTJ2LTZoLTZ2Nmg2em0wIDZ2LTZoLTZ2Nmg2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
      
      {/* Stats Section - Modern Cards */}
      <div className="relative border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-subtle p-6 rounded-2xl border border-white/5 shadow-soft"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-3 w-12 h-12 rounded-xl bg-gradient-primary/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content - Modern Layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <Link to="/" className="inline-block mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                    <span className="text-white font-bold text-2xl">S</span>
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">SparkHub</div>
                    <div className="text-xs text-gray-400 -mt-1">Innovation Platform</div>
                  </div>
                </div>
              </Link>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Transforming student ideas into real-world innovations through 
                mentorship, collaboration, and structured guidance.
              </p>
              
              <div className="flex items-center gap-2 text-sm text-primary-300 mb-6">
                <Globe className="w-4 h-4" />
                <span>From Classroom Concept to Real-World Creation</span>
              </div>
            </motion.div>

            {/* Newsletter Signup - Modern Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                Stay Updated
              </h4>
              
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800/60 border border-gray-700/70 rounded-xl text-white placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none text-sm"
                />
                <button className="bg-gradient-primary text-white px-5 py-3 rounded-xl hover:shadow-glow transition-all text-sm font-medium btn-shimmer">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                We'll never share your email. Unsubscribe at any time.
              </p>
            </motion.div>

            {/* Social Links - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary-400" />
                Connect With Us
              </h4>
              
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-gray-400 hover:text-white ${social.color} transition-all shadow-soft`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Links - Modern Styling */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="lg:col-span-1"
            >
              <h4 className="text-white font-semibold mb-5 pb-2 border-b border-gray-800/50">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="group flex items-center gap-2 text-gray-300 hover:text-primary-300 transition-colors text-sm py-1"
                    >
                      {link.icon && <link.icon className="w-4 h-4 opacity-70 group-hover:opacity-100" />}
                      <span>{link.name}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-gray-800/50 pt-8 mt-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-3 text-gray-400 text-sm order-2 md:order-1">
              <span>&copy; 2024 SparkHub. All rights reserved.</span>
              <span className="hidden md:flex items-center gap-1 text-gray-500">•</span>
              <span className="hidden md:flex items-center gap-1">
                Built with <Heart className="w-4 h-4 text-red-400 animate-pulse" fill="currentColor" /> for innovators
              </span>
            </div>

            {/* Version & Status */}
            <div className="flex items-center gap-6 text-sm text-gray-400 order-3 md:order-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>All systems operational</span>
              </div>
              <span className="hidden md:inline">v2.0.0</span>
            </div>

            {/* Back to Top */}
            <motion.button
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="order-1 md:order-3 px-4 py-2 bg-gray-800/60 backdrop-blur-sm rounded-xl flex items-center gap-2 text-gray-300 hover:text-white hover:bg-primary-500/20 transition-colors text-sm group"
            >
              <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
              <span>Back to Top</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Fun Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500/10 backdrop-blur-sm glass-subtle rounded-full text-primary-300 text-sm">
            <Lightbulb className="w-4 h-4" />
            <span>Empowering the next generation of innovators since 2024</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;