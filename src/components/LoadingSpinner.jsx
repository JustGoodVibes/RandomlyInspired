import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading...", size = "medium" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16"
  };

  const textSizeClasses = {
    small: "text-sm",
    medium: "text-lg",
    large: "text-xl"
  };

  return (
    <div className="flex flex-col items-center justify-center p-8" role="status" aria-live="polite">
      <motion.div
        className={`${sizeClasses[size]} text-white mb-4`}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <Sparkles className="w-full h-full" />
      </motion.div>
      
      <motion.p 
        className={`text-white ${textSizeClasses[size]} font-medium`}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        {message}
      </motion.p>
      
      {/* Screen reader only text */}
      <span className="sr-only">Content is loading, please wait.</span>
    </div>
  );
};

export default LoadingSpinner;
