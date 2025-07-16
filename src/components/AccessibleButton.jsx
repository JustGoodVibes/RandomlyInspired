import React from 'react';
import { motion } from 'framer-motion';

const AccessibleButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false,
  ariaLabel,
  ...props 
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:ring-purple-300',
    secondary: 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-300',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
    ghost: 'bg-transparent text-white border border-white/20 hover:bg-white/10 focus:ring-white/30'
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled && onClick) {
        onClick(e);
      }
    }
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-label={ariaLabel}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AccessibleButton;
