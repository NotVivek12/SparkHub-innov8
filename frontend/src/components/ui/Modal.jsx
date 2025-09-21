<<<<<<< HEAD
import { motion } from 'framer-motion';

const LoadingSpinner = ({ 
  size = 'md', 
  variant = 'spinner',
  color = 'primary',
  className = '' 
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
    '2xl': 'w-16 h-16'
  };

  const colors = {
    primary: 'border-primary-500',
    secondary: 'border-gray-500',
    success: 'border-success-500',
    warning: 'border-warning-500',
    error: 'border-error-500',
    white: 'border-white'
  };

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className={`${sizes[size]} bg-${color}-500 rounded-full`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <motion.div
          className={`${sizes[size]} bg-${color}-500 rounded-full`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>
    );
  }

  if (variant === 'bars') {
    return (
      <div className={`flex items-center justify-center space-x-1 ${className}`}>
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className={`w-1 bg-${color}-500 rounded-full`}
            style={{ height: size === 'xs' ? '12px' : size === 'sm' ? '16px' : size === 'md' ? '20px' : size === 'lg' ? '24px' : '32px' }}
            animate={{
              scaleY: [1, 2, 1],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: index * 0.1,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'ring') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <motion.div
          className={`${sizes[size]} border-4 border-gray-200 dark:border-gray-700 border-t-${color}-500 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    );
  }

  // Default spinner variant
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`
          ${sizes[size]} border-2 border-gray-200 dark:border-gray-700 
          border-t-${color}-500 rounded-full
        `}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 1, 
          repeat: Infinity, 
          ease: 'linear' 
        }}
      />
    </div>
=======
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = ''
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  const sizes = {
    xs: 'max-w-xs',
    sm: 'max-w-sm', 
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
    full: 'max-w-full'
  };

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;
    
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, closeOnEscape]);

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
      
      // Focus the modal after a small delay
      setTimeout(() => {
        if (modalRef.current) {
          const focusableElement = modalRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElement) {
            focusableElement.focus();
          } else {
            modalRef.current.focus();
          }
        }
      }, 100);
    } else if (previousActiveElement.current) {
      previousActiveElement.current.focus();
    }
  }, [isOpen]);

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ 
              duration: 0.2, 
              ease: [0.4, 0.0, 0.2, 1] 
            }}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            className={`
              w-full ${sizes[size]} 
              bg-white dark:bg-gray-800 
              rounded-2xl shadow-2xl 
              max-h-[90vh] overflow-hidden
              focus:outline-none
              ${className}
            `}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                {title && (
                  <h2 
                    id="modal-title"
                    className="text-xl font-semibold text-gray-900 dark:text-white"
                  >
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="
                      text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                      p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                      transition-colors duration-200
                      focus:outline-none focus:ring-2 focus:ring-primary-500/20
                    "
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
  );

  // Render modal in a portal
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body)
    : null;
};

<<<<<<< HEAD
// Loading progress bar component
export const LoadingProgress = ({ 
  progress = 0, 
  className = '',
  color = 'primary',
  size = 'md'
}) => {
  const heights = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${heights[size]} ${className}`}>
      <motion.div
        className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-600 rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};

// Loading skeleton component  
export const LoadingSkeleton = ({ 
  className = '',
  lines = 1,
  avatar = false
}) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {avatar && (
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      )}
      <div className="space-y-3">
        {Array.from({ length: lines }, (_, i) => (
          <div 
            key={i}
            className={`h-4 bg-gray-200 dark:bg-gray-700 rounded ${
              i === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
=======
// Modal components for common patterns
export const ModalHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

export const ModalBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const ModalFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 ${className}`}>
    {children}
  </div>
);

export default Modal;
>>>>>>> 3b8b87b568fd3e4115b8e7bb4e0ed3142f6f9377
