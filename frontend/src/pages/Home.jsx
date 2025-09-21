import { motion } from 'framer-motion';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
import { ArrowRight, Lightbulb, Users, Target, Star, TrendingUp, Zap, ChevronRight, Play, CheckCircle, BarChart, Heart, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-dark">
      <section className="relative pt-28 pb-32 lg:pt-40 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-10 animate-gradient-y" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700/10 via-accent-600/10 to-primary-700/10" />
        <div className="absolute top-1/3 left-20 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-20 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl -z-10" />
        
        <motion.div 
          className="absolute top-20 left-10 w-20 h-20 rounded-full border border-primary-500/20 opacity-30"
          animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 right-20 w-32 h-32 rounded-xl border border-accent-500/20 opacity-20"
          animate={{ y: [15, -15, 15], rotate: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600/10 backdrop-blur-sm glass-subtle border border-primary-500/30 rounded-full text-primary-300 text-sm font-medium mb-10 shadow-glow animate-pulse-glow"
            >
              <Award className="w-4 h-4" />
              <span>Trusted by 10,000+ innovators worldwide</span>
              <ChevronRight className="w-4 h-4" />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-tight tracking-tight"
            >
              Transform Ideas into{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-x text-glow">
                Reality
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl md:text-3xl text-gray-200 mb-14 max-w-4xl mx-auto leading-relaxed"
            >
              Connect with expert mentors, collaborate with brilliant minds, and turn your 
              <span className="text-primary-300"> visionary concepts </span>
              into world-changing innovations.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
            >
<<<<<<< HEAD
              <Link to="/submit-idea">
                <Button 
                  size="xl" 
                  variant="primary"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="text-lg px-10 py-5 shadow-glow hover:shadow-glow-lg btn-shimmer"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/community">
                <Button 
                  size="xl" 
                  variant="ghost"
                  leftIcon={<Play className="w-5 h-5" />}
                  className="text-lg px-10 py-5 text-white border border-white/20 hover:bg-white/10"
                >
                  Watch Demo
                </Button>
              </Link>
=======
              <Button 
                size="xl" 
                variant="primary"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="text-lg px-10 py-5 shadow-glow hover:shadow-glow-lg btn-shimmer"
              >
                Start Your Journey
              </Button>
              <Button 
                size="xl" 
                variant="ghost"
                leftIcon={<Play className="w-5 h-5" />}
                className="text-lg px-10 py-5 text-white border border-white/20 hover:bg-white/10"
              >
                Watch Demo
              </Button>
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
            </motion.div>

            {/* Stats - Enhanced Visual Appeal with Cards */}
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
                  className="glass-subtle p-6 rounded-2xl border border-white/5 shadow-soft"
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-2 text-primary-400">
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern Card Design */}
      <section className="py-24 lg:py-32 relative">
        {/* Background Accent */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
        <div className="absolute -top-10 left-1/4 w-96 h-96 bg-primary-600/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Improved Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/10 border border-primary-500/20 text-primary-300 text-sm font-medium mb-5">
              <Zap className="w-4 h-4" />
              <span>Supercharge Your Innovation</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Everything you need to{' '}
              <span className="bg-gradient-secondary bg-clip-text text-transparent animate-gradient-x">
                innovate
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform provides all the tools, mentorship, and community support you need to bring your ideas to life.
            </p>
          </motion.div>

          {/* Feature Cards - Modern Glassmorphism */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Ideate',
                description: 'Spark creativity with our idea generation tools and collaborative brainstorming sessions.',
                gradient: 'from-yellow-400 to-orange-500',
<<<<<<< HEAD
                delay: 0,
                link: '/submit-idea'
=======
                delay: 0
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
              },
              {
                icon: Users,
                title: 'Collaborate',
                description: 'Connect with like-minded innovators, expert mentors, and industry professionals.',
                gradient: 'from-blue-400 to-purple-500',
<<<<<<< HEAD
                delay: 0.1,
                link: '/community'
=======
                delay: 0.1
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
              },
              {
                icon: Target,
                title: 'Execute',
                description: 'Turn concepts into reality with structured project management and expert guidance.',
                gradient: 'from-green-400 to-blue-500',
<<<<<<< HEAD
                delay: 0.2,
                link: '/student-dashboard'
=======
                delay: 0.2
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
              },
              {
                icon: Zap,
                title: 'Accelerate',
                description: 'Fast-track your projects with cutting-edge tools and proven methodologies.',
                gradient: 'from-purple-400 to-pink-500',
<<<<<<< HEAD
                delay: 0.3,
                link: '/mentor-dashboard'
=======
                delay: 0.3
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
              },
              {
                icon: Heart,
                title: 'Achieve',
                description: 'Celebrate your successes and showcase your innovations to the world.',
                gradient: 'from-orange-400 to-red-500',
<<<<<<< HEAD
                delay: 0.4,
                link: '/profile'
=======
                delay: 0.4
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
              },
              {
                icon: TrendingUp,
                title: 'Scale',
                description: 'Grow your impact with resources for scaling and commercializing your innovations.',
                gradient: 'from-teal-400 to-blue-500',
<<<<<<< HEAD
                delay: 0.5,
                link: '/community'
=======
                delay: 0.5
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
<<<<<<< HEAD
                <Link to={feature.link}>
                  <Card 
                    variant="glass"
                    hover={true}
                    rounded="2xl"
                    shadow="medium"
                    className="h-full p-8 group border border-white/10 hover:border-primary-500/40 cursor-pointer"
                  >
                    {/* Modern Icon Design */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-8 group-hover:animate-pulse-glow`}>
                      <div className="w-full h-full bg-gray-900/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <feature.icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    
                    {/* Enhanced Typography */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Subtle Action Indicator */}
                    <div className="mt-6 flex items-center text-sm text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="mr-2">Learn more</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
=======
                <Card 
                  variant="glass"
                  hover={true}
                  rounded="2xl"
                  shadow="medium"
                  className="h-full p-8 group border border-white/10 hover:border-primary-500/40"
                >
                  {/* Modern Icon Design */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-0.5 mb-8 group-hover:animate-pulse-glow`}>
                    <div className="w-full h-full bg-gray-900/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  {/* Enhanced Typography */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary-300 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Subtle Action Indicator */}
                  <div className="mt-6 flex items-center text-sm text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="mr-2">Learn more</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </Card>
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section - New */}
      <section className="py-20 lg:py-28 relative">
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-gray-900/0 via-primary-900/5 to-gray-900/0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Trusted by Innovators Worldwide
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Join thousands of students, mentors, and organizations using SparkHub to bring their innovations to life.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "SparkHub helped me take my research project from concept to a funded startup in less than 6 months.",
                author: "Sarah J.",
                role: "PhD Student, MIT",
                delay: 0
              },
              {
                quote: "The mentorship I received through SparkHub was invaluable - it saved me months of trial and error.",
                author: "Michael T.",
                role: "Undergraduate, Stanford",
                delay: 0.1
              },
              {
                quote: "As a mentor, I've seen incredible ideas flourish with the right support that SparkHub provides.",
                author: "Dr. Alicia R.",
                role: "Innovation Director, Google",
                delay: 0.2
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: testimonial.delay }}
              >
                <Card
                  variant="glass"
                  hover={false}
                  rounded="2xl"
                  className="h-full p-8 border-white/5"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-6 text-primary-300">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path d="M10 7L8 11L11 13L9 17H15L13 13L16 11L14 7H10Z" fill="currentColor" />
                      </svg>
                    </div>
                    <p className="text-lg text-gray-200 mb-6 flex-grow">{testimonial.quote}</p>
                    <div>
                      <p className="font-medium text-white">{testimonial.author}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Design */}
      <section className="py-20 lg:py-32 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/0 via-primary-900/10 to-gray-900/0" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />
        
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
              className="border-primary-500/30 overflow-hidden relative"
            >
              {/* Decorative Elements */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/20 text-primary-300 text-sm font-medium mb-6">
                  <CheckCircle className="w-4 h-4" />
                  <span>No credit card required</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                  Ready to spark your next 
                  <span className="bg-gradient-primary bg-clip-text text-transparent block mt-2">innovation?</span>
                </h2>
                <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
                  Join thousands of innovators who are already transforming their ideas into reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
<<<<<<< HEAD
                  <Link to="/register">
                    <Button 
                      size="xl" 
                      variant="primary"
                      rightIcon={<ArrowRight className="w-5 h-5" />}
                      className="shadow-glow hover:shadow-glow-lg btn-shimmer text-lg"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button 
                      size="xl" 
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 text-lg"
                    >
                      Book a Demo
                    </Button>
                  </Link>
=======
                  <Button 
                    size="xl" 
                    variant="primary"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="shadow-glow hover:shadow-glow-lg btn-shimmer text-lg"
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    size="xl" 
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 text-lg"
                  >
                    Book a Demo
                  </Button>
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
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