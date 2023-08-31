import icon from '../assets/gravatar-icon.jpg'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

export default function Navbar() {
	return (
		<div className="flex flex-row justify-between items-center">
			<h1 className="text-xl font-semibold">Dashboard</h1>
			<div className="flex justify-evenly basis-1/5">
				<NotificationsNoneOutlinedIcon />
				<img src={icon} height={30} width={30} style={{borderRadius:'50%'}}/>
				<ExpandMoreOutlinedIcon />
			</div>
		</div>
	)
}
