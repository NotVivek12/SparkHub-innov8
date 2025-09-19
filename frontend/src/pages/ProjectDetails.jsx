import { motion } from 'framer-motion';
import { Calendar, User, MessageCircle, CheckCircle, Clock, Target } from 'lucide-react';

const ProjectDetails = () => {
  const milestones = [
    { id: 1, title: 'Market Research', status: 'completed', date: 'Sep 15, 2024' },
    { id: 2, title: 'Prototype Development', status: 'in-progress', date: 'Oct 1, 2024' },
    { id: 3, title: 'User Testing', status: 'pending', date: 'Oct 15, 2024' },
    { id: 4, title: 'Final Presentation', status: 'pending', date: 'Nov 1, 2024' },
  ];

  const updates = [
    {
      id: 1,
      date: 'Sep 18, 2024',
      author: 'Sarah Chen',
      type: 'progress',
      content: 'Completed initial market research. Found strong demand among college students.'
    },
    {
      id: 2,
      date: 'Sep 16, 2024',
      author: 'Dr. Johnson (Mentor)',
      type: 'feedback',
      content: 'Great progress on the research phase. Consider expanding your target market analysis.'
    },
    {
      id: 3,
      date: 'Sep 12, 2024',
      author: 'Sarah Chen',
      type: 'milestone',
      content: 'Started market research phase. Planning to survey 100+ students.'
    },
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
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm">AI/ML</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Created Sep 10, 2024</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">AI Study Assistant</h1>
          <p className="text-gray-300 text-lg">An intelligent companion to help students optimize their learning process</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Project Overview</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">The Problem</h3>
                  <p className="text-gray-300">Students struggle with personalized study plans and often don't know how to optimize their learning efficiency based on their individual strengths and weaknesses.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-3">The Solution</h3>
                  <p className="text-gray-300">An AI-powered mobile app that analyzes study patterns, creates personalized learning schedules, and provides adaptive recommendations to improve academic performance.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Unique Approach</h3>
                  <p className="text-gray-300">Uses machine learning to adapt in real-time based on quiz performance, study session data, and learning preferences to create truly personalized experiences.</p>
                </div>
              </div>
            </motion.div>

            {/* Timeline & Milestones */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Project Timeline</h2>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' 
                        ? 'bg-green-600' 
                        : milestone.status === 'in-progress' 
                        ? 'bg-blue-600 animate-pulse' 
                        : 'bg-gray-600'
                    }`}>
                      {milestone.status === 'completed' ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : milestone.status === 'in-progress' ? (
                        <Clock className="w-6 h-6 text-white" />
                      ) : (
                        <Target className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white">{milestone.title}</h3>
                      <p className="text-gray-400">{milestone.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                      milestone.status === 'completed' 
                        ? 'bg-green-600/20 text-green-400' 
                        : milestone.status === 'in-progress' 
                        ? 'bg-blue-600/20 text-blue-400' 
                        : 'bg-gray-600/20 text-gray-400'
                    }`}>
                      {milestone.status.replace('-', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Project Updates */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Recent Updates</h2>
              <div className="space-y-6">
                {updates.map((update) => (
                  <div key={update.id} className="border-l-4 border-blue-500 pl-6 py-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white font-semibold">{update.author}</span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        update.type === 'progress' 
                          ? 'bg-green-600/20 text-green-400' 
                          : update.type === 'feedback' 
                          ? 'bg-purple-600/20 text-purple-400' 
                          : 'bg-blue-600/20 text-blue-400'
                      }`}>
                        {update.type}
                      </span>
                      <span className="text-gray-400 text-sm">{update.date}</span>
                    </div>
                    <p className="text-gray-300">{update.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Stats */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Project Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-semibold">50%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-primary h-2 rounded-full w-1/2"></div>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-gray-400">Team Size</span>
                  <span className="text-white">3 members</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white">8 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-blue-400">In Progress</span>
                </div>
              </div>
            </motion.div>

            {/* Team Members */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6">Team</h3>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Chen', role: 'Project Lead', avatar: 'S' },
                  { name: 'Dr. Johnson', role: 'Mentor', avatar: 'J' },
                  { name: 'Alex Kumar', role: 'Developer', avatar: 'A' },
                ].map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{member.name}</p>
                      <p className="text-gray-400 text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <button className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
                Message Team
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                <User className="w-5 h-5" />
                Join Project
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;