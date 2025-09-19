import { create } from 'zustand';

const useProjectStore = create((set, get) => ({
  // State
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
  filters: {
    category: 'all',
    status: 'all',
    sortBy: 'recent',
  },

  // Mock data
  mockProjects: [
    {
      id: 1,
      title: 'AI Study Assistant',
      description: 'An intelligent companion to help students optimize their learning process using machine learning algorithms.',
      category: 'AI/ML',
      author: 'Sarah Chen',
      authorId: '1',
      status: 'in_progress',
      progress: 75,
      upvotes: 24,
      comments: 8,
      tags: ['AI', 'Education', 'React', 'Python'],
      timeAgo: '2 hours ago',
      createdAt: new Date('2024-09-18'),
      mentor: {
        id: '2',
        name: 'Dr. Johnson',
        avatar: 'J'
      },
      milestones: [
        { id: 1, title: 'Market Research', status: 'completed', date: '2024-09-15' },
        { id: 2, title: 'Prototype Development', status: 'in-progress', date: '2024-10-01' },
        { id: 3, title: 'User Testing', status: 'pending', date: '2024-10-15' },
      ],
      updates: [
        {
          id: 1,
          date: '2024-09-18',
          author: 'Sarah Chen',
          type: 'progress',
          content: 'Completed initial market research. Found strong demand among college students.'
        }
      ],
      privacy: 'public',
      helpNeeded: ['Technical mentorship', 'User testing'],
      targetAudience: 'College students',
      secretSauce: 'Real-time adaptation based on learning patterns'
    },
    {
      id: 2,
      title: 'Smart Campus Parking System',
      description: 'IoT solution to help students find parking spots in real-time using sensor networks.',
      category: 'IoT',
      author: 'John Doe',
      authorId: '3',
      status: 'under_review',
      progress: 45,
      upvotes: 18,
      comments: 12,
      tags: ['IoT', 'Sensors', 'Mobile App'],
      timeAgo: '5 hours ago',
      createdAt: new Date('2024-09-17'),
      privacy: 'public',
      helpNeeded: ['Hardware development', 'Mobile app development'],
      targetAudience: 'University students and staff',
    },
    {
      id: 3,
      title: 'Mental Health Companion App',
      description: 'AI-powered mobile app providing personalized mental health support for students.',
      category: 'Healthcare',
      author: 'Emma Wilson',
      authorId: '4',
      status: 'completed',
      progress: 100,
      upvotes: 56,
      comments: 23,
      tags: ['Healthcare', 'AI', 'Mobile', 'Mental Health'],
      timeAgo: '1 day ago',
      createdAt: new Date('2024-08-15'),
      privacy: 'public',
      featured: true,
    }
  ],

  // Actions
  fetchProjects: async (filters = {}) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { mockProjects } = get();
      let filteredProjects = [...mockProjects];

      // Apply filters
      if (filters.category && filters.category !== 'all') {
        filteredProjects = filteredProjects.filter(p => p.category === filters.category);
      }

      if (filters.status && filters.status !== 'all') {
        filteredProjects = filteredProjects.filter(p => p.status === filters.status);
      }

      // Apply sorting
      if (filters.sortBy === 'popular') {
        filteredProjects.sort((a, b) => b.upvotes - a.upvotes);
      } else if (filters.sortBy === 'recent') {
        filteredProjects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      set({
        projects: filteredProjects,
        isLoading: false,
        filters: { ...get().filters, ...filters }
      });

    } catch (error) {
      set({
        error: error.message || 'Failed to fetch projects',
        isLoading: false,
      });
    }
  },

  fetchProjectById: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { mockProjects } = get();
      const project = mockProjects.find(p => p.id === parseInt(id));
      
      if (!project) {
        throw new Error('Project not found');
      }

      set({
        currentProject: project,
        isLoading: false,
      });

      return project;
    } catch (error) {
      set({
        error: error.message || 'Failed to fetch project',
        isLoading: false,
      });
    }
  },

  createProject: async (projectData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProject = {
        id: Date.now(),
        ...projectData,
        status: 'submitted',
        progress: 0,
        upvotes: 0,
        comments: 0,
        timeAgo: 'Just now',
        createdAt: new Date(),
        milestones: [],
        updates: [],
      };

      set(state => ({
        projects: [newProject, ...state.projects],
        mockProjects: [newProject, ...state.mockProjects],
        isLoading: false,
      }));

      return { success: true, project: newProject };
    } catch (error) {
      set({
        error: error.message || 'Failed to create project',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  updateProject: async (id, updates) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({
        projects: state.projects.map(p => 
          p.id === id ? { ...p, ...updates } : p
        ),
        mockProjects: state.mockProjects.map(p => 
          p.id === id ? { ...p, ...updates } : p
        ),
        currentProject: state.currentProject?.id === id 
          ? { ...state.currentProject, ...updates }
          : state.currentProject,
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      set({
        error: error.message || 'Failed to update project',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  likeProject: async (id) => {
    try {
      set(state => ({
        projects: state.projects.map(p => 
          p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p
        ),
        mockProjects: state.mockProjects.map(p => 
          p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p
        ),
      }));
      
      return { success: true };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    }
  },

  addProjectUpdate: async (projectId, update) => {
    try {
      const newUpdate = {
        id: Date.now(),
        ...update,
        date: new Date().toISOString().split('T')[0],
      };

      set(state => ({
        projects: state.projects.map(p => 
          p.id === projectId 
            ? { ...p, updates: [newUpdate, ...(p.updates || [])] }
            : p
        ),
        currentProject: state.currentProject?.id === projectId
          ? { 
              ...state.currentProject, 
              updates: [newUpdate, ...(state.currentProject.updates || [])]
            }
          : state.currentProject,
      }));

      return { success: true, update: newUpdate };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    }
  },

  // Utility functions
  getProjectsByStatus: (status) => {
    const { projects } = get();
    return projects.filter(p => p.status === status);
  },

  getProjectsByCategory: (category) => {
    const { projects } = get();
    return projects.filter(p => p.category === category);
  },

  getUserProjects: (userId) => {
    const { projects } = get();
    return projects.filter(p => p.authorId === userId);
  },

  clearError: () => {
    set({ error: null });
  },

  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },
}));

export default useProjectStore;