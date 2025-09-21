import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  padding = 'default',
  shadow = 'soft',
  rounded = 'xl',
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    glass: 'bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-white/10',
    gradient: 'bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-800 dark:to-gray-900 border border-primary-200/20 dark:border-gray-700',
    elevated: 'bg-white dark:bg-gray-800 border-0'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6', 
    lg: 'p-8',
    xl: 'p-10'
  };

  const shadows = {
    none: '',
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    large: 'shadow-large',
    glow: 'shadow-glow'
  };

  const roundeds = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    '4xl': 'rounded-4xl'
  };

  const hoverEffects = hover ? {
    whileHover: { 
      y: -4,
      scale: 1.02,
      transition: { duration: 0.2, ease: 'easeOut' }
    }
  } : {};

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...hoverEffects}
      className={`
        ${variants[variant]} 
        ${paddings[padding]}
        ${shadows[shadow]}
        ${roundeds[rounded]}
        transition-all duration-300 ease-out
        ${hover ? 'hover:shadow-large hover:shadow-primary-500/10' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;