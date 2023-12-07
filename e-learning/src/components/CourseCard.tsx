import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import moment from 'moment';

interface CourseCardProps {
	id: number;
	name: string;
	desc: string;
	start: string;
	end: string;
	user: string;
	u_id: number;
	createdAt: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ id, name, desc, start, end, user, u_id, createdAt }) => {
  const { currentUser } = useAuth();
  const [lessonLen, setLessonLen] = useState(0);
  const [showDel, setShowDel] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        'http://localhost:5000/api/courses/delete?c_id=' + id,
        { withCredentials: true },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelDiv = () => {
    setShowDel((prev) => !prev);
  };

  useEffect(() => {
    try {
      const fetchLessonLen = async () => {
        const res = await axios.get(
          'http://localhost:5000/api/lessons/count?c_id=' + id,
          {
            withCredentials: true,
          },
        );
        setLessonLen(res.data.count);
      };
      fetchLessonLen();
    } catch (err) {
      console.log(err);
    }
  }, [lessonLen]);

  return (
    <div className="flex flex-col items-center text-center basis-1/3 rounded-md shadow-md p-3 relative group">
      <img src="" />
      <h1 className="text-xl mb-2 font-semibold">{name}</h1>
      <span className="text-base mb-1">{desc}</span>
      <Link to={`/${id}/lessons`}>
        <p className="text-xs italic mb-2 hover:underline text-[blue]">
		{lessonLen > 0
            ? `Show ${lessonLen} ${lessonLen > 1 ? 'lessons' : 'lesson'}`
            : u_id === currentUser?.user_id
            ? 'Add Lesson'
            : 'No Lesson Available'}
        </p>
      </Link>
      {u_id === currentUser?.user_id ? (
        <button
          className="text-center rounded-md bg-[red] w-2/4 mt-2 outline-none"
          onClick={handleDelDiv}
        >
          Delete
        </button>
      ) : (
        ''
      )}
      {showDel && u_id === currentUser?.user_id && (
        <div className="text-[white] bg-[#d1cdcd] h-2/4 w-4/6 flex flex-col absolute right-5 top-20 p-1 rounded-md">
          <h1 className="text-[black] text-sm font-semibold mb-2 text-center">
            Are you sure you want to delete?
          </h1>
          <div className="flex justify-around">
            <button className="bg-[red] p-1 rounded-md" onClick={handleDelete}>
              Yes
            </button>
            <button
              className="bg-[green] p-1 rounded-md"
              onClick={() => setShowDel(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      <div className="transition transform translate-y-6 ease-in-out absolute bg-[black] opacity-75 text-[white] top-0 left-0 px-3 py-1 invisible group-hover:visible group-hover:translate-y-0">
        <p className="text-sm">By {user}</p>
        <span className="text-sm mb-1">
          Created {moment(createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()}
        </span>
        <p className="text-xs italic">
          from {start.substring(0, 10)} to {end.substring(0, 10)}
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
