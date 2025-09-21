const { Idea } = require('../models');

// @desc    Submit a new idea
// @route   POST /api/ideas
// @access  Private (Students only)
const submitIdea = async (req, res) => {
  try {
    const {
      title,
      problem,
      solution,
      secretSauce,
      targetAudience,
      requiredHelp,
      privacyLevel,
      category,
      tags
    } = req.body;

    // Check if user is a student
    if (req.user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Only students can submit ideas'
      });
    }

    // Create idea object
    const ideaData = {
      title,
      problem,
      solution,
      secretSauce,
      targetAudience,
      requiredHelp,
      privacyLevel: privacyLevel || 'private',
      category,
      creator: req.user._id
    };

    // Add tags if provided
    if (tags && Array.isArray(tags)) {
      ideaData.tags = tags;
    }

    // Create the idea
    const idea = await Idea.create(ideaData);

    // Populate creator information
    await idea.populate('creator', 'name avatar university department');

    res.status(201).json({
      success: true,
      message: 'Idea submitted successfully',
      data: {
        idea
      }
    });

  } catch (error) {
    console.error('Idea submission error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during idea submission'
    });
  }
};

// @desc    Get ideas with filtering and pagination
// @route   GET /api/ideas
// @access  Public (with optional authentication for personalized results)
const getIdeas = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status,
      privacy,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured
    } = req.query;

    // Build query
    let query = {};

    // Privacy filtering
    if (req.user) {
      // Authenticated user can see their own ideas regardless of privacy
      if (privacy === 'private') {
        query.creator = req.user._id;
      } else if (privacy === 'public') {
        query.privacyLevel = 'public';
      } else {
        // Show public ideas + user's own private ideas
        query.$or = [
          { privacyLevel: 'public' },
          { creator: req.user._id }
        ];
      }
    } else {
      // Unauthenticated users can only see public ideas
      query.privacyLevel = 'public';
    }

    // Category filtering
    if (category) {
      query.category = category;
    }

    // Status filtering (only for authenticated users and their own ideas or admins/teachers)
    if (status && req.user) {
      if (req.user.role === 'admin' || req.user.role === 'teacher') {
        query.status = status;
      } else if (req.user.role === 'student') {
        // Students can only filter status for their own ideas
        query.creator = req.user._id;
        query.status = status;
      }
    }

    // Featured filtering
    if (featured === 'true') {
      query.isFeatured = true;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { problem: { $regex: search, $options: 'i' } },
        { solution: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query
    const ideas = await Idea.find(query)
      .populate('creator', 'name avatar university department role')
      .populate('assignedMentor', 'name avatar expertise')
      .populate('commentCount')
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const total = await Idea.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        ideas,
        pagination: {
          current: pageNum,
          pages: Math.ceil(total / limitNum),
          total,
          limit: limitNum
        }
      }
    });

  } catch (error) {
    console.error('Get ideas error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching ideas'
    });
  }
};

// @desc    Get single idea by ID
// @route   GET /api/ideas/:id
// @access  Public (for public ideas) / Private (for private ideas by owner)
const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate('creator', 'name avatar university department role bio')
      .populate('assignedMentor', 'name avatar expertise bio')
      .populate('commentCount')
      .populate({
        path: 'milestones.createdBy',
        select: 'name avatar role'
      })
      .populate({
        path: 'updates.author',
        select: 'name avatar role'
      });

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    // Check privacy permissions
    if (idea.privacyLevel === 'private') {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required to view private ideas'
        });
      }

      // Only creator, assigned mentor, or admin/teacher can view private ideas
      const canView = 
        idea.creator._id.toString() === req.user._id.toString() ||
        (idea.assignedMentor && idea.assignedMentor._id.toString() === req.user._id.toString()) ||
        req.user.role === 'admin' ||
        req.user.role === 'teacher';

      if (!canView) {
        return res.status(403).json({
          success: false,
          message: 'Access denied to this private idea'
        });
      }
    }

    // Increment view count (only for public ideas or if user is not the creator)
    if (idea.privacyLevel === 'public' && (!req.user || idea.creator._id.toString() !== req.user._id.toString())) {
      idea.views += 1;
      await idea.save();
    }

    // Add user-specific data if authenticated
    let userSpecificData = {};
    if (req.user) {
      userSpecificData.hasUpvoted = idea.hasUpvoted(req.user._id);
    }

    res.status(200).json({
      success: true,
      data: {
        idea,
        userSpecificData
      }
    });

  } catch (error) {
    console.error('Get idea by ID error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid idea ID'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching idea'
    });
  }
};

// @desc    Update idea
// @route   PUT /api/ideas/:id
// @access  Private (Creator only)
const updateIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    // Check if user is the creator
    if (idea.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only update your own ideas'
      });
    }

    // Fields that can be updated by creator
    const allowedUpdates = [
      'title', 'problem', 'solution', 'secretSauce', 
      'targetAudience', 'requiredHelp', 'privacyLevel', 
      'category', 'tags'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true
      }
    ).populate('creator', 'name avatar university department');

    res.status(200).json({
      success: true,
      message: 'Idea updated successfully',
      data: {
        idea: updatedIdea
      }
    });

  } catch (error) {
    console.error('Update idea error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error during idea update'
    });
  }
};

// @desc    Delete idea
// @route   DELETE /api/ideas/:id
// @access  Private (Creator only)
const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    // Check if user is the creator
    if (idea.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own ideas'
      });
    }

    await Idea.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Idea deleted successfully'
    });

  } catch (error) {
    console.error('Delete idea error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during idea deletion'
    });
  }
};

// @desc    Toggle upvote on idea
// @route   POST /api/ideas/:id/upvote
// @access  Private
const toggleUpvote = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    // Check if idea is public or user has access
    if (idea.privacyLevel === 'private') {
      const canAccess = 
        idea.creator.toString() === req.user._id.toString() ||
        (idea.assignedMentor && idea.assignedMentor.toString() === req.user._id.toString()) ||
        req.user.role === 'admin' ||
        req.user.role === 'teacher';

      if (!canAccess) {
        return res.status(403).json({
          success: false,
          message: 'Cannot upvote private ideas you don\'t have access to'
        });
      }
    }

    // Users cannot upvote their own ideas
    if (idea.creator.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot upvote your own idea'
      });
    }

    const wasAdded = idea.toggleUpvote(req.user._id);
    await idea.save();

    res.status(200).json({
      success: true,
      message: wasAdded ? 'Idea upvoted' : 'Upvote removed',
      data: {
        upvoted: wasAdded,
        upvoteCount: idea.upvoteCount
      }
    });

  } catch (error) {
    console.error('Toggle upvote error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during upvote operation'
    });
  }
};

module.exports = {
  submitIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  toggleUpvote
};