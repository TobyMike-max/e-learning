import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';
import { useAuth } from '../context/authContext';

interface r_percent_completeProps {
	r_percent_complete: string;
}

const LessonContent = () => {

  const { currentUser, fetchProgress } = useAuth();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [content, setContent] = useState('');
  const [name, setName] = useState('')
  const [courseId, setCourseId] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [showProg, setProgress] = useState<r_percent_completeProps>({ r_percent_complete: ''})

  const parsedLessonId = lessonId ? parseInt(lessonId, 10) : NaN;
  const itemsPerPage = import.meta.env.VITE_ITEMS_PER_PAGE;
  const totalPages = Math.ceil(content.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = currentPage * itemsPerPage;

  //Ensure endIndex doesn't split words
  while (endIndex < content.length && !/\s/.test(content[endIndex])) endIndex++;

  const contentToDisplay = content.slice(startIndex, endIndex);

  const calPercent = () => {
	  return (currentPage / totalPages) * 100;
  }

  const updateAPI = async() => {
	  let percent = calPercent()
	  const updPro = {
		  l_id: lessonId,
		  curPag: currentPage,
		  percent
	  }
	  try {
		  await axios.put('http://localhost:5000/api/progress/update/', updPro,
				  { withCredentials: true },
				 );
	  } catch (err) {
		  console.log(err);
	  }
  }

  const handleNextPage = async() => {
	  if (currentPage < totalPages) {
		  setCurrentPage((prev) => prev + 1);
	  }
	  await updateAPI()
  }

  const handleNextPageWOProgress = () => {
	  if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  }

  const handlePrevPage = () => {
	  if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleFinish = async() => {
	  await updateAPI();
	  navigate(`/${courseId}/lessons`)
  }

  useEffect(() => {
	  try{
		  const fetchContent = async() => {
			  const res = await axios.get(`http://localhost:5000/api/lessons/${lessonId}`, {
				  withCredentials: true,
			  });
			  //console.log(res.data[0])
			  setContent(res.data[0].content)
			  setName(res.data[0].lesson_name)
			  setCourseId(res.data[0].course_id)

			  const resProgress = await fetchProgress(currentUser.user_id, parsedLessonId)
			  setProgress(resProgress.data[0]);
		  }
		  fetchContent()
	  } catch(err) {
		  console.log(err)
	  }
  }, [])

  return (
    <div className="flex flex-col p-3 flex-wrap">
      <p className="text-center text-lg font-medium">{name}</p>
      <p>{contentToDisplay}</p>
      <div className="flex justify-between my-3">
        {currentPage > 1 && (
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <ArrowBackIosIcon />
          </button>
        )}
        {currentPage < totalPages && (
          <button
	  onClick={parseInt(showProg?.r_percent_complete) == 100 ? handleNextPageWOProgress : handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowForwardIosIcon />
          </button>
	)}
	  {currentPage === totalPages && <button onClick={handleFinish}>Finish</button>}
  </div>
  <Link to={`/${courseId}/lessons`}><p>Back to Lesson Page</p></Link>
    </div>
  );
};

export default LessonContent;
