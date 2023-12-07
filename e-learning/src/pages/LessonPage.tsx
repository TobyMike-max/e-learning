import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Lesson from '../components/Lesson';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const LessonPage = () => {
  const { currentUser } = useContext(AuthContext);
  const { courseId } = useParams();

  const [lessonData, setLessonData] = useState({
    lesson_name: '',
    course_id: courseId,
    content: '',
    lesson_duration: 0,
  });

  const [show, setShow] = useState(false);

  const [lessons, setLessons] = useState([]);
  const [instructor, setInstructor] = useState(0);

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/lessons/show?c_id=' + courseId,
        {
          withCredentials: true,
        },
      );
      const res2 = await axios.get(
        'http://localhost:5000/api/courses/course?c_id=' + courseId,
        { withCredentials: true },
      );

      setLessons(res.data);
      setInstructor(res2.data[0].instructor_id);
    };
    fetchLessons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/lessons/add', lessonData, {
        withCredentials: true,
      });
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setLessonData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className="flex flex-col p-2">
      {lessons.length === 0 ? (
	      <div className="text-center font-bold text-lg">No Lesson Available</div>
      ) : (
        <h1 className="text-center font-bold text-lg">{lessons[0]?.course_name}</h1>
      )}
      {lessons?.map((lesson) => (
        <Lesson
          key={lesson.lesson_id}
          id={lesson.lesson_id}
          courseId={courseId}
	  name={lesson.lesson_name}
	  content={lesson.content}
          dur={lesson.lesson_duration}
          u_id={lesson.instructor_id}
          createdAt={lesson.created}
        />
      ))}
      {instructor && instructor === currentUser?.user_id && show ? (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>Lesson Name:</p>
              <input
                className="outline-none h-10 w-60 mb-3 pl-2"
                type="text"
                name="lesson_name"
                onChange={handleChange}
                value={lessonData.lesson_name || ''}
                placeholder="Name"
              />
            </label>
            <label>
              <p>Content:</p>
              <textarea
                className="outline-none h-10 w-60 mb-3 pl-2"
                type="text"
                name="content"
                onChange={handleChange}
                value={lessonData.content || ''}
                placeholder="Content"
              />
            </label>
            <label>
              <p>Duration:</p>
              <input
                className="outline-none h-10 w-60 mb-3 pl-2"
                type="number"
                name="lesson_duration"
                onChange={handleChange}
                value={lessonData.lesson_duration || ''}
                placeholder="Days"
              />
            </label>
          </fieldset>
          <button type="submit">Add Lesson</button>
        </form>
      ) : (
        ''
      )}
      {instructor && instructor === currentUser?.user_id && (
        <button onClick={handleShow}>
          {show ? (
            <div className="flex justify-center items-center text-rose-600">
              <CloseIcon />
              Close Form
            </div>
          ) : (
            <div className="flex justify-center items-center text-sm rounded-md text-lime-600">
              <AddIcon />
              Add New Lesson
            </div>
          )}
        </button>
      )}
      <Link to="/courses">
        <button className="p-1 rounded-full flex justify-center items-center">
          <ArrowBackIcon />
          Back to Courses
        </button>
      </Link>
    </div>
  );
};

export default LessonPage;
