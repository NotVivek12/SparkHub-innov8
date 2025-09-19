import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import IdeaSubmission from './pages/IdeaSubmission';
import ProjectDetails from './pages/ProjectDetails';
import Community from './pages/Community';
import Profile from './pages/Profile';

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
    ],
  },
]);

export default router;