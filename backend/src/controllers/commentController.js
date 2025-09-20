const { Comment, Idea } = require('../models');

// @desc    Add comment to an idea
// @route   POST /api/ideas/:ideaId/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { content, parentComment } = req.body;
    const { ideaId } = req.params;

    // Check if idea exists
    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    // Check if user can comment on this idea
    if (idea.privacyLevel === 'private') {
      const canComment = 
        idea.creator.toString() === req.user._id.toString() ||
        (idea.assignedMentor && idea.assignedMentor.toString() === req.user._id.toString()) ||
        req.user.role === 'admin' ||
        req.user.role === 'teacher';

      if (!canComment) {
        return res.status(403).json({
          success: false,
          message: 'You cannot comment on this private idea'
        });
      }
    }

    // If this is a reply, check if parent comment exists
    if (parentComment) {
      const parentCommentDoc = await Comment.findById(parentComment);
      if (!parentCommentDoc) {
        return res.status(404).json({
          success: false,
          message: 'Parent comment not found'
        });
      }

      // Check if parent comment belongs to the same idea
      if (parentCommentDoc.idea.toString() !== ideaId) {
        return res.status(400).json({
          success: false,
          message: 'Parent comment does not belong to this idea'
        });
      }
    }

    // Create comment
    const commentData = {
      content,
      author: req.user._id,
      idea: ideaId
    };

    if (parentComment) {
      commentData.parentComment = parentComment;
    }

    const comment = await Comment.create(commentData);

    // Populate author information
    await comment.populate('author', 'name avatar role university');
    if (parentComment) {
      await comment.populate({
        path: 'parentComment',
        populate: {
          path: 'author',
          select: 'name avatar'
        }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: {
        comment
      }
    });

  } catch (error) {
    console.error('Add comment error:', error);
    
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
      message: 'Server error during comment creation'
    });
  }
};

// @desc    Get comments for an idea
// @route   GET /api/ideas/:ideaId/comments
// @access  Public (for public ideas) / Private (for private ideas)
const getComments = async (req, res) => {
  try {
    const { ideaId } = req.params;
    const {
      page = 1,
      limit = 20,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      includeReplies = 'true'
    } = req.query;

    // Check if idea exists
    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found'
      });
    }

    // Check if user can view comments on this idea
    if (idea.privacyLevel === 'private') {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required to view comments on private ideas'
        });
      }

      const canView = 
        idea.creator.toString() === req.user._id.toString() ||
        (idea.assignedMentor && idea.assignedMentor.toString() === req.user._id.toString()) ||
        req.user.role === 'admin' ||
        req.user.role === 'teacher';

      if (!canView) {
        return res.status(403).json({
          success: false,
          message: 'Access denied to comments on this private idea'
        });
      }
    }

    // Get comments using the static method
    const comments = await Comment.getCommentsForIdea(ideaId, {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder: sortOrder === 'desc' ? -1 : 1,
      includeReplies: includeReplies === 'true'
    });

    // Get total count for pagination
    let query = {
      idea: ideaId,
      isDeleted: false,
      moderationAction: { $ne: 'hidden' }
    };

    if (includeReplies !== 'true') {
      query.parentComment = null;
    }

    const total = await Comment.countDocuments(query);

    // Add user-specific data if authenticated
    const commentsWithUserData = req.user ? comments.map(comment => {
      const commentObj = comment.toObject();
      commentObj.userSpecificData = {
        hasLiked: comment.hasLiked(req.user._id),
        canEdit: comment.author._id.toString() === req.user._id.toString(),
        canDelete: comment.author._id.toString() === req.user._id.toString() || req.user.role === 'admin'
      };
      return commentObj;
    }) : comments;

    res.status(200).json({
      success: true,
      data: {
        comments: commentsWithUserData,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching comments'
    });
  }
};

