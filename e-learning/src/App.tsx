import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Chats from './pages/Chats';
import Grades from './pages/Grades';
import Events from './pages/Events';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
	return (
	<Router>
	    <Routes>
	      <Route path="/dashboard" element={<Dashboard />} />
	      <Route path="/courses" element={<Courses />} />
	      <Route path="/chats" element={<Chats />} />
	      <Route path="/grades" element={<Grades />} />
	      <Route path="/events" element={<Events />} />
	      <Route path="/settings" element={<Settings />} />
	      <Route path="/login" element={<Login />} />
	      <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
