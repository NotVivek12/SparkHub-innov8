import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import IdeaSubmission from './pages/IdeaSubmission';
import ProjectDetails from './pages/ProjectDetails';
import Community from './pages/Community';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

// Simple placeholder component for missing pages
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20 flex items-center justify-center">
    <div className="text-center glass rounded-2xl p-12 max-w-md">
      <h1 className="text-3xl font-bold text-white mb-4">{title}</h1>
      <p className="text-gray-400 mb-6">This page is coming soon!</p>
      <a href="/" className="bg-gradient-primary text-white px-6 py-3 rounded-lg inline-block">
        Back to Home
      </a>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/student-dashboard',
        element: <StudentDashboard />,
      },
      {
        path: '/mentor-dashboard',
        element: <MentorDashboard />,
      },
      {
        path: '/submit-idea',
        element: <IdeaSubmission />,
      },
      {
        path: '/project/:id',
        element: <ProjectDetails />,
      },
      {
        path: '/community',
        element: <Community />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      // Placeholder pages for missing routes
      {
        path: '/register',
        element: <Signup />,
      },
      {
        path: '/how-it-works',
        element: <PlaceholderPage title="How It Works" />,
      },
      {
        path: '/students',
        element: <PlaceholderPage title="For Students" />,
      },
      {
        path: '/mentors',
        element: <PlaceholderPage title="For Mentors" />,
      },
      {
        path: '/success-stories',
        element: <PlaceholderPage title="Success Stories" />,
      },
      {
        path: '/pricing',
        element: <PlaceholderPage title="Pricing" />,
      },
      {
        path: '/docs',
        element: <PlaceholderPage title="Documentation" />,
      },
      {
        path: '/help',
        element: <PlaceholderPage title="Help Center" />,
      },
      {
        path: '/blog',
        element: <PlaceholderPage title="Blog" />,
      },
      {
        path: '/api',
        element: <PlaceholderPage title="API Reference" />,
      },
      {
        path: '/about',
        element: <PlaceholderPage title="About Us" />,
      },
      {
        path: '/careers',
        element: <PlaceholderPage title="Careers" />,
      },
      {
        path: '/press',
        element: <PlaceholderPage title="Press" />,
      },
      {
        path: '/contact',
        element: <PlaceholderPage title="Contact" />,
      },
      {
        path: '/partners',
        element: <PlaceholderPage title="Partners" />,
      },
      {
        path: '/privacy',
        element: <PlaceholderPage title="Privacy Policy" />,
      },
      {
        path: '/terms',
        element: <PlaceholderPage title="Terms of Service" />,
      },
      {
        path: '/cookies',
        element: <PlaceholderPage title="Cookie Policy" />,
      },
      {
        path: '/conduct',
        element: <PlaceholderPage title="Code of Conduct" />,
      },
      // Catch all route for 404s
      {
        path: '*',
        element: (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-20 flex items-center justify-center">
            <div className="text-center glass rounded-2xl p-12 max-w-md">
              <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
              <h2 className="text-2xl font-bold text-white mb-4">Page Not Found</h2>
              <p className="text-gray-400 mb-6">The page you're looking for doesn't exist.</p>
              <a href="/" className="bg-gradient-primary text-white px-6 py-3 rounded-lg inline-block">
                Back to Home
              </a>
            </div>
          </div>
        ),
      },
    ],
  },
]);

export default router;