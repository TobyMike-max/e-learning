import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import EventIcon from '@mui/icons-material/Event';
import AddTaskIcon from '@mui/icons-material/AddTask';


interface fakeProps {
	id: number;
	name: string;
	icon: React.ElementType;
}

const fake:fakeProps[] = [
  {
    id: 1,
    name: 'Dashboard',
    icon: PentagonOutlinedIcon,
  },
  {
    id: 2,
    name: 'Courses',
    icon: BusinessCenterOutlinedIcon,
  },
  {
    id: 3,
    name: 'Chats',
    icon: ChatBubbleOutlineIcon,
  },
  {
    id: 4,
    name: 'Grades',
    icon: InsertChartOutlinedTwoToneIcon,
  },
  {
    id: 5,
    name: 'Events',
    icon: AddTaskIcon,
  },
  {
    id: 6,
    name: 'Calender',
    icon: EventIcon,
  },
  {
    id: 7,
    name: 'Settings',
    icon: SettingsOutlinedIcon,
  },
];
export default fake;
