import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Chats from './pages/Chats';
import Grades from './pages/Grades';
import Events from './pages/Events';
import Calendary from './pages/Calendar';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import LessonPage from './pages/LessonPage';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import LessonContent from './pages/LessonContent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function App() {
	const queryClient = new QueryClient();
	return (
		<Router>
			<QueryClientProvider client={queryClient}>
	    <Routes>
	      <Route path="/dashboard" element={<Dashboard />} />
	      <Route path="/courses" element={<Courses />} />
	      <Route path="/chats" element={<Chats />} />
	      <Route path="/grades" element={<Grades />} />
	      <Route path="/events" element={<Events />} />
	      <Route path="/calender" element={<Calendary />} />
	      <Route path="/settings" element={<Settings />} />
	      <Route path="/login" element={<Login />} />
	      <Route path="/register" element={<Register />} />
	      <Route path="/profile" element={<Profile />} />
	      <Route path="/:courseId/lessons" element={<LessonPage />} />
	      <Route path="/forgot_password" element={<ForgotPassword />} />
	      <Route path="/reset_password" element={<ResetPassword />} />
	      <Route path="/lesson/:lessonId" element={<LessonContent />} />
      </Routes>
      </QueryClientProvider>
    </Router>
  );
}
