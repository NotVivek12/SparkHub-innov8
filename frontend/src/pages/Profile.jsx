import { motion } from 'framer-motion';
import { Edit, MapPin, Calendar, Award, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const achievements = [
    { title: 'Innovation Champion', description: '5+ successful projects', icon: Award },
    { title: 'Community Leader', description: 'Top contributor', icon: Award },
    { title: 'Mentor of the Month', description: 'September 2024', icon: Award },
  ];

  const projects = [
    { id: 1, name: 'AI Study Assistant', status: 'In Progress', role: 'Lead Developer' },
    { id: 2, name: 'Campus Food Tracker', status: 'Completed', role: 'UI/UX Designer' },
    { id: 3, name: 'Green Transport App', status: 'Planning', role: 'Product Manager' },
  ];

  const skills = [
    'React', 'Node.js', 'Python', 'Machine Learning', 'UI/UX Design', 
    'Project Management', 'Data Analysis', 'Mobile Development'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 dark:from-slate-900 dark:to-slate-800 pt-20 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-xl rounded-2xl p-8 sticky top-8"
            >
              {/* Profile Header */}
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-4xl text-white font-bold mx-auto mb-4">
                    SC
                  </div>
                  <button className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Sarah Chen</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Computer Science Student</p>
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>Stanford University</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Joined March 2024</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3 mb-8">
                <a href="#" className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <Mail className="w-5 h-5" />
                  <span>sarah.chen@stanford.edu</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <Github className="w-5 h-5" />
                  <span>github.com/sarahchen</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50">
                  <Linkedin className="w-5 h-5" />
                  <span>linkedin.com/in/sarahchen</span>
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">7</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Projects</div>
                </div>
                <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">5</div>
                  <div className="text-gray-500 dark:text-gray-400 text-sm">Completed</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-xl rounded-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About</h2>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Passionate computer science student with a focus on AI/ML and user experience design. 
                I love building products that solve real-world problems and make people's lives easier. 
                Currently working on innovative projects that bridge the gap between technology and education. 
                Always eager to collaborate with like-minded individuals and learn from experienced mentors.
              </p>
            </motion.div>

            {/* Skills */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-xl rounded-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h2>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full text-white font-medium hover:scale-105 transition-transform cursor-pointer"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Projects */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-xl rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Projects</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors">
                    <div>
                      <h3 className="text-gray-900 dark:text-white font-semibold">{project.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{project.role}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      project.status === 'Completed' 
                        ? 'bg-green-200/50 text-green-700 dark:bg-green-600/20 dark:text-green-400' 
                        : project.status === 'In Progress' 
                        ? 'bg-blue-200/50 text-blue-700 dark:bg-blue-600/20 dark:text-blue-400' 
                        : 'bg-gray-200/50 text-gray-700 dark:bg-gray-600/20 dark:text-gray-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/80 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-xl rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Achievements</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-yellow-200/50 to-orange-200/50 rounded-xl border border-yellow-200 dark:from-yellow-600/10 dark:to-orange-600/10 dark:border-yellow-600/20">
                    <achievement.icon className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-gray-900 dark:text-white font-bold mb-2">{achievement.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activity Timeline */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white/80 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50 backdrop-blur-xl rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {[
                  { date: '2 hours ago', action: 'Updated AI Study Assistant project', type: 'update' },
                  { date: '1 day ago', action: 'Received feedback from Dr. Johnson', type: 'feedback' },
                  { date: '3 days ago', action: 'Completed market research milestone', type: 'milestone' },
                  { date: '1 week ago', action: 'Joined Green Transport App project', type: 'join' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'update' ? 'bg-blue-600 dark:bg-blue-400' :
                      activity.type === 'feedback' ? 'bg-purple-600 dark:bg-purple-400' :
                      activity.type === 'milestone' ? 'bg-green-600 dark:bg-green-400' : 'bg-orange-600 dark:bg-orange-400'
                    }`}></div>
                    <div className="flex-1">
                      <p className="text-gray-900 dark:text-white">{activity.action}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
