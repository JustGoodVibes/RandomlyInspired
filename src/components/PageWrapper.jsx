import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationConfig, pageVariants, pageTransition } from '../utils/animations';

/**
 * PageWrapper component provides consistent page transition animations
 * Simplified to eliminate layout conflicts and white flashes
 */
const PageWrapper = ({ children, className = "", ...props }) => {
  const { shouldReduceMotion } = useAnimationConfig();

  return (
    <motion.div
      className={`min-h-screen ${className}`}
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition(shouldReduceMotion)}
      style={{
        // Ensure immediate background rendering
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden',
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
