const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  // Content
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot be more than 1000 characters']
  },
  
  // Relationships
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Comment author is required']
  },
  
  idea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: [true, 'Idea reference is required']
  },
  
  // Reply/Threading System
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  
  // Engagement
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Moderation
  isEdited: {
    type: Boolean,
    default: false
  },
  
  editedAt: {
    type: Date,
    default: null
  },
  
  isDeleted: {
    type: Boolean,
    default: false
  },
  
  deletedAt: {
    type: Date,
    default: null
  },
  
  // Flagging/Reporting
  flags: [{
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reason: {
      type: String,
      enum: ['spam', 'inappropriate', 'harassment', 'off-topic', 'other']
    },
    description: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Admin Actions
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  moderationAction: {
    type: String,
    enum: ['approved', 'hidden', 'deleted'],
    default: 'approved'
  },
  
  moderationNote: {
    type: String,
    trim: true
  },
  
  moderatedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Indexes for better performance
commentSchema.index({ idea: 1, createdAt: -1 });
commentSchema.index({ author: 1 });
commentSchema.index({ parentComment: 1 });
commentSchema.index({ isDeleted: 1, moderationAction: 1 });

// Compound indexes for complex queries
commentSchema.index({ idea: 1, parentComment: 1, isDeleted: 1 });

// Virtual for like count
commentSchema.virtual('likeCount').get(function() {
  return this.likes ? this.likes.length : 0;
});

// Virtual for reply count
commentSchema.virtual('replyCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment',
  count: true,
  match: { isDeleted: false }
});

// Instance method to check if user has liked
commentSchema.methods.hasLiked = function(userId) {
  return this.likes.some(like => like.user.toString() === userId.toString());
};

// Instance method to toggle like
commentSchema.methods.toggleLike = function(userId) {
  const existingLikeIndex = this.likes.findIndex(
    like => like.user.toString() === userId.toString()
  );
  
  if (existingLikeIndex > -1) {
    // Remove like
    this.likes.splice(existingLikeIndex, 1);
    return false; // Removed
  } else {
    // Add like
    this.likes.push({ user: userId });
    return true; // Added
  }
};

// Instance method to soft delete
commentSchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  this.content = '[This comment has been deleted]';
};

// Instance method to flag comment
commentSchema.methods.addFlag = function(reporter, reason, description = '') {
  // Check if user has already flagged this comment
  const existingFlag = this.flags.find(
    flag => flag.reporter.toString() === reporter.toString()
  );
  
  if (!existingFlag) {
    this.flags.push({
      reporter,
      reason,
      description
    });
    return true;
  }
  return false; // Already flagged by this user
};

// Static method to get comments for an idea
commentSchema.statics.getCommentsForIdea = function(ideaId, options = {}) {
  const {
    page = 1,
    limit = 20,
    sortBy = 'createdAt',
    sortOrder = -1,
    includeReplies = true
  } = options;
  
  const skip = (page - 1) * limit;
  
  let query = {
    idea: ideaId,
    isDeleted: false,
    moderationAction: { $ne: 'hidden' }
  };
  
  // If not including replies, only get top-level comments
  if (!includeReplies) {
    query.parentComment = null;
  }
  
  return this.find(query)
    .populate('author', 'name avatar role university')
    .populate({
      path: 'parentComment',
      populate: {
        path: 'author',
        select: 'name avatar'
      }
    })
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
};

// Static method to get replies for a comment
commentSchema.statics.getRepliesForComment = function(commentId, options = {}) {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 1 // Replies typically chronological
  } = options;
  
  const skip = (page - 1) * limit;
  
  return this.find({
    parentComment: commentId,
    isDeleted: false,
    moderationAction: { $ne: 'hidden' }
  })
    .populate('author', 'name avatar role university')
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);
};

// Pre-save middleware to set edit tracking
commentSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.isNew) {
    this.isEdited = true;
    this.editedAt = new Date();
  }
  next();
});

// Ensure virtual fields are serialized
commentSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    // Don't expose flags to regular users
    if (ret.flags) {
      delete ret.flags;
    }
    return ret;
  }
});

module.exports = mongoose.model('Comment', commentSchema);