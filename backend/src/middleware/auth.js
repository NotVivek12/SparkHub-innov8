const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Protect routes - Authentication middleware
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user by ID from token
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Token is valid but user no longer exists'
        });
      }

      // Check if user account is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        });
      }

      // Add user to request object
      req.user = user;
      next();

    } catch (tokenError) {
      console.error('Token verification error:', tokenError);
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};

// Authorize roles - Role-based access control
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required roles: ${roles.join(', ')}`
      });
    }

    next();
  };
};

// Optional authentication - Doesn't fail if no token
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by ID from token
        const user = await User.findById(decoded.userId);
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (tokenError) {
        // Token is invalid, but we continue without user
        console.log('Invalid token in optional auth:', tokenError.message);
      }
    }

    next();

  } catch (error) {
    console.error('Optional auth middleware error:', error);
    next(); // Continue even if there's an error
  }
};

// Check if user is verified (for teachers/mentors)
const requireVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }

  if (req.user.role === 'teacher' && !req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message: 'Account verification required. Please contact administrator.'
    });
  }

  next();
};

// Check if user owns the resource or is admin
const checkOwnership = (resourceUserField = 'creator') => {
  return (req, res, next) => {
    // This middleware should be used after the resource is fetched
    // and stored in req.resource or a similar field
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const resource = req.resource || req.idea || req.comment;
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    const resourceUserId = resource[resourceUserField];
    const currentUserId = req.user._id;

    // Allow if user owns the resource or is admin
    if (resourceUserId.toString() === currentUserId.toString() || req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.'
      });
    }
  };
};

module.exports = {
  protect,
  authorize,
  optionalAuth,
  requireVerification,
  checkOwnership
};