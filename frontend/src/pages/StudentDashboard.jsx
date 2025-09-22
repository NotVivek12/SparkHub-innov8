import { motion } from 'framer-motion';
import { Plus, Clock, CheckCircle, Users } from 'lucide-react';

const StudentDashboard = () => {
  const projects = [
    { id: 1, title: 'AI Study Assistant', status: 'In Progress', progress: 75 },
    { id: 2, title: 'Campus Food Tracker', status: 'Under Review', progress: 100 },
    { id: 3, title: 'Green Transport App', status: 'Just Started', progress: 25 },
  ];

  const statIcons = {
    'Active Projects': Clock,
    'Completed': CheckCircle,
    'Mentors Connected': Users,
    'Community Upvotes': Plus,
  };

  const stats = [
    { label: 'Active Projects', value: '3', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Completed', value: '7', color: 'text-green-600 dark:text-green-400' },
    { label: 'Mentors Connected', value: '2', color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Community Upvotes', value: '24', color: 'text-orange-600 dark:text-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-slate-900 dark:to-slate-800 pt-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Student Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Track your projects and connect with mentors</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = statIcons[stat.label];
            return (
              <div 
                key={index} 
                className="bg-white/80 border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-xl rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Projects</h2>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
              <Plus className="w-5 h-5" />
              New Project
            </button>
          </div>

          <div className="grid gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white/80 border border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-xl rounded-xl p-6 hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{project.status}</p>
                  </div>
                  <span className="bg-blue-200/50 text-blue-700 dark:bg-blue-600/20 dark:text-blue-400 px-3 py-1 rounded-full text-sm">
                    {project.progress}% Complete
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
