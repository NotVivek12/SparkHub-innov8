import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, Users, Target, Star, TrendingUp, Zap, ChevronRight, Play, CheckCircle, BarChart, Heart, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative pt-28 pb-32 lg:pt-40 lg:pb-40 overflow-hidden bg-gradient-to-br from-blue-50/50 via-white/50 to-purple-50/50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-mesh-gradient opacity-5 dark:opacity-20 animate-gradient-y" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-purple-100/20 to-blue-100/20 dark:bg-gradient-to-br dark:from-blue-900/10 dark:via-purple-900/10 dark:to-blue-900/10" />
        <div className="absolute top-1/3 left-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-500/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-20 w-80 h-80 bg-purple-400/10 dark:bg-purple-500/20 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 rounded-full border border-blue-300 dark:border-blue-500/40 opacity-30"
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-32 h-32 rounded-xl border border-purple-300 dark:border-purple-500/40 opacity-20"
          animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-100 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200 dark:border-blue-700 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-10 shadow-sm dark:shadow-lg dark:shadow-blue-900/30 animate-pulse-glow"
            >
              <Award className="w-4 h-4" />
              <span>Trusted by 10,000+ innovators worldwide</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight"
            >
              Transform Ideas into{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                Reality
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-700 dark:text-gray-100 mb-14 max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Connect with expert mentors, collaborate with brilliant minds, and turn your 
              <span className="text-blue-600 dark:text-blue-400 font-semibold"> visionary concepts </span>
              into world-changing innovations.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
            >
              <Link to="/submit-idea">
                <Button 
                  size="xl" 
                  variant="primary"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="text-lg px-10 py-5 shadow-lg hover:shadow-xl btn-shimmer"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/community">
                <Button 
                  size="xl" 
                  variant="ghost"
                  leftIcon={<Play className="w-5 h-5" />}
                  className="text-lg px-10 py-5 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {[
                { value: '10K+', label: 'Active Students', icon: Users },
                { value: '500+', label: 'Expert Mentors', icon: Star },
                { value: '2.5K+', label: 'Projects Created', icon: Lightbulb },
                { value: '95%', label: 'Success Rate', icon: BarChart }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  whileHover={{ y: -5, scale: 1.03 }}
                  className="bg-white/90 dark:bg-slate-800/90 p-6 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg dark:shadow-xl dark:shadow-slate-900/50 backdrop-blur-sm"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-blue-500 dark:text-blue-400">
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32 relative bg-white dark:bg-slate-900">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-700 to-transparent" />
        <div className="absolute -top-10 left-1/4 w-96 h-96 bg-blue-400/5 dark:bg-blue-900/20 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-sm font-medium mb-5">
              <Zap className="w-4 h-4" />
              <span>Supercharge Your Innovation</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                innovate
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
              Our comprehensive platform provides all the tools, mentorship, and community support you need to bring your ideas to life.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Ideate',
                description: 'Spark creativity with our idea generation tools and collaborative brainstorming sessions.',
                gradient: 'from-yellow-400 to-orange-500',
                delay: 0,
                link: '/submit-idea'
              },
              {
                icon: Users,
                title: 'Collaborate',
                description: 'Connect with like-minded innovators, expert mentors, and industry professionals.',
                gradient: 'from-blue-400 to-purple-500',
                delay: 0.1,
                link: '/community'
              },
              {
                icon: Target,
                title: 'Execute',
                description: 'Turn concepts into reality with structured project management and expert guidance.',
                gradient: 'from-green-400 to-blue-500',
                delay: 0.2,
                link: '/student-dashboard'
              },
              {
                icon: Zap,
                title: 'Accelerate',
                description: 'Fast-track your projects with cutting-edge tools and proven methodologies.',
                gradient: 'from-purple-400 to-pink-500',
                delay: 0.3,
                link: '/mentor-dashboard'
              },
              {
                icon: Heart,
                title: 'Achieve',
                description: 'Celebrate your successes and showcase your innovations to the world.',
                gradient: 'from-orange-400 to-red-500',
                delay: 0.4,
                link: '/profile'
              },
              {
                icon: TrendingUp,
                title: 'Scale',
                description: 'Grow your impact with resources for scaling and commercializing your innovations.',
                gradient: 'from-teal-400 to-blue-500',
                delay: 0.5,
                link: '/community'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <Link to={feature.link}>
                  <Card 
                    variant="glass"
                    hover={true}
                    rounded="2xl"
                    shadow="medium"
                    className="h-full p-8 group border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all"
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-8 group-hover:animate-pulse-glow`}>
                      <div className="w-full h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-gray-800 dark:text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                      {feature.description}
                    </p>
                    
                    <div className="mt-6 flex items-center text-sm text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      <span className="mr-2">Learn more</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 relative bg-gradient-to-b from-blue-50 to-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300 dark:via-blue-700 to-transparent" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card 
              variant="glass"
              padding="xl"
              rounded="3xl"
              shadow="large"
              className="border-blue-200 dark:border-blue-700 overflow-hidden relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/20 dark:bg-blue-900/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-400/10 dark:bg-purple-900/20 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
                  <CheckCircle className="w-4 h-4" />
                  <span>No credit card required</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                  Ready to spark your next 
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent block mt-2">innovation?</span>
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-200 mb-10 max-w-2xl mx-auto font-medium">
                  Join thousands of innovators who are already transforming their ideas into reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <Link to="/register">
                    <Button 
                      size="xl" 
                      variant="primary"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                      className="text-lg px-10 py-5 shadow-lg hover:shadow-xl btn-shimmer"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button 
                      size="xl" 
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 text-lg"
                    >
                      Book a Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;