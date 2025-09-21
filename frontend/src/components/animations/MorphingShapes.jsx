import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const MorphingShapes = ({ className = '', shapeCount = 5, colorMode = 'blue' }) => {
  const controls = useAnimation();
  const [shapes, setShapes] = useState([]);
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Color palettes
  const colorPalettes = {
    blue: [
      '#667eea', '#4338ca', '#3b82f6', '#1e40af', 
      '#4facfe', '#00f2fe', '#0ea5e9', '#0c4a6e'
    ],
    purple: [
      '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6',
      '#a78bfa', '#8b5cf6', '#c4b5fd', '#4c1d95'
    ],
    mixed: [
      '#667eea', '#764ba2', '#f093fb', '#f5576c', 
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7'
    ],
    neon: [
      '#00ff87', '#60efff', '#00e5ff', '#01c4ff',
      '#00ffa3', '#11b7ff', '#3c8bff', '#00ffcc'
    ]
  };

  const selectedPalette = colorPalettes[colorMode] || colorPalettes.blue;

  // Generate random shapes
  useEffect(() => {
    const generateShapes = () => {
      return Array.from({ length: shapeCount }, (_, index) => ({
        id: index,
        type: Math.random() > 0.6 ? 'circle' : 'polygon',
        size: 40 + Math.random() * 100,
        x: Math.random() * (window.innerWidth || 1200),
        y: Math.random() * (window.innerHeight || 800),
        color: selectedPalette[index % selectedPalette.length],
        opacity: 0.08 + Math.random() * 0.25,
        rotation: Math.random() * 360,
        path: generateMorphPath(),
        depth: Math.random() > 0.5 ? 'back' : 'front',
        animationSpeed: 0.8 + Math.random() * 0.4, // Animation speed multiplier
      }));
    };

    // Apply reduced motion settings if necessary
    const finalShapeCount = prefersReducedMotion ? Math.min(3, shapeCount) : shapeCount;
    setShapes(generateShapes(finalShapeCount));
    
    // Handle window resize
    const handleResize = () => {
      setShapes(generateShapes());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [shapeCount, selectedPalette, prefersReducedMotion]);

  // Generate SVG morph path
  const generateMorphPath = () => {
    const paths = [
      // Modern Blob 1
      "M60,-60C80,-40,100,-20,100,0C100,20,80,40,60,60C40,80,20,100,0,100C-20,100,-40,80,-60,60C-80,40,-100,20,-100,0C-100,-20,-80,-40,-60,-60C-40,-80,-20,-100,0,-100C20,-100,40,-80,60,-60Z",
      
      // Modern Blob 2  
      "M40,-50C50,-40,55,-20,55,0C55,20,50,40,40,50C30,60,15,65,0,65C-15,65,-30,60,-40,50C-50,40,-55,20,-55,0C-55,-20,-50,-40,-40,-50C-30,-60,-15,-65,0,-65C15,-65,30,-60,40,-50Z",
      
      // Modern Blob 3
      "M70,-35C85,-25,90,-10,90,10C90,30,85,50,70,65C55,80,35,90,10,90C-15,90,-40,80,-60,65C-80,50,-95,30,-95,10C-95,-10,-80,-25,-60,-35C-40,-45,-20,-50,10,-50C40,-50,55,-45,70,-35Z",
      
      // Fluid Shape 1
      "M60.2,-61.8C76.9,-45.9,88.3,-23,89.4,1.1C90.5,25.1,81.3,50.3,64.6,67.5C47.9,84.8,24,94.1,2,91.5C-20,88.9,-40,74.4,-55,57.1C-70.1,39.9,-80.2,19.9,-81.7,-1.5C-83.1,-22.9,-76,-45.8,-60.9,-61.7C-45.8,-77.6,-22.9,-86.5,0,-86.5C22.9,-86.5,45.9,-77.6,60.2,-61.8Z",
      
      // Fluid Shape 2
      "M51.2,-48.3C63.2,-29.7,67.9,-8.2,65.2,13.2C62.4,34.6,52.3,56,34.8,66.6C17.3,77.2,-7.4,77,-29.7,68C-51.9,58.9,-71.7,41,-75.2,20.4C-78.7,-0.2,-65.9,-23.5,-50,-42.6C-34.1,-61.6,-17.1,-76.4,1.7,-77.9C20.5,-79.3,41,-66.9,51.2,-48.3Z",
      
      // Modern Star
      "M48.1,0.8L64.7,33.3L100,33.7L71.3,54.7L83.2,87.9L48.7,70.1L14.7,87.4L26.1,54.5L-2.7,33.2L32.3,32.5L48.1,0.8Z",
      
      // Modern Shield
      "M70,0L90,60L50,90L10,60L30,0Z",
      
      // Modern Hexagon
      "M50,0L85,25L85,75L50,100L15,75L15,25Z",
      
      // Wave Form
      "M0,50 Q25,30 50,50 T100,50 T150,50 T200,50 V100 H0 Z"
    ];
    
    return paths[Math.floor(Math.random() * paths.length)];
  };

  // Animation sequence
  useEffect(() => {
    // Skip intense animations if user prefers reduced motion
    if (prefersReducedMotion) {
      controls.start({
        scale: 1,
        rotate: 0,
        transition: { duration: 0 }
      });
      return;
    }
    
    const animateShapes = async () => {
      while (true) {
        // Morph shapes with smoother animation
        await controls.start({
          scale: [1, 1.15, 0.85, 1],
          rotate: [0, 120, 240, 360],
          transition: {
            duration: 12,
            ease: [0.43, 0.13, 0.23, 0.96], // Custom easing for smoother motion
            times: [0, 0.3, 0.7, 1]
          }
        });

        // Brief pause with randomized duration
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

        // Change positions with smoother transitions
        setShapes(prev => prev.map(shape => ({
          ...shape,
          x: Math.random() * (window.innerWidth || 1200),
          y: Math.random() * (window.innerHeight || 800),
          path: generateMorphPath(),
          // Occasionally change the shape type for more variety
          type: Math.random() > 0.8 ? (shape.type === 'circle' ? 'polygon' : 'circle') : shape.type,
          // Random opacity for depth effect
          opacity: 0.08 + Math.random() * 0.25
        })));
      }
    };

    animateShapes();
  }, [controls, prefersReducedMotion]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 800"
        className="absolute inset-0"
        style={{ opacity: 0.8 }}
      >
        <defs>
          {/* Modern Gradient definitions */}
          <linearGradient id="morphGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.2 }} />
            <stop offset="50%" style={{ stopColor: '#1d4ed8', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0.1 }} />
          </linearGradient>
          
          <linearGradient id="morphGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.2 }} />
            <stop offset="50%" style={{ stopColor: '#7c3aed', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#6d28d9', stopOpacity: 0.1 }} />
          </linearGradient>
          
          <linearGradient id="morphGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.2 }} />
            <stop offset="50%" style={{ stopColor: '#0891b2', stopOpacity: 0.15 }} />
            <stop offset="100%" style={{ stopColor: '#0e7490', stopOpacity: 0.1 }} />
          </linearGradient>
          
          <radialGradient id="morphRadial1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.25 }} />
            <stop offset="70%" style={{ stopColor: '#1d4ed8', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: '#1e40af', stopOpacity: 0 }} />
          </radialGradient>

          {/* Enhanced Filters for modern glow effects */}
          <filter id="modernGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feFlood floodColor="#3b82f6" floodOpacity="0.1" result="glowColor"/>
            <feComposite in="glowColor" in2="coloredBlur" operator="in" result="softGlow"/>
            <feMerge> 
              <feMergeNode in="softGlow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          <filter id="subtleBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3"/>
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"/>
          </filter>
          
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feFlood result="flood" floodColor="#3b82f6" floodOpacity="0.2"/>
            <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"/>
            <feGaussianBlur in="mask" result="blurred" stdDeviation="5"/>
            <feMerge>
              <feMergeNode in="blurred"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Z-index ordering based on depth property */}
        {/* Shapes in back layer */}
        {shapes.filter(s => s.depth === 'back').map((shape, index) => (
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
                filter="url(#subtleBlur)"
                animate={{
                  cx: [
                    shape.x, 
                    shape.x + 50 * shape.animationSpeed, 
                    shape.x - 30 * shape.animationSpeed, 
                    shape.x
                  ],
                  cy: [
                    shape.y, 
                    shape.y - 40 * shape.animationSpeed, 
                    shape.y + 20 * shape.animationSpeed, 
                    shape.y
                  ],
                  r: [
                    shape.size / 2, 
                    shape.size / 2 * 1.2, 
                    shape.size / 2 * 0.8, 
                    shape.size / 2
                  ],
                  fillOpacity: [shape.opacity, shape.opacity * 1.5, shape.opacity * 0.8, shape.opacity]
                }}
                transition={{
                  duration: (15 + Math.random() * 10) / shape.animationSpeed,
                  repeat: Infinity,
                  ease: [0.43, 0.13, 0.23, 0.96] // Custom easing for smoother motion
                }}
              />
            ) : (
              <motion.path
                d={shape.path}
                transform={`translate(${shape.x}, ${shape.y}) scale(${shape.size / 100})`}
                fill={`url(#morphGrad${(index % 3) + 1})`}
                fillOpacity={shape.opacity}
                filter="url(#subtleBlur)"
                animate={{
                  d: [
                    shape.path,
                    generateMorphPath(),
                    generateMorphPath(),
                    shape.path
                  ],
                  scale: [1, 1.1, 0.95, 1],
                  fillOpacity: [shape.opacity, shape.opacity * 1.3, shape.opacity * 0.7, shape.opacity]
                }}
                transition={{
                  duration: (20 + Math.random() * 10) / shape.animationSpeed,
                  repeat: Infinity,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              />
            )}
            
            {/* Modern decorative elements */}
            {!prefersReducedMotion && (
              <>
                <motion.circle
                  cx={shape.x + shape.size * 0.2}
                  cy={shape.y - shape.size * 0.15}
                  r={shape.size * 0.04}
                  fill={shape.color}
                  fillOpacity="0.3"
                  filter="url(#neonGlow)"
                  animate={{
                    cx: [
                      shape.x + shape.size * 0.2, 
                      shape.x + shape.size * 0.4, 
                      shape.x - shape.size * 0.1, 
                      shape.x + shape.size * 0.2
                    ],
                    cy: [
                      shape.y - shape.size * 0.15, 
                      shape.y - shape.size * 0.3, 
                      shape.y + shape.size * 0.1, 
                      shape.y - shape.size * 0.15
                    ],
                    r: [
                      shape.size * 0.04, 
                      shape.size * 0.06, 
                      shape.size * 0.02, 
                      shape.size * 0.04
                    ],
                    opacity: [0.3, 0.5, 0.1, 0.3]
                  }}
                  transition={{
                    duration: (10 + Math.random() * 6) / shape.animationSpeed,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Add small accent dots */}
                {[...Array(2)].map((_, i) => (
                  <motion.circle
                    key={`accent-${shape.id}-${i}`}
                    cx={shape.x + (Math.random() - 0.5) * shape.size}
                    cy={shape.y + (Math.random() - 0.5) * shape.size}
                    r={shape.size * 0.02}
                    fill={shape.color}
                    fillOpacity="0.4"
                    animate={{
                      opacity: [0.4, 0.7, 0.2, 0.4],
                      r: [
                        shape.size * 0.02,
                        shape.size * 0.03,
                        shape.size * 0.01,
                        shape.size * 0.02
                      ]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5
                    }}
                  />
                ))}
              </>
            )}
          </motion.g>
        ))}
        
        {/* Shapes in front layer */}
        {shapes.filter(s => s.depth !== 'back').map((shape, index) => (
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
                fill={`url(#morphRadial1)`}
                filter="url(#modernGlow)"
                animate={{
                  cx: [
                    shape.x, 
                    shape.x + 60 * shape.animationSpeed, 
                    shape.x - 40 * shape.animationSpeed, 
                    shape.x
                  ],
                  cy: [
                    shape.y, 
                    shape.y - 50 * shape.animationSpeed, 
                    shape.y + 30 * shape.animationSpeed, 
                    shape.y
                  ],
                  r: [
                    shape.size / 2, 
                    shape.size / 2 * 1.3, 
                    shape.size / 2 * 0.7, 
                    shape.size / 2
                  ],
                  fillOpacity: [shape.opacity, shape.opacity * 1.6, shape.opacity * 0.7, shape.opacity]
                }}
                transition={{
                  duration: (12 + Math.random() * 8) / shape.animationSpeed,
                  repeat: Infinity,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              />
            ) : (
              <motion.path
                d={shape.path}
                transform={`translate(${shape.x}, ${shape.y}) scale(${shape.size / 100})`}
                fill={shape.color}
                fillOpacity={shape.opacity}
                filter="url(#neonGlow)"
                animate={{
                  d: [
                    shape.path,
                    generateMorphPath(),
                    generateMorphPath(),
                    shape.path
                  ],
                  scale: [1, 1.2, 0.9, 1],
                  fillOpacity: [shape.opacity, shape.opacity * 1.4, shape.opacity * 0.6, shape.opacity]
                }}
                transition={{
                  duration: (15 + Math.random() * 10) / shape.animationSpeed,
                  repeat: Infinity,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              />
            )}

            {/* Enhanced decorative elements */}
            {!prefersReducedMotion && (
              <>
                <motion.circle
                  cx={shape.x + shape.size * 0.25}
                  cy={shape.y - shape.size * 0.2}
                  r={shape.size * 0.05}
                  fill={shape.color}
                  fillOpacity="0.5"
                  filter="url(#modernGlow)"
                  animate={{
                    cx: [
                      shape.x + shape.size * 0.25, 
                      shape.x + shape.size * 0.45, 
                      shape.x - shape.size * 0.15, 
                      shape.x + shape.size * 0.25
                    ],
                    cy: [
                      shape.y - shape.size * 0.2, 
                      shape.y - shape.size * 0.35, 
                      shape.y + shape.size * 0.15, 
                      shape.y - shape.size * 0.2
                    ],
                    r: [
                      shape.size * 0.05, 
                      shape.size * 0.08, 
                      shape.size * 0.03, 
                      shape.size * 0.05
                    ],
                    opacity: [0.5, 0.8, 0.3, 0.5]
                  }}
                  transition={{
                    duration: (8 + Math.random() * 5) / shape.animationSpeed,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Add small glowing accent dots */}
                {[...Array(3)].map((_, i) => (
                  <motion.circle
                    key={`accent-${shape.id}-${i}`}
                    cx={shape.x + (Math.random() - 0.5) * shape.size}
                    cy={shape.y + (Math.random() - 0.5) * shape.size}
                    r={shape.size * 0.03}
                    fill={shape.color}
                    fillOpacity="0.6"
                    filter="url(#modernGlow)"
                    animate={{
                      opacity: [0.6, 0.9, 0.3, 0.6],
                      r: [
                        shape.size * 0.03,
                        shape.size * 0.05,
                        shape.size * 0.02,
                        shape.size * 0.03
                      ]
                    }}
                    transition={{
                      duration: 5 + Math.random() * 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.8
                    }}
                  />
                ))}
              </>
            )}
          </motion.g>
        ))}

        {/* Modern Connecting Lines */}
        {!prefersReducedMotion && shapes.length > 2 && (
          <motion.g opacity="0.15">
            {/* Create a network-like structure instead of just sequential lines */}
            {shapes.map((shape, i) => {
              // Connect each shape to 1-2 nearby shapes based on distance
              const connections = [];
              
              shapes.forEach((otherShape, j) => {
                if (i !== j) {
                  const distance = Math.sqrt(
                    Math.pow(shape.x - otherShape.x, 2) + 
                    Math.pow(shape.y - otherShape.y, 2)
                  );
                  
                  // Only connect shapes that are within a reasonable distance
                  if (distance < 300) {
                    connections.push({
                      shape1: shape,
                      shape2: otherShape,
                      distance
                    });
                  }
                }
              });
              
              // Sort by distance and take up to 2 closest connections
              return connections
                .sort((a, b) => a.distance - b.distance)
                .slice(0, 1)
                .map((connection, connIndex) => {
                  const { shape1, shape2 } = connection;
                  
                  return (
                    <motion.path
                      key={`connection-${i}-${connIndex}`}
                      stroke={`url(#morphGrad${(i % 3) + 1})`}
                      strokeWidth={Math.max(1, 3 - connection.distance / 100)}
                      strokeLinecap="round"
                      strokeDasharray="1 8"
                      fill="none"
                      d={`M${shape1.x},${shape1.y} Q${(shape1.x + shape2.x) / 2 + (Math.random() - 0.5) * 50},${
                        (shape1.y + shape2.y) / 2 + (Math.random() - 0.5) * 50
                      } ${shape2.x},${shape2.y}`}
                      animate={{
                        strokeDasharray: ["1 8", "2 6", "3 4", "1 8"],
                        strokeDashoffset: [0, -10, -20, -30],
                        strokeOpacity: [0.15, 0.25, 0.1, 0.15]
                      }}
                      transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  );
                });
            })}
          </motion.g>
        )}
      </svg>

      {/* Modern Overlay Geometric Patterns */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={`pattern-${index}`}
              className="absolute"
              style={{
                left: `${15 + index * 35}%`,
                top: `${10 + index * 30}%`,
                width: '150px',
                height: '150px',
                background: `conic-gradient(from ${index * 120}deg, transparent, ${shapes[index]?.color || '#3b82f6'}15, transparent)`,
                borderRadius: index % 2 === 0 ? '50%' : '40%',
                filter: 'blur(15px)',
                mixBlendMode: 'lighten'
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 0.8, 1],
                opacity: [0.05, 0.08, 0.03, 0.05]
              }}
              transition={{
                duration: 25 + index * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Enhanced Floating Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, index) => {
            const size = 1 + Math.random() * 3;
            return (
              <motion.div
                key={`particle-${index}`}
                className={`absolute rounded-full bg-gradient-to-b ${
                  index % 3 === 0 ? 'from-blue-400 to-blue-600' :
                  index % 3 === 1 ? 'from-indigo-400 to-indigo-600' :
                  'from-cyan-400 to-cyan-600'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  boxShadow: `0 0 ${size * 2}px ${size / 2}px ${
                    index % 3 === 0 ? 'rgba(59, 130, 246, 0.3)' :
                    index % 3 === 1 ? 'rgba(99, 102, 241, 0.3)' :
                    'rgba(6, 182, 212, 0.3)'
                  }`,
                }}
                animate={{
                  x: [0, 50 * (Math.random() - 0.5), -30 * (Math.random() - 0.5), 0],
                  y: [0, -40 * (Math.random() - 0.5), 20 * (Math.random() - 0.5), 0],
                  scale: [1, 2, 0.5, 1],
                  opacity: [0.3, 0.7, 0.2, 0.3]
                }}
                transition={{
                  duration: 10 + Math.random() * 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5
                }}
              />
            );
          })}
        </div>
      )}
      {/* Optional subtle grid overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* Add a subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/20 pointer-events-none" />
    </div>
  );
};

export default MorphingShapes;