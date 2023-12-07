import { createContext, useEffect, useState, PropsWithChildren } from 'react';
import axios from 'axios';

type ContextType = {
	currentUser: string;
	login: () => void;
	courses: undefined;
	getCourses: () => void;
	register: () => void;
}

export const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
	 const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
	 const [courses, setCourses] = useState([]);

	const login = async (formData) => {
		const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
			withCredentials: true,
		});
		setCurrentUser(res.data)
	}

	const register = async(formData) => {
		const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
			withCredentials: true,
		});
		setCurrentUser(res.data.name.rows[0])
	}

	const getCourses = async () => {
		const res = await axios.get("http://localhost:5000/api/courses/show", {
			withCredentials: true, 
		})
		setCourses(res.data)
	}

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser))
	},[currentUser])
 return (
	 <AuthContext.Provider value={{ currentUser, login, courses, getCourses, register }}>
		 {children}
	 </AuthContext.Provider>
 )
}

