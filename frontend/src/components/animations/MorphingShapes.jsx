import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const MorphingShapes = ({ className = '', shapeCount = 5 }) => {
  const controls = useAnimation();
  const [shapes, setShapes] = useState([]);

  // Generate random shapes
  useEffect(() => {
    const generateShapes = () => {
      return Array.from({ length: shapeCount }, (_, index) => ({
        id: index,
        type: Math.random() > 0.5 ? 'circle' : 'polygon',
        size: 40 + Math.random() * 80,
        x: Math.random() * (window.innerWidth || 1200),
        y: Math.random() * (window.innerHeight || 800),
        color: [
          '#667eea', '#764ba2', '#f093fb', '#f5576c', 
          '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
        ][index % 8],
        opacity: 0.1 + Math.random() * 0.3,
        rotation: Math.random() * 360,
        path: generateMorphPath()
      }));
    };

    setShapes(generateShapes());
  }, [shapeCount]);

  // Generate SVG morph path
  const generateMorphPath = () => {
    const paths = [
      // Blob 1
      "M60,-60C80,-40,100,-20,100,0C100,20,80,40,60,60C40,80,20,100,0,100C-20,100,-40,80,-60,60C-80,40,-100,20,-100,0C-100,-20,-80,-40,-60,-60C-40,-80,-20,-100,0,-100C20,-100,40,-80,60,-60Z",
      
      // Blob 2  
      "M40,-50C50,-40,55,-20,55,0C55,20,50,40,40,50C30,60,15,65,0,65C-15,65,-30,60,-40,50C-50,40,-55,20,-55,0C-55,-20,-50,-40,-40,-50C-30,-60,-15,-65,0,-65C15,-65,30,-60,40,-50Z",
      
      // Blob 3
      "M70,-35C85,-25,90,-10,90,10C90,30,85,50,70,65C55,80,35,90,10,90C-15,90,-40,80,-60,65C-80,50,-95,30,-95,10C-95,-10,-80,-25,-60,-35C-40,-45,-20,-50,10,-50C40,-50,55,-45,70,-35Z",
      
      // Star-like
      "M50,0L60,35L95,35L68,57L78,92L50,70L22,92L32,57L5,35L40,35Z",
      
      // Diamond
      "M50,10L90,50L50,90L10,50Z"
    ];
    
    return paths[Math.floor(Math.random() * paths.length)];
  };

  // Animation sequence
  useEffect(() => {
    const animateShapes = async () => {
      while (true) {
        // Morph shapes
        await controls.start({
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 180, 360],
          transition: {
            duration: 8,
            ease: "easeInOut",
            times: [0, 0.3, 0.7, 1]
          }
        });

        // Brief pause
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Change positions
        setShapes(prev => prev.map(shape => ({
          ...shape,
          x: Math.random() * (window.innerWidth || 1200),
          y: Math.random() * (window.innerHeight || 800),
          path: generateMorphPath()
        })));
      }
    };

    animateShapes();
  }, [controls]);

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        className="absolute inset-0"
      >
        <defs>
          {/* Gradient definitions */}
          <linearGradient id="morphGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 0.1 }} />
          </linearGradient>
          
          <linearGradient id="morphGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f093fb', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#f5576c', stopOpacity: 0.1 }} />
          </linearGradient>
          
          <linearGradient id="morphGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4facfe', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#00f2fe', stopOpacity: 0.1 }} />
          </linearGradient>

          {/* Filters for glow effects */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2"/>
          </filter>
        </defs>

        {shapes.map((shape, index) => (
          <motion.g
            key={shape.id}
            animate={controls}
            style={{
              transformOrigin: `${shape.x}px ${shape.y}px`
            }}
          >
            {shape.type === 'circle' ? (
              <motion.circle
                cx={shape.x}
                cy={shape.y}
                r={shape.size / 2}
                fill={`url(#morphGrad${(index % 3) + 1})`}
                filter="url(#glow)"
                animate={{
                  cx: [shape.x, shape.x + 50, shape.x - 30, shape.x],
                  cy: [shape.y, shape.y - 40, shape.y + 20, shape.y],
                  r: [
                    shape.size / 2, 
                    shape.size / 2 * 1.3, 
                    shape.size / 2 * 0.7, 
                    shape.size / 2
                  ]
                }}
                transition={{
                  duration: 12 + Math.random() * 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ) : (
              <motion.path
                d={shape.path}
                transform={`translate(${shape.x}, ${shape.y}) scale(${shape.size / 100})`}
                fill={shape.color}
                fillOpacity={shape.opacity}
                filter="url(#blur)"
                animate={{
                  d: [
                    shape.path,
                    generateMorphPath(),
                    generateMorphPath(),
                    shape.path
                  ],
                  scale: [1, 1.2, 0.9, 1]
                }}
                transition={{
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            )}

            {/* Additional decorative elements */}
            <motion.circle
              cx={shape.x + 20}
              cy={shape.y - 15}
              r="2"
              fill={shape.color}
              fillOpacity="0.4"
              animate={{
                cx: [
                  shape.x + 20, 
                  shape.x + 40, 
                  shape.x - 10, 
                  shape.x + 20
                ],
                cy: [
                  shape.y - 15, 
                  shape.y - 30, 
                  shape.y + 10, 
                  shape.y - 15
                ],
                r: [2, 4, 1, 2],
                opacity: [0.4, 0.8, 0.2, 0.4]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.g>
        ))}

        {/* Animated connecting lines */}
        {shapes.length > 1 && (
          <motion.g opacity="0.1">
            {shapes.slice(0, -1).map((shape, index) => {
              const nextShape = shapes[index + 1];
              return (
                <motion.line
                  key={`line-${index}`}
                  x1={shape.x}
                  y1={shape.y}
                  x2={nextShape.x}
                  y2={nextShape.y}
                  stroke="url(#morphGrad1)"
                  strokeWidth="1"
                  animate={{
                    x1: [shape.x, shape.x + 30, shape.x - 20, shape.x],
                    y1: [shape.y, shape.y - 20, shape.y + 15, shape.y],
                    x2: [nextShape.x, nextShape.x - 25, nextShape.x + 35, nextShape.x],
                    y2: [nextShape.y, nextShape.y + 30, nextShape.y - 10, nextShape.y],
                    strokeOpacity: [0.1, 0.3, 0.05, 0.1]
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </motion.g>
        )}
      </svg>

      {/* Overlay geometric patterns */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${20 + index * 30}%`,
              top: `${15 + index * 25}%`,
              width: '100px',
              height: '100px',
              background: `conic-gradient(from ${index * 120}deg, transparent, ${shapes[index]?.color || '#667eea'}20, transparent)`,
              borderRadius: index % 2 === 0 ? '50%' : '0%',
              filter: 'blur(1px)'
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.3, 0.7, 1],
              opacity: [0.1, 0.3, 0.05, 0.1]
            }}
            transition={{
              duration: 20 + index * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Floating dots pattern */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, index) => (
          <motion.div
            key={`dot-${index}`}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -40, 20, 0],
              scale: [1, 2, 0.5, 1],
              opacity: [0.2, 0.6, 0.1, 0.2]
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MorphingShapes;