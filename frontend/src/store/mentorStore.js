import { create } from 'zustand';

const useMentorStore = create((set, get) => ({
  // State
  mentors: [],
  currentMentor: null,
  mentorships: [],
  isLoading: false,
  error: null,
  filters: {
    expertise: 'all',
    availability: 'all',
    rating: 0,
    sortBy: 'rating',
  },

  // Mock mentor data
  mockMentors: [
    {
      id: '1',
      name: 'Dr. Michael Johnson',
      title: 'Senior Software Engineer',
      company: 'Google',
      location: 'San Francisco, CA',
      avatar: 'M',
      rating: 4.9,
      reviewCount: 47,
      experience: 8,
      bio: 'Experienced software engineer passionate about mentoring students. Specializing in AI/ML and full-stack development with 8+ years at top tech companies.',
      expertise: ['AI/ML', 'Backend', 'System Design', 'Python'],
      specialties: ['Machine Learning', 'Distributed Systems', 'Career Guidance'],
      availability: 'Available',
      nextAvailable: 'Today, 3:00 PM',
      responseTime: '2h',
      activeMentorships: 3,
      completedMentorships: 12,
      isOnline: true,
      isVerified: true,
      isPremium: true,
      hourlyRate: 150,
      languages: ['English', 'Spanish'],
    },
    {
      id: '2',
      name: 'Sarah Martinez',
      title: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      avatar: 'S',
      rating: 4.8,
      reviewCount: 32,
      experience: 6,
      bio: 'Product management expert helping students navigate the intersection of technology and business. Former startup founder with exits.',
      expertise: ['Product Management', 'Business Strategy', 'Startups'],
      specialties: ['Product Strategy', 'Go-to-Market', 'User Research'],
      availability: 'Available',
      nextAvailable: 'Tomorrow, 10:00 AM',
      responseTime: '1h',
      activeMentorships: 2,
      completedMentorships: 18,
      isOnline: false,
      isVerified: true,
      isPremium: true,
      hourlyRate: 120,
      languages: ['English'],
    },
    {
      id: '3',
      name: 'Alex Chen',
      title: 'Lead Designer',
      company: 'Figma',
      location: 'New York, NY',
      avatar: 'A',
      rating: 4.7,
      reviewCount: 28,
      experience: 5,
      bio: 'Design leader passionate about creating beautiful, user-centered experiences. Helping students build strong design fundamentals and portfolios.',
      expertise: ['UI/UX Design', 'Design Systems', 'Prototyping'],
      specialties: ['User Experience', 'Visual Design', 'Portfolio Review'],
      availability: 'Busy',
      nextAvailable: 'Next week',
      responseTime: '4h',
      activeMentorships: 5,
      completedMentorships: 8,
      isOnline: true,
      isVerified: true,
      isPremium: false,
      hourlyRate: 80,
      languages: ['English', 'Mandarin'],
    },
    {
      id: '4',
      name: 'Dr. Emily Rodriguez',
      title: 'Research Scientist',
      company: 'OpenAI',
      location: 'San Francisco, CA',
      avatar: 'E',
      rating: 5.0,
      reviewCount: 15,
      experience: 10,
      bio: 'AI researcher with expertise in deep learning and natural language processing. PhD from Stanford. Passionate about responsible AI development.',
      expertise: ['AI/ML', 'Deep Learning', 'Research', 'NLP'],
      specialties: ['Research Methods', 'Academic Writing', 'PhD Guidance'],
      availability: 'Limited',
      nextAvailable: 'In 2 weeks',
      responseTime: '6h',
      activeMentorships: 1,
      completedMentorships: 25,
      isOnline: false,
      isVerified: true,
      isPremium: true,
      hourlyRate: 200,
      languages: ['English', 'Spanish'],
    },
  ],

  // Mock mentorship data
  mockMentorships: [
    {
      id: '1',
      mentorId: '1',
      studentId: '1',
      projectId: 1,
      projectName: 'AI Study Assistant',
      status: 'active',
      startDate: '2024-09-15',
      lastActivity: '2 hours ago',
      nextSession: '2024-09-25T15:00:00Z',
      goals: ['Complete prototype', 'Prepare for demo day'],
      progress: 75,
      messages: [
        {
          id: 1,
          from: 'mentor',
          message: 'Great progress on the ML model! How are you handling the data preprocessing?',
          timestamp: '2024-09-20T10:00:00Z'
        }
      ]
    }
  ],

  // Actions
  fetchMentors: async (filters = {}) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { mockMentors } = get();
      let filteredMentors = [...mockMentors];

      // Apply filters
      if (filters.expertise && filters.expertise !== 'all') {
        filteredMentors = filteredMentors.filter(m => 
          m.expertise.includes(filters.expertise)
        );
      }

      if (filters.availability && filters.availability !== 'all') {
        filteredMentors = filteredMentors.filter(m => 
          m.availability === filters.availability
        );
      }

      if (filters.rating) {
        filteredMentors = filteredMentors.filter(m => 
          m.rating >= filters.rating
        );
      }

      // Apply sorting
      if (filters.sortBy === 'rating') {
        filteredMentors.sort((a, b) => b.rating - a.rating);
      } else if (filters.sortBy === 'experience') {
        filteredMentors.sort((a, b) => b.experience - a.experience);
      } else if (filters.sortBy === 'price') {
        filteredMentors.sort((a, b) => a.hourlyRate - b.hourlyRate);
      }

      set({
        mentors: filteredMentors,
        isLoading: false,
        filters: { ...get().filters, ...filters }
      });

    } catch (error) {
      set({
        error: error.message || 'Failed to fetch mentors',
        isLoading: false,
      });
    }
  },

  fetchMentorById: async (id) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { mockMentors } = get();
      const mentor = mockMentors.find(m => m.id === id);
      
      if (!mentor) {
        throw new Error('Mentor not found');
      }

      set({
        currentMentor: mentor,
        isLoading: false,
      });

      return mentor;
    } catch (error) {
      set({
        error: error.message || 'Failed to fetch mentor',
        isLoading: false,
      });
    }
  },

  fetchMentorships: async (userId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const { mockMentorships } = get();
      const userMentorships = mockMentorships.filter(m => 
        m.studentId === userId || m.mentorId === userId
      );

      set({
        mentorships: userMentorships,
        isLoading: false,
      });

      return userMentorships;
    } catch (error) {
      set({
        error: error.message || 'Failed to fetch mentorships',
        isLoading: false,
      });
    }
  },

  requestMentorship: async (mentorId, projectId, message) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMentorship = {
        id: Date.now().toString(),
        mentorId,
        studentId: '1', // Current user ID
        projectId,
        status: 'pending',
        message,
        requestDate: new Date().toISOString(),
      };

      set(state => ({
        mentorships: [...state.mentorships, newMentorship],
        mockMentorships: [...state.mockMentorships, newMentorship],
        isLoading: false,
      }));

      return { success: true, mentorship: newMentorship };
    } catch (error) {
      set({
        error: error.message || 'Failed to request mentorship',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  acceptMentorship: async (mentorshipId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set(state => ({
        mentorships: state.mentorships.map(m => 
          m.id === mentorshipId 
            ? { ...m, status: 'active', startDate: new Date().toISOString() }
            : m
        ),
        mockMentorships: state.mockMentorships.map(m => 
          m.id === mentorshipId 
            ? { ...m, status: 'active', startDate: new Date().toISOString() }
            : m
        ),
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      set({
        error: error.message || 'Failed to accept mentorship',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  sendMessage: async (mentorshipId, message) => {
    try {
      const newMessage = {
        id: Date.now(),
        from: 'student', // or 'mentor' based on current user
        message,
        timestamp: new Date().toISOString(),
      };

      set(state => ({
        mentorships: state.mentorships.map(m => 
          m.id === mentorshipId 
            ? { ...m, messages: [...(m.messages || []), newMessage] }
            : m
        ),
      }));

      return { success: true, message: newMessage };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    }
  },

  scheduleSession: async (mentorshipId, sessionData) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      set(state => ({
        mentorships: state.mentorships.map(m => 
          m.id === mentorshipId 
            ? { ...m, nextSession: sessionData.datetime, sessionType: sessionData.type }
            : m
        ),
        isLoading: false,
      }));

      return { success: true };
    } catch (error) {
      set({
        error: error.message || 'Failed to schedule session',
        isLoading: false,
      });
      return { success: false, error: error.message };
    }
  },

  rateMentor: async (mentorId, rating, review) => {
    try {
      // Update mentor rating (simplified calculation)
      set(state => ({
        mentors: state.mentors.map(m => 
          m.id === mentorId 
            ? { 
                ...m, 
                rating: ((m.rating * m.reviewCount) + rating) / (m.reviewCount + 1),
                reviewCount: m.reviewCount + 1 
              }
            : m
        ),
        mockMentors: state.mockMentors.map(m => 
          m.id === mentorId 
            ? { 
                ...m, 
                rating: ((m.rating * m.reviewCount) + rating) / (m.reviewCount + 1),
                reviewCount: m.reviewCount + 1 
              }
            : m
        ),
      }));

      return { success: true };
    } catch (error) {
      set({ error: error.message });
      return { success: false, error: error.message };
    }
  },

  // Utility functions
  getMentorsByExpertise: (expertise) => {
    const { mentors } = get();
    return mentors.filter(m => m.expertise.includes(expertise));
  },

  getAvailableMentors: () => {
    const { mentors } = get();
    return mentors.filter(m => m.availability === 'Available');
  },

  getActiveMentorships: (userId) => {
    const { mentorships } = get();
    return mentorships.filter(m => 
      (m.studentId === userId || m.mentorId === userId) && m.status === 'active'
    );
  },

  getPendingMentorships: (userId) => {
    const { mentorships } = get();
    return mentorships.filter(m => 
      (m.studentId === userId || m.mentorId === userId) && m.status === 'pending'
    );
  },

  clearError: () => {
    set({ error: null });
  },

  setFilters: (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters }
    }));
  },

  // Search mentors
  searchMentors: async (query) => {
    if (!query) {
      return get().mentors;
    }

    const { mockMentors } = get();
    const searchResults = mockMentors.filter(mentor => 
      mentor.name.toLowerCase().includes(query.toLowerCase()) ||
      mentor.title.toLowerCase().includes(query.toLowerCase()) ||
      mentor.company.toLowerCase().includes(query.toLowerCase()) ||
      mentor.expertise.some(skill => 
        skill.toLowerCase().includes(query.toLowerCase())
      ) ||
      mentor.bio.toLowerCase().includes(query.toLowerCase())
    );

    set({ mentors: searchResults });
    return searchResults;
  },
}));

export default useMentorStore;