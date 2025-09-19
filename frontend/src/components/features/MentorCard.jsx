import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, MessageCircle, User, Award, Briefcase } from 'lucide-react';

const MentorCard = ({ 
  mentor, 
  onConnect, 
  onViewProfile,
  className = ''
}) => {
  const expertiseColors = {
    'AI/ML': 'bg-blue-500/20 text-blue-300',
    'Frontend': 'bg-green-500/20 text-green-300',
    'Backend': 'bg-purple-500/20 text-purple-300',
    'Mobile': 'bg-orange-500/20 text-orange-300',
    'DevOps': 'bg-red-500/20 text-red-300',
    'Design': 'bg-pink-500/20 text-pink-300',
    'Business': 'bg-yellow-500/20 text-yellow-300',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`
        glass rounded-xl p-6 transition-all duration-300
        hover:shadow-2xl hover:shadow-purple-500/10 border border-gray-700/50
        hover:border-purple-500/30 group ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            {mentor.avatar || mentor.name?.charAt(0) || 'M'}
          </div>
          {mentor.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800" />
          )}
          {mentor.isVerified && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <Award className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white truncate group-hover:text-purple-400 transition-colors">
              {mentor.name}
            </h3>
            {mentor.isPremium && (
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                PRO
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
            <Briefcase className="w-4 h-4" />
            <span className="truncate">{mentor.title}</span>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{mentor.location}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="text-right">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-semibold">{mentor.rating}</span>
          </div>
          <p className="text-gray-400 text-sm">{mentor.reviewCount} reviews</p>
        </div>
      </div>

      {/* Company & Experience */}
      <div className="flex items-center gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-xs font-bold">
            {mentor.company?.charAt(0) || 'C'}
          </div>
          <span>{mentor.company}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{mentor.experience}+ years</span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">
        {mentor.bio || "Experienced professional passionate about mentoring the next generation of innovators."}
      </p>

      {/* Expertise Tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {mentor.expertise?.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                expertiseColors[skill] || 'bg-gray-600/20 text-gray-300'
              }`}
            >
              {skill}
            </span>
          ))}
          {mentor.expertise?.length > 4 && (
            <span className="px-3 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-full">
              +{mentor.expertise.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 py-4 bg-gray-800/30 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">{mentor.activeMentorships || 0}</div>
          <div className="text-xs text-gray-400">Active</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">{mentor.completedMentorships || 0}</div>
          <div className="text-xs text-gray-400">Completed</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-400">{mentor.responseTime || '2h'}</div>
          <div className="text-xs text-gray-400">Response</div>
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">Availability</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            mentor.availability === 'Available' 
              ? 'bg-green-500/20 text-green-400' 
              : mentor.availability === 'Busy'
              ? 'bg-orange-500/20 text-orange-400'
              : 'bg-red-500/20 text-red-400'
          }`}>
            {mentor.availability || 'Available'}
          </span>
        </div>
        
        {mentor.nextAvailable && (
          <p className="text-xs text-gray-400">
            Next available: {mentor.nextAvailable}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onConnect?.(mentor)}
          className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Connect
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewProfile?.(mentor)}
          className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold text-sm transition-all flex items-center justify-center"
        >
          <User className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Specialties (if any) */}
      {mentor.specialties && mentor.specialties.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <p className="text-xs text-gray-400 mb-2">Specializes in:</p>
          <div className="flex flex-wrap gap-1">
            {mentor.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className="text-xs bg-gradient-primary/20 text-blue-300 px-2 py-1 rounded-md"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))',
          filter: 'blur(20px)',
          zIndex: -1,
        }}
      />
    </motion.div>
  );
};

export default MentorCard;