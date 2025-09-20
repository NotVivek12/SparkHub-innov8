import { useState, useEffect, useCallback } from 'react';

// Basic localStorage hook
export const useLocalStorage = (key, initialValue) => {
  // Get initial value from localStorage or use provided initialValue
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save to local state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        
        // Dispatch custom event to sync across tabs/components
        window.dispatchEvent(
          new CustomEvent('localStorage', {
            detail: { key, newValue: valueToStore }
          })
        );
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  // Remove item from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        window.dispatchEvent(
          new CustomEvent('localStorage', {
            detail: { key, newValue: null }
          })
        );
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    const handleCustomStorageChange = (e) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.newValue);
      }
    };

    // Listen for changes in other tabs
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for changes in same tab (custom event)
    window.addEventListener('localStorage', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorage', handleCustomStorageChange);
    };
  }, [key]);

  return [storedValue, setValue, removeValue];
};

// Hook for managing complex objects in localStorage
export const useLocalStorageObject = (key, initialValue = {}) => {
  const [value, setValue, removeValue] = useLocalStorage(key, initialValue);

  const updateValue = useCallback((updates) => {
    setValue(prevValue => ({
      ...prevValue,
      ...updates
    }));
  }, [setValue]);

  const updateProperty = useCallback((property, newValue) => {
    setValue(prevValue => ({
      ...prevValue,
      [property]: newValue
    }));
  }, [setValue]);

  const removeProperty = useCallback((property) => {
    setValue(prevValue => {
      const newValue = { ...prevValue };
      delete newValue[property];
      return newValue;
    });
  }, [setValue]);

  return {
    value,
    setValue,
    updateValue,
    updateProperty,
    removeProperty,
    removeValue
  };
};

// Hook for managing arrays in localStorage
export const useLocalStorageArray = (key, initialValue = []) => {
  const [array, setArray, removeArray] = useLocalStorage(key, initialValue);

  const addItem = useCallback((item) => {
    setArray(prevArray => [...prevArray, item]);
  }, [setArray]);

  const removeItem = useCallback((index) => {
    setArray(prevArray => prevArray.filter((_, i) => i !== index));
  }, [setArray]);

  const removeItemById = useCallback((id, idKey = 'id') => {
    setArray(prevArray => prevArray.filter(item => item[idKey] !== id));
  }, [setArray]);

  const updateItem = useCallback((index, updates) => {
    setArray(prevArray => 
      prevArray.map((item, i) => 
        i === index ? { ...item, ...updates } : item
      )
    );
  }, [setArray]);

  const updateItemById = useCallback((id, updates, idKey = 'id') => {
    setArray(prevArray => 
      prevArray.map(item => 
        item[idKey] === id ? { ...item, ...updates } : item
      )
    );
  }, [setArray]);

  const clearArray = useCallback(() => {
    setArray([]);
  }, [setArray]);

  const findItem = useCallback((predicate) => {
    return array.find(predicate);
  }, [array]);

  const findIndex = useCallback((predicate) => {
    return array.findIndex(predicate);
  }, [array]);

  return {
    array,
    setArray,
    addItem,
    removeItem,
    removeItemById,
    updateItem,
    updateItemById,
    clearArray,
    findItem,
    findIndex,
    removeArray,
    length: array.length
  };
};

// Hook for managing localStorage with expiration
export const useLocalStorageWithExpiry = (key, initialValue, ttlInMinutes = 60) => {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return initialValue;
      }

      const parsedItem = JSON.parse(item);
      
      // Check if item has expiry
      if (parsedItem.expiry && Date.now() > parsedItem.expiry) {
        window.localStorage.removeItem(key);
        return initialValue;
      }

      return parsedItem.value || initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValueWithExpiry = useCallback((newValue) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      const expiryTime = Date.now() + (ttlInMinutes * 60 * 1000);
      
      const item = {
        value: valueToStore,
        expiry: expiryTime
      };

      setValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(item));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, ttlInMinutes, value]);

  const removeValue = useCallback(() => {
    setValue(initialValue);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  }, [key, initialValue]);

  const isExpired = useCallback(() => {
    if (typeof window === 'undefined') return false;

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return true;

      const parsedItem = JSON.parse(item);
      return parsedItem.expiry && Date.now() > parsedItem.expiry;
    } catch (error) {
      return true;
    }
  }, [key]);

  const getTimeToExpiry = useCallback(() => {
    if (typeof window === 'undefined') return 0;

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return 0;

      const parsedItem = JSON.parse(item);
      if (!parsedItem.expiry) return 0;

      const timeLeft = parsedItem.expiry - Date.now();
      return Math.max(0, timeLeft);
    } catch (error) {
      return 0;
    }
  }, [key]);

  return [value, setValueWithExpiry, removeValue, isExpired, getTimeToExpiry];
};

