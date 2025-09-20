const express = require('express');
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegistration } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', validateRegistration, register);
router.post('/login', login);

// Protected routes
router.use(protect); // Apply authentication middleware to all routes below

router.get('/me', getMe);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

module.exports = router;