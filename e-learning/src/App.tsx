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
import { BrowserRouter as Router, Route, Routes, redirect, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const PrivateRoute = ({ isAuthenticated }) => {
	if (!isAuthenticated) {
		redirect("/login");
	}
	return (
		<Outlet />
		);
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
	      <Route path="/login" element={<Login authenticateUser={authenticateUser} />} />
	      <Route path="/register" element={<Register authenticateUser={authenticateUser} />} />
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
	      </Routes>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
