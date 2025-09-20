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
    ],
  },
]);

export default router;