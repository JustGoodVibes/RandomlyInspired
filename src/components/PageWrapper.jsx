import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationConfig, pageVariants, pageTransition } from '../utils/animations';

/**
 * PageWrapper component provides consistent page transition animations
 * Optimized for Safari compatibility and cross-browser performance
 */
const PageWrapper = ({ children, className = "", ...props }) => {
  const { shouldReduceMotion } = useAnimationConfig();

  // Safari-specific optimizations
  const safariOptimizedStyle = {
    // Ensure immediate background rendering
    willChange: 'opacity',
    WebkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    // Safari-specific hardware acceleration
    WebkitTransform: 'translateZ(0)',
    transform: 'translateZ(0)',
    WebkitPerspective: 1000,
    perspective: 1000,
    // Prevent Safari gradient flickering
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  };

  return (
    <motion.div
      className={`min-h-screen ${className}`}
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition(shouldReduceMotion)}
      style={safariOptimizedStyle}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
