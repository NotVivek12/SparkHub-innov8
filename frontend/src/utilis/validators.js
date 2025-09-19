// Validation utility functions

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email is required';
  if (!emailRegex.test(email)) return 'Please enter a valid email address';
  return null;
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters long';
  if (!/(?=.*[a-z])/.test(password)) return 'Password must contain at least one lowercase letter';
  if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/(?=.*\d)/.test(password)) return 'Password must contain at least one number';
  return null;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return 'Please confirm your password';
  if (password !== confirmPassword) return 'Passwords do not match';
  return null;
};

// Name validation
export const validateName = (name, field = 'Name') => {
  if (!name) return `${field} is required`;
  if (name.trim().length < 2) return `${field} must be at least 2 characters long`;
  if (name.trim().length > 50) return `${field} must be less than 50 characters`;
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return `${field} can only contain letters, spaces, hyphens, and apostrophes`;
  return null;
};

// University validation
export const validateUniversity = (university) => {
  if (!university) return 'University is required';
  if (university.trim().length < 2) return 'University name must be at least 2 characters long';
  return null;
};

// Major validation
export const validateMajor = (major) => {
  if (!major) return 'Major is required';
  if (major.trim().length < 2) return 'Major must be at least 2 characters long';
  return null;
};

// Year validation
export const validateYear = (year) => {
  if (!year) return 'Year is required';
  const yearNum = parseInt(year);
  if (isNaN(yearNum) || yearNum < 1 || yearNum > 8) return 'Year must be between 1 and 8';
  return null;
};

// Project title validation
export const validateProjectTitle = (title) => {
  if (!title) return 'Project title is required';
  if (title.trim().length < 3) return 'Title must be at least 3 characters long';
  if (title.trim().length > 100) return 'Title must be less than 100 characters';
  return null;
};

// Project description validation
export const validateProjectDescription = (description, minLength = 20, maxLength = 500) => {
  if (!description) return 'Description is required';
  if (description.trim().length < minLength) return `Description must be at least ${minLength} characters long`;
  if (description.trim().length > maxLength) return `Description must be less than ${maxLength} characters`;
  return null;
};

// Solution validation (for idea submission)
export const validateSolution = (solution) => {
  if (!solution) return 'Solution description is required';
  if (solution.trim().length < 10) return 'Solution must be at least 10 characters long';
  if (solution.trim().length > 280) return 'Solution must be less than 280 characters (like a tweet!)';
  return null;
};

// Target audience validation
export const validateTargetAudience = (audience) => {
  if (!audience) return 'Target audience is required';
  if (audience.trim().length < 5) return 'Target audience description must be at least 5 characters long';
  if (audience.trim().length > 200) return 'Target audience description must be less than 200 characters';
  return null;
};

// Category validation
export const validateCategory = (category) => {
  const validCategories = [
    'AI/ML', 'IoT', 'Sustainability', 'Healthcare', 'FinTech', 'EdTech',
    'Social Impact', 'Mobile Apps', 'Web Apps', 'Other'
  ];
  if (!category) return 'Category is required';
  if (!validCategories.includes(category)) return 'Please select a valid category';
  return null;
};

// URL validation
export const validateURL = (url, required = false) => {
  if (!url && !required) return null;
  if (!url && required) return 'URL is required';
  
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
};

// Phone number validation
export const validatePhoneNumber = (phone, required = false) => {
  if (!phone && !required) return null;
  if (!phone && required) return 'Phone number is required';
  
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
    return 'Please enter a valid phone number';
  }
  return null;
};

// Bio validation
export const validateBio = (bio, maxLength = 500) => {
  if (bio && bio.length > maxLength) return `Bio must be less than ${maxLength} characters`;
  return null;
};

// Skills validation
export const validateSkills = (skills, minSkills = 1, maxSkills = 10) => {
  if (!skills || skills.length < minSkills) return `Please add at least ${minSkills} skill(s)`;
  if (skills.length > maxSkills) return `Please add no more than ${maxSkills} skills`;
  return null;
};

// File validation
export const validateFile = (file, options = {}) => {
  const {
    required = false,
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  } = options;

  if (!file && required) return 'File is required';
  if (!file && !required) return null;

  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return `File size must be less than ${maxSizeMB}MB`;
  }

  if (!allowedTypes.includes(file.type)) {
    const allowedExtensions = allowedTypes.map(type => type.split('/')[1]).join(', ');
    return `File type must be one of: ${allowedExtensions}`;
  }

  return null;
};

// Form validation helper
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(field => {
    const rules = validationRules[field];
    const value = formData[field];
    
    for (const rule of rules) {
      const error = rule(value, formData);
      if (error) {
        errors[field] = error;
        isValid = false;
        break; // Stop at first error for this field
      }
    }
  });

  return { isValid, errors };
};

// Common validation rule builders
export const required = (message = 'This field is required') => (value) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return message;
  }
  return null;
};

export const minLength = (length, message) => (value) => {
  if (value && value.length < length) {
    return message || `Must be at least ${length} characters long`;
  }
  return null;
};

export const maxLength = (length, message) => (value) => {
  if (value && value.length > length) {
    return message || `Must be less than ${length} characters long`;
  }
  return null;
};

export const pattern = (regex, message) => (value) => {
  if (value && !regex.test(value)) {
    return message || 'Invalid format';
  }
  return null;
};

// Example validation schemas for common forms
export const loginValidationSchema = {
  email: [required('Email is required'), validateEmail],
  password: [required('Password is required')]
};

export const registerValidationSchema = {
  name: [validateName],
  email: [validateEmail],
  password: [validatePassword],
  confirmPassword: [(value, formData) => validateConfirmPassword(formData.password, value)],
  university: [validateUniversity],
  major: [validateMajor],
  year: [validateYear]
};

export const ideaSubmissionValidationSchema = {
  title: [validateProjectTitle],
  problem: [required('Problem description is required'), minLength(20)],
  solution: [validateSolution],
  secretSauce: [required('Secret sauce is required'), minLength(10)],
  targetAudience: [validateTargetAudience],
  category: [validateCategory]
};

export default {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validateUniversity,
  validateMajor,
  validateYear,
  validateProjectTitle,
  validateProjectDescription,
  validateSolution,
  validateTargetAudience,
  validateCategory,
  validateURL,
  validatePhoneNumber,
  validateBio,
  validateSkills,
  validateFile,
  validateForm,
  required,
  minLength,
  maxLength,
  pattern,
  loginValidationSchema,
  registerValidationSchema,
  ideaSubmissionValidationSchema,
};