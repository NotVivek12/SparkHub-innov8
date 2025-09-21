const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import configurations and middleware
const connectDatabase = require('./config/database');
const {
  errorHandler,
  notFound,
  requestLogger,
  rateLimit,
  securityHeaders
} = require('./middleware/validation');

// Import routes
const authRoutes = require('./routes/auth');
const ideaRoutes = require('./routes/ideas');
const commentRoutes = require('./routes/comments');

// Create Express app
const app = express();

// Connect to database
connectDatabase();

// Security headers
app.use(securityHeaders);

// Enable trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:3001'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
if (process.env.NODE_ENV === 'development') {
  app.use(requestLogger);
}

// Rate limiting
app.use(rateLimit(15 * 60 * 1000, 100)); // 100 requests per 15 minutes

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SparkHub API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SparkHub API v1.0',
    tagline: 'From Classroom Concept to Real-World Creation',
    endpoints: {
      auth: '/api/auth',
      ideas: '/api/ideas',
      comments: '/api/comments'
    },
    documentation: 'See README.md for detailed API documentation'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/comments', commentRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Get port from environment
const PORT = process.env.PORT || 5000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`
    SparkHub API Server is running!
    Port: ${PORT}
    Environment: ${process.env.NODE_ENV || 'development'}
    Tagline: From Classroom Concept to Real-World Creation
    Health Check: http://localhost:${PORT}/health
    API Info: http://localhost:${PORT}/api
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled Rejection:', err.message);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err.message);
  console.log('Shutting down the server due to Uncaught Exception');
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;