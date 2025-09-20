const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({
  // Creator Information
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Creator is required']
  },
  
  // Structured Idea Template Fields
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  
  problem: {
    type: String,
    required: [true, 'Problem description is required'],
    trim: true,
    maxlength: [1000, 'Problem description cannot be more than 1000 characters']
  },
  
  solution: {
    type: String,
    required: [true, 'Solution description is required'],
    trim: true,
    maxlength: [280, 'Solution must be like a tweet - max 280 characters']
  },
  
  secretSauce: {
    type: String,
    required: [true, 'Secret sauce is required'],
    trim: true,
    maxlength: [500, 'Secret sauce cannot be more than 500 characters']
  },
  
  targetAudience: {
    type: String,
    required: [true, 'Target audience is required'],
    trim: true,
    maxlength: [300, 'Target audience cannot be more than 300 characters']
  },
  
  requiredHelp: [{
    type: String,
    enum: [
      'Technical Mentorship',
      'Business Advice', 
      'Funding',
      'Teammates',
      'Marketing Support',
      'Legal Guidance',
      'Product Development',
      'Market Research',
      'Networking',
      'Other'
    ]
  }],
  
  // Privacy and Visibility
  privacyLevel: {
    type: String,
    enum: ['private', 'public'],
    required: [true, 'Privacy level is required'],
    default: 'private'
  },
  
  // Categorization
  category: {
    type: String,
    enum: [
      'AI/ML',
      'Web Development',
      'Mobile Apps',
      'Healthcare',
      'Education',
      'Finance/FinTech',
      'Sustainability',
      'IoT',
      'Blockchain',
      'Gaming',
      'E-commerce',
      'Social Impact',
      'Other'
    ],
    required: [true, 'Category is required']
  },
  
  tags: [{
    type: String,
    trim: true,
    maxlength: [30, 'Each tag cannot be more than 30 characters']
  }],
  
  // Project Status and Progress
  status: {
    type: String,
    enum: [
      'Submitted',
      'Under Review',
      'Feedback Received',
      'Mentor Assigned',
      'In Progress',
      'Completed',
      'Rejected',
      'On Hold'
    ],
    default: 'Submitted'
  },
  
  // Mentor Assignment
  assignedMentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  mentorAssignedAt: {
    type: Date,
    default: null
  },
  
  // Community Engagement
  upvotes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  views: {
    type: Number,
    default: 0
  },
  
  // Project Timeline and Updates
  milestones: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    dueDate: {
      type: Date
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Date,
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  updates: [{
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Admin/Review Information
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  reviewedAt: {
    type: Date,
    default: null
  },
  
  reviewNotes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Review notes cannot be more than 1000 characters']
  },
  
  // Attachments and Media
  attachments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Featured/Showcase
  isFeatured: {
    type: Boolean,
    default: false
  },
  
  featuredAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Indexes for better performance
ideaSchema.index({ creator: 1 });
ideaSchema.index({ status: 1 });
ideaSchema.index({ category: 1 });
ideaSchema.index({ privacyLevel: 1 });
ideaSchema.index({ assignedMentor: 1 });
ideaSchema.index({ isFeatured: 1 });
ideaSchema.index({ createdAt: -1 });
ideaSchema.index({ 'upvotes.user': 1 });

// Compound indexes for complex queries
ideaSchema.index({ privacyLevel: 1, status: 1, category: 1 });
ideaSchema.index({ creator: 1, status: 1 });

// Virtual for upvote count
ideaSchema.virtual('upvoteCount').get(function() {
  return this.upvotes ? this.upvotes.length : 0;
});

// Virtual for comment count (will be populated from Comment model)
ideaSchema.virtual('commentCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'idea',
  count: true
});

// Instance method to check if user has upvoted
ideaSchema.methods.hasUpvoted = function(userId) {
  return this.upvotes.some(upvote => upvote.user.toString() === userId.toString());
};

// Instance method to toggle upvote
ideaSchema.methods.toggleUpvote = function(userId) {
  const existingUpvoteIndex = this.upvotes.findIndex(
    upvote => upvote.user.toString() === userId.toString()
  );
  
  if (existingUpvoteIndex > -1) {
    // Remove upvote
    this.upvotes.splice(existingUpvoteIndex, 1);
    return false; // Removed
  } else {
    // Add upvote
    this.upvotes.push({ user: userId });
    return true; // Added
  }
};

// Instance method to add milestone
ideaSchema.methods.addMilestone = function(milestoneData, createdBy) {
  this.milestones.push({
    ...milestoneData,
    createdBy
  });
};

// Instance method to add update
ideaSchema.methods.addUpdate = function(updateData, author) {
  this.updates.push({
    ...updateData,
    author
  });
};

// Static method to get public ideas with filters
ideaSchema.statics.getPublicIdeas = function(filters = {}) {
  const query = { privacyLevel: 'public', ...filters };
  return this.find(query)
    .populate('creator', 'name avatar university department')
    .populate('assignedMentor', 'name avatar expertise')
    .sort({ createdAt: -1 });
};

// Ensure virtual fields are serialized
ideaSchema.set('toJSON', {
  virtuals: true,
  transform: function(doc, ret) {
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Idea', ideaSchema);