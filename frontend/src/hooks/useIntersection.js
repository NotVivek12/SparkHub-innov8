import { useEffect, useRef, useState } from 'react';

// Hook for detecting when an element enters/leaves the viewport
export const useIntersection = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    onIntersect,
    onLeave
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        setIsIntersecting(isElementIntersecting);
        
        if (isElementIntersecting) {
          setHasIntersected(true);
          onIntersect?.(entry);
          
          // If triggerOnce is true, disconnect after first intersection
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!isElementIntersecting && hasIntersected) {
          onLeave?.(entry);
        }
      },
      {
        threshold,
        root,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, triggerOnce, hasIntersected, onIntersect, onLeave]);

  return { ref: elementRef, isIntersecting, hasIntersected };
};

// Hook for lazy loading images
export const useLazyImage = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const { ref, isIntersecting } = useIntersection({
    triggerOnce: true,
    threshold: 0.1,
    ...options
  });

  useEffect(() => {
    if (isIntersecting && src && !imageSrc) {
      const img = new Image();
      
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      
      img.onerror = () => {
        setIsError(true);
      };
      
      img.src = src;
    }
  }, [isIntersecting, src, imageSrc]);

  return { ref, imageSrc, isLoaded, isError };
};

// Hook for scroll-triggered animations
export const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, isIntersecting } = useIntersection({
    threshold: 0.2,
    triggerOnce: true,
    ...options
  });

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  return { ref, isVisible };
};

// Hook for progressive loading of content sections
export const useProgressiveLoad = (sections = [], options = {}) => {
  const [loadedSections, setLoadedSections] = useState(new Set());
  const sectionRefs = useRef(sections.map(() => React.createRef()));

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      // Load all sections if IntersectionObserver is not supported
      setLoadedSections(new Set(sections.map((_, index) => index)));
      return;
    }

    const observers = sectionRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLoadedSections(prev => new Set(prev).add(index));
            observer.disconnect(); // Load once
          }
        },
        {
          threshold: 0.1,
          rootMargin: '100px', // Pre-load 100px before entering viewport
          ...options
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sections.length]);

  return { sectionRefs: sectionRefs.current, loadedSections };
};

// Hook for infinite scroll
export const useInfiniteScroll = (callback, options = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, isIntersecting } = useIntersection({
    threshold: 0.1,
    rootMargin: '100px',
    ...options
  });

  useEffect(() => {
    if (isIntersecting && !isLoading && hasMore) {
      setIsLoading(true);
      
      Promise.resolve(callback())
        .then((result) => {
          if (result === false || (result && result.hasMore === false)) {
            setHasMore(false);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isIntersecting, isLoading, hasMore, callback]);

  return { ref, isLoading, hasMore, setHasMore };
};

// Hook for scroll progress
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    calculateProgress(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return progress;
};

// Hook for element visibility with percentage
export const useVisibilityPercentage = (options = {}) => {
  const [visibilityPercentage, setVisibilityPercentage] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const percentage = Math.round(entry.intersectionRatio * 100);
        setVisibilityPercentage(percentage);
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0% to 100% in 1% increments
        ...options
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref: elementRef, visibilityPercentage };
};

// Hook for sticky element detection
export const useStickyObserver = () => {
  const [isSticky, setIsSticky] = useState(false);
  const stickyRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const stickyElement = stickyRef.current;
    if (!stickyElement) return;

    // Create a sentinel element
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    sentinel.style.height = '1px';
    sentinel.style.width = '1px';
    sentinel.style.opacity = '0';
    sentinel.style.pointerEvents = 'none';

    stickyElement.parentNode.insertBefore(sentinel, stickyElement);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: [0, 1]
      }
    );

    observer.observe(sentinel);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      if (sentinel.parentNode) {
        sentinel.parentNode.removeChild(sentinel);
      }
    };
  }, []);

  return { ref: stickyRef, isSticky };
};

export default {
  useIntersection,
  useLazyImage,
  useScrollAnimation,
  useProgressiveLoad,
  useInfiniteScroll,
  useScrollProgress,
  useVisibilityPercentage,
  useStickyObserver
};