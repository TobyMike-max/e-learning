import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Lesson from '../components/Lesson';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface lessonProps {
	lesson_id:number;
	lesson_name:string;
	content:string;
	lesson_duration:number;
	created:string;
	course_id:string;
	course_name:string;
	instructor_id:number;
}

const LessonPage = () => {
  const { currentUser } = useAuth();
  const { courseId } = useParams();

  const [lessonData, setLessonData] = useState({
    lesson_name: '',
    course_id: courseId,
    content: '',
    lesson_duration: 0,
  });

  const [show, setShow] = useState(false);
  const [lessons, setLessons] = useState<lessonProps[]>([]);
  const [instructor, setInstructor] = useState(0);

  useEffect(() => {
    const fetchLessons = async () => {
      const res = await axios.get(
	      'https://academyis.onrender.com/api/lessons/show?c_id=' + courseId,
        {
          withCredentials: true,
        },
      );
      const res2 = await axios.get(
	      'https://academyis.onrender.com/api/courses/course?c_id=' + courseId,
        { withCredentials: true },
      );

      setLessons(res.data);
      setInstructor(res2.data[0].instructor_id);
    };
    fetchLessons();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
	    await axios.post('https://academyis.onrender.com/api/lessons/add', lessonData, {
        withCredentials: true,
      });
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
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
	<Link to="/courses">
		<button className="p-1 rounded-md bg-sky-500/50 flex justify-center items-center mb-2">
			<ArrowBackIcon />Back to Courses
		</button>
	</Link>
      {lessons?.map((lesson:lessonProps) => (
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
	      	required
              />
            </label>
            <label>
              <p>Content:</p>
              <textarea
                className="outline-none h-10 w-60 mb-3 pl-2"
                name="content"
                onChange={handleChange}
                value={lessonData.content || ''}
	      	placeholder="Content"
	      	required
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
	      	min={0}
	      	required
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
    </div>
  );
};

export default LessonPage;
