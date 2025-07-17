import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimationConfig } from '../utils/animations';

/**
 * ConfettiAnimation component creates a celebratory confetti effect
 * with colorful particles that fall from the top of the screen
 */
const ConfettiAnimation = ({ 
  isActive = false, 
  onComplete = () => {},
  duration = 3000,
  particleCount = 50 
}) => {
  const { shouldReduceMotion } = useAnimationConfig();
  const [particles, setParticles] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Theme-compliant confetti colors (purple/pink gradient theme)
  const confettiColors = [
    '#8B5CF6', // Purple-500
    '#A855F7', // Purple-500
    '#C084FC', // Purple-400
    '#E879F9', // Fuchsia-400
    '#F472B6', // Pink-400
    '#FB7185', // Rose-400
    '#FBBF24', // Amber-400 (celebration gold)
    '#34D399', // Emerald-400 (success green)
    '#60A5FA', // Blue-400 (complementary blue)
    '#A78BFA', // Violet-400
    '#F59E0B', // Amber-500 (richer gold)
    '#10B981', // Emerald-500 (richer green)
  ];

  // Generate random confetti particles
  const generateParticles = () => {
    const newParticles = [];
    const count = shouldReduceMotion ? Math.min(particleCount / 3, 15) : particleCount;
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // Percentage across screen width
        y: -10, // Start above screen
        rotation: Math.random() * 360,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        size: Math.random() * 8 + 4, // 4-12px
        shape: Math.random() > 0.7 ? 'star' : (Math.random() > 0.5 ? 'circle' : 'square'),
        delay: Math.random() * 0.8, // Stagger particle start times
        drift: (Math.random() - 0.5) * 40, // Horizontal drift
      });
    }
    return newParticles;
  };

  // Trigger confetti animation
  useEffect(() => {
    if (isActive && !shouldReduceMotion) {
      setParticles(generateParticles());
      setIsVisible(true);
      
      // Auto-hide after duration
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, duration);

      return () => clearTimeout(timer);
    } else if (isActive && shouldReduceMotion) {
      // For reduced motion, just show a brief flash
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isActive, shouldReduceMotion, duration, onComplete]);

  // Particle animation variants
  const particleVariants = {
    initial: (particle) => ({
      x: `${particle.x}vw`,
      y: '-10vh',
      rotate: particle.rotation,
      opacity: 0,
      scale: 0,
    }),
    animate: (particle) => ({
      x: `${particle.x + particle.drift}vw`,
      y: '110vh',
      rotate: particle.rotation + 360,
      opacity: [0, 1, 1, 0],
      scale: [0, 1, 1, 0],
      transition: {
        duration: shouldReduceMotion ? 0.5 : 2.5,
        delay: particle.delay,
        ease: 'easeOut',
        opacity: {
          times: [0, 0.1, 0.8, 1],
          duration: shouldReduceMotion ? 0.5 : 2.5,
        },
        scale: {
          times: [0, 0.1, 0.8, 1],
          duration: shouldReduceMotion ? 0.5 : 2.5,
        },
      },
    }),
  };

  // Reduced motion fallback - simple flash effect
  const flashVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: [0, 0.3, 0],
      transition: { duration: 0.5, times: [0, 0.5, 1] }
    },
  };

  if (!isActive) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50"
      role="img"
      aria-label="Celebration confetti animation"
      aria-live="polite"
    >
      <AnimatePresence>
        {isVisible && (
          <>
            {shouldReduceMotion ? (
              // Reduced motion: Simple flash effect
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-yellow-400/20"
                variants={flashVariants}
                initial="initial"
                animate="animate"
                exit="initial"
              />
            ) : (
              // Full confetti animation
              particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute"
                  custom={particle}
                  variants={particleVariants}
                  initial="initial"
                  animate="animate"
                  exit="initial"
                  style={{
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    backgroundColor: particle.shape === 'star' ? 'transparent' : particle.color,
                    borderRadius: particle.shape === 'circle' ? '50%' : '0%',
                    clipPath: particle.shape === 'star'
                      ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                      : 'none',
                    background: particle.shape === 'star' ? particle.color : 'transparent',
                  }}
                />
              ))
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfettiAnimation;
