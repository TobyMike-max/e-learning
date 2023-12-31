import { useState } from 'react';
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
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface currentUserProps {
	average_rating: number;
	created: string;
	email: string;
	full_name: string;
	updated: string;
	user_id: number;
	username: string;
}

interface PrivateRouteProps {
	  isAuthenticated: boolean;
}

const storedUser = localStorage.getItem('user');
const initialUser: currentUserProps = storedUser ? JSON.parse(storedUser) : "";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
	const location = useLocation();
	if (!initialUser && !isAuthenticated) return <Navigate to='/login' replace state={{ from: location }} />
	return (<Outlet />)
}

const App = () => {
	const [isAuthenticated, setAuthenticated] = useState(false);

	const queryClient = new QueryClient();
	const authenticateUser = (value:boolean) => {
		setAuthenticated(value);
	};
	return (
	   <Router>
	    <QueryClientProvider client={queryClient}>
	    <Routes>
	    <Route path="/" element={<Home />} />
	    <Route path="/about" element={<About />} />
	    <Route path="/contact" element={<Contact />} />
	      <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
		      <Route path="/dashboard" element={<Dashboard authenticateUser={authenticateUser} />} />
		      <Route path="/courses" element={<Courses authenticateUser={authenticateUser} />} />
		      <Route path="/chats" element={<Chats authenticateUser={authenticateUser} />} />
		      <Route path="/grades" element={<Grades authenticateUser={authenticateUser} />} />
		      <Route path="/events" element={<Events authenticateUser={authenticateUser} />} />
		      <Route path="/calender" element={<Calendary authenticateUser={authenticateUser} />} />
		      <Route path="/settings" element={<Settings authenticateUser={authenticateUser}/>} />
		      <Route path="/profile" element={<Profile />} />
		      <Route path="/:courseId/lessons" element={<LessonPage />} />
		      <Route path="/forgot_password" element={<ForgotPassword />} />
		      <Route path="/reset_password" element={<ResetPassword />} />
		      <Route path="/lesson/:lessonId" element={<LessonContent />} />
	      </Route>
	      <Route path="/login" element={<Login authenticateUser={authenticateUser} />} />
	      <Route path="/register" element={<Register authenticateUser={authenticateUser} />} />
	      </Routes>
	   </QueryClientProvider>
    </Router>
  );
}

export default App;
