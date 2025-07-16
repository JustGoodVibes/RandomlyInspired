import { useReducedMotion } from 'framer-motion';

// Shared animation configurations for consistent behavior across components
export const useAnimationConfig = () => {
  const shouldReduceMotion = useReducedMotion();
  
  // Base durations - reduced for users who prefer reduced motion
  const baseDuration = shouldReduceMotion ? 0.2 : 0.6;
  const fastDuration = shouldReduceMotion ? 0.1 : 0.3;
  const slowDuration = shouldReduceMotion ? 0.3 : 1.0;
  
  return {
    shouldReduceMotion,
    baseDuration,
    fastDuration,
    slowDuration,
  };
};

// Page transition animations - optimized to prevent flickering
export const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.02,
  },
};

export const pageTransition = (shouldReduceMotion = false) => ({
  type: "tween",
  ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smoother transitions
  duration: shouldReduceMotion ? 0.15 : 0.4,
});

// Container animations with stagger - optimized for page transitions
export const containerVariants = (shouldReduceMotion = false) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0.1 : 0.3,
      staggerChildren: shouldReduceMotion ? 0.02 : 0.05,
      delayChildren: shouldReduceMotion ? 0 : 0.2, // Delay to let page transition complete
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: shouldReduceMotion ? 0.05 : 0.15,
    },
  },
});

// Item animations for staggered children
export const itemVariants = (shouldReduceMotion = false) => ({
  hidden: { 
    opacity: 0, 
    y: shouldReduceMotion ? 0 : 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: shouldReduceMotion ? 0.2 : 0.5,
      ease: "easeOut",
    },
  },
});

// Card animations - simplified for reduced motion
export const cardVariants = (shouldReduceMotion = false) => ({
  hidden: { 
    opacity: 0, 
    scale: shouldReduceMotion ? 1 : 0.95,
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: shouldReduceMotion ? 0.2 : 0.6,
      ease: "easeOut",
    },
  },
  exit: { 
    opacity: 0, 
    scale: shouldReduceMotion ? 1 : 0.95,
    transition: {
      duration: shouldReduceMotion ? 0.1 : 0.4,
      ease: "easeIn",
    },
  },
});

// Button hover animations
export const buttonVariants = (shouldReduceMotion = false) => ({
  hover: { 
    scale: shouldReduceMotion ? 1 : 1.05,
    transition: { 
      type: "spring", 
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { 
    scale: shouldReduceMotion ? 1 : 0.95,
  },
});

// Floating animations for decorative elements
export const floatingVariants = (shouldReduceMotion = false, delay = 0) => ({
  animate: shouldReduceMotion ? {} : {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    },
  },
});

// Loading spinner animation
export const spinnerVariants = (shouldReduceMotion = false) => ({
  animate: {
    rotate: shouldReduceMotion ? 0 : 360,
    transition: {
      duration: shouldReduceMotion ? 0 : 1,
      repeat: shouldReduceMotion ? 0 : Infinity,
      ease: "linear",
    },
  },
});

// Fade in/out for overlays and modals
export const fadeVariants = (shouldReduceMotion = false) => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: shouldReduceMotion ? 0.1 : 0.3 },
  },
  exit: { 
    opacity: 0,
    transition: { duration: shouldReduceMotion ? 0.1 : 0.2 },
  },
});

// Progress bar animation
export const progressVariants = (shouldReduceMotion = false) => ({
  initial: { width: 0 },
  animate: { 
    width: "100%",
    transition: { 
      duration: shouldReduceMotion ? 0.2 : 0.5,
      ease: "easeOut",
    },
  },
});
