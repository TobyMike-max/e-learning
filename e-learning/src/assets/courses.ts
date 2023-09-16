import JavascriptOutlinedIcon from '@mui/icons-material/JavascriptOutlined';
import ViewCompactAltOutlinedIcon from '@mui/icons-material/ViewCompactAltOutlined';

interface coursesProps {
	id: string;
	icon: React.ElementType;
	name: string;
	lesson: number;
	progress: number;
}

const courses: coursesProps[] = [
  {
    id: '1',
    icon: ViewCompactAltOutlinedIcon,
    name: 'Web Design',
    lesson: 10,
    progress: 50,
  },
  {
    id: '2',
    icon: JavascriptOutlinedIcon,
    name: 'JavaScript',
    lesson: 7,
    progress: 27,
  },
];

export default courses;
