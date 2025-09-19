import { motion } from 'framer-motion';
import { Lightbulb, Code, Rocket, Star, Zap, Heart } from 'lucide-react';

const FloatingElements = ({ className = '' }) => {
  const icons = [
    { Icon: Lightbulb, color: 'text-yellow-400', delay: 0 },
    { Icon: Code, color: 'text-blue-400', delay: 0.5 },
    { Icon: Rocket, color: 'text-purple-400', delay: 1 },
    { Icon: Star, color: 'text-pink-400', delay: 1.5 },
    { Icon: Zap, color: 'text-green-400', delay: 2 },
    { Icon: Heart, color: 'text-red-400', delay: 2.5 },
  ];

  const generateRandomPosition = () => ({
    x: Math.random() * (window.innerWidth || 1200),
    y: Math.random() * (window.innerHeight || 800),
  });

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-10 ${className}`}>
      {icons.map(({ Icon, color, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-20`}
          initial={{
            ...generateRandomPosition(),
            scale: 0,
            rotate: 0,
          }}
          animate={{
            y: [null, -50, 50, -30, 30, 0],
            x: [null, 30, -30, 20, -20, 0],
            scale: [0, 1, 0.8, 1.2, 0.9, 1],
            rotate: [0, 180, -180, 90, -90, 0],
            opacity: [0, 0.3, 0.1, 0.4, 0.2, 0.3],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            delay: delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Icon size={24 + Math.random() * 32} />
        </motion.div>
      ))}

      {/* Geometric shapes */}
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={`shape-${index}`}
          className="absolute opacity-10"
          style={{
            width: 20 + Math.random() * 40,
            height: 20 + Math.random() * 40,
            backgroundColor: [
              '#667eea', '#764ba2', '#f093fb', '#f5576c', 
              '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
            ][index % 8],
            borderRadius: Math.random() > 0.5 ? '50%' : '4px',
          }}
          initial={{
            ...generateRandomPosition(),
            scale: 0,
          }}
          animate={{
            y: [null, -100, 100, -50, 50, 0],
            x: [null, 50, -50, 30, -30, 0],
            scale: [0, 1, 0.5, 1.5, 0.8, 1],
            rotate: [0, 360, -180, 180, -90, 0],
          }}
          transition={{
            duration: 15 + Math.random() * 15,
            delay: index * 0.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient orbs */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={`orb-${index}`}
          className="absolute rounded-full opacity-20"
          style={{
            width: 100 + Math.random() * 200,
            height: 100 + Math.random() * 200,
            background: `radial-gradient(circle, ${
              ['rgba(102, 126, 234, 0.3)', 'rgba(118, 75, 162, 0.3)', 
               'rgba(240, 147, 251, 0.3)', 'rgba(245, 87, 108, 0.3)',
               'rgba(79, 172, 254, 0.3)'][index % 5]
            }, transparent)`,
            filter: 'blur(1px)',
          }}
          initial={{
            ...generateRandomPosition(),
            scale: 0,
          }}
          animate={{
            y: [null, -80, 80, -40, 40, 0],
            x: [null, 40, -40, 60, -60, 0],
            scale: [0, 1, 0.7, 1.3, 0.9, 1],
          }}
          transition={{
            duration: 25 + Math.random() * 10,
            delay: index * 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;