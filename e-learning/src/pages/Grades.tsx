import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import SideNav from './SideNav';
import axios from 'axios'
import { useAuth } from '../context/authContext';
import ProgressBar from '../components/ProgressBar';

interface course_progProps {
	course_id: string;
	course_name: string;
	total_lessons: string;
	overall_progress: string;
}

const Grades = () => {
  const [course_prog, setCourseProg] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
	  const fetchData = async() => {
		  const res = await axios.get(`http://localhost:5000/api/progress/courses_prog/${currentUser.user_id}`, {
			  withCredentials: true,
		  });
		  setCourseProg(res.data);
	  }
	  fetchData()
  }, [])
  return (
    <div className="flex flex-row min-h-screen max-w-full">
      <SideNav display="" />
      <div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff] flex flex-col px-3">
        <Navbar name="Grades" />
	    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center items-stretch">
		    {course_prog?.filter((cour: course_progProps) => parseInt(cour.overall_progress) > 0).map((course: course_progProps) => (
		  <div key={course.course_id}>
			  <p className="font-black text-1xl">{course.course_name}</p>
			  <ProgressBar progress={parseInt(course.overall_progress) || 0}/>
			  <p>{parseInt(course.overall_progress)}% complete</p>
        	  </div>
	  ))}
	  </div>
	  {course_prog.length === 0 && <p>No grades available. Go to Courses Page to take a course</p>}
      </div>
    </div>
  );
};

export default Grades;
