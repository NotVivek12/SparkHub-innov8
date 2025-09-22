import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, TrendingUp } from 'lucide-react';
// No need to import useState or useEffect here, as the global dark mode state
// is managed by the parent component and the `<html>` tag.

const Community = () => {
  const ideas = [
    {
      id: 1,
      title: 'Smart Campus Parking System',
      author: 'John Doe',
      description: 'An IoT solution to help students find parking spots in real-time.',
      upvotes: 24,
      comments: 8,
      category: 'IoT'
    },
    {
      id: 2,
      title: 'Mental Health Companion App',
      author: 'Sarah Chen',
      description: 'AI-powered app to provide mental health support for students.',
      upvotes: 45,
      comments: 15,
      category: 'AI/ML'
    },
    {
      id: 3,
      title: 'Sustainable Food Delivery',
      author: 'Alex Kumar',
      description: 'Eco-friendly food delivery system using electric bikes and reusable packaging.',
      upvotes: 32,
      comments: 12,
      category: 'Sustainability'
    },
  ];

  return (
    // The main container now uses a single set of Tailwind classes
    // that respond to the `dark` class on the `<html>` tag.
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* Replaced conditional classes with `dark:` variants */}
          <h1 className="text-4xl font-bold text-indigo-900 dark:text-white mb-4">Community Hub</h1>
          <p className="text-indigo-700 dark:text-gray-300">Discover, collaborate, and get inspired by innovative ideas</p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-12 justify-center"
        >
          {['All', 'AI/ML', 'IoT', 'Sustainability', 'Healthcare', 'FinTech'].map((filter, index) => (
            <button
              key={index}
              className={`px-6 py-3 rounded-full font-medium transition-all hover:scale-105 ${
                index === 0 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                  // Replaced conditional classes with `dark:` variants
                  : 'bg-white text-indigo-700 dark:bg-slate-800 dark:text-gray-300 shadow-md'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Ideas Grid */}
        <div className="grid gap-8">
          {ideas.map((idea, index) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              // Replaced conditional classes with `dark:` variants
              className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                      {idea.category}
                    </span>
                    {/* Replaced conditional classes with `dark:` variants */}
                    <span className="text-indigo-600 dark:text-gray-400 text-sm">by {idea.author}</span>
                  </div>
                  {/* Replaced conditional classes with `dark:` variants */}
                  <h3 className="text-2xl font-bold text-indigo-900 dark:text-white mb-3">{idea.title}</h3>
                  <p className="text-indigo-700 dark:text-gray-300">{idea.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-indigo-100 dark:border-gray-700">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-indigo-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{idea.upvotes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-indigo-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{idea.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 text-indigo-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400 transition-colors">
                    <Share className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform">
                  Collaborate
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trending Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-bold text-indigo-900 dark:text-white">Trending Topics</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {['Artificial Intelligence', 'Climate Tech', 'EdTech', 'HealthTech', 'Blockchain'].map((topic, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 px-4 py-2 rounded-full text-white font-medium"
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Community;
