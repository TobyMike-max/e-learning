import { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import axios, { AxiosResponse } from 'axios';

interface courProps {
	course_id:number;
	course_name: string;
	course_desc: string;
	start_date: string;
	end_date:string;
	created:string;
	category:string;
	instructor_id: string;
	user_id:number;
	username:string;
	full_name:string;
}

interface currentUserProps {
	average_rating: number;
	created: string;
	email: string;
	full_name: string;
	updated: string;
	user_id: number;
	username: string;
}

interface formDataProps {
	username: string;
	email: string;
	password: string;
	full_name: string;
	average_rating: number;
	updated: string;
}

interface loginDataProps {
	username: string;
	password: string;
}

interface ContextType {
	currentUser: currentUserProps;
	login: (formData:loginDataProps) => void;
	courses: courProps[];
	getCourses: () => void;
	register: (formData:formDataProps) => void;
	toggleMenu: () => void;
	isMenuOpen: boolean;
	fetchProgress: (user_id: number, l_id: number) => Promise<AxiosResponse<any, any>>;
}

export const AuthContext = createContext<ContextType | undefined>(undefined);


const storedUser = localStorage.getItem('user');
const initialUser: currentUserProps = storedUser ? JSON.parse(storedUser) : "";

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
	const [currentUser, setCurrentUser] = useState<currentUserProps>(initialUser)
	 const [courses, setCourses] = useState([]);
	 const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const login = async (formData:loginDataProps) => {
		const res = await axios.post("http://localhost:5000/api/auth/login", formData, {
			withCredentials: true,
		});
		setCurrentUser(res.data)
	}

	const register = async(formData:formDataProps) => {
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

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const fetchProgress = async(user_id:number, l_id:number): Promise<AxiosResponse<any, any>> => {
		const res = await axios.get(
			`http://localhost:5000/api/progress/show_percent?uId=${user_id}&lId=${l_id}`,
				{ withCredentials: true }
		);
		return res;

	}

	const contextValue: ContextType = {
		currentUser, login, courses, getCourses, register, toggleMenu, isMenuOpen, fetchProgress
	}

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser))
	},[currentUser])
 return (
	 <AuthContext.Provider value={contextValue}>
		 {children}
	 </AuthContext.Provider>
 )
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if(!context) {
		throw new Error('useAuth must be used within an AUthProvider')
	}
	return context;
};
