import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from 'axios';

const LessonContent = () => {

  const { lessonId } = useParams();
  const [content, setContent] = useState('');
  const [name, setName] = useState('')
  const [courseId, setCourseId] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [userProgress, setUserProgress] = useState([]);
  
  const itemsPerPage = 200;
  const totalPages = Math.ceil(content.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = currentPage * itemsPerPage;

  //Ensure endIndex doesn't split words
  while (endIndex < content.length && !/\s/.test(content[endIndex])) endIndex++;

  const contentToDisplay = content.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const calPercent = () => {
	 return (currentPage / totalPages) * 100;
  }

  const updateProg = () => {

  }
  const handleLessChange = () => {
	  updateProg()
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
		  }
		  fetchContent()
	  } catch(err) {
		  console.log(err)
	  }
  }, [])

  return (
    <div className="flex flex-col p-3">
      <p className="text-center">{name}</p>
      <p>{contentToDisplay}</p>
      <div className="flex justify-between">
        {currentPage > 1 && (
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <ArrowBackIosIcon />
          </button>
        )}
        {currentPage < totalPages && (
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowForwardIosIcon />
          </button>
        )}
  </div>
  <Link to={`/${courseId}/lessons`}><p>Back to Lesson Page</p></Link>
    </div>
  );
};

export default LessonContent;
