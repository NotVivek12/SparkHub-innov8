const express = require('express');
const {
  addComment,
  getComments,
  getReplies,
  updateComment,
  deleteComment,
  toggleCommentLike
} = require('../controllers/commentController');
const { protect, optionalAuth } = require('../middleware/auth');
const { validateComment } = require('../middleware/validation');

const router = express.Router();

// Comment routes for specific ideas
// GET /api/ideas/:ideaId/comments - Get comments for an idea
router.get('/ideas/:ideaId/comments', optionalAuth, getComments);

// Protected routes for commenting
router.use(protect);

// POST /api/ideas/:ideaId/comments - Add comment to an idea
router.post('/ideas/:ideaId/comments', validateComment, addComment);

// Comment management routes
router.put('/:id', validateComment, updateComment);
router.delete('/:id', deleteComment);
router.post('/:id/like', toggleCommentLike);

// Reply routes
router.get('/:commentId/replies', getReplies);

module.exports = router;