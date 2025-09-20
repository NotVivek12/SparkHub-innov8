import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Plus, Filter, Search, Grid, List, Clock, CheckCircle, 
  AlertCircle, Users, TrendingUp, Calendar, MoreVertical 
} from 'lucide-react';
import useProjectStore from '../../store/projectStore';
import useAuthStore from '../../store/authStore';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProjectDashboard = ({ className = '' }) => {
  const { user } = useAuthStore();
  const { 
    projects, 
    isLoading, 
    error, 
    filters,
    fetchProjects,
    getUserProjects,
    setFilters 
  } = useProjectStore();

  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    fetchProjects(filters);
  }, [fetchProjects, filters]);

  const userProjects = getUserProjects(user?.id || '1');
  
  const filteredProjects = userProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Projects', count: userProjects.length },
    { value: 'in_progress', label: 'In Progress', count: userProjects.filter(p => p.status === 'in_progress').length },
    { value: 'under_review', label: 'Under Review', count: userProjects.filter(p => p.status === 'under_review').length },
    { value: 'completed', label: 'Completed', count: userProjects.filter(p => p.status === 'completed').length },
  ];

  const getStatusColor = (status) => {
    const colors = {
      in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      under_review: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      draft: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    };
    return colors[status] || colors.draft;
  };

  const getStatusIcon = (status) => {
    const icons = {
      in_progress: Clock,
      under_review: AlertCircle,
      completed: CheckCircle,
      draft: AlertCircle,
    };
    return icons[status] || AlertCircle;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white">My Projects</h1>
          <p className="text-gray-400 mt-1">Manage and track your innovation journey</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'Total Projects', value: userProjects.length, icon: Users, color: 'text-blue-400' },
          { label: 'In Progress', value: userProjects.filter(p => p.status === 'in_progress').length, icon: Clock, color: 'text-yellow-400' },
          { label: 'Completed', value: userProjects.filter(p => p.status === 'completed').length, icon: CheckCircle, color: 'text-green-400' },
          { label: 'Total Upvotes', value: userProjects.reduce((sum, p) => sum + (p.upvotes || 0), 0), icon: TrendingUp, color: 'text-purple-400' },
        ].map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Filters and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
      >
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedStatus(option.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${selectedStatus === option.value
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'bg-gray-700/50 text-gray-300 hover:text-white hover:bg-gray-600/50'
                }
              `}
            >
              {option.label}
              {option.count > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                  {option.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none w-64"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Projects Grid/List */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`${viewMode === 'list' ? 'flex items-center' : ''} group`}>
                <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                          {project.category}
                        </span>
                        <span className="text-gray-400 text-sm">{project.timeAgo}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                        {project.title}
                      </h3>
                    </div>

                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm text-blue-400 font-medium">{project.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress || 0}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="bg-gradient-primary h-2 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{project.upvotes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{project.comments || 0}</span>
                      </div>
                      {project.mentor && (
                        <div className="flex items-center gap-1">
                          <div className="w-4 h-4 bg-gradient-primary rounded-full flex items-center justify-center text-xs text-white">
                            {project.mentor.avatar}
                          </div>
                          <span>Mentored</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {(() => {
                        const StatusIcon = getStatusIcon(project.status);
                        return (
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            <StatusIcon className="w-3 h-3" />
                            <span className="capitalize">{project.status.replace('_', ' ')}</span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {viewMode === 'list' && (
                  <div className="ml-6 flex items-center gap-3">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    <Button size="sm" variant="primary">
                      Continue Work
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-full"
          >
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-gray-400" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery || selectedStatus !== 'all' 
                  ? "Try adjusting your search or filters"
                  : "Start your innovation journey by creating your first project"
                }
              </p>
              
              {(!searchQuery && selectedStatus === 'all') && (
                <Button variant="primary" className="flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  Create Your First Project
                </Button>
              )}
              
              {(searchQuery || selectedStatus !== 'all') && (
                <div className="flex justify-center gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedStatus('all')}
                  >
                    Show All
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Quick Actions */}
      {filteredProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap gap-3 justify-center pt-6"
        >
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Review
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Find Collaborators
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            View Analytics
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectDashboard;