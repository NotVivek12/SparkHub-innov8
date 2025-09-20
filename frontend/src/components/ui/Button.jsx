import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-gradient-primary text-white border border-transparent shadow-soft hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-gray-800 text-gray-100 border border-gray-700 hover:bg-gray-700 hover:border-gray-600 shadow-soft',
    outline: 'bg-transparent text-primary-500 border border-primary-500 hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/20',
    ghost: 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800',
    danger: 'bg-gradient-to-r from-error-500 to-error-600 text-white border border-transparent shadow-soft hover:shadow-large hover:from-error-600 hover:to-error-700',
    success: 'bg-gradient-to-r from-success-500 to-success-600 text-white border border-transparent shadow-soft hover:shadow-large hover:from-success-600 hover:to-success-700'
  };

  const sizes = {
    xs: 'px-2.5 py-1.5 text-xs rounded-md',
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-xl'
  };

  const isDisabled = disabled || loading;

  return (
    <motion.button
      ref={ref}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        ${variants[variant]} 
        ${sizes[size]} 
        ${isDisabled ? 'pointer-events-none' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;