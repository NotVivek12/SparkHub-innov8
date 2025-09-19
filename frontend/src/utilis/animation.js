// Common animation variants for framer-motion

// Fade animations
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInDown = {
  hidden: { opacity: 0, y: -60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// Scale animations
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const scaleInBig = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

// Stagger animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

export const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Hover animations
export const hoverScale = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.95 
  }
};

export const hoverLift = {
  hover: { 
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

export const hoverGlow = {
  hover: { 
    boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
    transition: { duration: 0.3 }
  }
};

// Page transitions
export const pageVariants = {
  initial: { 
    opacity: 0,
    x: -100,
    scale: 0.98
  },
  in: { 
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  },
  out: { 
    opacity: 0,
    x: 100,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: 'easeIn'
    }
  }
};

// Modal animations
export const modalVariants = {
  hidden: { 
    opacity: 0,
    scale: 0.8,
    y: 50
  },
  visible: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: { 
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2,
      ease: 'easeIn'
    }
  }
};

// Loading animations
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const spinAnimation = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Text animations
export const typewriterAnimation = {
  hidden: { width: 0 },
  visible: {
    width: 'auto',
    transition: {
      duration: 2,
      ease: 'steps(20, end)'
    }
  }
};

export const glitchAnimation = {
  animate: {
    x: [0, -2, 2, 0],
    skew: [0, -1, 1, 0],
    transition: {
      duration: 0.1,
      repeat: Infinity,
      repeatDelay: 3
    }
  }
};

// Complex animations
export const floatingAnimation = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const bouncingAnimation = {
  animate: {
    y: [0, -30, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeOut'
    }
  }
};

// Card animations
export const cardHover = {
  hover: {
    y: -10,
    scale: 1.02,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    transition: { duration: 0.3 }
  }
};

export const cardTap = {
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

// Button animations
export const buttonPress = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.1 }
};

export const buttonGlow = {
  whileHover: {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)',
    transition: { duration: 0.2 }
  }
};

// Utility functions
export const createStagger = (delay = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: delay
    }
  }
});

export const createSlideIn = (direction = 'up', distance = 60) => {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };

  return {
    hidden: { 
      opacity: 0,
      ...directions[direction]
    },
    visible: { 
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };
};

export default {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scaleInBig,
  staggerContainer,
  staggerChild,
  hoverScale,
  hoverLift,
  hoverGlow,
  pageVariants,
  modalVariants,
  pulseAnimation,
  spinAnimation,
  typewriterAnimation,
  glitchAnimation,
  floatingAnimation,
  bouncingAnimation,
  cardHover,
  cardTap,
  buttonPress,
  buttonGlow,
  createStagger,
  createSlideIn,
};