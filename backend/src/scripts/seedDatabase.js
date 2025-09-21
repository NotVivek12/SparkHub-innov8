const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { User, Idea, Comment } = require('../models');

// Sample data
const sampleUsers = [
  {
    name: 'John Doe',
    email: 'john.student@university.edu',
    password: 'password123',
    role: 'student',
    studentId: 'STU001',
    university: 'Tech University',
    department: 'Computer Science',
    year: 3,
    isActive: true,
    emailVerified: true
  },
  {
    name: 'Jane Smith',
    email: 'jane.student@university.edu',
    password: 'password123',
    role: 'student',
    studentId: 'STU002',
    university: 'Tech University',
    department: 'Business Administration',
    year: 2,
    isActive: true,
    emailVerified: true
  },
  {
    name: 'Dr. Robert Wilson',
    email: 'robert.teacher@university.edu',
    password: 'password123',
    role: 'teacher',
    university: 'Tech University',
    department: 'Computer Science',
    expertise: ['AI/ML', 'Web Development', 'Software Engineering'],
    bio: 'Professor with 10+ years of experience in AI and software development.',
    isVerified: true,
    isActive: true,
    emailVerified: true
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.mentor@techcorp.com',
    password: 'password123',
    role: 'teacher',
    expertise: ['Business Strategy', 'Marketing', 'Entrepreneurship'],
    bio: 'Industry mentor and startup advisor with expertise in business development.',
    isVerified: true,
    isActive: true,
    emailVerified: true
  }
];

const sampleIdeas = [
  {
    title: 'EcoTrack - Carbon Footprint Tracker',
    problem: 'People are unaware of their daily carbon footprint and need an easy way to track and reduce their environmental impact.',
    solution: 'A mobile app that automatically tracks carbon footprint through location data, purchase history, and manual input, providing personalized reduction tips.',
    secretSauce: 'AI-powered recommendations based on user behavior patterns and gamification elements to encourage sustainable habits.',
    targetAudience: 'Environmentally conscious individuals aged 18-35 who want to make a positive impact.',
    requiredHelp: ['Technical Mentorship', 'Business Advice', 'Funding'],
    privacyLevel: 'public',
    category: 'Sustainability',
    tags: ['environment', 'AI', 'mobile app', 'sustainability'],
    status: 'Submitted'
  },
  {
    title: 'StudyBuddy AI',
    problem: 'Students struggle with personalized learning and often lack study companions or mentors for difficult subjects.',
    solution: 'An AI-powered study companion that adapts to individual learning styles and connects students with peer study groups.',
    secretSauce: 'Advanced ML algorithms that understand learning patterns and create personalized study plans with peer matching.',
    targetAudience: 'College and university students looking for effective study methods and peer collaboration.',
    requiredHelp: ['Technical Mentorship', 'Teammates'],
    privacyLevel: 'public',
    category: 'Education',
    tags: ['AI', 'education', 'machine learning', 'social'],
    status: 'Under Review'
  },
  {
    title: 'FinanceFlow - Personal Budget Manager',
    problem: 'Young adults struggle with personal finance management and lack proper budgeting tools designed for their lifestyle.',
    solution: 'A smart budgeting app that categorizes expenses automatically and provides insights on spending patterns.',
    secretSauce: 'Integration with bank APIs and machine learning for expense categorization and financial goal prediction.',
    targetAudience: 'Young professionals and students aged 18-30 who want to improve their financial literacy.',
    requiredHelp: ['Business Advice', 'Legal Guidance', 'Funding'],
    privacyLevel: 'private',
    category: 'Finance/FinTech',
    tags: ['fintech', 'budgeting', 'mobile app', 'AI'],
    status: 'Mentor Assigned'
  }
];

const sampleComments = [
  {
    content: 'This is a brilliant idea! Have you considered partnering with environmental organizations for data validation?',
    // Will be linked to idea and user after creation
  },
  {
    content: 'Great concept! I think the gamification aspect could be enhanced with social challenges between friends.',
    // Will be linked to idea and user after creation
  },
  {
    content: 'The AI study companion sounds promising. What specific ML algorithms are you planning to use for learning pattern recognition?',
    // Will be linked to idea and user after creation
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Idea.deleteMany({});
    await Comment.deleteMany({});

    // Create users
    console.log('👤 Creating users...');
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Assign creators to ideas
    const ideasWithCreators = sampleIdeas.map((idea, index) => ({
      ...idea,
      creator: createdUsers[index % 2]._id, // Assign to students
      assignedMentor: index === 2 ? createdUsers[2]._id : null // Assign mentor to third idea
    }));

    // Create ideas
    console.log('💡 Creating ideas...');
    const createdIdeas = await Idea.insertMany(ideasWithCreators);
    console.log(`✅ Created ${createdIdeas.length} ideas`);

    // Create comments
    console.log('💬 Creating comments...');
    const commentsWithRefs = sampleComments.map((comment, index) => ({
      ...comment,
      author: createdUsers[(index + 2) % createdUsers.length]._id, // Different users as authors
      idea: createdIdeas[index % createdIdeas.length]._id
    }));

    const createdComments = await Comment.insertMany(commentsWithRefs);
    console.log(`✅ Created ${createdComments.length} comments`);

    // Add some upvotes to ideas
    console.log('👍 Adding upvotes...');
    await Idea.findByIdAndUpdate(createdIdeas[0]._id, {
      $push: {
        upvotes: [
          { user: createdUsers[1]._id },
          { user: createdUsers[2]._id }
        ]
      }
    });

    await Idea.findByIdAndUpdate(createdIdeas[1]._id, {
      $push: {
        upvotes: [
          { user: createdUsers[0]._id },
          { user: createdUsers[3]._id }
        ]
      }
    });

    console.log('✅ Added upvotes to ideas');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Ideas: ${createdIdeas.length}`);
    console.log(`   Comments: ${createdComments.length}`);
    
    console.log('\n👤 Test User Credentials:');
    console.log('   Student 1: john.student@university.edu / password123');
    console.log('   Student 2: jane.student@university.edu / password123');
    console.log('   Teacher 1: robert.teacher@university.edu / password123');
    console.log('   Teacher 2: sarah.mentor@techcorp.com / password123');

    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;