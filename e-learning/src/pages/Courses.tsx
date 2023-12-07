import { useState, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CourseCard from '../components/CourseCard';
import SideNav from './SideNav';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const Courses = () => {
  const { getCourses, courses } = useContext(AuthContext);
  const [select, setSelect] = useState({
    category_front: '',
  });

  const [courseData, setCourseData] = useState({
    course_name: '',
    course_desc: '',
    category: '',
    start_date: '',
    end_date: '',
  });

  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setCourseData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (e) => {
    setSelect({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/courses/add', courseData, {
        withCredentials: true,
      });
      setCourseData({
        course_name: '',
        course_desc: '',
        category: '',
        start_date: '',
        end_date: '',
      });
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**

	const { isLoading, error, data } = useQuery(['show'], () => axios.get("http://localhost:3000/api/courses/show").then(res => {
		return res.data;
	})
						   )

	console.log(isLoading, error, data)
**/

  useEffect(() => {
    getCourses();
  }, []);

  //if (isLoading) return <p>Loading...</p>
  //if (error) return <span>error</span>

  return (
    <div className="flex flex-row min-h-screen max-w-full">
      <SideNav display="" />
      <div className="basis-5/6 py-5 text-[#1b1b1b] bg-[#fff] flex flex-col px-3">
        <Navbar name="Courses" />
        <label>
          <h1 className="font-semibold">Category</h1>
          <select
            name="category_front"
            onChange={handleSelect}
            value={select.category_front}
          >
            <option value="">--Please select a category--</option>
            <option value="medicine">Medicine</option>
            <option value="engineering">Engineering</option>
            <option value="comp_sci">Computer Science</option>
            <option value="arts">Arts</option>
            <option value="cosmetics">Cosmetics</option>
            <option value="history">History</option>
            <option value="science">Science</option>
            <option value="fun">Fun</option>
            <option value="faith">Faith</option>
            <option value="others">Others</option>
          </select>
        </label>
        <div className="flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center items-stretch">
            {select.category_front !== ''
              ? courses
                  ?.filter((cour) => cour.category === select.category_front)
                  .map((course) => (
                    <CourseCard
                      key={course.course_id}
                      id={course.course_id}
                      name={course.course_name}
                      desc={course.course_desc}
                      start={course.start_date}
                      end={course.end_date}
                      user={course.username}
                      u_id={course.user_id}
                      createdAt={course.created}
                    />
                  ))
              : courses?.map((course) => (
                  <CourseCard
                    key={course.course_id}
                    id={course.course_id}
                    name={course.course_name}
                    desc={course.course_desc}
                    start={course.start_date}
                    end={course.end_date}
                    user={course.username}
                    u_id={course.user_id}
                    createdAt={course.created}
                  />
                ))}
          </div>
          {show && (
            <form className="flex flex-col justify-center items-center mt-8 w-2/5 bg-[teal]">
              <label>
                <p className="font-semibold my-2">Course Name:</p>
                <input
                  className="outline-none h-10 w-60 mb-3 pl-2"
                  type="text"
                  name="course_name"
                  value={courseData.course_name}
                  onChange={handleChange}
                  placeholder="Course Name"
                />
              </label>
              <label>
                <p className="font-semibold mb-2">Description:</p>
                <textarea
                  className="outline-none h-10 w-60 mb-3 pl-2"
                  name="course_desc"
                  value={courseData.course_desc}
                  onChange={handleChange}
                  placeholder="Lorem Ipsum lorem"
                />
              </label>
              <label>
                <p className="font-semibold mb-2">Category:</p>
                <select
                  className="outline-none h-10 w-60 mb-3 pl-2"
                  name="category"
                  onChange={handleChange}
                  value={courseData.category}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="medicine">Medicine</option>
                  <option value="engineering">Engineering</option>
                  <option value="comp_sci">Computer Science</option>
                  <option value="arts">Arts</option>
                  <option value="cosmetics">Cosmetics</option>
                  <option value="history">History</option>
                  <option value="science">Science</option>
                  <option value="fun">Fun</option>
                  <option value="faith">Faith</option>
                  <option value="others">Others</option>
                </select>
              </label>
              <label>
                <p className="font-semibold mb-2">Start Date:</p>
                <input
                  className="outline-none h-10 w-60 mb-3 pl-2"
                  type="date"
                  name="start_date"
                  value={courseData.start_date}
                  onChange={handleChange}
                  min={getCurrentDate()}
                />
              </label>
              <label>
                <p className="font-semibold mb-2">End Date:</p>
                <input
                  className="outline-none h-10 w-60 mb-3 pl-2"
                  type="date"
                  name="end_date"
                  value={courseData.end_date}
                  onChange={handleChange}
                  min={getCurrentDate()}
                />
              </label>
              <button
                type="submit"
                onClick={handleSubmit}
                className="p-2 bg-[#ffc75b] rounded-md mb-4"
              >
                {' '}
                Create Course
              </button>
            </form>
          )}
          <button
            onClick={handleClick}
            className="bg-[lightgreen] p-4 outline-none rounded-md shadow-md mt-5 mb-7"
          >
            {' '}
            {show ? 'Close Form' : 'Add New Course'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
