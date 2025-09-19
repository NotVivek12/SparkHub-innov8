import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share, Clock, User, Tag } from 'lucide-react';
import { useState } from 'react';

const IdeaCard = ({ 
  idea, 
  onLike, 
  onComment, 
  onShare, 
  onClick,
  className = ''
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(idea.upvotes || 0);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.(idea.id, !isLiked);
  };

  const handleComment = (e) => {
    e.stopPropagation();
    onComment?.(idea.id);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    onShare?.(idea);
  };

  const categoryColors = {
    'AI/ML': 'bg-blue-600/20 text-blue-400 border-blue-400/30',
    'IoT': 'bg-green-600/20 text-green-400 border-green-400/30',
    'Sustainability': 'bg-emerald-600/20 text-emerald-400 border-emerald-400/30',
    'Healthcare': 'bg-red-600/20 text-red-400 border-red-400/30',
    'FinTech': 'bg-yellow-600/20 text-yellow-400 border-yellow-400/30',
    'EdTech': 'bg-purple-600/20 text-purple-400 border-purple-400/30',
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
      onClick={() => onClick?.(idea)}
      className={`
        glass rounded-xl p-6 cursor-pointer transition-all duration-300
        hover:shadow-2xl hover:shadow-blue-500/10 border border-gray-700/50
        hover:border-blue-500/30 group ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Category Badge */}
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium border whitespace-nowrap
            ${categoryColors[idea.category] || 'bg-gray-600/20 text-gray-400 border-gray-400/30'}
          `}>
            <Tag className="w-3 h-3 inline mr-1" />
            {idea.category}
          </span>
          
          {/* Time */}
          <div className="flex items-center text-gray-500 text-sm">
            <Clock className="w-4 h-4 mr-1" />
            <span>{idea.timeAgo || '2h ago'}</span>
          </div>
        </div>

        {/* Status Indicator */}
        {idea.status && (
          <div className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${idea.status === 'featured' ? 'bg-gradient-primary text-white' :
              idea.status === 'trending' ? 'bg-orange-600/20 text-orange-400' :
              'bg-gray-600/20 text-gray-400'}
          `}>
            {idea.status}
          </div>
        )}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
          {idea.author?.charAt(0) || 'U'}
        </div>
        <div>
          <p className="text-white font-medium">{idea.author || 'Anonymous'}</p>
          <p className="text-gray-400 text-sm">{idea.authorRole || 'Student'}</p>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
        {idea.title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
        {idea.description}
      </p>

      {/* Tags */}
      {idea.tags && idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {idea.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md"
            >
              #{tag}
            </span>
          ))}
          {idea.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-md">
              +{idea.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Progress Bar (if applicable) */}
      {idea.progress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-blue-400 font-medium">{idea.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${idea.progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-gradient-primary h-2 rounded-full"
            />
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <div className="flex items-center gap-6">
          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`
              flex items-center gap-2 transition-colors
              ${isLiked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}
            `}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{likeCount}</span>
          </motion.button>

          {/* Comment Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleComment}
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="font-medium">{idea.comments || 0}</span>
          </motion.button>

          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
          >
            <Share className="w-5 h-5" />
            <span className="font-medium">Share</span>
          </motion.button>
        </div>

        {/* Collaborate Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-primary px-4 py-2 rounded-lg text-white font-medium text-sm hover:shadow-lg hover:shadow-blue-500/25 transition-all"
        >
          Collaborate
        </motion.button>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          filter: 'blur(20px)',
          zIndex: -1,
        }}
      />
    </motion.div>
  );
};

export default IdeaCard;