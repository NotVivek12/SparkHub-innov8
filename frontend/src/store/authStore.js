import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      token: null,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock user data based on credentials
          const mockUser = {
            id: '1',
            email: credentials.email,
            name: credentials.email === 'student@example.com' ? 'Sarah Chen' : 'Dr. Johnson',
            role: credentials.email.includes('mentor') ? 'mentor' : 'student',
            avatar: credentials.email.charAt(0).toUpperCase(),
            profile: {
              university: 'Stanford University',
              major: 'Computer Science',
              year: credentials.email.includes('mentor') ? null : 3,
              bio: 'Passionate about innovation and technology',
              skills: ['React', 'Node.js', 'Python', 'AI/ML'],
              projects: [],
              mentorships: [],
            }
          };

          const mockToken = 'mock-jwt-token-' + Date.now();

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true, user: mockUser };
        } catch (error) {
          set({
            error: error.message || 'Login failed',
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },

      register: async (userData) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1200));
          
          const newUser = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.name,
            role: userData.role || 'student',
            avatar: userData.name?.charAt(0).toUpperCase(),
            profile: {
              university: userData.university,
              major: userData.major,
              year: userData.year,
              bio: '',
              skills: [],
              projects: [],
              mentorships: [],
            }
          };

          const mockToken = 'mock-jwt-token-' + Date.now();

          set({
            user: newUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          return { success: true, user: newUser };
        } catch (error) {
          set({
            error: error.message || 'Registration failed',
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      updateProfile: async (profileData) => {
        const { user } = get();
        if (!user) return { success: false, error: 'No user found' };

        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          const updatedUser = {
            ...user,
            ...profileData,
            profile: {
              ...user.profile,
              ...profileData.profile,
            }
          };

          set({
            user: updatedUser,
            isLoading: false,
            error: null,
          });

          return { success: true, user: updatedUser };
        } catch (error) {
          set({
            error: error.message || 'Profile update failed',
            isLoading: false,
          });
          return { success: false, error: error.message };
        }
      },

      clearError: () => {
        set({ error: null });
      },

      // Helper functions
      isStudent: () => {
        const { user } = get();
        return user?.role === 'student';
      },

      isMentor: () => {
        const { user } = get();
        return user?.role === 'mentor';
      },

      isAdmin: () => {
        const { user } = get();
        return user?.role === 'admin' || user?.role === 'university_admin';
      },

      // Mock data for development
      initializeMockUser: (type = 'student') => {
        const mockUsers = {
          student: {
            id: '1',
            email: 'sarah@stanford.edu',
            name: 'Sarah Chen',
            role: 'student',
            avatar: 'S',
            profile: {
              university: 'Stanford University',
              major: 'Computer Science',
              year: 3,
              bio: 'Passionate CS student interested in AI and machine learning. Love building products that solve real problems.',
              skills: ['React', 'Python', 'Machine Learning', 'UI/UX Design'],
              projects: [
                { id: 1, name: 'AI Study Assistant', status: 'In Progress' },
                { id: 2, name: 'Campus Food Tracker', status: 'Completed' },
              ],
              mentorships: [],
            }
          },
          mentor: {
            id: '2',
            email: 'johnson@stanford.edu',
            name: 'Dr. Michael Johnson',
            role: 'mentor',
            avatar: 'J',
            profile: {
              company: 'Google',
              title: 'Senior Software Engineer',
              experience: 8,
              bio: 'Experienced software engineer passionate about mentoring students. Specializing in AI/ML and full-stack development.',
              skills: ['AI/ML', 'Python', 'TensorFlow', 'System Design'],
              expertise: ['AI/ML', 'Backend', 'System Design'],
              mentorships: [
                { studentId: '1', projectName: 'AI Study Assistant' },
              ],
            }
          }
        };

        const user = mockUsers[type];
        const mockToken = 'mock-jwt-token-' + Date.now();

        set({
          user,
          token: mockToken,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;