// Hook for localStorage with JSON schema validation
export const useLocalStorageWithValidation = (key, initialValue, validator) => {
  const [value, setValue, removeValue] = useLocalStorage(key, initialValue);

  const setValidatedValue = useCallback((newValue) => {
    try {
      const valueToValidate = newValue instanceof Function ? newValue(value) : newValue;
      
      if (validator && !validator(valueToValidate)) {
        console.warn(`Value for localStorage key "${key}" failed validation`);
        return false;
      }

      setValue(valueToValidate);
      return true;
    } catch (error) {
      console.warn(`Error validating localStorage value for key "${key}":`, error);
      return false;
    }
  }, [key, value, setValue, validator]);

  return [value, setValidatedValue, removeValue];
};

// Utility function to clear all app-specific localStorage items
export const useClearAppStorage = (appPrefix = 'sparkhub_') => {
  const clearAppStorage = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      const keys = Object.keys(window.localStorage);
      keys.forEach(key => {
        if (key.startsWith(appPrefix)) {
          window.localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Error clearing app storage:', error);
    }
  }, [appPrefix]);

  const getAppStorageSize = useCallback(() => {
    if (typeof window === 'undefined') return 0;

    try {
      const keys = Object.keys(window.localStorage);
      let totalSize = 0;
      
      keys.forEach(key => {
        if (key.startsWith(appPrefix)) {
          totalSize += window.localStorage.getItem(key).length;
        }
      });

      return totalSize;
    } catch (error) {
      console.warn('Error calculating app storage size:', error);
      return 0;
    }
  }, [appPrefix]);

  const getAppStorageKeys = useCallback(() => {
    if (typeof window === 'undefined') return [];

    try {
      const keys = Object.keys(window.localStorage);
      return keys.filter(key => key.startsWith(appPrefix));
    } catch (error) {
      console.warn('Error getting app storage keys:', error);
      return [];
    }
  }, [appPrefix]);

  return {
    clearAppStorage,
    getAppStorageSize,
    getAppStorageKeys
  };
};

// Hook for syncing state across multiple tabs
export const useLocalStorageSync = (key, initialValue) => {
  const [value, setValue] = useLocalStorage(key, initialValue);
  const [isOnline, setIsOnline] = useState(true);

  // Track online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Enhanced setValue that includes metadata
  const setValueWithMeta = useCallback((newValue, metadata = {}) => {
    const valueWithMeta = {
      value: newValue instanceof Function ? newValue(value.value || value) : newValue,
      timestamp: Date.now(),
      tabId: typeof window !== 'undefined' ? window.name || 'unknown' : 'server',
      isOnline,
      ...metadata
    };

    setValue(valueWithMeta);
  }, [value, setValue, isOnline]);

  // Get just the value without metadata
  const getRawValue = useCallback(() => {
    return typeof value === 'object' && value !== null && 'value' in value 
      ? value.value 
      : value;
  }, [value]);

  // Get metadata
  const getMetadata = useCallback(() => {
    return typeof value === 'object' && value !== null && 'timestamp' in value
      ? {
          timestamp: value.timestamp,
          tabId: value.tabId,
          isOnline: value.isOnline
        }
      : null;
  }, [value]);

  return [getRawValue(), setValueWithMeta, getMetadata];
};

export default {
  useLocalStorage,
  useLocalStorageObject,
  useLocalStorageArray,
  useLocalStorageWithExpiry,
  useLocalStorageWithValidation,
  useClearAppStorage,
  useLocalStorageSync
};