import React from 'react';
import { motion } from 'framer-motion';
import { useAnimationConfig, pageVariants, pageTransition } from '../utils/animations';

/**
 * PageWrapper component provides consistent page transition animations
 * and layout stability across all pages
 */
const PageWrapper = ({ children, className = "", ...props }) => {
  const { shouldReduceMotion } = useAnimationConfig();

  return (
    <motion.div
      className={`min-h-screen page-content ${className}`}
      data-page-wrapper
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition(shouldReduceMotion)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