// @desc    Get replies for a comment
// @route   GET /api/comments/:commentId/replies
// @access  Public (for public ideas) / Private (for private ideas)
const getReplies = async (req, res) => {
  try {
    const { commentId } = req.params;
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'asc'
    } = req.query;

    // Check if parent comment exists
    const parentComment = await Comment.findById(commentId).populate('idea');
    if (!parentComment) {
      return res.status(404).json({
        success: false,
        message: 'Parent comment not found'
      });
    }

    const idea = parentComment.idea;

    // Check if user can view replies on this idea
    if (idea.privacyLevel === 'private') {
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required to view replies on private ideas'
        });
      }

      const canView = 
        idea.creator.toString() === req.user._id.toString() ||
        (idea.assignedMentor && idea.assignedMentor.toString() === req.user._id.toString()) ||
        req.user.role === 'admin' ||
        req.user.role === 'teacher';

      if (!canView) {
        return res.status(403).json({
          success: false,
          message: 'Access denied to replies on this private idea'
        });
      }
    }

    // Get replies using the static method
    const replies = await Comment.getRepliesForComment(commentId, {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder: sortOrder === 'desc' ? -1 : 1
    });

    // Get total count for pagination
    const total = await Comment.countDocuments({
      parentComment: commentId,
      isDeleted: false,
      moderationAction: { $ne: 'hidden' }
    });

    // Add user-specific data if authenticated
    const repliesWithUserData = req.user ? replies.map(reply => {
      const replyObj = reply.toObject();
      replyObj.userSpecificData = {
        hasLiked: reply.hasLiked(req.user._id),
        canEdit: reply.author._id.toString() === req.user._id.toString(),
        canDelete: reply.author._id.toString() === req.user._id.toString() || req.user.role === 'admin'
      };
      return replyObj;
    }) : replies;

    res.status(200).json({
      success: true,
      data: {
        replies: repliesWithUserData,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / parseInt(limit)),
          total,
          limit: parseInt(limit)
        }
      }
    });

  } catch (error) {
    console.error('Get replies error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching replies'
    });
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private (Author only)
const updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    // Find comment
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user is the author
    if (comment.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only edit your own comments'
      });
    }

    // Check if comment is deleted
    if (comment.isDeleted) {
      return res.status(400).json({
        success: false,
        message: 'Cannot edit deleted comment'
      });
    }

    // Update comment
    comment.content = content;
    await comment.save();

    // Populate author information
    await comment.populate('author', 'name avatar role university');

    res.status(200).json({
      success: true,
      message: 'Comment updated successfully',
      data: {
        comment
      }
    });

  } catch (error) {
    console.error('Update comment error:', error);
    
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
      message: 'Server error during comment update'
    });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private (Author only or Admin)
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find comment
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if user can delete this comment
    const canDelete = 
      comment.author.toString() === req.user._id.toString() ||
      req.user.role === 'admin';

    if (!canDelete) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own comments'
      });
    }

    // Soft delete the comment
    comment.softDelete();
    await comment.save();

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully'
    });

  } catch (error) {
    console.error('Delete comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during comment deletion'
    });
  }
};

// @desc    Toggle like on comment
// @route   POST /api/comments/:id/like
// @access  Private
const toggleCommentLike = async (req, res) => {
  try {
    const { id } = req.params;

    // Find comment
    const comment = await Comment.findById(id).populate('idea');
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    // Check if comment is deleted
    if (comment.isDeleted) {
      return res.status(400).json({
        success: false,
        message: 'Cannot like deleted comment'
      });
    }

    const idea = comment.idea;

    // Check if user can access this comment
    if (idea.privacyLevel === 'private') {
      const canAccess = 
        idea.creator.toString() === req.user._id.toString() ||
        (idea.assignedMentor && idea.assignedMentor.toString() === req.user._id.toString()) ||
        req.user.role === 'admin' ||
        req.user.role === 'teacher';

      if (!canAccess) {
        return res.status(403).json({
          success: false,
          message: 'Cannot like comments on private ideas you don\'t have access to'
        });
      }
    }

    const wasAdded = comment.toggleLike(req.user._id);
    await comment.save();

    res.status(200).json({
      success: true,
      message: wasAdded ? 'Comment liked' : 'Like removed',
      data: {
        liked: wasAdded,
        likeCount: comment.likeCount
      }
    });

  } catch (error) {
    console.error('Toggle comment like error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during like operation'
    });
  }
};

module.exports = {
  addComment,
  getComments,
  getReplies,
  updateComment,
  deleteComment,
  toggleCommentLike
};