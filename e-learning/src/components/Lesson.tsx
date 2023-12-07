import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import moment from 'moment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Lesson = ({ id, courseId, name, content, dur, u_id, createdAt }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [lessonData, setLessonData] = useState({
    lesson_name: '',
    content: '',
    lesson_duration: 0,
    id: id,
  });
  const [show, setShow] = useState(false);
  const [showDel, setShowDel] = useState(false);

  const handleChange = (e) => {
    setLessonData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Create Update API in backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/lessons/update/', lessonData, {
        withCredentials: true,
      });
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  const handleDelDiv = () => {
    setShowDel((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        'http://localhost:5000/api/lessons/delete?l_id=' + id,
        { withCredentials: true },
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleStart = async () => {
	  try {
	    const currentPage = 1;
	    const itemsPerPage = 200;
	    const totalPages = Math.ceil(content.length / itemsPerPage);
	    const calPercent = (currentPage / totalPages) * 100;
	    await axios.get(
	      `http://localhost:5000/api/progress/add?uId=${currentUser.user_id}&lId=${id}&curPag=${currentPage}&perCom=${calPercent}&totPag=${totalPages}`,
	      { withCredentials: true },
	    );
	    navigate(`/lesson/${id}`)
	  } catch(err) {
	    console.log(err);
	  }
  };

  return (
    <div className="flex flex-col mb-4 w-4/5 relative">
      <div className="flex justify-between">
        <h1 className="text-base font-semibold">{name}</h1>
        {u_id === currentUser?.user_id ? (
          <span
            className="text-[white] flex items-center justify-center cursor-pointer bg-red-500 w-6 h-6 rounded-full"
            onClick={handleDelDiv}
          >
            <DeleteForeverIcon />
          </span>
        ) : (
          ''
        )}
        {showDel && u_id === currentUser?.user_id && (
          <div className="text-[white] bg-[#d1cdcd] h-2/4 w-1/6 flex flex-col absolute right-5 top-8 p-1 rounded-md">
            <h1 className="text-[black] text-sm font-semibold mb-2 text-center">
              Are you sure you want to delete?
            </h1>
            <div className="flex justify-around">
              <button
                className="bg-[red] p-1 rounded-md"
                onClick={handleDelete}
              >
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
  </div>
      <p className="text-sm">Duration: {dur} days</p>
      <span className="text-sm mb-1">
        Created {moment(createdAt, 'YYYY-MM-DD HH:mm:ss').fromNow()}
      </span>
      <p className="p-2 bg-[green] rounded-md w-1/6 text-center cursor-pointer" onClick={handleStart}>Start Lesson</p>
      {u_id === currentUser?.user_id && show ? (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>Lesson Name:</p>
              <input
                className="outline-none h-10 w-60 mb-3 pl-2"
                type="text"
                name="lesson_name"
                onChange={handleChange}
                value={lessonData.lesson_name ? lessonData.lesson_name : name}
                placeholder="Name"
              />
            </label>
            <label>
              <p>Content:</p>
              <textarea
                className="outline-none h-60 w-60 mb-3 pl-2"
                name="content"
                onChange={handleChange}
                value={lessonData.content ? lessonData.content : content}
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
                value={
                  lessonData.lesson_duration ? lessonData.lesson_duration : dur
                }
                placeholder="days"
              />
            </label>
          </fieldset>
          <button type="submit">Update Lesson</button>
        </form>
      ) : (
        ''
      )}
      {u_id === currentUser.user_id && (
        <button
          onClick={handleShow}
          className="p-1 w-1/6 rounded-md outline-none bg-slate-300"
        >
		{show ? <span className="text-amber-500">Close Form</span> : <span className="text-fuchsia-600">Update Lesson</span>}
        </button>
      )}
    </div>
  );
};

export default Lesson;
