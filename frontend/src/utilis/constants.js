// App Configuration
export const APP_CONFIG = {
  name: 'SparkHub',
  tagline: 'From Classroom Concept to Real-World Creation',
  version: '1.0.0',
  description: 'A platform connecting student innovators with mentors and peers',
};

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  BASE_URL: process.env.VITE_API_URL || 'http://localhost:3000/api',
  AUTH: '/auth',
  USERS: '/users',
  PROJECTS: '/projects',
  MENTORS: '/mentors',
  IDEAS: '/ideas',
  COMMUNITY: '/community',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  STUDENT_DASHBOARD: '/student-dashboard',
  MENTOR_DASHBOARD: '/mentor-dashboard',
  SUBMIT_IDEA: '/submit-idea',
  PROJECT_DETAILS: '/project',
  COMMUNITY: '/community',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
};

// Project Categories
export const PROJECT_CATEGORIES = [
  { id: 'ai-ml', name: 'AI/ML', color: 'blue' },
  { id: 'iot', name: 'IoT', color: 'green' },
  { id: 'sustainability', name: 'Sustainability', color: 'emerald' },
  { id: 'healthcare', name: 'Healthcare', color: 'red' },
  { id: 'fintech', name: 'FinTech', color: 'yellow' },
  { id: 'edtech', name: 'EdTech', color: 'purple' },
  { id: 'social-impact', name: 'Social Impact', color: 'pink' },
  { id: 'mobile-apps', name: 'Mobile Apps', color: 'indigo' },
  { id: 'web-apps', name: 'Web Apps', color: 'cyan' },
  { id: 'other', name: 'Other', color: 'gray' },
];

// Project Status Options
export const PROJECT_STATUS = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  FEEDBACK_RECEIVED: 'feedback_received',
  MENTOR_ASSIGNED: 'mentor_assigned',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
};

// Project Status Labels
export const PROJECT_STATUS_LABELS = {
  [PROJECT_STATUS.DRAFT]: 'Draft',
  [PROJECT_STATUS.SUBMITTED]: 'Submitted',
  [PROJECT_STATUS.UNDER_REVIEW]: 'Under Review',
  [PROJECT_STATUS.FEEDBACK_RECEIVED]: 'Feedback Received',
  [PROJECT_STATUS.MENTOR_ASSIGNED]: 'Mentor Assigned',
  [PROJECT_STATUS.IN_PROGRESS]: 'In Progress',
  [PROJECT_STATUS.COMPLETED]: 'Completed',
  [PROJECT_STATUS.ARCHIVED]: 'Archived',
};

// Help Types for Ideas
export const HELP_TYPES = [
  'Technical mentorship',
  'Business advice',
  'Funding guidance',
  'Team members',
  'Marketing support',
  'Legal advice',
  'Design help',
  'Research assistance',
];

// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  MENTOR: 'mentor',
  ADMIN: 'admin',
  UNIVERSITY_ADMIN: 'university_admin',
};

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 0.8,
};

// Breakpoints (matches Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Color Themes
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

// Toast Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

// File Upload Limits
export const FILE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
};

export default {
  APP_CONFIG,
  API_ENDPOINTS,
  ROUTES,
  PROJECT_CATEGORIES,
  PROJECT_STATUS,
  PROJECT_STATUS_LABELS,
  HELP_TYPES,
  USER_ROLES,
  ANIMATION_DURATIONS,
  BREAKPOINTS,
  THEMES,
  TOAST_TYPES,
  FILE_LIMITS,
};