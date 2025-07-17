import React, { useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useAnimationConfig } from '../utils/animations';

/**
 * ConfettiAnimation component creates a celebratory confetti effect
 * using canvas-confetti library for realistic particle physics
 */
const ConfettiAnimation = ({
  isActive = false,
  onComplete = () => {},
  duration = 3000,
  particleCount = 50
}) => {
  const { shouldReduceMotion } = useAnimationConfig();
  const timeoutRef = useRef(null);

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

  // Fire realistic confetti with multiple patterns for natural look
  const fireRealisticConfetti = useCallback(() => {
    const totalCount = shouldReduceMotion ? Math.min(particleCount / 3, 15) : particleCount;

    // Pattern 1: 25% of particles with spread: 90, startVelocity: 55
    confetti({
      particleCount: Math.floor(totalCount * 0.25),
      spread: 90,
      startVelocity: 55,
      colors: confettiColors,
      disableForReducedMotion: shouldReduceMotion
    });

    // Pattern 2: 20% of particles with spread: 60
    confetti({
      particleCount: Math.floor(totalCount * 0.20),
      spread: 60,
      colors: confettiColors,
      disableForReducedMotion: shouldReduceMotion
    });

    // Pattern 3: 35% of particles with spread: 100, decay: 0.91, scalar: 0.8
    confetti({
      particleCount: Math.floor(totalCount * 0.35),
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      colors: confettiColors,
      disableForReducedMotion: shouldReduceMotion
    });

    // Pattern 4: 10% of particles with spread: 180, startVelocity: 25, decay: 0.92, scalar: 1.2
    confetti({
      particleCount: Math.floor(totalCount * 0.10),
      spread: 180,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      colors: confettiColors,
      disableForReducedMotion: shouldReduceMotion
    });

    // Pattern 5: 10% of particles with spread: 140, startVelocity: 45
    confetti({
      particleCount: Math.floor(totalCount * 0.10),
      spread: 140,
      startVelocity: 45,
      colors: confettiColors,
      disableForReducedMotion: shouldReduceMotion
    });
  }, [shouldReduceMotion, particleCount, confettiColors]);

  // Trigger confetti animation
  useEffect(() => {
    if (isActive) {
      if (shouldReduceMotion) {
        // For reduced motion, fire a minimal confetti burst
        confetti({
          particleCount: Math.min(particleCount / 4, 10),
          spread: 45,
          colors: confettiColors,
          disableForReducedMotion: false // We handle it manually
        });

        // Complete quickly for reduced motion
        timeoutRef.current = setTimeout(() => {
          onComplete();
        }, 500);
      } else {
        // Fire the realistic confetti pattern
        fireRealisticConfetti();

        // Complete after the specified duration
        timeoutRef.current = setTimeout(() => {
          onComplete();
        }, duration);
      }
    }

    // Cleanup timeout on unmount or when isActive changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isActive, shouldReduceMotion, duration, onComplete, particleCount, fireRealisticConfetti]);

  // Canvas-confetti handles the animation automatically, so we just need
  // to provide an accessible container for screen readers
  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      role="img"
      aria-label="Celebration confetti animation"
      aria-live="polite"
    >
      {/* Canvas-confetti renders to the default canvas automatically */}
      {/* This div serves as an accessibility landmark for screen readers */}
    </div>
  );
};

export default ConfettiAnimation;
