import { useState, useEffect, useCallback, useRef } from 'react';

// Basic debounce hook
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Debounced callback hook
export const useDebouncedCallback = (callback, delay, dependencies = []) => {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay, ...dependencies]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Cancel function
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return [debouncedCallback, cancel];
};

// Debounced search hook
export const useDebouncedSearch = (searchFunction, delay = 300) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const debouncedQuery = useDebounce(query, delay);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setIsLoading(false);
        setError(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const searchResults = await searchFunction(debouncedQuery);
        setResults(searchResults);
      } catch (err) {
        setError(err.message || 'Search failed');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, searchFunction]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
  }, []);

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    clearSearch
  };
};

// Debounced form validation hook
export const useDebouncedValidation = (validator, delay = 500) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const debouncedValue = useDebounce(value, delay);

  useEffect(() => {
    const validate = async () => {
      if (!debouncedValue) {
        setError('');
        setIsValid(false);
        setIsValidating(false);
        return;
      }

      setIsValidating(true);

      try {
        const validationResult = await Promise.resolve(validator(debouncedValue));
        
        if (validationResult === true || validationResult === null || validationResult === undefined) {
          setError('');
          setIsValid(true);
        } else {
          setError(validationResult);
          setIsValid(false);
        }
      } catch (err) {
        setError(err.message || 'Validation failed');
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validate();
  }, [debouncedValue, validator]);

  return {
    value,
    setValue,
    error,
    isValidating,
    isValid,
    hasBeenValidated: debouncedValue !== ''
  };
};

// Debounced API call hook
export const useDebouncedAPI = (apiFunction, delay = 300) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const [debouncedCall] = useDebouncedCallback(async (...args) => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    
    setLoading(true);
    setError(null);

    try {
      const result = await apiFunction(...args, {
        signal: abortControllerRef.current.signal
      });
      
      if (!abortControllerRef.current.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      if (!abortControllerRef.current.signal.aborted) {
        setError(err.message || 'API call failed');
      }
    } finally {
      if (!abortControllerRef.current.signal.aborted) {
        setLoading(false);
      }
    }
  }, delay);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    call: debouncedCall,
    reset
  };
};

// Debounced resize hook
export const useDebouncedResize = (callback, delay = 250) => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [debouncedCallback] = useDebouncedCallback(() => {
    const newDimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    
    setDimensions(newDimensions);
    callback?.(newDimensions);
  }, delay);

  useEffect(() => {
    const handleResize = () => {
      debouncedCallback();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [debouncedCallback]);

  return dimensions;
};

// Debounced scroll hook
export const useDebouncedScroll = (callback, delay = 100) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  const [debouncedCallback] = useDebouncedCallback(() => {
    const currentScrollY = window.pageYOffset;
    const currentScrollX = window.pageXOffset;
    
    setScrollY(currentScrollY);
    setScrollX(currentScrollX);
    
    // Determine scroll direction
    if (currentScrollY > lastScrollY.current) {
      setScrollDirection('down');
    } else if (currentScrollY < lastScrollY.current) {
      setScrollDirection('up');
    }
    
    lastScrollY.current = currentScrollY;
    
    callback?.({
      scrollY: currentScrollY,
      scrollX: currentScrollX,
      direction: scrollDirection
    });
  }, delay);

  useEffect(() => {
    const handleScroll = () => {
      debouncedCallback();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Set initial values
    setScrollY(window.pageYOffset);
    setScrollX(window.pageXOffset);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [debouncedCallback]);

  return {
    scrollY,
    scrollX,
    scrollDirection
  };
};

// Debounced local storage hook
export const useDebouncedLocalStorage = (key, initialValue, delay = 1000) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const [debouncedSave] = useDebouncedCallback((valueToSave) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(valueToSave));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, delay);

  const setStoredValue = useCallback((newValue) => {
    setValue(newValue);
    debouncedSave(newValue);
  }, [debouncedSave]);

  return [value, setStoredValue];
};

export default {
  useDebounce,
  useDebouncedCallback,
  useDebouncedSearch,
  useDebouncedValidation,
  useDebouncedAPI,
  useDebouncedResize,
  useDebouncedScroll,
  useDebouncedLocalStorage
};