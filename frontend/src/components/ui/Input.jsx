import { motion } from 'framer-motion';
import { useState, forwardRef } from 'react';
import { Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

const Input = forwardRef(({ 
  label, 
  type = 'text', 
  placeholder = '', 
  className = '',
  error = '',
  success = '',
  helperText = '',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  size = 'md',
  variant = 'default',
  disabled = false,
  required = false,
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(props.value || '');

  const variants = {
    default: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400',
    filled: 'bg-gray-50 dark:bg-gray-900 border-transparent focus:bg-white dark:focus:bg-gray-800 focus:border-primary-500',
    ghost: 'bg-transparent border-transparent border-b-2 border-b-gray-300 dark:border-b-gray-600 rounded-none focus:border-b-primary-500 px-0'
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm', 
    lg: 'px-4 py-4 text-base'
  };

  const hasError = !!error;
  const hasSuccess = !!success;
  const isPassword = type === 'password';
  const currentType = isPassword && showPassword ? 'text' : type;

  const handleChange = (e) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Left Icon */}
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <LeftIcon className={`w-5 h-5 ${hasError ? 'text-error-400' : hasSuccess ? 'text-success-400' : 'text-gray-400'}`} />
          </div>
        )}

        <motion.input
          ref={ref}
          type={currentType}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`
            w-full border rounded-lg transition-all duration-200
            text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-primary-500/20
            disabled:opacity-50 disabled:cursor-not-allowed
            ${variants[variant]}
            ${sizes[size]}
            ${LeftIcon ? 'pl-10' : ''}
            ${RightIcon || isPassword || hasError || hasSuccess ? 'pr-10' : ''}
            ${hasError ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20' : ''}
            ${hasSuccess ? 'border-success-500 focus:border-success-500 focus:ring-success-500/20' : ''}
          `}
          animate={{
            scale: focused ? 1.01 : 1,
          }}
          transition={{ duration: 0.1 }}
          {...props}
        />

        {/* Right Icons */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
          {/* Success Icon */}
          {hasSuccess && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <Check className="w-5 h-5 text-success-500" />
            </motion.div>
          )}
          
          {/* Error Icon */}
          {hasError && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <AlertCircle className="w-5 h-5 text-error-500" />
            </motion.div>
          )}
          
          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
          
          {/* Custom Right Icon */}
          {RightIcon && !hasError && !hasSuccess && (
            <RightIcon className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      
      {/* Helper Text */}
      {(error || success || helperText) && (
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm"
        >
          {error && (
            <p className="text-error-500 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
          {success && (
            <p className="text-success-500 flex items-center gap-1">
              <Check className="w-4 h-4" />
              {success}
            </p>
          )}
          {helperText && !error && !success && (
            <p className="text-gray-500 dark:text-gray-400">{helperText}</p>
          )}
        </motion.div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;