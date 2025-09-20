const express = require('express');
const {
  submitIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  toggleUpvote
} = require('../controllers/ideaController');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { validateIdea } = require('../middleware/validation');

const router = express.Router();

// Public routes (with optional authentication for personalized results)
router.get('/', optionalAuth, getIdeas);
router.get('/:id', optionalAuth, getIdeaById);

// Protected routes - require authentication
router.use(protect);

// Student-only routes
router.post('/', authorize('student'), validateIdea, submitIdea);

// Routes for idea creators
router.put('/:id', validateIdea, updateIdea);
router.delete('/:id', deleteIdea);

// Community interaction routes
router.post('/:id/upvote', toggleUpvote);

module.exports = router;