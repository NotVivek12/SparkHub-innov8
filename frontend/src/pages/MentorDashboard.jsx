import { motion } from 'framer-motion';
import { MessageCircle, Star, TrendingUp, Calendar } from 'lucide-react';

const MentorDashboard = () => {
  const mentorships = [
    { id: 1, student: 'Sarah Chen', project: 'AI Study Assistant', lastActivity: '2 hours ago' },
    { id: 2, student: 'Alex Rodriguez', project: 'Campus Food Tracker', lastActivity: '1 day ago' },
    { id: 3, student: 'Maya Patel', project: 'Green Transport App', lastActivity: '3 days ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Mentor Dashboard</h1>
          <p className="text-gray-300">Guide the next generation of innovators</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: 'Active Mentorships', value: '3', icon: MessageCircle, color: 'text-blue-400' },
            { label: 'Mentor Rating', value: '4.9', icon: Star, color: 'text-yellow-400' },
            { label: 'Projects Completed', value: '12', icon: TrendingUp, color: 'text-green-400' },
            { label: 'Hours This Month', value: '24', icon: Calendar, color: 'text-purple-400' },
          ].map((stat, index) => (
            <div key={index} className="glass rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Active Mentorships */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8">Active Mentorships</h2>
          
          <div className="grid gap-6">
            {mentorships.map((mentorship, index) => (
              <motion.div
                key={mentorship.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="glass rounded-xl p-6 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                      {mentorship.student.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{mentorship.student}</h3>
                      <p className="text-gray-400">{mentorship.project}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Last activity</p>
                    <p className="text-white">{mentorship.lastActivity}</p>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                    View Project
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorDashboard;