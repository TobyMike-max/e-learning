import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import InsertChartOutlinedTwoToneIcon from '@mui/icons-material/InsertChartOutlinedTwoTone';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import EventIcon from '@mui/icons-material/Event';

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
    icon: EventIcon,
  },
  {
    id: 6,
    name: 'Settings',
    icon: SettingsOutlinedIcon,
  },
];
export default fake;
