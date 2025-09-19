import { motion } from 'framer-motion';
import { useState } from 'react';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder = '', 
  className = '',
  error = '',
  icon: Icon,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        )}
        <motion.input
          type={type}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg
            text-white placeholder-gray-400 transition-all duration-200
            focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none
            ${Icon ? 'pl-12' : 'pl-4'}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
          `}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          whileFocus={{ scale: 1.01 }}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Input;