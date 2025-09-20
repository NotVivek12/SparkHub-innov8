// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error('Error:', err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = { message, statusCode: 401 };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = { message, statusCode: 401 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

// 404 handler for undefined routes
const notFound = (req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  if (req.user) {
    console.log(`User: ${req.user.email} (${req.user.role})`);
  }
  next();
};

// Rate limiting helper (basic implementation)
const rateLimitStore = new Map();

const rateLimit = (windowMs = 15 * 60 * 1000, max = 100) => {
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    
    if (!rateLimitStore.has(key)) {
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }
    
    const userData = rateLimitStore.get(key);
    
    if (now > userData.resetTime) {
      userData.count = 1;
      userData.resetTime = now + windowMs;
      return next();
    }
    
    if (userData.count >= max) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests, please try again later'
      });
    }
    
    userData.count++;
    next();
  };
};

// Validation middleware for common request body validations
const validateIdea = (req, res, next) => {
  const { title, problem, solution, secretSauce, targetAudience, category } = req.body;
  
  const errors = [];
  
  if (!title || title.trim().length === 0) {
    errors.push('Title is required');
  } else if (title.length > 100) {
    errors.push('Title cannot be more than 100 characters');
  }
  
  if (!problem || problem.trim().length === 0) {
    errors.push('Problem description is required');
  } else if (problem.length > 1000) {
    errors.push('Problem description cannot be more than 1000 characters');
  }
  
  if (!solution || solution.trim().length === 0) {
    errors.push('Solution is required');
  } else if (solution.length > 280) {
    errors.push('Solution must be like a tweet - max 280 characters');
  }
  
  if (!secretSauce || secretSauce.trim().length === 0) {
    errors.push('Secret sauce is required');
  } else if (secretSauce.length > 500) {
    errors.push('Secret sauce cannot be more than 500 characters');
  }
  
  if (!targetAudience || targetAudience.trim().length === 0) {
    errors.push('Target audience is required');
  } else if (targetAudience.length > 300) {
    errors.push('Target audience cannot be more than 300 characters');
  }
  
  if (!category || category.trim().length === 0) {
    errors.push('Category is required');
  }
  
  const validCategories = [
    'AI/ML', 'Web Development', 'Mobile Apps', 'Healthcare', 'Education',
    'Finance/FinTech', 'Sustainability', 'IoT', 'Blockchain', 'Gaming',
    'E-commerce', 'Social Impact', 'Other'
  ];
  
  if (category && !validCategories.includes(category)) {
    errors.push('Invalid category');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors
    });
  }
  
  next();
};

const validateComment = (req, res, next) => {
  const { content } = req.body;
  
  const errors = [];
  
  if (!content || content.trim().length === 0) {
    errors.push('Comment content is required');
  } else if (content.length > 1000) {
    errors.push('Comment cannot be more than 1000 characters');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors
    });
  }
  
  next();
};

const validateRegistration = (req, res, next) => {
  const { name, email, password, role } = req.body;
  
  const errors = [];
  
  if (!name || name.trim().length === 0) {
    errors.push('Name is required');
  } else if (name.length > 100) {
    errors.push('Name cannot be more than 100 characters');
  }
  
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please provide a valid email address');
    }
  }
  
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (role && !['student', 'teacher'].includes(role)) {
    errors.push('Role must be either student or teacher');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors
    });
  }
  
  next();
};

// Security headers middleware
const securityHeaders = (req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
};

module.exports = {
  errorHandler,
  notFound,
  requestLogger,
  rateLimit,
  validateIdea,
  validateComment,
  validateRegistration,
  securityHeaders
};