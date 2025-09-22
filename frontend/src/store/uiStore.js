import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUIStore = create(
  persist(
    (set, get) => ({
      // Theme state
      theme: 'light',
      
      // Loading states
      globalLoading: false,
      pageLoading: false,
      
      // Modal states
      modals: {
        login: false,
        register: false,
        ideaSubmission: false,
        mentorProfile: false,
        projectDetails: false,
        confirmation: false,
      },
      
      // Sidebar state
      sidebarOpen: false,
      sidebarCollapsed: false,
      
      // Notifications
      notifications: [],
      
      // Toast messages
      toasts: [],
      
      // Search state
      searchQuery: '',
      searchResults: [],
      searchActive: false,
      
      // Animation preferences
      reducedMotion: false,
      
      // Layout preferences
      layoutMode: 'grid', // 'grid' | 'list'
      
      // Actions
      
      // Theme actions
      toggleTheme: () => {
        set(state => {
          const newTheme = state.theme === 'dark' ? 'light' : 'dark';
          console.log('Theme toggled from', state.theme, 'to', newTheme);
          // Also set in localStorage for redundancy
          if (typeof window !== 'undefined') {
            localStorage.setItem('theme-preference', newTheme);
          }
          return { theme: newTheme };
        });
      },
      
      setTheme: (theme) => {
        set({ theme });
      },
      
      // Loading actions
      setGlobalLoading: (loading) => {
        set({ globalLoading: loading });
      },
      
      setPageLoading: (loading) => {
        set({ pageLoading: loading });
      },
      
      // Modal actions
      openModal: (modalName, data = null) => {
        set(state => ({
          modals: {
            ...state.modals,
            [modalName]: true
          },
          modalData: data
        }));
      },
      
      closeModal: (modalName) => {
        set(state => ({
          modals: {
            ...state.modals,
            [modalName]: false
          },
          modalData: null
        }));
      },
      
      closeAllModals: () => {
        set(state => ({
          modals: Object.keys(state.modals).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {}),
          modalData: null
        }));
      },
      
      // Sidebar actions
      toggleSidebar: () => {
        set(state => ({
          sidebarOpen: !state.sidebarOpen
        }));
      },
      
      setSidebarOpen: (open) => {
        set({ sidebarOpen: open });
      },
      
      toggleSidebarCollapsed: () => {
        set(state => ({
          sidebarCollapsed: !state.sidebarCollapsed
        }));
      },
      
      // Notification actions
      addNotification: (notification) => {
        const id = Date.now().toString();
        const newNotification = {
          id,
          timestamp: new Date(),
          read: false,
          ...notification
        };
        
        set(state => ({
          notifications: [newNotification, ...state.notifications]
        }));
        
        return id;
      },
      
      removeNotification: (id) => {
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }));
      },
      
      markNotificationRead: (id) => {
        set(state => ({
          notifications: state.notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
          )
        }));
      },
      
      markAllNotificationsRead: () => {
        set(state => ({
          notifications: state.notifications.map(n => ({ ...n, read: true }))
        }));
      },
      
      clearNotifications: () => {
        set({ notifications: [] });
      },
      
      // Toast actions
      addToast: (toast) => {
        const id = Date.now().toString();
        const newToast = {
          id,
          type: 'info',
          duration: 4000,
          ...toast
        };
        
        set(state => ({
          toasts: [...state.toasts, newToast]
        }));
        
        // Auto remove toast
        if (newToast.duration > 0) {
          setTimeout(() => {
            get().removeToast(id);
          }, newToast.duration);
        }
        
        return id;
      },
      
      removeToast: (id) => {
        set(state => ({
          toasts: state.toasts.filter(t => t.id !== id)
        }));
      },
      
      // Convenience toast methods
      showSuccess: (message, options = {}) => {
        return get().addToast({
          type: 'success',
          message,
          ...options
        });
      },
      
      showError: (message, options = {}) => {
        return get().addToast({
          type: 'error',
          message,
          duration: 6000, // Keep error messages longer
          ...options
        });
      },
      
      showWarning: (message, options = {}) => {
        return get().addToast({
          type: 'warning',
          message,
          ...options
        });
      },
      
      showInfo: (message, options = {}) => {
        return get().addToast({
          type: 'info',
          message,
          ...options
        });
      },
      
      // Search actions
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      setSearchResults: (results) => {
        set({ searchResults: results });
      },
      
      setSearchActive: (active) => {
        set({ searchActive: active });
      },
      
      clearSearch: () => {
        set({
          searchQuery: '',
          searchResults: [],
          searchActive: false
        });
      },
      
      // Layout actions
      setLayoutMode: (mode) => {
        set({ layoutMode: mode });
      },
      
      toggleLayoutMode: () => {
        set(state => ({
          layoutMode: state.layoutMode === 'grid' ? 'list' : 'grid'
        }));
      },
      
      // Animation actions
      setReducedMotion: (reduced) => {
        set({ reducedMotion: reduced });
      },
      
      // Utility methods
      getUnreadNotificationCount: () => {
        const { notifications } = get();
        return notifications.filter(n => !n.read).length;
      },
      
      // Initialization
      initializeFromSystem: () => {
        // Check system theme preference
        if (typeof window !== 'undefined') {
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
          set(state => ({
            theme: state.theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : state.theme,
            reducedMotion
          }));
        }
      },
      
      // Reset to defaults
      resetUI: () => {
        set({
          theme: 'light',
          globalLoading: false,
          pageLoading: false,
          modals: Object.keys(get().modals).reduce((acc, key) => {
            acc[key] = false;
            return acc;
          }, {}),
          sidebarOpen: false,
          sidebarCollapsed: false,
          searchQuery: '',
          searchResults: [],
          searchActive: false,
          layoutMode: 'grid',
        });
      },
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        layoutMode: state.layoutMode,
        reducedMotion: state.reducedMotion,
      }),
    }
  )
);

// Initialize system preferences on load
if (typeof window !== 'undefined') {
  useUIStore.getState().initializeFromSystem();
}

export default useUIStore;