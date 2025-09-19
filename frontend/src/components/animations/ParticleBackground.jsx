import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = ({ particleCount = 50, className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Particle class
    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.fadeDelay = Math.random() * 600;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = Math.random() * 0.006 + 0.01;
        this.death = Math.random() * 0.005 + 0.005;
        this.size = Math.random() * 2 + 1;
        this.opacity = 0;
        this.fadeDelay = Math.random() * 600;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (Date.now() > this.fadeStart) {
          if (this.fadingOut === false) {
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

        if (this.x > canvas.width + 10 || this.x < -10 || 
            this.y > canvas.height + 10 || this.y < -10) {
          this.reset();
        }
      }

      draw() {
        if (this.opacity > 0) {
          ctx.save();
          ctx.globalAlpha = this.opacity;
          
          // Create gradient
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
          );
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, 'rgba(102, 126, 234, 0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
    }

    // Initialize particles
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Add particles near mouse
      if (particles.length < particleCount * 2) {
        for (let i = 0; i < 3; i++) {
          const particle = new Particle();
          particle.x = mouseX + (Math.random() - 0.5) * 100;
          particle.y = mouseY + (Math.random() - 0.5) * 100;
          particle.size = Math.random() * 3 + 2;
          particles.push(particle);
        }
      }
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [particleCount]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
};

export default ParticleBackground;