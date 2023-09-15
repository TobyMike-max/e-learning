import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes, useHistory } from 'react-router-dom';

export default function App() {

	{/*const history = useHistory();

	useEffect(() => {
		if (window.location.pathname !== '/dashboard') {
			history.push('/dashboard');
		}
		}, [history]);*/}

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
