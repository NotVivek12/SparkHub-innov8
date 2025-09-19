import { useInView } from 'react-intersection-observer';
import { useAnimation } from 'framer-motion';
import { useEffect } from 'react';

// Hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return { ref, controls, inView };
};

// Hook for staggered children animations
export const useStaggerAnimation = (delay = 0.1) => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return { variants, childVariants };
};

// Hook for hover animations
export const useHoverAnimation = () => {
  const hoverVariants = {
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
    },
  };

  return hoverVariants;
};

// Hook for page transitions
export const usePageTransition = () => {
  const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };

  return { pageVariants, pageTransition };
};

// Hook for floating animation
export const useFloatingAnimation = (duration = 3) => {
  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return floatingVariants;
};

export default {
  useScrollAnimation,
  useStaggerAnimation,
  useHoverAnimation,
  usePageTransition,
  useFloatingAnimation,
};