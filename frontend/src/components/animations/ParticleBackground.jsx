import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = ({ 
  particleCount = 80,
  className = '',
  colorMode = 'modern', // 'modern', 'gradient', or 'theme'
  interactivity = 'attract', // 'attract', 'repel', 'connect', or 'none'
  speed = 0.6,
  size = 1.5,
  depth = true,
  connectDistance = 150
}) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mousePosition = useRef({ x: null, y: null });

  // Color palettes for different modes
  const colorPalettes = {
    modern: ['#3b82f6', '#8b5cf6', '#ec4899', '#0ea5e9', '#14b8a6'],
    gradient: ['#667eea', '#764ba2', '#6B8DD6', '#8E37D7'],
    theme: ['#3b82f6', '#2563eb', '#1d4ed8', '#60a5fa', '#93c5fd']
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    // Set canvas size with higher pixel ratio for better quality
    const updateCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(pixelRatio, pixelRatio);
      setDimensions({ width, height });
    };

    // Modern particle class with enhanced features
    class Particle {
      constructor() {
        // Select a random color from the palette
        const palette = colorPalettes[colorMode] || colorPalettes.modern;
        this.color = palette[Math.floor(Math.random() * palette.length)];
        
        this.reset();
        // Add depth effect
        this.z = depth ? Math.random() * 3 + 0.1 : 1;
        this.baseSize = (Math.random() * size + 1) * this.z;
        
        // Initial position anywhere on screen
        this.x = Math.random() * dimensions.width;
        this.y = Math.random() * dimensions.height;
        
        // Animation timing
        this.fadeDelay = Math.random() * 500;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      }

      reset() {
        // Position and velocity
        this.x = Math.random() * dimensions.width;
        this.y = Math.random() * dimensions.height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        
        // Lifecycle properties
        this.life = Math.random() * 0.008 + 0.012;
        this.death = Math.random() * 0.006 + 0.004;
        this.opacity = 0;
        
        // Animation timing
        this.fadeDelay = Math.random() * 500;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
        
        // Pulse effect
        this.pulseSpeed = Math.random() * 0.1 + 0.05;
        this.pulseAmount = Math.random() * 0.4 + 0.2;
        this.pulseOffset = Math.random() * Math.PI * 2;
        
        // Select a new random color from the palette
        const palette = colorPalettes[colorMode] || colorPalettes.modern;
        this.color = palette[Math.floor(Math.random() * palette.length)];
      }

      update(time) {
        // Basic movement
        this.x += this.vx;
        this.y += this.vy;
        
        // Pulsing size effect
        this.size = this.baseSize + Math.sin(time * this.pulseSpeed + this.pulseOffset) * this.pulseAmount;

        // Opacity lifecycle
        if (Date.now() > this.fadeStart) {
          if (!this.fadingOut) {
            this.opacity += this.life;
            if (this.opacity >= 1) {
              this.opacity = 1;
              this.fadingOut = true;
            }
          } else {
            this.opacity -= this.death;
            if (this.opacity <= 0) {
              this.reset();
            }
          }
        }

        // Screen boundaries - wrap around instead of resetting
        if (this.x > dimensions.width + 20) this.x = -20;
        if (this.x < -20) this.x = dimensions.width + 20;
        if (this.y > dimensions.height + 20) this.y = -20;
        if (this.y < -20) this.y = dimensions.height + 20;
        
        // Mouse interaction
        if (interactivity !== 'none' && mousePosition.current.x !== null) {
          const dx = mousePosition.current.x - this.x;
          const dy = mousePosition.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100;
          
          if (distance < maxDistance) {
            // Calculate force based on distance
            const force = (1 - distance / maxDistance) * 0.8;
            
            if (interactivity === 'attract') {
              this.vx += (dx / distance) * force * 0.2;
              this.vy += (dy / distance) * force * 0.2;
            } 
            else if (interactivity === 'repel') {
              this.vx -= (dx / distance) * force * 0.4;
              this.vy -= (dy / distance) * force * 0.4;
            }
            
            // Speed limiting
            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (currentSpeed > speed * 2) {
              const ratio = (speed * 2) / currentSpeed;
              this.vx *= ratio;
              this.vy *= ratio;
            }
          }
        }
      }

      draw(ctx) {
        if (this.opacity <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Enhanced gradient with multiple color stops
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        
        const color = this.color;
        
        // Create a richer gradient from the particle's color
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.3, color.replace(')', ', 0.8)').replace('rgb', 'rgba'));
        gradient.addColorStop(0.6, color.replace(')', ', 0.4)').replace('rgb', 'rgba'));
        gradient.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'));
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a small brighter center for a glow effect
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop with performance optimization
    let lastTime = 0;
    const animate = (timestamp) => {
      const elapsed = timestamp - lastTime;
      lastTime = timestamp;
      
      // Don't animate every frame if the tab is not visible
      if (document.hidden || elapsed > 50) {
        animationId = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw particles
      particles.forEach(particle => {
        particle.update(timestamp / 1000);
        particle.draw(ctx);
      });

      // Connect particles with lines if nearby
      if (interactivity === 'connect') {
        ctx.lineWidth = 0.3;
        ctx.strokeStyle = '#3b82f6';
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectDistance) {
              const opacity = 1 - distance / connectDistance;
              ctx.save();
              ctx.globalAlpha = opacity * 0.2;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
              ctx.restore();
            }
          }
        }
      }
      
      // Draw lines from mouse to nearby particles
      if (interactivity !== 'none' && mousePosition.current.x !== null) {
        ctx.lineWidth = 0.4;
        ctx.strokeStyle = '#ffffff';
        
        particles.forEach(particle => {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const opacity = 1 - distance / 150;
            ctx.save();
            ctx.globalAlpha = opacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(mousePosition.current.x, mousePosition.current.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    // Advanced mouse interaction with debounce
    let timeout;
    const handleMouseMove = (e) => {
      clearTimeout(timeout);
      
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
      
      // Add particles near mouse for extra effect
      if (particles.length < particleCount * 1.5 && Math.random() > 0.7) {
        for (let i = 0; i < 2; i++) {
          const particle = new Particle();
          particle.x = mousePosition.current.x + (Math.random() - 0.5) * 50;
          particle.y = mousePosition.current.y + (Math.random() - 0.5) * 50;
          particle.vx = (Math.random() - 0.5) * speed * 2;
          particle.vy = (Math.random() - 0.5) * speed * 2;
          particle.opacity = 0.6;
          particle.size = (Math.random() * size * 1.5) + 1;
          particles.push(particle);
        }
      }
      
      // Reset mouse position after inactivity
      timeout = setTimeout(() => {
        mousePosition.current = { x: null, y: null };
      }, 3000);
    };

    const handleMouseLeave = () => {
      mousePosition.current = { x: null, y: null };
    };

    // Initialize
    updateCanvasSize();
    initParticles();
    lastTime = performance.now();
    animationId = requestAnimationFrame(animate);

    // Event listeners with passive option for better performance
    window.addEventListener('resize', updateCanvasSize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    // Touch support for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handleMouseMove({ 
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY
        });
      }
    }, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleMouseMove);
    };
  }, [particleCount, colorMode, interactivity, speed, size, depth, connectDistance, dimensions]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none -z-10 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.8 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  );
};

export default ParticleBackground;